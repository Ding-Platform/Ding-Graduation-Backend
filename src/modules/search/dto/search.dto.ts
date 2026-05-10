import { IsString, IsOptional, IsEnum, IsInt, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';

export enum SearchType {
  ALL = 'all',
  USERS = 'users',
  POSTS = 'posts',
}

export class SearchQueryDto {
  @IsString()
  @IsOptional()
  q?: string;

  @IsEnum(SearchType)
  @IsOptional()
  type?: SearchType = SearchType.ALL;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsOptional()
  page?: number = 1;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(50)
  @IsOptional()
  limit?: number = 10;

  @IsString()
  @IsOptional()
  sortBy?: 'relevance' | 'latest' = 'relevance';

  @IsString()
  @IsOptional()
  excludeBlocked?: string;
}

export class SearchResultDto {
  users: any[];
  posts: any[];
  total: number;
  hasMore: boolean;
  page: number;
}
