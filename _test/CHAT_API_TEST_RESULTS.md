# Chat Module - API Test Results & Examples

> Comprehensive test documentation with curl examples and expected responses

## Test Environment

| Component  | Status     |
| ---------- | ---------- |
| PostgreSQL | ✅ Running |
| Neo4j      | ✅ Running |
| MongoDB    | ✅ Running |

### Seeded Data Summary

| Collection       | Count |
| ---------------- | ----- |
| Users            | 1,003 |
| Direct Rooms     | 50    |
| Group Rooms      | 21    |
| Room Memberships | 312   |
| Messages         | 1,552 |
| Reactions        | 472   |
| Read Receipts    | 5,375 |
| Pinned Messages  | 11    |
| Posts            | 100   |

---

## Prerequisites

Start the server:

```bash
pnpm start:dev
```

Server runs at: `http://localhost:3000`

---

## Authentication

All chat endpoints require a JWT token. First, login to get a token:

### Login Request

```bash
curl -X POST http://localhost:3000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "zackriver.dev@gmail.com",
    "password": "*A01201024880z#"
  }'
```

### Expected Response

```json
{
  "success": true,
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIs...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIs...",
    "user": {
      "id": "de2be5b2-113a-4466-a6de-35e387391600",
      "email": "zackriver.dev@gmail.com",
      "name": "Zack River",
      "image": null,
      "emailVerified": true
    }
  }
}
```

**Save the accessToken for subsequent requests:**

```bash
export TOKEN="your-access-token-here"
```

---

## Room API Tests

### Test 1: Get User's Rooms

```bash
curl -X GET "http://localhost:3000/api/v1/chat/rooms?page=1&limit=10" \
  -H "Authorization: Bearer $TOKEN"
```

**Expected Response:**

```json
{
  "success": true,
  "data": {
    "data": [
      {
        "_id": "675787a08e892ab3c63f9d71",
        "type": "GROUP",
        "name": "Development Team",
        "description": "Internal chat for the development team",
        "imageUrl": "https://picsum.photos/200/200?random=devteam",
        "createdById": "f762f8c3-4960-4b3b-bdf3-b582c4b632bf",
        "lastMessageAt": "2025-12-10T01:50:00.000Z",
        "lastMessagePreview": "I'll be working on the read receipts feature",
        "memberCount": 3,
        "unreadCount": 0
      }
    ],
    "pagination": {
      "hasMore": false,
      "total": 1
    }
  }
}
```

---

### Test 2: Create Direct Room

```bash
# First get another user ID
curl -X GET "http://localhost:3000/api/v1/profile/search?query=ziad" \
  -H "Authorization: Bearer $TOKEN"

# Create direct room
curl -X POST http://localhost:3000/api/v1/chat/rooms/direct \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "f762f8c3-4960-4b3b-bdf3-b582c4b632bf"
  }'
```

**Expected Response:**

```json
{
  "success": true,
  "data": {
    "_id": "675789123abc...",
    "type": "DIRECT",
    "createdById": "de2be5b2-113a-4466-a6de-35e387391600",
    "createdAt": "2025-12-10T03:55:00.000Z",
    "members": [
      {
        "userId": "de2be5b2-113a-4466-a6de-35e387391600",
        "role": "MEMBER",
        "user": { "id": "...", "name": "Zack River" }
      },
      {
        "userId": "f762f8c3-4960-4b3b-bdf3-b582c4b632bf",
        "role": "MEMBER",
        "user": { "id": "...", "name": "Ziad Hamdy" }
      }
    ],
    "memberCount": 2
  }
}
```

---

### Test 3: Create Group Room

```bash
curl -X POST http://localhost:3000/api/v1/chat/rooms/group \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Group Chat",
    "description": "Testing the chat module",
    "memberIds": [
      "f762f8c3-4960-4b3b-bdf3-b582c4b632bf",
      "139017ce-35e4-4b1c-b16e-7bc98d0dcf44"
    ]
  }'
```

**Expected Response:**

```json
{
  "success": true,
  "data": {
    "_id": "675789456def...",
    "type": "GROUP",
    "name": "Test Group Chat",
    "description": "Testing the chat module",
    "createdById": "de2be5b2-113a-4466-a6de-35e387391600",
    "members": [...],
    "memberCount": 3
  }
}
```

---

## Message API Tests

