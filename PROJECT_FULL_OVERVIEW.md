# Ding Platform Backend - Full Project Overview

## 1. What This Project Is
Ding Platform Backend is a NestJS-based social platform backend that combines:
- Authentication and session security
- User profiles and social graph features
- Posting, feed, likes, comments, and privacy controls
- Realtime chat, call support, notifications
- Moderation and Noro assistant/chat features
- Marketplace with full Seller onboarding and Admin governance

It is designed as a modular monolith with clear feature modules and Prisma-managed PostgreSQL data.

---

## 2. Tech Stack and Core Architecture

### Backend Framework
- NestJS (TypeScript)
- Global validation and response interception
- Structured logging via `nestjs-pino`

### Data and Infra
- PostgreSQL + Prisma (`prisma/schema.prisma`) as primary relational data source
- Redis (caching/queues/session-adjacent support)
- Bull queue integration (`@nestjs/bull`)
- Neo4j module (graph sync / social graph support)
- MongoDB module present for specific domain integrations
- Cloudinary integration for media/document uploads

### Security Patterns
- JWT authentication guards
- Role-based route protection for Seller/Admin marketplace areas
- Validation via DTOs + class-validator
- Encryption utilities for sensitive marketplace/KYC fields

---

## 3. Module-by-Module What Exists and What It Does

### Core Identity and User
- `auth`: register/login/token workflows
- `user`: user retrieval and account-related operations
- `session`: session tracking and session lifecycle management
- `profile`: profile CRUD and profile media

### Social and Content
- `social`: follow/friend/block style graph interactions
- `post`: post creation, update, media, and post lifecycle
- `feed`: feed assembly/retrieval logic
- `privacy`: audience/privacy control rules
- `like`: like/unlike behavior
- `comment`: comment create/edit/delete and related logic

### Communication
- `chat`: room/message flows, reactions, read receipts, media
- `call`: call-related module integration
- `notification`: notification creation/delivery endpoints

### Governance and Safety
- `moderation`: reporting and moderation/admin handling
- `noro`: Noro-related chat/system features

### Marketplace (Enhanced)
- `marketplace/product`: marketplace product CRUD and buy flow
- `marketplace/seller`: seller application, seller dashboard, seller profile/deals
- `marketplace/admin`: admin review, seller actions, deal control, logs
- `marketplace/guards`: seller/admin role protection

---

## 4. Marketplace Enhanced (Seller and Admin System)

### What Was Added
- User role model with enum `USER | SELLER | ADMIN`
- Seller onboarding pipeline (`SellerApplication`) with KYC/business/banking data
- Seller operational profile (`SellerProfile`) for approved sellers
- Admin audit trail (`DealLog`) for governance actions
- Product quantity support and transaction cancel flow

### Important Marketplace Behaviors
- Seller application includes validation + required docs upload (ID front/back + face)
- Sensitive values stored encrypted (card/account/commercial register, etc.)
- Address trust score is heuristic-based from session/IP history
- Seller guard blocks suspended/banned sellers
- Admin can approve/decline applications, ban/suspend/unban/unsuspend sellers
- Admin can cancel deals and action is logged in `DealLog`
- Product stock/quantity changes influence product status behavior

### Current Known Scope Boundary
- Payment processing is still mock/internal flow.
- Real settlement/payout (Stripe Connect / PayPal Payouts) is Sprint 14 scope.

---

## 5. Database (Prisma)

### Main Schema File
- `prisma/schema.prisma`

### Marketplace-Specific Additions
- Enums: `UserRole`, `ApplicationStatus`, `DealLogTargetType`, `DealLogAction`
- Models: `SellerApplication`, `SellerProfile`, `DealLog`
- Product extension: `quantity`
- Transaction extension includes `CANCELLED` status support

### Migration Command
```bash
pnpm prisma migrate dev --name marketplace_seller_admin
```

---

## 6. Testing and Verification Assets

### Jest (Unit/Module + E2E)
- Unit/integration-style specs under `src/**/*.spec.ts`
- E2E suite under `_test/e2e/`
  - Includes `marketplace-enhanced.e2e-spec.ts` and other feature e2e tests

### Test Commands
```bash
pnpm test
pnpm test:e2e
pnpm test:cov
```

### Additional Verification Scripts
- `_test/verify-*.js` scripts for targeted feature checks
- Chat/API utility files under `_test/`

---

## 7. Postman Collections

### Full Backend Collection (All Major Modules)
- `_test/postman/Ding-Platform-Full-API.postman_collection.json`
- `_test/postman/Ding-Platform-Full-API.local.postman_environment.json`

### Marketplace-Focused Collection
- `_test/postman/Marketplace-Enhanced.postman_collection.json`
- `_test/postman/Marketplace-Enhanced.local.postman_environment.json`

These files include example payloads, auth token variables, and IDs needed to test end-to-end flows.

---

## 8. Seeding and Admin Setup

### Seed Scripts Available
- `prisma/seed.ts` (main/general seed)
- `prisma/seed-marketplace.ts` (marketplace-linked data)
- `prisma/seed-chat.ts` (chat sample data)
- `prisma/post-seeder.ts` (post-related seed utility)
- `prisma/promote-admin.ts` (promote user to admin role)

### Package Scripts
```bash
pnpm prisma:seed
pnpm prisma:seed:marketplace
pnpm seed:chat
pnpm prisma:promote-admin
```

---

## 9. Runbook (Local)

### Install
```bash
pnpm install
```

### Migrate
```bash
pnpm prisma migrate dev
```

### Seed (recommended minimum)
```bash
pnpm prisma:seed
pnpm prisma:seed:marketplace
```

### Promote Admin (required for admin endpoints)
```bash
pnpm prisma:promote-admin
```

### Run App
```bash
pnpm start:dev
```

### Build Check
```bash
pnpm build
```

---

## 10. Endpoint Groups (High-Level)
- `/auth`
- `/users`
- `/sessions`
- `/profile`
- `/social`
- `/posts`
- `/feed`
- `/privacy`
- `/likes`
- `/comments`
- `/chat`
- `/notifications`
- `/noro`
- `/moderation`
- `/marketplace/products`
- `/marketplace/seller`
- `/marketplace/admin`

Use the full Postman collection for complete per-route examples and test bodies.

---

## 11. Project Status Summary
- Core social backend modules are implemented and structured.
- Marketplace Seller/Admin enhanced system is implemented with role-based controls and DB extensions.
- Postman full-project collection is available for manual API validation.
- Seed scripts exist for baseline/test data.
- Remaining major roadmap item: live payment provider integration in Sprint 14.
