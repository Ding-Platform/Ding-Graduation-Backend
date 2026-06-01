# Hashtag & Category Affinity Algorithm Implementation Plan

## Part 1: Sentiment Engine Verification

Before proceeding, I audited the existing `sentiment-tokeniztion-and-mood-engine.md` against your active codebase. I can confirm the system is already working exactly as requested:
1. **0–100 Scale**: `SentimentService` properly normalizes scores so `positive + negative = 100`.
2. **70 Point Threshold**: In `checkAndTriggerIntervention()`, if `negativePoints >= 70`, it triggers `triggerNoroIntervention()`.
3. **Noro AI Chat**: The trigger creates a `NoroIntervention` record and flags the account for a Noro conversation check-in.
4. **Feed Reduction**: The trigger activates a `feedBoostPositive` flag. In `feed.service.ts` and `reels.service.ts`, the feed algorithms check this flag. If active, they actively add penalty points (subtract `0.35` score) from negatively scored posts and boost positive posts. 

**Conclusion:** The sentiment engine needs no modifications to fulfill your requirements.

---

## Part 2: Hashtag & Category User Affinity 

To make the feed highly personalized to the user's content tastes, we will track what hashtags and categories they interact with and use that to heavily boost matching content.

### Proposed Changes

#### 1. Database Schema
**[MODIFY] `prisma/schema.prisma`**
Add the `UserInterest` model to track affinity:
```prisma
model UserInterest {
  id          String   @id @default(uuid())
  userId      String
  user        User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  topic       String   // e.g., "Sports" or "coding"
  score       Float    @default(1.0)
  lastUpdated DateTime @default(now())

  @@unique([userId, topic])
  @@index([userId, score(sort: Desc)])
}
```
*And update `User` model to include `interests UserInterest[]`.*

#### 2. Affinity Tracking Service
**[NEW] `src/modules/interest/interest.service.ts` & `interest.module.ts`**
- Create `recordInterest(userId: string, topics: string[], weight: number)` to upsert `UserInterest` records, incrementing the score for each hashtag/category interacted with.
- Provide a `getTopInterests(userId: string)` method to fetch the user's top 10 scoring topics.

#### 3. Capture Interactions
**[MODIFY] `src/modules/post/post.service.ts`**
- Update `toggleLike`, `toggleSave`, and `createComment` to pass the Post's `hashtags` and `categories` to the `InterestService` (e.g., +2.0 points for a like).

**[MODIFY] `src/modules/reels/reels.service.ts`**
- Update `toggleLike`, `toggleBookmark`, `addComment`, and `recordView` (if `watchPct > 70%`) to log the Reel's hashtags/categories to the `InterestService`.

#### 4. Feed Ranking Boost
**[MODIFY] `src/modules/feed/feed.service.ts`**
- In `mapPosts()`, fetch the user's top interests. If a Post contains hashtags or categories that match the user's top interests, add an `interestMultiplier` to the Post's final ranking score.

**[MODIFY] `src/modules/reels/reels.service.ts`**
- In `getFeed()`, perform the same check. If a Reel matches the user's top topics, boost its ranking score to push it higher up the Feed.

---

## User Review Required

> [!IMPORTANT]
> **Schema Changes**
> I will add a `UserInterest` table. Let me know if you approve this database change so I can run the Prisma migration.

> [!NOTE]
> **Weights**
> I plan to use the following affinity weights: **Likes/Saves (+2 points), Comments (+1.5 points), Reel Views > 70% (+1 point)**. Let me know if you want to adjust these numbers before I execute.
