-- Sprint 16-17 backend foundation migration
-- Generated manually because local prisma migrate dev failed with schema engine error.

DO $$ BEGIN
  CREATE TYPE "NoroTrigger" AS ENUM ('USER_INITIATED', 'PERIODIC_CHECKIN', 'CRISIS_ALERT');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE "NoroMessageRole" AS ENUM ('USER', 'ASSISTANT');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE "CrisisSeverity" AS ENUM ('LOW', 'MEDIUM', 'HIGH');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE "CrisisIntervention" AS ENUM ('NONE', 'SOFT', 'HOTLINE', 'ESCALATED');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE "ReelStatus" AS ENUM ('PENDING', 'PROCESSING', 'READY', 'FAILED');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE "ShareType" AS ENUM ('STORY', 'FEED', 'EXTERNAL', 'DM');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

CREATE TABLE IF NOT EXISTS "CallRoom" (
  "id" TEXT NOT NULL,
  "createdById" TEXT,
  "endedAt" TIMESTAMP(3),
  "maxParticipants" INTEGER NOT NULL DEFAULT 16,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "CallRoom_pkey" PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "CallParticipant" (
  "id" TEXT NOT NULL,
  "roomId" TEXT NOT NULL,
  "userId" TEXT NOT NULL,
  "peerId" TEXT NOT NULL,
  "isAudioOn" BOOLEAN NOT NULL DEFAULT true,
  "isVideoOn" BOOLEAN NOT NULL DEFAULT true,
  "joinedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "leftAt" TIMESTAMP(3),
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "CallParticipant_pkey" PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "NoroConversation" (
  "id" TEXT NOT NULL,
  "userId" TEXT NOT NULL,
  "trigger" "NoroTrigger",
  "moodScore" INTEGER,
  "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "endedAt" TIMESTAMP(3),
  "deletedAt" TIMESTAMP(3),
  CONSTRAINT "NoroConversation_pkey" PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "NoroMessage" (
  "id" TEXT NOT NULL,
  "conversationId" TEXT NOT NULL,
  "userId" TEXT NOT NULL,
  "role" "NoroMessageRole" NOT NULL,
  "content" TEXT NOT NULL,
  "sentiment" JSONB,
  "keywords" TEXT[] DEFAULT ARRAY[]::TEXT[],
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "deletedAt" TIMESTAMP(3),
  CONSTRAINT "NoroMessage_pkey" PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "UserMoodProfile" (
  "userId" TEXT NOT NULL,
  "moodScore" DECIMAL(4,2),
  "dominantMood" TEXT,
  "energyLevel" DECIMAL(4,2),
  "lastUpdated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "sourceConvId" TEXT,
  CONSTRAINT "UserMoodProfile_pkey" PRIMARY KEY ("userId")
);

CREATE TABLE IF NOT EXISTS "CrisisEvent" (
  "id" TEXT NOT NULL,
  "userId" TEXT NOT NULL,
  "messageId" TEXT,
  "crisisScore" DECIMAL(5,4) NOT NULL,
  "severity" "CrisisSeverity" NOT NULL,
  "intervention" "CrisisIntervention",
  "keywordsHit" TEXT[] DEFAULT ARRAY[]::TEXT[],
  "resolvedAt" TIMESTAMP(3),
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "CrisisEvent_pkey" PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "CrisisHotline" (
  "id" TEXT NOT NULL,
  "countryCode" CHAR(2) NOT NULL,
  "name" TEXT NOT NULL,
  "phone" TEXT,
  "sms" TEXT,
  "chatUrl" TEXT,
  "language" TEXT NOT NULL DEFAULT 'en',
  "isActive" BOOLEAN NOT NULL DEFAULT true,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "CrisisHotline_pkey" PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "UserEmergencyContact" (
  "id" TEXT NOT NULL,
  "userId" TEXT NOT NULL,
  "contactName" TEXT NOT NULL,
  "contactPhone" TEXT,
  "contactEmail" TEXT,
  "notifyOnCrisis" BOOLEAN NOT NULL DEFAULT false,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "UserEmergencyContact_pkey" PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "AudioTrack" (
  "id" TEXT NOT NULL,
  "title" TEXT NOT NULL,
  "artist" TEXT,
  "durationSec" INTEGER NOT NULL,
  "audioUrl" TEXT NOT NULL,
  "waveformData" JSONB,
  "genre" TEXT,
  "isLicensed" BOOLEAN NOT NULL DEFAULT false,
  "usageCount" BIGINT NOT NULL DEFAULT 0,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "AudioTrack_pkey" PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "Reel" (
  "id" TEXT NOT NULL,
  "userId" TEXT NOT NULL,
  "videoUrl" TEXT,
  "rawVideoKey" TEXT,
  "thumbnailUrl" TEXT,
  "caption" TEXT,
  "audioTrackId" TEXT,
  "audioOffsetMs" INTEGER NOT NULL DEFAULT 0,
  "durationSec" INTEGER,
  "width" INTEGER,
  "height" INTEGER,
  "fileSizeBytes" BIGINT,
  "status" "ReelStatus" NOT NULL DEFAULT 'PENDING',
  "failReason" TEXT,
  "viewsCount" BIGINT NOT NULL DEFAULT 0,
  "likesCount" BIGINT NOT NULL DEFAULT 0,
  "commentsCount" BIGINT NOT NULL DEFAULT 0,
  "sharesCount" BIGINT NOT NULL DEFAULT 0,
  "hashtags" TEXT[] DEFAULT ARRAY[]::TEXT[],
  "isPublic" BOOLEAN NOT NULL DEFAULT true,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  "deletedAt" TIMESTAMP(3),
  CONSTRAINT "Reel_pkey" PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "ReelView" (
  "id" TEXT NOT NULL,
  "reelId" TEXT NOT NULL,
  "viewerId" TEXT,
  "viewedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "watchPct" INTEGER,
  "sessionId" TEXT,
  CONSTRAINT "ReelView_pkey" PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "ReelLike" (
  "reelId" TEXT NOT NULL,
  "userId" TEXT NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "ReelLike_pkey" PRIMARY KEY ("reelId","userId")
);

CREATE TABLE IF NOT EXISTS "ReelComment" (
  "id" TEXT NOT NULL,
  "reelId" TEXT NOT NULL,
  "userId" TEXT NOT NULL,
  "parentId" TEXT,
  "content" TEXT NOT NULL,
  "likesCount" INTEGER NOT NULL DEFAULT 0,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "deletedAt" TIMESTAMP(3),
  CONSTRAINT "ReelComment_pkey" PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "ReelShare" (
  "id" TEXT NOT NULL,
  "reelId" TEXT NOT NULL,
  "sharerId" TEXT NOT NULL,
  "shareType" "ShareType" NOT NULL,
  "targetId" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "ReelShare_pkey" PRIMARY KEY ("id")
);

CREATE INDEX IF NOT EXISTS "CallRoom_createdById_idx" ON "CallRoom"("createdById");
CREATE INDEX IF NOT EXISTS "CallParticipant_roomId_leftAt_idx" ON "CallParticipant"("roomId", "leftAt");
CREATE INDEX IF NOT EXISTS "CallParticipant_userId_roomId_idx" ON "CallParticipant"("userId", "roomId");
CREATE INDEX IF NOT EXISTS "CallParticipant_peerId_idx" ON "CallParticipant"("peerId");
CREATE INDEX IF NOT EXISTS "NoroConversation_userId_startedAt_idx" ON "NoroConversation"("userId", "startedAt");
CREATE INDEX IF NOT EXISTS "NoroConversation_deletedAt_idx" ON "NoroConversation"("deletedAt");
CREATE INDEX IF NOT EXISTS "NoroMessage_conversationId_createdAt_idx" ON "NoroMessage"("conversationId", "createdAt");
CREATE INDEX IF NOT EXISTS "NoroMessage_userId_createdAt_idx" ON "NoroMessage"("userId", "createdAt");
CREATE INDEX IF NOT EXISTS "NoroMessage_deletedAt_idx" ON "NoroMessage"("deletedAt");
CREATE INDEX IF NOT EXISTS "UserMoodProfile_lastUpdated_idx" ON "UserMoodProfile"("lastUpdated");
CREATE INDEX IF NOT EXISTS "UserMoodProfile_sourceConvId_idx" ON "UserMoodProfile"("sourceConvId");
CREATE INDEX IF NOT EXISTS "CrisisEvent_userId_createdAt_idx" ON "CrisisEvent"("userId", "createdAt");
CREATE INDEX IF NOT EXISTS "CrisisEvent_severity_createdAt_idx" ON "CrisisEvent"("severity", "createdAt");
CREATE INDEX IF NOT EXISTS "CrisisHotline_countryCode_language_isActive_idx" ON "CrisisHotline"("countryCode", "language", "isActive");
CREATE INDEX IF NOT EXISTS "UserEmergencyContact_userId_idx" ON "UserEmergencyContact"("userId");
CREATE INDEX IF NOT EXISTS "Reel_userId_createdAt_idx" ON "Reel"("userId", "createdAt");
CREATE INDEX IF NOT EXISTS "Reel_status_createdAt_idx" ON "Reel"("status", "createdAt");
CREATE INDEX IF NOT EXISTS "Reel_isPublic_status_createdAt_idx" ON "Reel"("isPublic", "status", "createdAt");
CREATE INDEX IF NOT EXISTS "Reel_audioTrackId_idx" ON "Reel"("audioTrackId");
CREATE INDEX IF NOT EXISTS "AudioTrack_usageCount_idx" ON "AudioTrack"("usageCount");
CREATE INDEX IF NOT EXISTS "AudioTrack_genre_idx" ON "AudioTrack"("genre");
CREATE INDEX IF NOT EXISTS "ReelView_reelId_viewedAt_idx" ON "ReelView"("reelId", "viewedAt");
CREATE INDEX IF NOT EXISTS "ReelView_viewerId_viewedAt_idx" ON "ReelView"("viewerId", "viewedAt");
CREATE INDEX IF NOT EXISTS "ReelView_sessionId_reelId_idx" ON "ReelView"("sessionId", "reelId");
CREATE INDEX IF NOT EXISTS "ReelLike_userId_createdAt_idx" ON "ReelLike"("userId", "createdAt");
CREATE INDEX IF NOT EXISTS "ReelComment_reelId_createdAt_idx" ON "ReelComment"("reelId", "createdAt");
CREATE INDEX IF NOT EXISTS "ReelComment_parentId_createdAt_idx" ON "ReelComment"("parentId", "createdAt");
CREATE INDEX IF NOT EXISTS "ReelComment_deletedAt_idx" ON "ReelComment"("deletedAt");
CREATE INDEX IF NOT EXISTS "ReelShare_reelId_createdAt_idx" ON "ReelShare"("reelId", "createdAt");
CREATE INDEX IF NOT EXISTS "ReelShare_sharerId_createdAt_idx" ON "ReelShare"("sharerId", "createdAt");

ALTER TABLE "CallRoom"
  ADD CONSTRAINT "CallRoom_createdById_fkey"
  FOREIGN KEY ("createdById") REFERENCES "User"("id")
  ON DELETE SET NULL ON UPDATE CASCADE;

ALTER TABLE "CallParticipant"
  ADD CONSTRAINT "CallParticipant_roomId_fkey"
  FOREIGN KEY ("roomId") REFERENCES "CallRoom"("id")
  ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "CallParticipant"
  ADD CONSTRAINT "CallParticipant_userId_fkey"
  FOREIGN KEY ("userId") REFERENCES "User"("id")
  ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "NoroConversation"
  ADD CONSTRAINT "NoroConversation_userId_fkey"
  FOREIGN KEY ("userId") REFERENCES "User"("id")
  ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "NoroMessage"
  ADD CONSTRAINT "NoroMessage_conversationId_fkey"
  FOREIGN KEY ("conversationId") REFERENCES "NoroConversation"("id")
  ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "NoroMessage"
  ADD CONSTRAINT "NoroMessage_userId_fkey"
  FOREIGN KEY ("userId") REFERENCES "User"("id")
  ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "UserMoodProfile"
  ADD CONSTRAINT "UserMoodProfile_userId_fkey"
  FOREIGN KEY ("userId") REFERENCES "User"("id")
  ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "UserMoodProfile"
  ADD CONSTRAINT "UserMoodProfile_sourceConvId_fkey"
  FOREIGN KEY ("sourceConvId") REFERENCES "NoroConversation"("id")
  ON DELETE SET NULL ON UPDATE CASCADE;

ALTER TABLE "CrisisEvent"
  ADD CONSTRAINT "CrisisEvent_userId_fkey"
  FOREIGN KEY ("userId") REFERENCES "User"("id")
  ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "CrisisEvent"
  ADD CONSTRAINT "CrisisEvent_messageId_fkey"
  FOREIGN KEY ("messageId") REFERENCES "NoroMessage"("id")
  ON DELETE SET NULL ON UPDATE CASCADE;

ALTER TABLE "UserEmergencyContact"
  ADD CONSTRAINT "UserEmergencyContact_userId_fkey"
  FOREIGN KEY ("userId") REFERENCES "User"("id")
  ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "Reel"
  ADD CONSTRAINT "Reel_userId_fkey"
  FOREIGN KEY ("userId") REFERENCES "User"("id")
  ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "Reel"
  ADD CONSTRAINT "Reel_audioTrackId_fkey"
  FOREIGN KEY ("audioTrackId") REFERENCES "AudioTrack"("id")
  ON DELETE SET NULL ON UPDATE CASCADE;

ALTER TABLE "ReelView"
  ADD CONSTRAINT "ReelView_reelId_fkey"
  FOREIGN KEY ("reelId") REFERENCES "Reel"("id")
  ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "ReelView"
  ADD CONSTRAINT "ReelView_viewerId_fkey"
  FOREIGN KEY ("viewerId") REFERENCES "User"("id")
  ON DELETE SET NULL ON UPDATE CASCADE;

ALTER TABLE "ReelLike"
  ADD CONSTRAINT "ReelLike_reelId_fkey"
  FOREIGN KEY ("reelId") REFERENCES "Reel"("id")
  ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "ReelLike"
  ADD CONSTRAINT "ReelLike_userId_fkey"
  FOREIGN KEY ("userId") REFERENCES "User"("id")
  ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "ReelComment"
  ADD CONSTRAINT "ReelComment_reelId_fkey"
  FOREIGN KEY ("reelId") REFERENCES "Reel"("id")
  ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "ReelComment"
  ADD CONSTRAINT "ReelComment_userId_fkey"
  FOREIGN KEY ("userId") REFERENCES "User"("id")
  ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "ReelComment"
  ADD CONSTRAINT "ReelComment_parentId_fkey"
  FOREIGN KEY ("parentId") REFERENCES "ReelComment"("id")
  ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "ReelShare"
  ADD CONSTRAINT "ReelShare_reelId_fkey"
  FOREIGN KEY ("reelId") REFERENCES "Reel"("id")
  ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "ReelShare"
  ADD CONSTRAINT "ReelShare_sharerId_fkey"
  FOREIGN KEY ("sharerId") REFERENCES "User"("id")
  ON DELETE CASCADE ON UPDATE CASCADE;
