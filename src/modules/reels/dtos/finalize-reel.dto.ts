import {
  IsString,
  IsOptional,
  IsArray,
  IsUUID,
  IsNumber,
  IsNotEmpty,
  MaxLength,
  Min,
  Max,
  ArrayMaxSize,
} from 'class-validator';
import { Type } from 'class-transformer';

export class FinalizeReelDto {
  @IsNotEmpty({ message: 'rawVideoKey is required' })
  @IsString()
  rawVideoKey: string;

  @IsOptional()
  @IsString()
  @MaxLength(2200, { message: 'Caption must not exceed 2200 characters' })
  caption?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @ArrayMaxSize(30, { message: 'Maximum 30 hashtags allowed' })
  hashtags?: string[];

  @IsOptional()
  @IsUUID('4', { message: 'audioTrackId must be a valid UUID' })
  audioTrackId?: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  audioOffsetMs?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1, { message: 'Duration must be at least 1 second' })
  @Max(60, { message: 'Duration cannot exceed 60 seconds' })
  durationSec?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  width?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  height?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  fileSizeBytes?: number;
}
