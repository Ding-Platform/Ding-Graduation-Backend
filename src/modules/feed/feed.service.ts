import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../../configs/database/database.service';
import { Neo4jService } from '../../configs/neo4j/neo4j.service';
import { RedisService } from '../../configs/redis/redis.service';
import { FeedItemDto } from './dtos/response/feed.response';
import {
  PaginationDto,
  PaginatedResponse,
} from '../../common/dtos/pagination.dto';
import { InterestService } from '../interest/interest.service';

@Injectable()
export class FeedService {
  constructor(
    private readonly prisma: DatabaseService,
    private readonly neo4jService: Neo4jService,
    private readonly redisService: RedisService,
    private readonly interestService: InterestService,
  ) {}

  async recordPostView(userId: string, postId: string) {
    try {
      await this.prisma.postView.create({
        data: {
          viewerId: userId,
          postId: postId,
        },
      });
      return { success: true };
    } catch (error) {
      // Ignore unique constraint errors or other issues
      return { success: false };
    }
  }

  async getFeed(
    userId: string,
    type: 'HOME' | 'FOLLOWING' | 'EXPLORE' = 'HOME',
    page = 1,
    limit = 20,
  ): Promise<PaginatedResponse<FeedItemDto>> {
    const cacheKey = `feed:${userId}:${type}:${page}:${limit}`;
    const cached =
      await this.redisService.get<PaginatedResponse<FeedItemDto>>(cacheKey);
    if (cached) {
      return cached;
    }

    let response: PaginatedResponse<FeedItemDto>;

    if (type === 'FOLLOWING') {
      response = await this.getChronologicalFeed(userId, page, limit, true);
    } else if (type === 'EXPLORE') {
      response = await this.getExploreFeed(userId, page, limit);
    } else {
      // HOME: Quota-based feed
      const feedIds = await this.getQuotaBasedFeedIds(userId, limit);
      if (feedIds.length === 0) {
        return { data: [], total: 0, page, limit, totalPages: 0 };
      }
      response = await this.mapPostsForFeed(feedIds, userId);
      // We manually paginate inside mapPostsForFeed to return correctly structure, or we just treat the result as one page.
      response.page = page;
      response.limit = limit;
      response.total = response.data.length; // Actually total available is unbounded, but we return length
      response.totalPages = 1;
    }

    await this.redisService.set(cacheKey, response, 60);
    return response;
  }

