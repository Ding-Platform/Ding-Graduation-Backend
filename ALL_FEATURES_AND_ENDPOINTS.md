# Ding Platform: Complete Features & API Reference

> This document contains a comprehensive list of all implemented features, modules, and their respective API endpoints with explicit frontend parameter structures.

## 📖 How to Read & Use This Document
Welcome, Frontend Developer! This document is designed to give you everything you need to connect to the backend APIs.

1. **Table of Contents**: Click any feature area below to jump straight to its endpoints.
2. **Authentication Required**: If an endpoint says `Yes (Bearer Token)`, you must include an `Authorization: Bearer <token>` header in your request.
3. **Expected Input (Body Schema)**: For POST/PUT/PATCH requests, the required JSON payload schema is provided.
4. **Schema Definition Appendix**: If an endpoint returns an object like a `User` or `Post`, scroll to the very bottom of this document to the **Schema Definition Appendix**. It contains the exact JSON fields for every database model and payload in the system.

## 📑 Table of Contents
- [Health](#-feature-area-health)
- [Authentication](#-feature-area-authentication)
- [Users](#-feature-area-users)
- [Social](#-feature-area-social)
- [Notifications](#-feature-area-notifications)
- [Sessions](#-feature-area-sessions)
- [Profile](#-feature-area-profile)
- [Posts](#-feature-area-posts)
- [Feed](#-feature-area-feed)
- [Privacy](#-feature-area-privacy)
- [Likes](#-feature-area-likes)
- [Comments](#-feature-area-comments)
- [Chat](#-feature-area-chat)
- [Noro](#-feature-area-noro)
- [Moderation](#-feature-area-moderation)
- [Marketplace Public](#-feature-area-marketplace-public)
- [Marketplace Seller](#-feature-area-marketplace-seller)
- [Marketplace Admin](#-feature-area-marketplace-admin)
- [Calls (Sprint 16)](#-feature-area-calls-(sprint-16))
- [Noro V2 (Sprint 16)](#-feature-area-noro-v2-(sprint-16))
- [Reels (Sprint 17)](#-feature-area-reels-(sprint-17))
- [Audio Tracks (Sprint 17)](#-feature-area-audio-tracks-(sprint-17))
- [Stories (Sprint 12)](#-feature-area-stories-(sprint-12))
- [Groups (Sprint 13/20)](#-feature-area-groups-(sprint-13/20))
- [Pages (Sprint 14)](#-feature-area-pages-(sprint-14))
- [Global Search (Sprint 14)](#-feature-area-global-search-(sprint-14))
- [Live Streaming (Sprint 18)](#-feature-area-live-streaming-(sprint-18))
- [Analytics (Sprint 19)](#-feature-area-analytics-(sprint-19))
- [Events (Sprint 20)](#-feature-area-events-(sprint-20))
- [Misc](#-feature-area-misc)
- [Schema Definition Appendix](#-schema-definition-appendix)

## 📦 Feature Area: Health
Contains all endpoints and functionalities related to Health.

### App Root
**Endpoint:** `GET {{baseUrl}}`
**Authentication Required:** Unknown
**Description:** Health/root endpoint check.\n\n- Method: `GET`\n- Route: `/` (base URL)\n- Purpose: verify API root is reachable.

**Expected Input:** Query or path parameters (see URL).

**Example Response:**
```json
{
  "success": true,
  "message": "API is reachable",
  "data": {}
}
```

---

### Health Check
**Endpoint:** `GET {{baseUrl}}/health`
**Authentication Required:** No
**Description:** Auto-synced from `health.controller.ts`.

- Method: `GET`
- Route: `/health`
- Purpose: Executes `GET` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Query or path parameters (see URL).

**Example Response:**
```json
{
  "success": true,
  "message": "GET /health executed successfully",
  "data": {}
}
```

---

## 📦 Feature Area: Authentication
Contains all endpoints and functionalities related to Authentication.

### Signup
**Endpoint:** `POST {{baseUrl}}/auth/signup`
**Authentication Required:** No
**Description:** Auto-synced from `auth.controller.ts`.

- Method: `POST`
- Route: `/auth/signup`
- Purpose: Executes `POST` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input (Body Schema: `SignupRequest`):**
```json
{
  "email": "string",
  "password": "string",
  "name": "string",
  "image": "string"
}
```

**Example Response:**
```json
{
  "success": true,
  "message": "POST /auth/signup executed successfully",
  "data": {}
}
```

---

### Login (Default User)
**Endpoint:** `POST {{baseUrl}}/auth/login`
**Authentication Required:** No
**Description:** Auto-synced from `auth.controller.ts`.

- Method: `POST`
- Route: `/auth/login`
- Purpose: Executes `POST` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input (Body Schema: `LoginRequest`):**
```json
{
  "email": "string",
  "password": "string"
}
```

**Example Response:**
```json
{
  "success": true,
  "message": "POST /auth/login executed successfully",
  "data": {}
}
```

---

### Verify Email
**Endpoint:** `POST {{baseUrl}}/auth/verify-email`
**Authentication Required:** No
**Description:** Auto-synced from `auth.controller.ts`.

- Method: `POST`
- Route: `/auth/verify-email`
- Purpose: Executes `POST` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input (Body Schema: `VerifyEmailRequest`):**
```json
{
  "email": "string",
  "otp": "string"
}
```

**Example Response:**
```json
{
  "success": true,
  "message": "POST /auth/verify-email executed successfully",
  "data": {}
}
```

---

### Resend Verification
**Endpoint:** `POST {{baseUrl}}/auth/resend-verification`
**Authentication Required:** No
**Description:** Auto-synced from `auth.controller.ts`.

- Method: `POST`
- Route: `/auth/resend-verification`
- Purpose: Executes `POST` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input (Body Schema: `ResendVerificationRequest`):**
```json
{
  "email": "string"
}
```

**Example Response:**
```json
{
  "success": true,
  "message": "POST /auth/resend-verification executed successfully",
  "data": {}
}
```

---

### Forgot Password
**Endpoint:** `PATCH {{baseUrl}}/auth/forgot-password`
**Authentication Required:** No
**Description:** Auto-synced from `auth.controller.ts`.

- Method: `PATCH`
- Route: `/auth/forgot-password`
- Purpose: Executes `PATCH` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input (Body Schema: `ForgotPasswordRequest`):**
```json
{
  "email": "string"
}
```

**Example Response:**
```json
{
  "success": true,
  "message": "PATCH /auth/forgot-password executed successfully",
  "data": {}
}
```

---

### Verify Forgot Password
**Endpoint:** `PATCH {{baseUrl}}/auth/verify-forgot-password`
**Authentication Required:** No
**Description:** Auto-synced from `auth.controller.ts`.

- Method: `PATCH`
- Route: `/auth/verify-forgot-password`
- Purpose: Executes `PATCH` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input (Body Schema: `VerifyForgotPasswordRequest`):**
```json
{
  "email": "string",
  "message": "ERROR_MESSAGES.OTP_MUST_BE_6_DIGITS,",
  "otp": "string"
}
```

**Example Response:**
```json
{
  "success": true,
  "message": "PATCH /auth/verify-forgot-password executed successfully",
  "data": {}
}
```

---

### Reset Password
**Endpoint:** `PATCH {{baseUrl}}/auth/reset-password`
**Authentication Required:** No
**Description:** Auto-synced from `auth.controller.ts`.

- Method: `PATCH`
- Route: `/auth/reset-password`
- Purpose: Executes `PATCH` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input (Body Schema: `ResetPasswordRequest`):**
```json
{
  "email": "string",
  "newPassword": "string"
}
```

**Example Response:**
```json
{
  "success": true,
  "message": "PATCH /auth/reset-password executed successfully",
  "data": {}
}
```

---

### Update Password
**Endpoint:** `PATCH {{baseUrl}}/auth/update-password`
**Authentication Required:** No
**Description:** Auto-synced from `auth.controller.ts`.

- Method: `PATCH`
- Route: `/auth/update-password`
- Purpose: Executes `PATCH` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input (Body Schema: `UpdatePasswordRequest`):**
```json
{
  "oldPassword": "string",
  "newPassword": "string"
}
```

**Example Response:**
```json
{
  "success": true,
  "message": "PATCH /auth/update-password executed successfully",
  "data": {}
}
```

---

### Refresh Access Token
**Endpoint:** `POST {{baseUrl}}/auth/refresh`
**Authentication Required:** No
**Description:** Auto-synced from `auth.controller.ts`.

- Method: `POST`
- Route: `/auth/refresh`
- Purpose: Executes `POST` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Typically requires a JSON body.

**Example Response:**
```json
{
  "success": true,
  "message": "POST /auth/refresh executed successfully",
  "data": {}
}
```

---

### Get Me
**Endpoint:** `GET {{baseUrl}}/auth/me`
**Authentication Required:** No
**Description:** Auto-synced from `auth.controller.ts`.

- Method: `GET`
- Route: `/auth/me`
- Purpose: Executes `GET` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Query or path parameters (see URL).

**Example Response:**
```json
{
  "success": true,
  "message": "GET /auth/me executed successfully",
  "data": {}
}
```

---

### Logout
**Endpoint:** `DELETE {{baseUrl}}/auth/logout`
**Authentication Required:** No
**Description:** Auto-synced from `auth.controller.ts`.

- Method: `DELETE`
- Route: `/auth/logout`
- Purpose: Executes `DELETE` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Query or path parameters (see URL).

**Example Response:**
```json
{
  "success": true,
  "message": "DELETE /auth/logout executed successfully",
  "data": {}
}
```

---

### Logout All
**Endpoint:** `DELETE {{baseUrl}}/auth/logout-all`
**Authentication Required:** No
**Description:** Auto-synced from `auth.controller.ts`.

- Method: `DELETE`
- Route: `/auth/logout-all`
- Purpose: Executes `DELETE` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Query or path parameters (see URL).

**Example Response:**
```json
{
  "success": true,
  "message": "DELETE /auth/logout-all executed successfully",
  "data": {}
}
```

---

### GET /auth/google
**Endpoint:** `GET {{baseUrl}}/auth/google`
**Authentication Required:** No
**Description:** Auto-synced from `auth.controller.ts`.

- Method: `GET`
- Route: `/auth/google`
- Purpose: Executes `GET` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Query or path parameters (see URL).

**Example Response:**
```json
{
  "success": true,
  "message": "GET /auth/google executed successfully",
  "data": {}
}
```

---

### GET /auth/google/callback
**Endpoint:** `GET {{baseUrl}}/auth/google/callback`
**Authentication Required:** No
**Description:** Auto-synced from `auth.controller.ts`.

- Method: `GET`
- Route: `/auth/google/callback`
- Purpose: Executes `GET` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Query or path parameters (see URL).

**Example Response:**
```json
{
  "success": true,
  "message": "GET /auth/google/callback executed successfully",
  "data": {}
}
```

---

### POST /auth/resend-forgot-password
**Endpoint:** `POST {{baseUrl}}/auth/resend-forgot-password`
**Authentication Required:** No
**Description:** Auto-synced from `auth.controller.ts`.

- Method: `POST`
- Route: `/auth/resend-forgot-password`
- Purpose: Executes `POST` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input (Body Schema: `ResendForgotPasswordRequest`):**
```json
{
  "email": "string"
}
```

**Example Response:**
```json
{
  "success": true,
  "message": "POST /auth/resend-forgot-password executed successfully",
  "data": {}
}
```

---

## 📦 Feature Area: Users
Contains all endpoints and functionalities related to Users.

### Toggle User Activity
**Endpoint:** `PATCH {{baseUrl}}/users/{{targetUserId}}/toggle-activity`
**Authentication Required:** Unknown
**Description:** Auto-synced from `collection-existing`.

- Method: `PATCH`
- Route: `/users/{{targetUserId}}/toggle-activity`
- Purpose: Executes `PATCH` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Typically requires a JSON body.

**Example Response:**
```json
{
  "success": true,
  "message": "PATCH /users/{{targetUserId}}/toggle-activity executed successfully",
  "data": {}
}
```

---

### Delete User
**Endpoint:** `DELETE {{baseUrl}}/users/{{targetUserId}}`
**Authentication Required:** Unknown
**Description:** Auto-synced from `collection-existing`.

- Method: `DELETE`
- Route: `/users/{{targetUserId}}`
- Purpose: Executes `DELETE` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Query or path parameters (see URL).

**Example Response:**
```json
{
  "success": true,
  "message": "DELETE /users/{{targetUserId}} executed successfully",
  "data": {}
}
```

---

### GET /users/by-email
**Endpoint:** `GET {{baseUrl}}/users/by-email`
**Authentication Required:** Unknown
**Description:** Auto-synced from `user.controller.ts`.

- Method: `GET`
- Route: `/users/by-email`
- Purpose: Executes `GET` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Query or path parameters (see URL).

**Example Response:**
```json
{
  "success": true,
  "message": "GET /users/by-email executed successfully",
  "data": {}
}
```

---

### GET /users
**Endpoint:** `GET {{baseUrl}}/users`
**Authentication Required:** Unknown
**Description:** Auto-synced from `user.controller.ts`.

- Method: `GET`
- Route: `/users`
- Purpose: Executes `GET` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Query or path parameters (see URL).

**Example Response:**
```json
{
  "success": true,
  "message": "GET /users executed successfully",
  "data": {}
}
```

---

### POST /users/check-email
**Endpoint:** `POST {{baseUrl}}/users/check-email`
**Authentication Required:** Yes (Bearer Token)
**Description:** Auto-synced from `user.controller.ts`.

- Method: `POST`
- Route: `/users/check-email`
- Purpose: Executes `POST` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input (Body Schema: `CheckEmailRequest`):**
```json
{
  "email": "string"
}
```

**Example Response:**
```json
{
  "success": true,
  "message": "POST /users/check-email executed successfully",
  "data": {}
}
```

---

### POST /users
**Endpoint:** `POST {{baseUrl}}/users`
**Authentication Required:** Unknown
**Description:** Auto-synced from `user.controller.ts`.

- Method: `POST`
- Route: `/users`
- Purpose: Executes `POST` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Typically requires a JSON body.

**Example Response:**
```json
{
  "success": true,
  "message": "POST /users executed successfully",
  "data": {}
}
```

---

### PATCH /users/{{id}}/toggle-activity
**Endpoint:** `PATCH {{baseUrl}}/users/{{id}}/toggle-activity`
**Authentication Required:** Yes (Bearer Token)
**Description:** Auto-synced from `user.controller.ts`.

- Method: `PATCH`
- Route: `/users/{{id}}/toggle-activity`
- Purpose: Executes `PATCH` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Typically requires a JSON body.

**Example Response:**
```json
{
  "success": true,
  "message": "PATCH /users/{{id}}/toggle-activity executed successfully",
  "data": {}
}
```

---

### DELETE /users/{{id}}
**Endpoint:** `DELETE {{baseUrl}}/users/{{id}}`
**Authentication Required:** Yes (Bearer Token)
**Description:** Auto-synced from `user.controller.ts`.

- Method: `DELETE`
- Route: `/users/{{id}}`
- Purpose: Executes `DELETE` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Query or path parameters (see URL).

**Example Response:**
```json
{
  "success": true,
  "message": "DELETE /users/{{id}} executed successfully",
  "data": {}
}
```

---

## 📦 Feature Area: Social
Contains all endpoints and functionalities related to Social.

### Get Friend Requests
**Endpoint:** `GET {{baseUrl}}/social/friends/requests`
**Authentication Required:** Yes (Bearer Token)
**Description:** Auto-synced from `social.controller.ts`.

- Method: `GET`
- Route: `/social/friends/requests`
- Purpose: Executes `GET` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Query or path parameters (see URL).

**Example Response:**
```json
{
  "success": true,
  "message": "GET /social/friends/requests executed successfully",
  "data": {}
}
```

---

### Get Friends
**Endpoint:** `GET {{baseUrl}}/social/friends`
**Authentication Required:** Yes (Bearer Token)
**Description:** Auto-synced from `social.controller.ts`.

- Method: `GET`
- Route: `/social/friends`
- Purpose: Executes `GET` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Query or path parameters (see URL).

**Example Response:**
```json
{
  "success": true,
  "message": "GET /social/friends executed successfully",
  "data": {}
}
```

---

### Send Friend Request
**Endpoint:** `POST {{baseUrl}}/social/friends/request/{{targetUserId}}`
**Authentication Required:** Unknown
**Description:** Auto-synced from `collection-existing`.

- Method: `POST`
- Route: `/social/friends/request/{{targetUserId}}`
- Purpose: Executes `POST` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Typically requires a JSON body.

**Example Response:**
```json
{
  "success": true,
  "message": "POST /social/friends/request/{{targetUserId}} executed successfully",
  "data": {}
}
```

---

### Accept Friend Request
**Endpoint:** `POST {{baseUrl}}/social/friends/accept/{{targetUserId}}`
**Authentication Required:** Unknown
**Description:** Auto-synced from `collection-existing`.

- Method: `POST`
- Route: `/social/friends/accept/{{targetUserId}}`
- Purpose: Executes `POST` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Typically requires a JSON body.

**Example Response:**
```json
{
  "success": true,
  "message": "POST /social/friends/accept/{{targetUserId}} executed successfully",
  "data": {}
}
```

---

### Reject Friend Request
**Endpoint:** `POST {{baseUrl}}/social/friends/reject/{{targetUserId}}`
**Authentication Required:** Unknown
**Description:** Auto-synced from `collection-existing`.

- Method: `POST`
- Route: `/social/friends/reject/{{targetUserId}}`
- Purpose: Executes `POST` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Typically requires a JSON body.

**Example Response:**
```json
{
  "success": true,
  "message": "POST /social/friends/reject/{{targetUserId}} executed successfully",
  "data": {}
}
```

---

### Remove Friend
**Endpoint:** `DELETE {{baseUrl}}/social/friends/{{targetUserId}}`
**Authentication Required:** Unknown
**Description:** Auto-synced from `collection-existing`.

- Method: `DELETE`
- Route: `/social/friends/{{targetUserId}}`
- Purpose: Executes `DELETE` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Query or path parameters (see URL).

**Example Response:**
```json
{
  "success": true,
  "message": "DELETE /social/friends/{{targetUserId}} executed successfully",
  "data": {}
}
```

---

### Follow User
**Endpoint:** `POST {{baseUrl}}/social/follow/{{targetUserId}}`
**Authentication Required:** Unknown
**Description:** Auto-synced from `collection-existing`.

- Method: `POST`
- Route: `/social/follow/{{targetUserId}}`
- Purpose: Executes `POST` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Typically requires a JSON body.

**Example Response:**
```json
{
  "success": true,
  "message": "POST /social/follow/{{targetUserId}} executed successfully",
  "data": {}
}
```

---

### Unfollow User
**Endpoint:** `DELETE {{baseUrl}}/social/follow/{{targetUserId}}`
**Authentication Required:** Unknown
**Description:** Auto-synced from `collection-existing`.

- Method: `DELETE`
- Route: `/social/follow/{{targetUserId}}`
- Purpose: Executes `DELETE` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Query or path parameters (see URL).

**Example Response:**
```json
{
  "success": true,
  "message": "DELETE /social/follow/{{targetUserId}} executed successfully",
  "data": {}
}
```

---

### Get Followers
**Endpoint:** `GET {{baseUrl}}/social/followers`
**Authentication Required:** Yes (Bearer Token)
**Description:** Auto-synced from `social.controller.ts`.

- Method: `GET`
- Route: `/social/followers`
- Purpose: Executes `GET` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Query or path parameters (see URL).

**Example Response:**
```json
{
  "success": true,
  "message": "GET /social/followers executed successfully",
  "data": {}
}
```

---

### Get Following
**Endpoint:** `GET {{baseUrl}}/social/following`
**Authentication Required:** Yes (Bearer Token)
**Description:** Auto-synced from `social.controller.ts`.

- Method: `GET`
- Route: `/social/following`
- Purpose: Executes `GET` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Query or path parameters (see URL).

**Example Response:**
```json
{
  "success": true,
  "message": "GET /social/following executed successfully",
  "data": {}
}
```

---

### Friend Recommendations
**Endpoint:** `GET {{baseUrl}}/social/recommendations/friends`
**Authentication Required:** Yes (Bearer Token)
**Description:** Auto-synced from `social.controller.ts`.

- Method: `GET`
- Route: `/social/recommendations/friends`
- Purpose: Executes `GET` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Query or path parameters (see URL).

**Example Response:**
```json
{
  "success": true,
  "message": "GET /social/recommendations/friends executed successfully",
  "data": {}
}
```

---

### Follow Recommendations
**Endpoint:** `GET {{baseUrl}}/social/recommendations/follow`
**Authentication Required:** Yes (Bearer Token)
**Description:** Auto-synced from `social.controller.ts`.

- Method: `GET`
- Route: `/social/recommendations/follow`
- Purpose: Executes `GET` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Query or path parameters (see URL).

**Example Response:**
```json
{
  "success": true,
  "message": "GET /social/recommendations/follow executed successfully",
  "data": {}
}
```

---

### Social Stats
**Endpoint:** `GET {{baseUrl}}/social/stats`
**Authentication Required:** Yes (Bearer Token)
**Description:** Auto-synced from `social.controller.ts`.

- Method: `GET`
- Route: `/social/stats`
- Purpose: Executes `GET` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Query or path parameters (see URL).

**Example Response:**
```json
{
  "success": true,
  "message": "GET /social/stats executed successfully",
  "data": {}
}
```

---

### Mutual Friends
**Endpoint:** `GET {{baseUrl}}/social/mutual-friends/{{targetUserId}}`
**Authentication Required:** Unknown
**Description:** Auto-synced from `collection-existing`.

- Method: `GET`
- Route: `/social/mutual-friends/{{targetUserId}}`
- Purpose: Executes `GET` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Query or path parameters (see URL).

**Example Response:**
```json
{
  "success": true,
  "message": "GET /social/mutual-friends/{{targetUserId}} executed successfully",
  "data": {}
}
```

---

### Block User
**Endpoint:** `POST {{baseUrl}}/social/block/{{targetUserId}}`
**Authentication Required:** Unknown
**Description:** Auto-synced from `collection-existing`.

- Method: `POST`
- Route: `/social/block/{{targetUserId}}`
- Purpose: Executes `POST` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Typically requires a JSON body.

**Example Response:**
```json
{
  "success": true,
  "message": "POST /social/block/{{targetUserId}} executed successfully",
  "data": {}
}
```

---

### Unblock User
**Endpoint:** `DELETE {{baseUrl}}/social/block/{{targetUserId}}`
**Authentication Required:** Unknown
**Description:** Auto-synced from `collection-existing`.

- Method: `DELETE`
- Route: `/social/block/{{targetUserId}}`
- Purpose: Executes `DELETE` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Query or path parameters (see URL).

**Example Response:**
```json
{
  "success": true,
  "message": "DELETE /social/block/{{targetUserId}} executed successfully",
  "data": {}
}
```

---

### Get Blocked Users
**Endpoint:** `GET {{baseUrl}}/social/blocked`
**Authentication Required:** Yes (Bearer Token)
**Description:** Auto-synced from `social.controller.ts`.

- Method: `GET`
- Route: `/social/blocked`
- Purpose: Executes `GET` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Query or path parameters (see URL).

**Example Response:**
```json
{
  "success": true,
  "message": "GET /social/blocked executed successfully",
  "data": {}
}
```

---

### Mute User
**Endpoint:** `POST {{baseUrl}}/social/mute/{{targetUserId}}`
**Authentication Required:** Unknown
**Description:** Auto-synced from `collection-existing`.

- Method: `POST`
- Route: `/social/mute/{{targetUserId}}`
- Purpose: Executes `POST` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Typically requires a JSON body.

**Example Response:**
```json
{
  "success": true,
  "message": "POST /social/mute/{{targetUserId}} executed successfully",
  "data": {}
}
```

---

### Unmute User
**Endpoint:** `DELETE {{baseUrl}}/social/mute/{{targetUserId}}`
**Authentication Required:** Unknown
**Description:** Auto-synced from `collection-existing`.

- Method: `DELETE`
- Route: `/social/mute/{{targetUserId}}`
- Purpose: Executes `DELETE` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Query or path parameters (see URL).

**Example Response:**
```json
{
  "success": true,
  "message": "DELETE /social/mute/{{targetUserId}} executed successfully",
  "data": {}
}
```

---

### Get Muted Users
**Endpoint:** `GET {{baseUrl}}/social/muted`
**Authentication Required:** Yes (Bearer Token)
**Description:** Auto-synced from `social.controller.ts`.

- Method: `GET`
- Route: `/social/muted`
- Purpose: Executes `GET` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Query or path parameters (see URL).

**Example Response:**
```json
{
  "success": true,
  "message": "GET /social/muted executed successfully",
  "data": {}
}
```

---

### GET /social/mutual-friends/{{userId}}
**Endpoint:** `GET {{baseUrl}}/social/mutual-friends/{{userId}}`
**Authentication Required:** Yes (Bearer Token)
**Description:** Auto-synced from `social.controller.ts`.

- Method: `GET`
- Route: `/social/mutual-friends/{{userId}}`
- Purpose: Executes `GET` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Query or path parameters (see URL).

**Example Response:**
```json
{
  "success": true,
  "message": "GET /social/mutual-friends/{{userId}} executed successfully",
  "data": {}
}
```

---

### POST /social/friends/request/{{toUserId}}
**Endpoint:** `POST {{baseUrl}}/social/friends/request/{{toUserId}}`
**Authentication Required:** Yes (Bearer Token)
**Description:** Auto-synced from `social.controller.ts`.

- Method: `POST`
- Route: `/social/friends/request/{{toUserId}}`
- Purpose: Executes `POST` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Typically requires a JSON body.

**Example Response:**
```json
{
  "success": true,
  "message": "POST /social/friends/request/{{toUserId}} executed successfully",
  "data": {}
}
```

---

### POST /social/friends/accept/{{fromUserId}}
**Endpoint:** `POST {{baseUrl}}/social/friends/accept/{{fromUserId}}`
**Authentication Required:** Yes (Bearer Token)
**Description:** Auto-synced from `social.controller.ts`.

- Method: `POST`
- Route: `/social/friends/accept/{{fromUserId}}`
- Purpose: Executes `POST` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Typically requires a JSON body.

**Example Response:**
```json
{
  "success": true,
  "message": "POST /social/friends/accept/{{fromUserId}} executed successfully",
  "data": {}
}
```

---

### POST /social/friends/reject/{{fromUserId}}
**Endpoint:** `POST {{baseUrl}}/social/friends/reject/{{fromUserId}}`
**Authentication Required:** Yes (Bearer Token)
**Description:** Auto-synced from `social.controller.ts`.

- Method: `POST`
- Route: `/social/friends/reject/{{fromUserId}}`
- Purpose: Executes `POST` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Typically requires a JSON body.

**Example Response:**
```json
{
  "success": true,
  "message": "POST /social/friends/reject/{{fromUserId}} executed successfully",
  "data": {}
}
```

---

### POST /social/follow/{{userId}}
**Endpoint:** `POST {{baseUrl}}/social/follow/{{userId}}`
**Authentication Required:** Yes (Bearer Token)
**Description:** Auto-synced from `social.controller.ts`.

- Method: `POST`
- Route: `/social/follow/{{userId}}`
- Purpose: Executes `POST` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Typically requires a JSON body.

**Example Response:**
```json
{
  "success": true,
  "message": "POST /social/follow/{{userId}} executed successfully",
  "data": {}
}
```

---

### POST /social/block/{{userId}}
**Endpoint:** `POST {{baseUrl}}/social/block/{{userId}}`
**Authentication Required:** Yes (Bearer Token)
**Description:** Auto-synced from `social.controller.ts`.

- Method: `POST`
- Route: `/social/block/{{userId}}`
- Purpose: Executes `POST` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Typically requires a JSON body.

**Example Response:**
```json
{
  "success": true,
  "message": "POST /social/block/{{userId}} executed successfully",
  "data": {}
}
```

---

### POST /social/mute/{{userId}}
**Endpoint:** `POST {{baseUrl}}/social/mute/{{userId}}`
**Authentication Required:** Yes (Bearer Token)
**Description:** Auto-synced from `social.controller.ts`.

- Method: `POST`
- Route: `/social/mute/{{userId}}`
- Purpose: Executes `POST` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Typically requires a JSON body.

**Example Response:**
```json
{
  "success": true,
  "message": "POST /social/mute/{{userId}} executed successfully",
  "data": {}
}
```

---

### DELETE /social/friends/{{userId}}
**Endpoint:** `DELETE {{baseUrl}}/social/friends/{{userId}}`
**Authentication Required:** Yes (Bearer Token)
**Description:** Auto-synced from `social.controller.ts`.

- Method: `DELETE`
- Route: `/social/friends/{{userId}}`
- Purpose: Executes `DELETE` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Query or path parameters (see URL).

**Example Response:**
```json
{
  "success": true,
  "message": "DELETE /social/friends/{{userId}} executed successfully",
  "data": {}
}
```

---

### DELETE /social/follow/{{userId}}
**Endpoint:** `DELETE {{baseUrl}}/social/follow/{{userId}}`
**Authentication Required:** Yes (Bearer Token)
**Description:** Auto-synced from `social.controller.ts`.

- Method: `DELETE`
- Route: `/social/follow/{{userId}}`
- Purpose: Executes `DELETE` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Query or path parameters (see URL).

**Example Response:**
```json
{
  "success": true,
  "message": "DELETE /social/follow/{{userId}} executed successfully",
  "data": {}
}
```

---

### DELETE /social/block/{{userId}}
**Endpoint:** `DELETE {{baseUrl}}/social/block/{{userId}}`
**Authentication Required:** Yes (Bearer Token)
**Description:** Auto-synced from `social.controller.ts`.

- Method: `DELETE`
- Route: `/social/block/{{userId}}`
- Purpose: Executes `DELETE` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Query or path parameters (see URL).

**Example Response:**
```json
{
  "success": true,
  "message": "DELETE /social/block/{{userId}} executed successfully",
  "data": {}
}
```

---

### DELETE /social/mute/{{userId}}
**Endpoint:** `DELETE {{baseUrl}}/social/mute/{{userId}}`
**Authentication Required:** Yes (Bearer Token)
**Description:** Auto-synced from `social.controller.ts`.

- Method: `DELETE`
- Route: `/social/mute/{{userId}}`
- Purpose: Executes `DELETE` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Query or path parameters (see URL).

**Example Response:**
```json
{
  "success": true,
  "message": "DELETE /social/mute/{{userId}} executed successfully",
  "data": {}
}
```

---

## 📦 Feature Area: Notifications
Contains all endpoints and functionalities related to Notifications.

### Get Notifications
**Endpoint:** `GET {{baseUrl}}/notifications`
**Authentication Required:** Yes (Bearer Token)
**Description:** Auto-synced from `notification.controller.ts`.

- Method: `GET`
- Route: `/notifications`
- Purpose: Executes `GET` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Query or path parameters (see URL).

**Example Response:**
```json
{
  "success": true,
  "message": "GET /notifications executed successfully",
  "data": {}
}
```

---

### Unread Count
**Endpoint:** `GET {{baseUrl}}/notifications/unread-count`
**Authentication Required:** Yes (Bearer Token)
**Description:** Auto-synced from `notification.controller.ts`.

- Method: `GET`
- Route: `/notifications/unread-count`
- Purpose: Executes `GET` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Query or path parameters (see URL).

**Example Response:**
```json
{
  "success": true,
  "message": "GET /notifications/unread-count executed successfully",
  "data": {}
}
```

---

### Mark One Read
**Endpoint:** `PATCH {{baseUrl}}/notifications/{{messageId}}/read`
**Authentication Required:** Unknown
**Description:** Auto-synced from `collection-existing`.

- Method: `PATCH`
- Route: `/notifications/{{messageId}}/read`
- Purpose: Executes `PATCH` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Typically requires a JSON body.

**Example Response:**
```json
{
  "success": true,
  "message": "PATCH /notifications/{{messageId}}/read executed successfully",
  "data": {}
}
```

---

### Mark All Read
**Endpoint:** `PATCH {{baseUrl}}/notifications/read-all`
**Authentication Required:** Yes (Bearer Token)
**Description:** Auto-synced from `notification.controller.ts`.

- Method: `PATCH`
- Route: `/notifications/read-all`
- Purpose: Executes `PATCH` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Typically requires a JSON body.

**Example Response:**
```json
{
  "success": true,
  "message": "PATCH /notifications/read-all executed successfully",
  "data": {}
}
```

---

### PATCH /notifications/{{id}}/read
**Endpoint:** `PATCH {{baseUrl}}/notifications/{{id}}/read`
**Authentication Required:** Yes (Bearer Token)
**Description:** Auto-synced from `notification.controller.ts`.

- Method: `PATCH`
- Route: `/notifications/{{id}}/read`
- Purpose: Executes `PATCH` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Typically requires a JSON body.

**Example Response:**
```json
{
  "success": true,
  "message": "PATCH /notifications/{{id}}/read executed successfully",
  "data": {}
}
```

---

## 📦 Feature Area: Sessions
Contains all endpoints and functionalities related to Sessions.

### Get Sessions
**Endpoint:** `GET {{baseUrl}}/sessions`
**Authentication Required:** No
**Description:** Auto-synced from `session.controller.ts`.

- Method: `GET`
- Route: `/sessions`
- Purpose: Executes `GET` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Query or path parameters (see URL).

**Example Response:**
```json
{
  "success": true,
  "message": "GET /sessions executed successfully",
  "data": {}
}
```

---

## 📦 Feature Area: Profile
Contains all endpoints and functionalities related to Profile.

### Search Profiles
**Endpoint:** `GET {{baseUrl}}/profile/search?query=john&page=1&limit=10`
**Authentication Required:** No
**Description:** Auto-synced from `profile.controller.ts`.

- Method: `GET`
- Route: `/profile/search`
- Purpose: Executes `GET` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Query or path parameters (see URL).

**Example Response:**
```json
{
  "success": true,
  "message": "GET /profile/search executed successfully",
  "data": {}
}
```

---

### Get My Profile
**Endpoint:** `GET {{baseUrl}}/profile/me`
**Authentication Required:** No
**Description:** Auto-synced from `profile.controller.ts`.

- Method: `GET`
- Route: `/profile/me`
- Purpose: Executes `GET` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Query or path parameters (see URL).

**Example Response:**
```json
{
  "success": true,
  "message": "GET /profile/me executed successfully",
  "data": {}
}
```

---

### Get Profile By UserId
**Endpoint:** `GET {{baseUrl}}/profile/{{userId}}`
**Authentication Required:** No
**Description:** Auto-synced from `profile.controller.ts`.

- Method: `GET`
- Route: `/profile/{{userId}}`
- Purpose: Executes `GET` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Query or path parameters (see URL).

**Example Response:**
```json
{
  "success": true,
  "message": "GET /profile/{{userId}} executed successfully",
  "data": {}
}
```

---

### Create/Update Profile
**Endpoint:** `PUT {{baseUrl}}/profile`
**Authentication Required:** No
**Description:** Auto-synced from `profile.controller.ts`.

- Method: `PUT`
- Route: `/profile`
- Purpose: Executes `PUT` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Typically requires a JSON body.

**Example Response:**
```json
{
  "success": true,
  "message": "PUT /profile executed successfully",
  "data": {}
}
```

---

### Upload Profile Picture
**Endpoint:** `PATCH {{baseUrl}}/profile/picture`
**Authentication Required:** No
**Description:** Auto-synced from `profile.controller.ts`.

- Method: `PATCH`
- Route: `/profile/picture`
- Purpose: Executes `PATCH` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Typically requires a JSON body.

**Example Response:**
```json
{
  "success": true,
  "message": "PATCH /profile/picture executed successfully",
  "data": {}
}
```

---

### Upload Cover Photo
**Endpoint:** `PATCH {{baseUrl}}/profile/cover`
**Authentication Required:** No
**Description:** Auto-synced from `profile.controller.ts`.

- Method: `PATCH`
- Route: `/profile/cover`
- Purpose: Executes `PATCH` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Typically requires a JSON body.

**Example Response:**
```json
{
  "success": true,
  "message": "PATCH /profile/cover executed successfully",
  "data": {}
}
```

---

### Update Privacy Settings
**Endpoint:** `PATCH {{baseUrl}}/profile/privacy`
**Authentication Required:** No
**Description:** Auto-synced from `profile.controller.ts`.

- Method: `PATCH`
- Route: `/profile/privacy`
- Purpose: Executes `PATCH` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Typically requires a JSON body.

**Example Response:**
```json
{
  "success": true,
  "message": "PATCH /profile/privacy executed successfully",
  "data": {}
}
```

---

### Delete Profile
**Endpoint:** `DELETE {{baseUrl}}/profile`
**Authentication Required:** No
**Description:** Auto-synced from `profile.controller.ts`.

- Method: `DELETE`
- Route: `/profile`
- Purpose: Executes `DELETE` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Query or path parameters (see URL).

**Example Response:**
```json
{
  "success": true,
  "message": "DELETE /profile executed successfully",
  "data": {}
}
```

---

## 📦 Feature Area: Posts
Contains all endpoints and functionalities related to Posts.

### List Posts
**Endpoint:** `GET {{baseUrl}}/posts?page=1&limit=10`
**Authentication Required:** Yes (Bearer Token)
**Description:** Auto-synced from `post.controller.ts`.

- Method: `GET`
- Route: `/posts`
- Purpose: Executes `GET` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Query or path parameters (see URL).

**Example Response:**
```json
{
  "success": true,
  "message": "GET /posts executed successfully",
  "data": {}
}
```

---

### Posts Count
**Endpoint:** `GET {{baseUrl}}/posts/count`
**Authentication Required:** Yes (Bearer Token)
**Description:** Auto-synced from `post.controller.ts`.

- Method: `GET`
- Route: `/posts/count`
- Purpose: Executes `GET` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Query or path parameters (see URL).

**Example Response:**
```json
{
  "success": true,
  "message": "GET /posts/count executed successfully",
  "data": {}
}
```

---

### Saved Posts
**Endpoint:** `GET {{baseUrl}}/posts/saved`
**Authentication Required:** Yes (Bearer Token)
**Description:** Auto-synced from `post.controller.ts`.

- Method: `GET`
- Route: `/posts/saved`
- Purpose: Executes `GET` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Query or path parameters (see URL).

**Example Response:**
```json
{
  "success": true,
  "message": "GET /posts/saved executed successfully",
  "data": {}
}
```

---

### Get Post By Id
**Endpoint:** `GET {{baseUrl}}/posts/{{postId}}`
**Authentication Required:** Unknown
**Description:** Auto-synced from `collection-existing`.

- Method: `GET`
- Route: `/posts/{{postId}}`
- Purpose: Executes `GET` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Query or path parameters (see URL).

**Example Response:**
```json
{
  "success": true,
  "message": "GET /posts/{{postId}} executed successfully",
  "data": {}
}
```

---

### Create Post
**Endpoint:** `POST {{baseUrl}}/posts/create`
**Authentication Required:** Yes (Bearer Token)
**Description:** Auto-synced from `post.controller.ts`.

- Method: `POST`
- Route: `/posts/create`
- Purpose: Executes `POST` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Typically requires a JSON body.

**Example Response:**
```json
{
  "success": true,
  "message": "POST /posts/create executed successfully",
  "data": {}
}
```

---

### Update Post
**Endpoint:** `PUT {{baseUrl}}/posts/{{postId}}`
**Authentication Required:** Unknown
**Description:** Auto-synced from `collection-existing`.

- Method: `PUT`
- Route: `/posts/{{postId}}`
- Purpose: Executes `PUT` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Typically requires a JSON body.

**Example Response:**
```json
{
  "success": true,
  "message": "PUT /posts/{{postId}} executed successfully",
  "data": {}
}
```

---

### Like/Unlike Post Toggle
**Endpoint:** `POST {{baseUrl}}/posts/{{postId}}/like`
**Authentication Required:** Unknown
**Description:** Auto-synced from `collection-existing`.

- Method: `POST`
- Route: `/posts/{{postId}}/like`
- Purpose: Executes `POST` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Typically requires a JSON body.

**Example Response:**
```json
{
  "success": true,
  "message": "POST /posts/{{postId}}/like executed successfully",
  "data": {}
}
```

---

### Save/Unsave Post Toggle
**Endpoint:** `POST {{baseUrl}}/posts/{{postId}}/save`
**Authentication Required:** Unknown
**Description:** Auto-synced from `collection-existing`.

- Method: `POST`
- Route: `/posts/{{postId}}/save`
- Purpose: Executes `POST` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Typically requires a JSON body.

**Example Response:**
```json
{
  "success": true,
  "message": "POST /posts/{{postId}}/save executed successfully",
  "data": {}
}
```

---

### Post History
**Endpoint:** `GET {{baseUrl}}/posts/{{postId}}/history`
**Authentication Required:** Unknown
**Description:** Auto-synced from `collection-existing`.

- Method: `GET`
- Route: `/posts/{{postId}}/history`
- Purpose: Executes `GET` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Query or path parameters (see URL).

**Example Response:**
```json
{
  "success": true,
  "message": "GET /posts/{{postId}}/history executed successfully",
  "data": {}
}
```

---

### Create Post Comment
**Endpoint:** `POST {{baseUrl}}/posts/{{postId}}/comments`
**Authentication Required:** Unknown
**Description:** Auto-synced from `collection-existing`.

- Method: `POST`
- Route: `/posts/{{postId}}/comments`
- Purpose: Executes `POST` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Typically requires a JSON body.

**Example Response:**
```json
{
  "success": true,
  "message": "POST /posts/{{postId}}/comments executed successfully",
  "data": {}
}
```

---

### Get Post Comments
**Endpoint:** `GET {{baseUrl}}/posts/{{postId}}/comments`
**Authentication Required:** Unknown
**Description:** Auto-synced from `collection-existing`.

- Method: `GET`
- Route: `/posts/{{postId}}/comments`
- Purpose: Executes `GET` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Query or path parameters (see URL).

**Example Response:**
```json
{
  "success": true,
  "message": "GET /posts/{{postId}}/comments executed successfully",
  "data": {}
}
```

---

### Get Post Likes
**Endpoint:** `GET {{baseUrl}}/posts/{{postId}}/likes`
**Authentication Required:** Unknown
**Description:** Auto-synced from `collection-existing`.

- Method: `GET`
- Route: `/posts/{{postId}}/likes`
- Purpose: Executes `GET` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Query or path parameters (see URL).

**Example Response:**
```json
{
  "success": true,
  "message": "GET /posts/{{postId}}/likes executed successfully",
  "data": {}
}
```

---

### Delete Post Comment
**Endpoint:** `DELETE {{baseUrl}}/posts/comments/{{commentId}}`
**Authentication Required:** Unknown
**Description:** Auto-synced from `collection-existing`.

- Method: `DELETE`
- Route: `/posts/comments/{{commentId}}`
- Purpose: Executes `DELETE` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Query or path parameters (see URL).

**Example Response:**
```json
{
  "success": true,
  "message": "DELETE /posts/comments/{{commentId}} executed successfully",
  "data": {}
}
```

---

### Delete Post
**Endpoint:** `DELETE {{baseUrl}}/posts/{{postId}}`
**Authentication Required:** Unknown
**Description:** Auto-synced from `collection-existing`.

- Method: `DELETE`
- Route: `/posts/{{postId}}`
- Purpose: Executes `DELETE` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Query or path parameters (see URL).

**Example Response:**
```json
{
  "success": true,
  "message": "DELETE /posts/{{postId}} executed successfully",
  "data": {}
}
```

---

### GET /posts/{{id}}
**Endpoint:** `GET {{baseUrl}}/posts/{{id}}`
**Authentication Required:** Yes (Bearer Token)
**Description:** Auto-synced from `post.controller.ts`.

- Method: `GET`
- Route: `/posts/{{id}}`
- Purpose: Executes `GET` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Query or path parameters (see URL).

**Example Response:**
```json
{
  "success": true,
  "message": "GET /posts/{{id}} executed successfully",
  "data": {}
}
```

---

### GET /posts/{{id}}/history
**Endpoint:** `GET {{baseUrl}}/posts/{{id}}/history`
**Authentication Required:** Yes (Bearer Token)
**Description:** Auto-synced from `post.controller.ts`.

- Method: `GET`
- Route: `/posts/{{id}}/history`
- Purpose: Executes `GET` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Query or path parameters (see URL).

**Example Response:**
```json
{
  "success": true,
  "message": "GET /posts/{{id}}/history executed successfully",
  "data": {}
}
```

---

### GET /posts/{{id}}/comments
**Endpoint:** `GET {{baseUrl}}/posts/{{id}}/comments`
**Authentication Required:** Yes (Bearer Token)
**Description:** Auto-synced from `post.controller.ts`.

- Method: `GET`
- Route: `/posts/{{id}}/comments`
- Purpose: Executes `GET` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Query or path parameters (see URL).

**Example Response:**
```json
{
  "success": true,
  "message": "GET /posts/{{id}}/comments executed successfully",
  "data": {}
}
```

---

### GET /posts/{{id}}/likes
**Endpoint:** `GET {{baseUrl}}/posts/{{id}}/likes`
**Authentication Required:** Yes (Bearer Token)
**Description:** Auto-synced from `post.controller.ts`.

- Method: `GET`
- Route: `/posts/{{id}}/likes`
- Purpose: Executes `GET` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Query or path parameters (see URL).

**Example Response:**
```json
{
  "success": true,
  "message": "GET /posts/{{id}}/likes executed successfully",
  "data": {}
}
```

---

### POST /posts/{{id}}/like
**Endpoint:** `POST {{baseUrl}}/posts/{{id}}/like`
**Authentication Required:** Yes (Bearer Token)
**Description:** Auto-synced from `post.controller.ts`.

- Method: `POST`
- Route: `/posts/{{id}}/like`
- Purpose: Executes `POST` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Typically requires a JSON body.

**Example Response:**
```json
{
  "success": true,
  "message": "POST /posts/{{id}}/like executed successfully",
  "data": {}
}
```

---

### POST /posts/{{id}}/save
**Endpoint:** `POST {{baseUrl}}/posts/{{id}}/save`
**Authentication Required:** Yes (Bearer Token)
**Description:** Auto-synced from `post.controller.ts`.

- Method: `POST`
- Route: `/posts/{{id}}/save`
- Purpose: Executes `POST` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Typically requires a JSON body.

**Example Response:**
```json
{
  "success": true,
  "message": "POST /posts/{{id}}/save executed successfully",
  "data": {}
}
```

---

### POST /posts/{{id}}/comments
**Endpoint:** `POST {{baseUrl}}/posts/{{id}}/comments`
**Authentication Required:** Yes (Bearer Token)
**Description:** Auto-synced from `post.controller.ts`.

- Method: `POST`
- Route: `/posts/{{id}}/comments`
- Purpose: Executes `POST` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input (Body Schema: `CreateCommentDto`):**
```json
{
  "content": "string",
  "parentId": "string"
}
```

**Example Response:**
```json
{
  "success": true,
  "message": "POST /posts/{{id}}/comments executed successfully",
  "data": {}
}
```

---

### PUT /posts/{{id}}
**Endpoint:** `PUT {{baseUrl}}/posts/{{id}}`
**Authentication Required:** Yes (Bearer Token)
**Description:** Auto-synced from `post.controller.ts`.

- Method: `PUT`
- Route: `/posts/{{id}}`
- Purpose: Executes `PUT` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input (Body Schema: `UpdatePostDto`):**
```json
{
  "message": "`Content must not exceed ${POST_CONSTANTS.VALIDATION.MAX_CONTENT_LENGTH} characters`,",
  "content": "string",
  "privacy": "PostPrivacy",
  "customAudienceIds": "string[]"
}
```

**Example Response:**
```json
{
  "success": true,
  "message": "PUT /posts/{{id}} executed successfully",
  "data": {}
}
```

---

### DELETE /posts/comments/{{id}}
**Endpoint:** `DELETE {{baseUrl}}/posts/comments/{{id}}`
**Authentication Required:** Yes (Bearer Token)
**Description:** Auto-synced from `post.controller.ts`.

- Method: `DELETE`
- Route: `/posts/comments/{{id}}`
- Purpose: Executes `DELETE` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Query or path parameters (see URL).

**Example Response:**
```json
{
  "success": true,
  "message": "DELETE /posts/comments/{{id}} executed successfully",
  "data": {}
}
```

---

### DELETE /posts/{{id}}
**Endpoint:** `DELETE {{baseUrl}}/posts/{{id}}`
**Authentication Required:** Yes (Bearer Token)
**Description:** Auto-synced from `post.controller.ts`.

- Method: `DELETE`
- Route: `/posts/{{id}}`
- Purpose: Executes `DELETE` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Query or path parameters (see URL).

**Example Response:**
```json
{
  "success": true,
  "message": "DELETE /posts/{{id}} executed successfully",
  "data": {}
}
```

---

### GET /posts/hashtag/{{tag}}
**Endpoint:** `GET {{baseUrl}}/posts/hashtag/{{tag}}`
**Authentication Required:** Yes (Bearer Token)
**Description:** Auto-synced from `post.controller.ts`.

- Method: `GET`
- Route: `/posts/hashtag/{{tag}}`
- Purpose: Executes `GET` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Query or path parameters (see URL).

**Example Response:**
```json
{
  "success": true,
  "message": "GET /posts/hashtag/{{tag}} executed successfully",
  "data": {}
}
```

---

## 📦 Feature Area: Feed
Contains all endpoints and functionalities related to Feed.

### Get Feed
**Endpoint:** `GET {{baseUrl}}/feed?type=HOME&page=1&limit=20`
**Authentication Required:** Yes (Bearer Token)
**Description:** Auto-synced from `feed.controller.ts`.

- Method: `GET`
- Route: `/feed`
- Purpose: Executes `GET` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Query or path parameters (see URL).

**Example Response:**
```json
{
  "success": true,
  "message": "GET /feed executed successfully",
  "data": {}
}
```

---

## 📦 Feature Area: Privacy
Contains all endpoints and functionalities related to Privacy.

### Get Privacy Settings
**Endpoint:** `GET {{baseUrl}}/privacy`
**Authentication Required:** Yes (Bearer Token)
**Description:** Auto-synced from `privacy.controller.ts`.

- Method: `GET`
- Route: `/privacy`
- Purpose: Executes `GET` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Query or path parameters (see URL).

**Example Response:**
```json
{
  "success": true,
  "message": "GET /privacy executed successfully",
  "data": {}
}
```

---

### Update Privacy Settings
**Endpoint:** `PATCH {{baseUrl}}/privacy`
**Authentication Required:** Yes (Bearer Token)
**Description:** Auto-synced from `privacy.controller.ts`.

- Method: `PATCH`
- Route: `/privacy`
- Purpose: Executes `PATCH` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input (Body Schema: `UpdatePrivacyDto`):**
```json
{
  "profileVisibility": "VisibilityType",
  "postsVisibility": "VisibilityType",
  "friendsVisibility": "VisibilityType",
  "bioVisibility": "VisibilityType",
  "emailVisibility": "VisibilityType",
  "phoneVisibility": "VisibilityType",
  "locationVisibility": "VisibilityType",
  "dateOfBirthVisibility": "VisibilityType",
  "whoCanSendFriendRequests": "VisibilityType",
  "whoCanMessageMe": "VisibilityType"
}
```

**Example Response:**
```json
{
  "success": true,
  "message": "PATCH /privacy executed successfully",
  "data": {}
}
```

---

## 📦 Feature Area: Likes
Contains all endpoints and functionalities related to Likes.

### Like Post
**Endpoint:** `POST {{baseUrl}}/likes/posts/{{postId}}`
**Authentication Required:** No
**Description:** Auto-synced from `like.controller.ts`.

- Method: `POST`
- Route: `/likes/posts/{{postId}}`
- Purpose: Executes `POST` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Typically requires a JSON body.

**Example Response:**
```json
{
  "success": true,
  "message": "POST /likes/posts/{{postId}} executed successfully",
  "data": {}
}
```

---

### Unlike Post
**Endpoint:** `DELETE {{baseUrl}}/likes/posts/{{postId}}`
**Authentication Required:** No
**Description:** Auto-synced from `like.controller.ts`.

- Method: `DELETE`
- Route: `/likes/posts/{{postId}}`
- Purpose: Executes `DELETE` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Query or path parameters (see URL).

**Example Response:**
```json
{
  "success": true,
  "message": "DELETE /likes/posts/{{postId}} executed successfully",
  "data": {}
}
```

---

### Like Comment
**Endpoint:** `POST {{baseUrl}}/likes/comments/{{commentId}}`
**Authentication Required:** No
**Description:** Auto-synced from `like.controller.ts`.

- Method: `POST`
- Route: `/likes/comments/{{commentId}}`
- Purpose: Executes `POST` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Typically requires a JSON body.

**Example Response:**
```json
{
  "success": true,
  "message": "POST /likes/comments/{{commentId}} executed successfully",
  "data": {}
}
```

---

### Unlike Comment
**Endpoint:** `DELETE {{baseUrl}}/likes/comments/{{commentId}}`
**Authentication Required:** No
**Description:** Auto-synced from `like.controller.ts`.

- Method: `DELETE`
- Route: `/likes/comments/{{commentId}}`
- Purpose: Executes `DELETE` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Query or path parameters (see URL).

**Example Response:**
```json
{
  "success": true,
  "message": "DELETE /likes/comments/{{commentId}} executed successfully",
  "data": {}
}
```

---

### Get Post Likes
**Endpoint:** `GET {{baseUrl}}/likes/posts/{{postId}}`
**Authentication Required:** No
**Description:** Auto-synced from `like.controller.ts`.

- Method: `GET`
- Route: `/likes/posts/{{postId}}`
- Purpose: Executes `GET` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Query or path parameters (see URL).

**Example Response:**
```json
{
  "success": true,
  "message": "GET /likes/posts/{{postId}} executed successfully",
  "data": {}
}
```

---

## 📦 Feature Area: Comments
Contains all endpoints and functionalities related to Comments.

### Create Comment
**Endpoint:** `POST {{baseUrl}}/comments/posts/{{postId}}`
**Authentication Required:** Yes (Bearer Token)
**Description:** Auto-synced from `comment.controller.ts`.

- Method: `POST`
- Route: `/comments/posts/{{postId}}`
- Purpose: Executes `POST` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input (Body Schema: `CreateCommentDto`):**
```json
{
  "content": "string",
  "parentId": "string"
}
```

**Example Response:**
```json
{
  "success": true,
  "message": "POST /comments/posts/{{postId}} executed successfully",
  "data": {}
}
```

---

### Get Post Comments
**Endpoint:** `GET {{baseUrl}}/comments/posts/{{postId}}`
**Authentication Required:** Yes (Bearer Token)
**Description:** Auto-synced from `comment.controller.ts`.

- Method: `GET`
- Route: `/comments/posts/{{postId}}`
- Purpose: Executes `GET` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Query or path parameters (see URL).

**Example Response:**
```json
{
  "success": true,
  "message": "GET /comments/posts/{{postId}} executed successfully",
  "data": {}
}
```

---

### Get Comment Replies
**Endpoint:** `GET {{baseUrl}}/comments/{{commentId}}/replies`
**Authentication Required:** Yes (Bearer Token)
**Description:** Auto-synced from `comment.controller.ts`.

- Method: `GET`
- Route: `/comments/{{commentId}}/replies`
- Purpose: Executes `GET` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Query or path parameters (see URL).

**Example Response:**
```json
{
  "success": true,
  "message": "GET /comments/{{commentId}}/replies executed successfully",
  "data": {}
}
```

---

### Update Comment
**Endpoint:** `PATCH {{baseUrl}}/comments/{{commentId}}`
**Authentication Required:** Yes (Bearer Token)
**Description:** Auto-synced from `comment.controller.ts`.

- Method: `PATCH`
- Route: `/comments/{{commentId}}`
- Purpose: Executes `PATCH` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input (Body Schema: `UpdateCommentDto`):**
```json
{
  "content": "string"
}
```

**Example Response:**
```json
{
  "success": true,
  "message": "PATCH /comments/{{commentId}} executed successfully",
  "data": {}
}
```

---

### Delete Comment
**Endpoint:** `DELETE {{baseUrl}}/comments/{{commentId}}`
**Authentication Required:** Yes (Bearer Token)
**Description:** Auto-synced from `comment.controller.ts`.

- Method: `DELETE`
- Route: `/comments/{{commentId}}`
- Purpose: Executes `DELETE` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Query or path parameters (see URL).

**Example Response:**
```json
{
  "success": true,
  "message": "DELETE /comments/{{commentId}} executed successfully",
  "data": {}
}
```

---

## 📦 Feature Area: Chat
Contains all endpoints and functionalities related to Chat.

### Create Room
**Endpoint:** `POST {{baseUrl}}/chat/rooms`
**Authentication Required:** Yes (Bearer Token)
**Description:** Auto-synced from `chat.controller.ts`.

- Method: `POST`
- Route: `/chat/rooms`
- Purpose: Executes `POST` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Typically requires a JSON body.

**Example Response:**
```json
{
  "success": true,
  "message": "POST /chat/rooms executed successfully",
  "data": {}
}
```

---

### Create Direct Room
**Endpoint:** `POST {{baseUrl}}/chat/rooms/direct`
**Authentication Required:** Yes (Bearer Token)
**Description:** Auto-synced from `chat.controller.ts`.

- Method: `POST`
- Route: `/chat/rooms/direct`
- Purpose: Executes `POST` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Typically requires a JSON body.

**Example Response:**
```json
{
  "success": true,
  "message": "POST /chat/rooms/direct executed successfully",
  "data": {}
}
```

---

### Create Group Room
**Endpoint:** `POST {{baseUrl}}/chat/rooms/group`
**Authentication Required:** Yes (Bearer Token)
**Description:** Auto-synced from `chat.controller.ts`.

- Method: `POST`
- Route: `/chat/rooms/group`
- Purpose: Executes `POST` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Typically requires a JSON body.

**Example Response:**
```json
{
  "success": true,
  "message": "POST /chat/rooms/group executed successfully",
  "data": {}
}
```

---

### Get My Rooms
**Endpoint:** `GET {{baseUrl}}/chat/rooms`
**Authentication Required:** Yes (Bearer Token)
**Description:** Auto-synced from `chat.controller.ts`.

- Method: `GET`
- Route: `/chat/rooms`
- Purpose: Executes `GET` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Query or path parameters (see URL).

**Example Response:**
```json
{
  "success": true,
  "message": "GET /chat/rooms executed successfully",
  "data": {}
}
```

---

### Get Room By Id
**Endpoint:** `GET {{baseUrl}}/chat/rooms/{{roomId}}`
**Authentication Required:** Yes (Bearer Token)
**Description:** Auto-synced from `chat.controller.ts`.

- Method: `GET`
- Route: `/chat/rooms/{{roomId}}`
- Purpose: Executes `GET` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Query or path parameters (see URL).

**Example Response:**
```json
{
  "success": true,
  "message": "GET /chat/rooms/{{roomId}} executed successfully",
  "data": {}
}
```

---

### Update Room
**Endpoint:** `PATCH {{baseUrl}}/chat/rooms/{{roomId}}`
**Authentication Required:** Yes (Bearer Token)
**Description:** Auto-synced from `chat.controller.ts`.

- Method: `PATCH`
- Route: `/chat/rooms/{{roomId}}`
- Purpose: Executes `PATCH` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Typically requires a JSON body.

**Example Response:**
```json
{
  "success": true,
  "message": "PATCH /chat/rooms/{{roomId}} executed successfully",
  "data": {}
}
```

---

### Leave Room
**Endpoint:** `POST {{baseUrl}}/chat/rooms/{{roomId}}/leave`
**Authentication Required:** Yes (Bearer Token)
**Description:** Auto-synced from `chat.controller.ts`.

- Method: `POST`
- Route: `/chat/rooms/{{roomId}}/leave`
- Purpose: Executes `POST` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Typically requires a JSON body.

**Example Response:**
```json
{
  "success": true,
  "message": "POST /chat/rooms/{{roomId}}/leave executed successfully",
  "data": {}
}
```

---

### Add Members
**Endpoint:** `POST {{baseUrl}}/chat/rooms/{{roomId}}/members`
**Authentication Required:** Yes (Bearer Token)
**Description:** Auto-synced from `chat.controller.ts`.

- Method: `POST`
- Route: `/chat/rooms/{{roomId}}/members`
- Purpose: Executes `POST` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Typically requires a JSON body.

**Example Response:**
```json
{
  "success": true,
  "message": "POST /chat/rooms/{{roomId}}/members executed successfully",
  "data": {}
}
```

---

### Remove Member
**Endpoint:** `DELETE {{baseUrl}}/chat/rooms/{{roomId}}/members/{{targetUserId}}`
**Authentication Required:** Unknown
**Description:** Auto-synced from `collection-existing`.

- Method: `DELETE`
- Route: `/chat/rooms/{{roomId}}/members/{{targetUserId}}`
- Purpose: Executes `DELETE` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Query or path parameters (see URL).

**Example Response:**
```json
{
  "success": true,
  "message": "DELETE /chat/rooms/{{roomId}}/members/{{targetUserId}} executed successfully",
  "data": {}
}
```

---

### Update Member Role
**Endpoint:** `PATCH {{baseUrl}}/chat/rooms/{{roomId}}/members/{{targetUserId}}/role`
**Authentication Required:** Unknown
**Description:** Auto-synced from `collection-existing`.

- Method: `PATCH`
- Route: `/chat/rooms/{{roomId}}/members/{{targetUserId}}/role`
- Purpose: Executes `PATCH` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Typically requires a JSON body.

**Example Response:**
```json
{
  "success": true,
  "message": "PATCH /chat/rooms/{{roomId}}/members/{{targetUserId}}/role executed successfully",
  "data": {}
}
```

---

### Update Room Settings
**Endpoint:** `PATCH {{baseUrl}}/chat/rooms/{{roomId}}/settings`
**Authentication Required:** Yes (Bearer Token)
**Description:** Auto-synced from `chat.controller.ts`.

- Method: `PATCH`
- Route: `/chat/rooms/{{roomId}}/settings`
- Purpose: Executes `PATCH` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Typically requires a JSON body.

**Example Response:**
```json
{
  "success": true,
  "message": "PATCH /chat/rooms/{{roomId}}/settings executed successfully",
  "data": {}
}
```

---

### Get Room Messages
**Endpoint:** `GET {{baseUrl}}/chat/rooms/{{roomId}}/messages?page=1&limit=20`
**Authentication Required:** Yes (Bearer Token)
**Description:** Auto-synced from `chat.controller.ts`.

- Method: `GET`
- Route: `/chat/rooms/{{roomId}}/messages`
- Purpose: Executes `GET` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Query or path parameters (see URL).

**Example Response:**
```json
{
  "success": true,
  "message": "GET /chat/rooms/{{roomId}}/messages executed successfully",
  "data": {}
}
```

---

### Send Message
**Endpoint:** `POST {{baseUrl}}/chat/rooms/{{roomId}}/messages`
**Authentication Required:** Yes (Bearer Token)
**Description:** Auto-synced from `chat.controller.ts`.

- Method: `POST`
- Route: `/chat/rooms/{{roomId}}/messages`
- Purpose: Executes `POST` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Typically requires a JSON body.

**Example Response:**
```json
{
  "success": true,
  "message": "POST /chat/rooms/{{roomId}}/messages executed successfully",
  "data": {}
}
```

---

### Send Media Message
**Endpoint:** `POST {{baseUrl}}/chat/rooms/{{roomId}}/messages/media`
**Authentication Required:** Yes (Bearer Token)
**Description:** Auto-synced from `chat.controller.ts`.

- Method: `POST`
- Route: `/chat/rooms/{{roomId}}/messages/media`
- Purpose: Executes `POST` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Typically requires a JSON body.

**Example Response:**
```json
{
  "success": true,
  "message": "POST /chat/rooms/{{roomId}}/messages/media executed successfully",
  "data": {}
}
```

---

### Get Message By Id
**Endpoint:** `GET {{baseUrl}}/chat/messages/{{messageId}}`
**Authentication Required:** Yes (Bearer Token)
**Description:** Auto-synced from `chat.controller.ts`.

- Method: `GET`
- Route: `/chat/messages/{{messageId}}`
- Purpose: Executes `GET` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Query or path parameters (see URL).

**Example Response:**
```json
{
  "success": true,
  "message": "GET /chat/messages/{{messageId}} executed successfully",
  "data": {}
}
```

---

### Update Message
**Endpoint:** `PATCH {{baseUrl}}/chat/messages/{{messageId}}`
**Authentication Required:** Yes (Bearer Token)
**Description:** Auto-synced from `chat.controller.ts`.

- Method: `PATCH`
- Route: `/chat/messages/{{messageId}}`
- Purpose: Executes `PATCH` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Typically requires a JSON body.

**Example Response:**
```json
{
  "success": true,
  "message": "PATCH /chat/messages/{{messageId}} executed successfully",
  "data": {}
}
```

---

### Delete Message
**Endpoint:** `DELETE {{baseUrl}}/chat/messages/{{messageId}}`
**Authentication Required:** Yes (Bearer Token)
**Description:** Auto-synced from `chat.controller.ts`.

- Method: `DELETE`
- Route: `/chat/messages/{{messageId}}`
- Purpose: Executes `DELETE` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Query or path parameters (see URL).

**Example Response:**
```json
{
  "success": true,
  "message": "DELETE /chat/messages/{{messageId}} executed successfully",
  "data": {}
}
```

---

### Forward Message
**Endpoint:** `POST {{baseUrl}}/chat/messages/forward`
**Authentication Required:** Yes (Bearer Token)
**Description:** Auto-synced from `chat.controller.ts`.

- Method: `POST`
- Route: `/chat/messages/forward`
- Purpose: Executes `POST` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Typically requires a JSON body.

**Example Response:**
```json
{
  "success": true,
  "message": "POST /chat/messages/forward executed successfully",
  "data": {}
}
```

---

### Message History
**Endpoint:** `GET {{baseUrl}}/chat/messages/{{messageId}}/history`
**Authentication Required:** Yes (Bearer Token)
**Description:** Auto-synced from `chat.controller.ts`.

- Method: `GET`
- Route: `/chat/messages/{{messageId}}/history`
- Purpose: Executes `GET` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Query or path parameters (see URL).

**Example Response:**
```json
{
  "success": true,
  "message": "GET /chat/messages/{{messageId}}/history executed successfully",
  "data": {}
}
```

---

### Add Reaction
**Endpoint:** `POST {{baseUrl}}/chat/messages/{{messageId}}/reactions`
**Authentication Required:** Yes (Bearer Token)
**Description:** Auto-synced from `chat.controller.ts`.

- Method: `POST`
- Route: `/chat/messages/{{messageId}}/reactions`
- Purpose: Executes `POST` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Typically requires a JSON body.

**Example Response:**
```json
{
  "success": true,
  "message": "POST /chat/messages/{{messageId}}/reactions executed successfully",
  "data": {}
}
```

---

### Remove Reaction
**Endpoint:** `DELETE {{baseUrl}}/chat/messages/{{messageId}}/reactions/%F0%9F%91%8D`
**Authentication Required:** Unknown
**Description:** Auto-synced from `collection-existing`.

- Method: `DELETE`
- Route: `/chat/messages/{{messageId}}/reactions/%F0%9F%91%8D`
- Purpose: Executes `DELETE` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Query or path parameters (see URL).

**Example Response:**
```json
{
  "success": true,
  "message": "DELETE /chat/messages/{{messageId}}/reactions/%F0%9F%91%8D executed successfully",
  "data": {}
}
```

---

### Toggle Reaction
**Endpoint:** `POST {{baseUrl}}/chat/messages/{{messageId}}/reactions/toggle`
**Authentication Required:** Yes (Bearer Token)
**Description:** Auto-synced from `chat.controller.ts`.

- Method: `POST`
- Route: `/chat/messages/{{messageId}}/reactions/toggle`
- Purpose: Executes `POST` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Typically requires a JSON body.

**Example Response:**
```json
{
  "success": true,
  "message": "POST /chat/messages/{{messageId}}/reactions/toggle executed successfully",
  "data": {}
}
```

---

### Get Reactions
**Endpoint:** `GET {{baseUrl}}/chat/messages/{{messageId}}/reactions`
**Authentication Required:** Yes (Bearer Token)
**Description:** Auto-synced from `chat.controller.ts`.

- Method: `GET`
- Route: `/chat/messages/{{messageId}}/reactions`
- Purpose: Executes `GET` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Query or path parameters (see URL).

**Example Response:**
```json
{
  "success": true,
  "message": "GET /chat/messages/{{messageId}}/reactions executed successfully",
  "data": {}
}
```

---

### Mark Message Read
**Endpoint:** `POST {{baseUrl}}/chat/messages/{{messageId}}/read`
**Authentication Required:** Yes (Bearer Token)
**Description:** Auto-synced from `chat.controller.ts`.

- Method: `POST`
- Route: `/chat/messages/{{messageId}}/read`
- Purpose: Executes `POST` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Typically requires a JSON body.

**Example Response:**
```json
{
  "success": true,
  "message": "POST /chat/messages/{{messageId}}/read executed successfully",
  "data": {}
}
```

---

### Mark Room Read All
**Endpoint:** `POST {{baseUrl}}/chat/rooms/{{roomId}}/read-all`
**Authentication Required:** Yes (Bearer Token)
**Description:** Auto-synced from `chat.controller.ts`.

- Method: `POST`
- Route: `/chat/rooms/{{roomId}}/read-all`
- Purpose: Executes `POST` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Typically requires a JSON body.

**Example Response:**
```json
{
  "success": true,
  "message": "POST /chat/rooms/{{roomId}}/read-all executed successfully",
  "data": {}
}
```

---

### Room Unread Count
**Endpoint:** `GET {{baseUrl}}/chat/rooms/{{roomId}}/unread-count`
**Authentication Required:** Yes (Bearer Token)
**Description:** Auto-synced from `chat.controller.ts`.

- Method: `GET`
- Route: `/chat/rooms/{{roomId}}/unread-count`
- Purpose: Executes `GET` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Query or path parameters (see URL).

**Example Response:**
```json
{
  "success": true,
  "message": "GET /chat/rooms/{{roomId}}/unread-count executed successfully",
  "data": {}
}
```

---

### All Unread Counts
**Endpoint:** `GET {{baseUrl}}/chat/unread-counts`
**Authentication Required:** Yes (Bearer Token)
**Description:** Auto-synced from `chat.controller.ts`.

- Method: `GET`
- Route: `/chat/unread-counts`
- Purpose: Executes `GET` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Query or path parameters (see URL).

**Example Response:**
```json
{
  "success": true,
  "message": "GET /chat/unread-counts executed successfully",
  "data": {}
}
```

---

### Pin Message
**Endpoint:** `POST {{baseUrl}}/chat/rooms/{{roomId}}/pin/{{messageId}}`
**Authentication Required:** Yes (Bearer Token)
**Description:** Auto-synced from `chat.controller.ts`.

- Method: `POST`
- Route: `/chat/rooms/{{roomId}}/pin/{{messageId}}`
- Purpose: Executes `POST` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Typically requires a JSON body.

**Example Response:**
```json
{
  "success": true,
  "message": "POST /chat/rooms/{{roomId}}/pin/{{messageId}} executed successfully",
  "data": {}
}
```

---

### Unpin Message
**Endpoint:** `DELETE {{baseUrl}}/chat/rooms/{{roomId}}/pin/{{messageId}}`
**Authentication Required:** Yes (Bearer Token)
**Description:** Auto-synced from `chat.controller.ts`.

- Method: `DELETE`
- Route: `/chat/rooms/{{roomId}}/pin/{{messageId}}`
- Purpose: Executes `DELETE` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Query or path parameters (see URL).

**Example Response:**
```json
{
  "success": true,
  "message": "DELETE /chat/rooms/{{roomId}}/pin/{{messageId}} executed successfully",
  "data": {}
}
```

---

### Get Pinned Messages
**Endpoint:** `GET {{baseUrl}}/chat/rooms/{{roomId}}/pinned`
**Authentication Required:** Yes (Bearer Token)
**Description:** Auto-synced from `chat.controller.ts`.

- Method: `GET`
- Route: `/chat/rooms/{{roomId}}/pinned`
- Purpose: Executes `GET` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Query or path parameters (see URL).

**Example Response:**
```json
{
  "success": true,
  "message": "GET /chat/rooms/{{roomId}}/pinned executed successfully",
  "data": {}
}
```

---

### Search Messages
**Endpoint:** `GET {{baseUrl}}/chat/search?query=hello`
**Authentication Required:** Yes (Bearer Token)
**Description:** Auto-synced from `chat.controller.ts`.

- Method: `GET`
- Route: `/chat/search`
- Purpose: Executes `GET` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Query or path parameters (see URL).

**Example Response:**
```json
{
  "success": true,
  "message": "GET /chat/search executed successfully",
  "data": {}
}
```

---

### Get Room Media
**Endpoint:** `GET {{baseUrl}}/chat/rooms/{{roomId}}/media`
**Authentication Required:** Yes (Bearer Token)
**Description:** Auto-synced from `chat.controller.ts`.

- Method: `GET`
- Route: `/chat/rooms/{{roomId}}/media`
- Purpose: Executes `GET` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Query or path parameters (see URL).

**Example Response:**
```json
{
  "success": true,
  "message": "GET /chat/rooms/{{roomId}}/media executed successfully",
  "data": {}
}
```

---

### Room Stats
**Endpoint:** `GET {{baseUrl}}/chat/rooms/{{roomId}}/stats`
**Authentication Required:** Yes (Bearer Token)
**Description:** Auto-synced from `chat.controller.ts`.

- Method: `GET`
- Route: `/chat/rooms/{{roomId}}/stats`
- Purpose: Executes `GET` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Query or path parameters (see URL).

**Example Response:**
```json
{
  "success": true,
  "message": "GET /chat/rooms/{{roomId}}/stats executed successfully",
  "data": {}
}
```

---

### PATCH /chat/rooms/{{roomId}}/members/{{userId}}/role
**Endpoint:** `PATCH {{baseUrl}}/chat/rooms/{{roomId}}/members/{{userId}}/role`
**Authentication Required:** Yes (Bearer Token)
**Description:** Auto-synced from `chat.controller.ts`.

- Method: `PATCH`
- Route: `/chat/rooms/{{roomId}}/members/{{userId}}/role`
- Purpose: Executes `PATCH` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Typically requires a JSON body.

**Example Response:**
```json
{
  "success": true,
  "message": "PATCH /chat/rooms/{{roomId}}/members/{{userId}}/role executed successfully",
  "data": {}
}
```

---

### DELETE /chat/rooms/{{roomId}}/members/{{userId}}
**Endpoint:** `DELETE {{baseUrl}}/chat/rooms/{{roomId}}/members/{{userId}}`
**Authentication Required:** Yes (Bearer Token)
**Description:** Auto-synced from `chat.controller.ts`.

- Method: `DELETE`
- Route: `/chat/rooms/{{roomId}}/members/{{userId}}`
- Purpose: Executes `DELETE` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Query or path parameters (see URL).

**Example Response:**
```json
{
  "success": true,
  "message": "DELETE /chat/rooms/{{roomId}}/members/{{userId}} executed successfully",
  "data": {}
}
```

---

### DELETE /chat/messages/{{messageId}}/reactions/{{emoji}}
**Endpoint:** `DELETE {{baseUrl}}/chat/messages/{{messageId}}/reactions/{{emoji}}`
**Authentication Required:** Yes (Bearer Token)
**Description:** Auto-synced from `chat.controller.ts`.

- Method: `DELETE`
- Route: `/chat/messages/{{messageId}}/reactions/{{emoji}}`
- Purpose: Executes `DELETE` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Query or path parameters (see URL).

**Example Response:**
```json
{
  "success": true,
  "message": "DELETE /chat/messages/{{messageId}}/reactions/{{emoji}} executed successfully",
  "data": {}
}
```

---

## 📦 Feature Area: Noro
Contains all endpoints and functionalities related to Noro.

### Noro Chat
**Endpoint:** `POST {{baseUrl}}/noro/chat`
**Authentication Required:** Yes (Bearer Token)
**Description:** Auto-synced from `noro.controller.ts`.

- Method: `POST`
- Route: `/noro/chat`
- Purpose: Executes `POST` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Typically requires a JSON body.

**Example Response:**
```json
{
  "success": true,
  "message": "POST /noro/chat executed successfully",
  "data": {}
}
```

---

### Noro History
**Endpoint:** `GET {{baseUrl}}/noro/history`
**Authentication Required:** Yes (Bearer Token)
**Description:** Auto-synced from `noro.controller.ts`.

- Method: `GET`
- Route: `/noro/history`
- Purpose: Executes `GET` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Query or path parameters (see URL).

**Example Response:**
```json
{
  "success": true,
  "message": "GET /noro/history executed successfully",
  "data": {}
}
```

---

### Noro Transcribe
**Endpoint:** `POST {{baseUrl}}/noro/transcribe`
**Authentication Required:** Yes (Bearer Token)
**Description:** Auto-synced from `noro.controller.ts`.

- Method: `POST`
- Route: `/noro/transcribe`
- Purpose: Executes `POST` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Typically requires a JSON body.

**Example Response:**
```json
{
  "success": true,
  "message": "POST /noro/transcribe executed successfully",
  "data": {}
}
```

---

### Noro Speak
**Endpoint:** `POST {{baseUrl}}/noro/speak`
**Authentication Required:** Yes (Bearer Token)
**Description:** Auto-synced from `noro.controller.ts`.

- Method: `POST`
- Route: `/noro/speak`
- Purpose: Executes `POST` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Typically requires a JSON body.

**Example Response:**
```json
{
  "success": true,
  "message": "POST /noro/speak executed successfully",
  "data": {}
}
```

---

## 📦 Feature Area: Moderation
Contains all endpoints and functionalities related to Moderation.

### Create Report
**Endpoint:** `POST {{baseUrl}}/moderation/report`
**Authentication Required:** Yes (Bearer Token)
**Description:** Auto-synced from `moderation.controller.ts`.

- Method: `POST`
- Route: `/moderation/report`
- Purpose: Executes `POST` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Typically requires a JSON body.

**Example Response:**
```json
{
  "success": true,
  "message": "POST /moderation/report executed successfully",
  "data": {}
}
```

---

### Get Reports
**Endpoint:** `GET {{baseUrl}}/moderation/reports`
**Authentication Required:** Yes (Bearer Token)
**Description:** Auto-synced from `moderation.controller.ts`.

- Method: `GET`
- Route: `/moderation/reports`
- Purpose: Executes `GET` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Query or path parameters (see URL).

**Example Response:**
```json
{
  "success": true,
  "message": "GET /moderation/reports executed successfully",
  "data": {}
}
```

---

### Dismiss Report
**Endpoint:** `POST {{baseUrl}}/moderation/dismiss/{{commentId}}`
**Authentication Required:** Unknown
**Description:** Auto-synced from `collection-existing`.

- Method: `POST`
- Route: `/moderation/dismiss/{{commentId}}`
- Purpose: Executes `POST` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Typically requires a JSON body.

**Example Response:**
```json
{
  "success": true,
  "message": "POST /moderation/dismiss/{{commentId}} executed successfully",
  "data": {}
}
```

---

### Ban User
**Endpoint:** `POST {{baseUrl}}/moderation/ban/{{targetUserId}}`
**Authentication Required:** Unknown
**Description:** Auto-synced from `collection-existing`.

- Method: `POST`
- Route: `/moderation/ban/{{targetUserId}}`
- Purpose: Executes `POST` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Typically requires a JSON body.

**Example Response:**
```json
{
  "success": true,
  "message": "POST /moderation/ban/{{targetUserId}} executed successfully",
  "data": {}
}
```

---

### POST /moderation/dismiss/{{id}}
**Endpoint:** `POST {{baseUrl}}/moderation/dismiss/{{id}}`
**Authentication Required:** Yes (Bearer Token)
**Description:** Auto-synced from `moderation.controller.ts`.

- Method: `POST`
- Route: `/moderation/dismiss/{{id}}`
- Purpose: Executes `POST` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Typically requires a JSON body.

**Example Response:**
```json
{
  "success": true,
  "message": "POST /moderation/dismiss/{{id}} executed successfully",
  "data": {}
}
```

---

### POST /moderation/ban/{{userId}}
**Endpoint:** `POST {{baseUrl}}/moderation/ban/{{userId}}`
**Authentication Required:** Yes (Bearer Token)
**Description:** Auto-synced from `moderation.controller.ts`.

- Method: `POST`
- Route: `/moderation/ban/{{userId}}`
- Purpose: Executes `POST` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Typically requires a JSON body.

**Example Response:**
```json
{
  "success": true,
  "message": "POST /moderation/ban/{{userId}} executed successfully",
  "data": {}
}
```

---

## 📦 Feature Area: Marketplace Public
Contains all endpoints and functionalities related to Marketplace Public.

### List Products
**Endpoint:** `GET {{baseUrl}}/marketplace/products?page=1&limit=20`
**Authentication Required:** No
**Description:** Auto-synced from `product.controller.ts`.

- Method: `GET`
- Route: `/marketplace/products`
- Purpose: Executes `GET` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Query or path parameters (see URL).

**Example Response:**
```json
{
  "success": true,
  "message": "GET /marketplace/products executed successfully",
  "data": {}
}
```

---

### Get Product
**Endpoint:** `GET {{baseUrl}}/marketplace/products/{{productId}}`
**Authentication Required:** Unknown
**Description:** Auto-synced from `collection-existing`.

- Method: `GET`
- Route: `/marketplace/products/{{productId}}`
- Purpose: Executes `GET` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Query or path parameters (see URL).

**Example Response:**
```json
{
  "success": true,
  "message": "GET /marketplace/products/{{productId}} executed successfully",
  "data": {}
}
```

---

### Buy Product
**Endpoint:** `POST {{baseUrl}}/marketplace/products/{{productId}}/buy`
**Authentication Required:** Unknown
**Description:** Auto-synced from `collection-existing`.

- Method: `POST`
- Route: `/marketplace/products/{{productId}}/buy`
- Purpose: Executes `POST` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Typically requires a JSON body.

**Example Response:**
```json
{
  "success": true,
  "message": "POST /marketplace/products/{{productId}}/buy executed successfully",
  "data": {}
}
```

---

### GET /marketplace/products/{{id}}
**Endpoint:** `GET {{baseUrl}}/marketplace/products/{{id}}`
**Authentication Required:** No
**Description:** Auto-synced from `product.controller.ts`.

- Method: `GET`
- Route: `/marketplace/products/{{id}}`
- Purpose: Executes `GET` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Query or path parameters (see URL).

**Example Response:**
```json
{
  "success": true,
  "message": "GET /marketplace/products/{{id}} executed successfully",
  "data": {}
}
```

---

### POST /marketplace/products/{{id}}/buy
**Endpoint:** `POST {{baseUrl}}/marketplace/products/{{id}}/buy`
**Authentication Required:** No
**Description:** Auto-synced from `product.controller.ts`.

- Method: `POST`
- Route: `/marketplace/products/{{id}}/buy`
- Purpose: Executes `POST` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Typically requires a JSON body.

**Example Response:**
```json
{
  "success": true,
  "message": "POST /marketplace/products/{{id}}/buy executed successfully",
  "data": {}
}
```

---

### PATCH /marketplace/products/{{id}}
**Endpoint:** `PATCH {{baseUrl}}/marketplace/products/{{id}}`
**Authentication Required:** No
**Description:** Auto-synced from `product.controller.ts`.

- Method: `PATCH`
- Route: `/marketplace/products/{{id}}`
- Purpose: Executes `PATCH` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input (Body Schema: `UpdateProductDto`):**
```json
{
  "title": "string",
  "description": "string",
  "price": "number",
  "quantity": "number",
  "categoryId": "string",
  "images": "string[]"
}
```

**Example Response:**
```json
{
  "success": true,
  "message": "PATCH /marketplace/products/{{id}} executed successfully",
  "data": {}
}
```

---

### DELETE /marketplace/products/{{id}}
**Endpoint:** `DELETE {{baseUrl}}/marketplace/products/{{id}}`
**Authentication Required:** No
**Description:** Auto-synced from `product.controller.ts`.

- Method: `DELETE`
- Route: `/marketplace/products/{{id}}`
- Purpose: Executes `DELETE` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Query or path parameters (see URL).

**Example Response:**
```json
{
  "success": true,
  "message": "DELETE /marketplace/products/{{id}} executed successfully",
  "data": {}
}
```

---

### GET /marketplace/orders/{{id}}
**Endpoint:** `GET {{baseUrl}}/marketplace/orders/{{id}}`
**Authentication Required:** Yes (Bearer Token)
**Description:** Auto-synced from `order.controller.ts`.

- Method: `GET`
- Route: `/marketplace/orders/{{id}}`
- Purpose: Executes `GET` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Query or path parameters (see URL).

**Example Response:**
```json
{
  "success": true,
  "message": "GET /marketplace/orders/{{id}} executed successfully",
  "data": {}
}
```

---

### GET /marketplace/orders
**Endpoint:** `GET {{baseUrl}}/marketplace/orders`
**Authentication Required:** Yes (Bearer Token)
**Description:** Auto-synced from `order.controller.ts`.

- Method: `GET`
- Route: `/marketplace/orders`
- Purpose: Executes `GET` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Query or path parameters (see URL).

**Example Response:**
```json
{
  "success": true,
  "message": "GET /marketplace/orders executed successfully",
  "data": {}
}
```

---

### POST /marketplace/orders/{{id}}/cancel
**Endpoint:** `POST {{baseUrl}}/marketplace/orders/{{id}}/cancel`
**Authentication Required:** Yes (Bearer Token)
**Description:** Auto-synced from `order.controller.ts`.

- Method: `POST`
- Route: `/marketplace/orders/{{id}}/cancel`
- Purpose: Executes `POST` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input (Body Schema: `CancelOrderDto`):**
```json
{
  "cancelReason": "string"
}
```

**Example Response:**
```json
{
  "success": true,
  "message": "POST /marketplace/orders/{{id}}/cancel executed successfully",
  "data": {}
}
```

---

### POST /marketplace/orders/{{id}}/dispute
**Endpoint:** `POST {{baseUrl}}/marketplace/orders/{{id}}/dispute`
**Authentication Required:** Yes (Bearer Token)
**Description:** Auto-synced from `order.controller.ts`.

- Method: `POST`
- Route: `/marketplace/orders/{{id}}/dispute`
- Purpose: Executes `POST` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input (Body Schema: `OpenDisputeDto`):**
```json
{
  "disputeReason": "string"
}
```

**Example Response:**
```json
{
  "success": true,
  "message": "POST /marketplace/orders/{{id}}/dispute executed successfully",
  "data": {}
}
```

---

### POST /marketplace/orders/{{id}}/confirm-delivery
**Endpoint:** `POST {{baseUrl}}/marketplace/orders/{{id}}/confirm-delivery`
**Authentication Required:** Yes (Bearer Token)
**Description:** Auto-synced from `order.controller.ts`.

- Method: `POST`
- Route: `/marketplace/orders/{{id}}/confirm-delivery`
- Purpose: Executes `POST` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Typically requires a JSON body.

**Example Response:**
```json
{
  "success": true,
  "message": "POST /marketplace/orders/{{id}}/confirm-delivery executed successfully",
  "data": {}
}
```

---

## 📦 Feature Area: Marketplace Seller
Contains all endpoints and functionalities related to Marketplace Seller.

### Apply Seller (multipart)
**Endpoint:** `POST {{baseUrl}}/marketplace/seller/apply`
**Authentication Required:** No
**Description:** Auto-synced from `seller-application.controller.ts`.

- Method: `POST`
- Route: `/marketplace/seller/apply`
- Purpose: Executes `POST` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Typically requires a JSON body.

**Example Response:**
```json
{
  "success": true,
  "message": "POST /marketplace/seller/apply executed successfully",
  "data": {}
}
```

---

### My Application Status
**Endpoint:** `GET {{baseUrl}}/marketplace/seller/application/status`
**Authentication Required:** No
**Description:** Auto-synced from `seller-application.controller.ts`.

- Method: `GET`
- Route: `/marketplace/seller/application/status`
- Purpose: Executes `GET` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Query or path parameters (see URL).

**Example Response:**
```json
{
  "success": true,
  "message": "GET /marketplace/seller/application/status executed successfully",
  "data": {}
}
```

---

### Get Seller Profile
**Endpoint:** `GET {{baseUrl}}/marketplace/seller/profile`
**Authentication Required:** Yes (Bearer Token)
**Description:** Auto-synced from `seller.controller.ts`.

- Method: `GET`
- Route: `/marketplace/seller/profile`
- Purpose: Executes `GET` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Query or path parameters (see URL).

**Example Response:**
```json
{
  "success": true,
  "message": "GET /marketplace/seller/profile executed successfully",
  "data": {}
}
```

---

### Update Seller Profile
**Endpoint:** `PATCH {{baseUrl}}/marketplace/seller/profile`
**Authentication Required:** Yes (Bearer Token)
**Description:** Auto-synced from `seller.controller.ts`.

- Method: `PATCH`
- Route: `/marketplace/seller/profile`
- Purpose: Executes `PATCH` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input (Body Schema: `UpdateSellerProfileDto`):**
```json
{
  "businessName": "string",
  "message": "'phoneNumber must be a valid phone number',",
  "phoneNumber": "string",
  "address": "string",
  "city": "string",
  "country": "string"
}
```

**Example Response:**
```json
{
  "success": true,
  "message": "PATCH /marketplace/seller/profile executed successfully",
  "data": {}
}
```

---

### Create Product (Seller)
**Endpoint:** `POST {{baseUrl}}/marketplace/products`
**Authentication Required:** No
**Description:** Auto-synced from `product.controller.ts`.

- Method: `POST`
- Route: `/marketplace/products`
- Purpose: Executes `POST` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input (Body Schema: `CreateProductDto`):**
```json
{
  "title": "string",
  "description": "string",
  "price": "number",
  "currency": "string",
  "quantity": "number",
  "categoryId": "string",
  "images": "string[]"
}
```

**Example Response:**
```json
{
  "success": true,
  "message": "POST /marketplace/products executed successfully",
  "data": {}
}
```

---

### Update Product (Seller)
**Endpoint:** `PATCH {{baseUrl}}/marketplace/products/{{productId}}`
**Authentication Required:** Unknown
**Description:** Auto-synced from `collection-existing`.

- Method: `PATCH`
- Route: `/marketplace/products/{{productId}}`
- Purpose: Executes `PATCH` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Typically requires a JSON body.

**Example Response:**
```json
{
  "success": true,
  "message": "PATCH /marketplace/products/{{productId}} executed successfully",
  "data": {}
}
```

---

### Delete Product (Seller)
**Endpoint:** `DELETE {{baseUrl}}/marketplace/products/{{productId}}`
**Authentication Required:** Unknown
**Description:** Auto-synced from `collection-existing`.

- Method: `DELETE`
- Route: `/marketplace/products/{{productId}}`
- Purpose: Executes `DELETE` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Query or path parameters (see URL).

**Example Response:**
```json
{
  "success": true,
  "message": "DELETE /marketplace/products/{{productId}} executed successfully",
  "data": {}
}
```

---

### My Seller Products
**Endpoint:** `GET {{baseUrl}}/marketplace/seller/products?page=1&limit=20`
**Authentication Required:** Yes (Bearer Token)
**Description:** Auto-synced from `seller.controller.ts`.

- Method: `GET`
- Route: `/marketplace/seller/products`
- Purpose: Executes `GET` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Query or path parameters (see URL).

**Example Response:**
```json
{
  "success": true,
  "message": "GET /marketplace/seller/products executed successfully",
  "data": {}
}
```

---

### My Active Deals
**Endpoint:** `GET {{baseUrl}}/marketplace/seller/deals?page=1&limit=20`
**Authentication Required:** Yes (Bearer Token)
**Description:** Auto-synced from `seller.controller.ts`.

- Method: `GET`
- Route: `/marketplace/seller/deals`
- Purpose: Executes `GET` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Query or path parameters (see URL).

**Example Response:**
```json
{
  "success": true,
  "message": "GET /marketplace/seller/deals executed successfully",
  "data": {}
}
```

---

### My Deal History
**Endpoint:** `GET {{baseUrl}}/marketplace/seller/deals/history?page=1&limit=20`
**Authentication Required:** Yes (Bearer Token)
**Description:** Auto-synced from `seller.controller.ts`.

- Method: `GET`
- Route: `/marketplace/seller/deals/history`
- Purpose: Executes `GET` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Query or path parameters (see URL).

**Example Response:**
```json
{
  "success": true,
  "message": "GET /marketplace/seller/deals/history executed successfully",
  "data": {}
}
```

---

### GET /marketplace/seller/orders
**Endpoint:** `GET {{baseUrl}}/marketplace/seller/orders`
**Authentication Required:** Yes (Bearer Token)
**Description:** Auto-synced from `seller.controller.ts`.

- Method: `GET`
- Route: `/marketplace/seller/orders`
- Purpose: Executes `GET` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Query or path parameters (see URL).

**Example Response:**
```json
{
  "success": true,
  "message": "GET /marketplace/seller/orders executed successfully",
  "data": {}
}
```

---

### GET /marketplace/seller/orders/{{id}}
**Endpoint:** `GET {{baseUrl}}/marketplace/seller/orders/{{id}}`
**Authentication Required:** Yes (Bearer Token)
**Description:** Auto-synced from `seller.controller.ts`.

- Method: `GET`
- Route: `/marketplace/seller/orders/{{id}}`
- Purpose: Executes `GET` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Query or path parameters (see URL).

**Example Response:**
```json
{
  "success": true,
  "message": "GET /marketplace/seller/orders/{{id}} executed successfully",
  "data": {}
}
```

---

### POST /marketplace/seller/orders/{{id}}/confirm-shipment
**Endpoint:** `POST {{baseUrl}}/marketplace/seller/orders/{{id}}/confirm-shipment`
**Authentication Required:** Yes (Bearer Token)
**Description:** Auto-synced from `seller.controller.ts`.

- Method: `POST`
- Route: `/marketplace/seller/orders/{{id}}/confirm-shipment`
- Purpose: Executes `POST` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Typically requires a JSON body.

**Example Response:**
```json
{
  "success": true,
  "message": "POST /marketplace/seller/orders/{{id}}/confirm-shipment executed successfully",
  "data": {}
}
```

---

## 📦 Feature Area: Marketplace Admin
Contains all endpoints and functionalities related to Marketplace Admin.

### List Pending Applications
**Endpoint:** `GET {{baseUrl}}/marketplace/admin/applications?page=1&limit=20`
**Authentication Required:** Yes (Bearer Token)
**Description:** Auto-synced from `admin-marketplace.controller.ts`.

- Method: `GET`
- Route: `/marketplace/admin/applications`
- Purpose: Executes `GET` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Query or path parameters (see URL).

**Example Response:**
```json
{
  "success": true,
  "message": "GET /marketplace/admin/applications executed successfully",
  "data": {}
}
```

---

### Get Application Detail
**Endpoint:** `GET {{baseUrl}}/marketplace/admin/applications/{{applicationId}}`
**Authentication Required:** Unknown
**Description:** Auto-synced from `collection-existing`.

- Method: `GET`
- Route: `/marketplace/admin/applications/{{applicationId}}`
- Purpose: Executes `GET` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Query or path parameters (see URL).

**Example Response:**
```json
{
  "success": true,
  "message": "GET /marketplace/admin/applications/{{applicationId}} executed successfully",
  "data": {}
}
```

---

### Approve Application
**Endpoint:** `POST {{baseUrl}}/marketplace/admin/applications/{{applicationId}}/approve`
**Authentication Required:** Unknown
**Description:** Auto-synced from `collection-existing`.

- Method: `POST`
- Route: `/marketplace/admin/applications/{{applicationId}}/approve`
- Purpose: Executes `POST` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Typically requires a JSON body.

**Example Response:**
```json
{
  "success": true,
  "message": "POST /marketplace/admin/applications/{{applicationId}}/approve executed successfully",
  "data": {}
}
```

---

### Decline Application
**Endpoint:** `POST {{baseUrl}}/marketplace/admin/applications/{{applicationId}}/decline`
**Authentication Required:** Unknown
**Description:** Auto-synced from `collection-existing`.

- Method: `POST`
- Route: `/marketplace/admin/applications/{{applicationId}}/decline`
- Purpose: Executes `POST` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Typically requires a JSON body.

**Example Response:**
```json
{
  "success": true,
  "message": "POST /marketplace/admin/applications/{{applicationId}}/decline executed successfully",
  "data": {}
}
```

---

### List Sellers
**Endpoint:** `GET {{baseUrl}}/marketplace/admin/sellers?page=1&limit=20`
**Authentication Required:** Yes (Bearer Token)
**Description:** Auto-synced from `admin-marketplace.controller.ts`.

- Method: `GET`
- Route: `/marketplace/admin/sellers`
- Purpose: Executes `GET` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Query or path parameters (see URL).

**Example Response:**
```json
{
  "success": true,
  "message": "GET /marketplace/admin/sellers executed successfully",
  "data": {}
}
```

---

### Get Seller Detail
**Endpoint:** `GET {{baseUrl}}/marketplace/admin/sellers/{{sellerUserId}}`
**Authentication Required:** Unknown
**Description:** Auto-synced from `collection-existing`.

- Method: `GET`
- Route: `/marketplace/admin/sellers/{{sellerUserId}}`
- Purpose: Executes `GET` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Query or path parameters (see URL).

**Example Response:**
```json
{
  "success": true,
  "message": "GET /marketplace/admin/sellers/{{sellerUserId}} executed successfully",
  "data": {}
}
```

---

### Ban Seller
**Endpoint:** `POST {{baseUrl}}/marketplace/admin/sellers/{{sellerUserId}}/ban`
**Authentication Required:** Unknown
**Description:** Auto-synced from `collection-existing`.

- Method: `POST`
- Route: `/marketplace/admin/sellers/{{sellerUserId}}/ban`
- Purpose: Executes `POST` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Typically requires a JSON body.

**Example Response:**
```json
{
  "success": true,
  "message": "POST /marketplace/admin/sellers/{{sellerUserId}}/ban executed successfully",
  "data": {}
}
```

---

### Unban Seller
**Endpoint:** `POST {{baseUrl}}/marketplace/admin/sellers/{{sellerUserId}}/unban`
**Authentication Required:** Unknown
**Description:** Auto-synced from `collection-existing`.

- Method: `POST`
- Route: `/marketplace/admin/sellers/{{sellerUserId}}/unban`
- Purpose: Executes `POST` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Typically requires a JSON body.

**Example Response:**
```json
{
  "success": true,
  "message": "POST /marketplace/admin/sellers/{{sellerUserId}}/unban executed successfully",
  "data": {}
}
```

---

### Suspend Seller
**Endpoint:** `POST {{baseUrl}}/marketplace/admin/sellers/{{sellerUserId}}/suspend`
**Authentication Required:** Unknown
**Description:** Auto-synced from `collection-existing`.

- Method: `POST`
- Route: `/marketplace/admin/sellers/{{sellerUserId}}/suspend`
- Purpose: Executes `POST` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Typically requires a JSON body.

**Example Response:**
```json
{
  "success": true,
  "message": "POST /marketplace/admin/sellers/{{sellerUserId}}/suspend executed successfully",
  "data": {}
}
```

---

### Unsuspend Seller
**Endpoint:** `POST {{baseUrl}}/marketplace/admin/sellers/{{sellerUserId}}/unsuspend`
**Authentication Required:** Unknown
**Description:** Auto-synced from `collection-existing`.

- Method: `POST`
- Route: `/marketplace/admin/sellers/{{sellerUserId}}/unsuspend`
- Purpose: Executes `POST` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Typically requires a JSON body.

**Example Response:**
```json
{
  "success": true,
  "message": "POST /marketplace/admin/sellers/{{sellerUserId}}/unsuspend executed successfully",
  "data": {}
}
```

---

### Cancel Deal
**Endpoint:** `POST {{baseUrl}}/marketplace/admin/deals/{{transactionId}}/cancel`
**Authentication Required:** Yes (Bearer Token)
**Description:** Auto-synced from `admin-marketplace.controller.ts`.

- Method: `POST`
- Route: `/marketplace/admin/deals/{{transactionId}}/cancel`
- Purpose: Executes `POST` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input (Body Schema: `AdminCancelDealDto`):**
```json
{
  "cause": "string"
}
```

**Example Response:**
```json
{
  "success": true,
  "message": "POST /marketplace/admin/deals/{{transactionId}}/cancel executed successfully",
  "data": {}
}
```

---

### Admin Audit Logs
**Endpoint:** `GET {{baseUrl}}/marketplace/admin/logs?page=1&limit=50`
**Authentication Required:** Yes (Bearer Token)
**Description:** Auto-synced from `admin-marketplace.controller.ts`.

- Method: `GET`
- Route: `/marketplace/admin/logs`
- Purpose: Executes `GET` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Query or path parameters (see URL).

**Example Response:**
```json
{
  "success": true,
  "message": "GET /marketplace/admin/logs executed successfully",
  "data": {}
}
```

---

### GET /marketplace/admin/applications/{{id}}
**Endpoint:** `GET {{baseUrl}}/marketplace/admin/applications/{{id}}`
**Authentication Required:** Yes (Bearer Token)
**Description:** Auto-synced from `admin-marketplace.controller.ts`.

- Method: `GET`
- Route: `/marketplace/admin/applications/{{id}}`
- Purpose: Executes `GET` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Query or path parameters (see URL).

**Example Response:**
```json
{
  "success": true,
  "message": "GET /marketplace/admin/applications/{{id}} executed successfully",
  "data": {}
}
```

---

### GET /marketplace/admin/sellers/{{userId}}
**Endpoint:** `GET {{baseUrl}}/marketplace/admin/sellers/{{userId}}`
**Authentication Required:** Yes (Bearer Token)
**Description:** Auto-synced from `admin-marketplace.controller.ts`.

- Method: `GET`
- Route: `/marketplace/admin/sellers/{{userId}}`
- Purpose: Executes `GET` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Query or path parameters (see URL).

**Example Response:**
```json
{
  "success": true,
  "message": "GET /marketplace/admin/sellers/{{userId}} executed successfully",
  "data": {}
}
```

---

### POST /marketplace/admin/applications/{{id}}/approve
**Endpoint:** `POST {{baseUrl}}/marketplace/admin/applications/{{id}}/approve`
**Authentication Required:** Yes (Bearer Token)
**Description:** Auto-synced from `admin-marketplace.controller.ts`.

- Method: `POST`
- Route: `/marketplace/admin/applications/{{id}}/approve`
- Purpose: Executes `POST` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Typically requires a JSON body.

**Example Response:**
```json
{
  "success": true,
  "message": "POST /marketplace/admin/applications/{{id}}/approve executed successfully",
  "data": {}
}
```

---

### POST /marketplace/admin/applications/{{id}}/decline
**Endpoint:** `POST {{baseUrl}}/marketplace/admin/applications/{{id}}/decline`
**Authentication Required:** Yes (Bearer Token)
**Description:** Auto-synced from `admin-marketplace.controller.ts`.

- Method: `POST`
- Route: `/marketplace/admin/applications/{{id}}/decline`
- Purpose: Executes `POST` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input (Body Schema: `AdminDeclineApplicationDto`):**
```json
{
  "reason": "string"
}
```

**Example Response:**
```json
{
  "success": true,
  "message": "POST /marketplace/admin/applications/{{id}}/decline executed successfully",
  "data": {}
}
```

---

### POST /marketplace/admin/sellers/{{userId}}/ban
**Endpoint:** `POST {{baseUrl}}/marketplace/admin/sellers/{{userId}}/ban`
**Authentication Required:** Yes (Bearer Token)
**Description:** Auto-synced from `admin-marketplace.controller.ts`.

- Method: `POST`
- Route: `/marketplace/admin/sellers/{{userId}}/ban`
- Purpose: Executes `POST` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input (Body Schema: `AdminActionWithCauseDto`):**
```json
{
  "cause": "string"
}
```

**Example Response:**
```json
{
  "success": true,
  "message": "POST /marketplace/admin/sellers/{{userId}}/ban executed successfully",
  "data": {}
}
```

---

### POST /marketplace/admin/sellers/{{userId}}/unban
**Endpoint:** `POST {{baseUrl}}/marketplace/admin/sellers/{{userId}}/unban`
**Authentication Required:** Yes (Bearer Token)
**Description:** Auto-synced from `admin-marketplace.controller.ts`.

- Method: `POST`
- Route: `/marketplace/admin/sellers/{{userId}}/unban`
- Purpose: Executes `POST` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Typically requires a JSON body.

**Example Response:**
```json
{
  "success": true,
  "message": "POST /marketplace/admin/sellers/{{userId}}/unban executed successfully",
  "data": {}
}
```

---

### POST /marketplace/admin/sellers/{{userId}}/suspend
**Endpoint:** `POST {{baseUrl}}/marketplace/admin/sellers/{{userId}}/suspend`
**Authentication Required:** Yes (Bearer Token)
**Description:** Auto-synced from `admin-marketplace.controller.ts`.

- Method: `POST`
- Route: `/marketplace/admin/sellers/{{userId}}/suspend`
- Purpose: Executes `POST` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input (Body Schema: `AdminActionWithCauseDto`):**
```json
{
  "cause": "string"
}
```

**Example Response:**
```json
{
  "success": true,
  "message": "POST /marketplace/admin/sellers/{{userId}}/suspend executed successfully",
  "data": {}
}
```

---

### POST /marketplace/admin/sellers/{{userId}}/unsuspend
**Endpoint:** `POST {{baseUrl}}/marketplace/admin/sellers/{{userId}}/unsuspend`
**Authentication Required:** Yes (Bearer Token)
**Description:** Auto-synced from `admin-marketplace.controller.ts`.

- Method: `POST`
- Route: `/marketplace/admin/sellers/{{userId}}/unsuspend`
- Purpose: Executes `POST` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Typically requires a JSON body.

**Example Response:**
```json
{
  "success": true,
  "message": "POST /marketplace/admin/sellers/{{userId}}/unsuspend executed successfully",
  "data": {}
}
```

---

### GET /marketplace/admin/orders
**Endpoint:** `GET {{baseUrl}}/marketplace/admin/orders`
**Authentication Required:** Yes (Bearer Token)
**Description:** Auto-synced from `admin-marketplace.controller.ts`.

- Method: `GET`
- Route: `/marketplace/admin/orders`
- Purpose: Executes `GET` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Query or path parameters (see URL).

**Example Response:**
```json
{
  "success": true,
  "message": "GET /marketplace/admin/orders executed successfully",
  "data": {}
}
```

---

### GET /marketplace/admin/orders/{{id}}
**Endpoint:** `GET {{baseUrl}}/marketplace/admin/orders/{{id}}`
**Authentication Required:** Yes (Bearer Token)
**Description:** Auto-synced from `admin-marketplace.controller.ts`.

- Method: `GET`
- Route: `/marketplace/admin/orders/{{id}}`
- Purpose: Executes `GET` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Query or path parameters (see URL).

**Example Response:**
```json
{
  "success": true,
  "message": "GET /marketplace/admin/orders/{{id}} executed successfully",
  "data": {}
}
```

---

### POST /marketplace/admin/orders/{{id}}/resolve-dispute
**Endpoint:** `POST {{baseUrl}}/marketplace/admin/orders/{{id}}/resolve-dispute`
**Authentication Required:** Yes (Bearer Token)
**Description:** Auto-synced from `admin-marketplace.controller.ts`.

- Method: `POST`
- Route: `/marketplace/admin/orders/{{id}}/resolve-dispute`
- Purpose: Executes `POST` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input (Body Schema: `ResolveDisputeDto`):**
```json
{
  "resolution": "'REFUND' | 'RELEASE'",
  "adminNote": "string"
}
```

**Example Response:**
```json
{
  "success": true,
  "message": "POST /marketplace/admin/orders/{{id}}/resolve-dispute executed successfully",
  "data": {}
}
```

---

### POST /marketplace/admin/orders/{{id}}/force-release
**Endpoint:** `POST {{baseUrl}}/marketplace/admin/orders/{{id}}/force-release`
**Authentication Required:** Yes (Bearer Token)
**Description:** Auto-synced from `admin-marketplace.controller.ts`.

- Method: `POST`
- Route: `/marketplace/admin/orders/{{id}}/force-release`
- Purpose: Executes `POST` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input (Body Schema: `AdminActionOptionalReasonDto`):**
```json
{
  "reason": "string"
}
```

**Example Response:**
```json
{
  "success": true,
  "message": "POST /marketplace/admin/orders/{{id}}/force-release executed successfully",
  "data": {}
}
```

---

### POST /marketplace/admin/orders/{{id}}/force-refund
**Endpoint:** `POST {{baseUrl}}/marketplace/admin/orders/{{id}}/force-refund`
**Authentication Required:** Yes (Bearer Token)
**Description:** Auto-synced from `admin-marketplace.controller.ts`.

- Method: `POST`
- Route: `/marketplace/admin/orders/{{id}}/force-refund`
- Purpose: Executes `POST` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input (Body Schema: `AdminActionOptionalReasonDto`):**
```json
{
  "reason": "string"
}
```

**Example Response:**
```json
{
  "success": true,
  "message": "POST /marketplace/admin/orders/{{id}}/force-refund executed successfully",
  "data": {}
}
```

---

## 📦 Feature Area: Calls (Sprint 16)
Contains all endpoints and functionalities related to Calls (Sprint 16).

### Get Screen Share State
**Endpoint:** `GET {{baseUrl}}/calls/{{roomId}}/screen-share`
**Authentication Required:** Yes (Bearer Token)
**Description:** Auto-synced from `call.controller.ts`.

- Method: `GET`
- Route: `/calls/{{roomId}}/screen-share`
- Purpose: Executes `GET` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Query or path parameters (see URL).

**Example Response:**
```json
{
  "success": true,
  "message": "GET /calls/{{roomId}}/screen-share executed successfully",
  "data": {}
}
```

---

### Get Call Quality Hints
**Endpoint:** `GET {{baseUrl}}/calls/{{roomId}}/quality-hints`
**Authentication Required:** Yes (Bearer Token)
**Description:** Auto-synced from `call.controller.ts`.

- Method: `GET`
- Route: `/calls/{{roomId}}/quality-hints`
- Purpose: Executes `GET` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Query or path parameters (see URL).

**Example Response:**
```json
{
  "success": true,
  "message": "GET /calls/{{roomId}}/quality-hints executed successfully",
  "data": {}
}
```

---

## 📦 Feature Area: Noro V2 (Sprint 16)
Contains all endpoints and functionalities related to Noro V2 (Sprint 16).

### Create Conversation
**Endpoint:** `POST {{baseUrl}}/noro/conversations`
**Authentication Required:** Yes (Bearer Token)
**Description:** Auto-synced from `noro.controller.ts`.

- Method: `POST`
- Route: `/noro/conversations`
- Purpose: Executes `POST` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Typically requires a JSON body.

**Example Response:**
```json
{
  "success": true,
  "message": "POST /noro/conversations executed successfully",
  "data": {}
}
```

---

### List Conversations
**Endpoint:** `GET {{baseUrl}}/noro/conversations?limit=20`
**Authentication Required:** Yes (Bearer Token)
**Description:** Auto-synced from `noro.controller.ts`.

- Method: `GET`
- Route: `/noro/conversations`
- Purpose: Executes `GET` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Query or path parameters (see URL).

**Example Response:**
```json
{
  "success": true,
  "message": "GET /noro/conversations executed successfully",
  "data": {}
}
```

---

### Add Conversation Message
**Endpoint:** `POST {{baseUrl}}/noro/conversations/{{conversationId}}/messages`
**Authentication Required:** Unknown
**Description:** Auto-synced from `collection-existing`.

- Method: `POST`
- Route: `/noro/conversations/{{conversationId}}/messages`
- Purpose: Executes `POST` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Typically requires a JSON body.

**Example Response:**
```json
{
  "success": true,
  "message": "POST /noro/conversations/{{conversationId}}/messages executed successfully",
  "data": {}
}
```

---

### Get Conversation Messages
**Endpoint:** `GET {{baseUrl}}/noro/conversations/{{conversationId}}/messages?limit=20`
**Authentication Required:** Unknown
**Description:** Auto-synced from `collection-existing`.

- Method: `GET`
- Route: `/noro/conversations/{{conversationId}}/messages`
- Purpose: Executes `GET` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Query or path parameters (see URL).

**Example Response:**
```json
{
  "success": true,
  "message": "GET /noro/conversations/{{conversationId}}/messages executed successfully",
  "data": {}
}
```

---

### Report Crisis
**Endpoint:** `POST {{baseUrl}}/noro/crisis/report`
**Authentication Required:** Yes (Bearer Token)
**Description:** Auto-synced from `noro.controller.ts`.

- Method: `POST`
- Route: `/noro/crisis/report`
- Purpose: Executes `POST` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Typically requires a JSON body.

**Example Response:**
```json
{
  "success": true,
  "message": "POST /noro/crisis/report executed successfully",
  "data": {}
}
```

---

### Get Crisis Hotlines (US)
**Endpoint:** `GET {{baseUrl}}/noro/crisis/hotlines?countryCode=US&language=en`
**Authentication Required:** Yes (Bearer Token)
**Description:** Auto-synced from `noro.controller.ts`.

- Method: `GET`
- Route: `/noro/crisis/hotlines`
- Purpose: Executes `GET` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Query or path parameters (see URL).

**Example Response:**
```json
{
  "success": true,
  "message": "GET /noro/crisis/hotlines executed successfully",
  "data": {}
}
```

---

### Log Crisis Intervention
**Endpoint:** `POST {{baseUrl}}/noro/crisis/intervention`
**Authentication Required:** Yes (Bearer Token)
**Description:** Auto-synced from `noro.controller.ts`.

- Method: `POST`
- Route: `/noro/crisis/intervention`
- Purpose: Executes `POST` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Typically requires a JSON body.

**Example Response:**
```json
{
  "success": true,
  "message": "POST /noro/crisis/intervention executed successfully",
  "data": {}
}
```

---

### Delete Conversation
**Endpoint:** `DELETE {{baseUrl}}/noro/conversations/{{conversationId}}`
**Authentication Required:** Unknown
**Description:** Auto-synced from `collection-existing`.

- Method: `DELETE`
- Route: `/noro/conversations/{{conversationId}}`
- Purpose: Executes `DELETE` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Query or path parameters (see URL).

**Example Response:**
```json
{
  "success": true,
  "message": "DELETE /noro/conversations/{{conversationId}} executed successfully",
  "data": {}
}
```

---

### GET /noro/conversations/{{id}}/messages
**Endpoint:** `GET {{baseUrl}}/noro/conversations/{{id}}/messages`
**Authentication Required:** Yes (Bearer Token)
**Description:** Auto-synced from `noro.controller.ts`.

- Method: `GET`
- Route: `/noro/conversations/{{id}}/messages`
- Purpose: Executes `GET` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Query or path parameters (see URL).

**Example Response:**
```json
{
  "success": true,
  "message": "GET /noro/conversations/{{id}}/messages executed successfully",
  "data": {}
}
```

---

### POST /noro/conversations/{{id}}/messages
**Endpoint:** `POST {{baseUrl}}/noro/conversations/{{id}}/messages`
**Authentication Required:** Yes (Bearer Token)
**Description:** Auto-synced from `noro.controller.ts`.

- Method: `POST`
- Route: `/noro/conversations/{{id}}/messages`
- Purpose: Executes `POST` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Typically requires a JSON body.

**Example Response:**
```json
{
  "success": true,
  "message": "POST /noro/conversations/{{id}}/messages executed successfully",
  "data": {}
}
```

---

### DELETE /noro/conversations/{{id}}
**Endpoint:** `DELETE {{baseUrl}}/noro/conversations/{{id}}`
**Authentication Required:** Yes (Bearer Token)
**Description:** Auto-synced from `noro.controller.ts`.

- Method: `DELETE`
- Route: `/noro/conversations/{{id}}`
- Purpose: Executes `DELETE` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Query or path parameters (see URL).

**Example Response:**
```json
{
  "success": true,
  "message": "DELETE /noro/conversations/{{id}} executed successfully",
  "data": {}
}
```

---

## 📦 Feature Area: Reels (Sprint 17)
Contains all endpoints and functionalities related to Reels (Sprint 17).

### Create Reel Upload URL
**Endpoint:** `POST {{baseUrl}}/reels/upload-url`
**Authentication Required:** No
**Description:** Auto-synced from `reels.controller.ts`.

- Method: `POST`
- Route: `/reels/upload-url`
- Purpose: Executes `POST` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Typically requires a JSON body.

**Example Response:**
```json
{
  "success": true,
  "message": "POST /reels/upload-url executed successfully",
  "data": {}
}
```

---

### Finalize Reel
**Endpoint:** `POST {{baseUrl}}/reels/{{reelId}}/finalize`
**Authentication Required:** Unknown
**Description:** Auto-synced from `collection-existing`.

- Method: `POST`
- Route: `/reels/{{reelId}}/finalize`
- Purpose: Executes `POST` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Typically requires a JSON body.

**Example Response:**
```json
{
  "success": true,
  "message": "POST /reels/{{reelId}}/finalize executed successfully",
  "data": {}
}
```

---

### Get Reel Status
**Endpoint:** `GET {{baseUrl}}/reels/{{reelId}}/status`
**Authentication Required:** Unknown
**Description:** Auto-synced from `collection-existing`.

- Method: `GET`
- Route: `/reels/{{reelId}}/status`
- Purpose: Executes `GET` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Query or path parameters (see URL).

**Example Response:**
```json
{
  "success": true,
  "message": "GET /reels/{{reelId}}/status executed successfully",
  "data": {}
}
```

---

### Get Reels Feed
**Endpoint:** `GET {{baseUrl}}/reels/feed?limit=10`
**Authentication Required:** No
**Description:** Auto-synced from `reels.controller.ts`.

- Method: `GET`
- Route: `/reels/feed`
- Purpose: Executes `GET` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Query or path parameters (see URL).

**Example Response:**
```json
{
  "success": true,
  "message": "GET /reels/feed executed successfully",
  "data": {}
}
```

---

### Get Reel Details
**Endpoint:** `GET {{baseUrl}}/reels/{{reelId}}`
**Authentication Required:** Unknown
**Description:** Auto-synced from `collection-existing`.

- Method: `GET`
- Route: `/reels/{{reelId}}`
- Purpose: Executes `GET` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Query or path parameters (see URL).

**Example Response:**
```json
{
  "success": true,
  "message": "GET /reels/{{reelId}} executed successfully",
  "data": {}
}
```

---

### Record Reel View
**Endpoint:** `POST {{baseUrl}}/reels/{{reelId}}/view`
**Authentication Required:** Unknown
**Description:** Auto-synced from `collection-existing`.

- Method: `POST`
- Route: `/reels/{{reelId}}/view`
- Purpose: Executes `POST` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Typically requires a JSON body.

**Example Response:**
```json
{
  "success": true,
  "message": "POST /reels/{{reelId}}/view executed successfully",
  "data": {}
}
```

---

### Toggle Reel Like
**Endpoint:** `POST {{baseUrl}}/reels/{{reelId}}/like`
**Authentication Required:** Unknown
**Description:** Auto-synced from `collection-existing`.

- Method: `POST`
- Route: `/reels/{{reelId}}/like`
- Purpose: Executes `POST` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Typically requires a JSON body.

**Example Response:**
```json
{
  "success": true,
  "message": "POST /reels/{{reelId}}/like executed successfully",
  "data": {}
}
```

---

### Add Reel Comment
**Endpoint:** `POST {{baseUrl}}/reels/{{reelId}}/comments`
**Authentication Required:** Unknown
**Description:** Auto-synced from `collection-existing`.

- Method: `POST`
- Route: `/reels/{{reelId}}/comments`
- Purpose: Executes `POST` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Typically requires a JSON body.

**Example Response:**
```json
{
  "success": true,
  "message": "POST /reels/{{reelId}}/comments executed successfully",
  "data": {}
}
```

---

### List Reel Comments
**Endpoint:** `GET {{baseUrl}}/reels/{{reelId}}/comments?limit=20`
**Authentication Required:** Unknown
**Description:** Auto-synced from `collection-existing`.

- Method: `GET`
- Route: `/reels/{{reelId}}/comments`
- Purpose: Executes `GET` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Query or path parameters (see URL).

**Example Response:**
```json
{
  "success": true,
  "message": "GET /reels/{{reelId}}/comments executed successfully",
  "data": {}
}
```

---

### Share Reel
**Endpoint:** `POST {{baseUrl}}/reels/{{reelId}}/share`
**Authentication Required:** Unknown
**Description:** Auto-synced from `collection-existing`.

- Method: `POST`
- Route: `/reels/{{reelId}}/share`
- Purpose: Executes `POST` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Typically requires a JSON body.

**Example Response:**
```json
{
  "success": true,
  "message": "POST /reels/{{reelId}}/share executed successfully",
  "data": {}
}
```

---

### Delete Reel
**Endpoint:** `DELETE {{baseUrl}}/reels/{{reelId}}`
**Authentication Required:** Unknown
**Description:** Auto-synced from `collection-existing`.

- Method: `DELETE`
- Route: `/reels/{{reelId}}`
- Purpose: Executes `DELETE` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Query or path parameters (see URL).

**Example Response:**
```json
{
  "success": true,
  "message": "DELETE /reels/{{reelId}} executed successfully",
  "data": {}
}
```

---

### GET /reels/{{id}}/status
**Endpoint:** `GET {{baseUrl}}/reels/{{id}}/status`
**Authentication Required:** No
**Description:** Auto-synced from `reels.controller.ts`.

- Method: `GET`
- Route: `/reels/{{id}}/status`
- Purpose: Executes `GET` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Query or path parameters (see URL).

**Example Response:**
```json
{
  "success": true,
  "message": "GET /reels/{{id}}/status executed successfully",
  "data": {}
}
```

---

### GET /reels/{{id}}
**Endpoint:** `GET {{baseUrl}}/reels/{{id}}`
**Authentication Required:** No
**Description:** Auto-synced from `reels.controller.ts`.

- Method: `GET`
- Route: `/reels/{{id}}`
- Purpose: Executes `GET` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Query or path parameters (see URL).

**Example Response:**
```json
{
  "success": true,
  "message": "GET /reels/{{id}} executed successfully",
  "data": {}
}
```

---

### GET /reels/{{id}}/comments
**Endpoint:** `GET {{baseUrl}}/reels/{{id}}/comments`
**Authentication Required:** No
**Description:** Auto-synced from `reels.controller.ts`.

- Method: `GET`
- Route: `/reels/{{id}}/comments`
- Purpose: Executes `GET` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Query or path parameters (see URL).

**Example Response:**
```json
{
  "success": true,
  "message": "GET /reels/{{id}}/comments executed successfully",
  "data": {}
}
```

---

### GET /reels/{{id}}/comments/{{cid}}/replies
**Endpoint:** `GET {{baseUrl}}/reels/{{id}}/comments/{{cid}}/replies`
**Authentication Required:** No
**Description:** Auto-synced from `reels.controller.ts`.

- Method: `GET`
- Route: `/reels/{{id}}/comments/{{cid}}/replies`
- Purpose: Executes `GET` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Query or path parameters (see URL).

**Example Response:**
```json
{
  "success": true,
  "message": "GET /reels/{{id}}/comments/{{cid}}/replies executed successfully",
  "data": {}
}
```

---

### POST /reels/{{id}}/finalize
**Endpoint:** `POST {{baseUrl}}/reels/{{id}}/finalize`
**Authentication Required:** No
**Description:** Auto-synced from `reels.controller.ts`.

- Method: `POST`
- Route: `/reels/{{id}}/finalize`
- Purpose: Executes `POST` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input (Body Schema: `FinalizeReelDto`):**
```json
{
  "rawVideoKey": "string",
  "caption": "string",
  "hashtags": "string[]",
  "audioTrackId": "string",
  "audioOffsetMs": "number",
  "durationSec": "number",
  "width": "number",
  "height": "number",
  "fileSizeBytes": "number"
}
```

**Example Response:**
```json
{
  "success": true,
  "message": "POST /reels/{{id}}/finalize executed successfully",
  "data": {}
}
```

---

### POST /reels/{{id}}/view
**Endpoint:** `POST {{baseUrl}}/reels/{{id}}/view`
**Authentication Required:** No
**Description:** Auto-synced from `reels.controller.ts`.

- Method: `POST`
- Route: `/reels/{{id}}/view`
- Purpose: Executes `POST` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input (Body Schema: `RecordViewDto`):**
```json
{
  "sessionId": "string",
  "watchPct": "number",
  "viewerId": "string"
}
```

**Example Response:**
```json
{
  "success": true,
  "message": "POST /reels/{{id}}/view executed successfully",
  "data": {}
}
```

---

### POST /reels/{{id}}/like
**Endpoint:** `POST {{baseUrl}}/reels/{{id}}/like`
**Authentication Required:** No
**Description:** Auto-synced from `reels.controller.ts`.

- Method: `POST`
- Route: `/reels/{{id}}/like`
- Purpose: Executes `POST` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Typically requires a JSON body.

**Example Response:**
```json
{
  "success": true,
  "message": "POST /reels/{{id}}/like executed successfully",
  "data": {}
}
```

---

### POST /reels/{{id}}/comments
**Endpoint:** `POST {{baseUrl}}/reels/{{id}}/comments`
**Authentication Required:** No
**Description:** Auto-synced from `reels.controller.ts`.

- Method: `POST`
- Route: `/reels/{{id}}/comments`
- Purpose: Executes `POST` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input (Body Schema: `AddCommentDto`):**
```json
{
  "content": "string",
  "parentId": "string"
}
```

**Example Response:**
```json
{
  "success": true,
  "message": "POST /reels/{{id}}/comments executed successfully",
  "data": {}
}
```

---

### POST /reels/{{id}}/share
**Endpoint:** `POST {{baseUrl}}/reels/{{id}}/share`
**Authentication Required:** No
**Description:** Auto-synced from `reels.controller.ts`.

- Method: `POST`
- Route: `/reels/{{id}}/share`
- Purpose: Executes `POST` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input (Body Schema: `ShareReelDto`):**
```json
{
  "shareType": "ShareType",
  "targetUserId": "string"
}
```

**Example Response:**
```json
{
  "success": true,
  "message": "POST /reels/{{id}}/share executed successfully",
  "data": {}
}
```

---

### PATCH /reels/{{id}}
**Endpoint:** `PATCH {{baseUrl}}/reels/{{id}}`
**Authentication Required:** No
**Description:** Auto-synced from `reels.controller.ts`.

- Method: `PATCH`
- Route: `/reels/{{id}}`
- Purpose: Executes `PATCH` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input (Body Schema: `UpdateReelDto`):**
```json
{
  "caption": "string",
  "hashtags": "string[]",
  "audioTrackId": "string | null",
  "audioOffsetMs": "number",
  "isPublic": "boolean",
  "commentsEnabled": "boolean",
  "downloadsEnabled": "boolean"
}
```

**Example Response:**
```json
{
  "success": true,
  "message": "PATCH /reels/{{id}} executed successfully",
  "data": {}
}
```

---

### DELETE /reels/{{id}}
**Endpoint:** `DELETE {{baseUrl}}/reels/{{id}}`
**Authentication Required:** No
**Description:** Auto-synced from `reels.controller.ts`.

- Method: `DELETE`
- Route: `/reels/{{id}}`
- Purpose: Executes `DELETE` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Query or path parameters (see URL).

**Example Response:**
```json
{
  "success": true,
  "message": "DELETE /reels/{{id}} executed successfully",
  "data": {}
}
```

---

### DELETE /reels/{{id}}/comments/{{cid}}
**Endpoint:** `DELETE {{baseUrl}}/reels/{{id}}/comments/{{cid}}`
**Authentication Required:** No
**Description:** Auto-synced from `reels.controller.ts`.

- Method: `DELETE`
- Route: `/reels/{{id}}/comments/{{cid}}`
- Purpose: Executes `DELETE` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Query or path parameters (see URL).

**Example Response:**
```json
{
  "success": true,
  "message": "DELETE /reels/{{id}}/comments/{{cid}} executed successfully",
  "data": {}
}
```

---

### GET /reels/trending
**Endpoint:** `GET {{baseUrl}}/reels/trending`
**Authentication Required:** No
**Description:** Auto-synced from `reels.controller.ts`.

- Method: `GET`
- Route: `/reels/trending`
- Purpose: Executes `GET` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Query or path parameters (see URL).

**Example Response:**
```json
{
  "success": true,
  "message": "GET /reels/trending executed successfully",
  "data": {}
}
```

---

### GET /reels/hashtag/{{tag}}
**Endpoint:** `GET {{baseUrl}}/reels/hashtag/{{tag}}`
**Authentication Required:** No
**Description:** Auto-synced from `reels.controller.ts`.

- Method: `GET`
- Route: `/reels/hashtag/{{tag}}`
- Purpose: Executes `GET` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Query or path parameters (see URL).

**Example Response:**
```json
{
  "success": true,
  "message": "GET /reels/hashtag/{{tag}} executed successfully",
  "data": {}
}
```

---

### GET /reels/saved
**Endpoint:** `GET {{baseUrl}}/reels/saved`
**Authentication Required:** No
**Description:** Auto-synced from `reels.controller.ts`.

- Method: `GET`
- Route: `/reels/saved`
- Purpose: Executes `GET` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Query or path parameters (see URL).

**Example Response:**
```json
{
  "success": true,
  "message": "GET /reels/saved executed successfully",
  "data": {}
}
```

---

### GET /reels/my
**Endpoint:** `GET {{baseUrl}}/reels/my`
**Authentication Required:** No
**Description:** Auto-synced from `reels.controller.ts`.

- Method: `GET`
- Route: `/reels/my`
- Purpose: Executes `GET` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Query or path parameters (see URL).

**Example Response:**
```json
{
  "success": true,
  "message": "GET /reels/my executed successfully",
  "data": {}
}
```

---

### GET /reels/user/{{userId}}
**Endpoint:** `GET {{baseUrl}}/reels/user/{{userId}}`
**Authentication Required:** No
**Description:** Auto-synced from `reels.controller.ts`.

- Method: `GET`
- Route: `/reels/user/{{userId}}`
- Purpose: Executes `GET` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Query or path parameters (see URL).

**Example Response:**
```json
{
  "success": true,
  "message": "GET /reels/user/{{userId}} executed successfully",
  "data": {}
}
```

---

### GET /reels/{{id}}/analytics
**Endpoint:** `GET {{baseUrl}}/reels/{{id}}/analytics`
**Authentication Required:** No
**Description:** Auto-synced from `reels.controller.ts`.

- Method: `GET`
- Route: `/reels/{{id}}/analytics`
- Purpose: Executes `GET` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Query or path parameters (see URL).

**Example Response:**
```json
{
  "success": true,
  "message": "GET /reels/{{id}}/analytics executed successfully",
  "data": {}
}
```

---

### POST /reels/{{id}}/bookmark
**Endpoint:** `POST {{baseUrl}}/reels/{{id}}/bookmark`
**Authentication Required:** No
**Description:** Auto-synced from `reels.controller.ts`.

- Method: `POST`
- Route: `/reels/{{id}}/bookmark`
- Purpose: Executes `POST` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Typically requires a JSON body.

**Example Response:**
```json
{
  "success": true,
  "message": "POST /reels/{{id}}/bookmark executed successfully",
  "data": {}
}
```

---

### POST /reels/{{id}}/comments/{{cid}}/like
**Endpoint:** `POST {{baseUrl}}/reels/{{id}}/comments/{{cid}}/like`
**Authentication Required:** No
**Description:** Auto-synced from `reels.controller.ts`.

- Method: `POST`
- Route: `/reels/{{id}}/comments/{{cid}}/like`
- Purpose: Executes `POST` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Typically requires a JSON body.

**Example Response:**
```json
{
  "success": true,
  "message": "POST /reels/{{id}}/comments/{{cid}}/like executed successfully",
  "data": {}
}
```

---

### PATCH /reels/{{id}}/comments/{{cid}}
**Endpoint:** `PATCH {{baseUrl}}/reels/{{id}}/comments/{{cid}}`
**Authentication Required:** No
**Description:** Auto-synced from `reels.controller.ts`.

- Method: `PATCH`
- Route: `/reels/{{id}}/comments/{{cid}}`
- Purpose: Executes `PATCH` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input (Body Schema: `EditCommentDto`):**
```json
{
  "content": "string"
}
```

**Example Response:**
```json
{
  "success": true,
  "message": "PATCH /reels/{{id}}/comments/{{cid}} executed successfully",
  "data": {}
}
```

---

## 📦 Feature Area: Audio Tracks (Sprint 17)
Contains all endpoints and functionalities related to Audio Tracks (Sprint 17).

### List Audio Tracks
**Endpoint:** `GET {{baseUrl}}/audio-tracks`
**Authentication Required:** No
**Description:** Auto-synced from `audio-tracks.controller.ts`.

- Method: `GET`
- Route: `/audio-tracks`
- Purpose: Executes `GET` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Query or path parameters (see URL).

**Example Response:**
```json
{
  "success": true,
  "message": "GET /audio-tracks executed successfully",
  "data": {}
}
```

---

### Get Trending Audio Tracks
**Endpoint:** `GET {{baseUrl}}/audio-tracks/trending`
**Authentication Required:** No
**Description:** Auto-synced from `audio-tracks.controller.ts`.

- Method: `GET`
- Route: `/audio-tracks/trending`
- Purpose: Executes `GET` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Query or path parameters (see URL).

**Example Response:**
```json
{
  "success": true,
  "message": "GET /audio-tracks/trending executed successfully",
  "data": {}
}
```

---

### Get Audio Track By ID
**Endpoint:** `GET {{baseUrl}}/audio-tracks/{{audioTrackId}}`
**Authentication Required:** Unknown
**Description:** Auto-synced from `collection-existing`.

- Method: `GET`
- Route: `/audio-tracks/{{audioTrackId}}`
- Purpose: Executes `GET` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Query or path parameters (see URL).

**Example Response:**
```json
{
  "success": true,
  "message": "GET /audio-tracks/{{audioTrackId}} executed successfully",
  "data": {}
}
```

---

### Register Audio Track Use
**Endpoint:** `POST {{baseUrl}}/audio-tracks/{{audioTrackId}}/use`
**Authentication Required:** Unknown
**Description:** Auto-synced from `collection-existing`.

- Method: `POST`
- Route: `/audio-tracks/{{audioTrackId}}/use`
- Purpose: Executes `POST` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Typically requires a JSON body.

**Example Response:**
```json
{
  "success": true,
  "message": "POST /audio-tracks/{{audioTrackId}}/use executed successfully",
  "data": {}
}
```

---

### GET /audio-tracks/{{id}}
**Endpoint:** `GET {{baseUrl}}/audio-tracks/{{id}}`
**Authentication Required:** No
**Description:** Auto-synced from `audio-tracks.controller.ts`.

- Method: `GET`
- Route: `/audio-tracks/{{id}}`
- Purpose: Executes `GET` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Query or path parameters (see URL).

**Example Response:**
```json
{
  "success": true,
  "message": "GET /audio-tracks/{{id}} executed successfully",
  "data": {}
}
```

---

### POST /audio-tracks/{{id}}/use
**Endpoint:** `POST {{baseUrl}}/audio-tracks/{{id}}/use`
**Authentication Required:** No
**Description:** Auto-synced from `audio-tracks.controller.ts`.

- Method: `POST`
- Route: `/audio-tracks/{{id}}/use`
- Purpose: Executes `POST` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Typically requires a JSON body.

**Example Response:**
```json
{
  "success": true,
  "message": "POST /audio-tracks/{{id}}/use executed successfully",
  "data": {}
}
```

---

## 📦 Feature Area: Stories (Sprint 12)
Contains all endpoints and functionalities related to Stories (Sprint 12).

### Create Story
**Endpoint:** `POST {{baseUrl}}/stories/`
**Authentication Required:** Yes (Bearer Token)
**Description:** Auto-synced from `stories.controller.ts`.

- Method: `POST`
- Route: `/stories`
- Purpose: Executes `POST` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input (Body Schema: `CreateStoryDto`):**
```json
{
  "mediaUrl": "string",
  "thumbnailUrl": "string",
  "caption": "string",
  "privacy": "StoryPrivacy = StoryPrivacy.FRIENDS"
}
```

**Example Response:**
```json
{
  "success": true,
  "message": "POST /stories executed successfully",
  "data": {}
}
```

---

### Get Stories Feed
**Endpoint:** `GET {{baseUrl}}/stories/feed?page=1&limit=30`
**Authentication Required:** Yes (Bearer Token)
**Description:** Auto-synced from `stories.controller.ts`.

- Method: `GET`
- Route: `/stories/feed`
- Purpose: Executes `GET` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Query or path parameters (see URL).

**Example Response:**
```json
{
  "success": true,
  "message": "GET /stories/feed executed successfully",
  "data": {}
}
```

---

### Get User Stories
**Endpoint:** `GET {{baseUrl}}/stories/user/{{targetUserId}}`
**Authentication Required:** Unknown
**Description:** Auto-synced from `collection-existing`.

- Method: `GET`
- Route: `/stories/user/{{targetUserId}}`
- Purpose: Executes `GET` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Query or path parameters (see URL).

**Example Response:**
```json
{
  "success": true,
  "message": "GET /stories/user/{{targetUserId}} executed successfully",
  "data": {}
}
```

---

### Get Story By ID
**Endpoint:** `GET {{baseUrl}}/stories/{{storyId}}`
**Authentication Required:** Unknown
**Description:** Auto-synced from `collection-existing`.

- Method: `GET`
- Route: `/stories/{{storyId}}`
- Purpose: Executes `GET` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Query or path parameters (see URL).

**Example Response:**
```json
{
  "success": true,
  "message": "GET /stories/{{storyId}} executed successfully",
  "data": {}
}
```

---

### Delete Story
**Endpoint:** `DELETE {{baseUrl}}/stories/{{storyId}}`
**Authentication Required:** Unknown
**Description:** Auto-synced from `collection-existing`.

- Method: `DELETE`
- Route: `/stories/{{storyId}}`
- Purpose: Executes `DELETE` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Query or path parameters (see URL).

**Example Response:**
```json
{
  "success": true,
  "message": "DELETE /stories/{{storyId}} executed successfully",
  "data": {}
}
```

---

### Record Story View
**Endpoint:** `POST {{baseUrl}}/stories/{{storyId}}/view`
**Authentication Required:** Unknown
**Description:** Auto-synced from `collection-existing`.

- Method: `POST`
- Route: `/stories/{{storyId}}/view`
- Purpose: Executes `POST` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Typically requires a JSON body.

**Example Response:**
```json
{
  "success": true,
  "message": "POST /stories/{{storyId}}/view executed successfully",
  "data": {}
}
```

---

### Get Story Viewers
**Endpoint:** `GET {{baseUrl}}/stories/{{storyId}}/viewers?page=1&limit=20`
**Authentication Required:** Unknown
**Description:** Auto-synced from `collection-existing`.

- Method: `GET`
- Route: `/stories/{{storyId}}/viewers`
- Purpose: Executes `GET` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Query or path parameters (see URL).

**Example Response:**
```json
{
  "success": true,
  "message": "GET /stories/{{storyId}}/viewers executed successfully",
  "data": {}
}
```

---

### Add Story To Highlights
**Endpoint:** `POST {{baseUrl}}/stories/{{storyId}}/highlight`
**Authentication Required:** Unknown
**Description:** Auto-synced from `collection-existing`.

- Method: `POST`
- Route: `/stories/{{storyId}}/highlight`
- Purpose: Executes `POST` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Typically requires a JSON body.

**Example Response:**
```json
{
  "success": true,
  "message": "POST /stories/{{storyId}}/highlight executed successfully",
  "data": {}
}
```

---

### Remove Story From Highlights
**Endpoint:** `DELETE {{baseUrl}}/stories/{{storyId}}/highlight`
**Authentication Required:** Unknown
**Description:** Auto-synced from `collection-existing`.

- Method: `DELETE`
- Route: `/stories/{{storyId}}/highlight`
- Purpose: Executes `DELETE` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Query or path parameters (see URL).

**Example Response:**
```json
{
  "success": true,
  "message": "DELETE /stories/{{storyId}}/highlight executed successfully",
  "data": {}
}
```

---

### GET /stories/user/{{userId}}
**Endpoint:** `GET {{baseUrl}}/stories/user/{{userId}}`
**Authentication Required:** Yes (Bearer Token)
**Description:** Auto-synced from `stories.controller.ts`.

- Method: `GET`
- Route: `/stories/user/{{userId}}`
- Purpose: Executes `GET` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Query or path parameters (see URL).

**Example Response:**
```json
{
  "success": true,
  "message": "GET /stories/user/{{userId}} executed successfully",
  "data": {}
}
```

---

### GET /stories/{{id}}
**Endpoint:** `GET {{baseUrl}}/stories/{{id}}`
**Authentication Required:** Yes (Bearer Token)
**Description:** Auto-synced from `stories.controller.ts`.

- Method: `GET`
- Route: `/stories/{{id}}`
- Purpose: Executes `GET` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Query or path parameters (see URL).

**Example Response:**
```json
{
  "success": true,
  "message": "GET /stories/{{id}} executed successfully",
  "data": {}
}
```

---

### GET /stories/{{id}}/viewers
**Endpoint:** `GET {{baseUrl}}/stories/{{id}}/viewers`
**Authentication Required:** Yes (Bearer Token)
**Description:** Auto-synced from `stories.controller.ts`.

- Method: `GET`
- Route: `/stories/{{id}}/viewers`
- Purpose: Executes `GET` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Query or path parameters (see URL).

**Example Response:**
```json
{
  "success": true,
  "message": "GET /stories/{{id}}/viewers executed successfully",
  "data": {}
}
```

---

### POST /stories/{{id}}/view
**Endpoint:** `POST {{baseUrl}}/stories/{{id}}/view`
**Authentication Required:** Yes (Bearer Token)
**Description:** Auto-synced from `stories.controller.ts`.

- Method: `POST`
- Route: `/stories/{{id}}/view`
- Purpose: Executes `POST` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Typically requires a JSON body.

**Example Response:**
```json
{
  "success": true,
  "message": "POST /stories/{{id}}/view executed successfully",
  "data": {}
}
```

---

### POST /stories/{{id}}/highlight
**Endpoint:** `POST {{baseUrl}}/stories/{{id}}/highlight`
**Authentication Required:** Yes (Bearer Token)
**Description:** Auto-synced from `stories.controller.ts`.

- Method: `POST`
- Route: `/stories/{{id}}/highlight`
- Purpose: Executes `POST` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Typically requires a JSON body.

**Example Response:**
```json
{
  "success": true,
  "message": "POST /stories/{{id}}/highlight executed successfully",
  "data": {}
}
```

---

### DELETE /stories/{{id}}
**Endpoint:** `DELETE {{baseUrl}}/stories/{{id}}`
**Authentication Required:** Yes (Bearer Token)
**Description:** Auto-synced from `stories.controller.ts`.

- Method: `DELETE`
- Route: `/stories/{{id}}`
- Purpose: Executes `DELETE` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Query or path parameters (see URL).

**Example Response:**
```json
{
  "success": true,
  "message": "DELETE /stories/{{id}} executed successfully",
  "data": {}
}
```

---

### DELETE /stories/{{id}}/highlight
**Endpoint:** `DELETE {{baseUrl}}/stories/{{id}}/highlight`
**Authentication Required:** Yes (Bearer Token)
**Description:** Auto-synced from `stories.controller.ts`.

- Method: `DELETE`
- Route: `/stories/{{id}}/highlight`
- Purpose: Executes `DELETE` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Query or path parameters (see URL).

**Example Response:**
```json
{
  "success": true,
  "message": "DELETE /stories/{{id}}/highlight executed successfully",
  "data": {}
}
```

---

## 📦 Feature Area: Groups (Sprint 13/20)
Contains all endpoints and functionalities related to Groups (Sprint 13/20).

### Create Group
**Endpoint:** `POST {{baseUrl}}/groups/`
**Authentication Required:** Yes (Bearer Token)
**Description:** Auto-synced from `groups.controller.ts`.

- Method: `POST`
- Route: `/groups`
- Purpose: Executes `POST` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input (Body Schema: `CreateGroupDto`):**
```json
{
  "name": "string",
  "description": "string",
  "coverPhoto": "string",
  "type": "GroupType = GroupType.PUBLIC",
  "restrictPosting": "boolean = false"
}
```

**Example Response:**
```json
{
  "success": true,
  "message": "POST /groups executed successfully",
  "data": {}
}
```

---

### Discover Groups
**Endpoint:** `GET {{baseUrl}}/groups/?page=1&limit=20&search=backend`
**Authentication Required:** Yes (Bearer Token)
**Description:** Auto-synced from `groups.controller.ts`.

- Method: `GET`
- Route: `/groups`
- Purpose: Executes `GET` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Query or path parameters (see URL).

**Example Response:**
```json
{
  "success": true,
  "message": "GET /groups executed successfully",
  "data": {}
}
```

---

### Get Group By ID
**Endpoint:** `GET {{baseUrl}}/groups/{{groupId}}`
**Authentication Required:** Unknown
**Description:** Auto-synced from `collection-existing`.

- Method: `GET`
- Route: `/groups/{{groupId}}`
- Purpose: Executes `GET` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Query or path parameters (see URL).

**Example Response:**
```json
{
  "success": true,
  "message": "GET /groups/{{groupId}} executed successfully",
  "data": {}
}
```

---

### Update Group
**Endpoint:** `PUT {{baseUrl}}/groups/{{groupId}}`
**Authentication Required:** Unknown
**Description:** Auto-synced from `collection-existing`.

- Method: `PUT`
- Route: `/groups/{{groupId}}`
- Purpose: Executes `PUT` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Typically requires a JSON body.

**Example Response:**
```json
{
  "success": true,
  "message": "PUT /groups/{{groupId}} executed successfully",
  "data": {}
}
```

---

### Delete Group
**Endpoint:** `DELETE {{baseUrl}}/groups/{{groupId}}`
**Authentication Required:** Unknown
**Description:** Auto-synced from `collection-existing`.

- Method: `DELETE`
- Route: `/groups/{{groupId}}`
- Purpose: Executes `DELETE` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Query or path parameters (see URL).

**Example Response:**
```json
{
  "success": true,
  "message": "DELETE /groups/{{groupId}} executed successfully",
  "data": {}
}
```

---

### Join Group
**Endpoint:** `POST {{baseUrl}}/groups/{{groupId}}/join`
**Authentication Required:** Unknown
**Description:** Auto-synced from `collection-existing`.

- Method: `POST`
- Route: `/groups/{{groupId}}/join`
- Purpose: Executes `POST` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Typically requires a JSON body.

**Example Response:**
```json
{
  "success": true,
  "message": "POST /groups/{{groupId}}/join executed successfully",
  "data": {}
}
```

---

### Leave Group
**Endpoint:** `DELETE {{baseUrl}}/groups/{{groupId}}/leave`
**Authentication Required:** Unknown
**Description:** Auto-synced from `collection-existing`.

- Method: `DELETE`
- Route: `/groups/{{groupId}}/leave`
- Purpose: Executes `DELETE` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Query or path parameters (see URL).

**Example Response:**
```json
{
  "success": true,
  "message": "DELETE /groups/{{groupId}}/leave executed successfully",
  "data": {}
}
```

---

### Get Group Members
**Endpoint:** `GET {{baseUrl}}/groups/{{groupId}}/members?page=1&limit=20`
**Authentication Required:** Unknown
**Description:** Auto-synced from `collection-existing`.

- Method: `GET`
- Route: `/groups/{{groupId}}/members`
- Purpose: Executes `GET` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Query or path parameters (see URL).

**Example Response:**
```json
{
  "success": true,
  "message": "GET /groups/{{groupId}}/members executed successfully",
  "data": {}
}
```

---

### Update Member Role
**Endpoint:** `PUT {{baseUrl}}/groups/{{groupId}}/members/{{targetUserId}}/role`
**Authentication Required:** Unknown
**Description:** Auto-synced from `collection-existing`.

- Method: `PUT`
- Route: `/groups/{{groupId}}/members/{{targetUserId}}/role`
- Purpose: Executes `PUT` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Typically requires a JSON body.

**Example Response:**
```json
{
  "success": true,
  "message": "PUT /groups/{{groupId}}/members/{{targetUserId}}/role executed successfully",
  "data": {}
}
```

---

### Remove Member
**Endpoint:** `DELETE {{baseUrl}}/groups/{{groupId}}/members/{{targetUserId}}`
**Authentication Required:** Unknown
**Description:** Auto-synced from `collection-existing`.

- Method: `DELETE`
- Route: `/groups/{{groupId}}/members/{{targetUserId}}`
- Purpose: Executes `DELETE` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Query or path parameters (see URL).

**Example Response:**
```json
{
  "success": true,
  "message": "DELETE /groups/{{groupId}}/members/{{targetUserId}} executed successfully",
  "data": {}
}
```

---

### Get Join Requests
**Endpoint:** `GET {{baseUrl}}/groups/{{groupId}}/requests?page=1&limit=20`
**Authentication Required:** Unknown
**Description:** Auto-synced from `collection-existing`.

- Method: `GET`
- Route: `/groups/{{groupId}}/requests`
- Purpose: Executes `GET` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Query or path parameters (see URL).

**Example Response:**
```json
{
  "success": true,
  "message": "GET /groups/{{groupId}}/requests executed successfully",
  "data": {}
}
```

---

### Process Join Request
**Endpoint:** `PUT {{baseUrl}}/groups/{{groupId}}/requests/{{targetUserId}}`
**Authentication Required:** Unknown
**Description:** Auto-synced from `collection-existing`.

- Method: `PUT`
- Route: `/groups/{{groupId}}/requests/{{targetUserId}}`
- Purpose: Executes `PUT` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Typically requires a JSON body.

**Example Response:**
```json
{
  "success": true,
  "message": "PUT /groups/{{groupId}}/requests/{{targetUserId}} executed successfully",
  "data": {}
}
```

---

### Create Group Rule
**Endpoint:** `POST {{baseUrl}}/groups/{{groupId}}/rules`
**Authentication Required:** Unknown
**Description:** Auto-synced from `collection-existing`.

- Method: `POST`
- Route: `/groups/{{groupId}}/rules`
- Purpose: Executes `POST` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Typically requires a JSON body.

**Example Response:**
```json
{
  "success": true,
  "message": "POST /groups/{{groupId}}/rules executed successfully",
  "data": {}
}
```

---

### Delete Group Rule
**Endpoint:** `DELETE {{baseUrl}}/groups/{{groupId}}/rules/{{groupRuleId}}`
**Authentication Required:** Unknown
**Description:** Auto-synced from `collection-existing`.

- Method: `DELETE`
- Route: `/groups/{{groupId}}/rules/{{groupRuleId}}`
- Purpose: Executes `DELETE` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Query or path parameters (see URL).

**Example Response:**
```json
{
  "success": true,
  "message": "DELETE /groups/{{groupId}}/rules/{{groupRuleId}} executed successfully",
  "data": {}
}
```

---

### Add Post To Group
**Endpoint:** `POST {{baseUrl}}/groups/{{groupId}}/posts`
**Authentication Required:** Unknown
**Description:** Auto-synced from `collection-existing`.

- Method: `POST`
- Route: `/groups/{{groupId}}/posts`
- Purpose: Executes `POST` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Typically requires a JSON body.

**Example Response:**
```json
{
  "success": true,
  "message": "POST /groups/{{groupId}}/posts executed successfully",
  "data": {}
}
```

---

### Get Group Posts
**Endpoint:** `GET {{baseUrl}}/groups/{{groupId}}/posts?page=1&limit=20`
**Authentication Required:** Unknown
**Description:** Auto-synced from `collection-existing`.

- Method: `GET`
- Route: `/groups/{{groupId}}/posts`
- Purpose: Executes `GET` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Query or path parameters (see URL).

**Example Response:**
```json
{
  "success": true,
  "message": "GET /groups/{{groupId}}/posts executed successfully",
  "data": {}
}
```

---

### Review Group Post
**Endpoint:** `PUT {{baseUrl}}/groups/{{groupId}}/posts/{{groupPostId}}/approval`
**Authentication Required:** Unknown
**Description:** Auto-synced from `collection-existing`.

- Method: `PUT`
- Route: `/groups/{{groupId}}/posts/{{groupPostId}}/approval`
- Purpose: Executes `PUT` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Typically requires a JSON body.

**Example Response:**
```json
{
  "success": true,
  "message": "PUT /groups/{{groupId}}/posts/{{groupPostId}}/approval executed successfully",
  "data": {}
}
```

---

### Get Group Insights
**Endpoint:** `GET {{baseUrl}}/groups/{{groupId}}/insights`
**Authentication Required:** Unknown
**Description:** Auto-synced from `collection-existing`.

- Method: `GET`
- Route: `/groups/{{groupId}}/insights`
- Purpose: Executes `GET` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Query or path parameters (see URL).

**Example Response:**
```json
{
  "success": true,
  "message": "GET /groups/{{groupId}}/insights executed successfully",
  "data": {}
}
```

---

### GET /groups/{{id}}
**Endpoint:** `GET {{baseUrl}}/groups/{{id}}`
**Authentication Required:** Yes (Bearer Token)
**Description:** Auto-synced from `groups.controller.ts`.

- Method: `GET`
- Route: `/groups/{{id}}`
- Purpose: Executes `GET` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Query or path parameters (see URL).

**Example Response:**
```json
{
  "success": true,
  "message": "GET /groups/{{id}} executed successfully",
  "data": {}
}
```

---

### GET /groups/{{id}}/members
**Endpoint:** `GET {{baseUrl}}/groups/{{id}}/members`
**Authentication Required:** Yes (Bearer Token)
**Description:** Auto-synced from `groups.controller.ts`.

- Method: `GET`
- Route: `/groups/{{id}}/members`
- Purpose: Executes `GET` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Query or path parameters (see URL).

**Example Response:**
```json
{
  "success": true,
  "message": "GET /groups/{{id}}/members executed successfully",
  "data": {}
}
```

---

### GET /groups/{{id}}/requests
**Endpoint:** `GET {{baseUrl}}/groups/{{id}}/requests`
**Authentication Required:** Yes (Bearer Token)
**Description:** Auto-synced from `groups.controller.ts`.

- Method: `GET`
- Route: `/groups/{{id}}/requests`
- Purpose: Executes `GET` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Query or path parameters (see URL).

**Example Response:**
```json
{
  "success": true,
  "message": "GET /groups/{{id}}/requests executed successfully",
  "data": {}
}
```

---

### GET /groups/{{id}}/posts
**Endpoint:** `GET {{baseUrl}}/groups/{{id}}/posts`
**Authentication Required:** Yes (Bearer Token)
**Description:** Auto-synced from `groups.controller.ts`.

- Method: `GET`
- Route: `/groups/{{id}}/posts`
- Purpose: Executes `GET` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Query or path parameters (see URL).

**Example Response:**
```json
{
  "success": true,
  "message": "GET /groups/{{id}}/posts executed successfully",
  "data": {}
}
```

---

### GET /groups/{{id}}/insights
**Endpoint:** `GET {{baseUrl}}/groups/{{id}}/insights`
**Authentication Required:** Yes (Bearer Token)
**Description:** Auto-synced from `groups.controller.ts`.

- Method: `GET`
- Route: `/groups/{{id}}/insights`
- Purpose: Executes `GET` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Query or path parameters (see URL).

**Example Response:**
```json
{
  "success": true,
  "message": "GET /groups/{{id}}/insights executed successfully",
  "data": {}
}
```

---

### POST /groups/{{id}}/join
**Endpoint:** `POST {{baseUrl}}/groups/{{id}}/join`
**Authentication Required:** Yes (Bearer Token)
**Description:** Auto-synced from `groups.controller.ts`.

- Method: `POST`
- Route: `/groups/{{id}}/join`
- Purpose: Executes `POST` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Typically requires a JSON body.

**Example Response:**
```json
{
  "success": true,
  "message": "POST /groups/{{id}}/join executed successfully",
  "data": {}
}
```

---

### POST /groups/{{id}}/rules
**Endpoint:** `POST {{baseUrl}}/groups/{{id}}/rules`
**Authentication Required:** Yes (Bearer Token)
**Description:** Auto-synced from `groups.controller.ts`.

- Method: `POST`
- Route: `/groups/{{id}}/rules`
- Purpose: Executes `POST` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input (Body Schema: `CreateGroupRuleDto`):**
```json
{
  "title": "string",
  "description": "string",
  "order": "number = 0"
}
```

**Example Response:**
```json
{
  "success": true,
  "message": "POST /groups/{{id}}/rules executed successfully",
  "data": {}
}
```

---

### POST /groups/{{id}}/posts
**Endpoint:** `POST {{baseUrl}}/groups/{{id}}/posts`
**Authentication Required:** Yes (Bearer Token)
**Description:** Auto-synced from `groups.controller.ts`.

- Method: `POST`
- Route: `/groups/{{id}}/posts`
- Purpose: Executes `POST` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input (Body Schema: `CreateGroupPostDto`):**
```json
{
  "postId": "string"
}
```

**Example Response:**
```json
{
  "success": true,
  "message": "POST /groups/{{id}}/posts executed successfully",
  "data": {}
}
```

---

### PUT /groups/{{id}}
**Endpoint:** `PUT {{baseUrl}}/groups/{{id}}`
**Authentication Required:** Yes (Bearer Token)
**Description:** Auto-synced from `groups.controller.ts`.

- Method: `PUT`
- Route: `/groups/{{id}}`
- Purpose: Executes `PUT` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input (Body Schema: `UpdateGroupDto`):**
```json
{
  "name": "string",
  "description": "string",
  "coverPhoto": "string",
  "type": "GroupType",
  "restrictPosting": "boolean"
}
```

**Example Response:**
```json
{
  "success": true,
  "message": "PUT /groups/{{id}} executed successfully",
  "data": {}
}
```

---

### PUT /groups/{{id}}/members/{{userId}}/role
**Endpoint:** `PUT {{baseUrl}}/groups/{{id}}/members/{{userId}}/role`
**Authentication Required:** Yes (Bearer Token)
**Description:** Auto-synced from `groups.controller.ts`.

- Method: `PUT`
- Route: `/groups/{{id}}/members/{{userId}}/role`
- Purpose: Executes `PUT` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Typically requires a JSON body.

**Example Response:**
```json
{
  "success": true,
  "message": "PUT /groups/{{id}}/members/{{userId}}/role executed successfully",
  "data": {}
}
```

---

### PUT /groups/{{id}}/requests/{{userId}}
**Endpoint:** `PUT {{baseUrl}}/groups/{{id}}/requests/{{userId}}`
**Authentication Required:** Yes (Bearer Token)
**Description:** Auto-synced from `groups.controller.ts`.

- Method: `PUT`
- Route: `/groups/{{id}}/requests/{{userId}}`
- Purpose: Executes `PUT` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Typically requires a JSON body.

**Example Response:**
```json
{
  "success": true,
  "message": "PUT /groups/{{id}}/requests/{{userId}} executed successfully",
  "data": {}
}
```

---

### PUT /groups/{{id}}/posts/{{groupPostId}}/approval
**Endpoint:** `PUT {{baseUrl}}/groups/{{id}}/posts/{{groupPostId}}/approval`
**Authentication Required:** Yes (Bearer Token)
**Description:** Auto-synced from `groups.controller.ts`.

- Method: `PUT`
- Route: `/groups/{{id}}/posts/{{groupPostId}}/approval`
- Purpose: Executes `PUT` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Typically requires a JSON body.

**Example Response:**
```json
{
  "success": true,
  "message": "PUT /groups/{{id}}/posts/{{groupPostId}}/approval executed successfully",
  "data": {}
}
```

---

### DELETE /groups/{{id}}
**Endpoint:** `DELETE {{baseUrl}}/groups/{{id}}`
**Authentication Required:** Yes (Bearer Token)
**Description:** Auto-synced from `groups.controller.ts`.

- Method: `DELETE`
- Route: `/groups/{{id}}`
- Purpose: Executes `DELETE` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Query or path parameters (see URL).

**Example Response:**
```json
{
  "success": true,
  "message": "DELETE /groups/{{id}} executed successfully",
  "data": {}
}
```

---

### DELETE /groups/{{id}}/leave
**Endpoint:** `DELETE {{baseUrl}}/groups/{{id}}/leave`
**Authentication Required:** Yes (Bearer Token)
**Description:** Auto-synced from `groups.controller.ts`.

- Method: `DELETE`
- Route: `/groups/{{id}}/leave`
- Purpose: Executes `DELETE` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Query or path parameters (see URL).

**Example Response:**
```json
{
  "success": true,
  "message": "DELETE /groups/{{id}}/leave executed successfully",
  "data": {}
}
```

---

### DELETE /groups/{{id}}/members/{{userId}}
**Endpoint:** `DELETE {{baseUrl}}/groups/{{id}}/members/{{userId}}`
**Authentication Required:** Yes (Bearer Token)
**Description:** Auto-synced from `groups.controller.ts`.

- Method: `DELETE`
- Route: `/groups/{{id}}/members/{{userId}}`
- Purpose: Executes `DELETE` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Query or path parameters (see URL).

**Example Response:**
```json
{
  "success": true,
  "message": "DELETE /groups/{{id}}/members/{{userId}} executed successfully",
  "data": {}
}
```

---

### DELETE /groups/{{id}}/rules/{{ruleId}}
**Endpoint:** `DELETE {{baseUrl}}/groups/{{id}}/rules/{{ruleId}}`
**Authentication Required:** Yes (Bearer Token)
**Description:** Auto-synced from `groups.controller.ts`.

- Method: `DELETE`
- Route: `/groups/{{id}}/rules/{{ruleId}}`
- Purpose: Executes `DELETE` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Query or path parameters (see URL).

**Example Response:**
```json
{
  "success": true,
  "message": "DELETE /groups/{{id}}/rules/{{ruleId}} executed successfully",
  "data": {}
}
```

---

## 📦 Feature Area: Pages (Sprint 14)
Contains all endpoints and functionalities related to Pages (Sprint 14).

### Create Page
**Endpoint:** `POST {{baseUrl}}/pages/`
**Authentication Required:** Yes (Bearer Token)
**Description:** Auto-synced from `pages.controller.ts`.

- Method: `POST`
- Route: `/pages`
- Purpose: Executes `POST` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input (Body Schema: `CreatePageDto`):**
```json
{
  "name": "string",
  "description": "string",
  "category": "PageCategory = PageCategory.OTHER",
  "coverPhoto": "string",
  "logoUrl": "string",
  "website": "string",
  "phone": "string"
}
```

**Example Response:**
```json
{
  "success": true,
  "message": "POST /pages executed successfully",
  "data": {}
}
```

---

### Get Page By ID
**Endpoint:** `GET {{baseUrl}}/pages/{{pageId}}`
**Authentication Required:** Unknown
**Description:** Auto-synced from `collection-existing`.

- Method: `GET`
- Route: `/pages/{{pageId}}`
- Purpose: Executes `GET` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Query or path parameters (see URL).

**Example Response:**
```json
{
  "success": true,
  "message": "GET /pages/{{pageId}} executed successfully",
  "data": {}
}
```

---

### Update Page
**Endpoint:** `PUT {{baseUrl}}/pages/{{pageId}}`
**Authentication Required:** Unknown
**Description:** Auto-synced from `collection-existing`.

- Method: `PUT`
- Route: `/pages/{{pageId}}`
- Purpose: Executes `PUT` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Typically requires a JSON body.

**Example Response:**
```json
{
  "success": true,
  "message": "PUT /pages/{{pageId}} executed successfully",
  "data": {}
}
```

---

### Toggle Page Follow
**Endpoint:** `POST {{baseUrl}}/pages/{{pageId}}/follow`
**Authentication Required:** Unknown
**Description:** Auto-synced from `collection-existing`.

- Method: `POST`
- Route: `/pages/{{pageId}}/follow`
- Purpose: Executes `POST` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Typically requires a JSON body.

**Example Response:**
```json
{
  "success": true,
  "message": "POST /pages/{{pageId}}/follow executed successfully",
  "data": {}
}
```

---

### GET /pages/{{id}}
**Endpoint:** `GET {{baseUrl}}/pages/{{id}}`
**Authentication Required:** Yes (Bearer Token)
**Description:** Auto-synced from `pages.controller.ts`.

- Method: `GET`
- Route: `/pages/{{id}}`
- Purpose: Executes `GET` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Query or path parameters (see URL).

**Example Response:**
```json
{
  "success": true,
  "message": "GET /pages/{{id}} executed successfully",
  "data": {}
}
```

---

### POST /pages/{{id}}/follow
**Endpoint:** `POST {{baseUrl}}/pages/{{id}}/follow`
**Authentication Required:** Yes (Bearer Token)
**Description:** Auto-synced from `pages.controller.ts`.

- Method: `POST`
- Route: `/pages/{{id}}/follow`
- Purpose: Executes `POST` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Typically requires a JSON body.

**Example Response:**
```json
{
  "success": true,
  "message": "POST /pages/{{id}}/follow executed successfully",
  "data": {}
}
```

---

### PUT /pages/{{id}}
**Endpoint:** `PUT {{baseUrl}}/pages/{{id}}`
**Authentication Required:** Yes (Bearer Token)
**Description:** Auto-synced from `pages.controller.ts`.

- Method: `PUT`
- Route: `/pages/{{id}}`
- Purpose: Executes `PUT` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Typically requires a JSON body.

**Example Response:**
```json
{
  "success": true,
  "message": "PUT /pages/{{id}} executed successfully",
  "data": {}
}
```

---

## 📦 Feature Area: Global Search (Sprint 14)
Contains all endpoints and functionalities related to Global Search (Sprint 14).

### Global Search
**Endpoint:** `GET {{baseUrl}}/search/?q=backend&type=posts&page=1&limit=20`
**Authentication Required:** Yes (Bearer Token)
**Description:** Auto-synced from `search.controller.ts`.

- Method: `GET`
- Route: `/search`
- Purpose: Executes `GET` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Query or path parameters (see URL).

**Example Response:**
```json
{
  "success": true,
  "message": "GET /search executed successfully",
  "data": {}
}
```

---

### Trending Hashtags
**Endpoint:** `GET {{baseUrl}}/search/trending`
**Authentication Required:** Yes (Bearer Token)
**Description:** Auto-synced from `search.controller.ts`.

- Method: `GET`
- Route: `/search/trending`
- Purpose: Executes `GET` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Query or path parameters (see URL).

**Example Response:**
```json
{
  "success": true,
  "message": "GET /search/trending executed successfully",
  "data": {}
}
```

---

## 📦 Feature Area: Live Streaming (Sprint 18)
Contains all endpoints and functionalities related to Live Streaming (Sprint 18).

### Create Stream
**Endpoint:** `POST {{baseUrl}}/streams/`
**Authentication Required:** Yes (Bearer Token)
**Description:** Auto-synced from `streaming.controller.ts`.

- Method: `POST`
- Route: `/streams`
- Purpose: Executes `POST` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input (Body Schema: `CreateStreamDto`):**
```json
{
  "title": "string",
  "description": "string",
  "thumbnailUrl": "string",
  "isRecorded": "boolean = true"
}
```

**Example Response:**
```json
{
  "success": true,
  "message": "POST /streams executed successfully",
  "data": {}
}
```

---

### Get Active Streams
**Endpoint:** `GET {{baseUrl}}/streams/?page=1&limit=20`
**Authentication Required:** Yes (Bearer Token)
**Description:** Auto-synced from `streaming.controller.ts`.

- Method: `GET`
- Route: `/streams`
- Purpose: Executes `GET` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Query or path parameters (see URL).

**Example Response:**
```json
{
  "success": true,
  "message": "GET /streams executed successfully",
  "data": {}
}
```

---

### Get Archived Streams
**Endpoint:** `GET {{baseUrl}}/streams/archived/{{userId}}?page=1&limit=20`
**Authentication Required:** Yes (Bearer Token)
**Description:** Auto-synced from `streaming.controller.ts`.

- Method: `GET`
- Route: `/streams/archived/{{userId}}`
- Purpose: Executes `GET` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Query or path parameters (see URL).

**Example Response:**
```json
{
  "success": true,
  "message": "GET /streams/archived/{{userId}} executed successfully",
  "data": {}
}
```

---

### Get Stream By ID
**Endpoint:** `GET {{baseUrl}}/streams/{{streamId}}`
**Authentication Required:** Unknown
**Description:** Auto-synced from `collection-existing`.

- Method: `GET`
- Route: `/streams/{{streamId}}`
- Purpose: Executes `GET` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Query or path parameters (see URL).

**Example Response:**
```json
{
  "success": true,
  "message": "GET /streams/{{streamId}} executed successfully",
  "data": {}
}
```

---

### End Stream
**Endpoint:** `POST {{baseUrl}}/streams/{{streamId}}/end`
**Authentication Required:** Unknown
**Description:** Auto-synced from `collection-existing`.

- Method: `POST`
- Route: `/streams/{{streamId}}/end`
- Purpose: Executes `POST` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Typically requires a JSON body.

**Example Response:**
```json
{
  "success": true,
  "message": "POST /streams/{{streamId}}/end executed successfully",
  "data": {}
}
```

---

### Delete Stream
**Endpoint:** `DELETE {{baseUrl}}/streams/{{streamId}}`
**Authentication Required:** Unknown
**Description:** Auto-synced from `collection-existing`.

- Method: `DELETE`
- Route: `/streams/{{streamId}}`
- Purpose: Executes `DELETE` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Query or path parameters (see URL).

**Example Response:**
```json
{
  "success": true,
  "message": "DELETE /streams/{{streamId}} executed successfully",
  "data": {}
}
```

---

### Get Stream Viewers
**Endpoint:** `GET {{baseUrl}}/streams/{{streamId}}/viewers`
**Authentication Required:** Unknown
**Description:** Auto-synced from `collection-existing`.

- Method: `GET`
- Route: `/streams/{{streamId}}/viewers`
- Purpose: Executes `GET` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Query or path parameters (see URL).

**Example Response:**
```json
{
  "success": true,
  "message": "GET /streams/{{streamId}}/viewers executed successfully",
  "data": {}
}
```

---

### GET /streams/{{id}}
**Endpoint:** `GET {{baseUrl}}/streams/{{id}}`
**Authentication Required:** Yes (Bearer Token)
**Description:** Auto-synced from `streaming.controller.ts`.

- Method: `GET`
- Route: `/streams/{{id}}`
- Purpose: Executes `GET` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Query or path parameters (see URL).

**Example Response:**
```json
{
  "success": true,
  "message": "GET /streams/{{id}} executed successfully",
  "data": {}
}
```

---

### GET /streams/{{id}}/viewers
**Endpoint:** `GET {{baseUrl}}/streams/{{id}}/viewers`
**Authentication Required:** Yes (Bearer Token)
**Description:** Auto-synced from `streaming.controller.ts`.

- Method: `GET`
- Route: `/streams/{{id}}/viewers`
- Purpose: Executes `GET` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Query or path parameters (see URL).

**Example Response:**
```json
{
  "success": true,
  "message": "GET /streams/{{id}}/viewers executed successfully",
  "data": {}
}
```

---

### POST /streams/{{id}}/end
**Endpoint:** `POST {{baseUrl}}/streams/{{id}}/end`
**Authentication Required:** Yes (Bearer Token)
**Description:** Auto-synced from `streaming.controller.ts`.

- Method: `POST`
- Route: `/streams/{{id}}/end`
- Purpose: Executes `POST` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Typically requires a JSON body.

**Example Response:**
```json
{
  "success": true,
  "message": "POST /streams/{{id}}/end executed successfully",
  "data": {}
}
```

---

### DELETE /streams/{{id}}
**Endpoint:** `DELETE {{baseUrl}}/streams/{{id}}`
**Authentication Required:** Yes (Bearer Token)
**Description:** Auto-synced from `streaming.controller.ts`.

- Method: `DELETE`
- Route: `/streams/{{id}}`
- Purpose: Executes `DELETE` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Query or path parameters (see URL).

**Example Response:**
```json
{
  "success": true,
  "message": "DELETE /streams/{{id}} executed successfully",
  "data": {}
}
```

---

## 📦 Feature Area: Analytics (Sprint 19)
Contains all endpoints and functionalities related to Analytics (Sprint 19).

### Log Analytics Events
**Endpoint:** `POST {{baseUrl}}/analytics/events`
**Authentication Required:** Yes (Bearer Token)
**Description:** Auto-synced from `analytics.controller.ts`.

- Method: `POST`
- Route: `/analytics/events`
- Purpose: Executes `POST` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input (Body Schema: `LogAnalyticsEventsDto`):**
```json
{
  "events": "AnalyticsEventInputDto[]"
}
```

**Example Response:**
```json
{
  "success": true,
  "message": "POST /analytics/events executed successfully",
  "data": {}
}
```

---

### Get Analytics Events
**Endpoint:** `GET {{baseUrl}}/analytics/events?type=POST_VIEW&page=1&limit=50`
**Authentication Required:** Yes (Bearer Token)
**Description:** Auto-synced from `analytics.controller.ts`.

- Method: `GET`
- Route: `/analytics/events`
- Purpose: Executes `GET` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Query or path parameters (see URL).

**Example Response:**
```json
{
  "success": true,
  "message": "GET /analytics/events executed successfully",
  "data": {}
}
```

---

## 📦 Feature Area: Events (Sprint 20)
Contains all endpoints and functionalities related to Events (Sprint 20).

### Create Event
**Endpoint:** `POST {{baseUrl}}/events/`
**Authentication Required:** Yes (Bearer Token)
**Description:** Auto-synced from `events.controller.ts`.

- Method: `POST`
- Route: `/events`
- Purpose: Executes `POST` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input (Body Schema: `CreateEventDto`):**
```json
{
  "title": "string",
  "description": "string",
  "coverPhoto": "string",
  "eventType": "EventType = EventType.OFFLINE",
  "startTime": "string",
  "endTime": "string",
  "location": "string",
  "onlineMeetingUrl": "string",
  "isPublic": "boolean = true",
  "maxAttendees": "number",
  "ticketPrice": "number",
  "currency": "string = 'USD'"
}
```

**Example Response:**
```json
{
  "success": true,
  "message": "POST /events executed successfully",
  "data": {}
}
```

---

### Discover Events
**Endpoint:** `GET {{baseUrl}}/events/?page=1&limit=20&type=PUBLIC`
**Authentication Required:** Yes (Bearer Token)
**Description:** Auto-synced from `events.controller.ts`.

- Method: `GET`
- Route: `/events`
- Purpose: Executes `GET` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Query or path parameters (see URL).

**Example Response:**
```json
{
  "success": true,
  "message": "GET /events executed successfully",
  "data": {}
}
```

---

### Get Event By ID
**Endpoint:** `GET {{baseUrl}}/events/{{eventId}}`
**Authentication Required:** Unknown
**Description:** Auto-synced from `collection-existing`.

- Method: `GET`
- Route: `/events/{{eventId}}`
- Purpose: Executes `GET` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Query or path parameters (see URL).

**Example Response:**
```json
{
  "success": true,
  "message": "GET /events/{{eventId}} executed successfully",
  "data": {}
}
```

---

### Update Event
**Endpoint:** `PUT {{baseUrl}}/events/{{eventId}}`
**Authentication Required:** Unknown
**Description:** Auto-synced from `collection-existing`.

- Method: `PUT`
- Route: `/events/{{eventId}}`
- Purpose: Executes `PUT` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Typically requires a JSON body.

**Example Response:**
```json
{
  "success": true,
  "message": "PUT /events/{{eventId}} executed successfully",
  "data": {}
}
```

---

### Delete Event
**Endpoint:** `DELETE {{baseUrl}}/events/{{eventId}}`
**Authentication Required:** Unknown
**Description:** Auto-synced from `collection-existing`.

- Method: `DELETE`
- Route: `/events/{{eventId}}`
- Purpose: Executes `DELETE` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Query or path parameters (see URL).

**Example Response:**
```json
{
  "success": true,
  "message": "DELETE /events/{{eventId}} executed successfully",
  "data": {}
}
```

---

### RSVP Event
**Endpoint:** `POST {{baseUrl}}/events/{{eventId}}/rsvp`
**Authentication Required:** Unknown
**Description:** Auto-synced from `collection-existing`.

- Method: `POST`
- Route: `/events/{{eventId}}/rsvp`
- Purpose: Executes `POST` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Typically requires a JSON body.

**Example Response:**
```json
{
  "success": true,
  "message": "POST /events/{{eventId}}/rsvp executed successfully",
  "data": {}
}
```

---

### Cancel RSVP
**Endpoint:** `DELETE {{baseUrl}}/events/{{eventId}}/rsvp`
**Authentication Required:** Unknown
**Description:** Auto-synced from `collection-existing`.

- Method: `DELETE`
- Route: `/events/{{eventId}}/rsvp`
- Purpose: Executes `DELETE` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Query or path parameters (see URL).

**Example Response:**
```json
{
  "success": true,
  "message": "DELETE /events/{{eventId}}/rsvp executed successfully",
  "data": {}
}
```

---

### Get Event Attendees
**Endpoint:** `GET {{baseUrl}}/events/{{eventId}}/attendees?page=1&limit=20`
**Authentication Required:** Unknown
**Description:** Auto-synced from `collection-existing`.

- Method: `GET`
- Route: `/events/{{eventId}}/attendees`
- Purpose: Executes `GET` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Query or path parameters (see URL).

**Example Response:**
```json
{
  "success": true,
  "message": "GET /events/{{eventId}}/attendees executed successfully",
  "data": {}
}
```

---

### Get Event Ticket
**Endpoint:** `GET {{baseUrl}}/events/{{eventId}}/ticket`
**Authentication Required:** Unknown
**Description:** Auto-synced from `collection-existing`.

- Method: `GET`
- Route: `/events/{{eventId}}/ticket`
- Purpose: Executes `GET` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Query or path parameters (see URL).

**Example Response:**
```json
{
  "success": true,
  "message": "GET /events/{{eventId}}/ticket executed successfully",
  "data": {}
}
```

---

### Link Event To Group
**Endpoint:** `POST {{baseUrl}}/events/group/{{groupId}}/link/{{eventId}}`
**Authentication Required:** Yes (Bearer Token)
**Description:** Auto-synced from `events.controller.ts`.

- Method: `POST`
- Route: `/events/group/{{groupId}}/link/{{eventId}}`
- Purpose: Executes `POST` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Typically requires a JSON body.

**Example Response:**
```json
{
  "success": true,
  "message": "POST /events/group/{{groupId}}/link/{{eventId}} executed successfully",
  "data": {}
}
```

---

### Get Group Events
**Endpoint:** `GET {{baseUrl}}/events/group/{{groupId}}?page=1&limit=20`
**Authentication Required:** Yes (Bearer Token)
**Description:** Auto-synced from `events.controller.ts`.

- Method: `GET`
- Route: `/events/group/{{groupId}}`
- Purpose: Executes `GET` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Query or path parameters (see URL).

**Example Response:**
```json
{
  "success": true,
  "message": "GET /events/group/{{groupId}} executed successfully",
  "data": {}
}
```

---

### GET /events/{{id}}
**Endpoint:** `GET {{baseUrl}}/events/{{id}}`
**Authentication Required:** Yes (Bearer Token)
**Description:** Auto-synced from `events.controller.ts`.

- Method: `GET`
- Route: `/events/{{id}}`
- Purpose: Executes `GET` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Query or path parameters (see URL).

**Example Response:**
```json
{
  "success": true,
  "message": "GET /events/{{id}} executed successfully",
  "data": {}
}
```

---

### GET /events/{{id}}/attendees
**Endpoint:** `GET {{baseUrl}}/events/{{id}}/attendees`
**Authentication Required:** Yes (Bearer Token)
**Description:** Auto-synced from `events.controller.ts`.

- Method: `GET`
- Route: `/events/{{id}}/attendees`
- Purpose: Executes `GET` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Query or path parameters (see URL).

**Example Response:**
```json
{
  "success": true,
  "message": "GET /events/{{id}}/attendees executed successfully",
  "data": {}
}
```

---

### GET /events/{{id}}/ticket
**Endpoint:** `GET {{baseUrl}}/events/{{id}}/ticket`
**Authentication Required:** Yes (Bearer Token)
**Description:** Auto-synced from `events.controller.ts`.

- Method: `GET`
- Route: `/events/{{id}}/ticket`
- Purpose: Executes `GET` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Query or path parameters (see URL).

**Example Response:**
```json
{
  "success": true,
  "message": "GET /events/{{id}}/ticket executed successfully",
  "data": {}
}
```

---

### POST /events/{{id}}/rsvp
**Endpoint:** `POST {{baseUrl}}/events/{{id}}/rsvp`
**Authentication Required:** Yes (Bearer Token)
**Description:** Auto-synced from `events.controller.ts`.

- Method: `POST`
- Route: `/events/{{id}}/rsvp`
- Purpose: Executes `POST` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input (Body Schema: `RsvpEventDto`):**
```json
{
  "status": "RSVPStatus"
}
```

**Example Response:**
```json
{
  "success": true,
  "message": "POST /events/{{id}}/rsvp executed successfully",
  "data": {}
}
```

---

### PUT /events/{{id}}
**Endpoint:** `PUT {{baseUrl}}/events/{{id}}`
**Authentication Required:** Yes (Bearer Token)
**Description:** Auto-synced from `events.controller.ts`.

- Method: `PUT`
- Route: `/events/{{id}}`
- Purpose: Executes `PUT` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Typically requires a JSON body.

**Example Response:**
```json
{
  "success": true,
  "message": "PUT /events/{{id}} executed successfully",
  "data": {}
}
```

---

### DELETE /events/{{id}}
**Endpoint:** `DELETE {{baseUrl}}/events/{{id}}`
**Authentication Required:** Yes (Bearer Token)
**Description:** Auto-synced from `events.controller.ts`.

- Method: `DELETE`
- Route: `/events/{{id}}`
- Purpose: Executes `DELETE` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Query or path parameters (see URL).

**Example Response:**
```json
{
  "success": true,
  "message": "DELETE /events/{{id}} executed successfully",
  "data": {}
}
```

---

### DELETE /events/{{id}}/rsvp
**Endpoint:** `DELETE {{baseUrl}}/events/{{id}}/rsvp`
**Authentication Required:** Yes (Bearer Token)
**Description:** Auto-synced from `events.controller.ts`.

- Method: `DELETE`
- Route: `/events/{{id}}/rsvp`
- Purpose: Executes `DELETE` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Query or path parameters (see URL).

**Example Response:**
```json
{
  "success": true,
  "message": "DELETE /events/{{id}}/rsvp executed successfully",
  "data": {}
}
```

---

## 📦 Feature Area: Misc
Contains all endpoints and functionalities related to Misc.

### POST /interest/dwell
**Endpoint:** `POST {{baseUrl}}/interest/dwell`
**Authentication Required:** Yes (Bearer Token)
**Description:** Auto-synced from `interest.controller.ts`.

- Method: `POST`
- Route: `/interest/dwell`
- Purpose: Executes `POST` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Typically requires a JSON body.

**Example Response:**
```json
{
  "success": true,
  "message": "POST /interest/dwell executed successfully",
  "data": {}
}
```

---

### GET /activity
**Endpoint:** `GET {{baseUrl}}/activity`
**Authentication Required:** Yes (Bearer Token)
**Description:** Auto-synced from `activity.controller.ts`.

- Method: `GET`
- Route: `/activity`
- Purpose: Executes `GET` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Query or path parameters (see URL).

**Example Response:**
```json
{
  "success": true,
  "message": "GET /activity executed successfully",
  "data": {}
}
```

---

### DELETE /activity/clear
**Endpoint:** `DELETE {{baseUrl}}/activity/clear`
**Authentication Required:** Yes (Bearer Token)
**Description:** Auto-synced from `activity.controller.ts`.

- Method: `DELETE`
- Route: `/activity/clear`
- Purpose: Executes `DELETE` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Query or path parameters (see URL).

**Example Response:**
```json
{
  "success": true,
  "message": "DELETE /activity/clear executed successfully",
  "data": {}
}
```

---

### DELETE /activity/{{id}}
**Endpoint:** `DELETE {{baseUrl}}/activity/{{id}}`
**Authentication Required:** Yes (Bearer Token)
**Description:** Auto-synced from `activity.controller.ts`.

- Method: `DELETE`
- Route: `/activity/{{id}}`
- Purpose: Executes `DELETE` on this backend endpoint.
- Notes: Update request body/params for your test scenario.

**Expected Input:** Query or path parameters (see URL).

**Example Response:**
```json
{
  "success": true,
  "message": "DELETE /activity/{{id}} executed successfully",
  "data": {}
}
```

---

## 📚 Schema Definition Appendix
Below are the detailed structures of the database models and request/response payloads referenced in the API.

### `ActivityLog`
```json
{
  "id": "String",
  "userId": "String",
  "user": "User",
  "actionType": "String",
  "entityId": "String?",
  "entityType": "String?",
  "metadata": "Json?",
  "createdAt": "DateTime"
}
```

### `ActivityService`
```json
{
  "userId": "string,",
  "actionType": "string,",
  "entityId": "string,",
  "entityType": "string,",
  "metadata": "metadata || Prisma.JsonNull,",
  "data": "{",
  "where": "{ userId },",
  "orderBy": "{ createdAt: 'desc' },",
  "take": "limit,",
  "meta": "{",
  "id": "logId,"
}
```

### `AddCommentDto`
```json
{
  "content": "string",
  "parentId": "string"
}
```

### `AddReactionDto`
```json
{
  "example": "'\ud83d\udc4d',",
  "maxLength": "10,",
  "emoji": "string"
}
```

### `AddRoomMembersDto`
```json
{
  "description": "'User IDs to add to the room',",
  "example": "['user-uuid-1', 'user-uuid-2'],",
  "type": "[String],",
  "userIds": "string[]"
}
```

### `AdminActionOptionalReasonDto`
```json
{
  "reason": "string"
}
```

### `AdminActionWithCauseDto`
```json
{
  "cause": "string"
}
```

### `AdminCancelDealDto`
```json
{
  "cause": "string"
}
```

### `AdminDeclineApplicationDto`
```json
{
  "reason": "string"
}
```

### `AdminMarketplaceService`
```json
{
  "include": "{",
  "user": "{",
  "orderBy": "{ createdAt: 'desc' },",
  "take": "limit,",
  "where": "{ id: tx.productId },",
  "select": "{ id: true, title: true, price: true, images: true },",
  "id": "true,",
  "name": "true,",
  "email": "true,",
  "image": "true,",
  "createdAt": "true,",
  "role": "true,",
  "data": "{",
  "status": "tx.product.status === 'SOLD' ? 'ACTIVE' : tx.product.status,",
  "reviewedById": "adminId,",
  "userId": "app.userId,",
  "phoneNumber": "app.phoneNumber,",
  "address": "app.address,",
  "city": "app.city,",
  "country": "app.country,",
  "commercialRegNumber": "sensitiveProfile.commercialRegNumber,",
  "bankAccountNumber": "sensitiveProfile.bankAccountNumber,",
  "targetType": "'TRANSACTION',",
  "targetId": "transactionId,",
  "action": "'CANCEL_DEAL',",
  "cause": "dto.cause,",
  "applicationId": "string,",
  "adminId": "string,",
  "dto": "AdminCancelDealDto,",
  "adminNote": "dto.reason,",
  "sellerId": "sellerUserId,",
  "product": "{ select: { id: true, title: true, price: true } },",
  "buyer": "{ select: { id: true, name: true, email: true } },",
  "transaction": "true,",
  "bankCardNumberMasked": "'\u2022\u2022\u2022\u2022 \u2022\u2022\u2022\u2022 \u2022\u2022\u2022\u2022 ' + profile.bankCardLast4,",
  "profile": "{",
  "application": "application",
  "idCardNumber": "sensitiveProfile.idCardNumber,",
  "bankCardNumber": "sensitiveProfile.bankCardNumberMasked,",
  "stats": "{",
  "currentDeals": "[",
  "dealHistory": "[",
  "sellerUserId": "string,",
  "isSuspended": "true,",
  "suspendReason": "dto.cause,",
  "orderId": "string,",
  "transactionId": "string,",
  "message": "'Deal cancelled via order escrow flow.',",
  "order": "updatedOrder,",
  "quantity": "restoredQuantity,",
  "admin": "{ select: { id: true, name: true, email: true } },"
}
```

### `AnalyticsEvent`
```json
{
  "id": "String",
  "userId": "String",
  "user": "User",
  "eventType": "AnalyticsEventType",
  "targetId": "String?",
  "targetType": "String?",
  "metadata": "Json?",
  "sessionId": "String?",
  "createdAt": "DateTime"
}
```

### `AnalyticsEventInputDto`
```json
{
  "eventType": "AnalyticsEventType",
  "targetId": "string",
  "targetType": "string",
  "metadata": "Record<string, unknown>",
  "sessionId": "string"
}
```

### `AnalyticsService`
```json
{
  "eventType": "e.eventType,",
  "targetId": "e.targetId ?? null,",
  "targetType": "e.targetType ?? null,",
  "sessionId": "e.sessionId ?? null,",
  "orderBy": "{ createdAt: 'desc' },",
  "take": "limit,",
  "data": "events,"
}
```

### `AudioTrack`
```json
{
  "id": "String",
  "title": "String",
  "artist": "String?",
  "durationSec": "Int",
  "audioUrl": "String",
  "waveformData": "Json?",
  "genre": "String?",
  "isLicensed": "Boolean",
  "usageCount": "BigInt",
  "createdAt": "DateTime",
  "updatedAt": "DateTime",
  "reels": "Reel[]"
}
```

### `AuthResponse`
```json
{
  "user": "UserResponse",
  "accessToken": "string"
}
```

### `AuthService`
```json
{
  "data": "{",
  "active": "true,",
  "emailVerified": "true,",
  "userId": "user.id,",
  "otpVerified": "false, // Ensure OTP hasn't been used already",
  "type": "'EMAIL_VERIFICATION',",
  "where": "{ id: otpRecord.id },",
  "user": "updatedUser,",
  "ipAddress": "string,",
  "userAgent": "string,",
  "request": "{ email: string",
  "response": "Response,",
  "status": "'ACTIVE',",
  "orderBy": "{ createdAt: 'desc' },",
  "createdAt": "'asc', // Get the oldest session with this IP/userAgent combo",
  "sessionId": "string | undefined,",
  "googleUser": "any,",
  "email": "googleUser.email,",
  "image": "googleUser.picture,",
  "password": "hashedNewPassword,",
  "expiresIn": "TOKEN_CONSTANTS.REFRESH_TOKEN.EXPIRES_IN,",
  "accessToken": "newAccessToken,",
  "success": "true,",
  "message": "ERROR_MESSAGES.FORGOT_PASSWORD_CODE_RESENT,",
  "httpOnly": "TOKEN_CONSTANTS.COOKIE.HTTP_ONLY,",
  "secure": "TOKEN_CONSTANTS.COOKIE.SECURE,",
  "sameSite": "TOKEN_CONSTANTS.COOKIE.SAME_SITE,",
  "path": "TOKEN_CONSTANTS.COOKIE.PATH,",
  "httpRequest": "Request,"
}
```

### `Block`
```json
{
  "id": "String",
  "blocker": "User",
  "blockerId": "String",
  "blocked": "User",
  "blockedId": "String",
  "createdAt": "DateTime"
}
```

### `CallGateway`
```json
{
  "server": "Server",
  "data": "{",
  "roomId": "string",
  "userId": "data.userId,",
  "peerId": "string",
  "displayName": "data.displayName,",
  "avatarUrl": "data.avatarUrl,",
  "existingParticipants": "[],",
  "audio": "data.audio,",
  "video": "data.video,",
  "sdp": "data.sdp,",
  "stats": "{",
  "bytesSent": "number",
  "bytesReceived": "number",
  "packetLoss": "number",
  "roundTripTime": "number",
  "offer": "data.offer,",
  "senderId": "client.id,",
  "answer": "data.answer,",
  "candidate": "data.candidate,"
}
```

### `CallParticipant`
```json
{
  "id": "String",
  "roomId": "String",
  "room": "CallRoom",
  "userId": "String",
  "user": "User",
  "peerId": "String",
  "isAudioOn": "Boolean",
  "isVideoOn": "Boolean",
  "joinedAt": "DateTime",
  "leftAt": "DateTime?",
  "createdAt": "DateTime",
  "updatedAt": "DateTime"
}
```

### `CallRoom`
```json
{
  "id": "String",
  "createdById": "String?",
  "createdBy": "User?",
  "endedAt": "DateTime?",
  "maxParticipants": "Int",
  "createdAt": "DateTime",
  "updatedAt": "DateTime",
  "participants": "CallParticipant[]"
}
```

### `CallService`
```json
{
  "where": "{",
  "update": "{},",
  "create": "{",
  "id": "roomId,",
  "createdById": "userId,",
  "roomId": "string,",
  "userId": "payload.userId,",
  "peerId": "string,",
  "displayName": "payload.displayName,",
  "avatarUrl": "payload.avatarUrl,",
  "audio": "boolean,",
  "video": "boolean,",
  "data": "{",
  "roomFull": "false,",
  "leftAt": "null,",
  "active": "active === '1',",
  "sharerId": "sharerId ?? null,",
  "stats": "{",
  "bytesSent": "number",
  "bytesReceived": "number",
  "packetLoss": "number",
  "roundTripTime": "number"
}
```

### `CancelOrderDto`
```json
{
  "cancelReason": "string"
}
```

### `ChatController`
```json
{
  "schema": "{",
  "type": "'object',",
  "properties": "{",
  "content": "{ type: 'string' },",
  "replyToId": "{ type: 'string' },",
  "files": "{ type: 'array', items: { type: 'string', format: 'binary' } },",
  "summary": "'Search messages across all rooms or within a specific room',"
}
```

### `ChatGateway`
```json
{
  "activeRoomId": "null,",
  "isTyping": "false,",
  "message": "'Successfully authenticated',",
  "userId": "user.id,",
  "username": "user.name || user.email,",
  "user": "{",
  "id": "user.id,",
  "name": "user.name,",
  "image": "user.image,",
  "client": "Socket,",
  "roomId": "string,",
  "added": "result.added,"
}
```

### `ChatMediaService`
```json
{
  "file": "Express.Multer.File,",
  "messageId": "string,",
  "url": "result!.secure_url,",
  "type": "'DOCUMENT',",
  "fileName": "file.originalname,",
  "fileSize": "file.size,",
  "mimeType": "file.mimetype,",
  "width": "result?.width,",
  "height": "result?.height,",
  "publicId": "result!.public_id,",
  "duration": "result?.duration,",
  "thumbnail": "string",
  "files": "Express.Multer.File[],",
  "media": "MessageMediaDocument[],",
  "_id": "result.insertedIds[index],",
  "subfolder": "string,",
  "resourceType": "'image' | 'video' | 'raw' = 'image',",
  "folder": "`${CHAT_CONSTANTS.CLOUDINARY.FOLDER}/${subfolder}`,",
  "resource_type": "resourceType,",
  "crop": "'limit',",
  "quality": "CHAT_CONSTANTS.CLOUDINARY.IMAGE_TRANSFORMATION.QUALITY,",
  "fetch_format": "CHAT_CONSTANTS.CLOUDINARY.IMAGE_TRANSFORMATION.FORMAT,"
}
```

### `ChatService`
```json
{
  "userId": "string,",
  "data": "{",
  "type": "type === 'GROUP' ? 'GROUP' : 'DIRECT', // TS Enum needs cast if from string",
  "name": "data.name,",
  "members": "{",
  "role": "'MEMBER',",
  "include": "{ members: true },",
  "where": "{ roomId },",
  "some": "{ userId },",
  "messages": "{",
  "take": "20,",
  "orderBy": "{ createdAt: 'desc' },",
  "roomId": "string,",
  "userIdToRemove": "string,",
  "requesterId": "string,",
  "files": "Express.Multer.File[]",
  "images": "Express.Multer.File[]",
  "videos": "Express.Multer.File[]",
  "content": "data.content,",
  "replyToId": "data.replyToId,"
}
```

### `ChatUserStateInterceptor`
```json
{
  "activeRoomId": "null,",
  "isTyping": "false,"
}
```

### `CheckEmailRequest`
```json
{
  "email": "string"
}
```

### `CheckEmailResponse`
```json
{
  "success": "boolean",
  "user": "{",
  "id": "string",
  "name": "string",
  "email": "string"
}
```

### `CloudinaryService`
```json
{
  "file": "Express.Multer.File,",
  "userId": "string,",
  "folder": "`${POST_CONSTANTS.CLOUDINARY.FOLDER}/videos`,",
  "transformation": "[{ width: 300, crop: 'scale' }],",
  "width": "number",
  "height": "number",
  "crop": "'limit',",
  "gravity": "'center',",
  "docType": "'id_front' | 'id_back' | 'face',",
  "orderId": "string,",
  "proofType": "'shipment' | 'delivery',",
  "options": "any,",
  "public_id": "options.public_id || 'mock_public_id',",
  "version": "1,",
  "signature": "'mock_signature',",
  "format": "'jpg',",
  "resource_type": "'video',",
  "tags": "[],",
  "pages": "1,",
  "bytes": "result.bytes,",
  "type": "'IMAGE' | 'VIDEO' | 'AUDIO' | 'VOICE_NOTE' | 'DOCUMENT' | 'FILE',",
  "etag": "'mock_etag',",
  "placeholder": "false,",
  "url": "result.secure_url,",
  "secure_url": "mockUrl,",
  "access_mode": "'public',",
  "original_filename": "'mock_filename',",
  "moderation": "[],",
  "access_control": "[],",
  "context": "{},",
  "metadata": "{},",
  "postId": "string,",
  "quality": "POST_CONSTANTS.CLOUDINARY.VIDEO_TRANSFORMATION.QUALITY,",
  "fetch_format": "POST_CONSTANTS.CLOUDINARY.IMAGE_TRANSFORMATION.FORMAT,",
  "publicId": "result.public_id,",
  "files": "{ images?: Express.Multer.File[]",
  "imageUrls": "Array<{",
  "videoUrls": "Array<{",
  "messageId": "string,",
  "duration": "number",
  "thumbnailUrl": "string",
  "CLOUDINARY": "{",
  "FOLDER": "'chat/media',",
  "start_offset": "'0',"
}
```

### `Comment`
```json
{
  "id": "String",
  "content": "String",
  "postId": "String",
  "authorId": "String",
  "parentId": "String?",
  "likeCount": "Int",
  "replyCount": "Int",
  "post": "Post",
  "author": "User",
  "parent": "Comment?",
  "replies": "Comment[]",
  "likes": "Like[]",
  "createdAt": "DateTime",
  "updatedAt": "DateTime",
  "deletedAt": "DateTime?"
}
```

### `CommentAuthorDto`
```json
{
  "id": "string",
  "name": "string | null",
  "image": "string | null"
}
```

### `CommentResponseDto`
```json
{
  "id": "string",
  "content": "string",
  "postId": "string",
  "parentId": "string | null",
  "createdAt": "Date",
  "updatedAt": "Date",
  "author": "{",
  "name": "string | null",
  "image": "string | null",
  "replyCount": "number",
  "replies": "CommentResponseDto[]"
}
```

### `CommentService`
```json
{
  "postId": "string",
  "authorId": "string,",
  "dto": "UpdateCommentDto,",
  "where": "{ id: commentToDelete.parentId },",
  "select": "{ postId: true, parentId: true, replyCount: true },",
  "id": "comment.author.id,",
  "parentId": "commentId,",
  "data": "{",
  "content": "comment.content,",
  "include": "{",
  "author": "comment.author",
  "name": "comment.author.name,",
  "image": "comment.author.image,",
  "_count": "{",
  "commentCount": "{",
  "increment": "1,",
  "replyCount": "comment._count?.replies ?? 0,",
  "userId": "string",
  "commentId": "string",
  "timestamp": "Date",
  "sort": "'top' | 'recent' = 'top',",
  "createdAt": "comment.createdAt,",
  "updatedAt": "comment.updatedAt,",
  "likeCount": "comment.likeCount ?? 0,",
  "replies": "true,",
  "likes": "{",
  "orderBy": "{ createdAt: 'asc' },",
  "take": "limit,",
  "decrement": "1,",
  "action": "'DELETE'",
  "comment": "CommentWithAuthor,",
  "parentCommentId": "comment.parentId,",
  "liked": "userId ? comment.likes && comment.likes.length > 0 : false,"
}
```

### `ConfirmShipmentDto`
```json
{
  "shipmentTrackingNumber": "string",
  "shipmentCarrier": "string"
}
```

### `ContentSentiment`
```json
{
  "id": "String",
  "contentType": "SentimentContentType",
  "contentId": "String",
  "userId": "String",
  "user": "User",
  "positiveScore": "Int",
  "negativeScore": "Int",
  "wordTokens": "Json",
  "sentenceTokens": "Json",
  "rawText": "String",
  "createdAt": "DateTime"
}
```

### `ContextAuthService`
```json
{
  "payload": "TokenPayload,",
  "where": "{ id: sessionId, status: SessionStatus.ACTIVE },"
}
```

### `CreateCommentDto`
```json
{
  "content": "string",
  "parentId": "string"
}
```

### `CreateDirectRoomDto`
```json
{
  "description": "'User ID to create a direct room with',",
  "example": "'user-uuid-123',",
  "userId": "string"
}
```

### `CreateEventDto`
```json
{
  "title": "string",
  "description": "string",
  "coverPhoto": "string",
  "eventType": "EventType = EventType.OFFLINE",
  "startTime": "string",
  "endTime": "string",
  "location": "string",
  "onlineMeetingUrl": "string",
  "isPublic": "boolean = true",
  "maxAttendees": "number",
  "ticketPrice": "number",
  "currency": "string = 'USD'"
}
```

### `CreateGroupDto`
```json
{
  "name": "string",
  "description": "string",
  "coverPhoto": "string",
  "type": "GroupType = GroupType.PUBLIC",
  "restrictPosting": "boolean = false"
}
```

### `CreateGroupPostDto`
```json
{
  "postId": "string"
}
```

### `CreateGroupRoomDto`
```json
{
  "description": "'Group image URL',",
  "example": "['user-uuid-1', 'user-uuid-2'],",
  "maxLength": "500,",
  "name": "string",
  "imageUrl": "string",
  "type": "[String],",
  "memberIds": "string[]"
}
```

### `CreateGroupRuleDto`
```json
{
  "title": "string",
  "description": "string",
  "order": "number = 0"
}
```

### `CreateIfNotExistsResponse`
```json
{
  "success": "boolean",
  "userCreated": "boolean",
  "user": "UserInfo | null",
  "token": "string | null"
}
```

### `CreateMessageDto`
```json
{
  "description": "'Message ID to reply to',",
  "example": "'507f1f77bcf86cd799439012',",
  "maxLength": "4096,",
  "content": "string",
  "roomId": "string",
  "replyToId": "string"
}
```

### `CreateMessageWithMediaDto`
```json
{
  "description": "'Media attachments',",
  "type": "[MessageMediaDto],",
  "media": "MessageMediaDto[]"
}
```

### `CreatePageDto`
```json
{
  "name": "string",
  "description": "string",
  "category": "PageCategory = PageCategory.OTHER",
  "coverPhoto": "string",
  "logoUrl": "string",
  "website": "string",
  "phone": "string"
}
```

### `CreatePostDto`
```json
{
  "message": "`Content must not exceed ${POST_CONSTANTS.VALIDATION.MAX_CONTENT_LENGTH} characters`,",
  "content": "string",
  "authorId": "string",
  "privacy": "PostPrivacy = PostPrivacy.PUBLIC",
  "customAudienceIds": "string[]"
}
```

### `CreateProductDto`
```json
{
  "title": "string",
  "description": "string",
  "price": "number",
  "currency": "string",
  "quantity": "number",
  "categoryId": "string",
  "images": "string[]"
}
```

### `CreateRoomDto`
```json
{
  "description": "'Member user IDs',",
  "enum": "['DIRECT', 'GROUP'],",
  "example": "'Discussion group for the project team',",
  "type": "[String],",
  "name": "string",
  "imageUrl": "string",
  "memberIds": "string[]"
}
```

### `CreateStoryDto`
```json
{
  "mediaUrl": "string",
  "thumbnailUrl": "string",
  "caption": "string",
  "privacy": "StoryPrivacy = StoryPrivacy.FRIENDS"
}
```

### `CreateStreamDto`
```json
{
  "title": "string",
  "description": "string",
  "thumbnailUrl": "string",
  "isRecorded": "boolean = true"
}
```

### `CreateUserRequest`
```json
{
  "name": "string",
  "email": "string",
  "password": "string",
  "image": "string"
}
```

### `CrisisEvent`
```json
{
  "id": "String",
  "userId": "String",
  "user": "User",
  "messageId": "String?",
  "message": "NoroMessage?",
  "crisisScore": "Decimal",
  "severity": "CrisisSeverity",
  "intervention": "CrisisIntervention?",
  "keywordsHit": "String[]",
  "resolvedAt": "DateTime?",
  "createdAt": "DateTime"
}
```

### `CrisisHotline`
```json
{
  "id": "String",
  "countryCode": "String",
  "name": "String",
  "phone": "String?",
  "sms": "String?",
  "chatUrl": "String?",
  "language": "String",
  "isActive": "Boolean",
  "createdAt": "DateTime",
  "updatedAt": "DateTime"
}
```

### `CurrentUserUpdateInput`
```json
{
  "name": "string",
  "image": "string"
}
```

### `CursorPaginationDto`
```json
{
  "cursor": "string",
  "limit": "number = 10"
}
```

### `DatabaseService`
```json
{
  "datasources": "{",
  "db": "{"
}
```

### `DealLog`
```json
{
  "id": "String",
  "adminId": "String",
  "admin": "User",
  "targetType": "DealLogTargetType",
  "targetId": "String",
  "action": "DealLogAction",
  "cause": "String?",
  "createdAt": "DateTime"
}
```

### `DeleteMessageDto`
```json
{
  "description": "'Delete for everyone in the room',",
  "example": "false,",
  "default": "false,",
  "deleteForEveryone": "boolean"
}
```

### `EditCommentDto`
```json
{
  "content": "string"
}
```

### `EmailService`
```json
{
  "email": "string,",
  "otp": "string,",
  "expiryMinutes": "number = 10,",
  "to": "email,",
  "subject": "'Email Verification - Ding Platform',",
  "text": "`Your OTP for email verification is: ${otp}. This OTP will expire in ${expiryMinutes} minutes.`,",
  "html": "`"
}
```

### `ErrorResponse`
```json
{
  "code": "number",
  "success": "boolean",
  "message": "string"
}
```

### `Event`
```json
{
  "id": "String",
  "title": "String",
  "description": "String?",
  "coverPhoto": "String?",
  "hostId": "String",
  "host": "User",
  "eventType": "EventType",
  "startTime": "DateTime",
  "endTime": "DateTime?",
  "location": "String?",
  "onlineMeetingUrl": "String?",
  "isPublic": "Boolean",
  "maxAttendees": "Int?",
  "attendeeCount": "Int",
  "ticketPrice": "Float?",
  "currency": "String",
  "createdAt": "DateTime",
  "updatedAt": "DateTime",
  "deletedAt": "DateTime?",
  "attendees": "EventAttendee[]",
  "tickets": "EventTicket[]",
  "reminders": "EventReminder[]",
  "groupEvents": "GroupEvent[]"
}
```

### `EventAttendee`
```json
{
  "id": "String",
  "eventId": "String",
  "event": "Event",
  "userId": "String",
  "user": "User",
  "rsvpStatus": "RSVPStatus",
  "rsvpAt": "DateTime",
  "updatedAt": "DateTime"
}
```

### `EventReminder`
```json
{
  "id": "String",
  "eventId": "String",
  "event": "Event",
  "userId": "String",
  "user": "User",
  "remindAt": "DateTime",
  "sent": "Boolean",
  "createdAt": "DateTime"
}
```

### `EventTicket`
```json
{
  "id": "String",
  "eventId": "String",
  "event": "Event",
  "userId": "String",
  "user": "User",
  "ticketCode": "String",
  "status": "EventTicketStatus",
  "paidAmount": "Float",
  "createdAt": "DateTime",
  "updatedAt": "DateTime"
}
```

### `EventsService`
```json
{
  "data": "{ groupId, eventId, linkedById: userId },",
  "hostId": "userId,",
  "eventId": "string,",
  "rsvpStatus": "RSVPStatus.GOING,",
  "isPublic": "true,",
  "deletedAt": "null,",
  "include": "{ event: true },",
  "orderBy": "{ linkedAt: 'desc' },",
  "take": "limit,",
  "where": "{ groupId },",
  "host": "{ select: { id: true, name: true, image: true } },",
  "userId": "string,",
  "dto": "Partial<CreateEventDto>,",
  "create": "{ eventId, userId, rsvpStatus: status },",
  "status": "EventTicketStatus.PENDING_PAYMENT,",
  "paidAmount": "0,",
  "event": "{ select: { title: true, startTime: true, ticketPrice: true } },"
}
```

### `FeedItemDto`
```json
{
  "id": "string",
  "author": "string",
  "time": "string",
  "content": "string",
  "likes": "number",
  "comments": "number",
  "image": "string | null",
  "liked": "boolean"
}
```

### `FeedResponseDto`
```json
{
  "data": "FeedItemDto[]",
  "total": "number",
  "page": "number",
  "limit": "number",
  "totalPages": "number"
}
```

### `FeedService`
```json
{
  "userId": "true,",
  "type": "'HOME' | 'FOLLOWING' | 'EXPLORE' = 'HOME',",
  "scoredPostIds": "{ postId: string",
  "page": "number,",
  "limit": "number,",
  "where": "whereCondition,",
  "isDeleted": "false,",
  "include": "{",
  "author": "p.author?.name ?? '',",
  "_count": "{",
  "select": "{",
  "Likes": "{",
  "Comments": "true,",
  "contentType": "'POST',",
  "contentId": "true,",
  "positiveScore": "true,",
  "negativeScore": "true,",
  "id": "p.id,",
  "content": "p.content,",
  "likes": "p._count?.Likes ?? 0,",
  "comments": "p._count?.Comments ?? 0,",
  "image": "p.mediaUrls?.[0] ?? null,",
  "liked": "p.Likes && p.Likes.length > 0,",
  "total": "items.length,",
  "score": "1,",
  "orderBy": "{ createdAt: 'desc' },",
  "take": "limit,",
  "post": "p,",
  "enabled": "boolean,",
  "sentiment": "{ pos: number"
}
```

### `FinalizeReelDto`
```json
{
  "rawVideoKey": "string",
  "caption": "string",
  "hashtags": "string[]",
  "audioTrackId": "string",
  "audioOffsetMs": "number",
  "durationSec": "number",
  "width": "number",
  "height": "number",
  "fileSizeBytes": "number"
}
```

### `Follow`
```json
{
  "id": "String",
  "follower": "User",
  "followerId": "String",
  "following": "User",
  "followingId": "String",
  "createdAt": "DateTime"
}
```

### `ForgotPasswordRequest`
```json
{
  "email": "string"
}
```

### `ForgotPasswordTokenResponse`
```json
{
  "message": "string",
  "email": "string"
}
```

### `ForwardMessageDto`
```json
{
  "description": "'Room IDs to forward the message to',",
  "example": "['507f1f77bcf86cd799439012', '507f1f77bcf86cd799439013'],",
  "messageId": "string",
  "type": "[String],",
  "toRoomIds": "string[]"
}
```

### `FriendResponse`
```json
{
  "userId": "string",
  "bio": "string | null",
  "isFollowedBack": "boolean",
  "user": "UserBasicInfo"
}
```

### `FriendsListResponse`
```json
{
  "data": "FriendResponse[]",
  "meta": "FriendsListMeta"
}
```

### `Friendship`
```json
{
  "id": "String",
  "requester": "User",
  "requesterId": "String",
  "recipient": "User",
  "recipientId": "String",
  "status": "FriendshipStatus",
  "createdAt": "DateTime",
  "updatedAt": "DateTime"
}
```

### `GenericHttpException`
```json
{
  "message": "string,",
  "statusCode": "HttpStatus = HttpStatus.BAD_REQUEST,",
  "logMessage": "string,",
  "params": "Record<string, any>,",
  "messageKey": "string,"
}
```

### `GetOrdersQueryDto`
```json
{
  "status": "string",
  "page": "number = 1",
  "limit": "number = 20"
}
```

### `GetProductsQueryDto`
```json
{
  "categoryId": "string",
  "search": "string",
  "minPrice": "number",
  "maxPrice": "number",
  "page": "number = 1",
  "limit": "number = 20"
}
```

### `GoogleProfile`
```json
{
  "id": "string",
  "displayName": "string",
  "name": "{",
  "familyName": "string",
  "givenName": "string",
  "emails": "Array<{",
  "value": "string",
  "verified": "boolean",
  "photos": "Array<{",
  "provider": "string"
}
```

### `GoogleStrategy`
```json
{
  "scope": "['email', 'profile'],",
  "accessToken": "string,",
  "refreshToken": "string,",
  "profile": "any,",
  "done": "VerifyCallback,",
  "email": "emails[0].value,",
  "firstName": "name.givenName,",
  "lastName": "name.familyName,",
  "picture": "photos[0].value,"
}
```

### `GraphSyncProcessor`
```json
{
  "createdAt": "createdAt",
  "posts": "{ id: string"
}
```

### `Group`
```json
{
  "id": "String",
  "name": "String",
  "description": "String?",
  "coverPhoto": "String?",
  "type": "GroupType",
  "createdById": "String",
  "createdBy": "User",
  "membersCount": "Int",
  "postsCount": "Int",
  "restrictPosting": "Boolean",
  "createdAt": "DateTime",
  "updatedAt": "DateTime",
  "deletedAt": "DateTime?",
  "members": "GroupMember[]",
  "joinRequests": "GroupJoinRequest[]",
  "rules": "GroupRule[]",
  "groupPosts": "GroupPost[]",
  "groupEvents": "GroupEvent[]"
}
```

### `GroupEvent`
```json
{
  "id": "String",
  "groupId": "String",
  "group": "Group",
  "eventId": "String",
  "event": "Event",
  "linkedAt": "DateTime",
  "linkedById": "String?"
}
```

### `GroupJoinRequest`
```json
{
  "id": "String",
  "groupId": "String",
  "group": "Group",
  "userId": "String",
  "user": "User",
  "status": "JoinRequestStatus",
  "message": "String?",
  "createdAt": "DateTime",
  "updatedAt": "DateTime"
}
```

### `GroupMember`
```json
{
  "id": "String",
  "groupId": "String",
  "group": "Group",
  "userId": "String",
  "user": "User",
  "role": "GroupMemberRole",
  "acceptedRulesAt": "DateTime?",
  "joinedAt": "DateTime",
  "isMuted": "Boolean"
}
```

### `GroupPost`
```json
{
  "id": "String",
  "groupId": "String",
  "group": "Group",
  "postId": "String",
  "post": "Post",
  "isApproved": "Boolean",
  "createdAt": "DateTime"
}
```

### `GroupRule`
```json
{
  "id": "String",
  "groupId": "String",
  "group": "Group",
  "title": "String",
  "description": "String?",
  "order": "Int",
  "createdAt": "DateTime"
}
```

### `GroupsService`
```json
{
  "data": "{ postsCount: { decrement: 1 } },",
  "name": "dto.name,",
  "description": "dto.description,",
  "coverPhoto": "dto.coverPhoto,",
  "type": "{ in: [GroupType.PUBLIC, GroupType.PRIVATE] },",
  "restrictPosting": "dto.restrictPosting ?? false,",
  "createdById": "userId,",
  "membersCount": "1,",
  "members": "totalMembers,",
  "create": "{",
  "role": "GroupMemberRole,",
  "where": "{ groupId_userId: { groupId, userId } },",
  "include": "{",
  "createdBy": "{ select: { id: true, name: true, image: true } },",
  "rules": "{ orderBy: { order: 'asc' } },",
  "deletedAt": "null,",
  "orderBy": "{ createdAt: 'desc' },",
  "take": "limit,",
  "select": "{ id: true, groupId: true, isApproved: true },",
  "groupId": "string,",
  "adminId": "string,",
  "targetUserId": "string,",
  "approve": "boolean,",
  "isApproved": "!requiresApproval,",
  "post": "{",
  "author": "{ select: { id: true, name: true, image: true } },",
  "status": "requiresApproval ? 'PENDING_APPROVAL' : 'PUBLISHED',",
  "_count": "{ select: { Likes: true, Comments: true } },",
  "groupPostId": "string,",
  "joinedAt": "{ gte: sevenDaysAgo },",
  "totals": "{",
  "posts": "pendingPosts,",
  "last7Days": "{",
  "newMembers": "newMembersLast7Days,",
  "newPosts": "publishedPostsLast7Days,",
  "pending": "{",
  "joinRequests": "pendingJoinRequests,",
  "userId": "string,",
  "adminOnly": "boolean = false,"
}
```

### `HealthController`
```json
{
  "status": "'ok',",
  "environment": "process.env.NODE_ENV || 'development',"
}
```

### `HelperService`
```json
{
  "charset": "'123456789abcdefghgklmnorstuvwxyz',",
  "length": "4,",
  "toEncrypt": "string,",
  "relativeOrAbsolutePathToPublicKey": "string,",
  "toDecrypt": "string,",
  "relativeOrAbsolutePathToPrivateKey": "string,"
}
```

### `HttpExceptionFilter`
```json
{
  "code": "HttpStatus.INTERNAL_SERVER_ERROR,",
  "success": "false,",
  "message": "logMessage,",
  "path": "request.url,",
  "method": "request.method,"
}
```

### `IContextAuthService`
```json
{
  "payload": "TokenPayload,"
}
```

### `ImageValidatorOptions`
```json
{
  "maxSize": "number",
  "allowedTypes": "string[]",
  "minWidth": "number",
  "minHeight": "number",
  "maxWidth": "number",
  "maxHeight": "number"
}
```

### `InterestService`
```json
{
  "where": "{ id: contentId },",
  "userId_topic": "{",
  "create": "{",
  "score": "{ increment: weight },",
  "update": "{",
  "orderBy": "{ score: 'desc' },",
  "take": "limit,",
  "userId": "string,",
  "contentId": "string,",
  "contentType": "'POST' | 'REEL',",
  "durationSec": "number,",
  "select": "{ hashtags: true, categories: true },"
}
```

### `JwtStrategy`
```json
{
  "ignoreExpiration": "false,",
  "algorithms": "[TOKEN_CONSTANTS.ACCESS_TOKEN.ALGORITHM],"
}
```

### `Like`
```json
{
  "id": "String",
  "userId": "String",
  "postId": "String?",
  "commentId": "String?",
  "user": "User",
  "post": "Post?",
  "comment": "Comment?",
  "createdAt": "DateTime"
}
```

### `LikeService`
```json
{
  "where": "{ userId, commentId } as Prisma.LikeWhereInput,",
  "userId_postId": "{ userId, postId },",
  "data": "likes,",
  "include": "{",
  "user": "{",
  "select": "{",
  "id": "true,",
  "name": "true,",
  "image": "true,",
  "likeCount": "{",
  "increment": "1,",
  "action": "'UNLIKE',",
  "likesCount": "updatedComment?.likeCount || 0,",
  "decrement": "1,",
  "success": "true,",
  "userId_commentId": "{ userId, commentId },",
  "orderBy": "{ createdAt: 'desc' },",
  "take": "limit,",
  "meta": "{"
}
```

### `LiveStream`
```json
{
  "id": "String",
  "hostId": "String",
  "host": "User",
  "title": "String",
  "description": "String?",
  "thumbnailUrl": "String?",
  "streamKey": "String",
  "status": "StreamStatus",
  "viewerCount": "Int",
  "peakViewers": "Int",
  "isRecorded": "Boolean",
  "recordingUrl": "String?",
  "startedAt": "DateTime?",
  "endedAt": "DateTime?",
  "createdAt": "DateTime",
  "updatedAt": "DateTime"
}
```

### `LocalStrategy`
```json
{
  "usernameField": "'email',",
  "passwordField": "'password',"
}
```

### `LogAnalyticsEventsDto`
```json
{
  "events": "AnalyticsEventInputDto[]"
}
```

### `LoginRequest`
```json
{
  "email": "string",
  "password": "string"
}
```

### `MailOptions`
```json
{
  "to": "string",
  "subject": "string",
  "text": "string",
  "html": "string"
}
```

### `Message`
```json
{
  "id": "String",
  "content": "String",
  "userId": "String",
  "user": "User",
  "roomId": "String",
  "room": "Room",
  "replyToId": "String?",
  "replyTo": "Message?",
  "replies": "Message[]",
  "isEdited": "Boolean",
  "isForwarded": "Boolean",
  "forwardedFromId": "String?",
  "deletedAt": "DateTime?",
  "deletedForEveryone": "Boolean",
  "createdAt": "DateTime",
  "updatedAt": "DateTime",
  "reactions": "MessageReaction[]",
  "readReceipts": "ReadReceipt[]",
  "media": "MessageMedia[]",
  "editHistory": "MessageEditHistory[]",
  "pinnedIn": "PinnedMessage[]"
}
```

### `MessageDocument`
```json
{
  "_id": "ObjectId",
  "content": "string",
  "userId": "string",
  "roomId": "string",
  "replyToId": "string",
  "isEdited": "boolean",
  "isForwarded": "boolean",
  "forwardedFromId": "string",
  "deletedAt": "Date",
  "deletedForEveryone": "boolean",
  "deletedForUsers": "string[]",
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

### `MessageEditHistory`
```json
{
  "id": "String",
  "messageId": "String",
  "message": "Message",
  "content": "String",
  "editedAt": "DateTime"
}
```

### `MessageMedia`
```json
{
  "id": "String",
  "messageId": "String",
  "message": "Message",
  "url": "String",
  "type": "MessageMediaType",
  "fileName": "String?",
  "fileSize": "Int?",
  "mimeType": "String?",
  "width": "Int?",
  "height": "Int?",
  "duration": "Int?",
  "thumbnail": "String?",
  "publicId": "String?",
  "createdAt": "DateTime"
}
```

### `MessageMediaDocument`
```json
{
  "_id": "ObjectId",
  "messageId": "string",
  "url": "string",
  "type": "MessageMediaType",
  "fileName": "string",
  "fileSize": "number",
  "mimeType": "string",
  "width": "number",
  "height": "number",
  "duration": "number",
  "thumbnail": "string",
  "publicId": "string",
  "createdAt": "Date"
}
```

### `MessageMediaDto`
```json
{
  "description": "'Media type',",
  "example": "'https://cloudinary.com/image.jpg',",
  "url": "string",
  "enum": "['IMAGE', 'VIDEO', 'AUDIO', 'VOICE_NOTE', 'DOCUMENT', 'FILE'],",
  "type": "MessageMediaType",
  "fileName": "string",
  "fileSize": "number",
  "mimeType": "string"
}
```

### `MessageMediaType`
```json
{
  "_id": "ObjectId",
  "messageId": "string",
  "content": "string",
  "editedAt": "Date"
}
```

### `MessageReaction`
```json
{
  "id": "String",
  "emoji": "String",
  "messageId": "String",
  "message": "Message",
  "userId": "String",
  "user": "User",
  "createdAt": "DateTime"
}
```

### `MessageReactionDocument`
```json
{
  "_id": "ObjectId",
  "messageId": "string",
  "userId": "string",
  "emoji": "string",
  "createdAt": "Date"
}
```

### `MessageResponse`
```json
{
  "message": "string"
}
```

### `MessageService`
```json
{
  "userId": "string,",
  "dto": "ForwardMessageDto,",
  "media": "MessageMediaDocument[],",
  "roomId": "string,",
  "deletedForEveryone": "false,",
  "content": "{ $regex: query, $options: 'i' },",
  "replyToId": "dto.replyToId,",
  "isEdited": "false,",
  "isForwarded": "true,",
  "deletedForUsers": "{ $ne: userId },",
  "createdAt": "now,",
  "updatedAt": "now,",
  "lastMessageAt": "now,",
  "lastMessageUserId": "userId,",
  "pagination": "{",
  "where": "{ id: { in: userIds } },",
  "select": "{ id: true, name: true, image: true },",
  "data": "messagesWithRelations,",
  "messageId": "string,",
  "deleteForEveryone": "boolean = false,",
  "deletedAt": "now,",
  "leftAt": "null,",
  "forwardedFromId": "dto.messageId,",
  "user": "user || undefined,",
  "query": "string,",
  "limit": "number = 50,"
}
```

### `MessageWithRelations`
```json
{
  "reactions": "MessageReactionDocument[]",
  "readReceipts": "ReadReceiptDocument[]",
  "media": "MessageMediaDocument[]",
  "replyTo": "MessageDocument",
  "user": "{",
  "id": "string",
  "name": "string | null",
  "image": "string | null"
}
```

### `MigrationService`
```json
{
  "select": "{",
  "id": "p.id,",
  "authorId": "p.authorId,",
  "createdAt": "true,",
  "isDeleted": "true,",
  "take": "batchSize,"
}
```

### `ModerationController`
```json
{
  "dto": "{",
  "targetId": "string",
  "targetType": "'USER' | 'POST' | 'COMMENT' | 'REEL' | 'REEL_COMMENT'",
  "reason": "ReportReason",
  "description": "string"
}
```

### `ModerationService`
```json
{
  "reporterId": "string,",
  "targetId": "string,",
  "targetType": "'USER' | 'POST' | 'COMMENT' | 'REEL' | 'REEL_COMMENT',",
  "reason": "ReportReason,",
  "description": "string,",
  "data": "{",
  "where": "{ id: userId },",
  "orderBy": "{ createdAt: 'desc' },",
  "include": "{",
  "reporter": "{",
  "select": "{ id: true, name: true, email: true },",
  "status": "ReportStatus.DISMISSED,",
  "actionTaken": "actionTaken || 'Dismissed by admin',",
  "isBanned": "false,",
  "banReason": "null,",
  "active": "true,"
}
```

### `MongodbService`
```json
{
  "maxPoolSize": "10,",
  "minPoolSize": "2,",
  "maxIdleTimeMS": "30000,",
  "connectTimeoutMS": "10000,",
  "serverSelectionTimeoutMS": "10000,"
}
```

### `Neo4jService`
```json
{
  "database": "database || 'neo4j',"
}
```

### `NodemailerMailService`
```json
{
  "auth": "{",
  "from": "`\"${fromName}\" <${fromEmail}>`,",
  "to": "options.to,",
  "subject": "options.subject,",
  "text": "options.text,",
  "html": "options.html,"
}
```

### `NoroChat`
```json
{
  "id": "String",
  "message": "String",
  "response": "String",
  "userId": "String",
  "user": "User",
  "createdAt": "DateTime"
}
```

### `NoroController`
```json
{
  "userId": "user.id,",
  "role": "normalizedRole,",
  "body": "{",
  "messageId": "body.messageId,",
  "crisisScore": "body.crisisScore,",
  "keywords": "body.keywords || [],"
}
```

### `NoroConversation`
```json
{
  "id": "String",
  "userId": "String",
  "user": "User",
  "trigger": "NoroTrigger?",
  "moodScore": "Int?",
  "startedAt": "DateTime",
  "endedAt": "DateTime?",
  "deletedAt": "DateTime?",
  "messages": "NoroMessage[]",
  "moodSource": "UserMoodProfile[]"
}
```

### `NoroIntervention`
```json
{
  "id": "String",
  "userId": "String",
  "user": "User",
  "method": "InterventionMethod",
  "triggerScore": "Float",
  "resolved": "Boolean",
  "resolvedAt": "DateTime?",
  "conversationId": "String?",
  "suggestedFriendIds": "String[]",
  "createdAt": "DateTime"
}
```

### `NoroMessage`
```json
{
  "id": "String",
  "conversationId": "String",
  "conversation": "NoroConversation",
  "userId": "String",
  "user": "User",
  "role": "NoroMessageRole",
  "content": "String",
  "sentiment": "Json?",
  "keywords": "String[]",
  "createdAt": "DateTime",
  "deletedAt": "DateTime?",
  "crisisEvents": "CrisisEvent[]"
}
```

### `NoroService`
```json
{
  "where": "{ userId },",
  "take": "3,",
  "orderBy": "{ updatedAt: 'desc' },",
  "role": "'ASSISTANT',",
  "model": "this.MODEL,",
  "stream": "false,",
  "method": "'POST',",
  "headers": "{ 'Content-Type': 'application/json' },",
  "data": "{",
  "message": "content,",
  "response": "responseText,",
  "userId": "string,",
  "trigger": "NoroTrigger = 'USER_INITIATED',",
  "conversationId": "string,",
  "content": "string,",
  "keywords": "string[]",
  "deletedAt": "null,",
  "cursor": "string,",
  "id": "crisisEventId,",
  "messageId": "string,",
  "crisisScore": "payload.crisisScore,",
  "keywordsHit": "hits,",
  "isActive": "true,",
  "countryCode": "normalizedCountry,",
  "OR": "[{ requesterId: userId }, { recipientId: userId }],",
  "intervention": "type === 'hotline_response' ? 'HOTLINE' : 'SOFT',",
  "suggestedFriendIds": "[] as string[],",
  "status": "'ACCEPTED',",
  "score": "normalized,",
  "sentimentScore": "number,",
  "update": "{",
  "sourceConvId": "conversationId,",
  "create": "{"
}
```

### `Notification`
```json
{
  "id": "String",
  "type": "NotificationType",
  "title": "String",
  "message": "String",
  "read": "Boolean",
  "data": "Json?",
  "userId": "String",
  "user": "User",
  "actorId": "String?",
  "actor": "User?",
  "createdAt": "DateTime",
  "updatedAt": "DateTime"
}
```

### `NotificationGateway`
```json
{
  "server": "Server"
}
```

### `NotificationResponseDto`
```json
{
  "id": "string",
  "type": "string",
  "title": "string",
  "message": "string",
  "read": "boolean",
  "data": "any",
  "createdAt": "Date",
  "actor": "{",
  "name": "string",
  "image": "string"
}
```

### `NotificationService`
```json
{
  "userId": "string,",
  "type": "NotificationType,",
  "title": "string,",
  "message": "string,",
  "actorId": "string,",
  "data": "{ read: true },",
  "where": "{",
  "orderBy": "{ createdAt: 'desc' },",
  "take": "limit,",
  "include": "{",
  "actor": "{",
  "select": "{",
  "id": "true,",
  "name": "true,",
  "image": "true,",
  "meta": "{",
  "read": "false,",
  "targetUserId": "string,",
  "commentId": "string,",
  "postId": "string,",
  "content": "string,",
  "reelId": "string,"
}
```

### `OffsetPaginationDto`
```json
{
  "offset": "number = 0",
  "limit": "number = 10"
}
```

### `OpenDisputeDto`
```json
{
  "disputeReason": "string"
}
```

### `Order`
```json
{
  "id": "String",
  "orderNumber": "String",
  "status": "OrderStatus",
  "buyerId": "String",
  "buyer": "User",
  "sellerId": "String",
  "seller": "User",
  "productId": "String",
  "product": "Product",
  "quantity": "Int",
  "unitPrice": "Float",
  "currency": "String",
  "totalAmount": "Float",
  "escrowAmount": "Float",
  "escrowStatus": "EscrowStatus",
  "shipmentTrackingNumber": "String?",
  "shipmentCarrier": "String?",
  "shipmentProofImageUrl": "String?",
  "shippedAt": "DateTime?",
  "deliveryProofImageUrl": "String?",
  "deliveredAt": "DateTime?",
  "buyerConfirmedAt": "DateTime?",
  "releaseScheduledAt": "DateTime?",
  "releasedAt": "DateTime?",
  "disputeReason": "String?",
  "disputeOpenedAt": "DateTime?",
  "disputeResolvedAt": "DateTime?",
  "disputeResolution": "String?",
  "disputeResolvedById": "String?",
  "cancelledAt": "DateTime?",
  "cancelReason": "String?",
  "transaction": "Transaction?",
  "createdAt": "DateTime",
  "updatedAt": "DateTime"
}
```

### `OrderService`
```json
{
  "removeOnComplete": "true,",
  "removeOnFail": "true,",
  "tx": "Prisma.TransactionClient,",
  "buyerId": "string,",
  "product": "true,",
  "id": "string",
  "sellerId": "string,",
  "price": "number",
  "currency": "product.currency,",
  "data": "{",
  "productId": "product.id,",
  "quantity": "{ increment: order.quantity },",
  "unitPrice": "product.price,",
  "totalAmount": "product.price,",
  "escrowAmount": "product.price,",
  "escrowStatus": "'RELEASED',",
  "status": "'COMPLETED',",
  "include": "{ transaction: true },",
  "seller": "{ select: { id: true, name: true, email: true, image: true } },",
  "transaction": "true,",
  "orderBy": "{ createdAt: 'desc' },",
  "take": "limit,",
  "where": "{ id: order.transaction.id },",
  "buyer": "{ select: { id: true, name: true, email: true, image: true } },",
  "orderId": "string,",
  "dto": "ConfirmShipmentDto,",
  "proofFile": "Express.Multer.File,",
  "shipmentTrackingNumber": "dto.shipmentTrackingNumber,",
  "shipmentCarrier": "dto.shipmentCarrier,",
  "shipmentProofImageUrl": "proofUrl,",
  "adminId": "order.sellerId,",
  "targetType": "'ORDER',",
  "targetId": "orderId,",
  "action": "'AUTO_RELEASE_FUNDS',",
  "cause": "'Escrow auto-release executed after 3-day hold',",
  "deliveryProofImageUrl": "proofUrl,",
  "deliveredAt": "now,",
  "buyerConfirmedAt": "now,",
  "releaseScheduledAt": "releaseAt,",
  "cancelReason": "dto.cancelReason ?? 'Cancelled by buyer',",
  "disputeReason": "dto.disputeReason,",
  "disputeResolvedAt": "order.status === 'DISPUTED' ? now : order.disputeResolvedAt,",
  "disputeResolution": "dto.adminNote ?? 'Release approved by admin',",
  "disputeResolvedById": "order.status === 'DISPUTED' ? adminId : order.disputeResolvedById,",
  "releasedAt": "now,"
}
```

### `Otp`
```json
{
  "id": "String",
  "otpHash": "String",
  "otpExpiresAt": "DateTime",
  "otpVerified": "Boolean",
  "type": "OtpType",
  "userId": "String",
  "user": "User",
  "createdAt": "DateTime",
  "updatedAt": "DateTime"
}
```

### `Page`
```json
{
  "id": "String",
  "name": "String",
  "description": "String?",
  "category": "PageCategory",
  "coverPhoto": "String?",
  "logoUrl": "String?",
  "website": "String?",
  "phone": "String?",
  "isVerified": "Boolean",
  "followersCount": "Int",
  "createdById": "String",
  "createdBy": "User",
  "createdAt": "DateTime",
  "updatedAt": "DateTime",
  "deletedAt": "DateTime?",
  "members": "PageMember[]",
  "pagePosts": "PagePost[]",
  "pageFollows": "PageFollow[]"
}
```

### `PageFollow`
```json
{
  "id": "String",
  "pageId": "String",
  "page": "Page",
  "userId": "String",
  "createdAt": "DateTime"
}
```

### `PageMember`
```json
{
  "id": "String",
  "pageId": "String",
  "page": "Page",
  "userId": "String",
  "user": "User",
  "role": "PageRole",
  "joinedAt": "DateTime"
}
```

### `PagePost`
```json
{
  "id": "String",
  "pageId": "String",
  "page": "Page",
  "postId": "String",
  "post": "Post",
  "createdAt": "DateTime"
}
```

### `PagesService`
```json
{
  "data": "{ followersCount: { increment: 1 } },",
  "createdById": "userId,",
  "members": "{",
  "create": "{",
  "role": "PageRole.ADMIN,",
  "where": "{ pageId_userId: { pageId, userId } },",
  "include": "{",
  "createdBy": "{ select: { id: true, name: true, image: true } },",
  "pageId": "string,",
  "userId": "string,",
  "dto": "Partial<CreatePageDto>,"
}
```

### `PaginatedResponse`
```json
{
  "data": "T[]",
  "total": "number",
  "page": "number",
  "limit": "number",
  "totalPages": "number"
}
```

### `PaginationDto`
```json
{
  "page": "number = 1",
  "limit": "number = 10"
}
```

### `PinnedMessage`
```json
{
  "id": "String",
  "roomId": "String",
  "room": "Room",
  "messageId": "String",
  "message": "Message",
  "pinnedAt": "DateTime"
}
```

### `PinnedMessageDocument`
```json
{
  "_id": "ObjectId",
  "roomId": "string",
  "messageId": "string",
  "pinnedById": "string",
  "pinnedAt": "Date"
}
```

### `Post`
```json
{
  "id": "String",
  "content": "String",
  "authorId": "String",
  "author": "User",
  "mediaUrls": "String[]",
  "privacy": "PostPrivacy",
  "hashtags": "String[]",
  "categories": "String[]",
  "isDeleted": "Boolean",
  "deletedAt": "DateTime?",
  "createdAt": "DateTime",
  "updatedAt": "DateTime",
  "likeCount": "Int",
  "commentCount": "Int",
  "PostHistory": "PostHistory[]",
  "PostMedia": "PostMedia[]",
  "PostAudience": "PostAudience[]",
  "Likes": "Like[]",
  "Comments": "Comment[]",
  "savedBy": "SavedPost[]",
  "groupPosts": "GroupPost[]",
  "pagePosts": "PagePost[]"
}
```

### `PostAudience`
```json
{
  "id": "String",
  "postId": "String",
  "post": "Post",
  "userId": "String",
  "createdAt": "DateTime"
}
```

### `PostHistory`
```json
{
  "id": "String",
  "postId": "String",
  "post": "Post",
  "content": "String",
  "mediaUrls": "String[]",
  "privacy": "PostPrivacy",
  "changeType": "PostChangeType",
  "changedAt": "DateTime"
}
```

### `PostMedia`
```json
{
  "id": "String",
  "postId": "String",
  "post": "Post",
  "url": "String",
  "type": "MediaType",
  "publicId": "String",
  "size": "Int",
  "width": "Int?",
  "height": "Int?",
  "createdAt": "DateTime"
}
```

### `PostResponseDto`
```json
{
  "id": "string",
  "content": "string",
  "mediaUrls": "string[]",
  "privacy": "PostPrivacy",
  "isDeleted": "boolean",
  "createdAt": "Date",
  "updatedAt": "Date",
  "author": "{",
  "name": "string | null",
  "image": "string | null",
  "mediaCount": "{",
  "images": "number",
  "videos": "number"
}
```

### `PostService`
```json
{
  "userId": "true,",
  "where": "{",
  "isDeleted": "false,",
  "include": "{",
  "author": "{",
  "select": "{",
  "id": "true,",
  "name": "true,",
  "image": "true,",
  "PostMedia": "true,",
  "_count": "{",
  "Likes": "userId",
  "Comments": "true,",
  "orderBy": "{ createdAt: 'desc' },",
  "createdAt": "newPost.createdAt,",
  "take": "limit,",
  "postId": "comment.postId,",
  "hashtag": "string,",
  "hashtags": "{ has: normalizedTag },",
  "data": "comments,",
  "files": "Record<string, Express.Multer.File[]>,",
  "content": "dto.content,",
  "authorId": "profileId,",
  "privacy": "PostPrivacy,",
  "url": "vid.url,",
  "type": "'VIDEO',",
  "publicId": "vid.publicId,",
  "size": "number",
  "width": "vid.width,",
  "height": "vid.height,",
  "images": "files.images,",
  "videos": "files.videos,",
  "action": "'DELETE',",
  "text": "data.content,",
  "contentType": "'POST' as SentimentContentType,",
  "contentId": "postId,",
  "jobId": "`sentiment:COMMENT:${comment.id}`,",
  "removeOnComplete": "true,",
  "removeOnFail": "true,",
  "PostAudience": "true,",
  "likes": "post._count?.Likes ?? 0,",
  "comments": "post._count?.Comments ?? 0,",
  "liked": "userId ? post.Likes && post.Likes.length > 0 : false,",
  "mediaUrls": "string[],",
  "changeType": "'CREATED' | 'UPDATED' | 'DELETED' | 'RESTORED',",
  "postId_userId": "{ postId, userId },",
  "reactorUserId": "userId,",
  "eventType": "'LIKED_POST' as SentimentEventType,",
  "userId_postId": "{ userId, postId },",
  "post": "{",
  "parentId": "null,",
  "commentId": "comment.id,",
  "timestamp": "comment.createdAt,",
  "commenterId": "userId,",
  "parentContentId": "postId,",
  "parentContentType": "'POST' as SentimentContentType,",
  "commentText": "dto.content,",
  "replies": "{",
  "meta": "{",
  "user": "{"
}
```

### `PrivacyResponseDto`
```json
{
  "id": "string",
  "profileId": "string",
  "profileVisibility": "string",
  "postsVisibility": "string",
  "friendsVisibility": "string",
  "bioVisibility": "string",
  "emailVisibility": "string",
  "phoneVisibility": "string",
  "locationVisibility": "string",
  "dateOfBirthVisibility": "string",
  "whoCanSendFriendRequests": "string",
  "whoCanMessageMe": "string",
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

### `PrivacyService`
```json
{
  "where": "{ profileId: userId },",
  "userId": "string,",
  "dto": "UpdatePrivacyDto,",
  "create": "{",
  "profileId": "userId,",
  "update": "data,"
}
```

### `Product`
```json
{
  "id": "String",
  "title": "String",
  "description": "String",
  "price": "Float",
  "currency": "String",
  "images": "String[]",
  "categoryId": "String?",
  "status": "ProductStatus",
  "quantity": "Int",
  "sellerId": "String",
  "seller": "User",
  "transactions": "Transaction[]",
  "orders": "Order[]",
  "createdAt": "DateTime",
  "updatedAt": "DateTime"
}
```

### `ProductService`
```json
{
  "data": "{ status: 'SOLD' },",
  "title": "dto.title,",
  "description": "dto.description,",
  "price": "dto.price,",
  "currency": "product.currency,",
  "quantity": "{ decrement: 1 },",
  "categoryId": "dto.categoryId,",
  "images": "dto.images ?? [],",
  "status": "'PENDING',",
  "include": "{",
  "seller": "{ select: { id: true, name: true, image: true } },",
  "orderBy": "{ createdAt: 'desc' },",
  "take": "limit,",
  "where": "{ id: productId },",
  "select": "{ quantity: true, status: true },",
  "id": "productId,",
  "sellerId": "product.sellerId,",
  "productId": "product.id,",
  "orderId": "order.id,",
  "amount": "product.price,"
}
```

### `Profile`
```json
{
  "id": "String",
  "userId": "String",
  "user": "User",
  "bio": "String?",
  "coverPhoto": "String?",
  "dateOfBirth": "DateTime?",
  "location": "String?",
  "website": "String?",
  "phoneNumber": "String?",
  "privacySettings": "ProfilePrivacy?",
  "createdAt": "DateTime",
  "updatedAt": "DateTime"
}
```

### `ProfileController`
```json
{
  "schema": "{",
  "type": "'string',",
  "properties": "{",
  "file": "Express.Multer.File,",
  "format": "'binary',",
  "validators": "[",
  "maxSize": "PROFILE_CONSTANTS.UPLOAD.MAX_COVER_PHOTO_SIZE,",
  "message": "`File size must not exceed ${PROFILE_CONSTANTS.UPLOAD.MAX_COVER_PHOTO_SIZE / 1024 / 1024}MB`,",
  "fileIsRequired": "true,"
}
```

### `ProfilePermissionGuard`
```json
{
  "where": "{ userId: targetUserId },",
  "include": "{ privacySettings: true },",
  "permission": "ProfilePermission,",
  "userId": "string,",
  "profile": "ProfileWithPrivacy,",
  "visibility": "VisibilityType,",
  "requesterId": "string,",
  "ownerId": "string,"
}
```

### `ProfilePrivacy`
```json
{
  "id": "String",
  "profileId": "String",
  "profile": "Profile",
  "profileVisibility": "VisibilityType",
  "postsVisibility": "VisibilityType",
  "friendsVisibility": "VisibilityType",
  "bioVisibility": "VisibilityType",
  "emailVisibility": "VisibilityType",
  "phoneVisibility": "VisibilityType",
  "locationVisibility": "VisibilityType",
  "dateOfBirthVisibility": "VisibilityType",
  "whoCanSendFriendRequests": "VisibilityType",
  "whoCanMessageMe": "VisibilityType",
  "allowCameraAccess": "Boolean",
  "allowMicrophoneAccess": "Boolean",
  "createdAt": "DateTime",
  "updatedAt": "DateTime"
}
```

### `ProfileResponse`
```json
{
  "id": "string",
  "userId": "string",
  "bio": "string",
  "coverPhoto": "string",
  "dateOfBirth": "Date",
  "location": "string",
  "website": "string",
  "phoneNumber": "string",
  "user": "UserBasicInfo",
  "privacySettings": "ProfilePrivacyResponse",
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

### `ProfileService`
```json
{
  "userId": "string,",
  "requesterId": "string | undefined,",
  "where": "{ userId },",
  "include": "{",
  "privacySettings": "{",
  "user": "{ ...profile.user, email: profile.user.email },",
  "select": "{",
  "id": "true,",
  "name": "true,",
  "email": "true,",
  "image": "true,",
  "data": "{",
  "bio": "data.bio,",
  "location": "{ contains: location, mode: 'insensitive' },",
  "website": "data.website,",
  "phoneNumber": "data.phoneNumber,",
  "dateOfBirth": "data.dateOfBirth,",
  "create": "{",
  "profileId": "profile.id,",
  "update": "data,",
  "is": "{",
  "profileVisibility": "PROFILE_CONSTANTS.PRIVACY",
  "in": "['PUBLIC', 'EVERYONE'],",
  "OR": "[",
  "take": "limit,",
  "orderBy": "{ createdAt: 'desc' },",
  "meta": "{",
  "hasNextPage": "page * limit < total,",
  "hasPreviousPage": "page > 1,",
  "profile": "ProfileWithUserAndPrivacy,",
  "visibility": "VisibilityType,",
  "ownerId": "string,",
  "postsVisibility": "PROFILE_CONSTANTS.PRIVACY",
  "friendsVisibility": "PROFILE_CONSTANTS.PRIVACY",
  "bioVisibility": "PROFILE_CONSTANTS.PRIVACY",
  "emailVisibility": "PROFILE_CONSTANTS.PRIVACY",
  "phoneVisibility": "PROFILE_CONSTANTS.PRIVACY",
  "locationVisibility": "PROFILE_CONSTANTS.PRIVACY",
  "dateOfBirthVisibility": "PROFILE_CONSTANTS.PRIVACY",
  "whoCanSendFriendRequests": "PROFILE_CONSTANTS.PRIVACY",
  "whoCanMessageMe": "PROFILE_CONSTANTS.PRIVACY"
}
```

### `ReactionService`
```json
{
  "messageId": "string,",
  "userId": "string,",
  "dto": "AddReactionDto,",
  "deletedForEveryone": "false,",
  "emoji": "string,",
  "_id": "'$emoji',",
  "count": "{ $sum: 1 },",
  "users": "{ $push: '$userId' },"
}
```

### `ReadReceipt`
```json
{
  "id": "String",
  "messageId": "String",
  "message": "Message",
  "userId": "String",
  "user": "User",
  "readAt": "DateTime"
}
```

### `ReadReceiptDocument`
```json
{
  "_id": "ObjectId",
  "messageId": "string",
  "roomId": "string",
  "userId": "string",
  "readAt": "Date"
}
```

### `ReadReceiptService`
```json
{
  "messageId": "string,",
  "roomId": "string,",
  "userId": "string,",
  "lastReadMessageId": "lastMessageId,",
  "lastReadAt": "now,",
  "updatedAt": "now,",
  "upToMessageId": "string,",
  "deletedForEveryone": "false,",
  "deletedForUsers": "{ $ne: userId },",
  "readAt": "now,",
  "senderId": "string,",
  "delivered": "number",
  "read": "number",
  "totalMembers": "number"
}
```

### `RecommendationsListResponse`
```json
{
  "data": "RecommendedUserResponse[]",
  "meta": "RecommendationsListMeta"
}
```

### `RecommendedUser`
```json
{
  "userId": "string",
  "username": "string",
  "name": "string",
  "score": "number",
  "mutualFriends": "number",
  "reason": "string",
  "location": "string"
}
```

### `RecommendedUserResponse`
```json
{
  "userId": "string",
  "bio": "string | null",
  "user": "UserBasicInfo",
  "score": "number",
  "mutualFriends": "number",
  "reason": "string"
}
```

### `RecordDwellTimeDto`
```json
{
  "contentId": "string",
  "contentType": "'POST' | 'REEL'",
  "durationSec": "number"
}
```

### `RecordViewDto`
```json
{
  "sessionId": "string",
  "watchPct": "number",
  "viewerId": "string"
}
```

### `RedisService`
```json
{
  "url": "redisUrl,",
  "NX": "true,",
  "EX": "seconds,"
}
```

### `Reel`
```json
{
  "id": "String",
  "userId": "String",
  "user": "User",
  "videoUrl": "String?",
  "rawVideoKey": "String?",
  "thumbnailUrl": "String?",
  "caption": "String?",
  "audioTrackId": "String?",
  "audioTrack": "AudioTrack?",
  "audioOffsetMs": "Int",
  "durationSec": "Int?",
  "width": "Int?",
  "height": "Int?",
  "fileSizeBytes": "BigInt?",
  "status": "ReelStatus",
  "failReason": "String?",
  "viewsCount": "BigInt",
  "likesCount": "BigInt",
  "commentsCount": "BigInt",
  "sharesCount": "BigInt",
  "savesCount": "BigInt",
  "hashtags": "String[]",
  "categories": "String[]",
  "isPublic": "Boolean",
  "commentsEnabled": "Boolean",
  "downloadsEnabled": "Boolean",
  "createdAt": "DateTime",
  "updatedAt": "DateTime",
  "deletedAt": "DateTime?",
  "views": "ReelView[]",
  "likes": "ReelLike[]",
  "comments": "ReelComment[]",
  "shares": "ReelShare[]",
  "bookmarks": "ReelBookmark[]"
}
```

### `ReelBookmark`
```json
{
  "reelId": "String",
  "reel": "Reel",
  "userId": "String",
  "user": "User",
  "createdAt": "DateTime"
}
```

### `ReelComment`
```json
{
  "id": "String",
  "reelId": "String",
  "reel": "Reel",
  "userId": "String",
  "user": "User",
  "parentId": "String?",
  "parent": "ReelComment?",
  "replies": "ReelComment[]",
  "content": "String",
  "likesCount": "Int",
  "createdAt": "DateTime",
  "updatedAt": "DateTime?",
  "deletedAt": "DateTime?",
  "commentLikes": "ReelCommentLike[]"
}
```

### `ReelCommentLike`
```json
{
  "commentId": "String",
  "comment": "ReelComment",
  "userId": "String",
  "user": "User",
  "createdAt": "DateTime"
}
```

### `ReelLike`
```json
{
  "reelId": "String",
  "reel": "Reel",
  "userId": "String",
  "user": "User",
  "createdAt": "DateTime"
}
```

### `ReelShare`
```json
{
  "id": "String",
  "reelId": "String",
  "reel": "Reel",
  "sharerId": "String",
  "sharer": "User",
  "shareType": "ShareType",
  "targetId": "String?",
  "createdAt": "DateTime"
}
```

### `ReelView`
```json
{
  "id": "String",
  "reelId": "String",
  "reel": "Reel",
  "viewerId": "String?",
  "viewer": "User?",
  "viewedAt": "DateTime",
  "watchPct": "Int?",
  "sessionId": "String?"
}
```

### `ReelsService`
```json
{
  "data": "{",
  "status": "'READY',",
  "reelId": "string,",
  "uploadUrl": "`${process.env.REELS_FAKE_UPLOAD_BASE_URL || 'https://uploads.ding.local'}/${uploadKey}`,",
  "userId": "string,",
  "payload": "{ shareType: ShareType",
  "rawVideoKey": "payload.rawVideoKey,",
  "caption": "payload.caption,",
  "hashtags": "{ has: normalizedTag },",
  "audioTrackId": "string | null",
  "audioOffsetMs": "payload.audioOffsetMs,",
  "durationSec": "payload.durationSec ?? 30,",
  "width": "payload.width ?? 1080,",
  "height": "payload.height ?? 1920,",
  "fileSizeBytes": "payload.fileSizeBytes",
  "where": "{ id },",
  "failReason": "true,",
  "videoUrl": "true,",
  "thumbnailUrl": "true,",
  "text": "payload.caption || '',",
  "contentType": "'REEL' as SentimentContentType,",
  "contentId": "reelId,",
  "jobId": "`sentiment:REEL_COMMENT:${comment.id}`,",
  "removeOnComplete": "true,",
  "removeOnFail": "true,",
  "select": "{ commentId: true },",
  "id": "reelId,",
  "deletedAt": "null,",
  "include": "{",
  "user": "{ select: { id: true, name: true, image: true } },",
  "isPublic": "true,",
  "commentsEnabled": "payload.commentsEnabled,",
  "downloadsEnabled": "payload.downloadsEnabled,",
  "_count": "true,",
  "likes": "true,",
  "comments": "true,",
  "shares": "true,",
  "views": "true,",
  "orderBy": "{ usageCount: 'desc' },",
  "take": "20,",
  "positiveScore": "true,",
  "negativeScore": "true,",
  "reels": "items,",
  "sessionId": "payload.sessionId,",
  "watchPct": "payload.watchPct,",
  "viewerId": "string,",
  "viewsCount": "{ increment: 1 },",
  "reactorUserId": "userId,",
  "eventType": "'LIKED_REEL' as SentimentEventType,",
  "reelId_userId": "{ reelId, userId },",
  "likesCount": "{ increment: 1 },",
  "cursor": "string,",
  "parentId": "payload.parentId,",
  "content": "string,",
  "commenterId": "userId,",
  "parentContentId": "reelId,",
  "parentContentType": "'REEL' as SentimentContentType,",
  "commentText": "payload.content,",
  "commentId": "string,",
  "sharerId": "userId,",
  "shareType": "payload.shareType,",
  "targetId": "payload.targetUserId,",
  "shareId": "share.id,",
  "shareUrl": "`${process.env.APP_BASE_URL || 'https://ding.local'}/reels/${reelId}`,",
  "reel": "{ caption: string | null },",
  "targetUserId": "string,",
  "createdAt": "reel.createdAt,",
  "_avg": "{ watchPct: true },",
  "totalViewsWithWatchData": "avgWatch._count,",
  "OR": "[",
  "usageCount": "{ increment: 1 },",
  "dominantMood": "string | null,",
  "enabled": "boolean,",
  "sentiment": "{ positiveScore: number"
}
```

### `RefreshTokenResponse`
```json
{
  "accessToken": "string"
}
```

### `RemoveReactionDto`
```json
{
  "example": "'\ud83d\udc4d',",
  "emoji": "string"
}
```

### `Report`
```json
{
  "id": "String",
  "targetId": "String",
  "targetType": "ReportTargetType",
  "reason": "ReportReason",
  "description": "String?",
  "status": "ReportStatus",
  "actionTaken": "String?",
  "reporterId": "String",
  "reporter": "User",
  "createdAt": "DateTime",
  "updatedAt": "DateTime"
}
```

### `ResendForgotPasswordRequest`
```json
{
  "email": "string"
}
```

### `ResendVerificationRequest`
```json
{
  "email": "string"
}
```

### `ResetPasswordRequest`
```json
{
  "email": "string",
  "newPassword": "string"
}
```

### `ResetTokenPayload`
```json
{
  "userId": "string",
  "organizationId": "string",
  "type": "'password_reset'"
}
```

### `ResolveDisputeDto`
```json
{
  "resolution": "'REFUND' | 'RELEASE'",
  "adminNote": "string"
}
```

### `ResponseInterceptor`
```json
{
  "context": "ExecutionContext,",
  "next": "CallHandler,",
  "success": "true,",
  "message": "'Operation done successfully',",
  "data": "res,"
}
```

### `Room`
```json
{
  "id": "String",
  "type": "RoomType",
  "name": "String?",
  "description": "String?",
  "imageUrl": "String?",
  "createdById": "String?",
  "createdBy": "User?",
  "lastMessageAt": "DateTime?",
  "createdAt": "DateTime",
  "updatedAt": "DateTime",
  "messages": "Message[]",
  "members": "RoomMember[]",
  "pinnedMessages": "PinnedMessage[]"
}
```

### `RoomListPaginationDto`
```json
{
  "example": "false,",
  "default": "20,",
  "page": "number = 1",
  "description": "'Filter archived rooms',",
  "minimum": "1,",
  "maximum": "50,",
  "limit": "number = 20",
  "includeArchived": "boolean = false"
}
```

### `RoomMember`
```json
{
  "id": "String",
  "roomId": "String",
  "room": "Room",
  "userId": "String",
  "user": "User",
  "role": "RoomMemberRole",
  "isMuted": "Boolean",
  "isArchived": "Boolean",
  "joinedAt": "DateTime",
  "leftAt": "DateTime?",
  "lastReadMessageId": "String?",
  "createdAt": "DateTime",
  "updatedAt": "DateTime"
}
```

### `RoomMemberGuard`
```json
{
  "roomId": "roomId,",
  "userId": "user.id,",
  "leftAt": "null, // Not left the room"
}
```

### `RoomMemberRole`
```json
{
  "_id": "ObjectId",
  "roomId": "string",
  "userId": "string",
  "role": "RoomMemberRole",
  "isMuted": "boolean",
  "isArchived": "boolean",
  "joinedAt": "Date",
  "leftAt": "Date | null",
  "lastReadMessageId": "string",
  "lastReadAt": "Date",
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

### `RoomMemberWithUser`
```json
{
  "user": "{",
  "id": "string",
  "name": "string | null",
  "email": "string",
  "image": "string | null"
}
```

### `RoomService`
```json
{
  "userId": "string,",
  "dto": "UpdateRoomMemberSettingsDto,",
  "where": "{ id: { in: dto.userIds } },",
  "type": "'GROUP',",
  "createdById": "userId,",
  "createdAt": "now,",
  "updatedAt": "now,",
  "role": "'ADMIN',",
  "isMuted": "false,",
  "isArchived": "false,",
  "joinedAt": "now,",
  "select": "{ id: true, name: true, email: true, image: true },",
  "name": "dto.name!,",
  "description": "dto.description,",
  "imageUrl": "dto.imageUrl,",
  "memberIds": "dto.memberIds,",
  "members": "membersWithUsers,",
  "memberCount": "members.length,",
  "pagination": "{",
  "deletedForEveryone": "false,",
  "deletedForUsers": "{ $ne: userId },",
  "data": "roomsWithMembers,",
  "total": "memberships.length,",
  "roomId": "string,",
  "leftAt": "null,",
  "memberUserId": "string,",
  "messageId": "string,",
  "pinnedById": "userId,"
}
```

### `RoomType`
```json
{
  "_id": "ObjectId",
  "type": "RoomType",
  "name": "string",
  "description": "string",
  "imageUrl": "string",
  "createdById": "string",
  "lastMessageAt": "Date",
  "lastMessagePreview": "string",
  "lastMessageUserId": "string",
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

### `RoomWithMembers`
```json
{
  "members": "RoomMemberDocument[]",
  "memberCount": "number",
  "unreadCount": "number"
}
```

### `RsvpEventDto`
```json
{
  "status": "RSVPStatus"
}
```

### `SavedPost`
```json
{
  "id": "String",
  "user": "User",
  "userId": "String",
  "post": "Post",
  "postId": "String",
  "createdAt": "DateTime"
}
```

### `SearchBuckets`
```json
{
  "people": "PersonResult[]",
  "posts": "PostResult[]",
  "groups": "GroupResult[]",
  "pages": "PageResult[]",
  "reels": "ReelResult[]"
}
```

### `SearchMessagesDto`
```json
{
  "query": "string",
  "roomId": "string",
  "description": "'Maximum number of results',",
  "default": "50,",
  "limit": "number = 50"
}
```

### `SearchProfileRequest`
```json
{
  "query": "string",
  "location": "string",
  "page": "number = PROFILE_CONSTANTS.SEARCH.DEFAULT_PAGE",
  "limit": "number = PROFILE_CONSTANTS.SEARCH.DEFAULT_LIMIT"
}
```

### `SearchProfileResponse`
```json
{
  "data": "ProfileResponse[]",
  "meta": "SearchMeta"
}
```

### `SearchService`
```json
{
  "query": "normalizedQuery,",
  "type": "normalizedType,",
  "data": "results,",
  "meta": "{ page, limit },",
  "tag": "item.value,",
  "count": "item.score,"
}
```

### `SellerApplication`
```json
{
  "id": "String",
  "userId": "String",
  "user": "User",
  "fullName": "String",
  "phoneNumber": "String",
  "email": "String",
  "address": "String",
  "city": "String",
  "country": "String",
  "idCardNumber": "String",
  "idCardFrontImage": "String",
  "idCardBackImage": "String",
  "sellerFaceImage": "String",
  "commercialRegNumber": "String",
  "bankAccountNumber": "String",
  "bankCardNumber": "String",
  "bankCardExpiry": "String",
  "bankCardHolderName": "String",
  "addressTrustScore": "Float",
  "addressVerified": "Boolean",
  "sessionCount": "Int",
  "uniqueIpCount": "Int",
  "status": "ApplicationStatus",
  "adminNote": "String?",
  "reviewedById": "String?",
  "reviewedAt": "DateTime?",
  "createdAt": "DateTime",
  "updatedAt": "DateTime"
}
```

### `SellerApplicationController`
```json
{
  "files": "{",
  "idCardFrontImage": "Express.Multer.File[]",
  "idCardBackImage": "Express.Multer.File[]",
  "sellerFaceImage": "Express.Multer.File[]"
}
```

### `SellerApplicationDto`
```json
{
  "fullName": "string",
  "message": "'bankCardExpiry must be in MM/YY format',",
  "phoneNumber": "string",
  "email": "string",
  "address": "string",
  "city": "string",
  "country": "string",
  "idCardNumber": "string",
  "commercialRegNumber": "string",
  "bankAccountNumber": "string",
  "bankCardNumber": "string",
  "bankCardExpiry": "string",
  "bankCardHolderName": "string"
}
```

### `SellerApplicationService`
```json
{
  "userId": "string,",
  "dto": "SellerApplicationDto,",
  "files": "{",
  "idCardFrontImage": "frontUrl,",
  "idCardBackImage": "backUrl,",
  "sellerFaceImage": "faceUrl,",
  "where": "{ userId },",
  "select": "{",
  "data": "{",
  "fullName": "true,",
  "phoneNumber": "true,",
  "email": "true,",
  "address": "dto.address,",
  "city": "true,",
  "country": "true,",
  "idCardNumber": "encryptedIdCard,",
  "commercialRegNumber": "encryptedCommercialReg,",
  "bankAccountNumber": "encryptedBankAccount,",
  "bankCardNumber": "encryptedBankCard,",
  "bankCardExpiry": "dto.bankCardExpiry,",
  "bankCardHolderName": "dto.bankCardHolderName,",
  "uniqueIpCount": "uniqueIps,",
  "id": "true,",
  "status": "true,",
  "addressTrustScore": "true,",
  "addressVerified": "true,",
  "createdAt": "true,",
  "adminNote": "true,",
  "reviewedAt": "true,",
  "updatedAt": "true,"
}
```

### `SellerGuard`
```json
{
  "where": "{ userId: user.id },",
  "select": "{",
  "isBanned": "true,",
  "isSuspended": "true,",
  "banReason": "true,",
  "suspendReason": "true,"
}
```

### `SellerProfile`
```json
{
  "id": "String",
  "userId": "String",
  "user": "User",
  "businessName": "String?",
  "phoneNumber": "String",
  "address": "String",
  "city": "String",
  "country": "String",
  "commercialRegNumber": "String",
  "bankAccountNumber": "String",
  "bankCardLast4": "String",
  "isSuspended": "Boolean",
  "isBanned": "Boolean",
  "suspendReason": "String?",
  "banReason": "String?",
  "suspendedAt": "DateTime?",
  "bannedAt": "DateTime?",
  "createdAt": "DateTime",
  "updatedAt": "DateTime"
}
```

### `SellerService`
```json
{
  "where": "{",
  "include": "{",
  "user": "{",
  "select": "{ id: true, title: true, price: true, images: true },",
  "id": "true,",
  "name": "true,",
  "email": "true,",
  "image": "true,",
  "createdAt": "true,",
  "commercialRegNumberMasked": "'\u2022\u2022\u2022\u2022\u2022\u2022\u2022',",
  "bankAccountNumberMasked": "'\u2022\u2022\u2022\u2022 ' + profile.bankCardLast4,",
  "businessName": "true,",
  "phoneNumber": "true,",
  "address": "true,",
  "city": "true,",
  "country": "true,",
  "bankCardLast4": "true,",
  "isSuspended": "true,",
  "isBanned": "true,",
  "updatedAt": "true,",
  "orderBy": "{ createdAt: 'desc' },",
  "take": "limit,",
  "sellerId": "userId,",
  "status": "{ in: ['COMPLETED', 'CANCELLED', 'REFUNDED', 'DISPUTED'] },",
  "product": "{ select: { id: true, title: true, price: true } },",
  "buyer": "{ select: { id: true, name: true, email: true } },",
  "transaction": "true,",
  "userId": "string,",
  "orderId": "string,",
  "dto": "ConfirmShipmentDto,",
  "file": "Express.Multer.File,"
}
```

### `SentenceToken`
```json
{
  "sentence": "string",
  "positive": "number",
  "negative": "number"
}
```

### `SentimentAnalysisProcessor`
```json
{
  "job": "Job<{",
  "text": "string",
  "contentType": "SentimentContentType",
  "contentId": "string",
  "userId": "string",
  "reactorUserId": "string",
  "eventType": "SentimentEventType",
  "commenterId": "string",
  "parentContentId": "string",
  "parentContentType": "SentimentContentType",
  "commentText": "string",
  "commentId": "string"
}
```

### `SentimentEvent`
```json
{
  "id": "String",
  "userId": "String",
  "user": "User",
  "eventType": "SentimentEventType",
  "sourceContentId": "String?",
  "sourceUserId": "String?",
  "positiveImpact": "Float",
  "negativeImpact": "Float",
  "resultPositive": "Float",
  "resultNegative": "Float",
  "createdAt": "DateTime"
}
```

### `SentimentService`
```json
{
  "positive": "number,",
  "text": "string,",
  "contentType": "parentContentType,",
  "contentId": "parentContentId,",
  "userId": "string,",
  "where": "{ userId },",
  "contentType_contentId": "{",
  "create": "{",
  "positiveScore": "aggregate.positiveScore,",
  "negativeScore": "aggregate.negativeScore,",
  "wordTokens": "wordTokens as unknown as object,",
  "sentenceTokens": "sentenceTokens as unknown as object,",
  "rawText": "normalizedText,",
  "update": "{",
  "negative": "number,",
  "eventType": "SentimentEventType,",
  "sourceContentId": "string,",
  "sourceUserId": "string,",
  "positivePoints": "normalized.positive,",
  "negativePoints": "normalized.negative,",
  "totalEventsProcessed": "{ increment: 1 },",
  "data": "{",
  "resultPositive": "profile.positivePoints,",
  "resultNegative": "profile.negativePoints,",
  "reactorUserId": "string,",
  "commenterId": "string,",
  "parentContentId": "string,",
  "parentContentType": "SentimentContentType,",
  "commentText": "string,",
  "commentId": "string,",
  "triggerScore": "negativePoints,",
  "conversationId": "outcome.conversationId,",
  "suggestedFriendIds": "outcome.suggestedFriendIds ?? [],",
  "noroActive": "true,",
  "interventionCount": "{ increment: 1 },",
  "feedBoostPositive": "method === 'FEED_BOOST',"
}
```

### `Session`
```json
{
  "id": "String",
  "status": "SessionStatus",
  "refreshToken": "String?",
  "ipAddress": "String?",
  "userAgent": "String?",
  "userId": "String",
  "user": "User",
  "createdAt": "DateTime",
  "updatedAt": "DateTime"
}
```

### `SessionController`
```json
{
  "success": "true,",
  "message": "'Sessions retrieved successfully',",
  "data": "sessions,"
}
```

### `SessionIdGuard`
```json
{
  "session": "Parameters<SessionService['remove']>[0] | null,",
  "response": "Response,",
  "httpOnly": "TOKEN_CONSTANTS.COOKIE.HTTP_ONLY,",
  "secure": "TOKEN_CONSTANTS.COOKIE.SECURE,",
  "sameSite": "TOKEN_CONSTANTS.COOKIE.SAME_SITE,",
  "path": "TOKEN_CONSTANTS.COOKIE.PATH,"
}
```

### `SessionInfo`
```json
{
  "id": "string",
  "ipAddress": "string",
  "userAgent": "string",
  "status": "string",
  "createdAt": "Date",
  "updatedAt": "Date",
  "isCurrent": "boolean"
}
```

### `SessionListResponse`
```json
{
  "success": "boolean",
  "message": "string",
  "data": "SessionInfo[]",
  "meta": "SessionMeta"
}
```

### `SessionMeta`
```json
{
  "total": "number",
  "active": "number"
}
```

### `SessionService`
```json
{
  "data": "{ refreshToken },",
  "userId": "string,",
  "ipAddress": "ipAddress || 'unknown',",
  "userAgent": "userAgent || 'unknown',",
  "status": "SessionStatus.ACTIVE,",
  "sessionId": "string,",
  "where": "{ userId },",
  "include": "{ user: true },",
  "refreshToken": "string | null,",
  "orderBy": "{ updatedAt: 'desc' },",
  "isCurrent": "session.id === currentSessionId,"
}
```

### `ShareReelDto`
```json
{
  "shareType": "ShareType",
  "targetUserId": "string"
}
```

### `SharpImagePipe`
```json
{
  "buffer": "processedBuffer,",
  "size": "processedBuffer.length,",
  "mimetype": "`image/${format}`,"
}
```

### `SharpOptions`
```json
{
  "width": "number",
  "height": "number",
  "fit": "'cover' | 'contain' | 'fill' | 'inside' | 'outside'",
  "format": "'jpeg' | 'png' | 'webp'",
  "quality": "number"
}
```

### `SignupRequest`
```json
{
  "email": "string",
  "password": "string",
  "name": "string",
  "image": "string"
}
```

### `SocialController`
```json
{
  "data": "muted,",
  "count": "muted.length,"
}
```

### `SocialService`
```json
{
  "fromUserId": "string,",
  "toUserId": "string,",
  "userId": "string,",
  "data": "mutualFriends,",
  "name": "user.name,",
  "username": "user.email,",
  "location": "user.Profile?.location ?? null,",
  "coverPhoto": "user.Profile?.coverPhoto ?? null,",
  "meta": "{",
  "limit": "limitInt,",
  "offset": "offsetInt,",
  "total": "number",
  "hasMore": "boolean",
  "nextOffset": "number | null",
  "where": "{ id: userId },",
  "select": "{",
  "id": "true,",
  "email": "true,",
  "Profile": "{",
  "include": "{",
  "user": "true,",
  "score": "number",
  "mutualFriends": "number",
  "reason": "string",
  "userId1": "string,",
  "userId2": "string,"
}
```

### `StoriesService`
```json
{
  "data": "{",
  "mediaUrl": "dto.mediaUrl,",
  "thumbnailUrl": "dto.thumbnailUrl,",
  "caption": "dto.caption,",
  "privacy": "dto.privacy ?? StoryPrivacy.FRIENDS,",
  "include": "{",
  "user": "{ select: { id: true, name: true, image: true } },",
  "where": "{ id: storyId },",
  "select": "{ requesterId: true, recipientId: true },",
  "OR": "[",
  "userId": "targetUserId,",
  "expiresAt": "nextExpiry,",
  "deletedAt": "null,",
  "AND": "[{ isHighlight: false }, { expiresAt: { gt: now } }],",
  "_count": "{ select: { views: true } },",
  "orderBy": "{ createdAt: 'desc' },",
  "take": "limit,",
  "isHighlight": "false,"
}
```

### `Story`
```json
{
  "id": "String",
  "userId": "String",
  "user": "User",
  "mediaUrl": "String",
  "thumbnailUrl": "String?",
  "caption": "String?",
  "privacy": "StoryPrivacy",
  "isHighlight": "Boolean",
  "viewsCount": "Int",
  "expiresAt": "DateTime",
  "createdAt": "DateTime",
  "deletedAt": "DateTime?",
  "views": "StoryView[]"
}
```

### `StoryView`
```json
{
  "id": "String",
  "storyId": "String",
  "story": "Story",
  "viewerId": "String",
  "viewer": "User",
  "viewedAt": "DateTime"
}
```

### `StreamingGateway`
```json
{
  "server": "Server",
  "user": "payload.user,",
  "message": "payload.message,",
  "reaction": "payload.reaction,"
}
```

### `StreamingService`
```json
{
  "where": "{ id: streamId },",
  "hostId": "userId,",
  "status": "StreamStatus.ENDED,",
  "data": "{ viewerCount: 0 },",
  "ingestUrl": "`${rtmpBase}/${stream.streamKey}`,",
  "include": "{ host: { select: { id: true, name: true, image: true } } },",
  "orderBy": "{ endedAt: 'desc' },",
  "take": "limit,",
  "recordingUrl": "stream.isRecorded",
  "select": "{ viewerCount: true },"
}
```

### `SuccessResponse`
```json
{
  "code": "number",
  "success": "boolean",
  "message": "string",
  "data": "T"
}
```

### `TokenHelper`
```json
{
  "type": "'password_reset',",
  "algorithm": "'HS256',",
  "expiresIn": "'1h',"
}
```

### `TokenPayload`
```json
{
  "userId": "string",
  "sessionId": "string"
}
```

### `Transaction`
```json
{
  "id": "String",
  "amount": "Float",
  "currency": "String",
  "status": "TransactionStatus",
  "buyerId": "String",
  "buyer": "User",
  "sellerId": "String",
  "seller": "User",
  "productId": "String",
  "product": "Product",
  "orderId": "String?",
  "order": "Order?",
  "createdAt": "DateTime",
  "updatedAt": "DateTime"
}
```

### `UpdateCommentDto`
```json
{
  "content": "string"
}
```

### `UpdateGroupDto`
```json
{
  "name": "string",
  "description": "string",
  "coverPhoto": "string",
  "type": "GroupType",
  "restrictPosting": "boolean"
}
```

### `UpdateMemberRoleDto`
```json
{
  "description": "'New role for the member',",
  "enum": "['ADMIN', 'MODERATOR', 'MEMBER'],",
  "example": "'MODERATOR',",
  "role": "RoomMemberRole"
}
```

### `UpdateMessageDto`
```json
{
  "description": "'Updated message content',",
  "example": "'Updated message text',",
  "maxLength": "4096,",
  "content": "string"
}
```

### `UpdatePasswordRequest`
```json
{
  "oldPassword": "string",
  "newPassword": "string"
}
```

### `UpdatePostDto`
```json
{
  "message": "`Content must not exceed ${POST_CONSTANTS.VALIDATION.MAX_CONTENT_LENGTH} characters`,",
  "content": "string",
  "privacy": "PostPrivacy",
  "customAudienceIds": "string[]"
}
```

### `UpdatePrivacyDto`
```json
{
  "profileVisibility": "VisibilityType",
  "postsVisibility": "VisibilityType",
  "friendsVisibility": "VisibilityType",
  "bioVisibility": "VisibilityType",
  "emailVisibility": "VisibilityType",
  "phoneVisibility": "VisibilityType",
  "locationVisibility": "VisibilityType",
  "dateOfBirthVisibility": "VisibilityType",
  "whoCanSendFriendRequests": "VisibilityType",
  "whoCanMessageMe": "VisibilityType"
}
```

### `UpdatePrivacyRequest`
```json
{
  "message": "'Message permission must be a valid visibility type',",
  "profileVisibility": "VisibilityType",
  "postsVisibility": "VisibilityType",
  "friendsVisibility": "VisibilityType",
  "bioVisibility": "VisibilityType",
  "emailVisibility": "VisibilityType",
  "phoneVisibility": "VisibilityType",
  "locationVisibility": "VisibilityType",
  "dateOfBirthVisibility": "VisibilityType",
  "whoCanSendFriendRequests": "VisibilityType",
  "whoCanMessageMe": "VisibilityType",
  "allowCameraAccess": "boolean",
  "allowMicrophoneAccess": "boolean"
}
```

### `UpdateProductDto`
```json
{
  "title": "string",
  "description": "string",
  "price": "number",
  "quantity": "number",
  "categoryId": "string",
  "images": "string[]"
}
```

### `UpdateProfileRequest`
```json
{
  "message": "PROFILE_ERROR_MESSAGES.LOCATION_TOO_LONG,",
  "bio": "string",
  "location": "string",
  "website": "string",
  "phoneNumber": "string",
  "dateOfBirth": "Date"
}
```

### `UpdateReelDto`
```json
{
  "caption": "string",
  "hashtags": "string[]",
  "audioTrackId": "string | null",
  "audioOffsetMs": "number",
  "isPublic": "boolean",
  "commentsEnabled": "boolean",
  "downloadsEnabled": "boolean"
}
```

### `UpdateRoomDto`
```json
{
  "description": "'Updated group image URL',",
  "example": "'Updated description for the project team',",
  "maxLength": "500,",
  "name": "string",
  "imageUrl": "string"
}
```

### `UpdateRoomMemberSettingsDto`
```json
{
  "description": "'Archive the room',",
  "example": "false,",
  "isMuted": "boolean",
  "isArchived": "boolean"
}
```

### `UpdateSellerProfileDto`
```json
{
  "businessName": "string",
  "message": "'phoneNumber must be a valid phone number',",
  "phoneNumber": "string",
  "address": "string",
  "city": "string",
  "country": "string"
}
```

### `UpdateUserInfo`
```json
{
  "name": "string",
  "image": "string"
}
```

### `UpdateUserResponse`
```json
{
  "id": "string",
  "name": "string",
  "email": "string",
  "image": "string",
  "active": "boolean",
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

### `UploadResponse`
```json
{
  "imageUrl": "string",
  "coverPhotoUrl": "string"
}
```

### `User`
```json
{
  "id": "String",
  "email": "String",
  "name": "String?",
  "image": "String?",
  "password": "String?",
  "emailVerified": "Boolean",
  "active": "Boolean",
  "isBanned": "Boolean",
  "banReason": "String?",
  "role": "UserRole",
  "createdAt": "DateTime",
  "updatedAt": "DateTime",
  "Session": "Session[]",
  "Otp": "Otp[]",
  "Profile": "Profile?",
  "Notification": "Notification[]",
  "NotificationActor": "Notification[]",
  "Post": "Post[]",
  "Likes": "Like[]",
  "Comments": "Comment[]",
  "savedPosts": "SavedPost[]",
  "sentFriendRequests": "Friendship[]",
  "receivedFriendRequests": "Friendship[]",
  "following": "Follow[]",
  "followers": "Follow[]",
  "blockedUsers": "Block[]",
  "blockedBy": "Block[]",
  "messages": "Message[]",
  "roomMemberships": "RoomMember[]",
  "createdRooms": "Room[]",
  "messageReactions": "MessageReaction[]",
  "readReceipts": "ReadReceipt[]",
  "products": "Product[]",
  "transactions": "Transaction[]",
  "sales": "Transaction[]",
  "buyerOrders": "Order[]",
  "sellerOrders": "Order[]",
  "reports": "Report[]",
  "noroChats": "NoroChat[]",
  "sellerApplication": "SellerApplication?",
  "sellerProfile": "SellerProfile?",
  "adminDealLogs": "DealLog[]",
  "callRoomsCreated": "CallRoom[]",
  "callParticipants": "CallParticipant[]",
  "noroConversations": "NoroConversation[]",
  "noroMessages": "NoroMessage[]",
  "userMoodProfile": "UserMoodProfile?",
  "contentSentiments": "ContentSentiment[]",
  "sentimentProfile": "UserSentimentProfile?",
  "sentimentEvents": "SentimentEvent[]",
  "interests": "UserInterest[]",
  "activityLogs": "ActivityLog[]",
  "noroInterventions": "NoroIntervention[]",
  "crisisEvents": "CrisisEvent[]",
  "emergencyContacts": "UserEmergencyContact[]",
  "reels": "Reel[]",
  "reelViews": "ReelView[]",
  "reelLikes": "ReelLike[]",
  "reelComments": "ReelComment[]",
  "reelShares": "ReelShare[]",
  "reelBookmarks": "ReelBookmark[]",
  "reelCommentLikes": "ReelCommentLike[]",
  "stories": "Story[]",
  "storyViews": "StoryView[]",
  "ownedGroups": "Group[]",
  "groupMemberships": "GroupMember[]",
  "groupJoinRequests": "GroupJoinRequest[]",
  "ownedPages": "Page[]",
  "pageRoles": "PageMember[]",
  "hostedStreams": "LiveStream[]",
  "analyticsEvents": "AnalyticsEvent[]",
  "hostedEvents": "Event[]",
  "eventRsvps": "EventAttendee[]",
  "eventTickets": "EventTicket[]",
  "eventReminders": "EventReminder[]"
}
```

### `UserEmailInput`
```json
{
  "email": "string"
}
```

### `UserEmergencyContact`
```json
{
  "id": "String",
  "userId": "String",
  "user": "User",
  "contactName": "String",
  "contactPhone": "String?",
  "contactEmail": "String?",
  "notifyOnCrisis": "Boolean",
  "createdAt": "DateTime",
  "updatedAt": "DateTime"
}
```

### `UserIdInput`
```json
{
  "userId": "string"
}
```

### `UserIdResponse`
```json
{
  "id": "string"
}
```

### `UserInterest`
```json
{
  "id": "String",
  "userId": "String",
  "user": "User",
  "topic": "String",
  "score": "Float",
  "lastUpdated": "DateTime"
}
```

### `UserListFilterInput`
```json
{
  "search": "string",
  "page": "number = 1",
  "limit": "number = 8",
  "sortBy": "'name' | 'email' | 'role' | 'createdAt' = 'createdAt'",
  "sortOrder": "'asc' | 'desc' = 'desc'"
}
```

### `UserMoodProfile`
```json
{
  "userId": "String",
  "user": "User",
  "moodScore": "Decimal?",
  "dominantMood": "String?",
  "energyLevel": "Decimal?",
  "lastUpdated": "DateTime",
  "sourceConvId": "String?",
  "sourceConv": "NoroConversation?"
}
```

### `UserNode`
```json
{
  "userId": "string",
  "username": "string",
  "name": "string"
}
```

### `UserResponse`
```json
{
  "id": "string",
  "name": "string",
  "email": "string",
  "image": "string",
  "active": "boolean",
  "emailVerified": "boolean",
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

### `UserSentimentProfile`
```json
{
  "userId": "String",
  "user": "User",
  "positivePoints": "Float",
  "negativePoints": "Float",
  "totalEventsProcessed": "Int",
  "noroActive": "Boolean",
  "lastInterventionAt": "DateTime?",
  "interventionCount": "Int",
  "feedBoostPositive": "Boolean",
  "feedBoostUntil": "DateTime?",
  "lastUpdated": "DateTime"
}
```

### `UserService`
```json
{
  "orderBy": "{ [sortBy]: sortOrder },",
  "take": "limit,",
  "data": "{ active: !existingUser.active },",
  "meta": "{",
  "hasNextPage": "page * limit < total,",
  "hasPreviousPage": "page > 1,",
  "image": "data.image,",
  "email": "user.email,",
  "name": "user.name,",
  "emailVerified": "true,",
  "active": "true,",
  "where": "{",
  "id": "user.id,",
  "include": "{",
  "Session": "true,",
  "success": "true,",
  "user": "{"
}
```

### `UsernameInput`
```json
{
  "username": "string"
}
```

### `ValidationPipe`
```json
{
  "whitelist": "true,",
  "forbidNonWhitelisted": "true,"
}
```

### `ValidationPipeOptions`
```json
{
  "whitelist": "boolean",
  "forbidNonWhitelisted": "boolean"
}
```

### `VerifyEmailRequest`
```json
{
  "email": "string",
  "otp": "string"
}
```

### `VerifyForgotPasswordRequest`
```json
{
  "email": "string",
  "message": "ERROR_MESSAGES.OTP_MUST_BE_6_DIGITS,",
  "otp": "string"
}
```

### `WordToken`
```json
{
  "word": "string",
  "positive": "number",
  "negative": "number"
}
```

### `currentUserType`
```json
{
  "session": "Session"
}
```
