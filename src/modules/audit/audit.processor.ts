import { Processor, Process } from '@nestjs/bull';
import { InjectQueue } from '@nestjs/bull';
import { Job, Queue } from 'bull';
import { PinoLogger } from 'nestjs-pino';
import { DatabaseService } from '../../configs/database/database.service';
import { AuditPersistJobData } from './audit.types';

@Processor('audit-processing')
export class AuditProcessor {
  constructor(
    private readonly prisma: DatabaseService,
    private readonly logger: PinoLogger,
    @InjectQueue('sentiment-analysis') private readonly sentimentQueue: Queue,
    @InjectQueue('preference-scoring') private readonly preferenceQueue: Queue,
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
      const log = await this.prisma.userAuditLog.create({
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

      const fanOut = {
        auditLogId: log.id,
        userId,
        action,
        targetType: targetType ?? undefined,
        targetId: targetId ?? undefined,
        textSnapshot: textSnapshot ?? undefined,
        metadata,
      };

      if (textSnapshot?.trim()) {
        await this.sentimentQueue.add('analyze-audit-text', fanOut, {
          removeOnComplete: true,
          removeOnFail: 50,
        });
      }

      await this.preferenceQueue.add('score-audit-event', fanOut, {
        removeOnComplete: true,
        removeOnFail: 50,
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
