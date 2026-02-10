import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';
import { ObjectId } from 'mongodb';
import { MongodbService } from 'src/configs/mongodb/mongodb.service';
import {
  MessageDocument,
  MessageWithRelations,
  MessageEditHistoryDocument,
  MESSAGES_COLLECTION,
  MESSAGE_EDIT_HISTORY_COLLECTION,
  MESSAGE_REACTIONS_COLLECTION,
  MESSAGE_MEDIA_COLLECTION,
  READ_RECEIPTS_COLLECTION,
  MessageMediaDocument,
  MessageReactionDocument,
  ReadReceiptDocument,
} from '../schemas/message.schema';
import {
  ROOMS_COLLECTION,
  ROOM_MEMBERS_COLLECTION,
  RoomDocument,
} from '../schemas/room.schema';
import {
  CreateMessageDto,
  UpdateMessageDto,
  ForwardMessageDto,
} from '../dtos/message.dto';
import { PaginationDto, PaginatedResponse } from '../dtos/pagination.dto';
import {
  CHAT_CONSTANTS,
  CHAT_ERROR_MESSAGES,
} from 'src/common/constants/chat.constants';
import { DatabaseService } from 'src/configs/database/database.service';

@Injectable()
export class MessageService {
  constructor(
    private readonly mongodbService: MongodbService,
    private readonly databaseService: DatabaseService,
  ) {}

  /**
   * Send a new message
   */
  async sendMessage(
    userId: string,
    dto: CreateMessageDto,
    media?: MessageMediaDocument[],
  ): Promise<MessageDocument> {
    if (!this.mongodbService.isReady()) {
      throw new ForbiddenException(CHAT_ERROR_MESSAGES.MONGODB_NOT_CONNECTED);
    }

    const messagesCollection =
      this.mongodbService.getCollection<MessageDocument>(MESSAGES_COLLECTION);
    const roomsCollection =
      this.mongodbService.getCollection<RoomDocument>(ROOMS_COLLECTION);

    // Validate content length
    if (
      dto.content &&
      dto.content.length > CHAT_CONSTANTS.MESSAGE.MAX_CONTENT_LENGTH
    ) {
      throw new BadRequestException(CHAT_ERROR_MESSAGES.MESSAGE_TOO_LONG);
    }

    // Validate reply if provided
    if (dto.replyToId) {
      const replyMessage = await messagesCollection.findOne({
        _id: new ObjectId(dto.replyToId),
        roomId: dto.roomId,
        deletedForEveryone: false,
      });

      if (!replyMessage) {
        throw new NotFoundException(CHAT_ERROR_MESSAGES.MESSAGE_NOT_FOUND);
      }
    }

    const now = new Date();
    const newMessage: MessageDocument = {
      content: dto.content,
      userId,
      roomId: dto.roomId,
      replyToId: dto.replyToId,
      isEdited: false,
      isForwarded: false,
      deletedForEveryone: false,
      deletedForUsers: [],
      createdAt: now,
      updatedAt: now,
    };

    const result = await messagesCollection.insertOne(newMessage);
    newMessage._id = result.insertedId;

    // Save media attachments if provided
    if (media && media.length > 0) {
      const mediaCollection =
        this.mongodbService.getCollection<MessageMediaDocument>(
          MESSAGE_MEDIA_COLLECTION,
        );
      const mediaWithMessageId = media.map((m) => ({
        ...m,
        messageId: result.insertedId.toHexString(),
        createdAt: now,
      }));
      await mediaCollection.insertMany(mediaWithMessageId);
    }

    // Update room's last message info
    await roomsCollection.updateOne(
      { _id: new ObjectId(dto.roomId) },
      {
        $set: {
          lastMessageAt: now,
          lastMessagePreview: dto.content.substring(0, 100),
          lastMessageUserId: userId,
          updatedAt: now,
        },
      },
    );

    return newMessage;
  }

