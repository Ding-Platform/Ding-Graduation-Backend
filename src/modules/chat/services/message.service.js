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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageService = void 0;
var common_1 = require("@nestjs/common");
var mongodb_1 = require("mongodb");
var message_schema_1 = require("../schemas/message.schema");
var room_schema_1 = require("../schemas/room.schema");
var chat_constants_1 = require("src/common/constants/chat.constants");
var MessageService = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var MessageService = _classThis = /** @class */ (function () {
        function MessageService_1(mongodbService, databaseService) {
            this.mongodbService = mongodbService;
            this.databaseService = databaseService;
        }
        /**
         * Send a new message
         */
        MessageService_1.prototype.sendMessage = function (userId, dto, media) {
            return __awaiter(this, void 0, void 0, function () {
                var messagesCollection, roomsCollection, replyMessage, now, newMessage, result, mediaCollection, mediaWithMessageId;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!this.mongodbService.isReady()) {
                                throw new common_1.ForbiddenException(chat_constants_1.CHAT_ERROR_MESSAGES.MONGODB_NOT_CONNECTED);
                            }
                            messagesCollection = this.mongodbService.getCollection(message_schema_1.MESSAGES_COLLECTION);
                            roomsCollection = this.mongodbService.getCollection(room_schema_1.ROOMS_COLLECTION);
                            // Validate content length
                            if (dto.content &&
                                dto.content.length > chat_constants_1.CHAT_CONSTANTS.MESSAGE.MAX_CONTENT_LENGTH) {
                                throw new common_1.BadRequestException(chat_constants_1.CHAT_ERROR_MESSAGES.MESSAGE_TOO_LONG);
                            }
                            if (!dto.replyToId) return [3 /*break*/, 2];
                            return [4 /*yield*/, messagesCollection.findOne({
                                    _id: new mongodb_1.ObjectId(dto.replyToId),
                                    roomId: dto.roomId,
                                    deletedForEveryone: false,
                                })];
                        case 1:
                            replyMessage = _a.sent();
                            if (!replyMessage) {
                                throw new common_1.NotFoundException(chat_constants_1.CHAT_ERROR_MESSAGES.MESSAGE_NOT_FOUND);
                            }
                            _a.label = 2;
                        case 2:
                            now = new Date();
                            newMessage = {
                                content: dto.content,
                                userId: userId,
                                roomId: dto.roomId,
                                replyToId: dto.replyToId,
                                isEdited: false,
                                isForwarded: false,
                                deletedForEveryone: false,
                                deletedForUsers: [],
                                createdAt: now,
                                updatedAt: now,
                            };
                            return [4 /*yield*/, messagesCollection.insertOne(newMessage)];
                        case 3:
                            result = _a.sent();
                            newMessage._id = result.insertedId;
                            if (!(media && media.length > 0)) return [3 /*break*/, 5];
                            mediaCollection = this.mongodbService.getCollection(message_schema_1.MESSAGE_MEDIA_COLLECTION);
                            mediaWithMessageId = media.map(function (m) { return (__assign(__assign({}, m), { messageId: result.insertedId.toHexString(), createdAt: now })); });
                            return [4 /*yield*/, mediaCollection.insertMany(mediaWithMessageId)];
                        case 4:
                            _a.sent();
                            _a.label = 5;
                        case 5: 
                        // Update room's last message info
                        return [4 /*yield*/, roomsCollection.updateOne({ _id: new mongodb_1.ObjectId(dto.roomId) }, {
                                $set: {
                                    lastMessageAt: now,
                                    lastMessagePreview: dto.content.substring(0, 100),
                                    lastMessageUserId: userId,
                                    updatedAt: now,
                                },
                            })];
                        case 6:
                            // Update room's last message info
                            _a.sent();
                            return [2 /*return*/, newMessage];
                    }
                });
            });
        };
        /**
         * Get messages for a room with pagination
         */
        MessageService_1.prototype.getMessages = function (roomId, userId, pagination) {
            return __awaiter(this, void 0, void 0, function () {
                var messagesCollection, limit, query, cursorMessage, sortDirection, messages, hasMore, messageIds, reactionsCollection, reactions, mediaCollection, mediaItems, userIds, users, userMap, messagesWithRelations;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!this.mongodbService.isReady()) {
                                throw new common_1.ForbiddenException(chat_constants_1.CHAT_ERROR_MESSAGES.MONGODB_NOT_CONNECTED);
                            }
                            messagesCollection = this.mongodbService.getCollection(message_schema_1.MESSAGES_COLLECTION);
                            limit = Math.min(pagination.limit || chat_constants_1.CHAT_CONSTANTS.PAGINATION.DEFAULT_LIMIT, chat_constants_1.CHAT_CONSTANTS.PAGINATION.MAX_LIMIT);
                            query = {
                                roomId: roomId,
                                deletedForEveryone: false,
                                deletedForUsers: { $ne: userId },
                            };
                            if (!pagination.cursor) return [3 /*break*/, 2];
                            if (!mongodb_1.ObjectId.isValid(pagination.cursor)) {
                                throw new common_1.BadRequestException(chat_constants_1.CHAT_ERROR_MESSAGES.INVALID_CURSOR);
                            }
                            return [4 /*yield*/, messagesCollection.findOne({
                                    _id: new mongodb_1.ObjectId(pagination.cursor),
                                })];
                        case 1:
                            cursorMessage = _a.sent();
                            if (cursorMessage) {
                                if (pagination.direction === 'before') {
                                    query.createdAt = { $lt: cursorMessage.createdAt };
                                }
                                else {
                                    query.createdAt = { $gt: cursorMessage.createdAt };
                                }
                            }
                            _a.label = 2;
                        case 2:
                            sortDirection = pagination.direction === 'after' ? 1 : -1;
                            return [4 /*yield*/, messagesCollection
                                    .find(query)
                                    .sort({ createdAt: sortDirection })
                                    .limit(limit + 1) // Fetch one extra to check if there are more
                                    .toArray()];
                        case 3:
                            messages = _a.sent();
                            hasMore = messages.length > limit;
                            if (hasMore) {
                                messages.pop(); // Remove the extra item
                            }
                            // If direction is 'before', reverse to get chronological order
                            if (pagination.direction === 'before' || !pagination.direction) {
                                messages.reverse();
                            }
                            messageIds = messages.map(function (m) { return m._id.toHexString(); });
                            reactionsCollection = this.mongodbService.getCollection(message_schema_1.MESSAGE_REACTIONS_COLLECTION);
                            return [4 /*yield*/, reactionsCollection
                                    .find({ messageId: { $in: messageIds } })
                                    .toArray()];
                        case 4:
                            reactions = _a.sent();
                            mediaCollection = this.mongodbService.getCollection(message_schema_1.MESSAGE_MEDIA_COLLECTION);
                            return [4 /*yield*/, mediaCollection
                                    .find({ messageId: { $in: messageIds } })
                                    .toArray()];
                        case 5:
                            mediaItems = _a.sent();
                            userIds = __spreadArray([], new Set(messages.map(function (m) { return m.userId; })), true);
                            return [4 /*yield*/, this.databaseService.user.findMany({
                                    where: { id: { in: userIds } },
                                    select: { id: true, name: true, image: true },
                                })];
                        case 6:
                            users = _a.sent();
                            userMap = new Map(users.map(function (u) { return [u.id, u]; }));
                            messagesWithRelations = messages.map(function (message) { return (__assign(__assign({}, message), { reactions: reactions.filter(function (r) { return r.messageId === message._id.toHexString(); }), media: mediaItems.filter(function (m) { return m.messageId === message._id.toHexString(); }), user: userMap.get(message.userId) || undefined })); });
                            return [2 /*return*/, {
                                    data: messagesWithRelations,
                                    pagination: {
                                        hasMore: hasMore,
                                        nextCursor: messages.length > 0
                                            ? messages[messages.length - 1]._id.toHexString()
                                            : undefined,
                                        prevCursor: messages.length > 0 ? messages[0]._id.toHexString() : undefined,
                                    },
                                }];
                    }
                });
            });
        };
        /**
         * Edit a message
         */
        MessageService_1.prototype.editMessage = function (messageId, userId, dto) {
            return __awaiter(this, void 0, void 0, function () {
                var messagesCollection, editHistoryCollection, message, editWindowHours, editDeadline, now;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!this.mongodbService.isReady()) {
                                throw new common_1.ForbiddenException(chat_constants_1.CHAT_ERROR_MESSAGES.MONGODB_NOT_CONNECTED);
                            }
                            messagesCollection = this.mongodbService.getCollection(message_schema_1.MESSAGES_COLLECTION);
                            editHistoryCollection = this.mongodbService.getCollection(message_schema_1.MESSAGE_EDIT_HISTORY_COLLECTION);
                            return [4 /*yield*/, messagesCollection.findOne({
                                    _id: new mongodb_1.ObjectId(messageId),
                                    deletedForEveryone: false,
                                })];
                        case 1:
                            message = _a.sent();
                            if (!message) {
                                throw new common_1.NotFoundException(chat_constants_1.CHAT_ERROR_MESSAGES.MESSAGE_NOT_FOUND);
                            }
                            // Check ownership
                            if (message.userId !== userId) {
                                throw new common_1.ForbiddenException(chat_constants_1.CHAT_ERROR_MESSAGES.MESSAGE_EDIT_NOT_ALLOWED);
                            }
                            editWindowHours = chat_constants_1.CHAT_CONSTANTS.MESSAGE.EDIT_WINDOW_HOURS;
                            editDeadline = new Date(message.createdAt.getTime() + editWindowHours * 60 * 60 * 1000);
                            if (new Date() > editDeadline) {
                                throw new common_1.ForbiddenException(chat_constants_1.CHAT_ERROR_MESSAGES.MESSAGE_EDIT_WINDOW_EXPIRED);
                            }
                            // Save current content to edit history
                            return [4 /*yield*/, editHistoryCollection.insertOne({
                                    messageId: messageId,
                                    content: message.content,
                                    editedAt: new Date(),
                                })];
                        case 2:
                            // Save current content to edit history
                            _a.sent();
                            now = new Date();
                            return [4 /*yield*/, messagesCollection.updateOne({ _id: new mongodb_1.ObjectId(messageId) }, {
                                    $set: {
                                        content: dto.content,
                                        isEdited: true,
                                        updatedAt: now,
                                    },
                                })];
                        case 3:
                            _a.sent();
                            return [2 /*return*/, __assign(__assign({}, message), { content: dto.content, isEdited: true, updatedAt: now })];
                    }
                });
            });
        };
        /**
         * Delete a message
         */
        MessageService_1.prototype.deleteMessage = function (messageId_1, userId_1) {
            return __awaiter(this, arguments, void 0, function (messageId, userId, deleteForEveryone) {
                var messagesCollection, message, now, deleteWindowHours, deleteDeadline;
                if (deleteForEveryone === void 0) { deleteForEveryone = false; }
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!this.mongodbService.isReady()) {
                                throw new common_1.ForbiddenException(chat_constants_1.CHAT_ERROR_MESSAGES.MONGODB_NOT_CONNECTED);
                            }
                            messagesCollection = this.mongodbService.getCollection(message_schema_1.MESSAGES_COLLECTION);
                            return [4 /*yield*/, messagesCollection.findOne({
                                    _id: new mongodb_1.ObjectId(messageId),
                                    deletedForEveryone: false,
                                })];
                        case 1:
                            message = _a.sent();
                            if (!message) {
                                throw new common_1.NotFoundException(chat_constants_1.CHAT_ERROR_MESSAGES.MESSAGE_NOT_FOUND);
                            }
                            now = new Date();
                            if (!deleteForEveryone) return [3 /*break*/, 3];
                            // Check ownership for delete for everyone
                            if (message.userId !== userId) {
                                throw new common_1.ForbiddenException(chat_constants_1.CHAT_ERROR_MESSAGES.MESSAGE_DELETE_NOT_ALLOWED);
                            }
                            deleteWindowHours = chat_constants_1.CHAT_CONSTANTS.MESSAGE.DELETE_FOR_EVERYONE_WINDOW_HOURS;
                            deleteDeadline = new Date(message.createdAt.getTime() + deleteWindowHours * 60 * 60 * 1000);
                            if (new Date() > deleteDeadline) {
                                throw new common_1.ForbiddenException(chat_constants_1.CHAT_ERROR_MESSAGES.MESSAGE_DELETE_FOR_EVERYONE_EXPIRED);
                            }
                            // Mark as deleted for everyone
                            return [4 /*yield*/, messagesCollection.updateOne({ _id: new mongodb_1.ObjectId(messageId) }, {
                                    $set: {
                                        deletedAt: now,
                                        deletedForEveryone: true,
                                        updatedAt: now,
                                    },
                                })];
                        case 2:
                            // Mark as deleted for everyone
                            _a.sent();
                            return [3 /*break*/, 5];
                        case 3: 
                        // Delete for self only - add user to deletedForUsers array
                        return [4 /*yield*/, messagesCollection.updateOne({ _id: new mongodb_1.ObjectId(messageId) }, {
                                $addToSet: { deletedForUsers: userId },
                                $set: { updatedAt: now },
                            })];
                        case 4:
                            // Delete for self only - add user to deletedForUsers array
                            _a.sent();
                            _a.label = 5;
                        case 5: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Forward a message to other rooms
         */
        MessageService_1.prototype.forwardMessage = function (userId, dto) {
            return __awaiter(this, void 0, void 0, function () {
                var messagesCollection, roomMembersCollection, originalMessage, membershipChecks, now, forwardedMessages, _i, _a, roomId, forwardedMessage, result;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            if (!this.mongodbService.isReady()) {
                                throw new common_1.ForbiddenException(chat_constants_1.CHAT_ERROR_MESSAGES.MONGODB_NOT_CONNECTED);
                            }
                            messagesCollection = this.mongodbService.getCollection(message_schema_1.MESSAGES_COLLECTION);
                            roomMembersCollection = this.mongodbService.getCollection(room_schema_1.ROOM_MEMBERS_COLLECTION);
                            return [4 /*yield*/, messagesCollection.findOne({
                                    _id: new mongodb_1.ObjectId(dto.messageId),
                                    deletedForEveryone: false,
                                })];
                        case 1:
                            originalMessage = _b.sent();
                            if (!originalMessage) {
                                throw new common_1.NotFoundException(chat_constants_1.CHAT_ERROR_MESSAGES.MESSAGE_NOT_FOUND);
                            }
                            return [4 /*yield*/, roomMembersCollection
                                    .find({
                                    roomId: { $in: dto.toRoomIds },
                                    userId: userId,
                                    leftAt: null,
                                })
                                    .toArray()];
                        case 2:
                            membershipChecks = _b.sent();
                            if (membershipChecks.length !== dto.toRoomIds.length) {
                                throw new common_1.ForbiddenException(chat_constants_1.CHAT_ERROR_MESSAGES.ROOM_ACCESS_DENIED);
                            }
                            now = new Date();
                            forwardedMessages = [];
                            _i = 0, _a = dto.toRoomIds;
                            _b.label = 3;
                        case 3:
                            if (!(_i < _a.length)) return [3 /*break*/, 6];
                            roomId = _a[_i];
                            forwardedMessage = {
                                content: originalMessage.content,
                                userId: userId,
                                roomId: roomId,
                                isEdited: false,
                                isForwarded: true,
                                forwardedFromId: dto.messageId,
                                deletedForEveryone: false,
                                deletedForUsers: [],
                                createdAt: now,
                                updatedAt: now,
                            };
                            return [4 /*yield*/, messagesCollection.insertOne(forwardedMessage)];
                        case 4:
                            result = _b.sent();
                            forwardedMessage._id = result.insertedId;
                            forwardedMessages.push(forwardedMessage);
                            _b.label = 5;
                        case 5:
                            _i++;
                            return [3 /*break*/, 3];
                        case 6: return [2 /*return*/, forwardedMessages];
                    }
                });
            });
        };
        /**
         * Get message edit history
         */
        MessageService_1.prototype.getMessageEditHistory = function (messageId) {
            return __awaiter(this, void 0, void 0, function () {
                var editHistoryCollection;
                return __generator(this, function (_a) {
                    if (!this.mongodbService.isReady()) {
                        throw new common_1.ForbiddenException(chat_constants_1.CHAT_ERROR_MESSAGES.MONGODB_NOT_CONNECTED);
                    }
                    editHistoryCollection = this.mongodbService.getCollection(message_schema_1.MESSAGE_EDIT_HISTORY_COLLECTION);
                    return [2 /*return*/, editHistoryCollection
                            .find({ messageId: messageId })
                            .sort({ editedAt: -1 })
                            .toArray()];
                });
            });
        };
        /**
         * Get a single message by ID
         */
        MessageService_1.prototype.getMessage = function (messageId, userId) {
            return __awaiter(this, void 0, void 0, function () {
                var messagesCollection, message, reactionsCollection, reactions, mediaCollection, media, user;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!this.mongodbService.isReady()) {
                                throw new common_1.ForbiddenException(chat_constants_1.CHAT_ERROR_MESSAGES.MONGODB_NOT_CONNECTED);
                            }
                            messagesCollection = this.mongodbService.getCollection(message_schema_1.MESSAGES_COLLECTION);
                            return [4 /*yield*/, messagesCollection.findOne({
                                    _id: new mongodb_1.ObjectId(messageId),
                                    deletedForEveryone: false,
                                    deletedForUsers: { $ne: userId },
                                })];
                        case 1:
                            message = _a.sent();
                            if (!message) {
                                return [2 /*return*/, null];
                            }
                            reactionsCollection = this.mongodbService.getCollection(message_schema_1.MESSAGE_REACTIONS_COLLECTION);
                            return [4 /*yield*/, reactionsCollection.find({ messageId: messageId }).toArray()];
                        case 2:
                            reactions = _a.sent();
                            mediaCollection = this.mongodbService.getCollection(message_schema_1.MESSAGE_MEDIA_COLLECTION);
                            return [4 /*yield*/, mediaCollection.find({ messageId: messageId }).toArray()];
                        case 3:
                            media = _a.sent();
                            return [4 /*yield*/, this.databaseService.user.findUnique({
                                    where: { id: message.userId },
                                    select: { id: true, name: true, image: true },
                                })];
                        case 4:
                            user = _a.sent();
                            return [2 /*return*/, __assign(__assign({}, message), { reactions: reactions, media: media, user: user || undefined })];
                    }
                });
            });
        };
        /**
         * Search messages across rooms or within a specific room
         */
        MessageService_1.prototype.searchMessages = function (userId_1, query_1, roomId_1) {
            return __awaiter(this, arguments, void 0, function (userId, query, roomId, limit) {
                var messagesCollection, membersCollection, memberships, userRoomIds, searchQuery, messages, userIds, users, userMap;
                if (limit === void 0) { limit = 50; }
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!this.mongodbService.isReady()) {
                                throw new common_1.ForbiddenException(chat_constants_1.CHAT_ERROR_MESSAGES.MONGODB_NOT_CONNECTED);
                            }
                            messagesCollection = this.mongodbService.getCollection(message_schema_1.MESSAGES_COLLECTION);
                            membersCollection = this.mongodbService.getCollection(room_schema_1.ROOM_MEMBERS_COLLECTION);
                            return [4 /*yield*/, membersCollection
                                    .find({ userId: userId, leftAt: null })
                                    .toArray()];
                        case 1:
                            memberships = _a.sent();
                            userRoomIds = memberships.map(function (m) { return m.roomId; });
                            searchQuery = {
                                content: { $regex: query, $options: 'i' },
                                deletedForEveryone: false,
                                deletedForUsers: { $ne: userId },
                                roomId: roomId ? roomId : { $in: userRoomIds },
                            };
                            // Verify user is member of the specified room
                            if (roomId && !userRoomIds.includes(roomId)) {
                                throw new common_1.ForbiddenException(chat_constants_1.CHAT_ERROR_MESSAGES.NOT_ROOM_MEMBER);
                            }
                            return [4 /*yield*/, messagesCollection
                                    .find(searchQuery)
                                    .sort({ createdAt: -1 })
                                    .limit(Math.min(limit, 100))
                                    .toArray()];
                        case 2:
                            messages = _a.sent();
                            userIds = __spreadArray([], new Set(messages.map(function (m) { return m.userId; })), true);
                            return [4 /*yield*/, this.databaseService.user.findMany({
                                    where: { id: { in: userIds } },
                                    select: { id: true, name: true, image: true },
                                })];
                        case 3:
                            users = _a.sent();
                            userMap = new Map(users.map(function (u) { return [u.id, u]; }));
                            // Return with user info
                            return [2 /*return*/, messages.map(function (message) { return (__assign(__assign({}, message), { user: userMap.get(message.userId) || undefined })); })];
                    }
                });
            });
        };
        /**
         * Get total message count for a room
         */
        MessageService_1.prototype.getMessageCount = function (roomId, userId) {
            return __awaiter(this, void 0, void 0, function () {
                var messagesCollection;
                return __generator(this, function (_a) {
                    if (!this.mongodbService.isReady()) {
                        throw new common_1.ForbiddenException(chat_constants_1.CHAT_ERROR_MESSAGES.MONGODB_NOT_CONNECTED);
                    }
                    messagesCollection = this.mongodbService.getCollection(message_schema_1.MESSAGES_COLLECTION);
                    return [2 /*return*/, messagesCollection.countDocuments({
                            roomId: roomId,
                            deletedForEveryone: false,
                            deletedForUsers: { $ne: userId },
                        })];
                });
            });
        };
        /**
         * Get media messages for a room
         */
        MessageService_1.prototype.getMediaMessages = function (roomId_1, userId_1) {
            return __awaiter(this, arguments, void 0, function (roomId, userId, limit) {
                var mediaCollection, messagesCollection, mediaItems, messageIds, messages, userIds, users, userMap;
                if (limit === void 0) { limit = 50; }
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!this.mongodbService.isReady()) {
                                throw new common_1.ForbiddenException(chat_constants_1.CHAT_ERROR_MESSAGES.MONGODB_NOT_CONNECTED);
                            }
                            mediaCollection = this.mongodbService.getCollection(message_schema_1.MESSAGE_MEDIA_COLLECTION);
                            messagesCollection = this.mongodbService.getCollection(message_schema_1.MESSAGES_COLLECTION);
                            return [4 /*yield*/, mediaCollection.find({}).toArray()];
                        case 1:
                            mediaItems = _a.sent();
                            messageIds = __spreadArray([], new Set(mediaItems.map(function (m) { return m.messageId; })), true);
                            return [4 /*yield*/, messagesCollection
                                    .find({
                                    _id: { $in: messageIds.map(function (id) { return new mongodb_1.ObjectId(id); }) },
                                    roomId: roomId,
                                    deletedForEveryone: false,
                                    deletedForUsers: { $ne: userId },
                                })
                                    .sort({ createdAt: -1 })
                                    .limit(Math.min(limit, 100))
                                    .toArray()];
                        case 2:
                            messages = _a.sent();
                            userIds = __spreadArray([], new Set(messages.map(function (m) { return m.userId; })), true);
                            return [4 /*yield*/, this.databaseService.user.findMany({
                                    where: { id: { in: userIds } },
                                    select: { id: true, name: true, image: true },
                                })];
                        case 3:
                            users = _a.sent();
                            userMap = new Map(users.map(function (u) { return [u.id, u]; }));
                            // Return with media and user info
                            return [2 /*return*/, messages.map(function (message) { return (__assign(__assign({}, message), { media: mediaItems.filter(function (m) { return m.messageId === message._id.toHexString(); }), user: userMap.get(message.userId) || undefined })); })];
                    }
                });
            });
        };
        return MessageService_1;
    }());
    __setFunctionName(_classThis, "MessageService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        MessageService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return MessageService = _classThis;
}();
exports.MessageService = MessageService;
