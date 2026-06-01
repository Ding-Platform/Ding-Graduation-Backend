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
exports.SellerController = void 0;
var common_1 = require("@nestjs/common");
var platform_express_1 = require("@nestjs/platform-express");
var multer_1 = require("multer");
var jwt_guard_1 = require("src/common/guards/strategy.guards/jwt.guard");
var seller_guard_1 = require("../guards/seller.guard");
var SellerController = function () {
    var _classDecorators = [(0, common_1.Controller)('marketplace/seller'), (0, common_1.UseGuards)(jwt_guard_1.JwtAuthenticationGuard, seller_guard_1.SellerGuard)];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _instanceExtraInitializers = [];
    var _getProfile_decorators;
    var _updateProfile_decorators;
    var _getMyProducts_decorators;
    var _getMyDeals_decorators;
    var _getDealHistory_decorators;
    var _getMyOrders_decorators;
    var _getOrderDetail_decorators;
    var _confirmShipment_decorators;
    var SellerController = _classThis = /** @class */ (function () {
        function SellerController_1(sellerService) {
            this.sellerService = (__runInitializers(this, _instanceExtraInitializers), sellerService);
        }
        /** GET /marketplace/seller/profile */
        SellerController_1.prototype.getProfile = function (user) {
            return this.sellerService.getMyProfile(user.id);
        };
        /** PATCH /marketplace/seller/profile */
        SellerController_1.prototype.updateProfile = function (user, dto) {
            return this.sellerService.updateMyProfile(user.id, dto);
        };
        /** GET /marketplace/seller/products?page=1&limit=20 */
        SellerController_1.prototype.getMyProducts = function (user, pagination) {
            return this.sellerService.getMyProducts(user.id, pagination.page, pagination.limit);
        };
        /** GET /marketplace/seller/deals?page=1&limit=20 */
        SellerController_1.prototype.getMyDeals = function (user, pagination) {
            return this.sellerService.getMyActiveDeals(user.id, pagination.page, pagination.limit);
        };
        /** GET /marketplace/seller/deals/history */
        SellerController_1.prototype.getDealHistory = function (user, pagination) {
            return this.sellerService.getMyDealHistory(user.id, pagination.page, pagination.limit);
        };
        /** GET /marketplace/seller/orders */
        SellerController_1.prototype.getMyOrders = function (user, query) {
            return this.sellerService.getMyOrders(user.id, query);
        };
        /** GET /marketplace/seller/orders/:id */
        SellerController_1.prototype.getOrderDetail = function (user, id) {
            return this.sellerService.getOrderDetail(user.id, id);
        };
        /** POST /marketplace/seller/orders/:id/confirm-shipment */
        SellerController_1.prototype.confirmShipment = function (user, id, dto, file) {
            return this.sellerService.confirmShipment(user.id, id, dto, file);
        };
        return SellerController_1;
    }());
    __setFunctionName(_classThis, "SellerController");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _getProfile_decorators = [(0, common_1.Get)('profile'), (0, common_1.HttpCode)(common_1.HttpStatus.OK)];
        _updateProfile_decorators = [(0, common_1.Patch)('profile'), (0, common_1.HttpCode)(common_1.HttpStatus.OK)];
        _getMyProducts_decorators = [(0, common_1.Get)('products'), (0, common_1.HttpCode)(common_1.HttpStatus.OK)];
        _getMyDeals_decorators = [(0, common_1.Get)('deals'), (0, common_1.HttpCode)(common_1.HttpStatus.OK)];
        _getDealHistory_decorators = [(0, common_1.Get)('deals/history'), (0, common_1.HttpCode)(common_1.HttpStatus.OK)];
        _getMyOrders_decorators = [(0, common_1.Get)('orders'), (0, common_1.HttpCode)(common_1.HttpStatus.OK)];
        _getOrderDetail_decorators = [(0, common_1.Get)('orders/:id'), (0, common_1.HttpCode)(common_1.HttpStatus.OK)];
        _confirmShipment_decorators = [(0, common_1.Post)('orders/:id/confirm-shipment'), (0, common_1.HttpCode)(common_1.HttpStatus.OK), (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('shipmentProofImage', { storage: (0, multer_1.memoryStorage)() }))];
        __esDecorate(_classThis, null, _getProfile_decorators, { kind: "method", name: "getProfile", static: false, private: false, access: { has: function (obj) { return "getProfile" in obj; }, get: function (obj) { return obj.getProfile; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _updateProfile_decorators, { kind: "method", name: "updateProfile", static: false, private: false, access: { has: function (obj) { return "updateProfile" in obj; }, get: function (obj) { return obj.updateProfile; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getMyProducts_decorators, { kind: "method", name: "getMyProducts", static: false, private: false, access: { has: function (obj) { return "getMyProducts" in obj; }, get: function (obj) { return obj.getMyProducts; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getMyDeals_decorators, { kind: "method", name: "getMyDeals", static: false, private: false, access: { has: function (obj) { return "getMyDeals" in obj; }, get: function (obj) { return obj.getMyDeals; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getDealHistory_decorators, { kind: "method", name: "getDealHistory", static: false, private: false, access: { has: function (obj) { return "getDealHistory" in obj; }, get: function (obj) { return obj.getDealHistory; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getMyOrders_decorators, { kind: "method", name: "getMyOrders", static: false, private: false, access: { has: function (obj) { return "getMyOrders" in obj; }, get: function (obj) { return obj.getMyOrders; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getOrderDetail_decorators, { kind: "method", name: "getOrderDetail", static: false, private: false, access: { has: function (obj) { return "getOrderDetail" in obj; }, get: function (obj) { return obj.getOrderDetail; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _confirmShipment_decorators, { kind: "method", name: "confirmShipment", static: false, private: false, access: { has: function (obj) { return "confirmShipment" in obj; }, get: function (obj) { return obj.confirmShipment; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        SellerController = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return SellerController = _classThis;
}();
exports.SellerController = SellerController;
