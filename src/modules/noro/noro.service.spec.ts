import { Test, TestingModule } from '@nestjs/testing';
import { NoroService } from './noro.service';
import { DatabaseService } from '../../configs/database/database.service';

describe('NoroService', () => {
  let service: NoroService;
  let prismaMock: any;

  beforeEach(async () => {
    prismaMock = {
      noroChat: {
        findMany: jest.fn(),
        create: jest.fn(),
      },
      noroConversation: {
        create: jest.fn(),
        findMany: jest.fn(),
        findFirst: jest.fn(),
        updateMany: jest.fn(),
      },
      noroMessage: {
        create: jest.fn(),
        update: jest.fn(),
        findUnique: jest.fn(),
        findMany: jest.fn(),
      },
      userMoodProfile: {
        findUnique: jest.fn(),
        upsert: jest.fn(),
      },
      crisisEvent: {
        create: jest.fn(),
        updateMany: jest.fn(),
      },
      crisisHotline: {
        findMany: jest.fn(),
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NoroService,
        {
          provide: DatabaseService,
          useValue: prismaMock,
        },
      ],
    }).compile();

    service = module.get<NoroService>(NoroService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('creates a conversation with default trigger', async () => {
    prismaMock.noroConversation.create.mockResolvedValue({
      id: 'conv-1',
      userId: 'user-1',
      trigger: 'USER_INITIATED',
    });

    const result = await service.createConversation('user-1');
    expect(prismaMock.noroConversation.create).toHaveBeenCalledWith({
      data: { userId: 'user-1', trigger: 'USER_INITIATED' },
    });
    expect(result.id).toBe('conv-1');
  });

  it('adds user message and enriches sentiment + mood profile', async () => {
    prismaMock.noroMessage.create.mockResolvedValue({ id: 'msg-1' });
    prismaMock.noroMessage.update.mockResolvedValue({});
    prismaMock.userMoodProfile.findUnique.mockResolvedValue(null);
    prismaMock.userMoodProfile.upsert.mockResolvedValue({});
    prismaMock.noroMessage.findUnique.mockResolvedValue({
      id: 'msg-1',
      role: 'USER',
    });

    const result = await service.addMessage({
      conversationId: 'conv-1',
      userId: 'user-1',
      role: 'USER',
      content: 'I feel better today, thanks',
    });

    expect(prismaMock.noroMessage.create).toHaveBeenCalled();
    expect(prismaMock.noroMessage.update).toHaveBeenCalled();
    expect(prismaMock.userMoodProfile.upsert).toHaveBeenCalled();
    expect(result).not.toBeNull();
    expect(result?.id).toBe('msg-1');
  });

  it('returns paginated conversations with next cursor', async () => {
    const now = new Date('2026-04-24T00:00:00.000Z');
    prismaMock.noroConversation.findMany.mockResolvedValue([
      { id: 'c1', startedAt: now },
      { id: 'c2', startedAt: new Date('2026-04-23T00:00:00.000Z') },
      { id: 'c3', startedAt: new Date('2026-04-22T00:00:00.000Z') },
    ]);

    const result = await service.listConversations('user-1', undefined, 2);
    expect(result.data).toHaveLength(2);
    expect(result.hasMore).toBe(true);
    expect(result.nextCursor).toBeTruthy();
  });
});
