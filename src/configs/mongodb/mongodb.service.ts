import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { MongoClient, Db, Collection, Document } from 'mongodb';
import { get } from 'env-var';

@Injectable()
export class MongodbService implements OnModuleInit, OnModuleDestroy {
  private client: MongoClient;
  private db: Db;
  private isConnected = false;

  async onModuleInit() {
    if (process.env.NODE_ENV === 'test') {
      return;
    }

    const mongoUri = get('MONGODB_URI').asString();

    // Skip MongoDB in development if not configured
    if (!mongoUri && process.env.NODE_ENV === 'development') {
      console.log('⚠️  MongoDB not configured, chat features may be limited');
      return;
    }

    const uri = mongoUri || (process.env.NODE_ENV === 'production' ? 'mongodb://mongodb:27017' : 'mongodb://localhost:27017');
    const dbName = get('MONGODB_DB_NAME').default('ding_chat').asString();

    // Retry connection with exponential backoff
    const maxRetries = 5;
    const baseDelay = 2000; // 2 seconds

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        this.client = new MongoClient(uri, {
          maxPoolSize: 10,
          minPoolSize: 2,
          maxIdleTimeMS: 30000,
          connectTimeoutMS: 10000,
          serverSelectionTimeoutMS: 10000,
        });

        await this.client.connect();
        this.db = this.client.db(dbName);

        // Verify connection
        await this.db.command({ ping: 1 });

        this.isConnected = true;
        console.log('✅ MongoDB connected successfully');

        // Create indexes for optimal performance
        await this.createIndexes();

        return;
      } catch (error) {
        if (attempt === maxRetries) {
          console.error(
            'Failed to connect to MongoDB after',
            maxRetries,
            'attempts:',
            error,
          );
          // Don't throw in development, just log warning
          if (process.env.NODE_ENV === 'development') {
            console.log(
              '⚠️  MongoDB connection failed, chat features disabled',
            );
            return;
          }
          throw error;
        }
        const delay = baseDelay * Math.pow(2, attempt - 1);
        console.log(
          `MongoDB connection attempt ${attempt} failed, retrying in ${delay}ms...`,
        );
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
    }
  }

  async onModuleDestroy() {
    if (this.client && this.isConnected) {
      await this.client.close();
      console.log('MongoDB connection closed');
    }
  }

  /**
   * Create indexes for optimal query performance
   */
  private async createIndexes(): Promise<void> {
    try {
      // Messages collection indexes
      const messages = this.db.collection('messages');
      await messages.createIndex({ roomId: 1, createdAt: -1 });
      await messages.createIndex({ userId: 1 });
      await messages.createIndex({ replyToId: 1 });
      await messages.createIndex({ deletedAt: 1 });

      // Rooms collection indexes
      const rooms = this.db.collection('rooms');
      await rooms.createIndex({ type: 1 });
      await rooms.createIndex({ lastMessageAt: -1 });
      await rooms.createIndex({ createdById: 1 });

      // Room members collection indexes
      const roomMembers = this.db.collection('room_members');
      await roomMembers.createIndex({ roomId: 1, userId: 1 }, { unique: true });
      await roomMembers.createIndex({ userId: 1 });
      await roomMembers.createIndex({ roomId: 1, role: 1 });

      // Message reactions indexes
      const reactions = this.db.collection('message_reactions');
      await reactions.createIndex(
        { messageId: 1, userId: 1, emoji: 1 },
        { unique: true },
      );
      await reactions.createIndex({ messageId: 1 });

      // Read receipts indexes
      const readReceipts = this.db.collection('read_receipts');
      await readReceipts.createIndex(
        { messageId: 1, userId: 1 },
        { unique: true },
      );
      await readReceipts.createIndex({ userId: 1, roomId: 1 });

      // Message media indexes
      const messageMedia = this.db.collection('message_media');
      await messageMedia.createIndex({ messageId: 1 });

      // Message edit history indexes
      const editHistory = this.db.collection('message_edit_history');
      await editHistory.createIndex({ messageId: 1, editedAt: -1 });

      // Pinned messages indexes
      const pinnedMessages = this.db.collection('pinned_messages');
      await pinnedMessages.createIndex(
        { roomId: 1, messageId: 1 },
        { unique: true },
      );
      await pinnedMessages.createIndex({ roomId: 1 });

      console.log('✅ MongoDB indexes created successfully');
    } catch (error) {
      console.error('Failed to create MongoDB indexes:', error);
    }
  }

  /**
   * Check if MongoDB is connected
   */
  isReady(): boolean {
    return this.isConnected;
  }

  /**
   * Get the MongoDB database instance
   */
  getDb(): Db {
    if (!this.isConnected) {
      throw new Error('MongoDB is not connected');
    }
    return this.db;
  }

  /**
   * Get a collection by name with type safety
   */
  getCollection<T extends Document = Document>(name: string): Collection<T> {
    if (!this.isConnected) {
      throw new Error('MongoDB is not connected');
    }
    return this.db.collection<T>(name);
  }

  /**
   * Get the MongoDB client for advanced operations
   */
  getClient(): MongoClient {
    if (!this.isConnected) {
      throw new Error('MongoDB is not connected');
    }
    return this.client;
  }
}
