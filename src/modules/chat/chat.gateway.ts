import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  ConnectedSocket,
  MessageBody,
} from '@nestjs/websockets';
import { Logger, UseGuards, Inject, UseInterceptors } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Socket, Server } from 'socket.io';
import { WsJwtGuard } from 'src/common/guards/ws-jwt.guard';
import {
  IContextAuthService,
  IContextAuthServiceToken,
} from 'src/common/application/context/context-auth.interface';
import { SocketAuthMiddleware } from 'src/common/middlewares/chat.middleware';
import {
  ChatRoomInterceptor,
  ChatUserStateInterceptor,
} from 'src/common/interceptors/chat-room.interceptor';
import {
  MessageService,
  RoomService,
  ReactionService,
  ReadReceiptService,
} from './services';
import { CHAT_CONSTANTS } from 'src/common/constants/chat.constants';

interface SocketUser {
  id: string;
  name?: string;
  email: string;
  image?: string;
}

interface TypingPayload {
  roomId: string;
  isTyping: boolean;
}

interface MessagePayload {
  roomId: string;
  content: string;
  replyToId?: string;
}

interface ReactionPayload {
  messageId: string;
  emoji: string;
}

interface ReadPayload {
  messageId: string;
  roomId: string;
}

interface JoinRoomPayload {
  roomId: string;
}

@WebSocketGateway({
  namespace: '/chat',
  cors: {
    origin: '*',
    credentials: true,
  },
})
@UseGuards(WsJwtGuard)
@UseInterceptors(ChatUserStateInterceptor)
export class ChatGateway
  implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit
{
  private readonly logger: Logger = new Logger('ChatGateway');

  // Track users in rooms: roomId -> Set of socket IDs
  private roomSockets: Map<string, Set<string>> = new Map();

  // Track user sockets: userId -> Set of socket IDs (user can have multiple connections)
  private userSockets: Map<string, Set<string>> = new Map();

  // Track typing indicators with debounce
  private typingTimeouts: Map<string, NodeJS.Timeout> = new Map();

  @WebSocketServer() server: Server;

  constructor(
    private readonly jwtService: JwtService,
    @Inject(IContextAuthServiceToken)
    private readonly authService: IContextAuthService,
    private readonly messageService: MessageService,
    private readonly roomService: RoomService,
    private readonly reactionService: ReactionService,
    private readonly readReceiptService: ReadReceiptService,
  ) {}

  afterInit(server: Server) {
    this.logger.log('ChatGateway Initialized');

    // Register Socket.IO middleware for JWT authentication
    const socketAuth = SocketAuthMiddleware(
      this.logger,
      this.jwtService,
      this.authService,
    );
    server.use((socket, next) => {
      void socketAuth(socket, next);
    });
  }

  async handleConnection(client: Socket) {
    const user = client.data.user as SocketUser;

    if (!user) {
      this.logger.warn(`Connection rejected: No user data`);
      client.disconnect();
      return;
    }

    this.logger.log(
      `User ${user.id} (${user.email}) connected with socket ${client.id}`,
    );

    // Track user socket
    if (!this.userSockets.has(user.id)) {
      this.userSockets.set(user.id, new Set());
    }
    this.userSockets.get(user.id)!.add(client.id);

    // Initialize user state
    client.data.state = {
      activeRoomId: null,
      isTyping: false,
      lastActivity: new Date(),
      joinedRooms: new Set<string>(),
    };

    // Emit connected event
    client.emit('connected', {
      message: 'Successfully authenticated',
      userId: user.id,
      username: user.name || user.email,
    });

    // Broadcast user online status
    this.broadcastUserStatus(user.id, 'online');
  }

  handleDisconnect(client: Socket) {
    const user = client.data.user as SocketUser;

    if (user) {
      this.logger.log(`User ${user.id} disconnected (socket: ${client.id})`);

      // Remove socket from tracking
      const userSocketSet = this.userSockets.get(user.id);
      if (userSocketSet) {
        userSocketSet.delete(client.id);
        if (userSocketSet.size === 0) {
          this.userSockets.delete(user.id);
          // Last connection - broadcast offline status
          this.broadcastUserStatus(user.id, 'offline');
        }
      }

      // Leave all rooms
      if (client.data.state?.joinedRooms) {
        for (const roomId of client.data.state.joinedRooms) {
          this.leaveRoomInternal(client, roomId);
        }
      }

      // Clear typing timeout
      const typingKey = `${user.id}:${client.data.state?.activeRoomId}`;
      const timeout = this.typingTimeouts.get(typingKey);
      if (timeout) {
        clearTimeout(timeout);
        this.typingTimeouts.delete(typingKey);
      }
    } else {
      this.logger.log(`Client ${client.id} disconnected`);
    }
  }

