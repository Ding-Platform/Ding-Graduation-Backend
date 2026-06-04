import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import { MEILISEARCH_CLIENT } from './meilisearch.provider';
import { SearchQueryDto, SearchResultDto, SearchType } from './dto/search.dto';
import { DatabaseService } from '../../configs/database/database.service';
import { MeiliSearch } from 'meilisearch';
import { AuditAction, Prisma } from '@prisma/client';
import { AuditLogService } from '../audit/audit-log.service';
import { ERROR_MESSAGES } from '../../common/constants/error-messages.constant';
import { RedisService } from '../../configs/redis/redis.service';
import { ActivityService } from '../activity/activity.service';

type SearchKind = 'ALL' | 'PEOPLE' | 'POSTS' | 'GROUPS' | 'PAGES' | 'REELS';

interface PersonResult {
  id: string;
  name: string | null;
  image: string | null;
}

interface PostResult {
  id: string;
  content: string;
  createdAt: Date;
  author: {
    id: string;
    name: string | null;
    image: string | null;
  };
}

interface GroupResult {
  id: string;
  name: string;
  coverPhoto: string | null;
  membersCount: number;
  type: string;
}

interface PageResult {
  id: string;
  name: string;
  coverPhoto: string | null;
  logoUrl: string | null;
  followersCount: number;
  isVerified: boolean;
}

interface ReelResult {
  id: string;
  caption: string | null;
  thumbnailUrl: string | null;
  viewsCount: number;
  user: {
    id: string;
    name: string | null;
    image: string | null;
  };
}

export interface SearchBuckets {
  people?: PersonResult[];
  posts?: PostResult[];
  groups?: GroupResult[];
  pages?: PageResult[];
  reels?: ReelResult[];
}

@Injectable()
export class SearchService {
  constructor(
    @Inject(MEILISEARCH_CLIENT) private readonly meilisearch: MeiliSearch,
    private readonly prisma: DatabaseService,
    private readonly auditLogService: AuditLogService,
    private readonly redisService: RedisService,
    private readonly activityService: ActivityService,
  ) {}

  async search(query: SearchQueryDto, userId?: string): Promise<SearchResultDto> {
    const { q, type = SearchType.ALL, page = 1, limit = 10, sortBy, excludeBlocked } = query;

    if (!q || q.trim().length === 0) {
      return {
        users: [],
        posts: [],
        total: 0,
        hasMore: false,
        page: 1,
      };
    }

    const offset = (page - 1) * limit;
    const results: SearchResultDto = {
      users: [],
      posts: [],
      total: 0,
      hasMore: false,
      page,
    };

    if (type === SearchType.ALL || type === SearchType.USERS) {
      const userResults = await this.searchUsers(q, offset, limit, userId, excludeBlocked);
      results.users = userResults.hits;
      results.total += userResults.estimatedTotalHits || 0;
    }

    if (type === SearchType.ALL || type === SearchType.POSTS) {
      const postLimit = type === SearchType.ALL ? Math.ceil(limit / 2) : limit;
      const postOffset = type === SearchType.ALL ? Math.ceil(offset / 2) : offset;

      const postResults = await this.searchPosts(q, postOffset, postLimit, userId, sortBy);
      results.posts = postResults.hits;
      results.total += postResults.estimatedTotalHits || 0;
    }

    results.hasMore = results.total > offset + limit;

    if (userId) {
      await this.auditLogService.record({
        userId,
        action: AuditAction.SEARCH_QUERY,
        targetType: 'SEARCH',
        textSnapshot: q.trim(),
        metadata: {
          type,
          page,
          limit,
          sortBy,
          resultCount: results.total,
        },
      });
    }

    return results;
  }

