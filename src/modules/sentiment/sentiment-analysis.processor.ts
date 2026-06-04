import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { AuditAction, SentimentContentType, SentimentEventType } from '@prisma/client';
import { SentimentService } from './sentiment.service';

@Processor('sentiment-analysis')
export class SentimentAnalysisProcessor {
  constructor(private readonly sentimentService: SentimentService) {}

  @Process('analyze-content')
  async handleAnalyzeContent(
    job: Job<{
      text: string;
      contentType: SentimentContentType;
      contentId: string;
      userId: string;
    }>,
  ) {
    const { text, contentType, contentId, userId } = job.data;
    return this.sentimentService.analyzeContent(text, contentType, contentId, userId);
  }

  @Process('apply-reaction')
  async handleApplyReaction(
    job: Job<{
      reactorUserId: string;
      contentId: string;
      contentType: SentimentContentType;
      eventType: SentimentEventType;
    }>,
  ) {
    const { reactorUserId, contentId, contentType, eventType } = job.data;
    return this.sentimentService.applyReactionSentiment(
      reactorUserId,
      contentId,
      contentType,
      eventType,
    );
  }

  @Process('analyze-comment')
  async handleAnalyzeComment(
    job: Job<{
      commenterId: string;
      parentContentId: string;
      parentContentType: SentimentContentType;
      commentText: string;
      commentId?: string;
    }>,
  ) {
    const {
      commenterId,
      parentContentId,
      parentContentType,
      commentText,
      commentId,
    } = job.data;

    return this.sentimentService.applyCommentInteraction(
      commenterId,
      parentContentId,
      parentContentType,
      commentText,
      commentId,
    );
  }

  @Process('analyze-audit-text')
  async handleAnalyzeAuditText(
    job: Job<{
      auditLogId: string;
      userId: string;
      textSnapshot?: string;
      action: AuditAction;
    }>,
  ) {
    const { auditLogId, userId, textSnapshot, action } = job.data;
    if (!textSnapshot?.trim()) {
      return { skipped: true, reason: 'No text snapshot' };
    }
    return this.sentimentService.analyzeAuditText(
      userId,
      textSnapshot,
      action,
      auditLogId,
    );
  }
}
