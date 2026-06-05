import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import {
  SentimentContentType,
  SentimentEventType,
  ShareType,
} from '@prisma/client';
import { DatabaseService } from '../../configs/database/database.service';
import { RedisService } from '../../configs/redis/redis.service';
import {
  extractHashtags,
  mergeHashtags,
} from '../../common/utils/hashtag.util';
import { InterestService } from '../interest/interest.service';
import { ActivityService } from '../activity/activity.service';
import { NotificationService } from '../notification/notification.service';
import { StorageService } from '../../common/services/storage/storage.service';
import type { Request } from 'express';

@Injectable()
export class ReelsService {
  constructor(
    private readonly prisma: DatabaseService,
    private readonly redisService: RedisService,
    private readonly notificationService: NotificationService,
    private readonly interestService: InterestService,
    private readonly activityService: ActivityService,
    private readonly storageService: StorageService,
    @InjectQueue('sentiment-analysis')
    private readonly sentimentQueue: Queue,
  ) {}

  async createUploadUrl(userId: string) {
    const reel = await this.prisma.reel.create({
      data: {
        userId,
        status: 'PENDING',
      },
    });

    const uploadKey = reel.id;
    const baseUrl = process.env.API_BASE_URL || 'http://localhost:3000/api';
    return {
      reelId: reel.id,
      key: uploadKey,
      uploadUrl: `${baseUrl}/reels/raw/${uploadKey}`,
      expiresAt: new Date(Date.now() + 15 * 60 * 1000).toISOString(),
    };
  }

  async handleRawUpload(reelId: string, req: Request) {
    const reel = await this.prisma.reel.findUnique({ where: { id: reelId } });
    if (!reel) {
      throw new NotFoundException('Reel not found');
    }

    const url = await this.storageService.saveRawStream(req, 'reels/raw', reelId);
    
    await this.prisma.reel.update({
      where: { id: reelId },
      data: { rawVideoKey: url },
    });
    
    return { success: true, url };
  }

  async finalizeReel(
    userId: string,
    reelId: string,
    payload: {
      rawVideoKey: string;
      caption?: string;
      hashtags?: string[];
      audioTrackId?: string;
      audioOffsetMs?: number;
      durationSec?: number;
      width?: number;
      height?: number;
      fileSizeBytes?: number;
    },
  ) {
    const reel = await this.prisma.reel.findUnique({ where: { id: reelId } });
    if (!reel || reel.deletedAt) {
      throw new NotFoundException('Reel not found');
    }
    if (reel.userId !== userId) {
      throw new ForbiddenException('You do not own this reel');
    }

    if ((payload.durationSec || 0) > 60) {
      await this.prisma.reel.update({
        where: { id: reelId },
        data: {
          status: 'FAILED',
          failReason: 'EXCEEDS_60S',
          rawVideoKey: payload.rawVideoKey,
        },
      });
      throw new BadRequestException('Video duration cannot exceed 60 seconds');
    }

    const processingBase =
      process.env.REELS_CDN_BASE_URL || 'https://cdn.ding.local';
    const mergedHashtags = mergeHashtags(
      extractHashtags(payload.caption),
      payload.hashtags,
    );

    if (mergedHashtags.length > 0) {
      Promise.all(
        mergedHashtags.map((tag) =>
          this.redisService.zIncrBy('trending_hashtags', 1, tag),
        ),
      ).catch((err) =>
        console.error('Failed to update trending hashtags', err),
      );
    }

    const finalized = await this.prisma.reel.update({
      where: { id: reelId },
      data: {
        status: 'READY',
        rawVideoKey: payload.rawVideoKey,
        caption: payload.caption,
        hashtags: mergedHashtags,
        audioTrackId: payload.audioTrackId,
        audioOffsetMs: payload.audioOffsetMs ?? 0,
        durationSec: payload.durationSec ?? 30,
        width: payload.width ?? 1080,
        height: payload.height ?? 1920,
        fileSizeBytes: payload.fileSizeBytes
          ? BigInt(payload.fileSizeBytes)
          : null,
        videoUrl: reel.rawVideoKey,
        thumbnailUrl: null, // Frontend currently doesn't upload thumbnails, so we leave it null or could generate one
        failReason: null,
      },
    });

    await this.sentimentQueue.add(
      'analyze-content',
      {
        text: payload.caption || '',
        contentType: 'REEL' as SentimentContentType,
        contentId: reelId,
        userId,
      },
      {
        jobId: `sentiment:REEL:${reelId}`,
        removeOnComplete: true,
        removeOnFail: true,
      },
    );

    this.activityService.logActivity(userId, 'CREATED_REEL', reelId, 'REEL');

    return {
      reelId,
      status: 'READY',
    };
  }

