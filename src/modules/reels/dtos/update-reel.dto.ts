import {
  IsString,
  IsOptional,
  IsArray,
  IsUUID,
  IsNumber,
  IsBoolean,
  MaxLength,
  Min,
  ArrayMaxSize,
  ValidateIf,
} from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateReelDto {
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
  @ValidateIf((o) => o.audioTrackId !== null)
  @IsUUID('4', { message: 'audioTrackId must be a valid UUID' })
  audioTrackId?: string | null;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  audioOffsetMs?: number;

  @IsOptional()
  @IsBoolean()
  isPublic?: boolean;

  @IsOptional()
  @IsBoolean()
  commentsEnabled?: boolean;

  @IsOptional()
  @IsBoolean()
  downloadsEnabled?: boolean;
}
