import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  BadRequestException,
  Query,
  DefaultValuePipe,
  ParseIntPipe,
} from '@nestjs/common';
import { InterestService } from './interest.service';
import { JwtAuthenticationGuard } from '../../common/guards/strategy.guards/jwt.guard';
import { currentUser } from '../../common/decorators/currentUser.decorator';
import { IsString, IsEnum, IsNumber, Min } from 'class-validator';

export class RecordDwellTimeDto {
  @IsString()
  contentId: string;

  @IsEnum(['POST', 'REEL'])
  contentType: 'POST' | 'REEL';

  @IsNumber()
  @Min(1)
  durationSec: number;
}

@UseGuards(JwtAuthenticationGuard)
@Controller('interest')
export class InterestController {
  constructor(private readonly interestService: InterestService) {}

  @Get('preferences')
  async getPreferences(
    @currentUser() user: { id: string },
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
  ) {
    if (!user?.id) throw new BadRequestException('User missing');
    const preferences = await this.interestService.getCachedTopInterests(
      user.id,
      limit,
    );
    return { preferences };
  }

  @Post('/dwell')
  async recordDwellTime(
    @currentUser() user: { id: string },
    @Body() dto: RecordDwellTimeDto,
  ) {
    if (!user || !user.id) throw new BadRequestException('User missing');
    return this.interestService.processDwellTime(
      user.id,
      dto.contentId,
      dto.contentType,
      dto.durationSec,
    );
  }
}
