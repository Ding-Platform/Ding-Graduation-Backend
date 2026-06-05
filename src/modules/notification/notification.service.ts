import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../../configs/database/database.service';
import { NotificationType } from '@prisma/client';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { NotificationGateway } from './notification.gateway';

@Injectable()
export class NotificationService {
  constructor(
    private prisma: DatabaseService,
    private notificationGateway: NotificationGateway,
  ) {}

  async createNotification(
    userId: string,
    type: NotificationType,
    title: string,
    message: string,
    actorId?: string,
    data?: any,
  ) {
    // Avoid self-notification
    if (userId === actorId) return;

    const notification = await this.prisma.notification.create({
      data: {
        userId,
        type,
        title,
        message,
        actorId,
        data: data || {},
      },
    });

    // Send real-time notification
    this.notificationGateway.sendToUser(userId, notification);

    return notification;
  }

  async getUserNotifications(userId: string, pagination: PaginationDto) {
    const page = Number(pagination.page) || 1;
    const limit = Number(pagination.limit) || 20;
    const skip = (page - 1) * limit;

    const [notifications, total] = await Promise.all([
      this.prisma.notification.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
        include: {
          actor: {
            select: {
              id: true,
              name: true,
              image: true,
            },
          },
        },
      }),
      this.prisma.notification.count({ where: { userId } }),
    ]);

    return {
      data: notifications,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async getUnreadCount(userId: string): Promise<number> {
    return this.prisma.notification.count({
      where: {
        userId,
        read: false,
      },
    });
  }

  async markAsRead(userId: string, notificationId: string) {
    const notification = await this.prisma.notification.findUnique({
      where: { id: notificationId },
    });

    if (!notification || notification.userId !== userId) {
      throw new NotFoundException('Notification not found');
    }

    return this.prisma.notification.update({
      where: { id: notificationId },
      data: { read: true },
    });
  }

  async markAllAsRead(userId: string) {
    return this.prisma.notification.updateMany({
      where: {
        userId,
        read: false,
      },
      data: { read: true },
    });
  }

  async notifyPostSaved(actorId: string, targetUserId: string, postId: string) {
    return this.createNotification(
      targetUserId,
      NotificationType.POST_SAVED,
      'Post Saved',
      'saved your post',
      actorId,
      { postId },
    );
  }

  async notifyPostLike(actorId: string, targetUserId: string, postId: string) {
    return this.createNotification(
      targetUserId,
      NotificationType.POST_LIKE,
      'New Like',
      'liked your post',
      actorId,
      { postId },
    );
  }

  async notifyCommentLike(
    actorId: string,
    targetUserId: string,
    commentId: string,
    postId: string,
    totalLikes: number = 1,
  ) {
    return this.createNotification(
      targetUserId,
      NotificationType.COMMENT_LIKE,
      'New Like',
      `liked your comment (total likes: ${totalLikes})`,
      actorId,
      { commentId, postId, totalLikes },
    );
  }

  async notifyCommentReply(
    actorId: string,
    targetUserId: string,
    commentId: string,
    postId: string,
    content: string,
    totalReplies: number = 1,
  ) {
    return this.createNotification(
      targetUserId,
      NotificationType.COMMENT_REPLY,
      'New Reply',
      `replied to your comment: "${content.substring(0, 50)}${content.length > 50 ? '...' : ''}" (total replies: ${totalReplies})`,
      actorId,
      { commentId, postId, content, totalReplies },
    );
  }

  async notifyPostComment(
    actorId: string,
    targetUserId: string,
    postId: string,
    content: string,
  ) {
    return this.createNotification(
      targetUserId,
      NotificationType.POST_COMMENT,
      'New Comment',
      `commented on your post: "${content.substring(0, 50)}${content.length > 50 ? '...' : ''}"`,
      actorId,
      { postId, content },
    );
  }

  async notifyFriendRequest(actorId: string, targetUserId: string) {
    return this.createNotification(
      targetUserId,
      NotificationType.FRIEND_REQUEST,
      'Friend Request',
      'sent you a friend request',
      actorId,
    );
  }

  async notifyFriendRequestAccepted(actorId: string, targetUserId: string) {
    return this.createNotification(
      targetUserId,
      NotificationType.FRIEND_REQUEST_ACCEPTED,
      'Friend Request Accepted',
      'accepted your friend request',
      actorId,
    );
  }

  async notifyNewFollower(actorId: string, targetUserId: string) {
    return this.createNotification(
      targetUserId,
      NotificationType.NEW_FOLLOWER,
      'New Follower',
      'started following you',
      actorId,
    );
  }

  // ─── Reel Notifications ───────────────────────

  async notifyReelSaved(actorId: string, targetUserId: string, reelId: string) {
    return this.createNotification(
      targetUserId,
      NotificationType.REEL_SAVED,
      'Reel Saved',
      'saved your reel',
      actorId,
      { reelId },
    );
  }

  async notifyReelLike(actorId: string, targetUserId: string, reelId: string) {
    return this.createNotification(
      targetUserId,
      NotificationType.REEL_LIKE,
      'New Like',
      'liked your reel',
      actorId,
      { reelId },
    );
  }

  async notifyReelComment(
    actorId: string,
    targetUserId: string,
    reelId: string,
    content: string,
  ) {
    return this.createNotification(
      targetUserId,
      NotificationType.REEL_COMMENT,
      'New Comment',
      `commented on your reel: "${content.substring(0, 50)}${content.length > 50 ? '...' : ''}"`,
      actorId,
      { reelId, content },
    );
  }

  async notifyReelShare(actorId: string, targetUserId: string, reelId: string) {
    return this.createNotification(
      targetUserId,
      NotificationType.REEL_SHARE,
      'Reel Shared',
      'shared your reel',
      actorId,
      { reelId },
    );
  }

  // ─── Facebook Parity Additions ─────────────────

  async notifyNewMessage(
    actorId: string,
    targetUserId: string,
    roomId: string,
  ) {
    return this.createNotification(
      targetUserId,
      NotificationType.NEW_MESSAGE,
      'New Message',
      'sent you a message',
      actorId,
      { roomId },
    );
  }

  async notifyNewLogin(
    targetUserId: string,
    deviceName: string,
    ipAddress: string,
  ) {
    return this.createNotification(
      targetUserId,
      NotificationType.NEW_LOGIN,
      'Security Alert: New Login',
      `A new login was detected from ${deviceName} (${ipAddress})`,
      undefined,
      { deviceName, ipAddress },
    );
  }

  async notifyAccountUpdate(targetUserId: string, updateType: string) {
    return this.createNotification(
      targetUserId,
      NotificationType.ACCOUNT_UPDATE,
      'Account Updated',
      `Your account ${updateType} was updated successfully`,
    );
  }

  async notifyMarketplaceOrder(
    actorId: string,
    sellerId: string,
    orderId: string,
    productName: string,
  ) {
    return this.createNotification(
      sellerId,
      NotificationType.MARKETPLACE_ORDER,
      'New Marketplace Order',
      `placed an order for: ${productName}`,
      actorId,
      { orderId },
    );
  }

  async notifyMarketplaceReview(
    actorId: string,
    targetUserId: string,
    reviewId: string,
  ) {
    return this.createNotification(
      targetUserId,
      NotificationType.MARKETPLACE_REVIEW,
      'New Review',
      'left a review on your marketplace profile',
      actorId,
      { reviewId },
    );
  }
}
