import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CallService } from './call.service';

@Controller('calls')
@UseGuards(JwtAuthGuard)
export class CallController {
  constructor(private readonly callService: CallService) {}

  @Get(':roomId/screen-share')
  async getScreenShareState(@Param('roomId') roomId: string) {
    return this.callService.getScreenShareState(roomId);
  }

  @Get(':roomId/quality-hints')
  async getQualityHints(@Param('roomId') roomId: string) {
    return this.callService.getQualityHints(roomId);
  }
}
