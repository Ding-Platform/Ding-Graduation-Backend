import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../../configs/database/database.service';
import { Neo4jService } from '../../configs/neo4j/neo4j.service';
import { RedisService } from '../../configs/redis/redis.service';
import { InterestService } from './interest.service';

export type RecommendationType = 'POST' | 'REEL' | 'ALL';

const RECS_CACHE_PREFIX = 'user:recs:';
const RECS_CACHE_TTL_SEC = 900;

@Injectable()
export class RecommendationService {
  constructor(
    private readonly prisma: DatabaseService,
    private readonly neo4j: Neo4jService,
    private readonly redis: RedisService,
    private readonly interestService: InterestService,
  ) {}

  async getForYou(userId: string, type: RecommendationType = 'ALL', limit = 20) {
    const cacheKey = `${RECS_CACHE_PREFIX}${userId}:${type}`;
    const cached = await this.redis.get<{ items: unknown[] }>(cacheKey);
    if (cached?.items?.length) {
      return { items: cached.items.slice(0, limit), cached: true };
    }

    const interests = await this.interestService.getCachedTopInterests(userId, 30);
    const interestMap = new Map(interests.map((i) => [i.topic.toLowerCase(), i.score]));

    const moodProfile = await this.prisma.userSentimentProfile.findUnique({
      where: { userId },
    });
    const feedBoostActive = Boolean(
      moodProfile?.feedBoostPositive &&
        moodProfile.feedBoostUntil &&
        moodProfile.feedBoostUntil.getTime() > Date.now(),
    );

    const items: Array<{
      id: string;
      type: 'POST' | 'REEL';
      score: number;
      matchedTags: string[];
    }> = [];

    if (type === 'POST' || type === 'ALL') {
      const posts = await this.getRankedPosts(userId, interestMap, feedBoostActive, limit);
      items.push(...posts);
    }

    if (type === 'REEL' || type === 'ALL') {
      const reels = await this.getRankedReels(userId, interestMap, feedBoostActive, limit);
      items.push(...reels);
    }

    items.sort((a, b) => b.score - a.score);
    const result = items.slice(0, limit);

    await this.redis.set(cacheKey, { items: result }, RECS_CACHE_TTL_SEC);

    return { items: result, cached: false };
  }

  private async getGraphScores(userId: string, limit: number) {
    const session = this.neo4j.getSession();
    try {
      const result = await session.run(
        `MATCH (u:User {id: $userId})-[r:INTERACTED_WITH]->(author:User)
         MATCH (author)-[:POSTED]->(post:Post)
         RETURN post.id AS postId, coalesce(r.score, 1.0) AS graphScore
         ORDER BY graphScore DESC
         LIMIT toInteger($limit)`,
        { userId, limit },
      );
      return new Map(
        result.records.map((r) => [
          r.get('postId') as string,
          Number(r.get('graphScore') ?? 0),
        ]),
      );
    } catch {
      return new Map<string, number>();
    } finally {
      await session.close();
    }
  }

  private computeInterestOverlap(
    tags: string[],
    interestMap: Map<string, number>,
  ): { score: number; matched: string[] } {
    const matched: string[] = [];
    let sum = 0;
    for (const tag of tags) {
      const key = tag.toLowerCase();
      const pref = interestMap.get(key);
      if (pref) {
        matched.push(key);
        sum += pref;
      }
    }
    const maxPossible = Math.max(
      ...[...interestMap.values()].slice(0, 10),
      1,
    );
    return { score: Math.min(sum / maxPossible, 1), matched };
  }

  private async getRankedPosts(
    userId: string,
    interestMap: Map<string, number>,
    feedBoostActive: boolean,
    limit: number,
  ) {
    const graphScores = await this.getGraphScores(userId, limit * 3);

    const posts = await this.prisma.post.findMany({
      where: { isDeleted: false, privacy: 'PUBLIC' },
      orderBy: { createdAt: 'desc' },
      take: limit * 4,
      include: {
        _count: { select: { Likes: true, Comments: true } },
      },
    });

    return posts.map((post) => {
      const tags = [...(post.hashtags || []), ...(post.categories || [])];
      const { score: interestScore, matched } = this.computeInterestOverlap(
        tags,
        interestMap,
      );
      const graphScore = graphScores.get(post.id) ?? 0;
      const engagementScore =
        (post._count.Likes + post._count.Comments * 2) / 100;
      const hoursAgo = Math.max(
        1,
        (Date.now() - post.createdAt.getTime()) / (1000 * 60 * 60),
      );
      const recencyScore = 1 / Math.log(hoursAgo + 2);
      const moodBoost = feedBoostActive ? 0.05 : 0;

      const finalScore =
        0.3 * Math.min(graphScore / 10, 1) +
        0.35 * interestScore +
        0.2 * Math.min(engagementScore, 1) +
        0.1 * recencyScore +
        moodBoost;

      return {
        id: post.id,
        type: 'POST' as const,
        score: finalScore,
        matchedTags: matched,
      };
    });
  }

  private async getRankedReels(
    userId: string,
    interestMap: Map<string, number>,
    feedBoostActive: boolean,
    limit: number,
  ) {
    const reels = await this.prisma.reel.findMany({
      where: { deletedAt: null, status: 'READY', isPublic: true },
      orderBy: { createdAt: 'desc' },
      take: limit * 4,
    });

    return reels.map((reel) => {
      const tags = [...(reel.hashtags || []), ...(reel.categories || [])];
      const { score: interestScore, matched } = this.computeInterestOverlap(
        tags,
        interestMap,
      );
      const engagementScore =
        (Number(reel.likesCount) +
          Number(reel.commentsCount) * 2 +
          Number(reel.sharesCount) * 3) /
        100;
      const hoursAgo = Math.max(
        1,
        (Date.now() - reel.createdAt.getTime()) / (1000 * 60 * 60),
      );
      const recencyScore = 1 / Math.log(hoursAgo + 2);
      const moodBoost = feedBoostActive ? 0.05 : 0;

      const finalScore =
        0.3 * 0.5 +
        0.35 * interestScore +
        0.2 * Math.min(engagementScore, 1) +
        0.1 * recencyScore +
        moodBoost;

      return {
        id: reel.id,
        type: 'REEL' as const,
        score: finalScore,
        matchedTags: matched,
      };
    });
  }

  async warmupUserCache(userId: string) {
    await this.getForYou(userId, 'ALL', 50);
  }
}
