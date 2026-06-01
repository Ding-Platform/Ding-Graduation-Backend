"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SENTIMENT_NEUTRAL_SCORE = exports.SENTIMENT_THRESHOLDS = exports.SENTIMENT_WEIGHTS = void 0;
exports.SENTIMENT_WEIGHTS = {
    wordWeight: 0.4,
    sentenceWeight: 0.6,
    eventWeight: 0.2,
    historyWeight: 0.8,
    reactionWeight: 0.5,
    reelViewWeight: 0.25,
};
exports.SENTIMENT_THRESHOLDS = {
    interventionNegativeScore: 70,
    conversationSeverityScore: 85,
    friendSuggestionSeverityScore: 78,
    interventionCooldownMs: 24 * 60 * 60 * 1000,
    feedBoostDurationMs: 48 * 60 * 60 * 1000,
};
exports.SENTIMENT_NEUTRAL_SCORE = 50;
