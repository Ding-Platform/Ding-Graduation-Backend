-- CreateEnum
CREATE TYPE "AuditAction" AS ENUM (
  'POST_CREATE',
  'POST_UPDATE',
  'POST_DELETE',
  'POST_VIEW',
  'POST_LIKE',
  'POST_UNLIKE',
  'POST_SAVE',
  'POST_SHARE',
  'COMMENT_CREATE',
  'COMMENT_UPDATE',
  'COMMENT_DELETE',
  'COMMENT_LIKE',
  'REEL_VIEW',
  'REEL_LIKE',
  'REEL_UNLIKE',
  'REEL_COMMENT',
  'REEL_SHARE',
  'VIDEO_WATCH',
  'SEARCH_QUERY',
  'CHAT_MESSAGE_SEND',
  'CHAT_MESSAGE_EDIT',
  'CHAT_REACTION',
  'FOLLOW_USER',
  'UNFOLLOW_USER',
  'PROFILE_VIEW',
  'STORY_VIEW'
);

-- CreateTable
CREATE TABLE "UserAuditLog" (
  "id" TEXT NOT NULL,
  "userId" TEXT NOT NULL,
  "sessionId" TEXT,
  "action" "AuditAction" NOT NULL,
  "targetType" TEXT,
  "targetId" TEXT,
  "textSnapshot" TEXT,
  "metadata" JSONB,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT "UserAuditLog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "UserAuditLog_userId_createdAt_idx" ON "UserAuditLog"("userId", "createdAt");

-- CreateIndex
CREATE INDEX "UserAuditLog_action_createdAt_idx" ON "UserAuditLog"("action", "createdAt");

-- CreateIndex
CREATE INDEX "UserAuditLog_targetType_targetId_idx" ON "UserAuditLog"("targetType", "targetId");

-- AddForeignKey
ALTER TABLE "UserAuditLog" ADD CONSTRAINT "UserAuditLog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
