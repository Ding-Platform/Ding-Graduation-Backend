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
exports.AuthController = void 0;
var common_1 = require("@nestjs/common");
var auth_response_1 = require("./dtos/responses/auth.response");
var refresh_token_response_1 = require("./dtos/responses/refresh-token.response");
var local_guard_1 = require("../../common/guards/strategy.guards/local.guard");
var refresh_token_guard_1 = require("../../common/guards/refresh-token.guard");
var serialize_interceptor_1 = require("../../common/interceptors/serialize.interceptor");
var jwt_guard_1 = require("../../common/guards/strategy.guards/jwt.guard");
var user_response_1 = require("../../modules/user/dtos/response/user.response");
var google_guard_1 = require("../../common/guards/strategy.guards/google.guard");
var AuthController = function () {
    var _classDecorators = [(0, common_1.Controller)('auth')];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _instanceExtraInitializers = [];
    var _signup_decorators;
    var _login_decorators;
    var _googleAuth_decorators;
    var _googleAuthRedirect_decorators;
    var _refresh_decorators;
    var _logout_decorators;
    var _logoutAll_decorators;
    var _getMe_decorators;
    var _forgotPassword_decorators;
    var _verifyForgotPassword_decorators;
    var _resetPassword_decorators;
    var _updatePassword_decorators;
    var _verifyEmail_decorators;
    var _resendVerification_decorators;
    var _resendForgotPassword_decorators;
    var AuthController = _classThis = /** @class */ (function () {
        function AuthController_1(authService) {
            this.authService = (__runInitializers(this, _instanceExtraInitializers), authService);
        }
        AuthController_1.prototype.signup = function (signupRequest) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.authService.signup(signupRequest)];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        AuthController_1.prototype.login = function (_, user, ipAddress, userAgent, request, response) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.authService.loginWithCookie(user, ipAddress, userAgent, request, response)];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        AuthController_1.prototype.googleAuth = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/];
                });
            });
        };
        AuthController_1.prototype.googleAuthRedirect = function (user, ipAddress, userAgent, request, response) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.authService.googleLogin(user, ipAddress, userAgent, request, response)];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        AuthController_1.prototype.refresh = function (sessionId, response) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.authService.refreshTokensWithCookie(sessionId, response)];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        AuthController_1.prototype.logout = function (user, response) {
            return __awaiter(this, void 0, void 0, function () {
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, this.authService.logoutWithCookie(user, (_a = user.session) === null || _a === void 0 ? void 0 : _a.id, response)];
                        case 1: return [2 /*return*/, _b.sent()];
                    }
                });
            });
        };
        AuthController_1.prototype.logoutAll = function (user, response) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.authService.logoutAllWithCookie(user, response)];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        AuthController_1.prototype.getMe = function (user) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, user];
                });
            });
        };
        AuthController_1.prototype.forgotPassword = function (forgotPasswordRequest) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.authService.forgotPassword(forgotPasswordRequest)];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        AuthController_1.prototype.verifyForgotPassword = function (verifyForgotPasswordRequest) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.authService.verifyForgotPassword(verifyForgotPasswordRequest)];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        AuthController_1.prototype.resetPassword = function (resetPasswordRequest) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.authService.resetPassword(resetPasswordRequest)];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        AuthController_1.prototype.updatePassword = function (user, updatePasswordRequest) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.authService.updatePassword(user, updatePasswordRequest)];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        AuthController_1.prototype.verifyEmail = function (verifyEmailRequest, ipAddress, userAgent, request, response) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.authService.verifyEmail(verifyEmailRequest, ipAddress, userAgent, request, response)];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        AuthController_1.prototype.resendVerification = function (resendVerificationRequest) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.authService.resendVerificationCode(resendVerificationRequest)];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        AuthController_1.prototype.resendForgotPassword = function (resendForgotPasswordRequest) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.authService.resendForgotPasswordCode(resendForgotPasswordRequest)];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        return AuthController_1;
    }());
    __setFunctionName(_classThis, "AuthController");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _signup_decorators = [(0, common_1.Post)('signup'), (0, serialize_interceptor_1.Serialize)(user_response_1.UserResponse), (0, common_1.HttpCode)(common_1.HttpStatus.CREATED)];
        _login_decorators = [(0, common_1.Post)('login'), (0, serialize_interceptor_1.Serialize)(auth_response_1.AuthResponse), (0, common_1.HttpCode)(common_1.HttpStatus.OK), (0, common_1.UseGuards)(local_guard_1.LocalAuthGuard)];
        _googleAuth_decorators = [(0, common_1.Get)('google'), (0, common_1.UseGuards)(google_guard_1.GoogleAuthGuard)];
        _googleAuthRedirect_decorators = [(0, common_1.Get)('google/callback'), (0, common_1.UseGuards)(google_guard_1.GoogleAuthGuard), (0, serialize_interceptor_1.Serialize)(auth_response_1.AuthResponse)];
        _refresh_decorators = [(0, common_1.Post)('refresh'), (0, common_1.UseGuards)(refresh_token_guard_1.SessionIdGuard), (0, serialize_interceptor_1.Serialize)(refresh_token_response_1.RefreshTokenResponse), (0, common_1.HttpCode)(common_1.HttpStatus.OK)];
        _logout_decorators = [(0, common_1.Delete)('logout'), (0, common_1.HttpCode)(common_1.HttpStatus.OK), (0, common_1.UseGuards)(jwt_guard_1.JwtAuthenticationGuard)];
        _logoutAll_decorators = [(0, common_1.Delete)('logout-all'), (0, common_1.HttpCode)(common_1.HttpStatus.OK), (0, common_1.UseGuards)(jwt_guard_1.JwtAuthenticationGuard)];
        _getMe_decorators = [(0, common_1.Get)('/me'), (0, serialize_interceptor_1.Serialize)(user_response_1.UserResponse), (0, common_1.HttpCode)(common_1.HttpStatus.OK), (0, common_1.UseGuards)(jwt_guard_1.JwtAuthenticationGuard)];
        _forgotPassword_decorators = [(0, common_1.Patch)('forgot-password'), (0, common_1.HttpCode)(common_1.HttpStatus.OK)];
        _verifyForgotPassword_decorators = [(0, common_1.Patch)('verify-forgot-password'), (0, common_1.HttpCode)(common_1.HttpStatus.OK)];
        _resetPassword_decorators = [(0, common_1.Patch)('reset-password'), (0, common_1.HttpCode)(common_1.HttpStatus.OK)];
        _updatePassword_decorators = [(0, common_1.Patch)('update-password'), (0, common_1.HttpCode)(common_1.HttpStatus.OK), (0, common_1.UseGuards)(jwt_guard_1.JwtAuthenticationGuard)];
        _verifyEmail_decorators = [(0, common_1.Post)('verify-email'), (0, serialize_interceptor_1.Serialize)(auth_response_1.AuthResponse), (0, common_1.HttpCode)(common_1.HttpStatus.OK)];
        _resendVerification_decorators = [(0, common_1.Post)('resend-verification'), (0, common_1.HttpCode)(common_1.HttpStatus.OK)];
        _resendForgotPassword_decorators = [(0, common_1.Post)('resend-forgot-password'), (0, common_1.HttpCode)(common_1.HttpStatus.OK)];
        __esDecorate(_classThis, null, _signup_decorators, { kind: "method", name: "signup", static: false, private: false, access: { has: function (obj) { return "signup" in obj; }, get: function (obj) { return obj.signup; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _login_decorators, { kind: "method", name: "login", static: false, private: false, access: { has: function (obj) { return "login" in obj; }, get: function (obj) { return obj.login; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _googleAuth_decorators, { kind: "method", name: "googleAuth", static: false, private: false, access: { has: function (obj) { return "googleAuth" in obj; }, get: function (obj) { return obj.googleAuth; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _googleAuthRedirect_decorators, { kind: "method", name: "googleAuthRedirect", static: false, private: false, access: { has: function (obj) { return "googleAuthRedirect" in obj; }, get: function (obj) { return obj.googleAuthRedirect; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _refresh_decorators, { kind: "method", name: "refresh", static: false, private: false, access: { has: function (obj) { return "refresh" in obj; }, get: function (obj) { return obj.refresh; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _logout_decorators, { kind: "method", name: "logout", static: false, private: false, access: { has: function (obj) { return "logout" in obj; }, get: function (obj) { return obj.logout; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _logoutAll_decorators, { kind: "method", name: "logoutAll", static: false, private: false, access: { has: function (obj) { return "logoutAll" in obj; }, get: function (obj) { return obj.logoutAll; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getMe_decorators, { kind: "method", name: "getMe", static: false, private: false, access: { has: function (obj) { return "getMe" in obj; }, get: function (obj) { return obj.getMe; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _forgotPassword_decorators, { kind: "method", name: "forgotPassword", static: false, private: false, access: { has: function (obj) { return "forgotPassword" in obj; }, get: function (obj) { return obj.forgotPassword; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _verifyForgotPassword_decorators, { kind: "method", name: "verifyForgotPassword", static: false, private: false, access: { has: function (obj) { return "verifyForgotPassword" in obj; }, get: function (obj) { return obj.verifyForgotPassword; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _resetPassword_decorators, { kind: "method", name: "resetPassword", static: false, private: false, access: { has: function (obj) { return "resetPassword" in obj; }, get: function (obj) { return obj.resetPassword; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _updatePassword_decorators, { kind: "method", name: "updatePassword", static: false, private: false, access: { has: function (obj) { return "updatePassword" in obj; }, get: function (obj) { return obj.updatePassword; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _verifyEmail_decorators, { kind: "method", name: "verifyEmail", static: false, private: false, access: { has: function (obj) { return "verifyEmail" in obj; }, get: function (obj) { return obj.verifyEmail; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _resendVerification_decorators, { kind: "method", name: "resendVerification", static: false, private: false, access: { has: function (obj) { return "resendVerification" in obj; }, get: function (obj) { return obj.resendVerification; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _resendForgotPassword_decorators, { kind: "method", name: "resendForgotPassword", static: false, private: false, access: { has: function (obj) { return "resendForgotPassword" in obj; }, get: function (obj) { return obj.resendForgotPassword; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        AuthController = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return AuthController = _classThis;
}();
exports.AuthController = AuthController;