  async globalSearch(
    query: string,
    type?: string,
    page = 1,
    limit = 20,
    userId?: string,
  ) {
    const normalizedQuery = query?.trim();
    if (!normalizedQuery) {
      throw new BadRequestException(ERROR_MESSAGES.SEARCH_QUERY_REQUIRED);
    }
    if (normalizedQuery.length < 2) {
      throw new BadRequestException(ERROR_MESSAGES.SEARCH_QUERY_TOO_SHORT);
    }

    if (userId) {
      this.activityService.logActivity(userId, 'SEARCHED', undefined, 'SEARCH_QUERY', {
        query: normalizedQuery,
      });
      await this.auditLogService.record({
        userId,
        action: AuditAction.SEARCH_QUERY,
        targetType: 'SEARCH',
        textSnapshot: normalizedQuery,
        metadata: { type: type ?? 'ALL', page, limit, source: 'discovery' },
      });
    }

    const skip = (page - 1) * limit;
    const normalizedType = (type?.toUpperCase() ?? 'ALL') as SearchKind;
    const allowedTypes: SearchKind[] = [
      'ALL',
      'PEOPLE',
      'POSTS',
      'GROUPS',
      'PAGES',
      'REELS',
    ];
    if (!allowedTypes.includes(normalizedType)) {
      throw new BadRequestException('Invalid search type');
    }
    const isGlobal = normalizedType === 'ALL';
    const effectiveLimit = isGlobal ? 5 : limit;
    const effectiveSkip = isGlobal ? 0 : skip;
    const tsConfig = Prisma.sql`simple`;

    const results: SearchBuckets = {};

    if (isGlobal || normalizedType === 'PEOPLE') {
      const users = await this.prisma.$queryRaw<PersonResult[]>(Prisma.sql`
        SELECT u.id, u.name, u.image
        FROM "User" u
        WHERE u.active = true
          AND to_tsvector(${tsConfig}, COALESCE(u.name, '')) @@ plainto_tsquery(${tsConfig}, ${normalizedQuery})
        ORDER BY ts_rank_cd(to_tsvector(${tsConfig}, COALESCE(u.name, '')), plainto_tsquery(${tsConfig}, ${normalizedQuery})) DESC,
          u."createdAt" DESC
        LIMIT ${effectiveLimit} OFFSET ${effectiveSkip}
      `);
      results.people = users;
    }

    if (isGlobal || normalizedType === 'POSTS') {
      const posts = await this.prisma.$queryRaw<PostResult[]>(Prisma.sql`
        SELECT p.id, p.content, p."createdAt",
          json_build_object('id', a.id, 'name', a.name, 'image', a.image) AS author
        FROM "Post" p
        INNER JOIN "User" a ON a.id = p."authorId"
        WHERE p."isDeleted" = false AND p.privacy = 'PUBLIC'
          AND to_tsvector(${tsConfig}, COALESCE(p.content, '') || ' ' || array_to_string(p.hashtags, ' '))
              @@ plainto_tsquery(${tsConfig}, ${normalizedQuery})
        ORDER BY ts_rank_cd(to_tsvector(${tsConfig}, COALESCE(p.content, '') || ' ' || array_to_string(p.hashtags, ' ')),
          plainto_tsquery(${tsConfig}, ${normalizedQuery})) DESC, p."createdAt" DESC
        LIMIT ${effectiveLimit} OFFSET ${effectiveSkip}
      `);
      results.posts = posts;
    }

    if (isGlobal || normalizedType === 'GROUPS') {
      const groups = await this.prisma.$queryRaw<GroupResult[]>(Prisma.sql`
        SELECT g.id, g.name, g."coverPhoto", g."membersCount", g.type::text AS type
        FROM "Group" g
        WHERE g."deletedAt" IS NULL AND g.type IN ('PUBLIC', 'PRIVATE')
          AND to_tsvector(${tsConfig}, COALESCE(g.name, '') || ' ' || COALESCE(g.description, ''))
              @@ plainto_tsquery(${tsConfig}, ${normalizedQuery})
        ORDER BY ts_rank_cd(to_tsvector(${tsConfig}, COALESCE(g.name, '') || ' ' || COALESCE(g.description, '')),
          plainto_tsquery(${tsConfig}, ${normalizedQuery})) DESC, g."membersCount" DESC
        LIMIT ${effectiveLimit} OFFSET ${effectiveSkip}
      `);
      results.groups = groups;
    }

    if (isGlobal || normalizedType === 'PAGES') {
      const pages = await this.prisma.$queryRaw<PageResult[]>(Prisma.sql`
        SELECT p.id, p.name, p."coverPhoto", p."logoUrl", p."followersCount", p."isVerified"
        FROM "Page" p
        WHERE p."deletedAt" IS NULL
          AND to_tsvector(${tsConfig}, COALESCE(p.name, '') || ' ' || COALESCE(p.description, ''))
              @@ plainto_tsquery(${tsConfig}, ${normalizedQuery})
        ORDER BY ts_rank_cd(to_tsvector(${tsConfig}, COALESCE(p.name, '') || ' ' || COALESCE(p.description, '')),
          plainto_tsquery(${tsConfig}, ${normalizedQuery})) DESC, p."followersCount" DESC
        LIMIT ${effectiveLimit} OFFSET ${effectiveSkip}
      `);
      results.pages = pages;
    }

    if (isGlobal || normalizedType === 'REELS') {
      const reels = await this.prisma.$queryRaw<ReelResult[]>(Prisma.sql`
        SELECT r.id, r.caption, r."thumbnailUrl", r."viewsCount"::int AS "viewsCount",
          json_build_object('id', u.id, 'name', u.name, 'image', u.image) AS user
        FROM "Reel" r
        INNER JOIN "User" u ON u.id = r."userId"
        WHERE r."deletedAt" IS NULL AND r."isPublic" = true AND r.status = 'READY'
          AND to_tsvector(${tsConfig}, COALESCE(r.caption, '') || ' ' || array_to_string(r.hashtags, ' '))
              @@ plainto_tsquery(${tsConfig}, ${normalizedQuery})
        ORDER BY ts_rank_cd(to_tsvector(${tsConfig}, COALESCE(r.caption, '') || ' ' || array_to_string(r.hashtags, ' ')),
          plainto_tsquery(${tsConfig}, ${normalizedQuery})) DESC, r."viewsCount" DESC
        LIMIT ${effectiveLimit} OFFSET ${effectiveSkip}
      `);
      results.reels = reels;
    }

    return {
      query: normalizedQuery,
      type: normalizedType,
      data: results,
      meta: { page, limit },
    };
  }

