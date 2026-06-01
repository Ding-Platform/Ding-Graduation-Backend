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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentResponseDto = exports.CommentAuthorDto = void 0;
var class_transformer_1 = require("class-transformer");
var CommentAuthorDto = function () {
    var _a;
    var _id_decorators;
    var _id_initializers = [];
    var _id_extraInitializers = [];
    var _name_decorators;
    var _name_initializers = [];
    var _name_extraInitializers = [];
    var _image_decorators;
    var _image_initializers = [];
    var _image_extraInitializers = [];
    return _a = /** @class */ (function () {
            function CommentAuthorDto() {
                this.id = __runInitializers(this, _id_initializers, void 0);
                this.name = (__runInitializers(this, _id_extraInitializers), __runInitializers(this, _name_initializers, void 0));
                this.image = (__runInitializers(this, _name_extraInitializers), __runInitializers(this, _image_initializers, void 0));
                __runInitializers(this, _image_extraInitializers);
            }
            return CommentAuthorDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _id_decorators = [(0, class_transformer_1.Expose)()];
            _name_decorators = [(0, class_transformer_1.Expose)()];
            _image_decorators = [(0, class_transformer_1.Expose)()];
            __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: function (obj) { return "id" in obj; }, get: function (obj) { return obj.id; }, set: function (obj, value) { obj.id = value; } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
            __esDecorate(null, null, _name_decorators, { kind: "field", name: "name", static: false, private: false, access: { has: function (obj) { return "name" in obj; }, get: function (obj) { return obj.name; }, set: function (obj, value) { obj.name = value; } }, metadata: _metadata }, _name_initializers, _name_extraInitializers);
            __esDecorate(null, null, _image_decorators, { kind: "field", name: "image", static: false, private: false, access: { has: function (obj) { return "image" in obj; }, get: function (obj) { return obj.image; }, set: function (obj, value) { obj.image = value; } }, metadata: _metadata }, _image_initializers, _image_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.CommentAuthorDto = CommentAuthorDto;
var CommentResponseDto = function () {
    var _a;
    var _id_decorators;
    var _id_initializers = [];
    var _id_extraInitializers = [];
    var _content_decorators;
    var _content_initializers = [];
    var _content_extraInitializers = [];
    var _postId_decorators;
    var _postId_initializers = [];
    var _postId_extraInitializers = [];
    var _parentCommentId_decorators;
    var _parentCommentId_initializers = [];
    var _parentCommentId_extraInitializers = [];
    var _replyCount_decorators;
    var _replyCount_initializers = [];
    var _replyCount_extraInitializers = [];
    var _likeCount_decorators;
    var _likeCount_initializers = [];
    var _likeCount_extraInitializers = [];
    var _createdAt_decorators;
    var _createdAt_initializers = [];
    var _createdAt_extraInitializers = [];
    var _updatedAt_decorators;
    var _updatedAt_initializers = [];
    var _updatedAt_extraInitializers = [];
    var _author_decorators;
    var _author_initializers = [];
    var _author_extraInitializers = [];
    var _liked_decorators;
    var _liked_initializers = [];
    var _liked_extraInitializers = [];
    return _a = /** @class */ (function () {
            function CommentResponseDto() {
                this.id = __runInitializers(this, _id_initializers, void 0);
                this.content = (__runInitializers(this, _id_extraInitializers), __runInitializers(this, _content_initializers, void 0));
                this.postId = (__runInitializers(this, _content_extraInitializers), __runInitializers(this, _postId_initializers, void 0));
                this.parentCommentId = (__runInitializers(this, _postId_extraInitializers), __runInitializers(this, _parentCommentId_initializers, void 0));
                this.replyCount = (__runInitializers(this, _parentCommentId_extraInitializers), __runInitializers(this, _replyCount_initializers, void 0));
                this.likeCount = (__runInitializers(this, _replyCount_extraInitializers), __runInitializers(this, _likeCount_initializers, void 0));
                this.createdAt = (__runInitializers(this, _likeCount_extraInitializers), __runInitializers(this, _createdAt_initializers, void 0));
                this.updatedAt = (__runInitializers(this, _createdAt_extraInitializers), __runInitializers(this, _updatedAt_initializers, void 0));
                this.author = (__runInitializers(this, _updatedAt_extraInitializers), __runInitializers(this, _author_initializers, void 0));
                this.liked = (__runInitializers(this, _author_extraInitializers), __runInitializers(this, _liked_initializers, void 0));
                __runInitializers(this, _liked_extraInitializers);
            }
            return CommentResponseDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _id_decorators = [(0, class_transformer_1.Expose)()];
            _content_decorators = [(0, class_transformer_1.Expose)()];
            _postId_decorators = [(0, class_transformer_1.Expose)()];
            _parentCommentId_decorators = [(0, class_transformer_1.Expose)()];
            _replyCount_decorators = [(0, class_transformer_1.Expose)()];
            _likeCount_decorators = [(0, class_transformer_1.Expose)()];
            _createdAt_decorators = [(0, class_transformer_1.Expose)()];
            _updatedAt_decorators = [(0, class_transformer_1.Expose)()];
            _author_decorators = [(0, class_transformer_1.Expose)(), (0, class_transformer_1.Type)(function () { return CommentAuthorDto; })];
            _liked_decorators = [(0, class_transformer_1.Expose)()];
            __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: function (obj) { return "id" in obj; }, get: function (obj) { return obj.id; }, set: function (obj, value) { obj.id = value; } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
            __esDecorate(null, null, _content_decorators, { kind: "field", name: "content", static: false, private: false, access: { has: function (obj) { return "content" in obj; }, get: function (obj) { return obj.content; }, set: function (obj, value) { obj.content = value; } }, metadata: _metadata }, _content_initializers, _content_extraInitializers);
            __esDecorate(null, null, _postId_decorators, { kind: "field", name: "postId", static: false, private: false, access: { has: function (obj) { return "postId" in obj; }, get: function (obj) { return obj.postId; }, set: function (obj, value) { obj.postId = value; } }, metadata: _metadata }, _postId_initializers, _postId_extraInitializers);
            __esDecorate(null, null, _parentCommentId_decorators, { kind: "field", name: "parentCommentId", static: false, private: false, access: { has: function (obj) { return "parentCommentId" in obj; }, get: function (obj) { return obj.parentCommentId; }, set: function (obj, value) { obj.parentCommentId = value; } }, metadata: _metadata }, _parentCommentId_initializers, _parentCommentId_extraInitializers);
            __esDecorate(null, null, _replyCount_decorators, { kind: "field", name: "replyCount", static: false, private: false, access: { has: function (obj) { return "replyCount" in obj; }, get: function (obj) { return obj.replyCount; }, set: function (obj, value) { obj.replyCount = value; } }, metadata: _metadata }, _replyCount_initializers, _replyCount_extraInitializers);
            __esDecorate(null, null, _likeCount_decorators, { kind: "field", name: "likeCount", static: false, private: false, access: { has: function (obj) { return "likeCount" in obj; }, get: function (obj) { return obj.likeCount; }, set: function (obj, value) { obj.likeCount = value; } }, metadata: _metadata }, _likeCount_initializers, _likeCount_extraInitializers);
            __esDecorate(null, null, _createdAt_decorators, { kind: "field", name: "createdAt", static: false, private: false, access: { has: function (obj) { return "createdAt" in obj; }, get: function (obj) { return obj.createdAt; }, set: function (obj, value) { obj.createdAt = value; } }, metadata: _metadata }, _createdAt_initializers, _createdAt_extraInitializers);
            __esDecorate(null, null, _updatedAt_decorators, { kind: "field", name: "updatedAt", static: false, private: false, access: { has: function (obj) { return "updatedAt" in obj; }, get: function (obj) { return obj.updatedAt; }, set: function (obj, value) { obj.updatedAt = value; } }, metadata: _metadata }, _updatedAt_initializers, _updatedAt_extraInitializers);
            __esDecorate(null, null, _author_decorators, { kind: "field", name: "author", static: false, private: false, access: { has: function (obj) { return "author" in obj; }, get: function (obj) { return obj.author; }, set: function (obj, value) { obj.author = value; } }, metadata: _metadata }, _author_initializers, _author_extraInitializers);
            __esDecorate(null, null, _liked_decorators, { kind: "field", name: "liked", static: false, private: false, access: { has: function (obj) { return "liked" in obj; }, get: function (obj) { return obj.liked; }, set: function (obj, value) { obj.liked = value; } }, metadata: _metadata }, _liked_initializers, _liked_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.CommentResponseDto = CommentResponseDto;
