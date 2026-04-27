import {
  IsNotEmpty,
  IsString,
  IsOptional,
  MaxLength,
  IsUrl,
  IsBoolean,
} from 'class-validator';

export class CreateStreamDto {
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
  @IsUrl({}, { message: 'Thumbnail URL must be a valid URL' })
  thumbnailUrl?: string;

  @IsOptional()
  @IsBoolean()
  isRecorded?: boolean = true;
}
