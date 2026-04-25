import { Module } from '@nestjs/common';
import { CallGateway } from './call.gateway';
import { CallService } from './call.service';
import { CallController } from './call.controller';
import { DatabaseModule } from '../../configs/database/database.module';
import { RedisModule } from '../../configs/redis/redis.module';

@Module({
  imports: [DatabaseModule, RedisModule],
  providers: [CallGateway, CallService],
  controllers: [CallController],
  exports: [CallService],
})
export class CallModule {}
