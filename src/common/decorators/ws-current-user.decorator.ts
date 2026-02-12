import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Socket } from 'socket.io';

/**
 * Decorator to extract the current user from WebSocket connection
 * The user is attached to socket.data by the authentication middleware
 */
export const WsCurrentUser = createParamDecorator(
  (fieldName: string | undefined, ctx: ExecutionContext) => {
    const client: Socket = ctx.switchToWs().getClient();
    const user = client.data?.user;

    if (!user) {
      return null;
    }

    if (fieldName) {
      return user[fieldName];
    }

    return user;
  },
);

/**
 * Decorator to extract the current room from WebSocket connection
 * The room can be attached by the ChatRoomInterceptor or passed in message payload
 */
export const WsCurrentRoom = createParamDecorator(
  (fieldName: string | undefined, ctx: ExecutionContext) => {
    const client: Socket = ctx.switchToWs().getClient();
    const room = client.data?.currentRoom;

    if (!room) {
      return null;
    }

    if (fieldName) {
      return room[fieldName];
    }

    return room;
  },
);
