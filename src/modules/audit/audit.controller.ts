import {
  Controller,
  Get,
  Param,
  Query,
  UseGuards,
  ParseIntPipe,
  DefaultValuePipe,
} from '@nestjs/common';
import { AuditAction } from '@prisma/client';
import { DatabaseService } from '../../configs/database/database.service';
import { JwtAuthenticationGuard } from '../../common/guards/strategy.guards/jwt.guard';
import { AdminMarketplaceGuard } from '../marketplace/guards/admin-marketplace.guard';
import { InterestService } from '../interest/interest.service';

@Controller('admin')
@UseGuards(JwtAuthenticationGuard, AdminMarketplaceGuard)
export class AuditController {
  constructor(
    private readonly prisma: DatabaseService,
    private readonly interestService: InterestService,
  ) {}

  @Get('audit-logs')
  async listAuditLogs(
    @Query('userId') userId?: string,
    @Query('action') action?: AuditAction,
    @Query('from') from?: string,
    @Query('to') to?: string,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(50), ParseIntPipe) limit = 50,
  ) {
    const where: Record<string, unknown> = {};
    if (userId) where.userId = userId;
    if (action) where.action = action;
    if (from || to) {
      where.createdAt = {
        ...(from ? { gte: new Date(from) } : {}),
        ...(to ? { lte: new Date(to) } : {}),
      };
    }

    const skip = (page - 1) * limit;
    const [data, total] = await Promise.all([
      this.prisma.userAuditLog.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      this.prisma.userAuditLog.count({ where }),
    ]);

    return {
      data,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  @Get('users/:id/insights')
  async getUserInsights(@Param('id') userId: string) {
    const [interests, sentiment, recentAudits] = await Promise.all([
      this.interestService.getTopInterests(userId, 15),
      this.prisma.userSentimentProfile.findUnique({ where: { userId } }),
      this.prisma.userAuditLog.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' },
        take: 25,
      }),
    ]);

    return {
      userId,
      interests,
      sentiment,
      recentAudits,
    };
  }
}
