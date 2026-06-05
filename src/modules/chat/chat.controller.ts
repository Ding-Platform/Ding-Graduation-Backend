import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiConsumes,
  ApiBody,
} from '@nestjs/swagger';
import { JwtAuthenticationGuard } from 'src/common/guards/strategy.guards/jwt.guard';
import { RoomMemberGuard } from 'src/common/guards/room-member.guard';
import { RoomAdminGuard } from 'src/common/guards/room-admin.guard';
import { currentUser } from 'src/common/decorators/currentUser.decorator';
import {
  CurrentRoom,
  CurrentRoomMember,
  RoomIdParam,
} from 'src/common/decorators/current-room.decorator';
import { User } from '@prisma/client';
import {
  MessageService,
  RoomService,
  ReactionService,
  ReadReceiptService,
  ChatMediaService,
} from './services';
import { ChatGateway } from './chat.gateway';
import {
  CreateMessageDto,
  UpdateMessageDto,
  ForwardMessageDto,
  DeleteMessageDto,
  CreateRoomDto,
  CreateDirectRoomDto,
  CreateGroupRoomDto,
  UpdateRoomDto,
  AddRoomMembersDto,
  UpdateMemberRoleDto,
  UpdateRoomMemberSettingsDto,
  AddReactionDto,
  PaginationDto,
  RoomListPaginationDto,
} from './dtos';
import { RoomDocument, RoomMemberDocument } from './schemas';
import { OffsetPaginationDto } from 'src/common/dto/offset-pagination.dto';

@ApiTags('Chat')
@ApiBearerAuth()
@Controller('chat')
@UseGuards(JwtAuthenticationGuard)
export class ChatController {
  constructor(
    private readonly messageService: MessageService,
    private readonly roomService: RoomService,
    private readonly reactionService: ReactionService,
    private readonly readReceiptService: ReadReceiptService,
    private readonly mediaService: ChatMediaService,
    private readonly chatGateway: ChatGateway,
  ) {}

  // ============ ROOM ENDPOINTS ============

  @Post('rooms')
  @ApiOperation({ summary: 'Create a new room (direct or group)' })
  async createRoom(@currentUser() user: User, @Body() dto: CreateRoomDto) {
    const room = await this.roomService.createRoom(user.id, dto);

    // Notify invited members so the conversation appears instantly (no refresh/polling).
    const memberIds = (room as any)?.members?.map((m: any) => m.userId) ?? [];
    for (const memberId of memberIds) {
      if (!memberId || memberId === user.id) continue;
      this.chatGateway.sendToUser(memberId, 'roomCreated', room);
    }

    return room;
  }

  @Post('rooms/direct')
  @ApiOperation({ summary: 'Create a direct (1:1) room' })
  async createDirectRoom(
    @currentUser() user: User,
    @Body() dto: CreateDirectRoomDto,
  ) {
    return this.roomService.createDirectRoom(user.id, dto);
  }

  @Post('rooms/group')
  @ApiOperation({ summary: 'Create a group room' })
  async createGroupRoom(
    @currentUser() user: User,
    @Body() dto: CreateGroupRoomDto,
  ) {
    return this.roomService.createGroupRoom(user.id, dto);
  }

  @Get('rooms')
  @ApiOperation({ summary: 'Get user rooms' })
  async getUserRooms(
    @currentUser() user: User,
    @Query() pagination: RoomListPaginationDto,
  ) {
    return this.roomService.getUserRooms(user.id, pagination);
  }

  @Get('rooms/:roomId')
  @ApiOperation({ summary: 'Get room details' })
  @UseGuards(RoomMemberGuard)
  @RoomIdParam('roomId')
  async getRoom(@CurrentRoom() room: RoomDocument) {
    return this.roomService.getRoomWithMembers(room._id!.toHexString());
  }

  @Patch('rooms/:roomId')
  @ApiOperation({ summary: 'Update room details (groups only)' })
  @UseGuards(RoomMemberGuard, RoomAdminGuard)
  @RoomIdParam('roomId')
  async updateRoom(
    @Param('roomId') roomId: string,
    @currentUser() user: User,
    @Body() dto: UpdateRoomDto,
  ) {
    return this.roomService.updateRoom(roomId, user.id, dto);
  }

  @Post('rooms/:roomId/leave')
  @ApiOperation({ summary: 'Leave a room' })
  @UseGuards(RoomMemberGuard)
  @RoomIdParam('roomId')
  async leaveRoom(@Param('roomId') roomId: string, @currentUser() user: User) {
    await this.roomService.leaveRoom(roomId, user.id);
    return { success: true };
  }

  // ============ MEMBER MANAGEMENT ============

