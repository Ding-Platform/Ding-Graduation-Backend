# Sprint 9: Bookmarks & Advanced Feed

## Overview

Implemented bookmarking functionality and advanced feed algorithms (Home, Following, Explore).

## Features

### 1. Bookmarks (`src/modules/post`)

- **Schema**: Added `SavedPost` model.
- **Endpoints**:
  - `POST /posts/:id/save`: Toggle save status.
  - `GET /posts/saved`: List saved posts.
  - `GET /posts/:id/history`: View edit history.

### 2. Advanced Feed (`src/modules/feed`)

- **Endpoints**:
  - `GET /feed?type=HOME`: Ranked feed (Neo4j).
  - `GET /feed?type=FOLLOWING`: Chronological feed from followed users.
  - `GET /feed?type=EXPLORE`: Popular posts from non-followed users.
- **Logic**:
  - `HOME`: Engagement-based ranking + Time decay.
  - `FOLLOWING`: Strict filtering for followed users.
  - `EXPLORE`: Queries posts from users _not_ connected by `FOLLOWS`.

## Verification Scripts

- `_test/verify-bookmarks.js`: Test script for saving/retrieving posts (requires running server).

## Next Steps

- Run `npm install` to fix environment.
- Start Neo4j.
- Run `npx prisma migrate dev` (or `push`).
- Start server.
