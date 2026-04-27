import { Injectable, BadRequestException } from '@nestjs/common';
import { DatabaseService } from '../../configs/database/database.service';
import { ERROR_MESSAGES } from '../../common/constants/error-messages.constant';
import { Prisma } from '@prisma/client';

type SearchKind = 'ALL' | 'PEOPLE' | 'POSTS' | 'GROUPS' | 'PAGES';

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

export interface SearchBuckets {
  people?: PersonResult[];
  posts?: PostResult[];
  groups?: GroupResult[];
  pages?: PageResult[];
}

@Injectable()
export class SearchService {
  constructor(private readonly prisma: DatabaseService) {}

  async globalSearch(query: string, type?: string, page = 1, limit = 20) {
    const normalizedQuery = query?.trim();
    if (!normalizedQuery) {
      throw new BadRequestException(ERROR_MESSAGES.SEARCH_QUERY_REQUIRED);
    }
    if (normalizedQuery.length < 2) {
      throw new BadRequestException(ERROR_MESSAGES.SEARCH_QUERY_TOO_SHORT);
    }

    const skip = (page - 1) * limit;
    const normalizedType = (type?.toUpperCase() ?? 'ALL') as SearchKind;
    const allowedTypes: SearchKind[] = [
      'ALL',
      'PEOPLE',
      'POSTS',
      'GROUPS',
      'PAGES',
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
          AND to_tsvector(${tsConfig}, COALESCE(p.content, '')) @@ plainto_tsquery(${tsConfig}, ${normalizedQuery})
        ORDER BY
          ts_rank_cd(to_tsvector(${tsConfig}, COALESCE(p.content, '')), plainto_tsquery(${tsConfig}, ${normalizedQuery})) DESC,
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

    return {
      query: normalizedQuery,
      type: normalizedType,
      data: results,
      meta: { page, limit },
    };
  }

  trendingHashtags() {
    // A real implementation might use a view or Redis counter.
    // For now, this is a placeholder or could use a raw query counting hashtags in recent posts.
    return [
      { tag: '#DingPlatform', count: 1240 },
      { tag: '#Technology', count: 980 },
      { tag: '#Social', count: 540 },
      { tag: '#News', count: 430 },
      { tag: '#Innovation', count: 210 },
    ];
  }
}
