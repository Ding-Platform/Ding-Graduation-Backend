import {
  Controller,
  Get,
  Patch,
  Param,
  UseGuards,
  Query,
} from '@nestjs/common';
import { NotificationService } from './notification.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { User } from '../../common/decorators/user.decorator';
import { NotificationResponseDto } from './dtos/notification-response.dto';
import { PaginationDto } from '../../common/dto/pagination.dto';

@Controller('notifications')
@UseGuards(JwtAuthGuard)
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Get()
  async getUserNotifications(
    @User('id') userId: string,
    @Query() pagination: PaginationDto,
  ) {
    return this.notificationService.getUserNotifications(userId, pagination);
  }

  @Get('unread-count')
  async getUnreadCount(@User('id') userId: string) {
    const count = await this.notificationService.getUnreadCount(userId);
    return { count };
  }

  @Patch(':id/read')
  async markAsRead(
    @User('id') userId: string,
    @Param('id') notificationId: string,
  ) {
    return this.notificationService.markAsRead(userId, notificationId);
  }

  @Patch('read-all')
  async markAllAsRead(@User('id') userId: string) {
    return this.notificationService.markAllAsRead(userId);
  }
}
