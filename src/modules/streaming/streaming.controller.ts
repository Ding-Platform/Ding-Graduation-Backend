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
import { StreamingService } from './streaming.service';
import { CreateStreamDto } from './dtos/create-stream.dto';
import { JwtAuthenticationGuard } from '../../common/guards/strategy.guards/jwt.guard';
import { currentUser } from '../../common/decorators/currentUser.decorator';

@UseGuards(JwtAuthenticationGuard)
@Controller('streams')
export class StreamingController {
  constructor(private readonly streamingService: StreamingService) {}

  @Post('/')
  async createStream(
    @currentUser('id') userId: string,
    @Body() dto: CreateStreamDto,
  ) {
    return this.streamingService.createStream(userId, dto);
  }

  @Get('/')
  async getActiveStreams(
    @Query('page', ParseIntPipe) page = 1,
    @Query('limit', ParseIntPipe) limit = 20,
  ) {
    return this.streamingService.getActiveStreams(page, limit);
  }

  @Get('/archived/:userId')
  async getArchivedStreams(
    @Param('userId') userId: string,
    @Query('page', ParseIntPipe) page = 1,
    @Query('limit', ParseIntPipe) limit = 20,
  ) {
    return this.streamingService.getArchivedStreams(userId, page, limit);
  }

  @Get('/:id')
  async getStreamById(@Param('id') streamId: string) {
    return this.streamingService.getStreamById(streamId);
  }

  @Post('/:id/end')
  async endStream(
    @Param('id') streamId: string,
    @currentUser('id') userId: string,
  ) {
    return this.streamingService.endStream(streamId, userId);
  }

  @Delete('/:id')
  async deleteStream(
    @Param('id') streamId: string,
    @currentUser('id') userId: string,
  ) {
    return this.streamingService.deleteStream(streamId, userId);
  }

  @Get('/:id/viewers')
  async getViewerCount(@Param('id') streamId: string) {
    const stream = await this.streamingService.getStreamById(streamId);
    return { viewerCount: stream.viewerCount, peakViewers: stream.peakViewers };
  }
}
