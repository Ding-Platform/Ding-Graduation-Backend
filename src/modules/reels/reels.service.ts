import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ShareType } from '@prisma/client';
import { DatabaseService } from '../../configs/database/database.service';
import { RedisService } from '../../configs/redis/redis.service';

@Injectable()
export class ReelsService {
  constructor(
    private readonly prisma: DatabaseService,
    private readonly redisService: RedisService,
  ) {}

  async createUploadUrl(userId: string) {
    const reel = await this.prisma.reel.create({
      data: {
        userId,
        status: 'PENDING',
      },
    });

    const uploadKey = `reels/raw/${reel.id}.mp4`;
    return {
      reelId: reel.id,
      uploadUrl: `${process.env.REELS_FAKE_UPLOAD_BASE_URL || 'https://uploads.ding.local'}/${uploadKey}`,
      expiresAt: new Date(Date.now() + 15 * 60 * 1000).toISOString(),
    };
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
    return this.prisma.reel.update({
      where: { id: reelId },
      data: {
        status: 'READY',
        rawVideoKey: payload.rawVideoKey,
        caption: payload.caption,
        hashtags: payload.hashtags || [],
        audioTrackId: payload.audioTrackId,
        audioOffsetMs: payload.audioOffsetMs ?? 0,
        durationSec: payload.durationSec ?? 30,
        width: payload.width ?? 1080,
        height: payload.height ?? 1920,
        fileSizeBytes: payload.fileSizeBytes
          ? BigInt(payload.fileSizeBytes)
          : null,
        videoUrl: `${processingBase}/reels/${reelId}/video.mp4`,
        thumbnailUrl: `${processingBase}/reels/${reelId}/thumb.jpg`,
        failReason: null,
      },
    });
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

  async getReelById(reelId: string) {
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
    },
  ) {
    const reel = await this.prisma.reel.findUnique({ where: { id: reelId } });
    if (!reel || reel.deletedAt) {
      throw new NotFoundException('Reel not found');
    }
    if (reel.userId !== userId) {
      throw new ForbiddenException('You do not own this reel');
    }

    return this.prisma.reel.update({
      where: { id: reelId },
      data: {
        caption: payload.caption,
        hashtags: payload.hashtags,
        audioTrackId:
          payload.audioTrackId === null ? null : payload.audioTrackId,
        audioOffsetMs: payload.audioOffsetMs,
        isPublic: payload.isPublic,
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

    const candidates = await this.prisma.reel.findMany({
      where: {
        isPublic: true,
        status: 'READY',
        deletedAt: null,
        ...(cursorDate ? { createdAt: { lt: cursorDate } } : {}),
      },
      include: {
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
        const score =
          0.2 * recencyScore +
          0.35 * this.normalizeScore(engagementScore) +
          0.25 * this.normalizeScore(reel._count.views) +
          0.15 * completionScore +
          0.05 * moodBoost;

        return { reel, score };
      })
      .sort((a, b) => b.score - a.score);

    const items = scored.slice(0, safeLimit).map((row) => row.reel);
    const nextCursor =
      items.length > 0
        ? this.encodeCursor(items[items.length - 1].createdAt)
        : null;

    return {
      reels: items,
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
    const updated = await this.prisma.reel.findUnique({
      where: { id: reelId },
      select: { likesCount: true },
    });
    return { liked: true, count: Number(updated?.likesCount || 0) };
  }

  async listComments(
    reelId: string,
    cursor?: string,
    limit = 20,
    parentId?: string,
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
      },
      orderBy: [{ likesCount: 'desc' }, { createdAt: 'asc' }],
      take: safeLimit + 1,
    });

    const hasMore = rows.length > safeLimit;
    const data = hasMore ? rows.slice(0, safeLimit) : rows;
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

    return {
      shareId: share.id,
      shareUrl: `${process.env.APP_BASE_URL || 'https://ding.local'}/reels/${reelId}`,
    };
  }

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
