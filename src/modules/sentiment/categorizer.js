"use strict";
/**
 * Facebook-like Content Categorization mock
 * In a production system, this would be an ML model.
 * Here we use a keyword-based heuristic to assign topics.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractCategories = extractCategories;
var CATEGORY_MAP = {
    Sports: ['game', 'score', 'team', 'play', 'goal', 'football', 'soccer', 'basketball', 'tennis', 'match', 'player', 'athlete', 'win', 'lose', 'championship'],
    Technology: ['code', 'tech', 'software', 'hardware', 'programming', 'developer', 'startup', 'innovation', 'app', 'web', 'ai', 'computer', 'data', 'cloud', 'blockchain', 'algorithm'],
    Comedy: ['laugh', 'joke', 'funny', 'hilarious', 'humor', 'comedy', 'lol', 'lmao', 'rofl', 'meme', 'prank'],
    News: ['news', 'breaking', 'update', 'world', 'local', 'report', 'journalist', 'article', 'headline', 'politics', 'economy'],
    Gaming: ['esports', 'twitch', 'stream', 'gamer', 'console', 'xbox', 'playstation', 'nintendo', 'pc', 'rpg', 'fps', 'mmo', 'gameplay', 'gaming'],
    Music: ['song', 'album', 'artist', 'concert', 'band', 'guitar', 'piano', 'vocals', 'track', 'playlist', 'rap', 'pop', 'rock', 'jazz'],
    Education: ['learn', 'study', 'school', 'college', 'university', 'student', 'teacher', 'class', 'course', 'degree', 'book', 'read'],
    Food: ['recipe', 'cook', 'chef', 'restaurant', 'delicious', 'tasty', 'meal', 'dinner', 'lunch', 'breakfast', 'snack', 'dessert'],
    Travel: ['trip', 'vacation', 'journey', 'flight', 'hotel', 'resort', 'beach', 'mountain', 'explore', 'adventure', 'tourist', 'destination'],
};
function extractCategories(text) {
    if (!text)
        return [];
    var normalizedText = text.toLowerCase();
    var foundCategories = new Set();
    for (var _i = 0, _a = Object.entries(CATEGORY_MAP); _i < _a.length; _i++) {
        var _b = _a[_i], category = _b[0], keywords = _b[1];
        for (var _c = 0, keywords_1 = keywords; _c < keywords_1.length; _c++) {
            var keyword = keywords_1[_c];
            // Basic word boundary check
            var regex = new RegExp("\\b".concat(keyword, "\\b"), 'i');
            if (regex.test(normalizedText)) {
                foundCategories.add(category);
                break; // Once we know it matches this category, move to the next category
            }
        }
    }
    return Array.from(foundCategories);
}
