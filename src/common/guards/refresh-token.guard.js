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
exports.SessionIdGuard = void 0;
var common_1 = require("@nestjs/common");
var constants_1 = require("../constants");
var SessionIdGuard = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var SessionIdGuard = _classThis = /** @class */ (function () {
        function SessionIdGuard_1(sessionService) {
            this.sessionService = sessionService;
        }
        SessionIdGuard_1.prototype.canActivate = function (context) {
            return __awaiter(this, void 0, void 0, function () {
                var request, response, sessionId, session, error_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            request = context.switchToHttp().getRequest();
                            response = context.switchToHttp().getResponse();
                            sessionId = this.extractSessionIdFromCookie(request);
                            if (!sessionId) {
                                throw new common_1.UnauthorizedException(constants_1.ERROR_MESSAGES.SESSION_ID_REQUIRED);
                            }
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 5, , 6]);
                            return [4 /*yield*/, this.sessionService.findById(sessionId)];
                        case 2:
                            session = _a.sent();
                            if (!(!session || session.status !== 'ACTIVE')) return [3 /*break*/, 4];
                            return [4 /*yield*/, this.handleExpiredSession(session, response)];
                        case 3:
                            _a.sent();
                            throw new common_1.UnauthorizedException(constants_1.ERROR_MESSAGES.INVALID_SESSION);
                        case 4:
                            request['sessionId'] = sessionId;
                            return [2 /*return*/, true];
                        case 5:
                            error_1 = _a.sent();
                            // Any unexpected error: clear cookie defensively
                            this.clearSessionIdCookie(response);
                            throw error_1;
                        case 6: return [2 /*return*/];
                    }
                });
            });
        };
        SessionIdGuard_1.prototype.extractSessionIdFromCookie = function (request) {
            var _a;
            return (_a = request.cookies) === null || _a === void 0 ? void 0 : _a[constants_1.TOKEN_CONSTANTS.COOKIE.SESSION_ID_NAME];
        };
        SessionIdGuard_1.prototype.handleExpiredSession = function (session, response) {
            return __awaiter(this, void 0, void 0, function () {
                var error_2;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 3, , 4]);
                            if (!session) return [3 /*break*/, 2];
                            return [4 /*yield*/, this.sessionService.remove(session)];
                        case 1:
                            _a.sent();
                            _a.label = 2;
                        case 2:
                            this.clearSessionIdCookie(response);
                            return [3 /*break*/, 4];
                        case 3:
                            error_2 = _a.sent();
                            // Log the error but don't throw - this is a cleanup operation
                            console.error('Error cleaning up expired session:', error_2);
                            return [3 /*break*/, 4];
                        case 4: return [2 /*return*/];
                    }
                });
            });
        };
        SessionIdGuard_1.prototype.clearSessionIdCookie = function (response) {
            response.clearCookie(constants_1.TOKEN_CONSTANTS.COOKIE.SESSION_ID_NAME, {
                httpOnly: constants_1.TOKEN_CONSTANTS.COOKIE.HTTP_ONLY,
                secure: constants_1.TOKEN_CONSTANTS.COOKIE.SECURE,
                sameSite: constants_1.TOKEN_CONSTANTS.COOKIE.SAME_SITE,
                path: constants_1.TOKEN_CONSTANTS.COOKIE.PATH,
            });
        };
        return SessionIdGuard_1;
    }());
    __setFunctionName(_classThis, "SessionIdGuard");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        SessionIdGuard = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return SessionIdGuard = _classThis;
}();
exports.SessionIdGuard = SessionIdGuard;
