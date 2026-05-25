import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../../configs/database/database.service';
import { Neo4jService } from '../../configs/neo4j/neo4j.service';
import { RedisService } from '../../configs/redis/redis.service';
import { FeedItemDto } from './dtos/response/feed.response';
import {
  PaginationDto,
  PaginatedResponse,
} from '../../common/dtos/pagination.dto';

@Injectable()
export class FeedService {
  constructor(
    private readonly prisma: DatabaseService,
    private readonly neo4jService: Neo4jService,
    private readonly redisService: RedisService,
  ) {}

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
      // HOME: Personalized feed backed by Neo4j; falls back to chronological feed.
      const scoredPostIds = await this.getScoredPostsFromGraph(
        userId,
        limit * 2,
      );

      if (!scoredPostIds.length) {
        response = await this.getChronologicalFeed(userId, page, limit, false);
      } else {
        response = await this.mapPosts(scoredPostIds, page, limit, userId);
      }
    }

    await this.redisService.set(cacheKey, response, 60);
    return response;
  }

  private async mapPosts(
    scoredPostIds: { postId: string; score: number }[],
    page: number,
    limit: number,
    userId: string,
  ) {
    const moodProfile = await this.prisma.userSentimentProfile.findUnique({
      where: { userId },
    });
    const feedBoostActive = Boolean(
      moodProfile?.feedBoostPositive &&
        moodProfile.feedBoostUntil &&
        moodProfile.feedBoostUntil.getTime() > Date.now(),
    );

    const posts = await this.prisma.post.findMany({
      where: {
        id: { in: scoredPostIds.map((p) => p.postId) },
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

    const sentiments = await this.prisma.contentSentiment.findMany({
      where: {
        contentType: 'POST',
        contentId: { in: posts.map((p) => p.id) },
      },
      select: {
        contentId: true,
        positiveScore: true,
        negativeScore: true,
      },
    });

    const sentimentMap = new Map(
      sentiments.map((s) => [s.contentId, { pos: s.positiveScore, neg: s.negativeScore }]),
    );

    const scoreMap = new Map(scoredPostIds.map((s) => [s.postId, s.score]));

    const items = posts.map((p) => ({
      id: p.id,
      author: p.author?.name ?? '',
      time: p.createdAt.toISOString(),
      content: p.content,
      likes: p._count?.Likes ?? 0,
      comments: p._count?.Comments ?? 0,
      image: p.mediaUrls?.[0] ?? null,
      liked: p.Likes && p.Likes.length > 0,
      score: (scoreMap.get(p.id) ?? 0) + this.getMoodBoostScore(feedBoostActive, sentimentMap.get(p.id)),
    }));

    items.sort((a, b) => (b.score ?? 0) - (a.score ?? 0));

    const start = (page - 1) * limit;
    const paginated = items.slice(start, start + limit);
    const data: FeedItemDto[] = paginated.map(({ score, ...rest }) => rest);

    return {
      data,
      total: items.length,
      page,
      limit,
      totalPages: Math.ceil(items.length / limit),
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
      return this.mapPosts(ids, page, limit, userId);
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
        sentiments.map((s) => [s.contentId, { pos: s.positiveScore, neg: s.negativeScore }]),
      );

      const ranked = posts
        .map((p) => ({
          post: p,
          score:
            p.createdAt.getTime() / 1_000_000_000_000 +
            this.getMoodBoostScore(feedBoostActive, sentimentMap.get(p.id)),
        }))
        .sort((a, b) => b.score - a.score);

      const data: FeedItemDto[] = ranked.map(({ post: p }) => ({
        id: p.id,
        author: p.author?.name ?? '',
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

  /**
   * Neo4j scoring query that returns candidate posts with scores
   * based on engagement, affinity, and recency.
   */
  private async getScoredPostsFromGraph(userId: string, limit: number) {
    // Ensure Neo4j LIMIT always receives a non-negative integer value
    const safeLimit = Math.max(0, Math.floor(limit));
    const session = this.neo4jService.getSession();

    try {
      const result = await session.run(
        `
        MATCH (user:User {id: $userId})-[:FOLLOWS]->(author:User)
        MATCH (author)-[:POSTED]->(post:Post)
        WHERE post.createdAt > datetime() - duration('P7D')

        OPTIONAL MATCH (user)-[userInteraction:LIKED|COMMENTED]->(post)
        OPTIONAL MATCH (post)<-[allEngagement:LIKED|COMMENTED]-()
        OPTIONAL MATCH (user)-[affinity:INTERACTED_WITH]->(author)

        WITH post, author, 
             COUNT(DISTINCT allEngagement) as totalEngagement,
             affinity.score as affinityScore,
             CASE WHEN userInteraction IS NULL THEN 0 ELSE 1 END as alreadyInteracted,
             duration.between(post.createdAt, datetime()).minutes as ageMinutes

        WHERE alreadyInteracted = 0

        WITH post,
             totalEngagement * 1.0 as engagementScore,
             COALESCE(affinityScore, 0) * 2.0 as affinityWeight,
             1.0 / (1.0 + ageMinutes / 60.0) as timeDecay

        WITH post,
             (engagementScore + affinityWeight) * timeDecay as finalScore

        RETURN post.id as postId, finalScore as score
        ORDER BY finalScore DESC
        LIMIT toInteger($limit)
        `,
        { userId, limit: safeLimit },
      );

      return result.records.map((record) => ({
        postId: record.get('postId') as string,
        score: record.get('score') as number,
      }));
    } finally {
      await session.close();
    }
  }

  private getMoodBoostScore(
    enabled: boolean,
    sentiment?: { pos: number; neg: number },
  ) {
    if (!enabled || !sentiment) return 0;
    if (sentiment.pos > 65) return 0.35;
    if (sentiment.neg > 65) return -0.35;
    return 0;
  }
}
