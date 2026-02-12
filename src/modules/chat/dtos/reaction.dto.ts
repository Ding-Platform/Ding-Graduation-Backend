import { IsString, IsNotEmpty, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

/**
 * DTO for adding a reaction to a message
 */
export class AddReactionDto {
  @ApiProperty({
    description: 'Emoji to react with (unicode)',
    example: '👍',
    maxLength: 10,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(10)
  emoji: string;
}

/**
 * DTO for removing a reaction
 */
export class RemoveReactionDto {
  @ApiProperty({
    description: 'Emoji to remove (unicode)',
    example: '👍',
  })
  @IsString()
  @IsNotEmpty()
  emoji: string;
}
