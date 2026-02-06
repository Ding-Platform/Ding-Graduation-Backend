import { Controller, Post, Get, Body, UseGuards, Req } from '@nestjs/common';
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
}
