/**
 * Chat Module MongoDB Seeder
 * Seeds test data for chat rooms, messages, reactions, and read receipts
 */

import { MongoClient, Db, ObjectId } from 'mongodb';
import { PrismaClient } from '@prisma/client';
import { get } from 'env-var';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const prisma = new PrismaClient();

// MongoDB connection
let mongoClient: MongoClient;
let db: Db;

// Collection names
const ROOMS_COLLECTION = 'rooms';
const ROOM_MEMBERS_COLLECTION = 'room_members';
const MESSAGES_COLLECTION = 'messages';
const MESSAGE_REACTIONS_COLLECTION = 'message_reactions';
const READ_RECEIPTS_COLLECTION = 'read_receipts';
const PINNED_MESSAGES_COLLECTION = 'pinned_messages';

// Sample messages for different contexts
const greetings = [
  'Hey! How are you?',
  'Hi there! 👋',
  'Hello! Long time no see!',
  "Hey, what's up?",
  'Good morning! ☀️',
  'Hello! How have you been?',
];

const replies = [
  "I'm doing great, thanks for asking!",
  'Pretty good! How about you?',
  'All good here! 😊',
  "Can't complain! What about you?",
  'Great! Just been busy with work.',
];

const conversations = [
  'Did you see the news today?',
  'What do you think about the new project?',
  'Have you tried the new restaurant downtown?',
  'Are you coming to the meetup this weekend?',
  'Did you finish reading that book?',
  'How was your vacation?',
  'What are you working on these days?',
  'Any plans for the holidays?',
  'Did you watch the game last night?',
  'What do you think about the weather?',
];

const longMessages = [
  "I've been thinking about this for a while now, and I believe we should focus more on user engagement and retention strategies. What do you think about implementing a loyalty program?",
  'Just finished the documentation for the new feature. It includes all the API endpoints, request/response formats, and examples. Let me know if you need any clarifications!',
  'Thanks for sharing that article! It was really insightful, especially the part about microservices architecture. I think we can apply some of those principles to our current project.',
];

const emojis = ['👍', '❤️', '😂', '😮', '😢', '😡', '🎉', '🔥', '👏', '💯'];

const groupNames = [
  'Project Alpha Team',
  'Weekend Warriors',
  'Study Group',
  'Tech Enthusiasts',
  'Music Lovers',
  'Book Club',
  'Fitness Squad',
  'Gaming Buddies',
  'Food Network',
  'Travel Adventures',
  'Photography Club',
  'Developer Community',
];

const groupDescriptions = [
  'Discussing all things related to our project',
  'Planning fun activities for weekends',
  'Helping each other learn and grow',
  'Sharing tech news and updates',
  'For all music enthusiasts',
  'Discussing our favorite books',
  'Motivation and fitness tips',
  'Gaming sessions and discussions',
  'Sharing recipes and food photos',
  'Travel tips and experiences',
  'Sharing amazing photographs',
  'Code, collaborate, create',
];

// Helper functions
function getRandomElement<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

function getRandomElements<T>(array: T[], count: number): T[] {
  const shuffled = [...array].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, Math.min(count, shuffled.length));
}

function getRandomDate(daysAgo: number = 30): Date {
  const now = new Date();
  const pastDate = new Date(now.getTime() - daysAgo * 24 * 60 * 60 * 1000);
  return new Date(
    pastDate.getTime() + Math.random() * (now.getTime() - pastDate.getTime()),
  );
}

function getRandomDateAfter(after: Date, maxHoursLater: number = 48): Date {
  const laterTime =
    after.getTime() + Math.random() * maxHoursLater * 60 * 60 * 1000;
  return new Date(Math.min(laterTime, Date.now()));
}

async function connectMongo(): Promise<void> {
  const mongoUri = get('MONGODB_URI')
    .default('mongodb://localhost:27017')
    .asString();
  const dbName = get('MONGODB_DB_NAME').default('ding_chat').asString();

  console.log('📡 Connecting to MongoDB...');
  mongoClient = new MongoClient(mongoUri);
  await mongoClient.connect();
  db = mongoClient.db(dbName);
  console.log('✅ MongoDB connected\n');
}

