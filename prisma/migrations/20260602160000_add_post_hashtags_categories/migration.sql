-- Post metadata columns (present in schema, missing from DB)
ALTER TABLE "Post" ADD COLUMN "hashtags" TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[];
ALTER TABLE "Post" ADD COLUMN "categories" TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[];
