import {
  Controller,
  Get,
  Query,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { SearchService } from './search.service';
import { JwtAuthenticationGuard } from '../../common/guards/strategy.guards/jwt.guard';
import { currentUser } from '../../common/decorators/currentUser.decorator';

@UseGuards(JwtAuthenticationGuard)
@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Get('/')
  async globalSearch(
    @currentUser() user: { id: string },
    @Query('q') query: string,
    @Query('type') type?: string,
    @Query('page', ParseIntPipe) page = 1,
    @Query('limit', ParseIntPipe) limit = 20,
  ) {
    return this.searchService.globalSearch(query, type, page, limit, user?.id);
  }

  @Get('/trending')
  async trendingHashtags() {
    return this.searchService.trendingHashtags();
  }
}
