"use strict";
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
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
exports.PostController = void 0;
var common_1 = require("@nestjs/common");
var upload_post_files_decorator_1 = require("../../common/decorators/upload-post-files.decorator");
var jwt_guard_1 = require("../../common/guards/strategy.guards/jwt.guard");
var PostController = function () {
    var _classDecorators = [(0, common_1.UseGuards)(jwt_guard_1.JwtAuthenticationGuard), (0, common_1.Controller)('posts')];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _instanceExtraInitializers = [];
    var _getAllPosts_decorators;
    var _getPostsCount_decorators;
    var _getSavedPosts_decorators;
    var _getPostsByHashtag_decorators;
    var _getPostById_decorators;
    var _createPost_decorators;
    var _updatePost_decorators;
    var _toggleLike_decorators;
    var _toggleSave_decorators;
    var _getPostHistory_decorators;
    var _createComment_decorators;
    var _deleteComment_decorators;
    var _getComments_decorators;
    var _getPostLikes_decorators;
    var _deletePost_decorators;
    var PostController = _classThis = /** @class */ (function () {
        function PostController_1(postService) {
            this.postService = (__runInitializers(this, _instanceExtraInitializers), postService);
        }
        PostController_1.prototype.getAllPosts = function () {
            return __awaiter(this, arguments, void 0, function (page, limit, userId) {
                if (page === void 0) { page = 1; }
                if (limit === void 0) { limit = 20; }
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.postService.getAllPosts(userId, page, limit)];
                });
            });
        };
        PostController_1.prototype.getPostsCount = function (userId, profileId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.postService.getPostsCount(profileId || userId)];
                });
            });
        };
        PostController_1.prototype.getSavedPosts = function (userId_1) {
            return __awaiter(this, arguments, void 0, function (userId, page, limit) {
                if (page === void 0) { page = 1; }
                if (limit === void 0) { limit = 20; }
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.postService.getSavedPosts(userId, page, limit)];
                });
            });
        };
        PostController_1.prototype.getPostsByHashtag = function (tag_1) {
            return __awaiter(this, arguments, void 0, function (tag, page, limit, userId) {
                if (page === void 0) { page = 1; }
                if (limit === void 0) { limit = 20; }
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.postService.getPostsByHashtag(tag, userId, page, limit)];
                });
            });
        };
        PostController_1.prototype.getPostById = function (postId, userId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.postService.getPostById(postId, userId)];
                });
            });
        };
        PostController_1.prototype.createPost = function (files, createPostDto, userId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    // Override authorId with authenticated user's ID
                    createPostDto.authorId = userId;
                    return [2 /*return*/, this.postService.createPost(createPostDto, files)];
                });
            });
        };
        PostController_1.prototype.updatePost = function (postId, updatePostDto, userId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.postService.updatePost(postId, userId, updatePostDto)];
                });
            });
        };
        PostController_1.prototype.toggleLike = function (postId, userId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.postService.toggleLike(postId, userId)];
                });
            });
        };
        PostController_1.prototype.toggleSave = function (postId, userId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.postService.toggleSave(postId, userId)];
                });
            });
        };
        PostController_1.prototype.getPostHistory = function (postId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.postService.getPostHistory(postId)];
                });
            });
        };
        PostController_1.prototype.createComment = function (postId, userId, createCommentDto) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.postService.createComment(postId, userId, createCommentDto)];
                });
            });
        };
        PostController_1.prototype.deleteComment = function (commentId, userId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.postService.deleteComment(commentId, userId)];
                });
            });
        };
        PostController_1.prototype.getComments = function (postId_1) {
            return __awaiter(this, arguments, void 0, function (postId, page, limit) {
                if (page === void 0) { page = 1; }
                if (limit === void 0) { limit = 20; }
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.postService.getComments(postId, page, limit)];
                });
            });
        };
        PostController_1.prototype.getPostLikes = function (postId_1) {
            return __awaiter(this, arguments, void 0, function (postId, page, limit) {
                if (page === void 0) { page = 1; }
                if (limit === void 0) { limit = 20; }
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.postService.getPostLikes(postId, page, limit)];
                });
            });
        };
        PostController_1.prototype.deletePost = function (postId, userId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.postService.deletePost(postId, userId)];
                });
            });
        };
        return PostController_1;
    }());
    __setFunctionName(_classThis, "PostController");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _getAllPosts_decorators = [(0, common_1.Get)('/')];
        _getPostsCount_decorators = [(0, common_1.Get)('/count')];
        _getSavedPosts_decorators = [(0, common_1.Get)('/saved')];
        _getPostsByHashtag_decorators = [(0, common_1.Get)('/hashtag/:tag')];
        _getPostById_decorators = [(0, common_1.Get)('/:id')];
        _createPost_decorators = [(0, common_1.Post)('/create'), (0, upload_post_files_decorator_1.UploadPostFiles)([
                { name: 'images', maxCount: 5 },
                { name: 'videos', maxCount: 2 },
            ])];
        _updatePost_decorators = [(0, common_1.Put)('/:id')];
        _toggleLike_decorators = [(0, common_1.Post)('/:id/like')];
        _toggleSave_decorators = [(0, common_1.Post)('/:id/save')];
        _getPostHistory_decorators = [(0, common_1.Get)('/:id/history')];
        _createComment_decorators = [(0, common_1.Post)('/:id/comments')];
        _deleteComment_decorators = [(0, common_1.Delete)('/comments/:id')];
        _getComments_decorators = [(0, common_1.Get)('/:id/comments')];
        _getPostLikes_decorators = [(0, common_1.Get)('/:id/likes')];
        _deletePost_decorators = [(0, common_1.Delete)('/:id')];
        __esDecorate(_classThis, null, _getAllPosts_decorators, { kind: "method", name: "getAllPosts", static: false, private: false, access: { has: function (obj) { return "getAllPosts" in obj; }, get: function (obj) { return obj.getAllPosts; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getPostsCount_decorators, { kind: "method", name: "getPostsCount", static: false, private: false, access: { has: function (obj) { return "getPostsCount" in obj; }, get: function (obj) { return obj.getPostsCount; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getSavedPosts_decorators, { kind: "method", name: "getSavedPosts", static: false, private: false, access: { has: function (obj) { return "getSavedPosts" in obj; }, get: function (obj) { return obj.getSavedPosts; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getPostsByHashtag_decorators, { kind: "method", name: "getPostsByHashtag", static: false, private: false, access: { has: function (obj) { return "getPostsByHashtag" in obj; }, get: function (obj) { return obj.getPostsByHashtag; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getPostById_decorators, { kind: "method", name: "getPostById", static: false, private: false, access: { has: function (obj) { return "getPostById" in obj; }, get: function (obj) { return obj.getPostById; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _createPost_decorators, { kind: "method", name: "createPost", static: false, private: false, access: { has: function (obj) { return "createPost" in obj; }, get: function (obj) { return obj.createPost; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _updatePost_decorators, { kind: "method", name: "updatePost", static: false, private: false, access: { has: function (obj) { return "updatePost" in obj; }, get: function (obj) { return obj.updatePost; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _toggleLike_decorators, { kind: "method", name: "toggleLike", static: false, private: false, access: { has: function (obj) { return "toggleLike" in obj; }, get: function (obj) { return obj.toggleLike; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _toggleSave_decorators, { kind: "method", name: "toggleSave", static: false, private: false, access: { has: function (obj) { return "toggleSave" in obj; }, get: function (obj) { return obj.toggleSave; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getPostHistory_decorators, { kind: "method", name: "getPostHistory", static: false, private: false, access: { has: function (obj) { return "getPostHistory" in obj; }, get: function (obj) { return obj.getPostHistory; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _createComment_decorators, { kind: "method", name: "createComment", static: false, private: false, access: { has: function (obj) { return "createComment" in obj; }, get: function (obj) { return obj.createComment; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _deleteComment_decorators, { kind: "method", name: "deleteComment", static: false, private: false, access: { has: function (obj) { return "deleteComment" in obj; }, get: function (obj) { return obj.deleteComment; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getComments_decorators, { kind: "method", name: "getComments", static: false, private: false, access: { has: function (obj) { return "getComments" in obj; }, get: function (obj) { return obj.getComments; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getPostLikes_decorators, { kind: "method", name: "getPostLikes", static: false, private: false, access: { has: function (obj) { return "getPostLikes" in obj; }, get: function (obj) { return obj.getPostLikes; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _deletePost_decorators, { kind: "method", name: "deletePost", static: false, private: false, access: { has: function (obj) { return "deletePost" in obj; }, get: function (obj) { return obj.deletePost; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        PostController = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return PostController = _classThis;
}();
exports.PostController = PostController;
