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
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderService = void 0;
var common_1 = require("@nestjs/common");
var RELEASE_HOLD_MS = 3 * 24 * 60 * 60 * 1000;
var OrderService = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var OrderService = _classThis = /** @class */ (function () {
        function OrderService_1(db, cloudinary, orderReleaseQueue) {
            this.db = db;
            this.cloudinary = cloudinary;
            this.orderReleaseQueue = orderReleaseQueue;
        }
        OrderService_1.prototype.buildOrderNumber = function () {
            var rand = Math.random().toString(36).slice(2, 8).toUpperCase();
            return "ORD-".concat(Date.now(), "-").concat(rand);
        };
        OrderService_1.prototype.buildReleaseJobId = function (orderId) {
            return "order-release:".concat(orderId);
        };
        OrderService_1.prototype.removeReleaseJob = function (orderId) {
            return __awaiter(this, void 0, void 0, function () {
                var job;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.orderReleaseQueue.getJob(this.buildReleaseJobId(orderId))];
                        case 1:
                            job = _a.sent();
                            if (!job) return [3 /*break*/, 3];
                            return [4 /*yield*/, job.remove()];
                        case 2:
                            _a.sent();
                            _a.label = 3;
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        OrderService_1.prototype.scheduleReleaseJob = function (orderId, releaseAt) {
            return __awaiter(this, void 0, void 0, function () {
                var delay;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            delay = Math.max(0, releaseAt.getTime() - Date.now());
                            return [4 /*yield*/, this.orderReleaseQueue.add('release-funds', { orderId: orderId }, {
                                    delay: delay,
                                    jobId: this.buildReleaseJobId(orderId),
                                    removeOnComplete: true,
                                    removeOnFail: true,
                                })];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        OrderService_1.prototype.createOrderFromPurchase = function (tx, buyerId, product) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, tx.order.create({
                            data: {
                                orderNumber: this.buildOrderNumber(),
                                buyerId: buyerId,
                                sellerId: product.sellerId,
                                productId: product.id,
                                quantity: 1,
                                unitPrice: product.price,
                                currency: product.currency,
                                totalAmount: product.price,
                                escrowAmount: product.price,
                                escrowStatus: 'HELD',
                                status: 'PLACED',
                            },
                        })];
                });
            });
        };
        OrderService_1.prototype.listBuyerOrders = function (buyerId, query) {
            return __awaiter(this, void 0, void 0, function () {
                var status, _a, page, _b, limit, skip, where, _c, data, total;
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0:
                            status = query.status, _a = query.page, page = _a === void 0 ? 1 : _a, _b = query.limit, limit = _b === void 0 ? 20 : _b;
                            skip = (page - 1) * limit;
                            where = { buyerId: buyerId };
                            if (status) {
                                where.status = status;
                            }
                            return [4 /*yield*/, Promise.all([
                                    this.db.order.findMany({
                                        where: where,
                                        include: {
                                            product: { select: { id: true, title: true, images: true } },
                                            seller: { select: { id: true, name: true, image: true } },
                                            transaction: true,
                                        },
                                        orderBy: { createdAt: 'desc' },
                                        skip: skip,
                                        take: limit,
                                    }),
                                    this.db.order.count({ where: where }),
                                ])];
                        case 1:
                            _c = _d.sent(), data = _c[0], total = _c[1];
                            return [2 /*return*/, { data: data, total: total, page: page, limit: limit }];
                    }
                });
            });
        };
        OrderService_1.prototype.getBuyerOrderDetail = function (buyerId, orderId) {
            return __awaiter(this, void 0, void 0, function () {
                var order;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.db.order.findUnique({
                                where: { id: orderId },
                                include: {
                                    product: true,
                                    seller: { select: { id: true, name: true, image: true } },
                                    buyer: { select: { id: true, name: true, email: true, image: true } },
                                    transaction: true,
                                },
                            })];
                        case 1:
                            order = _a.sent();
                            if (!order)
                                throw new common_1.NotFoundException('Order not found');
                            if (order.buyerId !== buyerId) {
                                throw new common_1.ForbiddenException('You can only view your own orders');
                            }
                            return [2 /*return*/, order];
                    }
                });
            });
        };
        OrderService_1.prototype.listSellerOrders = function (sellerId, query) {
            return __awaiter(this, void 0, void 0, function () {
                var status, _a, page, _b, limit, skip, where, _c, data, total;
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0:
                            status = query.status, _a = query.page, page = _a === void 0 ? 1 : _a, _b = query.limit, limit = _b === void 0 ? 20 : _b;
                            skip = (page - 1) * limit;
                            where = { sellerId: sellerId };
                            if (status) {
                                where.status = status;
                            }
                            return [4 /*yield*/, Promise.all([
                                    this.db.order.findMany({
                                        where: where,
                                        include: {
                                            product: { select: { id: true, title: true, images: true } },
                                            buyer: { select: { id: true, name: true, email: true, image: true } },
                                            transaction: true,
                                        },
                                        orderBy: { createdAt: 'desc' },
                                        skip: skip,
                                        take: limit,
                                    }),
                                    this.db.order.count({ where: where }),
                                ])];
                        case 1:
                            _c = _d.sent(), data = _c[0], total = _c[1];
                            return [2 /*return*/, { data: data, total: total, page: page, limit: limit }];
                    }
                });
            });
        };
        OrderService_1.prototype.getSellerOrderDetail = function (sellerId, orderId) {
            return __awaiter(this, void 0, void 0, function () {
                var order;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.db.order.findUnique({
                                where: { id: orderId },
                                include: {
                                    product: true,
                                    seller: { select: { id: true, name: true, image: true } },
                                    buyer: { select: { id: true, name: true, email: true, image: true } },
                                    transaction: true,
                                },
                            })];
                        case 1:
                            order = _a.sent();
                            if (!order)
                                throw new common_1.NotFoundException('Order not found');
                            if (order.sellerId !== sellerId) {
                                throw new common_1.ForbiddenException('You can only view your own orders');
                            }
                            return [2 /*return*/, order];
                    }
                });
            });
        };
        OrderService_1.prototype.listAdminOrders = function (query) {
            return __awaiter(this, void 0, void 0, function () {
                var status, _a, page, _b, limit, skip, where, _c, data, total;
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0:
                            status = query.status, _a = query.page, page = _a === void 0 ? 1 : _a, _b = query.limit, limit = _b === void 0 ? 20 : _b;
                            skip = (page - 1) * limit;
                            where = {};
                            if (status) {
                                where.status = status;
                            }
                            return [4 /*yield*/, Promise.all([
                                    this.db.order.findMany({
                                        where: where,
                                        include: {
                                            product: true,
                                            seller: { select: { id: true, name: true, email: true, image: true } },
                                            buyer: { select: { id: true, name: true, email: true, image: true } },
                                            transaction: true,
                                        },
                                        orderBy: { createdAt: 'desc' },
                                        skip: skip,
                                        take: limit,
                                    }),
                                    this.db.order.count({ where: where }),
                                ])];
                        case 1:
                            _c = _d.sent(), data = _c[0], total = _c[1];
                            return [2 /*return*/, { data: data, total: total, page: page, limit: limit }];
                    }
                });
            });
        };
        OrderService_1.prototype.getAdminOrderDetail = function (orderId) {
            return __awaiter(this, void 0, void 0, function () {
                var order;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.db.order.findUnique({
                                where: { id: orderId },
                                include: {
                                    product: true,
                                    seller: { select: { id: true, name: true, email: true, image: true } },
                                    buyer: { select: { id: true, name: true, email: true, image: true } },
                                    transaction: true,
                                },
                            })];
                        case 1:
                            order = _a.sent();
                            if (!order)
                                throw new common_1.NotFoundException('Order not found');
                            return [2 /*return*/, order];
                    }
                });
            });
        };
        OrderService_1.prototype.confirmShipment = function (sellerId, orderId, dto, proofFile) {
            return __awaiter(this, void 0, void 0, function () {
                var order, proofUrl, updated;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!proofFile) {
                                throw new common_1.BadRequestException('Shipment proof image is required');
                            }
                            return [4 /*yield*/, this.db.order.findUnique({ where: { id: orderId } })];
                        case 1:
                            order = _a.sent();
                            if (!order)
                                throw new common_1.NotFoundException('Order not found');
                            if (order.sellerId !== sellerId) {
                                throw new common_1.ForbiddenException('You can only update your own orders');
                            }
                            if (order.status !== 'PLACED') {
                                throw new common_1.BadRequestException('Only placed orders can be shipped');
                            }
                            return [4 /*yield*/, this.cloudinary.uploadOrderProof(proofFile, orderId, sellerId, 'shipment')];
                        case 2:
                            proofUrl = _a.sent();
                            return [4 /*yield*/, this.db.$transaction(function (tx) { return __awaiter(_this, void 0, void 0, function () {
                                    var saved;
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0: return [4 /*yield*/, tx.order.update({
                                                    where: { id: orderId },
                                                    data: {
                                                        status: 'SHIPPED',
                                                        shipmentTrackingNumber: dto.shipmentTrackingNumber,
                                                        shipmentCarrier: dto.shipmentCarrier,
                                                        shipmentProofImageUrl: proofUrl,
                                                        shippedAt: new Date(),
                                                    },
                                                })];
                                            case 1:
                                                saved = _a.sent();
                                                return [4 /*yield*/, tx.dealLog.create({
                                                        data: {
                                                            adminId: sellerId,
                                                            targetType: 'ORDER',
                                                            targetId: orderId,
                                                            action: 'CONFIRM_SHIPMENT',
                                                            cause: "Shipment confirmed by seller with tracking ".concat(dto.shipmentTrackingNumber),
                                                        },
                                                    })];
                                            case 2:
                                                _a.sent();
                                                return [2 /*return*/, saved];
                                        }
                                    });
                                }); })];
                        case 3:
                            updated = _a.sent();
                            return [2 /*return*/, updated];
                    }
                });
            });
        };
        OrderService_1.prototype.confirmDelivery = function (buyerId, orderId, proofFile) {
            return __awaiter(this, void 0, void 0, function () {
                var order, proofUrl, now, releaseAt, updated;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!proofFile) {
                                throw new common_1.BadRequestException('Delivery proof image is required');
                            }
                            return [4 /*yield*/, this.db.order.findUnique({ where: { id: orderId } })];
                        case 1:
                            order = _a.sent();
                            if (!order)
                                throw new common_1.NotFoundException('Order not found');
                            if (order.buyerId !== buyerId) {
                                throw new common_1.ForbiddenException('You can only confirm your own orders');
                            }
                            if (order.status !== 'SHIPPED') {
                                throw new common_1.BadRequestException('Only shipped orders can be confirmed as delivered');
                            }
                            return [4 /*yield*/, this.cloudinary.uploadOrderProof(proofFile, orderId, buyerId, 'delivery')];
                        case 2:
                            proofUrl = _a.sent();
                            now = new Date();
                            releaseAt = new Date(now.getTime() + RELEASE_HOLD_MS);
                            return [4 /*yield*/, this.db.$transaction(function (tx) { return __awaiter(_this, void 0, void 0, function () {
                                    var saved;
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0: return [4 /*yield*/, tx.order.update({
                                                    where: { id: orderId },
                                                    data: {
                                                        status: 'RELEASE_PENDING',
                                                        deliveryProofImageUrl: proofUrl,
                                                        deliveredAt: now,
                                                        buyerConfirmedAt: now,
                                                        releaseScheduledAt: releaseAt,
                                                    },
                                                })];
                                            case 1:
                                                saved = _a.sent();
                                                return [4 /*yield*/, tx.dealLog.create({
                                                        data: {
                                                            adminId: buyerId,
                                                            targetType: 'ORDER',
                                                            targetId: orderId,
                                                            action: 'CONFIRM_DELIVERY',
                                                            cause: 'Buyer confirmed delivery and release hold started',
                                                        },
                                                    })];
                                            case 2:
                                                _a.sent();
                                                return [2 /*return*/, saved];
                                        }
                                    });
                                }); })];
                        case 3:
                            updated = _a.sent();
                            return [4 /*yield*/, this.scheduleReleaseJob(orderId, releaseAt)];
                        case 4:
                            _a.sent();
                            return [2 /*return*/, updated];
                    }
                });
            });
        };
        OrderService_1.prototype.cancelOrder = function (buyerId, orderId, dto) {
            return __awaiter(this, void 0, void 0, function () {
                var order, updated;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.db.order.findUnique({
                                where: { id: orderId },
                                include: { product: true, transaction: true },
                            })];
                        case 1:
                            order = _a.sent();
                            if (!order)
                                throw new common_1.NotFoundException('Order not found');
                            if (order.buyerId !== buyerId) {
                                throw new common_1.ForbiddenException('You can only cancel your own orders');
                            }
                            if (order.status !== 'PLACED') {
                                throw new common_1.BadRequestException('Only placed orders can be cancelled');
                            }
                            return [4 /*yield*/, this.removeReleaseJob(orderId)];
                        case 2:
                            _a.sent();
                            return [4 /*yield*/, this.db.$transaction(function (tx) { return __awaiter(_this, void 0, void 0, function () {
                                    var saved;
                                    var _a;
                                    return __generator(this, function (_b) {
                                        switch (_b.label) {
                                            case 0: return [4 /*yield*/, tx.order.update({
                                                    where: { id: orderId },
                                                    data: {
                                                        status: 'CANCELLED',
                                                        escrowStatus: 'REFUNDED',
                                                        cancelledAt: new Date(),
                                                        cancelReason: (_a = dto.cancelReason) !== null && _a !== void 0 ? _a : 'Cancelled by buyer',
                                                    },
                                                })];
                                            case 1:
                                                saved = _b.sent();
                                                return [4 /*yield*/, tx.product.update({
                                                        where: { id: order.productId },
                                                        data: {
                                                            quantity: { increment: order.quantity },
                                                            status: 'ACTIVE',
                                                        },
                                                    })];
                                            case 2:
                                                _b.sent();
                                                if (!order.transaction) return [3 /*break*/, 4];
                                                return [4 /*yield*/, tx.transaction.update({
                                                        where: { id: order.transaction.id },
                                                        data: { status: 'CANCELLED' },
                                                    })];
                                            case 3:
                                                _b.sent();
                                                _b.label = 4;
                                            case 4: return [2 /*return*/, saved];
                                        }
                                    });
                                }); })];
                        case 3:
                            updated = _a.sent();
                            return [2 /*return*/, updated];
                    }
                });
            });
        };
        OrderService_1.prototype.openDispute = function (buyerId, orderId, dto) {
            return __awaiter(this, void 0, void 0, function () {
                var order, allowed, updated;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.db.order.findUnique({ where: { id: orderId } })];
                        case 1:
                            order = _a.sent();
                            if (!order)
                                throw new common_1.NotFoundException('Order not found');
                            if (order.buyerId !== buyerId) {
                                throw new common_1.ForbiddenException('You can only dispute your own orders');
                            }
                            allowed = [
                                'SELLER_CONFIRMED',
                                'SHIPPED',
                                'DELIVERED',
                                'RELEASE_PENDING',
                            ];
                            if (!allowed.includes(order.status)) {
                                throw new common_1.BadRequestException('This order cannot be disputed in its current state');
                            }
                            return [4 /*yield*/, this.removeReleaseJob(orderId)];
                        case 2:
                            _a.sent();
                            return [4 /*yield*/, this.db.$transaction(function (tx) { return __awaiter(_this, void 0, void 0, function () {
                                    var saved;
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0: return [4 /*yield*/, tx.order.update({
                                                    where: { id: orderId },
                                                    data: {
                                                        status: 'DISPUTED',
                                                        disputeReason: dto.disputeReason,
                                                        disputeOpenedAt: new Date(),
                                                    },
                                                })];
                                            case 1:
                                                saved = _a.sent();
                                                return [4 /*yield*/, tx.dealLog.create({
                                                        data: {
                                                            adminId: buyerId,
                                                            targetType: 'ORDER',
                                                            targetId: orderId,
                                                            action: 'OPEN_DISPUTE',
                                                            cause: dto.disputeReason,
                                                        },
                                                    })];
                                            case 2:
                                                _a.sent();
                                                return [2 /*return*/, saved];
                                        }
                                    });
                                }); })];
                        case 3:
                            updated = _a.sent();
                            return [2 /*return*/, updated];
                    }
                });
            });
        };
        OrderService_1.prototype.resolveDispute = function (adminId, orderId, dto) {
            return __awaiter(this, void 0, void 0, function () {
                var order, now;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.db.order.findUnique({
                                where: { id: orderId },
                                include: { transaction: true },
                            })];
                        case 1:
                            order = _a.sent();
                            if (!order)
                                throw new common_1.NotFoundException('Order not found');
                            if (order.status !== 'DISPUTED') {
                                throw new common_1.BadRequestException('Only disputed orders can be resolved');
                            }
                            return [4 /*yield*/, this.removeReleaseJob(orderId)];
                        case 2:
                            _a.sent();
                            now = new Date();
                            if (dto.resolution === 'REFUND') {
                                return [2 /*return*/, this.db.$transaction(function (tx) { return __awaiter(_this, void 0, void 0, function () {
                                        var saved;
                                        var _a, _b;
                                        return __generator(this, function (_c) {
                                            switch (_c.label) {
                                                case 0: return [4 /*yield*/, tx.order.update({
                                                        where: { id: orderId },
                                                        data: {
                                                            status: 'REFUNDED',
                                                            escrowStatus: 'REFUNDED',
                                                            disputeResolvedAt: now,
                                                            disputeResolution: (_a = dto.adminNote) !== null && _a !== void 0 ? _a : 'Refund approved by admin',
                                                            disputeResolvedById: adminId,
                                                        },
                                                    })];
                                                case 1:
                                                    saved = _c.sent();
                                                    if (!order.transaction) return [3 /*break*/, 3];
                                                    return [4 /*yield*/, tx.transaction.update({
                                                            where: { id: order.transaction.id },
                                                            data: { status: 'REFUNDED' },
                                                        })];
                                                case 2:
                                                    _c.sent();
                                                    _c.label = 3;
                                                case 3: return [4 /*yield*/, tx.dealLog.create({
                                                        data: {
                                                            adminId: adminId,
                                                            targetType: 'ORDER',
                                                            targetId: orderId,
                                                            action: 'RESOLVE_DISPUTE',
                                                            cause: (_b = dto.adminNote) !== null && _b !== void 0 ? _b : 'Resolved as REFUND',
                                                        },
                                                    })];
                                                case 4:
                                                    _c.sent();
                                                    return [2 /*return*/, saved];
                                            }
                                        });
                                    }); })];
                            }
                            return [2 /*return*/, this.db.$transaction(function (tx) { return __awaiter(_this, void 0, void 0, function () {
                                    var saved;
                                    var _a, _b;
                                    return __generator(this, function (_c) {
                                        switch (_c.label) {
                                            case 0: return [4 /*yield*/, tx.order.update({
                                                    where: { id: orderId },
                                                    data: {
                                                        status: 'COMPLETED',
                                                        escrowStatus: 'RELEASED',
                                                        releasedAt: now,
                                                        disputeResolvedAt: now,
                                                        disputeResolution: (_a = dto.adminNote) !== null && _a !== void 0 ? _a : 'Release approved by admin',
                                                        disputeResolvedById: adminId,
                                                    },
                                                })];
                                            case 1:
                                                saved = _c.sent();
                                                if (!order.transaction) return [3 /*break*/, 3];
                                                return [4 /*yield*/, tx.transaction.update({
                                                        where: { id: order.transaction.id },
                                                        data: { status: 'COMPLETED' },
                                                    })];
                                            case 2:
                                                _c.sent();
                                                _c.label = 3;
                                            case 3: return [4 /*yield*/, tx.dealLog.create({
                                                    data: {
                                                        adminId: adminId,
                                                        targetType: 'ORDER',
                                                        targetId: orderId,
                                                        action: 'RESOLVE_DISPUTE',
                                                        cause: (_b = dto.adminNote) !== null && _b !== void 0 ? _b : 'Resolved as RELEASE',
                                                    },
                                                })];
                                            case 4:
                                                _c.sent();
                                                return [2 /*return*/, saved];
                                        }
                                    });
                                }); })];
                    }
                });
            });
        };
        OrderService_1.prototype.forceRelease = function (adminId, orderId, note) {
            return __awaiter(this, void 0, void 0, function () {
                var order, now;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.db.order.findUnique({
                                where: { id: orderId },
                                include: { transaction: true },
                            })];
                        case 1:
                            order = _a.sent();
                            if (!order)
                                throw new common_1.NotFoundException('Order not found');
                            if (['COMPLETED', 'CANCELLED', 'REFUNDED'].includes(order.status)) {
                                throw new common_1.BadRequestException('Order is already final and cannot be force released');
                            }
                            return [4 /*yield*/, this.removeReleaseJob(orderId)];
                        case 2:
                            _a.sent();
                            now = new Date();
                            return [2 /*return*/, this.db.$transaction(function (tx) { return __awaiter(_this, void 0, void 0, function () {
                                    var saved;
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0: return [4 /*yield*/, tx.order.update({
                                                    where: { id: orderId },
                                                    data: {
                                                        status: 'COMPLETED',
                                                        escrowStatus: 'RELEASED',
                                                        releasedAt: now,
                                                        disputeResolvedAt: order.status === 'DISPUTED' ? now : order.disputeResolvedAt,
                                                        disputeResolution: order.status === 'DISPUTED' ? (note !== null && note !== void 0 ? note : 'Force release by admin') : order.disputeResolution,
                                                        disputeResolvedById: order.status === 'DISPUTED' ? adminId : order.disputeResolvedById,
                                                    },
                                                })];
                                            case 1:
                                                saved = _a.sent();
                                                if (!order.transaction) return [3 /*break*/, 3];
                                                return [4 /*yield*/, tx.transaction.update({
                                                        where: { id: order.transaction.id },
                                                        data: { status: 'COMPLETED' },
                                                    })];
                                            case 2:
                                                _a.sent();
                                                _a.label = 3;
                                            case 3: return [4 /*yield*/, tx.dealLog.create({
                                                    data: {
                                                        adminId: adminId,
                                                        targetType: 'ORDER',
                                                        targetId: orderId,
                                                        action: 'RELEASE_FUNDS',
                                                        cause: note !== null && note !== void 0 ? note : 'Force release by admin',
                                                    },
                                                })];
                                            case 4:
                                                _a.sent();
                                                return [2 /*return*/, saved];
                                        }
                                    });
                                }); })];
                    }
                });
            });
        };
        OrderService_1.prototype.forceRefund = function (adminId, orderId, note) {
            return __awaiter(this, void 0, void 0, function () {
                var order, now;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.db.order.findUnique({
                                where: { id: orderId },
                                include: { transaction: true, product: true },
                            })];
                        case 1:
                            order = _a.sent();
                            if (!order)
                                throw new common_1.NotFoundException('Order not found');
                            if (['COMPLETED', 'CANCELLED', 'REFUNDED'].includes(order.status)) {
                                throw new common_1.BadRequestException('Order is already final and cannot be force refunded');
                            }
                            return [4 /*yield*/, this.removeReleaseJob(orderId)];
                        case 2:
                            _a.sent();
                            now = new Date();
                            return [2 /*return*/, this.db.$transaction(function (tx) { return __awaiter(_this, void 0, void 0, function () {
                                    var saved;
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0: return [4 /*yield*/, tx.order.update({
                                                    where: { id: orderId },
                                                    data: {
                                                        status: 'REFUNDED',
                                                        escrowStatus: 'REFUNDED',
                                                        disputeResolvedAt: order.status === 'DISPUTED' ? now : order.disputeResolvedAt,
                                                        disputeResolution: order.status === 'DISPUTED' ? (note !== null && note !== void 0 ? note : 'Force refund by admin') : order.disputeResolution,
                                                        disputeResolvedById: order.status === 'DISPUTED' ? adminId : order.disputeResolvedById,
                                                    },
                                                })];
                                            case 1:
                                                saved = _a.sent();
                                                if (!(order.status === 'PLACED')) return [3 /*break*/, 3];
                                                return [4 /*yield*/, tx.product.update({
                                                        where: { id: order.productId },
                                                        data: {
                                                            quantity: { increment: order.quantity },
                                                            status: 'ACTIVE',
                                                        },
                                                    })];
                                            case 2:
                                                _a.sent();
                                                _a.label = 3;
                                            case 3:
                                                if (!order.transaction) return [3 /*break*/, 5];
                                                return [4 /*yield*/, tx.transaction.update({
                                                        where: { id: order.transaction.id },
                                                        data: { status: 'REFUNDED' },
                                                    })];
                                            case 4:
                                                _a.sent();
                                                _a.label = 5;
                                            case 5: return [4 /*yield*/, tx.dealLog.create({
                                                    data: {
                                                        adminId: adminId,
                                                        targetType: 'ORDER',
                                                        targetId: orderId,
                                                        action: 'RESOLVE_DISPUTE',
                                                        cause: note !== null && note !== void 0 ? note : 'Force refund by admin',
                                                    },
                                                })];
                                            case 6:
                                                _a.sent();
                                                return [2 /*return*/, saved];
                                        }
                                    });
                                }); })];
                    }
                });
            });
        };
        OrderService_1.prototype.releaseFundsFromJob = function (orderId) {
            return __awaiter(this, void 0, void 0, function () {
                var order, now;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.db.order.findUnique({
                                where: { id: orderId },
                                include: { transaction: true },
                            })];
                        case 1:
                            order = _a.sent();
                            if (!order) {
                                return [2 /*return*/, { skipped: true, reason: 'Order not found' }];
                            }
                            if (order.status !== 'RELEASE_PENDING') {
                                return [2 /*return*/, { skipped: true, reason: "Order status is ".concat(order.status) }];
                            }
                            now = new Date();
                            return [4 /*yield*/, this.db.$transaction(function (tx) { return __awaiter(_this, void 0, void 0, function () {
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0: return [4 /*yield*/, tx.order.update({
                                                    where: { id: orderId },
                                                    data: {
                                                        status: 'COMPLETED',
                                                        escrowStatus: 'RELEASED',
                                                        releasedAt: now,
                                                    },
                                                })];
                                            case 1:
                                                _a.sent();
                                                if (!order.transaction) return [3 /*break*/, 3];
                                                return [4 /*yield*/, tx.transaction.update({
                                                        where: { id: order.transaction.id },
                                                        data: { status: 'COMPLETED' },
                                                    })];
                                            case 2:
                                                _a.sent();
                                                _a.label = 3;
                                            case 3: return [4 /*yield*/, tx.dealLog.create({
                                                    data: {
                                                        adminId: order.sellerId,
                                                        targetType: 'ORDER',
                                                        targetId: orderId,
                                                        action: 'AUTO_RELEASE_FUNDS',
                                                        cause: 'Escrow auto-release executed after 3-day hold',
                                                    },
                                                })];
                                            case 4:
                                                _a.sent();
                                                return [2 /*return*/];
                                        }
                                    });
                                }); })];
                        case 2:
                            _a.sent();
                            return [2 /*return*/, { skipped: false, released: true }];
                    }
                });
            });
        };
        return OrderService_1;
    }());
    __setFunctionName(_classThis, "OrderService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        OrderService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return OrderService = _classThis;
}();
exports.OrderService = OrderService;
