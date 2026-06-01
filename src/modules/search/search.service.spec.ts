import { Test, TestingModule } from '@nestjs/testing';
import { SearchService } from './search.service';
import { DatabaseService } from '../../configs/database/database.service';
import { MEILISEARCH_CLIENT } from './meilisearch.provider';
import { MeiliSearch } from 'meilisearch';

describe('SearchService', () => {
  let service: SearchService;
  let mockMeilisearch: jest.Mocked<MeiliSearch>;
  let mockPrisma: jest.Mocked<DatabaseService>;

  const mockUserIndex = {
    search: jest.fn(),
    addDocuments: jest.fn(),
    updateSettings: jest.fn(),
    deleteDocument: jest.fn(),
  };

  const mockPostIndex = {
    search: jest.fn(),
    addDocuments: jest.fn(),
    updateSettings: jest.fn(),
    deleteDocument: jest.fn(),
  };

  beforeEach(async () => {
    mockMeilisearch = {
      index: jest.fn((name: string) => {
        if (name === 'users') return mockUserIndex;
        if (name === 'posts') return mockPostIndex;
        throw new Error(`Unknown index: ${name}`);
      }),
    } as any;

    mockPrisma = {
      block: {
        findMany: jest.fn(),
      },
      user: {
        findUnique: jest.fn(),
      },
      post: {
        findUnique: jest.fn(),
      },
    } as any;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SearchService,
        {
          provide: MEILISEARCH_CLIENT,
          useValue: mockMeilisearch,
        },
        {
          provide: DatabaseService,
          useValue: mockPrisma,
        },
      ],
    }).compile();

    service = module.get<SearchService>(SearchService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('search', () => {
    it('should return empty results for empty query', async () => {
      const result = await service.search({ q: '' });

      expect(result).toEqual({
        users: [],
        posts: [],
        total: 0,
        hasMore: false,
        page: 1,
      });
    });

    it('should search users and posts with valid query', async () => {
      const mockUserResults = {
        hits: [{ id: '1', name: 'John Doe' }],
        estimatedTotalHits: 1,
      };

      const mockPostResults = {
        hits: [{ id: '1', content: 'Hello world' }],
        estimatedTotalHits: 1,
      };

      mockUserIndex.search.mockResolvedValue(mockUserResults);
      mockPostIndex.search.mockResolvedValue(mockPostResults);
      mockPrisma.block.findMany.mockResolvedValue([]);

      const result = await service.search({ q: 'test' });

      expect(result).toEqual({
        users: mockUserResults.hits,
        posts: mockPostResults.hits,
        total: 2,
        hasMore: false,
        page: 1,
      });

      expect(mockUserIndex.search).toHaveBeenCalledWith(
        'test',
        expect.any(Object),
      );
      expect(mockPostIndex.search).toHaveBeenCalledWith(
        'test',
        expect.any(Object),
      );
    });

    it('should exclude blocked users when requested', async () => {
      mockPrisma.block.findMany.mockResolvedValue([
        { blockedId: 'blocked-user-1' },
        { blockedId: 'blocked-user-2' },
      ]);

      await service.search(
        {
          q: 'test',
          excludeBlocked: 'true',
          type: 'users',
        },
        'current-user-id',
      );

      expect(mockUserIndex.search).toHaveBeenCalledWith(
        'test',
        expect.objectContaining({
          filter: expect.stringContaining('NOT IN'),
        }),
      );
    });
  });

  describe('indexUser', () => {
    it('should index user data correctly', async () => {
      const userData = {
        id: '1',
        name: 'John Doe',
        email: 'john@example.com',
        image: 'avatar.jpg',
        active: true,
        isBanned: false,
        Profile: { bio: 'Software developer' },
      };

      await service.indexUser(userData);

      expect(mockUserIndex.addDocuments).toHaveBeenCalledWith([
        {
          id: '1',
          name: 'John Doe',
          username: '',
          bio: 'Software developer',
          avatar: 'avatar.jpg',
          isActive: true,
        },
      ]);
    });
  });

  describe('indexPost', () => {
    it('should index post data correctly', async () => {
      const postData = {
        id: '1',
        content: 'Hello world',
        authorId: '1',
        createdAt: new Date('2023-01-01'),
        privacy: 'PUBLIC',
        author: { name: 'John Doe' },
      };

      await service.indexPost(postData);

      expect(mockPostIndex.addDocuments).toHaveBeenCalledWith([
        {
          id: '1',
          content: 'Hello world',
          authorId: '1',
          authorName: 'John Doe',
          createdAt: postData.createdAt.toISOString(),
          privacy: 'PUBLIC',
          isDeleted: false,
        },
      ]);
    });
  });

  describe('createIndexes', () => {
    it('should configure user and post indexes', async () => {
      await service.createIndexes();

      expect(mockUserIndex.updateSettings).toHaveBeenCalledWith(
        expect.objectContaining({
          searchableAttributes: ['name', 'username', 'bio'],
          filterableAttributes: ['id', 'isActive'],
          sortableAttributes: ['name'],
        }),
      );

      expect(mockPostIndex.updateSettings).toHaveBeenCalledWith(
        expect.objectContaining({
          searchableAttributes: ['content', 'authorName'],
          filterableAttributes: ['authorId', 'privacy', 'isDeleted'],
          sortableAttributes: ['createdAt'],
        }),
      );
    });
  });
});
