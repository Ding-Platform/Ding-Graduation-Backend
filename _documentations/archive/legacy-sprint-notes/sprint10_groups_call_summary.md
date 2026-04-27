# Sprint 10: Group Messaging & Voice/Video Prep

## Overview

Implemented Group Chat features and WebRTC Signaling infrastructure.

## Features

### 1. Group Chat (`src/modules/chat`)

- **Schema**: Updated `User`, `RoomMember`, `Message` relations to allow rich querying.
- **Service**:
  - `createRoom(userId, { name, userIds, type: 'GROUP' })`: Creates group and adds members.
  - `addMember(roomId, userId)`: Adds a user to a group.
  - `removeMember(roomId, userId)`: Removes a user.
- **Controller**:
  - `POST /chat/rooms`: Create group (supply `type: 'GROUP'`, `userIds`).
  - `POST /chat/rooms/:id/members`: Add member.
  - `DELETE /chat/rooms/:id/members/:userId`: Remove member.

### 2. Live Call Signalng (`src/modules/call`)

- **CallGateway** (`/call` namespace):
  - `join-call`: Join signaling room.
  - `offer`: Exchange SDP offer.
  - `answer`: Exchange SDP answer.
  - `ice-candidate`: Exchange candidates.
  - `leave-call`: Leave.

## Verification

- `_test/verify-groups.js`: Test group creation and membership.
- `_test/verify-call-signaling.js`: Connection test for CallGateway.

## Next Steps

- Address environment issues (`npm install`) to run tests.
- Frontend integration for Group UI and WebRTC (SimplePeer/PeerJS).
