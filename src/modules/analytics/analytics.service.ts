import { Injectable, BadRequestException } from '@nestjs/common';
import { DatabaseService } from '../../configs/database/database.service';
import { AnalyticsEventType, Prisma } from '@prisma/client';
import { ERROR_MESSAGES } from '../../common/constants/error-messages.constant';
import { AnalyticsEventInputDto } from './dtos/log-events.dto';

@Injectable()
export class AnalyticsService {
  constructor(private readonly prisma: DatabaseService) {}

  async logEvents(userId: string, events: AnalyticsEventInputDto[]) {
    if (events.length > 100) {
      throw new BadRequestException(ERROR_MESSAGES.ANALYTICS_BATCH_TOO_LARGE);
    }

    const validEventTypes = new Set<string>(Object.values(AnalyticsEventType));
    for (const event of events) {
      if (!validEventTypes.has(event.eventType)) {
        throw new BadRequestException(
          ERROR_MESSAGES.ANALYTICS_INVALID_EVENT_TYPE,
        );
      }
    }

    const data = events.map((e) => ({
      userId,
      eventType: e.eventType,
      targetId: e.targetId ?? null,
      targetType: e.targetType ?? null,
      metadata: (e.metadata ?? {}) as Prisma.InputJsonValue,
      sessionId: e.sessionId ?? null,
    }));

    await this.prisma.analyticsEvent.createMany({
      data,
    });

    return { logged: data.length };
  }

  async getEvents(type?: AnalyticsEventType, page = 1, limit = 50) {
    const skip = (page - 1) * limit;

    const where = type ? { eventType: type } : {};

    const [events, total] = await Promise.all([
      this.prisma.analyticsEvent.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      this.prisma.analyticsEvent.count({ where }),
    ]);

    return {
      data: events,
      meta: { page, limit, total, totalPages: Math.ceil(total / limit) },
    };
  }
}
