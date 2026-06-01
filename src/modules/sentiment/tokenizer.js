"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenizeWords = tokenizeWords;
exports.tokenizeSentences = tokenizeSentences;
exports.computeAggregateScore = computeAggregateScore;
var sentiment_dictionary_1 = require("./sentiment-dictionary");
var sentiment_constants_1 = require("./sentiment.constants");
function clampScore(score) {
    return Math.max(0, Math.min(100, Math.round(score)));
}
function toPolarity(score) {
    var positive = clampScore(score);
    return {
        positive: positive,
        negative: 100 - positive,
    };
}
function invertPolarity(score) {
    return 100 - score;
}
function applyIntensifier(score) {
    var delta = score - sentiment_constants_1.SENTIMENT_NEUTRAL_SCORE;
    return sentiment_constants_1.SENTIMENT_NEUTRAL_SCORE + delta * 1.5;
}
function splitWords(text) {
    return text
        .toLowerCase()
        .replace(/[^\p{L}\p{N}\s'_-]/gu, ' ')
        .split(/\s+/)
        .map(function (w) { return w.trim(); })
        .filter(Boolean);
}
function tokenizeWords(text) {
    var words = splitWords(text);
    return words.map(function (word, index) {
        var _a;
        var base = (_a = sentiment_dictionary_1.SENTIMENT_DICTIONARY[word]) !== null && _a !== void 0 ? _a : sentiment_constants_1.SENTIMENT_NEUTRAL_SCORE;
        var prev = words[index - 1];
        var prevPrev = words[index - 2];
        var hasNegation = (prev && sentiment_dictionary_1.NEGATION_WORDS.includes(prev)) ||
            (prevPrev && sentiment_dictionary_1.NEGATION_WORDS.includes(prevPrev));
        var hasIntensifier = (prev && sentiment_dictionary_1.INTENSIFIERS.includes(prev)) ||
            (prevPrev && sentiment_dictionary_1.INTENSIFIERS.includes(prevPrev));
        var score = base;
        if (hasNegation) {
            score = invertPolarity(score);
        }
        if (hasIntensifier) {
            score = applyIntensifier(score);
        }
        var polarity = toPolarity(score);
        return __assign({ word: word }, polarity);
    });
}
function sentenceScore(sentence) {
    var _a;
    var words = splitWords(sentence);
    if (words.length === 0)
        return sentiment_constants_1.SENTIMENT_NEUTRAL_SCORE;
    var scoreTotal = 0;
    for (var i = 0; i < words.length; i++) {
        var word = words[i];
        var base = (_a = sentiment_dictionary_1.SENTIMENT_DICTIONARY[word]) !== null && _a !== void 0 ? _a : sentiment_constants_1.SENTIMENT_NEUTRAL_SCORE;
        var prev = words[i - 1];
        var prevPrev = words[i - 2];
        var score = base;
        var hasNegation = (prev && sentiment_dictionary_1.NEGATION_WORDS.includes(prev)) ||
            (prevPrev && sentiment_dictionary_1.NEGATION_WORDS.includes(prevPrev));
        var hasIntensifier = (prev && sentiment_dictionary_1.INTENSIFIERS.includes(prev)) ||
            (prevPrev && sentiment_dictionary_1.INTENSIFIERS.includes(prevPrev));
        if (hasNegation)
            score = invertPolarity(score);
        if (hasIntensifier)
            score = applyIntensifier(score);
        scoreTotal += score;
    }
    var avg = scoreTotal / words.length;
    // Basic emoji signals
    if (/😊|😀|😁|❤️|💙|✨/u.test(sentence))
        avg += 15;
    if (/😢|😭|😞|💔|😡|😰/u.test(sentence))
        avg -= 15;
    // Basic sarcasm marker when "great" appears with a negative word
    if (sentence.toLowerCase().includes('great') &&
        /bad|terrible|awful|hate|broken|sad/u.test(sentence.toLowerCase())) {
        avg -= 12;
    }
    return clampScore(avg);
}
function tokenizeSentences(text) {
    var rawSentences = text
        .split(/(?<=[.!?])\s+|\n+/)
        .map(function (s) { return s.trim(); })
        .filter(Boolean);
    if (rawSentences.length === 0 && text.trim()) {
        rawSentences.push(text.trim());
    }
    return rawSentences.map(function (sentence) {
        var score = sentenceScore(sentence);
        var polarity = toPolarity(score);
        return __assign({ sentence: sentence }, polarity);
    });
}
function computeAggregateScore(wordTokens, sentenceTokens) {
    var wordAvg = wordTokens.length > 0
        ? wordTokens.reduce(function (sum, t) { return sum + t.positive; }, 0) / wordTokens.length
        : sentiment_constants_1.SENTIMENT_NEUTRAL_SCORE;
    var sentenceAvg = sentenceTokens.length > 0
        ? sentenceTokens.reduce(function (sum, t) { return sum + t.positive; }, 0) /
            sentenceTokens.length
        : wordAvg;
    var weighted = sentiment_constants_1.SENTIMENT_WEIGHTS.wordWeight * wordAvg +
        sentiment_constants_1.SENTIMENT_WEIGHTS.sentenceWeight * sentenceAvg;
    var positiveScore = clampScore(weighted);
    return {
        positiveScore: positiveScore,
        negativeScore: 100 - positiveScore,
    };
}
