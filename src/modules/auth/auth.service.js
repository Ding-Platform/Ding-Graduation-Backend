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
exports.AuthService = void 0;
var common_1 = require("@nestjs/common");
var generic_http_exception_1 = require("../../common/application/exceptions/generic-http-exception");
var constants_1 = require("../../common/constants");
var AuthService = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var AuthService = _classThis = /** @class */ (function () {
        function AuthService_1(userService, helperService, prisma, jwtService, sessionService, emailService) {
            this.userService = userService;
            this.helperService = helperService;
            this.prisma = prisma;
            this.jwtService = jwtService;
            this.sessionService = sessionService;
            this.emailService = emailService;
        }
        AuthService_1.prototype.signup = function (request) {
            return __awaiter(this, void 0, void 0, function () {
                var email, password, name, image, user, _a, _b, otp, otpHash, otpExpiresAt;
                var _c, _d;
                return __generator(this, function (_e) {
                    switch (_e.label) {
                        case 0:
                            email = request.email, password = request.password, name = request.name, image = request.image;
                            return [4 /*yield*/, this.userService.errorIfUserExists(email)];
                        case 1:
                            _e.sent();
                            _b = (_a = this.prisma.user).create;
                            _c = {};
                            _d = {
                                email: email
                            };
                            return [4 /*yield*/, this.helperService.hashPassword(password)];
                        case 2: return [4 /*yield*/, _b.apply(_a, [(_c.data = (_d.password = _e.sent(),
                                    _d.name = name || email.split('@')[0],
                                    _d.image = image,
                                    _d.active = true,
                                    _d.emailVerified = false,
                                    _d),
                                    _c)])];
                        case 3:
                            user = _e.sent();
                            otp = Math.floor(constants_1.TOKEN_CONSTANTS.OTP.MIN_VALUE +
                                Math.random() *
                                    (constants_1.TOKEN_CONSTANTS.OTP.MAX_VALUE - constants_1.TOKEN_CONSTANTS.OTP.MIN_VALUE + 1)).toString();
                            return [4 /*yield*/, this.helperService.hashPassword(otp)];
                        case 4:
                            otpHash = _e.sent();
                            otpExpiresAt = new Date(Date.now() + constants_1.TOKEN_CONSTANTS.OTP.EXPIRES_IN_MS);
                            // Create email verification OTP record
                            return [4 /*yield*/, this.prisma.otp.create({
                                    data: {
                                        userId: user.id,
                                        otpHash: otpHash,
                                        otpExpiresAt: otpExpiresAt,
                                        otpVerified: false,
                                        type: 'EMAIL_VERIFICATION',
                                    },
                                })];
                        case 5:
                            // Create email verification OTP record
                            _e.sent();
                            // Send email verification OTP
                            return [4 /*yield*/, this.emailService.sendEmailVerificationOtp(email, otp, constants_1.TOKEN_CONSTANTS.OTP.EXPIRES_IN_MINUTES)];
                        case 6:
                            // Send email verification OTP
                            _e.sent();
                            return [2 /*return*/, user];
                    }
                });
            });
        };
        AuthService_1.prototype.validateUser = function (email, password) {
            return __awaiter(this, void 0, void 0, function () {
                var user, isPasswordValid;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.user.findUnique({
                                where: { email: email },
                            })];
                        case 1:
                            user = _a.sent();
                            // Return generic error for all cases: not found, inactive, no password, wrong password
                            if (!user || !user.active || !user.password) {
                                throw new generic_http_exception_1.GenericHttpException(constants_1.ERROR_MESSAGES.INVALID_CREDENTIALS, common_1.HttpStatus.UNAUTHORIZED);
                            }
                            return [4 /*yield*/, this.helperService.comparePassword(password, user.password)];
                        case 2:
                            isPasswordValid = _a.sent();
                            if (!isPasswordValid) {
                                throw new generic_http_exception_1.GenericHttpException(constants_1.ERROR_MESSAGES.INVALID_CREDENTIALS, common_1.HttpStatus.UNAUTHORIZED);
                            }
                            return [2 /*return*/, user];
                    }
                });
            });
        };
        AuthService_1.prototype.login = function (user, ipAddress, userAgent, request, response) {
            return __awaiter(this, void 0, void 0, function () {
                var sameIpUserAgentSessionCount, oldestSession, sessionIdFromCookie, session, refreshToken, encryptedRefreshToken;
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            // Check if email is verified
                            if (!user.emailVerified) {
                                throw new generic_http_exception_1.GenericHttpException(constants_1.ERROR_MESSAGES.EMAIL_NOT_VERIFIED, common_1.HttpStatus.FORBIDDEN);
                            }
                            if (!(ipAddress && userAgent)) return [3 /*break*/, 4];
                            return [4 /*yield*/, this.prisma.session.count({
                                    where: {
                                        userId: user.id,
                                        ipAddress: ipAddress,
                                        userAgent: userAgent,
                                        status: 'ACTIVE',
                                    },
                                })];
                        case 1:
                            sameIpUserAgentSessionCount = _b.sent();
                            if (!(sameIpUserAgentSessionCount >= 5)) return [3 /*break*/, 4];
                            return [4 /*yield*/, this.prisma.session.findFirst({
                                    where: {
                                        userId: user.id,
                                        ipAddress: ipAddress,
                                        userAgent: userAgent,
                                        status: 'ACTIVE',
                                    },
                                    orderBy: {
                                        createdAt: 'asc', // Get the oldest session with this IP/userAgent combo
                                    },
                                })];
                        case 2:
                            oldestSession = _b.sent();
                            if (!oldestSession) return [3 /*break*/, 4];
                            // If the deleted session matches the client's sessionId cookie, clear it
                            if (request && response) {
                                sessionIdFromCookie = (_a = request.cookies) === null || _a === void 0 ? void 0 : _a[constants_1.TOKEN_CONSTANTS.COOKIE.SESSION_ID_NAME];
                                if (sessionIdFromCookie &&
                                    sessionIdFromCookie === oldestSession.id) {
                                    this.clearSessionIdCookie(response);
                                }
                            }
                            return [4 /*yield*/, this.prisma.session.delete({
                                    where: { id: oldestSession.id },
                                })];
                        case 3:
                            _b.sent();
                            _b.label = 4;
                        case 4: return [4 /*yield*/, this.sessionService.create(user, ipAddress, userAgent)];
                        case 5:
                            session = _b.sent();
                            refreshToken = this.generateRefreshToken({
                                userId: user.id,
                                sessionId: session.id,
                            });
                            encryptedRefreshToken = this.helperService.encryptAuthToken(refreshToken);
                            return [4 /*yield*/, this.sessionService.updateRefreshToken(session.id, encryptedRefreshToken)];
                        case 6:
                            _b.sent();
                            return [2 /*return*/, this.appendAuthTokenToResponse(user, session)];
                    }
                });
            });
        };
        AuthService_1.prototype.googleLogin = function (googleUser, ipAddress, userAgent, request, response) {
            return __awaiter(this, void 0, void 0, function () {
                var user, name_1, error_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 5, , 6]);
                            return [4 /*yield*/, this.prisma.user.findUnique({
                                    where: { email: googleUser.email },
                                })];
                        case 1:
                            user = _a.sent();
                            if (!!user) return [3 /*break*/, 3];
                            name_1 = "".concat(googleUser.firstName, " ").concat(googleUser.lastName).trim();
                            return [4 /*yield*/, this.prisma.user.create({
                                    data: {
                                        email: googleUser.email,
                                        name: name_1 || googleUser.email.split('@')[0],
                                        image: googleUser.picture,
                                        emailVerified: true, // Google verified email
                                        active: true,
                                        password: null, // No password for OAuth users
                                    },
                                })];
                        case 2:
                            user = _a.sent();
                            _a.label = 3;
                        case 3:
                            // Check if user is active
                            if (!user.active) {
                                throw new generic_http_exception_1.GenericHttpException(constants_1.ERROR_MESSAGES.USER_BLOCKED, common_1.HttpStatus.FORBIDDEN);
                            }
                            return [4 /*yield*/, this.loginWithCookie(user, ipAddress, userAgent, request, response)];
                        case 4: 
                        // Login the user
                        return [2 /*return*/, _a.sent()];
                        case 5:
                            error_1 = _a.sent();
                            if (error_1 instanceof generic_http_exception_1.GenericHttpException) {
                                throw error_1;
                            }
                            throw new generic_http_exception_1.GenericHttpException('Google authentication failed', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
                        case 6: return [2 /*return*/];
                    }
                });
            });
        };
        AuthService_1.prototype.loginWithCookie = function (user, ipAddress, userAgent, request, response) {
            return __awaiter(this, void 0, void 0, function () {
                var result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.login(user, ipAddress, userAgent, request, response)];
                        case 1:
                            result = _a.sent();
                            // Set HttpOnly cookie for session id
                            this.setSessionIdCookie(response, result.sessionId);
                            return [2 /*return*/, result];
                    }
                });
            });
        };
        AuthService_1.prototype.appendAuthTokenToResponse = function (user, session) {
            return __awaiter(this, void 0, void 0, function () {
                var accessToken;
                return __generator(this, function (_a) {
                    accessToken = this.generateAccessToken({
                        userId: user.id,
                        sessionId: session.id,
                    });
                    return [2 /*return*/, {
                            user: user,
                            accessToken: accessToken,
                            sessionId: session.id, // For HttpOnly cookie only (not serialized in response)
                        }];
                });
            });
        };
        AuthService_1.prototype.generateAccessToken = function (payload) {
            return this.jwtService.sign(payload, {
                expiresIn: constants_1.TOKEN_CONSTANTS.ACCESS_TOKEN.EXPIRES_IN,
            });
        };
        AuthService_1.prototype.generateRefreshToken = function (payload) {
            return this.jwtService.sign(payload, {
                expiresIn: constants_1.TOKEN_CONSTANTS.REFRESH_TOKEN.EXPIRES_IN,
            });
        };
        AuthService_1.prototype.refreshTokens = function (sessionId) {
            return __awaiter(this, void 0, void 0, function () {
                var session, refreshToken, _a, payload, _b, newAccessToken, error_2;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            _c.trys.push([0, 19, , 20]);
                            return [4 /*yield*/, this.sessionService.findById(sessionId)];
                        case 1:
                            session = _c.sent();
                            if (!(!session || session.status !== 'ACTIVE')) return [3 /*break*/, 4];
                            if (!session) return [3 /*break*/, 3];
                            return [4 /*yield*/, this.sessionService.remove(session)];
                        case 2:
                            _c.sent();
                            _c.label = 3;
                        case 3: throw new generic_http_exception_1.GenericHttpException(constants_1.ERROR_MESSAGES.INVALID_SESSION, common_1.HttpStatus.UNAUTHORIZED);
                        case 4:
                            if (!!session.refreshToken) return [3 /*break*/, 6];
                            return [4 /*yield*/, this.sessionService.remove(session)];
                        case 5:
                            _c.sent();
                            throw new generic_http_exception_1.GenericHttpException(constants_1.ERROR_MESSAGES.SESSION_EXPIRED, common_1.HttpStatus.UNAUTHORIZED);
                        case 6:
                            refreshToken = void 0;
                            _c.label = 7;
                        case 7:
                            _c.trys.push([7, 8, , 10]);
                            refreshToken = this.helperService.decryptAuthToken(session.refreshToken);
                            return [3 /*break*/, 10];
                        case 8:
                            _a = _c.sent();
                            return [4 /*yield*/, this.sessionService.remove(session)];
                        case 9:
                            _c.sent();
                            throw new generic_http_exception_1.GenericHttpException(constants_1.ERROR_MESSAGES.INVALID_SESSION, common_1.HttpStatus.UNAUTHORIZED);
                        case 10:
                            payload = void 0;
                            _c.label = 11;
                        case 11:
                            _c.trys.push([11, 12, , 14]);
                            payload = this.jwtService.verify(refreshToken);
                            return [3 /*break*/, 14];
                        case 12:
                            _b = _c.sent();
                            return [4 /*yield*/, this.sessionService.remove(session)];
                        case 13:
                            _c.sent();
                            throw new generic_http_exception_1.GenericHttpException(constants_1.ERROR_MESSAGES.SESSION_EXPIRED, common_1.HttpStatus.UNAUTHORIZED);
                        case 14:
                            if (!(payload.userId !== session.userId ||
                                payload.sessionId !== session.id)) return [3 /*break*/, 16];
                            return [4 /*yield*/, this.sessionService.remove(session)];
                        case 15:
                            _c.sent();
                            throw new generic_http_exception_1.GenericHttpException(constants_1.ERROR_MESSAGES.INVALID_SESSION, common_1.HttpStatus.UNAUTHORIZED);
                        case 16:
                            if (!!session.user.active) return [3 /*break*/, 18];
                            return [4 /*yield*/, this.sessionService.remove(session)];
                        case 17:
                            _c.sent();
                            throw new generic_http_exception_1.GenericHttpException(constants_1.ERROR_MESSAGES.USER_BLOCKED, common_1.HttpStatus.FORBIDDEN);
                        case 18:
                            newAccessToken = this.generateAccessToken({
                                userId: session.userId,
                                sessionId: session.id,
                            });
                            return [2 /*return*/, {
                                    accessToken: newAccessToken,
                                }];
                        case 19:
                            error_2 = _c.sent();
                            if (error_2 instanceof generic_http_exception_1.GenericHttpException) {
                                throw error_2;
                            }
                            throw new generic_http_exception_1.GenericHttpException(constants_1.ERROR_MESSAGES.TOKEN_REFRESH_FAILED, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
                        case 20: return [2 /*return*/];
                    }
                });
            });
        };
        AuthService_1.prototype.refreshTokensWithCookie = function (sessionId, response) {
            return __awaiter(this, void 0, void 0, function () {
                var result, error_3;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, this.refreshTokens(sessionId)];
                        case 1:
                            result = _a.sent();
                            return [2 /*return*/, result];
                        case 2:
                            error_3 = _a.sent();
                            this.clearSessionIdCookie(response);
                            throw error_3;
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        AuthService_1.prototype.logout = function (user, sessionId) {
            return __awaiter(this, void 0, void 0, function () {
                var error_4;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 5, , 6]);
                            if (!sessionId) return [3 /*break*/, 2];
                            // Delete specific session
                            return [4 /*yield*/, this.prisma.session.delete({
                                    where: { id: sessionId, userId: user.id },
                                })];
                        case 1:
                            // Delete specific session
                            _a.sent();
                            return [3 /*break*/, 4];
                        case 2: 
                        // Delete all sessions for the user (sign out from all devices)
                        return [4 /*yield*/, this.prisma.session.deleteMany({
                                where: { userId: user.id },
                            })];
                        case 3:
                            // Delete all sessions for the user (sign out from all devices)
                            _a.sent();
                            _a.label = 4;
                        case 4: return [2 /*return*/, {
                                success: true,
                                message: 'Logged out successfully',
                            }];
                        case 5:
                            error_4 = _a.sent();
                            throw new generic_http_exception_1.GenericHttpException(constants_1.ERROR_MESSAGES.LOGOUT_FAILED, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
                        case 6: return [2 /*return*/];
                    }
                });
            });
        };
        AuthService_1.prototype.logoutWithCookie = function (user, sessionId, response) {
            return __awaiter(this, void 0, void 0, function () {
                var result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.logout(user, sessionId)];
                        case 1:
                            result = _a.sent();
                            // Clear session id cookie
                            this.clearSessionIdCookie(response);
                            return [2 /*return*/, result];
                    }
                });
            });
        };
        AuthService_1.prototype.logoutAllWithCookie = function (user, response) {
            return __awaiter(this, void 0, void 0, function () {
                var result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.logout(user)];
                        case 1:
                            result = _a.sent();
                            // Clear session id cookie
                            this.clearSessionIdCookie(response);
                            return [2 /*return*/, result];
                    }
                });
            });
        };
        // Public helper methods for cookie management
        AuthService_1.prototype.setSessionIdCookie = function (response, sessionId) {
            response.cookie(constants_1.TOKEN_CONSTANTS.COOKIE.SESSION_ID_NAME, sessionId, {
                httpOnly: constants_1.TOKEN_CONSTANTS.COOKIE.HTTP_ONLY,
                secure: constants_1.TOKEN_CONSTANTS.COOKIE.SECURE,
                sameSite: constants_1.TOKEN_CONSTANTS.COOKIE.SAME_SITE,
                // No maxAge - persistent cookie (no expiration)
                path: constants_1.TOKEN_CONSTANTS.COOKIE.PATH,
            });
        };
        AuthService_1.prototype.clearSessionIdCookie = function (response) {
            response.clearCookie(constants_1.TOKEN_CONSTANTS.COOKIE.SESSION_ID_NAME, {
                httpOnly: constants_1.TOKEN_CONSTANTS.COOKIE.HTTP_ONLY,
                secure: constants_1.TOKEN_CONSTANTS.COOKIE.SECURE,
                sameSite: constants_1.TOKEN_CONSTANTS.COOKIE.SAME_SITE,
                path: constants_1.TOKEN_CONSTANTS.COOKIE.PATH,
            });
        };
        // Password Recovery Methods
        AuthService_1.prototype.forgotPassword = function (request) {
            return __awaiter(this, void 0, void 0, function () {
                var email, user, otp, otpHash, otpExpiresAt, error_5;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            email = request.email;
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 7, , 8]);
                            return [4 /*yield*/, this.prisma.user.findUnique({
                                    where: { email: email },
                                })];
                        case 2:
                            user = _a.sent();
                            // Always return success message even if user not found (security best practice)
                            if (!user) {
                                return [2 /*return*/, {
                                        success: true,
                                        message: constants_1.ERROR_MESSAGES.OTP_SENT_SUCCESS,
                                    }];
                            }
                            otp = Math.floor(constants_1.TOKEN_CONSTANTS.OTP.MIN_VALUE +
                                Math.random() *
                                    (constants_1.TOKEN_CONSTANTS.OTP.MAX_VALUE - constants_1.TOKEN_CONSTANTS.OTP.MIN_VALUE + 1)).toString();
                            return [4 /*yield*/, this.helperService.hashPassword(otp)];
                        case 3:
                            otpHash = _a.sent();
                            otpExpiresAt = new Date(Date.now() + constants_1.TOKEN_CONSTANTS.OTP.EXPIRES_IN_MS);
                            // Delete any existing OTP records for this user
                            return [4 /*yield*/, this.prisma.otp.deleteMany({
                                    where: { userId: user.id },
                                })];
                        case 4:
                            // Delete any existing OTP records for this user
                            _a.sent();
                            // Create new OTP record
                            return [4 /*yield*/, this.prisma.otp.create({
                                    data: {
                                        userId: user.id,
                                        otpHash: otpHash,
                                        otpExpiresAt: otpExpiresAt,
                                        otpVerified: false,
                                        type: 'PASSWORD_RESET',
                                    },
                                })];
                        case 5:
                            // Create new OTP record
                            _a.sent();
                            // Send OTP email
                            return [4 /*yield*/, this.emailService.sendOtpEmail(email, otp, constants_1.TOKEN_CONSTANTS.OTP.EXPIRES_IN_MINUTES)];
                        case 6:
                            // Send OTP email
                            _a.sent();
                            return [2 /*return*/, {
                                    success: true,
                                    message: constants_1.ERROR_MESSAGES.OTP_SENT_SUCCESS,
                                }];
                        case 7:
                            error_5 = _a.sent();
                            // Log error but return generic success message to prevent email enumeration
                            console.error('Forgot password error:', error_5);
                            return [2 /*return*/, {
                                    success: true,
                                    message: constants_1.ERROR_MESSAGES.OTP_SENT_SUCCESS,
                                }];
                        case 8: return [2 /*return*/];
                    }
                });
            });
        };
        AuthService_1.prototype.verifyForgotPassword = function (request) {
            return __awaiter(this, void 0, void 0, function () {
                var email, otp, user, otpRecord, isOtpValid;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            email = request.email, otp = request.otp;
                            return [4 /*yield*/, this.prisma.user.findUnique({
                                    where: { email: email },
                                })];
                        case 1:
                            user = _a.sent();
                            // If user not found
                            if (!user) {
                                throw new generic_http_exception_1.GenericHttpException(constants_1.ERROR_MESSAGES.INVALID_OR_EXPIRED_OTP, common_1.HttpStatus.BAD_REQUEST);
                            }
                            return [4 /*yield*/, this.prisma.otp.findFirst({
                                    where: { userId: user.id },
                                    orderBy: { createdAt: 'desc' },
                                })];
                        case 2:
                            otpRecord = _a.sent();
                            // If no OTP record found
                            if (!otpRecord) {
                                throw new generic_http_exception_1.GenericHttpException(constants_1.ERROR_MESSAGES.INVALID_OR_EXPIRED_OTP, common_1.HttpStatus.BAD_REQUEST);
                            }
                            if (!(new Date() > otpRecord.otpExpiresAt)) return [3 /*break*/, 4];
                            // Delete expired OTP record
                            return [4 /*yield*/, this.prisma.otp.delete({
                                    where: { id: otpRecord.id },
                                })];
                        case 3:
                            // Delete expired OTP record
                            _a.sent();
                            throw new generic_http_exception_1.GenericHttpException(constants_1.ERROR_MESSAGES.INVALID_OR_EXPIRED_OTP, common_1.HttpStatus.BAD_REQUEST);
                        case 4: return [4 /*yield*/, this.helperService.comparePassword(otp, otpRecord.otpHash)];
                        case 5:
                            isOtpValid = _a.sent();
                            if (!isOtpValid) {
                                throw new generic_http_exception_1.GenericHttpException(constants_1.ERROR_MESSAGES.INVALID_OR_EXPIRED_OTP, common_1.HttpStatus.BAD_REQUEST);
                            }
                            // Mark OTP as verified
                            return [4 /*yield*/, this.prisma.otp.update({
                                    where: { id: otpRecord.id },
                                    data: {
                                        otpVerified: true,
                                    },
                                })];
                        case 6:
                            // Mark OTP as verified
                            _a.sent();
                            return [2 /*return*/, {
                                    success: true,
                                    message: constants_1.ERROR_MESSAGES.OTP_VERIFIED_SUCCESS,
                                }];
                    }
                });
            });
        };
        AuthService_1.prototype.resetPassword = function (request) {
            return __awaiter(this, void 0, void 0, function () {
                var email, newPassword, user, otpRecord, hashedPassword;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            email = request.email, newPassword = request.newPassword;
                            return [4 /*yield*/, this.prisma.user.findUnique({
                                    where: { email: email },
                                })];
                        case 1:
                            user = _a.sent();
                            // If user not found
                            if (!user) {
                                throw new generic_http_exception_1.GenericHttpException(constants_1.ERROR_MESSAGES.USER_NOT_FOUND, common_1.HttpStatus.NOT_FOUND);
                            }
                            return [4 /*yield*/, this.prisma.otp.findFirst({
                                    where: { userId: user.id },
                                    orderBy: { createdAt: 'desc' },
                                })];
                        case 2:
                            otpRecord = _a.sent();
                            // Check if OTP record exists
                            if (!otpRecord) {
                                throw new generic_http_exception_1.GenericHttpException(constants_1.ERROR_MESSAGES.OTP_NOT_VERIFIED, common_1.HttpStatus.BAD_REQUEST);
                            }
                            // Check if OTP was verified
                            if (!otpRecord.otpVerified) {
                                throw new generic_http_exception_1.GenericHttpException(constants_1.ERROR_MESSAGES.OTP_NOT_VERIFIED, common_1.HttpStatus.BAD_REQUEST);
                            }
                            if (!(new Date() > otpRecord.otpExpiresAt)) return [3 /*break*/, 4];
                            // Delete expired OTP record
                            return [4 /*yield*/, this.prisma.otp.delete({
                                    where: { id: otpRecord.id },
                                })];
                        case 3:
                            // Delete expired OTP record
                            _a.sent();
                            throw new generic_http_exception_1.GenericHttpException(constants_1.ERROR_MESSAGES.INVALID_OR_EXPIRED_OTP, common_1.HttpStatus.BAD_REQUEST);
                        case 4: return [4 /*yield*/, this.helperService.hashPassword(newPassword)];
                        case 5:
                            hashedPassword = _a.sent();
                            // Update password
                            return [4 /*yield*/, this.prisma.user.update({
                                    where: { id: user.id },
                                    data: {
                                        password: hashedPassword,
                                    },
                                })];
                        case 6:
                            // Update password
                            _a.sent();
                            // Delete the used OTP record
                            return [4 /*yield*/, this.prisma.otp.delete({
                                    where: { id: otpRecord.id },
                                })];
                        case 7:
                            // Delete the used OTP record
                            _a.sent();
                            // Optional: Invalidate all existing sessions for security
                            return [4 /*yield*/, this.prisma.session.deleteMany({
                                    where: { userId: user.id },
                                })];
                        case 8:
                            // Optional: Invalidate all existing sessions for security
                            _a.sent();
                            return [2 /*return*/, {
                                    success: true,
                                    message: constants_1.ERROR_MESSAGES.PASSWORD_RESET_SUCCESS,
                                }];
                    }
                });
            });
        };
        AuthService_1.prototype.updatePassword = function (user, request) {
            return __awaiter(this, void 0, void 0, function () {
                var oldPassword, newPassword, isOldPasswordValid, hashedNewPassword, error_6;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            oldPassword = request.oldPassword, newPassword = request.newPassword;
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 6, , 7]);
                            // Check if user has a password (should always be true for logged-in users)
                            if (!user.password) {
                                throw new generic_http_exception_1.GenericHttpException(constants_1.ERROR_MESSAGES.USER_NOT_FOUND, common_1.HttpStatus.NOT_FOUND);
                            }
                            return [4 /*yield*/, this.helperService.comparePassword(oldPassword, user.password)];
                        case 2:
                            isOldPasswordValid = _a.sent();
                            if (!isOldPasswordValid) {
                                throw new generic_http_exception_1.GenericHttpException(constants_1.ERROR_MESSAGES.OLD_PASSWORD_INCORRECT, common_1.HttpStatus.BAD_REQUEST);
                            }
                            // Check if new password is different from old password
                            if (oldPassword === newPassword) {
                                throw new generic_http_exception_1.GenericHttpException(constants_1.ERROR_MESSAGES.NEW_PASSWORD_SAME_AS_OLD, common_1.HttpStatus.BAD_REQUEST);
                            }
                            return [4 /*yield*/, this.helperService.hashPassword(newPassword)];
                        case 3:
                            hashedNewPassword = _a.sent();
                            // Update password
                            return [4 /*yield*/, this.prisma.user.update({
                                    where: { id: user.id },
                                    data: {
                                        password: hashedNewPassword,
                                    },
                                })];
                        case 4:
                            // Update password
                            _a.sent();
                            // Optional: Invalidate all existing sessions for security
                            // This forces the user to log in again with the new password
                            return [4 /*yield*/, this.prisma.session.deleteMany({
                                    where: { userId: user.id },
                                })];
                        case 5:
                            // Optional: Invalidate all existing sessions for security
                            // This forces the user to log in again with the new password
                            _a.sent();
                            return [2 /*return*/, {
                                    success: true,
                                    message: constants_1.ERROR_MESSAGES.PASSWORD_UPDATE_SUCCESS,
                                }];
                        case 6:
                            error_6 = _a.sent();
                            if (error_6 instanceof generic_http_exception_1.GenericHttpException) {
                                throw error_6;
                            }
                            throw new generic_http_exception_1.GenericHttpException(constants_1.ERROR_MESSAGES.PASSWORD_UPDATE_FAILED, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
                        case 7: return [2 /*return*/];
                    }
                });
            });
        };
        // Email Verification Methods
        AuthService_1.prototype.resendVerificationCode = function (request) {
            return __awaiter(this, void 0, void 0, function () {
                var email, user, otp, otpHash, otpExpiresAt;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            email = request.email;
                            return [4 /*yield*/, this.prisma.user.findUnique({
                                    where: { email: email },
                                })];
                        case 1:
                            user = _a.sent();
                            // If user not found
                            if (!user) {
                                throw new generic_http_exception_1.GenericHttpException(constants_1.ERROR_MESSAGES.USER_NOT_FOUND, common_1.HttpStatus.NOT_FOUND);
                            }
                            // Check if email is already verified
                            if (user.emailVerified) {
                                throw new generic_http_exception_1.GenericHttpException(constants_1.ERROR_MESSAGES.EMAIL_ALREADY_VERIFIED, common_1.HttpStatus.BAD_REQUEST);
                            }
                            // Delete any existing email verification OTP records for this user
                            return [4 /*yield*/, this.prisma.otp.deleteMany({
                                    where: {
                                        userId: user.id,
                                        type: 'EMAIL_VERIFICATION',
                                    },
                                })];
                        case 2:
                            // Delete any existing email verification OTP records for this user
                            _a.sent();
                            otp = Math.floor(constants_1.TOKEN_CONSTANTS.OTP.MIN_VALUE +
                                Math.random() *
                                    (constants_1.TOKEN_CONSTANTS.OTP.MAX_VALUE - constants_1.TOKEN_CONSTANTS.OTP.MIN_VALUE + 1)).toString();
                            return [4 /*yield*/, this.helperService.hashPassword(otp)];
                        case 3:
                            otpHash = _a.sent();
                            otpExpiresAt = new Date(Date.now() + constants_1.TOKEN_CONSTANTS.OTP.EXPIRES_IN_MS);
                            // Create new email verification OTP record
                            return [4 /*yield*/, this.prisma.otp.create({
                                    data: {
                                        userId: user.id,
                                        otpHash: otpHash,
                                        otpExpiresAt: otpExpiresAt,
                                        otpVerified: false,
                                        type: 'EMAIL_VERIFICATION',
                                    },
                                })];
                        case 4:
                            // Create new email verification OTP record
                            _a.sent();
                            // Send email verification OTP
                            return [4 /*yield*/, this.emailService.sendEmailVerificationOtp(email, otp, constants_1.TOKEN_CONSTANTS.OTP.EXPIRES_IN_MINUTES)];
                        case 5:
                            // Send email verification OTP
                            _a.sent();
                            return [2 /*return*/, {
                                    success: true,
                                    message: constants_1.ERROR_MESSAGES.VERIFICATION_CODE_RESENT,
                                }];
                    }
                });
            });
        };
        AuthService_1.prototype.resendForgotPasswordCode = function (request) {
            return __awaiter(this, void 0, void 0, function () {
                var email, user, otp, otpHash, otpExpiresAt;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            email = request.email;
                            return [4 /*yield*/, this.prisma.user.findUnique({
                                    where: { email: email },
                                })];
                        case 1:
                            user = _a.sent();
                            // If user not found
                            if (!user) {
                                throw new generic_http_exception_1.GenericHttpException(constants_1.ERROR_MESSAGES.USER_NOT_FOUND, common_1.HttpStatus.NOT_FOUND);
                            }
                            // Delete any existing password reset OTP records for this user
                            return [4 /*yield*/, this.prisma.otp.deleteMany({
                                    where: {
                                        userId: user.id,
                                        type: 'PASSWORD_RESET',
                                    },
                                })];
                        case 2:
                            // Delete any existing password reset OTP records for this user
                            _a.sent();
                            otp = Math.floor(constants_1.TOKEN_CONSTANTS.OTP.MIN_VALUE +
                                Math.random() *
                                    (constants_1.TOKEN_CONSTANTS.OTP.MAX_VALUE - constants_1.TOKEN_CONSTANTS.OTP.MIN_VALUE + 1)).toString();
                            return [4 /*yield*/, this.helperService.hashPassword(otp)];
                        case 3:
                            otpHash = _a.sent();
                            otpExpiresAt = new Date(Date.now() + constants_1.TOKEN_CONSTANTS.OTP.EXPIRES_IN_MS);
                            // Create new password reset OTP record
                            return [4 /*yield*/, this.prisma.otp.create({
                                    data: {
                                        userId: user.id,
                                        otpHash: otpHash,
                                        otpExpiresAt: otpExpiresAt,
                                        otpVerified: false,
                                        type: 'PASSWORD_RESET',
                                    },
                                })];
                        case 4:
                            // Create new password reset OTP record
                            _a.sent();
                            // Send password reset OTP
                            return [4 /*yield*/, this.emailService.sendOtpEmail(email, otp, constants_1.TOKEN_CONSTANTS.OTP.EXPIRES_IN_MINUTES)];
                        case 5:
                            // Send password reset OTP
                            _a.sent();
                            return [2 /*return*/, {
                                    success: true,
                                    message: constants_1.ERROR_MESSAGES.FORGOT_PASSWORD_CODE_RESENT,
                                }];
                    }
                });
            });
        };
        AuthService_1.prototype.verifyEmail = function (request, ipAddress, userAgent, httpRequest, response) {
            return __awaiter(this, void 0, void 0, function () {
                var email, otp, user, otpRecord, isOtpValid, updatedUser;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            email = request.email, otp = request.otp;
                            return [4 /*yield*/, this.prisma.user.findUnique({
                                    where: { email: email },
                                })];
                        case 1:
                            user = _a.sent();
                            // If user not found
                            if (!user) {
                                throw new generic_http_exception_1.GenericHttpException(constants_1.ERROR_MESSAGES.USER_NOT_FOUND, common_1.HttpStatus.NOT_FOUND);
                            }
                            // Check if email is already verified
                            if (user.emailVerified) {
                                return [2 /*return*/, { user: user }];
                            }
                            return [4 /*yield*/, this.prisma.otp.findFirst({
                                    where: {
                                        userId: user.id,
                                        type: 'EMAIL_VERIFICATION',
                                        otpVerified: false, // Ensure OTP hasn't been used already
                                    },
                                    orderBy: { createdAt: 'desc' },
                                })];
                        case 2:
                            otpRecord = _a.sent();
                            // If no OTP record found
                            if (!otpRecord) {
                                throw new generic_http_exception_1.GenericHttpException(constants_1.ERROR_MESSAGES.INVALID_OR_EXPIRED_OTP, common_1.HttpStatus.BAD_REQUEST);
                            }
                            if (!(new Date() > otpRecord.otpExpiresAt)) return [3 /*break*/, 4];
                            // Delete expired OTP record
                            return [4 /*yield*/, this.prisma.otp.delete({
                                    where: { id: otpRecord.id },
                                })];
                        case 3:
                            // Delete expired OTP record
                            _a.sent();
                            throw new generic_http_exception_1.GenericHttpException(constants_1.ERROR_MESSAGES.INVALID_OR_EXPIRED_OTP, common_1.HttpStatus.BAD_REQUEST);
                        case 4: return [4 /*yield*/, this.helperService.comparePassword(otp, otpRecord.otpHash)];
                        case 5:
                            isOtpValid = _a.sent();
                            if (!isOtpValid) {
                                throw new generic_http_exception_1.GenericHttpException(constants_1.ERROR_MESSAGES.INVALID_OR_EXPIRED_OTP, common_1.HttpStatus.BAD_REQUEST);
                            }
                            return [4 /*yield*/, this.prisma.user.update({
                                    where: { id: user.id },
                                    data: {
                                        emailVerified: true,
                                    },
                                })];
                        case 6:
                            updatedUser = _a.sent();
                            // Delete the OTP record immediately after verification
                            return [4 /*yield*/, this.prisma.otp.delete({
                                    where: { id: otpRecord.id },
                                })];
                        case 7:
                            // Delete the OTP record immediately after verification
                            _a.sent();
                            if (!(ipAddress && userAgent && httpRequest && response)) return [3 /*break*/, 9];
                            return [4 /*yield*/, this.loginWithCookie(updatedUser, ipAddress, userAgent, httpRequest, response)];
                        case 8: return [2 /*return*/, _a.sent()];
                        case 9: 
                        // If no session creation, return user without tokens (same as login structure)
                        return [2 /*return*/, {
                                user: updatedUser,
                            }];
                    }
                });
            });
        };
        return AuthService_1;
    }());
    __setFunctionName(_classThis, "AuthService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        AuthService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return AuthService = _classThis;
}();
exports.AuthService = AuthService;
