import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsEnum,
  MaxLength,
  IsUrl,
  IsDateString,
  IsNumber,
  IsBoolean,
} from 'class-validator';
import { EventType } from '@prisma/client';

export class CreateEventDto {
  @IsNotEmpty({ message: 'Title is required' })
  @IsString()
  @MaxLength(100, { message: 'Title must not exceed 100 characters' })
  title: string;

  @IsOptional()
  @IsString()
  @MaxLength(1000, { message: 'Description must not exceed 1000 characters' })
  description?: string;

  @IsOptional()
  @IsString()
  @IsUrl({}, { message: 'Cover photo must be a valid URL' })
  coverPhoto?: string;

  @IsOptional()
  @IsEnum(EventType, { message: 'Invalid event type' })
  eventType?: EventType = EventType.OFFLINE;

  @IsNotEmpty({ message: 'Start time is required' })
  @IsDateString()
  startTime: string;

  @IsOptional()
  @IsDateString()
  endTime?: string;

  @IsOptional()
  @IsString()
  location?: string;

  @IsOptional()
  @IsString()
  @IsUrl({}, { message: 'Online meeting URL must be a valid URL' })
  onlineMeetingUrl?: string;

  @IsOptional()
  @IsBoolean()
  isPublic?: boolean = true;

  @IsOptional()
  @IsNumber()
  maxAttendees?: number;

  @IsOptional()
  @IsNumber()
  ticketPrice?: number;

  @IsOptional()
  @IsString()
  currency?: string = 'USD';
}