### Test 4: Get Messages from a Room

```bash
# Replace ROOM_ID with an actual room ID
ROOM_ID="675787a08e892ab3c63f9d71"

curl -X GET "http://localhost:3000/api/v1/chat/rooms/$ROOM_ID/messages?limit=20" \
  -H "Authorization: Bearer $TOKEN"
```

**Expected Response:**

```json
{
  "success": true,
  "data": {
    "data": [
      {
        "_id": "675787a18e892ab3c63f9d80",
        "content": "Hey team! How's the chat module coming along?",
        "userId": "f762f8c3-4960-4b3b-bdf3-b582c4b632bf",
        "roomId": "675787a08e892ab3c63f9d71",
        "isEdited": false,
        "isForwarded": false,
        "createdAt": "2025-12-10T01:45:00.000Z",
        "user": {
          "id": "f762f8c3-4960-4b3b-bdf3-b582c4b632bf",
          "name": "Ziad Hamdy",
          "image": null
        },
        "reactions": [
          { "emoji": "👍", "userId": "de2be5b2-113a-4466-a6de-35e387391600" }
        ],
        "media": []
      }
    ],
    "pagination": {
      "hasMore": false,
      "nextCursor": "675787a18e892ab3c63f9d80",
      "prevCursor": "675787a18e892ab3c63f9d80"
    }
  }
}
```

---

### Test 5: Send a Message

```bash
ROOM_ID="675787a08e892ab3c63f9d71"

curl -X POST "http://localhost:3000/api/v1/chat/rooms/$ROOM_ID/messages" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "content": "Hello from the API test! 🎉"
  }'
```

**Expected Response:**

```json
{
  "success": true,
  "data": {
    "_id": "675789789ghi...",
    "content": "Hello from the API test! 🎉",
    "userId": "de2be5b2-113a-4466-a6de-35e387391600",
    "roomId": "675787a08e892ab3c63f9d71",
    "isEdited": false,
    "isForwarded": false,
    "createdAt": "2025-12-10T04:00:00.000Z"
  }
}
```

---

### Test 6: Reply to a Message

```bash
ROOM_ID="675787a08e892ab3c63f9d71"
REPLY_TO_ID="675787a18e892ab3c63f9d80"

curl -X POST "http://localhost:3000/api/v1/chat/rooms/$ROOM_ID/messages" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "content": "This is a reply message!",
    "replyToId": "'$REPLY_TO_ID'"
  }'
```

---

### Test 7: Edit a Message

```bash
MESSAGE_ID="675789789ghi..."

curl -X PATCH "http://localhost:3000/api/v1/chat/messages/$MESSAGE_ID" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "content": "Edited: Hello from the API test! 🎉 (updated)"
  }'
```

**Expected Response:**

```json
{
  "success": true,
  "data": {
    "_id": "675789789ghi...",
    "content": "Edited: Hello from the API test! 🎉 (updated)",
    "isEdited": true,
    "updatedAt": "2025-12-10T04:02:00.000Z"
  }
}
```

---

### Test 8: Delete a Message

```bash
MESSAGE_ID="675789789ghi..."

# Delete for self only
curl -X DELETE "http://localhost:3000/api/v1/chat/messages/$MESSAGE_ID" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{ "deleteForEveryone": false }'

# Delete for everyone (only owner, within 48 hours)
curl -X DELETE "http://localhost:3000/api/v1/chat/messages/$MESSAGE_ID" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{ "deleteForEveryone": true }'
```

---

## Reaction API Tests

### Test 9: Add Reaction

```bash
MESSAGE_ID="675787a18e892ab3c63f9d80"

curl -X POST "http://localhost:3000/api/v1/chat/messages/$MESSAGE_ID/reactions" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{ "emoji": "❤️" }'
```

**Expected Response:**

```json
{
  "success": true,
  "data": {
    "_id": "67578a123...",
    "messageId": "675787a18e892ab3c63f9d80",
    "userId": "de2be5b2-113a-4466-a6de-35e387391600",
    "emoji": "❤️",
    "createdAt": "2025-12-10T04:05:00.000Z"
  }
}
```

---

### Test 10: Toggle Reaction

```bash
MESSAGE_ID="675787a18e892ab3c63f9d80"

curl -X POST "http://localhost:3000/api/v1/chat/messages/$MESSAGE_ID/reactions/toggle" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{ "emoji": "🔥" }'
```