  @Post('rooms/:roomId/members')
  @ApiOperation({ summary: 'Add members to a room' })
  @UseGuards(RoomMemberGuard, RoomAdminGuard)
  @RoomIdParam('roomId')
  async addMembers(
    @Param('roomId') roomId: string,
    @currentUser() user: User,
    @Body() dto: AddRoomMembersDto,
  ) {
    return this.roomService.addMembers(roomId, user.id, dto);
  }

  @Delete('rooms/:roomId/members/:userId')
  @ApiOperation({ summary: 'Remove a member from a room' })
  @UseGuards(RoomMemberGuard, RoomAdminGuard)
  @RoomIdParam('roomId')
  async removeMember(
    @Param('roomId') roomId: string,
    @Param('userId') memberUserId: string,
    @currentUser() user: User,
  ) {
    await this.roomService.removeMember(roomId, user.id, memberUserId);
    return { success: true };
  }

  @Patch('rooms/:roomId/members/:userId/role')
  @ApiOperation({ summary: 'Update member role' })
  @UseGuards(RoomMemberGuard, RoomAdminGuard)
  @RoomIdParam('roomId')
  async updateMemberRole(
    @Param('roomId') roomId: string,
    @Param('userId') memberUserId: string,
    @currentUser() user: User,
    @Body() dto: UpdateMemberRoleDto,
  ) {
    return this.roomService.updateMemberRole(
      roomId,
      user.id,
      memberUserId,
      dto,
    );
  }

  @Patch('rooms/:roomId/settings')
  @ApiOperation({ summary: 'Update room settings (mute, archive)' })
  @UseGuards(RoomMemberGuard)
  @RoomIdParam('roomId')
  async updateRoomSettings(
    @Param('roomId') roomId: string,
    @currentUser() user: User,
    @Body() dto: UpdateRoomMemberSettingsDto,
  ) {
    return this.roomService.updateMemberSettings(roomId, user.id, dto);
  }

  // ============ MESSAGE ENDPOINTS ============

  @Get('rooms/:roomId/messages')
  @ApiOperation({ summary: 'Get messages in a room' })
  @UseGuards(RoomMemberGuard)
  @RoomIdParam('roomId')
  async getMessages(
    @Param('roomId') roomId: string,
    @currentUser() user: User,
    @Query() pagination: PaginationDto,
  ) {
    return this.messageService.getMessages(roomId, user.id, pagination);
  }

  @Post('rooms/:roomId/messages')
  @ApiOperation({ summary: 'Send a message' })
  @UseGuards(RoomMemberGuard)
  @RoomIdParam('roomId')
  async sendMessage(
    @Param('roomId') roomId: string,
    @currentUser() user: User,
    @Body() dto: CreateMessageDto,
  ) {
    // Ensure roomId matches
    dto.roomId = roomId;
    const message = await this.messageService.sendMessage(user.id, dto);

    // Broadcast to connected clients in the room so receivers update in real-time.
    // Use `getMessage()` to enrich with user/media/reactions as needed by the UI.
    if (message?._id) {
      const fullMessage = await this.messageService.getMessage(
        message._id.toHexString(),
        user.id,
      );
      // Deliver to all connected clients in the room (when they joined the room).
      this.chatGateway.sendToRoom(roomId, 'newMessage', fullMessage);
      this.chatGateway.sendToRoom(roomId, 'message', fullMessage);

      // Also deliver to each room member's sockets so users receive messages even if
      // they have not joined the room (e.g., they are browsing other tabs/pages).
      const room = await this.roomService.getRoomWithMembers(roomId);
      const memberIds = room?.members?.map((m: any) => m.userId) ?? [];
      for (const memberId of memberIds) {
        if (!memberId || memberId === user.id) continue;
        this.chatGateway.sendToUser(memberId, 'newMessage', fullMessage);
      }
    }

    return message;
  }

