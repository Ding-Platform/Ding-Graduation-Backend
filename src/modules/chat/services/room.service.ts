import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  BadRequestException,
  ConflictException,
} from '@nestjs/common';
import { ObjectId } from 'mongodb';
import { MongodbService } from 'src/configs/mongodb/mongodb.service';
import {
  RoomDocument,
  RoomMemberDocument,
  RoomWithMembers,
  RoomMemberWithUser,
  PinnedMessageDocument,
  ROOMS_COLLECTION,
  ROOM_MEMBERS_COLLECTION,
  PINNED_MESSAGES_COLLECTION,
} from '../schemas/room.schema';
import {
  MESSAGES_COLLECTION,
  MessageDocument,
} from '../schemas/message.schema';
import {
  CreateRoomDto,
  CreateDirectRoomDto,
  CreateGroupRoomDto,
  UpdateRoomDto,
  AddRoomMembersDto,
  UpdateMemberRoleDto,
  UpdateRoomMemberSettingsDto,
} from '../dtos/room.dto';
import {
  RoomListPaginationDto,
  PaginatedResponse,
} from '../dtos/pagination.dto';
import {
  CHAT_CONSTANTS,
  CHAT_ERROR_MESSAGES,
} from 'src/common/constants/chat.constants';
import { DatabaseService } from 'src/configs/database/database.service';

@Injectable()
export class RoomService {
  constructor(
    private readonly mongodbService: MongodbService,
    private readonly databaseService: DatabaseService,
  ) {}

  /**
   * Create a direct (1:1) room
   */
  async createDirectRoom(
    userId: string,
    dto: CreateDirectRoomDto,
  ): Promise<RoomWithMembers> {
    if (!this.mongodbService.isReady()) {
      throw new ForbiddenException(CHAT_ERROR_MESSAGES.MONGODB_NOT_CONNECTED);
    }

    if (userId === dto.userId) {
      throw new BadRequestException(CHAT_ERROR_MESSAGES.CANNOT_ADD_SELF);
    }

    // Verify target user exists
    const targetUser = await this.databaseService.user.findUnique({
      where: { id: dto.userId },
    });

    if (!targetUser) {
      throw new NotFoundException(CHAT_ERROR_MESSAGES.USER_NOT_FOUND);
    }

    const roomsCollection =
      this.mongodbService.getCollection<RoomDocument>(ROOMS_COLLECTION);
    const membersCollection =
      this.mongodbService.getCollection<RoomMemberDocument>(
        ROOM_MEMBERS_COLLECTION,
      );

    // Check if direct room already exists between these users
    const existingMemberships = await membersCollection
      .aggregate([
        { $match: { userId: { $in: [userId, dto.userId] }, leftAt: null } },
        { $group: { _id: '$roomId', count: { $sum: 1 } } },
        { $match: { count: 2 } },
      ])
      .toArray();

    for (const membership of existingMemberships) {
      const room = await roomsCollection.findOne({
        _id: new ObjectId(membership._id),
        type: 'DIRECT',
      });
      if (room) {
        // Return existing room
        return this.getRoomWithMembers(room._id.toHexString());
      }
    }

    const now = new Date();

    // Create new direct room
    const newRoom: RoomDocument = {
      type: 'DIRECT',
      createdById: userId,
      createdAt: now,
      updatedAt: now,
    };

    const roomResult = await roomsCollection.insertOne(newRoom);
    const roomId = roomResult.insertedId.toHexString();

    // Add both users as members
    const members: RoomMemberDocument[] = [
      {
        roomId,
        userId,
        role: 'MEMBER',
        isMuted: false,
        isArchived: false,
        joinedAt: now,
        createdAt: now,
        updatedAt: now,
      },
      {
        roomId,
        userId: dto.userId,
        role: 'MEMBER',
        isMuted: false,
        isArchived: false,
        joinedAt: now,
        createdAt: now,
        updatedAt: now,
      },
    ];

    await membersCollection.insertMany(members);

    return this.getRoomWithMembers(roomId);
  }

