import {
  Controller,
  Get,
  Delete,
  Param,
  Query,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { ActivityService } from './activity.service';
import { JwtAuthenticationGuard } from '../../common/guards/strategy.guards/jwt.guard';
import { currentUser } from '../../common/decorators/currentUser.decorator';

@UseGuards(JwtAuthenticationGuard)
@Controller('activity')
export class ActivityController {
  constructor(private readonly activityService: ActivityService) {}

  @Get()
  async getMyActivity(
    @currentUser() user: { id: string },
    @Query('page', ParseIntPipe) page = 1,
    @Query('limit', ParseIntPipe) limit = 20,
  ) {
    return this.activityService.getUserActivity(user.id, page, limit);
  }

  @Delete('clear')
  async clearMyHistory(@currentUser() user: { id: string }) {
    return this.activityService.clearHistory(user.id);
  }

  @Delete(':id')
  async deleteLog(
    @currentUser() user: { id: string },
    @Param('id') logId: string,
  ) {
    return this.activityService.deleteActivity(user.id, logId);
  }
}