  /**
   * Join a room to receive messages
   */
  @SubscribeMessage('joinRoom')
  async handleJoinRoom(
    @ConnectedSocket() client: Socket,
    @MessageBody() payload: JoinRoomPayload,
  ) {
    const user = client.data.user as SocketUser;
    if (!user) return { error: 'Unauthorized' };

    const { roomId } = payload;

    try {
      // Verify user is member of room
      const room = await this.roomService.getRoomWithMembers(roomId);
      const isMember = room.members?.some((m) => m.userId === user.id);

      if (!isMember) {
        return { error: 'Not a member of this room' };
      }

      // Join socket room
      client.join(roomId);
      client.data.state.joinedRooms.add(roomId);
      client.data.state.activeRoomId = roomId;

      // Track room socket
      if (!this.roomSockets.has(roomId)) {
        this.roomSockets.set(roomId, new Set());
      }
      this.roomSockets.get(roomId)!.add(client.id);

      this.logger.log(`User ${user.id} joined room ${roomId}`);

      // Notify room members
      client.to(roomId).emit('userJoined', {
        userId: user.id,
        username: user.name || user.email,
        roomId,
      });

      return { success: true, roomId };
    } catch (error) {
      this.logger.error(`Error joining room: ${error.message}`);
      return { error: error.message };
    }
  }

  /**
   * Leave a room
   */
  @SubscribeMessage('leaveRoom')
  async handleLeaveRoom(
    @ConnectedSocket() client: Socket,
    @MessageBody() payload: JoinRoomPayload,
  ) {
    const user = client.data.user as SocketUser;
    if (!user) return { error: 'Unauthorized' };

    const { roomId } = payload;
    this.leaveRoomInternal(client, roomId);

    return { success: true };
  }

  private leaveRoomInternal(client: Socket, roomId: string) {
    const user = client.data.user as SocketUser;
    if (!user) return;

    client.leave(roomId);
    client.data.state?.joinedRooms?.delete(roomId);

    if (client.data.state?.activeRoomId === roomId) {
      client.data.state.activeRoomId = null;
    }

    // Untrack room socket
    const roomSocketSet = this.roomSockets.get(roomId);
    if (roomSocketSet) {
      roomSocketSet.delete(client.id);
      if (roomSocketSet.size === 0) {
        this.roomSockets.delete(roomId);
      }
    }

    // Notify room members
    client.to(roomId).emit('userLeft', {
      userId: user.id,
      roomId,
    });

    this.logger.log(`User ${user.id} left room ${roomId}`);
  }

