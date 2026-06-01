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
exports.SellerApplicationService = void 0;
var common_1 = require("@nestjs/common");
var encryption_util_1 = require("src/common/utils/encryption.util");
var SellerApplicationService = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var SellerApplicationService = _classThis = /** @class */ (function () {
        function SellerApplicationService_1(db, cloudinary) {
            this.db = db;
            this.cloudinary = cloudinary;
        }
        /**
         * Submit a new seller KYC application.
         * Validates: Luhn (card), commercial reg format, card expiry.
         * Computes: address trust score from session IP history.
         * Encrypts: idCardNumber, commercialRegNumber, bankAccountNumber, bankCardNumber.
         */
        SellerApplicationService_1.prototype.submitApplication = function (userId, dto, files) {
            return __awaiter(this, void 0, void 0, function () {
                var existing, user, _a, frontUrl, backUrl, faceUrl, sessions, allSessions, sessionCount, uniqueIps, addressTrustScore, addressVerified, encryptedIdCard, encryptedCommercialReg, encryptedBankAccount, encryptedBankCard, application;
                var _b, _c, _d;
                return __generator(this, function (_e) {
                    switch (_e.label) {
                        case 0: return [4 /*yield*/, this.db.sellerApplication.findUnique({
                                where: { userId: userId },
                            })];
                        case 1:
                            existing = _e.sent();
                            if (existing) {
                                throw new common_1.ConflictException("You already have a ".concat(existing.status.toLowerCase(), " application."));
                            }
                            return [4 /*yield*/, this.db.user.findUnique({ where: { id: userId } })];
                        case 2:
                            user = _e.sent();
                            if (!user)
                                throw new common_1.NotFoundException('User not found');
                            if (user.role === 'SELLER') {
                                throw new common_1.ConflictException('You are already a registered seller.');
                            }
                            // ── Validate sensitive fields ──────────────────────────────────
                            if (!(0, encryption_util_1.luhnCheck)(dto.bankCardNumber)) {
                                throw new common_1.BadRequestException('Bank card number is invalid (Luhn check failed).');
                            }
                            if (!(0, encryption_util_1.validateCommercialReg)(dto.commercialRegNumber)) {
                                throw new common_1.BadRequestException('Commercial registration number must be 7–10 digits (رقم السجل التجاري).');
                            }
                            if (!(0, encryption_util_1.validateCardExpiry)(dto.bankCardExpiry)) {
                                throw new common_1.BadRequestException('Bank card is expired or expiry format is invalid (MM/YY).');
                            }
                            // ── Required file validation ───────────────────────────────────
                            if (!((_b = files.idCardFrontImage) === null || _b === void 0 ? void 0 : _b[0])) {
                                throw new common_1.BadRequestException('ID card front image is required.');
                            }
                            if (!((_c = files.idCardBackImage) === null || _c === void 0 ? void 0 : _c[0])) {
                                throw new common_1.BadRequestException('ID card back image is required.');
                            }
                            if (!((_d = files.sellerFaceImage) === null || _d === void 0 ? void 0 : _d[0])) {
                                throw new common_1.BadRequestException('Seller face image is required.');
                            }
                            return [4 /*yield*/, Promise.all([
                                    this.cloudinary.uploadSellerDocument(files.idCardFrontImage[0], userId, 'id_front'),
                                    this.cloudinary.uploadSellerDocument(files.idCardBackImage[0], userId, 'id_back'),
                                    this.cloudinary.uploadSellerDocument(files.sellerFaceImage[0], userId, 'face'),
                                ])];
                        case 3:
                            _a = _e.sent(), frontUrl = _a[0], backUrl = _a[1], faceUrl = _a[2];
                            return [4 /*yield*/, this.db.session.findMany({
                                    where: { userId: userId, status: 'ACTIVE' },
                                    select: { ipAddress: true },
                                })];
                        case 4:
                            sessions = _e.sent();
                            return [4 /*yield*/, this.db.session.findMany({
                                    where: { userId: userId },
                                    select: { ipAddress: true },
                                })];
                        case 5:
                            allSessions = _e.sent();
                            sessionCount = allSessions.length;
                            uniqueIps = new Set(allSessions.map(function (s) { return s.ipAddress; }).filter(Boolean)).size;
                            addressTrustScore = Math.min((sessionCount / 10) * 100, 100);
                            addressVerified = addressTrustScore >= 60;
                            encryptedIdCard = (0, encryption_util_1.encrypt)(dto.idCardNumber);
                            encryptedCommercialReg = (0, encryption_util_1.encrypt)(dto.commercialRegNumber);
                            encryptedBankAccount = (0, encryption_util_1.encrypt)(dto.bankAccountNumber);
                            encryptedBankCard = (0, encryption_util_1.encrypt)(dto.bankCardNumber);
                            return [4 /*yield*/, this.db.sellerApplication.create({
                                    data: {
                                        userId: userId,
                                        fullName: dto.fullName,
                                        phoneNumber: dto.phoneNumber,
                                        email: dto.email,
                                        address: dto.address,
                                        city: dto.city,
                                        country: dto.country,
                                        idCardNumber: encryptedIdCard,
                                        idCardFrontImage: frontUrl,
                                        idCardBackImage: backUrl,
                                        sellerFaceImage: faceUrl,
                                        commercialRegNumber: encryptedCommercialReg,
                                        bankAccountNumber: encryptedBankAccount,
                                        bankCardNumber: encryptedBankCard,
                                        bankCardExpiry: dto.bankCardExpiry,
                                        bankCardHolderName: dto.bankCardHolderName,
                                        addressTrustScore: addressTrustScore,
                                        addressVerified: addressVerified,
                                        sessionCount: sessionCount,
                                        uniqueIpCount: uniqueIps,
                                    },
                                })];
                        case 6:
                            application = _e.sent();
                            return [2 /*return*/, {
                                    id: application.id,
                                    status: application.status,
                                    addressTrustScore: application.addressTrustScore,
                                    addressVerified: application.addressVerified,
                                    createdAt: application.createdAt,
                                    message: 'Application submitted successfully. Our team will review it shortly.',
                                }];
                    }
                });
            });
        };
        /**
         * Get the current authenticated user's application status.
         */
        SellerApplicationService_1.prototype.getMyApplicationStatus = function (userId) {
            return __awaiter(this, void 0, void 0, function () {
                var application;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.db.sellerApplication.findUnique({
                                where: { userId: userId },
                                select: {
                                    id: true,
                                    status: true,
                                    fullName: true,
                                    email: true,
                                    phoneNumber: true,
                                    city: true,
                                    country: true,
                                    addressVerified: true,
                                    addressTrustScore: true,
                                    adminNote: true,
                                    reviewedAt: true,
                                    createdAt: true,
                                    updatedAt: true,
                                },
                            })];
                        case 1:
                            application = _a.sent();
                            if (!application) {
                                throw new common_1.NotFoundException('No seller application found. Use POST /marketplace/seller/apply to submit one.');
                            }
                            return [2 /*return*/, application];
                    }
                });
            });
        };
        return SellerApplicationService_1;
    }());
    __setFunctionName(_classThis, "SellerApplicationService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        SellerApplicationService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return SellerApplicationService = _classThis;
}();
exports.SellerApplicationService = SellerApplicationService;
