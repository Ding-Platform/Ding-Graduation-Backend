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
exports.MongodbService = void 0;
var common_1 = require("@nestjs/common");
var mongodb_1 = require("mongodb");
var env_var_1 = require("env-var");
var MongodbService = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var MongodbService = _classThis = /** @class */ (function () {
        function MongodbService_1() {
            this.isConnected = false;
        }
        MongodbService_1.prototype.onModuleInit = function () {
            return __awaiter(this, void 0, void 0, function () {
                var mongoUri, uri, dbName, maxRetries, baseDelay, _loop_1, this_1, attempt, state_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (process.env.NODE_ENV === 'test') {
                                return [2 /*return*/];
                            }
                            mongoUri = (0, env_var_1.get)('MONGODB_URI').asString();
                            // Skip MongoDB in development if not configured
                            if (!mongoUri && process.env.NODE_ENV === 'development') {
                                console.log('⚠️  MongoDB not configured, chat features may be limited');
                                return [2 /*return*/];
                            }
                            uri = mongoUri || 'mongodb://localhost:27017';
                            dbName = (0, env_var_1.get)('MONGODB_DB_NAME').default('ding_chat').asString();
                            maxRetries = 5;
                            baseDelay = 2000;
                            _loop_1 = function (attempt) {
                                var error_1, delay_1;
                                return __generator(this, function (_b) {
                                    switch (_b.label) {
                                        case 0:
                                            _b.trys.push([0, 4, , 6]);
                                            this_1.client = new mongodb_1.MongoClient(uri, {
                                                maxPoolSize: 10,
                                                minPoolSize: 2,
                                                maxIdleTimeMS: 30000,
                                                connectTimeoutMS: 10000,
                                                serverSelectionTimeoutMS: 10000,
                                            });
                                            return [4 /*yield*/, this_1.client.connect()];
                                        case 1:
                                            _b.sent();
                                            this_1.db = this_1.client.db(dbName);
                                            // Verify connection
                                            return [4 /*yield*/, this_1.db.command({ ping: 1 })];
                                        case 2:
                                            // Verify connection
                                            _b.sent();
                                            this_1.isConnected = true;
                                            console.log('✅ MongoDB connected successfully');
                                            // Create indexes for optimal performance
                                            return [4 /*yield*/, this_1.createIndexes()];
                                        case 3:
                                            // Create indexes for optimal performance
                                            _b.sent();
                                            return [2 /*return*/, { value: void 0 }];
                                        case 4:
                                            error_1 = _b.sent();
                                            if (attempt === maxRetries) {
                                                console.error('Failed to connect to MongoDB after', maxRetries, 'attempts:', error_1);
                                                // Don't throw in development, just log warning
                                                if (process.env.NODE_ENV === 'development') {
                                                    console.log('⚠️  MongoDB connection failed, chat features disabled');
                                                    return [2 /*return*/, { value: void 0 }];
                                                }
                                                throw error_1;
                                            }
                                            delay_1 = baseDelay * Math.pow(2, attempt - 1);
                                            console.log("MongoDB connection attempt ".concat(attempt, " failed, retrying in ").concat(delay_1, "ms..."));
                                            return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, delay_1); })];
                                        case 5:
                                            _b.sent();
                                            return [3 /*break*/, 6];
                                        case 6: return [2 /*return*/];
                                    }
                                });
                            };
                            this_1 = this;
                            attempt = 1;
                            _a.label = 1;
                        case 1:
                            if (!(attempt <= maxRetries)) return [3 /*break*/, 4];
                            return [5 /*yield**/, _loop_1(attempt)];
                        case 2:
                            state_1 = _a.sent();
                            if (typeof state_1 === "object")
                                return [2 /*return*/, state_1.value];
                            _a.label = 3;
                        case 3:
                            attempt++;
                            return [3 /*break*/, 1];
                        case 4: return [2 /*return*/];
                    }
                });
            });
        };
        MongodbService_1.prototype.onModuleDestroy = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!(this.client && this.isConnected)) return [3 /*break*/, 2];
                            return [4 /*yield*/, this.client.close()];
                        case 1:
                            _a.sent();
                            console.log('MongoDB connection closed');
                            _a.label = 2;
                        case 2: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Create indexes for optimal query performance
         */
        MongodbService_1.prototype.createIndexes = function () {
            return __awaiter(this, void 0, void 0, function () {
                var messages, rooms, roomMembers, reactions, readReceipts, messageMedia, editHistory, pinnedMessages, error_2;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 19, , 20]);
                            messages = this.db.collection('messages');
                            return [4 /*yield*/, messages.createIndex({ roomId: 1, createdAt: -1 })];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, messages.createIndex({ userId: 1 })];
                        case 2:
                            _a.sent();
                            return [4 /*yield*/, messages.createIndex({ replyToId: 1 })];
                        case 3:
                            _a.sent();
                            return [4 /*yield*/, messages.createIndex({ deletedAt: 1 })];
                        case 4:
                            _a.sent();
                            rooms = this.db.collection('rooms');
                            return [4 /*yield*/, rooms.createIndex({ type: 1 })];
                        case 5:
                            _a.sent();
                            return [4 /*yield*/, rooms.createIndex({ lastMessageAt: -1 })];
                        case 6:
                            _a.sent();
                            return [4 /*yield*/, rooms.createIndex({ createdById: 1 })];
                        case 7:
                            _a.sent();
                            roomMembers = this.db.collection('room_members');
                            return [4 /*yield*/, roomMembers.createIndex({ roomId: 1, userId: 1 }, { unique: true })];
                        case 8:
                            _a.sent();
                            return [4 /*yield*/, roomMembers.createIndex({ userId: 1 })];
                        case 9:
                            _a.sent();
                            return [4 /*yield*/, roomMembers.createIndex({ roomId: 1, role: 1 })];
                        case 10:
                            _a.sent();
                            reactions = this.db.collection('message_reactions');
                            return [4 /*yield*/, reactions.createIndex({ messageId: 1, userId: 1, emoji: 1 }, { unique: true })];
                        case 11:
                            _a.sent();
                            return [4 /*yield*/, reactions.createIndex({ messageId: 1 })];
                        case 12:
                            _a.sent();
                            readReceipts = this.db.collection('read_receipts');
                            return [4 /*yield*/, readReceipts.createIndex({ messageId: 1, userId: 1 }, { unique: true })];
                        case 13:
                            _a.sent();
                            return [4 /*yield*/, readReceipts.createIndex({ userId: 1, roomId: 1 })];
                        case 14:
                            _a.sent();
                            messageMedia = this.db.collection('message_media');
                            return [4 /*yield*/, messageMedia.createIndex({ messageId: 1 })];
                        case 15:
                            _a.sent();
                            editHistory = this.db.collection('message_edit_history');
                            return [4 /*yield*/, editHistory.createIndex({ messageId: 1, editedAt: -1 })];
                        case 16:
                            _a.sent();
                            pinnedMessages = this.db.collection('pinned_messages');
                            return [4 /*yield*/, pinnedMessages.createIndex({ roomId: 1, messageId: 1 }, { unique: true })];
                        case 17:
                            _a.sent();
                            return [4 /*yield*/, pinnedMessages.createIndex({ roomId: 1 })];
                        case 18:
                            _a.sent();
                            console.log('✅ MongoDB indexes created successfully');
                            return [3 /*break*/, 20];
                        case 19:
                            error_2 = _a.sent();
                            console.error('Failed to create MongoDB indexes:', error_2);
                            return [3 /*break*/, 20];
                        case 20: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Check if MongoDB is connected
         */
        MongodbService_1.prototype.isReady = function () {
            return this.isConnected;
        };
        /**
         * Get the MongoDB database instance
         */
        MongodbService_1.prototype.getDb = function () {
            if (!this.isConnected) {
                throw new Error('MongoDB is not connected');
            }
            return this.db;
        };
        /**
         * Get a collection by name with type safety
         */
        MongodbService_1.prototype.getCollection = function (name) {
            if (!this.isConnected) {
                throw new Error('MongoDB is not connected');
            }
            return this.db.collection(name);
        };
        /**
         * Get the MongoDB client for advanced operations
         */
        MongodbService_1.prototype.getClient = function () {
            if (!this.isConnected) {
                throw new Error('MongoDB is not connected');
            }
            return this.client;
        };
        return MongodbService_1;
    }());
    __setFunctionName(_classThis, "MongodbService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        MongodbService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return MongodbService = _classThis;
}();
exports.MongodbService = MongodbService;
