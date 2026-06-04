import { Injectable, Logger } from '@nestjs/common';
import { AuditAction, Prisma } from '@prisma/client';
import { DatabaseService } from '../../configs/database/database.service';
import { RedisService } from '../../configs/redis/redis.service';
import {
  AUDIT_ACTION_WEIGHTS,
  PREFERENCE_CACHE_KEY_PREFIX,
  PREFERENCE_CACHE_TTL_SEC,
  PREFERENCE_DECAY_LAMBDA,
} from './preference.constants';

export interface AuditScoreJobData {
  auditLogId: string;
  userId: string;
  action: AuditAction;
  targetType?: string;
  targetId?: string;
  textSnapshot?: string;
  metadata?: Prisma.InputJsonValue;
}

@Injectable()
export class InterestService {
  private readonly logger = new Logger(InterestService.name);

  constructor(
    private readonly prisma: DatabaseService,
    private readonly redis: RedisService,
  ) {}

  async recordInterest(userId: string, topics: string[], weight: number = 1.0) {
    if (!topics || topics.length === 0) return;

    const uniqueTopics = [...new Set(topics.map((t) => t.toLowerCase().trim()).filter(Boolean))];
    if (uniqueTopics.length === 0) return;

    try {
      await Promise.all(
        uniqueTopics.map((topic) =>
          this.prisma.userInterest.upsert({
            where: {
              userId_topic: { userId, topic },
            },
            create: { userId, topic, score: weight },
            update: {
              score: { increment: weight },
              lastUpdated: new Date(),
            },
          }),
        ),
      );
      await this.cacheTopInterests(userId);
    } catch (error) {
      this.logger.error(`Failed to record interest for user ${userId}: ${error.message}`);
    }
  }

  applyTimeDecay(basePoints: number, eventDate: Date): number {
    const daysSince = (Date.now() - eventDate.getTime()) / (1000 * 60 * 60 * 24);
    return basePoints * Math.exp(-PREFERENCE_DECAY_LAMBDA * daysSince);
  }

  async applyAuditScore(
    userId: string,
    topics: string[],
    basePoints: number,
    eventDate: Date = new Date(),
  ) {
    if (!topics.length || basePoints === 0) return;
    const effective = this.applyTimeDecay(basePoints, eventDate);
    await this.recordInterest(userId, topics, effective);
  }

  async cacheTopInterests(userId: string, limit = 50) {
    const interests = await this.getTopInterests(userId, limit);
    const key = `${PREFERENCE_CACHE_KEY_PREFIX}${userId}`;

    for (const interest of interests) {
      await this.redis.zAdd(key, interest.score, interest.topic);
    }
    await this.redis.expire(key, PREFERENCE_CACHE_TTL_SEC);
    return interests;
  }

  async getCachedTopInterests(userId: string, limit = 20) {
    const key = `${PREFERENCE_CACHE_KEY_PREFIX}${userId}`;
    const cached = await this.redis.zRangeWithScores(key, 0, limit - 1, { REV: true });

    if (cached.length > 0) {
      return cached.map((entry) => ({
        topic: entry.value,
        score: entry.score,
      }));
    }

    const fromDb = await this.getTopInterests(userId, limit);
    if (fromDb.length > 0) {
      await this.cacheTopInterests(userId, limit);
    }
    return fromDb.map((i) => ({ topic: i.topic, score: i.score }));
  }

  async getTopInterests(userId: string, limit = 10) {
    return this.prisma.userInterest.findMany({
      where: { userId },
      orderBy: { score: 'desc' },
      take: limit,
    });
  }

  async resolveTopicsFromTarget(
    targetType?: string,
    targetId?: string,
  ): Promise<string[]> {
    if (!targetType || !targetId) return [];

    const type = targetType.toUpperCase();

    if (type === 'POST') {
      const post = await this.prisma.post.findUnique({
        where: { id: targetId },
        select: { hashtags: true, categories: true },
      });
      if (!post) return [];
      return [...(post.hashtags || []), ...(post.categories || [])];
    }

    if (type === 'REEL') {
      const reel = await this.prisma.reel.findUnique({
        where: { id: targetId },
        select: { hashtags: true, categories: true },
      });
      if (!reel) return [];
      return [...(reel.hashtags || []), ...(reel.categories || [])];
    }

    if (type === 'COMMENT') {
      const comment = await this.prisma.comment.findUnique({
        where: { id: targetId },
        select: { postId: true },
      });
      if (comment?.postId) {
        return this.resolveTopicsFromTarget('POST', comment.postId);
      }
    }

    return [];
  }

  extractQueryTopics(query: string): string[] {
    const tokens = query
      .toLowerCase()
      .replace(/#/g, ' ')
      .split(/[\s,]+/)
      .map((t) => t.trim())
      .filter((t) => t.length >= 2);
    return [...new Set(tokens)];
  }

  getAuditActionWeight(
    action: AuditAction,
    metadata?: Prisma.InputJsonValue,
  ): number | null {
    const base = AUDIT_ACTION_WEIGHTS[action];
    if (base === undefined) return null;

    if (action === 'POST_VIEW' || action === 'REEL_VIEW') {
      const meta = metadata as Record<string, unknown> | undefined;
      const watchPct = Number(meta?.watchPct ?? meta?.watch_pct ?? 0);
      if (watchPct < 50) return null;
    }

    return base;
  }

  async scoreAuditEvent(data: AuditScoreJobData) {
    const weight = this.getAuditActionWeight(data.action, data.metadata);
    if (weight === null) return { skipped: true, reason: 'No weight for action' };

    let topics: string[] = [];

    if (data.action === 'SEARCH_QUERY' && data.textSnapshot) {
      topics = this.extractQueryTopics(data.textSnapshot);
    } else {
      topics = await this.resolveTopicsFromTarget(data.targetType, data.targetId);
    }

    if (topics.length === 0 && data.action !== 'SEARCH_QUERY') {
      return { skipped: true, reason: 'No topics resolved' };
    }

    await this.applyAuditScore(data.userId, topics, weight);
    return { recorded: true, topics, weight };
  }

  async processDwellTime(
    userId: string,
    contentId: string,
    contentType: 'POST' | 'REEL',
    durationSec: number,
  ) {
    if (durationSec < 5) return { recorded: false, reason: 'Duration too short' };

    const tags = await this.resolveTopicsFromTarget(contentType, contentId);
    if (tags.length === 0) return { recorded: false, reason: 'No tags on content' };

    let weight = 0.5;
    if (durationSec >= 20) weight = 1.5;
    else if (durationSec >= 10) weight = 1.0;

    await this.recordInterest(userId, tags, weight);
    return { recorded: true, weight };
  }
}
