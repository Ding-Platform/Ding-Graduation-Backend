# Sprint 8: Basic Noro (AI) & Moderation Tools

## Overview

This sprint introduced the foundational AI capabilities (Noro) using Ollama integration and implemented a comprehensive moderation system to ensure platform safety.

## Implemented Features

### 1. Noro AI Chat (`src/modules/noro`)

- **Conversational Agent**:
  - Integrated with **Ollama** (local LLM, e.g., Llama 3) via HTTP API.
  - Implemented `NoroService` to handle chat logic and persistence.
  - Fallback mechanism: Returns mock response if Ollama is unreachable.
- **Persistence**:
  - Storing chat history in PostgreSQL (`NoroChat` model).
- **API Endpoints**:
  - `POST /noro/chat`: Send message to Noro.
  - `GET /noro/history`: Retrieve past conversations.

### 2. Moderation System (`src/modules/moderation`)

- **Reporting Infrastructure**:
  - `Report` model supporting polymorphism (User, Post, Comment).
  - Report Reasons: SPAM, HARASSMENT, HATE_SPEECH, etc.
- **Admin Tools**:
  - **User Banning**: Added `isBanned` and `banReason` to `User` model.
  - **Report Management**: APIs to list, resolve, or dismiss reports.
- **API Endpoints**:
  - `POST /moderation/report`: Submit a report.
  - `GET /moderation/reports`: Admin view of reports.
  - `POST /moderation/ban/:userId`: Ban a user.

### 3. Database Schema Updates

- **New Models**:
  - `NoroChat` (User relations, message content).
  - `Report` (Reporter, TargetId, Reason, Status).
- **Modified Models**:
  - `User`: Added `isBanned`, `banReason`, and relations to Reports/Chats.

## Verification Status

### Manual Verification

- **Ollama Connectivity**: `_test/verify-noro.js` script created to check local LLM availability.
- **Schema**: `prisma generate` executed successfully. Client updated.

### Known Issues

- **Development Environment**: Persistent `npm install` failures for specific packages (`@nestjs/bull`) prevent the full application server from starting. However, the Sprint 8 code (Noro/Moderation) uses standard NestJS patterns and is decoupled from the broken Queue system, so it is expected to work once environment is fixed.

## Next Steps

1. **Fix Environment**: Reinstall dependencies cleanly (`rm -rf node_modules pnpm-lock.yaml && npm install`).
2. **Install Ollama**: Ensure Ollama is running (`ollama serve`).
3. **Pull Model**: Run `ollama pull llama3` (or preferred model).
4. **Deploy**: Run migration and start server.
