import { IsOptional, IsString, IsInt, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';

/**
 * DTO for cursor-based pagination
 */
export class PaginationDto {
  @ApiPropertyOptional({
    description: 'Cursor for pagination (message ID or timestamp)',
    example: '507f1f77bcf86cd799439011',
  })
  @IsOptional()
  @IsString()
  cursor?: string;

  @ApiPropertyOptional({
    description: 'Number of items to return',
    example: 50,
    default: 50,
    minimum: 1,
    maximum: 100,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  limit?: number = 50;

  @ApiPropertyOptional({
    description: 'Direction of pagination',
    enum: ['before', 'after'],
    default: 'before',
  })
  @IsOptional()
  @IsString()
  direction?: 'before' | 'after' = 'before';
}

/**
 * DTO for room list pagination
 */
export class RoomListPaginationDto {
  @ApiPropertyOptional({
    description: 'Page number (1-indexed)',
    example: 1,
    default: 1,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1;

  @ApiPropertyOptional({
    description: 'Number of rooms per page',
    example: 20,
    default: 20,
    minimum: 1,
    maximum: 50,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(50)
  limit?: number = 20;

  @ApiPropertyOptional({
    description: 'Filter archived rooms',
    example: false,
  })
  @IsOptional()
  includeArchived?: boolean = false;
}

/**
 * Generic paginated response wrapper
 */
export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    hasMore: boolean;
    nextCursor?: string;
    prevCursor?: string;
    total?: number;
  };
}
