import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  Delete,
  Query,
  UseGuards,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { NoroMessageRole, NoroTrigger } from '@prisma/client';
import { NoroService } from './noro.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { User } from '../../common/decorators/user.decorator';

@Controller('noro')
@UseGuards(JwtAuthGuard)
export class NoroController {
  constructor(private readonly noroService: NoroService) {}

  @Post('chat')
  async chat(@User() user: any, @Body('message') message: string) {
    return this.noroService.chat(user.id, message);
  }

  @Get('history')
  async getHistory(@User() user: any) {
    return this.noroService.getHistory(user.id);
  }

  @Post('conversations')
  async createConversation(
    @User() user: any,
    @Body('trigger') trigger?: NoroTrigger,
  ) {
    return this.noroService.createConversation(user.id, trigger);
  }

  @Get('conversations')
  async listConversations(
    @User() user: any,
    @Query('cursor') cursor?: string,
    @Query('limit') limit?: string,
  ) {
    return this.noroService.listConversations(
      user.id,
      cursor,
      limit ? Number(limit) : 20,
    );
  }

  @Post('conversations/:id/messages')
  async addMessage(
    @User() user: any,
    @Param('id') conversationId: string,
    @Body('role') role: NoroMessageRole,
    @Body('content') content: string,
  ) {
    const normalizedRole: NoroMessageRole = role || 'USER';
    return this.noroService.addMessage({
      conversationId,
      userId: user.id,
      role: normalizedRole,
      content,
    });
  }

  @Get('conversations/:id/messages')
  async getConversationMessages(
    @User() user: any,
    @Param('id') conversationId: string,
    @Query('cursor') cursor?: string,
    @Query('limit') limit?: string,
  ) {
    return this.noroService.getConversationMessages(
      user.id,
      conversationId,
      cursor,
      limit ? Number(limit) : 20,
    );
  }

  @Delete('conversations/:id')
  async deleteConversation(@User() user: any, @Param('id') conversationId: string) {
    await this.noroService.softDeleteConversation(user.id, conversationId);
    return { deleted: true };
  }

  @Post('crisis/report')
  async reportCrisis(
    @Body()
    body: {
      messageId?: string;
      crisisScore: number;
      keywords: string[];
    },
    @User() user: any,
  ) {
    return this.noroService.reportCrisis({
      userId: user.id,
      messageId: body.messageId,
      crisisScore: body.crisisScore,
      keywords: body.keywords || [],
    });
  }

  @Get('crisis/hotlines')
  async getHotlines(
    @Query('countryCode') countryCode: string,
    @Query('language') language?: string,
  ) {
    return this.noroService.getHotlines(countryCode, language || 'en');
  }

  @Post('crisis/intervention')
  async logIntervention(
    @User() user: any,
    @Body('crisisEventId') crisisEventId: string,
    @Body('type') type: string,
  ) {
    await this.noroService.logIntervention(user.id, crisisEventId, type);
    return { logged: true };
  }

  @Post('transcribe')
  @UseInterceptors(FileInterceptor('audio'))
  async transcribe(@UploadedFile() file: Express.Multer.File) {
    return this.noroService.transcribe(file);
  }

  @Post('speak')
  async speak(@Body('text') text: string) {
    return this.noroService.speak(text);
  }
}
