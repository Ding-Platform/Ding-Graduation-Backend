import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
  DefaultValuePipe,
  ParseIntPipe,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dtos/create-comment.dto';
import { UpdateCommentDto } from './dtos/update-comment.dto';
import { JwtAuthenticationGuard } from '../../common/guards/strategy.guards/jwt.guard';
import { currentUser } from '../../common/decorators/currentUser.decorator';

@UseGuards(JwtAuthenticationGuard)
@Controller('comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post('posts/:postId')
  createComment(
    @Param('postId') postId: string,
    @Body() dto: CreateCommentDto,
    @currentUser('id') userId: string,
  ) {
    return this.commentService.createComment(postId, userId, dto);
  }

  @Get('posts/:postId')
  getPostComments(
    @Param('postId') postId: string,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(20), ParseIntPipe) limit = 20,
    @Query('sort') sort: 'top' | 'recent' = 'top',
    @currentUser('id') userId: string,
  ) {
    console.log(userId)
    return this.commentService.getPostComments(
      postId,
      userId,
      page,
      limit,
      sort,
    );
  }

  @Get(':commentId/replies')
  getCommentReplies(
    @Param('commentId') commentId: string,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
    @currentUser('id') userId: string,
  ) {
    return this.commentService.getCommentReplies(
      commentId,
      userId,
      page,
      limit,
    );
  }

  @Patch(':commentId')
  updateComment(
    @Param('commentId') commentId: string,
    @Body() dto: UpdateCommentDto,
    @currentUser('id') userId: string,
  ) {
    return this.commentService.updateComment(commentId, userId, dto);
  }

  @Delete(':commentId')
  deleteComment(
    @Param('commentId') commentId: string,
    @currentUser('id') userId: string,
  ) {
    return this.commentService.deleteComment(commentId, userId);
  }

}
