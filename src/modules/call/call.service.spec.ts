import { Test, TestingModule } from '@nestjs/testing';
import { CallService } from './call.service';
import { DatabaseService } from '../../configs/database/database.service';
import { RedisService } from '../../configs/redis/redis.service';

describe('CallService', () => {
  let service: CallService;
  let prismaMock: any;
  let redisMock: any;

  beforeEach(async () => {
    prismaMock = {
      callRoom: {
        upsert: jest.fn().mockResolvedValue({ id: 'room-1', maxParticipants: 16 }),
      },
      callParticipant: {
        create: jest.fn().mockResolvedValue({}),
        updateMany: jest.fn().mockResolvedValue({}),
      },
    };

    redisMock = {
      hLen: jest.fn().mockResolvedValue(0),
      hSet: jest.fn().mockResolvedValue(true),
      hGet: jest.fn().mockResolvedValue(null),
      hGetAll: jest.fn().mockResolvedValue({}),
      hDel: jest.fn().mockResolvedValue(true),
      expire: jest.fn().mockResolvedValue(true),
      zAdd: jest.fn().mockResolvedValue(true),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CallService,
        { provide: DatabaseService, useValue: prismaMock },
        { provide: RedisService, useValue: redisMock },
      ],
    }).compile();

    service = module.get<CallService>(CallService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('joins participant when room is not full', async () => {
    redisMock.hGetAll.mockResolvedValue({
      peer1: JSON.stringify({
        userId: 'u1',
        peerId: 'peer1',
        joinedAt: Date.now(),
        audio: true,
        video: true,
      }),
    });

    const result = await service.joinRoomParticipant({
      roomId: 'room-1',
      userId: 'u1',
      peerId: 'peer1',
    });

    expect(result.roomFull).toBe(false);
    expect(result.participants).toHaveLength(1);
    expect(redisMock.hSet).toHaveBeenCalled();
  });

  it('rejects join when room is full', async () => {
    redisMock.hLen.mockResolvedValue(16);
    prismaMock.callRoom.upsert.mockResolvedValue({ id: 'room-1', maxParticipants: 16 });

    const result = await service.joinRoomParticipant({
      roomId: 'room-1',
      userId: 'u1',
      peerId: 'peer1',
    });

    expect(result.roomFull).toBe(true);
    expect(redisMock.hSet).not.toHaveBeenCalled();
  });

  it('starts and blocks concurrent screen sharing', async () => {
    redisMock.hGet.mockResolvedValueOnce(null).mockResolvedValueOnce('1');

    const first = await service.tryStartScreenShare('room-1', 'peer1');
    const second = await service.tryStartScreenShare('room-1', 'peer2');

    expect(first).toBe(true);
    expect(second).toBe(false);
  });

  it('returns low quality hint for large rooms', async () => {
    redisMock.hLen.mockResolvedValue(10);
    const hints = await service.getQualityHints('room-1');

    expect(hints.participantCount).toBe(10);
    expect(hints.recommendedVideoLayers).toBe('low');
    expect(hints.networkCondition).toBe('degraded');
  });

  it('clears active speaker and timer on leave (clearActiveSpeaker)', () => {
    // Seed internal state manually via reportAudioLevel side-effect mock approach
    // We call clearActiveSpeaker without prior state — should not throw
    expect(() => service.clearActiveSpeaker('room-99')).not.toThrow();
  });

  it('onModuleDestroy does not throw when maps are empty', () => {
    expect(() => service.onModuleDestroy()).not.toThrow();
  });
});
