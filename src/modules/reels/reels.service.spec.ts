import { Test, TestingModule } from '@nestjs/testing';
import {
  BadRequestException,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { getQueueToken } from '@nestjs/bull';
import { ReelsService } from './reels.service';
import { DatabaseService } from '../../configs/database/database.service';
import { RedisService } from '../../configs/redis/redis.service';
import { NotificationService } from '../notification/notification.service';

describe('ReelsService', () => {
  let service: ReelsService;
  let prismaMock: any;
  let redisMock: any;
  let notificationMock: any;
  let sentimentQueueMock: any;

  beforeEach(async () => {
    prismaMock = {
      reel: {
        create: jest.fn().mockResolvedValue({ id: 'reel-1' }),
        findUnique: jest.fn(),
        findFirst: jest.fn(),
        findMany: jest.fn().mockResolvedValue([]),
        update: jest.fn(),
      },
      reelView: {
        create: jest.fn().mockResolvedValue({}),
        aggregate: jest
          .fn()
          .mockResolvedValue({ _avg: { watchPct: 75 }, _count: 10 }),
      },
      reelLike: {
        findUnique: jest.fn(),
        delete: jest.fn().mockResolvedValue({}),
        create: jest.fn().mockResolvedValue({}),
      },
      reelComment: {
        findMany: jest.fn().mockResolvedValue([]),
        create: jest.fn(),
        findUnique: jest.fn(),
        update: jest.fn(),
      },
      reelShare: {
        create: jest.fn().mockResolvedValue({ id: 'share-1' }),
      },
      reelBookmark: {
        findUnique: jest.fn(),
        create: jest.fn().mockResolvedValue({}),
        delete: jest.fn().mockResolvedValue({}),
        findMany: jest.fn().mockResolvedValue([]),
      },
      reelCommentLike: {
        findUnique: jest.fn(),
        findMany: jest.fn().mockResolvedValue([]),
        create: jest.fn().mockResolvedValue({}),
        delete: jest.fn().mockResolvedValue({}),
      },
      audioTrack: {
        findMany: jest.fn().mockResolvedValue([]),
        findUnique: jest.fn(),
        update: jest.fn(),
      },
      userMoodProfile: {
        findUnique: jest.fn().mockResolvedValue(null),
      },
      userSentimentProfile: {
        findUnique: jest.fn().mockResolvedValue(null),
      },
      contentSentiment: {
        findMany: jest.fn().mockResolvedValue([]),
      },
      $transaction: jest.fn().mockResolvedValue([]),
    };

    redisMock = {
      setNxEx: jest.fn(),
      incrBy: jest.fn(),
    };

    notificationMock = {
      notifyReelLike: jest.fn().mockResolvedValue(undefined),
      notifyReelComment: jest.fn().mockResolvedValue(undefined),
      notifyReelShare: jest.fn().mockResolvedValue(undefined),
    };

    sentimentQueueMock = {
      add: jest.fn().mockResolvedValue(undefined),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReelsService,
        { provide: DatabaseService, useValue: prismaMock },
        { provide: RedisService, useValue: redisMock },
        { provide: NotificationService, useValue: notificationMock },
        {
          provide: getQueueToken('sentiment-analysis'),
          useValue: sentimentQueueMock,
        },
      ],
    }).compile();

    service = module.get<ReelsService>(ReelsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // ─── Upload Flow ─────────────────────────────

  it('creates upload URL with reel ID', async () => {
    const result = await service.createUploadUrl('user-1');
    expect(prismaMock.reel.create).toHaveBeenCalledWith({
      data: { userId: 'user-1', status: 'PENDING' },
    });
    expect(result.reelId).toBe('reel-1');
    expect(result.uploadUrl).toContain('reels/raw/reel-1.mp4');
  });

  it('fails finalize for reels longer than 60 seconds', async () => {
    prismaMock.reel.findUnique.mockResolvedValue({
      id: 'reel-1',
      userId: 'user-1',
      deletedAt: null,
    });

    await expect(
      service.finalizeReel('user-1', 'reel-1', {
        rawVideoKey: 'raw/key.mp4',
        durationSec: 65,
      }),
    ).rejects.toBeInstanceOf(BadRequestException);

    expect(prismaMock.reel.update).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({
          status: 'FAILED',
          failReason: 'EXCEEDS_60S',
        }),
      }),
    );
  });

  // ─── View Deduplication ──────────────────────

  it('deduplicates views within session', async () => {
    prismaMock.reel.findUnique.mockResolvedValue({
      id: 'reel-1',
      status: 'READY',
      deletedAt: null,
    });
    redisMock.setNxEx.mockResolvedValue(false);

    const result = await service.recordView('reel-1', { sessionId: 's1' });
    expect(result.counted).toBe(false);
    expect(prismaMock.reelView.create).not.toHaveBeenCalled();
  });

  // ─── Like Toggle ─────────────────────────────

  it('toggles like off when already liked', async () => {
    prismaMock.reel.findUnique
      .mockResolvedValueOnce({ id: 'reel-1', deletedAt: null })
      .mockResolvedValueOnce({ likesCount: BigInt(4), userId: 'owner-1' });
    prismaMock.reelLike.findUnique.mockResolvedValue({
      reelId: 'reel-1',
      userId: 'user-1',
    });

    const result = await service.toggleLike('user-1', 'reel-1');
    expect(result.liked).toBe(false);
    expect(result.count).toBe(4);
  });

  it('toggles like on and sends notification', async () => {
    prismaMock.reel.findUnique
      .mockResolvedValueOnce({
        id: 'reel-1',
        deletedAt: null,
        userId: 'owner-1',
      })
      .mockResolvedValueOnce({ likesCount: BigInt(5), userId: 'owner-1' });
    prismaMock.reelLike.findUnique.mockResolvedValue(null);

    const result = await service.toggleLike('user-1', 'reel-1');
    expect(result.liked).toBe(true);
    expect(notificationMock.notifyReelLike).toHaveBeenCalledWith(
      'user-1',
      'owner-1',
      'reel-1',
    );
  });

  // ─── Privacy Guard ───────────────────────────

  it('returns reel for public access', async () => {
    prismaMock.reel.findFirst.mockResolvedValue({
      id: 'reel-1',
      isPublic: true,
      userId: 'owner-1',
    });
    const result = await service.getReelById('reel-1', 'viewer-1');
    expect(result.id).toBe('reel-1');
  });

  it('hides private reel from non-owner', async () => {
    prismaMock.reel.findFirst.mockResolvedValue({
      id: 'reel-1',
      isPublic: false,
      userId: 'owner-1',
    });
    await expect(
      service.getReelById('reel-1', 'other-user'),
    ).rejects.toBeInstanceOf(NotFoundException);
  });

  it('shows private reel to owner', async () => {
    prismaMock.reel.findFirst.mockResolvedValue({
      id: 'reel-1',
      isPublic: false,
      userId: 'owner-1',
    });
    const result = await service.getReelById('reel-1', 'owner-1');
    expect(result.id).toBe('reel-1');
  });

  // ─── Bookmark Toggle ─────────────────────────

  it('bookmarks a reel', async () => {
    prismaMock.reel.findUnique.mockResolvedValue({
      id: 'reel-1',
      deletedAt: null,
    });
    prismaMock.reelBookmark.findUnique.mockResolvedValue(null);

    const result = await service.toggleBookmark('user-1', 'reel-1');
    expect(result.saved).toBe(true);
    expect(prismaMock.$transaction).toHaveBeenCalled();
  });

  it('unbookmarks a reel', async () => {
    prismaMock.reel.findUnique.mockResolvedValue({
      id: 'reel-1',
      deletedAt: null,
    });
    prismaMock.reelBookmark.findUnique.mockResolvedValue({
      reelId: 'reel-1',
      userId: 'user-1',
    });

    const result = await service.toggleBookmark('user-1', 'reel-1');
    expect(result.saved).toBe(false);
  });

  // ─── Comment Like Toggle ─────────────────────

  it('likes a comment', async () => {
    prismaMock.reelComment.findUnique.mockResolvedValue({
      id: 'comment-1',
      reelId: 'reel-1',
      deletedAt: null,
    });
    prismaMock.reelCommentLike.findUnique.mockResolvedValue(null);

    const result = await service.toggleCommentLike(
      'user-1',
      'reel-1',
      'comment-1',
    );
    expect(result.liked).toBe(true);
  });

  // ─── Comment Editing ─────────────────────────

  it('allows owner to edit their comment', async () => {
    prismaMock.reelComment.findUnique.mockResolvedValue({
      id: 'comment-1',
      reelId: 'reel-1',
      userId: 'user-1',
      deletedAt: null,
    });
    prismaMock.reelComment.update.mockResolvedValue({
      id: 'comment-1',
      content: 'edited',
    });

    const result = await service.editComment(
      'user-1',
      'reel-1',
      'comment-1',
      'edited',
    );
    expect(result.content).toBe('edited');
  });

  it('rejects edit from non-owner', async () => {
    prismaMock.reelComment.findUnique.mockResolvedValue({
      id: 'comment-1',
      reelId: 'reel-1',
      userId: 'owner-1',
      deletedAt: null,
    });

    await expect(
      service.editComment('other-user', 'reel-1', 'comment-1', 'edited'),
    ).rejects.toBeInstanceOf(ForbiddenException);
  });

  // ─── Comments Disabled ───────────────────────

  it('rejects comments when disabled', async () => {
    prismaMock.reel.findUnique.mockResolvedValue({
      id: 'reel-1',
      deletedAt: null,
      commentsEnabled: false,
    });

    await expect(
      service.addComment('user-1', 'reel-1', { content: 'hello' }),
    ).rejects.toBeInstanceOf(BadRequestException);
  });

  // ─── Analytics ───────────────────────────────

  it('returns analytics for owner', async () => {
    prismaMock.reel.findUnique.mockResolvedValue({
      id: 'reel-1',
      userId: 'user-1',
      deletedAt: null,
      viewsCount: BigInt(100),
      likesCount: BigInt(50),
      commentsCount: BigInt(10),
      sharesCount: BigInt(5),
      savesCount: BigInt(3),
      createdAt: new Date(),
    });

    const result = await service.getReelAnalytics('user-1', 'reel-1');
    expect(result.viewsCount).toBe(100);
    expect(result.avgWatchPct).toBe(75);
  });

  it('denies analytics to non-owner', async () => {
    prismaMock.reel.findUnique.mockResolvedValue({
      id: 'reel-1',
      userId: 'owner-1',
      deletedAt: null,
    });

    await expect(
      service.getReelAnalytics('other-user', 'reel-1'),
    ).rejects.toBeInstanceOf(ForbiddenException);
  });
});
