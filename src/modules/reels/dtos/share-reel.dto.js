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
exports.ShareReelDto = void 0;
var class_validator_1 = require("class-validator");
var client_1 = require("@prisma/client");
var ShareReelDto = function () {
    var _a;
    var _shareType_decorators;
    var _shareType_initializers = [];
    var _shareType_extraInitializers = [];
    var _targetUserId_decorators;
    var _targetUserId_initializers = [];
    var _targetUserId_extraInitializers = [];
    return _a = /** @class */ (function () {
            function ShareReelDto() {
                this.shareType = __runInitializers(this, _shareType_initializers, void 0);
                this.targetUserId = (__runInitializers(this, _shareType_extraInitializers), __runInitializers(this, _targetUserId_initializers, void 0));
                __runInitializers(this, _targetUserId_extraInitializers);
            }
            return ShareReelDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _shareType_decorators = [(0, class_validator_1.IsEnum)(client_1.ShareType, { message: 'shareType must be STORY, FEED, EXTERNAL, or DM' })];
            _targetUserId_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsUUID)('4', { message: 'targetUserId must be a valid UUID' })];
            __esDecorate(null, null, _shareType_decorators, { kind: "field", name: "shareType", static: false, private: false, access: { has: function (obj) { return "shareType" in obj; }, get: function (obj) { return obj.shareType; }, set: function (obj, value) { obj.shareType = value; } }, metadata: _metadata }, _shareType_initializers, _shareType_extraInitializers);
            __esDecorate(null, null, _targetUserId_decorators, { kind: "field", name: "targetUserId", static: false, private: false, access: { has: function (obj) { return "targetUserId" in obj; }, get: function (obj) { return obj.targetUserId; }, set: function (obj, value) { obj.targetUserId = value; } }, metadata: _metadata }, _targetUserId_initializers, _targetUserId_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.ShareReelDto = ShareReelDto;
