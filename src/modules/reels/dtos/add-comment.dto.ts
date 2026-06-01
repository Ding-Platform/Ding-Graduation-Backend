import {
  IsString,
  IsOptional,
  IsUUID,
  IsNotEmpty,
  MaxLength,
} from 'class-validator';

export class AddCommentDto {
  @IsNotEmpty({ message: 'Comment content is required' })
  @IsString()
  @MaxLength(1000, { message: 'Comment must not exceed 1000 characters' })
  content: string;

  @IsOptional()
  @IsUUID('4', { message: 'parentId must be a valid UUID' })
  parentId?: string;
}
