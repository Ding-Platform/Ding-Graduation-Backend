import {
  Injectable,
  HttpStatus,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { DatabaseService } from '../../configs/database/database.service';
import { GenericHttpException } from '../../common/application/exceptions/generic-http-exception';
import { ERROR_MESSAGES } from '../../common/constants/error-messages.constant';
import { NotificationService } from '../notification/notification.service';
import { CreateStoryDto } from './dtos/create-story.dto';
import { StoryPrivacy } from '@prisma/client';

@Injectable()
export class StoriesService {
  private readonly STORY_EXPIRY_HOURS: number;

  constructor(
    private readonly prisma: DatabaseService,
    private readonly notificationService: NotificationService,
  ) {
    this.STORY_EXPIRY_HOURS = parseInt(
      process.env.STORY_EXPIRY_HOURS || '24',
      10,
    );
  }

  /**
   * Creates a new story. expiresAt is set to now + STORY_EXPIRY_HOURS.
   * Highlights are not affected by expiry (isHighlight=true).
   */
  async createStory(userId: string, dto: CreateStoryDto) {
    const expiresAt = new Date(
      Date.now() + this.STORY_EXPIRY_HOURS * 60 * 60 * 1000,
    );

    try {
      const story = await this.prisma.story.create({
        data: {
          userId,
          mediaUrl: dto.mediaUrl,
          thumbnailUrl: dto.thumbnailUrl,
          caption: dto.caption,
          privacy: dto.privacy ?? StoryPrivacy.FRIENDS,
          expiresAt,
        },
        include: {
          user: { select: { id: true, name: true, image: true } },
        },
      });

      return story;
    } catch {
      throw GenericHttpException.createLocalized(
        ERROR_MESSAGES.STORY_CREATION_FAILED,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * Returns active (non-expired, non-deleted) stories from friends and own stories,
   * grouped by user. Respects StoryPrivacy.
   */
  async getStoriesFeed(userId: string, page = 1, limit = 30) {
    const skip = (page - 1) * limit;
    const now = new Date();

    // Get IDs of people this user follows / is friends with
    const [following, friends] = await Promise.all([
      this.prisma.follow.findMany({
        where: { followerId: userId },
        select: { followingId: true },
      }),
      this.prisma.friendship.findMany({
        where: {
          OR: [
            { requesterId: userId, status: 'ACCEPTED' },
            { recipientId: userId, status: 'ACCEPTED' },
          ],
        },
        select: { requesterId: true, recipientId: true },
      }),
    ]);

    const followingIds = following.map((f) => f.followingId);
    const friendIds = friends.flatMap((f) =>
      f.requesterId === userId ? [f.recipientId] : [f.requesterId],
    );
    const connectedIds = [...new Set([...followingIds, ...friendIds, userId])];

    const stories = await this.prisma.story.findMany({
      where: {
        userId: { in: connectedIds },
        expiresAt: { gt: now },
        deletedAt: null,
        OR: [
          { privacy: StoryPrivacy.PUBLIC },
          { userId },
          {
            AND: [
              { privacy: StoryPrivacy.FRIENDS },
              { userId: { in: friendIds } },
            ],
          },
        ],
      },
      include: {
        user: { select: { id: true, name: true, image: true } },
        _count: { select: { views: true } },
      },
      orderBy: { createdAt: 'desc' },
      skip,
      take: limit,
    });

    const total = await this.prisma.story.count({
      where: {
        userId: { in: connectedIds },
        expiresAt: { gt: now },
        deletedAt: null,
      },
    });

    return {
      data: stories,
      meta: { page, limit, total, totalPages: Math.ceil(total / limit) },
    };
  }

  async getStoryById(storyId: string, requesterId: string) {
    const now = new Date();
    const story = await this.prisma.story.findFirst({
      where: { id: storyId, deletedAt: null },
      include: {
        user: { select: { id: true, name: true, image: true } },
        _count: { select: { views: true } },
      },
    });

    if (!story) {
      throw GenericHttpException.createLocalized(
        ERROR_MESSAGES.STORY_NOT_FOUND,
        HttpStatus.NOT_FOUND,
      );
    }

    // Check expiry (highlights are exempt)
    if (
      !story.isHighlight &&
      story.expiresAt < now &&
      story.userId !== requesterId
    ) {
      throw GenericHttpException.createLocalized(
        ERROR_MESSAGES.STORY_EXPIRED,
        HttpStatus.GONE,
      );
    }

    return story;
  }

  async deleteStory(storyId: string, userId: string) {
    const story = await this.prisma.story.findFirst({
      where: { id: storyId, deletedAt: null },
    });

    if (!story) {
      throw GenericHttpException.createLocalized(
        ERROR_MESSAGES.STORY_NOT_FOUND,
        HttpStatus.NOT_FOUND,
      );
    }

    if (story.userId !== userId) {
      throw new ForbiddenException(ERROR_MESSAGES.STORY_UNAUTHORIZED);
    }

    await this.prisma.story.update({
      where: { id: storyId },
      data: { deletedAt: new Date() },
    });

    return { deleted: true };
  }

  /**
   * Records a story view. Idempotent — calling twice for same viewer is a no-op.
   */
  async recordView(storyId: string, viewerId: string) {
    const now = new Date();
    const story = await this.prisma.story.findFirst({
      where: { id: storyId, deletedAt: null },
    });

    if (!story) {
      throw new NotFoundException(ERROR_MESSAGES.STORY_NOT_FOUND);
    }

    if (!story.isHighlight && story.expiresAt < now) {
      throw GenericHttpException.createLocalized(
        ERROR_MESSAGES.STORY_EXPIRED,
        HttpStatus.GONE,
      );
    }

    // Self-view does not count
    if (story.userId === viewerId) return { counted: false };

    // Upsert — storyId+viewerId is unique, ignore conflict
    const existing = await this.prisma.storyView.findUnique({
      where: { storyId_viewerId: { storyId, viewerId } },
    });

    if (existing) return { counted: false };

    await this.prisma.$transaction([
      this.prisma.storyView.create({ data: { storyId, viewerId } }),
      this.prisma.story.update({
        where: { id: storyId },
        data: { viewsCount: { increment: 1 } },
      }),
    ]);

    return { counted: true };
  }

  /**
   * Returns list of viewers for a story (owner only).
   */
  async getViewers(storyId: string, requesterId: string, page = 1, limit = 20) {
    const story = await this.prisma.story.findFirst({
      where: { id: storyId, deletedAt: null },
    });

    if (!story) {
      throw new NotFoundException(ERROR_MESSAGES.STORY_NOT_FOUND);
    }

    if (story.userId !== requesterId) {
      throw new ForbiddenException(ERROR_MESSAGES.STORY_UNAUTHORIZED);
    }

    const skip = (page - 1) * limit;

    const [views, total] = await Promise.all([
      this.prisma.storyView.findMany({
        where: { storyId },
        include: { viewer: { select: { id: true, name: true, image: true } } },
        orderBy: { viewedAt: 'desc' },
        skip,
        take: limit,
      }),
      this.prisma.storyView.count({ where: { storyId } }),
    ]);

    return {
      data: views.map((v) => ({ ...v.viewer, viewedAt: v.viewedAt })),
      meta: { page, limit, total, totalPages: Math.ceil(total / limit) },
    };
  }

  /**
   * Get all active stories for a specific user (for profile ring display).
   */
  async getUserStories(targetUserId: string, requesterId: string) {
    const now = new Date();
    const stories = await this.prisma.story.findMany({
      where: {
        userId: targetUserId,
        deletedAt: null,
        OR: [
          { isHighlight: true },
          {
            AND: [{ isHighlight: false }, { expiresAt: { gt: now } }],
          },
        ],
      },
      include: {
        user: { select: { id: true, name: true, image: true } },
        _count: { select: { views: true } },
      },
      orderBy: { createdAt: 'desc' },
    });

    // If viewing own stories, include view count; otherwise not
    if (targetUserId !== requesterId) {
      return stories.map((s) => ({ ...s, viewsCount: undefined }));
    }

    return stories;
  }

  async addToHighlights(storyId: string, userId: string) {
    const story = await this.prisma.story.findFirst({
      where: { id: storyId, deletedAt: null },
    });

    if (!story) {
      throw new NotFoundException(ERROR_MESSAGES.STORY_NOT_FOUND);
    }

    if (story.userId !== userId) {
      throw new ForbiddenException(ERROR_MESSAGES.STORY_UNAUTHORIZED);
    }

    if (story.isHighlight) {
      return story;
    }

    return this.prisma.story.update({
      where: { id: storyId },
      data: { isHighlight: true },
    });
  }

  async removeFromHighlights(storyId: string, userId: string) {
    const story = await this.prisma.story.findFirst({
      where: { id: storyId, deletedAt: null },
    });

    if (!story) {
      throw new NotFoundException(ERROR_MESSAGES.STORY_NOT_FOUND);
    }

    if (story.userId !== userId) {
      throw new ForbiddenException(ERROR_MESSAGES.STORY_UNAUTHORIZED);
    }

    if (!story.isHighlight) {
      return story;
    }

    const now = Date.now();
    const nextExpiry =
      story.expiresAt.getTime() > now
        ? story.expiresAt
        : new Date(now + this.STORY_EXPIRY_HOURS * 60 * 60 * 1000);

    return this.prisma.story.update({
      where: { id: storyId },
      data: {
        isHighlight: false,
        expiresAt: nextExpiry,
      },
    });
  }
}
