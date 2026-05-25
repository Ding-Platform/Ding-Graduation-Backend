import { Injectable, Logger } from '@nestjs/common';
import {
  InterventionMethod,
  SentimentContentType,
  SentimentEventType,
} from '@prisma/client';
import { DatabaseService } from 'src/configs/database/database.service';
import { NoroService } from '../noro/noro.service';
import {
  SENTIMENT_THRESHOLDS,
  SENTIMENT_WEIGHTS,
} from './sentiment.constants';
import {
  computeAggregateScore,
  tokenizeSentences,
  tokenizeWords,
} from './tokenizer';

@Injectable()
export class SentimentService {
  private readonly logger = new Logger(SentimentService.name);

  constructor(
    private readonly db: DatabaseService,
    private readonly noroService: NoroService,
  ) {}

  private getAuthorEventType(contentType: SentimentContentType): SentimentEventType {
    if (contentType === 'POST') return 'AUTHORED_POST';
    if (contentType === 'COMMENT') return 'AUTHORED_COMMENT';
    return 'AUTHORED_REEL';
  }

  private normalizeScore(positive: number) {
    const safePositive = Math.max(0, Math.min(100, Number(positive.toFixed(2))));
    return {
      positive: safePositive,
      negative: Number((100 - safePositive).toFixed(2)),
    };
  }

  async analyzeContent(
    text: string,
    contentType: SentimentContentType,
    contentId: string,
    userId: string,
  ) {
    const normalizedText = (text ?? '').trim();
    if (!normalizedText) {
      return { skipped: true, reason: 'Empty content' };
    }

    const wordTokens = tokenizeWords(normalizedText);
    const sentenceTokens = tokenizeSentences(normalizedText);
    const aggregate = computeAggregateScore(wordTokens, sentenceTokens);

    await this.db.contentSentiment.upsert({
      where: {
        contentType_contentId: {
          contentType,
          contentId,
        },
      },
      create: {
        contentType,
        contentId,
        userId,
        positiveScore: aggregate.positiveScore,
        negativeScore: aggregate.negativeScore,
        wordTokens: wordTokens as unknown as object,
        sentenceTokens: sentenceTokens as unknown as object,
        rawText: normalizedText,
      },
      update: {
        userId,
        positiveScore: aggregate.positiveScore,
        negativeScore: aggregate.negativeScore,
        wordTokens: wordTokens as unknown as object,
        sentenceTokens: sentenceTokens as unknown as object,
        rawText: normalizedText,
      },
    });

    await this.applyContentSentiment(
      userId,
      aggregate.positiveScore,
      aggregate.negativeScore,
      this.getAuthorEventType(contentType),
      contentId,
    );

    return {
      positiveScore: aggregate.positiveScore,
      negativeScore: aggregate.negativeScore,
      wordTokens,
      sentenceTokens,
    };
  }

  async applyContentSentiment(
    userId: string,
    positive: number,
    negative: number,
    eventType: SentimentEventType,
    sourceContentId?: string,
    sourceUserId?: string,
  ) {
    const existing = await this.db.userSentimentProfile.findUnique({
      where: { userId },
    });

    const basePositive = existing?.positivePoints ?? 50;
    const baseNegative = existing?.negativePoints ?? 50;

    const blendedPositive =
      SENTIMENT_WEIGHTS.eventWeight * positive +
      SENTIMENT_WEIGHTS.historyWeight * basePositive;
    const blendedNegative =
      SENTIMENT_WEIGHTS.eventWeight * negative +
      SENTIMENT_WEIGHTS.historyWeight * baseNegative;

    const normalized = this.normalizeScore(blendedPositive);

    const profile = await this.db.userSentimentProfile.upsert({
      where: { userId },
      create: {
        userId,
        positivePoints: normalized.positive,
        negativePoints: normalized.negative,
        totalEventsProcessed: 1,
        lastUpdated: new Date(),
      },
      update: {
        positivePoints: normalized.positive,
        negativePoints: normalized.negative,
        totalEventsProcessed: { increment: 1 },
        lastUpdated: new Date(),
      },
    });

    await this.db.sentimentEvent.create({
      data: {
        userId,
        eventType,
        sourceContentId,
        sourceUserId,
        positiveImpact: Number((positive - basePositive).toFixed(2)),
        negativeImpact: Number((negative - baseNegative).toFixed(2)),
        resultPositive: profile.positivePoints,
        resultNegative: profile.negativePoints,
      },
    });

    await this.checkAndTriggerIntervention(userId);

    return profile;
  }

