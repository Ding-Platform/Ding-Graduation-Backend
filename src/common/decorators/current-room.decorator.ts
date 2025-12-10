import {
  createParamDecorator,
  ExecutionContext,
  SetMetadata,
} from '@nestjs/common';

/**
 * Metadata key for room ID parameter name
 */
export const ROOM_ID_PARAM_KEY = 'roomIdParam';

/**
 * Decorator to specify which parameter contains the room ID
 * @param paramName - Name of the route parameter containing room ID (default: 'roomId')
 */
export const RoomIdParam = (paramName: string = 'roomId') =>
  SetMetadata(ROOM_ID_PARAM_KEY, paramName);

/**
 * Decorator to extract the current room from request
 * Room is attached by RoomMemberGuard after validation
 */
export const CurrentRoom = createParamDecorator(
  (fieldName: string | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const room = request.currentRoom;

    if (!room) {
      return null;
    }

    if (fieldName) {
      return room[fieldName];
    }

    return room;
  },
);

/**
 * Decorator to extract current user's room membership
 */
export const CurrentRoomMember = createParamDecorator(
  (fieldName: string | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const roomMember = request.currentRoomMember;

    if (!roomMember) {
      return null;
    }

    if (fieldName) {
      return roomMember[fieldName];
    }

    return roomMember;
  },
);
