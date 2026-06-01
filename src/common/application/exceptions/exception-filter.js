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
exports.HttpExceptionFilter = void 0;
var common_1 = require("@nestjs/common");
var generic_http_exception_1 = require("./generic-http-exception");
var HttpExceptionFilter = function () {
    var _classDecorators = [(0, common_1.Catch)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var HttpExceptionFilter = _classThis = /** @class */ (function () {
        function HttpExceptionFilter_1(logger) {
            this.logger = logger;
            this.response = {
                code: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                success: false,
                message: 'Something went wrong!',
            };
        }
        HttpExceptionFilter_1.prototype.catch = function (exception, host) {
            return __awaiter(this, void 0, void 0, function () {
                var httpContext, response, request, statusCode, message, logMessage, exceptionResponse;
                return __generator(this, function (_a) {
                    httpContext = host.switchToHttp();
                    response = httpContext.getResponse();
                    request = httpContext.getRequest();
                    if (exception instanceof common_1.HttpException) {
                        statusCode = exception.getStatus();
                        message = void 0;
                        logMessage = void 0;
                        if (exception instanceof generic_http_exception_1.GenericHttpException) {
                            message = exception.message;
                            logMessage = exception.getLogMessage() || message;
                        }
                        else {
                            exceptionResponse = exception.getResponse();
                            if (Array.isArray(exceptionResponse)) {
                                message = exceptionResponse;
                            }
                            else {
                                message =
                                    typeof exceptionResponse === 'string'
                                        ? exceptionResponse
                                        : exceptionResponse.message || 'An error occurred';
                            }
                            logMessage = Array.isArray(message) ? message.join(', ') : message;
                        }
                        // Use PinoLogger if available, otherwise fallback to console
                        if (this.logger) {
                            this.logger.setContext("".concat(HttpExceptionFilter.name, "-").concat(request.method, " ").concat(request.url));
                            this.logger.error("Message: ".concat(logMessage), "Path: ".concat(request.url), "Method: ".concat(request.method), "Body: ".concat(JSON.stringify(request.body)), "User: ".concat(request.user ? request.user.id : 'No user'));
                        }
                        else {
                            // Fallback to console logging
                            console.error('HTTP Exception:', {
                                message: logMessage,
                                path: request.url,
                                method: request.method,
                                statusCode: statusCode,
                                timestamp: new Date().toISOString(),
                            });
                        }
                        this.response.code = statusCode;
                        this.response.message = message;
                        return [2 /*return*/, response.status(statusCode).json(this.response)];
                    }
                    if (exception instanceof RangeError ||
                        exception.name === 'PayloadTooLargeError') {
                        this.response.code = common_1.HttpStatus.PAYLOAD_TOO_LARGE;
                        this.response.message = exception.message;
                        if (this.logger) {
                            this.logger.error("Message: ".concat(exception.stack));
                        }
                        else {
                            console.error('Payload Too Large:', exception.stack);
                        }
                        return [2 /*return*/, response.status(common_1.HttpStatus.PAYLOAD_TOO_LARGE).json(this.response)];
                    }
                    // Handle generic errors
                    if (exception instanceof Error) {
                        if (exception.message.includes('path must be absolute')) {
                            return [2 /*return*/, response.status(common_1.HttpStatus.NOT_FOUND).end('File does not exist')];
                        }
                        this.response.code = common_1.HttpStatus.INTERNAL_SERVER_ERROR;
                        this.response.message = 'Something went wrong!';
                        if (this.logger) {
                            this.logger.error("Message: ".concat(exception.stack));
                        }
                        else {
                            console.error('Internal Server Error:', exception.stack);
                        }
                        return [2 /*return*/, response
                                .status(common_1.HttpStatus.INTERNAL_SERVER_ERROR)
                                .json(this.response)];
                    }
                    // Fallback for unknown errors
                    if (this.logger) {
                        this.logger.error('Unhandled exception', exception);
                    }
                    else {
                        console.error('Unhandled exception:', exception);
                    }
                    this.response.code = common_1.HttpStatus.INTERNAL_SERVER_ERROR;
                    this.response.message = 'Something went wrong!';
                    return [2 /*return*/, response
                            .status(common_1.HttpStatus.INTERNAL_SERVER_ERROR)
                            .json(this.response)];
                });
            });
        };
        return HttpExceptionFilter_1;
    }());
    __setFunctionName(_classThis, "HttpExceptionFilter");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        HttpExceptionFilter = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return HttpExceptionFilter = _classThis;
}();
exports.HttpExceptionFilter = HttpExceptionFilter;