  async trendingHashtags() {
    const rawData = await this.redisService.zRangeWithScores('trending_hashtags', 0, 9, {
      REV: true,
    });

    if (!rawData || rawData.length === 0) {
      return [];
    }

    return rawData.map((item) => ({
      tag: item.value,
      count: item.score,
    }));
  }

  private async searchUsers(
    query: string,
    offset: number,
    limit: number,
    userId?: string,
    excludeBlocked?: string,
  ) {
    const searchParams: Record<string, unknown> = {
      limit,
      offset,
      attributesToHighlight: ['name', 'bio'],
    };

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
    const searchParams: Record<string, unknown> = {
      limit,
      offset,
      attributesToHighlight: ['content'],
    };

    if (sortBy === 'latest') {
      searchParams.sort = ['createdAt:desc'];
    }

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
      where: { blockerId: userId },
      select: { blockedId: true },
    });
    return blocks.map((block) => block.blockedId);
  }

  async indexUser(userData: {
    id: string;
    name?: string | null;
    bio?: string | null;
    image?: string | null;
    active?: boolean;
    isBanned?: boolean;
  }) {
    const userDocument = {
      id: userData.id,
      name: userData.name || '',
      bio: userData.bio || '',
      avatar: userData.image || '',
      isActive: userData.active && !userData.isBanned,
    };
    return await this.meilisearch.index('users').addDocuments([userDocument]);
  }

  async updateUser(userData: Parameters<SearchService['indexUser']>[0]) {
    return await this.indexUser(userData);
  }

  async removeUser(userId: string) {
    return await this.meilisearch.index('users').deleteDocument(userId);
  }

  async indexPost(postData: {
    id: string;
    content: string;
    authorId: string;
    author?: { name?: string | null };
    createdAt: Date;
    privacy?: string;
    tags?: string[];
  }) {
    const postDocument = {
      id: postData.id,
      content: postData.content,
      authorId: postData.authorId,
      authorName: postData.author?.name || 'Unknown',
      createdAt: postData.createdAt.toISOString(),
      privacy: postData.privacy || 'PUBLIC',
      isDeleted: false,
      tags: postData.tags || [],
    };
    return await this.meilisearch.index('posts').addDocuments([postDocument]);
  }

  async updatePost(postData: Parameters<SearchService['indexPost']>[0]) {
    return await this.indexPost(postData);
  }

  async removePost(postId: string) {
    return await this.meilisearch.index('posts').deleteDocument(postId);
  }

  async createIndexes() {
    try {
      try {
        await this.meilisearch.createIndex('users', { primaryKey: 'id' });
      } catch {
        console.log('Users index might already exist');
      }

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

      try {
        await this.meilisearch.createIndex('posts', { primaryKey: 'id' });
      } catch {
        console.log('Posts index might already exist');
      }

      await this.meilisearch.index('posts').updateSettings({
        searchableAttributes: ['content', 'authorName', 'tags'],
        filterableAttributes: ['authorId', 'privacy', 'isDeleted', 'tags'],
        sortableAttributes: ['createdAt'],
        rankingRules: ['words', 'typo', 'proximity', 'attribute', 'sort', 'exactness'],
        stopWords: ['the', 'a', 'an', 'and', 'or', 'but'],
      });
    } catch (error) {
      console.error('Error creating MeiliSearch indexes:', error);
      throw error;
    }
  }
}