  /**
   * Create a group room
   */
  async createGroupRoom(
    userId: string,
    dto: CreateGroupRoomDto,
  ): Promise<RoomWithMembers> {
    if (!this.mongodbService.isReady()) {
      throw new ForbiddenException(CHAT_ERROR_MESSAGES.MONGODB_NOT_CONNECTED);
    }

    // Remove self from member list if present
    const memberIds = dto.memberIds.filter((id) => id !== userId);

    // Check member limit
    if (memberIds.length + 1 > CHAT_CONSTANTS.ROOM.MAX_GROUP_MEMBERS) {
      throw new BadRequestException(
        CHAT_ERROR_MESSAGES.ROOM_MEMBER_LIMIT_REACHED,
      );
    }

    // Verify all members exist
    const existingUsers = await this.databaseService.user.findMany({
      where: { id: { in: memberIds } },
      select: { id: true },
    });

    if (existingUsers.length !== memberIds.length) {
      throw new NotFoundException(CHAT_ERROR_MESSAGES.USER_NOT_FOUND);
    }

    const roomsCollection =
      this.mongodbService.getCollection<RoomDocument>(ROOMS_COLLECTION);
    const membersCollection =
      this.mongodbService.getCollection<RoomMemberDocument>(
        ROOM_MEMBERS_COLLECTION,
      );

    const now = new Date();

    // Create group room
    const newRoom: RoomDocument = {
      type: 'GROUP',
      name: dto.name,
      description: dto.description,
      imageUrl: dto.imageUrl,
      createdById: userId,
      createdAt: now,
      updatedAt: now,
    };

    const roomResult = await roomsCollection.insertOne(newRoom);
    const roomId = roomResult.insertedId.toHexString();

    // Add creator as admin
    const members: RoomMemberDocument[] = [
      {
        roomId,
        userId,
        role: 'ADMIN',
        isMuted: false,
        isArchived: false,
        joinedAt: now,
        createdAt: now,
        updatedAt: now,
      },
    ];

    // Add other members
    for (const memberId of memberIds) {
      members.push({
        roomId,
        userId: memberId,
        role: 'MEMBER',
        isMuted: false,
        isArchived: false,
        joinedAt: now,
        createdAt: now,
        updatedAt: now,
      });
    }

    await membersCollection.insertMany(members);

    return this.getRoomWithMembers(roomId);
  }

  /**
   * Create a room (generic)
   */
  async createRoom(
    userId: string,
    dto: CreateRoomDto,
  ): Promise<RoomWithMembers> {
    if (dto.type === 'DIRECT') {
      if (dto.memberIds.length !== 1) {
        throw new BadRequestException(
          'Direct rooms require exactly one other member',
        );
      }
      return this.createDirectRoom(userId, { userId: dto.memberIds[0] });
    }

    return this.createGroupRoom(userId, {
      name: dto.name!,
      description: dto.description,
      imageUrl: dto.imageUrl,
      memberIds: dto.memberIds,
    });
  }

  /**
   * Get room with members info
   */
  async getRoomWithMembers(roomId: string): Promise<RoomWithMembers> {
    if (!this.mongodbService.isReady()) {
      throw new ForbiddenException(CHAT_ERROR_MESSAGES.MONGODB_NOT_CONNECTED);
    }

    const roomsCollection =
      this.mongodbService.getCollection<RoomDocument>(ROOMS_COLLECTION);
    const membersCollection =
      this.mongodbService.getCollection<RoomMemberDocument>(
        ROOM_MEMBERS_COLLECTION,
      );

    const room = await roomsCollection.findOne({ _id: new ObjectId(roomId) });
    if (!room) {
      throw new NotFoundException(CHAT_ERROR_MESSAGES.ROOM_NOT_FOUND);
    }

    const members = await membersCollection
      .find({ roomId, leftAt: null })
      .toArray();

    // Fetch user info for members
    const userIds = members.map((m) => m.userId);
    const users = await this.databaseService.user.findMany({
      where: { id: { in: userIds } },
      select: { id: true, name: true, email: true, image: true },
    });
    const userMap = new Map(users.map((u) => [u.id, u]));

    const membersWithUsers: RoomMemberWithUser[] = members.map((m) => ({
      ...m,
      user: userMap.get(m.userId),
    }));

    return {
      ...room,
      members: membersWithUsers,
      memberCount: members.length,
    };
  }

