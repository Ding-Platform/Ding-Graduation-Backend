-- CreateEnum
CREATE TYPE "SentimentContentType" AS ENUM ('POST', 'COMMENT', 'REEL');

-- CreateEnum
CREATE TYPE "SentimentEventType" AS ENUM (
  'AUTHORED_POST',
  'AUTHORED_COMMENT',
  'AUTHORED_REEL',
  'LIKED_POST',
  'LIKED_REEL',
  'COMMENTED_ON_POST',
  'VIEWED_REEL',
  'REACTED_TO_COMMENT'
);

-- CreateEnum
CREATE TYPE "InterventionMethod" AS ENUM ('CONVERSATION', 'FEED_BOOST', 'FRIEND_SUGGESTION');

-- CreateTable
CREATE TABLE "ContentSentiment" (
  "id" TEXT NOT NULL,
  "contentType" "SentimentContentType" NOT NULL,
  "contentId" TEXT NOT NULL,
  "userId" TEXT NOT NULL,
  "positiveScore" INTEGER NOT NULL,
  "negativeScore" INTEGER NOT NULL,
  "wordTokens" JSONB NOT NULL,
  "sentenceTokens" JSONB NOT NULL,
  "rawText" TEXT NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT "ContentSentiment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserSentimentProfile" (
  "userId" TEXT NOT NULL,
  "positivePoints" DOUBLE PRECISION NOT NULL DEFAULT 50,
  "negativePoints" DOUBLE PRECISION NOT NULL DEFAULT 50,
  "totalEventsProcessed" INTEGER NOT NULL DEFAULT 0,
  "noroActive" BOOLEAN NOT NULL DEFAULT false,
  "lastInterventionAt" TIMESTAMP(3),
  "interventionCount" INTEGER NOT NULL DEFAULT 0,
  "feedBoostPositive" BOOLEAN NOT NULL DEFAULT false,
  "feedBoostUntil" TIMESTAMP(3),
  "lastUpdated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT "UserSentimentProfile_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "SentimentEvent" (
  "id" TEXT NOT NULL,
  "userId" TEXT NOT NULL,
  "eventType" "SentimentEventType" NOT NULL,
  "sourceContentId" TEXT,
  "sourceUserId" TEXT,
  "positiveImpact" DOUBLE PRECISION NOT NULL,
  "negativeImpact" DOUBLE PRECISION NOT NULL,
  "resultPositive" DOUBLE PRECISION NOT NULL,
  "resultNegative" DOUBLE PRECISION NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT "SentimentEvent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NoroIntervention" (
  "id" TEXT NOT NULL,
  "userId" TEXT NOT NULL,
  "method" "InterventionMethod" NOT NULL,
  "triggerScore" DOUBLE PRECISION NOT NULL,
  "resolved" BOOLEAN NOT NULL DEFAULT false,
  "resolvedAt" TIMESTAMP(3),
  "conversationId" TEXT,
  "suggestedFriendIds" TEXT[] DEFAULT ARRAY[]::TEXT[],
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT "NoroIntervention_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ContentSentiment_contentType_contentId_key" ON "ContentSentiment"("contentType", "contentId");
CREATE INDEX "ContentSentiment_userId_createdAt_idx" ON "ContentSentiment"("userId", "createdAt");
CREATE INDEX "ContentSentiment_contentType_contentId_idx" ON "ContentSentiment"("contentType", "contentId");

CREATE INDEX "UserSentimentProfile_negativePoints_idx" ON "UserSentimentProfile"("negativePoints");
CREATE INDEX "UserSentimentProfile_noroActive_idx" ON "UserSentimentProfile"("noroActive");

CREATE INDEX "SentimentEvent_userId_createdAt_idx" ON "SentimentEvent"("userId", "createdAt");
CREATE INDEX "SentimentEvent_eventType_createdAt_idx" ON "SentimentEvent"("eventType", "createdAt");

CREATE INDEX "NoroIntervention_userId_createdAt_idx" ON "NoroIntervention"("userId", "createdAt");
CREATE INDEX "NoroIntervention_resolved_idx" ON "NoroIntervention"("resolved");

-- AddForeignKey
ALTER TABLE "ContentSentiment"
  ADD CONSTRAINT "ContentSentiment_userId_fkey"
  FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "UserSentimentProfile"
  ADD CONSTRAINT "UserSentimentProfile_userId_fkey"
  FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "SentimentEvent"
  ADD CONSTRAINT "SentimentEvent_userId_fkey"
  FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "NoroIntervention"
  ADD CONSTRAINT "NoroIntervention_userId_fkey"
  FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
