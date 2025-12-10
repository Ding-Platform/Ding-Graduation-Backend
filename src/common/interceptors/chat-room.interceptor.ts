import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Socket } from 'socket.io';

/**
 * Interceptor to attach room context to WebSocket requests
 * Extracts room ID from the message payload and attaches it to socket data
 */
@Injectable()
export class ChatRoomInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    if (context.getType() !== 'ws') {
      return next.handle();
    }

    const client: Socket = context.switchToWs().getClient();
    const data = context.switchToWs().getData();

    // Extract room ID from various possible locations in the payload
    const roomId = data?.roomId || data?.room || data?.room_id;

    if (roomId) {
      // Store current room context in socket data
      client.data.currentRoomId = roomId;
    }

    return next.handle();
  }
}

/**
 * Interceptor to track user state across WebSocket connections
 * Tracks which rooms user is currently viewing
 */
@Injectable()
export class ChatUserStateInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    if (context.getType() !== 'ws') {
      return next.handle();
    }

    const client: Socket = context.switchToWs().getClient();

    // Initialize user state if not present
    if (!client.data.state) {
      client.data.state = {
        activeRoomId: null,
        isTyping: false,
        lastActivity: new Date(),
        joinedRooms: new Set<string>(),
      };
    }

    // Update last activity timestamp
    client.data.state.lastActivity = new Date();

    return next.handle();
  }
}
