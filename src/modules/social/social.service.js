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
exports.SocialService = void 0;
var common_1 = require("@nestjs/common");
var generic_http_exception_1 = require("src/common/application/exceptions/generic-http-exception");
var error_messages_constant_1 = require("src/common/constants/error-messages.constant");
var neo4j_driver_1 = __importDefault(require("neo4j-driver"));
var SocialService = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var SocialService = _classThis = /** @class */ (function () {
        function SocialService_1(neo4jservice, prisma, notificationService, activityService) {
            this.neo4jservice = neo4jservice;
            this.prisma = prisma;
            this.notificationService = notificationService;
            this.activityService = activityService;
        }
        SocialService_1.prototype.isGraphConnected = function () {
            return this.neo4jservice.isConnected();
        };
        /**
         * Safely convert Neo4j Integer or Float to JavaScript number
         */
        SocialService_1.prototype.toNumber = function (value) {
            if (value == null) {
                return 0;
            }
            // Neo4j Integer has toNumber() method
            if (typeof value.toNumber === 'function') {
                return value.toNumber();
            }
            // Already a number (Float or regular number)
            if (typeof value === 'number') {
                return value;
            }
            // Fallback: try to parse as number
            return Number(value) || 0;
        };
        /**
         * Check if a user node exists in Neo4j
         */
        SocialService_1.prototype.userExists = function (userId) {
            return __awaiter(this, void 0, void 0, function () {
                var session, result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            session = this.neo4jservice.getSession();
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, , 3, 5]);
                            return [4 /*yield*/, session.run("MATCH (u:User {userId: $userId})\n             RETURN count(u) > 0 as exists", { userId: userId })];
                        case 2:
                            result = _a.sent();
                            return [2 /*return*/, result.records[0].get('exists')];
                        case 3: return [4 /*yield*/, session.close()];
                        case 4:
                            _a.sent();
                            return [7 /*endfinally*/];
                        case 5: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Check if a friend request exists
         */
        SocialService_1.prototype.friendRequestExists = function (fromUserId, toUserId) {
            return __awaiter(this, void 0, void 0, function () {
                var session, result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            session = this.neo4jservice.getSession();
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, , 3, 5]);
                            return [4 /*yield*/, session.run("MATCH (from:User {userId: $fromUserId})-[r:FRIEND_REQUEST]->(to:User {userId: $toUserId})\n             RETURN count(r) > 0 as exists", { fromUserId: fromUserId, toUserId: toUserId })];
                        case 2:
                            result = _a.sent();
                            return [2 /*return*/, result.records[0].get('exists')];
                        case 3: return [4 /*yield*/, session.close()];
                        case 4:
                            _a.sent();
                            return [7 /*endfinally*/];
                        case 5: return [2 /*return*/];
                    }
                });
            });
        };
        SocialService_1.prototype.createUserNode = function (userId, data) {
            return __awaiter(this, void 0, void 0, function () {
                var session;
                var _a, _b, _c, _d;
                return __generator(this, function (_e) {
                    switch (_e.label) {
                        case 0:
                            session = this.neo4jservice.getSession();
                            _e.label = 1;
                        case 1:
                            _e.trys.push([1, , 3, 5]);
                            return [4 /*yield*/, session.run("MERGE (u:User {userId: $userId})\n             SET u.id = $userId,\n                 u.name = $name,\n                 u.username = $username,\n                 u.location = $location,\n                 u.coverPhoto = $coverPhoto,\n                 u.updatedAt = datetime()", {
                                    userId: userId,
                                    name: (_a = data === null || data === void 0 ? void 0 : data.name) !== null && _a !== void 0 ? _a : null,
                                    username: (_b = data === null || data === void 0 ? void 0 : data.username) !== null && _b !== void 0 ? _b : null,
                                    location: (_c = data === null || data === void 0 ? void 0 : data.location) !== null && _c !== void 0 ? _c : null,
                                    coverPhoto: (_d = data === null || data === void 0 ? void 0 : data.coverPhoto) !== null && _d !== void 0 ? _d : null,
                                })];
                        case 2:
                            _e.sent();
                            return [3 /*break*/, 5];
                        case 3: return [4 /*yield*/, session.close()];
                        case 4:
                            _e.sent();
                            return [7 /*endfinally*/];
                        case 5: return [2 /*return*/];
                    }
                });
            });
        };
        SocialService_1.prototype.deleteUserNode = function (userId) {
            return __awaiter(this, void 0, void 0, function () {
                var session;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            session = this.neo4jservice.getSession();
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, , 3, 5]);
                            return [4 /*yield*/, session.run("MATCH (u:User {userId: $userId})\n             DETACH DELETE u", { userId: userId })];
                        case 2:
                            _a.sent();
                            return [3 /*break*/, 5];
                        case 3: return [4 /*yield*/, session.close()];
                        case 4:
                            _a.sent();
                            return [7 /*endfinally*/];
                        case 5: return [2 /*return*/];
                    }
                });
            });
        };
        SocialService_1.prototype.toggleSendFriendRequest = function (fromUserId, toUserId) {
            return __awaiter(this, void 0, void 0, function () {
                var session, fromUserExists, toUserExists, alreadyFriends, reverseRequestExists, requestExists, error_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            // Validate: Cannot send friend request to yourself
                            if (fromUserId === toUserId) {
                                throw new generic_http_exception_1.GenericHttpException(error_messages_constant_1.ERROR_MESSAGES.CANNOT_SEND_FRIEND_REQUEST_TO_SELF, common_1.HttpStatus.BAD_REQUEST);
                            }
                            session = this.neo4jservice.getSession();
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 12, 13, 15]);
                            return [4 /*yield*/, this.userExists(fromUserId)];
                        case 2:
                            fromUserExists = _a.sent();
                            return [4 /*yield*/, this.userExists(toUserId)];
                        case 3:
                            toUserExists = _a.sent();
                            if (!fromUserExists || !toUserExists) {
                                throw new generic_http_exception_1.GenericHttpException(error_messages_constant_1.ERROR_MESSAGES.USER_NOT_FOUND_IN_SOCIAL, common_1.HttpStatus.NOT_FOUND);
                            }
                            return [4 /*yield*/, this.areFriends(fromUserId, toUserId)];
                        case 4:
                            alreadyFriends = _a.sent();
                            if (alreadyFriends) {
                                throw new generic_http_exception_1.GenericHttpException(error_messages_constant_1.ERROR_MESSAGES.ALREADY_FRIENDS, common_1.HttpStatus.BAD_REQUEST);
                            }
                            return [4 /*yield*/, this.friendRequestExists(toUserId, fromUserId)];
                        case 5:
                            reverseRequestExists = _a.sent();
                            if (reverseRequestExists) {
                                throw new generic_http_exception_1.GenericHttpException(error_messages_constant_1.ERROR_MESSAGES.ALREADY_HAVE_FRIEND_REQUEST, common_1.HttpStatus.BAD_REQUEST);
                            }
                            return [4 /*yield*/, this.friendRequestExists(fromUserId, toUserId)];
                        case 6:
                            requestExists = _a.sent();
                            if (!requestExists) return [3 /*break*/, 8];
                            // Delete the existing friend request
                            return [4 /*yield*/, session.run("MATCH (from:User {userId: $fromUserId})-[r:FRIEND_REQUEST]->(to:User {userId: $toUserId})\n               DELETE r", { fromUserId: fromUserId, toUserId: toUserId })];
                        case 7:
                            // Delete the existing friend request
                            _a.sent();
                            return [3 /*break*/, 11];
                        case 8: 
                        // Create friend request (toggle on)
                        return [4 /*yield*/, session.run("MATCH (from:User {userId: $fromUserId})\n               MATCH (to:User {userId: $toUserId})\n               MERGE (from)-[r:FRIEND_REQUEST]->(to)\n               SET r.createdAt = datetime()", { fromUserId: fromUserId, toUserId: toUserId })];
                        case 9:
                            // Create friend request (toggle on)
                            _a.sent();
                            // Send notification
                            return [4 /*yield*/, this.notificationService.notifyFriendRequest(fromUserId, toUserId)];
                        case 10:
                            // Send notification
                            _a.sent();
                            this.activityService.logActivity(fromUserId, 'SENT_FRIEND_REQUEST', toUserId, 'USER');
                            _a.label = 11;
                        case 11: return [3 /*break*/, 15];
                        case 12:
                            error_1 = _a.sent();
                            if (error_1 instanceof generic_http_exception_1.GenericHttpException) {
                                throw error_1;
                            }
                            throw new generic_http_exception_1.GenericHttpException(error_messages_constant_1.ERROR_MESSAGES.FRIEND_REQUEST_FAILED, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
                        case 13: return [4 /*yield*/, session.close()];
                        case 14:
                            _a.sent();
                            return [7 /*endfinally*/];
                        case 15: return [2 /*return*/];
                    }
                });
            });
        };
        SocialService_1.prototype.acceptFriendRequest = function (fromUserId, toUserId) {
            return __awaiter(this, void 0, void 0, function () {
                var session, fromUserExists, toUserExists, alreadyFriends, requestExists, result, error_2;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            session = this.neo4jservice.getSession();
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 7, 8, 11]);
                            return [4 /*yield*/, this.userExists(fromUserId)];
                        case 2:
                            fromUserExists = _a.sent();
                            return [4 /*yield*/, this.userExists(toUserId)];
                        case 3:
                            toUserExists = _a.sent();
                            if (!fromUserExists || !toUserExists) {
                                throw new generic_http_exception_1.GenericHttpException(error_messages_constant_1.ERROR_MESSAGES.USER_NOT_FOUND_IN_SOCIAL, common_1.HttpStatus.NOT_FOUND);
                            }
                            return [4 /*yield*/, this.areFriends(fromUserId, toUserId)];
                        case 4:
                            alreadyFriends = _a.sent();
                            if (alreadyFriends) {
                                throw new generic_http_exception_1.GenericHttpException(error_messages_constant_1.ERROR_MESSAGES.ALREADY_FRIENDS, common_1.HttpStatus.BAD_REQUEST);
                            }
                            return [4 /*yield*/, this.friendRequestExists(fromUserId, toUserId)];
                        case 5:
                            requestExists = _a.sent();
                            if (!requestExists) {
                                throw new generic_http_exception_1.GenericHttpException(error_messages_constant_1.ERROR_MESSAGES.FRIEND_REQUEST_NOT_FOUND, common_1.HttpStatus.NOT_FOUND);
                            }
                            return [4 /*yield*/, session.run("MATCH (from:User {userId: $fromUserId})-[r:FRIEND_REQUEST]->(to:User {userId: $toUserId})\n             DELETE r\n             MERGE (from)-[:FRIENDS {createdAt: datetime()}]->(to)\n             MERGE (to)-[:FRIENDS {createdAt: datetime()}]->(from)\n             RETURN count(r) as deleted", { fromUserId: fromUserId, toUserId: toUserId })];
                        case 6:
                            result = _a.sent();
                            // Verify the request was deleted
                            if (result.records[0].get('deleted').toNumber() === 0) {
                                throw new generic_http_exception_1.GenericHttpException(error_messages_constant_1.ERROR_MESSAGES.FRIEND_REQUEST_NOT_FOUND, common_1.HttpStatus.NOT_FOUND);
                            }
                            return [3 /*break*/, 11];
                        case 7:
                            error_2 = _a.sent();
                            if (error_2 instanceof generic_http_exception_1.GenericHttpException) {
                                throw error_2;
                            }
                            throw new generic_http_exception_1.GenericHttpException(error_messages_constant_1.ERROR_MESSAGES.ACCEPT_FRIEND_REQUEST_FAILED, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
                        case 8: 
                        // notify the user that their friend request was accepted
                        return [4 /*yield*/, this.notificationService.notifyFriendRequestAccepted(toUserId, fromUserId)];
                        case 9:
                            // notify the user that their friend request was accepted
                            _a.sent();
                            this.activityService.logActivity(fromUserId, 'ACCEPTED_FRIEND_REQUEST', toUserId, 'USER');
                            return [4 /*yield*/, session.close()];
                        case 10:
                            _a.sent();
                            return [7 /*endfinally*/];
                        case 11: return [2 /*return*/];
                    }
                });
            });
        };
        SocialService_1.prototype.rejectFriendRequest = function (fromUserId, toUserId) {
            return __awaiter(this, void 0, void 0, function () {
                var session, fromUserExists, toUserExists, requestExists, error_3;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            session = this.neo4jservice.getSession();
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 6, 7, 9]);
                            return [4 /*yield*/, this.userExists(fromUserId)];
                        case 2:
                            fromUserExists = _a.sent();
                            return [4 /*yield*/, this.userExists(toUserId)];
                        case 3:
                            toUserExists = _a.sent();
                            if (!fromUserExists || !toUserExists) {
                                throw new generic_http_exception_1.GenericHttpException(error_messages_constant_1.ERROR_MESSAGES.USER_NOT_FOUND_IN_SOCIAL, common_1.HttpStatus.NOT_FOUND);
                            }
                            return [4 /*yield*/, this.friendRequestExists(fromUserId, toUserId)];
                        case 4:
                            requestExists = _a.sent();
                            if (!requestExists) {
                                throw new generic_http_exception_1.GenericHttpException(error_messages_constant_1.ERROR_MESSAGES.FRIEND_REQUEST_NOT_FOUND, common_1.HttpStatus.NOT_FOUND);
                            }
                            return [4 /*yield*/, session.run("MATCH (from:User {userId: $fromUserId})-[r:FRIEND_REQUEST]->(to:User {userId: $toUserId})\n             DELETE r", { fromUserId: fromUserId, toUserId: toUserId })];
                        case 5:
                            _a.sent();
                            return [3 /*break*/, 9];
                        case 6:
                            error_3 = _a.sent();
                            if (error_3 instanceof generic_http_exception_1.GenericHttpException) {
                                throw error_3;
                            }
                            throw new generic_http_exception_1.GenericHttpException(error_messages_constant_1.ERROR_MESSAGES.REJECT_FRIEND_REQUEST_FAILED, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
                        case 7: return [4 /*yield*/, session.close()];
                        case 8:
                            _a.sent();
                            return [7 /*endfinally*/];
                        case 9: return [2 /*return*/];
                    }
                });
            });
        };
        SocialService_1.prototype.removeFriend = function (userId1, userId2) {
            return __awaiter(this, void 0, void 0, function () {
                var session, user1Exists, user2Exists, areFriends, result, deletedCount, error_4;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            session = this.neo4jservice.getSession();
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 6, 7, 9]);
                            return [4 /*yield*/, this.userExists(userId1)];
                        case 2:
                            user1Exists = _a.sent();
                            return [4 /*yield*/, this.userExists(userId2)];
                        case 3:
                            user2Exists = _a.sent();
                            if (!user1Exists || !user2Exists) {
                                throw new generic_http_exception_1.GenericHttpException(error_messages_constant_1.ERROR_MESSAGES.USER_NOT_FOUND_IN_SOCIAL, common_1.HttpStatus.NOT_FOUND);
                            }
                            return [4 /*yield*/, this.areFriends(userId1, userId2)];
                        case 4:
                            areFriends = _a.sent();
                            if (!areFriends) {
                                throw new generic_http_exception_1.GenericHttpException(error_messages_constant_1.ERROR_MESSAGES.NOT_FRIENDS, common_1.HttpStatus.BAD_REQUEST);
                            }
                            return [4 /*yield*/, session.run("MATCH (u1:User {userId: $userId1})-[r:FRIENDS]-(u2:User {userId: $userId2})\n             DELETE r\n             RETURN count(r) as deleted", { userId1: userId1, userId2: userId2 })];
                        case 5:
                            result = _a.sent();
                            deletedCount = result.records[0].get('deleted').toNumber();
                            if (deletedCount === 0) {
                                throw new generic_http_exception_1.GenericHttpException(error_messages_constant_1.ERROR_MESSAGES.NOT_FRIENDS, common_1.HttpStatus.BAD_REQUEST);
                            }
                            return [3 /*break*/, 9];
                        case 6:
                            error_4 = _a.sent();
                            if (error_4 instanceof generic_http_exception_1.GenericHttpException) {
                                throw error_4;
                            }
                            throw new generic_http_exception_1.GenericHttpException(error_messages_constant_1.ERROR_MESSAGES.REMOVE_FRIEND_FAILED, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
                        case 7: return [4 /*yield*/, session.close()];
                        case 8:
                            _a.sent();
                            return [7 /*endfinally*/];
                        case 9: return [2 /*return*/];
                    }
                });
            });
        };
        SocialService_1.prototype.getFriends = function (userId_1) {
            return __awaiter(this, arguments, void 0, function (userId, offset, limit) {
                var session, userExists, user, offsetInt, limitInt, countResult, total, result, friendIds, profiles, profileMap_1, friends, hasMore, nextOffset, error_5;
                var _a, _b, _c, _d, _e;
                if (offset === void 0) { offset = 0; }
                if (limit === void 0) { limit = 10; }
                return __generator(this, function (_f) {
                    switch (_f.label) {
                        case 0:
                            session = this.neo4jservice.getSession();
                            _f.label = 1;
                        case 1:
                            _f.trys.push([1, 10, 11, 13]);
                            return [4 /*yield*/, this.userExists(userId)];
                        case 2:
                            userExists = _f.sent();
                            if (!!userExists) return [3 /*break*/, 6];
                            return [4 /*yield*/, this.prisma.user.findUnique({
                                    where: { id: userId },
                                    select: {
                                        id: true,
                                        email: true,
                                        name: true,
                                        Profile: {
                                            select: {
                                                location: true,
                                                coverPhoto: true,
                                            },
                                        },
                                    },
                                })];
                        case 3:
                            user = _f.sent();
                            if (!user) return [3 /*break*/, 5];
                            // Auto-create the node in Neo4j
                            return [4 /*yield*/, this.createUserNode(user.id, {
                                    name: user.name,
                                    username: user.email,
                                    location: (_b = (_a = user.Profile) === null || _a === void 0 ? void 0 : _a.location) !== null && _b !== void 0 ? _b : null,
                                    coverPhoto: (_d = (_c = user.Profile) === null || _c === void 0 ? void 0 : _c.coverPhoto) !== null && _d !== void 0 ? _d : null,
                                })];
                        case 4:
                            // Auto-create the node in Neo4j
                            _f.sent();
                            userExists = true;
                            return [3 /*break*/, 6];
                        case 5: throw new generic_http_exception_1.GenericHttpException(error_messages_constant_1.ERROR_MESSAGES.USER_NOT_FOUND_IN_SOCIAL, common_1.HttpStatus.NOT_FOUND);
                        case 6:
                            offsetInt = Math.floor(Number(offset)) || 0;
                            limitInt = Math.floor(Number(limit)) || 10;
                            if (offsetInt < 0) {
                                throw new generic_http_exception_1.GenericHttpException('Offset must be a non-negative integer', common_1.HttpStatus.BAD_REQUEST);
                            }
                            if (limitInt < 1) {
                                throw new generic_http_exception_1.GenericHttpException('Limit must be a positive integer', common_1.HttpStatus.BAD_REQUEST);
                            }
                            return [4 /*yield*/, session.run("MATCH (u:User {userId: $userId})-[:FRIENDS]->(friend:User)\n             RETURN count(friend) as total", { userId: userId })];
                        case 7:
                            countResult = _f.sent();
                            total = this.toNumber(((_e = countResult.records[0]) === null || _e === void 0 ? void 0 : _e.get('total')) || 0);
                            return [4 /*yield*/, session.run("MATCH (u:User {userId: $userId})-[:FRIENDS]->(friend:User)\n             RETURN friend.userId as userId\n             SKIP $offset\n             LIMIT $limit", { userId: userId, offset: neo4j_driver_1.default.int(offsetInt), limit: neo4j_driver_1.default.int(limitInt) })];
                        case 8:
                            result = _f.sent();
                            friendIds = result.records.map(function (r) { return r.get('userId'); });
                            return [4 /*yield*/, this.prisma.profile.findMany({
                                    where: { userId: { in: friendIds } },
                                    include: {
                                        user: true,
                                    },
                                })];
                        case 9:
                            profiles = _f.sent();
                            profileMap_1 = new Map(profiles.map(function (p) { return [p.userId, p]; }));
                            friends = friendIds
                                .map(function (id) { return profileMap_1.get(id); })
                                .filter(function (p) { return p !== undefined; });
                            hasMore = offsetInt + limitInt < total;
                            nextOffset = hasMore ? offsetInt + limitInt : null;
                            return [2 /*return*/, {
                                    data: friends,
                                    meta: {
                                        limit: limitInt,
                                        offset: offsetInt,
                                        total: total,
                                        hasMore: hasMore,
                                        nextOffset: nextOffset,
                                    },
                                }];
                        case 10:
                            error_5 = _f.sent();
                            if (error_5 instanceof generic_http_exception_1.GenericHttpException) {
                                throw error_5;
                            }
                            // Log the actual error for debugging
                            console.error('Error in getFriends:', error_5);
                            throw new generic_http_exception_1.GenericHttpException(error_messages_constant_1.ERROR_MESSAGES.GET_FRIENDS_FAILED, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
                        case 11: return [4 /*yield*/, session.close()];
                        case 12:
                            _f.sent();
                            return [7 /*endfinally*/];
                        case 13: return [2 /*return*/];
                    }
                });
            });
        };
        SocialService_1.prototype.getFriendRequests = function (userId_1) {
            return __awaiter(this, arguments, void 0, function (userId, offset, limit) {
                var session, userExists, user, offsetInt, limitInt, countResult, total, result, requesterIds, profiles, profileMap_2, requests, hasMore, nextOffset, error_6;
                var _a, _b, _c, _d, _e;
                if (offset === void 0) { offset = 0; }
                if (limit === void 0) { limit = 10; }
                return __generator(this, function (_f) {
                    switch (_f.label) {
                        case 0:
                            session = this.neo4jservice.getSession();
                            _f.label = 1;
                        case 1:
                            _f.trys.push([1, 10, 11, 13]);
                            return [4 /*yield*/, this.userExists(userId)];
                        case 2:
                            userExists = _f.sent();
                            if (!!userExists) return [3 /*break*/, 6];
                            return [4 /*yield*/, this.prisma.user.findUnique({
                                    where: { id: userId },
                                    select: {
                                        id: true,
                                        email: true,
                                        name: true,
                                        Profile: {
                                            select: {
                                                location: true,
                                                coverPhoto: true,
                                            },
                                        },
                                    },
                                })];
                        case 3:
                            user = _f.sent();
                            if (!user) return [3 /*break*/, 5];
                            // Auto-create the node in Neo4j
                            return [4 /*yield*/, this.createUserNode(user.id, {
                                    name: user.name,
                                    username: user.email,
                                    location: (_b = (_a = user.Profile) === null || _a === void 0 ? void 0 : _a.location) !== null && _b !== void 0 ? _b : null,
                                    coverPhoto: (_d = (_c = user.Profile) === null || _c === void 0 ? void 0 : _c.coverPhoto) !== null && _d !== void 0 ? _d : null,
                                })];
                        case 4:
                            // Auto-create the node in Neo4j
                            _f.sent();
                            userExists = true;
                            return [3 /*break*/, 6];
                        case 5: throw new generic_http_exception_1.GenericHttpException(error_messages_constant_1.ERROR_MESSAGES.USER_NOT_FOUND_IN_SOCIAL, common_1.HttpStatus.NOT_FOUND);
                        case 6:
                            offsetInt = Math.floor(Number(offset)) || 0;
                            limitInt = Math.floor(Number(limit)) || 10;
                            if (offsetInt < 0) {
                                throw new generic_http_exception_1.GenericHttpException('Offset must be a non-negative integer', common_1.HttpStatus.BAD_REQUEST);
                            }
                            if (limitInt < 1) {
                                throw new generic_http_exception_1.GenericHttpException('Limit must be a positive integer', common_1.HttpStatus.BAD_REQUEST);
                            }
                            return [4 /*yield*/, session.run("MATCH (from:User)-[:FRIEND_REQUEST]->(to:User {userId: $userId})\n             RETURN count(from) as total", { userId: userId })];
                        case 7:
                            countResult = _f.sent();
                            total = this.toNumber(((_e = countResult.records[0]) === null || _e === void 0 ? void 0 : _e.get('total')) || 0);
                            return [4 /*yield*/, session.run("MATCH (from:User)-[:FRIEND_REQUEST]->(to:User {userId: $userId})\n             RETURN from.userId as userId\n             SKIP $offset\n             LIMIT $limit", { userId: userId, offset: neo4j_driver_1.default.int(offsetInt), limit: neo4j_driver_1.default.int(limitInt) })];
                        case 8:
                            result = _f.sent();
                            requesterIds = result.records.map(function (r) { return r.get('userId'); });
                            return [4 /*yield*/, this.prisma.profile.findMany({
                                    where: { userId: { in: requesterIds } },
                                    include: {
                                        user: true,
                                    },
                                })];
                        case 9:
                            profiles = _f.sent();
                            profileMap_2 = new Map(profiles.map(function (p) { return [p.userId, p]; }));
                            requests = requesterIds
                                .map(function (id) { return profileMap_2.get(id); })
                                .filter(function (p) { return p !== undefined; });
                            hasMore = offsetInt + limitInt < total;
                            nextOffset = hasMore ? offsetInt + limitInt : null;
                            return [2 /*return*/, {
                                    data: requests,
                                    meta: {
                                        limit: limitInt,
                                        offset: offsetInt,
                                        total: total,
                                        hasMore: hasMore,
                                        nextOffset: nextOffset,
                                    },
                                }];
                        case 10:
                            error_6 = _f.sent();
                            if (error_6 instanceof generic_http_exception_1.GenericHttpException) {
                                throw error_6;
                            }
                            // Log the actual error for debugging
                            console.error('Error in getFriendRequests:', error_6);
                            throw new generic_http_exception_1.GenericHttpException(error_messages_constant_1.ERROR_MESSAGES.GET_FRIEND_REQUESTS_FAILED, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
                        case 11: return [4 /*yield*/, session.close()];
                        case 12:
                            _f.sent();
                            return [7 /*endfinally*/];
                        case 13: return [2 /*return*/];
                    }
                });
            });
        };
        SocialService_1.prototype.areFriends = function (userId1, userId2) {
            return __awaiter(this, void 0, void 0, function () {
                var session, result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            session = this.neo4jservice.getSession();
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, , 3, 5]);
                            return [4 /*yield*/, session.run("MATCH (u1:User {userId: $userId1})-[:FRIENDS]-(u2:User {userId: $userId2})\n             RETURN count(*) > 0 as areFriends", { userId1: userId1, userId2: userId2 })];
                        case 2:
                            result = _a.sent();
                            return [2 /*return*/, result.records[0].get('areFriends')];
                        case 3: return [4 /*yield*/, session.close()];
                        case 4:
                            _a.sent();
                            return [7 /*endfinally*/];
                        case 5: return [2 /*return*/];
                    }
                });
            });
        };
        SocialService_1.prototype.followUser = function (followerId, followeeId) {
            return __awaiter(this, void 0, void 0, function () {
                var session, followerExists, followeeExists, error_7;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            // Validate: Cannot follow yourself
                            if (followerId === followeeId) {
                                throw new generic_http_exception_1.GenericHttpException(error_messages_constant_1.ERROR_MESSAGES.CANNOT_FOLLOW_SELF, common_1.HttpStatus.BAD_REQUEST);
                            }
                            session = this.neo4jservice.getSession();
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 5, 6, 9]);
                            return [4 /*yield*/, this.userExists(followerId)];
                        case 2:
                            followerExists = _a.sent();
                            return [4 /*yield*/, this.userExists(followeeId)];
                        case 3:
                            followeeExists = _a.sent();
                            if (!followerExists || !followeeExists) {
                                throw new generic_http_exception_1.GenericHttpException(error_messages_constant_1.ERROR_MESSAGES.USER_NOT_FOUND_IN_SOCIAL, common_1.HttpStatus.NOT_FOUND);
                            }
                            return [4 /*yield*/, session.run("MATCH (follower:User {userId: $followerId})\n         MATCH (followee:User {userId: $followeeId})\n         MERGE (follower)-[r:FOLLOWS]->(followee)\n         SET r.createdAt = datetime()", { followerId: followerId, followeeId: followeeId })];
                        case 4:
                            _a.sent();
                            return [3 /*break*/, 9];
                        case 5:
                            error_7 = _a.sent();
                            if (error_7 instanceof generic_http_exception_1.GenericHttpException) {
                                throw error_7;
                            }
                            throw new generic_http_exception_1.GenericHttpException(error_messages_constant_1.ERROR_MESSAGES.FOLLOW_FAILED, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
                        case 6: return [4 /*yield*/, this.notificationService.notifyNewFollower(followerId, followeeId)];
                        case 7:
                            _a.sent();
                            this.activityService.logActivity(followerId, 'FOLLOWED_USER', followeeId, 'USER');
                            return [4 /*yield*/, session.close()];
                        case 8:
                            _a.sent();
                            return [7 /*endfinally*/];
                        case 9: return [2 /*return*/];
                    }
                });
            });
        };
        SocialService_1.prototype.unfollowUser = function (followerId, followeeId) {
            return __awaiter(this, void 0, void 0, function () {
                var session, followerExists, followeeExists, error_8;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            session = this.neo4jservice.getSession();
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 5, 6, 8]);
                            return [4 /*yield*/, this.userExists(followerId)];
                        case 2:
                            followerExists = _a.sent();
                            return [4 /*yield*/, this.userExists(followeeId)];
                        case 3:
                            followeeExists = _a.sent();
                            if (!followerExists || !followeeExists) {
                                throw new generic_http_exception_1.GenericHttpException(error_messages_constant_1.ERROR_MESSAGES.USER_NOT_FOUND_IN_SOCIAL, common_1.HttpStatus.NOT_FOUND);
                            }
                            return [4 /*yield*/, session.run("MATCH (follower:User {userId: $followerId})-[r:FOLLOWS]->(followee:User {userId: $followeeId})\n         DELETE r", { followerId: followerId, followeeId: followeeId })];
                        case 4:
                            _a.sent();
                            return [3 /*break*/, 8];
                        case 5:
                            error_8 = _a.sent();
                            if (error_8 instanceof generic_http_exception_1.GenericHttpException) {
                                throw error_8;
                            }
                            throw new generic_http_exception_1.GenericHttpException(error_messages_constant_1.ERROR_MESSAGES.UNFOLLOW_FAILED, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
                        case 6: return [4 /*yield*/, session.close()];
                        case 7:
                            _a.sent();
                            return [7 /*endfinally*/];
                        case 8: return [2 /*return*/];
                    }
                });
            });
        };
        SocialService_1.prototype.getFollowers = function (userId_1) {
            return __awaiter(this, arguments, void 0, function (userId, offset, limit) {
                var session, userExists, user, offsetInt, limitInt, countResult, total, result, followerIds, followBackResult, _a, followedBackIds, followedBackSet_1, profiles, profileMap_3, followers, hasMore, nextOffset, error_9;
                var _b, _c, _d, _e, _f, _g;
                if (offset === void 0) { offset = 0; }
                if (limit === void 0) { limit = 10; }
                return __generator(this, function (_h) {
                    switch (_h.label) {
                        case 0:
                            session = this.neo4jservice.getSession();
                            _h.label = 1;
                        case 1:
                            _h.trys.push([1, 13, 14, 16]);
                            return [4 /*yield*/, this.userExists(userId)];
                        case 2:
                            userExists = _h.sent();
                            if (!!userExists) return [3 /*break*/, 6];
                            return [4 /*yield*/, this.prisma.user.findUnique({
                                    where: { id: userId },
                                    select: {
                                        id: true,
                                        email: true,
                                        name: true,
                                        Profile: {
                                            select: {
                                                location: true,
                                                coverPhoto: true,
                                            },
                                        },
                                    },
                                })];
                        case 3:
                            user = _h.sent();
                            if (!user) return [3 /*break*/, 5];
                            // Auto-create the node in Neo4j
                            return [4 /*yield*/, this.createUserNode(user.id, {
                                    name: user.name,
                                    username: user.email,
                                    location: (_c = (_b = user.Profile) === null || _b === void 0 ? void 0 : _b.location) !== null && _c !== void 0 ? _c : null,
                                    coverPhoto: (_e = (_d = user.Profile) === null || _d === void 0 ? void 0 : _d.coverPhoto) !== null && _e !== void 0 ? _e : null,
                                })];
                        case 4:
                            // Auto-create the node in Neo4j
                            _h.sent();
                            userExists = true;
                            return [3 /*break*/, 6];
                        case 5: throw new generic_http_exception_1.GenericHttpException(error_messages_constant_1.ERROR_MESSAGES.USER_NOT_FOUND_IN_SOCIAL, common_1.HttpStatus.NOT_FOUND);
                        case 6:
                            offsetInt = Math.floor(Number(offset)) || 0;
                            limitInt = Math.floor(Number(limit)) || 10;
                            if (offsetInt < 0) {
                                throw new generic_http_exception_1.GenericHttpException('Offset must be a non-negative integer', common_1.HttpStatus.BAD_REQUEST);
                            }
                            if (limitInt < 1) {
                                throw new generic_http_exception_1.GenericHttpException('Limit must be a positive integer', common_1.HttpStatus.BAD_REQUEST);
                            }
                            return [4 /*yield*/, session.run("MATCH (follower:User)-[:FOLLOWS]->(u:User {userId: $userId})\n         RETURN count(follower) as total", { userId: userId })];
                        case 7:
                            countResult = _h.sent();
                            total = this.toNumber(((_f = countResult.records[0]) === null || _f === void 0 ? void 0 : _f.get('total')) || 0);
                            return [4 /*yield*/, session.run("MATCH (follower:User)-[:FOLLOWS]->(u:User {userId: $userId})\n         RETURN follower.userId as userId\n         SKIP $offset\n         LIMIT $limit", { userId: userId, offset: neo4j_driver_1.default.int(offsetInt), limit: neo4j_driver_1.default.int(limitInt) })];
                        case 8:
                            result = _h.sent();
                            followerIds = result.records.map(function (r) { return r.get('userId'); });
                            if (!(followerIds.length > 0)) return [3 /*break*/, 10];
                            return [4 /*yield*/, session.run("MATCH (u:User {userId: $userId})-[:FOLLOWS]->(follower:User)\n         WHERE follower.userId IN $followerIds\n         RETURN follower.userId as userId", { userId: userId, followerIds: followerIds })];
                        case 9:
                            _a = _h.sent();
                            return [3 /*break*/, 11];
                        case 10:
                            _a = null;
                            _h.label = 11;
                        case 11:
                            followBackResult = _a;
                            followedBackIds = (_g = followBackResult === null || followBackResult === void 0 ? void 0 : followBackResult.records.map(function (r) { return r.get('userId'); })) !== null && _g !== void 0 ? _g : [];
                            followedBackSet_1 = new Set(followedBackIds);
                            return [4 /*yield*/, this.prisma.profile.findMany({
                                    where: { userId: { in: followerIds } },
                                    include: {
                                        user: true,
                                    },
                                })];
                        case 12:
                            profiles = _h.sent();
                            profileMap_3 = new Map(profiles.map(function (p) { return [p.userId, p]; }));
                            followers = followerIds
                                .map(function (id) {
                                var profile = profileMap_3.get(id);
                                if (!profile) {
                                    return undefined;
                                }
                                return __assign(__assign({}, profile), { isFollowedBack: followedBackSet_1.has(id) });
                            })
                                .filter(function (p) {
                                return p !== undefined;
                            });
                            hasMore = offsetInt + limitInt < total;
                            nextOffset = hasMore ? offsetInt + limitInt : null;
                            return [2 /*return*/, {
                                    data: followers,
                                    meta: {
                                        limit: limitInt,
                                        offset: offsetInt,
                                        total: total,
                                        hasMore: hasMore,
                                        nextOffset: nextOffset,
                                    },
                                }];
                        case 13:
                            error_9 = _h.sent();
                            if (error_9 instanceof generic_http_exception_1.GenericHttpException) {
                                throw error_9;
                            }
                            console.error('Error in getFollowers:', error_9);
                            throw new generic_http_exception_1.GenericHttpException(error_messages_constant_1.ERROR_MESSAGES.GET_FOLLOWERS_FAILED, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
                        case 14: return [4 /*yield*/, session.close()];
                        case 15:
                            _h.sent();
                            return [7 /*endfinally*/];
                        case 16: return [2 /*return*/];
                    }
                });
            });
        };
        SocialService_1.prototype.getFollowing = function (userId_1) {
            return __awaiter(this, arguments, void 0, function (userId, offset, limit) {
                var session, userExists, user, offsetInt, limitInt, countResult, total, result, followingIds, profiles, profileMap_4, following, hasMore, nextOffset, error_10;
                var _a, _b, _c, _d, _e;
                if (offset === void 0) { offset = 0; }
                if (limit === void 0) { limit = 10; }
                return __generator(this, function (_f) {
                    switch (_f.label) {
                        case 0:
                            session = this.neo4jservice.getSession();
                            _f.label = 1;
                        case 1:
                            _f.trys.push([1, 10, 11, 13]);
                            return [4 /*yield*/, this.userExists(userId)];
                        case 2:
                            userExists = _f.sent();
                            if (!!userExists) return [3 /*break*/, 6];
                            return [4 /*yield*/, this.prisma.user.findUnique({
                                    where: { id: userId },
                                    select: {
                                        id: true,
                                        email: true,
                                        name: true,
                                        Profile: {
                                            select: {
                                                location: true,
                                                coverPhoto: true,
                                            },
                                        },
                                    },
                                })];
                        case 3:
                            user = _f.sent();
                            if (!user) return [3 /*break*/, 5];
                            // Auto-create the node in Neo4j
                            return [4 /*yield*/, this.createUserNode(user.id, {
                                    name: user.name,
                                    username: user.email,
                                    location: (_b = (_a = user.Profile) === null || _a === void 0 ? void 0 : _a.location) !== null && _b !== void 0 ? _b : null,
                                    coverPhoto: (_d = (_c = user.Profile) === null || _c === void 0 ? void 0 : _c.coverPhoto) !== null && _d !== void 0 ? _d : null,
                                })];
                        case 4:
                            // Auto-create the node in Neo4j
                            _f.sent();
                            userExists = true;
                            return [3 /*break*/, 6];
                        case 5: throw new generic_http_exception_1.GenericHttpException(error_messages_constant_1.ERROR_MESSAGES.USER_NOT_FOUND_IN_SOCIAL, common_1.HttpStatus.NOT_FOUND);
                        case 6:
                            offsetInt = Math.floor(Number(offset)) || 0;
                            limitInt = Math.floor(Number(limit)) || 10;
                            if (offsetInt < 0) {
                                throw new generic_http_exception_1.GenericHttpException('Offset must be a non-negative integer', common_1.HttpStatus.BAD_REQUEST);
                            }
                            if (limitInt < 1) {
                                throw new generic_http_exception_1.GenericHttpException('Limit must be a positive integer', common_1.HttpStatus.BAD_REQUEST);
                            }
                            return [4 /*yield*/, session.run("MATCH (u:User {userId: $userId})-[:FOLLOWS]->(following:User)\n         RETURN count(following) as total", { userId: userId })];
                        case 7:
                            countResult = _f.sent();
                            total = this.toNumber(((_e = countResult.records[0]) === null || _e === void 0 ? void 0 : _e.get('total')) || 0);
                            return [4 /*yield*/, session.run("MATCH (u:User {userId: $userId})-[:FOLLOWS]->(following:User)\n         RETURN following.userId as userId\n         SKIP $offset\n         LIMIT $limit", { userId: userId, offset: neo4j_driver_1.default.int(offsetInt), limit: neo4j_driver_1.default.int(limitInt) })];
                        case 8:
                            result = _f.sent();
                            followingIds = result.records.map(function (r) { return r.get('userId'); });
                            return [4 /*yield*/, this.prisma.profile.findMany({
                                    where: { userId: { in: followingIds } },
                                    include: {
                                        user: true,
                                    },
                                })];
                        case 9:
                            profiles = _f.sent();
                            profileMap_4 = new Map(profiles.map(function (p) { return [p.userId, p]; }));
                            following = followingIds
                                .map(function (id) { return profileMap_4.get(id); })
                                .filter(function (p) { return p !== undefined; });
                            hasMore = offsetInt + limitInt < total;
                            nextOffset = hasMore ? offsetInt + limitInt : null;
                            return [2 /*return*/, {
                                    data: following,
                                    meta: {
                                        limit: limitInt,
                                        offset: offsetInt,
                                        total: total,
                                        hasMore: hasMore,
                                        nextOffset: nextOffset,
                                    },
                                }];
                        case 10:
                            error_10 = _f.sent();
                            if (error_10 instanceof generic_http_exception_1.GenericHttpException) {
                                throw error_10;
                            }
                            console.error('Error in getFollowing:', error_10);
                            throw new generic_http_exception_1.GenericHttpException(error_messages_constant_1.ERROR_MESSAGES.GET_FOLLOWING_FAILED, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
                        case 11: return [4 /*yield*/, session.close()];
                        case 12:
                            _f.sent();
                            return [7 /*endfinally*/];
                        case 13: return [2 /*return*/];
                    }
                });
            });
        };
        SocialService_1.prototype.isFollowing = function (followerId, followeeId) {
            return __awaiter(this, void 0, void 0, function () {
                var session, result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            session = this.neo4jservice.getSession();
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, , 3, 5]);
                            return [4 /*yield*/, session.run("MATCH (follower:User {userId: $followerId})-[:FOLLOWS]->(followee:User {userId: $followeeId})\n         RETURN count(*) > 0 as isFollowing", { followerId: followerId, followeeId: followeeId })];
                        case 2:
                            result = _a.sent();
                            return [2 /*return*/, result.records[0].get('isFollowing')];
                        case 3: return [4 /*yield*/, session.close()];
                        case 4:
                            _a.sent();
                            return [7 /*endfinally*/];
                        case 5: return [2 /*return*/];
                    }
                });
            });
        };
        SocialService_1.prototype.getFollowerCount = function (userId) {
            return __awaiter(this, void 0, void 0, function () {
                var session, result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            session = this.neo4jservice.getSession();
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, , 3, 5]);
                            return [4 /*yield*/, session.run("MATCH (follower:User)-[:FOLLOWS]->(u:User {userId: $userId})\n         RETURN count(follower) as count", { userId: userId })];
                        case 2:
                            result = _a.sent();
                            return [2 /*return*/, result.records[0].get('count').toNumber()];
                        case 3: return [4 /*yield*/, session.close()];
                        case 4:
                            _a.sent();
                            return [7 /*endfinally*/];
                        case 5: return [2 /*return*/];
                    }
                });
            });
        };
        SocialService_1.prototype.getFollowingCount = function (userId) {
            return __awaiter(this, void 0, void 0, function () {
                var session, result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            session = this.neo4jservice.getSession();
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, , 3, 5]);
                            return [4 /*yield*/, session.run("MATCH (u:User {userId: $userId})-[:FOLLOWS]->(following:User)\n         RETURN count(following) as count", { userId: userId })];
                        case 2:
                            result = _a.sent();
                            return [2 /*return*/, result.records[0].get('count').toNumber()];
                        case 3: return [4 /*yield*/, session.close()];
                        case 4:
                            _a.sent();
                            return [7 /*endfinally*/];
                        case 5: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Friend Recommendations based on:
         * 1. Mutual friends (friends of friends)
         * 2. Common followers
         * 3. Users you follow who follow them back
         * 4. Location matching
         */
        SocialService_1.prototype.getFriendRecommendations = function (userId_1) {
            return __awaiter(this, arguments, void 0, function (userId, offset, limit) {
                var session, userExists, user, offsetInt, limitInt, countResult, total, currentProfile, userLocation_1, result, recommendationData_1, recommendedUserIds_1, profiles, profileMap_5, recommendations, hasMore, nextOffset, error_11;
                var _this = this;
                var _a, _b, _c, _d, _e;
                if (offset === void 0) { offset = 0; }
                if (limit === void 0) { limit = 10; }
                return __generator(this, function (_f) {
                    switch (_f.label) {
                        case 0:
                            session = this.neo4jservice.getSession();
                            _f.label = 1;
                        case 1:
                            _f.trys.push([1, 11, 12, 14]);
                            return [4 /*yield*/, this.userExists(userId)];
                        case 2:
                            userExists = _f.sent();
                            if (!!userExists) return [3 /*break*/, 6];
                            return [4 /*yield*/, this.prisma.user.findUnique({
                                    where: { id: userId },
                                    select: {
                                        id: true,
                                        email: true,
                                        name: true,
                                        Profile: {
                                            select: {
                                                location: true,
                                                coverPhoto: true,
                                            },
                                        },
                                    },
                                })];
                        case 3:
                            user = _f.sent();
                            if (!user) return [3 /*break*/, 5];
                            // Auto-create the node in Neo4j
                            return [4 /*yield*/, this.createUserNode(user.id, {
                                    name: user.name,
                                    username: user.email,
                                    location: (_b = (_a = user.Profile) === null || _a === void 0 ? void 0 : _a.location) !== null && _b !== void 0 ? _b : null,
                                    coverPhoto: (_d = (_c = user.Profile) === null || _c === void 0 ? void 0 : _c.coverPhoto) !== null && _d !== void 0 ? _d : null,
                                })];
                        case 4:
                            // Auto-create the node in Neo4j
                            _f.sent();
                            userExists = true;
                            return [3 /*break*/, 6];
                        case 5: throw new generic_http_exception_1.GenericHttpException(error_messages_constant_1.ERROR_MESSAGES.USER_NOT_FOUND_IN_SOCIAL, common_1.HttpStatus.NOT_FOUND);
                        case 6:
                            offsetInt = Math.floor(Number(offset)) || 0;
                            limitInt = Math.floor(Number(limit)) || 10;
                            if (offsetInt < 0) {
                                throw new generic_http_exception_1.GenericHttpException('Offset must be a non-negative integer', common_1.HttpStatus.BAD_REQUEST);
                            }
                            if (limitInt < 1) {
                                throw new generic_http_exception_1.GenericHttpException('Limit must be a positive integer', common_1.HttpStatus.BAD_REQUEST);
                            }
                            return [4 /*yield*/, session.run("MATCH (u:User {userId: $userId})\n\n         // Stage 1: mutual friends\n         OPTIONAL MATCH (u)-[:FRIENDS]->(:User)-[:FRIENDS]->(s1:User)\n         WHERE s1.userId <> $userId\n           AND NOT (u)-[:FRIENDS]-(s1)\n           AND NOT (u)-[:FRIEND_REQUEST]->(s1)\n           AND NOT (s1)-[:FRIEND_REQUEST]->(u)\n\n         // Stage 2: common following\n         OPTIONAL MATCH (u)-[:FOLLOWS]->(:User)-[:FOLLOWS]->(s2:User)\n         WHERE s2.userId <> $userId\n           AND NOT (u)-[:FRIENDS]-(s2)\n           AND NOT (u)-[:FRIEND_REQUEST]->(s2)\n           AND NOT (s2)-[:FRIEND_REQUEST]->(u)\n\n         // Stage 3: global users (fallback pool)\n         OPTIONAL MATCH (s3:User)\n         WHERE s3.userId <> $userId\n           AND NOT (u)-[:FRIENDS]-(s3)\n           AND NOT (u)-[:FRIEND_REQUEST]->(s3)\n           AND NOT (s3)-[:FRIEND_REQUEST]->(u)\n\n         WITH collect(DISTINCT s1) + collect(DISTINCT s2) + collect(DISTINCT s3) AS allCandidates\n         UNWIND allCandidates AS candidate\n         WITH DISTINCT candidate\n         RETURN count(candidate) as total", { userId: userId })];
                        case 7:
                            countResult = _f.sent();
                            total = this.toNumber(((_e = countResult.records[0]) === null || _e === void 0 ? void 0 : _e.get('total')) || 0);
                            return [4 /*yield*/, this.prisma.profile.findUnique({
                                    where: { userId: userId },
                                    select: {
                                        location: true,
                                    },
                                })];
                        case 8:
                            currentProfile = _f.sent();
                            userLocation_1 = (currentProfile === null || currentProfile === void 0 ? void 0 : currentProfile.location) || null;
                            return [4 /*yield*/, session.run("MATCH (u:User {userId: $userId})\n\n         // ===== Stage 1: Mutual Friends =====\n         OPTIONAL MATCH (u)-[:FRIENDS]->(f)-[:FRIENDS]->(c1:User)\n         WHERE c1.userId <> $userId\n           AND NOT (u)-[:FRIENDS]-(c1)\n           AND NOT (u)-[:FRIEND_REQUEST]->(c1)\n           AND NOT (c1)-[:FRIEND_REQUEST]->(u)\n         WITH u, c1, count(DISTINCT f) as mutualFriends\n\n         // ===== Stage 2: Common Following =====\n         OPTIONAL MATCH (u)-[:FOLLOWS]->(f2)-[:FOLLOWS]->(c2:User)\n         WHERE c2.userId <> $userId\n           AND NOT (u)-[:FRIENDS]-(c2)\n           AND NOT (u)-[:FRIEND_REQUEST]->(c2)\n           AND NOT (c2)-[:FRIEND_REQUEST]->(u)\n         WITH u,\n              c1, mutualFriends,\n              c2, count(DISTINCT f2) as commonFollowing\n\n         // Merge candidates\n         WITH u,\n              collect(DISTINCT c1) + collect(DISTINCT c2) AS candidates,\n              collect(mutualFriends) AS mutualFriendsList,\n              collect(commonFollowing) AS commonFollowingList\n\n         UNWIND candidates AS candidate\n         WITH u, candidate\n         WHERE candidate IS NOT NULL\n\n         // Recompute signals per candidate cleanly\n         OPTIONAL MATCH (u)-[:FRIENDS]->(f)-[:FRIENDS]->(candidate)\n         WITH u, candidate, count(DISTINCT f) as mutualFriends\n\n         OPTIONAL MATCH (u)-[:FOLLOWS]->(f2)-[:FOLLOWS]->(candidate)\n         WITH u, candidate, mutualFriends, count(DISTINCT f2) as commonFollowing\n\n         OPTIONAL MATCH (candidate)<-[:FOLLOWS]-(follower)\n         WITH u, candidate, mutualFriends, commonFollowing,\n              count(DISTINCT follower) as popularity\n\n         OPTIONAL MATCH (u)-[f1:FOLLOWS]->(candidate)\n         OPTIONAL MATCH (candidate)-[f2:FOLLOWS]->(u)\n\n         WITH candidate,\n              mutualFriends,\n              commonFollowing,\n              popularity,\n              CASE WHEN f1 IS NOT NULL THEN 2 ELSE 0 END +\n              CASE WHEN f2 IS NOT NULL THEN 1 ELSE 0 END as followBoost\n\n         // ===== Weighted Blending =====\n         WITH candidate,\n              mutualFriends,\n              commonFollowing,\n              popularity,\n              followBoost,\n              (mutualFriends * 10.0 +\n               commonFollowing * 6.0 +\n               (popularity / 10.0) +\n               followBoost) as score\n\n         RETURN candidate.userId as userId,\n                mutualFriends,\n                score,\n                CASE\n                  WHEN mutualFriends > 0 THEN 'mutual_friends'\n                  WHEN commonFollowing > 0 THEN 'common_following'\n                  ELSE 'popular_users'\n                END as reason\n         ORDER BY score DESC\n         SKIP $offset\n         LIMIT $limit", { userId: userId, offset: neo4j_driver_1.default.int(offsetInt), limit: neo4j_driver_1.default.int(limitInt) })];
                        case 9:
                            result = _f.sent();
                            recommendationData_1 = new Map();
                            recommendedUserIds_1 = [];
                            result.records.forEach(function (r) {
                                var recUserId = r.get('userId');
                                if (recUserId && !recommendationData_1.has(recUserId)) {
                                    recommendedUserIds_1.push(recUserId);
                                    recommendationData_1.set(recUserId, {
                                        mutualFriends: _this.toNumber(r.get('mutualFriends')),
                                        score: _this.toNumber(r.get('score')),
                                        reason: r.get('reason'),
                                    });
                                }
                            });
                            return [4 /*yield*/, this.prisma.profile.findMany({
                                    where: { userId: { in: recommendedUserIds_1 } },
                                    include: {
                                        user: true,
                                    },
                                })];
                        case 10:
                            profiles = _f.sent();
                            profileMap_5 = new Map(profiles.map(function (p) { return [p.userId, p]; }));
                            recommendations = recommendedUserIds_1
                                .map(function (id) {
                                var profile = profileMap_5.get(id);
                                var neo4jData = recommendationData_1.get(id);
                                if (!profile || !neo4jData) {
                                    return null;
                                }
                                var locationBoost = userLocation_1 &&
                                    profile.location &&
                                    userLocation_1 === profile.location
                                    ? 20
                                    : 0;
                                var finalScore = neo4jData.score + locationBoost;
                                return __assign(__assign({}, profile), { score: finalScore, mutualFriends: neo4jData.mutualFriends, reason: neo4jData.reason });
                            })
                                .filter(function (r) { return r !== null; })
                                .sort(function (a, b) { return b.score - a.score; });
                            hasMore = offsetInt + limitInt < total;
                            nextOffset = hasMore ? offsetInt + limitInt : null;
                            return [2 /*return*/, {
                                    data: recommendations,
                                    meta: {
                                        limit: limitInt,
                                        offset: offsetInt,
                                        total: total,
                                        hasMore: hasMore,
                                        nextOffset: nextOffset,
                                    },
                                }];
                        case 11:
                            error_11 = _f.sent();
                            if (error_11 instanceof generic_http_exception_1.GenericHttpException) {
                                throw error_11;
                            }
                            console.error('Error in getFriendRecommendations:', error_11);
                            throw new generic_http_exception_1.GenericHttpException('Failed to get friend recommendations', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
                        case 12: return [4 /*yield*/, session.close()];
                        case 13:
                            _f.sent();
                            return [7 /*endfinally*/];
                        case 14: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Follower Recommendations based on:
         * 1. Users followed by people you follow
         * 2. Popular users in your network
         * 3. Users who follow you back
         * 4. Location matching
         */
        SocialService_1.prototype.getFollowerRecommendations = function (userId_1) {
            return __awaiter(this, arguments, void 0, function (userId, offset, limit) {
                var session, userExists, user, offsetInt, limitInt, countResult, total, finalTotal, fallbackCountResult, currentProfile, userLocation_2, result, recommendationData_2, recommendedUserIds_2, profiles, profileMap_6, recommendations, hasMore, nextOffset, error_12;
                var _this = this;
                var _a, _b, _c, _d, _e, _f;
                if (offset === void 0) { offset = 0; }
                if (limit === void 0) { limit = 10; }
                return __generator(this, function (_g) {
                    switch (_g.label) {
                        case 0:
                            session = this.neo4jservice.getSession();
                            _g.label = 1;
                        case 1:
                            _g.trys.push([1, 13, 14, 16]);
                            return [4 /*yield*/, this.userExists(userId)];
                        case 2:
                            userExists = _g.sent();
                            if (!!userExists) return [3 /*break*/, 6];
                            return [4 /*yield*/, this.prisma.user.findUnique({
                                    where: { id: userId },
                                    select: {
                                        id: true,
                                        email: true,
                                        name: true,
                                        Profile: {
                                            select: {
                                                location: true,
                                                coverPhoto: true,
                                            },
                                        },
                                    },
                                })];
                        case 3:
                            user = _g.sent();
                            if (!user) return [3 /*break*/, 5];
                            // Auto-create the node in Neo4j
                            return [4 /*yield*/, this.createUserNode(user.id, {
                                    name: user.name,
                                    username: user.email,
                                    location: (_b = (_a = user.Profile) === null || _a === void 0 ? void 0 : _a.location) !== null && _b !== void 0 ? _b : null,
                                    coverPhoto: (_d = (_c = user.Profile) === null || _c === void 0 ? void 0 : _c.coverPhoto) !== null && _d !== void 0 ? _d : null,
                                })];
                        case 4:
                            // Auto-create the node in Neo4j
                            _g.sent();
                            userExists = true;
                            return [3 /*break*/, 6];
                        case 5: throw new generic_http_exception_1.GenericHttpException(error_messages_constant_1.ERROR_MESSAGES.USER_NOT_FOUND_IN_SOCIAL, common_1.HttpStatus.NOT_FOUND);
                        case 6:
                            offsetInt = Math.floor(Number(offset)) || 0;
                            limitInt = Math.floor(Number(limit)) || 10;
                            if (offsetInt < 0) {
                                throw new generic_http_exception_1.GenericHttpException('Offset must be a non-negative integer', common_1.HttpStatus.BAD_REQUEST);
                            }
                            if (limitInt < 1) {
                                throw new generic_http_exception_1.GenericHttpException('Limit must be a positive integer', common_1.HttpStatus.BAD_REQUEST);
                            }
                            return [4 /*yield*/, session.run("MATCH (u:User {userId: $userId})\n         \n         // Find users followed by people you follow\n         MATCH (u)-[:FOLLOWS]->(following)-[:FOLLOWS]->(recommendation:User)\n         WHERE recommendation.userId <> $userId\n         AND NOT (u)-[:FOLLOWS]->(recommendation)\n         \n         WITH DISTINCT recommendation\n         RETURN count(recommendation) as total", { userId: userId })];
                        case 7:
                            countResult = _g.sent();
                            total = this.toNumber(((_e = countResult.records[0]) === null || _e === void 0 ? void 0 : _e.get('total')) || 0);
                            finalTotal = total;
                            if (!(total === 0)) return [3 /*break*/, 9];
                            return [4 /*yield*/, session.run("MATCH (u:User)\n           WHERE u.userId <> $userId\n           AND NOT ( (u)-[:FRIENDS]-(:User {userId: $userId}) )\n           RETURN count(u) as total", { userId: userId })];
                        case 8:
                            fallbackCountResult = _g.sent();
                            finalTotal = this.toNumber(((_f = fallbackCountResult.records[0]) === null || _f === void 0 ? void 0 : _f.get('total')) || 0);
                            _g.label = 9;
                        case 9: return [4 /*yield*/, this.prisma.profile.findUnique({
                                where: { userId: userId },
                                select: {
                                    location: true,
                                },
                            })];
                        case 10:
                            currentProfile = _g.sent();
                            userLocation_2 = (currentProfile === null || currentProfile === void 0 ? void 0 : currentProfile.location) || null;
                            return [4 /*yield*/, session.run("MATCH (u:User {userId: $userId})\n         \n         // Find users followed by people you follow\n         MATCH (u)-[:FOLLOWS]->(following)-[:FOLLOWS]->(recommendation:User)\n         WHERE recommendation.userId <> $userId\n         AND NOT (u)-[:FOLLOWS]->(recommendation)\n         \n         WITH recommendation, count(DISTINCT following) as commonFollowing\n         \n         // Re-match user for follow-back check\n         MATCH (u:User {userId: $userId})\n         \n         // Count followers of the recommendation (popularity)\n         OPTIONAL MATCH (recommendation)<-[:FOLLOWS]-(follower)\n         WITH recommendation, commonFollowing, u, count(DISTINCT follower) as popularity\n         \n         // Check if they follow you back\n         OPTIONAL MATCH (recommendation)-[fb:FOLLOWS]->(u)\n         \n         WITH recommendation, commonFollowing, popularity,\n              CASE WHEN fb IS NOT NULL THEN 5 ELSE 0 END as followBackBonus\n         \n         WITH recommendation, commonFollowing, popularity, followBackBonus,\n              (commonFollowing * 10 + (popularity / 10.0) + followBackBonus) as score\n         \n         RETURN recommendation.userId as userId,\n                commonFollowing as mutualFriends,\n                score,\n                'common_following' as reason\n         ORDER BY score DESC\n         SKIP $offset\n         LIMIT $limit", { userId: userId, offset: neo4j_driver_1.default.int(offsetInt), limit: neo4j_driver_1.default.int(limitInt) })];
                        case 11:
                            result = _g.sent();
                            recommendationData_2 = new Map();
                            recommendedUserIds_2 = [];
                            result.records.forEach(function (r) {
                                var recUserId = r.get('userId');
                                if (recUserId && !recommendationData_2.has(recUserId)) {
                                    recommendedUserIds_2.push(recUserId);
                                    recommendationData_2.set(recUserId, {
                                        mutualFriends: _this.toNumber(r.get('mutualFriends')),
                                        score: _this.toNumber(r.get('score')),
                                        reason: r.get('reason'),
                                    });
                                }
                            });
                            return [4 /*yield*/, this.prisma.profile.findMany({
                                    where: { userId: { in: recommendedUserIds_2 } },
                                    include: {
                                        user: true,
                                    },
                                })];
                        case 12:
                            profiles = _g.sent();
                            profileMap_6 = new Map(profiles.map(function (p) { return [p.userId, p]; }));
                            recommendations = recommendedUserIds_2
                                .map(function (id) {
                                var profile = profileMap_6.get(id);
                                var neo4jData = recommendationData_2.get(id);
                                if (!profile || !neo4jData) {
                                    return null;
                                }
                                var locationBoost = userLocation_2 &&
                                    profile.location &&
                                    userLocation_2 === profile.location
                                    ? 20
                                    : 0;
                                var finalScore = neo4jData.score + locationBoost;
                                return __assign(__assign({}, profile), { score: finalScore, mutualFriends: neo4jData.mutualFriends, reason: neo4jData.reason });
                            })
                                .filter(function (r) { return r !== null; })
                                .sort(function (a, b) { return b.score - a.score; });
                            hasMore = offsetInt + limitInt < total;
                            nextOffset = hasMore ? offsetInt + limitInt : null;
                            return [2 /*return*/, {
                                    data: recommendations,
                                    meta: {
                                        limit: limitInt,
                                        offset: offsetInt,
                                        total: finalTotal,
                                        hasMore: hasMore,
                                        nextOffset: nextOffset,
                                    },
                                }];
                        case 13:
                            error_12 = _g.sent();
                            if (error_12 instanceof generic_http_exception_1.GenericHttpException) {
                                throw error_12;
                            }
                            console.error('Error in getFollowerRecommendations:', error_12);
                            throw new generic_http_exception_1.GenericHttpException('Failed to get follower recommendations', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
                        case 14: return [4 /*yield*/, session.close()];
                        case 15:
                            _g.sent();
                            return [7 /*endfinally*/];
                        case 16: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Get mutual friends between two users
         */
        SocialService_1.prototype.getMutualFriends = function (userId1_1, userId2_1) {
            return __awaiter(this, arguments, void 0, function (userId1, userId2, offset, limit) {
                var session, user1Exists, user2Exists, offsetInt, limitInt, countResult, total, result, mutualFriendIds, profiles, profileMap_7, mutualFriends, hasMore, nextOffset, error_13;
                var _a;
                if (offset === void 0) { offset = 0; }
                if (limit === void 0) { limit = 10; }
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            session = this.neo4jservice.getSession();
                            _b.label = 1;
                        case 1:
                            _b.trys.push([1, 7, 8, 10]);
                            return [4 /*yield*/, this.userExists(userId1)];
                        case 2:
                            user1Exists = _b.sent();
                            return [4 /*yield*/, this.userExists(userId2)];
                        case 3:
                            user2Exists = _b.sent();
                            if (!user1Exists || !user2Exists) {
                                throw new generic_http_exception_1.GenericHttpException(error_messages_constant_1.ERROR_MESSAGES.USER_NOT_FOUND_IN_SOCIAL, common_1.HttpStatus.NOT_FOUND);
                            }
                            offsetInt = Math.floor(Number(offset)) || 0;
                            limitInt = Math.floor(Number(limit)) || 10;
                            if (offsetInt < 0) {
                                throw new generic_http_exception_1.GenericHttpException('Offset must be a non-negative integer', common_1.HttpStatus.BAD_REQUEST);
                            }
                            if (limitInt < 1) {
                                throw new generic_http_exception_1.GenericHttpException('Limit must be a positive integer', common_1.HttpStatus.BAD_REQUEST);
                            }
                            return [4 /*yield*/, session.run("MATCH (u1:User {userId: $userId1})-[:FRIENDS]->(mutual:User)<-[:FRIENDS]-(u2:User {userId: $userId2})\n         RETURN count(mutual) as total", { userId1: userId1, userId2: userId2 })];
                        case 4:
                            countResult = _b.sent();
                            total = this.toNumber(((_a = countResult.records[0]) === null || _a === void 0 ? void 0 : _a.get('total')) || 0);
                            return [4 /*yield*/, session.run("MATCH (u1:User {userId: $userId1})-[:FRIENDS]->(mutual:User)<-[:FRIENDS]-(u2:User {userId: $userId2})\n         RETURN mutual.userId as userId\n         SKIP $offset\n         LIMIT $limit", {
                                    userId1: userId1,
                                    userId2: userId2,
                                    offset: neo4j_driver_1.default.int(offsetInt),
                                    limit: neo4j_driver_1.default.int(limitInt),
                                })];
                        case 5:
                            result = _b.sent();
                            mutualFriendIds = result.records.map(function (r) { return r.get('userId'); });
                            return [4 /*yield*/, this.prisma.profile.findMany({
                                    where: { userId: { in: mutualFriendIds } },
                                    include: {
                                        user: true,
                                    },
                                })];
                        case 6:
                            profiles = _b.sent();
                            profileMap_7 = new Map(profiles.map(function (p) { return [p.userId, p]; }));
                            mutualFriends = mutualFriendIds
                                .map(function (id) { return profileMap_7.get(id); })
                                .filter(function (p) { return p !== undefined; });
                            hasMore = offsetInt + limitInt < total;
                            nextOffset = hasMore ? offsetInt + limitInt : null;
                            return [2 /*return*/, {
                                    data: mutualFriends,
                                    meta: {
                                        limit: limitInt,
                                        offset: offsetInt,
                                        total: total,
                                        hasMore: hasMore,
                                        nextOffset: nextOffset,
                                    },
                                }];
                        case 7:
                            error_13 = _b.sent();
                            if (error_13 instanceof generic_http_exception_1.GenericHttpException) {
                                throw error_13;
                            }
                            console.error('Error in getMutualFriends:', error_13);
                            throw new generic_http_exception_1.GenericHttpException('Failed to get mutual friends', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
                        case 8: return [4 /*yield*/, session.close()];
                        case 9:
                            _b.sent();
                            return [7 /*endfinally*/];
                        case 10: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Get network stats for a user
         */
        SocialService_1.prototype.getUserNetworkStats = function (userId) {
            return __awaiter(this, void 0, void 0, function () {
                var session, userExists, user, result, record, error_14;
                var _a, _b, _c, _d;
                return __generator(this, function (_e) {
                    switch (_e.label) {
                        case 0:
                            session = this.neo4jservice.getSession();
                            _e.label = 1;
                        case 1:
                            _e.trys.push([1, 8, 9, 11]);
                            return [4 /*yield*/, this.userExists(userId)];
                        case 2:
                            userExists = _e.sent();
                            if (!!userExists) return [3 /*break*/, 6];
                            return [4 /*yield*/, this.prisma.user.findUnique({
                                    where: { id: userId },
                                    select: {
                                        id: true,
                                        email: true,
                                        name: true,
                                        Profile: {
                                            select: {
                                                location: true,
                                                coverPhoto: true,
                                            },
                                        },
                                    },
                                })];
                        case 3:
                            user = _e.sent();
                            if (!user) return [3 /*break*/, 5];
                            // Auto-create the node in Neo4j
                            return [4 /*yield*/, this.createUserNode(user.id, {
                                    name: user.name,
                                    username: user.email,
                                    location: (_b = (_a = user.Profile) === null || _a === void 0 ? void 0 : _a.location) !== null && _b !== void 0 ? _b : null,
                                    coverPhoto: (_d = (_c = user.Profile) === null || _c === void 0 ? void 0 : _c.coverPhoto) !== null && _d !== void 0 ? _d : null,
                                })];
                        case 4:
                            // Auto-create the node in Neo4j
                            _e.sent();
                            userExists = true;
                            return [3 /*break*/, 6];
                        case 5: throw new generic_http_exception_1.GenericHttpException(error_messages_constant_1.ERROR_MESSAGES.USER_NOT_FOUND_IN_SOCIAL, common_1.HttpStatus.NOT_FOUND);
                        case 6: return [4 /*yield*/, session.run("MATCH (u:User {userId: $userId})\n         OPTIONAL MATCH (u)-[:FRIENDS]-(friend)\n         OPTIONAL MATCH (u)-[:FOLLOWS]->(following)\n         OPTIONAL MATCH (u)<-[:FOLLOWS]-(follower)\n         RETURN count(DISTINCT friend) as friendsCount,\n                count(DISTINCT following) as followingCount,\n                count(DISTINCT follower) as followersCount", { userId: userId })];
                        case 7:
                            result = _e.sent();
                            record = result.records[0];
                            return [2 /*return*/, {
                                    friendsCount: record.get('friendsCount').toNumber(),
                                    followingCount: record.get('followingCount').toNumber(),
                                    followersCount: record.get('followersCount').toNumber(),
                                }];
                        case 8:
                            error_14 = _e.sent();
                            if (error_14 instanceof generic_http_exception_1.GenericHttpException) {
                                throw error_14;
                            }
                            console.error('Error in getUserNetworkStats:', error_14);
                            throw new generic_http_exception_1.GenericHttpException('Failed to get network stats', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
                        case 9: return [4 /*yield*/, session.close()];
                        case 10:
                            _e.sent();
                            return [7 /*endfinally*/];
                        case 11: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Block a user
         */
        SocialService_1.prototype.blockUser = function (blockerId, blockedId) {
            return __awaiter(this, void 0, void 0, function () {
                var session, blockerExists, blockedExists, error_15;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (blockerId === blockedId) {
                                throw new generic_http_exception_1.GenericHttpException('Cannot block yourself', common_1.HttpStatus.BAD_REQUEST);
                            }
                            session = this.neo4jservice.getSession();
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 8, 9, 11]);
                            return [4 /*yield*/, this.userExists(blockerId)];
                        case 2:
                            blockerExists = _a.sent();
                            return [4 /*yield*/, this.userExists(blockedId)];
                        case 3:
                            blockedExists = _a.sent();
                            if (!blockerExists || !blockedExists) {
                                throw new generic_http_exception_1.GenericHttpException(error_messages_constant_1.ERROR_MESSAGES.USER_NOT_FOUND_IN_SOCIAL, common_1.HttpStatus.NOT_FOUND);
                            }
                            // Remove friendship if exists
                            return [4 /*yield*/, session.run("MATCH (blocker:User {userId: $blockerId})-[r:FRIENDS]-(blocked:User {userId: $blockedId})\n       DELETE r", { blockerId: blockerId, blockedId: blockedId })];
                        case 4:
                            // Remove friendship if exists
                            _a.sent();
                            // Remove follow relationships
                            return [4 /*yield*/, session.run("MATCH (blocker:User {userId: $blockerId})-[r:FOLLOWS]-(blocked:User {userId: $blockedId})\n       DELETE r", { blockerId: blockerId, blockedId: blockedId })];
                        case 5:
                            // Remove follow relationships
                            _a.sent();
                            // Remove friend requests
                            return [4 /*yield*/, session.run("MATCH (blocker:User {userId: $blockerId})-[r:FRIEND_REQUEST]-(blocked:User {userId: $blockedId})\n       DELETE r", { blockerId: blockerId, blockedId: blockedId })];
                        case 6:
                            // Remove friend requests
                            _a.sent();
                            // Create block relationship
                            return [4 /*yield*/, session.run("MATCH (blocker:User {userId: $blockerId})\n       MATCH (blocked:User {userId: $blockedId})\n       MERGE (blocker)-[r:BLOCKS]->(blocked)\n       SET r.createdAt = datetime()", { blockerId: blockerId, blockedId: blockedId })];
                        case 7:
                            // Create block relationship
                            _a.sent();
                            return [3 /*break*/, 11];
                        case 8:
                            error_15 = _a.sent();
                            if (error_15 instanceof generic_http_exception_1.GenericHttpException) {
                                throw error_15;
                            }
                            throw new generic_http_exception_1.GenericHttpException('Failed to block user', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
                        case 9: return [4 /*yield*/, session.close()];
                        case 10:
                            _a.sent();
                            return [7 /*endfinally*/];
                        case 11: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Unblock a user
         */
        SocialService_1.prototype.unblockUser = function (blockerId, blockedId) {
            return __awaiter(this, void 0, void 0, function () {
                var session, result, error_16;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            session = this.neo4jservice.getSession();
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, 4, 6]);
                            return [4 /*yield*/, session.run("MATCH (blocker:User {userId: $blockerId})-[r:BLOCKS]->(blocked:User {userId: $blockedId})\n       DELETE r\n       RETURN count(r) as deleted", { blockerId: blockerId, blockedId: blockedId })];
                        case 2:
                            result = _a.sent();
                            if (result.records[0].get('deleted').toNumber() === 0) {
                                throw new generic_http_exception_1.GenericHttpException('User is not blocked', common_1.HttpStatus.BAD_REQUEST);
                            }
                            return [3 /*break*/, 6];
                        case 3:
                            error_16 = _a.sent();
                            if (error_16 instanceof generic_http_exception_1.GenericHttpException) {
                                throw error_16;
                            }
                            throw new generic_http_exception_1.GenericHttpException('Failed to unblock user', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
                        case 4: return [4 /*yield*/, session.close()];
                        case 5:
                            _a.sent();
                            return [7 /*endfinally*/];
                        case 6: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Check if user is blocked
         */
        SocialService_1.prototype.isBlocked = function (userId, targetUserId) {
            return __awaiter(this, void 0, void 0, function () {
                var session, result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            session = this.neo4jservice.getSession();
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, , 3, 5]);
                            return [4 /*yield*/, session.run("MATCH (u1:User {userId: $userId})-[:BLOCKS]->(u2:User {userId: $targetUserId})\n       RETURN count(*) > 0 as isBlocked", { userId: userId, targetUserId: targetUserId })];
                        case 2:
                            result = _a.sent();
                            return [2 /*return*/, result.records[0].get('isBlocked')];
                        case 3: return [4 /*yield*/, session.close()];
                        case 4:
                            _a.sent();
                            return [7 /*endfinally*/];
                        case 5: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Get blocked users
         */
        SocialService_1.prototype.getBlockedUsers = function (userId_1) {
            return __awaiter(this, arguments, void 0, function (userId, limit) {
                var session, userExists, limitInt, result, error_17;
                if (limit === void 0) { limit = 100; }
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            session = this.neo4jservice.getSession();
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 4, 5, 7]);
                            return [4 /*yield*/, this.userExists(userId)];
                        case 2:
                            userExists = _a.sent();
                            if (!userExists) {
                                throw new generic_http_exception_1.GenericHttpException(error_messages_constant_1.ERROR_MESSAGES.USER_NOT_FOUND_IN_SOCIAL, common_1.HttpStatus.NOT_FOUND);
                            }
                            limitInt = Math.floor(Number(limit)) || 100;
                            return [4 /*yield*/, session.run("MATCH (u:User {userId: $userId})-[:BLOCKS]->(blocked:User)\n       RETURN blocked.userId as userId, blocked.username as username, blocked.name as name\n       LIMIT $limit", { userId: userId, limit: neo4j_driver_1.default.int(limitInt) })];
                        case 3:
                            result = _a.sent();
                            return [2 /*return*/, result.records.map(function (r) { return ({
                                    userId: r.get('userId'),
                                    username: r.get('username'),
                                    name: r.get('name'),
                                }); })];
                        case 4:
                            error_17 = _a.sent();
                            if (error_17 instanceof generic_http_exception_1.GenericHttpException) {
                                throw error_17;
                            }
                            throw new generic_http_exception_1.GenericHttpException('Failed to get blocked users', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
                        case 5: return [4 /*yield*/, session.close()];
                        case 6:
                            _a.sent();
                            return [7 /*endfinally*/];
                        case 7: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Mute a user
         */
        SocialService_1.prototype.muteUser = function (muterId, mutedId) {
            return __awaiter(this, void 0, void 0, function () {
                var session, muterExists, mutedExists, error_18;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (muterId === mutedId) {
                                throw new generic_http_exception_1.GenericHttpException('Cannot mute yourself', common_1.HttpStatus.BAD_REQUEST);
                            }
                            session = this.neo4jservice.getSession();
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 5, 6, 8]);
                            return [4 /*yield*/, this.userExists(muterId)];
                        case 2:
                            muterExists = _a.sent();
                            return [4 /*yield*/, this.userExists(mutedId)];
                        case 3:
                            mutedExists = _a.sent();
                            if (!muterExists || !mutedExists) {
                                throw new generic_http_exception_1.GenericHttpException(error_messages_constant_1.ERROR_MESSAGES.USER_NOT_FOUND_IN_SOCIAL, common_1.HttpStatus.NOT_FOUND);
                            }
                            return [4 /*yield*/, session.run("MATCH (muter:User {userId: $muterId})\n       MATCH (muted:User {userId: $mutedId})\n       MERGE (muter)-[r:MUTES]->(muted)\n       SET r.createdAt = datetime()", { muterId: muterId, mutedId: mutedId })];
                        case 4:
                            _a.sent();
                            return [3 /*break*/, 8];
                        case 5:
                            error_18 = _a.sent();
                            if (error_18 instanceof generic_http_exception_1.GenericHttpException) {
                                throw error_18;
                            }
                            throw new generic_http_exception_1.GenericHttpException('Failed to mute user', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
                        case 6: return [4 /*yield*/, session.close()];
                        case 7:
                            _a.sent();
                            return [7 /*endfinally*/];
                        case 8: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Unmute a user
         */
        SocialService_1.prototype.unmuteUser = function (muterId, mutedId) {
            return __awaiter(this, void 0, void 0, function () {
                var session, result, error_19;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            session = this.neo4jservice.getSession();
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, 4, 6]);
                            return [4 /*yield*/, session.run("MATCH (muter:User {userId: $muterId})-[r:MUTES]->(muted:User {userId: $mutedId})\n       DELETE r\n       RETURN count(r) as deleted", { muterId: muterId, mutedId: mutedId })];
                        case 2:
                            result = _a.sent();
                            if (result.records[0].get('deleted').toNumber() === 0) {
                                throw new generic_http_exception_1.GenericHttpException('User is not muted', common_1.HttpStatus.BAD_REQUEST);
                            }
                            return [3 /*break*/, 6];
                        case 3:
                            error_19 = _a.sent();
                            if (error_19 instanceof generic_http_exception_1.GenericHttpException) {
                                throw error_19;
                            }
                            throw new generic_http_exception_1.GenericHttpException('Failed to unmute user', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
                        case 4: return [4 /*yield*/, session.close()];
                        case 5:
                            _a.sent();
                            return [7 /*endfinally*/];
                        case 6: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Check if user is muted
         */
        SocialService_1.prototype.isMuted = function (userId, targetUserId) {
            return __awaiter(this, void 0, void 0, function () {
                var session, result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            session = this.neo4jservice.getSession();
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, , 3, 5]);
                            return [4 /*yield*/, session.run("MATCH (u1:User {userId: $userId})-[:MUTES]->(u2:User {userId: $targetUserId})\n       RETURN count(*) > 0 as isMuted", { userId: userId, targetUserId: targetUserId })];
                        case 2:
                            result = _a.sent();
                            return [2 /*return*/, result.records[0].get('isMuted')];
                        case 3: return [4 /*yield*/, session.close()];
                        case 4:
                            _a.sent();
                            return [7 /*endfinally*/];
                        case 5: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Get muted users
         */
        SocialService_1.prototype.getMutedUsers = function (userId_1) {
            return __awaiter(this, arguments, void 0, function (userId, limit) {
                var session, userExists, limitInt, result, error_20;
                if (limit === void 0) { limit = 100; }
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            session = this.neo4jservice.getSession();
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 4, 5, 7]);
                            return [4 /*yield*/, this.userExists(userId)];
                        case 2:
                            userExists = _a.sent();
                            if (!userExists) {
                                throw new generic_http_exception_1.GenericHttpException(error_messages_constant_1.ERROR_MESSAGES.USER_NOT_FOUND_IN_SOCIAL, common_1.HttpStatus.NOT_FOUND);
                            }
                            limitInt = Math.floor(Number(limit)) || 100;
                            return [4 /*yield*/, session.run("MATCH (u:User {userId: $userId})-[:MUTES]->(muted:User)\n       RETURN muted.userId as userId, muted.username as username, muted.name as name\n       LIMIT $limit", { userId: userId, limit: neo4j_driver_1.default.int(limitInt) })];
                        case 3:
                            result = _a.sent();
                            return [2 /*return*/, result.records.map(function (r) { return ({
                                    userId: r.get('userId'),
                                    username: r.get('username'),
                                    name: r.get('name'),
                                }); })];
                        case 4:
                            error_20 = _a.sent();
                            if (error_20 instanceof generic_http_exception_1.GenericHttpException) {
                                throw error_20;
                            }
                            throw new generic_http_exception_1.GenericHttpException('Failed to get muted users', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
                        case 5: return [4 /*yield*/, session.close()];
                        case 6:
                            _a.sent();
                            return [7 /*endfinally*/];
                        case 7: return [2 /*return*/];
                    }
                });
            });
        };
        return SocialService_1;
    }());
    __setFunctionName(_classThis, "SocialService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        SocialService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return SocialService = _classThis;
}();
exports.SocialService = SocialService;
