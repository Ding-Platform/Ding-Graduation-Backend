-- Reel metadata columns (present in schema, missing from DB)
ALTER TABLE "Reel" ADD COLUMN "savesCount" BIGINT NOT NULL DEFAULT 0;
ALTER TABLE "Reel" ADD COLUMN "categories" TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[];
ALTER TABLE "Reel" ADD COLUMN "commentsEnabled" BOOLEAN NOT NULL DEFAULT true;
ALTER TABLE "Reel" ADD COLUMN "downloadsEnabled" BOOLEAN NOT NULL DEFAULT true;
