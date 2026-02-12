import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  UseGuards,
  Query,
} from '@nestjs/common';
import { ModerationService } from './moderation.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { User } from '../../common/decorators/user.decorator';
import { ReportReason, ReportStatus } from '@prisma/client';

@Controller('moderation')
@UseGuards(JwtAuthGuard)
export class ModerationController {
  constructor(private readonly moderationService: ModerationService) {}

  @Post('report')
  async createReport(
    @User() user: any,
    @Body()
    dto: {
      targetId: string;
      targetType: 'USER' | 'POST' | 'COMMENT';
      reason: ReportReason;
      description?: string;
    },
  ) {
    return this.moderationService.createReport(
      user.id,
      dto.targetId,
      dto.targetType,
      dto.reason,
      dto.description,
    );
  }

  // Admin only endpoints - In real app, check for ADMIN role
  @Get('reports')
  async getReports(@Query('status') status?: ReportStatus) {
    return this.moderationService.getReports(status);
  }

  @Post('dismiss/:id')
  async dismissReport(
    @Param('id') id: string,
    @Body('action') action?: string,
  ) {
    return this.moderationService.dismissReport(id, action);
  }

  @Post('ban/:userId')
  async banUser(
    @User() admin: any,
    @Param('userId') userId: string,
    @Body('reason') reason: string,
  ) {
    return this.moderationService.banUser(admin.id, userId, reason);
  }
}
