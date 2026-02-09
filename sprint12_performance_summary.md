# Sprint 12: Performance & Caching

## Overview

Implemented Redis caching for the Feed, and enabled global Rate Limiting.

## Features

### 1. Redis Caching (`src/modules/feed`)

- **FeedService**:
  - `getFeed` is now cached in Redis for 60 seconds.
  - Key: `feed:{userId}:{type}:{page}:{limit}`.
  - Improves response time for repeated feed requests.

### 2. Rate Limiting (`src/main.ts`)

- **Global Rate Limiting**:
  - Enabled `express-rate-limit` in all environments (previously Prod only).
  - Default: 100 requests per 60 seconds (configurable via env).

## Verification

- `_test/verify-cache.js`: Measures response time of 1st call (cache miss) vs 2nd call (cache hit).

## Next Steps

- **Sprint 13**: Marketplace (Product Listings, Transactions).
