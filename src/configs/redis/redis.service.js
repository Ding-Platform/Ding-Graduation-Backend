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
exports.RedisService = void 0;
var fs_1 = require("fs");
var common_1 = require("@nestjs/common");
var redis_1 = require("redis");
var env_var_1 = require("env-var");
var RedisService = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var RedisService = _classThis = /** @class */ (function () {
        function RedisService_1() {
            this.isConnected = false;
        }
        RedisService_1.prototype.onModuleInit = function () {
            return __awaiter(this, void 0, void 0, function () {
                var redisUrl, inDocker, u, error_1;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (process.env.NODE_ENV === 'test') {
                                this.isConnected = false;
                                return [2 /*return*/];
                            }
                            redisUrl = (0, env_var_1.get)('REDIS_URL')
                                .default('redis://localhost:6379')
                                .asString();
                            inDocker = (0, fs_1.existsSync)('/.dockerenv');
                            if (!inDocker) {
                                try {
                                    u = new URL(redisUrl);
                                    if (u.hostname === 'redis') {
                                        u.hostname = 'localhost';
                                        redisUrl = u.toString();
                                    }
                                }
                                catch (_b) {
                                    // ignore invalid URL
                                }
                            }
                            // Skip Redis in development if not configured
                            if (!redisUrl && process.env.NODE_ENV === 'development') {
                                console.log('⚠️  Redis not configured, caching disabled');
                                return [2 /*return*/];
                            }
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            this.client = (0, redis_1.createClient)({
                                url: redisUrl,
                            });
                            this.client.on('error', function (err) {
                                console.error('Redis Client Error:', err);
                                _this.isConnected = false;
                            });
                            this.client.on('connect', function () {
                                console.log('✅ Redis connected successfully');
                                console.log('redisUrl', redisUrl);
                                _this.isConnected = true;
                            });
                            return [4 /*yield*/, this.client.connect()];
                        case 2:
                            _a.sent();
                            return [3 /*break*/, 4];
                        case 3:
                            error_1 = _a.sent();
                            console.error('Failed to connect to Redis:', error_1);
                            this.isConnected = false;
                            return [3 /*break*/, 4];
                        case 4: return [2 /*return*/];
                    }
                });
            });
        };
        RedisService_1.prototype.onModuleDestroy = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!(this.client && this.isConnected)) return [3 /*break*/, 2];
                            return [4 /*yield*/, this.client.quit()];
                        case 1:
                            _a.sent();
                            console.log('Redis connection closed');
                            _a.label = 2;
                        case 2: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Get value from cache
         */
        RedisService_1.prototype.get = function (key) {
            return __awaiter(this, void 0, void 0, function () {
                var value, error_2;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!this.isConnected)
                                return [2 /*return*/, null];
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, this.client.get(key)];
                        case 2:
                            value = _a.sent();
                            return [2 /*return*/, value ? JSON.parse(value) : null];
                        case 3:
                            error_2 = _a.sent();
                            console.error('Redis get error:', error_2);
                            return [2 /*return*/, null];
                        case 4: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Set value in cache with optional TTL (in seconds)
         */
        RedisService_1.prototype.set = function (key, value, ttl) {
            return __awaiter(this, void 0, void 0, function () {
                var serialized, error_3;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!this.isConnected)
                                return [2 /*return*/, false];
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 6, , 7]);
                            serialized = JSON.stringify(value);
                            if (!ttl) return [3 /*break*/, 3];
                            return [4 /*yield*/, this.client.setEx(key, ttl, serialized)];
                        case 2:
                            _a.sent();
                            return [3 /*break*/, 5];
                        case 3: return [4 /*yield*/, this.client.set(key, serialized)];
                        case 4:
                            _a.sent();
                            _a.label = 5;
                        case 5: return [2 /*return*/, true];
                        case 6:
                            error_3 = _a.sent();
                            console.error('Redis set error:', error_3);
                            return [2 /*return*/, false];
                        case 7: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Delete key from cache
         */
        RedisService_1.prototype.del = function (key) {
            return __awaiter(this, void 0, void 0, function () {
                var error_4;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!this.isConnected)
                                return [2 /*return*/, false];
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, this.client.del(key)];
                        case 2:
                            _a.sent();
                            return [2 /*return*/, true];
                        case 3:
                            error_4 = _a.sent();
                            console.error('Redis del error:', error_4);
                            return [2 /*return*/, false];
                        case 4: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Delete keys matching pattern
         */
        RedisService_1.prototype.delPattern = function (pattern) {
            return __awaiter(this, void 0, void 0, function () {
                var keys, error_5;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!this.isConnected)
                                return [2 /*return*/, false];
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 5, , 6]);
                            return [4 /*yield*/, this.client.keys(pattern)];
                        case 2:
                            keys = _a.sent();
                            if (!(keys.length > 0)) return [3 /*break*/, 4];
                            return [4 /*yield*/, this.client.del(keys)];
                        case 3:
                            _a.sent();
                            _a.label = 4;
                        case 4: return [2 /*return*/, true];
                        case 5:
                            error_5 = _a.sent();
                            console.error('Redis delPattern error:', error_5);
                            return [2 /*return*/, false];
                        case 6: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Check if key exists
         */
        RedisService_1.prototype.exists = function (key) {
            return __awaiter(this, void 0, void 0, function () {
                var result, error_6;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!this.isConnected)
                                return [2 /*return*/, false];
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, this.client.exists(key)];
                        case 2:
                            result = _a.sent();
                            return [2 /*return*/, result === 1];
                        case 3:
                            error_6 = _a.sent();
                            console.error('Redis exists error:', error_6);
                            return [2 /*return*/, false];
                        case 4: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Set expiration on key
         */
        RedisService_1.prototype.expire = function (key, seconds) {
            return __awaiter(this, void 0, void 0, function () {
                var error_7;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!this.isConnected)
                                return [2 /*return*/, false];
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, this.client.expire(key, seconds)];
                        case 2:
                            _a.sent();
                            return [2 /*return*/, true];
                        case 3:
                            error_7 = _a.sent();
                            console.error('Redis expire error:', error_7);
                            return [2 /*return*/, false];
                        case 4: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Increment value
         */
        RedisService_1.prototype.incr = function (key) {
            return __awaiter(this, void 0, void 0, function () {
                var error_8;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!this.isConnected)
                                return [2 /*return*/, null];
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, this.client.incr(key)];
                        case 2: return [2 /*return*/, _a.sent()];
                        case 3:
                            error_8 = _a.sent();
                            console.error('Redis incr error:', error_8);
                            return [2 /*return*/, null];
                        case 4: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Get TTL of key
         */
        RedisService_1.prototype.ttl = function (key) {
            return __awaiter(this, void 0, void 0, function () {
                var error_9;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!this.isConnected)
                                return [2 /*return*/, null];
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, this.client.ttl(key)];
                        case 2: return [2 /*return*/, _a.sent()];
                        case 3:
                            error_9 = _a.sent();
                            console.error('Redis ttl error:', error_9);
                            return [2 /*return*/, null];
                        case 4: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Set value only if key does not exist and expire it.
         */
        RedisService_1.prototype.setNxEx = function (key, value, seconds) {
            return __awaiter(this, void 0, void 0, function () {
                var result, error_10;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!this.isConnected)
                                return [2 /*return*/, false];
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, this.client.set(key, value, {
                                    NX: true,
                                    EX: seconds,
                                })];
                        case 2:
                            result = _a.sent();
                            return [2 /*return*/, result === 'OK'];
                        case 3:
                            error_10 = _a.sent();
                            console.error('Redis setNxEx error:', error_10);
                            return [2 /*return*/, false];
                        case 4: return [2 /*return*/];
                    }
                });
            });
        };
        RedisService_1.prototype.hSet = function (key, field, value) {
            return __awaiter(this, void 0, void 0, function () {
                var error_11;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!this.isConnected)
                                return [2 /*return*/, false];
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, this.client.hSet(key, field, value)];
                        case 2:
                            _a.sent();
                            return [2 /*return*/, true];
                        case 3:
                            error_11 = _a.sent();
                            console.error('Redis hSet error:', error_11);
                            return [2 /*return*/, false];
                        case 4: return [2 /*return*/];
                    }
                });
            });
        };
        RedisService_1.prototype.hGet = function (key, field) {
            return __awaiter(this, void 0, void 0, function () {
                var value, error_12;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!this.isConnected)
                                return [2 /*return*/, null];
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, this.client.hGet(key, field)];
                        case 2:
                            value = _a.sent();
                            return [2 /*return*/, value !== null && value !== void 0 ? value : null];
                        case 3:
                            error_12 = _a.sent();
                            console.error('Redis hGet error:', error_12);
                            return [2 /*return*/, null];
                        case 4: return [2 /*return*/];
                    }
                });
            });
        };
        RedisService_1.prototype.hGetAll = function (key) {
            return __awaiter(this, void 0, void 0, function () {
                var error_13;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!this.isConnected)
                                return [2 /*return*/, {}];
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, this.client.hGetAll(key)];
                        case 2: return [2 /*return*/, _a.sent()];
                        case 3:
                            error_13 = _a.sent();
                            console.error('Redis hGetAll error:', error_13);
                            return [2 /*return*/, {}];
                        case 4: return [2 /*return*/];
                    }
                });
            });
        };
        RedisService_1.prototype.hDel = function (key, field) {
            return __awaiter(this, void 0, void 0, function () {
                var error_14;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!this.isConnected)
                                return [2 /*return*/, false];
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, this.client.hDel(key, field)];
                        case 2:
                            _a.sent();
                            return [2 /*return*/, true];
                        case 3:
                            error_14 = _a.sent();
                            console.error('Redis hDel error:', error_14);
                            return [2 /*return*/, false];
                        case 4: return [2 /*return*/];
                    }
                });
            });
        };
        RedisService_1.prototype.hLen = function (key) {
            return __awaiter(this, void 0, void 0, function () {
                var error_15;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!this.isConnected)
                                return [2 /*return*/, 0];
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, this.client.hLen(key)];
                        case 2: return [2 /*return*/, _a.sent()];
                        case 3:
                            error_15 = _a.sent();
                            console.error('Redis hLen error:', error_15);
                            return [2 /*return*/, 0];
                        case 4: return [2 /*return*/];
                    }
                });
            });
        };
        RedisService_1.prototype.incrBy = function (key, amount) {
            return __awaiter(this, void 0, void 0, function () {
                var error_16;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!this.isConnected)
                                return [2 /*return*/, null];
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, this.client.incrBy(key, amount)];
                        case 2: return [2 /*return*/, _a.sent()];
                        case 3:
                            error_16 = _a.sent();
                            console.error('Redis incrBy error:', error_16);
                            return [2 /*return*/, null];
                        case 4: return [2 /*return*/];
                    }
                });
            });
        };
        RedisService_1.prototype.zAdd = function (key, score, value) {
            return __awaiter(this, void 0, void 0, function () {
                var error_17;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!this.isConnected)
                                return [2 /*return*/, false];
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, this.client.zAdd(key, [{ score: score, value: value }])];
                        case 2:
                            _a.sent();
                            return [2 /*return*/, true];
                        case 3:
                            error_17 = _a.sent();
                            console.error('Redis zAdd error:', error_17);
                            return [2 /*return*/, false];
                        case 4: return [2 /*return*/];
                    }
                });
            });
        };
        RedisService_1.prototype.zIncrBy = function (key, increment, member) {
            return __awaiter(this, void 0, void 0, function () {
                var error_18;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!this.isConnected)
                                return [2 /*return*/, null];
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, this.client.zIncrBy(key, increment, member)];
                        case 2: return [2 /*return*/, _a.sent()];
                        case 3:
                            error_18 = _a.sent();
                            console.error('Redis zIncrBy error:', error_18);
                            return [2 /*return*/, null];
                        case 4: return [2 /*return*/];
                    }
                });
            });
        };
        RedisService_1.prototype.zRangeWithScores = function (key, start, stop, options) {
            return __awaiter(this, void 0, void 0, function () {
                var error_19;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!this.isConnected)
                                return [2 /*return*/, []];
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, this.client.zRangeWithScores(key, start, stop, options)];
                        case 2: return [2 /*return*/, _a.sent()];
                        case 3:
                            error_19 = _a.sent();
                            console.error('Redis zRangeWithScores error:', error_19);
                            return [2 /*return*/, []];
                        case 4: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Flush all keys (use with caution!)
         */
        RedisService_1.prototype.flushAll = function () {
            return __awaiter(this, void 0, void 0, function () {
                var error_20;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!this.isConnected)
                                return [2 /*return*/, false];
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, this.client.flushAll()];
                        case 2:
                            _a.sent();
                            return [2 /*return*/, true];
                        case 3:
                            error_20 = _a.sent();
                            console.error('Redis flushAll error:', error_20);
                            return [2 /*return*/, false];
                        case 4: return [2 /*return*/];
                    }
                });
            });
        };
        return RedisService_1;
    }());
    __setFunctionName(_classThis, "RedisService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        RedisService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return RedisService = _classThis;
}();
exports.RedisService = RedisService;
