"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
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
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SellerService = void 0;
var common_1 = require("@nestjs/common");
var SellerService = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var SellerService = _classThis = /** @class */ (function () {
        function SellerService_1(db, orderService) {
            this.db = db;
            this.orderService = orderService;
        }
        /** GET /marketplace/seller/profile — seller's own profile */
        SellerService_1.prototype.getMyProfile = function (userId) {
            return __awaiter(this, void 0, void 0, function () {
                var profile, commercialRegNumber, bankAccountNumber, safe;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.db.sellerProfile.findUnique({
                                where: { userId: userId },
                                include: {
                                    user: {
                                        select: {
                                            id: true,
                                            name: true,
                                            email: true,
                                            image: true,
                                            createdAt: true,
                                        },
                                    },
                                },
                            })];
                        case 1:
                            profile = _a.sent();
                            if (!profile)
                                throw new common_1.NotFoundException('Seller profile not found');
                            commercialRegNumber = profile.commercialRegNumber, bankAccountNumber = profile.bankAccountNumber, safe = __rest(profile, ["commercialRegNumber", "bankAccountNumber"]);
                            return [2 /*return*/, __assign(__assign({}, safe), { commercialRegNumberMasked: '•••••••', bankAccountNumberMasked: '•••• ' + profile.bankCardLast4 })];
                    }
                });
            });
        };
        /** PATCH /marketplace/seller/profile */
        SellerService_1.prototype.updateMyProfile = function (userId, dto) {
            return __awaiter(this, void 0, void 0, function () {
                var profile;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.db.sellerProfile.findUnique({
                                where: { userId: userId },
                            })];
                        case 1:
                            profile = _a.sent();
                            if (!profile)
                                throw new common_1.NotFoundException('Seller profile not found');
                            return [2 /*return*/, this.db.sellerProfile.update({
                                    where: { userId: userId },
                                    data: __assign(__assign({}, dto), { updatedAt: new Date() }),
                                    select: {
                                        id: true,
                                        businessName: true,
                                        phoneNumber: true,
                                        address: true,
                                        city: true,
                                        country: true,
                                        bankCardLast4: true,
                                        isSuspended: true,
                                        isBanned: true,
                                        updatedAt: true,
                                    },
                                })];
                    }
                });
            });
        };
        /** GET /marketplace/seller/products — seller's own listings */
        SellerService_1.prototype.getMyProducts = function (userId_1) {
            return __awaiter(this, arguments, void 0, function (userId, page, limit) {
                var skip, _a, products, total;
                if (page === void 0) { page = 1; }
                if (limit === void 0) { limit = 20; }
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            skip = (page - 1) * limit;
                            return [4 /*yield*/, Promise.all([
                                    this.db.product.findMany({
                                        where: { sellerId: userId },
                                        orderBy: { createdAt: 'desc' },
                                        skip: skip,
                                        take: limit,
                                    }),
                                    this.db.product.count({ where: { sellerId: userId } }),
                                ])];
                        case 1:
                            _a = _b.sent(), products = _a[0], total = _a[1];
                            return [2 /*return*/, { data: products, total: total, page: page, limit: limit }];
                    }
                });
            });
        };
        /** GET /marketplace/seller/deals — active/pending deals */
        SellerService_1.prototype.getMyActiveDeals = function (userId_1) {
            return __awaiter(this, arguments, void 0, function (userId, page, limit) {
                var skip, _a, transactions, txTotal, orders, orderTotal, data;
                if (page === void 0) { page = 1; }
                if (limit === void 0) { limit = 20; }
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            skip = (page - 1) * limit;
                            return [4 /*yield*/, Promise.all([
                                    this.db.transaction.findMany({
                                        where: {
                                            sellerId: userId,
                                            status: { in: ['PENDING'] },
                                        },
                                        include: {
                                            product: {
                                                select: { id: true, title: true, price: true, images: true },
                                            },
                                            buyer: { select: { id: true, name: true, email: true, image: true } },
                                        },
                                        orderBy: { createdAt: 'desc' },
                                        skip: skip,
                                        take: limit,
                                    }),
                                    this.db.transaction.count({
                                        where: { sellerId: userId, status: { in: ['PENDING'] } },
                                    }),
                                    this.db.order.findMany({
                                        where: {
                                            sellerId: userId,
                                            status: { in: ['PLACED', 'SELLER_CONFIRMED', 'SHIPPED', 'RELEASE_PENDING'] },
                                        },
                                        include: {
                                            product: {
                                                select: { id: true, title: true, price: true, images: true },
                                            },
                                            buyer: { select: { id: true, name: true, email: true, image: true } },
                                            transaction: true,
                                        },
                                        orderBy: { createdAt: 'desc' },
                                        skip: skip,
                                        take: limit,
                                    }),
                                    this.db.order.count({
                                        where: {
                                            sellerId: userId,
                                            status: { in: ['PLACED', 'SELLER_CONFIRMED', 'SHIPPED', 'RELEASE_PENDING'] },
                                        },
                                    }),
                                ])];
                        case 1:
                            _a = _b.sent(), transactions = _a[0], txTotal = _a[1], orders = _a[2], orderTotal = _a[3];
                            data = __spreadArray(__spreadArray([], transactions.map(function (item) { return (__assign(__assign({}, item), { flowType: 'TRANSACTION' })); }), true), orders.map(function (item) { return (__assign(__assign({}, item), { flowType: 'ORDER' })); }), true).sort(function (a, b) { return b.createdAt.getTime() - a.createdAt.getTime(); });
                            return [2 /*return*/, { data: data, total: txTotal + orderTotal, page: page, limit: limit }];
                    }
                });
            });
        };
        /** GET /marketplace/seller/deals/history — old deals */
        SellerService_1.prototype.getMyDealHistory = function (userId_1) {
            return __awaiter(this, arguments, void 0, function (userId, page, limit) {
                var skip, _a, transactions, txTotal, orders, orderTotal, data;
                if (page === void 0) { page = 1; }
                if (limit === void 0) { limit = 20; }
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            skip = (page - 1) * limit;
                            return [4 /*yield*/, Promise.all([
                                    this.db.transaction.findMany({
                                        where: {
                                            sellerId: userId,
                                            status: { in: ['FAILED', 'REFUNDED', 'CANCELLED'] },
                                        },
                                        include: {
                                            product: { select: { id: true, title: true, price: true } },
                                            buyer: { select: { id: true, name: true, email: true } },
                                        },
                                        orderBy: { createdAt: 'desc' },
                                        skip: skip,
                                        take: limit,
                                    }),
                                    this.db.transaction.count({
                                        where: {
                                            sellerId: userId,
                                            status: { in: ['FAILED', 'REFUNDED', 'CANCELLED'] },
                                        },
                                    }),
                                    this.db.order.findMany({
                                        where: {
                                            sellerId: userId,
                                            status: { in: ['COMPLETED', 'CANCELLED', 'REFUNDED', 'DISPUTED'] },
                                        },
                                        include: {
                                            product: { select: { id: true, title: true, price: true } },
                                            buyer: { select: { id: true, name: true, email: true } },
                                            transaction: true,
                                        },
                                        orderBy: { createdAt: 'desc' },
                                        skip: skip,
                                        take: limit,
                                    }),
                                    this.db.order.count({
                                        where: {
                                            sellerId: userId,
                                            status: { in: ['COMPLETED', 'CANCELLED', 'REFUNDED', 'DISPUTED'] },
                                        },
                                    }),
                                ])];
                        case 1:
                            _a = _b.sent(), transactions = _a[0], txTotal = _a[1], orders = _a[2], orderTotal = _a[3];
                            data = __spreadArray(__spreadArray([], transactions.map(function (item) { return (__assign(__assign({}, item), { flowType: 'TRANSACTION' })); }), true), orders.map(function (item) { return (__assign(__assign({}, item), { flowType: 'ORDER' })); }), true).sort(function (a, b) { return b.createdAt.getTime() - a.createdAt.getTime(); });
                            return [2 /*return*/, { data: data, total: txTotal + orderTotal, page: page, limit: limit }];
                    }
                });
            });
        };
        /** GET /marketplace/seller/orders */
        SellerService_1.prototype.getMyOrders = function (userId, query) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.orderService.listSellerOrders(userId, query)];
                });
            });
        };
        /** GET /marketplace/seller/orders/:id */
        SellerService_1.prototype.getOrderDetail = function (userId, orderId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.orderService.getSellerOrderDetail(userId, orderId)];
                });
            });
        };
        /** POST /marketplace/seller/orders/:id/confirm-shipment */
        SellerService_1.prototype.confirmShipment = function (userId, orderId, dto, file) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.orderService.confirmShipment(userId, orderId, dto, file)];
                });
            });
        };
        return SellerService_1;
    }());
    __setFunctionName(_classThis, "SellerService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        SellerService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return SellerService = _classThis;
}();
exports.SellerService = SellerService;