  /**
   * Get messages for a room with pagination
   */
  async getMessages(
    roomId: string,
    userId: string,
    pagination: PaginationDto,
  ): Promise<PaginatedResponse<MessageWithRelations>> {
    if (!this.mongodbService.isReady()) {
      throw new ForbiddenException(CHAT_ERROR_MESSAGES.MONGODB_NOT_CONNECTED);
    }

    const messagesCollection =
      this.mongodbService.getCollection<MessageDocument>(MESSAGES_COLLECTION);
    const limit = Math.min(
      pagination.limit || CHAT_CONSTANTS.PAGINATION.DEFAULT_LIMIT,
      CHAT_CONSTANTS.PAGINATION.MAX_LIMIT,
    );

    // Build query
    const query: any = {
      roomId,
      deletedForEveryone: false,
      deletedForUsers: { $ne: userId },
    };

    // Handle cursor-based pagination
    if (pagination.cursor) {
      if (!ObjectId.isValid(pagination.cursor)) {
        throw new BadRequestException(CHAT_ERROR_MESSAGES.INVALID_CURSOR);
      }
      const cursorMessage = await messagesCollection.findOne({
        _id: new ObjectId(pagination.cursor),
      });
      if (cursorMessage) {
        if (pagination.direction === 'before') {
          query.createdAt = { $lt: cursorMessage.createdAt };
        } else {
          query.createdAt = { $gt: cursorMessage.createdAt };
        }
      }
    }

    // Fetch messages
    const sortDirection = pagination.direction === 'after' ? 1 : -1;
    const messages = await messagesCollection
      .find(query)
      .sort({ createdAt: sortDirection })
      .limit(limit + 1) // Fetch one extra to check if there are more
      .toArray();

    const hasMore = messages.length > limit;
    if (hasMore) {
      messages.pop(); // Remove the extra item
    }

    // If direction is 'before', reverse to get chronological order
    if (pagination.direction === 'before' || !pagination.direction) {
      messages.reverse();
    }

    // Fetch reactions for messages
    const messageIds = messages.map((m) => m._id!.toHexString());
    const reactionsCollection =
      this.mongodbService.getCollection<MessageReactionDocument>(
        MESSAGE_REACTIONS_COLLECTION,
      );
    const reactions = await reactionsCollection
      .find({ messageId: { $in: messageIds } })
      .toArray();

    // Fetch media for messages
    const mediaCollection =
      this.mongodbService.getCollection<MessageMediaDocument>(
        MESSAGE_MEDIA_COLLECTION,
      );
    const mediaItems = await mediaCollection
      .find({ messageId: { $in: messageIds } })
      .toArray();

    // Fetch user info from PostgreSQL
    const userIds = [...new Set(messages.map((m) => m.userId))];
    const users = await this.databaseService.user.findMany({
      where: { id: { in: userIds } },
      select: { id: true, name: true, image: true },
    });
    const userMap = new Map(users.map((u) => [u.id, u]));

    // Combine data
    const messagesWithRelations: MessageWithRelations[] = messages.map(
      (message) => ({
        ...message,
        reactions: reactions.filter(
          (r) => r.messageId === message._id!.toHexString(),
        ),
        media: mediaItems.filter(
          (m) => m.messageId === message._id!.toHexString(),
        ),
        user: userMap.get(message.userId) || undefined,
      }),
    );

    return {
      data: messagesWithRelations,
      pagination: {
        hasMore,
        nextCursor:
          messages.length > 0
            ? messages[messages.length - 1]._id!.toHexString()
            : undefined,
        prevCursor:
          messages.length > 0 ? messages[0]._id!.toHexString() : undefined,
      },
    };
  }

