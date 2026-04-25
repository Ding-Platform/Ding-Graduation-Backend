import { Test, TestingModule } from '@nestjs/testing';
import { ReelsController } from './reels.controller';
import { ReelsService } from './reels.service';

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
    const result = await controller.createUploadUrl({ id: 'user-1' });
    expect(reelsService.createUploadUrl).toHaveBeenCalledWith('user-1');
    expect(result.reelId).toBe('reel-1');
  });
});
