import {
  Controller,
  Get,
  Query,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { SearchService } from './search.service';
import { JwtAuthenticationGuard } from '../../common/guards/strategy.guards/jwt.guard';

@UseGuards(JwtAuthenticationGuard)
@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Get('/')
  async globalSearch(
    @Query('q') query: string,
    @Query('type') type?: string,
    @Query('page', ParseIntPipe) page = 1,
    @Query('limit', ParseIntPipe) limit = 20,
  ) {
    return this.searchService.globalSearch(query, type, page, limit);
  }

  @Get('/trending')
  async trendingHashtags() {
    return this.searchService.trendingHashtags();
  }
}
