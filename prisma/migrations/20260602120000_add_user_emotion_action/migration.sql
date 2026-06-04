-- CreateTable
CREATE TABLE "UserEmotionAction" (
  "id" TEXT NOT NULL,
  "userId" TEXT NOT NULL,
  "trigger" TEXT NOT NULL,
  "actions" JSONB NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT "UserEmotionAction_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "UserEmotionAction_userId_createdAt_idx" ON "UserEmotionAction"("userId", "createdAt");

-- AddForeignKey
ALTER TABLE "UserEmotionAction" ADD CONSTRAINT "UserEmotionAction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
