import { Injectable, ForbiddenException } from '@nestjs/common';
import { ObjectId } from 'mongodb';
import { MongodbService } from 'src/configs/mongodb/mongodb.service';
import {
  ReadReceiptDocument,
  READ_RECEIPTS_COLLECTION,
  MESSAGES_COLLECTION,
  MessageDocument,
} from '../schemas/message.schema';
import {
  ROOM_MEMBERS_COLLECTION,
  RoomMemberDocument,
} from '../schemas/room.schema';
import { CHAT_ERROR_MESSAGES } from 'src/common/constants/chat.constants';

@Injectable()
export class ReadReceiptService {
  constructor(private readonly mongodbService: MongodbService) {}

  /**
   * Mark a message as read
   */
  async markAsRead(
    messageId: string,
    roomId: string,
    userId: string,
  ): Promise<ReadReceiptDocument> {
    if (!this.mongodbService.isReady()) {
      throw new ForbiddenException(CHAT_ERROR_MESSAGES.MONGODB_NOT_CONNECTED);
    }

    const readReceiptsCollection =
      this.mongodbService.getCollection<ReadReceiptDocument>(
        READ_RECEIPTS_COLLECTION,
      );
    const membersCollection =
      this.mongodbService.getCollection<RoomMemberDocument>(
        ROOM_MEMBERS_COLLECTION,
      );

    const now = new Date();

    // Upsert read receipt
    const result = await readReceiptsCollection.findOneAndUpdate(
      { messageId, userId },
      {
        $set: { readAt: now },
        $setOnInsert: { messageId, roomId, userId },
      },
      { upsert: true, returnDocument: 'after' },
    );

    // Update member's last read message
    await membersCollection.updateOne(
      { roomId, userId },
      {
        $set: {
          lastReadMessageId: messageId,
          lastReadAt: now,
          updatedAt: now,
        },
      },
    );

    return result!;
  }

  /**
   * Mark all messages in a room as read up to a certain point
   */
  async markAllAsRead(
    roomId: string,
    userId: string,
    upToMessageId?: string,
  ): Promise<number> {
    if (!this.mongodbService.isReady()) {
      throw new ForbiddenException(CHAT_ERROR_MESSAGES.MONGODB_NOT_CONNECTED);
    }

    const messagesCollection =
      this.mongodbService.getCollection<MessageDocument>(MESSAGES_COLLECTION);
    const readReceiptsCollection =
      this.mongodbService.getCollection<ReadReceiptDocument>(
        READ_RECEIPTS_COLLECTION,
      );
    const membersCollection =
      this.mongodbService.getCollection<RoomMemberDocument>(
        ROOM_MEMBERS_COLLECTION,
      );

    // Build query for messages to mark as read
    const query: any = {
      roomId,
      deletedForEveryone: false,
      deletedForUsers: { $ne: userId },
    };

    // If a specific message is provided, only mark messages up to that point
    if (upToMessageId && ObjectId.isValid(upToMessageId)) {
      const targetMessage = await messagesCollection.findOne({
        _id: new ObjectId(upToMessageId),
      });
      if (targetMessage) {
        query.createdAt = { $lte: targetMessage.createdAt };
      }
    }

    // Get messages that need to be marked as read
    const messages = await messagesCollection
      .find(query)
      .project({ _id: 1 })
      .toArray();

    const messageIds = messages.map((m) => m._id!.toHexString());

    // Get existing read receipts
    const existingReceipts = await readReceiptsCollection
      .find({ userId, messageId: { $in: messageIds } })
      .project({ messageId: 1 })
      .toArray();

    const existingMessageIds = new Set(
      existingReceipts.map((r) => r.messageId),
    );

    // Filter out already read messages
    const unreadMessageIds = messageIds.filter(
      (id) => !existingMessageIds.has(id),
    );

    if (unreadMessageIds.length === 0) {
      return 0;
    }

    const now = new Date();

    // Batch insert read receipts
    const readReceipts: ReadReceiptDocument[] = unreadMessageIds.map(
      (messageId) => ({
        messageId,
        roomId,
        userId,
        readAt: now,
      }),
    );

    await readReceiptsCollection.insertMany(readReceipts);

    // Update member's last read message
    const lastMessageId = messageIds[messageIds.length - 1];
    await membersCollection.updateOne(
      { roomId, userId },
      {
        $set: {
          lastReadMessageId: lastMessageId,
          lastReadAt: now,
          updatedAt: now,
        },
      },
    );

    return unreadMessageIds.length;
  }