  @Post('rooms/:roomId/messages/media')
  @ApiOperation({ summary: 'Send a message with media' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        content: { type: 'string' },
        replyToId: { type: 'string' },
        images: { type: 'array', items: { type: 'string', format: 'binary' } },
        voiceNote: { type: 'string', format: 'binary' },
        audio: { type: 'string', format: 'binary' },
        video: { type: 'string', format: 'binary' },
        documents: { type: 'array', items: { type: 'string', format: 'binary' } },
      },
    },
  })
  @UseGuards(RoomMemberGuard)
  @RoomIdParam('roomId')
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'images', maxCount: 10 },
      { name: 'voiceNote', maxCount: 1 },
      { name: 'audio', maxCount: 1 },
      { name: 'video', maxCount: 1 },
      { name: 'documents', maxCount: 10 },
    ]),
  )
  async sendMessageWithMedia(
    @Param('roomId') roomId: string,
    @currentUser() user: User,
    @Body() dto: CreateMessageDto,
    @UploadedFiles()
    files: {
      images?: Express.Multer.File[];
      voiceNote?: Express.Multer.File[];
      audio?: Express.Multer.File[];
      video?: Express.Multer.File[];
      documents?: Express.Multer.File[];
    },
  ) {
    dto.roomId = roomId;

    // Combine all uploaded files into one array for processing
    const allFiles: Express.Multer.File[] = [];
    if (files?.images) allFiles.push(...files.images);
    if (files?.voiceNote) allFiles.push(...files.voiceNote);
    if (files?.audio) allFiles.push(...files.audio);
    if (files?.video) allFiles.push(...files.video);
    if (files?.documents) allFiles.push(...files.documents);

    // Upload media files
    let mediaFiles;
    if (allFiles.length > 0) {
      mediaFiles = await this.mediaService.uploadMultiple(allFiles, 'temp');
    }

    // Send message with media
    const message = await this.messageService.sendMessage(
      user.id,
      dto,
      mediaFiles,
    );

    // Update media with actual message ID and save to database
    if (mediaFiles && message._id) {
      const updatedMedia = mediaFiles.map((m) => ({
        ...m,
        messageId: message._id!.toHexString(),
      }));
      await this.mediaService.saveMultipleMedia(updatedMedia);
    }

    // Broadcast enriched message to the room for real-time UI updates.
    if (message?._id) {
      const fullMessage = await this.messageService.getMessage(
        message._id.toHexString(),
        user.id,
      );
      this.chatGateway.sendToRoom(roomId, 'newMessage', fullMessage);
      this.chatGateway.sendToRoom(roomId, 'message', fullMessage);

      const room = await this.roomService.getRoomWithMembers(roomId);
      const memberIds = room?.members?.map((m: any) => m.userId) ?? [];
      for (const memberId of memberIds) {
        if (!memberId || memberId === user.id) continue;
        this.chatGateway.sendToUser(memberId, 'newMessage', fullMessage);
      }
    }

    return message;
  }

  @Get('messages/:messageId')
  @ApiOperation({ summary: 'Get a single message' })
  async getMessage(
    @Param('messageId') messageId: string,
    @currentUser() user: User,
  ) {
    return this.messageService.getMessage(messageId, user.id);
  }

  @Patch('messages/:messageId')
  @ApiOperation({ summary: 'Edit a message' })
  async editMessage(
    @Param('messageId') messageId: string,
    @currentUser() user: User,
    @Body() dto: UpdateMessageDto,
  ) {
    return this.messageService.editMessage(messageId, user.id, dto);
  }

  @Delete('messages/:messageId')
  @ApiOperation({ summary: 'Delete a message' })
  async deleteMessage(
    @Param('messageId') messageId: string,
    @currentUser() user: User,
    @Body() dto: DeleteMessageDto,
  ) {
    await this.messageService.deleteMessage(
      messageId,
      user.id,
      dto.deleteForEveryone,
    );
    return { success: true };
  }

  @Post('messages/forward')
  @ApiOperation({ summary: 'Forward a message to other rooms' })
  async forwardMessage(
    @currentUser() user: User,
    @Body() dto: ForwardMessageDto,
  ) {
    return this.messageService.forwardMessage(user.id, dto);
  }

  @Get('messages/:messageId/history')
  @ApiOperation({ summary: 'Get message edit history' })
  async getMessageHistory(@Param('messageId') messageId: string) {
    return this.messageService.getMessageEditHistory(messageId);
  }

  // ============ REACTION ENDPOINTS ============

  @Post('messages/:messageId/reactions')
  @ApiOperation({ summary: 'Add a reaction to a message' })
  async addReaction(
    @Param('messageId') messageId: string,
    @currentUser() user: User,
    @Body() dto: AddReactionDto,
  ) {
    return this.reactionService.addReaction(messageId, user.id, dto);
  }

  @Delete('messages/:messageId/reactions/:emoji')
  @ApiOperation({ summary: 'Remove a reaction from a message' })
  async removeReaction(
    @Param('messageId') messageId: string,
    @Param('emoji') emoji: string,
    @currentUser() user: User,
  ) {
    await this.reactionService.removeReaction(
      messageId,
      user.id,
      decodeURIComponent(emoji),
    );
    return { success: true };
  }

  @Post('messages/:messageId/reactions/toggle')
  @ApiOperation({ summary: 'Toggle a reaction (add/remove)' })
  async toggleReaction(
    @Param('messageId') messageId: string,
    @currentUser() user: User,
    @Body() dto: AddReactionDto,
  ) {
    return this.reactionService.toggleReaction(messageId, user.id, dto.emoji);
  }

  @Get('messages/:messageId/reactions')
  @ApiOperation({ summary: 'Get reaction counts for a message' })
  async getReactions(@Param('messageId') messageId: string) {
    return this.reactionService.getReactionCounts(messageId);
  }

  // ============ READ RECEIPTS ============

  @Post('messages/:messageId/read')
  @ApiOperation({ summary: 'Mark a message as read' })
  async markAsRead(
    @Param('messageId') messageId: string,
    @currentUser() user: User,
    @Body('roomId') roomId: string,
  ) {
    return this.readReceiptService.markAsRead(messageId, roomId, user.id);
  }

  @Post('rooms/:roomId/read-all')
  @ApiOperation({ summary: 'Mark all messages in a room as read' })
  @UseGuards(RoomMemberGuard)
  @RoomIdParam('roomId')
  async markAllAsRead(
    @Param('roomId') roomId: string,
    @currentUser() user: User,
  ) {
    const count = await this.readReceiptService.markAllAsRead(roomId, user.id);
    return { markedAsRead: count };
  }

  @Get('rooms/:roomId/unread-count')
  @ApiOperation({ summary: 'Get unread count for a room' })
  @UseGuards(RoomMemberGuard)
  @RoomIdParam('roomId')
  async getUnreadCount(
    @Param('roomId') roomId: string,
    @currentUser() user: User,
  ) {
    const count = await this.readReceiptService.getUnreadCount(roomId, user.id);
    return { unreadCount: count };
  }

  @Get('unread-counts')
  @ApiOperation({ summary: 'Get unread counts for all rooms' })
  async getAllUnreadCounts(@currentUser() user: User) {
    const counts = await this.readReceiptService.getAllUnreadCounts(user.id);
    return Object.fromEntries(counts);
  }

  // ============ PIN MESSAGES ============

  @Post('rooms/:roomId/pin/:messageId')
  @ApiOperation({ summary: 'Pin a message' })
  @UseGuards(RoomMemberGuard, RoomAdminGuard)
  @RoomIdParam('roomId')
  async pinMessage(
    @Param('roomId') roomId: string,
    @Param('messageId') messageId: string,
    @currentUser() user: User,
  ) {
    return this.roomService.pinMessage(roomId, messageId, user.id);
  }

  @Delete('rooms/:roomId/pin/:messageId')
  @ApiOperation({ summary: 'Unpin a message' })
  @UseGuards(RoomMemberGuard, RoomAdminGuard)
  @RoomIdParam('roomId')
  async unpinMessage(
    @Param('roomId') roomId: string,
    @Param('messageId') messageId: string,
  ) {
    await this.roomService.unpinMessage(roomId, messageId);
    return { success: true };
  }

  @Get('rooms/:roomId/pinned')
  @ApiOperation({ summary: 'Get pinned messages in a room' })
  @UseGuards(RoomMemberGuard)
  @RoomIdParam('roomId')
  async getPinnedMessages(@Param('roomId') roomId: string) {
    return this.roomService.getPinnedMessages(roomId);
  }

  // ============ SEARCH & MEDIA ============

  @Get('search')
  @ApiOperation({
    summary: 'Search messages across all rooms or within a specific room',
  })
  async searchMessages(
    @currentUser() user: User,
    @Query('query') query: string,
    @Query('roomId') roomId?: string,
    @Query() pagination?: OffsetPaginationDto,
  ) {
    return this.messageService.searchMessages(
      user.id,
      query,
      roomId,
      pagination?.limit,
    );
  }

  @Get('rooms/:roomId/media')
  @ApiOperation({ summary: 'Get media messages in a room' })
  @UseGuards(RoomMemberGuard)
  @RoomIdParam('roomId')
  async getMediaMessages(
    @Param('roomId') roomId: string,
    @currentUser() user: User,
    @Query() pagination?: OffsetPaginationDto,
  ) {
    return this.messageService.getMediaMessages(
      roomId,
      user.id,
      pagination?.limit,
    );
  }

  @Get('rooms/:roomId/stats')
  @ApiOperation({ summary: 'Get room statistics' })
  @UseGuards(RoomMemberGuard)
  @RoomIdParam('roomId')
  async getRoomStats(
    @Param('roomId') roomId: string,
    @currentUser() user: User,
  ) {
    const messageCount = await this.messageService.getMessageCount(
      roomId,
      user.id,
    );
    const unreadCount = await this.readReceiptService.getUnreadCount(
      roomId,
      user.id,
    );
    return { messageCount, unreadCount };
  }
}
