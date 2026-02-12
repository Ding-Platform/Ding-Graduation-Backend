import { Injectable, HttpStatus } from '@nestjs/common';
import { DatabaseService } from '../../configs/database/database.service';
import { Neo4jService } from '../../configs/neo4j/neo4j.service';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { Prisma } from '@prisma/client';
import { GenericHttpException } from '../../common/application/exceptions/generic-http-exception';
import { ERROR_MESSAGES } from '../../common/constants/error-messages.constant';
import { NotificationService } from '../notification/notification.service';

export enum LikeableType {
  POST = 'POST',
  COMMENT = 'COMMENT',
}

@Injectable()
export class LikeService {
  constructor(
    private prisma: DatabaseService,
    private neo4j: Neo4jService,
    private readonly notificationService: NotificationService,
    @InjectQueue('graph-sync') private graphQueue: Queue,
  ) {}

  // Direct Neo4j sync helpers are no longer needed; we rely on the graph-sync queue.

  async likePost(userId: string, postId: string) {
    // Check if post exists
    const post = await this.prisma.post.findUnique({ where: { id: postId } });
    if (!post) {
      throw new GenericHttpException(
        ERROR_MESSAGES.POST_NOT_FOUND,
        HttpStatus.NOT_FOUND,
      );
    }

    // Check if already liked (uses unique index on (userId, postId) in DB)
    const existingLike = await this.prisma.like.findUnique({
      where: {
        userId_postId: { userId, postId },
      } as unknown as Prisma.LikeWhereUniqueInput,
    });

    if (existingLike) {
      throw new GenericHttpException(
        ERROR_MESSAGES.POST_ALREADY_LIKED,
        HttpStatus.BAD_REQUEST,
      );
    }

    // Transaction: Create like in relational DB and update like count
    const result = await this.prisma.$transaction(async (tx) => {
      const like = await tx.like.create({
        data: { userId, postId },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              image: true,
            },
          },
        },
      });

      // Increment post like count
      await tx.post.update({
        where: { id: postId },
        data: {
          likeCount: {
            increment: 1,
          },
        },
      });