  async applyReactionSentiment(
    reactorUserId: string,
    contentId: string,
    contentType: SentimentContentType,
    eventType: SentimentEventType,
  ) {
    const sentiment = await this.db.contentSentiment.findUnique({
      where: {
        contentType_contentId: {
          contentType,
          contentId,
        },
      },
    });

    if (!sentiment) {
      return { skipped: true, reason: 'No source sentiment found' };
    }

    const multiplier =
      eventType === 'VIEWED_REEL'
        ? SENTIMENT_WEIGHTS.reelViewWeight
        : SENTIMENT_WEIGHTS.reactionWeight;

    const positive = sentiment.positiveScore * multiplier;
    const negative = sentiment.negativeScore * multiplier;

    return this.applyContentSentiment(
      reactorUserId,
      positive,
      negative,
      eventType,
      contentId,
      sentiment.userId,
    );
  }

  async applyCommentInteraction(
    commenterId: string,
    parentContentId: string,
    parentContentType: SentimentContentType,
    commentText: string,
    commentId?: string,
  ) {
    const commentAnalysis = await this.analyzeContent(
      commentText,
      'COMMENT',
      commentId ?? `virtual-${commenterId}-${Date.now()}`,
      commenterId,
    );

    if ('skipped' in commentAnalysis && commentAnalysis.skipped) {
      return commentAnalysis;
    }

    const parentSentiment = await this.db.contentSentiment.findUnique({
      where: {
        contentType_contentId: {
          contentType: parentContentType,
          contentId: parentContentId,
        },
      },
    });

    if (!parentSentiment) {
      return { skipped: true, reason: 'No parent content sentiment found' };
    }

    const commentPositive = Number(
      (commentAnalysis as { positiveScore: number }).positiveScore ?? 50,
    );
    const sameDirection =
      (commentPositive >= 50 && parentSentiment.positiveScore >= 50) ||
      (commentPositive < 50 && parentSentiment.positiveScore < 50);

    const inheritedPositive = sameDirection
      ? parentSentiment.positiveScore
      : 100 - parentSentiment.positiveScore;

    return this.applyContentSentiment(
      commenterId,
      inheritedPositive,
      100 - inheritedPositive,
      'COMMENTED_ON_POST',
      parentContentId,
      parentSentiment.userId,
    );
  }

  async checkAndTriggerIntervention(userId: string) {
    const profile = await this.db.userSentimentProfile.findUnique({
      where: { userId },
    });

    if (!profile) return { skipped: true, reason: 'No sentiment profile' };
    if (profile.negativePoints < SENTIMENT_THRESHOLDS.interventionNegativeScore) {
      return { skipped: true, reason: 'Below threshold' };
    }

    const now = Date.now();
    const withinCooldown =
      profile.lastInterventionAt &&
      now - profile.lastInterventionAt.getTime() <
        SENTIMENT_THRESHOLDS.interventionCooldownMs;

    if (profile.noroActive && !withinCooldown) {
      await this.db.userSentimentProfile.update({
        where: { userId },
        data: { noroActive: false, lastUpdated: new Date() },
      });
    }

    if ((profile.noroActive && withinCooldown) || withinCooldown) {
      return { skipped: true, reason: 'Intervention active or in cooldown' };
    }

    return this.triggerNoroIntervention(userId, profile.negativePoints);
  }

  async triggerNoroIntervention(userId: string, negativePoints: number) {
    const outcome = await this.noroService.handleSentimentIntervention(
      userId,
      negativePoints,
    );

    const method = outcome.method as InterventionMethod;

    await this.db.$transaction(async (tx) => {
      await tx.noroIntervention.create({
        data: {
          userId,
          method,
          triggerScore: negativePoints,
          conversationId: outcome.conversationId,
          suggestedFriendIds: outcome.suggestedFriendIds ?? [],
        },
      });

      await tx.userSentimentProfile.update({
        where: { userId },
        data: {
          noroActive: true,
          lastInterventionAt: new Date(),
          interventionCount: { increment: 1 },
          feedBoostPositive: method === 'FEED_BOOST',
          feedBoostUntil:
            method === 'FEED_BOOST'
              ? new Date(Date.now() + SENTIMENT_THRESHOLDS.feedBoostDurationMs)
              : null,
          lastUpdated: new Date(),
        },
      });
    });

    this.logger.warn(
      `Noro intervention triggered for user=${userId}, method=${method}, score=${negativePoints}`,
    );

    return outcome;
  }
}
