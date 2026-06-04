import {
  Controller,
  Get,
  Query,
  UseGuards,
  Request,
  ParseIntPipe,
} from '@nestjs/common';
import { SearchService } from './search.service';
import { SearchQueryDto } from './dto/search.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { JwtAuthenticationGuard } from '../../common/guards/strategy.guards/jwt.guard';
import { currentUser } from '../../common/decorators/currentUser.decorator';

@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async search(@Query() query: SearchQueryDto, @Request() req: { user?: { id: string } }) {
    const userId = req.user?.id;
    return await this.searchService.search(query, userId);
  }

  @Get('public')
  async searchPublic(@Query() query: SearchQueryDto) {
    return await this.searchService.search(query);
  }

  @Get('indexes')
  async createIndexes() {
    return await this.searchService.createIndexes();
  }

  @Get('discovery')
  @UseGuards(JwtAuthenticationGuard)
  async globalSearch(
    @currentUser() user: { id: string },
    @Query('q') query: string,
    @Query('type') type?: string,
    @Query('page', ParseIntPipe) page = 1,
    @Query('limit', ParseIntPipe) limit = 20,
  ) {
    return this.searchService.globalSearch(query, type, page, limit, user?.id);
  }

  @Get('trending')
  async trendingHashtags() {
    return this.searchService.trendingHashtags();
  }
}