  /**
   * Send a message
   */
  @SubscribeMessage('message')
  @UseInterceptors(ChatRoomInterceptor)
  async handleMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody() payload: MessagePayload,
  ) {
    const user = client.data.user as SocketUser;
    if (!user) {
      client.emit('error', { message: 'Unauthorized' });
      return;
    }

    const { roomId, content, replyToId } = payload;

    if (!content?.trim()) {
      client.emit('error', { message: 'Message cannot be empty' });
      return;
    }

    try {
      // Send message
      const message = await this.messageService.sendMessage(user.id, {
        roomId,
        content,
        replyToId,
      });

      // Get full message with user info
      const fullMessage = await this.messageService.getMessage(
        message._id!.toHexString(),
        user.id,
      );

      // Broadcast to room
      const payloadToEmit = {
        ...fullMessage,
        user: {
          id: user.id,
          name: user.name,
          image: user.image,
        },
      };

      // Emit both event names for compatibility with different clients.
      this.server.to(roomId).emit('message', payloadToEmit);
      this.server.to(roomId).emit('newMessage', payloadToEmit);

      // Also deliver to each room member's sockets so users receive messages even if they
      // haven't joined the room (e.g. they are elsewhere in the app).
      const room = await this.roomService.getRoomWithMembers(roomId);
      const memberIds = room?.members?.map((m: any) => m.userId) ?? [];
      for (const memberId of memberIds) {
        if (!memberId || memberId === user.id) continue;
        this.sendToUser(memberId, 'newMessage', payloadToEmit);
      }

      // Clear typing indicator
      this.handleTypingInternal(client, roomId, false);

      this.logger.log(`Message from user ${user.id} in room ${roomId}`);

      return { success: true, message: fullMessage };
    } catch (error) {
      this.logger.error(`Error sending message: ${error.message}`);
      client.emit('error', { message: error.message });
    }
  }

  /**
   * Typing indicator
   */
  @SubscribeMessage('typing')
  handleTyping(
    @ConnectedSocket() client: Socket,
    @MessageBody() payload: TypingPayload,
  ) {
    const user = client.data.user as SocketUser;
    if (!user) return;

    const { roomId, isTyping } = payload;
    this.handleTypingInternal(client, roomId, isTyping);
  }

  private handleTypingInternal(
    client: Socket,
    roomId: string,
    isTyping: boolean,
  ) {
    const user = client.data.user as SocketUser;
    if (!user) return;

    const typingKey = `${user.id}:${roomId}`;

    // Clear existing timeout
    const existingTimeout = this.typingTimeouts.get(typingKey);
    if (existingTimeout) {
      clearTimeout(existingTimeout);
      this.typingTimeouts.delete(typingKey);
    }

    if (isTyping) {
      // Set auto-stop timeout
      const timeout = setTimeout(() => {
        client.to(roomId).emit('typing', {
          userId: user.id,
          username: user.name || user.email,
          isTyping: false,
        });
        this.typingTimeouts.delete(typingKey);
      }, CHAT_CONSTANTS.TYPING_INDICATOR.TIMEOUT_MS);

      this.typingTimeouts.set(typingKey, timeout);
    }

    // Broadcast typing status
    client.to(roomId).emit('typing', {
      userId: user.id,
      username: user.name || user.email,
      isTyping,
    });
  }

  /**
   * Toggle reaction on a message
   */
  @SubscribeMessage('reaction')
  async handleReaction(
    @ConnectedSocket() client: Socket,
    @MessageBody() payload: ReactionPayload,
  ) {
    const user = client.data.user as SocketUser;
    if (!user) return { error: 'Unauthorized' };

    const { messageId, emoji } = payload;

    try {
      const result = await this.reactionService.toggleReaction(
        messageId,
        user.id,
        emoji,
      );

      // Get message to find room
      const message = await this.messageService.getMessage(messageId, user.id);
      if (message) {
        // Broadcast to room
        this.server.to(message.roomId).emit('reaction', {
          messageId,
          userId: user.id,
          emoji,
          added: result.added,
        });
      }

      return { success: true, ...result };
    } catch (error) {
      this.logger.error(`Error toggling reaction: ${error.message}`);
      return { error: error.message };
    }
  }

  /**
   * Mark message as read
   */
  @SubscribeMessage('messageRead')
  async handleMessageRead(
    @ConnectedSocket() client: Socket,
    @MessageBody() payload: ReadPayload,
  ) {
    const user = client.data.user as SocketUser;
    if (!user) return { error: 'Unauthorized' };

    const { messageId, roomId } = payload;

    try {
      await this.readReceiptService.markAsRead(messageId, roomId, user.id);

      // Broadcast to room
      client.to(roomId).emit('messageRead', {
        messageId,
        userId: user.id,
        readAt: new Date().toISOString(),
      });

      return { success: true };
    } catch (error) {
      this.logger.error(`Error marking message as read: ${error.message}`);
      return { error: error.message };
    }
  }

  /**
   * Mark all messages in room as read
   */
  @SubscribeMessage('markAllRead')
  async handleMarkAllRead(
    @ConnectedSocket() client: Socket,
    @MessageBody() payload: JoinRoomPayload,
  ) {
    const user = client.data.user as SocketUser;
    if (!user) return { error: 'Unauthorized' };

    const { roomId } = payload;

    try {
      const count = await this.readReceiptService.markAllAsRead(
        roomId,
        user.id,
      );

      // Broadcast to room
      client.to(roomId).emit('allMessagesRead', {
        userId: user.id,
        roomId,
        count,
      });

      return { success: true, count };
    } catch (error) {
      this.logger.error(`Error marking all as read: ${error.message}`);
      return { error: error.message };
    }
  }

  /**
   * Broadcast user online/offline status
   */
  private broadcastUserStatus(userId: string, status: 'online' | 'offline') {
    // Broadcast to all connected clients
    this.server.emit('userStatus', {
      userId,
      status,
      timestamp: new Date().toISOString(),
    });
  }

  /**
   * Send a notification to all sockets of a specific user
   */
  sendToUser(userId: string, event: string, data: any) {
    const userSocketSet = this.userSockets.get(userId);
    if (userSocketSet) {
      for (const socketId of userSocketSet) {
        this.server.to(socketId).emit(event, data);
      }
    }
  }

  /**
   * Send a notification to all members of a room
   */
  sendToRoom(roomId: string, event: string, data: any) {
    this.server.to(roomId).emit(event, data);
  }

  /**
   * Get online users in a room
   */
  getOnlineUsersInRoom(roomId: string): string[] {
    const socketSet = this.roomSockets.get(roomId);
    if (!socketSet) return [];

    const userIds = new Set<string>();
    for (const socketId of socketSet) {
      const socket = this.server.sockets.sockets.get(socketId);
      if (socket?.data?.user?.id) {
        userIds.add(socket.data.user.id);
      }
    }
    return Array.from(userIds);
  }

  /**
   * Check if a user is online
   */
  isUserOnline(userId: string): boolean {
    const socketSet = this.userSockets.get(userId);
    return socketSet !== undefined && socketSet.size > 0;
  }
}
