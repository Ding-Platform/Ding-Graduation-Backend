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
exports.OrderController = void 0;
var common_1 = require("@nestjs/common");
var platform_express_1 = require("@nestjs/platform-express");
var multer_1 = require("multer");
var jwt_guard_1 = require("src/common/guards/strategy.guards/jwt.guard");
var OrderController = function () {
    var _classDecorators = [(0, common_1.Controller)('marketplace/orders'), (0, common_1.UseGuards)(jwt_guard_1.JwtAuthenticationGuard)];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _instanceExtraInitializers = [];
    var _listMyOrders_decorators;
    var _getOrder_decorators;
    var _cancelOrder_decorators;
    var _openDispute_decorators;
    var _confirmDelivery_decorators;
    var OrderController = _classThis = /** @class */ (function () {
        function OrderController_1(orderService) {
            this.orderService = (__runInitializers(this, _instanceExtraInitializers), orderService);
        }
        OrderController_1.prototype.listMyOrders = function (user, query) {
            return this.orderService.listBuyerOrders(user.id, query);
        };
        OrderController_1.prototype.getOrder = function (user, id) {
            return this.orderService.getBuyerOrderDetail(user.id, id);
        };
        OrderController_1.prototype.cancelOrder = function (user, id, dto) {
            return this.orderService.cancelOrder(user.id, id, dto);
        };
        OrderController_1.prototype.openDispute = function (user, id, dto) {
            return this.orderService.openDispute(user.id, id, dto);
        };
        OrderController_1.prototype.confirmDelivery = function (user, id, file) {
            return this.orderService.confirmDelivery(user.id, id, file);
        };
        return OrderController_1;
    }());
    __setFunctionName(_classThis, "OrderController");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _listMyOrders_decorators = [(0, common_1.Get)(), (0, common_1.HttpCode)(common_1.HttpStatus.OK)];
        _getOrder_decorators = [(0, common_1.Get)(':id'), (0, common_1.HttpCode)(common_1.HttpStatus.OK)];
        _cancelOrder_decorators = [(0, common_1.Post)(':id/cancel'), (0, common_1.HttpCode)(common_1.HttpStatus.OK)];
        _openDispute_decorators = [(0, common_1.Post)(':id/dispute'), (0, common_1.HttpCode)(common_1.HttpStatus.OK)];
        _confirmDelivery_decorators = [(0, common_1.Post)(':id/confirm-delivery'), (0, common_1.HttpCode)(common_1.HttpStatus.OK), (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('deliveryProofImage', { storage: (0, multer_1.memoryStorage)() }))];
        __esDecorate(_classThis, null, _listMyOrders_decorators, { kind: "method", name: "listMyOrders", static: false, private: false, access: { has: function (obj) { return "listMyOrders" in obj; }, get: function (obj) { return obj.listMyOrders; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getOrder_decorators, { kind: "method", name: "getOrder", static: false, private: false, access: { has: function (obj) { return "getOrder" in obj; }, get: function (obj) { return obj.getOrder; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _cancelOrder_decorators, { kind: "method", name: "cancelOrder", static: false, private: false, access: { has: function (obj) { return "cancelOrder" in obj; }, get: function (obj) { return obj.cancelOrder; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _openDispute_decorators, { kind: "method", name: "openDispute", static: false, private: false, access: { has: function (obj) { return "openDispute" in obj; }, get: function (obj) { return obj.openDispute; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _confirmDelivery_decorators, { kind: "method", name: "confirmDelivery", static: false, private: false, access: { has: function (obj) { return "confirmDelivery" in obj; }, get: function (obj) { return obj.confirmDelivery; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        OrderController = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return OrderController = _classThis;
}();
exports.OrderController = OrderController;
