import { Controller, Get, Query, UseGuards, Request } from '@nestjs/common';
import { SearchService } from './search.service';
import { SearchQueryDto, SearchType } from './dto/search.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async search(@Query() query: SearchQueryDto, @Request() req: any) {
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
}