**Expected Response:**

```json
{
  "success": true,
  "data": {
    "added": true,
    "reaction": {
      "_id": "67578a456...",
      "messageId": "675787a18e892ab3c63f9d80",
      "emoji": "🔥"
    }
  }
}
```

---

### Test 11: Get Reaction Counts

```bash
MESSAGE_ID="675787a18e892ab3c63f9d80"

curl -X GET "http://localhost:3000/api/v1/chat/messages/$MESSAGE_ID/reactions" \
  -H "Authorization: Bearer $TOKEN"
```

**Expected Response:**

```json
{
  "success": true,
  "data": [
    { "emoji": "👍", "count": 2, "users": ["user1", "user2"] },
    { "emoji": "❤️", "count": 1, "users": ["user3"] },
    { "emoji": "🔥", "count": 1, "users": ["user1"] }
  ]
}
```

---

## Read Receipt API Tests

### Test 12: Mark Message as Read

```bash
MESSAGE_ID="675787a18e892ab3c63f9d80"
ROOM_ID="675787a08e892ab3c63f9d71"

curl -X POST "http://localhost:3000/api/v1/chat/messages/$MESSAGE_ID/read" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{ "roomId": "'$ROOM_ID'" }'
```

---

### Test 13: Mark All as Read

```bash
ROOM_ID="675787a08e892ab3c63f9d71"

curl -X POST "http://localhost:3000/api/v1/chat/rooms/$ROOM_ID/read-all" \
  -H "Authorization: Bearer $TOKEN"
```

**Expected Response:**

```json
{
  "success": true,
  "data": { "markedAsRead": 10 }
}
```

---

### Test 14: Get Unread Counts

```bash
# Single room
curl -X GET "http://localhost:3000/api/v1/chat/rooms/$ROOM_ID/unread-count" \
  -H "Authorization: Bearer $TOKEN"

# All rooms
curl -X GET "http://localhost:3000/api/v1/chat/unread-counts" \
  -H "Authorization: Bearer $TOKEN"
```

**Expected Response (All Rooms):**

```json
{
  "success": true,
  "data": {
    "675787a08e892ab3c63f9d71": 0,
    "675787a08e892ab3c63f9d72": 5,
    "675787a08e892ab3c63f9d73": 12
  }
}
```

---

## Search API Tests

### Test 15: Search Messages

```bash
# Search across all rooms
curl -X GET "http://localhost:3000/api/v1/chat/search?query=meeting&limit=10" \
  -H "Authorization: Bearer $TOKEN"

# Search within a specific room
curl -X GET "http://localhost:3000/api/v1/chat/search?query=hello&roomId=$ROOM_ID&limit=10" \
  -H "Authorization: Bearer $TOKEN"
```

**Expected Response:**

```json
{
  "success": true,
  "data": [
    {
      "_id": "675787a18e892ab3c63f9d85",
      "content": "Let's schedule a meeting for tomorrow",
      "userId": "f762f8c3-4960-4b3b-bdf3-b582c4b632bf",
      "roomId": "675787a08e892ab3c63f9d71",
      "createdAt": "2025-12-09T15:30:00.000Z",
      "user": { "id": "...", "name": "Ziad Hamdy" }
    }
  ]
}
```

---

## Room Statistics

### Test 16: Get Room Stats

```bash
ROOM_ID="675787a08e892ab3c63f9d71"

curl -X GET "http://localhost:3000/api/v1/chat/rooms/$ROOM_ID/stats" \
  -H "Authorization: Bearer $TOKEN"
```

**Expected Response:**

```json
{
  "success": true,
  "data": {
    "messageCount": 10,
    "unreadCount": 0
  }
}
```

---

## Pinned Messages Tests

### Test 17: Pin a Message (Admin Only)

```bash
ROOM_ID="675787a08e892ab3c63f9d71"
MESSAGE_ID="675787a18e892ab3c63f9d80"

curl -X POST "http://localhost:3000/api/v1/chat/rooms/$ROOM_ID/pin/$MESSAGE_ID" \
  -H "Authorization: Bearer $TOKEN"
```

---

### Test 18: Get Pinned Messages

```bash
curl -X GET "http://localhost:3000/api/v1/chat/rooms/$ROOM_ID/pinned" \
  -H "Authorization: Bearer $TOKEN"
```

