# Ding Platform: Full System Use Case Documentation

**Prepared for: Graduation Project Documentation**

This document provides a comprehensive, deep-dive analysis of the entire backend system based on all 28 micro-modules and database schemas. It follows IEEE 830 standards for Use Case definitions and includes UML diagrams using Mermaid syntax.

---

## 1. System Actors

| Actor Name               | Description                                                                                              |
| ------------------------ | -------------------------------------------------------------------------------------------------------- |
| **Guest / Unregistered** | A visitor who has not yet authenticated. Can only access public landing pages and auth endpoints.        |
| **Regular User**         | An authenticated member who can post, chat, engage, and consume content.                                 |
| **Content Creator**      | A user who hosts live streams, creates reels, or publishes stories and pages.                            |
| **Seller**               | A user participating in the marketplace, capable of listing products and managing transactions.          |
| **Administrator**        | A platform moderator with high-level access to resolve reports, ban users, and monitor analytics.        |
| **Noro AI (System)**     | The automated mental health AI subsystem that monitors sentiment and interacts with users during crises. |
| **System**               | Scheduled cron jobs, backend processors, and graph sync mechanisms.                                      |

---

## 2. Global Level-0 Use Case Diagram

This diagram maps the high-level interactions between the primary actors and the core domains of the platform.

![Global Level-0 Use Case Diagram](<Use Cases/01-Global Level-0 Use Case Diagram.svg>)

---

## 3. Domain 1: Authentication & Identity Management

_(Modules: `auth`, `user`, `profile`, `session`, `privacy`)_

### Domain Diagram

![Domain 1: Authentication & Identity Management](<Use Cases/02-Domain 1: Authentication & Identity Management.svg>)

### IEEE Use Case Specifications

**UC-ID.1.1: Register & OTP Verification**

- **Actors:** Guest, System
- **Description:** A guest creates an account using email/password and verifies it via a One-Time Password.
- **Preconditions:** Email is not already registered.
- **Main Success Scenario:**
  1. Guest submits registration form.
  2. System generates OTP and sends email.
  3. Guest submits OTP.
  4. System verifies OTP, sets `emailVerified = true`, and creates `Profile` and `ProfilePrivacy` defaults.
- **Postconditions:** User account is active and authenticated.

**UC-ID.1.2: Configure Privacy Settings**

- **Actors:** User
- **Description:** User manages granular visibility for posts, bio, contact info, and messaging permissions.
- **Main Success Scenario:**
  1. User accesses settings.
  2. User modifies `postsVisibility` to 'FRIENDS'.
  3. System updates `ProfilePrivacy` table.
  4. Subsequent feed queries respect this visibility lock.

---

## 4. Domain 2: Content Creation & Engagement

_(Modules: `post`, `comment`, `like`, `stories`, `reels`, `feed`)_

### Domain Diagram

![Domain 2: Content Creation & Engagement](<Use Cases/03- Domain 2: Content Creation & Engagement.svg>)

### IEEE Use Case Specifications

**UC-CO.2.1: Publish Text/Media Post**

- **Actors:** User
- **Description:** User publishes a post containing text and optional Cloudinary media.
- **Main Success Scenario:**
  1. User submits post data.
  2. System creates `Post` record and `PostMedia` records.
  3. System fires async job to sync `POSTED` edge to Neo4j.
  4. System updates follower feeds.

**UC-CO.2.2: Upload & Trim Reel**

- **Actors:** Content Creator
- **Description:** Creator uploads a short-form video (Reel), applying a licensed `AudioTrack`.
- **Main Success Scenario:**
  1. Creator selects video and `AudioTrack`.
  2. System compresses video and extracts thumbnail.
  3. System creates `Reel` record.
  4. Reel is injected into the global Reels discovery feed.

---

## 5. Domain 3: Social Graph & Networking

_(Modules: `social`, `graph`, `interest`, `activity`, `search`)_

### Domain Diagram

![Domain 3: Social Graph & Networking](<Use Cases/04- Domain 3: Social Graph & Networking.svg>)

### IEEE Use Case Specifications

**UC-GR.3.1: Calculate Feed Affinity**

- **Actors:** System
- **Description:** The system continually recalculates relationship strength (affinity) in Neo4j based on interactions.
- **Main Success Scenario:**
  1. User likes a post.
  2. System creates `Like` in Postgres.
  3. `graph-sync.processor` merges an `INTERACTED_WITH` edge in Neo4j, incrementing the `score` by 1 and updating `lastInteraction`.
  4. The Feed algorithm uses this score to prioritize posts from highly-interacted users.

