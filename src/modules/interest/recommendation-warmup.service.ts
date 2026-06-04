import { Injectable, Logger, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { DatabaseService } from '../../configs/database/database.service';
import { RecommendationService } from './recommendation.service';

const WARMUP_INTERVAL_MS = 15 * 60 * 1000;

@Injectable()
export class RecommendationWarmupService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(RecommendationWarmupService.name);
  private interval?: NodeJS.Timeout;

  constructor(
    private readonly prisma: DatabaseService,
    private readonly recommendationService: RecommendationService,
  ) {}

  onModuleInit() {
    this.interval = setInterval(() => {
      void this.warmupActiveUsers();
    }, WARMUP_INTERVAL_MS);
  }

  onModuleDestroy() {
    if (this.interval) clearInterval(this.interval);
  }

  async warmupActiveUsers() {
    const since = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    const activeUsers = await this.prisma.userAuditLog.findMany({
      where: { createdAt: { gte: since } },
      select: { userId: true },
      distinct: ['userId'],
      take: 100,
    });

    for (const { userId } of activeUsers) {
      try {
        await this.recommendationService.warmupUserCache(userId);
      } catch (error) {
        this.logger.warn({ err: error, userId }, 'Recommendation warmup failed');
      }
    }
  }
}
