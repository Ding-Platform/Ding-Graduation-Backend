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
exports.ProductController = void 0;
var common_1 = require("@nestjs/common");
var jwt_guard_1 = require("src/common/guards/strategy.guards/jwt.guard");
var seller_guard_1 = require("../guards/seller.guard");
var ProductController = function () {
    var _classDecorators = [(0, common_1.Controller)('marketplace/products')];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _instanceExtraInitializers = [];
    var _createProduct_decorators;
    var _getProducts_decorators;
    var _getProduct_decorators;
    var _updateProduct_decorators;
    var _deleteProduct_decorators;
    var _buyProduct_decorators;
    var ProductController = _classThis = /** @class */ (function () {
        function ProductController_1(productService) {
            this.productService = (__runInitializers(this, _instanceExtraInitializers), productService);
        }
        /**
         * POST /marketplace/products
         * Create a product listing. Requires SELLER role.
         */
        ProductController_1.prototype.createProduct = function (user, dto) {
            return this.productService.createProduct(user.id, dto);
        };
        /**
         * GET /marketplace/products
         * Public — browse all active products.
         */
        ProductController_1.prototype.getProducts = function (query) {
            return this.productService.getProducts(query);
        };
        /**
         * GET /marketplace/products/:id
         * Public — single product detail.
         */
        ProductController_1.prototype.getProduct = function (id) {
            return this.productService.getProduct(id);
        };
        /**
         * PATCH /marketplace/products/:id
         * Update own product. Requires SELLER role.
         */
        ProductController_1.prototype.updateProduct = function (user, id, dto) {
            return this.productService.updateProduct(id, user.id, dto);
        };
        /**
         * DELETE /marketplace/products/:id
         * Delete own product. Requires SELLER role.
         */
        ProductController_1.prototype.deleteProduct = function (user, id) {
            return this.productService.deleteProduct(id, user.id);
        };
        /**
         * POST /marketplace/products/:id/buy
         * Purchase a product. Any authenticated user can buy.
         */
        ProductController_1.prototype.buyProduct = function (user, id) {
            return this.productService.buyProduct(user.id, id);
        };
        return ProductController_1;
    }());
    __setFunctionName(_classThis, "ProductController");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _createProduct_decorators = [(0, common_1.Post)(), (0, common_1.UseGuards)(jwt_guard_1.JwtAuthenticationGuard, seller_guard_1.SellerGuard), (0, common_1.HttpCode)(common_1.HttpStatus.CREATED)];
        _getProducts_decorators = [(0, common_1.Get)(), (0, common_1.HttpCode)(common_1.HttpStatus.OK)];
        _getProduct_decorators = [(0, common_1.Get)(':id'), (0, common_1.HttpCode)(common_1.HttpStatus.OK)];
        _updateProduct_decorators = [(0, common_1.Patch)(':id'), (0, common_1.UseGuards)(jwt_guard_1.JwtAuthenticationGuard, seller_guard_1.SellerGuard), (0, common_1.HttpCode)(common_1.HttpStatus.OK)];
        _deleteProduct_decorators = [(0, common_1.Delete)(':id'), (0, common_1.UseGuards)(jwt_guard_1.JwtAuthenticationGuard, seller_guard_1.SellerGuard), (0, common_1.HttpCode)(common_1.HttpStatus.OK)];
        _buyProduct_decorators = [(0, common_1.Post)(':id/buy'), (0, common_1.UseGuards)(jwt_guard_1.JwtAuthenticationGuard), (0, common_1.HttpCode)(common_1.HttpStatus.CREATED)];
        __esDecorate(_classThis, null, _createProduct_decorators, { kind: "method", name: "createProduct", static: false, private: false, access: { has: function (obj) { return "createProduct" in obj; }, get: function (obj) { return obj.createProduct; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getProducts_decorators, { kind: "method", name: "getProducts", static: false, private: false, access: { has: function (obj) { return "getProducts" in obj; }, get: function (obj) { return obj.getProducts; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getProduct_decorators, { kind: "method", name: "getProduct", static: false, private: false, access: { has: function (obj) { return "getProduct" in obj; }, get: function (obj) { return obj.getProduct; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _updateProduct_decorators, { kind: "method", name: "updateProduct", static: false, private: false, access: { has: function (obj) { return "updateProduct" in obj; }, get: function (obj) { return obj.updateProduct; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _deleteProduct_decorators, { kind: "method", name: "deleteProduct", static: false, private: false, access: { has: function (obj) { return "deleteProduct" in obj; }, get: function (obj) { return obj.deleteProduct; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _buyProduct_decorators, { kind: "method", name: "buyProduct", static: false, private: false, access: { has: function (obj) { return "buyProduct" in obj; }, get: function (obj) { return obj.buyProduct; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ProductController = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ProductController = _classThis;
}();
exports.ProductController = ProductController;
