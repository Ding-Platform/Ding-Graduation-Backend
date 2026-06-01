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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Neo4jService = void 0;
var common_1 = require("@nestjs/common");
var neo4j_driver_1 = __importDefault(require("neo4j-driver"));
var env_var_1 = require("env-var");
var Neo4jService = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var Neo4jService = _classThis = /** @class */ (function () {
        function Neo4jService_1() {
            this.connected = false;
        }
        Neo4jService_1.prototype.onModuleInit = function () {
            return __awaiter(this, void 0, void 0, function () {
                var uri, username, password, neo4jAuth, _a, authUsername, authPassword, maxRetries, baseDelay, _loop_1, this_1, attempt, state_1;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            if (process.env.NODE_ENV === 'test') {
                                this.connected = false;
                                return [2 /*return*/];
                            }
                            uri = (0, env_var_1.get)('NEO4J_URI').default('bolt://localhost:7687').asString();
                            neo4jAuth = (0, env_var_1.get)('NEO4J_AUTH').asString();
                            if (neo4jAuth) {
                                _a = neo4jAuth.split('/'), authUsername = _a[0], authPassword = _a[1];
                                if (!authUsername || !authPassword) {
                                    throw new Error('NEO4J_AUTH must be in format: username/password');
                                }
                                username = authUsername;
                                password = authPassword;
                            }
                            else {
                                // Fall back to individual variables
                                username = (0, env_var_1.get)('NEO4J_USERNAME').default('neo4j').asString();
                                password = (0, env_var_1.get)('NEO4J_PASSWORD').required().asString();
                            }
                            this.driver = neo4j_driver_1.default.driver(uri, neo4j_driver_1.default.auth.basic(username, password));
                            maxRetries = 5;
                            baseDelay = 2000;
                            _loop_1 = function (attempt) {
                                var error_1, delay_1;
                                return __generator(this, function (_c) {
                                    switch (_c.label) {
                                        case 0:
                                            _c.trys.push([0, 2, , 4]);
                                            return [4 /*yield*/, this_1.driver.verifyConnectivity()];
                                        case 1:
                                            _c.sent();
                                            this_1.connected = true;
                                            console.log('Neo4j connected successfully');
                                            console.log('Neo4j URL: ', uri);
                                            return [2 /*return*/, { value: void 0 }];
                                        case 2:
                                            error_1 = _c.sent();
                                            if (attempt === maxRetries) {
                                                console.error('Failed to connect to Neo4j after', maxRetries, 'attempts:', error_1);
                                                throw error_1;
                                            }
                                            delay_1 = baseDelay * Math.pow(2, attempt - 1);
                                            console.log("Neo4j connection attempt ".concat(attempt, " failed, retrying in ").concat(delay_1, "ms..."));
                                            return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, delay_1); })];
                                        case 3:
                                            _c.sent();
                                            return [3 /*break*/, 4];
                                        case 4: return [2 /*return*/];
                                    }
                                });
                            };
                            this_1 = this;
                            attempt = 1;
                            _b.label = 1;
                        case 1:
                            if (!(attempt <= maxRetries)) return [3 /*break*/, 4];
                            return [5 /*yield**/, _loop_1(attempt)];
                        case 2:
                            state_1 = _b.sent();
                            if (typeof state_1 === "object")
                                return [2 /*return*/, state_1.value];
                            _b.label = 3;
                        case 3:
                            attempt++;
                            return [3 /*break*/, 1];
                        case 4: return [2 /*return*/];
                    }
                });
            });
        };
        Neo4jService_1.prototype.onModuleDestroy = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!this.driver) return [3 /*break*/, 2];
                            return [4 /*yield*/, this.driver.close()];
                        case 1:
                            _a.sent();
                            console.log('Neo4j connection closed');
                            _a.label = 2;
                        case 2:
                            this.connected = false;
                            return [2 /*return*/];
                    }
                });
            });
        };
        Neo4jService_1.prototype.getDriver = function () {
            return this.driver;
        };
        Neo4jService_1.prototype.isConnected = function () {
            return this.connected && !!this.driver;
        };
        Neo4jService_1.prototype.getSession = function (database) {
            if (!this.driver) {
                throw new Error('Neo4j driver is not initialized');
            }
            return this.driver.session({
                database: database || 'neo4j',
            });
        };
        return Neo4jService_1;
    }());
    __setFunctionName(_classThis, "Neo4jService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        Neo4jService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Neo4jService = _classThis;
}();
exports.Neo4jService = Neo4jService;
