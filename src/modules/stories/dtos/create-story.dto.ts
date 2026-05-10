import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsEnum,
  MaxLength,
  IsUrl,
} from 'class-validator';
import { StoryPrivacy } from '@prisma/client';

export class CreateStoryDto {
  @IsNotEmpty({ message: 'Media URL is required' })
  @IsString()
  @IsUrl({}, { message: 'Media URL must be a valid URL' })
  mediaUrl: string;

  @IsOptional()
  @IsString()
  @IsUrl({}, { message: 'Thumbnail URL must be a valid URL' })
  thumbnailUrl?: string;

  @IsOptional()
  @IsString()
  @MaxLength(500, { message: 'Caption must not exceed 500 characters' })
  caption?: string;

  @IsOptional()
  @IsEnum(StoryPrivacy, { message: 'Invalid privacy setting' })
  privacy?: StoryPrivacy = StoryPrivacy.FRIENDS;
}
