-- Reels + Facebook parity notification types (present in schema, missing from DB enum)
ALTER TYPE "NotificationType" ADD VALUE 'REEL_LIKE';
ALTER TYPE "NotificationType" ADD VALUE 'REEL_COMMENT';
ALTER TYPE "NotificationType" ADD VALUE 'REEL_SHARE';
ALTER TYPE "NotificationType" ADD VALUE 'NEW_MESSAGE';
ALTER TYPE "NotificationType" ADD VALUE 'NEW_LOGIN';
ALTER TYPE "NotificationType" ADD VALUE 'ACCOUNT_UPDATE';
ALTER TYPE "NotificationType" ADD VALUE 'MARKETPLACE_ORDER';
ALTER TYPE "NotificationType" ADD VALUE 'MARKETPLACE_REVIEW';
