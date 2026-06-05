import {
  Controller,
  Get,
  Query,
  UseGuards,
  HttpCode,
  HttpStatus,
  Post,
  Param,
} from '@nestjs/common';
import { FeedService } from './feed.service';
import { JwtAuthenticationGuard } from '../../common/guards/strategy.guards/jwt.guard';
import { currentUser } from '../../common/decorators/currentUser.decorator';
import { FeedResponseDto } from './dtos/response/feed.response';
import { Serialize } from '../../common/interceptors/serialize.interceptor';
import { PaginationDto } from '../../common/dto/pagination.dto';

@UseGuards(JwtAuthenticationGuard)
@Controller('feed')
export class FeedController {
  constructor(private readonly feedService: FeedService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @Serialize(FeedResponseDto)
  async getFeed(
    @currentUser() user: any,
    @Query() pagination: PaginationDto,
    @Query('type') type: 'HOME' | 'FOLLOWING' | 'EXPLORE' = 'HOME',
  ) {
    const pageNum = pagination.page ?? 1;
    const limitNum = pagination.limit ?? 20;
    return this.feedService.getFeed(user.id, type, pageNum, limitNum);
  }

  @Post(':postId/view')
  @HttpCode(HttpStatus.OK)
  async recordPostView(
    @currentUser() user: any,
    @Param('postId') postId: string,
  ) {
    return this.feedService.recordPostView(user.id, postId);
  }
}
