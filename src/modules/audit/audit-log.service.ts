import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { PinoLogger } from 'nestjs-pino';
import { AuditPersistJobData, AuditRecordContext } from './audit.types';

@Injectable()
export class AuditLogService {
  constructor(
    @InjectQueue('audit-processing') private readonly auditQueue: Queue,
    private readonly logger: PinoLogger,
  ) {
    this.logger.setContext(AuditLogService.name);
  }

  /**
   * Enqueue a server-authoritative audit event (non-blocking).
   */
  async record(ctx: AuditRecordContext): Promise<void> {
    if (!ctx.userId) {
      return;
    }

    const metadata: AuditPersistJobData['metadata'] = {
      ...(typeof ctx.metadata === 'object' && ctx.metadata !== null
        ? (ctx.metadata as Record<string, unknown>)
        : {}),
      ...(ctx.ipAddress ? { ipAddress: ctx.ipAddress } : {}),
      ...(ctx.userAgent ? { userAgent: ctx.userAgent } : {}),
    };

    const jobData: AuditPersistJobData = {
      userId: ctx.userId,
      action: ctx.action,
      sessionId: ctx.sessionId,
      targetType: ctx.targetType,
      targetId: ctx.targetId,
      textSnapshot: ctx.textSnapshot,
      metadata:
        Object.keys(metadata as object).length > 0 ? metadata : undefined,
    };

    try {
      await this.auditQueue.add('persist-audit-log', jobData, {
        removeOnComplete: true,
        removeOnFail: 100,
      });
    } catch (error) {
      this.logger.error(
        { err: error, action: ctx.action, userId: ctx.userId },
        'Failed to enqueue audit log',
      );
    }
  }
}
