import { Injectable, BadRequestException } from '@nestjs/common';
import { DatabaseService } from '../../configs/database/database.service';
import { ERROR_MESSAGES } from '../../common/constants/error-messages.constant';
import { Prisma } from '@prisma/client';
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
    private readonly prisma: DatabaseService,
    private readonly redisService: RedisService,
    private readonly activityService: ActivityService,
  ) {}

  async globalSearch(query: string, type?: string, page = 1, limit = 20, userId?: string) {
    const normalizedQuery = query?.trim();
    if (!normalizedQuery) {
      throw new BadRequestException(ERROR_MESSAGES.SEARCH_QUERY_REQUIRED);
    }
    if (normalizedQuery.length < 2) {
      throw new BadRequestException(ERROR_MESSAGES.SEARCH_QUERY_TOO_SHORT);
    }

    if (userId) {
      this.activityService.logActivity(userId, 'SEARCHED', undefined, 'SEARCH_QUERY', { query: normalizedQuery });
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
        SELECT
          u.id,
          u.name,
          u.image
        FROM "User" u
        WHERE
          u.active = true
          AND to_tsvector(${tsConfig}, COALESCE(u.name, '')) @@ plainto_tsquery(${tsConfig}, ${normalizedQuery})
        ORDER BY
          ts_rank_cd(to_tsvector(${tsConfig}, COALESCE(u.name, '')), plainto_tsquery(${tsConfig}, ${normalizedQuery})) DESC,
          u."createdAt" DESC
        LIMIT ${effectiveLimit}
        OFFSET ${effectiveSkip}
      `);
      results.people = users;
    }

    if (isGlobal || normalizedType === 'POSTS') {
      const posts = await this.prisma.$queryRaw<PostResult[]>(Prisma.sql`
        SELECT
          p.id,
          p.content,
          p."createdAt",
          json_build_object(
            'id', a.id,
            'name', a.name,
            'image', a.image
          ) AS author
        FROM "Post" p
        INNER JOIN "User" a ON a.id = p."authorId"
        WHERE
          p."isDeleted" = false
          AND p.privacy = 'PUBLIC'
          AND to_tsvector(${tsConfig}, COALESCE(p.content, '') || ' ' || array_to_string(p.hashtags, ' ')) @@ plainto_tsquery(${tsConfig}, ${normalizedQuery})
        ORDER BY
          ts_rank_cd(to_tsvector(${tsConfig}, COALESCE(p.content, '') || ' ' || array_to_string(p.hashtags, ' ')), plainto_tsquery(${tsConfig}, ${normalizedQuery})) DESC,
          p."createdAt" DESC
        LIMIT ${effectiveLimit}
        OFFSET ${effectiveSkip}
      `);
      results.posts = posts;
    }

    if (isGlobal || normalizedType === 'GROUPS') {
      const groups = await this.prisma.$queryRaw<GroupResult[]>(Prisma.sql`
        SELECT
          g.id,
          g.name,
          g."coverPhoto",
          g."membersCount",
          g.type::text AS type
        FROM "Group" g
        WHERE
          g."deletedAt" IS NULL
          AND g.type IN ('PUBLIC', 'PRIVATE')
          AND to_tsvector(${tsConfig}, COALESCE(g.name, '') || ' ' || COALESCE(g.description, '')) @@ plainto_tsquery(${tsConfig}, ${normalizedQuery})
        ORDER BY
          ts_rank_cd(
            to_tsvector(${tsConfig}, COALESCE(g.name, '') || ' ' || COALESCE(g.description, '')),
            plainto_tsquery(${tsConfig}, ${normalizedQuery})
          ) DESC,
          g."membersCount" DESC
        LIMIT ${effectiveLimit}
        OFFSET ${effectiveSkip}
      `);
      results.groups = groups;
    }

    if (isGlobal || normalizedType === 'PAGES') {
      const pages = await this.prisma.$queryRaw<PageResult[]>(Prisma.sql`
        SELECT
          p.id,
          p.name,
          p."coverPhoto",
          p."logoUrl",
          p."followersCount",
          p."isVerified"
        FROM "Page" p
        WHERE
          p."deletedAt" IS NULL
          AND to_tsvector(${tsConfig}, COALESCE(p.name, '') || ' ' || COALESCE(p.description, '')) @@ plainto_tsquery(${tsConfig}, ${normalizedQuery})
        ORDER BY
          ts_rank_cd(
            to_tsvector(${tsConfig}, COALESCE(p.name, '') || ' ' || COALESCE(p.description, '')),
            plainto_tsquery(${tsConfig}, ${normalizedQuery})
          ) DESC,
          p."followersCount" DESC
        LIMIT ${effectiveLimit}
        OFFSET ${effectiveSkip}
      `);
      results.pages = pages;
    }

    if (isGlobal || normalizedType === 'REELS') {
      const reels = await this.prisma.$queryRaw<ReelResult[]>(Prisma.sql`
        SELECT
          r.id,
          r.caption,
          r."thumbnailUrl",
          r."viewsCount"::int AS "viewsCount",
          json_build_object(
            'id', u.id,
            'name', u.name,
            'image', u.image
          ) AS user
        FROM "Reel" r
        INNER JOIN "User" u ON u.id = r."userId"
        WHERE
          r."deletedAt" IS NULL
          AND r."isPublic" = true
          AND r.status = 'READY'
          AND to_tsvector(${tsConfig}, COALESCE(r.caption, '') || ' ' || array_to_string(r.hashtags, ' '))
              @@ plainto_tsquery(${tsConfig}, ${normalizedQuery})
        ORDER BY
          ts_rank_cd(
            to_tsvector(${tsConfig}, COALESCE(r.caption, '') || ' ' || array_to_string(r.hashtags, ' ')),
            plainto_tsquery(${tsConfig}, ${normalizedQuery})
          ) DESC,
          r."viewsCount" DESC
        LIMIT ${effectiveLimit}
        OFFSET ${effectiveSkip}
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
    const rawData = await this.redisService.zRangeWithScores('trending_hashtags', 0, 9, { REV: true });

    if (!rawData || rawData.length === 0) {
      return [];
    }

    return rawData.map((item) => ({
      tag: item.value,
      count: item.score,
    }));
  }
}
