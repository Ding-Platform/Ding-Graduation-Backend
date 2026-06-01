import { Injectable, Logger } from '@nestjs/common';
import { DatabaseService } from '../../configs/database/database.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class ActivityService {
  private readonly logger = new Logger(ActivityService.name);

  constructor(private readonly prisma: DatabaseService) {}

  /**
   * Non-blocking log action
   */
  logActivity(
    userId: string,
    actionType: string,
    entityId?: string,
    entityType?: string,
    metadata?: Prisma.JsonValue,
  ) {
    if (!userId) return;

    // Fire and forget
    this.prisma.activityLog
      .create({
        data: {
          userId,
          actionType,
          entityId,
          entityType,
          metadata: metadata || Prisma.JsonNull,
        },
      })
      .catch((error) => {
        this.logger.error(`Failed to log activity for user ${userId}`, error);
      });
  }

  async getUserActivity(userId: string, page = 1, limit = 20) {
    const skip = (page - 1) * limit;
    const [data, total] = await Promise.all([
      this.prisma.activityLog.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      this.prisma.activityLog.count({ where: { userId } }),
    ]);

    return {
      data,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async deleteActivity(userId: string, logId: string) {
    await this.prisma.activityLog.deleteMany({
      where: {
        id: logId,
        userId,
      },
    });
    return { deleted: true };
  }

  async clearHistory(userId: string) {
    await this.prisma.activityLog.deleteMany({
      where: { userId },
    });
    return { cleared: true };
  }
}