async function clearChatData(): Promise<void> {
  console.log('🗑️  Clearing existing chat data...');

  await db.collection(MESSAGE_REACTIONS_COLLECTION).deleteMany({});
  await db.collection(READ_RECEIPTS_COLLECTION).deleteMany({});
  await db.collection(PINNED_MESSAGES_COLLECTION).deleteMany({});
  await db.collection(MESSAGES_COLLECTION).deleteMany({});
  await db.collection(ROOM_MEMBERS_COLLECTION).deleteMany({});
  await db.collection(ROOMS_COLLECTION).deleteMany({});

  console.log('✅ Chat data cleared\n');
}

async function createIndexes(): Promise<void> {
  console.log('📋 Creating indexes...');

  // Messages indexes
  await db
    .collection(MESSAGES_COLLECTION)
    .createIndex({ roomId: 1, createdAt: -1 });
  await db.collection(MESSAGES_COLLECTION).createIndex({ userId: 1 });
  await db
    .collection(MESSAGES_COLLECTION)
    .createIndex({ roomId: 1, userId: 1 });

  // Room members indexes
  await db
    .collection(ROOM_MEMBERS_COLLECTION)
    .createIndex({ roomId: 1, userId: 1 }, { unique: true });
  await db
    .collection(ROOM_MEMBERS_COLLECTION)
    .createIndex({ userId: 1, leftAt: 1 });

  // Rooms indexes
  await db.collection(ROOMS_COLLECTION).createIndex({ lastMessageAt: -1 });
  await db.collection(ROOMS_COLLECTION).createIndex({ type: 1 });

  // Reactions index
  await db
    .collection(MESSAGE_REACTIONS_COLLECTION)
    .createIndex({ messageId: 1, userId: 1, emoji: 1 }, { unique: true });

  // Read receipts index
  await db
    .collection(READ_RECEIPTS_COLLECTION)
    .createIndex({ messageId: 1, userId: 1 }, { unique: true });

  console.log('✅ Indexes created\n');
}

async function seedDirectRooms(userIds: string[]): Promise<void> {
  console.log('💬 Creating direct rooms...');

  if (userIds.length < 2) {
    console.log('⚠️  Not enough users for direct rooms\n');
    return;
  }

  const roomsToCreate = Math.min(
    10,
    Math.floor((userIds.length * (userIds.length - 1)) / 4),
  );
  const createdPairs = new Set<string>();

  for (let i = 0; i < roomsToCreate; i++) {
    let user1: string, user2: string;
    let attempts = 0;

    do {
      user1 = getRandomElement(userIds);
      user2 = getRandomElement(userIds);
      attempts++;
    } while (
      (user1 === user2 ||
        createdPairs.has(`${user1}-${user2}`) ||
        createdPairs.has(`${user2}-${user1}`)) &&
      attempts < 100
    );

    if (user1 === user2) continue;
    createdPairs.add(`${user1}-${user2}`);

    const roomCreatedAt = getRandomDate(60);
    const now = new Date();

    // Create room
    const roomResult = await db.collection(ROOMS_COLLECTION).insertOne({
      type: 'DIRECT',
      createdById: user1,
      createdAt: roomCreatedAt,
      updatedAt: now,
    });

    const roomId = roomResult.insertedId.toHexString();

    // Add members
    await db.collection(ROOM_MEMBERS_COLLECTION).insertMany([
      {
        roomId,
        userId: user1,
        role: 'MEMBER',
        isMuted: false,
        isArchived: false,
        joinedAt: roomCreatedAt,
        createdAt: roomCreatedAt,
        updatedAt: now,
      },
      {
        roomId,
        userId: user2,
        role: 'MEMBER',
        isMuted: false,
        isArchived: false,
        joinedAt: roomCreatedAt,
        createdAt: roomCreatedAt,
        updatedAt: now,
      },
    ]);

    // Create conversation
    await createConversation(
      roomId,
      [user1, user2],
      roomCreatedAt,
      Math.floor(Math.random() * 8) + 3,
    );

    if ((i + 1) % 10 === 0) {
      console.log(`  Created ${i + 1}/${roomsToCreate} direct rooms...`);
    }
  }

  console.log(`✅ Created ${roomsToCreate} direct rooms\n`);
}

