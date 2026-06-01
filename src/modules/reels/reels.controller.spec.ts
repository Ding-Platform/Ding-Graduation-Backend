import { Test, TestingModule } from '@nestjs/testing';
import { ReelsController } from './reels.controller';
import { ReelsService } from './reels.service';
import { currentUserType } from '../../common/types/current-user.type';
import { UserRole } from '@prisma/client';

describe('ReelsController', () => {
  let controller: ReelsController;
  let reelsService: any;

  const mockUser: currentUserType = {
    id: 'user-1',
    email: 'user1@example.com',
    name: 'User 1',
    image: null,
    password: null,
    emailVerified: true,
    active: true,
    isBanned: false,
    banReason: null,
    role: UserRole.USER,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  beforeEach(async () => {
    reelsService = {
      createUploadUrl: jest.fn().mockResolvedValue({ reelId: 'reel-1' }),
      finalizeReel: jest.fn().mockResolvedValue({ id: 'reel-1' }),
      getReelStatus: jest.fn(),
      getFeed: jest.fn().mockResolvedValue({ reels: [], nextCursor: null }),
      getReelById: jest.fn(),
      updateReel: jest.fn(),
      deleteReel: jest.fn(),
      recordView: jest.fn(),
      toggleLike: jest.fn(),
      listComments: jest
        .fn()
        .mockResolvedValue({ data: [], nextCursor: null, hasMore: false }),
      addComment: jest.fn(),
      editComment: jest.fn(),
      deleteComment: jest.fn(),
      shareReel: jest.fn(),
      toggleBookmark: jest.fn().mockResolvedValue({ saved: true }),
      getSavedReels: jest
        .fn()
        .mockResolvedValue({ reels: [], nextCursor: null }),
      getMyReels: jest.fn().mockResolvedValue({ reels: [], nextCursor: null }),
      getUserReels: jest
        .fn()
        .mockResolvedValue({ reels: [], nextCursor: null }),
      toggleCommentLike: jest.fn().mockResolvedValue({ liked: true }),
      getReelsByHashtag: jest
        .fn()
        .mockResolvedValue({ reels: [], nextCursor: null }),
      getTrendingReels: jest
        .fn()
        .mockResolvedValue({ reels: [], nextCursor: null }),
      getReelAnalytics: jest.fn().mockResolvedValue({ viewsCount: 100 }),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReelsController],
      providers: [{ provide: ReelsService, useValue: reelsService }],
    }).compile();

    controller = module.get<ReelsController>(ReelsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('creates upload url for authenticated user', async () => {
    const result = await controller.createUploadUrl(mockUser);
    expect(reelsService.createUploadUrl).toHaveBeenCalledWith('user-1');
    expect(result.reelId).toBe('reel-1');
  });

  it('toggles bookmark', async () => {
    const result = await controller.toggleBookmark(mockUser, 'reel-1');
    expect(reelsService.toggleBookmark).toHaveBeenCalledWith(
      'user-1',
      'reel-1',
    );
    expect(result.saved).toBe(true);
  });

  it('lists saved reels', async () => {
    await controller.getSaved(mockUser, {});
    expect(reelsService.getSavedReels).toHaveBeenCalledWith(
      'user-1',
      undefined,
      10,
    );
  });

  it('lists own reels', async () => {
    await controller.getMyReels(mockUser, {});
    expect(reelsService.getMyReels).toHaveBeenCalledWith(
      'user-1',
      undefined,
      10,
    );
  });

  it('gets user reels with viewer context', async () => {
    await controller.getUserReels(mockUser, 'target-user', {});
    expect(reelsService.getUserReels).toHaveBeenCalledWith(
      'target-user',
      'user-1',
      undefined,
      10,
    );
  });

  it('toggles comment like', async () => {
    const result = await controller.toggleCommentLike(
      mockUser,
      'reel-1',
      'comment-1',
    );
    expect(reelsService.toggleCommentLike).toHaveBeenCalledWith(
      'user-1',
      'reel-1',
      'comment-1',
    );
    expect(result.liked).toBe(true);
  });

  it('gets trending reels', async () => {
    await controller.getTrending({});
    expect(reelsService.getTrendingReels).toHaveBeenCalledWith(undefined, 10);
  });

  it('gets reels by hashtag', async () => {
    await controller.getByHashtag('cooking', {});
    expect(reelsService.getReelsByHashtag).toHaveBeenCalledWith(
      'cooking',
      undefined,
      10,
    );
  });

  it('gets reel analytics', async () => {
    const result = await controller.getAnalytics(mockUser, 'reel-1');
    expect(reelsService.getReelAnalytics).toHaveBeenCalledWith(
      'user-1',
      'reel-1',
    );
    expect(result.viewsCount).toBe(100);
  });

  it('passes DTOs through to finalize', async () => {
    const dto = { rawVideoKey: 'key.mp4', caption: 'test', durationSec: 30 };
    await controller.finalizeReel(mockUser, 'reel-1', dto);
    expect(reelsService.finalizeReel).toHaveBeenCalledWith(
      'user-1',
      'reel-1',
      dto,
    );
  });

  it('passes viewer context to listComments', async () => {
    await controller.listComments(mockUser, 'reel-1', {});
    expect(reelsService.listComments).toHaveBeenCalledWith(
      'reel-1',
      undefined,
      20,
      undefined,
      'user-1',
    );
  });
});