  /**
   * Get user's rooms with pagination
   */
  async getUserRooms(
    userId: string,
    pagination: RoomListPaginationDto,
  ): Promise<PaginatedResponse<RoomWithMembers>> {
    if (!this.mongodbService.isReady()) {
      throw new ForbiddenException(CHAT_ERROR_MESSAGES.MONGODB_NOT_CONNECTED);
    }

    const roomsCollection =
      this.mongodbService.getCollection<RoomDocument>(ROOMS_COLLECTION);
    const membersCollection =
      this.mongodbService.getCollection<RoomMemberDocument>(
        ROOM_MEMBERS_COLLECTION,
      );

    const limit = Math.min(
      pagination.limit || CHAT_CONSTANTS.PAGINATION.DEFAULT_ROOM_LIMIT,
      CHAT_CONSTANTS.PAGINATION.MAX_ROOM_LIMIT,
    );
    const skip = ((pagination.page || 1) - 1) * limit;

    // Build query for user's memberships
    const memberQuery: any = { userId, leftAt: null };
    if (!pagination.includeArchived) {
      memberQuery.isArchived = false;
    }

    // Get user's room memberships
    const memberships = await membersCollection.find(memberQuery).toArray();
    const roomIds = memberships.map((m) => new ObjectId(m.roomId));

    if (roomIds.length === 0) {
      return { data: [], pagination: { hasMore: false, total: 0 } };
    }

    // Get rooms sorted by last message
    const rooms = await roomsCollection
      .find({ _id: { $in: roomIds } })
      .sort({ lastMessageAt: -1, createdAt: -1 })
      .skip(skip)
      .limit(limit + 1)
      .toArray();

    const hasMore = rooms.length > limit;
    if (hasMore) {
      rooms.pop();
    }

    // Enrich with unread counts and member info
    const roomsWithMembers: RoomWithMembers[] = await Promise.all(
      rooms.map(async (room) => {
        const membership = memberships.find(
          (m) => m.roomId === room._id.toHexString(),
        );
        const members = await membersCollection
          .find({ roomId: room._id.toHexString(), leftAt: null })
          .toArray();

        // Calculate unread count
        let unreadCount = 0;
        if (membership?.lastReadMessageId) {
          const messagesCollection =
            this.mongodbService.getCollection<MessageDocument>(
              MESSAGES_COLLECTION,
            );
          const lastReadMessage = await messagesCollection.findOne({
            _id: new ObjectId(membership.lastReadMessageId),
          });
          if (lastReadMessage) {
            unreadCount = await messagesCollection.countDocuments({
              roomId: room._id.toHexString(),
              createdAt: { $gt: lastReadMessage.createdAt },
              deletedForEveryone: false,
              deletedForUsers: { $ne: userId },
            });
          }
        }

        // Fetch member users for direct rooms
        let membersWithUsers: RoomMemberWithUser[] = [];
        if (room.type === 'DIRECT') {
          const userIds = members.map((m) => m.userId);
          const users = await this.databaseService.user.findMany({
            where: { id: { in: userIds } },
            select: { id: true, name: true, email: true, image: true },
          });
          const userMap = new Map(users.map((u) => [u.id, u]));
          membersWithUsers = members.map((m) => ({
            ...m,
            user: userMap.get(m.userId),
          }));
        }

        return {
          ...room,
          members: membersWithUsers,
          memberCount: members.length,
          unreadCount,
        };
      }),
    );

    return {
      data: roomsWithMembers,
      pagination: {
        hasMore,
        total: memberships.length,
      },
    };
  }

  /**
   * Update room details (group only)
   */
  async updateRoom(
    roomId: string,
    userId: string,
    dto: UpdateRoomDto,
  ): Promise<RoomDocument> {
    if (!this.mongodbService.isReady()) {
      throw new ForbiddenException(CHAT_ERROR_MESSAGES.MONGODB_NOT_CONNECTED);
    }

    const roomsCollection =
      this.mongodbService.getCollection<RoomDocument>(ROOMS_COLLECTION);

    const room = await roomsCollection.findOne({ _id: new ObjectId(roomId) });
    if (!room) {
      throw new NotFoundException(CHAT_ERROR_MESSAGES.ROOM_NOT_FOUND);
    }

    if (room.type === 'DIRECT') {
      throw new ForbiddenException(CHAT_ERROR_MESSAGES.ROOM_UPDATE_NOT_ALLOWED);
    }

    const now = new Date();
    const updateData: Partial<RoomDocument> = { updatedAt: now };

    if (dto.name !== undefined) updateData.name = dto.name;
    if (dto.description !== undefined) updateData.description = dto.description;
    if (dto.imageUrl !== undefined) updateData.imageUrl = dto.imageUrl;

    await roomsCollection.updateOne(
      { _id: new ObjectId(roomId) },
      { $set: updateData },
    );

    return { ...room, ...updateData };
  }

