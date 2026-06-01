import { existsSync } from 'fs';
import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { createClient, RedisClientType } from 'redis';
import { get } from 'env-var';

@Injectable()
export class RedisService implements OnModuleInit, OnModuleDestroy {
  private client: RedisClientType;
  private isConnected = false;

  async onModuleInit() {
    if (process.env.NODE_ENV === 'test') {
      this.isConnected = false;
      return;
    }

    let redisUrl = get('REDIS_URL')
      .default('redis://localhost:6379')
      .asString();

    // When running on host (not in Docker), "redis" hostname doesn't resolve — use localhost
    const inDocker = existsSync('/.dockerenv');
    if (!inDocker) {
      try {
        const u = new URL(redisUrl);
        if (u.hostname === 'redis') {
          u.hostname = 'localhost';
          redisUrl = u.toString();
        }
      } catch {
        // ignore invalid URL
      }
    }

    // Skip Redis in development if not configured
    if (!redisUrl && process.env.NODE_ENV === 'development') {
      console.log('⚠️  Redis not configured, caching disabled');
      return;
    }

    try {
      this.client = createClient({
        url: redisUrl,
      });

      this.client.on('error', (err) => {
        console.error('Redis Client Error:', err);
        this.isConnected = false;
      });

      this.client.on('connect', () => {
        console.log('✅ Redis connected successfully');
        console.log('redisUrl', redisUrl);
        this.isConnected = true;
      });

      await this.client.connect();
    } catch (error) {
      console.error('Failed to connect to Redis:', error);
      this.isConnected = false;
    }
  }

  async onModuleDestroy() {
    if (this.client && this.isConnected) {
      await this.client.quit();
      console.log('Redis connection closed');
    }
  }

  /**
   * Get value from cache
   */
  async get<T>(key: string): Promise<T | null> {
    if (!this.isConnected) return null;

    try {
      const value = await this.client.get(key);
      return value ? JSON.parse(value) : null;
    } catch (error) {
      console.error('Redis get error:', error);
      return null;
    }
  }

  /**
   * Set value in cache with optional TTL (in seconds)
   */
  async set(key: string, value: any, ttl?: number): Promise<boolean> {
    if (!this.isConnected) return false;

    try {
      const serialized = JSON.stringify(value);
      if (ttl) {
        await this.client.setEx(key, ttl, serialized);
      } else {
        await this.client.set(key, serialized);
      }
      return true;
    } catch (error) {
      console.error('Redis set error:', error);
      return false;
    }
  }

  /**
   * Delete key from cache
   */
  async del(key: string): Promise<boolean> {
    if (!this.isConnected) return false;

    try {
      await this.client.del(key);
      return true;
    } catch (error) {
      console.error('Redis del error:', error);
      return false;
    }
  }

  /**
   * Delete keys matching pattern
   */
  async delPattern(pattern: string): Promise<boolean> {
    if (!this.isConnected) return false;

    try {
      const keys = await this.client.keys(pattern);
      if (keys.length > 0) {
        await this.client.del(keys);
      }
      return true;
    } catch (error) {
      console.error('Redis delPattern error:', error);
      return false;
    }
  }

  /**
   * Check if key exists
   */
  async exists(key: string): Promise<boolean> {
    if (!this.isConnected) return false;

    try {
      const result = await this.client.exists(key);
      return result === 1;
    } catch (error) {
      console.error('Redis exists error:', error);
      return false;
    }
  }

  /**
   * Set expiration on key
   */
  async expire(key: string, seconds: number): Promise<boolean> {
    if (!this.isConnected) return false;

    try {
      await this.client.expire(key, seconds);
      return true;
    } catch (error) {
      console.error('Redis expire error:', error);
      return false;
    }
  }

  /**
   * Increment value
   */
  async incr(key: string): Promise<number | null> {
    if (!this.isConnected) return null;

    try {
      return await this.client.incr(key);
    } catch (error) {
      console.error('Redis incr error:', error);
      return null;
    }
  }

  /**
   * Get TTL of key
   */
  async ttl(key: string): Promise<number | null> {
    if (!this.isConnected) return null;

    try {
      return await this.client.ttl(key);
    } catch (error) {
      console.error('Redis ttl error:', error);
      return null;
    }
  }

  /**
   * Set value only if key does not exist and expire it.
   */
  async setNxEx(key: string, value: string, seconds: number): Promise<boolean> {
    if (!this.isConnected) return false;

    try {
      const result = await this.client.set(key, value, {
        NX: true,
        EX: seconds,
      });
      return result === 'OK';
    } catch (error) {
      console.error('Redis setNxEx error:', error);
      return false;
    }
  }

  async hSet(key: string, field: string, value: string): Promise<boolean> {
    if (!this.isConnected) return false;

    try {
      await this.client.hSet(key, field, value);
      return true;
    } catch (error) {
      console.error('Redis hSet error:', error);
      return false;
    }
  }

  async hGet(key: string, field: string): Promise<string | null> {
    if (!this.isConnected) return null;

    try {
      const value = await this.client.hGet(key, field);
      return value ?? null;
    } catch (error) {
      console.error('Redis hGet error:', error);
      return null;
    }
  }

  async hGetAll(key: string): Promise<Record<string, string>> {
    if (!this.isConnected) return {};

    try {
      return await this.client.hGetAll(key);
    } catch (error) {
      console.error('Redis hGetAll error:', error);
      return {};
    }
  }

  async hDel(key: string, field: string): Promise<boolean> {
    if (!this.isConnected) return false;

    try {
      await this.client.hDel(key, field);
      return true;
    } catch (error) {
      console.error('Redis hDel error:', error);
      return false;
    }
  }

  async hLen(key: string): Promise<number> {
    if (!this.isConnected) return 0;

    try {
      return await this.client.hLen(key);
    } catch (error) {
      console.error('Redis hLen error:', error);
      return 0;
    }
  }

  async incrBy(key: string, amount: number): Promise<number | null> {
    if (!this.isConnected) return null;

    try {
      return await this.client.incrBy(key, amount);
    } catch (error) {
      console.error('Redis incrBy error:', error);
      return null;
    }
  }

  async zAdd(key: string, score: number, value: string): Promise<boolean> {
    if (!this.isConnected) return false;

    try {
      await this.client.zAdd(key, [{ score, value }]);
      return true;
    } catch (error) {
      console.error('Redis zAdd error:', error);
      return false;
    }
  }

  async zIncrBy(
    key: string,
    increment: number,
    member: string,
  ): Promise<number | null> {
    if (!this.isConnected) return null;

    try {
      return await this.client.zIncrBy(key, increment, member);
    } catch (error) {
      console.error('Redis zIncrBy error:', error);
      return null;
    }
  }

  async zRangeWithScores(
    key: string,
    start: number,
    stop: number,
    options?: any,
  ): Promise<{ value: string; score: number }[]> {
    if (!this.isConnected) return [];

    try {
      return await this.client.zRangeWithScores(key, start, stop, options);
    } catch (error) {
      console.error('Redis zRangeWithScores error:', error);
      return [];
    }
  }

  /**
   * Flush all keys (use with caution!)
   */
  async flushAll(): Promise<boolean> {
    if (!this.isConnected) return false;

    try {
      await this.client.flushAll();
      return true;
    } catch (error) {
      console.error('Redis flushAll error:', error);
      return false;
    }
  }
}
