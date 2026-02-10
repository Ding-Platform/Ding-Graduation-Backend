# Chat Module - Frontend API Documentation

> Complete API reference for integrating the chat module into frontend applications.

## Table of Contents

1. [Authentication](#authentication)
2. [Room Management](#room-management)
3. [Messages](#messages)
4. [Reactions](#reactions)
5. [Read Receipts](#read-receipts)
6. [Pinned Messages](#pinned-messages)
7. [Search & Media](#search--media)
8. [WebSocket Integration](#websocket-integration)
9. [Data Types](#data-types)
10. [Error Handling](#error-handling)

---

## Authentication

All endpoints require JWT authentication. Include the token in the Authorization header:

```http
Authorization: Bearer <access_token>
```

---

## Room Management

### Create Room (Generic)

**POST** `/api/v1/chat/rooms`

#### Request Body

```json
{
  "type": "DIRECT" | "GROUP",
  "name": "Team Chat",              // Required for GROUP
  "description": "Project discussion",  // Optional, GROUP only
  "imageUrl": "https://...",        // Optional, GROUP only
  "memberIds": ["user-id-1", "user-id-2"]
}
```

#### Response (200 OK)

```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "type": "GROUP",
    "name": "Team Chat",
    "description": "Project discussion",
    "imageUrl": "https://picsum.photos/200/200",
    "createdById": "user-id-1",
    "lastMessageAt": "2025-12-10T01:00:00.000Z",
    "lastMessagePreview": "Hello everyone!",
    "createdAt": "2025-12-09T10:00:00.000Z",
    "updatedAt": "2025-12-10T01:00:00.000Z",
    "members": [
      {
        "_id": "507f1f77bcf86cd799439012",
        "roomId": "507f1f77bcf86cd799439011",
        "userId": "user-id-1",
        "role": "ADMIN",
        "isMuted": false,
        "isArchived": false,
        "joinedAt": "2025-12-09T10:00:00.000Z",
        "user": {
          "id": "user-id-1",
          "name": "John Doe",
          "email": "john@example.com",
          "image": "https://..."
        }
      }
    ],
    "memberCount": 3
  }
}
```

---

### Create Direct Room

**POST** `/api/v1/chat/rooms/direct`

Creates a 1:1 chat room. Returns existing room if one already exists between the users.

#### Request Body

```json
{
  "userId": "target-user-id"
}
```

#### Response (200 OK)

```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "type": "DIRECT",
    "createdById": "current-user-id",
    "createdAt": "2025-12-09T10:00:00.000Z",
    "updatedAt": "2025-12-10T01:00:00.000Z",
    "members": [
      {
        "userId": "current-user-id",
        "role": "MEMBER",
        "user": { "id": "...", "name": "John Doe", "image": "..." }
      },
      {
        "userId": "target-user-id",
        "role": "MEMBER",
        "user": { "id": "...", "name": "Jane Smith", "image": "..." }
      }
    ],
    "memberCount": 2
  }
}
```

---

### Create Group Room

**POST** `/api/v1/chat/rooms/group`

#### Request Body

```json
{
  "name": "Weekend Warriors",
  "description": "Planning weekend activities",
  "imageUrl": "https://...",
  "memberIds": ["user-id-1", "user-id-2", "user-id-3"]
}
```

---

### Get User's Rooms

**GET** `/api/v1/chat/rooms`

#### Query Parameters

| Parameter       | Type    | Default | Description             |
| --------------- | ------- | ------- | ----------------------- |
| page            | number  | 1       | Page number             |
| limit           | number  | 20      | Items per page (max 50) |
| includeArchived | boolean | false   | Include archived rooms  |

#### Response (200 OK)

```json
{
  "success": true,
  "data": {
    "data": [
      {
        "_id": "507f1f77bcf86cd799439011",
        "type": "GROUP",
        "name": "Team Chat",
        "lastMessageAt": "2025-12-10T01:00:00.000Z",
        "lastMessagePreview": "See you tomorrow!",
        "lastMessageUserId": "user-id-2",
        "memberCount": 5,
        "unreadCount": 3,
        "members": []
      }
    ],
    "pagination": {
      "hasMore": true,
      "total": 25
    }
  }
}
```

---

### Get Room Details

**GET** `/api/v1/chat/rooms/:roomId`

#### Response (200 OK)

```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "type": "GROUP",
    "name": "Team Chat",
    "description": "Project discussion",
    "imageUrl": "https://...",
    "createdById": "user-id-1",
    "members": [...],
    "memberCount": 5
  }
}
```

---

### Update Room

**PATCH** `/api/v1/chat/rooms/:roomId`

> Requires ADMIN or MODERATOR role. Only works for GROUP rooms.

#### Request Body

```json
{
  "name": "New Team Name",
  "description": "Updated description",
  "imageUrl": "https://new-image-url.com"
}
```

---

### Leave Room

**POST** `/api/v1/chat/rooms/:roomId/leave`

#### Response (200 OK)

```json
{
  "success": true,
  "data": { "success": true }
}
```

---

### Add Members

**POST** `/api/v1/chat/rooms/:roomId/members`

> Requires ADMIN or MODERATOR role.

#### Request Body

```json
{
  "userIds": ["user-id-1", "user-id-2"]
}
```

---

### Remove Member

**DELETE** `/api/v1/chat/rooms/:roomId/members/:userId`

> Requires ADMIN or MODERATOR role.

---

### Update Member Role

**PATCH** `/api/v1/chat/rooms/:roomId/members/:userId/role`

> Requires ADMIN role.

#### Request Body

```json
{
  "role": "MODERATOR" // ADMIN | MODERATOR | MEMBER
}
```

---

### Update Room Settings (Mute/Archive)

**PATCH** `/api/v1/chat/rooms/:roomId/settings`

#### Request Body

```json
{
  "isMuted": true,
  "isArchived": false
}
```

---

## Messages

### Get Messages

**GET** `/api/v1/chat/rooms/:roomId/messages`

#### Query Parameters

| Parameter | Type   | Default  | Description                  |
| --------- | ------ | -------- | ---------------------------- |
| cursor    | string | -        | Message ID for pagination    |
| limit     | number | 50       | Number of messages (max 100) |
| direction | string | "before" | "before" or "after" cursor   |

#### Response (200 OK)

```json
{
  "success": true,
  "data": {
    "data": [
      {
        "_id": "507f1f77bcf86cd799439020",
        "content": "Hello everyone!",
        "userId": "user-id-1",
        "roomId": "507f1f77bcf86cd799439011",
        "replyToId": null,
        "isEdited": false,
        "isForwarded": false,
        "createdAt": "2025-12-10T01:00:00.000Z",
        "updatedAt": "2025-12-10T01:00:00.000Z",
        "user": {
          "id": "user-id-1",
          "name": "John Doe",
          "image": "https://..."
        },
        "reactions": [
          {
            "_id": "...",
            "messageId": "507f1f77bcf86cd799439020",
            "userId": "user-id-2",
            "emoji": "👍",
            "createdAt": "..."
          }
        ],
        "media": []
      }
    ],
    "pagination": {
      "hasMore": true,
      "nextCursor": "507f1f77bcf86cd799439019",
      "prevCursor": "507f1f77bcf86cd799439020"
    }
  }
}
```

---

### Send Message

**POST** `/api/v1/chat/rooms/:roomId/messages`

#### Request Body

```json
{
  "content": "Hello, how are you?",
  "replyToId": "507f1f77bcf86cd799439019" // Optional
}
```

#### Response (201 Created)

```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439021",
    "content": "Hello, how are you?",
    "userId": "current-user-id",
    "roomId": "507f1f77bcf86cd799439011",
    "replyToId": "507f1f77bcf86cd799439019",
    "isEdited": false,
    "isForwarded": false,
    "createdAt": "2025-12-10T01:30:00.000Z",
    "updatedAt": "2025-12-10T01:30:00.000Z"
  }
}
```

---

### Send Message with Media

**POST** `/api/v1/chat/rooms/:roomId/messages/media`

> Content-Type: multipart/form-data

#### Form Data

| Field     | Type   | Description                |
| --------- | ------ | -------------------------- |
| content   | string | Message text (optional)    |
| replyToId | string | Reply reference (optional) |
| files     | File[] | Media files (max 10)       |

#### Supported Media Types

- **Images**: image/jpeg, image/png, image/gif, image/webp (max 10MB)
- **Videos**: video/mp4, video/webm, video/quicktime (max 100MB)
- **Audio**: audio/mpeg, audio/wav, audio/ogg, audio/webm (max 25MB)
- **Voice Notes**: max 5MB
- **Documents**: max 25MB

#### Response (201 Created)

```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439022",
    "content": "Check out these photos!",
    "media": [
      {
        "_id": "...",
        "messageId": "507f1f77bcf86cd799439022",
        "url": "https://res.cloudinary.com/...",
        "type": "IMAGE",
        "fileName": "photo.jpg",
        "fileSize": 1024000,
        "mimeType": "image/jpeg",
        "width": 1920,
        "height": 1080
      }
    ]
  }
}
```

---

### Get Single Message

**GET** `/api/v1/chat/messages/:messageId`

---

### Edit Message

**PATCH** `/api/v1/chat/messages/:messageId`

> Only message owner can edit. Must be within 48 hours of creation.

#### Request Body

```json
{
  "content": "Updated message content"
}
```

---

### Delete Message

**DELETE** `/api/v1/chat/messages/:messageId`

#### Request Body

```json
{
  "deleteForEveryone": false // true = delete for all, false = delete for self
}
```

> Delete for everyone: Only message owner, within 48 hours.

---

### Forward Message

**POST** `/api/v1/chat/messages/forward`

#### Request Body

```json
{
  "messageId": "507f1f77bcf86cd799439020",
  "toRoomIds": ["room-id-1", "room-id-2"]
}
```

---

### Get Message Edit History

**GET** `/api/v1/chat/messages/:messageId/history`

#### Response (200 OK)

```json
{
  "success": true,
  "data": [
    {
      "_id": "...",
      "messageId": "507f1f77bcf86cd799439020",
      "content": "Original content",
      "editedAt": "2025-12-10T01:00:00.000Z"
    },
    {
      "_id": "...",
      "messageId": "507f1f77bcf86cd799439020",
      "content": "First edit",
      "editedAt": "2025-12-10T01:15:00.000Z"
    }
  ]
}
```

---

## Reactions

### Add Reaction

**POST** `/api/v1/chat/messages/:messageId/reactions`

#### Request Body

```json
{
  "emoji": "👍"
}
```

---

### Remove Reaction

**DELETE** `/api/v1/chat/messages/:messageId/reactions/:emoji`

> Note: Emoji must be URL-encoded (e.g., `%F0%9F%91%8D` for 👍)

---

### Toggle Reaction

**POST** `/api/v1/chat/messages/:messageId/reactions/toggle`

> Adds if not exists, removes if exists.

#### Request Body

```json
{
  "emoji": "❤️"
}
```

#### Response (200 OK)

```json
{
  "success": true,
  "data": {
    "added": true,
    "reaction": {
      "_id": "...",
      "messageId": "...",
      "userId": "...",
      "emoji": "❤️",
      "createdAt": "..."
    }
  }
}
```

---

### Get Reaction Counts

**GET** `/api/v1/chat/messages/:messageId/reactions`

#### Response (200 OK)

```json
{
  "success": true,
  "data": [
    { "emoji": "👍", "count": 5, "users": ["user-1", "user-2", "..."] },
    { "emoji": "❤️", "count": 3, "users": ["user-3", "user-4", "..."] }
  ]
}
```

---

## Read Receipts

### Mark Message as Read

**POST** `/api/v1/chat/messages/:messageId/read`

#### Request Body

```json
{
  "roomId": "507f1f77bcf86cd799439011"
}
```

---

### Mark All Messages as Read

**POST** `/api/v1/chat/rooms/:roomId/read-all`

#### Response (200 OK)

```json
{
  "success": true,
  "data": { "markedAsRead": 15 }
}
```

---

### Get Unread Count for Room

**GET** `/api/v1/chat/rooms/:roomId/unread-count`

#### Response (200 OK)

```json
{
  "success": true,
  "data": { "unreadCount": 7 }
}
```

---

### Get All Unread Counts

**GET** `/api/v1/chat/unread-counts`

#### Response (200 OK)

```json
{
  "success": true,
  "data": {
    "507f1f77bcf86cd799439011": 5,
    "507f1f77bcf86cd799439012": 0,
    "507f1f77bcf86cd799439013": 12
  }
}
```

---

## Pinned Messages

### Pin Message

**POST** `/api/v1/chat/rooms/:roomId/pin/:messageId`

> Requires ADMIN or MODERATOR role.

---

### Unpin Message

**DELETE** `/api/v1/chat/rooms/:roomId/pin/:messageId`

> Requires ADMIN or MODERATOR role.

---

### Get Pinned Messages

**GET** `/api/v1/chat/rooms/:roomId/pinned`

---

## Search & Media

### Search Messages

**GET** `/api/v1/chat/search`

#### Query Parameters

| Parameter | Type   | Description                       |
| --------- | ------ | --------------------------------- |
| query     | string | Search text (required)            |
| roomId    | string | Limit to specific room (optional) |
| limit     | number | Max results (default 50, max 100) |

#### Response (200 OK)

```json
{
  "success": true,
  "data": [
    {
      "_id": "...",
      "content": "Meeting at 3pm",
      "userId": "user-id-1",
      "roomId": "room-id-1",
      "createdAt": "...",
      "user": { "id": "...", "name": "John Doe", "image": "..." }
    }
  ]
}
```

---

### Get Media Messages

**GET** `/api/v1/chat/rooms/:roomId/media`

Returns messages that contain media attachments.

#### Query Parameters

| Parameter | Type   | Default | Description           |
| --------- | ------ | ------- | --------------------- |
| limit     | number | 50      | Max results (max 100) |

---

### Get Room Statistics

**GET** `/api/v1/chat/rooms/:roomId/stats`

#### Response (200 OK)

```json
{
  "success": true,
  "data": {
    "messageCount": 1250,
    "unreadCount": 15
  }
}
```

---

## WebSocket Integration

### Connection

The WebSocket server runs on the `/chat` namespace.

**URL**: `wss://your-api-domain.com/chat` (or `http://localhost:3000/chat` for local)

#### Authentication

You can authenticate using the standard Socket.IO `auth` object (Preferred) or `Authorization` header.

```javascript
import { io } from 'socket.io-client';

const socket = io('http://localhost:3000/chat', {
  auth: {
    token: 'your-jwt-token',
  },
  transports: ['websocket'],
});

socket.on('connected', (data) => {
  console.log('Connected:', data);
});
```

### Important: Hybrid ID System

Since the backend uses a hybrid database approach:

- **Rooms** use PostgreSQL IDs (`id` property, e.g., UUID or Integer).
- **Messages** use MongoDB IDs (`_id` property, e.g., ObjectID string).

When sending messages or joining rooms, ensure you use the correct ID property from the Room object:
`roomId: room.id` (or safely handle both with `room.id || room._id` if unsure of source).

### Events

#### Join Room

```javascript
socket.emit('joinRoom', { roomId: '507f1f77bcf86cd799439011' }, (response) => {
  if (response.error) {
    console.error(response.error);
  } else {
    console.log('Joined room:', response.roomId);
  }
});
```

#### Leave Room

```javascript
socket.emit('leaveRoom', { roomId: '507f1f77bcf86cd799439011' });
```

#### Send Message

```javascript
socket.emit(
  'message',
  {
    roomId: '507f1f77bcf86cd799439011',
    content: 'Hello everyone!',
    replyToId: null, // Optional
  },
  (response) => {
    if (response.error) {
      console.error(response.error);
    } else {
      console.log('Message sent:', response.message);
    }
  },
);
```

#### Typing Indicator

```javascript
// Start typing
socket.emit('typing', { roomId: '...', isTyping: true });

// Stop typing
socket.emit('typing', { roomId: '...', isTyping: false });

// Listen for typing
socket.on('typing', ({ userId, username, isTyping }) => {
  if (isTyping) {
    showTypingIndicator(username);
  } else {
    hideTypingIndicator(username);
  }
});
```

#### Reactions

```javascript
socket.emit(
  'reaction',
  {
    messageId: '507f1f77bcf86cd799439020',
    emoji: '👍',
  },
  (response) => {
    console.log('Reaction toggled:', response.added);
  },
);

socket.on('reaction', ({ messageId, userId, emoji, added }) => {
  updateMessageReactions(messageId, emoji, added);
});
```

#### Read Receipts

```javascript
socket.emit('messageRead', {
  messageId: '507f1f77bcf86cd799439020',
  roomId: '507f1f77bcf86cd799439011',
});

socket.on('messageRead', ({ messageId, userId, readAt }) => {
  updateMessageReadStatus(messageId, userId, readAt);
});

socket.emit('markAllRead', { roomId: '...' });
```

#### Listen for Messages

```javascript
socket.on('message', (message) => {
  // New message received
  addMessageToChat(message);
});
```

#### User Status

```javascript
socket.on('userStatus', ({ userId, status, timestamp }) => {
  // status: 'online' | 'offline'
  updateUserStatus(userId, status);
});

socket.on('userJoined', ({ userId, username, roomId }) => {
  showUserJoinedNotification(username);
});

socket.on('userLeft', ({ userId, roomId }) => {
  showUserLeftNotification(userId);
});
```

---

## Data Types

### Room Type

```typescript
type RoomType = 'DIRECT' | 'GROUP' | 'CHANNEL';
```

### Room Member Role

```typescript
type RoomMemberRole = 'ADMIN' | 'MODERATOR' | 'MEMBER';
```

### Message Media Type

```typescript
type MessageMediaType = 'IMAGE' | 'VIDEO' | 'AUDIO' | 'VOICE_NOTE' | 'DOCUMENT';
```

### Room Document

```typescript
interface Room {
  _id: string;
  type: RoomType;
  name?: string; // GROUP only
  description?: string; // GROUP only
  imageUrl?: string; // GROUP only
  createdById: string;
  lastMessageAt?: Date;
  lastMessagePreview?: string;
  lastMessageUserId?: string;
  createdAt: Date;
  updatedAt: Date;
}
```

### Message Document

```typescript
interface Message {
  _id: string;
  content: string;
  userId: string;
  roomId: string;
  replyToId?: string;
  isEdited: boolean;
  isForwarded: boolean;
  forwardedFromId?: string;
  deletedAt?: Date;
  deletedForEveryone: boolean;
  deletedForUsers: string[];
  createdAt: Date;
  updatedAt: Date;
  user?: {
    id: string;
    name: string | null;
    image?: string | null;
  };
  reactions?: Reaction[];
  media?: Media[];
}
```

---

## Error Handling

### Error Response Format

```json
{
  "success": false,
  "error": {
    "statusCode": 403,
    "message": "You are not a member of this room",
    "error": "Forbidden"
  }
}
```

### Common Error Codes

| Status | Error                 | Description              |
| ------ | --------------------- | ------------------------ |
| 400    | Bad Request           | Invalid input data       |
| 401    | Unauthorized          | Missing or invalid token |
| 403    | Forbidden             | Permission denied        |
| 404    | Not Found             | Resource not found       |
| 409    | Conflict              | Resource already exists  |
| 500    | Internal Server Error | Server error             |

### Chat-Specific Error Messages

| Message                     | Description                         |
| --------------------------- | ----------------------------------- |
| `Room not found`            | Room ID doesn't exist               |
| `Not a room member`         | User is not in the room             |
| `Not room admin`            | Admin action attempted by non-admin |
| `Message not found`         | Message ID doesn't exist            |
| `Message edit not allowed`  | Not message owner                   |
| `Edit window expired`       | Beyond 48-hour edit limit           |
| `Delete window expired`     | Beyond 48-hour delete limit         |
| `Room member limit reached` | Max 500 members                     |
| `MongoDB not connected`     | Database connection issue           |

---

## Rate Limits

| Endpoint Type   | Limit     |
| --------------- | --------- |
| Message sending | 30/minute |
| Reaction toggle | 60/minute |
| File upload     | 10/minute |

---

## Best Practices

1. **Pagination**: Always use cursor-based pagination for messages
2. **WebSocket**: Maintain connection, handle reconnection gracefully
3. **Typing**: Debounce typing events (500ms recommended)
4. **Media**: Compress images before uploading
5. **Read Receipts**: Batch read receipts when scrolling
6. **Offline**: Queue messages when offline, sync when connected
