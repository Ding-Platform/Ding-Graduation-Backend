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
exports.PostService = void 0;
var common_1 = require("@nestjs/common");
var generic_http_exception_1 = require("../../common/application/exceptions/generic-http-exception");
var error_messages_constant_1 = require("../../common/constants/error-messages.constant");
var post_constants_1 = require("../../common/constants/post.constants");
var create_post_dto_1 = require("./dtos/create_post.dto");
var hashtag_util_1 = require("../../common/utils/hashtag.util");
var PostService = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var PostService = _classThis = /** @class */ (function () {
        function PostService_1(prisma, helperService, cloudinaryService, notificationService, redisService, interestService, activityService, graphQueue, sentimentQueue) {
            this.prisma = prisma;
            this.helperService = helperService;
            this.cloudinaryService = cloudinaryService;
            this.notificationService = notificationService;
            this.redisService = redisService;
            this.interestService = interestService;
            this.activityService = activityService;
            this.graphQueue = graphQueue;
            this.sentimentQueue = sentimentQueue;
        }
        PostService_1.prototype.getAllPosts = function (userId_1) {
            return __awaiter(this, arguments, void 0, function (userId, page, limit) {
                var skip, posts;
                var _this = this;
                if (page === void 0) { page = 1; }
                if (limit === void 0) { limit = 20; }
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            skip = (page - 1) * limit;
                            return [4 /*yield*/, this.prisma.post.findMany({
                                    where: {
                                        isDeleted: false,
                                    },
                                    include: {
                                        author: {
                                            select: {
                                                id: true,
                                                name: true,
                                                image: true,
                                            },
                                        },
                                        PostMedia: true,
                                        _count: {
                                            select: {
                                                Likes: true,
                                                Comments: true,
                                            },
                                        },
                                        Likes: userId
                                            ? {
                                                where: {
                                                    userId: userId,
                                                },
                                                select: {
                                                    userId: true,
                                                },
                                            }
                                            : false,
                                    },
                                    orderBy: {
                                        createdAt: 'desc',
                                    },
                                    skip: skip,
                                    take: limit,
                                })];
                        case 1:
                            posts = _a.sent();
                            if (!posts || posts.length === 0) {
                                throw generic_http_exception_1.GenericHttpException.createLocalized(error_messages_constant_1.ERROR_MESSAGES.POSTS_NOT_FOUND, common_1.HttpStatus.NOT_FOUND);
                            }
                            return [2 /*return*/, posts.map(function (post) { return _this.mapPostToSimple(post, userId); })];
                    }
                });
            });
        };
        PostService_1.prototype.getPostById = function (postId, userId) {
            return __awaiter(this, void 0, void 0, function () {
                var post;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.getPostWithRelations(postId, userId)];
                        case 1:
                            post = _a.sent();
                            return [2 /*return*/, this.mapPostToSimple(post, userId)];
                    }
                });
            });
        };
        PostService_1.prototype.getPostsByHashtag = function (hashtag_1, userId_1) {
            return __awaiter(this, arguments, void 0, function (hashtag, userId, page, limit) {
                var skip, normalizedTag, posts;
                var _this = this;
                if (page === void 0) { page = 1; }
                if (limit === void 0) { limit = 20; }
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            skip = (page - 1) * limit;
                            normalizedTag = hashtag.toLowerCase().replace(/^#/, '');
                            return [4 /*yield*/, this.prisma.post.findMany({
                                    where: {
                                        isDeleted: false,
                                        hashtags: { has: normalizedTag },
                                    },
                                    include: {
                                        author: {
                                            select: {
                                                id: true,
                                                name: true,
                                                image: true,
                                            },
                                        },
                                        PostMedia: true,
                                        _count: {
                                            select: {
                                                Likes: true,
                                                Comments: true,
                                            },
                                        },
                                        Likes: userId
                                            ? {
                                                where: {
                                                    userId: userId,
                                                },
                                                select: {
                                                    userId: true,
                                                },
                                            }
                                            : false,
                                    },
                                    orderBy: {
                                        createdAt: 'desc',
                                    },
                                    skip: skip,
                                    take: limit,
                                })];
                        case 1:
                            posts = _a.sent();
                            if (!posts || posts.length === 0) {
                                throw generic_http_exception_1.GenericHttpException.createLocalized(error_messages_constant_1.ERROR_MESSAGES.POSTS_NOT_FOUND, common_1.HttpStatus.NOT_FOUND);
                            }
                            return [2 /*return*/, posts.map(function (post) { return _this.mapPostToSimple(post, userId); })];
                    }
                });
            });
        };
        PostService_1.prototype.createPost = function (data, files) {
            return __awaiter(this, void 0, void 0, function () {
                var userId, hashtags, newPost_1, mediaUrls, mediaRecords, uploadResult, _i, _a, img, _b, _c, vid, queueError_1, error_1;
                var _this = this;
                var _d, _e, _f, _g, _h;
                return __generator(this, function (_j) {
                    switch (_j.label) {
                        case 0:
                            userId = data.authorId;
                            _j.label = 1;
                        case 1:
                            _j.trys.push([1, 14, , 15]);
                            // Validate content length
                            this.validatePostContent(data.content);
                            // Validate media count
                            if (files) {
                                this.validateMediaCount(files);
                            }
                            hashtags = (0, hashtag_util_1.extractHashtags)(data.content);
                            if (hashtags.length > 0) {
                                Promise.all(hashtags.map(function (tag) { return _this.redisService.zIncrBy('trending_hashtags', 1, tag); })).catch(function (err) { return console.error('Failed to update trending hashtags', err); });
                            }
                            return [4 /*yield*/, this.prisma.post.create({
                                    data: {
                                        content: data.content,
                                        authorId: data.authorId,
                                        privacy: data.privacy,
                                        hashtags: hashtags,
                                    },
                                })];
                        case 2:
                            newPost_1 = _j.sent();
                            mediaUrls = [];
                            mediaRecords = [];
                            if (!(files && (files.images || files.videos))) return [3 /*break*/, 6];
                            return [4 /*yield*/, this.cloudinaryService.uploadMultiplePostMedia({
                                    images: files.images,
                                    videos: files.videos,
                                }, newPost_1.id)];
                        case 3:
                            uploadResult = _j.sent();
                            // Process images
                            if (uploadResult.imageUrls.length > 0) {
                                for (_i = 0, _a = uploadResult.imageUrls; _i < _a.length; _i++) {
                                    img = _a[_i];
                                    mediaUrls.push(img.url);
                                    mediaRecords.push({
                                        url: img.url,
                                        type: 'IMAGE',
                                        publicId: img.publicId,
                                        size: ((_e = (_d = files.images) === null || _d === void 0 ? void 0 : _d.find(function () { return true; })) === null || _e === void 0 ? void 0 : _e.size) || 0,
                                        width: img.width,
                                        height: img.height,
                                    });
                                }
                            }
                            // Process videos
                            if (uploadResult.videoUrls.length > 0) {
                                for (_b = 0, _c = uploadResult.videoUrls; _b < _c.length; _b++) {
                                    vid = _c[_b];
                                    mediaUrls.push(vid.url);
                                    mediaRecords.push({
                                        url: vid.url,
                                        type: 'VIDEO',
                                        publicId: vid.publicId,
                                        size: ((_g = (_f = files.videos) === null || _f === void 0 ? void 0 : _f.find(function () { return true; })) === null || _g === void 0 ? void 0 : _g.size) || 0,
                                        width: vid.width,
                                        height: vid.height,
                                    });
                                }
                            }
                            // Update post with media URLs
                            return [4 /*yield*/, this.prisma.post.update({
                                    where: { id: newPost_1.id },
                                    data: { mediaUrls: mediaUrls },
                                })];
                        case 4:
                            // Update post with media URLs
                            _j.sent();
                            if (!(mediaRecords.length > 0)) return [3 /*break*/, 6];
                            return [4 /*yield*/, this.prisma.postMedia.createMany({
                                    data: mediaRecords.map(function (media) { return (__assign({ postId: newPost_1.id }, media)); }),
                                })];
                        case 5:
                            _j.sent();
                            _j.label = 6;
                        case 6:
                            if (!(data.privacy === create_post_dto_1.PostPrivacy.CUSTOM &&
                                data.customAudienceIds &&
                                data.customAudienceIds.length > 0)) return [3 /*break*/, 8];
                            return [4 /*yield*/, this.prisma.postAudience.createMany({
                                    data: data.customAudienceIds.map(function (userId) { return ({
                                        postId: newPost_1.id,
                                        userId: userId,
                                    }); }),
                                })];
                        case 7:
                            _j.sent();
                            _j.label = 8;
                        case 8:
                            _j.trys.push([8, 10, , 11]);
                            return [4 /*yield*/, this.graphQueue.add('sync-post', {
                                    postId: newPost_1.id,
                                    authorId: newPost_1.authorId,
                                    createdAt: newPost_1.createdAt,
                                    action: 'CREATE',
                                })];
                        case 9:
                            _j.sent();
                            return [3 /*break*/, 11];
                        case 10:
                            queueError_1 = _j.sent();
                            console.error('Failed to enqueue post creation for graph sync', queueError_1);
                            return [3 /*break*/, 11];
                        case 11: 
                        // Create post history
                        return [4 /*yield*/, this.createPostHistory(newPost_1.id, data.content, mediaUrls, (_h = data.privacy) !== null && _h !== void 0 ? _h : 'PUBLIC', 'CREATED')];
                        case 12:
                            // Create post history
                            _j.sent();
                            // Async sentiment analysis (non-blocking for API response).
                            return [4 /*yield*/, this.sentimentQueue.add('analyze-content', {
                                    text: data.content,
                                    contentType: 'POST',
                                    contentId: newPost_1.id,
                                    userId: data.authorId,
                                }, {
                                    jobId: "sentiment:POST:".concat(newPost_1.id),
                                    removeOnComplete: true,
                                    removeOnFail: true,
                                })];
                        case 13:
                            // Async sentiment analysis (non-blocking for API response).
                            _j.sent();
                            this.activityService.logActivity(userId, 'CREATED_POST', newPost_1.id, 'POST');
                            return [2 /*return*/, this.getPostById(newPost_1.id, userId)];
                        case 14:
                            error_1 = _j.sent();
                            console.error('Post creation error:', error_1);
                            if (error_1 instanceof generic_http_exception_1.GenericHttpException) {
                                throw error_1;
                            }
                            throw generic_http_exception_1.GenericHttpException.createLocalized(error_messages_constant_1.ERROR_MESSAGES.POST_CREATION_FAILED, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
                        case 15: return [2 /*return*/];
                    }
                });
            });
        };
        PostService_1.prototype.updatePost = function (postId, userId, data) {
            return __awaiter(this, void 0, void 0, function () {
                var updateData, updatedPost, queueError_2, error_2;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 10, , 11]);
                            // Check post exists and user owns it
                            return [4 /*yield*/, this.checkPostOwnership(postId, userId)];
                        case 1:
                            // Check post exists and user owns it
                            _a.sent();
                            // Validate content if provided
                            if (data.content) {
                                this.validatePostContent(data.content);
                            }
                            updateData = {};
                            if (data.content !== undefined) {
                                updateData.content = data.content;
                                updateData.hashtags = (0, hashtag_util_1.extractHashtags)(data.content);
                            }
                            if (data.privacy !== undefined)
                                updateData.privacy = data.privacy;
                            return [4 /*yield*/, this.prisma.post.update({
                                    where: { id: postId },
                                    data: updateData,
                                })];
                        case 2:
                            updatedPost = _a.sent();
                            if (!(data.privacy === create_post_dto_1.PostPrivacy.CUSTOM && data.customAudienceIds)) return [3 /*break*/, 5];
                            // Remove old audience
                            return [4 /*yield*/, this.prisma.postAudience.deleteMany({
                                    where: { postId: postId },
                                })];
                        case 3:
                            // Remove old audience
                            _a.sent();
                            if (!(data.customAudienceIds.length > 0)) return [3 /*break*/, 5];
                            return [4 /*yield*/, this.prisma.postAudience.createMany({
                                    data: data.customAudienceIds.map(function (uid) { return ({
                                        postId: postId,
                                        userId: uid,
                                    }); }),
                                })];
                        case 4:
                            _a.sent();
                            _a.label = 5;
                        case 5:
                            _a.trys.push([5, 7, , 8]);
                            return [4 /*yield*/, this.graphQueue.add('sync-post', {
                                    postId: postId,
                                    authorId: userId,
                                    action: 'UPDATE',
                                    updatedAt: new Date(),
                                })];
                        case 6:
                            _a.sent();
                            return [3 /*break*/, 8];
                        case 7:
                            queueError_2 = _a.sent();
                            console.error('Failed to enqueue post update for graph sync', queueError_2);
                            return [3 /*break*/, 8];
                        case 8: 
                        // Create history record
                        return [4 /*yield*/, this.createPostHistory(postId, updatedPost.content, updatedPost.mediaUrls, updatedPost.privacy, 'UPDATED')];
                        case 9:
                            // Create history record
                            _a.sent();
                            return [2 /*return*/, this.getPostById(postId, userId)];
                        case 10:
                            error_2 = _a.sent();
                            console.error('Post update error:', error_2);
                            if (error_2 instanceof generic_http_exception_1.GenericHttpException) {
                                throw error_2;
                            }
                            throw generic_http_exception_1.GenericHttpException.createLocalized(error_messages_constant_1.ERROR_MESSAGES.POST_UPDATE_FAILED, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
                        case 11: return [2 /*return*/];
                    }
                });
            });
        };
        PostService_1.prototype.deletePost = function (postId, userId) {
            return __awaiter(this, void 0, void 0, function () {
                var post, queueError_3, error_3;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 8, , 9]);
                            return [4 /*yield*/, this.checkPostOwnership(postId, userId)];
                        case 1:
                            post = _a.sent();
                            if (post.isDeleted) {
                                throw generic_http_exception_1.GenericHttpException.createLocalized(error_messages_constant_1.ERROR_MESSAGES.POST_ALREADY_DELETED, common_1.HttpStatus.BAD_REQUEST);
                            }
                            // Soft delete
                            return [4 /*yield*/, this.prisma.post.update({
                                    where: { id: postId },
                                    data: {
                                        isDeleted: true,
                                        deletedAt: new Date(),
                                    },
                                })];
                        case 2:
                            // Soft delete
                            _a.sent();
                            _a.label = 3;
                        case 3:
                            _a.trys.push([3, 5, , 6]);
                            return [4 /*yield*/, this.graphQueue.add('sync-post', {
                                    postId: postId,
                                    authorId: userId,
                                    action: 'DELETE',
                                })];
                        case 4:
                            _a.sent();
                            return [3 /*break*/, 6];
                        case 5:
                            queueError_3 = _a.sent();
                            console.error('Failed to enqueue post deletion for graph sync', queueError_3);
                            return [3 /*break*/, 6];
                        case 6: 
                        // Create history record
                        return [4 /*yield*/, this.createPostHistory(postId, post.content, post.mediaUrls, post.privacy, 'DELETED')];
                        case 7:
                            // Create history record
                            _a.sent();
                            return [2 /*return*/, { message: 'Post deleted successfully' }];
                        case 8:
                            error_3 = _a.sent();
                            console.error('Post delete error:', error_3);
                            if (error_3 instanceof generic_http_exception_1.GenericHttpException) {
                                throw error_3;
                            }
                            throw generic_http_exception_1.GenericHttpException.createLocalized(error_messages_constant_1.ERROR_MESSAGES.POST_DELETE_FAILED, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
                        case 9: return [2 /*return*/];
                    }
                });
            });
        };
        PostService_1.prototype.getPostWithRelations = function (postId, userId) {
            return __awaiter(this, void 0, void 0, function () {
                var post;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.post.findFirst({
                                where: {
                                    id: postId,
                                    isDeleted: false,
                                },
                                include: {
                                    author: {
                                        select: {
                                            id: true,
                                            name: true,
                                            image: true,
                                        },
                                    },
                                    PostMedia: true,
                                    PostAudience: true,
                                    _count: {
                                        select: {
                                            Likes: true,
                                            Comments: true,
                                        },
                                    },
                                    Likes: userId
                                        ? {
                                            where: {
                                                userId: userId,
                                            },
                                            select: {
                                                userId: true,
                                            },
                                        }
                                        : false,
                                },
                            })];
                        case 1:
                            post = _a.sent();
                            if (!post) {
                                throw generic_http_exception_1.GenericHttpException.createLocalized(error_messages_constant_1.ERROR_MESSAGES.POST_NOT_FOUND, common_1.HttpStatus.NOT_FOUND);
                            }
                            return [2 /*return*/, post];
                    }
                });
            });
        };
        PostService_1.prototype.mapPostToSimple = function (post, userId) {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
            var createdAt = (post === null || post === void 0 ? void 0 : post.createdAt) instanceof Date
                ? post.createdAt
                : new Date(post === null || post === void 0 ? void 0 : post.createdAt);
            return {
                id: post.id,
                author: (_b = (_a = post.author) === null || _a === void 0 ? void 0 : _a.name) !== null && _b !== void 0 ? _b : '',
                time: createdAt.toISOString(),
                content: post.content,
                likes: (_d = (_c = post._count) === null || _c === void 0 ? void 0 : _c.Likes) !== null && _d !== void 0 ? _d : 0,
                comments: (_f = (_e = post._count) === null || _e === void 0 ? void 0 : _e.Comments) !== null && _f !== void 0 ? _f : 0,
                image: (_l = (_h = (_g = post.mediaUrls) === null || _g === void 0 ? void 0 : _g[0]) !== null && _h !== void 0 ? _h : (_k = (_j = post.PostMedia) === null || _j === void 0 ? void 0 : _j[0]) === null || _k === void 0 ? void 0 : _k.url) !== null && _l !== void 0 ? _l : null,
                liked: userId ? post.Likes && post.Likes.length > 0 : false,
            };
        };
        // Validation methods
        PostService_1.prototype.validatePostContent = function (content) {
            if (content.length > post_constants_1.POST_CONSTANTS.VALIDATION.MAX_CONTENT_LENGTH) {
                throw generic_http_exception_1.GenericHttpException.createLocalized(error_messages_constant_1.ERROR_MESSAGES.POST_CONTENT_TOO_LONG, common_1.HttpStatus.BAD_REQUEST);
            }
        };
        PostService_1.prototype.validateMediaCount = function (files) {
            var _a, _b;
            var imageCount = ((_a = files.images) === null || _a === void 0 ? void 0 : _a.length) || 0;
            var videoCount = ((_b = files.videos) === null || _b === void 0 ? void 0 : _b.length) || 0;
            if (imageCount > post_constants_1.POST_CONSTANTS.VALIDATION.MAX_IMAGES) {
                throw generic_http_exception_1.GenericHttpException.createLocalized(error_messages_constant_1.ERROR_MESSAGES.POST_TOO_MANY_IMAGES, common_1.HttpStatus.BAD_REQUEST);
            }
            if (videoCount > post_constants_1.POST_CONSTANTS.VALIDATION.MAX_VIDEOS) {
                throw generic_http_exception_1.GenericHttpException.createLocalized(error_messages_constant_1.ERROR_MESSAGES.POST_TOO_MANY_VIDEOS, common_1.HttpStatus.BAD_REQUEST);
            }
        };
        // Helper methods
        PostService_1.prototype.checkPostOwnership = function (postId, userId) {
            return __awaiter(this, void 0, void 0, function () {
                var post;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.post.findFirst({
                                where: { id: postId },
                            })];
                        case 1:
                            post = _a.sent();
                            if (!post) {
                                throw generic_http_exception_1.GenericHttpException.createLocalized(error_messages_constant_1.ERROR_MESSAGES.POST_NOT_FOUND, common_1.HttpStatus.NOT_FOUND);
                            }
                            if (post.authorId !== userId) {
                                throw generic_http_exception_1.GenericHttpException.createLocalized(error_messages_constant_1.ERROR_MESSAGES.POST_UNAUTHORIZED, common_1.HttpStatus.FORBIDDEN);
                            }
                            return [2 /*return*/, post];
                    }
                });
            });
        };
        PostService_1.prototype.createPostHistory = function (postId, content, mediaUrls, privacy, changeType) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.postHistory.create({
                                data: {
                                    postId: postId,
                                    content: content,
                                    mediaUrls: mediaUrls,
                                    privacy: privacy,
                                    changeType: changeType,
                                },
                            })];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        PostService_1.prototype.toggleLike = function (postId, userId) {
            return __awaiter(this, void 0, void 0, function () {
                var post, existingLike;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.getPostWithRelations(postId)];
                        case 1:
                            post = _a.sent();
                            return [4 /*yield*/, this.prisma.like.findUnique({
                                    where: {
                                        postId_userId: { postId: postId, userId: userId },
                                    },
                                })];
                        case 2:
                            existingLike = _a.sent();
                            if (!existingLike) return [3 /*break*/, 4];
                            return [4 /*yield*/, this.prisma.like.delete({
                                    where: {
                                        id: existingLike.id,
                                    },
                                })];
                        case 3:
                            _a.sent();
                            return [2 /*return*/, { liked: false }];
                        case 4: return [4 /*yield*/, this.prisma.like.create({
                                data: {
                                    postId: postId,
                                    userId: userId,
                                },
                            })];
                        case 5:
                            _a.sent();
                            this.interestService.recordInterest(userId, __spreadArray(__spreadArray([], (post.hashtags || []), true), (post.categories || []), true), 2.0);
                            this.activityService.logActivity(userId, 'LIKED_POST', postId, 'POST');
                            // Notify post author
                            return [4 /*yield*/, this.notificationService.notifyPostLike(userId, post.authorId, postId)];
                        case 6:
                            // Notify post author
                            _a.sent();
                            return [4 /*yield*/, this.sentimentQueue.add('apply-reaction', {
                                    reactorUserId: userId,
                                    contentId: postId,
                                    contentType: 'POST',
                                    eventType: 'LIKED_POST',
                                }, {
                                    removeOnComplete: true,
                                    removeOnFail: true,
                                })];
                        case 7:
                            _a.sent();
                            return [2 /*return*/, { liked: true }];
                    }
                });
            });
        };
        PostService_1.prototype.toggleSave = function (postId, userId) {
            return __awaiter(this, void 0, void 0, function () {
                var existingSave, post;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.savedPost.findUnique({
                                where: {
                                    userId_postId: { userId: userId, postId: postId },
                                },
                            })];
                        case 1:
                            existingSave = _a.sent();
                            if (!existingSave) return [3 /*break*/, 3];
                            return [4 /*yield*/, this.prisma.savedPost.delete({
                                    where: { id: existingSave.id },
                                })];
                        case 2:
                            _a.sent();
                            return [2 /*return*/, { saved: false }];
                        case 3: return [4 /*yield*/, this.prisma.savedPost.create({
                                data: { userId: userId, postId: postId },
                            })];
                        case 4:
                            _a.sent();
                            return [4 /*yield*/, this.prisma.post.findUnique({
                                    where: { id: postId },
                                    select: { hashtags: true, categories: true },
                                })];
                        case 5:
                            post = _a.sent();
                            if (post) {
                                this.interestService.recordInterest(userId, __spreadArray(__spreadArray([], (post.hashtags || []), true), (post.categories || []), true), 2.0);
                            }
                            this.activityService.logActivity(userId, 'SAVED_POST', postId, 'POST');
                            return [2 /*return*/, { saved: true }];
                    }
                });
            });
        };
        PostService_1.prototype.getSavedPosts = function (userId_1) {
            return __awaiter(this, arguments, void 0, function (userId, page, limit) {
                var skip, saved, total;
                var _this = this;
                if (page === void 0) { page = 1; }
                if (limit === void 0) { limit = 20; }
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            skip = (page - 1) * limit;
                            return [4 /*yield*/, this.prisma.savedPost.findMany({
                                    where: { userId: userId },
                                    include: {
                                        post: {
                                            include: {
                                                author: { select: { id: true, name: true, image: true } },
                                                PostMedia: true,
                                                _count: { select: { Likes: true, Comments: true } },
                                            },
                                        },
                                    },
                                    orderBy: { createdAt: 'desc' },
                                    skip: skip,
                                    take: limit,
                                })];
                        case 1:
                            saved = _a.sent();
                            return [4 /*yield*/, this.prisma.savedPost.count({ where: { userId: userId } })];
                        case 2:
                            total = _a.sent();
                            return [2 /*return*/, {
                                    data: saved.map(function (s) { return _this.mapPostToSimple(s.post, userId); }),
                                    meta: { page: page, limit: limit, total: total, totalPages: Math.ceil(total / limit) },
                                }];
                    }
                });
            });
        };
        PostService_1.prototype.getPostHistory = function (postId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.prisma.postHistory.findMany({
                            where: { postId: postId },
                            orderBy: { changedAt: 'desc' },
                        })];
                });
            });
        };
        PostService_1.prototype.createComment = function (postId, userId, dto) {
            return __awaiter(this, void 0, void 0, function () {
                var post, parentComment, comment, commentWithAuthor, queueError_4;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.getPostWithRelations(postId)];
                        case 1:
                            post = _a.sent();
                            if (!dto.parentId) return [3 /*break*/, 3];
                            return [4 /*yield*/, this.prisma.comment.findUnique({
                                    where: { id: dto.parentId },
                                })];
                        case 2:
                            parentComment = _a.sent();
                            if (!parentComment) {
                                throw new generic_http_exception_1.GenericHttpException(error_messages_constant_1.ERROR_MESSAGES.COMMENT_NOT_FOUND, common_1.HttpStatus.NOT_FOUND);
                            }
                            if (parentComment.postId !== postId) {
                                throw new generic_http_exception_1.GenericHttpException('Parent comment does not belong to this post', common_1.HttpStatus.BAD_REQUEST);
                            }
                            _a.label = 3;
                        case 3: return [4 /*yield*/, this.prisma.comment.create({
                                data: {
                                    content: dto.content,
                                    postId: postId,
                                    authorId: userId,
                                    parentId: dto.parentId,
                                },
                            })];
                        case 4:
                            comment = _a.sent();
                            this.interestService.recordInterest(userId, __spreadArray(__spreadArray([], (post.hashtags || []), true), (post.categories || []), true), 1.5);
                            this.activityService.logActivity(userId, 'COMMENTED_ON_POST', postId, 'POST');
                            return [4 /*yield*/, this.prisma.comment.update({
                                    where: { id: comment.id },
                                    data: {},
                                    include: {
                                        author: {
                                            select: {
                                                id: true,
                                                name: true,
                                                image: true,
                                            },
                                        },
                                    },
                                })];
                        case 5:
                            commentWithAuthor = _a.sent();
                            _a.label = 6;
                        case 6:
                            _a.trys.push([6, 8, , 9]);
                            return [4 /*yield*/, this.graphQueue.add('sync-comment', {
                                    userId: userId,
                                    postId: postId,
                                    commentId: comment.id,
                                    timestamp: comment.createdAt,
                                })];
                        case 7:
                            _a.sent();
                            return [3 /*break*/, 9];
                        case 8:
                            queueError_4 = _a.sent();
                            console.error('Failed to enqueue comment creation for graph sync', queueError_4);
                            return [3 /*break*/, 9];
                        case 9: 
                        // Notify post author
                        return [4 /*yield*/, this.notificationService.notifyPostComment(userId, post.authorId, postId, comment.content)];
                        case 10:
                            // Notify post author
                            _a.sent();
                            return [4 /*yield*/, this.sentimentQueue.add('analyze-comment', {
                                    commenterId: userId,
                                    parentContentId: postId,
                                    parentContentType: 'POST',
                                    commentText: dto.content,
                                    commentId: comment.id,
                                }, {
                                    jobId: "sentiment:COMMENT:".concat(comment.id),
                                    removeOnComplete: true,
                                    removeOnFail: true,
                                })];
                        case 11:
                            _a.sent();
                            return [2 /*return*/, comment];
                    }
                });
            });
        };
        PostService_1.prototype.deleteComment = function (commentId, userId) {
            return __awaiter(this, void 0, void 0, function () {
                var comment, queueError_5;
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
                            if (comment.authorId !== userId) {
                                throw new generic_http_exception_1.GenericHttpException(error_messages_constant_1.ERROR_MESSAGES.COMMENT_UNAUTHORIZED, common_1.HttpStatus.FORBIDDEN);
                            }
                            return [4 /*yield*/, this.prisma.comment.delete({
                                    where: { id: commentId },
                                })];
                        case 2:
                            _a.sent();
                            _a.label = 3;
                        case 3:
                            _a.trys.push([3, 5, , 6]);
                            return [4 /*yield*/, this.graphQueue.add('sync-comment', {
                                    userId: userId,
                                    postId: comment.postId,
                                    commentId: comment.id,
                                    timestamp: new Date(),
                                    action: 'DELETE',
                                })];
                        case 4:
                            _a.sent();
                            return [3 /*break*/, 6];
                        case 5:
                            queueError_5 = _a.sent();
                            console.error('Failed to enqueue comment deletion for graph sync', queueError_5);
                            return [3 /*break*/, 6];
                        case 6: return [2 /*return*/, { success: true }];
                    }
                });
            });
        };
        PostService_1.prototype.getComments = function (postId_1) {
            return __awaiter(this, arguments, void 0, function (postId, page, limit) {
                var skip, _a, comments, total;
                if (page === void 0) { page = 1; }
                if (limit === void 0) { limit = 20; }
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            skip = (page - 1) * limit;
                            return [4 /*yield*/, Promise.all([
                                    this.prisma.comment.findMany({
                                        where: {
                                            postId: postId,
                                            parentId: null, // Fetch top-level comments
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
                                            replies: {
                                                include: {
                                                    author: {
                                                        select: {
                                                            id: true,
                                                            name: true,
                                                            image: true,
                                                        },
                                                    },
                                                },
                                                orderBy: { createdAt: 'asc' },
                                                take: 3, // Preview 3 replies
                                            },
                                        },
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
                            return [2 /*return*/, {
                                    data: comments,
                                    meta: {
                                        page: page,
                                        limit: limit,
                                        total: total,
                                        totalPages: Math.ceil(total / limit),
                                    },
                                }];
                    }
                });
            });
        };
        PostService_1.prototype.getPostLikes = function (postId_1) {
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
                                    data: likes.map(function (like) { return like.user; }),
                                    meta: {
                                        page: page,
                                        limit: limit,
                                        total: total,
                                        totalPages: Math.ceil(total / limit),
                                    },
                                }];
                    }
                });
            });
        };
        PostService_1.prototype.getPostsCount = function (profileId) {
            return __awaiter(this, void 0, void 0, function () {
                var postsCount;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.post.count({
                                where: {
                                    authorId: profileId,
                                    isDeleted: false,
                                },
                            })];
                        case 1:
                            postsCount = _a.sent();
                            return [2 /*return*/, { postsCount: postsCount }];
                    }
                });
            });
        };
        return PostService_1;
    }());
    __setFunctionName(_classThis, "PostService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        PostService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return PostService = _classThis;
}();
exports.PostService = PostService;