  async getReelStatus(reelId: string) {
    const reel = await this.prisma.reel.findUnique({
      where: { id: reelId },
      select: {
        id: true,
        status: true,
        failReason: true,
        videoUrl: true,
        thumbnailUrl: true,
      },
    });
    if (!reel) {
      throw new NotFoundException('Reel not found');
    }

    return reel;
  }

  async getReelById(reelId: string, viewerId?: string) {
    const reel = await this.prisma.reel.findFirst({
      where: {
        id: reelId,
        deletedAt: null,
      },
      include: {
        user: {
          select: { id: true, name: true, image: true },
        },
      },
    });
    if (!reel) {
      throw new NotFoundException('Reel not found');
    }
    // Privacy guard: non-public reels are only visible to their owner
    if (!reel.isPublic && reel.userId !== viewerId) {
      throw new NotFoundException('Reel not found');
    }

    return reel;
  }

  async updateReel(
    userId: string,
    reelId: string,
    payload: {
      caption?: string;
      hashtags?: string[];
      audioTrackId?: string | null;
      audioOffsetMs?: number;
      isPublic?: boolean;
      commentsEnabled?: boolean;
      downloadsEnabled?: boolean;
    },
  ) {
    const reel = await this.prisma.reel.findUnique({ where: { id: reelId } });
    if (!reel || reel.deletedAt) {
      throw new NotFoundException('Reel not found');
    }
    if (reel.userId !== userId) {
      throw new ForbiddenException('You do not own this reel');
    }

    const updatedCaption =
      payload.caption !== undefined ? payload.caption : reel.caption;
    const providedHashtags =
      payload.hashtags !== undefined ? payload.hashtags : reel.hashtags;
    const finalHashtags =
      payload.caption !== undefined || payload.hashtags !== undefined
        ? mergeHashtags(extractHashtags(updatedCaption), providedHashtags)
        : undefined;

    return this.prisma.reel.update({
      where: { id: reelId },
      data: {
        caption: payload.caption,
        hashtags: finalHashtags,
        audioTrackId:
          payload.audioTrackId === null ? null : payload.audioTrackId,
        audioOffsetMs: payload.audioOffsetMs,
        isPublic: payload.isPublic,
        commentsEnabled: payload.commentsEnabled,
        downloadsEnabled: payload.downloadsEnabled,
      },
    });
  }

  async deleteReel(userId: string, reelId: string) {
    const reel = await this.prisma.reel.findUnique({ where: { id: reelId } });
    if (!reel || reel.deletedAt) {
      throw new NotFoundException('Reel not found');
    }
    if (reel.userId !== userId) {
      throw new ForbiddenException('You do not own this reel');
    }

    await this.prisma.reel.update({
      where: { id: reelId },
      data: { deletedAt: new Date() },
    });
    return { deleted: true };
  }

