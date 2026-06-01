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
exports.UserService = void 0;
var common_1 = require("@nestjs/common");
var generic_http_exception_1 = require("../../common/application/exceptions/generic-http-exception");
var common_2 = require("@nestjs/common");
var error_messages_constant_1 = require("../../common/constants/error-messages.constant");
var UserService = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var UserService = _classThis = /** @class */ (function () {
        function UserService_1(prisma, helperService, socialService) {
            this.prisma = prisma;
            this.helperService = helperService;
            this.socialService = socialService;
        }
        UserService_1.prototype.getAllUsers = function (filters) {
            return __awaiter(this, void 0, void 0, function () {
                var _a, search, _b, page, _c, limit, _d, sortBy, _e, sortOrder, where, searchUpper, roleMatch, skip, total, users;
                var _f;
                return __generator(this, function (_g) {
                    switch (_g.label) {
                        case 0:
                            _a = filters || {}, search = _a.search, _b = _a.page, page = _b === void 0 ? 1 : _b, _c = _a.limit, limit = _c === void 0 ? 8 : _c, _d = _a.sortBy, sortBy = _d === void 0 ? 'createdAt' : _d, _e = _a.sortOrder, sortOrder = _e === void 0 ? 'desc' : _e;
                            where = {};
                            if (search) {
                                searchUpper = search.toUpperCase();
                                roleMatch = [
                                    'ADMIN',
                                    'CAMPAIGN_SUPERVISOR',
                                    'EXPENSES_SUPERVISOR',
                                    'MARKETING_SUPERVISOR',
                                ].includes(searchUpper)
                                    ? searchUpper
                                    : undefined;
                                where.OR = __spreadArray([
                                    { name: { contains: search, mode: 'insensitive' } },
                                    { email: { contains: search, mode: 'insensitive' } }
                                ], (roleMatch ? [{ role: roleMatch }] : []), true);
                            }
                            skip = (page - 1) * limit;
                            return [4 /*yield*/, this.prisma.user.count({ where: where })];
                        case 1:
                            total = _g.sent();
                            return [4 /*yield*/, this.prisma.user.findMany({
                                    where: where,
                                    orderBy: (_f = {}, _f[sortBy] = sortOrder, _f),
                                    skip: skip,
                                    take: limit,
                                })];
                        case 2:
                            users = _g.sent();
                            return [2 /*return*/, {
                                    data: users,
                                    meta: {
                                        page: page,
                                        limit: limit,
                                        total: total,
                                        totalPages: Math.ceil(total / limit),
                                        hasNextPage: page * limit < total,
                                        hasPreviousPage: page > 1,
                                    },
                                }];
                    }
                });
            });
        };
        UserService_1.prototype.createUser = function (data) {
            return __awaiter(this, void 0, void 0, function () {
                var user, _a, _b;
                var _c, _d;
                return __generator(this, function (_e) {
                    switch (_e.label) {
                        case 0: 
                        // Check if user already exists
                        return [4 /*yield*/, this.errorIfUserExists(data.email)];
                        case 1:
                            // Check if user already exists
                            _e.sent();
                            _b = (_a = this.prisma.user).create;
                            _c = {};
                            _d = {
                                image: data.image,
                                email: data.email
                            };
                            return [4 /*yield*/, this.helperService.hashPassword(data.password)];
                        case 2: return [4 /*yield*/, _b.apply(_a, [(_c.data = (_d.password = _e.sent(),
                                    _d.name = data.name,
                                    _d.emailVerified = true,
                                    _d.active = true,
                                    _d),
                                    _c)])];
                        case 3:
                            user = _e.sent();
                            return [2 /*return*/, user];
                    }
                });
            });
        };
        UserService_1.prototype.getVerifiedUserIdByEmail = function (email) {
            return __awaiter(this, void 0, void 0, function () {
                var user;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.user.findUnique({
                                where: {
                                    email: email,
                                },
                            })];
                        case 1:
                            user = _a.sent();
                            if (!user)
                                throw new generic_http_exception_1.GenericHttpException(error_messages_constant_1.ERROR_MESSAGES.USER_NOT_FOUND, common_2.HttpStatus.NOT_FOUND);
                            return [2 /*return*/, { id: user.id }];
                    }
                });
            });
        };
        UserService_1.prototype.getLoginUserOrError = function (_a) {
            return __awaiter(this, arguments, void 0, function (_b) {
                var user;
                var email = _b.email;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0: return [4 /*yield*/, this.prisma.user.findUnique({
                                where: {
                                    email: email,
                                },
                            })];
                        case 1:
                            user = _c.sent();
                            if (!user)
                                throw new generic_http_exception_1.GenericHttpException(error_messages_constant_1.ERROR_MESSAGES.USER_NOT_FOUND, common_2.HttpStatus.NOT_FOUND);
                            if (!user.active)
                                throw new generic_http_exception_1.GenericHttpException(error_messages_constant_1.ERROR_MESSAGES.USER_BLOCKED, common_2.HttpStatus.FORBIDDEN);
                            return [2 /*return*/, user];
                    }
                });
            });
        };
        UserService_1.prototype.toggleUserActivity = function (userId, currentUserId) {
            return __awaiter(this, void 0, void 0, function () {
                var existingUser, user;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.user.findFirst({
                                where: {
                                    id: userId,
                                },
                            })];
                        case 1:
                            existingUser = _a.sent();
                            if (!existingUser) {
                                throw new generic_http_exception_1.GenericHttpException(error_messages_constant_1.ERROR_MESSAGES.USER_NOT_FOUND, common_2.HttpStatus.NOT_FOUND);
                            }
                            // Prevent users from deactivating themselves
                            if (userId === currentUserId) {
                                throw new generic_http_exception_1.GenericHttpException(error_messages_constant_1.ERROR_MESSAGES.CANNOT_DEACTIVATE_OWN_ACCOUNT, common_2.HttpStatus.BAD_REQUEST);
                            }
                            return [4 /*yield*/, this.prisma.user.update({
                                    where: { id: userId },
                                    data: { active: !existingUser.active },
                                })];
                        case 2:
                            user = _a.sent();
                            return [2 /*return*/, user];
                    }
                });
            });
        };
        UserService_1.prototype.deleteUser = function (userId) {
            return __awaiter(this, void 0, void 0, function () {
                var existingUser, error_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.user.findFirst({
                                where: {
                                    id: userId,
                                },
                                include: {
                                    Session: true,
                                },
                            })];
                        case 1:
                            existingUser = _a.sent();
                            if (!existingUser) {
                                throw new generic_http_exception_1.GenericHttpException(error_messages_constant_1.ERROR_MESSAGES.USER_NOT_FOUND, common_2.HttpStatus.NOT_FOUND);
                            }
                            // Delete related sessions first
                            return [4 /*yield*/, this.prisma.session.deleteMany({
                                    where: { userId: userId },
                                })];
                        case 2:
                            // Delete related sessions first
                            _a.sent();
                            _a.label = 3;
                        case 3:
                            _a.trys.push([3, 5, , 6]);
                            return [4 /*yield*/, this.socialService.deleteUserNode(userId)];
                        case 4:
                            _a.sent();
                            return [3 /*break*/, 6];
                        case 5:
                            error_1 = _a.sent();
                            // Log error but don't fail user deletion if Neo4j fails
                            console.error('Failed to delete Neo4j node for user:', error_1);
                            return [3 /*break*/, 6];
                        case 6: 
                        // Delete the user
                        return [4 /*yield*/, this.prisma.user.delete({
                                where: { id: userId },
                            })];
                        case 7:
                            // Delete the user
                            _a.sent();
                            return [2 /*return*/, { success: true }];
                    }
                });
            });
        };
        UserService_1.prototype.errorIfUserExists = function (email) {
            return __awaiter(this, void 0, void 0, function () {
                var user;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.user.findUnique({
                                where: { email: email },
                            })];
                        case 1:
                            user = _a.sent();
                            if (user)
                                throw new generic_http_exception_1.GenericHttpException(error_messages_constant_1.ERROR_MESSAGES.USER_ALREADY_EXISTS, common_2.HttpStatus.CONFLICT);
                            return [2 /*return*/];
                    }
                });
            });
        };
        UserService_1.prototype.checkEmail = function (email) {
            return __awaiter(this, void 0, void 0, function () {
                var user, error_2;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, this.prisma.user.findFirst({
                                    where: {
                                        email: email,
                                        active: true,
                                    },
                                })];
                        case 1:
                            user = _a.sent();
                            if (!user) {
                                return [2 /*return*/, {
                                        success: false,
                                        user: null,
                                    }];
                            }
                            return [2 /*return*/, {
                                    success: true,
                                    user: {
                                        id: user.id,
                                        name: user.name,
                                        email: user.email,
                                    },
                                }];
                        case 2:
                            error_2 = _a.sent();
                            throw new generic_http_exception_1.GenericHttpException(error_messages_constant_1.ERROR_MESSAGES.EMAIL_CHECK_FAILED, common_2.HttpStatus.INTERNAL_SERVER_ERROR);
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        return UserService_1;
    }());
    __setFunctionName(_classThis, "UserService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        UserService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return UserService = _classThis;
}();
exports.UserService = UserService;