**Expected Response:**

```json
{
  "success": true,
  "data": [
    {
      "_id": "67578b123...",
      "roomId": "675787a08e892ab3c63f9d71",
      "messageId": "675787a18e892ab3c63f9d80",
      "pinnedById": "de2be5b2-113a-4466-a6de-35e387391600",
      "pinnedAt": "2025-12-10T04:10:00.000Z"
    }
  ]
}
```

---

## WebSocket Tests

### Connect to WebSocket

```javascript
// Using Socket.IO client
import { io } from 'socket.io-client';

const socket = io('ws://localhost:3000/chat', {
  auth: { token: 'your-jwt-token' },
  transports: ['websocket'],
});

// Listen for connection
socket.on('connected', (data) => {
  console.log('Connected:', data);
});

// Join a room
socket.emit('joinRoom', { roomId: '675787a08e892ab3c63f9d71' }, (response) => {
  console.log('Joined:', response);
});

// Send a message
socket.emit(
  'message',
  {
    roomId: '675787a08e892ab3c63f9d71',
    content: 'Hello via WebSocket!',
  },
  (response) => {
    console.log('Message sent:', response);
  },
);

// Listen for new messages
socket.on('message', (message) => {
  console.log('New message:', message);
});

// Typing indicator
socket.emit('typing', { roomId: '...', isTyping: true });
socket.on('typing', ({ userId, username, isTyping }) => {
  console.log(`${username} is ${isTyping ? 'typing...' : 'stopped typing'}`);
});
```

---

## Error Response Examples

### 401 Unauthorized

```json
{
  "statusCode": 401,
  "message": "Unauthorized"
}
```

### 403 Forbidden (Not Room Member)

```json
{
  "statusCode": 403,
  "message": "You are not a member of this room",
  "error": "Forbidden"
}
```

### 404 Not Found

```json
{
  "statusCode": 404,
  "message": "Room not found",
  "error": "Not Found"
}
```

### 400 Bad Request

```json
{
  "statusCode": 400,
  "message": ["content should not be empty"],
  "error": "Bad Request"
}
```

---

## Test Summary

| Test Category | Endpoint                                 | Status   |
| ------------- | ---------------------------------------- | -------- |
| Auth          | POST /auth/login                         | ✅ Ready |
| Rooms         | GET /chat/rooms                          | ✅ Ready |
| Rooms         | POST /chat/rooms/direct                  | ✅ Ready |
| Rooms         | POST /chat/rooms/group                   | ✅ Ready |
| Messages      | GET /chat/rooms/:id/messages             | ✅ Ready |
| Messages      | POST /chat/rooms/:id/messages            | ✅ Ready |
| Messages      | PATCH /chat/messages/:id                 | ✅ Ready |
| Messages      | DELETE /chat/messages/:id                | ✅ Ready |
| Reactions     | POST /chat/messages/:id/reactions        | ✅ Ready |
| Reactions     | POST /chat/messages/:id/reactions/toggle | ✅ Ready |
| Reactions     | GET /chat/messages/:id/reactions         | ✅ Ready |
| Read Receipts | POST /chat/messages/:id/read             | ✅ Ready |
| Read Receipts | POST /chat/rooms/:id/read-all            | ✅ Ready |
| Read Receipts | GET /chat/unread-counts                  | ✅ Ready |
| Search        | GET /chat/search                         | ✅ Ready |
| Stats         | GET /chat/rooms/:id/stats                | ✅ Ready |
| Pinned        | POST /chat/rooms/:id/pin/:msgId          | ✅ Ready |
| Pinned        | GET /chat/rooms/:id/pinned               | ✅ Ready |
| WebSocket     | /chat namespace                          | ✅ Ready |

---

## Running Tests with Postman

Import the Postman collection from:
`Ding-Platform-API.postman_collection.json`

Set environment variables:

- `baseUrl`: http://localhost:3000/api/v1
- `token`: Your JWT access token

---

## Developer Accounts for Testing

| Email                       | Password         | Role      |
| --------------------------- | ---------------- | --------- |
| ziadhamdy667@gmail.com      | Password#1       | Developer |
| ziad.fathi.seleem@gmail.com | Ziad@123         | Developer |
| zackriver.dev@gmail.com     | \*A01201024880z# | Developer |

Regular users: password is `password123`