  /**
   * Edit a message
   */
  async editMessage(
    messageId: string,
    userId: string,
    dto: UpdateMessageDto,
  ): Promise<MessageDocument> {
    if (!this.mongodbService.isReady()) {
      throw new ForbiddenException(CHAT_ERROR_MESSAGES.MONGODB_NOT_CONNECTED);
    }

    const messagesCollection =
      this.mongodbService.getCollection<MessageDocument>(MESSAGES_COLLECTION);
    const editHistoryCollection =
      this.mongodbService.getCollection<MessageEditHistoryDocument>(
        MESSAGE_EDIT_HISTORY_COLLECTION,
      );

    // Find the message
    const message = await messagesCollection.findOne({
      _id: new ObjectId(messageId),
      deletedForEveryone: false,
    });

    if (!message) {
      throw new NotFoundException(CHAT_ERROR_MESSAGES.MESSAGE_NOT_FOUND);
    }

    // Check ownership
    if (message.userId !== userId) {
      throw new ForbiddenException(
        CHAT_ERROR_MESSAGES.MESSAGE_EDIT_NOT_ALLOWED,
      );
    }

    // Check edit window
    const editWindowHours = CHAT_CONSTANTS.MESSAGE.EDIT_WINDOW_HOURS;
    const editDeadline = new Date(
      message.createdAt.getTime() + editWindowHours * 60 * 60 * 1000,
    );
    if (new Date() > editDeadline) {
      throw new ForbiddenException(
        CHAT_ERROR_MESSAGES.MESSAGE_EDIT_WINDOW_EXPIRED,
      );
    }

    // Save current content to edit history
    await editHistoryCollection.insertOne({
      messageId: messageId,
      content: message.content,
      editedAt: new Date(),
    });

    // Update message
    const now = new Date();
    await messagesCollection.updateOne(
      { _id: new ObjectId(messageId) },
      {
        $set: {
          content: dto.content,
          isEdited: true,
          updatedAt: now,
        },
      },
    );

    return {
      ...message,
      content: dto.content,
      isEdited: true,
      updatedAt: now,
    };
  }

  /**
   * Delete a message
   */
  async deleteMessage(
    messageId: string,
    userId: string,
    deleteForEveryone: boolean = false,
  ): Promise<void> {
    if (!this.mongodbService.isReady()) {
      throw new ForbiddenException(CHAT_ERROR_MESSAGES.MONGODB_NOT_CONNECTED);
    }

    const messagesCollection =
      this.mongodbService.getCollection<MessageDocument>(MESSAGES_COLLECTION);

    // Find the message
    const message = await messagesCollection.findOne({
      _id: new ObjectId(messageId),
      deletedForEveryone: false,
    });

    if (!message) {
      throw new NotFoundException(CHAT_ERROR_MESSAGES.MESSAGE_NOT_FOUND);
    }

    const now = new Date();

    if (deleteForEveryone) {
      // Check ownership for delete for everyone
      if (message.userId !== userId) {
        throw new ForbiddenException(
          CHAT_ERROR_MESSAGES.MESSAGE_DELETE_NOT_ALLOWED,
        );
      }

      // Check time window for delete for everyone
      const deleteWindowHours =
        CHAT_CONSTANTS.MESSAGE.DELETE_FOR_EVERYONE_WINDOW_HOURS;
      const deleteDeadline = new Date(
        message.createdAt.getTime() + deleteWindowHours * 60 * 60 * 1000,
      );
      if (new Date() > deleteDeadline) {
        throw new ForbiddenException(
          CHAT_ERROR_MESSAGES.MESSAGE_DELETE_FOR_EVERYONE_EXPIRED,
        );
      }

      // Mark as deleted for everyone
      await messagesCollection.updateOne(
        { _id: new ObjectId(messageId) },
        {
          $set: {
            deletedAt: now,
            deletedForEveryone: true,
            updatedAt: now,
          },
        },
      );
    } else {
      // Delete for self only - add user to deletedForUsers array
      await messagesCollection.updateOne(
        { _id: new ObjectId(messageId) },
        {
          $addToSet: { deletedForUsers: userId },
          $set: { updatedAt: now },
        },
      );
    }
  }