  async getFeed(userId: string, cursor?: string, limit = 10) {
    const safeLimit = Math.min(Math.max(limit, 1), 30);
    const cursorDate = this.decodeCursor(cursor);
    const moodProfile = await this.prisma.userMoodProfile.findUnique({
      where: { userId },
    });
    const sentimentProfile = await this.prisma.userSentimentProfile.findUnique({
      where: { userId },
    });
    const feedBoostActive = Boolean(
      sentimentProfile?.feedBoostPositive &&
      sentimentProfile.feedBoostUntil &&
      sentimentProfile.feedBoostUntil.getTime() > Date.now(),
    );

    const candidates = await this.prisma.reel.findMany({
      where: {
        isPublic: true,
        status: 'READY',
        deletedAt: null,
        userId: { not: userId },
        ...(cursorDate ? { createdAt: { lt: cursorDate } } : {}),
      },
      include: {
        user: {
          select: { id: true, name: true, image: true },
        },
        _count: {
          select: {
            likes: true,
            comments: true,
            shares: true,
            views: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
      take: safeLimit * 3,
    });

    const reelSentiments = await this.prisma.contentSentiment.findMany({
      where: {
        contentType: 'REEL',
        contentId: { in: candidates.map((r) => r.id) },
      },
      select: {
        contentId: true,
        positiveScore: true,
        negativeScore: true,
      },
    });
    const sentimentMap = new Map(
      reelSentiments.map((s) => [
        s.contentId,
        { positiveScore: s.positiveScore, negativeScore: s.negativeScore },
      ]),
    );

    const userInterests = await this.interestService.getTopInterests(
      userId,
      20,
    );
    const interestMap = new Map(
      userInterests.map((i) => [i.topic.toLowerCase(), i.score]),
    );

    const scored = candidates
      .map((reel) => {
        const hoursAgo = Math.max(
          1,
          (Date.now() - reel.createdAt.getTime()) / (1000 * 60 * 60),
        );
        const recencyScore = 1 / Math.log(hoursAgo + 2);
        // BigInt fields cast to number safely — reels with billions of interactions
        // are not expected; this is guarded by MAX safe integer at ~9 quadrillion.
        const engagementScore =
          Number(reel.likesCount) +
          Number(reel.commentsCount) * 2 +
          Number(reel.sharesCount) * 3;
        const completionScore = reel._count.views > 0 ? 0.6 : 0.1;
        const moodBoost = this.calculateMoodBoost(
          moodProfile?.dominantMood || null,
          reel,
        );
        const sentimentBoost = this.calculateSentimentFeedBoost(
          feedBoostActive,
          sentimentMap.get(reel.id),
        );

        let affinityBoost = 0;
        const tags = [...(reel.hashtags || []), ...(reel.categories || [])];
        for (const tag of tags) {
          affinityBoost += interestMap.get(tag.toLowerCase()) || 0;
        }
        const finalAffinityBoost = Math.min(affinityBoost * 0.1, 2.0);

        const score =
          0.2 * recencyScore +
          0.35 * this.normalizeScore(engagementScore) +
          0.25 * this.normalizeScore(reel._count.views) +
          0.15 * completionScore +
          0.05 * moodBoost +
          sentimentBoost +
          finalAffinityBoost;

        return { reel, score };
      })
      .sort((a, b) => b.score - a.score);

    const items = scored.slice(0, safeLimit).map((row) => row.reel);
    const enrichedItems = await this.enrichReels(userId, items);

    const nextCursor =
      items.length > 0
        ? this.encodeCursor(items[items.length - 1].createdAt)
        : null;

    return {
      reels: enrichedItems,
      nextCursor,
    };
  }

  async recordView(
    reelId: string,
    payload: {
      sessionId: string;
      watchPct?: number;
      viewerId?: string;
    },
  ) {
    const reel = await this.prisma.reel.findUnique({ where: { id: reelId } });
    if (!reel || reel.deletedAt || reel.status !== 'READY') {
      throw new NotFoundException('Reel not found');
    }

    const dedupKey = `reel:viewed:${payload.sessionId}:${reelId}`;
    const isNew = await this.redisService.setNxEx(dedupKey, '1', 86400);
    if (!isNew) {
      return { counted: false };
    }

    await this.redisService.incrBy(`reel:views_buffer:${reelId}`, 1);
    await this.prisma.reelView.create({
      data: {
        reelId,
        viewerId: payload.viewerId,
        sessionId: payload.sessionId,
        watchPct: payload.watchPct,
      },
    });
    await this.prisma.reel.update({
      where: { id: reelId },
      data: {
        viewsCount: { increment: 1 },
      },
    });

    if (payload.viewerId) {
      await this.sentimentQueue.add(
        'apply-reaction',
        {
          reactorUserId: payload.viewerId,
          contentId: reelId,
          contentType: 'REEL' as SentimentContentType,
          eventType: 'VIEWED_REEL' as SentimentEventType,
        },
        {
          removeOnComplete: true,
          removeOnFail: true,
        },
      );

      if (payload.watchPct && payload.watchPct >= 70) {
        this.interestService.recordInterest(
          payload.viewerId,
          [...(reel.hashtags || []), ...(reel.categories || [])],
          1.0,
        );
      }
    }

    return { counted: true };
  }

  async toggleLike(userId: string, reelId: string) {
    const reel = await this.prisma.reel.findUnique({ where: { id: reelId } });
    if (!reel || reel.deletedAt) {
      throw new NotFoundException('Reel not found');
    }

    const existing = await this.prisma.reelLike.findUnique({
      where: {
        reelId_userId: { reelId, userId },
      },
    });

    if (existing) {
      await this.prisma.$transaction([
        this.prisma.reelLike.delete({
          where: { reelId_userId: { reelId, userId } },
        }),
        this.prisma.reel.update({
          where: { id: reelId },
          data: {
            likesCount: { decrement: 1 },
          },
        }),
      ]);
      const updated = await this.prisma.reel.findUnique({
        where: { id: reelId },
        select: { likesCount: true },
      });
      return { liked: false, count: Number(updated?.likesCount || 0) };
    }

    await this.prisma.$transaction([
      this.prisma.reelLike.create({
        data: { reelId, userId },
      }),
      this.prisma.reel.update({
        where: { id: reelId },
        data: {
          likesCount: { increment: 1 },
        },
      }),
    ]);

    await this.sentimentQueue.add(
      'apply-reaction',
      {
        reactorUserId: userId,
        contentId: reelId,
        contentType: 'REEL' as SentimentContentType,
        eventType: 'LIKED_REEL' as SentimentEventType,
      },
      {
        removeOnComplete: true,
        removeOnFail: true,
      },
    );

    this.interestService.recordInterest(
      userId,
      [...(reel.hashtags || []), ...(reel.categories || [])],
      2.0,
    );
    this.activityService.logActivity(userId, 'LIKED_REEL', reelId, 'REEL');

    const updated = await this.prisma.reel.findUnique({
      where: { id: reelId },
      select: { likesCount: true, userId: true },
    });

    // Notify the reel owner
    if (updated) {
      await this.notificationService.notifyReelLike(
        userId,
        updated.userId,
        reelId,
      );
    }

    return { liked: true, count: Number(updated?.likesCount || 0) };
  }

  async listComments(
    reelId: string,
    cursor?: string,
    limit = 20,
    parentId?: string,
    viewerId?: string,
  ) {
    const safeLimit = Math.min(Math.max(limit, 1), 50);
    const cursorDate = this.decodeCursor(cursor);

    const rows = await this.prisma.reelComment.findMany({
      where: {
        reelId,
        deletedAt: null,
        parentId: parentId || null,
        ...(cursorDate ? { createdAt: { gt: cursorDate } } : {}),
      },
      include: {
        user: { select: { id: true, name: true, image: true } },
        _count: { select: { replies: true } },
      },
      orderBy: [{ likesCount: 'desc' }, { createdAt: 'asc' }],
      take: safeLimit + 1,
    });

    const hasMore = rows.length > safeLimit;
    const items = hasMore ? rows.slice(0, safeLimit) : rows;

    // Enrich with isLikedByMe when a viewer is authenticated
    let likedSet = new Set<string>();
    if (viewerId && items.length > 0) {
      const liked = await this.prisma.reelCommentLike.findMany({
        where: {
          userId: viewerId,
          commentId: { in: items.map((c) => c.id) },
        },
        select: { commentId: true },
      });
      likedSet = new Set(liked.map((l) => l.commentId));
    }

    const data = items.map((c) => ({
      ...c,
      isLikedByMe: likedSet.has(c.id),
    }));

    const nextCursor =
      hasMore && data.length > 0
        ? this.encodeCursor(data[data.length - 1].createdAt)
        : null;

    return {
      data,
      nextCursor,
      hasMore,
    };
  }

  async addComment(
    userId: string,
    reelId: string,
    payload: {
      content: string;
      parentId?: string;
    },
  ) {
    const reel = await this.prisma.reel.findUnique({ where: { id: reelId } });
    if (!reel || reel.deletedAt) {
      throw new NotFoundException('Reel not found');
    }
    if (!reel.commentsEnabled) {
      throw new BadRequestException('Comments are disabled on this reel');
    }

    const comment = await this.prisma.reelComment.create({
      data: {
        reelId,
        userId,
        content: payload.content,
        parentId: payload.parentId,
      },
      include: {
        user: { select: { id: true, name: true, image: true } },
      },
    });

    await this.prisma.reel.update({
      where: { id: reelId },
      data: { commentsCount: { increment: 1 } },
    });

    await this.sentimentQueue.add(
      'analyze-comment',
      {
        commenterId: userId,
        parentContentId: reelId,
        parentContentType: 'REEL' as SentimentContentType,
        commentText: payload.content,
        commentId: comment.id,
      },
      {
        jobId: `sentiment:REEL_COMMENT:${comment.id}`,
        removeOnComplete: true,
        removeOnFail: true,
      },
    );

    this.interestService.recordInterest(
      userId,
      [...(reel.hashtags || []), ...(reel.categories || [])],
      1.5,
    );
    this.activityService.logActivity(
      userId,
      'COMMENTED_ON_REEL',
      reelId,
      'REEL',
    );

    // Notify the reel owner
    await this.notificationService.notifyReelComment(
      userId,
      reel.userId,
      reelId,
      payload.content,
    );

    return comment;
  }

  async deleteComment(userId: string, reelId: string, commentId: string) {
    const comment = await this.prisma.reelComment.findUnique({
      where: { id: commentId },
    });
    if (!comment || comment.reelId !== reelId || comment.deletedAt) {
      throw new NotFoundException('Comment not found');
    }
    if (comment.userId !== userId) {
      throw new ForbiddenException('You can only delete your own comments');
    }

    await this.prisma.$transaction([
      this.prisma.reelComment.update({
        where: { id: commentId },
        data: { deletedAt: new Date() },
      }),
      // Guard: commentsCount cannot drop below 0
      this.prisma.$executeRaw`
        UPDATE "Reel"
        SET "commentsCount" = GREATEST(0, "commentsCount" - 1)
        WHERE id = ${reelId}
      `,
    ]);

    return { deleted: true };
  }

  async shareReel(
    userId: string,
    reelId: string,
    payload: { shareType: ShareType; targetUserId?: string },
  ) {
    const reel = await this.prisma.reel.findUnique({ where: { id: reelId } });
    if (!reel || reel.deletedAt) {
      throw new NotFoundException('Reel not found');
    }

    const share = await this.prisma.reelShare.create({
      data: {
        reelId,
        sharerId: userId,
        shareType: payload.shareType,
        targetId: payload.targetUserId,
      },
    });

    await this.prisma.reel.update({
      where: { id: reelId },
      data: { sharesCount: { increment: 1 } },
    });

    // Notify the reel owner
    await this.notificationService.notifyReelShare(userId, reel.userId, reelId);

    return {
      shareId: share.id,
      shareUrl: `${process.env.APP_BASE_URL || 'https://ding.local'}/reels/${reelId}`,
    };
  }

  // ─────────────────────────────────────────────
  // Bookmark / Save
  // ─────────────────────────────────────────────

  async toggleBookmark(userId: string, reelId: string) {
    const reel = await this.prisma.reel.findUnique({ where: { id: reelId } });
    if (!reel || reel.deletedAt) {
      throw new NotFoundException('Reel not found');
    }

    const existing = await this.prisma.reelBookmark.findUnique({
      where: { reelId_userId: { reelId, userId } },
    });

    if (existing) {
      await this.prisma.$transaction([
        this.prisma.reelBookmark.delete({
          where: { reelId_userId: { reelId, userId } },
        }),
        this.prisma.reel.update({
          where: { id: reelId },
          data: { savesCount: { decrement: 1 } },
        }),
      ]);
      return { saved: false };
    }

    await this.prisma.$transaction([
      this.prisma.reelBookmark.create({
        data: { reelId, userId },
      }),
      this.prisma.reel.update({
        where: { id: reelId },
        data: { savesCount: { increment: 1 } },
      }),
    ]);

    this.interestService.recordInterest(
      userId,
      [...(reel.hashtags || []), ...(reel.categories || [])],
      2.0,
    );
    this.activityService.logActivity(userId, 'BOOKMARKED_REEL', reelId, 'REEL');

    return { saved: true };
  }

  async getSavedReels(userId: string, cursor?: string, limit = 10) {
    const safeLimit = Math.min(Math.max(limit, 1), 30);
    const cursorDate = this.decodeCursor(cursor);

    const bookmarks = await this.prisma.reelBookmark.findMany({
      where: {
        userId,
        ...(cursorDate ? { createdAt: { lt: cursorDate } } : {}),
      },
      include: {
        reel: {
          include: {
            user: { select: { id: true, name: true, image: true } },
          },
        },
      },
      orderBy: { createdAt: 'desc' },
      take: safeLimit + 1,
    });

    const hasMore = bookmarks.length > safeLimit;
    const items = hasMore ? bookmarks.slice(0, safeLimit) : bookmarks;
    const reels = items
      .filter((b) => b.reel.deletedAt === null)
      .map((b) => b.reel);
    const nextCursor =
      hasMore && items.length > 0
        ? this.encodeCursor(items[items.length - 1].createdAt)
        : null;

    return { reels, nextCursor, hasMore };
  }

  // ─────────────────────────────────────────────
  // User Profile Reels
  // ─────────────────────────────────────────────

  async getUserReels(
    targetUserId: string,
    viewerId?: string,
    cursor?: string,
    limit = 10,
  ) {
    const safeLimit = Math.min(Math.max(limit, 1), 30);
    const cursorDate = this.decodeCursor(cursor);
    const isOwner = viewerId === targetUserId;

    const reels = await this.prisma.reel.findMany({
      where: {
        userId: targetUserId,
        deletedAt: null,
        status: 'READY',
        // Non-owners only see public reels
        ...(!isOwner ? { isPublic: true } : {}),
        ...(cursorDate ? { createdAt: { lt: cursorDate } } : {}),
      },
      include: {
        user: { select: { id: true, name: true, image: true } },
      },
      orderBy: { createdAt: 'desc' },
      take: safeLimit + 1,
    });

    const hasMore = reels.length > safeLimit;
    const items = hasMore ? reels.slice(0, safeLimit) : reels;
    const enrichedItems = await this.enrichReels(viewerId, items);

    const nextCursor =
      hasMore && items.length > 0
        ? this.encodeCursor(items[items.length - 1].createdAt)
        : null;

    return { reels: enrichedItems, nextCursor, hasMore };
  }

  async getMyReels(userId: string, cursor?: string, limit = 10) {
    const safeLimit = Math.min(Math.max(limit, 1), 30);
    const cursorDate = this.decodeCursor(cursor);

    const reels = await this.prisma.reel.findMany({
      where: {
        userId,
        deletedAt: null,
        ...(cursorDate ? { createdAt: { lt: cursorDate } } : {}),
      },
      orderBy: { createdAt: 'desc' },
      take: safeLimit + 1,
    });

    const hasMore = reels.length > safeLimit;
    const items = hasMore ? reels.slice(0, safeLimit) : reels;
    const enrichedItems = await this.enrichReels(userId, items);

    const nextCursor =
      hasMore && items.length > 0
        ? this.encodeCursor(items[items.length - 1].createdAt)
        : null;

    return { reels: enrichedItems, nextCursor, hasMore };
  }

  // ─────────────────────────────────────────────
  // Comment Likes & Editing
  // ─────────────────────────────────────────────

  async toggleCommentLike(userId: string, reelId: string, commentId: string) {
    const comment = await this.prisma.reelComment.findUnique({
      where: { id: commentId },
    });
    if (!comment || comment.reelId !== reelId || comment.deletedAt) {
      throw new NotFoundException('Comment not found');
    }

    const existing = await this.prisma.reelCommentLike.findUnique({
      where: { commentId_userId: { commentId, userId } },
    });

    if (existing) {
      await this.prisma.$transaction([
        this.prisma.reelCommentLike.delete({
          where: { commentId_userId: { commentId, userId } },
        }),
        this.prisma.reelComment.update({
          where: { id: commentId },
          data: { likesCount: { decrement: 1 } },
        }),
      ]);
      return { liked: false };
    }

    await this.prisma.$transaction([
      this.prisma.reelCommentLike.create({
        data: { commentId, userId },
      }),
      this.prisma.reelComment.update({
        where: { id: commentId },
        data: { likesCount: { increment: 1 } },
      }),
    ]);
    return { liked: true };
  }

  async editComment(
    userId: string,
    reelId: string,
    commentId: string,
    content: string,
  ) {
    const comment = await this.prisma.reelComment.findUnique({
      where: { id: commentId },
    });
    if (!comment || comment.reelId !== reelId || comment.deletedAt) {
      throw new NotFoundException('Comment not found');
    }
    if (comment.userId !== userId) {
      throw new ForbiddenException('You can only edit your own comments');
    }

    return this.prisma.reelComment.update({
      where: { id: commentId },
      data: { content },
      include: {
        user: { select: { id: true, name: true, image: true } },
      },
    });
  }

  // ─────────────────────────────────────────────
  // Discovery: Hashtags & Trending
  // ─────────────────────────────────────────────

  async getReelsByHashtag(hashtag: string, cursor?: string, limit = 10) {
    const safeLimit = Math.min(Math.max(limit, 1), 30);
    const cursorDate = this.decodeCursor(cursor);
    const normalizedTag = hashtag.toLowerCase().replace(/^#/, '');

    const reels = await this.prisma.reel.findMany({
      where: {
        isPublic: true,
        status: 'READY',
        deletedAt: null,
        hashtags: { has: normalizedTag },
        ...(cursorDate ? { createdAt: { lt: cursorDate } } : {}),
      },
      include: {
        user: { select: { id: true, name: true, image: true } },
      },
      orderBy: { createdAt: 'desc' },
      take: safeLimit + 1,
    });

    const hasMore = reels.length > safeLimit;
    const items = hasMore ? reels.slice(0, safeLimit) : reels;
    const nextCursor =
      hasMore && items.length > 0
        ? this.encodeCursor(items[items.length - 1].createdAt)
        : null;

    return { reels: items, nextCursor, hasMore };
  }

  async getTrendingReels(cursor?: string, limit = 10) {
    const safeLimit = Math.min(Math.max(limit, 1), 30);
    const cursorDate = this.decodeCursor(cursor);
    // Trending = public + READY reels from last 7 days, ranked by engagement
    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

    const reels = await this.prisma.reel.findMany({
      where: {
        isPublic: true,
        status: 'READY',
        deletedAt: null,
        createdAt: { gte: sevenDaysAgo },
        ...(cursorDate
          ? { createdAt: { lt: cursorDate, gte: sevenDaysAgo } }
          : {}),
      },
      include: {
        user: { select: { id: true, name: true, image: true } },
      },
      orderBy: [
        { likesCount: 'desc' },
        { viewsCount: 'desc' },
        { createdAt: 'desc' },
      ],
      take: safeLimit + 1,
    });

    const hasMore = reels.length > safeLimit;
    const items = hasMore ? reels.slice(0, safeLimit) : reels;
    const nextCursor =
      hasMore && items.length > 0
        ? this.encodeCursor(items[items.length - 1].createdAt)
        : null;

    return { reels: items, nextCursor, hasMore };
  }

  // ─────────────────────────────────────────────
  // Creator Analytics
  // ─────────────────────────────────────────────

  async getReelAnalytics(userId: string, reelId: string) {
    const reel = await this.prisma.reel.findUnique({ where: { id: reelId } });
    if (!reel || reel.deletedAt) {
      throw new NotFoundException('Reel not found');
    }
    if (reel.userId !== userId) {
      throw new ForbiddenException(
        'You can only view analytics for your own reels',
      );
    }

    const avgWatch = await this.prisma.reelView.aggregate({
      where: { reelId, watchPct: { not: null } },
      _avg: { watchPct: true },
      _count: true,
    });

    return {
      reelId,
      viewsCount: Number(reel.viewsCount),
      likesCount: Number(reel.likesCount),
      commentsCount: Number(reel.commentsCount),
      sharesCount: Number(reel.sharesCount),
      savesCount: Number(reel.savesCount),
      avgWatchPct: Math.round(avgWatch._avg.watchPct ?? 0),
      totalViewsWithWatchData: avgWatch._count,
      createdAt: reel.createdAt,
    };
  }

  // ─────────────────────────────────────────────
  // Audio Tracks
  // ─────────────────────────────────────────────

  async listAudioTracks(genre?: string, search?: string) {
    return this.prisma.audioTrack.findMany({
      where: {
        ...(genre ? { genre } : {}),
        ...(search
          ? {
              OR: [
                { title: { contains: search, mode: 'insensitive' } },
                { artist: { contains: search, mode: 'insensitive' } },
              ],
            }
          : {}),
      },
      orderBy: [{ usageCount: 'desc' }, { createdAt: 'desc' }],
      take: 50,
    });
  }

  async getAudioTrackById(id: string) {
    const track = await this.prisma.audioTrack.findUnique({ where: { id } });
    if (!track) {
      throw new NotFoundException('Audio track not found');
    }

    return track;
  }

  async getTrendingAudioTracks() {
    return this.prisma.audioTrack.findMany({
      orderBy: { usageCount: 'desc' },
      take: 20,
    });
  }

  async registerAudioTrackUse(id: string) {
    const track = await this.prisma.audioTrack.findUnique({ where: { id } });
    if (!track) {
      throw new NotFoundException('Audio track not found');
    }

    return this.prisma.audioTrack.update({
      where: { id },
      data: {
        usageCount: { increment: 1 },
      },
    });
  }

  private normalizeScore(value: number) {
    if (value <= 0) return 0;
    return Math.min(1, Math.log10(value + 1) / 3);
  }

  private calculateMoodBoost(
    dominantMood: string | null,
    reel: { caption: string | null },
  ) {
    if (!dominantMood) return 0.1;
    if (dominantMood === 'sad') {
      const caption = (reel.caption || '').toLowerCase();
      if (
        caption.includes('fun') ||
        caption.includes('happy') ||
        caption.includes('motivat')
      ) {
        return 0.8;
      }
      return 0.25;
    }

    return 0.4;
  }

  private calculateSentimentFeedBoost(
    enabled: boolean,
    sentiment?: { positiveScore: number; negativeScore: number },
  ) {
    if (!enabled || !sentiment) return 0;
    if (sentiment.positiveScore > 65) return 0.2;
    if (sentiment.negativeScore > 65) return -0.2;
    return 0;
  }

  private async enrichReels(userId: string | undefined, items: any[]) {
    if (!userId || items.length === 0) return items;

    const [likedReels, savedReels, followedUsers] = await Promise.all([
      this.prisma.reelLike.findMany({
        where: {
          userId,
          reelId: { in: items.map((r) => r.id) },
        },
        select: { reelId: true },
      }),
      this.prisma.reelBookmark.findMany({
        where: {
          userId,
          reelId: { in: items.map((r) => r.id) },
        },
        select: { reelId: true },
      }),
      this.prisma.follow.findMany({
        where: {
          followerId: userId,
          followingId: { in: items.map((r) => r.userId) },
        },
        select: { followingId: true },
      }),
    ]);

    const likedSet = new Set(likedReels.map((l) => l.reelId));
    const savedSet = new Set(savedReels.map((s) => s.reelId));
    const followedSet = new Set(followedUsers.map((f) => f.followingId));

    return items.map((reel) => ({
      ...reel,
      isLikedByMe: likedSet.has(reel.id),
      isSavedByMe: savedSet.has(reel.id),
      user: {
        ...reel.user,
        isFollowedByMe: followedSet.has(reel.userId),
      },
    }));
  }

  private encodeCursor(date: Date) {
    return Buffer.from(date.toISOString()).toString('base64');
  }

  private decodeCursor(cursor?: string): Date | null {
    if (!cursor) return null;
    try {
      const parsed = new Date(Buffer.from(cursor, 'base64').toString('utf8'));
      return Number.isNaN(parsed.getTime()) ? null : parsed;
    } catch {
      return null;
    }
  }
}
