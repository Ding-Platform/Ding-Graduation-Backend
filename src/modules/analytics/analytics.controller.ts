import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { AnalyticsService } from './analytics.service';
import { JwtAuthenticationGuard } from '../../common/guards/strategy.guards/jwt.guard';
import { currentUser } from '../../common/decorators/currentUser.decorator';
import { AnalyticsEventType } from '@prisma/client';
import { LogAnalyticsEventsDto } from './dtos/log-events.dto';

@UseGuards(JwtAuthenticationGuard)
@Controller('analytics')
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Post('/events')
  async logEvents(
    @currentUser('id') userId: string,
    @Body() dto: LogAnalyticsEventsDto,
  ) {
    return this.analyticsService.logEvents(userId, dto.events ?? []);
  }

  @Get('/events')
  async getEvents(
    @Query('type') type?: AnalyticsEventType,
    @Query('page', ParseIntPipe) page = 1,
    @Query('limit', ParseIntPipe) limit = 50,
  ) {
    // In a real app, this should have an @AdminGuard
    return this.analyticsService.getEvents(type, page, limit);
  }
}
