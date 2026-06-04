import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { DatabaseModule } from '../../configs/database/database.module';
import { RedisModule } from '../../configs/redis/redis.module';
import { NotificationModule } from '../notification/notification.module';
import { ReelsController } from './reels.controller';
import { AudioTracksController } from './audio-tracks.controller';
import { ReelsService } from './reels.service';
import { AuditModule } from '../audit/audit.module';

@Module({
  imports: [
    DatabaseModule,
    RedisModule,
    NotificationModule,
    AuditModule,
    BullModule.registerQueue({
      name: 'sentiment-analysis',
    }),
  ],
  controllers: [ReelsController, AudioTracksController],
  providers: [ReelsService],
  exports: [ReelsService],
})
export class ReelsModule {}
