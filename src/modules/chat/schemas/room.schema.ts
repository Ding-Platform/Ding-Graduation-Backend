import { ObjectId } from 'mongodb';

/**
 * Room types
 */
export type RoomType = 'DIRECT' | 'GROUP' | 'CHANNEL';

/**
 * Room document interface for MongoDB
 */
export interface RoomDocument {
  _id?: ObjectId;
  type: RoomType;

  // Group chat metadata
  name?: string;
  description?: string;
  imageUrl?: string;

  // Creator tracking
  createdById: string;

  // Activity tracking
  lastMessageAt?: Date;
  lastMessagePreview?: string;
  lastMessageUserId?: string;

  // Timestamps
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Room with member information
 */
export interface RoomWithMembers extends RoomDocument {
  members?: RoomMemberDocument[];
  memberCount?: number;
  unreadCount?: number;
}

/**
 * Room member roles
 */
export type RoomMemberRole = 'ADMIN' | 'MODERATOR' | 'MEMBER';

/**
 * Room member document interface
 */
export interface RoomMemberDocument {
  _id?: ObjectId;
  roomId: string;
  userId: string;

  // Member role and permissions
  role: RoomMemberRole;

  // User-specific room settings
  isMuted: boolean;
  isArchived: boolean;

  // Tracking
  joinedAt: Date;
  leftAt?: Date | null;

  // Last read message for unread count
  lastReadMessageId?: string;
  lastReadAt?: Date;

  // Timestamps
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Room member with user info
 */
export interface RoomMemberWithUser extends RoomMemberDocument {
  user?: {
    id: string;
    name: string | null;
    email: string;
    image?: string | null;
  };
}

/**
 * Pinned message document
 */
export interface PinnedMessageDocument {
  _id?: ObjectId;
  roomId: string;
  messageId: string;
  pinnedById: string;
  pinnedAt: Date;
}

/**
 * Collection name constants
 */
export const ROOMS_COLLECTION = 'rooms';
export const ROOM_MEMBERS_COLLECTION = 'room_members';
export const PINNED_MESSAGES_COLLECTION = 'pinned_messages';
