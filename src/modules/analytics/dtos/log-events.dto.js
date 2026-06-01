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
exports.LogAnalyticsEventsDto = exports.AnalyticsEventInputDto = void 0;
var class_transformer_1 = require("class-transformer");
var class_validator_1 = require("class-validator");
var client_1 = require("@prisma/client");
var AnalyticsEventInputDto = function () {
    var _a;
    var _eventType_decorators;
    var _eventType_initializers = [];
    var _eventType_extraInitializers = [];
    var _targetId_decorators;
    var _targetId_initializers = [];
    var _targetId_extraInitializers = [];
    var _targetType_decorators;
    var _targetType_initializers = [];
    var _targetType_extraInitializers = [];
    var _metadata_decorators;
    var _metadata_initializers = [];
    var _metadata_extraInitializers = [];
    var _sessionId_decorators;
    var _sessionId_initializers = [];
    var _sessionId_extraInitializers = [];
    return _a = /** @class */ (function () {
            function AnalyticsEventInputDto() {
                this.eventType = __runInitializers(this, _eventType_initializers, void 0);
                this.targetId = (__runInitializers(this, _eventType_extraInitializers), __runInitializers(this, _targetId_initializers, void 0));
                this.targetType = (__runInitializers(this, _targetId_extraInitializers), __runInitializers(this, _targetType_initializers, void 0));
                this.metadata = (__runInitializers(this, _targetType_extraInitializers), __runInitializers(this, _metadata_initializers, void 0));
                this.sessionId = (__runInitializers(this, _metadata_extraInitializers), __runInitializers(this, _sessionId_initializers, void 0));
                __runInitializers(this, _sessionId_extraInitializers);
            }
            return AnalyticsEventInputDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _eventType_decorators = [(0, class_validator_1.IsEnum)(client_1.AnalyticsEventType, { message: 'Invalid analytics event type' })];
            _targetId_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            _targetType_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            _metadata_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsObject)()];
            _sessionId_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            __esDecorate(null, null, _eventType_decorators, { kind: "field", name: "eventType", static: false, private: false, access: { has: function (obj) { return "eventType" in obj; }, get: function (obj) { return obj.eventType; }, set: function (obj, value) { obj.eventType = value; } }, metadata: _metadata }, _eventType_initializers, _eventType_extraInitializers);
            __esDecorate(null, null, _targetId_decorators, { kind: "field", name: "targetId", static: false, private: false, access: { has: function (obj) { return "targetId" in obj; }, get: function (obj) { return obj.targetId; }, set: function (obj, value) { obj.targetId = value; } }, metadata: _metadata }, _targetId_initializers, _targetId_extraInitializers);
            __esDecorate(null, null, _targetType_decorators, { kind: "field", name: "targetType", static: false, private: false, access: { has: function (obj) { return "targetType" in obj; }, get: function (obj) { return obj.targetType; }, set: function (obj, value) { obj.targetType = value; } }, metadata: _metadata }, _targetType_initializers, _targetType_extraInitializers);
            __esDecorate(null, null, _metadata_decorators, { kind: "field", name: "metadata", static: false, private: false, access: { has: function (obj) { return "metadata" in obj; }, get: function (obj) { return obj.metadata; }, set: function (obj, value) { obj.metadata = value; } }, metadata: _metadata }, _metadata_initializers, _metadata_extraInitializers);
            __esDecorate(null, null, _sessionId_decorators, { kind: "field", name: "sessionId", static: false, private: false, access: { has: function (obj) { return "sessionId" in obj; }, get: function (obj) { return obj.sessionId; }, set: function (obj, value) { obj.sessionId = value; } }, metadata: _metadata }, _sessionId_initializers, _sessionId_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.AnalyticsEventInputDto = AnalyticsEventInputDto;
var LogAnalyticsEventsDto = function () {
    var _a;
    var _events_decorators;
    var _events_initializers = [];
    var _events_extraInitializers = [];
    return _a = /** @class */ (function () {
            function LogAnalyticsEventsDto() {
                this.events = __runInitializers(this, _events_initializers, void 0);
                __runInitializers(this, _events_extraInitializers);
            }
            return LogAnalyticsEventsDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _events_decorators = [(0, class_validator_1.IsArray)(), (0, class_validator_1.ArrayMaxSize)(100, { message: 'Batch cannot exceed 100 events at once' }), (0, class_validator_1.ValidateNested)({ each: true }), (0, class_transformer_1.Type)(function () { return AnalyticsEventInputDto; })];
            __esDecorate(null, null, _events_decorators, { kind: "field", name: "events", static: false, private: false, access: { has: function (obj) { return "events" in obj; }, get: function (obj) { return obj.events; }, set: function (obj, value) { obj.events = value; } }, metadata: _metadata }, _events_initializers, _events_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.LogAnalyticsEventsDto = LogAnalyticsEventsDto;
