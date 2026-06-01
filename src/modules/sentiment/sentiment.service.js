"use strict";
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SentimentService = void 0;
var common_1 = require("@nestjs/common");
var sentiment_constants_1 = require("./sentiment.constants");
var tokenizer_1 = require("./tokenizer");
var categorizer_1 = require("./categorizer");
var SentimentService = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var SentimentService = _classThis = /** @class */ (function () {
        function SentimentService_1(db, noroService) {
            this.db = db;
            this.noroService = noroService;
            this.logger = new common_1.Logger(SentimentService.name);
        }
        SentimentService_1.prototype.getAuthorEventType = function (contentType) {
            if (contentType === 'POST')
                return 'AUTHORED_POST';
            if (contentType === 'COMMENT')
                return 'AUTHORED_COMMENT';
            return 'AUTHORED_REEL';
        };
        SentimentService_1.prototype.normalizeScore = function (positive) {
            var safePositive = Math.max(0, Math.min(100, Number(positive.toFixed(2))));
            return {
                positive: safePositive,
                negative: Number((100 - safePositive).toFixed(2)),
            };
        };
        SentimentService_1.prototype.analyzeContent = function (text, contentType, contentId, userId) {
            return __awaiter(this, void 0, void 0, function () {
                var normalizedText, wordTokens, sentenceTokens, aggregate, categories, err_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            normalizedText = (text !== null && text !== void 0 ? text : '').trim();
                            if (!normalizedText) {
                                return [2 /*return*/, { skipped: true, reason: 'Empty content' }];
                            }
                            wordTokens = (0, tokenizer_1.tokenizeWords)(normalizedText);
                            sentenceTokens = (0, tokenizer_1.tokenizeSentences)(normalizedText);
                            aggregate = (0, tokenizer_1.computeAggregateScore)(wordTokens, sentenceTokens);
                            categories = (0, categorizer_1.extractCategories)(normalizedText);
                            if (!(categories.length > 0)) return [3 /*break*/, 7];
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 6, , 7]);
                            if (!(contentType === 'POST')) return [3 /*break*/, 3];
                            return [4 /*yield*/, this.db.post.update({ where: { id: contentId }, data: { categories: categories } })];
                        case 2:
                            _a.sent();
                            return [3 /*break*/, 5];
                        case 3:
                            if (!(contentType === 'REEL')) return [3 /*break*/, 5];
                            return [4 /*yield*/, this.db.reel.update({ where: { id: contentId }, data: { categories: categories } })];
                        case 4:
                            _a.sent();
                            _a.label = 5;
                        case 5: return [3 /*break*/, 7];
                        case 6:
                            err_1 = _a.sent();
                            this.logger.warn("Failed to update categories for ".concat(contentType, " ").concat(contentId, ": ").concat(err_1.message));
                            return [3 /*break*/, 7];
                        case 7: return [4 /*yield*/, this.db.contentSentiment.upsert({
                                where: {
                                    contentType_contentId: {
                                        contentType: contentType,
                                        contentId: contentId,
                                    },
                                },
                                create: {
                                    contentType: contentType,
                                    contentId: contentId,
                                    userId: userId,
                                    positiveScore: aggregate.positiveScore,
                                    negativeScore: aggregate.negativeScore,
                                    wordTokens: wordTokens,
                                    sentenceTokens: sentenceTokens,
                                    rawText: normalizedText,
                                },
                                update: {
                                    userId: userId,
                                    positiveScore: aggregate.positiveScore,
                                    negativeScore: aggregate.negativeScore,
                                    wordTokens: wordTokens,
                                    sentenceTokens: sentenceTokens,
                                    rawText: normalizedText,
                                },
                            })];
                        case 8:
                            _a.sent();
                            return [4 /*yield*/, this.applyContentSentiment(userId, aggregate.positiveScore, aggregate.negativeScore, this.getAuthorEventType(contentType), contentId)];
                        case 9:
                            _a.sent();
                            return [2 /*return*/, {
                                    positiveScore: aggregate.positiveScore,
                                    negativeScore: aggregate.negativeScore,
                                    wordTokens: wordTokens,
                                    sentenceTokens: sentenceTokens,
                                }];
                    }
                });
            });
        };
        SentimentService_1.prototype.applyContentSentiment = function (userId, positive, negative, eventType, sourceContentId, sourceUserId) {
            return __awaiter(this, void 0, void 0, function () {
                var existing, basePositive, baseNegative, blendedPositive, blendedNegative, normalized, profile;
                var _a, _b;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0: return [4 /*yield*/, this.db.userSentimentProfile.findUnique({
                                where: { userId: userId },
                            })];
                        case 1:
                            existing = _c.sent();
                            basePositive = (_a = existing === null || existing === void 0 ? void 0 : existing.positivePoints) !== null && _a !== void 0 ? _a : 50;
                            baseNegative = (_b = existing === null || existing === void 0 ? void 0 : existing.negativePoints) !== null && _b !== void 0 ? _b : 50;
                            blendedPositive = sentiment_constants_1.SENTIMENT_WEIGHTS.eventWeight * positive +
                                sentiment_constants_1.SENTIMENT_WEIGHTS.historyWeight * basePositive;
                            blendedNegative = sentiment_constants_1.SENTIMENT_WEIGHTS.eventWeight * negative +
                                sentiment_constants_1.SENTIMENT_WEIGHTS.historyWeight * baseNegative;
                            normalized = this.normalizeScore(blendedPositive);
                            return [4 /*yield*/, this.db.userSentimentProfile.upsert({
                                    where: { userId: userId },
                                    create: {
                                        userId: userId,
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
                                })];
                        case 2:
                            profile = _c.sent();
                            return [4 /*yield*/, this.db.sentimentEvent.create({
                                    data: {
                                        userId: userId,
                                        eventType: eventType,
                                        sourceContentId: sourceContentId,
                                        sourceUserId: sourceUserId,
                                        positiveImpact: Number((positive - basePositive).toFixed(2)),
                                        negativeImpact: Number((negative - baseNegative).toFixed(2)),
                                        resultPositive: profile.positivePoints,
                                        resultNegative: profile.negativePoints,
                                    },
                                })];
                        case 3:
                            _c.sent();
                            return [4 /*yield*/, this.checkAndTriggerIntervention(userId)];
                        case 4:
                            _c.sent();
                            return [2 /*return*/, profile];
                    }
                });
            });
        };
        SentimentService_1.prototype.applyReactionSentiment = function (reactorUserId, contentId, contentType, eventType) {
            return __awaiter(this, void 0, void 0, function () {
                var sentiment, multiplier, positive, negative;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.db.contentSentiment.findUnique({
                                where: {
                                    contentType_contentId: {
                                        contentType: contentType,
                                        contentId: contentId,
                                    },
                                },
                            })];
                        case 1:
                            sentiment = _a.sent();
                            if (!sentiment) {
                                return [2 /*return*/, { skipped: true, reason: 'No source sentiment found' }];
                            }
                            multiplier = eventType === 'VIEWED_REEL'
                                ? sentiment_constants_1.SENTIMENT_WEIGHTS.reelViewWeight
                                : sentiment_constants_1.SENTIMENT_WEIGHTS.reactionWeight;
                            positive = sentiment.positiveScore * multiplier;
                            negative = sentiment.negativeScore * multiplier;
                            return [2 /*return*/, this.applyContentSentiment(reactorUserId, positive, negative, eventType, contentId, sentiment.userId)];
                    }
                });
            });
        };
        SentimentService_1.prototype.applyCommentInteraction = function (commenterId, parentContentId, parentContentType, commentText, commentId) {
            return __awaiter(this, void 0, void 0, function () {
                var commentAnalysis, parentSentiment, commentPositive, sameDirection, inheritedPositive;
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, this.analyzeContent(commentText, 'COMMENT', commentId !== null && commentId !== void 0 ? commentId : "virtual-".concat(commenterId, "-").concat(Date.now()), commenterId)];
                        case 1:
                            commentAnalysis = _b.sent();
                            if ('skipped' in commentAnalysis && commentAnalysis.skipped) {
                                return [2 /*return*/, commentAnalysis];
                            }
                            return [4 /*yield*/, this.db.contentSentiment.findUnique({
                                    where: {
                                        contentType_contentId: {
                                            contentType: parentContentType,
                                            contentId: parentContentId,
                                        },
                                    },
                                })];
                        case 2:
                            parentSentiment = _b.sent();
                            if (!parentSentiment) {
                                return [2 /*return*/, { skipped: true, reason: 'No parent content sentiment found' }];
                            }
                            commentPositive = Number((_a = commentAnalysis.positiveScore) !== null && _a !== void 0 ? _a : 50);
                            sameDirection = (commentPositive >= 50 && parentSentiment.positiveScore >= 50) ||
                                (commentPositive < 50 && parentSentiment.positiveScore < 50);
                            inheritedPositive = sameDirection
                                ? parentSentiment.positiveScore
                                : 100 - parentSentiment.positiveScore;
                            return [2 /*return*/, this.applyContentSentiment(commenterId, inheritedPositive, 100 - inheritedPositive, 'COMMENTED_ON_POST', parentContentId, parentSentiment.userId)];
                    }
                });
            });
        };
        SentimentService_1.prototype.checkAndTriggerIntervention = function (userId) {
            return __awaiter(this, void 0, void 0, function () {
                var profile, now, withinCooldown;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.db.userSentimentProfile.findUnique({
                                where: { userId: userId },
                            })];
                        case 1:
                            profile = _a.sent();
                            if (!profile)
                                return [2 /*return*/, { skipped: true, reason: 'No sentiment profile' }];
                            if (profile.negativePoints < sentiment_constants_1.SENTIMENT_THRESHOLDS.interventionNegativeScore) {
                                return [2 /*return*/, { skipped: true, reason: 'Below threshold' }];
                            }
                            now = Date.now();
                            withinCooldown = profile.lastInterventionAt &&
                                now - profile.lastInterventionAt.getTime() <
                                    sentiment_constants_1.SENTIMENT_THRESHOLDS.interventionCooldownMs;
                            if (!(profile.noroActive && !withinCooldown)) return [3 /*break*/, 3];
                            return [4 /*yield*/, this.db.userSentimentProfile.update({
                                    where: { userId: userId },
                                    data: { noroActive: false, lastUpdated: new Date() },
                                })];
                        case 2:
                            _a.sent();
                            _a.label = 3;
                        case 3:
                            if ((profile.noroActive && withinCooldown) || withinCooldown) {
                                return [2 /*return*/, { skipped: true, reason: 'Intervention active or in cooldown' }];
                            }
                            return [2 /*return*/, this.triggerNoroIntervention(userId, profile.negativePoints)];
                    }
                });
            });
        };
        SentimentService_1.prototype.triggerNoroIntervention = function (userId, negativePoints) {
            return __awaiter(this, void 0, void 0, function () {
                var outcome, method;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.noroService.handleSentimentIntervention(userId, negativePoints)];
                        case 1:
                            outcome = _a.sent();
                            method = outcome.method;
                            return [4 /*yield*/, this.db.$transaction(function (tx) { return __awaiter(_this, void 0, void 0, function () {
                                    var _a;
                                    return __generator(this, function (_b) {
                                        switch (_b.label) {
                                            case 0: return [4 /*yield*/, tx.noroIntervention.create({
                                                    data: {
                                                        userId: userId,
                                                        method: method,
                                                        triggerScore: negativePoints,
                                                        conversationId: outcome.conversationId,
                                                        suggestedFriendIds: (_a = outcome.suggestedFriendIds) !== null && _a !== void 0 ? _a : [],
                                                    },
                                                })];
                                            case 1:
                                                _b.sent();
                                                return [4 /*yield*/, tx.userSentimentProfile.update({
                                                        where: { userId: userId },
                                                        data: {
                                                            noroActive: true,
                                                            lastInterventionAt: new Date(),
                                                            interventionCount: { increment: 1 },
                                                            feedBoostPositive: method === 'FEED_BOOST',
                                                            feedBoostUntil: method === 'FEED_BOOST'
                                                                ? new Date(Date.now() + sentiment_constants_1.SENTIMENT_THRESHOLDS.feedBoostDurationMs)
                                                                : null,
                                                            lastUpdated: new Date(),
                                                        },
                                                    })];
                                            case 2:
                                                _b.sent();
                                                return [2 /*return*/];
                                        }
                                    });
                                }); })];
                        case 2:
                            _a.sent();
                            this.logger.warn("Noro intervention triggered for user=".concat(userId, ", method=").concat(method, ", score=").concat(negativePoints));
                            return [2 /*return*/, outcome];
                    }
                });
            });
        };
        return SentimentService_1;
    }());
    __setFunctionName(_classThis, "SentimentService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        SentimentService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return SentimentService = _classThis;
}();
exports.SentimentService = SentimentService;
