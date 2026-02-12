import {
  IsString,
  IsOptional,
  IsNotEmpty,
  MaxLength,
  IsArray,
  IsEnum,
  IsBoolean,
  ArrayMinSize,
  ArrayMaxSize,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { RoomType, RoomMemberRole } from '../schemas/room.schema';

/**
 * DTO for creating a direct (1:1) room
 */
export class CreateDirectRoomDto {
  @ApiProperty({
    description: 'User ID to create a direct room with',
    example: 'user-uuid-123',
  })
  @IsString()
  @IsNotEmpty()
  userId: string;
}

/**
 * DTO for creating a group room
 */
export class CreateGroupRoomDto {
  @ApiProperty({
    description: 'Group name',
    example: 'Project Team',
    maxLength: 100,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  name: string;

  @ApiPropertyOptional({
    description: 'Group description',
    example: 'Discussion group for the project team',
    maxLength: 500,
  })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  description?: string;

  @ApiPropertyOptional({
    description: 'Group image URL',
    example: 'https://cloudinary.com/group-image.jpg',
  })
  @IsOptional()
  @IsString()
  imageUrl?: string;

  @ApiProperty({
    description:
      'Initial member user IDs (creator is added automatically as admin)',
    example: ['user-uuid-1', 'user-uuid-2'],
    type: [String],
  })
  @IsArray()
  @IsString({ each: true })
  @ArrayMinSize(1)
  @ArrayMaxSize(255) // Max 256 members including creator
  memberIds: string[];
}

/**
 * DTO for creating a room (generic)
 */
export class CreateRoomDto {
  @ApiProperty({
    description: 'Room type',
    enum: ['DIRECT', 'GROUP'],
    example: 'GROUP',
  })
  @IsEnum(['DIRECT', 'GROUP'])
  type: Exclude<RoomType, 'CHANNEL'>;

  @ApiPropertyOptional({
    description: 'Group name (required for GROUP type)',
    example: 'Project Team',
  })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  name?: string;

  @ApiPropertyOptional({
    description: 'Group description',
    example: 'Discussion group for the project team',
  })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  description?: string;

  @ApiPropertyOptional({
    description: 'Group image URL',
  })
  @IsOptional()
  @IsString()
  imageUrl?: string;

  @ApiProperty({
    description: 'Member user IDs',
    type: [String],
  })
  @IsArray()
  @IsString({ each: true })
  memberIds: string[];
}

/**
 * DTO for updating a room
 */
export class UpdateRoomDto {
  @ApiPropertyOptional({
    description: 'Updated group name',
    example: 'New Project Team Name',
    maxLength: 100,
  })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  name?: string;

  @ApiPropertyOptional({
    description: 'Updated group description',
    example: 'Updated description for the project team',
    maxLength: 500,
  })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  description?: string;

  @ApiPropertyOptional({
    description: 'Updated group image URL',
  })
  @IsOptional()
  @IsString()
  imageUrl?: string;
}

/**
 * DTO for adding members to a room
 */
export class AddRoomMembersDto {
  @ApiProperty({
    description: 'User IDs to add to the room',
    example: ['user-uuid-1', 'user-uuid-2'],
    type: [String],
  })
  @IsArray()
  @IsString({ each: true })
  @ArrayMinSize(1)
  @ArrayMaxSize(50)
  userIds: string[];
}

/**
 * DTO for updating a member's role
 */
export class UpdateMemberRoleDto {
  @ApiProperty({
    description: 'New role for the member',
    enum: ['ADMIN', 'MODERATOR', 'MEMBER'],
    example: 'MODERATOR',
  })
  @IsEnum(['ADMIN', 'MODERATOR', 'MEMBER'])
  role: RoomMemberRole;
}

/**
 * DTO for updating room member settings
 */
export class UpdateRoomMemberSettingsDto {
  @ApiPropertyOptional({
    description: 'Mute room notifications',
    example: true,
  })
  @IsOptional()
  @IsBoolean()
  isMuted?: boolean;

  @ApiPropertyOptional({
    description: 'Archive the room',
    example: false,
  })
  @IsOptional()
  @IsBoolean()
  isArchived?: boolean;
}