  /**
   * Get read receipts for a message
   */
  async getMessageReadReceipts(
    messageId: string,
  ): Promise<ReadReceiptDocument[]> {
    if (!this.mongodbService.isReady()) {
      throw new ForbiddenException(CHAT_ERROR_MESSAGES.MONGODB_NOT_CONNECTED);
    }

    const readReceiptsCollection =
      this.mongodbService.getCollection<ReadReceiptDocument>(
        READ_RECEIPTS_COLLECTION,
      );

    return readReceiptsCollection
      .find({ messageId })
      .sort({ readAt: 1 })
      .toArray();
  }

  /**
   * Get unread count for a user in a room
   */
  async getUnreadCount(roomId: string, userId: string): Promise<number> {
    if (!this.mongodbService.isReady()) {
      throw new ForbiddenException(CHAT_ERROR_MESSAGES.MONGODB_NOT_CONNECTED);
    }

    const messagesCollection =
      this.mongodbService.getCollection<MessageDocument>(MESSAGES_COLLECTION);
    const membersCollection =
      this.mongodbService.getCollection<RoomMemberDocument>(
        ROOM_MEMBERS_COLLECTION,
      );

    // Get user's last read message
    const membership = await membersCollection.findOne({ roomId, userId });

    if (!membership) {
      return 0;
    }

    const query: any = {
      roomId,
      deletedForEveryone: false,
      deletedForUsers: { $ne: userId },
      userId: { $ne: userId }, // Don't count own messages
    };

    if (membership.lastReadMessageId) {
      const lastReadMessage = await messagesCollection.findOne({
        _id: new ObjectId(membership.lastReadMessageId),
      });
      if (lastReadMessage) {
        query.createdAt = { $gt: lastReadMessage.createdAt };
      }
    } else if (membership.lastReadAt) {
      query.createdAt = { $gt: membership.lastReadAt };
    } else {
      query.createdAt = { $gt: membership.joinedAt };
    }

    return messagesCollection.countDocuments(query);
  }

  /**
   * Get unread counts for all rooms for a user
   */
  async getAllUnreadCounts(userId: string): Promise<Map<string, number>> {
    if (!this.mongodbService.isReady()) {
      throw new ForbiddenException(CHAT_ERROR_MESSAGES.MONGODB_NOT_CONNECTED);
    }

    const membersCollection =
      this.mongodbService.getCollection<RoomMemberDocument>(
        ROOM_MEMBERS_COLLECTION,
      );

    // Get all user's room memberships
    const memberships = await membersCollection
      .find({ userId, leftAt: null })
      .toArray();

    const unreadCounts = new Map<string, number>();

    for (const membership of memberships) {
      const count = await this.getUnreadCount(membership.roomId, userId);
      unreadCounts.set(membership.roomId, count);
    }

    return unreadCounts;
  }

  /**
   * Check if a message has been read by a specific user
   */
  async hasUserReadMessage(
    messageId: string,
    userId: string,
  ): Promise<boolean> {
    if (!this.mongodbService.isReady()) {
      return false;
    }

    const readReceiptsCollection =
      this.mongodbService.getCollection<ReadReceiptDocument>(
        READ_RECEIPTS_COLLECTION,
      );

    const receipt = await readReceiptsCollection.findOne({ messageId, userId });
    return !!receipt;
  }

  /**
   * Get delivery/seen status for a message
   */
  async getMessageStatus(
    messageId: string,
    roomId: string,
    senderId: string,
  ): Promise<{
    delivered: number;
    read: number;
    totalMembers: number;
  }> {
    if (!this.mongodbService.isReady()) {
      throw new ForbiddenException(CHAT_ERROR_MESSAGES.MONGODB_NOT_CONNECTED);
    }

    const membersCollection =
      this.mongodbService.getCollection<RoomMemberDocument>(
        ROOM_MEMBERS_COLLECTION,
      );
    const readReceiptsCollection =
      this.mongodbService.getCollection<ReadReceiptDocument>(
        READ_RECEIPTS_COLLECTION,
      );

    // Get room members (excluding sender)
    const members = await membersCollection
      .find({ roomId, userId: { $ne: senderId }, leftAt: null })
      .toArray();

    const totalMembers = members.length;

    // Get read receipts
    const readReceipts = await readReceiptsCollection
      .find({ messageId, userId: { $ne: senderId } })
      .toArray();

    const read = readReceipts.length;

    // For now, delivered = total members (assuming all online users get messages)
    // In a real implementation, you'd track actual delivery confirmations
    const delivered = totalMembers;

    return { delivered, read, totalMembers };
  }
}
