# Ding Platform Backend - Project Checkpoint

**Date**: 2026-04-24  
**Active Branch**: `sprint16-17/screen-share-and-reels`  
**Current Status**: Sprints 16 and 17 backend foundations implemented and compile-validated

## Delivered in This Checkpoint

### Sprint 16 - Calls + Noro Wellbeing
- Call signaling upgraded for group-call lifecycle and screen sharing:
  - Participant join/leave state handling
  - Screen share lock (`SCREEN_SHARE_IN_PROGRESS`)
  - Active speaker event logic (debounced)
  - Bandwidth reporting ingestion
  - Quality hints endpoint
- Noro v2 data flow added:
  - Conversations/messages persistence with cursor pagination
  - Mood profile updates from user sentiment
  - Crisis events + hotline lookup + intervention logging
  - Legacy Noro endpoints preserved for backward compatibility

### Sprint 17 - Reels (Part 1)
- Reels module added with:
  - Upload URL creation + finalize + status + CRUD
  - Feed ranking (recency/engagement/relevance proxy + mood boost)
  - View deduplication by `(sessionId, reelId)` via Redis
  - Reactions (like toggle), comments/replies, sharing
  - Audio tracks listing/trending/usage APIs

### Data Layer + Infra Wiring
- Prisma schema expanded with additive models only (safe with existing modules).
- Migration added for all Sprint 16/17 models and enums.
- Redis service expanded with hash/zset/NX helpers needed by calls/reels.
- Seed script updated to populate:
  - `crisis_hotlines` equivalent table (`CrisisHotline`)
  - `AudioTrack`
  - Sample Noro conversation/mood/crisis records
  - Sample reel with view/like/comment/share
  - Sample call room participants

### QA Assets Updated
- Added new unit tests for:
  - `CallService`
  - `NoroService` (new flows)
  - `ReelsService`
  - `ReelsController`
- Postman collection updated with Sprint 16/17 folders and variables:
  - Calls endpoints
  - Noro v2 + crisis endpoints
  - Reels endpoints
  - Audio tracks endpoints

## Validation Snapshot
- `pnpm build` passes after these changes.
- New tests added; run them with:
  - `pnpm test -- src/modules/call/call.service.spec.ts src/modules/noro/noro.service.spec.ts src/modules/reels/reels.service.spec.ts src/modules/reels/reels.controller.spec.ts`

## Known Follow-up Work (Non-blocking for this checkpoint)
1. Replace placeholder in-process reels finalize path with full S3 -> queue -> FFmpeg worker pipeline.
2. Replace heuristic sentiment/crisis detection with queue-based NLP/ML services.
3. Add rate-limit guards and DTO validation classes for all newly added endpoints.
4. Add integration/e2e tests for new modules.
