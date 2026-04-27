import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { PagesService } from './pages.service';
import { CreatePageDto } from './dtos/create-page.dto';
import { JwtAuthenticationGuard } from '../../common/guards/strategy.guards/jwt.guard';
import { currentUser } from '../../common/decorators/currentUser.decorator';

@UseGuards(JwtAuthenticationGuard)
@Controller('pages')
export class PagesController {
  constructor(private readonly pagesService: PagesService) {}

  @Post('/')
  async createPage(
    @currentUser('id') userId: string,
    @Body() dto: CreatePageDto,
  ) {
    return this.pagesService.createPage(userId, dto);
  }

  @Get('/:id')
  async getPageById(@Param('id') pageId: string) {
    return this.pagesService.getPageById(pageId);
  }

  @Put('/:id')
  async updatePage(
    @Param('id') pageId: string,
    @currentUser('id') userId: string,
    @Body() dto: Partial<CreatePageDto>,
  ) {
    return this.pagesService.updatePage(pageId, userId, dto);
  }

  @Post('/:id/follow')
  async toggleFollow(
    @Param('id') pageId: string,
    @currentUser('id') userId: string,
  ) {
    return this.pagesService.toggleFollow(pageId, userId);
  }
}