---

## 6. Domain 4: Real-Time Communication

_(Modules: `chat`, `call`, `notification`)_

### IEEE Use Case Specifications

**UC-CH.4.1: Direct Messaging & Reactions**

- **Actors:** User
- **Description:** Users chat in real-time, sending text, media, and emoji reactions.
- **Main Success Scenario:**
  1. User types message in a DIRECT `Room`.
  2. System saves `Message` to Postgres.
  3. System broadcasts WebSocket event to recipient.
  4. Recipient views message, triggering a `ReadReceipt`.
  5. Recipient long-presses to add a `MessageReaction`.

**UC-CH.4.2: WebRTC Video Call**

- **Actors:** User
- **Description:** User initiates a peer-to-peer video call.
- **Main Success Scenario:**
  1. Caller initiates call.
  2. System creates `CallRoom` and `CallParticipant` records.
  3. Signaling server exchanges WebRTC SDP offers/answers.
  4. Peer connection established.

---

## 7. Domain 5: Communities, Pages & Events

_(Modules: `groups`, `pages`, `events`, `streaming`)_

### IEEE Use Case Specifications

**UC-CM.5.1: Create and Manage a Page**

- **Actors:** Content Creator
- **Description:** Creator builds a public-facing Page for a brand or public figure.
- **Main Success Scenario:**
  1. Creator inputs Page details.
  2. System creates `Page` and assigns Creator as `PageMember` with ADMIN role.
  3. Creator publishes a `PagePost`.
  4. Users follow the Page, creating `PageFollow` records.

**UC-CM.5.2: Host Live Stream Event**

- **Actors:** Creator, User
- **Description:** Creator hosts a live stream connected to an RSVP'd `Event`.
- **Main Success Scenario:**
  1. Creator creates an `Event`.
  2. Users click RSVP (`EventAttendee`).
  3. At start time, Creator initiates `LiveStream`.
  4. System sends push notifications to attendees.
  5. Users join the stream.

---

## 8. Domain 6: Marketplace & Commerce

_(Modules: `marketplace`)_

### Domain Diagram

![Domain 6: Marketplace & Commerce](<Use Cases/05- Domain 6: Marketplace & Commerce.svg>)

### IEEE Use Case Specifications

**UC-MK.6.1: Purchase via Escrow**

- **Actors:** Buyer, Seller
- **Description:** Buyer purchases an item; funds are held until delivery confirmation.
- **Main Success Scenario:**
  1. Buyer checks out `Product`.
  2. System creates `Order` and deducts inventory.
  3. Payment is held in Escrow (status PENDING).
  4. Seller ships product.
  5. Buyer marks as DELIVERED.
  6. System creates `DealLog` and releases funds to Seller.

---

## 9. Domain 7: Safety, AI & Mental Health (Noro Core)

_(Modules: `noro`, `sentiment`, `moderation`, `analytics`)_

### Domain Diagram

![Domain 7: Safety, AI & Mental Health](<Use Cases/06- Domain 7: Safety, AI & Mental Health (Noro Core).svg>)

### IEEE Use Case Specifications

**UC-SF.7.1: AI Sentiment Analysis & Noro Intervention**

- **Actors:** Noro AI, User
- **Description:** The system analyzes post content for negative sentiment and dispatches the Noro conversational AI to assist the user.
- **Main Success Scenario:**
  1. User posts text.
  2. `sentiment` module evaluates text, logging `ContentSentiment` and updating `UserMoodProfile`.
  3. Score drops below threshold.
  4. `noro` module creates a `NoroConversation`.
  5. Noro AI sends an initial supportive `NoroMessage`.
  6. User responds; AI provides cognitive behavioral coping strategies or `CrisisHotline` contacts.

**UC-SF.7.2: Resolve Moderation Report**

- **Actors:** Administrator, User
- **Description:** Admin processes a user-submitted report for a TOS violation.
- **Main Success Scenario:**
  1. User reports a post.
  2. System logs `Report`.
  3. Admin views dashboard.
  4. Admin confirms violation.
  5. Post is soft-deleted (`isDeleted=true`), warning issued to author, and report marked RESOLVED.
