import { Injectable, Inject } from '@nestjs/common';
import { MEILISEARCH_CLIENT } from './meilisearch.provider';
import { SearchQueryDto, SearchResultDto, SearchType } from './dto/search.dto';
import { DatabaseService } from '../../configs/database/database.service';
import { MeiliSearch } from 'meilisearch';
import { ActivityService } from '../activity/activity.service';
import { RedisService } from '../../configs/redis/redis.service';

@Injectable()
export class SearchService {
  constructor(
    @Inject(MEILISEARCH_CLIENT) private readonly meilisearch: MeiliSearch,
    private readonly prisma: DatabaseService,
    private readonly activityService: ActivityService,
    private readonly redisService: RedisService,
  ) {}

  async search(
    query: SearchQueryDto,
    userId?: string,
  ): Promise<SearchResultDto> {
    const {
      q,
      type = SearchType.ALL,
      page = 1,
      limit = 10,
      sortBy,
      excludeBlocked,
    } = query;

    if (!q || q.trim().length === 0) {
      return {
        users: [],
        posts: [],
        total: 0,
        hasMore: false,
        page: 1,
      };
    }

    if (userId) {
      this.activityService.logActivity(
        userId,
        'SEARCHED',
        undefined,
        'SEARCH_QUERY',
        { query: q },
      );
    }

    const offset = (page - 1) * limit;
    const results: SearchResultDto = {
      users: [],
      posts: [],
      total: 0,
      hasMore: false,
      page,
    };

    // Search users
    if (type === SearchType.ALL || type === SearchType.USERS) {
      const userResults = await this.searchUsers(
        q,
        offset,
        limit,
        userId,
        excludeBlocked,
      );
      results.users = userResults.hits;
      results.total += userResults.estimatedTotalHits || 0;
    }

    // Search posts
    if (type === SearchType.ALL || type === SearchType.POSTS) {
      const postLimit = type === SearchType.ALL ? Math.ceil(limit / 2) : limit;
      const postOffset =
        type === SearchType.ALL ? Math.ceil(offset / 2) : offset;

      const postResults = await this.searchPosts(
        q,
        postOffset,
        postLimit,
        userId,
        sortBy,
      );
      results.posts = postResults.hits;
      results.total += postResults.estimatedTotalHits || 0;
    }

    results.hasMore = results.total > offset + limit;

    return results;
  }

  private async searchUsers(
    query: string,
    offset: number,
    limit: number,
    userId?: string,
    excludeBlocked?: string,
  ) {
    const searchParams: any = {
      limit,
      offset,
      attributesToHighlight: ['name', 'bio'],
    };

    // Add filtering for blocked users if requested
    if (excludeBlocked && userId) {
      const blockedUsers = await this.getBlockedUsers(userId);
      if (blockedUsers.length > 0) {
        searchParams.filter = `id NOT IN [${blockedUsers.map((id) => `'${id}'`).join(',')}]`;
      }
    }

    return await this.meilisearch.index('users').search(query, searchParams);
  }

  private async searchPosts(
    query: string,
    offset: number,
    limit: number,
    userId?: string,
    sortBy?: string,
  ) {
    const searchParams: any = {
      limit,
      offset,
      attributesToHighlight: ['content'],
    };

    // Add sorting
    if (sortBy === 'latest') {
      searchParams.sort = ['createdAt:desc'];
    }

    // Add filtering for user's access to posts
    if (userId) {
      const blockedUsers = await this.getBlockedUsers(userId);
      if (blockedUsers.length > 0) {
        searchParams.filter = `authorId NOT IN [${blockedUsers.map((id) => `'${id}'`).join(',')}] AND privacy = 'PUBLIC'`;
      } else {
        searchParams.filter = "privacy = 'PUBLIC'";
      }
    } else {
      searchParams.filter = "privacy = 'PUBLIC'";
    }

    return await this.meilisearch.index('posts').search(query, searchParams);
  }

  private async getBlockedUsers(userId: string): Promise<string[]> {
    const blocks = await this.prisma.block.findMany({
      where: {
        blockerId: userId,
      },
      select: {
        blockedId: true,
      },
    });

    return blocks.map((block) => block.blockedId);
  }

  async indexUser(userData: any) {
    const userDocument = {
      id: userData.id,
      name: userData.name || '',
      bio: userData.bio || '',
      avatar: userData.image || '',
      isActive: userData.active && !userData.isBanned,
    };

    return await this.meilisearch.index('users').addDocuments([userDocument]);
  }

  async updateUser(userData: any) {
    return await this.indexUser(userData);
  }

  async removeUser(userId: string) {
    return await this.meilisearch.index('users').deleteDocument(userId);
  }

  async indexPost(postData: any) {
    const postDocument = {
      id: postData.id,
      content: postData.content,
      authorId: postData.authorId,
      authorName: postData.author?.name || 'Unknown',
      createdAt: postData.createdAt.toISOString(),
      privacy: postData.privacy || 'PUBLIC',
      isDeleted: false,
    };

    return await this.meilisearch.index('posts').addDocuments([postDocument]);
  }

  async updatePost(postData: any) {
    return await this.indexPost(postData);
  }

  async removePost(postId: string) {
    return await this.meilisearch.index('posts').deleteDocument(postId);
  }

  async createIndexes() {
    try {
      // Create users index if it doesn't exist
      try {
        await this.meilisearch.createIndex('users', { primaryKey: 'id' });
      } catch (_) {
        // Index might already exist, that's okay
        console.log('Users index might already exist');
      }

      // Update users index settings
      await this.meilisearch.index('users').updateSettings({
        searchableAttributes: ['name', 'bio'],
        filterableAttributes: ['id', 'isActive'],
        sortableAttributes: ['name'],
        rankingRules: [
          'words',
          'typo',
          'proximity',
          'attribute',
          'sort',
          'exactness',
          'isActive:desc',
        ],
        stopWords: ['the', 'a', 'an', 'and', 'or', 'but'],
      });

      // Create posts index if it doesn't exist
      try {
        await this.meilisearch.createIndex('posts', { primaryKey: 'id' });
      } catch (_) {
        // Index might already exist, that's okay
        console.log('Posts index might already exist');
      }

      // Update posts index settings
      await this.meilisearch.index('posts').updateSettings({
        searchableAttributes: ['content', 'authorName'],
        filterableAttributes: ['authorId', 'privacy', 'isDeleted'],
        sortableAttributes: ['createdAt'],
        rankingRules: [
          'words',
          'typo',
          'proximity',
          'attribute',
          'sort',
          'exactness',
        ],
        stopWords: ['the', 'a', 'an', 'and', 'or', 'but'],
      });
    } catch (error) {
      console.error('Error creating MeiliSearch indexes:', error);
      throw error;
    }
  }

  async trendingHashtags() {
    const rawData = await this.redisService.zRangeWithScores(
      'trending_hashtags',
      0,
      9,
      { REV: true },
    );

    if (!rawData || rawData.length === 0) {
      return [];
    }

    return rawData.map((item) => ({
      tag: item.value,
      count: item.score,
    }));
  }
}
