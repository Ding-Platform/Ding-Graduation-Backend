import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException } from '@nestjs/common';
import { ReelsService } from './reels.service';
import { DatabaseService } from '../../configs/database/database.service';
import { RedisService } from '../../configs/redis/redis.service';

describe('ReelsService', () => {
  let service: ReelsService;
  let prismaMock: any;
  let redisMock: any;

  beforeEach(async () => {
    prismaMock = {
      reel: {
        create: jest.fn().mockResolvedValue({ id: 'reel-1' }),
        findUnique: jest.fn(),
        findFirst: jest.fn(),
        findMany: jest.fn(),
        update: jest.fn(),
      },
      reelView: {
        create: jest.fn().mockResolvedValue({}),
      },
      reelLike: {
        findUnique: jest.fn(),
        delete: jest.fn().mockResolvedValue({}),
        create: jest.fn().mockResolvedValue({}),
      },
      reelComment: {
        findMany: jest.fn(),
        create: jest.fn(),
        findUnique: jest.fn(),
        update: jest.fn(),
      },
      reelShare: {
        create: jest.fn().mockResolvedValue({ id: 'share-1' }),
      },
      audioTrack: {
        findMany: jest.fn(),
        findUnique: jest.fn(),
        update: jest.fn(),
      },
      userMoodProfile: {
        findUnique: jest.fn().mockResolvedValue(null),
      },
      $transaction: jest.fn().mockResolvedValue([]),
    };

    redisMock = {
      setNxEx: jest.fn(),
      incrBy: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReelsService,
        { provide: DatabaseService, useValue: prismaMock },
        { provide: RedisService, useValue: redisMock },
      ],
    }).compile();

    service = module.get<ReelsService>(ReelsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

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

  it('toggles like off when already liked', async () => {
    prismaMock.reel.findUnique
      .mockResolvedValueOnce({ id: 'reel-1', deletedAt: null })
      .mockResolvedValueOnce({ likesCount: BigInt(4) });
    prismaMock.reelLike.findUnique.mockResolvedValue({
      reelId: 'reel-1',
      userId: 'user-1',
    });

    const result = await service.toggleLike('user-1', 'reel-1');
    expect(result.liked).toBe(false);
    expect(result.count).toBe(4);
  });
});