  /**
   * Add members to a room
   */
  async addMembers(
    roomId: string,
    userId: string,
    dto: AddRoomMembersDto,
  ): Promise<RoomMemberWithUser[]> {
    if (!this.mongodbService.isReady()) {
      throw new ForbiddenException(CHAT_ERROR_MESSAGES.MONGODB_NOT_CONNECTED);
    }

    const roomsCollection =
      this.mongodbService.getCollection<RoomDocument>(ROOMS_COLLECTION);
    const membersCollection =
      this.mongodbService.getCollection<RoomMemberDocument>(
        ROOM_MEMBERS_COLLECTION,
      );

    const room = await roomsCollection.findOne({ _id: new ObjectId(roomId) });
    if (!room) {
      throw new NotFoundException(CHAT_ERROR_MESSAGES.ROOM_NOT_FOUND);
    }

    if (room.type === 'DIRECT') {
      throw new ForbiddenException('Cannot add members to a direct room');
    }

    // Check current member count
    const currentMemberCount = await membersCollection.countDocuments({
      roomId,
      leftAt: null,
    });
    if (
      currentMemberCount + dto.userIds.length >
      CHAT_CONSTANTS.ROOM.MAX_GROUP_MEMBERS
    ) {
      throw new BadRequestException(
        CHAT_ERROR_MESSAGES.ROOM_MEMBER_LIMIT_REACHED,
      );
    }

    // Verify users exist
    const existingUsers = await this.databaseService.user.findMany({
      where: { id: { in: dto.userIds } },
      select: { id: true, name: true, email: true, image: true },
    });

    if (existingUsers.length !== dto.userIds.length) {
      throw new NotFoundException(CHAT_ERROR_MESSAGES.USER_NOT_FOUND);
    }

    const now = new Date();
    const newMembers: RoomMemberDocument[] = [];

    for (const userIdToAdd of dto.userIds) {
      // Check if already a member
      const existingMember = await membersCollection.findOne({
        roomId,
        userId: userIdToAdd,
      });
      if (existingMember && !existingMember.leftAt) {
        continue; // Skip already active members
      }

      if (existingMember) {
        // Rejoin - update existing record
        await membersCollection.updateOne(
          { _id: existingMember._id },
          {
            $set: {
              leftAt: null,
              role: 'MEMBER',
              joinedAt: now,
              updatedAt: now,
            },
          },
        );
        newMembers.push({
          ...existingMember,
          leftAt: undefined,
          role: 'MEMBER',
          joinedAt: now,
        });
      } else {
        // New member
        const newMember: RoomMemberDocument = {
          roomId,
          userId: userIdToAdd,
          role: 'MEMBER',
          isMuted: false,
          isArchived: false,
          joinedAt: now,
          createdAt: now,
          updatedAt: now,
        };
        await membersCollection.insertOne(newMember);
        newMembers.push(newMember);
      }
    }

    // Return with user info
    const userMap = new Map(existingUsers.map((u) => [u.id, u]));
    return newMembers.map((m) => ({ ...m, user: userMap.get(m.userId) }));
  }

