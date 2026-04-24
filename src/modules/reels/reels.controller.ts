import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ShareType } from '@prisma/client';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { User } from '../../common/decorators/user.decorator';
import { currentUserType } from '../../common/types/current-user.type';
import { ReelsService } from './reels.service';

/** Parse a query-string number safely. Returns `fallback` if the value is
 *  missing, NaN, or negative. */
function safeInt(value: string | undefined, fallback: number): number {
  if (!value) return fallback;
  const n = parseInt(value, 10);
  return Number.isFinite(n) && n > 0 ? n : fallback;
}

@Controller('reels')
export class ReelsController {
  constructor(private readonly reelsService: ReelsService) {}

  @Post('upload-url')
  @UseGuards(JwtAuthGuard)
  async createUploadUrl(@User() user: currentUserType) {
    return this.reelsService.createUploadUrl(user.id);
  }

  @Post(':id/finalize')
  @UseGuards(JwtAuthGuard)
  async finalizeReel(
    @User() user: currentUserType,
    @Param('id') id: string,
    @Body()
    body: {
      rawVideoKey: string;
      caption?: string;
      hashtags?: string[];
      audioTrackId?: string;
      audioOffsetMs?: number;
      durationSec?: number;
      width?: number;
      height?: number;
      fileSizeBytes?: number;
    },
  ) {
    return this.reelsService.finalizeReel(user.id, id, body);
  }

  @Get(':id/status')
  @UseGuards(JwtAuthGuard)
  async getStatus(@Param('id') id: string) {
    return this.reelsService.getReelStatus(id);
  }

  @Get('feed')
  @UseGuards(JwtAuthGuard)
  async getFeed(
    @User() user: currentUserType,
    @Query('cursor') cursor?: string,
    @Query('limit') limit?: string,
  ) {
    return this.reelsService.getFeed(user.id, cursor, safeInt(limit, 10));
  }

  @Get(':id')
  async getReel(@Param('id') id: string) {
    return this.reelsService.getReelById(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async updateReel(
    @User() user: currentUserType,
    @Param('id') id: string,
    @Body()
    body: {
      caption?: string;
      hashtags?: string[];
      audioTrackId?: string | null;
      audioOffsetMs?: number;
      isPublic?: boolean;
    },
  ) {
    return this.reelsService.updateReel(user.id, id, body);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async deleteReel(@User() user: currentUserType, @Param('id') id: string) {
    return this.reelsService.deleteReel(user.id, id);
  }

  @Post(':id/view')
  async recordView(
    @Param('id') id: string,
    @Body() body: { sessionId: string; watchPct?: number; viewerId?: string },
  ) {
    return this.reelsService.recordView(id, body);
  }

  @Post(':id/like')
  @UseGuards(JwtAuthGuard)
  async toggleLike(@User() user: currentUserType, @Param('id') id: string) {
    return this.reelsService.toggleLike(user.id, id);
  }

  @Get(':id/comments')
  async listComments(
    @Param('id') id: string,
    @Query('cursor') cursor?: string,
    @Query('limit') limit?: string,
  ) {
    return this.reelsService.listComments(id, cursor, safeInt(limit, 20));
  }

  @Get(':id/comments/:cid/replies')
  async listReplies(
    @Param('id') id: string,
    @Param('cid') commentId: string,
    @Query('cursor') cursor?: string,
    @Query('limit') limit?: string,
  ) {
    return this.reelsService.listComments(
      id,
      cursor,
      safeInt(limit, 20),
      commentId,
    );
  }

  @Post(':id/comments')
  @UseGuards(JwtAuthGuard)
  async addComment(
    @User() user: currentUserType,
    @Param('id') id: string,
    @Body() body: { content: string; parentId?: string },
  ) {
    return this.reelsService.addComment(user.id, id, body);
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

  @Post(':id/share')
  @UseGuards(JwtAuthGuard)
  async shareReel(
    @User() user: currentUserType,
    @Param('id') id: string,
    @Body() body: { shareType: ShareType; targetUserId?: string },
  ) {
    return this.reelsService.shareReel(user.id, id, body);
  }
}
