import { Controller, Get, Query, UseGuards, BadRequestException } from '@nestjs/common';
import { IsEnum, IsInt, IsOptional, Max, Min } from 'class-validator';
import { JwtAuthenticationGuard } from '../../common/guards/strategy.guards/jwt.guard';
import { currentUser } from '../../common/decorators/currentUser.decorator';
import { RecommendationService, RecommendationType } from './recommendation.service';

class ForYouQueryDto {
  @IsOptional()
  @IsEnum(['POST', 'REEL', 'ALL'])
  type?: RecommendationType;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(50)
  limit?: number;
}

@UseGuards(JwtAuthenticationGuard)
@Controller('recommendations')
export class RecommendationController {
  constructor(private readonly recommendationService: RecommendationService) {}

  @Get('for-you')
  async forYou(
    @currentUser() user: { id: string },
    @Query() query: ForYouQueryDto,
  ) {
    if (!user?.id) throw new BadRequestException('User missing');
    return this.recommendationService.getForYou(
      user.id,
      query.type ?? 'ALL',
      query.limit ?? 20,
    );
  }
}
