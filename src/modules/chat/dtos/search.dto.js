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
exports.SearchMessagesDto = void 0;
var swagger_1 = require("@nestjs/swagger");
var class_validator_1 = require("class-validator");
var class_transformer_1 = require("class-transformer");
var SearchMessagesDto = function () {
    var _a;
    var _query_decorators;
    var _query_initializers = [];
    var _query_extraInitializers = [];
    var _roomId_decorators;
    var _roomId_initializers = [];
    var _roomId_extraInitializers = [];
    var _limit_decorators;
    var _limit_initializers = [];
    var _limit_extraInitializers = [];
    return _a = /** @class */ (function () {
            function SearchMessagesDto() {
                this.query = __runInitializers(this, _query_initializers, void 0);
                this.roomId = (__runInitializers(this, _query_extraInitializers), __runInitializers(this, _roomId_initializers, void 0));
                this.limit = (__runInitializers(this, _roomId_extraInitializers), __runInitializers(this, _limit_initializers, 50));
                __runInitializers(this, _limit_extraInitializers);
            }
            return SearchMessagesDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _query_decorators = [(0, swagger_1.ApiProperty)({ description: 'Search query' }), (0, class_validator_1.IsString)()];
            _roomId_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Room ID to search within (optional, searches all rooms if not provided)',
                }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            _limit_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Maximum number of results',
                    default: 50,
                }), (0, class_validator_1.IsOptional)(), (0, class_transformer_1.Type)(function () { return Number; }), (0, class_validator_1.IsNumber)(), (0, class_validator_1.Min)(1), (0, class_validator_1.Max)(100)];
            __esDecorate(null, null, _query_decorators, { kind: "field", name: "query", static: false, private: false, access: { has: function (obj) { return "query" in obj; }, get: function (obj) { return obj.query; }, set: function (obj, value) { obj.query = value; } }, metadata: _metadata }, _query_initializers, _query_extraInitializers);
            __esDecorate(null, null, _roomId_decorators, { kind: "field", name: "roomId", static: false, private: false, access: { has: function (obj) { return "roomId" in obj; }, get: function (obj) { return obj.roomId; }, set: function (obj, value) { obj.roomId = value; } }, metadata: _metadata }, _roomId_initializers, _roomId_extraInitializers);
            __esDecorate(null, null, _limit_decorators, { kind: "field", name: "limit", static: false, private: false, access: { has: function (obj) { return "limit" in obj; }, get: function (obj) { return obj.limit; }, set: function (obj, value) { obj.limit = value; } }, metadata: _metadata }, _limit_initializers, _limit_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.SearchMessagesDto = SearchMessagesDto;
