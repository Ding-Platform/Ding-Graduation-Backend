import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
} from '@nestjs/common';
import { CHAT_ERROR_MESSAGES } from '../constants/chat.constants';
import { RoomMemberRole } from 'src/modules/chat/schemas';

/**
 * Guard to verify user is an admin or moderator of the room
 * Must be used after RoomMemberGuard
 */
@Injectable()
export class RoomAdminGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const roomMember = request.currentRoomMember;

    if (!roomMember) {
      throw new ForbiddenException(CHAT_ERROR_MESSAGES.NOT_ROOM_MEMBER);
    }

    // Check if user is admin or moderator
    const allowedRoles: RoomMemberRole[] = ['ADMIN', 'MODERATOR'];
    if (!allowedRoles.includes(roomMember.role)) {
      throw new ForbiddenException(CHAT_ERROR_MESSAGES.NOT_ROOM_ADMIN);
    }

    return true;
  }
}

/**
 * Guard to verify user is strictly an admin (not just moderator)
 * Must be used after RoomMemberGuard
 */
@Injectable()
export class RoomOwnerGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const roomMember = request.currentRoomMember;

    if (!roomMember) {
      throw new ForbiddenException(CHAT_ERROR_MESSAGES.NOT_ROOM_MEMBER);
    }

    // Check if user is admin
    if (roomMember.role !== 'ADMIN') {
      throw new ForbiddenException(CHAT_ERROR_MESSAGES.NOT_ROOM_ADMIN);
    }

    return true;
  }
}
