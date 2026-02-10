# Ding Platform - Database Setup Guide

This guide explains how to set up all databases and seed test data for the Ding Platform.

## Prerequisites

Make sure you have the following installed and running:

### 1. PostgreSQL

```bash
# Fedora
sudo dnf install postgresql postgresql-server
sudo postgresql-setup --initdb
sudo systemctl start postgresql
sudo systemctl enable postgresql

# Create database
sudo -u postgres psql
CREATE DATABASE ding_db;
CREATE USER your_user WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE ding_db TO your_user;
\q
```

### 2. Neo4j

```bash
# Using Docker (recommended)
docker run -d \
  --name neo4j \
  -p 7474:7474 -p 7687:7687 \
  -e NEO4J_AUTH=neo4j/your_password \
  neo4j:latest

# Or install directly on Fedora:
# https://neo4j.com/docs/operations-manual/current/installation/linux/rpm/
```

### 3. MongoDB

```bash
# Fedora
sudo dnf install mongodb-org
sudo systemctl start mongod
sudo systemctl enable mongod

# Or using Docker:
docker run -d \
  --name mongodb \
  -p 27017:27017 \
  mongo:latest
```

### 4. Node.js & pnpm

```bash
# Install Node.js (v18+)
sudo dnf install nodejs

# Install pnpm
npm install -g pnpm
```

---

## Quick Setup (Automated)

Run the automated setup script:

```bash
# Make script executable
chmod +x setup-and-seed.sh

# Run the setup
./setup-and-seed.sh
```

---

## Manual Setup (Step by Step)

### Step 1: Configure Environment

```bash
# Copy example env file
cp .env.example .env

# Edit with your values
nano .env
```

Required environment variables:

```env
# PostgreSQL
DATABASE_URL=postgresql://username:password@localhost:5432/ding_db

# Neo4j
NEO4J_URI=bolt://localhost:7687
NEO4J_AUTH=neo4j/your_password

# MongoDB (for Chat)
MONGODB_URI=mongodb://localhost:27017
MONGODB_DB_NAME=ding_chat

# JWT Secret (generate a random string)
JWT_SECRET=your-super-secret-jwt-key

# Other required vars (see .env.example)
```

### Step 2: Install Dependencies

```bash
pnpm install
```

### Step 3: Generate Prisma Client

```bash
npx prisma generate
```

### Step 4: Run PostgreSQL Migrations

```bash
# For development (creates migrations)
npx prisma migrate dev

# For production (applies existing migrations)
npx prisma migrate deploy
```

### Step 5: Seed PostgreSQL & Neo4j

This creates 1000 users, profiles, and social relationships:

```bash
npx ts-node --project tsconfig.json prisma/seed.ts
```

**Expected output:**

```
🚀 Starting database seed...

📡 Connecting to Neo4j...
✅ Neo4j connected

📡 Connecting to PostgreSQL...
✅ PostgreSQL connected

🌱 Starting seed: Creating 1000 users with profiles and Neo4j nodes...

📦 Processing batch 1/10 (100 users)...
✅ Batch 1/10 completed: 100/1000 users created
...
✅ Batch 10/10 completed: 1000/1000 users created

🎉 Successfully created 1000 users with profiles and Neo4j nodes!

👨‍💻 Creating 3 developer account(s)...
✅ Created developer: Ziad Hamdy
✅ Created developer: Ziad
✅ Created developer: Zack River

🔗 Creating relationships...
✅ Created friend relationships
✅ Created follow relationships

🎉 Database seed completed successfully!
```

### Step 6: Seed MongoDB (Chat Data)

```bash
npx ts-node --project tsconfig.json prisma/seed-chat.ts
```

**Expected output:**

```
🚀 Starting Chat Module Seed...

📡 Connecting to MongoDB...
✅ MongoDB connected

🗑️  Clearing existing chat data...
✅ Chat data cleared

📋 Creating indexes...
✅ Indexes created

📡 Fetching users from PostgreSQL...
✅ Found 200 users

💬 Creating direct rooms...
  Created 10/50 direct rooms...
  Created 20/50 direct rooms...
  ...
✅ Created 50 direct rooms

👥 Creating group rooms...
  Created 5/20 group rooms...
  ...
✅ Created 20 group rooms

👨‍💻 Creating chats for developers...
✅ Created developer team chat

📊 Seed Statistics:

  📦 Rooms:           71
     - Direct:        50
     - Group:         21
  👥 Memberships:     250
  💬 Messages:        1500
  ❤️  Reactions:       300
  ✅ Read Receipts:   1200
  📌 Pinned Messages: 15

🎉 Chat seed completed successfully!
```

### Step 7: Seed Posts (Optional)

```bash
npx ts-node --project tsconfig.json prisma/seed-posts.ts
```

---

## Verify Setup

### Check PostgreSQL

```bash
npx prisma studio
# Opens browser at http://localhost:5555
```

### Check Neo4j

Open browser at: http://localhost:7474

- Username: neo4j
- Password: your_password

Run query:

```cypher
MATCH (u:User) RETURN count(u) as userCount
```

### Check MongoDB

```bash
mongosh
use ding_chat
db.rooms.countDocuments()
db.messages.countDocuments()
```

---

## Start the Application

```bash
# Development mode
pnpm start:dev

# Production mode
pnpm build
pnpm start:prod
```

---

## Test Accounts

After seeding, you can login with these developer accounts:

| Email                       | Password         |
| --------------------------- | ---------------- |
| ziadhamdy667@gmail.com      | Password#1       |
| ziad.fathi.seleem@gmail.com | Ziad@123         |
| zackriver.dev@gmail.com     | \*A01201024880z# |

Regular test users all have password: `password123`

---

## Troubleshooting

### PostgreSQL Connection Failed

```bash
# Check if PostgreSQL is running
sudo systemctl status postgresql

# Check connection
psql -h localhost -U your_user -d ding_db
```

### Neo4j Connection Failed

```bash
# If using Docker
docker logs neo4j
docker restart neo4j

# Check if port is open
nc -zv localhost 7687
```

### MongoDB Connection Failed

```bash
# Check if MongoDB is running
sudo systemctl status mongod

# Check connection
mongosh --eval "db.runCommand({ connectionStatus: 1 })"
```

### Prisma Errors

```bash
# Reset the database (WARNING: deletes all data)
npx prisma migrate reset

# Regenerate client
npx prisma generate
```

---

## Database Overview

| Database   | Purpose      | Collections/Tables                                                       |
| ---------- | ------------ | ------------------------------------------------------------------------ |
| PostgreSQL | Core data    | users, profiles, posts, comments, likes, sessions, notifications         |
| Neo4j      | Social graph | User nodes, FRIENDS, FOLLOWS, FRIEND_REQUEST relationships               |
| MongoDB    | Chat         | rooms, room_members, messages, reactions, read_receipts, pinned_messages |
