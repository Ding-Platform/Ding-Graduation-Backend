import { Controller, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ReelsService } from './reels.service';

@Controller('audio-tracks')
export class AudioTracksController {
  constructor(private readonly reelsService: ReelsService) {}

  @Get()
  async listTracks(@Query('genre') genre?: string, @Query('search') search?: string) {
    return this.reelsService.listAudioTracks(genre, search);
  }

  @Get('trending')
  async getTrending() {
    return this.reelsService.getTrendingAudioTracks();
  }

  @Get(':id')
  async getTrack(@Param('id') id: string) {
    return this.reelsService.getAudioTrackById(id);
  }

  @Post(':id/use')
  @UseGuards(JwtAuthGuard)
  async registerUse(@Param('id') id: string) {
    return this.reelsService.registerAudioTrackUse(id);
  }
}
