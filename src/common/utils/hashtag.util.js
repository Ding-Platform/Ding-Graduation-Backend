"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractHashtags = extractHashtags;
exports.mergeHashtags = mergeHashtags;
function extractHashtags(text) {
    if (!text)
        return [];
    // Match # followed by word characters (letters, digits, underscores)
    var regex = /#[\w]+/g;
    var matches = text.match(regex);
    if (!matches)
        return [];
    // Convert to lowercase and remove the '#' prefix
    var tags = matches.map(function (tag) { return tag.toLowerCase().replace('#', ''); });
    // Remove duplicates and empty strings
    return __spreadArray([], new Set(tags), true).filter(Boolean);
}
function mergeHashtags(extracted, provided) {
    var allTags = __spreadArray([], extracted, true);
    if (provided && Array.isArray(provided)) {
        // Normalize provided tags: strip '#' if present, lowercase
        var normalizedProvided = provided.map(function (tag) {
            return tag.toLowerCase().replace(/^#/, '');
        });
        allTags.push.apply(allTags, normalizedProvided);
    }
    // Return unique tags
    return __spreadArray([], new Set(allTags), true).filter(Boolean);
}
