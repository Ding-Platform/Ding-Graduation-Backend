import { Module, OnModuleInit } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { SearchController } from './search.controller';
import { SearchService } from './search.service';
import { SearchWorker } from './search.worker';
import { MeilisearchProvider } from './meilisearch.provider';
import { DatabaseModule } from '../../configs/database/database.module';
import { RedisModule } from '../../configs/redis/redis.module';
import { AuditModule } from '../audit/audit.module';
import { ActivityModule } from '../activity/activity.module';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'search-indexing',
    }),
    DatabaseModule,
    RedisModule,
    AuditModule,
    ActivityModule,
  ],
  controllers: [SearchController],
  providers: [SearchService, SearchWorker, MeilisearchProvider],
  exports: [SearchService],
})
export class SearchModule implements OnModuleInit {
  constructor(private readonly searchService: SearchService) {}

  async onModuleInit() {
    try {
      await this.searchService.createIndexes();
      console.log('MeiliSearch indexes created successfully');
    } catch (error) {
      console.error('Error creating MeiliSearch indexes:', error);
    }
  }
}
