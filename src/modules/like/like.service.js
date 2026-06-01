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
exports.LikeService = exports.LikeableType = void 0;
var common_1 = require("@nestjs/common");
var generic_http_exception_1 = require("../../common/application/exceptions/generic-http-exception");
var error_messages_constant_1 = require("../../common/constants/error-messages.constant");
var LikeableType;
(function (LikeableType) {
    LikeableType["POST"] = "POST";
    LikeableType["COMMENT"] = "COMMENT";
})(LikeableType || (exports.LikeableType = LikeableType = {}));
var LikeService = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var LikeService = _classThis = /** @class */ (function () {
        function LikeService_1(prisma, neo4j, notificationService, graphQueue) {
            this.prisma = prisma;
            this.neo4j = neo4j;
            this.notificationService = notificationService;
            this.graphQueue = graphQueue;
        }
        // Direct Neo4j sync helpers are no longer needed; we rely on the graph-sync queue.
        LikeService_1.prototype.likePost = function (userId, postId) {
            return __awaiter(this, void 0, void 0, function () {
                var post, existingLike, result, error_1, updatedPost, queueError_1;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.post.findUnique({ where: { id: postId } })];
                        case 1:
                            post = _a.sent();
                            if (!post) {
                                throw new generic_http_exception_1.GenericHttpException(error_messages_constant_1.ERROR_MESSAGES.POST_NOT_FOUND, common_1.HttpStatus.NOT_FOUND);
                            }
                            return [4 /*yield*/, this.prisma.like.findUnique({
                                    where: {
                                        userId_postId: { userId: userId, postId: postId },
                                    },
                                })];
                        case 2:
                            existingLike = _a.sent();
                            if (existingLike) {
                                throw new generic_http_exception_1.GenericHttpException(error_messages_constant_1.ERROR_MESSAGES.POST_ALREADY_LIKED, common_1.HttpStatus.BAD_REQUEST);
                            }
                            return [4 /*yield*/, this.prisma.$transaction(function (tx) { return __awaiter(_this, void 0, void 0, function () {
                                    var like;
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0: return [4 /*yield*/, tx.like.create({
                                                    data: { userId: userId, postId: postId },
                                                    include: {
                                                        user: {
                                                            select: {
                                                                id: true,
                                                                name: true,
                                                                image: true,
                                                            },
                                                        },
                                                    },
                                                })];
                                            case 1:
                                                like = _a.sent();
                                                // Increment post like count
                                                return [4 /*yield*/, tx.post.update({
                                                        where: { id: postId },
                                                        data: {
                                                            likeCount: {
                                                                increment: 1,
                                                            },
                                                        },
                                                    })];
                                            case 2:
                                                // Increment post like count
                                                _a.sent();
                                                return [2 /*return*/, like];
                                        }
                                    });
                                }); })];
                        case 3:
                            result = _a.sent();
                            _a.label = 4;
                        case 4:
                            _a.trys.push([4, 7, , 8]);
                            if (!(post.authorId !== userId)) return [3 /*break*/, 6];
                            return [4 /*yield*/, this.notificationService.notifyPostLike(userId, post.authorId, postId)];
                        case 5:
                            _a.sent();
                            _a.label = 6;
                        case 6: return [3 /*break*/, 8];
                        case 7:
                            error_1 = _a.sent();
                            console.error('Failed to send like notification', error_1);
                            return [3 /*break*/, 8];
                        case 8: return [4 /*yield*/, this.prisma.post.findUnique({
                                where: { id: postId },
                                select: { likeCount: true },
                            })];
                        case 9:
                            updatedPost = _a.sent();
                            _a.label = 10;
                        case 10:
                            _a.trys.push([10, 12, , 13]);
                            return [4 /*yield*/, this.graphQueue.add('sync-like', {
                                    userId: userId,
                                    postId: postId,
                                    action: 'LIKE',
                                    timestamp: new Date(),
                                })];
                        case 11:
                            _a.sent();
                            return [3 /*break*/, 13];
                        case 12:
                            queueError_1 = _a.sent();
                            console.error('Failed to enqueue like for graph sync', queueError_1);
                            return [3 /*break*/, 13];
                        case 13: return [2 /*return*/, __assign(__assign({}, result), { likesCount: (updatedPost === null || updatedPost === void 0 ? void 0 : updatedPost.likeCount) || 0 })];
                    }
                });
            });
        };
        LikeService_1.prototype.unlikePost = function (userId, postId) {
            return __awaiter(this, void 0, void 0, function () {
                var like, queueError_2, updatedPost;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.like.findUnique({
                                where: {
                                    userId_postId: { userId: userId, postId: postId },
                                },
                            })];
                        case 1:
                            like = _a.sent();
                            if (!like) {
                                throw new generic_http_exception_1.GenericHttpException(error_messages_constant_1.ERROR_MESSAGES.LIKE_NOT_FOUND, common_1.HttpStatus.NOT_FOUND);
                            }
                            return [4 /*yield*/, this.prisma.$transaction(function (tx) { return __awaiter(_this, void 0, void 0, function () {
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0: return [4 /*yield*/, tx.like.delete({ where: { id: like.id } })];
                                            case 1:
                                                _a.sent();
                                                // Decrement post like count
                                                return [4 /*yield*/, tx.post.update({
                                                        where: { id: postId },
                                                        data: {
                                                            likeCount: {
                                                                decrement: 1,
                                                            },
                                                        },
                                                    })];
                                            case 2:
                                                // Decrement post like count
                                                _a.sent();
                                                return [2 /*return*/];
                                        }
                                    });
                                }); })];
                        case 2:
                            _a.sent();
                            _a.label = 3;
                        case 3:
                            _a.trys.push([3, 5, , 6]);
                            return [4 /*yield*/, this.graphQueue.add('sync-like', {
                                    userId: userId,
                                    postId: postId,
                                    action: 'UNLIKE',
                                    timestamp: new Date(),
                                })];
                        case 4:
                            _a.sent();
                            return [3 /*break*/, 6];
                        case 5:
                            queueError_2 = _a.sent();
                            console.error('Failed to enqueue unlike for graph sync', queueError_2);
                            return [3 /*break*/, 6];
                        case 6: return [4 /*yield*/, this.prisma.post.findUnique({
                                where: { id: postId },
                                select: { likeCount: true },
                            })];
                        case 7:
                            updatedPost = _a.sent();
                            return [2 /*return*/, {
                                    success: true,
                                    likesCount: (updatedPost === null || updatedPost === void 0 ? void 0 : updatedPost.likeCount) || 0,
                                }];
                    }
                });
            });
        };
        LikeService_1.prototype.likeComment = function (userId, commentId) {
            return __awaiter(this, void 0, void 0, function () {
                var comment, existingLike, result, error_2, updatedComment, queueError_3;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.comment.findUnique({
                                where: { id: commentId },
                            })];
                        case 1:
                            comment = _a.sent();
                            if (!comment) {
                                throw new generic_http_exception_1.GenericHttpException(error_messages_constant_1.ERROR_MESSAGES.COMMENT_NOT_FOUND, common_1.HttpStatus.NOT_FOUND);
                            }
                            return [4 /*yield*/, this.prisma.like.findUnique({
                                    where: {
                                        userId_commentId: { userId: userId, commentId: commentId },
                                    },
                                })];
                        case 2:
                            existingLike = _a.sent();
                            if (existingLike) {
                                throw new generic_http_exception_1.GenericHttpException(error_messages_constant_1.ERROR_MESSAGES.COMMENT_ALREADY_LIKED, common_1.HttpStatus.BAD_REQUEST);
                            }
                            return [4 /*yield*/, this.prisma.$transaction(function (tx) { return __awaiter(_this, void 0, void 0, function () {
                                    var like;
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0: return [4 /*yield*/, tx.like.create({
                                                    data: { userId: userId, commentId: commentId },
                                                    include: {
                                                        user: {
                                                            select: {
                                                                id: true,
                                                                name: true,
                                                                image: true,
                                                            },
                                                        },
                                                    },
                                                })];
                                            case 1:
                                                like = _a.sent();
                                                // Increment comment like count
                                                return [4 /*yield*/, tx.comment.update({
                                                        where: { id: commentId },
                                                        data: {
                                                            likeCount: {
                                                                increment: 1,
                                                            },
                                                        },
                                                    })];
                                            case 2:
                                                // Increment comment like count
                                                _a.sent();
                                                return [2 /*return*/, like];
                                        }
                                    });
                                }); })];
                        case 3:
                            result = _a.sent();
                            _a.label = 4;
                        case 4:
                            _a.trys.push([4, 7, , 8]);
                            if (!(comment.authorId !== userId)) return [3 /*break*/, 6];
                            return [4 /*yield*/, this.notificationService.notifyCommentLike(userId, comment.authorId, commentId, comment.postId)];
                        case 5:
                            _a.sent();
                            _a.label = 6;
                        case 6: return [3 /*break*/, 8];
                        case 7:
                            error_2 = _a.sent();
                            console.error('Failed to send comment like notification', error_2);
                            return [3 /*break*/, 8];
                        case 8: return [4 /*yield*/, this.prisma.comment.findUnique({
                                where: { id: commentId },
                                select: { likeCount: true },
                            })];
                        case 9:
                            updatedComment = _a.sent();
                            _a.label = 10;
                        case 10:
                            _a.trys.push([10, 12, , 13]);
                            return [4 /*yield*/, this.graphQueue.add('sync-like', {
                                    userId: userId,
                                    commentId: commentId,
                                    action: 'LIKE',
                                    timestamp: new Date(),
                                })];
                        case 11:
                            _a.sent();
                            return [3 /*break*/, 13];
                        case 12:
                            queueError_3 = _a.sent();
                            console.error('Failed to enqueue comment like for graph sync', queueError_3);
                            return [3 /*break*/, 13];
                        case 13: return [2 /*return*/, __assign(__assign({}, result), { likesCount: (updatedComment === null || updatedComment === void 0 ? void 0 : updatedComment.likeCount) || 0 })];
                    }
                });
            });
        };
        LikeService_1.prototype.unlikeComment = function (userId, commentId) {
            return __awaiter(this, void 0, void 0, function () {
                var like, queueError_4, updatedComment;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.like.findUnique({
                                where: {
                                    userId_commentId: { userId: userId, commentId: commentId },
                                },
                            })];
                        case 1:
                            like = _a.sent();
                            if (!like) {
                                throw new generic_http_exception_1.GenericHttpException(error_messages_constant_1.ERROR_MESSAGES.LIKE_NOT_FOUND, common_1.HttpStatus.NOT_FOUND);
                            }
                            return [4 /*yield*/, this.prisma.$transaction(function (tx) { return __awaiter(_this, void 0, void 0, function () {
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0: return [4 /*yield*/, tx.like.delete({ where: { id: like.id } })];
                                            case 1:
                                                _a.sent();
                                                // Decrement comment like count
                                                return [4 /*yield*/, tx.comment.update({
                                                        where: { id: commentId },
                                                        data: {
                                                            likeCount: {
                                                                decrement: 1,
                                                            },
                                                        },
                                                    })];
                                            case 2:
                                                // Decrement comment like count
                                                _a.sent();
                                                return [2 /*return*/];
                                        }
                                    });
                                }); })];
                        case 2:
                            _a.sent();
                            _a.label = 3;
                        case 3:
                            _a.trys.push([3, 5, , 6]);
                            return [4 /*yield*/, this.graphQueue.add('sync-like', {
                                    userId: userId,
                                    commentId: commentId,
                                    action: 'UNLIKE',
                                    timestamp: new Date(),
                                })];
                        case 4:
                            _a.sent();
                            return [3 /*break*/, 6];
                        case 5:
                            queueError_4 = _a.sent();
                            console.error('Failed to enqueue comment unlike for graph sync', queueError_4);
                            return [3 /*break*/, 6];
                        case 6: return [4 /*yield*/, this.prisma.comment.findUnique({
                                where: { id: commentId },
                                select: { likeCount: true },
                            })];
                        case 7:
                            updatedComment = _a.sent();
                            return [2 /*return*/, {
                                    success: true,
                                    likesCount: (updatedComment === null || updatedComment === void 0 ? void 0 : updatedComment.likeCount) || 0,
                                }];
                    }
                });
            });
        };
        LikeService_1.prototype.getPostLikes = function (postId_1) {
            return __awaiter(this, arguments, void 0, function (postId, page, limit) {
                var skip, _a, likes, total;
                if (page === void 0) { page = 1; }
                if (limit === void 0) { limit = 20; }
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            skip = (page - 1) * limit;
                            return [4 /*yield*/, Promise.all([
                                    this.prisma.like.findMany({
                                        where: { postId: postId },
                                        include: {
                                            user: {
                                                select: {
                                                    id: true,
                                                    name: true,
                                                    image: true,
                                                },
                                            },
                                        },
                                        orderBy: { createdAt: 'desc' },
                                        skip: skip,
                                        take: limit,
                                    }),
                                    this.prisma.like.count({ where: { postId: postId } }),
                                ])];
                        case 1:
                            _a = _b.sent(), likes = _a[0], total = _a[1];
                            return [2 /*return*/, {
                                    data: likes,
                                    meta: {
                                        total: total,
                                        page: page,
                                        limit: limit,
                                        totalPages: Math.ceil(total / limit),
                                    },
                                }];
                    }
                });
            });
        };
        LikeService_1.prototype.hasUserLiked = function (userId, postId, commentId) {
            return __awaiter(this, void 0, void 0, function () {
                var like, like;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!postId) return [3 /*break*/, 2];
                            return [4 /*yield*/, this.prisma.like.findUnique({
                                    where: {
                                        userId_postId: { userId: userId, postId: postId },
                                    },
                                })];
                        case 1:
                            like = _a.sent();
                            return [2 /*return*/, !!like];
                        case 2:
                            if (!commentId) return [3 /*break*/, 4];
                            return [4 /*yield*/, this.prisma.like.findFirst({
                                    where: { userId: userId, commentId: commentId },
                                })];
                        case 3:
                            like = _a.sent();
                            return [2 /*return*/, !!like];
                        case 4: return [2 /*return*/, false];
                    }
                });
            });
        };
        return LikeService_1;
    }());
    __setFunctionName(_classThis, "LikeService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        LikeService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return LikeService = _classThis;
}();
exports.LikeService = LikeService;
