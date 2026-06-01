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
exports.AdminMarketplaceController = void 0;
var common_1 = require("@nestjs/common");
var jwt_guard_1 = require("src/common/guards/strategy.guards/jwt.guard");
var admin_marketplace_guard_1 = require("../guards/admin-marketplace.guard");
var AdminMarketplaceController = function () {
    var _classDecorators = [(0, common_1.Controller)('marketplace/admin'), (0, common_1.UseGuards)(jwt_guard_1.JwtAuthenticationGuard, admin_marketplace_guard_1.AdminMarketplaceGuard)];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _instanceExtraInitializers = [];
    var _listApplications_decorators;
    var _getApplication_decorators;
    var _approveApplication_decorators;
    var _declineApplication_decorators;
    var _listSellers_decorators;
    var _getSellerDetail_decorators;
    var _banSeller_decorators;
    var _unbanSeller_decorators;
    var _suspendSeller_decorators;
    var _unsuspendSeller_decorators;
    var _cancelDeal_decorators;
    var _listOrders_decorators;
    var _getOrderDetail_decorators;
    var _resolveDispute_decorators;
    var _forceRelease_decorators;
    var _forceRefund_decorators;
    var _getLogs_decorators;
    var AdminMarketplaceController = _classThis = /** @class */ (function () {
        function AdminMarketplaceController_1(adminService) {
            this.adminService = (__runInitializers(this, _instanceExtraInitializers), adminService);
        }
        // ── Applications ──────────────────────────────────────────────────
        /** GET /marketplace/admin/applications?status=PENDING&page=1&limit=20 */
        AdminMarketplaceController_1.prototype.listApplications = function (status, pagination) {
            return this.adminService.listApplications(status, pagination === null || pagination === void 0 ? void 0 : pagination.page, pagination === null || pagination === void 0 ? void 0 : pagination.limit);
        };
        /** GET /marketplace/admin/applications/:id */
        AdminMarketplaceController_1.prototype.getApplication = function (id) {
            return this.adminService.getApplicationDetail(id);
        };
        /** POST /marketplace/admin/applications/:id/approve */
        AdminMarketplaceController_1.prototype.approveApplication = function (id, admin) {
            return this.adminService.approveApplication(id, admin.id);
        };
        /** POST /marketplace/admin/applications/:id/decline */
        AdminMarketplaceController_1.prototype.declineApplication = function (id, admin, dto) {
            return this.adminService.declineApplication(id, admin.id, dto);
        };
        // ── Sellers ───────────────────────────────────────────────────────
        /** GET /marketplace/admin/sellers?page=1&limit=20 */
        AdminMarketplaceController_1.prototype.listSellers = function (pagination) {
            return this.adminService.listSellers(pagination === null || pagination === void 0 ? void 0 : pagination.page, pagination === null || pagination === void 0 ? void 0 : pagination.limit);
        };
        /** GET /marketplace/admin/sellers/:userId */
        AdminMarketplaceController_1.prototype.getSellerDetail = function (userId) {
            return this.adminService.getSellerDetail(userId);
        };
        /** POST /marketplace/admin/sellers/:userId/ban */
        AdminMarketplaceController_1.prototype.banSeller = function (userId, admin, dto) {
            return this.adminService.banSeller(userId, admin.id, dto);
        };
        /** POST /marketplace/admin/sellers/:userId/unban */
        AdminMarketplaceController_1.prototype.unbanSeller = function (userId, admin) {
            return this.adminService.unbanSeller(userId, admin.id);
        };
        /** POST /marketplace/admin/sellers/:userId/suspend */
        AdminMarketplaceController_1.prototype.suspendSeller = function (userId, admin, dto) {
            return this.adminService.suspendSeller(userId, admin.id, dto);
        };
        /** POST /marketplace/admin/sellers/:userId/unsuspend */
        AdminMarketplaceController_1.prototype.unsuspendSeller = function (userId, admin) {
            return this.adminService.unsuspendSeller(userId, admin.id);
        };
        // ── Deals ─────────────────────────────────────────────────────────
        /** POST /marketplace/admin/deals/:transactionId/cancel */
        AdminMarketplaceController_1.prototype.cancelDeal = function (transactionId, admin, dto) {
            return this.adminService.cancelDeal(transactionId, admin.id, dto);
        };
        /** GET /marketplace/admin/orders */
        AdminMarketplaceController_1.prototype.listOrders = function (query) {
            return this.adminService.listOrders(query);
        };
        /** GET /marketplace/admin/orders/:id */
        AdminMarketplaceController_1.prototype.getOrderDetail = function (id) {
            return this.adminService.getOrderDetail(id);
        };
        /** POST /marketplace/admin/orders/:id/resolve-dispute */
        AdminMarketplaceController_1.prototype.resolveDispute = function (id, admin, dto) {
            return this.adminService.resolveDispute(admin.id, id, dto);
        };
        /** POST /marketplace/admin/orders/:id/force-release */
        AdminMarketplaceController_1.prototype.forceRelease = function (id, admin, dto) {
            return this.adminService.forceRelease(admin.id, id, dto);
        };
        /** POST /marketplace/admin/orders/:id/force-refund */
        AdminMarketplaceController_1.prototype.forceRefund = function (id, admin, dto) {
            return this.adminService.forceRefund(admin.id, id, dto);
        };
        // ── Audit Logs ────────────────────────────────────────────────────
        /** GET /marketplace/admin/logs?page=1&limit=50 */
        AdminMarketplaceController_1.prototype.getLogs = function (pagination) {
            return this.adminService.getAuditLogs(pagination === null || pagination === void 0 ? void 0 : pagination.page, pagination === null || pagination === void 0 ? void 0 : pagination.limit);
        };
        return AdminMarketplaceController_1;
    }());
    __setFunctionName(_classThis, "AdminMarketplaceController");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _listApplications_decorators = [(0, common_1.Get)('applications'), (0, common_1.HttpCode)(common_1.HttpStatus.OK)];
        _getApplication_decorators = [(0, common_1.Get)('applications/:id'), (0, common_1.HttpCode)(common_1.HttpStatus.OK)];
        _approveApplication_decorators = [(0, common_1.Post)('applications/:id/approve'), (0, common_1.HttpCode)(common_1.HttpStatus.OK)];
        _declineApplication_decorators = [(0, common_1.Post)('applications/:id/decline'), (0, common_1.HttpCode)(common_1.HttpStatus.OK)];
        _listSellers_decorators = [(0, common_1.Get)('sellers'), (0, common_1.HttpCode)(common_1.HttpStatus.OK)];
        _getSellerDetail_decorators = [(0, common_1.Get)('sellers/:userId'), (0, common_1.HttpCode)(common_1.HttpStatus.OK)];
        _banSeller_decorators = [(0, common_1.Post)('sellers/:userId/ban'), (0, common_1.HttpCode)(common_1.HttpStatus.OK)];
        _unbanSeller_decorators = [(0, common_1.Post)('sellers/:userId/unban'), (0, common_1.HttpCode)(common_1.HttpStatus.OK)];
        _suspendSeller_decorators = [(0, common_1.Post)('sellers/:userId/suspend'), (0, common_1.HttpCode)(common_1.HttpStatus.OK)];
        _unsuspendSeller_decorators = [(0, common_1.Post)('sellers/:userId/unsuspend'), (0, common_1.HttpCode)(common_1.HttpStatus.OK)];
        _cancelDeal_decorators = [(0, common_1.Post)('deals/:transactionId/cancel'), (0, common_1.HttpCode)(common_1.HttpStatus.OK)];
        _listOrders_decorators = [(0, common_1.Get)('orders'), (0, common_1.HttpCode)(common_1.HttpStatus.OK)];
        _getOrderDetail_decorators = [(0, common_1.Get)('orders/:id'), (0, common_1.HttpCode)(common_1.HttpStatus.OK)];
        _resolveDispute_decorators = [(0, common_1.Post)('orders/:id/resolve-dispute'), (0, common_1.HttpCode)(common_1.HttpStatus.OK)];
        _forceRelease_decorators = [(0, common_1.Post)('orders/:id/force-release'), (0, common_1.HttpCode)(common_1.HttpStatus.OK)];
        _forceRefund_decorators = [(0, common_1.Post)('orders/:id/force-refund'), (0, common_1.HttpCode)(common_1.HttpStatus.OK)];
        _getLogs_decorators = [(0, common_1.Get)('logs'), (0, common_1.HttpCode)(common_1.HttpStatus.OK)];
        __esDecorate(_classThis, null, _listApplications_decorators, { kind: "method", name: "listApplications", static: false, private: false, access: { has: function (obj) { return "listApplications" in obj; }, get: function (obj) { return obj.listApplications; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getApplication_decorators, { kind: "method", name: "getApplication", static: false, private: false, access: { has: function (obj) { return "getApplication" in obj; }, get: function (obj) { return obj.getApplication; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _approveApplication_decorators, { kind: "method", name: "approveApplication", static: false, private: false, access: { has: function (obj) { return "approveApplication" in obj; }, get: function (obj) { return obj.approveApplication; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _declineApplication_decorators, { kind: "method", name: "declineApplication", static: false, private: false, access: { has: function (obj) { return "declineApplication" in obj; }, get: function (obj) { return obj.declineApplication; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _listSellers_decorators, { kind: "method", name: "listSellers", static: false, private: false, access: { has: function (obj) { return "listSellers" in obj; }, get: function (obj) { return obj.listSellers; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getSellerDetail_decorators, { kind: "method", name: "getSellerDetail", static: false, private: false, access: { has: function (obj) { return "getSellerDetail" in obj; }, get: function (obj) { return obj.getSellerDetail; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _banSeller_decorators, { kind: "method", name: "banSeller", static: false, private: false, access: { has: function (obj) { return "banSeller" in obj; }, get: function (obj) { return obj.banSeller; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _unbanSeller_decorators, { kind: "method", name: "unbanSeller", static: false, private: false, access: { has: function (obj) { return "unbanSeller" in obj; }, get: function (obj) { return obj.unbanSeller; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _suspendSeller_decorators, { kind: "method", name: "suspendSeller", static: false, private: false, access: { has: function (obj) { return "suspendSeller" in obj; }, get: function (obj) { return obj.suspendSeller; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _unsuspendSeller_decorators, { kind: "method", name: "unsuspendSeller", static: false, private: false, access: { has: function (obj) { return "unsuspendSeller" in obj; }, get: function (obj) { return obj.unsuspendSeller; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _cancelDeal_decorators, { kind: "method", name: "cancelDeal", static: false, private: false, access: { has: function (obj) { return "cancelDeal" in obj; }, get: function (obj) { return obj.cancelDeal; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _listOrders_decorators, { kind: "method", name: "listOrders", static: false, private: false, access: { has: function (obj) { return "listOrders" in obj; }, get: function (obj) { return obj.listOrders; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getOrderDetail_decorators, { kind: "method", name: "getOrderDetail", static: false, private: false, access: { has: function (obj) { return "getOrderDetail" in obj; }, get: function (obj) { return obj.getOrderDetail; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _resolveDispute_decorators, { kind: "method", name: "resolveDispute", static: false, private: false, access: { has: function (obj) { return "resolveDispute" in obj; }, get: function (obj) { return obj.resolveDispute; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _forceRelease_decorators, { kind: "method", name: "forceRelease", static: false, private: false, access: { has: function (obj) { return "forceRelease" in obj; }, get: function (obj) { return obj.forceRelease; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _forceRefund_decorators, { kind: "method", name: "forceRefund", static: false, private: false, access: { has: function (obj) { return "forceRefund" in obj; }, get: function (obj) { return obj.forceRefund; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getLogs_decorators, { kind: "method", name: "getLogs", static: false, private: false, access: { has: function (obj) { return "getLogs" in obj; }, get: function (obj) { return obj.getLogs; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        AdminMarketplaceController = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return AdminMarketplaceController = _classThis;
}();
exports.AdminMarketplaceController = AdminMarketplaceController;