  /**
   * Remove a member from a room
   */
  async removeMember(
    roomId: string,
    userId: string,
    memberUserId: string,
  ): Promise<void> {
    if (!this.mongodbService.isReady()) {
      throw new ForbiddenException(CHAT_ERROR_MESSAGES.MONGODB_NOT_CONNECTED);
    }

    const roomsCollection =
      this.mongodbService.getCollection<RoomDocument>(ROOMS_COLLECTION);
    const membersCollection =
      this.mongodbService.getCollection<RoomMemberDocument>(
        ROOM_MEMBERS_COLLECTION,
      );

    const room = await roomsCollection.findOne({ _id: new ObjectId(roomId) });
    if (!room) {
      throw new NotFoundException(CHAT_ERROR_MESSAGES.ROOM_NOT_FOUND);
    }

    if (room.type === 'DIRECT') {
      throw new ForbiddenException(
        CHAT_ERROR_MESSAGES.CANNOT_LEAVE_DIRECT_ROOM,
      );
    }

    if (userId === memberUserId) {
      throw new BadRequestException(CHAT_ERROR_MESSAGES.CANNOT_REMOVE_SELF);
    }

    const membership = await membersCollection.findOne({
      roomId,
      userId: memberUserId,
      leftAt: null,
    });
    if (!membership) {
      throw new NotFoundException(CHAT_ERROR_MESSAGES.NOT_ROOM_MEMBER);
    }

    // If removing an admin, ensure there's at least one other admin
    if (membership.role === 'ADMIN') {
      const adminCount = await membersCollection.countDocuments({
        roomId,
        role: 'ADMIN',
        leftAt: null,
      });
      if (adminCount <= 1) {
        throw new ForbiddenException(
          CHAT_ERROR_MESSAGES.CANNOT_REMOVE_LAST_ADMIN,
        );
      }
    }

    await membersCollection.updateOne(
      { _id: membership._id },
      { $set: { leftAt: new Date(), updatedAt: new Date() } },
    );
  }

  /**
   * Leave a room
   */
  async leaveRoom(roomId: string, userId: string): Promise<void> {
    if (!this.mongodbService.isReady()) {
      throw new ForbiddenException(CHAT_ERROR_MESSAGES.MONGODB_NOT_CONNECTED);
    }

    const roomsCollection =
      this.mongodbService.getCollection<RoomDocument>(ROOMS_COLLECTION);
    const membersCollection =
      this.mongodbService.getCollection<RoomMemberDocument>(
        ROOM_MEMBERS_COLLECTION,
      );

    const room = await roomsCollection.findOne({ _id: new ObjectId(roomId) });
    if (!room) {
      throw new NotFoundException(CHAT_ERROR_MESSAGES.ROOM_NOT_FOUND);
    }

    if (room.type === 'DIRECT') {
      throw new ForbiddenException(
        CHAT_ERROR_MESSAGES.CANNOT_LEAVE_DIRECT_ROOM,
      );
    }

    const membership = await membersCollection.findOne({
      roomId,
      userId,
      leftAt: null,
    });
    if (!membership) {
      throw new NotFoundException(CHAT_ERROR_MESSAGES.NOT_ROOM_MEMBER);
    }

    // If leaving admin is the only admin, transfer to another member or delete room
    if (membership.role === 'ADMIN') {
      const adminCount = await membersCollection.countDocuments({
        roomId,
        role: 'ADMIN',
        leftAt: null,
      });
      if (adminCount <= 1) {
        // Find another member to promote
        const nextMember = await membersCollection.findOne({
          roomId,
          userId: { $ne: userId },
          leftAt: null,
        });

        if (nextMember) {
          await membersCollection.updateOne(
            { _id: nextMember._id },
            { $set: { role: 'ADMIN', updatedAt: new Date() } },
          );
        }
      }
    }

    await membersCollection.updateOne(
      { _id: membership._id },
      { $set: { leftAt: new Date(), updatedAt: new Date() } },
    );
  }

  /**
   * Update member role
   */
  async updateMemberRole(
    roomId: string,
    userId: string,
    memberUserId: string,
    dto: UpdateMemberRoleDto,
  ): Promise<RoomMemberDocument> {
    if (!this.mongodbService.isReady()) {
      throw new ForbiddenException(CHAT_ERROR_MESSAGES.MONGODB_NOT_CONNECTED);
    }

    if (userId === memberUserId) {
      throw new BadRequestException(CHAT_ERROR_MESSAGES.CANNOT_CHANGE_OWN_ROLE);
    }

    const membersCollection =
      this.mongodbService.getCollection<RoomMemberDocument>(
        ROOM_MEMBERS_COLLECTION,
      );

    const membership = await membersCollection.findOne({
      roomId,
      userId: memberUserId,
      leftAt: null,
    });
    if (!membership) {
      throw new NotFoundException(CHAT_ERROR_MESSAGES.NOT_ROOM_MEMBER);
    }

    // If demoting an admin, ensure there's at least one other admin
    if (membership.role === 'ADMIN' && dto.role !== 'ADMIN') {
      const adminCount = await membersCollection.countDocuments({
        roomId,
        role: 'ADMIN',
        leftAt: null,
      });
      if (adminCount <= 1) {
        throw new ForbiddenException(
          CHAT_ERROR_MESSAGES.CANNOT_REMOVE_LAST_ADMIN,
        );
      }
    }

    await membersCollection.updateOne(
      { _id: membership._id },
      { $set: { role: dto.role, updatedAt: new Date() } },
    );

    return { ...membership, role: dto.role };
  }

