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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductService = void 0;
var common_1 = require("@nestjs/common");
var ProductService = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var ProductService = _classThis = /** @class */ (function () {
        function ProductService_1(db, orderService) {
            this.db = db;
            this.orderService = orderService;
        }
        /** CREATE — seller only (guard upstream) */
        ProductService_1.prototype.createProduct = function (sellerId, dto) {
            return __awaiter(this, void 0, void 0, function () {
                var _a, _b;
                return __generator(this, function (_c) {
                    return [2 /*return*/, this.db.product.create({
                            data: {
                                title: dto.title,
                                description: dto.description,
                                price: dto.price,
                                currency: (_a = dto.currency) !== null && _a !== void 0 ? _a : 'USD',
                                quantity: dto.quantity,
                                categoryId: dto.categoryId,
                                images: (_b = dto.images) !== null && _b !== void 0 ? _b : [],
                                sellerId: sellerId,
                            },
                        })];
                });
            });
        };
        /** LIST public products with filters and pagination */
        ProductService_1.prototype.getProducts = function (query) {
            return __awaiter(this, void 0, void 0, function () {
                var categoryId, search, minPrice, maxPrice, _a, page, _b, limit, skip, where, _c, products, total;
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0:
                            categoryId = query.categoryId, search = query.search, minPrice = query.minPrice, maxPrice = query.maxPrice, _a = query.page, page = _a === void 0 ? 1 : _a, _b = query.limit, limit = _b === void 0 ? 20 : _b;
                            skip = (page - 1) * limit;
                            where = {
                                status: 'ACTIVE',
                                quantity: { gt: 0 },
                            };
                            if (categoryId)
                                where.categoryId = categoryId;
                            if (minPrice !== undefined || maxPrice !== undefined) {
                                where.price = {};
                                if (minPrice !== undefined)
                                    where.price.gte = minPrice;
                                if (maxPrice !== undefined)
                                    where.price.lte = maxPrice;
                            }
                            if (search) {
                                where.OR = [
                                    { title: { contains: search, mode: 'insensitive' } },
                                    { description: { contains: search, mode: 'insensitive' } },
                                ];
                            }
                            return [4 /*yield*/, Promise.all([
                                    this.db.product.findMany({
                                        where: where,
                                        include: {
                                            seller: { select: { id: true, name: true, image: true } },
                                        },
                                        orderBy: { createdAt: 'desc' },
                                        skip: skip,
                                        take: limit,
                                    }),
                                    this.db.product.count({ where: where }),
                                ])];
                        case 1:
                            _c = _d.sent(), products = _c[0], total = _c[1];
                            return [2 /*return*/, { data: products, total: total, page: page, limit: limit }];
                    }
                });
            });
        };
        /** SINGLE product */
        ProductService_1.prototype.getProduct = function (id) {
            return __awaiter(this, void 0, void 0, function () {
                var product;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.db.product.findUnique({
                                where: { id: id },
                                include: {
                                    seller: { select: { id: true, name: true, image: true } },
                                },
                            })];
                        case 1:
                            product = _a.sent();
                            if (!product)
                                throw new common_1.NotFoundException('Product not found');
                            return [2 /*return*/, product];
                    }
                });
            });
        };
        /** UPDATE — only the owner seller */
        ProductService_1.prototype.updateProduct = function (id, sellerId, dto) {
            return __awaiter(this, void 0, void 0, function () {
                var product;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.db.product.findUnique({ where: { id: id } })];
                        case 1:
                            product = _a.sent();
                            if (!product)
                                throw new common_1.NotFoundException('Product not found');
                            if (product.sellerId !== sellerId) {
                                throw new common_1.ForbiddenException('You can only update your own products');
                            }
                            if (product.status === 'SOLD') {
                                throw new common_1.BadRequestException('Cannot update a product that has been sold');
                            }
                            return [2 /*return*/, this.db.product.update({
                                    where: { id: id },
                                    data: __assign(__assign(__assign(__assign(__assign(__assign(__assign(__assign({}, (dto.title !== undefined && { title: dto.title })), (dto.description !== undefined && { description: dto.description })), (dto.price !== undefined && { price: dto.price })), (dto.quantity !== undefined && { quantity: dto.quantity })), (dto.categoryId !== undefined && { categoryId: dto.categoryId })), (dto.images !== undefined && { images: dto.images })), (dto.quantity === 0 && { status: 'SOLD' })), (dto.quantity !== undefined &&
                                        dto.quantity > 0 &&
                                        product.status !== 'ACTIVE' && { status: 'ACTIVE' })),
                                })];
                    }
                });
            });
        };
        /** DELETE — only the owner seller */
        ProductService_1.prototype.deleteProduct = function (id, sellerId) {
            return __awaiter(this, void 0, void 0, function () {
                var product;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.db.product.findUnique({ where: { id: id } })];
                        case 1:
                            product = _a.sent();
                            if (!product)
                                throw new common_1.NotFoundException('Product not found');
                            if (product.sellerId !== sellerId) {
                                throw new common_1.ForbiddenException('You can only delete your own products');
                            }
                            if (product.status === 'SOLD') {
                                throw new common_1.BadRequestException('Cannot delete a product that has an active sale — cancel the deal first');
                            }
                            return [4 /*yield*/, this.db.product.delete({ where: { id: id } })];
                        case 2:
                            _a.sent();
                            return [2 /*return*/, { message: 'Product deleted successfully' }];
                    }
                });
            });
        };
        /** BUY — public buyers, seller guard NOT required */
        ProductService_1.prototype.buyProduct = function (buyerId, productId) {
            return __awaiter(this, void 0, void 0, function () {
                var _this = this;
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.db.$transaction(function (tx) { return __awaiter(_this, void 0, void 0, function () {
                            var product, sellerProfile, decremented, order, transaction, updatedProduct;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, tx.product.findUnique({ where: { id: productId } })];
                                    case 1:
                                        product = _a.sent();
                                        if (!product)
                                            throw new common_1.NotFoundException('Product not found');
                                        if (product.status !== 'ACTIVE') {
                                            throw new common_1.BadRequestException('Product is not available for purchase');
                                        }
                                        if (product.quantity < 1) {
                                            throw new common_1.BadRequestException('Product is out of stock');
                                        }
                                        if (product.sellerId === buyerId) {
                                            throw new common_1.BadRequestException('You cannot buy your own product');
                                        }
                                        return [4 /*yield*/, tx.sellerProfile.findUnique({
                                                where: { userId: product.sellerId },
                                                select: { isBanned: true, isSuspended: true },
                                            })];
                                    case 2:
                                        sellerProfile = _a.sent();
                                        if ((sellerProfile === null || sellerProfile === void 0 ? void 0 : sellerProfile.isBanned) || (sellerProfile === null || sellerProfile === void 0 ? void 0 : sellerProfile.isSuspended)) {
                                            throw new common_1.BadRequestException('This product is temporarily unavailable');
                                        }
                                        return [4 /*yield*/, tx.product.updateMany({
                                                where: {
                                                    id: productId,
                                                    status: 'ACTIVE',
                                                    quantity: { gt: 0 },
                                                },
                                                data: {
                                                    quantity: { decrement: 1 },
                                                },
                                            })];
                                    case 3:
                                        decremented = _a.sent();
                                        if (decremented.count === 0) {
                                            throw new common_1.BadRequestException('Product is out of stock');
                                        }
                                        return [4 /*yield*/, this.orderService.createOrderFromPurchase(tx, buyerId, product)];
                                    case 4:
                                        order = _a.sent();
                                        return [4 /*yield*/, tx.transaction.create({
                                                data: {
                                                    buyerId: buyerId,
                                                    sellerId: product.sellerId,
                                                    productId: product.id,
                                                    orderId: order.id,
                                                    amount: product.price,
                                                    currency: product.currency,
                                                    status: 'PENDING',
                                                },
                                            })];
                                    case 5:
                                        transaction = _a.sent();
                                        return [4 /*yield*/, tx.product.findUnique({
                                                where: { id: productId },
                                                select: { quantity: true, status: true },
                                            })];
                                    case 6:
                                        updatedProduct = _a.sent();
                                        if (!updatedProduct) {
                                            throw new common_1.NotFoundException('Product not found');
                                        }
                                        if (!(updatedProduct.quantity === 0 && updatedProduct.status !== 'SOLD')) return [3 /*break*/, 8];
                                        return [4 /*yield*/, tx.product.update({
                                                where: { id: productId },
                                                data: { status: 'SOLD' },
                                            })];
                                    case 7:
                                        _a.sent();
                                        _a.label = 8;
                                    case 8: return [2 /*return*/, __assign(__assign({}, order), { transaction: transaction })];
                                }
                            });
                        }); })];
                });
            });
        };
        return ProductService_1;
    }());
    __setFunctionName(_classThis, "ProductService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ProductService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ProductService = _classThis;
}();
exports.ProductService = ProductService;