async function seedGroupRooms(userIds: string[]): Promise<void> {
  console.log('👥 Creating group rooms...');

  if (userIds.length < 3) {
    console.log('⚠️  Not enough users for group rooms\n');
    return;
  }

  const groupsToCreate = Math.min(5, Math.floor(userIds.length / 5));

  for (let i = 0; i < groupsToCreate; i++) {
    const memberCount = Math.floor(Math.random() * 15) + 3; // 3-17 members
    const members = getRandomElements(userIds, memberCount);
    const creator = members[0];
    const roomCreatedAt = getRandomDate(90);
    const now = new Date();

    // Create room
    const roomResult = await db.collection(ROOMS_COLLECTION).insertOne({
      type: 'GROUP',
      name: groupNames[i % groupNames.length],
      description: groupDescriptions[i % groupDescriptions.length],
      imageUrl: `https://picsum.photos/200/200?random=group${i}`,
      createdById: creator,
      createdAt: roomCreatedAt,
      updatedAt: now,
    });

    const roomId = roomResult.insertedId.toHexString();

    // Add members
    const memberDocs = members.map((userId, idx) => ({
      roomId,
      userId,
      role:
        idx === 0
          ? 'ADMIN'
          : idx < 3 && Math.random() > 0.5
            ? 'MODERATOR'
            : 'MEMBER',
      isMuted: Math.random() > 0.9,
      isArchived: false,
      joinedAt:
        idx === 0 ? roomCreatedAt : getRandomDateAfter(roomCreatedAt, 168), // Join within a week
      createdAt: roomCreatedAt,
      updatedAt: now,
    }));

    await db.collection(ROOM_MEMBERS_COLLECTION).insertMany(memberDocs);

    // Create conversation with more messages for active groups
    await createConversation(
      roomId,
      members,
      roomCreatedAt,
      Math.floor(Math.random() * 11) + 5,
    );

    if ((i + 1) % 5 === 0) {
      console.log(`  Created ${i + 1}/${groupsToCreate} group rooms...`);
    }
  }

  console.log(`✅ Created ${groupsToCreate} group rooms\n`);
}