  /**
   * Forward a message to other rooms
   */
  async forwardMessage(
    userId: string,
    dto: ForwardMessageDto,
  ): Promise<MessageDocument[]> {
    if (!this.mongodbService.isReady()) {
      throw new ForbiddenException(CHAT_ERROR_MESSAGES.MONGODB_NOT_CONNECTED);
    }

    const messagesCollection =
      this.mongodbService.getCollection<MessageDocument>(MESSAGES_COLLECTION);
    const roomMembersCollection = this.mongodbService.getCollection(
      ROOM_MEMBERS_COLLECTION,
    );

    // Find the original message
    const originalMessage = await messagesCollection.findOne({
      _id: new ObjectId(dto.messageId),
      deletedForEveryone: false,
    });

    if (!originalMessage) {
      throw new NotFoundException(CHAT_ERROR_MESSAGES.MESSAGE_NOT_FOUND);
    }

    // Verify user is member of all target rooms
    const membershipChecks = await roomMembersCollection
      .find({
        roomId: { $in: dto.toRoomIds },
        userId,
        leftAt: null,
      })
      .toArray();

    if (membershipChecks.length !== dto.toRoomIds.length) {
      throw new ForbiddenException(CHAT_ERROR_MESSAGES.ROOM_ACCESS_DENIED);
    }

    const now = new Date();
    const forwardedMessages: MessageDocument[] = [];

    // Create forwarded messages for each target room
    for (const roomId of dto.toRoomIds) {
      const forwardedMessage: MessageDocument = {
        content: originalMessage.content,
        userId,
        roomId,
        isEdited: false,
        isForwarded: true,
        forwardedFromId: dto.messageId,
        deletedForEveryone: false,
        deletedForUsers: [],
        createdAt: now,
        updatedAt: now,
      };

      const result = await messagesCollection.insertOne(forwardedMessage);
      forwardedMessage._id = result.insertedId;
      forwardedMessages.push(forwardedMessage);
    }

    return forwardedMessages;
  }

  /**
   * Get message edit history
   */
  async getMessageEditHistory(
    messageId: string,
  ): Promise<MessageEditHistoryDocument[]> {
    if (!this.mongodbService.isReady()) {
      throw new ForbiddenException(CHAT_ERROR_MESSAGES.MONGODB_NOT_CONNECTED);
    }

    const editHistoryCollection =
      this.mongodbService.getCollection<MessageEditHistoryDocument>(
        MESSAGE_EDIT_HISTORY_COLLECTION,
      );

    return editHistoryCollection
      .find({ messageId })
      .sort({ editedAt: -1 })
      .toArray();
  }

  /**
   * Get a single message by ID
   */
  async getMessage(
    messageId: string,
    userId: string,
  ): Promise<MessageWithRelations | null> {
    if (!this.mongodbService.isReady()) {
      throw new ForbiddenException(CHAT_ERROR_MESSAGES.MONGODB_NOT_CONNECTED);
    }

    const messagesCollection =
      this.mongodbService.getCollection<MessageDocument>(MESSAGES_COLLECTION);

    const message = await messagesCollection.findOne({
      _id: new ObjectId(messageId),
      deletedForEveryone: false,
      deletedForUsers: { $ne: userId },
    });

    if (!message) {
      return null;
    }

    // Fetch reactions
    const reactionsCollection =
      this.mongodbService.getCollection<MessageReactionDocument>(
        MESSAGE_REACTIONS_COLLECTION,
      );
    const reactions = await reactionsCollection.find({ messageId }).toArray();

    // Fetch media
    const mediaCollection =
      this.mongodbService.getCollection<MessageMediaDocument>(
        MESSAGE_MEDIA_COLLECTION,
      );
    const media = await mediaCollection.find({ messageId }).toArray();

    // Fetch user info
    const user = await this.databaseService.user.findUnique({
      where: { id: message.userId },
      select: { id: true, name: true, image: true },
    });

    return {
      ...message,
      reactions,
      media,
      user: user || undefined,
    };
  }

