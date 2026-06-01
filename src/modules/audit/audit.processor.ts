import { Processor, Process } from '@nestjs/bull';
import { Job } from 'bull';
import { PinoLogger } from 'nestjs-pino';
import { DatabaseService } from '../../configs/database/database.service';
import { AuditPersistJobData } from './audit.types';

@Processor('audit-processing')
export class AuditProcessor {
  constructor(
    private readonly prisma: DatabaseService,
    private readonly logger: PinoLogger,
  ) {
    this.logger.setContext(AuditProcessor.name);
  }

  @Process('persist-audit-log')
  async handlePersist(job: Job<AuditPersistJobData>) {
    const {
      userId,
      action,
      sessionId,
      targetType,
      targetId,
      textSnapshot,
      metadata,
    } = job.data;

    if (!userId || !action) {
      this.logger.warn({ jobId: job.id }, 'Invalid audit job payload');
      return;
    }

    try {
      await this.prisma.userAuditLog.create({
        data: {
          userId,
          action,
          sessionId: sessionId ?? null,
          targetType: targetType ?? null,
          targetId: targetId ?? null,
          textSnapshot: textSnapshot ?? null,
          metadata: metadata ?? undefined,
        },
      });
    } catch (error) {
      this.logger.error(
        { err: error, jobId: job.id, action, userId },
        'Failed to persist audit log',
      );
      throw error;
    }
  }
}
