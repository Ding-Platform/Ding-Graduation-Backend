import { Injectable, Logger } from '@nestjs/common';
import { DatabaseService } from '../../configs/database/database.service';

@Injectable()
export class InterestService {
  private readonly logger = new Logger(InterestService.name);

  constructor(private readonly prisma: DatabaseService) {}

  async recordInterest(userId: string, topics: string[], weight: number = 1.0) {
    if (!topics || topics.length === 0) return;

    // Deduplicate and normalize
    const uniqueTopics = [...new Set(topics.map((t) => t.toLowerCase()))];

    try {
      await Promise.all(
        uniqueTopics.map((topic) =>
          this.prisma.userInterest.upsert({
            where: {
              userId_topic: {
                userId,
                topic,
              },
            },
            create: {
              userId,
              topic,
              score: weight,
            },
            update: {
              score: { increment: weight },
              lastUpdated: new Date(),
            },
          }),
        ),
      );
    } catch (error) {
      this.logger.error(
        `Failed to record interest for user ${userId}: ${error.message}`,
      );
    }
  }

  async getTopInterests(userId: string, limit = 10) {
    const interests = await this.prisma.userInterest.findMany({
      where: { userId },
      orderBy: { score: 'desc' },
      take: limit,
    });
    return interests;
  }

  async processDwellTime(
    userId: string,
    contentId: string,
    contentType: 'POST' | 'REEL',
    durationSec: number,
  ) {
    // Only track meaningful dwell time (e.g. > 5 seconds)
    if (durationSec < 5)
      return { recorded: false, reason: 'Duration too short' };

    let tags: string[] = [];
    if (contentType === 'POST') {
      const post = await this.prisma.post.findUnique({
        where: { id: contentId },
        select: { hashtags: true, categories: true },
      });
      if (post) tags = [...(post.hashtags || []), ...(post.categories || [])];
    } else {
      const reel = await this.prisma.reel.findUnique({
        where: { id: contentId },
        select: { hashtags: true, categories: true },
      });
      if (reel) tags = [...(reel.hashtags || []), ...(reel.categories || [])];
    }

    if (tags.length === 0)
      return { recorded: false, reason: 'No tags on content' };

    // Calculate weight: 5-10s = 0.5 points, 10-20s = 1.0 points, >20s = 1.5 points
    let weight = 0.5;
    if (durationSec >= 20) weight = 1.5;
    else if (durationSec >= 10) weight = 1.0;

    await this.recordInterest(userId, tags, weight);
    return { recorded: true, weight };
  }
}
