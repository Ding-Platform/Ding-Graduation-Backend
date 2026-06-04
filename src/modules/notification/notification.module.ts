import { Module, Global } from '@nestjs/common';
import { NotificationController } from './notification.controller';
import { NotificationService } from './notification.service';
import { DatabaseModule } from '../../configs/database/database.module';
import { NotificationGateway } from './notification.gateway';

@Global()
@Module({
  imports: [DatabaseModule],
  controllers: [NotificationController],
  providers: [NotificationService, NotificationGateway],
  exports: [NotificationService],
})
export class NotificationModule {}
