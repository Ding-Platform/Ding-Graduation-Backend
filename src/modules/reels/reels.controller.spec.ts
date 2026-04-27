import { Test, TestingModule } from '@nestjs/testing';
import { ReelsController } from './reels.controller';
import { ReelsService } from './reels.service';
import { currentUserType } from '../../common/types/current-user.type';
import { UserRole } from '@prisma/client';

describe('ReelsController', () => {
  let controller: ReelsController;
  let reelsService: any;

  beforeEach(async () => {
    reelsService = {
      createUploadUrl: jest.fn().mockResolvedValue({ reelId: 'reel-1' }),
      finalizeReel: jest.fn(),
      getReelStatus: jest.fn(),
      getFeed: jest.fn(),
      getReelById: jest.fn(),
      updateReel: jest.fn(),
      deleteReel: jest.fn(),
      recordView: jest.fn(),
      toggleLike: jest.fn(),
      listComments: jest.fn(),
      addComment: jest.fn(),
      deleteComment: jest.fn(),
      shareReel: jest.fn(),
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
    const user: currentUserType = {
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
    const result = await controller.createUploadUrl(user);
    expect(reelsService.createUploadUrl).toHaveBeenCalledWith('user-1');
    expect(result.reelId).toBe('reel-1');
  });
});
