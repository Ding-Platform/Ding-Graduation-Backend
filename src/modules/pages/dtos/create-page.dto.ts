import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsEnum,
  MaxLength,
  IsUrl,
} from 'class-validator';
import { PageCategory } from '@prisma/client';

export class CreatePageDto {
  @IsNotEmpty({ message: 'Name is required' })
  @IsString()
  @MaxLength(100, { message: 'Name must not exceed 100 characters' })
  name: string;

  @IsOptional()
  @IsString()
  @MaxLength(1000, { message: 'Description must not exceed 1000 characters' })
  description?: string;

  @IsOptional()
  @IsEnum(PageCategory, { message: 'Invalid page category' })
  category?: PageCategory = PageCategory.OTHER;

  @IsOptional()
  @IsString()
  @IsUrl({}, { message: 'Cover photo must be a valid URL' })
  coverPhoto?: string;

  @IsOptional()
  @IsString()
  @IsUrl({}, { message: 'Logo URL must be a valid URL' })
  logoUrl?: string;

  @IsOptional()
  @IsString()
  website?: string;

  @IsOptional()
  @IsString()
  phone?: string;
}