  private async getQuotaBasedFeedIds(userId: string, limit: number): Promise<string[]> {
    let targetFollowed = Math.floor(limit * 0.5);
    let targetFriends = Math.floor(limit * 0.2);
    let targetInterests = Math.floor(limit * 0.2);
    let targetRandom = limit - (targetFollowed + targetFriends + targetInterests);

    const seenPosts = await this.prisma.postView.findMany({
      where: { viewerId: userId },
      select: { postId: true }
    });
    const excludeIds = new Set<string>(seenPosts.map(p => p.postId));
    const resultIds: string[] = [];

    // Helper to add IDs
    const addIds = (ids: string[], target: number) => {
      // shuffle
      const shuffled = ids.sort(() => 0.5 - Math.random());
      const selected = shuffled.slice(0, target);
      selected.forEach(id => {
        resultIds.push(id);
        excludeIds.add(id);
      });
      return selected.length;
    };

    // 1. Followed
    const follows = await this.prisma.follow.findMany({ where: { followerId: userId }, select: { followingId: true } });
    const followedIds = follows.map(f => f.followingId);
    if (followedIds.length > 0) {
      const fPosts = await this.prisma.post.findMany({
        where: { authorId: { in: followedIds }, isDeleted: false, id: { notIn: Array.from(excludeIds) }, privacy: { in: ['PUBLIC', 'FRIENDS'] } },
        select: { id: true },
        take: targetFollowed * 3,
        orderBy: { createdAt: 'desc' }
      });
      const added = addIds(fPosts.map(p => p.id), targetFollowed);
      const shortfall = targetFollowed - added;
      targetInterests += Math.floor(shortfall * 0.5); // distribute shortfall
      targetFriends += Math.floor(shortfall * 0.5);
    }

    // 2. Friends
    const session = this.neo4jService.getSession();
    let friendIds: string[] = [];
    try {
      const res = await session.run(`MATCH (u:User {userId: $userId})-[:FRIENDS]-(f:User) RETURN f.userId as fId`, { userId });
      friendIds = res.records.map(r => r.get('fId'));
    } catch (e) {} finally { await session.close(); }

    if (friendIds.length > 0) {
      const frPosts = await this.prisma.post.findMany({
        where: { authorId: { in: friendIds }, isDeleted: false, id: { notIn: Array.from(excludeIds) }, privacy: { in: ['PUBLIC', 'FRIENDS'] } },
        select: { id: true },
        take: targetFriends * 3,
        orderBy: { createdAt: 'desc' }
      });
      const added = addIds(frPosts.map(p => p.id), targetFriends);
      const shortfall = targetFriends - added;
      targetInterests += shortfall;
    }

    // Max interests fallback cap
    const maxInterests = Math.floor(limit * 0.7);
    if (targetInterests > maxInterests) {
      targetRandom += (targetInterests - maxInterests);
      targetInterests = maxInterests;
    }

    // 3. Interests
    const interests = await this.interestService.getTopInterests(userId, 10);
    const topTags = interests.map(i => i.topic);
    if (topTags.length > 0) {
      const intPosts = await this.prisma.post.findMany({
        where: {
          isDeleted: false,
          id: { notIn: Array.from(excludeIds) },
          privacy: 'PUBLIC',
          OR: [
            { hashtags: { hasSome: topTags } },
            { categories: { hasSome: topTags } }
          ]
        },
        select: { id: true },
        take: targetInterests * 3,
        orderBy: { createdAt: 'desc' }
      });
      const added = addIds(intPosts.map(p => p.id), targetInterests);
      const shortfall = targetInterests - added;
      targetRandom += shortfall; // remaining shortfall goes to random
    } else {
      targetRandom += targetInterests;
    }

    // 4. Random
    // Fetch random posts
    if (targetRandom > 0) {
      // Fast random selection for a small batch by ordering desc and taking a chunk, then shuffling in memory
      // Real random order in DB is slow, so we take latest 100 unseen public posts and pick randomly
      const randPosts = await this.prisma.post.findMany({
        where: { isDeleted: false, id: { notIn: Array.from(excludeIds) }, privacy: 'PUBLIC' },
        select: { id: true },
        take: 100,
        orderBy: { createdAt: 'desc' }
      });
      addIds(randPosts.map(p => p.id), targetRandom);
    }

    return resultIds.sort(() => 0.5 - Math.random());
  }

  private async mapPostsForFeed(
    postIds: string[],
    userId: string,
  ) {
    const posts = await this.prisma.post.findMany({
      where: {
        id: { in: postIds },
        isDeleted: false,
      },
      include: {
        author: true,
        _count: {
          select: {
            Likes: true,
            Comments: true,
          },
        },
        Likes: {
          where: {
            userId: userId,
          },
          select: {
            userId: true,
          },
        },
      },
    });

    const items = posts.map((p) => {
      return {
        id: p.id,
        author: p.author?.name ?? '',
        authorId: p.author?.id ?? '',
        authorImage: p.author?.image ?? undefined,
        time: p.createdAt.toISOString(),
        content: p.content,
        likes: p._count?.Likes ?? 0,
        comments: p._count?.Comments ?? 0,
        image: p.mediaUrls?.[0] ?? null,
        liked: p.Likes && p.Likes.length > 0,
        score: 1,
      };
    });

    // Keep the order of the shuffled postIds
    const orderedItems = postIds.map(id => items.find(i => i.id === id)).filter(Boolean) as FeedItemDto[];

    return {
      data: orderedItems,
      total: orderedItems.length,
      page: 1,
      limit: orderedItems.length,
      totalPages: 1,
    };
  }

  private async getExploreFeed(userId: string, page: number, limit: number) {
    // Explore: Popular posts from users I don't follow
    const session = this.neo4jService.getSession();
    try {
      const result = await session.run(
        `MATCH (user:User {id: $userId})
             MATCH (post:Post)<-[:POSTED]-(author:User)
             WHERE NOT (user)-[:FOLLOWS]->(author)
             AND user.id <> author.id
             RETURN post.id as postId, 1 as score
             ORDER BY post.createdAt DESC
             LIMIT toInteger($limit)`,
        { userId, limit: limit * 2 },
      );

      const ids = result.records.map((r) => ({
        postId: r.get('postId') as string,
        score: 1,
      }));
      if (ids.length === 0)
        return { data: [], total: 0, page, limit, totalPages: 0 };
      const response = await this.mapPostsForFeed(ids.map(i => i.postId), userId);
      response.page = page;
      response.limit = limit;
      return response;
    } finally {
      await session.close();
    }
  }

