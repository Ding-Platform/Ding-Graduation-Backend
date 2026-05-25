export const SENTIMENT_WEIGHTS = {
  wordWeight: 0.4,
  sentenceWeight: 0.6,
  eventWeight: 0.2,
  historyWeight: 0.8,
  reactionWeight: 0.5,
  reelViewWeight: 0.25,
} as const;

export const SENTIMENT_THRESHOLDS = {
  interventionNegativeScore: 70,
  conversationSeverityScore: 85,
  friendSuggestionSeverityScore: 78,
  interventionCooldownMs: 24 * 60 * 60 * 1000,
  feedBoostDurationMs: 48 * 60 * 60 * 1000,
} as const;

export const SENTIMENT_NEUTRAL_SCORE = 50;
