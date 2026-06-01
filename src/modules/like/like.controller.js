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
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LikeController = void 0;
var common_1 = require("@nestjs/common");
var jwt_guard_1 = require("../../common/guards/strategy.guards/jwt.guard");
var LikeController = function () {
    var _classDecorators = [(0, common_1.Controller)('likes')];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _instanceExtraInitializers = [];
    var _likePost_decorators;
    var _unlikePost_decorators;
    var _likeComment_decorators;
    var _unlikeComment_decorators;
    var _getPostLikes_decorators;
    var LikeController = _classThis = /** @class */ (function () {
        function LikeController_1(likeService) {
            this.likeService = (__runInitializers(this, _instanceExtraInitializers), likeService);
        }
        LikeController_1.prototype.likePost = function (postId, userId) {
            return this.likeService.likePost(userId, postId);
        };
        LikeController_1.prototype.unlikePost = function (postId, userId) {
            return this.likeService.unlikePost(userId, postId);
        };
        LikeController_1.prototype.likeComment = function (commentId, userId) {
            return this.likeService.likeComment(userId, commentId);
        };
        LikeController_1.prototype.unlikeComment = function (commentId, userId) {
            return this.likeService.unlikeComment(userId, commentId);
        };
        LikeController_1.prototype.getPostLikes = function (postId, page, limit) {
            if (page === void 0) { page = 1; }
            if (limit === void 0) { limit = 20; }
            return this.likeService.getPostLikes(postId, +page, +limit);
        };
        return LikeController_1;
    }());
    __setFunctionName(_classThis, "LikeController");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _likePost_decorators = [(0, common_1.Post)('posts/:postId'), (0, common_1.UseGuards)(jwt_guard_1.JwtAuthenticationGuard)];
        _unlikePost_decorators = [(0, common_1.Delete)('posts/:postId'), (0, common_1.UseGuards)(jwt_guard_1.JwtAuthenticationGuard)];
        _likeComment_decorators = [(0, common_1.Post)('comments/:commentId'), (0, common_1.UseGuards)(jwt_guard_1.JwtAuthenticationGuard)];
        _unlikeComment_decorators = [(0, common_1.Delete)('comments/:commentId'), (0, common_1.UseGuards)(jwt_guard_1.JwtAuthenticationGuard)];
        _getPostLikes_decorators = [(0, common_1.Get)('posts/:postId')];
        __esDecorate(_classThis, null, _likePost_decorators, { kind: "method", name: "likePost", static: false, private: false, access: { has: function (obj) { return "likePost" in obj; }, get: function (obj) { return obj.likePost; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _unlikePost_decorators, { kind: "method", name: "unlikePost", static: false, private: false, access: { has: function (obj) { return "unlikePost" in obj; }, get: function (obj) { return obj.unlikePost; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _likeComment_decorators, { kind: "method", name: "likeComment", static: false, private: false, access: { has: function (obj) { return "likeComment" in obj; }, get: function (obj) { return obj.likeComment; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _unlikeComment_decorators, { kind: "method", name: "unlikeComment", static: false, private: false, access: { has: function (obj) { return "unlikeComment" in obj; }, get: function (obj) { return obj.unlikeComment; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getPostLikes_decorators, { kind: "method", name: "getPostLikes", static: false, private: false, access: { has: function (obj) { return "getPostLikes" in obj; }, get: function (obj) { return obj.getPostLikes; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        LikeController = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return LikeController = _classThis;
}();
exports.LikeController = LikeController;
