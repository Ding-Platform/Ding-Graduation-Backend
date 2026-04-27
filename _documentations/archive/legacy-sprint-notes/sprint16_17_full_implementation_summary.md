# Sprint 16-17 Backend Implementation Summary

Date: `2026-04-24`  
Branch: `sprint16-17/screen-share-and-reels`

## Objective

Implement Sprint 16 and Sprint 17 backend scope in a way that is:
- compatible with existing Ding architecture,
- safe for current production-style data patterns,
- resumable by any team member without losing context.

## What Was Implemented

### 1) Data Model and Persistence

Expanded Prisma schema with additive entities for:
- Calls: `CallRoom`, `CallParticipant`
- Noro wellbeing: `NoroConversation`, `NoroMessage`, `UserMoodProfile`, `CrisisEvent`, `CrisisHotline`, `UserEmergencyContact`
- Reels: `Reel`, `AudioTrack`, `ReelView`, `ReelLike`, `ReelComment`, `ReelShare`

Why:
- Existing schema had legacy `NoroChat` only and no reels persistence.
- Additive strategy prevents regressions in older modules and existing API contracts.

Enhancement:
- Preserves old features while unlocking Sprint 16/17 behavior and future infra integration.

### 2) Calls (Screen Share + Group Calls)

Implemented in Call module:
- Participant lifecycle state (`join_room`, `leave_room`)
- Media state updates (`media_state_changed`)
- Screen share signaling guard (`screen_share_start`, `screen_share_stop`)
- Active speaker detection (debounced)
- Bandwidth report ingestion
- REST state endpoints:
  - `GET /calls/:roomId/screen-share`
  - `GET /calls/:roomId/quality-hints`

Why:
- Existing call gateway only relayed basic offer/answer/ICE and lacked room state semantics.

Enhancement:
- Enables deterministic room behavior for frontend layouts, speaker mode, and screen sharing controls.

### 3) Noro Integration (Conversations, Mood, Crisis)

Added endpoints and service flows for:
- Conversation creation/listing/deletion
- Message insertion/retrieval with cursor pagination
- Mood profile update on user message
- Crisis reporting/intervention logging
- Hotline lookup by country/language

Why:
- Sprint asks for durable history + wellbeing logic + crisis resource integration.

Enhancement:
- Introduces structured wellbeing pipeline with minimal coupling to frontend and keeps legacy chat route intact.

### 4) Reels (Part 1)

Created full Reels module:
- Upload-url creation
- Finalize/status/details/update/delete
- Feed ranking endpoint
- View counting with Redis dedup
- Like toggle
- Comments + replies + deletion
- Sharing
- Audio track list/trending/get/use

Why:
- Sprint 17 requires core creation + interaction backend for reels.

Enhancement:
- Supports immediate frontend integration while leaving space for real async media workers.

### 5) Redis Capability Upgrade

Extended RedisService with helpers used by calls and reels:
- hash operations (`hSet`, `hGet`, `hGetAll`, `hLen`, `hDel`)
- set NX+EX (`setNxEx`) for dedup
- zset write (`zAdd`)
- numeric increment (`incrBy`)

Why:
- Existing wrapper only supported simple key-value operations.

Enhancement:
- Reusable real-time/cache primitives now available platform-wide.

### 6) Seeding and Data Connectivity

Updated `prisma/seed.ts` to seed Sprint 16/17 entities:
- crisis hotlines
- audio tracks
- Noro sample conversation/messages/mood/crisis event
- Reels sample entity plus view/like/comment/share
- Sample call room with participants

Why:
- Without seed support, new APIs are hard to verify quickly in local/dev.

Enhancement:
- New modules are immediately testable after seed.

### 7) Postman Coverage

Updated main collection:
- `Calls (Sprint 16)` folder
- `Noro V2 (Sprint 16)` folder
- `Reels (Sprint 17)` folder
- `Audio Tracks (Sprint 17)` folder

Updated local environment variables for new IDs/cursors:
- `reelId`, `audioTrackId`, `conversationId`, `crisisEventId`, `peerId`, `sessionId`

Why:
- Fast manual QA and handoff for frontend/mobile teams.

Enhancement:
- Full API smoke flow available without manual request crafting.

### 8) Automated Tests Added

Added unit tests:
- `src/modules/call/call.service.spec.ts`
- `src/modules/reels/reels.service.spec.ts`
- `src/modules/reels/reels.controller.spec.ts`
- Expanded `src/modules/noro/noro.service.spec.ts`

Why:
- Guard key decision logic (room capacity, dedup, finalize validation, sentiment path).

Enhancement:
- Catches regressions early in Sprint 16/17 code paths.

## Implementation Approach (How)

1. Mapped Sprint requirements to existing modules and conventions.
2. Extended schema first to avoid service/type drift.
3. Upgraded backend module by module (calls -> noro -> reels).
4. Added Redis primitives only where needed to avoid overreach.
5. Added test scaffolding around highest-risk logic branches.
6. Updated seed and Postman for immediate integrability.
7. Ran compile validation (`pnpm build`) and fixed type-level issues.

## Validation Performed

- Prisma client generation successful.
- TypeScript/Nest compile successful (`pnpm build`).
- New test files compile within current Jest setup.

## Important Notes

- Reels finalize currently uses scaffolded processing output URLs (ready for full S3/SQS/FFmpeg pipeline replacement).
- Crisis/sentiment logic currently uses deterministic heuristics in service layer; queue/ML upgrade is the next phase.
- Migration file was added manually because local `prisma migrate dev` failed with schema engine error in this environment.

## Files of Interest

- Schema and migration:
  - `prisma/schema.prisma`
  - `prisma/migrations/20260424120000_sprint16_17_backend_foundation/migration.sql`
- Calls:
  - `src/modules/call/call.gateway.ts`
  - `src/modules/call/call.service.ts`
  - `src/modules/call/call.controller.ts`
- Noro:
  - `src/modules/noro/noro.controller.ts`
  - `src/modules/noro/noro.service.ts`
- Reels:
  - `src/modules/reels/reels.module.ts`
  - `src/modules/reels/reels.controller.ts`
  - `src/modules/reels/audio-tracks.controller.ts`
  - `src/modules/reels/reels.service.ts`
- Seed and docs:
  - `prisma/seed.ts`
  - `_test/postman/Ding-Platform-Full-API.postman_collection.json`
  - `_test/postman/Ding-Platform-Full-API.local.postman_environment.json`
  - `project_status.md`
  - `_documentations/sprint16_17_backend_implementation_log.md`

## Recommended Next Steps

1. Run DB migration in runtime environments:
   - `pnpm prisma migrate deploy`
2. Run seed:
   - `pnpm prisma:seed`
3. Execute targeted tests + full build in CI.
4. Replace scaffolded reels processing with worker-based media pipeline.
5. Introduce DTO validation/rate-limits across new endpoints.
