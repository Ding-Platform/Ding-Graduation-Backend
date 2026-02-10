import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ObjectId } from 'mongodb';
import { MongodbService } from 'src/configs/mongodb/mongodb.service';
import {
  ROOM_MEMBERS_COLLECTION,
  ROOMS_COLLECTION,
  RoomDocument,
  RoomMemberDocument,
} from 'src/modules/chat/schemas';
import { ROOM_ID_PARAM_KEY } from '../decorators/current-room.decorator';
import { CHAT_ERROR_MESSAGES } from '../constants/chat.constants';

/**
 * Guard to verify user is a member of the room
 * Attaches room and membership info to request
 */
@Injectable()
export class RoomMemberGuard implements CanActivate {
  constructor(
    private readonly mongodbService: MongodbService,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user) {
      throw new ForbiddenException('Unauthorized');
    }

    // Get room ID parameter name from decorator or default to 'roomId'
    const roomIdParam =
      this.reflector.get<string>(ROOM_ID_PARAM_KEY, context.getHandler()) ||
      this.reflector.get<string>(ROOM_ID_PARAM_KEY, context.getClass()) ||
      'roomId';

    // Get room ID from route params or body
    const roomId = request.params[roomIdParam] || request.body?.roomId;

    if (!roomId) {
      throw new NotFoundException(CHAT_ERROR_MESSAGES.ROOM_NOT_FOUND);
    }

    // Validate room ID format
    if (!ObjectId.isValid(roomId)) {
      throw new NotFoundException(CHAT_ERROR_MESSAGES.INVALID_ROOM_ID);
    }

    // Check if MongoDB is connected
    if (!this.mongodbService.isReady()) {
      throw new ForbiddenException(CHAT_ERROR_MESSAGES.MONGODB_NOT_CONNECTED);
    }

    // Find the room
    const roomsCollection =
      this.mongodbService.getCollection<RoomDocument>(ROOMS_COLLECTION);
    const room = await roomsCollection.findOne({
      _id: new ObjectId(roomId),
    });

    if (!room) {
      throw new NotFoundException(CHAT_ERROR_MESSAGES.ROOM_NOT_FOUND);
    }

    // Check if user is a member
    const membersCollection =
      this.mongodbService.getCollection<RoomMemberDocument>(
        ROOM_MEMBERS_COLLECTION,
      );
    const membership = await membersCollection.findOne({
      roomId: roomId,
      userId: user.id,
      leftAt: null, // Not left the room
    });

    if (!membership) {
      throw new ForbiddenException(CHAT_ERROR_MESSAGES.NOT_ROOM_MEMBER);
    }

    // Attach room and membership to request for use in controllers
    request.currentRoom = room;
    request.currentRoomMember = membership;

    return true;
  }
}
