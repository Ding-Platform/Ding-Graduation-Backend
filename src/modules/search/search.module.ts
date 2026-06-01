import { Module, OnModuleInit } from '@nestjs/common';
import { SearchController } from './search.controller';
import { SearchService } from './search.service';
import { RedisModule } from '../../configs/redis/redis.module';
import { SearchWorker } from './search.worker';
import { MeilisearchProvider } from './meilisearch.provider';
import { BullModule } from '@nestjs/bull';
import { DatabaseModule } from '../../configs/database/database.module';

@Module({
  imports: [
    RedisModule,
    BullModule.registerQueue({
      name: 'search-indexing',
    }),
    DatabaseModule,
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
      // Don't throw error to allow app to start even if MeiliSearch is not ready
    }
  }
}
