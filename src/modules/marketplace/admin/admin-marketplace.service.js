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
exports.AdminMarketplaceService = void 0;
var common_1 = require("@nestjs/common");
var encryption_util_1 = require("src/common/utils/encryption.util");
var AdminMarketplaceService = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var AdminMarketplaceService = _classThis = /** @class */ (function () {
        function AdminMarketplaceService_1(db, orderService) {
            this.db = db;
            this.orderService = orderService;
        }
        // ════════════════════════════════════════════
        //  SELLER APPLICATIONS
        // ════════════════════════════════════════════
        /** List all pending applications (or filter by status) */
        AdminMarketplaceService_1.prototype.listApplications = function (status_1) {
            return __awaiter(this, arguments, void 0, function (status, page, limit) {
                var skip, where, _a, applications, total;
                if (page === void 0) { page = 1; }
                if (limit === void 0) { limit = 20; }
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            skip = (page - 1) * limit;
                            where = { status: status || 'PENDING' };
                            return [4 /*yield*/, Promise.all([
                                    this.db.sellerApplication.findMany({
                                        where: where,
                                        include: {
                                            user: { select: { id: true, name: true, email: true, image: true } },
                                        },
                                        orderBy: { createdAt: 'desc' },
                                        skip: skip,
                                        take: limit,
                                    }),
                                    this.db.sellerApplication.count({ where: where }),
                                ])];
                        case 1:
                            _a = _b.sent(), applications = _a[0], total = _a[1];
                            return [2 /*return*/, { data: applications, total: total, page: page, limit: limit }];
                    }
                });
            });
        };
        /** Full application detail — decrypts sensitive fields for admin view */
        AdminMarketplaceService_1.prototype.getApplicationDetail = function (applicationId) {
            return __awaiter(this, void 0, void 0, function () {
                var app;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.db.sellerApplication.findUnique({
                                where: { id: applicationId },
                                include: {
                                    user: {
                                        select: {
                                            id: true,
                                            name: true,
                                            email: true,
                                            image: true,
                                            createdAt: true,
                                            role: true,
                                        },
                                    },
                                },
                            })];
                        case 1:
                            app = _a.sent();
                            if (!app)
                                throw new common_1.NotFoundException('Application not found');
                            return [2 /*return*/, __assign(__assign({}, app), { idCardNumber: (0, encryption_util_1.decrypt)(app.idCardNumber), commercialRegNumber: (0, encryption_util_1.decrypt)(app.commercialRegNumber), bankAccountNumber: (0, encryption_util_1.decrypt)(app.bankAccountNumber), bankCardNumber: '•••• ' + (0, encryption_util_1.maskCardNumber)((0, encryption_util_1.decrypt)(app.bankCardNumber)) })];
                    }
                });
            });
        };
        /** Approve application → promotes user to SELLER, creates SellerProfile */
        AdminMarketplaceService_1.prototype.approveApplication = function (applicationId, adminId) {
            return __awaiter(this, void 0, void 0, function () {
                var app;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.db.sellerApplication.findUnique({
                                where: { id: applicationId },
                            })];
                        case 1:
                            app = _a.sent();
                            if (!app)
                                throw new common_1.NotFoundException('Application not found');
                            if (app.status !== 'PENDING') {
                                throw new common_1.BadRequestException("Application is already ".concat(app.status.toLowerCase()));
                            }
                            return [4 /*yield*/, this.db.$transaction(function (tx) { return __awaiter(_this, void 0, void 0, function () {
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0: 
                                            // 1. Update application status
                                            return [4 /*yield*/, tx.sellerApplication.update({
                                                    where: { id: applicationId },
                                                    data: {
                                                        status: 'APPROVED',
                                                        reviewedById: adminId,
                                                        reviewedAt: new Date(),
                                                    },
                                                })];
                                            case 1:
                                                // 1. Update application status
                                                _a.sent();
                                                // 2. Promote user role
                                                return [4 /*yield*/, tx.user.update({
                                                        where: { id: app.userId },
                                                        data: { role: 'SELLER' },
                                                    })];
                                            case 2:
                                                // 2. Promote user role
                                                _a.sent();
                                                // 3. Create SellerProfile from application data
                                                return [4 /*yield*/, tx.sellerProfile.create({
                                                        data: {
                                                            userId: app.userId,
                                                            phoneNumber: app.phoneNumber,
                                                            address: app.address,
                                                            city: app.city,
                                                            country: app.country,
                                                            commercialRegNumber: app.commercialRegNumber, // stays encrypted
                                                            bankAccountNumber: app.bankAccountNumber, // stays encrypted
                                                            bankCardLast4: (0, encryption_util_1.maskCardNumber)((0, encryption_util_1.decrypt)(app.bankCardNumber)),
                                                        },
                                                    })];
                                            case 3:
                                                // 3. Create SellerProfile from application data
                                                _a.sent();
                                                // 4. Audit log
                                                return [4 /*yield*/, tx.dealLog.create({
                                                        data: {
                                                            adminId: adminId,
                                                            targetType: 'SELLER',
                                                            targetId: app.userId,
                                                            action: 'APPROVE_APPLICATION',
                                                            cause: "Application ".concat(applicationId, " approved"),
                                                        },
                                                    })];
                                            case 4:
                                                // 4. Audit log
                                                _a.sent();
                                                return [2 /*return*/];
                                        }
                                    });
                                }); })];
                        case 2:
                            _a.sent();
                            return [2 /*return*/, { message: 'Application approved. User is now a seller.' }];
                    }
                });
            });
        };
        /** Decline application with optional reason */
        AdminMarketplaceService_1.prototype.declineApplication = function (applicationId, adminId, dto) {
            return __awaiter(this, void 0, void 0, function () {
                var app;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.db.sellerApplication.findUnique({
                                where: { id: applicationId },
                            })];
                        case 1:
                            app = _a.sent();
                            if (!app)
                                throw new common_1.NotFoundException('Application not found');
                            if (app.status !== 'PENDING') {
                                throw new common_1.BadRequestException("Application is already ".concat(app.status.toLowerCase()));
                            }
                            return [4 /*yield*/, this.db.$transaction(function (tx) { return __awaiter(_this, void 0, void 0, function () {
                                    var _a;
                                    return __generator(this, function (_b) {
                                        switch (_b.label) {
                                            case 0: return [4 /*yield*/, tx.sellerApplication.update({
                                                    where: { id: applicationId },
                                                    data: {
                                                        status: 'DECLINED',
                                                        adminNote: dto.reason,
                                                        reviewedById: adminId,
                                                        reviewedAt: new Date(),
                                                    },
                                                })];
                                            case 1:
                                                _b.sent();
                                                return [4 /*yield*/, tx.dealLog.create({
                                                        data: {
                                                            adminId: adminId,
                                                            targetType: 'SELLER',
                                                            targetId: app.userId,
                                                            action: 'DECLINE_APPLICATION',
                                                            cause: (_a = dto.reason) !== null && _a !== void 0 ? _a : 'No reason provided',
                                                        },
                                                    })];
                                            case 2:
                                                _b.sent();
                                                return [2 /*return*/];
                                        }
                                    });
                                }); })];
                        case 2:
                            _a.sent();
                            return [2 /*return*/, { message: 'Application declined.' }];
                    }
                });
            });
        };
        // ════════════════════════════════════════════
        //  SELLER MANAGEMENT
        // ════════════════════════════════════════════
        /** List all sellers with their profiles */
        AdminMarketplaceService_1.prototype.listSellers = function () {
            return __awaiter(this, arguments, void 0, function (page, limit) {
                var skip, _a, sellers, total;
                if (page === void 0) { page = 1; }
                if (limit === void 0) { limit = 20; }
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            skip = (page - 1) * limit;
                            return [4 /*yield*/, Promise.all([
                                    this.db.sellerProfile.findMany({
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
                                        orderBy: { createdAt: 'desc' },
                                        skip: skip,
                                        take: limit,
                                    }),
                                    this.db.sellerProfile.count(),
                                ])];
                        case 1:
                            _a = _b.sent(), sellers = _a[0], total = _a[1];
                            return [2 /*return*/, {
                                    data: sellers.map(function (s) { return (__assign(__assign({}, s), { commercialRegNumber: '•••••••', bankAccountNumber: '•••• ' + s.bankCardLast4 })); }),
                                    total: total,
                                    page: page,
                                    limit: limit,
                                }];
                    }
                });
            });
        };
        /** Full seller detail: profile + application + current & historical deals */
        AdminMarketplaceService_1.prototype.getSellerDetail = function (sellerUserId) {
            return __awaiter(this, void 0, void 0, function () {
                var profile, application, _a, currentTxDeals, historyTxDeals, currentOrders, historyOrders, productCount, sensitiveProfile;
                var _b, _c;
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0: return [4 /*yield*/, this.db.sellerProfile.findUnique({
                                where: { userId: sellerUserId },
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
                            profile = _d.sent();
                            if (!profile)
                                throw new common_1.NotFoundException('Seller not found');
                            return [4 /*yield*/, this.db.sellerApplication.findUnique({
                                    where: { userId: sellerUserId },
                                })];
                        case 2:
                            application = _d.sent();
                            return [4 /*yield*/, Promise.all([
                                    this.db.transaction.findMany({
                                        where: {
                                            sellerId: sellerUserId,
                                            status: { in: ['PENDING', 'COMPLETED'] },
                                        },
                                        include: {
                                            product: {
                                                select: { id: true, title: true, price: true, images: true },
                                            },
                                            buyer: { select: { id: true, name: true, email: true } },
                                        },
                                        orderBy: { createdAt: 'desc' },
                                        take: 50,
                                    }),
                                    this.db.transaction.findMany({
                                        where: {
                                            sellerId: sellerUserId,
                                            status: { in: ['FAILED', 'REFUNDED', 'CANCELLED'] },
                                        },
                                        include: {
                                            product: { select: { id: true, title: true, price: true } },
                                            buyer: { select: { id: true, name: true, email: true } },
                                        },
                                        orderBy: { createdAt: 'desc' },
                                        take: 50,
                                    }),
                                    this.db.order.findMany({
                                        where: {
                                            sellerId: sellerUserId,
                                            status: { in: ['PLACED', 'SELLER_CONFIRMED', 'SHIPPED', 'RELEASE_PENDING'] },
                                        },
                                        include: {
                                            product: {
                                                select: { id: true, title: true, price: true, images: true },
                                            },
                                            buyer: { select: { id: true, name: true, email: true } },
                                            transaction: true,
                                        },
                                        orderBy: { createdAt: 'desc' },
                                        take: 50,
                                    }),
                                    this.db.order.findMany({
                                        where: {
                                            sellerId: sellerUserId,
                                            status: { in: ['COMPLETED', 'CANCELLED', 'REFUNDED', 'DISPUTED'] },
                                        },
                                        include: {
                                            product: { select: { id: true, title: true, price: true } },
                                            buyer: { select: { id: true, name: true, email: true } },
                                            transaction: true,
                                        },
                                        orderBy: { createdAt: 'desc' },
                                        take: 50,
                                    }),
                                    this.db.product.count({ where: { sellerId: sellerUserId } }),
                                ])];
                        case 3:
                            _a = _d.sent(), currentTxDeals = _a[0], historyTxDeals = _a[1], currentOrders = _a[2], historyOrders = _a[3], productCount = _a[4];
                            sensitiveProfile = {
                                commercialRegNumber: application
                                    ? (0, encryption_util_1.decrypt)(application.commercialRegNumber)
                                    : null,
                                bankAccountNumber: application
                                    ? (0, encryption_util_1.decrypt)(application.bankAccountNumber)
                                    : null,
                                idCardNumber: application ? (0, encryption_util_1.decrypt)(application.idCardNumber) : null,
                                bankCardNumberMasked: '•••• •••• •••• ' + profile.bankCardLast4,
                            };
                            return [2 /*return*/, {
                                    profile: __assign(__assign({}, profile), { commercialRegNumber: (_b = sensitiveProfile.commercialRegNumber) !== null && _b !== void 0 ? _b : '••••••', bankAccountNumber: (_c = sensitiveProfile.bankAccountNumber) !== null && _c !== void 0 ? _c : '••••' }),
                                    application: application
                                        ? __assign(__assign({}, application), { idCardNumber: sensitiveProfile.idCardNumber, commercialRegNumber: sensitiveProfile.commercialRegNumber, bankAccountNumber: sensitiveProfile.bankAccountNumber, bankCardNumber: sensitiveProfile.bankCardNumberMasked }) : null,
                                    stats: {
                                        productCount: productCount,
                                        totalDeals: currentTxDeals.length +
                                            historyTxDeals.length +
                                            currentOrders.length +
                                            historyOrders.length,
                                    },
                                    currentDeals: __spreadArray(__spreadArray([], currentTxDeals.map(function (item) { return (__assign(__assign({}, item), { flowType: 'TRANSACTION' })); }), true), currentOrders.map(function (item) { return (__assign(__assign({}, item), { flowType: 'ORDER' })); }), true).sort(function (a, b) { return b.createdAt.getTime() - a.createdAt.getTime(); }),
                                    dealHistory: __spreadArray(__spreadArray([], historyTxDeals.map(function (item) { return (__assign(__assign({}, item), { flowType: 'TRANSACTION' })); }), true), historyOrders.map(function (item) { return (__assign(__assign({}, item), { flowType: 'ORDER' })); }), true).sort(function (a, b) { return b.createdAt.getTime() - a.createdAt.getTime(); }),
                                }];
                    }
                });
            });
        };
        // ════════════════════════════════════════════
        //  SELLER STATUS ACTIONS
        // ════════════════════════════════════════════
        AdminMarketplaceService_1.prototype.findSellerProfile = function (userId) {
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
                            return [2 /*return*/, profile];
                    }
                });
            });
        };
        AdminMarketplaceService_1.prototype.banSeller = function (sellerUserId, adminId, dto) {
            return __awaiter(this, void 0, void 0, function () {
                var profile;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.findSellerProfile(sellerUserId)];
                        case 1:
                            profile = _a.sent();
                            if (profile.isBanned)
                                throw new common_1.ConflictException('Seller is already banned');
                            return [4 /*yield*/, this.db.$transaction(function (tx) { return __awaiter(_this, void 0, void 0, function () {
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0: return [4 /*yield*/, tx.sellerProfile.update({
                                                    where: { userId: sellerUserId },
                                                    data: { isBanned: true, banReason: dto.cause, bannedAt: new Date() },
                                                })];
                                            case 1:
                                                _a.sent();
                                                return [4 /*yield*/, tx.user.update({
                                                        where: { id: sellerUserId },
                                                        data: { isBanned: true, banReason: dto.cause },
                                                    })];
                                            case 2:
                                                _a.sent();
                                                return [4 /*yield*/, tx.dealLog.create({
                                                        data: {
                                                            adminId: adminId,
                                                            targetType: 'SELLER',
                                                            targetId: sellerUserId,
                                                            action: 'BAN_SELLER',
                                                            cause: dto.cause,
                                                        },
                                                    })];
                                            case 3:
                                                _a.sent();
                                                return [2 /*return*/];
                                        }
                                    });
                                }); })];
                        case 2:
                            _a.sent();
                            return [2 /*return*/, { message: 'Seller banned successfully.' }];
                    }
                });
            });
        };
        AdminMarketplaceService_1.prototype.unbanSeller = function (sellerUserId, adminId) {
            return __awaiter(this, void 0, void 0, function () {
                var profile;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.findSellerProfile(sellerUserId)];
                        case 1:
                            profile = _a.sent();
                            if (!profile.isBanned)
                                throw new common_1.ConflictException('Seller is not banned');
                            return [4 /*yield*/, this.db.$transaction(function (tx) { return __awaiter(_this, void 0, void 0, function () {
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0: return [4 /*yield*/, tx.sellerProfile.update({
                                                    where: { userId: sellerUserId },
                                                    data: { isBanned: false, banReason: null, bannedAt: null },
                                                })];
                                            case 1:
                                                _a.sent();
                                                return [4 /*yield*/, tx.user.update({
                                                        where: { id: sellerUserId },
                                                        data: { isBanned: false, banReason: null },
                                                    })];
                                            case 2:
                                                _a.sent();
                                                return [4 /*yield*/, tx.dealLog.create({
                                                        data: {
                                                            adminId: adminId,
                                                            targetType: 'SELLER',
                                                            targetId: sellerUserId,
                                                            action: 'UNBAN_SELLER',
                                                            cause: 'Ban lifted by admin',
                                                        },
                                                    })];
                                            case 3:
                                                _a.sent();
                                                return [2 /*return*/];
                                        }
                                    });
                                }); })];
                        case 2:
                            _a.sent();
                            return [2 /*return*/, { message: 'Seller unbanned successfully.' }];
                    }
                });
            });
        };
        AdminMarketplaceService_1.prototype.suspendSeller = function (sellerUserId, adminId, dto) {
            return __awaiter(this, void 0, void 0, function () {
                var profile;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.findSellerProfile(sellerUserId)];
                        case 1:
                            profile = _a.sent();
                            if (profile.isSuspended)
                                throw new common_1.ConflictException('Seller is already suspended');
                            return [4 /*yield*/, this.db.$transaction(function (tx) { return __awaiter(_this, void 0, void 0, function () {
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0: return [4 /*yield*/, tx.sellerProfile.update({
                                                    where: { userId: sellerUserId },
                                                    data: {
                                                        isSuspended: true,
                                                        suspendReason: dto.cause,
                                                        suspendedAt: new Date(),
                                                    },
                                                })];
                                            case 1:
                                                _a.sent();
                                                return [4 /*yield*/, tx.dealLog.create({
                                                        data: {
                                                            adminId: adminId,
                                                            targetType: 'SELLER',
                                                            targetId: sellerUserId,
                                                            action: 'SUSPEND_SELLER',
                                                            cause: dto.cause,
                                                        },
                                                    })];
                                            case 2:
                                                _a.sent();
                                                return [2 /*return*/];
                                        }
                                    });
                                }); })];
                        case 2:
                            _a.sent();
                            return [2 /*return*/, { message: 'Seller suspended.' }];
                    }
                });
            });
        };
        AdminMarketplaceService_1.prototype.unsuspendSeller = function (sellerUserId, adminId) {
            return __awaiter(this, void 0, void 0, function () {
                var profile;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.findSellerProfile(sellerUserId)];
                        case 1:
                            profile = _a.sent();
                            if (!profile.isSuspended)
                                throw new common_1.ConflictException('Seller is not suspended');
                            return [4 /*yield*/, this.db.$transaction(function (tx) { return __awaiter(_this, void 0, void 0, function () {
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0: return [4 /*yield*/, tx.sellerProfile.update({
                                                    where: { userId: sellerUserId },
                                                    data: { isSuspended: false, suspendReason: null, suspendedAt: null },
                                                })];
                                            case 1:
                                                _a.sent();
                                                return [4 /*yield*/, tx.dealLog.create({
                                                        data: {
                                                            adminId: adminId,
                                                            targetType: 'SELLER',
                                                            targetId: sellerUserId,
                                                            action: 'UNSUSPEND_SELLER',
                                                            cause: 'Suspension lifted by admin',
                                                        },
                                                    })];
                                            case 2:
                                                _a.sent();
                                                return [2 /*return*/];
                                        }
                                    });
                                }); })];
                        case 2:
                            _a.sent();
                            return [2 /*return*/, { message: 'Seller suspension lifted.' }];
                    }
                });
            });
        };
        // ════════════════════════════════════════════
        //  DEAL MANAGEMENT
        // ════════════════════════════════════════════
        AdminMarketplaceService_1.prototype.listOrders = function (query) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.orderService.listAdminOrders(query)];
                });
            });
        };
        AdminMarketplaceService_1.prototype.getOrderDetail = function (orderId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.orderService.getAdminOrderDetail(orderId)];
                });
            });
        };
        AdminMarketplaceService_1.prototype.resolveDispute = function (adminId, orderId, dto) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.orderService.resolveDispute(adminId, orderId, dto)];
                });
            });
        };
        AdminMarketplaceService_1.prototype.forceRelease = function (adminId, orderId, dto) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.orderService.forceRelease(adminId, orderId, dto.reason)];
                });
            });
        };
        AdminMarketplaceService_1.prototype.forceRefund = function (adminId, orderId, dto) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.orderService.forceRefund(adminId, orderId, dto.reason)];
                });
            });
        };
        AdminMarketplaceService_1.prototype.cancelDeal = function (transactionId, adminId, dto) {
            return __awaiter(this, void 0, void 0, function () {
                var tx, updatedOrder;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.db.transaction.findUnique({
                                where: { id: transactionId },
                                include: { product: true, order: true },
                            })];
                        case 1:
                            tx = _a.sent();
                            if (!tx)
                                throw new common_1.NotFoundException('Transaction not found');
                            if (!(tx.orderId && tx.order)) return [3 /*break*/, 3];
                            return [4 /*yield*/, this.orderService.forceRefund(adminId, tx.orderId, dto.cause)];
                        case 2:
                            updatedOrder = _a.sent();
                            return [2 /*return*/, {
                                    message: 'Deal cancelled via order escrow flow.',
                                    order: updatedOrder,
                                }];
                        case 3:
                            if (tx.status === 'CANCELLED')
                                throw new common_1.ConflictException('Deal is already cancelled');
                            if (tx.status !== 'PENDING' && tx.status !== 'COMPLETED') {
                                throw new common_1.BadRequestException('Only PENDING or COMPLETED deals can be cancelled');
                            }
                            return [4 /*yield*/, this.db.$transaction(function (prisma) { return __awaiter(_this, void 0, void 0, function () {
                                    var restoredQuantity;
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0: 
                                            // Mark transaction cancelled
                                            return [4 /*yield*/, prisma.transaction.update({
                                                    where: { id: transactionId },
                                                    data: { status: 'CANCELLED' },
                                                })];
                                            case 1:
                                                // Mark transaction cancelled
                                                _a.sent();
                                                if (!tx.product) return [3 /*break*/, 3];
                                                restoredQuantity = tx.product.quantity + 1;
                                                return [4 /*yield*/, prisma.product.update({
                                                        where: { id: tx.productId },
                                                        data: {
                                                            quantity: restoredQuantity,
                                                            status: tx.product.status === 'SOLD' ? 'ACTIVE' : tx.product.status,
                                                        },
                                                    })];
                                            case 2:
                                                _a.sent();
                                                _a.label = 3;
                                            case 3: 
                                            // Audit log
                                            return [4 /*yield*/, prisma.dealLog.create({
                                                    data: {
                                                        adminId: adminId,
                                                        targetType: 'TRANSACTION',
                                                        targetId: transactionId,
                                                        action: 'CANCEL_DEAL',
                                                        cause: dto.cause,
                                                    },
                                                })];
                                            case 4:
                                                // Audit log
                                                _a.sent();
                                                return [2 /*return*/];
                                        }
                                    });
                                }); })];
                        case 4:
                            _a.sent();
                            return [2 /*return*/, { message: 'Deal cancelled and inventory restored.' }];
                    }
                });
            });
        };
        // ════════════════════════════════════════════
        //  AUDIT LOGS
        // ════════════════════════════════════════════
        AdminMarketplaceService_1.prototype.getAuditLogs = function () {
            return __awaiter(this, arguments, void 0, function (page, limit) {
                var skip, _a, logs, total;
                if (page === void 0) { page = 1; }
                if (limit === void 0) { limit = 50; }
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            skip = (page - 1) * limit;
                            return [4 /*yield*/, Promise.all([
                                    this.db.dealLog.findMany({
                                        include: {
                                            admin: { select: { id: true, name: true, email: true } },
                                        },
                                        orderBy: { createdAt: 'desc' },
                                        skip: skip,
                                        take: limit,
                                    }),
                                    this.db.dealLog.count(),
                                ])];
                        case 1:
                            _a = _b.sent(), logs = _a[0], total = _a[1];
                            return [2 /*return*/, { data: logs, total: total, page: page, limit: limit }];
                    }
                });
            });
        };
        return AdminMarketplaceService_1;
    }());
    __setFunctionName(_classThis, "AdminMarketplaceService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        AdminMarketplaceService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return AdminMarketplaceService = _classThis;
}();
exports.AdminMarketplaceService = AdminMarketplaceService;
