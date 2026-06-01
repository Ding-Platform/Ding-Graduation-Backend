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
exports.CreateStoryDto = void 0;
var class_validator_1 = require("class-validator");
var client_1 = require("@prisma/client");
var CreateStoryDto = function () {
    var _a;
    var _mediaUrl_decorators;
    var _mediaUrl_initializers = [];
    var _mediaUrl_extraInitializers = [];
    var _thumbnailUrl_decorators;
    var _thumbnailUrl_initializers = [];
    var _thumbnailUrl_extraInitializers = [];
    var _caption_decorators;
    var _caption_initializers = [];
    var _caption_extraInitializers = [];
    var _privacy_decorators;
    var _privacy_initializers = [];
    var _privacy_extraInitializers = [];
    return _a = /** @class */ (function () {
            function CreateStoryDto() {
                this.mediaUrl = __runInitializers(this, _mediaUrl_initializers, void 0);
                this.thumbnailUrl = (__runInitializers(this, _mediaUrl_extraInitializers), __runInitializers(this, _thumbnailUrl_initializers, void 0));
                this.caption = (__runInitializers(this, _thumbnailUrl_extraInitializers), __runInitializers(this, _caption_initializers, void 0));
                this.privacy = (__runInitializers(this, _caption_extraInitializers), __runInitializers(this, _privacy_initializers, client_1.StoryPrivacy.FRIENDS));
                __runInitializers(this, _privacy_extraInitializers);
            }
            return CreateStoryDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _mediaUrl_decorators = [(0, class_validator_1.IsNotEmpty)({ message: 'Media URL is required' }), (0, class_validator_1.IsString)(), (0, class_validator_1.IsUrl)({}, { message: 'Media URL must be a valid URL' })];
            _thumbnailUrl_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)(), (0, class_validator_1.IsUrl)({}, { message: 'Thumbnail URL must be a valid URL' })];
            _caption_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)(), (0, class_validator_1.MaxLength)(500, { message: 'Caption must not exceed 500 characters' })];
            _privacy_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsEnum)(client_1.StoryPrivacy, { message: 'Invalid privacy setting' })];
            __esDecorate(null, null, _mediaUrl_decorators, { kind: "field", name: "mediaUrl", static: false, private: false, access: { has: function (obj) { return "mediaUrl" in obj; }, get: function (obj) { return obj.mediaUrl; }, set: function (obj, value) { obj.mediaUrl = value; } }, metadata: _metadata }, _mediaUrl_initializers, _mediaUrl_extraInitializers);
            __esDecorate(null, null, _thumbnailUrl_decorators, { kind: "field", name: "thumbnailUrl", static: false, private: false, access: { has: function (obj) { return "thumbnailUrl" in obj; }, get: function (obj) { return obj.thumbnailUrl; }, set: function (obj, value) { obj.thumbnailUrl = value; } }, metadata: _metadata }, _thumbnailUrl_initializers, _thumbnailUrl_extraInitializers);
            __esDecorate(null, null, _caption_decorators, { kind: "field", name: "caption", static: false, private: false, access: { has: function (obj) { return "caption" in obj; }, get: function (obj) { return obj.caption; }, set: function (obj, value) { obj.caption = value; } }, metadata: _metadata }, _caption_initializers, _caption_extraInitializers);
            __esDecorate(null, null, _privacy_decorators, { kind: "field", name: "privacy", static: false, private: false, access: { has: function (obj) { return "privacy" in obj; }, get: function (obj) { return obj.privacy; }, set: function (obj, value) { obj.privacy = value; } }, metadata: _metadata }, _privacy_initializers, _privacy_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.CreateStoryDto = CreateStoryDto;
