import {
  INTENSIFIERS,
  NEGATION_WORDS,
  SENTIMENT_DICTIONARY,
} from './sentiment-dictionary';
import {
  SENTIMENT_NEUTRAL_SCORE,
  SENTIMENT_WEIGHTS,
} from './sentiment.constants';

export type WordToken = {
  word: string;
  positive: number;
  negative: number;
};

export type SentenceToken = {
  sentence: string;
  positive: number;
  negative: number;
};

function clampScore(score: number) {
  return Math.max(0, Math.min(100, Math.round(score)));
}

function toPolarity(score: number) {
  const positive = clampScore(score);
  return {
    positive,
    negative: 100 - positive,
  };
}

function invertPolarity(score: number) {
  return 100 - score;
}

function applyIntensifier(score: number) {
  const delta = score - SENTIMENT_NEUTRAL_SCORE;
  return SENTIMENT_NEUTRAL_SCORE + delta * 1.5;
}

function splitWords(text: string) {
  return text
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s'_-]/gu, ' ')
    .split(/\s+/)
    .map((w) => w.trim())
    .filter(Boolean);
}

export function tokenizeWords(text: string): WordToken[] {
  const words = splitWords(text);

  return words.map((word, index) => {
    const base = SENTIMENT_DICTIONARY[word] ?? SENTIMENT_NEUTRAL_SCORE;
    const prev = words[index - 1];
    const prevPrev = words[index - 2];

    const hasNegation =
      (prev && NEGATION_WORDS.includes(prev)) ||
      (prevPrev && NEGATION_WORDS.includes(prevPrev));
    const hasIntensifier =
      (prev && INTENSIFIERS.includes(prev)) ||
      (prevPrev && INTENSIFIERS.includes(prevPrev));

    let score = base;
    if (hasNegation) {
      score = invertPolarity(score);
    }
    if (hasIntensifier) {
      score = applyIntensifier(score);
    }

    const polarity = toPolarity(score);
    return {
      word,
      ...polarity,
    };
  });
}

function sentenceScore(sentence: string) {
  const words = splitWords(sentence);
  if (words.length === 0) return SENTIMENT_NEUTRAL_SCORE;

  let scoreTotal = 0;

  for (let i = 0; i < words.length; i++) {
    const word = words[i];
    const base = SENTIMENT_DICTIONARY[word] ?? SENTIMENT_NEUTRAL_SCORE;
    const prev = words[i - 1];
    const prevPrev = words[i - 2];

    let score = base;
    const hasNegation =
      (prev && NEGATION_WORDS.includes(prev)) ||
      (prevPrev && NEGATION_WORDS.includes(prevPrev));
    const hasIntensifier =
      (prev && INTENSIFIERS.includes(prev)) ||
      (prevPrev && INTENSIFIERS.includes(prevPrev));

    if (hasNegation) score = invertPolarity(score);
    if (hasIntensifier) score = applyIntensifier(score);

    scoreTotal += score;
  }

  let avg = scoreTotal / words.length;

  // Basic emoji signals
  if (/😊|😀|😁|❤️|💙|✨/u.test(sentence)) avg += 15;
  if (/😢|😭|😞|💔|😡|😰/u.test(sentence)) avg -= 15;

  // Basic sarcasm marker when "great" appears with a negative word
  if (
    sentence.toLowerCase().includes('great') &&
    /bad|terrible|awful|hate|broken|sad/u.test(sentence.toLowerCase())
  ) {
    avg -= 12;
  }

  return clampScore(avg);
}

export function tokenizeSentences(text: string): SentenceToken[] {
  const rawSentences = text
    .split(/(?<=[.!?])\s+|\n+/)
    .map((s) => s.trim())
    .filter(Boolean);

  if (rawSentences.length === 0 && text.trim()) {
    rawSentences.push(text.trim());
  }

  return rawSentences.map((sentence) => {
    const score = sentenceScore(sentence);
    const polarity = toPolarity(score);
    return {
      sentence,
      ...polarity,
    };
  });
}

export function computeAggregateScore(
  wordTokens: WordToken[],
  sentenceTokens: SentenceToken[],
): { positiveScore: number; negativeScore: number } {
  const wordAvg =
    wordTokens.length > 0
      ? wordTokens.reduce((sum, t) => sum + t.positive, 0) / wordTokens.length
      : SENTIMENT_NEUTRAL_SCORE;

  const sentenceAvg =
    sentenceTokens.length > 0
      ? sentenceTokens.reduce((sum, t) => sum + t.positive, 0) /
        sentenceTokens.length
      : wordAvg;

  const weighted =
    SENTIMENT_WEIGHTS.wordWeight * wordAvg +
    SENTIMENT_WEIGHTS.sentenceWeight * sentenceAvg;

  const positiveScore = clampScore(weighted);
  return {
    positiveScore,
    negativeScore: 100 - positiveScore,
  };
}
