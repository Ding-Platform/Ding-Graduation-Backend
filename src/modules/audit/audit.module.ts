import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { DatabaseModule } from '../../configs/database/database.module';
import { AuditLogService } from './audit-log.service';
import { AuditProcessor } from './audit.processor';
import { AuditController } from './audit.controller';

@Module({
  imports: [
    DatabaseModule,
    BullModule.registerQueue(
      { name: 'audit-processing' },
      { name: 'sentiment-analysis' },
      { name: 'preference-scoring' },
    ),
  ],
  controllers: [AuditController],
  providers: [AuditLogService, AuditProcessor],
  exports: [AuditLogService],
})
export class AuditModule {}
