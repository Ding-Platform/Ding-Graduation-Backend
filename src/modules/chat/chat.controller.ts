import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  Query,
  UseGuards,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { ChatService } from './chat.service';
import { User } from '../../common/decorators/user.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { FileFieldsInterceptor } from '@nestjs/platform-express';

@Controller('chat')
@UseGuards(JwtAuthGuard)
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post('rooms')
  async createRoom(@User('id') userId: string, @Body() body: any) {
    return this.chatService.createRoom(userId, body);
  }

  @Get('rooms')
  async getUserRooms(@User('id') userId: string) {
    return this.chatService.getUserRooms(userId);
  }

  @Post('rooms/:roomId/messages')
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'images', maxCount: 5 },
      { name: 'videos', maxCount: 2 },
      { name: 'files', maxCount: 5 },
    ]),
  )
  async sendMessage(
    @User('id') userId: string,
    @Param('roomId') roomId: string,
    @Body() body: any,
    @UploadedFiles()
    files?: {
      images?: Express.Multer.File[];
      videos?: Express.Multer.File[];
      files?: Express.Multer.File[];
    },
  ) {
    return this.chatService.sendMessage(userId, roomId, body, files);
  }

  @Get('rooms/:roomId/messages')
  async getMessages(
    @User('id') userId: string,
    @Param('roomId') roomId: string,
    @Query() query: any,
  ) {
    return this.chatService.getMessages(userId, roomId, query);
  }
}
