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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
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
exports.FeedService = void 0;
var common_1 = require("@nestjs/common");
var FeedService = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var FeedService = _classThis = /** @class */ (function () {
        function FeedService_1(prisma, neo4jService, redisService, interestService) {
            this.prisma = prisma;
            this.neo4jService = neo4jService;
            this.redisService = redisService;
            this.interestService = interestService;
        }
        FeedService_1.prototype.getFeed = function (userId_1) {
            return __awaiter(this, arguments, void 0, function (userId, type, page, limit) {
                var cacheKey, cached, response, scoredPostIds;
                if (type === void 0) { type = 'HOME'; }
                if (page === void 0) { page = 1; }
                if (limit === void 0) { limit = 20; }
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            cacheKey = "feed:".concat(userId, ":").concat(type, ":").concat(page, ":").concat(limit);
                            return [4 /*yield*/, this.redisService.get(cacheKey)];
                        case 1:
                            cached = _a.sent();
                            if (cached) {
                                return [2 /*return*/, cached];
                            }
                            if (!(type === 'FOLLOWING')) return [3 /*break*/, 3];
                            return [4 /*yield*/, this.getChronologicalFeed(userId, page, limit, true)];
                        case 2:
                            response = _a.sent();
                            return [3 /*break*/, 10];
                        case 3:
                            if (!(type === 'EXPLORE')) return [3 /*break*/, 5];
                            return [4 /*yield*/, this.getExploreFeed(userId, page, limit)];
                        case 4:
                            response = _a.sent();
                            return [3 /*break*/, 10];
                        case 5: return [4 /*yield*/, this.getScoredPostsFromGraph(userId, limit * 2)];
                        case 6:
                            scoredPostIds = _a.sent();
                            if (!!scoredPostIds.length) return [3 /*break*/, 8];
                            return [4 /*yield*/, this.getChronologicalFeed(userId, page, limit, false)];
                        case 7:
                            response = _a.sent();
                            return [3 /*break*/, 10];
                        case 8: return [4 /*yield*/, this.mapPosts(scoredPostIds, page, limit, userId)];
                        case 9:
                            response = _a.sent();
                            _a.label = 10;
                        case 10: return [4 /*yield*/, this.redisService.set(cacheKey, response, 60)];
                        case 11:
                            _a.sent();
                            return [2 /*return*/, response];
                    }
                });
            });
        };
        FeedService_1.prototype.mapPosts = function (scoredPostIds, page, limit, userId) {
            return __awaiter(this, void 0, void 0, function () {
                var moodProfile, feedBoostActive, posts, sentiments, sentimentMap, scoreMap, userInterests, interestMap, items, start, paginated, data;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.userSentimentProfile.findUnique({
                                where: { userId: userId },
                            })];
                        case 1:
                            moodProfile = _a.sent();
                            feedBoostActive = Boolean((moodProfile === null || moodProfile === void 0 ? void 0 : moodProfile.feedBoostPositive) &&
                                moodProfile.feedBoostUntil &&
                                moodProfile.feedBoostUntil.getTime() > Date.now());
                            return [4 /*yield*/, this.prisma.post.findMany({
                                    where: {
                                        id: { in: scoredPostIds.map(function (p) { return p.postId; }) },
                                        isDeleted: false,
                                    },
                                    include: {
                                        author: true,
                                        _count: {
                                            select: {
                                                Likes: true,
                                                Comments: true,
                                            },
                                        },
                                        Likes: {
                                            where: {
                                                userId: userId,
                                            },
                                            select: {
                                                userId: true,
                                            },
                                        },
                                    },
                                })];
                        case 2:
                            posts = _a.sent();
                            return [4 /*yield*/, this.prisma.contentSentiment.findMany({
                                    where: {
                                        contentType: 'POST',
                                        contentId: { in: posts.map(function (p) { return p.id; }) },
                                    },
                                    select: {
                                        contentId: true,
                                        positiveScore: true,
                                        negativeScore: true,
                                    },
                                })];
                        case 3:
                            sentiments = _a.sent();
                            sentimentMap = new Map(sentiments.map(function (s) { return [s.contentId, { pos: s.positiveScore, neg: s.negativeScore }]; }));
                            scoreMap = new Map(scoredPostIds.map(function (s) { return [s.postId, s.score]; }));
                            return [4 /*yield*/, this.interestService.getTopInterests(userId, 20)];
                        case 4:
                            userInterests = _a.sent();
                            interestMap = new Map(userInterests.map(function (i) { return [i.topic.toLowerCase(), i.score]; }));
                            items = posts.map(function (p) {
                                var _a, _b, _c, _d, _e, _f, _g, _h, _j;
                                var affinityBoost = 0;
                                var tags = __spreadArray(__spreadArray([], (p.hashtags || []), true), (p.categories || []), true);
                                for (var _i = 0, tags_1 = tags; _i < tags_1.length; _i++) {
                                    var tag = tags_1[_i];
                                    affinityBoost += interestMap.get(tag.toLowerCase()) || 0;
                                }
                                var finalAffinityBoost = Math.min(affinityBoost * 0.5, 10.0);
                                return {
                                    id: p.id,
                                    author: (_b = (_a = p.author) === null || _a === void 0 ? void 0 : _a.name) !== null && _b !== void 0 ? _b : '',
                                    time: p.createdAt.toISOString(),
                                    content: p.content,
                                    likes: (_d = (_c = p._count) === null || _c === void 0 ? void 0 : _c.Likes) !== null && _d !== void 0 ? _d : 0,
                                    comments: (_f = (_e = p._count) === null || _e === void 0 ? void 0 : _e.Comments) !== null && _f !== void 0 ? _f : 0,
                                    image: (_h = (_g = p.mediaUrls) === null || _g === void 0 ? void 0 : _g[0]) !== null && _h !== void 0 ? _h : null,
                                    liked: p.Likes && p.Likes.length > 0,
                                    score: ((_j = scoreMap.get(p.id)) !== null && _j !== void 0 ? _j : 0) +
                                        _this.getMoodBoostScore(feedBoostActive, sentimentMap.get(p.id)) +
                                        finalAffinityBoost,
                                };
                            });
                            items.sort(function (a, b) { var _a, _b; return ((_a = b.score) !== null && _a !== void 0 ? _a : 0) - ((_b = a.score) !== null && _b !== void 0 ? _b : 0); });
                            start = (page - 1) * limit;
                            paginated = items.slice(start, start + limit);
                            data = paginated.map(function (_a) {
                                var score = _a.score, rest = __rest(_a, ["score"]);
                                return rest;
                            });
                            return [2 /*return*/, {
                                    data: data,
                                    total: items.length,
                                    page: page,
                                    limit: limit,
                                    totalPages: Math.ceil(items.length / limit),
                                }];
                    }
                });
            });
        };
        FeedService_1.prototype.getExploreFeed = function (userId, page, limit) {
            return __awaiter(this, void 0, void 0, function () {
                var session, result, ids;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            session = this.neo4jService.getSession();
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, , 3, 5]);
                            return [4 /*yield*/, session.run("MATCH (user:User {id: $userId})\n             MATCH (post:Post)<-[:POSTED]-(author:User)\n             WHERE NOT (user)-[:FOLLOWS]->(author)\n             AND user.id <> author.id\n             RETURN post.id as postId, 1 as score\n             ORDER BY post.createdAt DESC\n             LIMIT toInteger($limit)", { userId: userId, limit: limit * 2 })];
                        case 2:
                            result = _a.sent();
                            ids = result.records.map(function (r) { return ({
                                postId: r.get('postId'),
                                score: 1,
                            }); });
                            if (ids.length === 0)
                                return [2 /*return*/, { data: [], total: 0, page: page, limit: limit, totalPages: 0 }];
                            return [2 /*return*/, this.mapPosts(ids, page, limit, userId)];
                        case 3: return [4 /*yield*/, session.close()];
                        case 4:
                            _a.sent();
                            return [7 /*endfinally*/];
                        case 5: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Legacy chronological feed used as a fallback when Neo4j
         * does not yet have enough interaction data.
         */
        FeedService_1.prototype.getChronologicalFeed = function (userId_1) {
            return __awaiter(this, arguments, void 0, function (userId, page, limit, onlyFollowing) {
                var skip, session, result, rawFollowing, followingIds, authorIds, whereCondition, posts, moodProfile, feedBoostActive_1, postIds, sentiments, sentimentMap_1, userInterests, interestMap_1, ranked, data, total, totalPages;
                var _this = this;
                var _a;
                if (page === void 0) { page = 1; }
                if (limit === void 0) { limit = 20; }
                if (onlyFollowing === void 0) { onlyFollowing = false; }
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            skip = (page - 1) * limit;
                            session = this.neo4jService.getSession();
                            _b.label = 1;
                        case 1:
                            _b.trys.push([1, , 8, 10]);
                            return [4 /*yield*/, session.run("MATCH (u:User {id: $userId})-[:FOLLOWS]->(followed:User)\n         WITH collect(followed.id) as followingIds\n         RETURN followingIds", { userId: userId })];
                        case 2:
                            result = _b.sent();
                            rawFollowing = (_a = result.records[0]) === null || _a === void 0 ? void 0 : _a.get('followingIds');
                            followingIds = rawFollowing && typeof rawFollowing.toArray === 'function'
                                ? // Neo4j List
                                    rawFollowing.toArray()
                                : Array.isArray(rawFollowing)
                                    ? // Already a plain JS array
                                        rawFollowing
                                    : rawFollowing != null
                                        ? // Single value
                                            [rawFollowing]
                                        : [];
                            authorIds = __spreadArray([userId], followingIds, true);
                            whereCondition = { isDeleted: false };
                            if (onlyFollowing) {
                                // Strict following feed: only posts from people I follow (and myself)
                                whereCondition.authorId = { in: authorIds };
                            }
                            else {
                                // Combined feed: Public OR Followed
                                whereCondition.OR = [
                                    { privacy: 'PUBLIC' },
                                    { authorId: { in: authorIds } },
                                ];
                            }
                            return [4 /*yield*/, this.prisma.post.findMany({
                                    where: whereCondition,
                                    orderBy: { createdAt: 'desc' },
                                    skip: skip,
                                    take: limit,
                                    include: {
                                        author: true,
                                        _count: {
                                            select: {
                                                Likes: true,
                                                Comments: true,
                                            },
                                        },
                                        Likes: {
                                            where: {
                                                userId: userId,
                                            },
                                            select: {
                                                userId: true,
                                            },
                                        },
                                    },
                                })];
                        case 3:
                            posts = _b.sent();
                            return [4 /*yield*/, this.prisma.userSentimentProfile.findUnique({
                                    where: { userId: userId },
                                })];
                        case 4:
                            moodProfile = _b.sent();
                            feedBoostActive_1 = Boolean((moodProfile === null || moodProfile === void 0 ? void 0 : moodProfile.feedBoostPositive) &&
                                moodProfile.feedBoostUntil &&
                                moodProfile.feedBoostUntil.getTime() > Date.now());
                            postIds = posts.map(function (p) { return p.id; });
                            return [4 /*yield*/, this.prisma.contentSentiment.findMany({
                                    where: {
                                        contentType: 'POST',
                                        contentId: { in: postIds },
                                    },
                                    select: {
                                        contentId: true,
                                        positiveScore: true,
                                        negativeScore: true,
                                    },
                                })];
                        case 5:
                            sentiments = _b.sent();
                            sentimentMap_1 = new Map(sentiments.map(function (s) { return [s.contentId, { pos: s.positiveScore, neg: s.negativeScore }]; }));
                            return [4 /*yield*/, this.interestService.getTopInterests(userId, 20)];
                        case 6:
                            userInterests = _b.sent();
                            interestMap_1 = new Map(userInterests.map(function (i) { return [i.topic.toLowerCase(), i.score]; }));
                            ranked = posts
                                .map(function (p) {
                                var affinityBoost = 0;
                                var tags = __spreadArray(__spreadArray([], (p.hashtags || []), true), (p.categories || []), true);
                                for (var _i = 0, tags_2 = tags; _i < tags_2.length; _i++) {
                                    var tag = tags_2[_i];
                                    affinityBoost += interestMap_1.get(tag.toLowerCase()) || 0;
                                }
                                var finalAffinityBoost = Math.min(affinityBoost * 0.5, 10.0);
                                return {
                                    post: p,
                                    score: p.createdAt.getTime() / 1000000000000 +
                                        _this.getMoodBoostScore(feedBoostActive_1, sentimentMap_1.get(p.id)) +
                                        finalAffinityBoost,
                                };
                            })
                                .sort(function (a, b) { return b.score - a.score; });
                            data = ranked.map(function (_a) {
                                var _b, _c, _d, _e, _f, _g, _h, _j;
                                var p = _a.post;
                                return ({
                                    id: p.id,
                                    author: (_c = (_b = p.author) === null || _b === void 0 ? void 0 : _b.name) !== null && _c !== void 0 ? _c : '',
                                    time: p.createdAt.toISOString(),
                                    content: p.content,
                                    likes: (_e = (_d = p._count) === null || _d === void 0 ? void 0 : _d.Likes) !== null && _e !== void 0 ? _e : 0,
                                    comments: (_g = (_f = p._count) === null || _f === void 0 ? void 0 : _f.Comments) !== null && _g !== void 0 ? _g : 0,
                                    image: (_j = (_h = p.mediaUrls) === null || _h === void 0 ? void 0 : _h[0]) !== null && _j !== void 0 ? _j : null,
                                    liked: p.Likes && p.Likes.length > 0,
                                });
                            });
                            return [4 /*yield*/, this.prisma.post.count({
                                    where: whereCondition,
                                })];
                        case 7:
                            total = _b.sent();
                            totalPages = Math.ceil(total / limit);
                            return [2 /*return*/, { data: data, total: total, page: page, limit: limit, totalPages: totalPages }];
                        case 8: return [4 /*yield*/, session.close()];
                        case 9:
                            _b.sent();
                            return [7 /*endfinally*/];
                        case 10: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Neo4j scoring query that returns candidate posts with scores
         * based on engagement, affinity, and recency.
         */
        FeedService_1.prototype.getScoredPostsFromGraph = function (userId, limit) {
            return __awaiter(this, void 0, void 0, function () {
                var safeLimit, session, result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            safeLimit = Math.max(0, Math.floor(limit));
                            session = this.neo4jService.getSession();
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, , 3, 5]);
                            return [4 /*yield*/, session.run("\n        MATCH (user:User {id: $userId})-[:FOLLOWS]->(author:User)\n        MATCH (author)-[:POSTED]->(post:Post)\n        WHERE post.createdAt > datetime() - duration('P7D')\n\n        OPTIONAL MATCH (user)-[userInteraction:LIKED|COMMENTED]->(post)\n        OPTIONAL MATCH (post)<-[allEngagement:LIKED|COMMENTED]-()\n        OPTIONAL MATCH (user)-[affinity:INTERACTED_WITH]->(author)\n\n        WITH post, author, \n             COUNT(DISTINCT allEngagement) as totalEngagement,\n             affinity.score as affinityScore,\n             CASE WHEN userInteraction IS NULL THEN 0 ELSE 1 END as alreadyInteracted,\n             duration.between(post.createdAt, datetime()).minutes as ageMinutes\n\n        WHERE alreadyInteracted = 0\n\n        WITH post,\n             totalEngagement * 1.0 as engagementScore,\n             COALESCE(affinityScore, 0) * 2.0 as affinityWeight,\n             1.0 / (1.0 + ageMinutes / 60.0) as timeDecay\n\n        WITH post,\n             (engagementScore + affinityWeight) * timeDecay as finalScore\n\n        RETURN post.id as postId, finalScore as score\n        ORDER BY finalScore DESC\n        LIMIT toInteger($limit)\n        ", { userId: userId, limit: safeLimit })];
                        case 2:
                            result = _a.sent();
                            return [2 /*return*/, result.records.map(function (record) { return ({
                                    postId: record.get('postId'),
                                    score: record.get('score'),
                                }); })];
                        case 3: return [4 /*yield*/, session.close()];
                        case 4:
                            _a.sent();
                            return [7 /*endfinally*/];
                        case 5: return [2 /*return*/];
                    }
                });
            });
        };
        FeedService_1.prototype.getMoodBoostScore = function (enabled, sentiment) {
            if (!enabled || !sentiment)
                return 0;
            if (sentiment.pos > 65)
                return 0.35;
            if (sentiment.neg > 65)
                return -0.35;
            return 0;
        };
        return FeedService_1;
    }());
    __setFunctionName(_classThis, "FeedService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        FeedService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return FeedService = _classThis;
}();
exports.FeedService = FeedService;