async function createConversation(
  roomId: string,
  memberIds: string[],
  startDate: Date,
  messageCount: number,
): Promise<void> {
  let lastMessageTime = startDate;
  let lastMessageContent = '';
  let lastMessageUserId = '';
  const messageIds: string[] = [];

  for (let i = 0; i < messageCount; i++) {
    const sender = getRandomElement(memberIds);
    const messageTime = getRandomDateAfter(lastMessageTime, 12); // Messages within 12 hours

    // Determine message content based on position in conversation
    let content: string;
    if (i === 0) {
      content = getRandomElement(greetings);
    } else if (i === 1) {
      content = getRandomElement(replies);
    } else if (Math.random() > 0.95) {
      content = getRandomElement(longMessages);
    } else {
      content = getRandomElement(conversations);
    }

    // Occasionally add a reply reference
    const replyToId =
      messageIds.length > 2 && Math.random() > 0.8
        ? getRandomElement(messageIds.slice(-5))
        : undefined;

    const messageResult = await db.collection(MESSAGES_COLLECTION).insertOne({
      content,
      userId: sender,
      roomId,
      replyToId,
      isEdited: Math.random() > 0.95, // 5% messages are edited
      isForwarded: Math.random() > 0.98, // 2% messages are forwarded
      deletedForEveryone: false,
      deletedForUsers: [],
      createdAt: messageTime,
      updatedAt: messageTime,
    });

    const messageId = messageResult.insertedId.toHexString();
    messageIds.push(messageId);
    lastMessageContent = content;
    lastMessageUserId = sender;
    lastMessageTime = messageTime;

    // Add reactions (20% of messages get reactions)
    if (Math.random() > 0.8) {
      const reactionCount = Math.floor(Math.random() * 3) + 1;
      const reactors = getRandomElements(
        memberIds.filter((id) => id !== sender),
        reactionCount,
      );

      for (const reactor of reactors) {
        await db.collection(MESSAGE_REACTIONS_COLLECTION).insertOne({
          messageId,
          userId: reactor,
          emoji: getRandomElement(emojis),
          createdAt: getRandomDateAfter(messageTime, 1),
        });
      }
    }

    // Add read receipts (80% of messages are read by at least some members)
    if (Math.random() > 0.2) {
      const readers = getRandomElements(
        memberIds.filter((id) => id !== sender),
        Math.floor(memberIds.length * 0.7),
      );

      for (const reader of readers) {
        await db.collection(READ_RECEIPTS_COLLECTION).insertOne({
          messageId,
          roomId,
          userId: reader,
          readAt: getRandomDateAfter(messageTime, 2),
        });
      }
    }
  }

  // Update room with last message info
  await db.collection(ROOMS_COLLECTION).updateOne(
    { _id: new ObjectId(roomId) },
    {
      $set: {
        lastMessageAt: lastMessageTime,
        lastMessagePreview: lastMessageContent.substring(0, 100),
        lastMessageUserId,
        updatedAt: new Date(),
      },
    },
  );

  // Pin a random message in some rooms (30% chance)
  if (Math.random() > 0.7 && messageIds.length > 5) {
    const pinnedMessageId = getRandomElement(messageIds.slice(2, -2));
    const pinner = getRandomElement(memberIds);

    await db.collection(PINNED_MESSAGES_COLLECTION).insertOne({
      roomId,
      messageId: pinnedMessageId,
      pinnedById: pinner,
      pinnedAt: new Date(),
    });
  }
}

async function seedDeveloperChats(developerEmails: string[]): Promise<void> {
  console.log('👨‍💻 Creating chats for developers...');

  // Get developer user IDs
  const developers = await prisma.user.findMany({
    where: { email: { in: developerEmails } },
    select: { id: true, email: true, name: true },
  });

  if (developers.length < 2) {
    console.log('⚠️  Not enough developer accounts for developer chats\n');
    return;
  }

  // Create a direct room between all developers
  const devIds = developers.map((d) => d.id);
  const now = new Date();
  const roomCreatedAt = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000); // 7 days ago

  // Create Developer Team group
  const roomResult = await db.collection(ROOMS_COLLECTION).insertOne({
    type: 'GROUP',
    name: 'Development Team',
    description: 'Internal chat for the development team',
    imageUrl: 'https://picsum.photos/200/200?random=devteam',
    createdById: devIds[0],
    createdAt: roomCreatedAt,
    updatedAt: now,
  });

  const roomId = roomResult.insertedId.toHexString();

  // Add all developers as members
  const memberDocs = devIds.map((userId, idx) => ({
    roomId,
    userId,
    role: idx === 0 ? 'ADMIN' : 'MEMBER',
    isMuted: false,
    isArchived: false,
    joinedAt: roomCreatedAt,
    createdAt: roomCreatedAt,
    updatedAt: now,
  }));

  await db.collection(ROOM_MEMBERS_COLLECTION).insertMany(memberDocs);

  // Add some developer-specific messages
  const devMessages = [
    "Hey team! How's the chat module coming along?",
    'Just pushed the latest changes to the repo 🚀',
    'Can someone review my PR?',
    'The WebSocket integration is looking great!',
    'Anyone having issues with MongoDB connection?',
    "Don't forget to update the documentation",
    "Let's sync up tomorrow morning",
    'The frontend team needs the API docs',
    'Great work everyone! 👏',
    "I'll be working on the read receipts feature",
  ];

  let lastMessageTime = roomCreatedAt;
  for (const content of devMessages) {
    const sender = getRandomElement(devIds);
    lastMessageTime = getRandomDateAfter(lastMessageTime, 8);

    await db.collection(MESSAGES_COLLECTION).insertOne({
      content,
      userId: sender,
      roomId,
      isEdited: false,
      isForwarded: false,
      deletedForEveryone: false,
      deletedForUsers: [],
      createdAt: lastMessageTime,
      updatedAt: lastMessageTime,
    });
  }

  // Update room
  await db.collection(ROOMS_COLLECTION).updateOne(
    { _id: new ObjectId(roomId) },
    {
      $set: {
        lastMessageAt: lastMessageTime,
        lastMessagePreview: devMessages[devMessages.length - 1],
        lastMessageUserId: getRandomElement(devIds),
        updatedAt: now,
      },
    },
  );

  console.log(`✅ Created developer team chat\n`);
}

