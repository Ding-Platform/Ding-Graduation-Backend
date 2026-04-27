# Sprint 6: Chat Module Implementation Summary

## Overview

This sprint implements a comprehensive real-time chat system with WhatsApp/Messenger-like features, using MongoDB as a dedicated database for chat data alongside the existing PostgreSQL database.

## Architecture Decisions

### Dual Database Strategy

- **PostgreSQL (Prisma)**: User data, authentication, profiles, posts, social graph
- **MongoDB**: Chat-specific data (rooms, messages, reactions, read receipts)

This approach provides:

- Optimal document storage for flexible message schemas
- Better scalability for high-volume chat operations
- Separation of concerns between social and chat features

## New Dependencies

```bash
pnpm add mongodb
```

## Environment Variables

Add to `.env`:

```env
# MongoDB Configuration (for Chat)
MONGODB_URI=mongodb://localhost:27017
MONGODB_DB_NAME=ding_chat
```

## Files Created

### Configuration

- `src/configs/mongodb/mongodb.module.ts` - Global MongoDB module
- `src/configs/mongodb/mongodb.service.ts` - MongoDB connection service with retry logic

### Schemas (MongoDB Document Interfaces)

- `src/modules/chat/schemas/message.schema.ts` - Message, reaction, media interfaces
- `src/modules/chat/schemas/room.schema.ts` - Room, member, pinned message interfaces
- `src/modules/chat/schemas/index.ts` - Re-exports

### DTOs (Data Transfer Objects)

- `src/modules/chat/dtos/message.dto.ts` - Message creation/update DTOs
- `src/modules/chat/dtos/room.dto.ts` - Room management DTOs
- `src/modules/chat/dtos/reaction.dto.ts` - Reaction DTOs
- `src/modules/chat/dtos/pagination.dto.ts` - Cursor/offset pagination DTOs
- `src/modules/chat/dtos/search.dto.ts` - Search DTOs
- `src/modules/chat/dtos/index.ts` - Re-exports

### Services

- `src/modules/chat/services/message.service.ts` - Message CRUD, search, pagination
- `src/modules/chat/services/room.service.ts` - Room management, members, pins
- `src/modules/chat/services/reaction.service.ts` - Emoji reactions
- `src/modules/chat/services/read-receipt.service.ts` - Read tracking, unread counts
- `src/modules/chat/services/media.service.ts` - Media uploads to Cloudinary
- `src/modules/chat/services/index.ts` - Re-exports

### Guards & Decorators

- `src/common/guards/room-member.guard.ts` - Verify room membership
- `src/common/guards/room-admin.guard.ts` - Verify admin/moderator role
- `src/common/decorators/current-room.decorator.ts` - Extract room from request
- `src/common/decorators/ws-current-user.decorator.ts` - Extract user from WebSocket

### Interceptors

- `src/common/interceptors/chat-room.interceptor.ts` - WebSocket room context

### Constants

- `src/common/constants/chat.constants.ts` - Chat configuration and error messages

### Controller & Gateway

- `src/modules/chat/chat.controller.ts` - REST API endpoints
- `src/modules/chat/chat.gateway.ts` - WebSocket real-time events

### Seeder

- `prisma/seed-chat.ts` - MongoDB test data seeder

## Features Implemented

### Room Management

- ✅ Create direct (1:1) rooms
- ✅ Create group rooms with multiple members
- ✅ Get user's rooms with pagination
- ✅ Update room settings (name, description, image)
- ✅ Leave room
- ✅ Add/remove members
- ✅ Update member roles (ADMIN, MODERATOR, MEMBER)
- ✅ Mute/archive rooms

### Messaging

- ✅ Send messages with validation
- ✅ Reply to messages
- ✅ Edit messages (within time window)
- ✅ Delete for self
- ✅ Delete for everyone (within time window)
- ✅ Forward messages
- ✅ View edit history
- ✅ Message search across rooms

### Media

- ✅ Image uploads
- ✅ Video uploads
- ✅ Audio/voice note uploads
- ✅ Document uploads
- ✅ Multiple attachments per message

### Reactions

- ✅ Add emoji reactions
- ✅ Remove reactions
- ✅ Toggle reactions
- ✅ Get reaction counts

### Read Receipts

- ✅ Mark message as read
- ✅ Mark all as read in room
- ✅ Get unread count per room
- ✅ Get total unread across all rooms
- ✅ Message delivery/seen status

### Pinned Messages

- ✅ Pin messages (admin only)
- ✅ Unpin messages
- ✅ Get pinned messages

### Real-time (WebSocket)

- ✅ Join/leave rooms
- ✅ Send/receive messages
- ✅ Typing indicators
- ✅ Reaction updates
- ✅ Read receipt broadcasts
- ✅ User online/offline status
- ✅ Multi-device support

## API Endpoints

### Rooms

| Method | Endpoint                                          | Description        |
| ------ | ------------------------------------------------- | ------------------ |
| POST   | `/api/v1/chat/rooms`                              | Create a room      |
| POST   | `/api/v1/chat/rooms/direct`                       | Create direct room |
| POST   | `/api/v1/chat/rooms/group`                        | Create group room  |
| GET    | `/api/v1/chat/rooms`                              | Get user's rooms   |
| GET    | `/api/v1/chat/rooms/:roomId`                      | Get room details   |
| PATCH  | `/api/v1/chat/rooms/:roomId`                      | Update room        |
| POST   | `/api/v1/chat/rooms/:roomId/leave`                | Leave room         |
| POST   | `/api/v1/chat/rooms/:roomId/members`              | Add members        |
| DELETE | `/api/v1/chat/rooms/:roomId/members/:userId`      | Remove member      |
| PATCH  | `/api/v1/chat/rooms/:roomId/members/:userId/role` | Update role        |
| PATCH  | `/api/v1/chat/rooms/:roomId/settings`             | Update settings    |

