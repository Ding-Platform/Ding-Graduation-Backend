import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Req,
  Query,
  UseGuards,
} from '@nestjs/common';
import type { Request } from 'express';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { User } from '../../common/decorators/user.decorator';
import { currentUserType } from '../../common/types/current-user.type';
import { ReelsService } from './reels.service';
import { CursorPaginationDto } from '../../common/dto/cursor-pagination.dto';
import { FinalizeReelDto } from './dtos/finalize-reel.dto';
import { UpdateReelDto } from './dtos/update-reel.dto';
import { AddCommentDto } from './dtos/add-comment.dto';
import { EditCommentDto } from './dtos/edit-comment.dto';
import { RecordViewDto } from './dtos/record-view.dto';
import { ShareReelDto } from './dtos/share-reel.dto';

@Controller('reels')
export class ReelsController {
  constructor(private readonly reelsService: ReelsService) {}

  // ─────────────────────────────────────────────
  // Upload & Lifecycle
  // ─────────────────────────────────────────────

  @Post('upload-url')
  @UseGuards(JwtAuthGuard)
  async createUploadUrl(@User() user: currentUserType) {
    return this.reelsService.createUploadUrl(user.id);
  }

  @Put('raw/:id')
  async uploadRawVideo(
    @Param('id') id: string,
    @Req() req: Request,
  ) {
    return this.reelsService.handleRawUpload(id, req);
  }

  @Post(':id/finalize')
  @UseGuards(JwtAuthGuard)
  async finalizeReel(
    @User() user: currentUserType,
    @Param('id') id: string,
    @Body() body: FinalizeReelDto,
  ) {
    return this.reelsService.finalizeReel(user.id, id, body);
  }

  @Get(':id/status')
  @UseGuards(JwtAuthGuard)
  async getStatus(@Param('id') id: string) {
    return this.reelsService.getReelStatus(id);
  }

  // ─────────────────────────────────────────────
  // Discovery & Feed  (static routes BEFORE :id)
  // ─────────────────────────────────────────────

  @Get('feed')
  @UseGuards(JwtAuthGuard)
  async getFeed(
    @User() user: currentUserType,
    @Query() pagination: CursorPaginationDto,
  ) {
    return this.reelsService.getFeed(
      user.id,
      pagination.cursor,
      pagination.limit ?? 10,
    );
  }

  @Get('trending')
  async getTrending(@Query() pagination: CursorPaginationDto) {
    return this.reelsService.getTrendingReels(
      pagination.cursor,
      pagination.limit ?? 10,
    );
  }

  @Get('hashtag/:tag')
  async getByHashtag(
    @Param('tag') tag: string,
    @Query() pagination: CursorPaginationDto,
  ) {
    return this.reelsService.getReelsByHashtag(
      tag,
      pagination.cursor,
      pagination.limit ?? 10,
    );
  }

  @Get('saved')
  @UseGuards(JwtAuthGuard)
  async getSaved(
    @User() user: currentUserType,
    @Query() pagination: CursorPaginationDto,
  ) {
    return this.reelsService.getSavedReels(
      user.id,
      pagination.cursor,
      pagination.limit ?? 10,
    );
  }

  @Get('my')
  @UseGuards(JwtAuthGuard)
  async getMyReels(
    @User() user: currentUserType,
    @Query() pagination: CursorPaginationDto,
  ) {
    return this.reelsService.getMyReels(
      user.id,
      pagination.cursor,
      pagination.limit ?? 10,
    );
  }

  @Get('liked')
  @UseGuards(JwtAuthGuard)
  async getLikedReels(
    @User() user: currentUserType,
    @Query() pagination: CursorPaginationDto,
  ) {
    return this.reelsService.getLikedReels(
      user.id,
      pagination.cursor,
      pagination.limit ?? 10,
    );
  }

  @Get('saved')
  @UseGuards(JwtAuthGuard)
  async getSavedReels(
    @User() user: currentUserType,
    @Query() pagination: CursorPaginationDto,
  ) {
    return this.reelsService.getSavedReels(
      user.id,
      pagination.cursor,
      pagination.limit ?? 10,
    );
  }

