import { Module, Global } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { DatabaseModule } from '../../configs/database/database.module';
import { RedisModule } from '../../configs/redis/redis.module';
import { InterestService } from './interest.service';
import { InterestController } from './interest.controller';
import { PreferenceProcessor } from './preference.processor';
import { RecommendationService } from './recommendation.service';
import { RecommendationController } from './recommendation.controller';
import { RecommendationWarmupService } from './recommendation-warmup.service';
import { Neo4jModule } from '../../configs/neo4j/neo4j.module';

@Global()
@Module({
  imports: [
    DatabaseModule,
    RedisModule,
    Neo4jModule,
    BullModule.registerQueue({ name: 'preference-scoring' }),
  ],
  controllers: [InterestController, RecommendationController],
  providers: [
    InterestService,
    PreferenceProcessor,
    RecommendationService,
    RecommendationWarmupService,
  ],
  exports: [InterestService, RecommendationService],
})
export class InterestModule {}