### Messages

| Method | Endpoint                                    | Description     |
| ------ | ------------------------------------------- | --------------- |
| GET    | `/api/v1/chat/rooms/:roomId/messages`       | Get messages    |
| POST   | `/api/v1/chat/rooms/:roomId/messages`       | Send message    |
| POST   | `/api/v1/chat/rooms/:roomId/messages/media` | Send with media |
| GET    | `/api/v1/chat/messages/:messageId`          | Get message     |
| PATCH  | `/api/v1/chat/messages/:messageId`          | Edit message    |
| DELETE | `/api/v1/chat/messages/:messageId`          | Delete message  |
| POST   | `/api/v1/chat/messages/forward`             | Forward message |
| GET    | `/api/v1/chat/messages/:messageId/history`  | Edit history    |

### Reactions

| Method | Endpoint                                            | Description     |
| ------ | --------------------------------------------------- | --------------- |
| POST   | `/api/v1/chat/messages/:messageId/reactions`        | Add reaction    |
| DELETE | `/api/v1/chat/messages/:messageId/reactions/:emoji` | Remove reaction |
| POST   | `/api/v1/chat/messages/:messageId/reactions/toggle` | Toggle reaction |
| GET    | `/api/v1/chat/messages/:messageId/reactions`        | Get reactions   |

### Read Receipts

| Method | Endpoint                                  | Description       |
| ------ | ----------------------------------------- | ----------------- |
| POST   | `/api/v1/chat/messages/:messageId/read`   | Mark as read      |
| POST   | `/api/v1/chat/rooms/:roomId/read-all`     | Mark all read     |
| GET    | `/api/v1/chat/rooms/:roomId/unread-count` | Get unread count  |
| GET    | `/api/v1/chat/unread-counts`              | All unread counts |

### Pinned Messages

| Method | Endpoint                                    | Description   |
| ------ | ------------------------------------------- | ------------- |
| POST   | `/api/v1/chat/rooms/:roomId/pin/:messageId` | Pin message   |
| DELETE | `/api/v1/chat/rooms/:roomId/pin/:messageId` | Unpin message |
| GET    | `/api/v1/chat/rooms/:roomId/pinned`         | Get pinned    |

### Search & Media

| Method | Endpoint                           | Description        |
| ------ | ---------------------------------- | ------------------ |
| GET    | `/api/v1/chat/search`              | Search messages    |
| GET    | `/api/v1/chat/rooms/:roomId/media` | Get media messages |
| GET    | `/api/v1/chat/rooms/:roomId/stats` | Get room stats     |

## WebSocket Events

### Client → Server

| Event         | Payload                           | Description      |
| ------------- | --------------------------------- | ---------------- |
| `joinRoom`    | `{ roomId }`                      | Join a room      |
| `leaveRoom`   | `{ roomId }`                      | Leave a room     |
| `message`     | `{ roomId, content, replyToId? }` | Send message     |
| `typing`      | `{ roomId, isTyping }`            | Typing indicator |
| `reaction`    | `{ messageId, emoji }`            | Toggle reaction  |
| `messageRead` | `{ messageId, roomId }`           | Mark as read     |
| `markAllRead` | `{ roomId }`                      | Mark all read    |

### Server → Client

| Event             | Payload                               | Description     |
| ----------------- | ------------------------------------- | --------------- |
| `connected`       | `{ userId, username }`                | Auth confirmed  |
| `message`         | Message object                        | New message     |
| `typing`          | `{ userId, username, isTyping }`      | Typing status   |
| `reaction`        | `{ messageId, userId, emoji, added }` | Reaction update |
| `messageRead`     | `{ messageId, userId, readAt }`       | Read receipt    |
| `allMessagesRead` | `{ userId, roomId, count }`           | All read        |
| `userJoined`      | `{ userId, username, roomId }`        | User joined     |
| `userLeft`        | `{ userId, roomId }`                  | User left       |
| `userStatus`      | `{ userId, status, timestamp }`       | Online status   |

## Running the Seeder

```bash
# Seed chat test data (requires PostgreSQL users to exist)
pnpm seed:chat
```

## Testing

The module can be tested via:

1. Swagger UI at `/api/docs`
2. WebSocket testing with Socket.IO client
3. Postman collection (to be created)

## MongoDB Collections

| Collection             | Description               |
| ---------------------- | ------------------------- |
| `rooms`                | Chat rooms (direct/group) |
| `room_members`         | Room membership data      |
| `messages`             | Chat messages             |
| `message_reactions`    | Emoji reactions           |
| `read_receipts`        | Message read status       |
| `pinned_messages`      | Pinned message references |
| `message_media`        | Media attachments         |
| `message_edit_history` | Edit history tracking     |

## Next Steps

- Integration testing with frontend
- Push notifications integration
- Message encryption (end-to-end)
- Voice/video calling (WebRTC)
- Message scheduling
- Message threads
- Message scheduling

## Fixes Applied

- **WebSocket Authentication**: Updated middleware and guards to support standard Socket.IO `auth: { token }` payload in addition to headers.
- **Connection Logic**: Backend validation now accepts tokens from both sources to ensure compatibility with client libraries.
- **Module Configuration**: Configured `ChatModule` to properly inject `JWT_SECRET` for WebSocket security.
- **Hybrid ID Handling**: Normalized ID access in documentation and examples to handle both PostgreSQL (`id`) and MongoDB (`_id`) usage.
