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
exports.CommentService = void 0;
var common_1 = require("@nestjs/common");
var generic_http_exception_1 = require("../../common/application/exceptions/generic-http-exception");
var error_messages_constant_1 = require("../../common/constants/error-messages.constant");
var CommentService = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var CommentService = _classThis = /** @class */ (function () {
        function CommentService_1(prisma, notificationService, graphQueue) {
            this.prisma = prisma;
            this.notificationService = notificationService;
            this.graphQueue = graphQueue;
        }
        CommentService_1.prototype.createComment = function (postId, authorId, dto) {
            return __awaiter(this, void 0, void 0, function () {
                var post, parentComment, comment, notificationError_1;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.post.findFirst({
                                where: { id: postId, isDeleted: false },
                                select: { id: true, authorId: true },
                            })];
                        case 1:
                            post = _a.sent();
                            if (!post) {
                                throw generic_http_exception_1.GenericHttpException.createLocalized(error_messages_constant_1.ERROR_MESSAGES.POST_NOT_FOUND, common_1.HttpStatus.NOT_FOUND);
                            }
                            parentComment = null;
                            if (!dto.parentCommentId) return [3 /*break*/, 3];
                            return [4 /*yield*/, this.prisma.comment.findUnique({
                                    where: { id: dto.parentCommentId },
                                    select: { id: true, parentId: true, postId: true },
                                })];
                        case 2:
                            parentComment = _a.sent();
                            if (!parentComment || parentComment.postId !== postId) {
                                throw generic_http_exception_1.GenericHttpException.createLocalized(error_messages_constant_1.ERROR_MESSAGES.COMMENT_NOT_FOUND, common_1.HttpStatus.NOT_FOUND);
                            }
                            if (parentComment.parentId) {
                                throw generic_http_exception_1.GenericHttpException.createLocalized(error_messages_constant_1.ERROR_MESSAGES.COMMENT_NESTING_NOT_ALLOWED, common_1.HttpStatus.BAD_REQUEST);
                            }
                            _a.label = 3;
                        case 3: return [4 /*yield*/, this.prisma.$transaction(function (tx) { return __awaiter(_this, void 0, void 0, function () {
                                var createdComment;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, tx.comment.create({
                                                data: {
                                                    content: dto.content,
                                                    postId: postId,
                                                    authorId: authorId,
                                                    parentId: dto.parentCommentId,
                                                },
                                                include: {
                                                    author: {
                                                        select: {
                                                            id: true,
                                                            name: true,
                                                            image: true,
                                                        },
                                                    },
                                                    _count: {
                                                        select: { replies: true },
                                                    },
                                                },
                                            })];
                                        case 1:
                                            createdComment = _a.sent();
                                            // Update post comment count
                                            return [4 /*yield*/, tx.post.update({
                                                    where: { id: postId },
                                                    data: {
                                                        commentCount: {
                                                            increment: 1,
                                                        },
                                                    },
                                                })];
                                        case 2:
                                            // Update post comment count
                                            _a.sent();
                                            if (!dto.parentCommentId) return [3 /*break*/, 4];
                                            return [4 /*yield*/, tx.comment.update({
                                                    where: { id: dto.parentCommentId },
                                                    data: {
                                                        replyCount: {
                                                            increment: 1,
                                                        },
                                                    },
                                                })];
                                        case 3:
                                            _a.sent();
                                            _a.label = 4;
                                        case 4: return [2 /*return*/, createdComment];
                                    }
                                });
                            }); })];
                        case 4:
                            comment = _a.sent();
                            return [4 /*yield*/, this.enqueueCommentSync({
                                    userId: authorId,
                                    postId: postId,
                                    commentId: comment.id,
                                    timestamp: comment.createdAt,
                                })];
                        case 5:
                            _a.sent();
                            _a.label = 6;
                        case 6:
                            _a.trys.push([6, 8, , 9]);
                            return [4 /*yield*/, this.notificationService.notifyPostComment(authorId, post.authorId, postId, comment.content)];
                        case 7:
                            _a.sent();
                            return [3 /*break*/, 9];
                        case 8:
                            notificationError_1 = _a.sent();
                            console.error('Failed to send comment notification', notificationError_1);
                            return [3 /*break*/, 9];
                        case 9: return [2 /*return*/, this.toCommentResponse(comment)];
                    }
                });
            });
        };
        CommentService_1.prototype.getPostComments = function (postId_1, userId_1) {
            return __awaiter(this, arguments, void 0, function (postId, userId, page, limit, sort) {
                var skip, _a, comments, total;
                var _this = this;
                if (page === void 0) { page = 1; }
                if (limit === void 0) { limit = 20; }
                if (sort === void 0) { sort = 'top'; }
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            skip = (page - 1) * limit;
                            return [4 /*yield*/, Promise.all([
                                    this.prisma.comment.findMany({
                                        where: {
                                            postId: postId,
                                            parentId: null,
                                        },
                                        select: __assign({ id: true, content: true, postId: true, parentId: true, createdAt: true, updatedAt: true, likeCount: true, replyCount: true, author: {
                                                select: {
                                                    id: true,
                                                    name: true,
                                                    image: true,
                                                },
                                            }, _count: {
                                                select: {
                                                    replies: true,
                                                },
                                            } }, (userId && {
                                            likes: {
                                                where: {
                                                    userId: userId,
                                                },
                                                select: {
                                                    userId: true,
                                                },
                                            },
                                        })),
                                        orderBy: { createdAt: 'desc' },
                                        skip: skip,
                                        take: limit,
                                    }),
                                    this.prisma.comment.count({
                                        where: {
                                            postId: postId,
                                            parentId: null,
                                        },
                                    }),
                                ])];
                        case 1:
                            _a = _b.sent(), comments = _a[0], total = _a[1];
                            if (sort === 'top') {
                                comments.sort(function (a, b) {
                                    var _a, _b, _c, _d;
                                    var replyDiff = ((_b = (_a = b._count) === null || _a === void 0 ? void 0 : _a.replies) !== null && _b !== void 0 ? _b : 0) - ((_d = (_c = a._count) === null || _c === void 0 ? void 0 : _c.replies) !== null && _d !== void 0 ? _d : 0);
                                    if (replyDiff !== 0) {
                                        return replyDiff;
                                    }
                                    return b.createdAt.getTime() - a.createdAt.getTime();
                                });
                            }
                            return [2 /*return*/, {
                                    data: comments.map(function (comment) { return _this.toCommentResponse(comment, userId); }),
                                    total: total,
                                    page: page,
                                    limit: limit,
                                    totalPages: Math.ceil(total / limit),
                                }];
                    }
                });
            });
        };
        CommentService_1.prototype.getCommentReplies = function (commentId_1, userId_1) {
            return __awaiter(this, arguments, void 0, function (commentId, userId, page, limit) {
                var skip, _a, replies, total;
                var _this = this;
                if (page === void 0) { page = 1; }
                if (limit === void 0) { limit = 10; }
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            skip = (page - 1) * limit;
                            return [4 /*yield*/, Promise.all([
                                    this.prisma.comment.findMany({
                                        where: {
                                            parentId: commentId,
                                        },
                                        select: __assign({ id: true, content: true, postId: true, parentId: true, createdAt: true, updatedAt: true, likeCount: true, replyCount: true, author: {
                                                select: {
                                                    id: true,
                                                    name: true,
                                                    image: true,
                                                },
                                            }, _count: {
                                                select: {
                                                    replies: true,
                                                },
                                            } }, (userId && {
                                            likes: {
                                                where: {
                                                    userId: userId,
                                                },
                                                select: {
                                                    userId: true,
                                                },
                                            },
                                        })),
                                        orderBy: { createdAt: 'asc' },
                                        skip: skip,
                                        take: limit,
                                    }),
                                    this.prisma.comment.count({
                                        where: {
                                            parentId: commentId,
                                        },
                                    }),
                                ])];
                        case 1:
                            _a = _b.sent(), replies = _a[0], total = _a[1];
                            return [2 /*return*/, {
                                    data: replies.map(function (reply) { return _this.toCommentResponse(reply, userId); }),
                                    total: total,
                                    page: page,
                                    limit: limit,
                                    totalPages: Math.ceil(total / limit),
                                }];
                    }
                });
            });
        };
        CommentService_1.prototype.updateComment = function (commentId, authorId, dto) {
            return __awaiter(this, void 0, void 0, function () {
                var existingComment, updatedComment;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.comment.findUnique({
                                where: { id: commentId },
                            })];
                        case 1:
                            existingComment = _a.sent();
                            if (!existingComment) {
                                throw generic_http_exception_1.GenericHttpException.createLocalized(error_messages_constant_1.ERROR_MESSAGES.COMMENT_NOT_FOUND, common_1.HttpStatus.NOT_FOUND);
                            }
                            if (existingComment.authorId !== authorId) {
                                throw generic_http_exception_1.GenericHttpException.createLocalized(error_messages_constant_1.ERROR_MESSAGES.COMMENT_UNAUTHORIZED, common_1.HttpStatus.FORBIDDEN);
                            }
                            return [4 /*yield*/, this.prisma.comment.update({
                                    where: { id: commentId },
                                    data: {
                                        content: dto.content,
                                        updatedAt: new Date(),
                                    },
                                    include: {
                                        author: {
                                            select: {
                                                id: true,
                                                name: true,
                                                image: true,
                                            },
                                        },
                                        _count: {
                                            select: {
                                                replies: true,
                                            },
                                        },
                                    },
                                })];
                        case 2:
                            updatedComment = _a.sent();
                            return [2 /*return*/, this.toCommentResponse(updatedComment)];
                    }
                });
            });
        };
        CommentService_1.prototype.deleteComment = function (commentId, authorId) {
            return __awaiter(this, void 0, void 0, function () {
                var comment, postId;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.comment.findUnique({
                                where: { id: commentId },
                            })];
                        case 1:
                            comment = _a.sent();
                            if (!comment) {
                                throw generic_http_exception_1.GenericHttpException.createLocalized(error_messages_constant_1.ERROR_MESSAGES.COMMENT_NOT_FOUND, common_1.HttpStatus.NOT_FOUND);
                            }
                            if (comment.authorId !== authorId) {
                                throw generic_http_exception_1.GenericHttpException.createLocalized(error_messages_constant_1.ERROR_MESSAGES.COMMENT_UNAUTHORIZED, common_1.HttpStatus.FORBIDDEN);
                            }
                            postId = comment.postId;
                            return [4 /*yield*/, this.prisma.$transaction(function (tx) { return __awaiter(_this, void 0, void 0, function () {
                                    var commentToDelete, totalCommentsToRemove;
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0: return [4 /*yield*/, tx.comment.findUnique({
                                                    where: { id: commentId },
                                                    select: { postId: true, parentId: true, replyCount: true },
                                                })];
                                            case 1:
                                                commentToDelete = _a.sent();
                                                if (!commentToDelete) {
                                                    throw generic_http_exception_1.GenericHttpException.createLocalized(error_messages_constant_1.ERROR_MESSAGES.COMMENT_NOT_FOUND, common_1.HttpStatus.NOT_FOUND);
                                                }
                                                return [4 /*yield*/, tx.comment.delete({
                                                        where: { id: commentId },
                                                    })];
                                            case 2:
                                                _a.sent();
                                                totalCommentsToRemove = 1 + commentToDelete.replyCount;
                                                return [4 /*yield*/, tx.post.update({
                                                        where: { id: commentToDelete.postId },
                                                        data: {
                                                            commentCount: {
                                                                decrement: totalCommentsToRemove,
                                                            },
                                                        },
                                                    })];
                                            case 3:
                                                _a.sent();
                                                if (!commentToDelete.parentId) return [3 /*break*/, 5];
                                                return [4 /*yield*/, tx.comment.update({
                                                        where: { id: commentToDelete.parentId },
                                                        data: {
                                                            replyCount: {
                                                                decrement: 1,
                                                            },
                                                        },
                                                    })];
                                            case 4:
                                                _a.sent();
                                                _a.label = 5;
                                            case 5: return [2 /*return*/];
                                        }
                                    });
                                }); })];
                        case 2:
                            _a.sent();
                            return [4 /*yield*/, this.enqueueCommentSync({
                                    userId: authorId,
                                    postId: postId,
                                    commentId: commentId,
                                    timestamp: new Date(),
                                    action: 'DELETE',
                                })];
                        case 3:
                            _a.sent();
                            return [2 /*return*/, { success: true }];
                    }
                });
            });
        };
        CommentService_1.prototype.toCommentResponse = function (comment, userId) {
            var _a, _b, _c;
            return {
                id: comment.id,
                content: comment.content,
                postId: comment.postId,
                parentCommentId: comment.parentId,
                replyCount: (_b = (_a = comment._count) === null || _a === void 0 ? void 0 : _a.replies) !== null && _b !== void 0 ? _b : 0,
                likeCount: (_c = comment.likeCount) !== null && _c !== void 0 ? _c : 0,
                createdAt: comment.createdAt,
                updatedAt: comment.updatedAt,
                author: comment.author
                    ? {
                        id: comment.author.id,
                        name: comment.author.name,
                        image: comment.author.image,
                    }
                    : null,
                liked: userId ? comment.likes && comment.likes.length > 0 : false,
            };
        };
        CommentService_1.prototype.enqueueCommentSync = function (payload) {
            return __awaiter(this, void 0, void 0, function () {
                var error_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            // Validate payload before queuing
                            if (!payload.userId ||
                                !payload.postId ||
                                !payload.commentId ||
                                !payload.timestamp) {
                                console.error('Invalid payload for comment sync:', payload);
                                return [2 /*return*/];
                            }
                            return [4 /*yield*/, this.graphQueue.add('sync-comment', payload)];
                        case 1:
                            _a.sent();
                            return [3 /*break*/, 3];
                        case 2:
                            error_1 = _a.sent();
                            console.error('Failed to enqueue comment sync job', error_1);
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        return CommentService_1;
    }());
    __setFunctionName(_classThis, "CommentService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        CommentService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return CommentService = _classThis;
}();
exports.CommentService = CommentService;
