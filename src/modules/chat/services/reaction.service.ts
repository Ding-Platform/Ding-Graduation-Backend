import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  ConflictException,
} from '@nestjs/common';
import { ObjectId } from 'mongodb';
import { MongodbService } from 'src/configs/mongodb/mongodb.service';
import {
  MessageReactionDocument,
  MESSAGE_REACTIONS_COLLECTION,
  MESSAGES_COLLECTION,
  MessageDocument,
} from '../schemas/message.schema';
import { AddReactionDto } from '../dtos/reaction.dto';
import {
  CHAT_CONSTANTS,
  CHAT_ERROR_MESSAGES,
} from 'src/common/constants/chat.constants';
import { AuditAction } from '@prisma/client';
import { AuditLogService } from '../../audit/audit-log.service';

@Injectable()
export class ReactionService {
  constructor(
    private readonly mongodbService: MongodbService,
    private readonly auditLogService: AuditLogService,
  ) {}

  /**
   * Add a reaction to a message
   */
  async addReaction(
    messageId: string,
    userId: string,
    dto: AddReactionDto,
  ): Promise<MessageReactionDocument> {
    if (!this.mongodbService.isReady()) {
      throw new ForbiddenException(CHAT_ERROR_MESSAGES.MONGODB_NOT_CONNECTED);
    }

    const messagesCollection =
      this.mongodbService.getCollection<MessageDocument>(MESSAGES_COLLECTION);
    const reactionsCollection =
      this.mongodbService.getCollection<MessageReactionDocument>(
        MESSAGE_REACTIONS_COLLECTION,
      );

    // Verify message exists
    const message = await messagesCollection.findOne({
      _id: new ObjectId(messageId),
      deletedForEveryone: false,
    });

    if (!message) {
      throw new NotFoundException(CHAT_ERROR_MESSAGES.MESSAGE_NOT_FOUND);
    }

    // Check if user already reacted with this emoji
    const existingReaction = await reactionsCollection.findOne({
      messageId,
      userId,
      emoji: dto.emoji,
    });

    if (existingReaction) {
      throw new ConflictException(CHAT_ERROR_MESSAGES.REACTION_ALREADY_EXISTS);
    }

    // Check reaction limit per message
    const reactionCount = await reactionsCollection.countDocuments({
      messageId,
    });
    if (reactionCount >= CHAT_CONSTANTS.MESSAGE.MAX_REACTIONS_PER_MESSAGE) {
      throw new ForbiddenException(CHAT_ERROR_MESSAGES.TOO_MANY_REACTIONS);
    }

    const newReaction: MessageReactionDocument = {
      messageId,
      userId,
      emoji: dto.emoji,
      createdAt: new Date(),
    };

    const result = await reactionsCollection.insertOne(newReaction);
    newReaction._id = result.insertedId;

    await this.auditLogService.record({
      userId,
      action: AuditAction.CHAT_REACTION,
      targetType: 'MESSAGE',
      targetId: messageId,
      metadata: {
        emoji: dto.emoji,
        roomId: message.roomId,
        reactionId: result.insertedId.toHexString(),
      },
    });

    return newReaction;
  }

  /**
   * Remove a reaction from a message
   */
  async removeReaction(
    messageId: string,
    userId: string,
    emoji: string,
  ): Promise<void> {
    if (!this.mongodbService.isReady()) {
      throw new ForbiddenException(CHAT_ERROR_MESSAGES.MONGODB_NOT_CONNECTED);
    }

    const reactionsCollection =
      this.mongodbService.getCollection<MessageReactionDocument>(
        MESSAGE_REACTIONS_COLLECTION,
      );

    const result = await reactionsCollection.deleteOne({
      messageId,
      userId,
      emoji,
    });

    if (result.deletedCount === 0) {
      throw new NotFoundException(CHAT_ERROR_MESSAGES.REACTION_NOT_FOUND);
    }
  }

  /**
   * Get all reactions for a message
   */
  async getMessageReactions(
    messageId: string,
  ): Promise<MessageReactionDocument[]> {
    if (!this.mongodbService.isReady()) {
      throw new ForbiddenException(CHAT_ERROR_MESSAGES.MONGODB_NOT_CONNECTED);
    }

    const reactionsCollection =
      this.mongodbService.getCollection<MessageReactionDocument>(
        MESSAGE_REACTIONS_COLLECTION,
      );

    return reactionsCollection.find({ messageId }).toArray();
  }

  /**
   * Get reaction counts grouped by emoji
   */
  async getReactionCounts(
    messageId: string,
  ): Promise<Array<{ emoji: string; count: number; users: string[] }>> {
    if (!this.mongodbService.isReady()) {
      throw new ForbiddenException(CHAT_ERROR_MESSAGES.MONGODB_NOT_CONNECTED);
    }

    const reactionsCollection =
      this.mongodbService.getCollection<MessageReactionDocument>(
        MESSAGE_REACTIONS_COLLECTION,
      );

    const result = await reactionsCollection
      .aggregate([
        { $match: { messageId } },
        {
          $group: {
            _id: '$emoji',
            count: { $sum: 1 },
            users: { $push: '$userId' },
          },
        },
        { $project: { emoji: '$_id', count: 1, users: 1, _id: 0 } },
        { $sort: { count: -1 } },
      ])
      .toArray();

    return result as Array<{ emoji: string; count: number; users: string[] }>;
  }

  /**
   * Toggle a reaction (add if not exists, remove if exists)
   */
  async toggleReaction(
    messageId: string,
    userId: string,
    emoji: string,
  ): Promise<{ added: boolean; reaction?: MessageReactionDocument }> {
    if (!this.mongodbService.isReady()) {
      throw new ForbiddenException(CHAT_ERROR_MESSAGES.MONGODB_NOT_CONNECTED);
    }

    const reactionsCollection =
      this.mongodbService.getCollection<MessageReactionDocument>(
        MESSAGE_REACTIONS_COLLECTION,
      );

    // Check if reaction exists
    const existingReaction = await reactionsCollection.findOne({
      messageId,
      userId,
      emoji,
    });

    if (existingReaction) {
      // Remove existing reaction
      await reactionsCollection.deleteOne({ _id: existingReaction._id });
      return { added: false };
    } else {
      // Add new reaction
      const reaction = await this.addReaction(messageId, userId, { emoji });
      return { added: true, reaction };
    }
  }
}
