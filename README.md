# Ding Platform Backend

A comprehensive, microservice-ready social networking backend built with **NestJS**. The platform utilizes a highly scalable **Hybrid Database Architecture** (PostgreSQL + Neo4j) to deliver personalized feeds, massive scale social networking features, and AI-driven user health monitoring.

---

## 🏗️ Core Architecture & Data Flow

### The Hybrid Database System
To guarantee both data integrity and ultra-fast social graph traversals, we utilize a dual-database approach:
1. **PostgreSQL (via Prisma)**: The absolute source of truth. Handles structured data, financial records (marketplace), content storage, and user identities.
2. **Neo4j**: Handles recursive queries. Computing mutual friends, degrees of separation, and friend-of-friend post visibility is impossible to scale on SQL. Neo4j acts as our dedicated Social Graph.
3. **Graph Synchronization**: To prevent latency during API requests, Postgres and Neo4j are synced **asynchronously**. When a user creates a Post or adds a Friend, the Postgres transaction completes immediately. A BullMQ worker (`graph-sync`) picks up the job and silently mirrors the update to Neo4j in the background.

### Real-Time Infrastructure
- **Redis**: The backbone for real-time state. Handles Session invalidations, WebSocket pub/sub, WebRTC signaling state (Call Offer/Answers), and live Trending Hashtag leaderboards via Redis Sorted Sets.
- **WebSockets (Socket.io)**: Powers Live Chat, Notifications, WebRTC Calling, and Live Streaming chat rooms.

---

## 📦 System Modules & Flows

The backend is modularized into 27 specific domains.

### 1. Core Identity & Accounts
- **`AuthModule`**: Handles JWT issuance, Google OAuth2 integration, password reset tokens, and Route Guards.
- **`UserModule`**: Manages account lifecycles, global roles (User, Admin, Seller), and emergency contacts.
- **`ProfileModule`**: Handles Cloudinary avatar uploads, bios, and public-facing user metadata.
- **`SessionModule`**: Active device tracking. Allows users to remotely revoke access to specific logged-in devices via Redis token blacklisting.
- **`PrivacyModule`**: Enforces audience controls. Every post/reel is guarded by `Public`, `Friends Only`, or `Private` flags, which are checked before serving content to a requester.

### 2. Social Graph & Discovery
- **`SocialModule`**: Core friend/follow logic. Handles "Follow", "Unfollow", "Friend Request", "Accept", and "Block" actions.
- **`GraphModule`**: Houses the BullMQ workers that listen to the `SocialModule` and `PostModule` to mirror edges (e.g., `(User)-[:FRIENDS_WITH]->(User)`) into Neo4j.
- **`SearchModule`**: Global search across all entities. Actively maintains a **Trending Hashtags** leaderboard by querying Redis `ZSET`s that are incremented on every post/reel interaction.
- **`FeedModule` (The Brain)**: Aggregates content for the user. Uses Neo4j to find highly relevant content from friends/follows, falls back to chronological queries, and applies heavy scoring multipliers using the Sentiment and Interest engines (see below).

### 3. Core Content
- **`PostModule`**: Standard text and media updates. Supports pagination, saving, and interaction tracking.
- **`ReelsModule`**: Short-form video architecture. Tracks deep metrics including "Dwell Time" and "Watch Percentage".
- **`StoriesModule`**: Ephemeral 24-hour content. Automatically filters out expired stories during queries.
- **`CommentModule` & `LikeModule`**: Generic, polymorphic reaction systems that attach to Posts, Reels, and Stories. Supports nested hierarchical comment threads.

### 4. Advanced Ecosystem
- **`MarketplaceModule`**: A full e-commerce flow. Users apply to be "Verified Sellers". The `Admin` role approves applications. Sellers can list products, manage inventory, and process order life-cycles.
- **`GroupsModule` & `PagesModule`**: Community hubs and Business profiles with their own localized feeds, member roles (Admin/Moderator/Member), and privacy gates.
- **`EventsModule`**: Social gatherings, ticketing, RSVPs, and integration with Groups.

### 5. Real-Time & Communication
- **`ChatModule`**: 1-on-1 and Group messaging. Features Read Receipts, typing indicators, and online status tracked via Redis.
- **`CallModule`**: A complete WebRTC signaling server. Uses WebSockets to exchange Session Description Protocols (SDP) and ICE candidates for peer-to-peer Audio/Video calls.
- **`StreamingModule`**: Live video broadcasting rooms.
- **`NotificationModule`**: Dispatches real-time alerts for interactions, and pushes background emails via SMTP.

### 6. AI Intelligence & User Well-being
- **`SentimentModule`**: An NLP engine running in background queues. Every post, comment, and reel caption is tokenized against a dictionary to calculate a **0 to 100 positive/negative score**. It updates the creator's `UserMoodProfile`.
- **`InterestModule`**: The Affinity tracker. Logs what a user Likes, Comments on, and how long they *Dwell* (>10 seconds) on content. Builds a `UserInterest` profile based on extracted Hashtags and Categories.
- **`NoroModule`**: The automated AI Intervention system. If a user's Negative Sentiment Score crosses a `70 point threshold`, Noro automatically dispatches a wellness check-in message and activates a `feedBoost` flag.
- **The Feed Engine Result**: When `feedBoost` is active, the `FeedModule` actively penalizes negatively-scored content and boosts positively-scored content to help improve the user's mood. Concurrently, it multiplies the score of posts that match the user's `InterestModule` affinity tags.
- **`ModerationModule`**: Automated blocking of NSFW/banned keywords and reporting flows for human admins.

### 7. Analytics
- **`AnalyticsModule`**: Aggregates platform usage, reel views, post interactions, and demographic data for the Admin dashboard.

---

## 🚀 Quick Start & Deployment

### Prerequisites
- Node.js 20+
- pnpm
- Docker & Docker Compose (for local development)

### Local Development with Docker (Recommended)
```bash
git clone <repository-url>
cd Ding-Platform-Backend

cp .env.example .env

# Start Postgres, Neo4j, Redis, and BullMQ Dashboard
./_run_Scripts/docker-dev.sh start

# Start the NestJS Backend
pnpm install
pnpm prisma generate
pnpm prisma migrate dev
pnpm run start:dev
```

### Accessing Services Locally
- **Backend API**: `http://localhost:3000`
- **Swagger Docs**: `http://localhost:3000/api/docs`
- **Prisma Studio**: `npx prisma studio`
- **Neo4j Browser**: `http://localhost:7474` (neo4j / password)

---

## 📚 Documentation & Postman

- **Postman Collection**: The repository includes an auto-generated Postman collection `_test/postman/Ding-Platform-Full-API.postman_collection.json`. It is synchronized directly from the controllers using `python3 _test/postman/update_postman.py`. It contains all 250+ routes, perfectly formatted.
- **Deployment**: See `_run_Scripts/RENDER_DEPLOYMENT.md` for our Render.com Blueprint setup.

## 🔒 Security Posture
- **Auth**: JWT-based authentication + Bcrypt hashing.
- **Throttling**: Redis-backed rate limiting (100 req/min).
- **Guards**: Class-validator DTOs strictly sanitize all inputs to prevent NoSQL/SQL injection and XSS.
- **Helmet**: Secures HTTP headers.

---
*Built by the Ding Platform Engineering Team.*
