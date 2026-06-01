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
exports.GetOrdersQueryDto = exports.ResolveDisputeDto = exports.OpenDisputeDto = exports.CancelOrderDto = exports.ConfirmShipmentDto = void 0;
var class_transformer_1 = require("class-transformer");
var class_validator_1 = require("class-validator");
var ConfirmShipmentDto = function () {
    var _a;
    var _shipmentTrackingNumber_decorators;
    var _shipmentTrackingNumber_initializers = [];
    var _shipmentTrackingNumber_extraInitializers = [];
    var _shipmentCarrier_decorators;
    var _shipmentCarrier_initializers = [];
    var _shipmentCarrier_extraInitializers = [];
    return _a = /** @class */ (function () {
            function ConfirmShipmentDto() {
                this.shipmentTrackingNumber = __runInitializers(this, _shipmentTrackingNumber_initializers, void 0);
                this.shipmentCarrier = (__runInitializers(this, _shipmentTrackingNumber_extraInitializers), __runInitializers(this, _shipmentCarrier_initializers, void 0));
                __runInitializers(this, _shipmentCarrier_extraInitializers);
            }
            return ConfirmShipmentDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _shipmentTrackingNumber_decorators = [(0, class_validator_1.IsString)(), (0, class_validator_1.IsNotEmpty)(), (0, class_validator_1.MaxLength)(120)];
            _shipmentCarrier_decorators = [(0, class_validator_1.IsString)(), (0, class_validator_1.IsNotEmpty)(), (0, class_validator_1.MaxLength)(120)];
            __esDecorate(null, null, _shipmentTrackingNumber_decorators, { kind: "field", name: "shipmentTrackingNumber", static: false, private: false, access: { has: function (obj) { return "shipmentTrackingNumber" in obj; }, get: function (obj) { return obj.shipmentTrackingNumber; }, set: function (obj, value) { obj.shipmentTrackingNumber = value; } }, metadata: _metadata }, _shipmentTrackingNumber_initializers, _shipmentTrackingNumber_extraInitializers);
            __esDecorate(null, null, _shipmentCarrier_decorators, { kind: "field", name: "shipmentCarrier", static: false, private: false, access: { has: function (obj) { return "shipmentCarrier" in obj; }, get: function (obj) { return obj.shipmentCarrier; }, set: function (obj, value) { obj.shipmentCarrier = value; } }, metadata: _metadata }, _shipmentCarrier_initializers, _shipmentCarrier_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.ConfirmShipmentDto = ConfirmShipmentDto;
var CancelOrderDto = function () {
    var _a;
    var _cancelReason_decorators;
    var _cancelReason_initializers = [];
    var _cancelReason_extraInitializers = [];
    return _a = /** @class */ (function () {
            function CancelOrderDto() {
                this.cancelReason = __runInitializers(this, _cancelReason_initializers, void 0);
                __runInitializers(this, _cancelReason_extraInitializers);
            }
            return CancelOrderDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _cancelReason_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)(), (0, class_validator_1.MaxLength)(1000)];
            __esDecorate(null, null, _cancelReason_decorators, { kind: "field", name: "cancelReason", static: false, private: false, access: { has: function (obj) { return "cancelReason" in obj; }, get: function (obj) { return obj.cancelReason; }, set: function (obj, value) { obj.cancelReason = value; } }, metadata: _metadata }, _cancelReason_initializers, _cancelReason_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.CancelOrderDto = CancelOrderDto;
var OpenDisputeDto = function () {
    var _a;
    var _disputeReason_decorators;
    var _disputeReason_initializers = [];
    var _disputeReason_extraInitializers = [];
    return _a = /** @class */ (function () {
            function OpenDisputeDto() {
                this.disputeReason = __runInitializers(this, _disputeReason_initializers, void 0);
                __runInitializers(this, _disputeReason_extraInitializers);
            }
            return OpenDisputeDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _disputeReason_decorators = [(0, class_validator_1.IsString)(), (0, class_validator_1.IsNotEmpty)(), (0, class_validator_1.MinLength)(10), (0, class_validator_1.MaxLength)(1000)];
            __esDecorate(null, null, _disputeReason_decorators, { kind: "field", name: "disputeReason", static: false, private: false, access: { has: function (obj) { return "disputeReason" in obj; }, get: function (obj) { return obj.disputeReason; }, set: function (obj, value) { obj.disputeReason = value; } }, metadata: _metadata }, _disputeReason_initializers, _disputeReason_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.OpenDisputeDto = OpenDisputeDto;
var ResolveDisputeDto = function () {
    var _a;
    var _resolution_decorators;
    var _resolution_initializers = [];
    var _resolution_extraInitializers = [];
    var _adminNote_decorators;
    var _adminNote_initializers = [];
    var _adminNote_extraInitializers = [];
    return _a = /** @class */ (function () {
            function ResolveDisputeDto() {
                this.resolution = __runInitializers(this, _resolution_initializers, void 0);
                this.adminNote = (__runInitializers(this, _resolution_extraInitializers), __runInitializers(this, _adminNote_initializers, void 0));
                __runInitializers(this, _adminNote_extraInitializers);
            }
            return ResolveDisputeDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _resolution_decorators = [(0, class_validator_1.IsString)(), (0, class_validator_1.IsIn)(['REFUND', 'RELEASE'])];
            _adminNote_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)(), (0, class_validator_1.MaxLength)(1000)];
            __esDecorate(null, null, _resolution_decorators, { kind: "field", name: "resolution", static: false, private: false, access: { has: function (obj) { return "resolution" in obj; }, get: function (obj) { return obj.resolution; }, set: function (obj, value) { obj.resolution = value; } }, metadata: _metadata }, _resolution_initializers, _resolution_extraInitializers);
            __esDecorate(null, null, _adminNote_decorators, { kind: "field", name: "adminNote", static: false, private: false, access: { has: function (obj) { return "adminNote" in obj; }, get: function (obj) { return obj.adminNote; }, set: function (obj, value) { obj.adminNote = value; } }, metadata: _metadata }, _adminNote_initializers, _adminNote_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.ResolveDisputeDto = ResolveDisputeDto;
var GetOrdersQueryDto = function () {
    var _a;
    var _status_decorators;
    var _status_initializers = [];
    var _status_extraInitializers = [];
    var _page_decorators;
    var _page_initializers = [];
    var _page_extraInitializers = [];
    var _limit_decorators;
    var _limit_initializers = [];
    var _limit_extraInitializers = [];
    return _a = /** @class */ (function () {
            function GetOrdersQueryDto() {
                this.status = __runInitializers(this, _status_initializers, void 0);
                this.page = (__runInitializers(this, _status_extraInitializers), __runInitializers(this, _page_initializers, 1));
                this.limit = (__runInitializers(this, _page_extraInitializers), __runInitializers(this, _limit_initializers, 20));
                __runInitializers(this, _limit_extraInitializers);
            }
            return GetOrdersQueryDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _status_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            _page_decorators = [(0, class_validator_1.IsOptional)(), (0, class_transformer_1.Type)(function () { return Number; }), (0, class_validator_1.IsInt)(), (0, class_validator_1.Min)(1)];
            _limit_decorators = [(0, class_validator_1.IsOptional)(), (0, class_transformer_1.Type)(function () { return Number; }), (0, class_validator_1.IsInt)(), (0, class_validator_1.Min)(1)];
            __esDecorate(null, null, _status_decorators, { kind: "field", name: "status", static: false, private: false, access: { has: function (obj) { return "status" in obj; }, get: function (obj) { return obj.status; }, set: function (obj, value) { obj.status = value; } }, metadata: _metadata }, _status_initializers, _status_extraInitializers);
            __esDecorate(null, null, _page_decorators, { kind: "field", name: "page", static: false, private: false, access: { has: function (obj) { return "page" in obj; }, get: function (obj) { return obj.page; }, set: function (obj, value) { obj.page = value; } }, metadata: _metadata }, _page_initializers, _page_extraInitializers);
            __esDecorate(null, null, _limit_decorators, { kind: "field", name: "limit", static: false, private: false, access: { has: function (obj) { return "limit" in obj; }, get: function (obj) { return obj.limit; }, set: function (obj, value) { obj.limit = value; } }, metadata: _metadata }, _limit_initializers, _limit_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.GetOrdersQueryDto = GetOrdersQueryDto;
