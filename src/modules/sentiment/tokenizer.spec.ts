import {
  computeAggregateScore,
  tokenizeSentences,
  tokenizeWords,
} from './tokenizer';

describe('Sentiment tokenizer', () => {
  it('keeps token polarity sums at 100', () => {
    const wordTokens = tokenizeWords('I am very happy but not sad');
    const sentenceTokens = tokenizeSentences('I am very happy but not sad.');

    for (const token of [...wordTokens, ...sentenceTokens]) {
      expect(token.positive + token.negative).toBe(100);
    }
  });

  it('handles negation', () => {
    const tokens = tokenizeWords('not happy');
    expect(tokens[1].negative).toBeGreaterThan(tokens[1].positive);
  });

  it('handles intensifiers', () => {
    const plain = tokenizeWords('happy')[0].positive;
    const boosted = tokenizeWords('very happy')[1].positive;
    expect(boosted).toBeGreaterThanOrEqual(plain);
  });

  it('aggregate score always sums to 100', () => {
    const aggregate = computeAggregateScore(
      tokenizeWords('I feel awful and alone'),
      tokenizeSentences('I feel awful and alone.'),
    );
    expect(aggregate.positiveScore + aggregate.negativeScore).toBe(100);
  });
});
