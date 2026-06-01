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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
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
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggerModule = void 0;
var pino_1 = __importDefault(require("pino"));
var fs = __importStar(require("fs"));
var path = __importStar(require("path"));
var crypto_1 = require("crypto");
var stream_1 = require("stream");
var config_1 = require("@nestjs/config");
var common_1 = require("@nestjs/common");
var pino_sentry_1 = require("pino-sentry");
var nestjs_pino_1 = require("nestjs-pino");
var LoggerModule = function () {
    var _classDecorators = [(0, common_1.Global)(), (0, common_1.Module)({
            imports: [
                nestjs_pino_1.LoggerModule.forRootAsync({
                    providers: [config_1.ConfigService],
                    inject: [config_1.ConfigService],
                    useFactory: function (config) {
                        var createSafeStream = function (stream, streamName) {
                            return new stream_1.Writable({
                                write: function (chunk, encoding, callback) {
                                    if (chunk === undefined || chunk === null) {
                                        // Defensive guard: never let invalid log chunks crash the process.
                                        console.warn("[logger] Dropped invalid chunk from ".concat(streamName, ": ").concat(String(chunk)));
                                        callback();
                                        return;
                                    }
                                    var safeChunk;
                                    if (typeof chunk === 'string' ||
                                        Buffer.isBuffer(chunk) ||
                                        chunk instanceof Uint8Array) {
                                        safeChunk = chunk;
                                    }
                                    else {
                                        try {
                                            safeChunk = "".concat(JSON.stringify(chunk), "\n");
                                        }
                                        catch (_a) {
                                            safeChunk = "".concat(String(chunk), "\n");
                                        }
                                    }
                                    try {
                                        stream.write(safeChunk, encoding);
                                        callback();
                                    }
                                    catch (error) {
                                        console.error("[logger] Failed writing to ".concat(streamName, " stream:"), error);
                                        callback();
                                    }
                                },
                            });
                        };
                        // Check both ConfigService and process.env for environment detection
                        var nodeEnv = config.get('NODE_ENV') || process.env.NODE_ENV || 'development';
                        var isProduction = nodeEnv === 'production';
                        var isTest = nodeEnv === 'test';
                        // Custom response serializer that includes status code
                        var customResSerializer = function (res) {
                            var serialized = pino_1.default.stdSerializers.res(res);
                            return __assign(__assign({}, serialized), { statusCode: res.statusCode || res.status || 'unknown' });
                        };
                        // Base configuration
                        var baseConfig = {
                            name: 'Pino',
                            level: isProduction ? 'info' : 'warn',
                            timestamp: function () { return ", \"Time\": \"".concat(new Date().toISOString(), "\""); },
                            redact: ['password', 'headers.cookie'],
                            safe: true,
                            enabled: !isTest,
                            serializers: {
                                err: pino_1.default.stdSerializers.err,
                                req: pino_1.default.stdSerializers.req,
                                res: customResSerializer,
                            },
                            useLevel: isProduction ? 'info' : 'debug',
                            genReqId: function (req) { return req.id || (0, crypto_1.randomUUID)(); },
                            autoLogging: {
                                ignore: function (req) {
                                    var _a, _b, _c;
                                    // Don't log health checks or static assets
                                    return (((_a = req.url) === null || _a === void 0 ? void 0 : _a.includes('/health')) ||
                                        ((_b = req.url) === null || _b === void 0 ? void 0 : _b.includes('/api/docs')) ||
                                        ((_c = req.url) === null || _c === void 0 ? void 0 : _c.match(/\.(ico|png|jpg|jpeg|gif|svg|css|js)$/)));
                                },
                            },
                        };
                        if (!isProduction) {
                            return {
                                pinoHttp: __assign(__assign({}, baseConfig), { transport: {
                                        target: 'pino-pretty',
                                        options: {
                                            colorize: true,
                                            levelFirst: true,
                                            crlf: true,
                                        },
                                    } }),
                            };
                        }
                        // Production configuration with multistream
                        var streams = [
                            {
                                stream: createSafeStream(process.stdout, 'stdout'),
                            },
                        ];
                        // Add file logging if logs directory exists
                        var logDir = path.join(process.cwd(), 'logs');
                        if (fs.existsSync(logDir)) {
                            streams.push({
                                stream: createSafeStream(fs.createWriteStream(path.join(logDir, 'logs.out')), 'file'),
                            });
                        }
                        // Add Sentry logging if DSN is configured
                        var sentryDsn = config.get('SENTRY_DNS');
                        if (sentryDsn) {
                            try {
                                streams.push({
                                    stream: createSafeStream((0, pino_sentry_1.createWriteStream)({
                                        sentry: {
                                            dsn: sentryDsn,
                                        },
                                        serverName: config.get('SERVER_NAME'),
                                    }), 'sentry'),
                                });
                            }
                            catch (error) {
                                // Silently fail if Sentry stream creation fails
                                console.warn('Failed to create Sentry stream:', error);
                            }
                        }
                        var productionLogger = (0, pino_1.default)({ level: 'info' }, streams.length > 1 ? pino_1.default.multistream(streams) : streams[0].stream);
                        return {
                            pinoHttp: __assign(__assign({}, baseConfig), { logger: productionLogger }),
                        };
                    },
                }),
            ],
            exports: [nestjs_pino_1.LoggerModule],
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var LoggerModule = _classThis = /** @class */ (function () {
        function LoggerModule_1() {
        }
        return LoggerModule_1;
    }());
    __setFunctionName(_classThis, "LoggerModule");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        LoggerModule = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return LoggerModule = _classThis;
}();
exports.LoggerModule = LoggerModule;
