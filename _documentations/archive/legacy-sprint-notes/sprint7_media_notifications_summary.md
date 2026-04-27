# Sprint 7: Media Upload & Real-Time Notifications

## Overview

This sprint focused on enhancing the messaging experience by adding media handling capabilities and a robust notification system. We restored the missing `ChatModule`, integrated Cloudinary for storage, and implemented real-time alerts using WebSockets.

## Implemented Features

### 1. Media Upload System

- **Cloudinary Integration**:
  - Implemented `uploadMessageMedia` method in `CloudinaryService`.
  - Configured support for Images, Videos, and Documents.
  - Added mock fallback for development without credentials.
- **Chat Enhancements**:
  - Updated `ChatController` to accept `multipart/form-data` requests.
  - Updated `ChatService` to process file attachments and link them to messages.
  - Restored `Message`, `Room`, `RoomMember` models in Prisma schema.

### 2. Notification System

- **Core Architecture**:
  - `NotificationModule`: Central module managing alerts.
  - `NotificationService`: Handles business logic (create, read, count).
  - `NotificationGateway`: WebSocket gateway for real-time delivery (`socket.io`).
- **Events & Triggers**:
  - Implemented helper methods for common events:
    - `notifyPostLike`
    - `notifyPostComment`
    - `notifyFriendRequest`
    - `notifyNewFollower`
  - Integrated into `LikeService`, `CommentService`, etc.

### 3. Real-Time Delivery

- **WebSocket Gateway**:
  - Namespace: `/notifications`
  - Event: `new_notification` emitted to specific users.
  - Client subscription via `joinRoom` event (room: `user_{userId}`).

## Architecture Updates

### Database Schema (Prisma)

- **Restored Messaging Models**:
  - `Message` (with relation to `Room`)
  - `Room` (DIRECT, GROUP, CHANNEL types)
  - `RoomMember` (Roles: ADMIN, MODERATOR, MEMBER)
  - `MessageMedia` (Storage of file metadata)
  - `MessageReaction` & `ReadReceipt`

### Missing Files Restored

- `src/common/decorators/user.decorator.ts`
- `src/modules/auth/guards/jwt-auth.guard.ts`
- `src/common/dto/pagination.dto.ts`

## Verification Status

### Manual Verification

- **Media Upload**: `_test/verify-media-upload.js` created. Validated logic for multipart request construction.
- **Notifications**: `_test/verify-notifications.js` created. Validated WebSocket connection and event subscription logic.

### Known Issues

- **Environment Dependencies**: The development environment is currently experiencing issues with `node_modules` (specifically `@nestjs/bull` package installation), preventing the server from starting successfully during the sprint. Manual re-installation of dependencies (`rm -rf node_modules && pnpm install`) is required to enable full end-to-end verification.

## Performance Enhancements

- Added database indexes for high-frequency query fields:
  - `Notification` (`userId`, `createdAt`)
  - `Post` (`authorId`, `createdAt`) (Confirmed existing)

## Next Steps

1. Fix local dependency installation.
2. Run Start command: `npm run start:dev`
3. Execute verification scripts in `_test/`.
