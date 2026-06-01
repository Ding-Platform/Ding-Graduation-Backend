"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
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
exports.ReelsService = void 0;
var common_1 = require("@nestjs/common");
var hashtag_util_1 = require("../../common/utils/hashtag.util");
var ReelsService = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var ReelsService = _classThis = /** @class */ (function () {
        function ReelsService_1(prisma, redisService, notificationService, interestService, activityService, sentimentQueue) {
            this.prisma = prisma;
            this.redisService = redisService;
            this.notificationService = notificationService;
            this.interestService = interestService;
            this.activityService = activityService;
            this.sentimentQueue = sentimentQueue;
        }
        ReelsService_1.prototype.createUploadUrl = function (userId) {
            return __awaiter(this, void 0, void 0, function () {
                var reel, uploadKey;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.reel.create({
                                data: {
                                    userId: userId,
                                    status: 'PENDING',
                                },
                            })];
                        case 1:
                            reel = _a.sent();
                            uploadKey = "reels/raw/".concat(reel.id, ".mp4");
                            return [2 /*return*/, {
                                    reelId: reel.id,
                                    uploadUrl: "".concat(process.env.REELS_FAKE_UPLOAD_BASE_URL || 'https://uploads.ding.local', "/").concat(uploadKey),
                                    expiresAt: new Date(Date.now() + 15 * 60 * 1000).toISOString(),
                                }];
                    }
                });
            });
        };
        ReelsService_1.prototype.finalizeReel = function (userId, reelId, payload) {
            return __awaiter(this, void 0, void 0, function () {
                var reel, processingBase, mergedHashtags, finalized;
                var _this = this;
                var _a, _b, _c, _d;
                return __generator(this, function (_e) {
                    switch (_e.label) {
                        case 0: return [4 /*yield*/, this.prisma.reel.findUnique({ where: { id: reelId } })];
                        case 1:
                            reel = _e.sent();
                            if (!reel || reel.deletedAt) {
                                throw new common_1.NotFoundException('Reel not found');
                            }
                            if (reel.userId !== userId) {
                                throw new common_1.ForbiddenException('You do not own this reel');
                            }
                            if (!((payload.durationSec || 0) > 60)) return [3 /*break*/, 3];
                            return [4 /*yield*/, this.prisma.reel.update({
                                    where: { id: reelId },
                                    data: {
                                        status: 'FAILED',
                                        failReason: 'EXCEEDS_60S',
                                        rawVideoKey: payload.rawVideoKey,
                                    },
                                })];
                        case 2:
                            _e.sent();
                            throw new common_1.BadRequestException('Video duration cannot exceed 60 seconds');
                        case 3:
                            processingBase = process.env.REELS_CDN_BASE_URL || 'https://cdn.ding.local';
                            mergedHashtags = (0, hashtag_util_1.mergeHashtags)((0, hashtag_util_1.extractHashtags)(payload.caption), payload.hashtags);
                            if (mergedHashtags.length > 0) {
                                Promise.all(mergedHashtags.map(function (tag) { return _this.redisService.zIncrBy('trending_hashtags', 1, tag); })).catch(function (err) { return console.error('Failed to update trending hashtags', err); });
                            }
                            return [4 /*yield*/, this.prisma.reel.update({
                                    where: { id: reelId },
                                    data: {
                                        status: 'READY',
                                        rawVideoKey: payload.rawVideoKey,
                                        caption: payload.caption,
                                        hashtags: mergedHashtags,
                                        audioTrackId: payload.audioTrackId,
                                        audioOffsetMs: (_a = payload.audioOffsetMs) !== null && _a !== void 0 ? _a : 0,
                                        durationSec: (_b = payload.durationSec) !== null && _b !== void 0 ? _b : 30,
                                        width: (_c = payload.width) !== null && _c !== void 0 ? _c : 1080,
                                        height: (_d = payload.height) !== null && _d !== void 0 ? _d : 1920,
                                        fileSizeBytes: payload.fileSizeBytes
                                            ? BigInt(payload.fileSizeBytes)
                                            : null,
                                        videoUrl: "".concat(processingBase, "/reels/").concat(reelId, "/video.mp4"),
                                        thumbnailUrl: "".concat(processingBase, "/reels/").concat(reelId, "/thumb.jpg"),
                                        failReason: null,
                                    },
                                })];
                        case 4:
                            finalized = _e.sent();
                            return [4 /*yield*/, this.sentimentQueue.add('analyze-content', {
                                    text: payload.caption || '',
                                    contentType: 'REEL',
                                    contentId: reelId,
                                    userId: userId,
                                }, {
                                    jobId: "sentiment:REEL:".concat(reelId),
                                    removeOnComplete: true,
                                    removeOnFail: true,
                                })];
                        case 5:
                            _e.sent();
                            this.activityService.logActivity(userId, 'CREATED_REEL', reelId, 'REEL');
                            return [2 /*return*/, {
                                    reelId: reelId,
                                    status: 'READY',
                                }];
                    }
                });
            });
        };
        ReelsService_1.prototype.getReelStatus = function (reelId) {
            return __awaiter(this, void 0, void 0, function () {
                var reel;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.reel.findUnique({
                                where: { id: reelId },
                                select: {
                                    id: true,
                                    status: true,
                                    failReason: true,
                                    videoUrl: true,
                                    thumbnailUrl: true,
                                },
                            })];
                        case 1:
                            reel = _a.sent();
                            if (!reel) {
                                throw new common_1.NotFoundException('Reel not found');
                            }
                            return [2 /*return*/, reel];
                    }
                });
            });
        };
        ReelsService_1.prototype.getReelById = function (reelId, viewerId) {
            return __awaiter(this, void 0, void 0, function () {
                var reel;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.reel.findFirst({
                                where: {
                                    id: reelId,
                                    deletedAt: null,
                                },
                                include: {
                                    user: {
                                        select: { id: true, name: true, image: true },
                                    },
                                },
                            })];
                        case 1:
                            reel = _a.sent();
                            if (!reel) {
                                throw new common_1.NotFoundException('Reel not found');
                            }
                            // Privacy guard: non-public reels are only visible to their owner
                            if (!reel.isPublic && reel.userId !== viewerId) {
                                throw new common_1.NotFoundException('Reel not found');
                            }
                            return [2 /*return*/, reel];
                    }
                });
            });
        };
        ReelsService_1.prototype.updateReel = function (userId, reelId, payload) {
            return __awaiter(this, void 0, void 0, function () {
                var reel, updatedCaption, providedHashtags, finalHashtags;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.reel.findUnique({ where: { id: reelId } })];
                        case 1:
                            reel = _a.sent();
                            if (!reel || reel.deletedAt) {
                                throw new common_1.NotFoundException('Reel not found');
                            }
                            if (reel.userId !== userId) {
                                throw new common_1.ForbiddenException('You do not own this reel');
                            }
                            updatedCaption = payload.caption !== undefined ? payload.caption : reel.caption;
                            providedHashtags = payload.hashtags !== undefined ? payload.hashtags : reel.hashtags;
                            finalHashtags = (payload.caption !== undefined || payload.hashtags !== undefined)
                                ? (0, hashtag_util_1.mergeHashtags)((0, hashtag_util_1.extractHashtags)(updatedCaption), providedHashtags)
                                : undefined;
                            return [2 /*return*/, this.prisma.reel.update({
                                    where: { id: reelId },
                                    data: {
                                        caption: payload.caption,
                                        hashtags: finalHashtags,
                                        audioTrackId: payload.audioTrackId === null ? null : payload.audioTrackId,
                                        audioOffsetMs: payload.audioOffsetMs,
                                        isPublic: payload.isPublic,
                                        commentsEnabled: payload.commentsEnabled,
                                        downloadsEnabled: payload.downloadsEnabled,
                                    },
                                })];
                    }
                });
            });
        };
        ReelsService_1.prototype.deleteReel = function (userId, reelId) {
            return __awaiter(this, void 0, void 0, function () {
                var reel;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.reel.findUnique({ where: { id: reelId } })];
                        case 1:
                            reel = _a.sent();
                            if (!reel || reel.deletedAt) {
                                throw new common_1.NotFoundException('Reel not found');
                            }
                            if (reel.userId !== userId) {
                                throw new common_1.ForbiddenException('You do not own this reel');
                            }
                            return [4 /*yield*/, this.prisma.reel.update({
                                    where: { id: reelId },
                                    data: { deletedAt: new Date() },
                                })];
                        case 2:
                            _a.sent();
                            return [2 /*return*/, { deleted: true }];
                    }
                });
            });
        };
        ReelsService_1.prototype.getFeed = function (userId_1, cursor_1) {
            return __awaiter(this, arguments, void 0, function (userId, cursor, limit) {
                var safeLimit, cursorDate, moodProfile, sentimentProfile, feedBoostActive, candidates, reelSentiments, sentimentMap, userInterests, interestMap, scored, items, nextCursor;
                var _this = this;
                if (limit === void 0) { limit = 10; }
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            safeLimit = Math.min(Math.max(limit, 1), 30);
                            cursorDate = this.decodeCursor(cursor);
                            return [4 /*yield*/, this.prisma.userMoodProfile.findUnique({
                                    where: { userId: userId },
                                })];
                        case 1:
                            moodProfile = _a.sent();
                            return [4 /*yield*/, this.prisma.userSentimentProfile.findUnique({
                                    where: { userId: userId },
                                })];
                        case 2:
                            sentimentProfile = _a.sent();
                            feedBoostActive = Boolean((sentimentProfile === null || sentimentProfile === void 0 ? void 0 : sentimentProfile.feedBoostPositive) &&
                                sentimentProfile.feedBoostUntil &&
                                sentimentProfile.feedBoostUntil.getTime() > Date.now());
                            return [4 /*yield*/, this.prisma.reel.findMany({
                                    where: __assign({ isPublic: true, status: 'READY', deletedAt: null, userId: { not: userId } }, (cursorDate ? { createdAt: { lt: cursorDate } } : {})),
                                    include: {
                                        _count: {
                                            select: {
                                                likes: true,
                                                comments: true,
                                                shares: true,
                                                views: true,
                                            },
                                        },
                                    },
                                    orderBy: { createdAt: 'desc' },
                                    take: safeLimit * 3,
                                })];
                        case 3:
                            candidates = _a.sent();
                            return [4 /*yield*/, this.prisma.contentSentiment.findMany({
                                    where: {
                                        contentType: 'REEL',
                                        contentId: { in: candidates.map(function (r) { return r.id; }) },
                                    },
                                    select: {
                                        contentId: true,
                                        positiveScore: true,
                                        negativeScore: true,
                                    },
                                })];
                        case 4:
                            reelSentiments = _a.sent();
                            sentimentMap = new Map(reelSentiments.map(function (s) { return [
                                s.contentId,
                                { positiveScore: s.positiveScore, negativeScore: s.negativeScore },
                            ]; }));
                            return [4 /*yield*/, this.interestService.getTopInterests(userId, 20)];
                        case 5:
                            userInterests = _a.sent();
                            interestMap = new Map(userInterests.map(function (i) { return [i.topic.toLowerCase(), i.score]; }));
                            scored = candidates
                                .map(function (reel) {
                                var hoursAgo = Math.max(1, (Date.now() - reel.createdAt.getTime()) / (1000 * 60 * 60));
                                var recencyScore = 1 / Math.log(hoursAgo + 2);
                                // BigInt fields cast to number safely — reels with billions of interactions
                                // are not expected; this is guarded by MAX safe integer at ~9 quadrillion.
                                var engagementScore = Number(reel.likesCount) +
                                    Number(reel.commentsCount) * 2 +
                                    Number(reel.sharesCount) * 3;
                                var completionScore = reel._count.views > 0 ? 0.6 : 0.1;
                                var moodBoost = _this.calculateMoodBoost((moodProfile === null || moodProfile === void 0 ? void 0 : moodProfile.dominantMood) || null, reel);
                                var sentimentBoost = _this.calculateSentimentFeedBoost(feedBoostActive, sentimentMap.get(reel.id));
                                var affinityBoost = 0;
                                var tags = __spreadArray(__spreadArray([], (reel.hashtags || []), true), (reel.categories || []), true);
                                for (var _i = 0, tags_1 = tags; _i < tags_1.length; _i++) {
                                    var tag = tags_1[_i];
                                    affinityBoost += interestMap.get(tag.toLowerCase()) || 0;
                                }
                                var finalAffinityBoost = Math.min(affinityBoost * 0.1, 2.0);
                                var score = 0.2 * recencyScore +
                                    0.35 * _this.normalizeScore(engagementScore) +
                                    0.25 * _this.normalizeScore(reel._count.views) +
                                    0.15 * completionScore +
                                    0.05 * moodBoost +
                                    sentimentBoost +
                                    finalAffinityBoost;
                                return { reel: reel, score: score };
                            })
                                .sort(function (a, b) { return b.score - a.score; });
                            items = scored.slice(0, safeLimit).map(function (row) { return row.reel; });
                            nextCursor = items.length > 0
                                ? this.encodeCursor(items[items.length - 1].createdAt)
                                : null;
                            return [2 /*return*/, {
                                    reels: items,
                                    nextCursor: nextCursor,
                                }];
                    }
                });
            });
        };
        ReelsService_1.prototype.recordView = function (reelId, payload) {
            return __awaiter(this, void 0, void 0, function () {
                var reel, dedupKey, isNew;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.reel.findUnique({ where: { id: reelId } })];
                        case 1:
                            reel = _a.sent();
                            if (!reel || reel.deletedAt || reel.status !== 'READY') {
                                throw new common_1.NotFoundException('Reel not found');
                            }
                            dedupKey = "reel:viewed:".concat(payload.sessionId, ":").concat(reelId);
                            return [4 /*yield*/, this.redisService.setNxEx(dedupKey, '1', 86400)];
                        case 2:
                            isNew = _a.sent();
                            if (!isNew) {
                                return [2 /*return*/, { counted: false }];
                            }
                            return [4 /*yield*/, this.redisService.incrBy("reel:views_buffer:".concat(reelId), 1)];
                        case 3:
                            _a.sent();
                            return [4 /*yield*/, this.prisma.reelView.create({
                                    data: {
                                        reelId: reelId,
                                        viewerId: payload.viewerId,
                                        sessionId: payload.sessionId,
                                        watchPct: payload.watchPct,
                                    },
                                })];
                        case 4:
                            _a.sent();
                            return [4 /*yield*/, this.prisma.reel.update({
                                    where: { id: reelId },
                                    data: {
                                        viewsCount: { increment: 1 },
                                    },
                                })];
                        case 5:
                            _a.sent();
                            if (!payload.viewerId) return [3 /*break*/, 7];
                            return [4 /*yield*/, this.sentimentQueue.add('apply-reaction', {
                                    reactorUserId: payload.viewerId,
                                    contentId: reelId,
                                    contentType: 'REEL',
                                    eventType: 'VIEWED_REEL',
                                }, {
                                    removeOnComplete: true,
                                    removeOnFail: true,
                                })];
                        case 6:
                            _a.sent();
                            if (payload.watchPct && payload.watchPct >= 70) {
                                this.interestService.recordInterest(payload.viewerId, __spreadArray(__spreadArray([], (reel.hashtags || []), true), (reel.categories || []), true), 1.0);
                            }
                            _a.label = 7;
                        case 7: return [2 /*return*/, { counted: true }];
                    }
                });
            });
        };
        ReelsService_1.prototype.toggleLike = function (userId, reelId) {
            return __awaiter(this, void 0, void 0, function () {
                var reel, existing, updated_1, updated;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.reel.findUnique({ where: { id: reelId } })];
                        case 1:
                            reel = _a.sent();
                            if (!reel || reel.deletedAt) {
                                throw new common_1.NotFoundException('Reel not found');
                            }
                            return [4 /*yield*/, this.prisma.reelLike.findUnique({
                                    where: {
                                        reelId_userId: { reelId: reelId, userId: userId },
                                    },
                                })];
                        case 2:
                            existing = _a.sent();
                            if (!existing) return [3 /*break*/, 5];
                            return [4 /*yield*/, this.prisma.$transaction([
                                    this.prisma.reelLike.delete({
                                        where: { reelId_userId: { reelId: reelId, userId: userId } },
                                    }),
                                    this.prisma.reel.update({
                                        where: { id: reelId },
                                        data: {
                                            likesCount: { decrement: 1 },
                                        },
                                    }),
                                ])];
                        case 3:
                            _a.sent();
                            return [4 /*yield*/, this.prisma.reel.findUnique({
                                    where: { id: reelId },
                                    select: { likesCount: true },
                                })];
                        case 4:
                            updated_1 = _a.sent();
                            return [2 /*return*/, { liked: false, count: Number((updated_1 === null || updated_1 === void 0 ? void 0 : updated_1.likesCount) || 0) }];
                        case 5: return [4 /*yield*/, this.prisma.$transaction([
                                this.prisma.reelLike.create({
                                    data: { reelId: reelId, userId: userId },
                                }),
                                this.prisma.reel.update({
                                    where: { id: reelId },
                                    data: {
                                        likesCount: { increment: 1 },
                                    },
                                }),
                            ])];
                        case 6:
                            _a.sent();
                            return [4 /*yield*/, this.sentimentQueue.add('apply-reaction', {
                                    reactorUserId: userId,
                                    contentId: reelId,
                                    contentType: 'REEL',
                                    eventType: 'LIKED_REEL',
                                }, {
                                    removeOnComplete: true,
                                    removeOnFail: true,
                                })];
                        case 7:
                            _a.sent();
                            this.interestService.recordInterest(userId, __spreadArray(__spreadArray([], (reel.hashtags || []), true), (reel.categories || []), true), 2.0);
                            this.activityService.logActivity(userId, 'LIKED_REEL', reelId, 'REEL');
                            return [4 /*yield*/, this.prisma.reel.findUnique({
                                    where: { id: reelId },
                                    select: { likesCount: true, userId: true },
                                })];
                        case 8:
                            updated = _a.sent();
                            if (!updated) return [3 /*break*/, 10];
                            return [4 /*yield*/, this.notificationService.notifyReelLike(userId, updated.userId, reelId)];
                        case 9:
                            _a.sent();
                            _a.label = 10;
                        case 10: return [2 /*return*/, { liked: true, count: Number((updated === null || updated === void 0 ? void 0 : updated.likesCount) || 0) }];
                    }
                });
            });
        };
        ReelsService_1.prototype.listComments = function (reelId_1, cursor_1) {
            return __awaiter(this, arguments, void 0, function (reelId, cursor, limit, parentId, viewerId) {
                var safeLimit, cursorDate, rows, hasMore, items, likedSet, liked, data, nextCursor;
                if (limit === void 0) { limit = 20; }
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            safeLimit = Math.min(Math.max(limit, 1), 50);
                            cursorDate = this.decodeCursor(cursor);
                            return [4 /*yield*/, this.prisma.reelComment.findMany({
                                    where: __assign({ reelId: reelId, deletedAt: null, parentId: parentId || null }, (cursorDate ? { createdAt: { gt: cursorDate } } : {})),
                                    include: {
                                        user: { select: { id: true, name: true, image: true } },
                                        _count: { select: { replies: true } },
                                    },
                                    orderBy: [{ likesCount: 'desc' }, { createdAt: 'asc' }],
                                    take: safeLimit + 1,
                                })];
                        case 1:
                            rows = _a.sent();
                            hasMore = rows.length > safeLimit;
                            items = hasMore ? rows.slice(0, safeLimit) : rows;
                            likedSet = new Set();
                            if (!(viewerId && items.length > 0)) return [3 /*break*/, 3];
                            return [4 /*yield*/, this.prisma.reelCommentLike.findMany({
                                    where: {
                                        userId: viewerId,
                                        commentId: { in: items.map(function (c) { return c.id; }) },
                                    },
                                    select: { commentId: true },
                                })];
                        case 2:
                            liked = _a.sent();
                            likedSet = new Set(liked.map(function (l) { return l.commentId; }));
                            _a.label = 3;
                        case 3:
                            data = items.map(function (c) { return (__assign(__assign({}, c), { isLikedByMe: likedSet.has(c.id) })); });
                            nextCursor = hasMore && data.length > 0
                                ? this.encodeCursor(data[data.length - 1].createdAt)
                                : null;
                            return [2 /*return*/, {
                                    data: data,
                                    nextCursor: nextCursor,
                                    hasMore: hasMore,
                                }];
                    }
                });
            });
        };
        ReelsService_1.prototype.addComment = function (userId, reelId, payload) {
            return __awaiter(this, void 0, void 0, function () {
                var reel, comment;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.reel.findUnique({ where: { id: reelId } })];
                        case 1:
                            reel = _a.sent();
                            if (!reel || reel.deletedAt) {
                                throw new common_1.NotFoundException('Reel not found');
                            }
                            if (!reel.commentsEnabled) {
                                throw new common_1.BadRequestException('Comments are disabled on this reel');
                            }
                            return [4 /*yield*/, this.prisma.reelComment.create({
                                    data: {
                                        reelId: reelId,
                                        userId: userId,
                                        content: payload.content,
                                        parentId: payload.parentId,
                                    },
                                    include: {
                                        user: { select: { id: true, name: true, image: true } },
                                    },
                                })];
                        case 2:
                            comment = _a.sent();
                            return [4 /*yield*/, this.prisma.reel.update({
                                    where: { id: reelId },
                                    data: { commentsCount: { increment: 1 } },
                                })];
                        case 3:
                            _a.sent();
                            return [4 /*yield*/, this.sentimentQueue.add('analyze-comment', {
                                    commenterId: userId,
                                    parentContentId: reelId,
                                    parentContentType: 'REEL',
                                    commentText: payload.content,
                                    commentId: comment.id,
                                }, {
                                    jobId: "sentiment:REEL_COMMENT:".concat(comment.id),
                                    removeOnComplete: true,
                                    removeOnFail: true,
                                })];
                        case 4:
                            _a.sent();
                            this.interestService.recordInterest(userId, __spreadArray(__spreadArray([], (reel.hashtags || []), true), (reel.categories || []), true), 1.5);
                            this.activityService.logActivity(userId, 'COMMENTED_ON_REEL', reelId, 'REEL');
                            // Notify the reel owner
                            return [4 /*yield*/, this.notificationService.notifyReelComment(userId, reel.userId, reelId, payload.content)];
                        case 5:
                            // Notify the reel owner
                            _a.sent();
                            return [2 /*return*/, comment];
                    }
                });
            });
        };
        ReelsService_1.prototype.deleteComment = function (userId, reelId, commentId) {
            return __awaiter(this, void 0, void 0, function () {
                var comment;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.reelComment.findUnique({
                                where: { id: commentId },
                            })];
                        case 1:
                            comment = _a.sent();
                            if (!comment || comment.reelId !== reelId || comment.deletedAt) {
                                throw new common_1.NotFoundException('Comment not found');
                            }
                            if (comment.userId !== userId) {
                                throw new common_1.ForbiddenException('You can only delete your own comments');
                            }
                            return [4 /*yield*/, this.prisma.$transaction([
                                    this.prisma.reelComment.update({
                                        where: { id: commentId },
                                        data: { deletedAt: new Date() },
                                    }),
                                    // Guard: commentsCount cannot drop below 0
                                    this.prisma.$executeRaw(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n        UPDATE \"Reel\"\n        SET \"commentsCount\" = GREATEST(0, \"commentsCount\" - 1)\n        WHERE id = ", "\n      "], ["\n        UPDATE \"Reel\"\n        SET \"commentsCount\" = GREATEST(0, \"commentsCount\" - 1)\n        WHERE id = ", "\n      "])), reelId),
                                ])];
                        case 2:
                            _a.sent();
                            return [2 /*return*/, { deleted: true }];
                    }
                });
            });
        };
        ReelsService_1.prototype.shareReel = function (userId, reelId, payload) {
            return __awaiter(this, void 0, void 0, function () {
                var reel, share;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.reel.findUnique({ where: { id: reelId } })];
                        case 1:
                            reel = _a.sent();
                            if (!reel || reel.deletedAt) {
                                throw new common_1.NotFoundException('Reel not found');
                            }
                            return [4 /*yield*/, this.prisma.reelShare.create({
                                    data: {
                                        reelId: reelId,
                                        sharerId: userId,
                                        shareType: payload.shareType,
                                        targetId: payload.targetUserId,
                                    },
                                })];
                        case 2:
                            share = _a.sent();
                            return [4 /*yield*/, this.prisma.reel.update({
                                    where: { id: reelId },
                                    data: { sharesCount: { increment: 1 } },
                                })];
                        case 3:
                            _a.sent();
                            // Notify the reel owner
                            return [4 /*yield*/, this.notificationService.notifyReelShare(userId, reel.userId, reelId)];
                        case 4:
                            // Notify the reel owner
                            _a.sent();
                            return [2 /*return*/, {
                                    shareId: share.id,
                                    shareUrl: "".concat(process.env.APP_BASE_URL || 'https://ding.local', "/reels/").concat(reelId),
                                }];
                    }
                });
            });
        };
        // ─────────────────────────────────────────────
        // Bookmark / Save
        // ─────────────────────────────────────────────
        ReelsService_1.prototype.toggleBookmark = function (userId, reelId) {
            return __awaiter(this, void 0, void 0, function () {
                var reel, existing;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.reel.findUnique({ where: { id: reelId } })];
                        case 1:
                            reel = _a.sent();
                            if (!reel || reel.deletedAt) {
                                throw new common_1.NotFoundException('Reel not found');
                            }
                            return [4 /*yield*/, this.prisma.reelBookmark.findUnique({
                                    where: { reelId_userId: { reelId: reelId, userId: userId } },
                                })];
                        case 2:
                            existing = _a.sent();
                            if (!existing) return [3 /*break*/, 4];
                            return [4 /*yield*/, this.prisma.$transaction([
                                    this.prisma.reelBookmark.delete({
                                        where: { reelId_userId: { reelId: reelId, userId: userId } },
                                    }),
                                    this.prisma.reel.update({
                                        where: { id: reelId },
                                        data: { savesCount: { decrement: 1 } },
                                    }),
                                ])];
                        case 3:
                            _a.sent();
                            return [2 /*return*/, { saved: false }];
                        case 4: return [4 /*yield*/, this.prisma.$transaction([
                                this.prisma.reelBookmark.create({
                                    data: { reelId: reelId, userId: userId },
                                }),
                                this.prisma.reel.update({
                                    where: { id: reelId },
                                    data: { savesCount: { increment: 1 } },
                                }),
                            ])];
                        case 5:
                            _a.sent();
                            this.interestService.recordInterest(userId, __spreadArray(__spreadArray([], (reel.hashtags || []), true), (reel.categories || []), true), 2.0);
                            this.activityService.logActivity(userId, 'BOOKMARKED_REEL', reelId, 'REEL');
                            return [2 /*return*/, { saved: true }];
                    }
                });
            });
        };
        ReelsService_1.prototype.getSavedReels = function (userId_1, cursor_1) {
            return __awaiter(this, arguments, void 0, function (userId, cursor, limit) {
                var safeLimit, cursorDate, bookmarks, hasMore, items, reels, nextCursor;
                if (limit === void 0) { limit = 10; }
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            safeLimit = Math.min(Math.max(limit, 1), 30);
                            cursorDate = this.decodeCursor(cursor);
                            return [4 /*yield*/, this.prisma.reelBookmark.findMany({
                                    where: __assign({ userId: userId }, (cursorDate ? { createdAt: { lt: cursorDate } } : {})),
                                    include: {
                                        reel: {
                                            include: {
                                                user: { select: { id: true, name: true, image: true } },
                                            },
                                        },
                                    },
                                    orderBy: { createdAt: 'desc' },
                                    take: safeLimit + 1,
                                })];
                        case 1:
                            bookmarks = _a.sent();
                            hasMore = bookmarks.length > safeLimit;
                            items = hasMore ? bookmarks.slice(0, safeLimit) : bookmarks;
                            reels = items
                                .filter(function (b) { return b.reel.deletedAt === null; })
                                .map(function (b) { return b.reel; });
                            nextCursor = hasMore && items.length > 0
                                ? this.encodeCursor(items[items.length - 1].createdAt)
                                : null;
                            return [2 /*return*/, { reels: reels, nextCursor: nextCursor, hasMore: hasMore }];
                    }
                });
            });
        };
        // ─────────────────────────────────────────────
        // User Profile Reels
        // ─────────────────────────────────────────────
        ReelsService_1.prototype.getUserReels = function (targetUserId_1, viewerId_1, cursor_1) {
            return __awaiter(this, arguments, void 0, function (targetUserId, viewerId, cursor, limit) {
                var safeLimit, cursorDate, isOwner, reels, hasMore, items, nextCursor;
                if (limit === void 0) { limit = 10; }
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            safeLimit = Math.min(Math.max(limit, 1), 30);
                            cursorDate = this.decodeCursor(cursor);
                            isOwner = viewerId === targetUserId;
                            return [4 /*yield*/, this.prisma.reel.findMany({
                                    where: __assign(__assign({ userId: targetUserId, deletedAt: null, status: 'READY' }, (!isOwner ? { isPublic: true } : {})), (cursorDate ? { createdAt: { lt: cursorDate } } : {})),
                                    include: {
                                        user: { select: { id: true, name: true, image: true } },
                                    },
                                    orderBy: { createdAt: 'desc' },
                                    take: safeLimit + 1,
                                })];
                        case 1:
                            reels = _a.sent();
                            hasMore = reels.length > safeLimit;
                            items = hasMore ? reels.slice(0, safeLimit) : reels;
                            nextCursor = hasMore && items.length > 0
                                ? this.encodeCursor(items[items.length - 1].createdAt)
                                : null;
                            return [2 /*return*/, { reels: items, nextCursor: nextCursor, hasMore: hasMore }];
                    }
                });
            });
        };
        ReelsService_1.prototype.getMyReels = function (userId_1, cursor_1) {
            return __awaiter(this, arguments, void 0, function (userId, cursor, limit) {
                var safeLimit, cursorDate, reels, hasMore, items, nextCursor;
                if (limit === void 0) { limit = 10; }
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            safeLimit = Math.min(Math.max(limit, 1), 30);
                            cursorDate = this.decodeCursor(cursor);
                            return [4 /*yield*/, this.prisma.reel.findMany({
                                    where: __assign({ userId: userId, deletedAt: null }, (cursorDate ? { createdAt: { lt: cursorDate } } : {})),
                                    orderBy: { createdAt: 'desc' },
                                    take: safeLimit + 1,
                                })];
                        case 1:
                            reels = _a.sent();
                            hasMore = reels.length > safeLimit;
                            items = hasMore ? reels.slice(0, safeLimit) : reels;
                            nextCursor = hasMore && items.length > 0
                                ? this.encodeCursor(items[items.length - 1].createdAt)
                                : null;
                            return [2 /*return*/, { reels: items, nextCursor: nextCursor, hasMore: hasMore }];
                    }
                });
            });
        };
        // ─────────────────────────────────────────────
        // Comment Likes & Editing
        // ─────────────────────────────────────────────
        ReelsService_1.prototype.toggleCommentLike = function (userId, reelId, commentId) {
            return __awaiter(this, void 0, void 0, function () {
                var comment, existing;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.reelComment.findUnique({
                                where: { id: commentId },
                            })];
                        case 1:
                            comment = _a.sent();
                            if (!comment || comment.reelId !== reelId || comment.deletedAt) {
                                throw new common_1.NotFoundException('Comment not found');
                            }
                            return [4 /*yield*/, this.prisma.reelCommentLike.findUnique({
                                    where: { commentId_userId: { commentId: commentId, userId: userId } },
                                })];
                        case 2:
                            existing = _a.sent();
                            if (!existing) return [3 /*break*/, 4];
                            return [4 /*yield*/, this.prisma.$transaction([
                                    this.prisma.reelCommentLike.delete({
                                        where: { commentId_userId: { commentId: commentId, userId: userId } },
                                    }),
                                    this.prisma.reelComment.update({
                                        where: { id: commentId },
                                        data: { likesCount: { decrement: 1 } },
                                    }),
                                ])];
                        case 3:
                            _a.sent();
                            return [2 /*return*/, { liked: false }];
                        case 4: return [4 /*yield*/, this.prisma.$transaction([
                                this.prisma.reelCommentLike.create({
                                    data: { commentId: commentId, userId: userId },
                                }),
                                this.prisma.reelComment.update({
                                    where: { id: commentId },
                                    data: { likesCount: { increment: 1 } },
                                }),
                            ])];
                        case 5:
                            _a.sent();
                            return [2 /*return*/, { liked: true }];
                    }
                });
            });
        };
        ReelsService_1.prototype.editComment = function (userId, reelId, commentId, content) {
            return __awaiter(this, void 0, void 0, function () {
                var comment;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.reelComment.findUnique({
                                where: { id: commentId },
                            })];
                        case 1:
                            comment = _a.sent();
                            if (!comment || comment.reelId !== reelId || comment.deletedAt) {
                                throw new common_1.NotFoundException('Comment not found');
                            }
                            if (comment.userId !== userId) {
                                throw new common_1.ForbiddenException('You can only edit your own comments');
                            }
                            return [2 /*return*/, this.prisma.reelComment.update({
                                    where: { id: commentId },
                                    data: { content: content },
                                    include: {
                                        user: { select: { id: true, name: true, image: true } },
                                    },
                                })];
                    }
                });
            });
        };
        // ─────────────────────────────────────────────
        // Discovery: Hashtags & Trending
        // ─────────────────────────────────────────────
        ReelsService_1.prototype.getReelsByHashtag = function (hashtag_1, cursor_1) {
            return __awaiter(this, arguments, void 0, function (hashtag, cursor, limit) {
                var safeLimit, cursorDate, normalizedTag, reels, hasMore, items, nextCursor;
                if (limit === void 0) { limit = 10; }
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            safeLimit = Math.min(Math.max(limit, 1), 30);
                            cursorDate = this.decodeCursor(cursor);
                            normalizedTag = hashtag.toLowerCase().replace(/^#/, '');
                            return [4 /*yield*/, this.prisma.reel.findMany({
                                    where: __assign({ isPublic: true, status: 'READY', deletedAt: null, hashtags: { has: normalizedTag } }, (cursorDate ? { createdAt: { lt: cursorDate } } : {})),
                                    include: {
                                        user: { select: { id: true, name: true, image: true } },
                                    },
                                    orderBy: { createdAt: 'desc' },
                                    take: safeLimit + 1,
                                })];
                        case 1:
                            reels = _a.sent();
                            hasMore = reels.length > safeLimit;
                            items = hasMore ? reels.slice(0, safeLimit) : reels;
                            nextCursor = hasMore && items.length > 0
                                ? this.encodeCursor(items[items.length - 1].createdAt)
                                : null;
                            return [2 /*return*/, { reels: items, nextCursor: nextCursor, hasMore: hasMore }];
                    }
                });
            });
        };
        ReelsService_1.prototype.getTrendingReels = function (cursor_1) {
            return __awaiter(this, arguments, void 0, function (cursor, limit) {
                var safeLimit, cursorDate, sevenDaysAgo, reels, hasMore, items, nextCursor;
                if (limit === void 0) { limit = 10; }
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            safeLimit = Math.min(Math.max(limit, 1), 30);
                            cursorDate = this.decodeCursor(cursor);
                            sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
                            return [4 /*yield*/, this.prisma.reel.findMany({
                                    where: __assign({ isPublic: true, status: 'READY', deletedAt: null, createdAt: { gte: sevenDaysAgo } }, (cursorDate ? { createdAt: { lt: cursorDate, gte: sevenDaysAgo } } : {})),
                                    include: {
                                        user: { select: { id: true, name: true, image: true } },
                                    },
                                    orderBy: [
                                        { likesCount: 'desc' },
                                        { viewsCount: 'desc' },
                                        { createdAt: 'desc' },
                                    ],
                                    take: safeLimit + 1,
                                })];
                        case 1:
                            reels = _a.sent();
                            hasMore = reels.length > safeLimit;
                            items = hasMore ? reels.slice(0, safeLimit) : reels;
                            nextCursor = hasMore && items.length > 0
                                ? this.encodeCursor(items[items.length - 1].createdAt)
                                : null;
                            return [2 /*return*/, { reels: items, nextCursor: nextCursor, hasMore: hasMore }];
                    }
                });
            });
        };
        // ─────────────────────────────────────────────
        // Creator Analytics
        // ─────────────────────────────────────────────
        ReelsService_1.prototype.getReelAnalytics = function (userId, reelId) {
            return __awaiter(this, void 0, void 0, function () {
                var reel, avgWatch;
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, this.prisma.reel.findUnique({ where: { id: reelId } })];
                        case 1:
                            reel = _b.sent();
                            if (!reel || reel.deletedAt) {
                                throw new common_1.NotFoundException('Reel not found');
                            }
                            if (reel.userId !== userId) {
                                throw new common_1.ForbiddenException('You can only view analytics for your own reels');
                            }
                            return [4 /*yield*/, this.prisma.reelView.aggregate({
                                    where: { reelId: reelId, watchPct: { not: null } },
                                    _avg: { watchPct: true },
                                    _count: true,
                                })];
                        case 2:
                            avgWatch = _b.sent();
                            return [2 /*return*/, {
                                    reelId: reelId,
                                    viewsCount: Number(reel.viewsCount),
                                    likesCount: Number(reel.likesCount),
                                    commentsCount: Number(reel.commentsCount),
                                    sharesCount: Number(reel.sharesCount),
                                    savesCount: Number(reel.savesCount),
                                    avgWatchPct: Math.round((_a = avgWatch._avg.watchPct) !== null && _a !== void 0 ? _a : 0),
                                    totalViewsWithWatchData: avgWatch._count,
                                    createdAt: reel.createdAt,
                                }];
                    }
                });
            });
        };
        // ─────────────────────────────────────────────
        // Audio Tracks
        // ─────────────────────────────────────────────
        ReelsService_1.prototype.listAudioTracks = function (genre, search) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.prisma.audioTrack.findMany({
                            where: __assign(__assign({}, (genre ? { genre: genre } : {})), (search
                                ? {
                                    OR: [
                                        { title: { contains: search, mode: 'insensitive' } },
                                        { artist: { contains: search, mode: 'insensitive' } },
                                    ],
                                }
                                : {})),
                            orderBy: [{ usageCount: 'desc' }, { createdAt: 'desc' }],
                            take: 50,
                        })];
                });
            });
        };
        ReelsService_1.prototype.getAudioTrackById = function (id) {
            return __awaiter(this, void 0, void 0, function () {
                var track;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.audioTrack.findUnique({ where: { id: id } })];
                        case 1:
                            track = _a.sent();
                            if (!track) {
                                throw new common_1.NotFoundException('Audio track not found');
                            }
                            return [2 /*return*/, track];
                    }
                });
            });
        };
        ReelsService_1.prototype.getTrendingAudioTracks = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.prisma.audioTrack.findMany({
                            orderBy: { usageCount: 'desc' },
                            take: 20,
                        })];
                });
            });
        };
        ReelsService_1.prototype.registerAudioTrackUse = function (id) {
            return __awaiter(this, void 0, void 0, function () {
                var track;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.audioTrack.findUnique({ where: { id: id } })];
                        case 1:
                            track = _a.sent();
                            if (!track) {
                                throw new common_1.NotFoundException('Audio track not found');
                            }
                            return [2 /*return*/, this.prisma.audioTrack.update({
                                    where: { id: id },
                                    data: {
                                        usageCount: { increment: 1 },
                                    },
                                })];
                    }
                });
            });
        };
        ReelsService_1.prototype.normalizeScore = function (value) {
            if (value <= 0)
                return 0;
            return Math.min(1, Math.log10(value + 1) / 3);
        };
        ReelsService_1.prototype.calculateMoodBoost = function (dominantMood, reel) {
            if (!dominantMood)
                return 0.1;
            if (dominantMood === 'sad') {
                var caption = (reel.caption || '').toLowerCase();
                if (caption.includes('fun') ||
                    caption.includes('happy') ||
                    caption.includes('motivat')) {
                    return 0.8;
                }
                return 0.25;
            }
            return 0.4;
        };
        ReelsService_1.prototype.calculateSentimentFeedBoost = function (enabled, sentiment) {
            if (!enabled || !sentiment)
                return 0;
            if (sentiment.positiveScore > 65)
                return 0.2;
            if (sentiment.negativeScore > 65)
                return -0.2;
            return 0;
        };
        ReelsService_1.prototype.encodeCursor = function (date) {
            return Buffer.from(date.toISOString()).toString('base64');
        };
        ReelsService_1.prototype.decodeCursor = function (cursor) {
            if (!cursor)
                return null;
            try {
                var parsed = new Date(Buffer.from(cursor, 'base64').toString('utf8'));
                return Number.isNaN(parsed.getTime()) ? null : parsed;
            }
            catch (_a) {
                return null;
            }
        };
        return ReelsService_1;
    }());
    __setFunctionName(_classThis, "ReelsService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ReelsService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ReelsService = _classThis;
}();
exports.ReelsService = ReelsService;
var templateObject_1;
