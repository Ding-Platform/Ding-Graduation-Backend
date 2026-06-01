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
exports.ReadReceiptService = void 0;
var common_1 = require("@nestjs/common");
var mongodb_1 = require("mongodb");
var message_schema_1 = require("../schemas/message.schema");
var room_schema_1 = require("../schemas/room.schema");
var chat_constants_1 = require("src/common/constants/chat.constants");
var ReadReceiptService = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var ReadReceiptService = _classThis = /** @class */ (function () {
        function ReadReceiptService_1(mongodbService) {
            this.mongodbService = mongodbService;
        }
        /**
         * Mark a message as read
         */
        ReadReceiptService_1.prototype.markAsRead = function (messageId, roomId, userId) {
            return __awaiter(this, void 0, void 0, function () {
                var readReceiptsCollection, membersCollection, now, result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!this.mongodbService.isReady()) {
                                throw new common_1.ForbiddenException(chat_constants_1.CHAT_ERROR_MESSAGES.MONGODB_NOT_CONNECTED);
                            }
                            readReceiptsCollection = this.mongodbService.getCollection(message_schema_1.READ_RECEIPTS_COLLECTION);
                            membersCollection = this.mongodbService.getCollection(room_schema_1.ROOM_MEMBERS_COLLECTION);
                            now = new Date();
                            return [4 /*yield*/, readReceiptsCollection.findOneAndUpdate({ messageId: messageId, userId: userId }, {
                                    $set: { readAt: now },
                                    $setOnInsert: { messageId: messageId, roomId: roomId, userId: userId },
                                }, { upsert: true, returnDocument: 'after' })];
                        case 1:
                            result = _a.sent();
                            // Update member's last read message
                            return [4 /*yield*/, membersCollection.updateOne({ roomId: roomId, userId: userId }, {
                                    $set: {
                                        lastReadMessageId: messageId,
                                        lastReadAt: now,
                                        updatedAt: now,
                                    },
                                })];
                        case 2:
                            // Update member's last read message
                            _a.sent();
                            return [2 /*return*/, result];
                    }
                });
            });
        };
        /**
         * Mark all messages in a room as read up to a certain point
         */
        ReadReceiptService_1.prototype.markAllAsRead = function (roomId, userId, upToMessageId) {
            return __awaiter(this, void 0, void 0, function () {
                var messagesCollection, readReceiptsCollection, membersCollection, query, targetMessage, messages, messageIds, existingReceipts, existingMessageIds, unreadMessageIds, now, readReceipts, lastMessageId;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!this.mongodbService.isReady()) {
                                throw new common_1.ForbiddenException(chat_constants_1.CHAT_ERROR_MESSAGES.MONGODB_NOT_CONNECTED);
                            }
                            messagesCollection = this.mongodbService.getCollection(message_schema_1.MESSAGES_COLLECTION);
                            readReceiptsCollection = this.mongodbService.getCollection(message_schema_1.READ_RECEIPTS_COLLECTION);
                            membersCollection = this.mongodbService.getCollection(room_schema_1.ROOM_MEMBERS_COLLECTION);
                            query = {
                                roomId: roomId,
                                deletedForEveryone: false,
                                deletedForUsers: { $ne: userId },
                            };
                            if (!(upToMessageId && mongodb_1.ObjectId.isValid(upToMessageId))) return [3 /*break*/, 2];
                            return [4 /*yield*/, messagesCollection.findOne({
                                    _id: new mongodb_1.ObjectId(upToMessageId),
                                })];
                        case 1:
                            targetMessage = _a.sent();
                            if (targetMessage) {
                                query.createdAt = { $lte: targetMessage.createdAt };
                            }
                            _a.label = 2;
                        case 2: return [4 /*yield*/, messagesCollection
                                .find(query)
                                .project({ _id: 1 })
                                .toArray()];
                        case 3:
                            messages = _a.sent();
                            messageIds = messages.map(function (m) { return m._id.toHexString(); });
                            return [4 /*yield*/, readReceiptsCollection
                                    .find({ userId: userId, messageId: { $in: messageIds } })
                                    .project({ messageId: 1 })
                                    .toArray()];
                        case 4:
                            existingReceipts = _a.sent();
                            existingMessageIds = new Set(existingReceipts.map(function (r) { return r.messageId; }));
                            unreadMessageIds = messageIds.filter(function (id) { return !existingMessageIds.has(id); });
                            if (unreadMessageIds.length === 0) {
                                return [2 /*return*/, 0];
                            }
                            now = new Date();
                            readReceipts = unreadMessageIds.map(function (messageId) { return ({
                                messageId: messageId,
                                roomId: roomId,
                                userId: userId,
                                readAt: now,
                            }); });
                            return [4 /*yield*/, readReceiptsCollection.insertMany(readReceipts)];
                        case 5:
                            _a.sent();
                            lastMessageId = messageIds[messageIds.length - 1];
                            return [4 /*yield*/, membersCollection.updateOne({ roomId: roomId, userId: userId }, {
                                    $set: {
                                        lastReadMessageId: lastMessageId,
                                        lastReadAt: now,
                                        updatedAt: now,
                                    },
                                })];
                        case 6:
                            _a.sent();
                            return [2 /*return*/, unreadMessageIds.length];
                    }
                });
            });
        };
        /**
         * Get read receipts for a message
         */
        ReadReceiptService_1.prototype.getMessageReadReceipts = function (messageId) {
            return __awaiter(this, void 0, void 0, function () {
                var readReceiptsCollection;
                return __generator(this, function (_a) {
                    if (!this.mongodbService.isReady()) {
                        throw new common_1.ForbiddenException(chat_constants_1.CHAT_ERROR_MESSAGES.MONGODB_NOT_CONNECTED);
                    }
                    readReceiptsCollection = this.mongodbService.getCollection(message_schema_1.READ_RECEIPTS_COLLECTION);
                    return [2 /*return*/, readReceiptsCollection
                            .find({ messageId: messageId })
                            .sort({ readAt: 1 })
                            .toArray()];
                });
            });
        };
        /**
         * Get unread count for a user in a room
         */
        ReadReceiptService_1.prototype.getUnreadCount = function (roomId, userId) {
            return __awaiter(this, void 0, void 0, function () {
                var messagesCollection, membersCollection, membership, query, lastReadMessage;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!this.mongodbService.isReady()) {
                                throw new common_1.ForbiddenException(chat_constants_1.CHAT_ERROR_MESSAGES.MONGODB_NOT_CONNECTED);
                            }
                            messagesCollection = this.mongodbService.getCollection(message_schema_1.MESSAGES_COLLECTION);
                            membersCollection = this.mongodbService.getCollection(room_schema_1.ROOM_MEMBERS_COLLECTION);
                            return [4 /*yield*/, membersCollection.findOne({ roomId: roomId, userId: userId })];
                        case 1:
                            membership = _a.sent();
                            if (!membership) {
                                return [2 /*return*/, 0];
                            }
                            query = {
                                roomId: roomId,
                                deletedForEveryone: false,
                                deletedForUsers: { $ne: userId },
                                userId: { $ne: userId }, // Don't count own messages
                            };
                            if (!membership.lastReadMessageId) return [3 /*break*/, 3];
                            return [4 /*yield*/, messagesCollection.findOne({
                                    _id: new mongodb_1.ObjectId(membership.lastReadMessageId),
                                })];
                        case 2:
                            lastReadMessage = _a.sent();
                            if (lastReadMessage) {
                                query.createdAt = { $gt: lastReadMessage.createdAt };
                            }
                            return [3 /*break*/, 4];
                        case 3:
                            if (membership.lastReadAt) {
                                query.createdAt = { $gt: membership.lastReadAt };
                            }
                            else {
                                query.createdAt = { $gt: membership.joinedAt };
                            }
                            _a.label = 4;
                        case 4: return [2 /*return*/, messagesCollection.countDocuments(query)];
                    }
                });
            });
        };
        /**
         * Get unread counts for all rooms for a user
         */
        ReadReceiptService_1.prototype.getAllUnreadCounts = function (userId) {
            return __awaiter(this, void 0, void 0, function () {
                var membersCollection, memberships, unreadCounts, _i, memberships_1, membership, count;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!this.mongodbService.isReady()) {
                                throw new common_1.ForbiddenException(chat_constants_1.CHAT_ERROR_MESSAGES.MONGODB_NOT_CONNECTED);
                            }
                            membersCollection = this.mongodbService.getCollection(room_schema_1.ROOM_MEMBERS_COLLECTION);
                            return [4 /*yield*/, membersCollection
                                    .find({ userId: userId, leftAt: null })
                                    .toArray()];
                        case 1:
                            memberships = _a.sent();
                            unreadCounts = new Map();
                            _i = 0, memberships_1 = memberships;
                            _a.label = 2;
                        case 2:
                            if (!(_i < memberships_1.length)) return [3 /*break*/, 5];
                            membership = memberships_1[_i];
                            return [4 /*yield*/, this.getUnreadCount(membership.roomId, userId)];
                        case 3:
                            count = _a.sent();
                            unreadCounts.set(membership.roomId, count);
                            _a.label = 4;
                        case 4:
                            _i++;
                            return [3 /*break*/, 2];
                        case 5: return [2 /*return*/, unreadCounts];
                    }
                });
            });
        };
        /**
         * Check if a message has been read by a specific user
         */
        ReadReceiptService_1.prototype.hasUserReadMessage = function (messageId, userId) {
            return __awaiter(this, void 0, void 0, function () {
                var readReceiptsCollection, receipt;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!this.mongodbService.isReady()) {
                                return [2 /*return*/, false];
                            }
                            readReceiptsCollection = this.mongodbService.getCollection(message_schema_1.READ_RECEIPTS_COLLECTION);
                            return [4 /*yield*/, readReceiptsCollection.findOne({ messageId: messageId, userId: userId })];
                        case 1:
                            receipt = _a.sent();
                            return [2 /*return*/, !!receipt];
                    }
                });
            });
        };
        /**
         * Get delivery/seen status for a message
         */
        ReadReceiptService_1.prototype.getMessageStatus = function (messageId, roomId, senderId) {
            return __awaiter(this, void 0, void 0, function () {
                var membersCollection, readReceiptsCollection, members, totalMembers, readReceipts, read, delivered;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!this.mongodbService.isReady()) {
                                throw new common_1.ForbiddenException(chat_constants_1.CHAT_ERROR_MESSAGES.MONGODB_NOT_CONNECTED);
                            }
                            membersCollection = this.mongodbService.getCollection(room_schema_1.ROOM_MEMBERS_COLLECTION);
                            readReceiptsCollection = this.mongodbService.getCollection(message_schema_1.READ_RECEIPTS_COLLECTION);
                            return [4 /*yield*/, membersCollection
                                    .find({ roomId: roomId, userId: { $ne: senderId }, leftAt: null })
                                    .toArray()];
                        case 1:
                            members = _a.sent();
                            totalMembers = members.length;
                            return [4 /*yield*/, readReceiptsCollection
                                    .find({ messageId: messageId, userId: { $ne: senderId } })
                                    .toArray()];
                        case 2:
                            readReceipts = _a.sent();
                            read = readReceipts.length;
                            delivered = totalMembers;
                            return [2 /*return*/, { delivered: delivered, read: read, totalMembers: totalMembers }];
                    }
                });
            });
        };
        return ReadReceiptService_1;
    }());
    __setFunctionName(_classThis, "ReadReceiptService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ReadReceiptService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ReadReceiptService = _classThis;
}();
exports.ReadReceiptService = ReadReceiptService;
