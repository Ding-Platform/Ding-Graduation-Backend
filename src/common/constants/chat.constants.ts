/**
 * Chat module constants
 */
export const CHAT_CONSTANTS = {
  UPLOAD: {
    MAX_IMAGE_SIZE: 10 * 1024 * 1024, // 10MB
    MAX_VIDEO_SIZE: 100 * 1024 * 1024, // 100MB
    MAX_AUDIO_SIZE: 25 * 1024 * 1024, // 25MB
    MAX_VOICE_NOTE_SIZE: 10 * 1024 * 1024, // 10MB
    MAX_DOCUMENT_SIZE: 50 * 1024 * 1024, // 50MB
    ALLOWED_IMAGE_TYPES: [
      'image/jpeg',
      'image/png',
      'image/gif',
      'image/webp',
    ] as const,
    ALLOWED_VIDEO_TYPES: [
      'video/mp4',
      'video/webm',
      'video/quicktime',
      'video/x-msvideo',
    ] as const,
    ALLOWED_AUDIO_TYPES: [
      'audio/mpeg',
      'audio/wav',
      'audio/ogg',
      'audio/webm',
      'audio/mp4',
    ] as const,
    ALLOWED_DOCUMENT_TYPES: [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'text/plain',
    ] as const,
  },
  ROOM: {
    MAX_GROUP_MEMBERS: 256,
    MAX_NAME_LENGTH: 100,
    MAX_DESCRIPTION_LENGTH: 500,
    MIN_GROUP_MEMBERS: 2, // Including creator
  },
  MESSAGE: {
    MAX_CONTENT_LENGTH: 4096,
    MAX_REACTIONS_PER_MESSAGE: 50,
    MAX_MEDIA_PER_MESSAGE: 10,
    EDIT_WINDOW_HOURS: 24, // Can edit message within 24 hours
    DELETE_FOR_EVERYONE_WINDOW_HOURS: 1, // Can delete for everyone within 1 hour
  },
  PAGINATION: {
    DEFAULT_LIMIT: 50,
    MAX_LIMIT: 100,
    DEFAULT_ROOM_LIMIT: 20,
    MAX_ROOM_LIMIT: 50,
  },
  CLOUDINARY: {
    FOLDER: 'chat',
    IMAGE_TRANSFORMATION: {
      MAX_WIDTH: 1920,
      MAX_HEIGHT: 1080,
      QUALITY: 'auto',
      FORMAT: 'auto',
    },
    VIDEO_TRANSFORMATION: {
      MAX_WIDTH: 1280,
      MAX_HEIGHT: 720,
      QUALITY: 'auto',
    },
    VOICE_NOTE_SETTINGS: {
      FORMAT: 'mp3',
      BIT_RATE: '128k',
    },
  },
  TYPING_INDICATOR: {
    TIMEOUT_MS: 3000, // Typing indicator timeout
    DEBOUNCE_MS: 500, // Debounce typing events
  },
  PRESENCE: {
    ONLINE_TIMEOUT_MS: 30000, // Consider offline after 30 seconds
    HEARTBEAT_INTERVAL_MS: 15000, // Heartbeat every 15 seconds
  },
} as const;

/**
 * Chat error messages
 */
export const CHAT_ERROR_MESSAGES = {
  // Room errors
  ROOM_NOT_FOUND: 'Room not found',
  ROOM_ACCESS_DENIED: 'You do not have access to this room',
  ROOM_ALREADY_EXISTS: 'A direct room with this user already exists',
  ROOM_MEMBER_LIMIT_REACHED: 'Room has reached maximum member limit',
  ROOM_UPDATE_NOT_ALLOWED: 'You are not allowed to update this room',
  ROOM_DELETE_NOT_ALLOWED: 'You are not allowed to delete this room',
  CANNOT_LEAVE_DIRECT_ROOM: 'Cannot leave a direct message room',
  CANNOT_REMOVE_LAST_ADMIN: 'Cannot remove the last admin from the room',

  // Member errors
  NOT_ROOM_MEMBER: 'You are not a member of this room',
  NOT_ROOM_ADMIN: 'You are not an admin of this room',
  ALREADY_ROOM_MEMBER: 'User is already a member of this room',
  CANNOT_ADD_SELF: 'Cannot add yourself to the room',
  CANNOT_REMOVE_SELF: 'Use leave room instead of removing yourself',
  CANNOT_CHANGE_OWN_ROLE: 'Cannot change your own role',
  USER_NOT_FOUND: 'User not found',

  // Message errors
  MESSAGE_NOT_FOUND: 'Message not found',
  MESSAGE_ACCESS_DENIED: 'You do not have access to this message',
  MESSAGE_EDIT_NOT_ALLOWED: 'You can only edit your own messages',
  MESSAGE_EDIT_WINDOW_EXPIRED: 'Edit window has expired for this message',
  MESSAGE_DELETE_NOT_ALLOWED: 'You are not allowed to delete this message',
  MESSAGE_DELETE_FOR_EVERYONE_EXPIRED: 'Delete for everyone window has expired',
  MESSAGE_TOO_LONG: 'Message exceeds maximum length',
  MESSAGE_EMPTY: 'Message cannot be empty',

  // Media errors
  MEDIA_UPLOAD_FAILED: 'Failed to upload media',
  MEDIA_TYPE_NOT_ALLOWED: 'This media type is not allowed',
  MEDIA_SIZE_TOO_LARGE: 'Media file is too large',
  TOO_MANY_MEDIA_FILES: 'Too many media files in one message',

  // Reaction errors
  REACTION_ALREADY_EXISTS: 'You already reacted with this emoji',
  REACTION_NOT_FOUND: 'Reaction not found',
  TOO_MANY_REACTIONS: 'Message has reached maximum reactions',

  // Pin errors
  MESSAGE_ALREADY_PINNED: 'Message is already pinned',
  MESSAGE_NOT_PINNED: 'Message is not pinned',
  PIN_LIMIT_REACHED: 'Room has reached maximum pinned messages',

  // General errors
  MONGODB_NOT_CONNECTED: 'Chat service is temporarily unavailable',
  INVALID_CURSOR: 'Invalid pagination cursor',
  INVALID_ROOM_ID: 'Invalid room ID format',
  INVALID_MESSAGE_ID: 'Invalid message ID format',
} as const;
