import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { DatabaseModule } from '../../configs/database/database.module';
import { AuditLogService } from './audit-log.service';
import { AuditProcessor } from './audit.processor';

@Module({
  imports: [
    DatabaseModule,
    BullModule.registerQueue({
      name: 'audit-processing',
    }),
  ],
  providers: [AuditLogService, AuditProcessor],
  exports: [AuditLogService],
})
export class AuditModule {}
