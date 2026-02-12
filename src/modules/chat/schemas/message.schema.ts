import { ObjectId } from 'mongodb';

/**
 * Message document interface for MongoDB
 */
export interface MessageDocument {
  _id?: ObjectId;
  content: string;
  userId: string; // Reference to PostgreSQL User.id
  roomId: string;

  // Reply/Threading support
  replyToId?: string;

  // Message metadata
  isEdited: boolean;
  isForwarded: boolean;
  forwardedFromId?: string;

  // Deletion support
  deletedAt?: Date;
  deletedForEveryone: boolean;
  deletedForUsers: string[]; // User IDs who deleted for themselves only

  // Timestamps
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Message with populated relations
 */
export interface MessageWithRelations extends MessageDocument {
  reactions?: MessageReactionDocument[];
  readReceipts?: ReadReceiptDocument[];
  media?: MessageMediaDocument[];
  replyTo?: MessageDocument;
  user?: {
    id: string;
    name: string | null;
    image?: string | null;
  };
}

/**
 * Message reaction document
 */
export interface MessageReactionDocument {
  _id?: ObjectId;
  messageId: string;
  userId: string;
  emoji: string;
  createdAt: Date;
}

/**
 * Read receipt document
 */
export interface ReadReceiptDocument {
  _id?: ObjectId;
  messageId: string;
  roomId: string;
  userId: string;
  readAt: Date;
}

/**
 * Message media document
 */
export interface MessageMediaDocument {
  _id?: ObjectId;
  messageId: string;
  url: string;
  type: MessageMediaType;

  // File metadata
  fileName?: string;
  fileSize?: number; // Size in bytes
  mimeType?: string;

  // Media-specific metadata
  width?: number;
  height?: number;
  duration?: number; // Duration in seconds for audio/video
  thumbnail?: string; // Thumbnail URL for videos

  // Cloud storage metadata
  publicId?: string; // Cloudinary public ID

  createdAt: Date;
}

/**
 * Message media types
 */
export type MessageMediaType =
  | 'IMAGE'
  | 'VIDEO'
  | 'AUDIO'
  | 'VOICE_NOTE'
  | 'DOCUMENT'
  | 'FILE';

/**
 * Message edit history document
 */
export interface MessageEditHistoryDocument {
  _id?: ObjectId;
  messageId: string;
  content: string;
  editedAt: Date;
}

/**
 * Collection name constant
 */
export const MESSAGES_COLLECTION = 'messages';
export const MESSAGE_REACTIONS_COLLECTION = 'message_reactions';
export const READ_RECEIPTS_COLLECTION = 'read_receipts';
export const MESSAGE_MEDIA_COLLECTION = 'message_media';
export const MESSAGE_EDIT_HISTORY_COLLECTION = 'message_edit_history';
