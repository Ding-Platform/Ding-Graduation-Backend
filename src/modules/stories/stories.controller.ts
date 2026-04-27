import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { StoriesService } from './stories.service';
import { CreateStoryDto } from './dtos/create-story.dto';
import { JwtAuthenticationGuard } from '../../common/guards/strategy.guards/jwt.guard';
import { currentUser } from '../../common/decorators/currentUser.decorator';

@UseGuards(JwtAuthenticationGuard)
@Controller('stories')
export class StoriesController {
  constructor(private readonly storiesService: StoriesService) {}

  /** POST /stories — create a new story */
  @Post('/')
  async createStory(
    @currentUser('id') userId: string,
    @Body() dto: CreateStoryDto,
  ) {
    return this.storiesService.createStory(userId, dto);
  }

  /** GET /stories/feed — active stories feed grouped by user */
  @Get('/feed')
  async getStoriesFeed(
    @currentUser('id') userId: string,
    @Query('page', ParseIntPipe) page = 1,
    @Query('limit', ParseIntPipe) limit = 30,
  ) {
    return this.storiesService.getStoriesFeed(userId, page, limit);
  }

  /** GET /stories/user/:userId — stories ring for a specific user's profile */
  @Get('/user/:userId')
  async getUserStories(
    @Param('userId') targetUserId: string,
    @currentUser('id') requesterId: string,
  ) {
    return this.storiesService.getUserStories(targetUserId, requesterId);
  }

  /** GET /stories/:id — get single story */
  @Get('/:id')
  async getStory(
    @Param('id') storyId: string,
    @currentUser('id') userId: string,
  ) {
    return this.storiesService.getStoryById(storyId, userId);
  }

  /** DELETE /stories/:id — soft delete own story */
  @Delete('/:id')
  async deleteStory(
    @Param('id') storyId: string,
    @currentUser('id') userId: string,
  ) {
    return this.storiesService.deleteStory(storyId, userId);
  }

  /** POST /stories/:id/view — record a view */
  @Post('/:id/view')
  async recordView(
    @Param('id') storyId: string,
    @currentUser('id') userId: string,
  ) {
    return this.storiesService.recordView(storyId, userId);
  }

  /** GET /stories/:id/viewers — list viewers (owner only) */
  @Get('/:id/viewers')
  async getViewers(
    @Param('id') storyId: string,
    @currentUser('id') userId: string,
    @Query('page', ParseIntPipe) page = 1,
    @Query('limit', ParseIntPipe) limit = 20,
  ) {
    return this.storiesService.getViewers(storyId, userId, page, limit);
  }

  /** POST /stories/:id/highlight — add own story to highlights */
  @Post('/:id/highlight')
  async addToHighlights(
    @Param('id') storyId: string,
    @currentUser('id') userId: string,
  ) {
    return this.storiesService.addToHighlights(storyId, userId);
  }

  /** DELETE /stories/:id/highlight — remove own story from highlights */
  @Delete('/:id/highlight')
  async removeFromHighlights(
    @Param('id') storyId: string,
    @currentUser('id') userId: string,
  ) {
    return this.storiesService.removeFromHighlights(storyId, userId);
  }
}