  /**
   * Legacy chronological feed used as a fallback when Neo4j
   * does not yet have enough interaction data.
   */
  private async getChronologicalFeed(
    userId: string,
    page = 1,
    limit = 20,
    onlyFollowing = false,
  ): Promise<PaginatedResponse<FeedItemDto>> {
    const skip = (page - 1) * limit;
    // Determine user ids to include: public posts + posts from followed users + friends (if needed)
    const session = this.neo4jService.getSession();
    try {
      const result = await session.run(
        `MATCH (u:User {id: $userId})-[:FOLLOWS]->(followed:User)
         WITH collect(followed.id) as followingIds
         RETURN followingIds`,
        { userId },
      );

      const rawFollowing = result.records[0]?.get('followingIds');
      const followingIds =
        rawFollowing && typeof rawFollowing.toArray === 'function'
          ? // Neo4j List
            rawFollowing.toArray()
          : Array.isArray(rawFollowing)
            ? // Already a plain JS array
              rawFollowing
            : rawFollowing != null
              ? // Single value
                [rawFollowing]
              : [];

      const authorIds = [userId, ...followingIds];

      const whereCondition: any = { isDeleted: false };
      if (onlyFollowing) {
        // Strict following feed: only posts from people I follow (and myself)
        whereCondition.authorId = { in: authorIds };
      } else {
        // Combined feed: Public OR Followed
        whereCondition.OR = [
          { privacy: 'PUBLIC' },
          { authorId: { in: authorIds } },
        ];
      }

      const posts = await this.prisma.post.findMany({
        where: whereCondition,
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
        include: {
          author: true,
          _count: {
            select: {
              Likes: true,
              Comments: true,
            },
          },
          Likes: {
            where: {
              userId: userId,
            },
            select: {
              userId: true,
            },
          },
        },
      });

      const moodProfile = await this.prisma.userSentimentProfile.findUnique({
        where: { userId },
      });
      const feedBoostActive = Boolean(
        moodProfile?.feedBoostPositive &&
        moodProfile.feedBoostUntil &&
        moodProfile.feedBoostUntil.getTime() > Date.now(),
      );

      const postIds = posts.map((p) => p.id);
      const sentiments = await this.prisma.contentSentiment.findMany({
        where: {
          contentType: 'POST',
          contentId: { in: postIds },
        },
        select: {
          contentId: true,
          positiveScore: true,
          negativeScore: true,
        },
      });
      const sentimentMap = new Map(
        sentiments.map((s) => [
          s.contentId,
          { pos: s.positiveScore, neg: s.negativeScore },
        ]),
      );

      const userInterests = await this.interestService.getTopInterests(
        userId,
        20,
      );
      const interestMap = new Map(
        userInterests.map((i) => [i.topic.toLowerCase(), i.score]),
      );

      const ranked = posts
        .map((p) => {
          let affinityBoost = 0;
          const tags = [...(p.hashtags || []), ...(p.categories || [])];
          for (const tag of tags) {
            affinityBoost += interestMap.get(tag.toLowerCase()) || 0;
          }
          const finalAffinityBoost = Math.min(affinityBoost * 0.5, 10.0);

          return {
            post: p,
            score:
              p.createdAt.getTime() / 1_000_000_000_000 +
              0 +
              finalAffinityBoost,
          };
        })
        .sort((a, b) => b.score - a.score);

      const data: FeedItemDto[] = ranked.map(({ post: p }) => ({
        id: p.id,
        author: p.author?.name ?? '',
        authorId: p.author?.id ?? '',
        authorImage: p.author?.image ?? undefined,
        time: p.createdAt.toISOString(),
        content: p.content,
        likes: p._count?.Likes ?? 0,
        comments: p._count?.Comments ?? 0,
        image: p.mediaUrls?.[0] ?? null,
        liked: p.Likes && p.Likes.length > 0,
      }));
      const total = await this.prisma.post.count({
        where: whereCondition,
      });
      const totalPages = Math.ceil(total / limit);
      return { data, total, page, limit, totalPages };
    } finally {
      await session.close();
    }
  }

}
