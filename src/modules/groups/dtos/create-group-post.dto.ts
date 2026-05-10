import { IsNotEmpty, IsString } from 'class-validator';

export class CreateGroupPostDto {
  @IsNotEmpty({ message: 'Post ID is required' })
  @IsString()
  postId: string;
}
