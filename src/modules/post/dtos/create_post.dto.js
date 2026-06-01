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
exports.CreatePostDto = exports.PostPrivacy = void 0;
var class_validator_1 = require("class-validator");
var post_constants_1 = require("../../../common/constants/post.constants");
var PostPrivacy;
(function (PostPrivacy) {
    PostPrivacy["PUBLIC"] = "PUBLIC";
    PostPrivacy["FRIENDS"] = "FRIENDS";
    PostPrivacy["FRIENDS_OF_FRIENDS"] = "FRIENDS_OF_FRIENDS";
    PostPrivacy["ONLY_ME"] = "ONLY_ME";
    PostPrivacy["CUSTOM"] = "CUSTOM";
})(PostPrivacy || (exports.PostPrivacy = PostPrivacy = {}));
var CreatePostDto = function () {
    var _a;
    var _content_decorators;
    var _content_initializers = [];
    var _content_extraInitializers = [];
    var _authorId_decorators;
    var _authorId_initializers = [];
    var _authorId_extraInitializers = [];
    var _privacy_decorators;
    var _privacy_initializers = [];
    var _privacy_extraInitializers = [];
    var _customAudienceIds_decorators;
    var _customAudienceIds_initializers = [];
    var _customAudienceIds_extraInitializers = [];
    return _a = /** @class */ (function () {
            function CreatePostDto() {
                this.content = __runInitializers(this, _content_initializers, void 0);
                this.authorId = (__runInitializers(this, _content_extraInitializers), __runInitializers(this, _authorId_initializers, void 0));
                this.privacy = (__runInitializers(this, _authorId_extraInitializers), __runInitializers(this, _privacy_initializers, PostPrivacy.PUBLIC));
                this.customAudienceIds = (__runInitializers(this, _privacy_extraInitializers), __runInitializers(this, _customAudienceIds_initializers, void 0));
                __runInitializers(this, _customAudienceIds_extraInitializers);
            }
            return CreatePostDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _content_decorators = [(0, class_validator_1.IsNotEmpty)({ message: 'Content is required' }), (0, class_validator_1.IsString)({ message: 'Content must be a string' }), (0, class_validator_1.MaxLength)(post_constants_1.POST_CONSTANTS.VALIDATION.MAX_CONTENT_LENGTH, {
                    message: "Content must not exceed ".concat(post_constants_1.POST_CONSTANTS.VALIDATION.MAX_CONTENT_LENGTH, " characters"),
                })];
            _authorId_decorators = [(0, class_validator_1.IsNotEmpty)({ message: 'Author ID is required' }), (0, class_validator_1.IsString)({ message: 'Author ID must be a string' }), (0, class_validator_1.IsUUID)('4', { message: 'Author ID must be a valid UUID' })];
            _privacy_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsEnum)(PostPrivacy, { message: 'Invalid privacy setting' })];
            _customAudienceIds_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsArray)({ message: 'Custom audience must be an array' }), (0, class_validator_1.IsUUID)('4', { each: true, message: 'Each audience ID must be a valid UUID' })];
            __esDecorate(null, null, _content_decorators, { kind: "field", name: "content", static: false, private: false, access: { has: function (obj) { return "content" in obj; }, get: function (obj) { return obj.content; }, set: function (obj, value) { obj.content = value; } }, metadata: _metadata }, _content_initializers, _content_extraInitializers);
            __esDecorate(null, null, _authorId_decorators, { kind: "field", name: "authorId", static: false, private: false, access: { has: function (obj) { return "authorId" in obj; }, get: function (obj) { return obj.authorId; }, set: function (obj, value) { obj.authorId = value; } }, metadata: _metadata }, _authorId_initializers, _authorId_extraInitializers);
            __esDecorate(null, null, _privacy_decorators, { kind: "field", name: "privacy", static: false, private: false, access: { has: function (obj) { return "privacy" in obj; }, get: function (obj) { return obj.privacy; }, set: function (obj, value) { obj.privacy = value; } }, metadata: _metadata }, _privacy_initializers, _privacy_extraInitializers);
            __esDecorate(null, null, _customAudienceIds_decorators, { kind: "field", name: "customAudienceIds", static: false, private: false, access: { has: function (obj) { return "customAudienceIds" in obj; }, get: function (obj) { return obj.customAudienceIds; }, set: function (obj, value) { obj.customAudienceIds = value; } }, metadata: _metadata }, _customAudienceIds_initializers, _customAudienceIds_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.CreatePostDto = CreatePostDto;
