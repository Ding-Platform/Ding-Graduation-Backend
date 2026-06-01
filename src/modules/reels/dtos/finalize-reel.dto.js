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
exports.FinalizeReelDto = void 0;
var class_validator_1 = require("class-validator");
var class_transformer_1 = require("class-transformer");
var FinalizeReelDto = function () {
    var _a;
    var _rawVideoKey_decorators;
    var _rawVideoKey_initializers = [];
    var _rawVideoKey_extraInitializers = [];
    var _caption_decorators;
    var _caption_initializers = [];
    var _caption_extraInitializers = [];
    var _hashtags_decorators;
    var _hashtags_initializers = [];
    var _hashtags_extraInitializers = [];
    var _audioTrackId_decorators;
    var _audioTrackId_initializers = [];
    var _audioTrackId_extraInitializers = [];
    var _audioOffsetMs_decorators;
    var _audioOffsetMs_initializers = [];
    var _audioOffsetMs_extraInitializers = [];
    var _durationSec_decorators;
    var _durationSec_initializers = [];
    var _durationSec_extraInitializers = [];
    var _width_decorators;
    var _width_initializers = [];
    var _width_extraInitializers = [];
    var _height_decorators;
    var _height_initializers = [];
    var _height_extraInitializers = [];
    var _fileSizeBytes_decorators;
    var _fileSizeBytes_initializers = [];
    var _fileSizeBytes_extraInitializers = [];
    return _a = /** @class */ (function () {
            function FinalizeReelDto() {
                this.rawVideoKey = __runInitializers(this, _rawVideoKey_initializers, void 0);
                this.caption = (__runInitializers(this, _rawVideoKey_extraInitializers), __runInitializers(this, _caption_initializers, void 0));
                this.hashtags = (__runInitializers(this, _caption_extraInitializers), __runInitializers(this, _hashtags_initializers, void 0));
                this.audioTrackId = (__runInitializers(this, _hashtags_extraInitializers), __runInitializers(this, _audioTrackId_initializers, void 0));
                this.audioOffsetMs = (__runInitializers(this, _audioTrackId_extraInitializers), __runInitializers(this, _audioOffsetMs_initializers, void 0));
                this.durationSec = (__runInitializers(this, _audioOffsetMs_extraInitializers), __runInitializers(this, _durationSec_initializers, void 0));
                this.width = (__runInitializers(this, _durationSec_extraInitializers), __runInitializers(this, _width_initializers, void 0));
                this.height = (__runInitializers(this, _width_extraInitializers), __runInitializers(this, _height_initializers, void 0));
                this.fileSizeBytes = (__runInitializers(this, _height_extraInitializers), __runInitializers(this, _fileSizeBytes_initializers, void 0));
                __runInitializers(this, _fileSizeBytes_extraInitializers);
            }
            return FinalizeReelDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _rawVideoKey_decorators = [(0, class_validator_1.IsNotEmpty)({ message: 'rawVideoKey is required' }), (0, class_validator_1.IsString)()];
            _caption_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)(), (0, class_validator_1.MaxLength)(2200, { message: 'Caption must not exceed 2200 characters' })];
            _hashtags_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsArray)(), (0, class_validator_1.IsString)({ each: true }), (0, class_validator_1.ArrayMaxSize)(30, { message: 'Maximum 30 hashtags allowed' })];
            _audioTrackId_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsUUID)('4', { message: 'audioTrackId must be a valid UUID' })];
            _audioOffsetMs_decorators = [(0, class_validator_1.IsOptional)(), (0, class_transformer_1.Type)(function () { return Number; }), (0, class_validator_1.IsNumber)(), (0, class_validator_1.Min)(0)];
            _durationSec_decorators = [(0, class_validator_1.IsOptional)(), (0, class_transformer_1.Type)(function () { return Number; }), (0, class_validator_1.IsNumber)(), (0, class_validator_1.Min)(1, { message: 'Duration must be at least 1 second' }), (0, class_validator_1.Max)(60, { message: 'Duration cannot exceed 60 seconds' })];
            _width_decorators = [(0, class_validator_1.IsOptional)(), (0, class_transformer_1.Type)(function () { return Number; }), (0, class_validator_1.IsNumber)(), (0, class_validator_1.Min)(1)];
            _height_decorators = [(0, class_validator_1.IsOptional)(), (0, class_transformer_1.Type)(function () { return Number; }), (0, class_validator_1.IsNumber)(), (0, class_validator_1.Min)(1)];
            _fileSizeBytes_decorators = [(0, class_validator_1.IsOptional)(), (0, class_transformer_1.Type)(function () { return Number; }), (0, class_validator_1.IsNumber)(), (0, class_validator_1.Min)(0)];
            __esDecorate(null, null, _rawVideoKey_decorators, { kind: "field", name: "rawVideoKey", static: false, private: false, access: { has: function (obj) { return "rawVideoKey" in obj; }, get: function (obj) { return obj.rawVideoKey; }, set: function (obj, value) { obj.rawVideoKey = value; } }, metadata: _metadata }, _rawVideoKey_initializers, _rawVideoKey_extraInitializers);
            __esDecorate(null, null, _caption_decorators, { kind: "field", name: "caption", static: false, private: false, access: { has: function (obj) { return "caption" in obj; }, get: function (obj) { return obj.caption; }, set: function (obj, value) { obj.caption = value; } }, metadata: _metadata }, _caption_initializers, _caption_extraInitializers);
            __esDecorate(null, null, _hashtags_decorators, { kind: "field", name: "hashtags", static: false, private: false, access: { has: function (obj) { return "hashtags" in obj; }, get: function (obj) { return obj.hashtags; }, set: function (obj, value) { obj.hashtags = value; } }, metadata: _metadata }, _hashtags_initializers, _hashtags_extraInitializers);
            __esDecorate(null, null, _audioTrackId_decorators, { kind: "field", name: "audioTrackId", static: false, private: false, access: { has: function (obj) { return "audioTrackId" in obj; }, get: function (obj) { return obj.audioTrackId; }, set: function (obj, value) { obj.audioTrackId = value; } }, metadata: _metadata }, _audioTrackId_initializers, _audioTrackId_extraInitializers);
            __esDecorate(null, null, _audioOffsetMs_decorators, { kind: "field", name: "audioOffsetMs", static: false, private: false, access: { has: function (obj) { return "audioOffsetMs" in obj; }, get: function (obj) { return obj.audioOffsetMs; }, set: function (obj, value) { obj.audioOffsetMs = value; } }, metadata: _metadata }, _audioOffsetMs_initializers, _audioOffsetMs_extraInitializers);
            __esDecorate(null, null, _durationSec_decorators, { kind: "field", name: "durationSec", static: false, private: false, access: { has: function (obj) { return "durationSec" in obj; }, get: function (obj) { return obj.durationSec; }, set: function (obj, value) { obj.durationSec = value; } }, metadata: _metadata }, _durationSec_initializers, _durationSec_extraInitializers);
            __esDecorate(null, null, _width_decorators, { kind: "field", name: "width", static: false, private: false, access: { has: function (obj) { return "width" in obj; }, get: function (obj) { return obj.width; }, set: function (obj, value) { obj.width = value; } }, metadata: _metadata }, _width_initializers, _width_extraInitializers);
            __esDecorate(null, null, _height_decorators, { kind: "field", name: "height", static: false, private: false, access: { has: function (obj) { return "height" in obj; }, get: function (obj) { return obj.height; }, set: function (obj, value) { obj.height = value; } }, metadata: _metadata }, _height_initializers, _height_extraInitializers);
            __esDecorate(null, null, _fileSizeBytes_decorators, { kind: "field", name: "fileSizeBytes", static: false, private: false, access: { has: function (obj) { return "fileSizeBytes" in obj; }, get: function (obj) { return obj.fileSizeBytes; }, set: function (obj, value) { obj.fileSizeBytes = value; } }, metadata: _metadata }, _fileSizeBytes_initializers, _fileSizeBytes_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.FinalizeReelDto = FinalizeReelDto;