async function printStats(): Promise<void> {
  console.log('📊 Seed Statistics:\n');

  const roomCount = await db.collection(ROOMS_COLLECTION).countDocuments();
  const directRoomCount = await db
    .collection(ROOMS_COLLECTION)
    .countDocuments({ type: 'DIRECT' });
  const groupRoomCount = await db
    .collection(ROOMS_COLLECTION)
    .countDocuments({ type: 'GROUP' });
  const membershipCount = await db
    .collection(ROOM_MEMBERS_COLLECTION)
    .countDocuments();
  const messageCount = await db
    .collection(MESSAGES_COLLECTION)
    .countDocuments();
  const reactionCount = await db
    .collection(MESSAGE_REACTIONS_COLLECTION)
    .countDocuments();
  const readReceiptCount = await db
    .collection(READ_RECEIPTS_COLLECTION)
    .countDocuments();
  const pinnedCount = await db
    .collection(PINNED_MESSAGES_COLLECTION)
    .countDocuments();

  console.log(`  📦 Rooms:           ${roomCount}`);
  console.log(`     - Direct:        ${directRoomCount}`);
  console.log(`     - Group:         ${groupRoomCount}`);
  console.log(`  👥 Memberships:     ${membershipCount}`);
  console.log(`  💬 Messages:        ${messageCount}`);
  console.log(`  ❤️  Reactions:       ${reactionCount}`);
  console.log(`  ✅ Read Receipts:   ${readReceiptCount}`);
  console.log(`  📌 Pinned Messages: ${pinnedCount}`);
  console.log('');
}

async function main() {
  try {
    console.log('🚀 Starting Chat Module Seed...\n');

    // Connect to MongoDB
    await connectMongo();

    // Clear existing data
    await clearChatData();

    // Create indexes
    await createIndexes();

    // Get user IDs from PostgreSQL
    console.log('📡 Fetching users from PostgreSQL...');
    const users = await prisma.user.findMany({
      select: { id: true, email: true },
      take: 50, // Limit to 50 users for chat seeding
    });

    if (users.length === 0) {
      console.log(
        '⚠️  No users found in PostgreSQL. Please run the main seed first.\n',
      );
      return;
    }

    console.log(`✅ Found ${users.length} users\n`);

    const userIds = users.map((u) => u.id);

    // Seed different types of chats
    await seedDirectRooms(userIds);
    await seedGroupRooms(userIds);

    // Seed developer chats
    const developerEmails = [
      'ziadhamdy667@gmail.com',
      'ziad.fathi.seleem@gmail.com',
      'zackriver.dev@gmail.com',
    ];
    await seedDeveloperChats(developerEmails);

    // Print statistics
    await printStats();

    console.log('🎉 Chat seed completed successfully!\n');
  } catch (error) {
    console.error('❌ Error during chat seed:', error);
    throw error;
  } finally {
    // Cleanup
    if (mongoClient) {
      await mongoClient.close();
      console.log('📡 MongoDB connection closed');
    }
    await prisma.$disconnect();
    console.log('📡 PostgreSQL connection closed');
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
