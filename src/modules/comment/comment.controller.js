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
exports.CommentController = void 0;
var common_1 = require("@nestjs/common");
var jwt_guard_1 = require("../../common/guards/strategy.guards/jwt.guard");
var CommentController = function () {
    var _classDecorators = [(0, common_1.UseGuards)(jwt_guard_1.JwtAuthenticationGuard), (0, common_1.Controller)('comments')];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _instanceExtraInitializers = [];
    var _createComment_decorators;
    var _getPostComments_decorators;
    var _getCommentReplies_decorators;
    var _updateComment_decorators;
    var _deleteComment_decorators;
    var CommentController = _classThis = /** @class */ (function () {
        function CommentController_1(commentService) {
            this.commentService = (__runInitializers(this, _instanceExtraInitializers), commentService);
        }
        CommentController_1.prototype.createComment = function (postId, dto, userId) {
            return this.commentService.createComment(postId, userId, dto);
        };
        CommentController_1.prototype.getPostComments = function (postId, page, limit, sort, userId) {
            if (page === void 0) { page = 1; }
            if (limit === void 0) { limit = 20; }
            if (sort === void 0) { sort = 'top'; }
            console.log(userId);
            return this.commentService.getPostComments(postId, userId, page, limit, sort);
        };
        CommentController_1.prototype.getCommentReplies = function (commentId, page, limit, userId) {
            if (page === void 0) { page = 1; }
            if (limit === void 0) { limit = 10; }
            return this.commentService.getCommentReplies(commentId, userId, page, limit);
        };
        CommentController_1.prototype.updateComment = function (commentId, dto, userId) {
            return this.commentService.updateComment(commentId, userId, dto);
        };
        CommentController_1.prototype.deleteComment = function (commentId, userId) {
            return this.commentService.deleteComment(commentId, userId);
        };
        return CommentController_1;
    }());
    __setFunctionName(_classThis, "CommentController");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _createComment_decorators = [(0, common_1.Post)('posts/:postId')];
        _getPostComments_decorators = [(0, common_1.Get)('posts/:postId')];
        _getCommentReplies_decorators = [(0, common_1.Get)(':commentId/replies')];
        _updateComment_decorators = [(0, common_1.Patch)(':commentId')];
        _deleteComment_decorators = [(0, common_1.Delete)(':commentId')];
        __esDecorate(_classThis, null, _createComment_decorators, { kind: "method", name: "createComment", static: false, private: false, access: { has: function (obj) { return "createComment" in obj; }, get: function (obj) { return obj.createComment; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getPostComments_decorators, { kind: "method", name: "getPostComments", static: false, private: false, access: { has: function (obj) { return "getPostComments" in obj; }, get: function (obj) { return obj.getPostComments; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getCommentReplies_decorators, { kind: "method", name: "getCommentReplies", static: false, private: false, access: { has: function (obj) { return "getCommentReplies" in obj; }, get: function (obj) { return obj.getCommentReplies; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _updateComment_decorators, { kind: "method", name: "updateComment", static: false, private: false, access: { has: function (obj) { return "updateComment" in obj; }, get: function (obj) { return obj.updateComment; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _deleteComment_decorators, { kind: "method", name: "deleteComment", static: false, private: false, access: { has: function (obj) { return "deleteComment" in obj; }, get: function (obj) { return obj.deleteComment; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        CommentController = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return CommentController = _classThis;
}();
exports.CommentController = CommentController;
