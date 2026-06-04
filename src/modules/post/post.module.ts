import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { CloudinaryModule } from '../../common/services/cloudinary/cloudinary.module';
import { NotificationModule } from '../notification/notification.module';
import { HelperModule } from '../../common/utils/helper/helper.module';
import { RedisModule } from '../../configs/redis/redis.module';
import { AuditModule } from '../audit/audit.module';

@Module({
  imports: [
    CloudinaryModule,
    NotificationModule,
    HelperModule,
    RedisModule,
    AuditModule,
    BullModule.registerQueue({
      name: 'graph-sync',
    }),
    BullModule.registerQueue({
      name: 'sentiment-analysis',
    }),
    BullModule.registerQueue({
      name: 'search-indexing',
    }),
  ],
  controllers: [PostController],
  providers: [PostService],
  exports: [PostService],
})
export class PostModule {}