      return like;
    });

    // Send notification
    try {
      if (post.authorId !== userId) {
        await this.notificationService.notifyPostLike(
          userId,
          post.authorId,
          postId,
        );
      }
    } catch (error) {
      console.error('Failed to send like notification', error);
    }

    // Get updated post with like count
    const updatedPost = await this.prisma.post.findUnique({
      where: { id: postId },
      select: { likeCount: true },
    });

    // Async: enqueue background sync job (Neo4j is updated in the graph-sync processor)
    try {
      await this.graphQueue.add('sync-like', {
        userId,
        postId,
        action: 'LIKE',
        timestamp: new Date(),
      });
    } catch (queueError) {
      console.error('Failed to enqueue like for graph sync', queueError);
    }

    return {
      ...result,
      likesCount: updatedPost?.likeCount || 0,
    };
  }

  async unlikePost(userId: string, postId: string) {
    const like = await this.prisma.like.findUnique({
      where: {
        userId_postId: { userId, postId },
      } as unknown as Prisma.LikeWhereUniqueInput,
    });

    if (!like) {
      throw new GenericHttpException(
        ERROR_MESSAGES.LIKE_NOT_FOUND,
        HttpStatus.NOT_FOUND,
      );
    }

    await this.prisma.$transaction(async (tx) => {
      await tx.like.delete({ where: { id: like.id } });

      // Decrement post like count
      await tx.post.update({
        where: { id: postId },
        data: {
          likeCount: {
            decrement: 1,
          },
        },
      });
    });

    // Async: enqueue background sync job (Neo4j is updated in the graph-sync processor)
    try {
      await this.graphQueue.add('sync-like', {
        userId,
        postId,
        action: 'UNLIKE',
        timestamp: new Date(),
      });
    } catch (queueError) {
      console.error('Failed to enqueue unlike for graph sync', queueError);
    }

    // Get updated post with like count
    const updatedPost = await this.prisma.post.findUnique({
      where: { id: postId },
      select: { likeCount: true },
    });

    return { 
      success: true,
      likesCount: updatedPost?.likeCount || 0,
    };
  }

  async likeComment(userId: string, commentId: string) {
    // Check if comment exists
    const comment = await this.prisma.comment.findUnique({ where: { id: commentId } });
    if (!comment) {
      throw new GenericHttpException(
        ERROR_MESSAGES.COMMENT_NOT_FOUND,
        HttpStatus.NOT_FOUND,
      );
    }

    // Check if already liked (uses unique index on (userId, commentId) in DB)
    const existingLike = await this.prisma.like.findUnique({
      where: {
        userId_commentId: { userId, commentId },
      } as unknown as Prisma.LikeWhereUniqueInput,
    });

    if (existingLike) {
      throw new GenericHttpException(
        ERROR_MESSAGES.COMMENT_ALREADY_LIKED,
        HttpStatus.BAD_REQUEST,
      );
    }

    // Transaction: Create like in relational DB and update like count
    const result = await this.prisma.$transaction(async (tx) => {
      const like = await tx.like.create({
        data: { userId, commentId },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              image: true,
            },
          },
        },
      });

      // Increment comment like count
      await tx.comment.update({
        where: { id: commentId },
        data: {
          likeCount: {
            increment: 1,
          },
        },
      });

      return like;
    });

    // Send notification
    try {
      if (comment.authorId !== userId) {
        await this.notificationService.notifyCommentLike(
          userId,
          comment.authorId,
          commentId,
          comment.postId,
        );
      }
    } catch (error) {
      console.error('Failed to send comment like notification', error);
    }

    // Get updated comment with like count
    const updatedComment = await this.prisma.comment.findUnique({
      where: { id: commentId },
      select: { likeCount: true },
    });

    // Async: enqueue background sync job (Neo4j is updated in the graph-sync processor)
    try {
      await this.graphQueue.add('sync-like', {
        userId,
        commentId,
        action: 'LIKE',
        timestamp: new Date(),
      });
    } catch (queueError) {
      console.error('Failed to enqueue comment like for graph sync', queueError);
    }

    return {
      ...result,
      likesCount: updatedComment?.likeCount || 0,
    };
  }

  async unlikeComment(userId: string, commentId: string) {
    const like = await this.prisma.like.findUnique({
      where: {
        userId_commentId: { userId, commentId },
      } as unknown as Prisma.LikeWhereUniqueInput,
    });

    if (!like) {
      throw new GenericHttpException(
        ERROR_MESSAGES.LIKE_NOT_FOUND,
        HttpStatus.NOT_FOUND,
      );
    }

    await this.prisma.$transaction(async (tx) => {
      await tx.like.delete({ where: { id: like.id } });

      // Decrement comment like count
      await tx.comment.update({
        where: { id: commentId },
        data: {
          likeCount: {
            decrement: 1,
          },
        },
      });
    });

    // Async: enqueue background sync job (Neo4j is updated in the graph-sync processor)
    try {
      await this.graphQueue.add('sync-like', {
        userId,
        commentId,
        action: 'UNLIKE',
        timestamp: new Date(),
      });
    } catch (queueError) {
      console.error('Failed to enqueue comment unlike for graph sync', queueError);
    }

    // Get updated comment with like count
    const updatedComment = await this.prisma.comment.findUnique({
      where: { id: commentId },
      select: { likeCount: true },
    });

    return { 
      success: true,
      likesCount: updatedComment?.likeCount || 0,
    };
  }

  async getPostLikes(postId: string, page = 1, limit = 20) {
    const skip = (page - 1) * limit;

    const [likes, total] = await Promise.all([
      this.prisma.like.findMany({
        where: { postId },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              image: true,
            },
          },
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      this.prisma.like.count({ where: { postId } }),
    ]);

    return {
      data: likes,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async hasUserLiked(userId: string, postId?: string, commentId?: string) {
    if (postId) {
      const like = await this.prisma.like.findUnique({
        where: {
          userId_postId: { userId, postId },
        } as unknown as Prisma.LikeWhereUniqueInput,
      });
      return !!like;
    }

    if (commentId) {
      // Uses @@unique([userId, commentId]) index efficiently
      // Note: Type assertion needed because Prisma client may be out of sync
      const like = await this.prisma.like.findFirst({
        where: { userId, commentId } as Prisma.LikeWhereInput,
      });
      return !!like;
    }

    return false;
  }
}