  /**
   * Search messages across rooms or within a specific room
   */
  async searchMessages(
    userId: string,
    query: string,
    roomId?: string,
    limit: number = 50,
  ): Promise<MessageWithRelations[]> {
    if (!this.mongodbService.isReady()) {
      throw new ForbiddenException(CHAT_ERROR_MESSAGES.MONGODB_NOT_CONNECTED);
    }

    const messagesCollection =
      this.mongodbService.getCollection<MessageDocument>(MESSAGES_COLLECTION);
    const membersCollection = this.mongodbService.getCollection(
      ROOM_MEMBERS_COLLECTION,
    );

    // Get user's room memberships
    const memberships = await membersCollection
      .find({ userId, leftAt: null })
      .toArray();
    const userRoomIds = memberships.map((m) => m.roomId);

    // Build search query
    const searchQuery: any = {
      content: { $regex: query, $options: 'i' },
      deletedForEveryone: false,
      deletedForUsers: { $ne: userId },
      roomId: roomId ? roomId : { $in: userRoomIds },
    };

    // Verify user is member of the specified room
    if (roomId && !userRoomIds.includes(roomId)) {
      throw new ForbiddenException(CHAT_ERROR_MESSAGES.NOT_ROOM_MEMBER);
    }

    // Search messages
    const messages = await messagesCollection
      .find(searchQuery)
      .sort({ createdAt: -1 })
      .limit(Math.min(limit, 100))
      .toArray();

    // Fetch user info
    const userIds = [...new Set(messages.map((m) => m.userId))];
    const users = await this.databaseService.user.findMany({
      where: { id: { in: userIds } },
      select: { id: true, name: true, image: true },
    });
    const userMap = new Map(users.map((u) => [u.id, u]));

    // Return with user info
    return messages.map((message) => ({
      ...message,
      user: userMap.get(message.userId) || undefined,
    }));
  }

  /**
   * Get total message count for a room
   */
  async getMessageCount(roomId: string, userId: string): Promise<number> {
    if (!this.mongodbService.isReady()) {
      throw new ForbiddenException(CHAT_ERROR_MESSAGES.MONGODB_NOT_CONNECTED);
    }

    const messagesCollection =
      this.mongodbService.getCollection<MessageDocument>(MESSAGES_COLLECTION);

    return messagesCollection.countDocuments({
      roomId,
      deletedForEveryone: false,
      deletedForUsers: { $ne: userId },
    });
  }

  /**
   * Get media messages for a room
   */
  async getMediaMessages(
    roomId: string,
    userId: string,
    limit: number = 50,
  ): Promise<MessageWithRelations[]> {
    if (!this.mongodbService.isReady()) {
      throw new ForbiddenException(CHAT_ERROR_MESSAGES.MONGODB_NOT_CONNECTED);
    }

    const mediaCollection =
      this.mongodbService.getCollection<MessageMediaDocument>(
        MESSAGE_MEDIA_COLLECTION,
      );
    const messagesCollection =
      this.mongodbService.getCollection<MessageDocument>(MESSAGES_COLLECTION);

    // Get message IDs that have media in this room
    const mediaItems = await mediaCollection.find({}).toArray();

    // Get messages with media for this room
    const messageIds = [...new Set(mediaItems.map((m) => m.messageId))];

    const messages = await messagesCollection
      .find({
        _id: { $in: messageIds.map((id) => new ObjectId(id)) },
        roomId,
        deletedForEveryone: false,
        deletedForUsers: { $ne: userId },
      })
      .sort({ createdAt: -1 })
      .limit(Math.min(limit, 100))
      .toArray();

    // Fetch user info
    const userIds = [...new Set(messages.map((m) => m.userId))];
    const users = await this.databaseService.user.findMany({
      where: { id: { in: userIds } },
      select: { id: true, name: true, image: true },
    });
    const userMap = new Map(users.map((u) => [u.id, u]));

    // Return with media and user info
    return messages.map((message) => ({
      ...message,
      media: mediaItems.filter(
        (m) => m.messageId === message._id!.toHexString(),
      ),
      user: userMap.get(message.userId) || undefined,
    }));
  }
}
