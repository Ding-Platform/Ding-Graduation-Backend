import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsEnum,
  MaxLength,
  IsUrl,
  IsBoolean,
} from 'class-validator';
import { GroupType } from '@prisma/client';

export class CreateGroupDto {
  @IsNotEmpty({ message: 'Name is required' })
  @IsString()
  @MaxLength(100, { message: 'Name must not exceed 100 characters' })
  name: string;

  @IsOptional()
  @IsString()
  @MaxLength(1000, { message: 'Description must not exceed 1000 characters' })
  description?: string;

  @IsOptional()
  @IsString()
  @IsUrl({}, { message: 'Cover photo must be a valid URL' })
  coverPhoto?: string;

  @IsOptional()
  @IsEnum(GroupType, { message: 'Invalid group type' })
  type?: GroupType = GroupType.PUBLIC;

  @IsOptional()
  @IsBoolean()
  restrictPosting?: boolean = false;
}
