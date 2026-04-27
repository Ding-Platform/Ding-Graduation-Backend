import { Type } from 'class-transformer';
import {
  ArrayMaxSize,
  IsArray,
  IsEnum,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { AnalyticsEventType } from '@prisma/client';

export class AnalyticsEventInputDto {
  @IsEnum(AnalyticsEventType, { message: 'Invalid analytics event type' })
  eventType: AnalyticsEventType;

  @IsOptional()
  @IsString()
  targetId?: string;

  @IsOptional()
  @IsString()
  targetType?: string;

  @IsOptional()
  @IsObject()
  metadata?: Record<string, unknown>;

  @IsOptional()
  @IsString()
  sessionId?: string;
}

export class LogAnalyticsEventsDto {
  @IsArray()
  @ArrayMaxSize(100, { message: 'Batch cannot exceed 100 events at once' })
  @ValidateNested({ each: true })
  @Type(() => AnalyticsEventInputDto)
  events: AnalyticsEventInputDto[];
}
