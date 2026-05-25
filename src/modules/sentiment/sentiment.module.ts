import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { DatabaseModule } from 'src/configs/database/database.module';
import { NoroModule } from '../noro/noro.module';
import { SentimentService } from './sentiment.service';
import { SentimentAnalysisProcessor } from './sentiment-analysis.processor';

@Module({
  imports: [
    DatabaseModule,
    NoroModule,
    BullModule.registerQueue({
      name: 'sentiment-analysis',
    }),
  ],
  providers: [SentimentService, SentimentAnalysisProcessor],
  exports: [SentimentService],
})
export class SentimentModule {}
