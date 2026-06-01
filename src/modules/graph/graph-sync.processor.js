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
exports.GraphSyncProcessor = void 0;
var bull_1 = require("@nestjs/bull");
var GraphSyncProcessor = function () {
    var _classDecorators = [(0, bull_1.Processor)('graph-sync')];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _instanceExtraInitializers = [];
    var _handlePostSync_decorators;
    var _handleLikeSync_decorators;
    var _handleCommentSync_decorators;
    var _handleBatchSync_decorators;
    var GraphSyncProcessor = _classThis = /** @class */ (function () {
        function GraphSyncProcessor_1(neo4j) {
            this.neo4j = (__runInitializers(this, _instanceExtraInitializers), neo4j);
        }
        GraphSyncProcessor_1.prototype.handlePostSync = function (job) {
            return __awaiter(this, void 0, void 0, function () {
                var _a, postId, authorId, createdAt, action, updatedAt, session, error_1;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _a = job.data, postId = _a.postId, authorId = _a.authorId, createdAt = _a.createdAt, action = _a.action, updatedAt = _a.updatedAt;
                            // Validate job data
                            if (!postId || !authorId || !action) {
                                console.error('Invalid post sync job data:', job.data);
                                return [2 /*return*/];
                            }
                            session = this.neo4j.getSession();
                            _b.label = 1;
                        case 1:
                            _b.trys.push([1, 8, 9, 11]);
                            if (!(action === 'CREATE')) return [3 /*break*/, 3];
                            return [4 /*yield*/, session.run("\n          MERGE (post:Post {id: $postId})\n          SET post.createdAt = datetime($createdAt)\n\n          WITH post\n          MATCH (author:User {id: $authorId})\n          MERGE (author)-[:POSTED]->(post)\n        ", {
                                    postId: postId,
                                    authorId: authorId,
                                    createdAt: createdAt
                                        ? new Date(createdAt).toISOString()
                                        : new Date().toISOString(),
                                })];
                        case 2:
                            _b.sent();
                            console.log("\u2713 Created post ".concat(postId, " in Neo4j"));
                            return [3 /*break*/, 7];
                        case 3:
                            if (!(action === 'UPDATE')) return [3 /*break*/, 5];
                            return [4 /*yield*/, session.run("\n          MATCH (post:Post {id: $postId})\n          SET post.updatedAt = datetime($updatedAt)\n        ", {
                                    postId: postId,
                                    updatedAt: (updatedAt
                                        ? new Date(updatedAt)
                                        : new Date()).toISOString(),
                                })];
                        case 4:
                            _b.sent();
                            console.log("\u2713 Updated post ".concat(postId, " in Neo4j"));
                            return [3 /*break*/, 7];
                        case 5:
                            if (!(action === 'DELETE')) return [3 /*break*/, 7];
                            return [4 /*yield*/, session.run("\n          MATCH (post:Post {id: $postId})\n          DETACH DELETE post\n        ", { postId: postId })];
                        case 6:
                            _b.sent();
                            console.log("\u2713 Deleted post ".concat(postId, " from Neo4j"));
                            _b.label = 7;
                        case 7: return [3 /*break*/, 11];
                        case 8:
                            error_1 = _b.sent();
                            console.error('Neo4j post sync failed:', error_1);
                            throw error_1;
                        case 9: return [4 /*yield*/, session.close()];
                        case 10:
                            _b.sent();
                            return [7 /*endfinally*/];
                        case 11: return [2 /*return*/];
                    }
                });
            });
        };
        GraphSyncProcessor_1.prototype.handleLikeSync = function (job) {
            return __awaiter(this, void 0, void 0, function () {
                var _a, userId, postId, action, timestamp, session, error_2;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _a = job.data, userId = _a.userId, postId = _a.postId, action = _a.action, timestamp = _a.timestamp;
                            // Validate job data
                            if (!userId || !postId || !action) {
                                console.error('Invalid like sync job data:', job.data);
                                return [2 /*return*/];
                            }
                            session = this.neo4j.getSession();
                            _b.label = 1;
                        case 1:
                            _b.trys.push([1, 6, 7, 9]);
                            if (!(action === 'LIKE')) return [3 /*break*/, 3];
                            return [4 /*yield*/, session.run("\n          MATCH (user:User {id: $userId})\n          MATCH (post:Post {id: $postId})\n          MERGE (user)-[like:LIKED]->(post)\n          SET like.timestamp = datetime($timestamp)\n\n          WITH user, post\n          MATCH (post)<-[:POSTED]-(author:User)\n          MERGE (user)-[affinity:INTERACTED_WITH]->(author)\n          SET affinity.score = COALESCE(affinity.score, 0) + 1,\n              affinity.lastInteraction = datetime($timestamp)\n        ", {
                                    userId: userId,
                                    postId: postId,
                                    timestamp: (timestamp
                                        ? new Date(timestamp)
                                        : new Date()).toISOString(),
                                })];
                        case 2:
                            _b.sent();
                            return [3 /*break*/, 5];
                        case 3:
                            if (!(action === 'UNLIKE')) return [3 /*break*/, 5];
                            return [4 /*yield*/, session.run("\n          MATCH (user:User {id: $userId})-[like:LIKED]->(post:Post {id: $postId})\n          DELETE like\n        ", { userId: userId, postId: postId })];
                        case 4:
                            _b.sent();
                            _b.label = 5;
                        case 5:
                            console.log("\u2713 Synced ".concat(action, " for user ").concat(userId, " on post ").concat(postId));
                            return [3 /*break*/, 9];
                        case 6:
                            error_2 = _b.sent();
                            console.error('Neo4j like sync failed:', error_2);
                            throw error_2;
                        case 7: return [4 /*yield*/, session.close()];
                        case 8:
                            _b.sent();
                            return [7 /*endfinally*/];
                        case 9: return [2 /*return*/];
                    }
                });
            });
        };
        GraphSyncProcessor_1.prototype.handleCommentSync = function (job) {
            return __awaiter(this, void 0, void 0, function () {
                var _a, userId, postId, commentId, timestamp, action, session, error_3;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _a = job.data, userId = _a.userId, postId = _a.postId, commentId = _a.commentId, timestamp = _a.timestamp, action = _a.action;
                            // Validate job data
                            if (!userId || !postId || !commentId || !timestamp) {
                                console.error('Invalid comment sync job data:', job.data);
                                return [2 /*return*/];
                            }
                            session = this.neo4j.getSession();
                            _b.label = 1;
                        case 1:
                            _b.trys.push([1, 6, 7, 9]);
                            if (!(action === 'DELETE')) return [3 /*break*/, 3];
                            return [4 /*yield*/, session.run("\n          MATCH (user:User {id: $userId})-[commented:COMMENTED]->(post:Post {id: $postId})\n          WHERE commented.commentId = $commentId\n          DELETE commented\n        ", { userId: userId, postId: postId, commentId: commentId })];
                        case 2:
                            _b.sent();
                            console.log("\u2713 Synced comment deletion for user ".concat(userId, " on post ").concat(postId));
                            return [3 /*break*/, 5];
                        case 3: return [4 /*yield*/, session.run("\n          MATCH (user:User {id: $userId})\n          MATCH (post:Post {id: $postId})\n          MERGE (user)-[commented:COMMENTED]->(post)\n          SET commented.timestamp = datetime($timestamp),\n              commented.commentId = $commentId\n\n          WITH user, post\n          MATCH (post)<-[:POSTED]-(author:User)\n          MERGE (user)-[affinity:INTERACTED_WITH]->(author)\n          SET affinity.score = COALESCE(affinity.score, 0) + 3,\n              affinity.lastInteraction = datetime($timestamp)\n        ", {
                                userId: userId,
                                postId: postId,
                                commentId: commentId,
                                timestamp: (timestamp
                                    ? new Date(timestamp)
                                    : new Date()).toISOString(),
                            })];
                        case 4:
                            _b.sent();
                            console.log("\u2713 Synced comment for user ".concat(userId, " on post ").concat(postId));
                            _b.label = 5;
                        case 5: return [3 /*break*/, 9];
                        case 6:
                            error_3 = _b.sent();
                            console.error('Neo4j comment sync failed:', error_3);
                            throw error_3;
                        case 7: return [4 /*yield*/, session.close()];
                        case 8:
                            _b.sent();
                            return [7 /*endfinally*/];
                        case 9: return [2 /*return*/];
                    }
                });
            });
        };
        GraphSyncProcessor_1.prototype.handleBatchSync = function (job) {
            return __awaiter(this, void 0, void 0, function () {
                var posts, session, error_4;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            posts = job.data.posts;
                            // Validate job data
                            if (!posts || !Array.isArray(posts) || posts.length === 0) {
                                console.error('Invalid batch sync job data:', job.data);
                                return [2 /*return*/];
                            }
                            session = this.neo4j.getSession();
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, 4, 6]);
                            return [4 /*yield*/, session.run("\n        UNWIND $posts as postData\n        MERGE (post:Post {id: postData.id})\n        SET post.createdAt = datetime(postData.createdAt)\n\n        WITH post, postData\n        MATCH (author:User {id: postData.authorId})\n        MERGE (author)-[:POSTED]->(post)\n      ", { posts: posts })];
                        case 2:
                            _a.sent();
                            console.log("\u2713 Batch synced ".concat(posts.length, " posts"));
                            return [3 /*break*/, 6];
                        case 3:
                            error_4 = _a.sent();
                            console.error('Batch sync failed:', error_4);
                            throw error_4;
                        case 4: return [4 /*yield*/, session.close()];
                        case 5:
                            _a.sent();
                            return [7 /*endfinally*/];
                        case 6: return [2 /*return*/];
                    }
                });
            });
        };
        return GraphSyncProcessor_1;
    }());
    __setFunctionName(_classThis, "GraphSyncProcessor");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _handlePostSync_decorators = [(0, bull_1.Process)('sync-post')];
        _handleLikeSync_decorators = [(0, bull_1.Process)('sync-like')];
        _handleCommentSync_decorators = [(0, bull_1.Process)('sync-comment')];
        _handleBatchSync_decorators = [(0, bull_1.Process)('batch-sync-posts')];
        __esDecorate(_classThis, null, _handlePostSync_decorators, { kind: "method", name: "handlePostSync", static: false, private: false, access: { has: function (obj) { return "handlePostSync" in obj; }, get: function (obj) { return obj.handlePostSync; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _handleLikeSync_decorators, { kind: "method", name: "handleLikeSync", static: false, private: false, access: { has: function (obj) { return "handleLikeSync" in obj; }, get: function (obj) { return obj.handleLikeSync; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _handleCommentSync_decorators, { kind: "method", name: "handleCommentSync", static: false, private: false, access: { has: function (obj) { return "handleCommentSync" in obj; }, get: function (obj) { return obj.handleCommentSync; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _handleBatchSync_decorators, { kind: "method", name: "handleBatchSync", static: false, private: false, access: { has: function (obj) { return "handleBatchSync" in obj; }, get: function (obj) { return obj.handleBatchSync; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        GraphSyncProcessor = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return GraphSyncProcessor = _classThis;
}();
exports.GraphSyncProcessor = GraphSyncProcessor;
