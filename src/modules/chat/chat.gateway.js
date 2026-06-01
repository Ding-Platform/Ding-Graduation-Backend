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
exports.ChatGateway = void 0;
var websockets_1 = require("@nestjs/websockets");
var common_1 = require("@nestjs/common");
var ws_jwt_guard_1 = require("src/common/guards/ws-jwt.guard");
var chat_middleware_1 = require("src/common/middlewares/chat.middleware");
var chat_room_interceptor_1 = require("src/common/interceptors/chat-room.interceptor");
var chat_constants_1 = require("src/common/constants/chat.constants");
var ChatGateway = function () {
    var _classDecorators = [(0, websockets_1.WebSocketGateway)({
            namespace: '/chat',
            cors: {
                origin: '*',
                credentials: true,
            },
        }), (0, common_1.UseGuards)(ws_jwt_guard_1.WsJwtGuard), (0, common_1.UseInterceptors)(chat_room_interceptor_1.ChatUserStateInterceptor)];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _instanceExtraInitializers = [];
    var _server_decorators;
    var _server_initializers = [];
    var _server_extraInitializers = [];
    var _handleJoinRoom_decorators;
    var _handleLeaveRoom_decorators;
    var _handleMessage_decorators;
    var _handleTyping_decorators;
    var _handleReaction_decorators;
    var _handleMessageRead_decorators;
    var _handleMarkAllRead_decorators;
    var ChatGateway = _classThis = /** @class */ (function () {
        function ChatGateway_1(jwtService, authService, messageService, roomService, reactionService, readReceiptService) {
            this.jwtService = (__runInitializers(this, _instanceExtraInitializers), jwtService);
            this.authService = authService;
            this.messageService = messageService;
            this.roomService = roomService;
            this.reactionService = reactionService;
            this.readReceiptService = readReceiptService;
            this.logger = new common_1.Logger('ChatGateway');
            // Track users in rooms: roomId -> Set of socket IDs
            this.roomSockets = new Map();
            // Track user sockets: userId -> Set of socket IDs (user can have multiple connections)
            this.userSockets = new Map();
            // Track typing indicators with debounce
            this.typingTimeouts = new Map();
            this.server = __runInitializers(this, _server_initializers, void 0);
            __runInitializers(this, _server_extraInitializers);
            this.jwtService = jwtService;
            this.authService = authService;
            this.messageService = messageService;
            this.roomService = roomService;
            this.reactionService = reactionService;
            this.readReceiptService = readReceiptService;
        }
        ChatGateway_1.prototype.afterInit = function (server) {
            this.logger.log('ChatGateway Initialized');
            // Register Socket.IO middleware for JWT authentication
            var socketAuth = (0, chat_middleware_1.SocketAuthMiddleware)(this.logger, this.jwtService, this.authService);
            server.use(function (socket, next) {
                void socketAuth(socket, next);
            });
        };
        ChatGateway_1.prototype.handleConnection = function (client) {
            return __awaiter(this, void 0, void 0, function () {
                var user;
                return __generator(this, function (_a) {
                    user = client.data.user;
                    if (!user) {
                        this.logger.warn("Connection rejected: No user data");
                        client.disconnect();
                        return [2 /*return*/];
                    }
                    this.logger.log("User ".concat(user.id, " (").concat(user.email, ") connected with socket ").concat(client.id));
                    // Track user socket
                    if (!this.userSockets.has(user.id)) {
                        this.userSockets.set(user.id, new Set());
                    }
                    this.userSockets.get(user.id).add(client.id);
                    // Initialize user state
                    client.data.state = {
                        activeRoomId: null,
                        isTyping: false,
                        lastActivity: new Date(),
                        joinedRooms: new Set(),
                    };
                    // Emit connected event
                    client.emit('connected', {
                        message: 'Successfully authenticated',
                        userId: user.id,
                        username: user.name || user.email,
                    });
                    // Broadcast user online status
                    this.broadcastUserStatus(user.id, 'online');
                    return [2 /*return*/];
                });
            });
        };
        ChatGateway_1.prototype.handleDisconnect = function (client) {
            var _a, _b;
            var user = client.data.user;
            if (user) {
                this.logger.log("User ".concat(user.id, " disconnected (socket: ").concat(client.id, ")"));
                // Remove socket from tracking
                var userSocketSet = this.userSockets.get(user.id);
                if (userSocketSet) {
                    userSocketSet.delete(client.id);
                    if (userSocketSet.size === 0) {
                        this.userSockets.delete(user.id);
                        // Last connection - broadcast offline status
                        this.broadcastUserStatus(user.id, 'offline');
                    }
                }
                // Leave all rooms
                if ((_a = client.data.state) === null || _a === void 0 ? void 0 : _a.joinedRooms) {
                    for (var _i = 0, _c = client.data.state.joinedRooms; _i < _c.length; _i++) {
                        var roomId = _c[_i];
                        this.leaveRoomInternal(client, roomId);
                    }
                }
                // Clear typing timeout
                var typingKey = "".concat(user.id, ":").concat((_b = client.data.state) === null || _b === void 0 ? void 0 : _b.activeRoomId);
                var timeout = this.typingTimeouts.get(typingKey);
                if (timeout) {
                    clearTimeout(timeout);
                    this.typingTimeouts.delete(typingKey);
                }
            }
            else {
                this.logger.log("Client ".concat(client.id, " disconnected"));
            }
        };
        /**
         * Join a room to receive messages
         */
        ChatGateway_1.prototype.handleJoinRoom = function (client, payload) {
            return __awaiter(this, void 0, void 0, function () {
                var user, roomId, room, isMember, error_1;
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            user = client.data.user;
                            if (!user)
                                return [2 /*return*/, { error: 'Unauthorized' }];
                            roomId = payload.roomId;
                            _b.label = 1;
                        case 1:
                            _b.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, this.roomService.getRoomWithMembers(roomId)];
                        case 2:
                            room = _b.sent();
                            isMember = (_a = room.members) === null || _a === void 0 ? void 0 : _a.some(function (m) { return m.userId === user.id; });
                            if (!isMember) {
                                return [2 /*return*/, { error: 'Not a member of this room' }];
                            }
                            // Join socket room
                            client.join(roomId);
                            client.data.state.joinedRooms.add(roomId);
                            client.data.state.activeRoomId = roomId;
                            // Track room socket
                            if (!this.roomSockets.has(roomId)) {
                                this.roomSockets.set(roomId, new Set());
                            }
                            this.roomSockets.get(roomId).add(client.id);
                            this.logger.log("User ".concat(user.id, " joined room ").concat(roomId));
                            // Notify room members
                            client.to(roomId).emit('userJoined', {
                                userId: user.id,
                                username: user.name || user.email,
                                roomId: roomId,
                            });
                            return [2 /*return*/, { success: true, roomId: roomId }];
                        case 3:
                            error_1 = _b.sent();
                            this.logger.error("Error joining room: ".concat(error_1.message));
                            return [2 /*return*/, { error: error_1.message }];
                        case 4: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Leave a room
         */
        ChatGateway_1.prototype.handleLeaveRoom = function (client, payload) {
            return __awaiter(this, void 0, void 0, function () {
                var user, roomId;
                return __generator(this, function (_a) {
                    user = client.data.user;
                    if (!user)
                        return [2 /*return*/, { error: 'Unauthorized' }];
                    roomId = payload.roomId;
                    this.leaveRoomInternal(client, roomId);
                    return [2 /*return*/, { success: true }];
                });
            });
        };
        ChatGateway_1.prototype.leaveRoomInternal = function (client, roomId) {
            var _a, _b, _c;
            var user = client.data.user;
            if (!user)
                return;
            client.leave(roomId);
            (_b = (_a = client.data.state) === null || _a === void 0 ? void 0 : _a.joinedRooms) === null || _b === void 0 ? void 0 : _b.delete(roomId);
            if (((_c = client.data.state) === null || _c === void 0 ? void 0 : _c.activeRoomId) === roomId) {
                client.data.state.activeRoomId = null;
            }
            // Untrack room socket
            var roomSocketSet = this.roomSockets.get(roomId);
            if (roomSocketSet) {
                roomSocketSet.delete(client.id);
                if (roomSocketSet.size === 0) {
                    this.roomSockets.delete(roomId);
                }
            }
            // Notify room members
            client.to(roomId).emit('userLeft', {
                userId: user.id,
                roomId: roomId,
            });
            this.logger.log("User ".concat(user.id, " left room ").concat(roomId));
        };
        /**
         * Send a message
         */
        ChatGateway_1.prototype.handleMessage = function (client, payload) {
            return __awaiter(this, void 0, void 0, function () {
                var user, roomId, content, replyToId, message, fullMessage, payloadToEmit, room, memberIds, _i, memberIds_1, memberId, error_2;
                var _a, _b;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            user = client.data.user;
                            if (!user) {
                                client.emit('error', { message: 'Unauthorized' });
                                return [2 /*return*/];
                            }
                            roomId = payload.roomId, content = payload.content, replyToId = payload.replyToId;
                            if (!(content === null || content === void 0 ? void 0 : content.trim())) {
                                client.emit('error', { message: 'Message cannot be empty' });
                                return [2 /*return*/];
                            }
                            _c.label = 1;
                        case 1:
                            _c.trys.push([1, 5, , 6]);
                            return [4 /*yield*/, this.messageService.sendMessage(user.id, {
                                    roomId: roomId,
                                    content: content,
                                    replyToId: replyToId,
                                })];
                        case 2:
                            message = _c.sent();
                            return [4 /*yield*/, this.messageService.getMessage(message._id.toHexString(), user.id)];
                        case 3:
                            fullMessage = _c.sent();
                            payloadToEmit = __assign(__assign({}, fullMessage), { user: {
                                    id: user.id,
                                    name: user.name,
                                    image: user.image,
                                } });
                            // Emit both event names for compatibility with different clients.
                            this.server.to(roomId).emit('message', payloadToEmit);
                            this.server.to(roomId).emit('newMessage', payloadToEmit);
                            return [4 /*yield*/, this.roomService.getRoomWithMembers(roomId)];
                        case 4:
                            room = _c.sent();
                            memberIds = (_b = (_a = room === null || room === void 0 ? void 0 : room.members) === null || _a === void 0 ? void 0 : _a.map(function (m) { return m.userId; })) !== null && _b !== void 0 ? _b : [];
                            for (_i = 0, memberIds_1 = memberIds; _i < memberIds_1.length; _i++) {
                                memberId = memberIds_1[_i];
                                if (!memberId || memberId === user.id)
                                    continue;
                                this.sendToUser(memberId, 'newMessage', payloadToEmit);
                            }
                            // Clear typing indicator
                            this.handleTypingInternal(client, roomId, false);
                            this.logger.log("Message from user ".concat(user.id, " in room ").concat(roomId));
                            return [2 /*return*/, { success: true, message: fullMessage }];
                        case 5:
                            error_2 = _c.sent();
                            this.logger.error("Error sending message: ".concat(error_2.message));
                            client.emit('error', { message: error_2.message });
                            return [3 /*break*/, 6];
                        case 6: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Typing indicator
         */
        ChatGateway_1.prototype.handleTyping = function (client, payload) {
            var user = client.data.user;
            if (!user)
                return;
            var roomId = payload.roomId, isTyping = payload.isTyping;
            this.handleTypingInternal(client, roomId, isTyping);
        };
        ChatGateway_1.prototype.handleTypingInternal = function (client, roomId, isTyping) {
            var _this = this;
            var user = client.data.user;
            if (!user)
                return;
            var typingKey = "".concat(user.id, ":").concat(roomId);
            // Clear existing timeout
            var existingTimeout = this.typingTimeouts.get(typingKey);
            if (existingTimeout) {
                clearTimeout(existingTimeout);
                this.typingTimeouts.delete(typingKey);
            }
            if (isTyping) {
                // Set auto-stop timeout
                var timeout = setTimeout(function () {
                    client.to(roomId).emit('typing', {
                        userId: user.id,
                        username: user.name || user.email,
                        isTyping: false,
                    });
                    _this.typingTimeouts.delete(typingKey);
                }, chat_constants_1.CHAT_CONSTANTS.TYPING_INDICATOR.TIMEOUT_MS);
                this.typingTimeouts.set(typingKey, timeout);
            }
            // Broadcast typing status
            client.to(roomId).emit('typing', {
                userId: user.id,
                username: user.name || user.email,
                isTyping: isTyping,
            });
        };
        /**
         * Toggle reaction on a message
         */
        ChatGateway_1.prototype.handleReaction = function (client, payload) {
            return __awaiter(this, void 0, void 0, function () {
                var user, messageId, emoji, result, message, error_3;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            user = client.data.user;
                            if (!user)
                                return [2 /*return*/, { error: 'Unauthorized' }];
                            messageId = payload.messageId, emoji = payload.emoji;
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 4, , 5]);
                            return [4 /*yield*/, this.reactionService.toggleReaction(messageId, user.id, emoji)];
                        case 2:
                            result = _a.sent();
                            return [4 /*yield*/, this.messageService.getMessage(messageId, user.id)];
                        case 3:
                            message = _a.sent();
                            if (message) {
                                // Broadcast to room
                                this.server.to(message.roomId).emit('reaction', {
                                    messageId: messageId,
                                    userId: user.id,
                                    emoji: emoji,
                                    added: result.added,
                                });
                            }
                            return [2 /*return*/, __assign({ success: true }, result)];
                        case 4:
                            error_3 = _a.sent();
                            this.logger.error("Error toggling reaction: ".concat(error_3.message));
                            return [2 /*return*/, { error: error_3.message }];
                        case 5: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Mark message as read
         */
        ChatGateway_1.prototype.handleMessageRead = function (client, payload) {
            return __awaiter(this, void 0, void 0, function () {
                var user, messageId, roomId, error_4;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            user = client.data.user;
                            if (!user)
                                return [2 /*return*/, { error: 'Unauthorized' }];
                            messageId = payload.messageId, roomId = payload.roomId;
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, this.readReceiptService.markAsRead(messageId, roomId, user.id)];
                        case 2:
                            _a.sent();
                            // Broadcast to room
                            client.to(roomId).emit('messageRead', {
                                messageId: messageId,
                                userId: user.id,
                                readAt: new Date().toISOString(),
                            });
                            return [2 /*return*/, { success: true }];
                        case 3:
                            error_4 = _a.sent();
                            this.logger.error("Error marking message as read: ".concat(error_4.message));
                            return [2 /*return*/, { error: error_4.message }];
                        case 4: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Mark all messages in room as read
         */
        ChatGateway_1.prototype.handleMarkAllRead = function (client, payload) {
            return __awaiter(this, void 0, void 0, function () {
                var user, roomId, count, error_5;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            user = client.data.user;
                            if (!user)
                                return [2 /*return*/, { error: 'Unauthorized' }];
                            roomId = payload.roomId;
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, this.readReceiptService.markAllAsRead(roomId, user.id)];
                        case 2:
                            count = _a.sent();
                            // Broadcast to room
                            client.to(roomId).emit('allMessagesRead', {
                                userId: user.id,
                                roomId: roomId,
                                count: count,
                            });
                            return [2 /*return*/, { success: true, count: count }];
                        case 3:
                            error_5 = _a.sent();
                            this.logger.error("Error marking all as read: ".concat(error_5.message));
                            return [2 /*return*/, { error: error_5.message }];
                        case 4: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Broadcast user online/offline status
         */
        ChatGateway_1.prototype.broadcastUserStatus = function (userId, status) {
            // Broadcast to all connected clients
            this.server.emit('userStatus', {
                userId: userId,
                status: status,
                timestamp: new Date().toISOString(),
            });
        };
        /**
         * Send a notification to all sockets of a specific user
         */
        ChatGateway_1.prototype.sendToUser = function (userId, event, data) {
            var userSocketSet = this.userSockets.get(userId);
            if (userSocketSet) {
                for (var _i = 0, userSocketSet_1 = userSocketSet; _i < userSocketSet_1.length; _i++) {
                    var socketId = userSocketSet_1[_i];
                    this.server.to(socketId).emit(event, data);
                }
            }
        };
        /**
         * Send a notification to all members of a room
         */
        ChatGateway_1.prototype.sendToRoom = function (roomId, event, data) {
            this.server.to(roomId).emit(event, data);
        };
        /**
         * Get online users in a room
         */
        ChatGateway_1.prototype.getOnlineUsersInRoom = function (roomId) {
            var _a, _b;
            var socketSet = this.roomSockets.get(roomId);
            if (!socketSet)
                return [];
            var userIds = new Set();
            for (var _i = 0, socketSet_1 = socketSet; _i < socketSet_1.length; _i++) {
                var socketId = socketSet_1[_i];
                var socket = this.server.sockets.sockets.get(socketId);
                if ((_b = (_a = socket === null || socket === void 0 ? void 0 : socket.data) === null || _a === void 0 ? void 0 : _a.user) === null || _b === void 0 ? void 0 : _b.id) {
                    userIds.add(socket.data.user.id);
                }
            }
            return Array.from(userIds);
        };
        /**
         * Check if a user is online
         */
        ChatGateway_1.prototype.isUserOnline = function (userId) {
            var socketSet = this.userSockets.get(userId);
            return socketSet !== undefined && socketSet.size > 0;
        };
        return ChatGateway_1;
    }());
    __setFunctionName(_classThis, "ChatGateway");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _server_decorators = [(0, websockets_1.WebSocketServer)()];
        _handleJoinRoom_decorators = [(0, websockets_1.SubscribeMessage)('joinRoom')];
        _handleLeaveRoom_decorators = [(0, websockets_1.SubscribeMessage)('leaveRoom')];
        _handleMessage_decorators = [(0, websockets_1.SubscribeMessage)('message'), (0, common_1.UseInterceptors)(chat_room_interceptor_1.ChatRoomInterceptor)];
        _handleTyping_decorators = [(0, websockets_1.SubscribeMessage)('typing')];
        _handleReaction_decorators = [(0, websockets_1.SubscribeMessage)('reaction')];
        _handleMessageRead_decorators = [(0, websockets_1.SubscribeMessage)('messageRead')];
        _handleMarkAllRead_decorators = [(0, websockets_1.SubscribeMessage)('markAllRead')];
        __esDecorate(_classThis, null, _handleJoinRoom_decorators, { kind: "method", name: "handleJoinRoom", static: false, private: false, access: { has: function (obj) { return "handleJoinRoom" in obj; }, get: function (obj) { return obj.handleJoinRoom; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _handleLeaveRoom_decorators, { kind: "method", name: "handleLeaveRoom", static: false, private: false, access: { has: function (obj) { return "handleLeaveRoom" in obj; }, get: function (obj) { return obj.handleLeaveRoom; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _handleMessage_decorators, { kind: "method", name: "handleMessage", static: false, private: false, access: { has: function (obj) { return "handleMessage" in obj; }, get: function (obj) { return obj.handleMessage; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _handleTyping_decorators, { kind: "method", name: "handleTyping", static: false, private: false, access: { has: function (obj) { return "handleTyping" in obj; }, get: function (obj) { return obj.handleTyping; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _handleReaction_decorators, { kind: "method", name: "handleReaction", static: false, private: false, access: { has: function (obj) { return "handleReaction" in obj; }, get: function (obj) { return obj.handleReaction; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _handleMessageRead_decorators, { kind: "method", name: "handleMessageRead", static: false, private: false, access: { has: function (obj) { return "handleMessageRead" in obj; }, get: function (obj) { return obj.handleMessageRead; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _handleMarkAllRead_decorators, { kind: "method", name: "handleMarkAllRead", static: false, private: false, access: { has: function (obj) { return "handleMarkAllRead" in obj; }, get: function (obj) { return obj.handleMarkAllRead; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, null, _server_decorators, { kind: "field", name: "server", static: false, private: false, access: { has: function (obj) { return "server" in obj; }, get: function (obj) { return obj.server; }, set: function (obj, value) { obj.server = value; } }, metadata: _metadata }, _server_initializers, _server_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ChatGateway = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ChatGateway = _classThis;
}();
exports.ChatGateway = ChatGateway;
