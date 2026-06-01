import { IsString, IsNotEmpty, MaxLength } from 'class-validator';

export class EditCommentDto {
  @IsNotEmpty({ message: 'Comment content is required' })
  @IsString()
  @MaxLength(1000, { message: 'Comment must not exceed 1000 characters' })
  content: string;
}
