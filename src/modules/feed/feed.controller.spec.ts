import { Test, TestingModule } from '@nestjs/testing';
import { FeedController } from './feed.controller';
import { FeedService } from './feed.service';
import { PaginationDto } from '../../common/dto/pagination.dto';

describe('FeedController', () => {
  let controller: FeedController;

  const mockFeedService = {
    getFeed: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FeedController],
      providers: [
        {
          provide: FeedService,
          useValue: mockFeedService,
        },
      ],
    }).compile();

    controller = module.get<FeedController>(FeedController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getFeed', () => {
    it('should return a paginated feed', async () => {
      const result = {
        data: [],
        total: 0,
        page: 1,
        limit: 20,
        totalPages: 0,
      };
      mockFeedService.getFeed.mockResolvedValue(result);

      const user = { id: 'user1' };
      const pagination: PaginationDto = { page: 1, limit: 20 };
      expect(await controller.getFeed(user, pagination)).toBe(result);
      expect(mockFeedService.getFeed).toHaveBeenCalledWith(
        'user1',
        'HOME',
        1,
        20,
      );
    });

    it('should use default pagination values', async () => {
      const result = {
        data: [],
        total: 0,
        page: 1,
        limit: 20,
        totalPages: 0,
      };
      mockFeedService.getFeed.mockResolvedValue(result);

      const user = { id: 'user1' };
      const pagination: PaginationDto = {};
      expect(await controller.getFeed(user, pagination)).toBe(result);
      expect(mockFeedService.getFeed).toHaveBeenCalledWith(
        'user1',
        'HOME',
        1,
        20,
      );
    });
  });
});
