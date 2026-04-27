# Sprint 11: Video Posts & Enhanced Noro

## Overview

Implemented Context-Aware Chat and Voice capabilities for Noro.

## Features

### 1. Enhanced Noro (`src/modules/noro`)

- **Contextual Chat**: `chat` method now includes last 10 messages from `NoroChat` history in the prompt to Ollama.
- **Voice**:
  - `POST /noro/transcribe`: Accepts audio file, returns mock transcription.
  - `POST /noro/speak`: Accepts text, returns mock audio URL.

### 2. Video Posts

- **Strategy**:
  - Utilizing existing Cloudinary integration.
  - Video uploads already return URLs.
  - For HLS/DASH, frontend can request transformed URLs (e.g., changing extension to `.m3u8` or using Cloudinary SDK). Backend supports storing `publicId` (via `PostMedia`), enabling these transformations.

## Verification

- `_test/verify-noro-enhanced.js`: Tests chat history context and voice endpoints.

## Next Steps

- **Sprint 12**: Performance & Caching (Redis caching for feed, optimizing queries).
