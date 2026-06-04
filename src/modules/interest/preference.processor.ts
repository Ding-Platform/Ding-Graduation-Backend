import { Processor, Process } from '@nestjs/bull';
import { Job } from 'bull';
import { PinoLogger } from 'nestjs-pino';
import { InterestService, AuditScoreJobData } from './interest.service';

@Processor('preference-scoring')
export class PreferenceProcessor {
  constructor(
    private readonly interestService: InterestService,
    private readonly logger: PinoLogger,
  ) {
    this.logger.setContext(PreferenceProcessor.name);
  }

  @Process('score-audit-event')
  async handleScoreAuditEvent(job: Job<AuditScoreJobData>) {
    try {
      return await this.interestService.scoreAuditEvent(job.data);
    } catch (error) {
      this.logger.error(
        { err: error, jobId: job.id, action: job.data.action },
        'Failed to score audit event',
      );
      throw error;
    }
  }
}