  /**
   * Update room member settings (mute, archive)
   */
  async updateMemberSettings(
    roomId: string,
    userId: string,
    dto: UpdateRoomMemberSettingsDto,
  ): Promise<RoomMemberDocument> {
    if (!this.mongodbService.isReady()) {
      throw new ForbiddenException(CHAT_ERROR_MESSAGES.MONGODB_NOT_CONNECTED);
    }

    const membersCollection =
      this.mongodbService.getCollection<RoomMemberDocument>(
        ROOM_MEMBERS_COLLECTION,
      );

    const membership = await membersCollection.findOne({
      roomId,
      userId,
      leftAt: null,
    });
    if (!membership) {
      throw new NotFoundException(CHAT_ERROR_MESSAGES.NOT_ROOM_MEMBER);
    }

    const updateData: Partial<RoomMemberDocument> = { updatedAt: new Date() };
    if (dto.isMuted !== undefined) updateData.isMuted = dto.isMuted;
    if (dto.isArchived !== undefined) updateData.isArchived = dto.isArchived;

    await membersCollection.updateOne(
      { _id: membership._id },
      { $set: updateData },
    );

    return { ...membership, ...updateData };
  }

  /**
   * Pin a message in a room
   */
  async pinMessage(
    roomId: string,
    messageId: string,
    userId: string,
  ): Promise<PinnedMessageDocument> {
    if (!this.mongodbService.isReady()) {
      throw new ForbiddenException(CHAT_ERROR_MESSAGES.MONGODB_NOT_CONNECTED);
    }

    const messagesCollection =
      this.mongodbService.getCollection<MessageDocument>(MESSAGES_COLLECTION);
    const pinnedCollection =
      this.mongodbService.getCollection<PinnedMessageDocument>(
        PINNED_MESSAGES_COLLECTION,
      );

    // Verify message exists in this room
    const message = await messagesCollection.findOne({
      _id: new ObjectId(messageId),
      roomId,
      deletedForEveryone: false,
    });

    if (!message) {
      throw new NotFoundException(CHAT_ERROR_MESSAGES.MESSAGE_NOT_FOUND);
    }

    // Check if already pinned
    const existing = await pinnedCollection.findOne({ roomId, messageId });
    if (existing) {
      throw new ConflictException(CHAT_ERROR_MESSAGES.MESSAGE_ALREADY_PINNED);
    }

    const pinnedMessage: PinnedMessageDocument = {
      roomId,
      messageId,
      pinnedById: userId,
      pinnedAt: new Date(),
    };

    await pinnedCollection.insertOne(pinnedMessage);
    return pinnedMessage;
  }

  /**
   * Unpin a message
   */
  async unpinMessage(roomId: string, messageId: string): Promise<void> {
    if (!this.mongodbService.isReady()) {
      throw new ForbiddenException(CHAT_ERROR_MESSAGES.MONGODB_NOT_CONNECTED);
    }

    const pinnedCollection =
      this.mongodbService.getCollection<PinnedMessageDocument>(
        PINNED_MESSAGES_COLLECTION,
      );

    const result = await pinnedCollection.deleteOne({ roomId, messageId });
    if (result.deletedCount === 0) {
      throw new NotFoundException(CHAT_ERROR_MESSAGES.MESSAGE_NOT_PINNED);
    }
  }

  /**
   * Get pinned messages for a room
   */
  async getPinnedMessages(roomId: string): Promise<PinnedMessageDocument[]> {
    if (!this.mongodbService.isReady()) {
      throw new ForbiddenException(CHAT_ERROR_MESSAGES.MONGODB_NOT_CONNECTED);
    }

    const pinnedCollection =
      this.mongodbService.getCollection<PinnedMessageDocument>(
        PINNED_MESSAGES_COLLECTION,
      );

    return pinnedCollection.find({ roomId }).sort({ pinnedAt: -1 }).toArray();
  }
}
