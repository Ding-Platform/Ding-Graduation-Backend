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
exports.ReelsController = void 0;
var common_1 = require("@nestjs/common");
var jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
var ReelsController = function () {
    var _classDecorators = [(0, common_1.Controller)('reels')];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _instanceExtraInitializers = [];
    var _createUploadUrl_decorators;
    var _finalizeReel_decorators;
    var _getStatus_decorators;
    var _getFeed_decorators;
    var _getTrending_decorators;
    var _getByHashtag_decorators;
    var _getSaved_decorators;
    var _getMyReels_decorators;
    var _getUserReels_decorators;
    var _getReel_decorators;
    var _updateReel_decorators;
    var _deleteReel_decorators;
    var _recordView_decorators;
    var _toggleLike_decorators;
    var _toggleBookmark_decorators;
    var _listComments_decorators;
    var _listReplies_decorators;
    var _addComment_decorators;
    var _editComment_decorators;
    var _deleteComment_decorators;
    var _toggleCommentLike_decorators;
    var _shareReel_decorators;
    var _getAnalytics_decorators;
    var ReelsController = _classThis = /** @class */ (function () {
        function ReelsController_1(reelsService) {
            this.reelsService = (__runInitializers(this, _instanceExtraInitializers), reelsService);
        }
        // ─────────────────────────────────────────────
        // Upload & Lifecycle
        // ─────────────────────────────────────────────
        ReelsController_1.prototype.createUploadUrl = function (user) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.reelsService.createUploadUrl(user.id)];
                });
            });
        };
        ReelsController_1.prototype.finalizeReel = function (user, id, body) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.reelsService.finalizeReel(user.id, id, body)];
                });
            });
        };
        ReelsController_1.prototype.getStatus = function (id) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.reelsService.getReelStatus(id)];
                });
            });
        };
        // ─────────────────────────────────────────────
        // Discovery & Feed  (static routes BEFORE :id)
        // ─────────────────────────────────────────────
        ReelsController_1.prototype.getFeed = function (user, pagination) {
            return __awaiter(this, void 0, void 0, function () {
                var _a;
                return __generator(this, function (_b) {
                    return [2 /*return*/, this.reelsService.getFeed(user.id, pagination.cursor, (_a = pagination.limit) !== null && _a !== void 0 ? _a : 10)];
                });
            });
        };
        ReelsController_1.prototype.getTrending = function (pagination) {
            return __awaiter(this, void 0, void 0, function () {
                var _a;
                return __generator(this, function (_b) {
                    return [2 /*return*/, this.reelsService.getTrendingReels(pagination.cursor, (_a = pagination.limit) !== null && _a !== void 0 ? _a : 10)];
                });
            });
        };
        ReelsController_1.prototype.getByHashtag = function (tag, pagination) {
            return __awaiter(this, void 0, void 0, function () {
                var _a;
                return __generator(this, function (_b) {
                    return [2 /*return*/, this.reelsService.getReelsByHashtag(tag, pagination.cursor, (_a = pagination.limit) !== null && _a !== void 0 ? _a : 10)];
                });
            });
        };
        ReelsController_1.prototype.getSaved = function (user, pagination) {
            return __awaiter(this, void 0, void 0, function () {
                var _a;
                return __generator(this, function (_b) {
                    return [2 /*return*/, this.reelsService.getSavedReels(user.id, pagination.cursor, (_a = pagination.limit) !== null && _a !== void 0 ? _a : 10)];
                });
            });
        };
        ReelsController_1.prototype.getMyReels = function (user, pagination) {
            return __awaiter(this, void 0, void 0, function () {
                var _a;
                return __generator(this, function (_b) {
                    return [2 /*return*/, this.reelsService.getMyReels(user.id, pagination.cursor, (_a = pagination.limit) !== null && _a !== void 0 ? _a : 10)];
                });
            });
        };
        ReelsController_1.prototype.getUserReels = function (user, userId, pagination) {
            return __awaiter(this, void 0, void 0, function () {
                var _a;
                return __generator(this, function (_b) {
                    return [2 /*return*/, this.reelsService.getUserReels(userId, user.id, pagination.cursor, (_a = pagination.limit) !== null && _a !== void 0 ? _a : 10)];
                });
            });
        };
        // ─────────────────────────────────────────────
        // Single Reel CRUD  (dynamic :id routes)
        // ─────────────────────────────────────────────
        ReelsController_1.prototype.getReel = function (user, id) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.reelsService.getReelById(id, user.id)];
                });
            });
        };
        ReelsController_1.prototype.updateReel = function (user, id, body) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.reelsService.updateReel(user.id, id, body)];
                });
            });
        };
        ReelsController_1.prototype.deleteReel = function (user, id) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.reelsService.deleteReel(user.id, id)];
                });
            });
        };
        // ─────────────────────────────────────────────
        // Engagement: Views, Likes, Bookmarks
        // ─────────────────────────────────────────────
        ReelsController_1.prototype.recordView = function (id, body) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.reelsService.recordView(id, body)];
                });
            });
        };
        ReelsController_1.prototype.toggleLike = function (user, id) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.reelsService.toggleLike(user.id, id)];
                });
            });
        };
        ReelsController_1.prototype.toggleBookmark = function (user, id) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.reelsService.toggleBookmark(user.id, id)];
                });
            });
        };
        // ─────────────────────────────────────────────
        // Comments & Replies
        // ─────────────────────────────────────────────
        ReelsController_1.prototype.listComments = function (user, id, pagination) {
            return __awaiter(this, void 0, void 0, function () {
                var _a;
                return __generator(this, function (_b) {
                    return [2 /*return*/, this.reelsService.listComments(id, pagination.cursor, (_a = pagination.limit) !== null && _a !== void 0 ? _a : 20, undefined, user.id)];
                });
            });
        };
        ReelsController_1.prototype.listReplies = function (user, id, commentId, pagination) {
            return __awaiter(this, void 0, void 0, function () {
                var _a;
                return __generator(this, function (_b) {
                    return [2 /*return*/, this.reelsService.listComments(id, pagination.cursor, (_a = pagination.limit) !== null && _a !== void 0 ? _a : 20, commentId, user.id)];
                });
            });
        };
        ReelsController_1.prototype.addComment = function (user, id, body) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.reelsService.addComment(user.id, id, body)];
                });
            });
        };
        ReelsController_1.prototype.editComment = function (user, id, cid, body) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.reelsService.editComment(user.id, id, cid, body.content)];
                });
            });
        };
        ReelsController_1.prototype.deleteComment = function (user, id, cid) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.reelsService.deleteComment(user.id, id, cid)];
                });
            });
        };
        ReelsController_1.prototype.toggleCommentLike = function (user, id, cid) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.reelsService.toggleCommentLike(user.id, id, cid)];
                });
            });
        };
        // ─────────────────────────────────────────────
        // Sharing & Analytics
        // ─────────────────────────────────────────────
        ReelsController_1.prototype.shareReel = function (user, id, body) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.reelsService.shareReel(user.id, id, body)];
                });
            });
        };
        ReelsController_1.prototype.getAnalytics = function (user, id) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.reelsService.getReelAnalytics(user.id, id)];
                });
            });
        };
        return ReelsController_1;
    }());
    __setFunctionName(_classThis, "ReelsController");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _createUploadUrl_decorators = [(0, common_1.Post)('upload-url'), (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard)];
        _finalizeReel_decorators = [(0, common_1.Post)(':id/finalize'), (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard)];
        _getStatus_decorators = [(0, common_1.Get)(':id/status'), (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard)];
        _getFeed_decorators = [(0, common_1.Get)('feed'), (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard)];
        _getTrending_decorators = [(0, common_1.Get)('trending')];
        _getByHashtag_decorators = [(0, common_1.Get)('hashtag/:tag')];
        _getSaved_decorators = [(0, common_1.Get)('saved'), (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard)];
        _getMyReels_decorators = [(0, common_1.Get)('my'), (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard)];
        _getUserReels_decorators = [(0, common_1.Get)('user/:userId'), (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard)];
        _getReel_decorators = [(0, common_1.Get)(':id'), (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard)];
        _updateReel_decorators = [(0, common_1.Patch)(':id'), (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard)];
        _deleteReel_decorators = [(0, common_1.Delete)(':id'), (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard)];
        _recordView_decorators = [(0, common_1.Post)(':id/view')];
        _toggleLike_decorators = [(0, common_1.Post)(':id/like'), (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard)];
        _toggleBookmark_decorators = [(0, common_1.Post)(':id/bookmark'), (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard)];
        _listComments_decorators = [(0, common_1.Get)(':id/comments'), (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard)];
        _listReplies_decorators = [(0, common_1.Get)(':id/comments/:cid/replies'), (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard)];
        _addComment_decorators = [(0, common_1.Post)(':id/comments'), (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard)];
        _editComment_decorators = [(0, common_1.Patch)(':id/comments/:cid'), (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard)];
        _deleteComment_decorators = [(0, common_1.Delete)(':id/comments/:cid'), (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard)];
        _toggleCommentLike_decorators = [(0, common_1.Post)(':id/comments/:cid/like'), (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard)];
        _shareReel_decorators = [(0, common_1.Post)(':id/share'), (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard)];
        _getAnalytics_decorators = [(0, common_1.Get)(':id/analytics'), (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard)];
        __esDecorate(_classThis, null, _createUploadUrl_decorators, { kind: "method", name: "createUploadUrl", static: false, private: false, access: { has: function (obj) { return "createUploadUrl" in obj; }, get: function (obj) { return obj.createUploadUrl; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _finalizeReel_decorators, { kind: "method", name: "finalizeReel", static: false, private: false, access: { has: function (obj) { return "finalizeReel" in obj; }, get: function (obj) { return obj.finalizeReel; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getStatus_decorators, { kind: "method", name: "getStatus", static: false, private: false, access: { has: function (obj) { return "getStatus" in obj; }, get: function (obj) { return obj.getStatus; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getFeed_decorators, { kind: "method", name: "getFeed", static: false, private: false, access: { has: function (obj) { return "getFeed" in obj; }, get: function (obj) { return obj.getFeed; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getTrending_decorators, { kind: "method", name: "getTrending", static: false, private: false, access: { has: function (obj) { return "getTrending" in obj; }, get: function (obj) { return obj.getTrending; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getByHashtag_decorators, { kind: "method", name: "getByHashtag", static: false, private: false, access: { has: function (obj) { return "getByHashtag" in obj; }, get: function (obj) { return obj.getByHashtag; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getSaved_decorators, { kind: "method", name: "getSaved", static: false, private: false, access: { has: function (obj) { return "getSaved" in obj; }, get: function (obj) { return obj.getSaved; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getMyReels_decorators, { kind: "method", name: "getMyReels", static: false, private: false, access: { has: function (obj) { return "getMyReels" in obj; }, get: function (obj) { return obj.getMyReels; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getUserReels_decorators, { kind: "method", name: "getUserReels", static: false, private: false, access: { has: function (obj) { return "getUserReels" in obj; }, get: function (obj) { return obj.getUserReels; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getReel_decorators, { kind: "method", name: "getReel", static: false, private: false, access: { has: function (obj) { return "getReel" in obj; }, get: function (obj) { return obj.getReel; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _updateReel_decorators, { kind: "method", name: "updateReel", static: false, private: false, access: { has: function (obj) { return "updateReel" in obj; }, get: function (obj) { return obj.updateReel; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _deleteReel_decorators, { kind: "method", name: "deleteReel", static: false, private: false, access: { has: function (obj) { return "deleteReel" in obj; }, get: function (obj) { return obj.deleteReel; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _recordView_decorators, { kind: "method", name: "recordView", static: false, private: false, access: { has: function (obj) { return "recordView" in obj; }, get: function (obj) { return obj.recordView; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _toggleLike_decorators, { kind: "method", name: "toggleLike", static: false, private: false, access: { has: function (obj) { return "toggleLike" in obj; }, get: function (obj) { return obj.toggleLike; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _toggleBookmark_decorators, { kind: "method", name: "toggleBookmark", static: false, private: false, access: { has: function (obj) { return "toggleBookmark" in obj; }, get: function (obj) { return obj.toggleBookmark; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _listComments_decorators, { kind: "method", name: "listComments", static: false, private: false, access: { has: function (obj) { return "listComments" in obj; }, get: function (obj) { return obj.listComments; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _listReplies_decorators, { kind: "method", name: "listReplies", static: false, private: false, access: { has: function (obj) { return "listReplies" in obj; }, get: function (obj) { return obj.listReplies; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _addComment_decorators, { kind: "method", name: "addComment", static: false, private: false, access: { has: function (obj) { return "addComment" in obj; }, get: function (obj) { return obj.addComment; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _editComment_decorators, { kind: "method", name: "editComment", static: false, private: false, access: { has: function (obj) { return "editComment" in obj; }, get: function (obj) { return obj.editComment; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _deleteComment_decorators, { kind: "method", name: "deleteComment", static: false, private: false, access: { has: function (obj) { return "deleteComment" in obj; }, get: function (obj) { return obj.deleteComment; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _toggleCommentLike_decorators, { kind: "method", name: "toggleCommentLike", static: false, private: false, access: { has: function (obj) { return "toggleCommentLike" in obj; }, get: function (obj) { return obj.toggleCommentLike; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _shareReel_decorators, { kind: "method", name: "shareReel", static: false, private: false, access: { has: function (obj) { return "shareReel" in obj; }, get: function (obj) { return obj.shareReel; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getAnalytics_decorators, { kind: "method", name: "getAnalytics", static: false, private: false, access: { has: function (obj) { return "getAnalytics" in obj; }, get: function (obj) { return obj.getAnalytics; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ReelsController = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ReelsController = _classThis;
}();
exports.ReelsController = ReelsController;
