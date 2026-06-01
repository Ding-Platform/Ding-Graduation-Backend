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
exports.RecordViewDto = void 0;
var class_validator_1 = require("class-validator");
var class_transformer_1 = require("class-transformer");
var RecordViewDto = function () {
    var _a;
    var _sessionId_decorators;
    var _sessionId_initializers = [];
    var _sessionId_extraInitializers = [];
    var _watchPct_decorators;
    var _watchPct_initializers = [];
    var _watchPct_extraInitializers = [];
    var _viewerId_decorators;
    var _viewerId_initializers = [];
    var _viewerId_extraInitializers = [];
    return _a = /** @class */ (function () {
            function RecordViewDto() {
                this.sessionId = __runInitializers(this, _sessionId_initializers, void 0);
                this.watchPct = (__runInitializers(this, _sessionId_extraInitializers), __runInitializers(this, _watchPct_initializers, void 0));
                this.viewerId = (__runInitializers(this, _watchPct_extraInitializers), __runInitializers(this, _viewerId_initializers, void 0));
                __runInitializers(this, _viewerId_extraInitializers);
            }
            return RecordViewDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _sessionId_decorators = [(0, class_validator_1.IsNotEmpty)({ message: 'sessionId is required' }), (0, class_validator_1.IsString)()];
            _watchPct_decorators = [(0, class_validator_1.IsOptional)(), (0, class_transformer_1.Type)(function () { return Number; }), (0, class_validator_1.IsNumber)(), (0, class_validator_1.Min)(0), (0, class_validator_1.Max)(100)];
            _viewerId_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsUUID)('4', { message: 'viewerId must be a valid UUID' })];
            __esDecorate(null, null, _sessionId_decorators, { kind: "field", name: "sessionId", static: false, private: false, access: { has: function (obj) { return "sessionId" in obj; }, get: function (obj) { return obj.sessionId; }, set: function (obj, value) { obj.sessionId = value; } }, metadata: _metadata }, _sessionId_initializers, _sessionId_extraInitializers);
            __esDecorate(null, null, _watchPct_decorators, { kind: "field", name: "watchPct", static: false, private: false, access: { has: function (obj) { return "watchPct" in obj; }, get: function (obj) { return obj.watchPct; }, set: function (obj, value) { obj.watchPct = value; } }, metadata: _metadata }, _watchPct_initializers, _watchPct_extraInitializers);
            __esDecorate(null, null, _viewerId_decorators, { kind: "field", name: "viewerId", static: false, private: false, access: { has: function (obj) { return "viewerId" in obj; }, get: function (obj) { return obj.viewerId; }, set: function (obj, value) { obj.viewerId = value; } }, metadata: _metadata }, _viewerId_initializers, _viewerId_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.RecordViewDto = RecordViewDto;
