import {
  IsString,
  IsOptional,
  IsNotEmpty,
  MaxLength,
  IsArray,
  ValidateNested,
  IsEnum,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { MessageMediaType } from '../schemas/message.schema';

/**
 * DTO for creating a new message
 */
export class CreateMessageDto {
  @ApiProperty({
    description: 'Message content text',
    example: 'Hello, how are you?',
    maxLength: 4096,
  })
  @IsString()
  @IsOptional()
  @MaxLength(4096)
  content?: string;

  @ApiProperty({
    description: 'Room ID to send the message to',
    example: '507f1f77bcf86cd799439011',
  })
  @IsString()
  @IsNotEmpty()
  roomId: string;

  @ApiPropertyOptional({
    description: 'Message ID to reply to',
    example: '507f1f77bcf86cd799439012',
  })
  @IsOptional()
  @IsString()
  replyToId?: string;
}

/**
 * DTO for message media attachment
 */
export class MessageMediaDto {
  @ApiProperty({
    description: 'Media URL',
    example: 'https://cloudinary.com/image.jpg',
  })
  @IsString()
  @IsNotEmpty()
  url: string;

  @ApiProperty({
    description: 'Media type',
    enum: ['IMAGE', 'VIDEO', 'AUDIO', 'VOICE_NOTE', 'DOCUMENT', 'FILE'],
  })
  @IsEnum(['IMAGE', 'VIDEO', 'AUDIO', 'VOICE_NOTE', 'DOCUMENT', 'FILE'])
  type: MessageMediaType;

  @ApiPropertyOptional({ description: 'File name' })
  @IsOptional()
  @IsString()
  fileName?: string;

  @ApiPropertyOptional({ description: 'File size in bytes' })
  @IsOptional()
  fileSize?: number;

  @ApiPropertyOptional({ description: 'MIME type' })
  @IsOptional()
  @IsString()
  mimeType?: string;
}

/**
 * DTO for creating a message with media
 */
export class CreateMessageWithMediaDto extends CreateMessageDto {
  @ApiPropertyOptional({
    description: 'Media attachments',
    type: [MessageMediaDto],
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => MessageMediaDto)
  media?: MessageMediaDto[];
}

/**
 * DTO for updating a message
 */
export class UpdateMessageDto {
  @ApiProperty({
    description: 'Updated message content',
    example: 'Updated message text',
    maxLength: 4096,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(4096)
  content: string;
}

/**
 * DTO for forwarding a message
 */
export class ForwardMessageDto {
  @ApiProperty({
    description: 'Original message ID to forward',
    example: '507f1f77bcf86cd799439011',
  })
  @IsString()
  @IsNotEmpty()
  messageId: string;

  @ApiProperty({
    description: 'Room IDs to forward the message to',
    example: ['507f1f77bcf86cd799439012', '507f1f77bcf86cd799439013'],
    type: [String],
  })
  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  toRoomIds: string[];
}

/**
 * DTO for deleting a message
 */
export class DeleteMessageDto {
  @ApiPropertyOptional({
    description: 'Delete for everyone in the room',
    example: false,
    default: false,
  })
  @IsOptional()
  deleteForEveryone?: boolean;
}
