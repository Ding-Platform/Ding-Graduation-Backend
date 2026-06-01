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
exports.ChatController = void 0;
var common_1 = require("@nestjs/common");
var platform_express_1 = require("@nestjs/platform-express");
var swagger_1 = require("@nestjs/swagger");
var jwt_guard_1 = require("src/common/guards/strategy.guards/jwt.guard");
var room_member_guard_1 = require("src/common/guards/room-member.guard");
var room_admin_guard_1 = require("src/common/guards/room-admin.guard");
var current_room_decorator_1 = require("src/common/decorators/current-room.decorator");
var ChatController = function () {
    var _classDecorators = [(0, swagger_1.ApiTags)('Chat'), (0, swagger_1.ApiBearerAuth)(), (0, common_1.Controller)('chat'), (0, common_1.UseGuards)(jwt_guard_1.JwtAuthenticationGuard)];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _instanceExtraInitializers = [];
    var _createRoom_decorators;
    var _createDirectRoom_decorators;
    var _createGroupRoom_decorators;
    var _getUserRooms_decorators;
    var _getRoom_decorators;
    var _updateRoom_decorators;
    var _leaveRoom_decorators;
    var _addMembers_decorators;
    var _removeMember_decorators;
    var _updateMemberRole_decorators;
    var _updateRoomSettings_decorators;
    var _getMessages_decorators;
    var _sendMessage_decorators;
    var _sendMessageWithMedia_decorators;
    var _getMessage_decorators;
    var _editMessage_decorators;
    var _deleteMessage_decorators;
    var _forwardMessage_decorators;
    var _getMessageHistory_decorators;
    var _addReaction_decorators;
    var _removeReaction_decorators;
    var _toggleReaction_decorators;
    var _getReactions_decorators;
    var _markAsRead_decorators;
    var _markAllAsRead_decorators;
    var _getUnreadCount_decorators;
    var _getAllUnreadCounts_decorators;
    var _pinMessage_decorators;
    var _unpinMessage_decorators;
    var _getPinnedMessages_decorators;
    var _searchMessages_decorators;
    var _getMediaMessages_decorators;
    var _getRoomStats_decorators;
    var ChatController = _classThis = /** @class */ (function () {
        function ChatController_1(messageService, roomService, reactionService, readReceiptService, mediaService, chatGateway) {
            this.messageService = (__runInitializers(this, _instanceExtraInitializers), messageService);
            this.roomService = roomService;
            this.reactionService = reactionService;
            this.readReceiptService = readReceiptService;
            this.mediaService = mediaService;
            this.chatGateway = chatGateway;
        }
        // ============ ROOM ENDPOINTS ============
        ChatController_1.prototype.createRoom = function (user, dto) {
            return __awaiter(this, void 0, void 0, function () {
                var room, memberIds, _i, memberIds_1, memberId;
                var _a, _b;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0: return [4 /*yield*/, this.roomService.createRoom(user.id, dto)];
                        case 1:
                            room = _c.sent();
                            memberIds = (_b = (_a = room === null || room === void 0 ? void 0 : room.members) === null || _a === void 0 ? void 0 : _a.map(function (m) { return m.userId; })) !== null && _b !== void 0 ? _b : [];
                            for (_i = 0, memberIds_1 = memberIds; _i < memberIds_1.length; _i++) {
                                memberId = memberIds_1[_i];
                                if (!memberId || memberId === user.id)
                                    continue;
                                this.chatGateway.sendToUser(memberId, 'roomCreated', room);
                            }
                            return [2 /*return*/, room];
                    }
                });
            });
        };
        ChatController_1.prototype.createDirectRoom = function (user, dto) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.roomService.createDirectRoom(user.id, dto)];
                });
            });
        };
        ChatController_1.prototype.createGroupRoom = function (user, dto) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.roomService.createGroupRoom(user.id, dto)];
                });
            });
        };
        ChatController_1.prototype.getUserRooms = function (user, pagination) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.roomService.getUserRooms(user.id, pagination)];
                });
            });
        };
        ChatController_1.prototype.getRoom = function (room) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.roomService.getRoomWithMembers(room._id.toHexString())];
                });
            });
        };
        ChatController_1.prototype.updateRoom = function (roomId, user, dto) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.roomService.updateRoom(roomId, user.id, dto)];
                });
            });
        };
        ChatController_1.prototype.leaveRoom = function (roomId, user) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.roomService.leaveRoom(roomId, user.id)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/, { success: true }];
                    }
                });
            });
        };
        // ============ MEMBER MANAGEMENT ============
        ChatController_1.prototype.addMembers = function (roomId, user, dto) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.roomService.addMembers(roomId, user.id, dto)];
                });
            });
        };
        ChatController_1.prototype.removeMember = function (roomId, memberUserId, user) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.roomService.removeMember(roomId, user.id, memberUserId)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/, { success: true }];
                    }
                });
            });
        };
        ChatController_1.prototype.updateMemberRole = function (roomId, memberUserId, user, dto) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.roomService.updateMemberRole(roomId, user.id, memberUserId, dto)];
                });
            });
        };
        ChatController_1.prototype.updateRoomSettings = function (roomId, user, dto) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.roomService.updateMemberSettings(roomId, user.id, dto)];
                });
            });
        };
        // ============ MESSAGE ENDPOINTS ============
        ChatController_1.prototype.getMessages = function (roomId, user, pagination) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.messageService.getMessages(roomId, user.id, pagination)];
                });
            });
        };
        ChatController_1.prototype.sendMessage = function (roomId, user, dto) {
            return __awaiter(this, void 0, void 0, function () {
                var message, fullMessage, room, memberIds, _i, memberIds_2, memberId;
                var _a, _b;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            // Ensure roomId matches
                            dto.roomId = roomId;
                            return [4 /*yield*/, this.messageService.sendMessage(user.id, dto)];
                        case 1:
                            message = _c.sent();
                            if (!(message === null || message === void 0 ? void 0 : message._id)) return [3 /*break*/, 4];
                            return [4 /*yield*/, this.messageService.getMessage(message._id.toHexString(), user.id)];
                        case 2:
                            fullMessage = _c.sent();
                            // Deliver to all connected clients in the room (when they joined the room).
                            this.chatGateway.sendToRoom(roomId, 'newMessage', fullMessage);
                            this.chatGateway.sendToRoom(roomId, 'message', fullMessage);
                            return [4 /*yield*/, this.roomService.getRoomWithMembers(roomId)];
                        case 3:
                            room = _c.sent();
                            memberIds = (_b = (_a = room === null || room === void 0 ? void 0 : room.members) === null || _a === void 0 ? void 0 : _a.map(function (m) { return m.userId; })) !== null && _b !== void 0 ? _b : [];
                            for (_i = 0, memberIds_2 = memberIds; _i < memberIds_2.length; _i++) {
                                memberId = memberIds_2[_i];
                                if (!memberId || memberId === user.id)
                                    continue;
                                this.chatGateway.sendToUser(memberId, 'newMessage', fullMessage);
                            }
                            _c.label = 4;
                        case 4: return [2 /*return*/, message];
                    }
                });
            });
        };
        ChatController_1.prototype.sendMessageWithMedia = function (roomId, user, dto, files) {
            return __awaiter(this, void 0, void 0, function () {
                var mediaFiles, message, updatedMedia, fullMessage, room, memberIds, _i, memberIds_3, memberId;
                var _a, _b;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            dto.roomId = roomId;
                            if (!((files === null || files === void 0 ? void 0 : files.files) && files.files.length > 0)) return [3 /*break*/, 2];
                            return [4 /*yield*/, this.mediaService.uploadMultiple(files.files, 'temp')];
                        case 1:
                            mediaFiles = _c.sent();
                            _c.label = 2;
                        case 2: return [4 /*yield*/, this.messageService.sendMessage(user.id, dto, mediaFiles)];
                        case 3:
                            message = _c.sent();
                            if (!(mediaFiles && message._id)) return [3 /*break*/, 5];
                            updatedMedia = mediaFiles.map(function (m) { return (__assign(__assign({}, m), { messageId: message._id.toHexString() })); });
                            return [4 /*yield*/, this.mediaService.saveMultipleMedia(updatedMedia)];
                        case 4:
                            _c.sent();
                            _c.label = 5;
                        case 5:
                            if (!(message === null || message === void 0 ? void 0 : message._id)) return [3 /*break*/, 8];
                            return [4 /*yield*/, this.messageService.getMessage(message._id.toHexString(), user.id)];
                        case 6:
                            fullMessage = _c.sent();
                            this.chatGateway.sendToRoom(roomId, 'newMessage', fullMessage);
                            this.chatGateway.sendToRoom(roomId, 'message', fullMessage);
                            return [4 /*yield*/, this.roomService.getRoomWithMembers(roomId)];
                        case 7:
                            room = _c.sent();
                            memberIds = (_b = (_a = room === null || room === void 0 ? void 0 : room.members) === null || _a === void 0 ? void 0 : _a.map(function (m) { return m.userId; })) !== null && _b !== void 0 ? _b : [];
                            for (_i = 0, memberIds_3 = memberIds; _i < memberIds_3.length; _i++) {
                                memberId = memberIds_3[_i];
                                if (!memberId || memberId === user.id)
                                    continue;
                                this.chatGateway.sendToUser(memberId, 'newMessage', fullMessage);
                            }
                            _c.label = 8;
                        case 8: return [2 /*return*/, message];
                    }
                });
            });
        };
        ChatController_1.prototype.getMessage = function (messageId, user) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.messageService.getMessage(messageId, user.id)];
                });
            });
        };
        ChatController_1.prototype.editMessage = function (messageId, user, dto) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.messageService.editMessage(messageId, user.id, dto)];
                });
            });
        };
        ChatController_1.prototype.deleteMessage = function (messageId, user, dto) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.messageService.deleteMessage(messageId, user.id, dto.deleteForEveryone)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/, { success: true }];
                    }
                });
            });
        };
        ChatController_1.prototype.forwardMessage = function (user, dto) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.messageService.forwardMessage(user.id, dto)];
                });
            });
        };
        ChatController_1.prototype.getMessageHistory = function (messageId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.messageService.getMessageEditHistory(messageId)];
                });
            });
        };
        // ============ REACTION ENDPOINTS ============
        ChatController_1.prototype.addReaction = function (messageId, user, dto) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.reactionService.addReaction(messageId, user.id, dto)];
                });
            });
        };
        ChatController_1.prototype.removeReaction = function (messageId, emoji, user) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.reactionService.removeReaction(messageId, user.id, decodeURIComponent(emoji))];
                        case 1:
                            _a.sent();
                            return [2 /*return*/, { success: true }];
                    }
                });
            });
        };
        ChatController_1.prototype.toggleReaction = function (messageId, user, dto) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.reactionService.toggleReaction(messageId, user.id, dto.emoji)];
                });
            });
        };
        ChatController_1.prototype.getReactions = function (messageId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.reactionService.getReactionCounts(messageId)];
                });
            });
        };
        // ============ READ RECEIPTS ============
        ChatController_1.prototype.markAsRead = function (messageId, user, roomId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.readReceiptService.markAsRead(messageId, roomId, user.id)];
                });
            });
        };
        ChatController_1.prototype.markAllAsRead = function (roomId, user) {
            return __awaiter(this, void 0, void 0, function () {
                var count;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.readReceiptService.markAllAsRead(roomId, user.id)];
                        case 1:
                            count = _a.sent();
                            return [2 /*return*/, { markedAsRead: count }];
                    }
                });
            });
        };
        ChatController_1.prototype.getUnreadCount = function (roomId, user) {
            return __awaiter(this, void 0, void 0, function () {
                var count;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.readReceiptService.getUnreadCount(roomId, user.id)];
                        case 1:
                            count = _a.sent();
                            return [2 /*return*/, { unreadCount: count }];
                    }
                });
            });
        };
        ChatController_1.prototype.getAllUnreadCounts = function (user) {
            return __awaiter(this, void 0, void 0, function () {
                var counts;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.readReceiptService.getAllUnreadCounts(user.id)];
                        case 1:
                            counts = _a.sent();
                            return [2 /*return*/, Object.fromEntries(counts)];
                    }
                });
            });
        };
        // ============ PIN MESSAGES ============
        ChatController_1.prototype.pinMessage = function (roomId, messageId, user) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.roomService.pinMessage(roomId, messageId, user.id)];
                });
            });
        };
        ChatController_1.prototype.unpinMessage = function (roomId, messageId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.roomService.unpinMessage(roomId, messageId)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/, { success: true }];
                    }
                });
            });
        };
        ChatController_1.prototype.getPinnedMessages = function (roomId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.roomService.getPinnedMessages(roomId)];
                });
            });
        };
        // ============ SEARCH & MEDIA ============
        ChatController_1.prototype.searchMessages = function (user, query, roomId, pagination) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.messageService.searchMessages(user.id, query, roomId, pagination === null || pagination === void 0 ? void 0 : pagination.limit)];
                });
            });
        };
        ChatController_1.prototype.getMediaMessages = function (roomId, user, pagination) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.messageService.getMediaMessages(roomId, user.id, pagination === null || pagination === void 0 ? void 0 : pagination.limit)];
                });
            });
        };
        ChatController_1.prototype.getRoomStats = function (roomId, user) {
            return __awaiter(this, void 0, void 0, function () {
                var messageCount, unreadCount;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.messageService.getMessageCount(roomId, user.id)];
                        case 1:
                            messageCount = _a.sent();
                            return [4 /*yield*/, this.readReceiptService.getUnreadCount(roomId, user.id)];
                        case 2:
                            unreadCount = _a.sent();
                            return [2 /*return*/, { messageCount: messageCount, unreadCount: unreadCount }];
                    }
                });
            });
        };
        return ChatController_1;
    }());
    __setFunctionName(_classThis, "ChatController");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _createRoom_decorators = [(0, common_1.Post)('rooms'), (0, swagger_1.ApiOperation)({ summary: 'Create a new room (direct or group)' })];
        _createDirectRoom_decorators = [(0, common_1.Post)('rooms/direct'), (0, swagger_1.ApiOperation)({ summary: 'Create a direct (1:1) room' })];
        _createGroupRoom_decorators = [(0, common_1.Post)('rooms/group'), (0, swagger_1.ApiOperation)({ summary: 'Create a group room' })];
        _getUserRooms_decorators = [(0, common_1.Get)('rooms'), (0, swagger_1.ApiOperation)({ summary: 'Get user rooms' })];
        _getRoom_decorators = [(0, common_1.Get)('rooms/:roomId'), (0, swagger_1.ApiOperation)({ summary: 'Get room details' }), (0, common_1.UseGuards)(room_member_guard_1.RoomMemberGuard), (0, current_room_decorator_1.RoomIdParam)('roomId')];
        _updateRoom_decorators = [(0, common_1.Patch)('rooms/:roomId'), (0, swagger_1.ApiOperation)({ summary: 'Update room details (groups only)' }), (0, common_1.UseGuards)(room_member_guard_1.RoomMemberGuard, room_admin_guard_1.RoomAdminGuard), (0, current_room_decorator_1.RoomIdParam)('roomId')];
        _leaveRoom_decorators = [(0, common_1.Post)('rooms/:roomId/leave'), (0, swagger_1.ApiOperation)({ summary: 'Leave a room' }), (0, common_1.UseGuards)(room_member_guard_1.RoomMemberGuard), (0, current_room_decorator_1.RoomIdParam)('roomId')];
        _addMembers_decorators = [(0, common_1.Post)('rooms/:roomId/members'), (0, swagger_1.ApiOperation)({ summary: 'Add members to a room' }), (0, common_1.UseGuards)(room_member_guard_1.RoomMemberGuard, room_admin_guard_1.RoomAdminGuard), (0, current_room_decorator_1.RoomIdParam)('roomId')];
        _removeMember_decorators = [(0, common_1.Delete)('rooms/:roomId/members/:userId'), (0, swagger_1.ApiOperation)({ summary: 'Remove a member from a room' }), (0, common_1.UseGuards)(room_member_guard_1.RoomMemberGuard, room_admin_guard_1.RoomAdminGuard), (0, current_room_decorator_1.RoomIdParam)('roomId')];
        _updateMemberRole_decorators = [(0, common_1.Patch)('rooms/:roomId/members/:userId/role'), (0, swagger_1.ApiOperation)({ summary: 'Update member role' }), (0, common_1.UseGuards)(room_member_guard_1.RoomMemberGuard, room_admin_guard_1.RoomAdminGuard), (0, current_room_decorator_1.RoomIdParam)('roomId')];
        _updateRoomSettings_decorators = [(0, common_1.Patch)('rooms/:roomId/settings'), (0, swagger_1.ApiOperation)({ summary: 'Update room settings (mute, archive)' }), (0, common_1.UseGuards)(room_member_guard_1.RoomMemberGuard), (0, current_room_decorator_1.RoomIdParam)('roomId')];
        _getMessages_decorators = [(0, common_1.Get)('rooms/:roomId/messages'), (0, swagger_1.ApiOperation)({ summary: 'Get messages in a room' }), (0, common_1.UseGuards)(room_member_guard_1.RoomMemberGuard), (0, current_room_decorator_1.RoomIdParam)('roomId')];
        _sendMessage_decorators = [(0, common_1.Post)('rooms/:roomId/messages'), (0, swagger_1.ApiOperation)({ summary: 'Send a message' }), (0, common_1.UseGuards)(room_member_guard_1.RoomMemberGuard), (0, current_room_decorator_1.RoomIdParam)('roomId')];
        _sendMessageWithMedia_decorators = [(0, common_1.Post)('rooms/:roomId/messages/media'), (0, swagger_1.ApiOperation)({ summary: 'Send a message with media' }), (0, swagger_1.ApiConsumes)('multipart/form-data'), (0, swagger_1.ApiBody)({
                schema: {
                    type: 'object',
                    properties: {
                        content: { type: 'string' },
                        replyToId: { type: 'string' },
                        files: { type: 'array', items: { type: 'string', format: 'binary' } },
                    },
                },
            }), (0, common_1.UseGuards)(room_member_guard_1.RoomMemberGuard), (0, current_room_decorator_1.RoomIdParam)('roomId'), (0, common_1.UseInterceptors)((0, platform_express_1.FileFieldsInterceptor)([{ name: 'files', maxCount: 10 }]))];
        _getMessage_decorators = [(0, common_1.Get)('messages/:messageId'), (0, swagger_1.ApiOperation)({ summary: 'Get a single message' })];
        _editMessage_decorators = [(0, common_1.Patch)('messages/:messageId'), (0, swagger_1.ApiOperation)({ summary: 'Edit a message' })];
        _deleteMessage_decorators = [(0, common_1.Delete)('messages/:messageId'), (0, swagger_1.ApiOperation)({ summary: 'Delete a message' })];
        _forwardMessage_decorators = [(0, common_1.Post)('messages/forward'), (0, swagger_1.ApiOperation)({ summary: 'Forward a message to other rooms' })];
        _getMessageHistory_decorators = [(0, common_1.Get)('messages/:messageId/history'), (0, swagger_1.ApiOperation)({ summary: 'Get message edit history' })];
        _addReaction_decorators = [(0, common_1.Post)('messages/:messageId/reactions'), (0, swagger_1.ApiOperation)({ summary: 'Add a reaction to a message' })];
        _removeReaction_decorators = [(0, common_1.Delete)('messages/:messageId/reactions/:emoji'), (0, swagger_1.ApiOperation)({ summary: 'Remove a reaction from a message' })];
        _toggleReaction_decorators = [(0, common_1.Post)('messages/:messageId/reactions/toggle'), (0, swagger_1.ApiOperation)({ summary: 'Toggle a reaction (add/remove)' })];
        _getReactions_decorators = [(0, common_1.Get)('messages/:messageId/reactions'), (0, swagger_1.ApiOperation)({ summary: 'Get reaction counts for a message' })];
        _markAsRead_decorators = [(0, common_1.Post)('messages/:messageId/read'), (0, swagger_1.ApiOperation)({ summary: 'Mark a message as read' })];
        _markAllAsRead_decorators = [(0, common_1.Post)('rooms/:roomId/read-all'), (0, swagger_1.ApiOperation)({ summary: 'Mark all messages in a room as read' }), (0, common_1.UseGuards)(room_member_guard_1.RoomMemberGuard), (0, current_room_decorator_1.RoomIdParam)('roomId')];
        _getUnreadCount_decorators = [(0, common_1.Get)('rooms/:roomId/unread-count'), (0, swagger_1.ApiOperation)({ summary: 'Get unread count for a room' }), (0, common_1.UseGuards)(room_member_guard_1.RoomMemberGuard), (0, current_room_decorator_1.RoomIdParam)('roomId')];
        _getAllUnreadCounts_decorators = [(0, common_1.Get)('unread-counts'), (0, swagger_1.ApiOperation)({ summary: 'Get unread counts for all rooms' })];
        _pinMessage_decorators = [(0, common_1.Post)('rooms/:roomId/pin/:messageId'), (0, swagger_1.ApiOperation)({ summary: 'Pin a message' }), (0, common_1.UseGuards)(room_member_guard_1.RoomMemberGuard, room_admin_guard_1.RoomAdminGuard), (0, current_room_decorator_1.RoomIdParam)('roomId')];
        _unpinMessage_decorators = [(0, common_1.Delete)('rooms/:roomId/pin/:messageId'), (0, swagger_1.ApiOperation)({ summary: 'Unpin a message' }), (0, common_1.UseGuards)(room_member_guard_1.RoomMemberGuard, room_admin_guard_1.RoomAdminGuard), (0, current_room_decorator_1.RoomIdParam)('roomId')];
        _getPinnedMessages_decorators = [(0, common_1.Get)('rooms/:roomId/pinned'), (0, swagger_1.ApiOperation)({ summary: 'Get pinned messages in a room' }), (0, common_1.UseGuards)(room_member_guard_1.RoomMemberGuard), (0, current_room_decorator_1.RoomIdParam)('roomId')];
        _searchMessages_decorators = [(0, common_1.Get)('search'), (0, swagger_1.ApiOperation)({
                summary: 'Search messages across all rooms or within a specific room',
            })];
        _getMediaMessages_decorators = [(0, common_1.Get)('rooms/:roomId/media'), (0, swagger_1.ApiOperation)({ summary: 'Get media messages in a room' }), (0, common_1.UseGuards)(room_member_guard_1.RoomMemberGuard), (0, current_room_decorator_1.RoomIdParam)('roomId')];
        _getRoomStats_decorators = [(0, common_1.Get)('rooms/:roomId/stats'), (0, swagger_1.ApiOperation)({ summary: 'Get room statistics' }), (0, common_1.UseGuards)(room_member_guard_1.RoomMemberGuard), (0, current_room_decorator_1.RoomIdParam)('roomId')];
        __esDecorate(_classThis, null, _createRoom_decorators, { kind: "method", name: "createRoom", static: false, private: false, access: { has: function (obj) { return "createRoom" in obj; }, get: function (obj) { return obj.createRoom; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _createDirectRoom_decorators, { kind: "method", name: "createDirectRoom", static: false, private: false, access: { has: function (obj) { return "createDirectRoom" in obj; }, get: function (obj) { return obj.createDirectRoom; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _createGroupRoom_decorators, { kind: "method", name: "createGroupRoom", static: false, private: false, access: { has: function (obj) { return "createGroupRoom" in obj; }, get: function (obj) { return obj.createGroupRoom; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getUserRooms_decorators, { kind: "method", name: "getUserRooms", static: false, private: false, access: { has: function (obj) { return "getUserRooms" in obj; }, get: function (obj) { return obj.getUserRooms; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getRoom_decorators, { kind: "method", name: "getRoom", static: false, private: false, access: { has: function (obj) { return "getRoom" in obj; }, get: function (obj) { return obj.getRoom; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _updateRoom_decorators, { kind: "method", name: "updateRoom", static: false, private: false, access: { has: function (obj) { return "updateRoom" in obj; }, get: function (obj) { return obj.updateRoom; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _leaveRoom_decorators, { kind: "method", name: "leaveRoom", static: false, private: false, access: { has: function (obj) { return "leaveRoom" in obj; }, get: function (obj) { return obj.leaveRoom; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _addMembers_decorators, { kind: "method", name: "addMembers", static: false, private: false, access: { has: function (obj) { return "addMembers" in obj; }, get: function (obj) { return obj.addMembers; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _removeMember_decorators, { kind: "method", name: "removeMember", static: false, private: false, access: { has: function (obj) { return "removeMember" in obj; }, get: function (obj) { return obj.removeMember; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _updateMemberRole_decorators, { kind: "method", name: "updateMemberRole", static: false, private: false, access: { has: function (obj) { return "updateMemberRole" in obj; }, get: function (obj) { return obj.updateMemberRole; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _updateRoomSettings_decorators, { kind: "method", name: "updateRoomSettings", static: false, private: false, access: { has: function (obj) { return "updateRoomSettings" in obj; }, get: function (obj) { return obj.updateRoomSettings; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getMessages_decorators, { kind: "method", name: "getMessages", static: false, private: false, access: { has: function (obj) { return "getMessages" in obj; }, get: function (obj) { return obj.getMessages; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _sendMessage_decorators, { kind: "method", name: "sendMessage", static: false, private: false, access: { has: function (obj) { return "sendMessage" in obj; }, get: function (obj) { return obj.sendMessage; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _sendMessageWithMedia_decorators, { kind: "method", name: "sendMessageWithMedia", static: false, private: false, access: { has: function (obj) { return "sendMessageWithMedia" in obj; }, get: function (obj) { return obj.sendMessageWithMedia; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getMessage_decorators, { kind: "method", name: "getMessage", static: false, private: false, access: { has: function (obj) { return "getMessage" in obj; }, get: function (obj) { return obj.getMessage; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _editMessage_decorators, { kind: "method", name: "editMessage", static: false, private: false, access: { has: function (obj) { return "editMessage" in obj; }, get: function (obj) { return obj.editMessage; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _deleteMessage_decorators, { kind: "method", name: "deleteMessage", static: false, private: false, access: { has: function (obj) { return "deleteMessage" in obj; }, get: function (obj) { return obj.deleteMessage; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _forwardMessage_decorators, { kind: "method", name: "forwardMessage", static: false, private: false, access: { has: function (obj) { return "forwardMessage" in obj; }, get: function (obj) { return obj.forwardMessage; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getMessageHistory_decorators, { kind: "method", name: "getMessageHistory", static: false, private: false, access: { has: function (obj) { return "getMessageHistory" in obj; }, get: function (obj) { return obj.getMessageHistory; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _addReaction_decorators, { kind: "method", name: "addReaction", static: false, private: false, access: { has: function (obj) { return "addReaction" in obj; }, get: function (obj) { return obj.addReaction; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _removeReaction_decorators, { kind: "method", name: "removeReaction", static: false, private: false, access: { has: function (obj) { return "removeReaction" in obj; }, get: function (obj) { return obj.removeReaction; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _toggleReaction_decorators, { kind: "method", name: "toggleReaction", static: false, private: false, access: { has: function (obj) { return "toggleReaction" in obj; }, get: function (obj) { return obj.toggleReaction; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getReactions_decorators, { kind: "method", name: "getReactions", static: false, private: false, access: { has: function (obj) { return "getReactions" in obj; }, get: function (obj) { return obj.getReactions; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _markAsRead_decorators, { kind: "method", name: "markAsRead", static: false, private: false, access: { has: function (obj) { return "markAsRead" in obj; }, get: function (obj) { return obj.markAsRead; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _markAllAsRead_decorators, { kind: "method", name: "markAllAsRead", static: false, private: false, access: { has: function (obj) { return "markAllAsRead" in obj; }, get: function (obj) { return obj.markAllAsRead; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getUnreadCount_decorators, { kind: "method", name: "getUnreadCount", static: false, private: false, access: { has: function (obj) { return "getUnreadCount" in obj; }, get: function (obj) { return obj.getUnreadCount; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getAllUnreadCounts_decorators, { kind: "method", name: "getAllUnreadCounts", static: false, private: false, access: { has: function (obj) { return "getAllUnreadCounts" in obj; }, get: function (obj) { return obj.getAllUnreadCounts; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _pinMessage_decorators, { kind: "method", name: "pinMessage", static: false, private: false, access: { has: function (obj) { return "pinMessage" in obj; }, get: function (obj) { return obj.pinMessage; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _unpinMessage_decorators, { kind: "method", name: "unpinMessage", static: false, private: false, access: { has: function (obj) { return "unpinMessage" in obj; }, get: function (obj) { return obj.unpinMessage; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getPinnedMessages_decorators, { kind: "method", name: "getPinnedMessages", static: false, private: false, access: { has: function (obj) { return "getPinnedMessages" in obj; }, get: function (obj) { return obj.getPinnedMessages; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _searchMessages_decorators, { kind: "method", name: "searchMessages", static: false, private: false, access: { has: function (obj) { return "searchMessages" in obj; }, get: function (obj) { return obj.searchMessages; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getMediaMessages_decorators, { kind: "method", name: "getMediaMessages", static: false, private: false, access: { has: function (obj) { return "getMediaMessages" in obj; }, get: function (obj) { return obj.getMediaMessages; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getRoomStats_decorators, { kind: "method", name: "getRoomStats", static: false, private: false, access: { has: function (obj) { return "getRoomStats" in obj; }, get: function (obj) { return obj.getRoomStats; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ChatController = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ChatController = _classThis;
}();
exports.ChatController = ChatController;