  @Get('user/:userId')
  @UseGuards(JwtAuthGuard)
  async getUserReels(
    @User() user: currentUserType,
    @Param('userId') userId: string,
    @Query() pagination: CursorPaginationDto,
  ) {
    return this.reelsService.getUserReels(
      userId,
      user.id,
      pagination.cursor,
      pagination.limit ?? 10,
    );
  }

  // ─────────────────────────────────────────────
  // Single Reel CRUD  (dynamic :id routes)
  // ─────────────────────────────────────────────

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async getReel(@User() user: currentUserType, @Param('id') id: string) {
    return this.reelsService.getReelById(id, user.id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async updateReel(
    @User() user: currentUserType,
    @Param('id') id: string,
    @Body() body: UpdateReelDto,
  ) {
    return this.reelsService.updateReel(user.id, id, body);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async deleteReel(@User() user: currentUserType, @Param('id') id: string) {
    return this.reelsService.deleteReel(user.id, id);
  }

  // ─────────────────────────────────────────────
  // Engagement: Views, Likes, Bookmarks
  // ─────────────────────────────────────────────

  @Post(':id/view')
  async recordView(@Param('id') id: string, @Body() body: RecordViewDto) {
    return this.reelsService.recordView(id, body);
  }

  @Post(':id/like')
  @UseGuards(JwtAuthGuard)
  async toggleLike(@User() user: currentUserType, @Param('id') id: string) {
    return this.reelsService.toggleLike(user.id, id);
  }

  @Post(':id/bookmark')
  @UseGuards(JwtAuthGuard)
  async toggleBookmark(@User() user: currentUserType, @Param('id') id: string) {
    return this.reelsService.toggleBookmark(user.id, id);
  }

  // ─────────────────────────────────────────────
  // Comments & Replies
  // ─────────────────────────────────────────────

  @Get(':id/comments')
  @UseGuards(JwtAuthGuard)
  async listComments(
    @User() user: currentUserType,
    @Param('id') id: string,
    @Query() pagination: CursorPaginationDto,
  ) {
    return this.reelsService.listComments(
      id,
      pagination.cursor,
      pagination.limit ?? 20,
      undefined,
      user.id,
    );
  }

  @Get(':id/comments/:cid/replies')
  @UseGuards(JwtAuthGuard)
  async listReplies(
    @User() user: currentUserType,
    @Param('id') id: string,
    @Param('cid') commentId: string,
    @Query() pagination: CursorPaginationDto,
  ) {
    return this.reelsService.listComments(
      id,
      pagination.cursor,
      pagination.limit ?? 20,
      commentId,
      user.id,
    );
  }

  @Post(':id/comments')
  @UseGuards(JwtAuthGuard)
  async addComment(
    @User() user: currentUserType,
    @Param('id') id: string,
    @Body() body: AddCommentDto,
  ) {
    return this.reelsService.addComment(user.id, id, body);
  }

  @Patch(':id/comments/:cid')
  @UseGuards(JwtAuthGuard)
  async editComment(
    @User() user: currentUserType,
    @Param('id') id: string,
    @Param('cid') cid: string,
    @Body() body: EditCommentDto,
  ) {
    return this.reelsService.editComment(user.id, id, cid, body.content);
  }

  @Delete(':id/comments/:cid')
  @UseGuards(JwtAuthGuard)
  async deleteComment(
    @User() user: currentUserType,
    @Param('id') id: string,
    @Param('cid') cid: string,
  ) {
    return this.reelsService.deleteComment(user.id, id, cid);
  }

  @Post(':id/comments/:cid/like')
  @UseGuards(JwtAuthGuard)
  async toggleCommentLike(
    @User() user: currentUserType,
    @Param('id') id: string,
    @Param('cid') cid: string,
  ) {
    return this.reelsService.toggleCommentLike(user.id, id, cid);
  }

  // ─────────────────────────────────────────────
  // Sharing & Analytics
  // ─────────────────────────────────────────────

  @Post(':id/share')
  @UseGuards(JwtAuthGuard)
  async shareReel(
    @User() user: currentUserType,
    @Param('id') id: string,
    @Body() body: ShareReelDto,
  ) {
    return this.reelsService.shareReel(user.id, id, body);
  }

  @Get(':id/analytics')
  @UseGuards(JwtAuthGuard)
  async getAnalytics(@User() user: currentUserType, @Param('id') id: string) {
    return this.reelsService.getReelAnalytics(user.id, id);
  }
}
