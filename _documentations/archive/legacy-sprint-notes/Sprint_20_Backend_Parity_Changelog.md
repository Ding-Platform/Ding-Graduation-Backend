# Sprint 20 Backend Parity Changelog

**Date:** April 27, 2026
**Target:** Achieving Backend Parity up to Sprint 20 of the Ding Agile Plan

## Overview
This document serves as a comprehensive record of all changes made to the Ding Social Platform Backend to close the feature gap between the existing codebase and the Sprint 20 milestone. The goal was to fully align the backend with the documented requirements, focusing on Stories, Groups, Pages, Search, Live Streaming, Analytics, and Events.

## Changes & Reasons for Change

### 1. Database Schema Extensions
**Change:** Appended `Story`, `StoryView`, `Group`, `GroupMember`, `GroupJoinRequest`, `GroupRule`, `GroupPost`, `Page`, `PageMember`, `PageFollow`, `PagePost`, `LiveStream`, `AnalyticsEvent`, `Event`, `EventAttendee`, `EventTicket`, `EventReminder`, and `GroupEvent` to `prisma/schema.prisma`. Extended the `NotificationType` enum with 8 new events. Added relations to the `User` model.
**Reason:** The database lacked the structural tables required to store the data corresponding to Sprints 12-20. To ensure referential integrity and maintain the relational model architecture, these models were introduced natively via Prisma, linking back to the `User` table for ownership and tracking.

### 2. Global Search Implementation (Sprint 14)
**Change:** Created `SearchModule` using a unified Postgres `ILIKE` pattern querying Users, Posts, Groups, and Pages. Removed `username` from the User query (as it didn't exist in schema) and corrected `isActive` to `active`.
**Reason:** The agile plan specified a global search across all entities. While Elasticsearch was considered, we chose Postgres full-text/ILIKE matching to minimize infrastructure complexity at this stage, focusing on functional parity first. The `username` and `isActive` corrections were necessary to align with the actual `schema.prisma`.

### 3. Stories Module (Sprint 12)
**Change:** Implemented 24-hour auto-expiry logic using query-level filtering (`expiresAt > now()`). Built view deduplication logic.
**Reason:** Creating a Cron job for every single story expiration adds unnecessary overhead. Using a dynamic time filter on retrieval is highly performant and handles expiry instantly. Deduplicating views ensures users cannot refresh the page to artificially boost their view counts.

### 4. Advanced Social Groups & Events (Sprints 13 & 20)
**Change:** Added role-based guards (`ensureAdminOrMod`), secret group visibility toggles, RSVP capacity checks, and paid ticket `PENDING_PAYMENT` state. Built `linkEventToGroup` function.
**Reason:** Groups need strict access controls to prevent unauthorized modifications. Events needed a capacity cap to prevent overbooking. Since payment infrastructure (Stripe/PayPal) is slated for Sprint 21, the `PENDING_PAYMENT` state serves as the perfect placeholder, allowing event generation without breaking the flow.

### 5. Live Streaming WebSocket Gateway (Sprint 18)
**Change:** Built `StreamingGateway` using `@nestjs/websockets` for live chat broadcast and viewer counter (`incrementViewer`/`decrementViewer`). Mocked RTMP ingest and HLS recording URLs.
**Reason:** NestJS natively supports WebSockets which makes real-time chat and presence tracking seamless. Because we are only building backend logic right now, the actual RTMP media server is externalized. The backend handles the connection state, metadata, and security perfectly while returning mock ingest URLs.

### 6. Analytics Ingestion (Sprint 19)
**Change:** Added a batch POST endpoint with a hard cap of 100 events per payload.
**Reason:** User behavioral analytics (scrolls, views, clicks) can flood the server. Batching is necessary, but a limit (100) prevents memory overflow attacks (OOM) on the Node process.

### 7. Module Registration & Notification Signature Fixes
**Change:** Registered all 6 new modules in `app.module.ts`. Corrected the `createNotification` method calls in `groups.service.ts` and `events.service.ts` to use positional arguments instead of object arguments.
**Reason:** Modules must be registered in the root `app.module.ts` to be initialized by NestJS. The notification service calls were updated to fix TypeScript compilation errors, matching the existing method signature defined in `NotificationService`.

## Security & Reliability Confirmations
- **Zero Type Errors:** The backend passes `npm run build` completely clean.
- **DDoS Prevention:** All listing and feed endpoints contain `page` and `limit` boundaries.
- **Idempotency:** Action routes like `recordView` and `toggleFollow` handle duplicated requests gracefully without crashing.
- **Authorization:** `JwtAuthenticationGuard` is strictly enforced alongside resource-level ownership checks before any `DELETE` or `PUT` operations.
