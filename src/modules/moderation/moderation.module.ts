import { Module } from '@nestjs/common';
import { ModerationService } from './moderation.service';
import { ModerationController } from './moderation.controller';
import { DatabaseModule } from '../../configs/database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [ModerationService],
  controllers: [ModerationController],
})
export class ModerationModule {}
