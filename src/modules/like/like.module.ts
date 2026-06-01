import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { LikeService } from './like.service';
import { LikeController } from './like.controller';
import { NotificationModule } from '../notification/notification.module';
import { AuditModule } from '../audit/audit.module';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'graph-sync',
    }),
    NotificationModule,
    AuditModule,
  ],
  controllers: [LikeController],
  providers: [LikeService],
})
export class LikeModule {}
