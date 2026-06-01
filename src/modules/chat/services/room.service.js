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
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomService = void 0;
var common_1 = require("@nestjs/common");
var mongodb_1 = require("mongodb");
var room_schema_1 = require("../schemas/room.schema");
var message_schema_1 = require("../schemas/message.schema");
var chat_constants_1 = require("src/common/constants/chat.constants");
var RoomService = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var RoomService = _classThis = /** @class */ (function () {
        function RoomService_1(mongodbService, databaseService) {
            this.mongodbService = mongodbService;
            this.databaseService = databaseService;
        }
        /**
         * Create a direct (1:1) room
         */
        RoomService_1.prototype.createDirectRoom = function (userId, dto) {
            return __awaiter(this, void 0, void 0, function () {
                var targetUser, roomsCollection, membersCollection, existingMemberships, _i, existingMemberships_1, membership, room, now, newRoom, roomResult, roomId, members;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!this.mongodbService.isReady()) {
                                throw new common_1.ForbiddenException(chat_constants_1.CHAT_ERROR_MESSAGES.MONGODB_NOT_CONNECTED);
                            }
                            if (userId === dto.userId) {
                                throw new common_1.BadRequestException(chat_constants_1.CHAT_ERROR_MESSAGES.CANNOT_ADD_SELF);
                            }
                            return [4 /*yield*/, this.databaseService.user.findUnique({
                                    where: { id: dto.userId },
                                })];
                        case 1:
                            targetUser = _a.sent();
                            if (!targetUser) {
                                throw new common_1.NotFoundException(chat_constants_1.CHAT_ERROR_MESSAGES.USER_NOT_FOUND);
                            }
                            roomsCollection = this.mongodbService.getCollection(room_schema_1.ROOMS_COLLECTION);
                            membersCollection = this.mongodbService.getCollection(room_schema_1.ROOM_MEMBERS_COLLECTION);
                            return [4 /*yield*/, membersCollection
                                    .aggregate([
                                    { $match: { userId: { $in: [userId, dto.userId] }, leftAt: null } },
                                    { $group: { _id: '$roomId', count: { $sum: 1 } } },
                                    { $match: { count: 2 } },
                                ])
                                    .toArray()];
                        case 2:
                            existingMemberships = _a.sent();
                            _i = 0, existingMemberships_1 = existingMemberships;
                            _a.label = 3;
                        case 3:
                            if (!(_i < existingMemberships_1.length)) return [3 /*break*/, 6];
                            membership = existingMemberships_1[_i];
                            return [4 /*yield*/, roomsCollection.findOne({
                                    _id: new mongodb_1.ObjectId(membership._id),
                                    type: 'DIRECT',
                                })];
                        case 4:
                            room = _a.sent();
                            if (room) {
                                // Return existing room
                                return [2 /*return*/, this.getRoomWithMembers(room._id.toHexString())];
                            }
                            _a.label = 5;
                        case 5:
                            _i++;
                            return [3 /*break*/, 3];
                        case 6:
                            now = new Date();
                            newRoom = {
                                type: 'DIRECT',
                                createdById: userId,
                                createdAt: now,
                                updatedAt: now,
                            };
                            return [4 /*yield*/, roomsCollection.insertOne(newRoom)];
                        case 7:
                            roomResult = _a.sent();
                            roomId = roomResult.insertedId.toHexString();
                            members = [
                                {
                                    roomId: roomId,
                                    userId: userId,
                                    role: 'MEMBER',
                                    isMuted: false,
                                    isArchived: false,
                                    joinedAt: now,
                                    createdAt: now,
                                    updatedAt: now,
                                },
                                {
                                    roomId: roomId,
                                    userId: dto.userId,
                                    role: 'MEMBER',
                                    isMuted: false,
                                    isArchived: false,
                                    joinedAt: now,
                                    createdAt: now,
                                    updatedAt: now,
                                },
                            ];
                            return [4 /*yield*/, membersCollection.insertMany(members)];
                        case 8:
                            _a.sent();
                            return [2 /*return*/, this.getRoomWithMembers(roomId)];
                    }
                });
            });
        };
        /**
         * Create a group room
         */
        RoomService_1.prototype.createGroupRoom = function (userId, dto) {
            return __awaiter(this, void 0, void 0, function () {
                var memberIds, existingUsers, roomsCollection, membersCollection, now, newRoom, roomResult, roomId, members, _i, memberIds_1, memberId;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!this.mongodbService.isReady()) {
                                throw new common_1.ForbiddenException(chat_constants_1.CHAT_ERROR_MESSAGES.MONGODB_NOT_CONNECTED);
                            }
                            memberIds = dto.memberIds.filter(function (id) { return id !== userId; });
                            // Check member limit
                            if (memberIds.length + 1 > chat_constants_1.CHAT_CONSTANTS.ROOM.MAX_GROUP_MEMBERS) {
                                throw new common_1.BadRequestException(chat_constants_1.CHAT_ERROR_MESSAGES.ROOM_MEMBER_LIMIT_REACHED);
                            }
                            return [4 /*yield*/, this.databaseService.user.findMany({
                                    where: { id: { in: memberIds } },
                                    select: { id: true },
                                })];
                        case 1:
                            existingUsers = _a.sent();
                            if (existingUsers.length !== memberIds.length) {
                                throw new common_1.NotFoundException(chat_constants_1.CHAT_ERROR_MESSAGES.USER_NOT_FOUND);
                            }
                            roomsCollection = this.mongodbService.getCollection(room_schema_1.ROOMS_COLLECTION);
                            membersCollection = this.mongodbService.getCollection(room_schema_1.ROOM_MEMBERS_COLLECTION);
                            now = new Date();
                            newRoom = {
                                type: 'GROUP',
                                name: dto.name,
                                description: dto.description,
                                imageUrl: dto.imageUrl,
                                createdById: userId,
                                createdAt: now,
                                updatedAt: now,
                            };
                            return [4 /*yield*/, roomsCollection.insertOne(newRoom)];
                        case 2:
                            roomResult = _a.sent();
                            roomId = roomResult.insertedId.toHexString();
                            members = [
                                {
                                    roomId: roomId,
                                    userId: userId,
                                    role: 'ADMIN',
                                    isMuted: false,
                                    isArchived: false,
                                    joinedAt: now,
                                    createdAt: now,
                                    updatedAt: now,
                                },
                            ];
                            // Add other members
                            for (_i = 0, memberIds_1 = memberIds; _i < memberIds_1.length; _i++) {
                                memberId = memberIds_1[_i];
                                members.push({
                                    roomId: roomId,
                                    userId: memberId,
                                    role: 'MEMBER',
                                    isMuted: false,
                                    isArchived: false,
                                    joinedAt: now,
                                    createdAt: now,
                                    updatedAt: now,
                                });
                            }
                            return [4 /*yield*/, membersCollection.insertMany(members)];
                        case 3:
                            _a.sent();
                            return [2 /*return*/, this.getRoomWithMembers(roomId)];
                    }
                });
            });
        };
        /**
         * Create a room (generic)
         */
        RoomService_1.prototype.createRoom = function (userId, dto) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    if (dto.type === 'DIRECT') {
                        if (dto.memberIds.length !== 1) {
                            throw new common_1.BadRequestException('Direct rooms require exactly one other member');
                        }
                        return [2 /*return*/, this.createDirectRoom(userId, { userId: dto.memberIds[0] })];
                    }
                    return [2 /*return*/, this.createGroupRoom(userId, {
                            name: dto.name,
                            description: dto.description,
                            imageUrl: dto.imageUrl,
                            memberIds: dto.memberIds,
                        })];
                });
            });
        };
        /**
         * Get room with members info
         */
        RoomService_1.prototype.getRoomWithMembers = function (roomId) {
            return __awaiter(this, void 0, void 0, function () {
                var roomsCollection, membersCollection, room, members, userIds, users, userMap, membersWithUsers;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!this.mongodbService.isReady()) {
                                throw new common_1.ForbiddenException(chat_constants_1.CHAT_ERROR_MESSAGES.MONGODB_NOT_CONNECTED);
                            }
                            roomsCollection = this.mongodbService.getCollection(room_schema_1.ROOMS_COLLECTION);
                            membersCollection = this.mongodbService.getCollection(room_schema_1.ROOM_MEMBERS_COLLECTION);
                            return [4 /*yield*/, roomsCollection.findOne({ _id: new mongodb_1.ObjectId(roomId) })];
                        case 1:
                            room = _a.sent();
                            if (!room) {
                                throw new common_1.NotFoundException(chat_constants_1.CHAT_ERROR_MESSAGES.ROOM_NOT_FOUND);
                            }
                            return [4 /*yield*/, membersCollection
                                    .find({ roomId: roomId, leftAt: null })
                                    .toArray()];
                        case 2:
                            members = _a.sent();
                            userIds = members.map(function (m) { return m.userId; });
                            return [4 /*yield*/, this.databaseService.user.findMany({
                                    where: { id: { in: userIds } },
                                    select: { id: true, name: true, email: true, image: true },
                                })];
                        case 3:
                            users = _a.sent();
                            userMap = new Map(users.map(function (u) { return [u.id, u]; }));
                            membersWithUsers = members.map(function (m) { return (__assign(__assign({}, m), { user: userMap.get(m.userId) })); });
                            return [2 /*return*/, __assign(__assign({}, room), { members: membersWithUsers, memberCount: members.length })];
                    }
                });
            });
        };
        /**
         * Get user's rooms with pagination
         */
        RoomService_1.prototype.getUserRooms = function (userId, pagination) {
            return __awaiter(this, void 0, void 0, function () {
                var roomsCollection, membersCollection, limit, skip, memberQuery, memberships, roomIds, rooms, hasMore, roomsWithMembers;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!this.mongodbService.isReady()) {
                                throw new common_1.ForbiddenException(chat_constants_1.CHAT_ERROR_MESSAGES.MONGODB_NOT_CONNECTED);
                            }
                            roomsCollection = this.mongodbService.getCollection(room_schema_1.ROOMS_COLLECTION);
                            membersCollection = this.mongodbService.getCollection(room_schema_1.ROOM_MEMBERS_COLLECTION);
                            limit = Math.min(pagination.limit || chat_constants_1.CHAT_CONSTANTS.PAGINATION.DEFAULT_ROOM_LIMIT, chat_constants_1.CHAT_CONSTANTS.PAGINATION.MAX_ROOM_LIMIT);
                            skip = ((pagination.page || 1) - 1) * limit;
                            memberQuery = { userId: userId, leftAt: null };
                            if (!pagination.includeArchived) {
                                memberQuery.isArchived = false;
                            }
                            return [4 /*yield*/, membersCollection.find(memberQuery).toArray()];
                        case 1:
                            memberships = _a.sent();
                            roomIds = memberships.map(function (m) { return new mongodb_1.ObjectId(m.roomId); });
                            if (roomIds.length === 0) {
                                return [2 /*return*/, { data: [], pagination: { hasMore: false, total: 0 } }];
                            }
                            return [4 /*yield*/, roomsCollection
                                    .find({ _id: { $in: roomIds } })
                                    .sort({ lastMessageAt: -1, createdAt: -1 })
                                    .skip(skip)
                                    .limit(limit + 1)
                                    .toArray()];
                        case 2:
                            rooms = _a.sent();
                            hasMore = rooms.length > limit;
                            if (hasMore) {
                                rooms.pop();
                            }
                            return [4 /*yield*/, Promise.all(rooms.map(function (room) { return __awaiter(_this, void 0, void 0, function () {
                                    var membership, members, unreadCount, messagesCollection, lastReadMessage, membersWithUsers, userIds, users, userMap_1;
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0:
                                                membership = memberships.find(function (m) { return m.roomId === room._id.toHexString(); });
                                                return [4 /*yield*/, membersCollection
                                                        .find({ roomId: room._id.toHexString(), leftAt: null })
                                                        .toArray()];
                                            case 1:
                                                members = _a.sent();
                                                unreadCount = 0;
                                                if (!(membership === null || membership === void 0 ? void 0 : membership.lastReadMessageId)) return [3 /*break*/, 4];
                                                messagesCollection = this.mongodbService.getCollection(message_schema_1.MESSAGES_COLLECTION);
                                                return [4 /*yield*/, messagesCollection.findOne({
                                                        _id: new mongodb_1.ObjectId(membership.lastReadMessageId),
                                                    })];
                                            case 2:
                                                lastReadMessage = _a.sent();
                                                if (!lastReadMessage) return [3 /*break*/, 4];
                                                return [4 /*yield*/, messagesCollection.countDocuments({
                                                        roomId: room._id.toHexString(),
                                                        createdAt: { $gt: lastReadMessage.createdAt },
                                                        deletedForEveryone: false,
                                                        deletedForUsers: { $ne: userId },
                                                    })];
                                            case 3:
                                                unreadCount = _a.sent();
                                                _a.label = 4;
                                            case 4:
                                                membersWithUsers = [];
                                                if (!(room.type === 'DIRECT')) return [3 /*break*/, 6];
                                                userIds = members.map(function (m) { return m.userId; });
                                                return [4 /*yield*/, this.databaseService.user.findMany({
                                                        where: { id: { in: userIds } },
                                                        select: { id: true, name: true, email: true, image: true },
                                                    })];
                                            case 5:
                                                users = _a.sent();
                                                userMap_1 = new Map(users.map(function (u) { return [u.id, u]; }));
                                                membersWithUsers = members.map(function (m) { return (__assign(__assign({}, m), { user: userMap_1.get(m.userId) })); });
                                                _a.label = 6;
                                            case 6: return [2 /*return*/, __assign(__assign({}, room), { members: membersWithUsers, memberCount: members.length, unreadCount: unreadCount })];
                                        }
                                    });
                                }); }))];
                        case 3:
                            roomsWithMembers = _a.sent();
                            return [2 /*return*/, {
                                    data: roomsWithMembers,
                                    pagination: {
                                        hasMore: hasMore,
                                        total: memberships.length,
                                    },
                                }];
                    }
                });
            });
        };
        /**
         * Update room details (group only)
         */
        RoomService_1.prototype.updateRoom = function (roomId, userId, dto) {
            return __awaiter(this, void 0, void 0, function () {
                var roomsCollection, room, now, updateData;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!this.mongodbService.isReady()) {
                                throw new common_1.ForbiddenException(chat_constants_1.CHAT_ERROR_MESSAGES.MONGODB_NOT_CONNECTED);
                            }
                            roomsCollection = this.mongodbService.getCollection(room_schema_1.ROOMS_COLLECTION);
                            return [4 /*yield*/, roomsCollection.findOne({ _id: new mongodb_1.ObjectId(roomId) })];
                        case 1:
                            room = _a.sent();
                            if (!room) {
                                throw new common_1.NotFoundException(chat_constants_1.CHAT_ERROR_MESSAGES.ROOM_NOT_FOUND);
                            }
                            if (room.type === 'DIRECT') {
                                throw new common_1.ForbiddenException(chat_constants_1.CHAT_ERROR_MESSAGES.ROOM_UPDATE_NOT_ALLOWED);
                            }
                            now = new Date();
                            updateData = { updatedAt: now };
                            if (dto.name !== undefined)
                                updateData.name = dto.name;
                            if (dto.description !== undefined)
                                updateData.description = dto.description;
                            if (dto.imageUrl !== undefined)
                                updateData.imageUrl = dto.imageUrl;
                            return [4 /*yield*/, roomsCollection.updateOne({ _id: new mongodb_1.ObjectId(roomId) }, { $set: updateData })];
                        case 2:
                            _a.sent();
                            return [2 /*return*/, __assign(__assign({}, room), updateData)];
                    }
                });
            });
        };
        /**
         * Add members to a room
         */
        RoomService_1.prototype.addMembers = function (roomId, userId, dto) {
            return __awaiter(this, void 0, void 0, function () {
                var roomsCollection, membersCollection, room, currentMemberCount, existingUsers, now, newMembers, _i, _a, userIdToAdd, existingMember, newMember, userMap;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            if (!this.mongodbService.isReady()) {
                                throw new common_1.ForbiddenException(chat_constants_1.CHAT_ERROR_MESSAGES.MONGODB_NOT_CONNECTED);
                            }
                            roomsCollection = this.mongodbService.getCollection(room_schema_1.ROOMS_COLLECTION);
                            membersCollection = this.mongodbService.getCollection(room_schema_1.ROOM_MEMBERS_COLLECTION);
                            return [4 /*yield*/, roomsCollection.findOne({ _id: new mongodb_1.ObjectId(roomId) })];
                        case 1:
                            room = _b.sent();
                            if (!room) {
                                throw new common_1.NotFoundException(chat_constants_1.CHAT_ERROR_MESSAGES.ROOM_NOT_FOUND);
                            }
                            if (room.type === 'DIRECT') {
                                throw new common_1.ForbiddenException('Cannot add members to a direct room');
                            }
                            return [4 /*yield*/, membersCollection.countDocuments({
                                    roomId: roomId,
                                    leftAt: null,
                                })];
                        case 2:
                            currentMemberCount = _b.sent();
                            if (currentMemberCount + dto.userIds.length >
                                chat_constants_1.CHAT_CONSTANTS.ROOM.MAX_GROUP_MEMBERS) {
                                throw new common_1.BadRequestException(chat_constants_1.CHAT_ERROR_MESSAGES.ROOM_MEMBER_LIMIT_REACHED);
                            }
                            return [4 /*yield*/, this.databaseService.user.findMany({
                                    where: { id: { in: dto.userIds } },
                                    select: { id: true, name: true, email: true, image: true },
                                })];
                        case 3:
                            existingUsers = _b.sent();
                            if (existingUsers.length !== dto.userIds.length) {
                                throw new common_1.NotFoundException(chat_constants_1.CHAT_ERROR_MESSAGES.USER_NOT_FOUND);
                            }
                            now = new Date();
                            newMembers = [];
                            _i = 0, _a = dto.userIds;
                            _b.label = 4;
                        case 4:
                            if (!(_i < _a.length)) return [3 /*break*/, 10];
                            userIdToAdd = _a[_i];
                            return [4 /*yield*/, membersCollection.findOne({
                                    roomId: roomId,
                                    userId: userIdToAdd,
                                })];
                        case 5:
                            existingMember = _b.sent();
                            if (existingMember && !existingMember.leftAt) {
                                return [3 /*break*/, 9]; // Skip already active members
                            }
                            if (!existingMember) return [3 /*break*/, 7];
                            // Rejoin - update existing record
                            return [4 /*yield*/, membersCollection.updateOne({ _id: existingMember._id }, {
                                    $set: {
                                        leftAt: null,
                                        role: 'MEMBER',
                                        joinedAt: now,
                                        updatedAt: now,
                                    },
                                })];
                        case 6:
                            // Rejoin - update existing record
                            _b.sent();
                            newMembers.push(__assign(__assign({}, existingMember), { leftAt: undefined, role: 'MEMBER', joinedAt: now }));
                            return [3 /*break*/, 9];
                        case 7:
                            newMember = {
                                roomId: roomId,
                                userId: userIdToAdd,
                                role: 'MEMBER',
                                isMuted: false,
                                isArchived: false,
                                joinedAt: now,
                                createdAt: now,
                                updatedAt: now,
                            };
                            return [4 /*yield*/, membersCollection.insertOne(newMember)];
                        case 8:
                            _b.sent();
                            newMembers.push(newMember);
                            _b.label = 9;
                        case 9:
                            _i++;
                            return [3 /*break*/, 4];
                        case 10:
                            userMap = new Map(existingUsers.map(function (u) { return [u.id, u]; }));
                            return [2 /*return*/, newMembers.map(function (m) { return (__assign(__assign({}, m), { user: userMap.get(m.userId) })); })];
                    }
                });
            });
        };
        /**
         * Remove a member from a room
         */
        RoomService_1.prototype.removeMember = function (roomId, userId, memberUserId) {
            return __awaiter(this, void 0, void 0, function () {
                var roomsCollection, membersCollection, room, membership, adminCount;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!this.mongodbService.isReady()) {
                                throw new common_1.ForbiddenException(chat_constants_1.CHAT_ERROR_MESSAGES.MONGODB_NOT_CONNECTED);
                            }
                            roomsCollection = this.mongodbService.getCollection(room_schema_1.ROOMS_COLLECTION);
                            membersCollection = this.mongodbService.getCollection(room_schema_1.ROOM_MEMBERS_COLLECTION);
                            return [4 /*yield*/, roomsCollection.findOne({ _id: new mongodb_1.ObjectId(roomId) })];
                        case 1:
                            room = _a.sent();
                            if (!room) {
                                throw new common_1.NotFoundException(chat_constants_1.CHAT_ERROR_MESSAGES.ROOM_NOT_FOUND);
                            }
                            if (room.type === 'DIRECT') {
                                throw new common_1.ForbiddenException(chat_constants_1.CHAT_ERROR_MESSAGES.CANNOT_LEAVE_DIRECT_ROOM);
                            }
                            if (userId === memberUserId) {
                                throw new common_1.BadRequestException(chat_constants_1.CHAT_ERROR_MESSAGES.CANNOT_REMOVE_SELF);
                            }
                            return [4 /*yield*/, membersCollection.findOne({
                                    roomId: roomId,
                                    userId: memberUserId,
                                    leftAt: null,
                                })];
                        case 2:
                            membership = _a.sent();
                            if (!membership) {
                                throw new common_1.NotFoundException(chat_constants_1.CHAT_ERROR_MESSAGES.NOT_ROOM_MEMBER);
                            }
                            if (!(membership.role === 'ADMIN')) return [3 /*break*/, 4];
                            return [4 /*yield*/, membersCollection.countDocuments({
                                    roomId: roomId,
                                    role: 'ADMIN',
                                    leftAt: null,
                                })];
                        case 3:
                            adminCount = _a.sent();
                            if (adminCount <= 1) {
                                throw new common_1.ForbiddenException(chat_constants_1.CHAT_ERROR_MESSAGES.CANNOT_REMOVE_LAST_ADMIN);
                            }
                            _a.label = 4;
                        case 4: return [4 /*yield*/, membersCollection.updateOne({ _id: membership._id }, { $set: { leftAt: new Date(), updatedAt: new Date() } })];
                        case 5:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Leave a room
         */
        RoomService_1.prototype.leaveRoom = function (roomId, userId) {
            return __awaiter(this, void 0, void 0, function () {
                var roomsCollection, membersCollection, room, membership, adminCount, nextMember;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!this.mongodbService.isReady()) {
                                throw new common_1.ForbiddenException(chat_constants_1.CHAT_ERROR_MESSAGES.MONGODB_NOT_CONNECTED);
                            }
                            roomsCollection = this.mongodbService.getCollection(room_schema_1.ROOMS_COLLECTION);
                            membersCollection = this.mongodbService.getCollection(room_schema_1.ROOM_MEMBERS_COLLECTION);
                            return [4 /*yield*/, roomsCollection.findOne({ _id: new mongodb_1.ObjectId(roomId) })];
                        case 1:
                            room = _a.sent();
                            if (!room) {
                                throw new common_1.NotFoundException(chat_constants_1.CHAT_ERROR_MESSAGES.ROOM_NOT_FOUND);
                            }
                            if (room.type === 'DIRECT') {
                                throw new common_1.ForbiddenException(chat_constants_1.CHAT_ERROR_MESSAGES.CANNOT_LEAVE_DIRECT_ROOM);
                            }
                            return [4 /*yield*/, membersCollection.findOne({
                                    roomId: roomId,
                                    userId: userId,
                                    leftAt: null,
                                })];
                        case 2:
                            membership = _a.sent();
                            if (!membership) {
                                throw new common_1.NotFoundException(chat_constants_1.CHAT_ERROR_MESSAGES.NOT_ROOM_MEMBER);
                            }
                            if (!(membership.role === 'ADMIN')) return [3 /*break*/, 6];
                            return [4 /*yield*/, membersCollection.countDocuments({
                                    roomId: roomId,
                                    role: 'ADMIN',
                                    leftAt: null,
                                })];
                        case 3:
                            adminCount = _a.sent();
                            if (!(adminCount <= 1)) return [3 /*break*/, 6];
                            return [4 /*yield*/, membersCollection.findOne({
                                    roomId: roomId,
                                    userId: { $ne: userId },
                                    leftAt: null,
                                })];
                        case 4:
                            nextMember = _a.sent();
                            if (!nextMember) return [3 /*break*/, 6];
                            return [4 /*yield*/, membersCollection.updateOne({ _id: nextMember._id }, { $set: { role: 'ADMIN', updatedAt: new Date() } })];
                        case 5:
                            _a.sent();
                            _a.label = 6;
                        case 6: return [4 /*yield*/, membersCollection.updateOne({ _id: membership._id }, { $set: { leftAt: new Date(), updatedAt: new Date() } })];
                        case 7:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Update member role
         */
        RoomService_1.prototype.updateMemberRole = function (roomId, userId, memberUserId, dto) {
            return __awaiter(this, void 0, void 0, function () {
                var membersCollection, membership, adminCount;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!this.mongodbService.isReady()) {
                                throw new common_1.ForbiddenException(chat_constants_1.CHAT_ERROR_MESSAGES.MONGODB_NOT_CONNECTED);
                            }
                            if (userId === memberUserId) {
                                throw new common_1.BadRequestException(chat_constants_1.CHAT_ERROR_MESSAGES.CANNOT_CHANGE_OWN_ROLE);
                            }
                            membersCollection = this.mongodbService.getCollection(room_schema_1.ROOM_MEMBERS_COLLECTION);
                            return [4 /*yield*/, membersCollection.findOne({
                                    roomId: roomId,
                                    userId: memberUserId,
                                    leftAt: null,
                                })];
                        case 1:
                            membership = _a.sent();
                            if (!membership) {
                                throw new common_1.NotFoundException(chat_constants_1.CHAT_ERROR_MESSAGES.NOT_ROOM_MEMBER);
                            }
                            if (!(membership.role === 'ADMIN' && dto.role !== 'ADMIN')) return [3 /*break*/, 3];
                            return [4 /*yield*/, membersCollection.countDocuments({
                                    roomId: roomId,
                                    role: 'ADMIN',
                                    leftAt: null,
                                })];
                        case 2:
                            adminCount = _a.sent();
                            if (adminCount <= 1) {
                                throw new common_1.ForbiddenException(chat_constants_1.CHAT_ERROR_MESSAGES.CANNOT_REMOVE_LAST_ADMIN);
                            }
                            _a.label = 3;
                        case 3: return [4 /*yield*/, membersCollection.updateOne({ _id: membership._id }, { $set: { role: dto.role, updatedAt: new Date() } })];
                        case 4:
                            _a.sent();
                            return [2 /*return*/, __assign(__assign({}, membership), { role: dto.role })];
                    }
                });
            });
        };
        /**
         * Update room member settings (mute, archive)
         */
        RoomService_1.prototype.updateMemberSettings = function (roomId, userId, dto) {
            return __awaiter(this, void 0, void 0, function () {
                var membersCollection, membership, updateData;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!this.mongodbService.isReady()) {
                                throw new common_1.ForbiddenException(chat_constants_1.CHAT_ERROR_MESSAGES.MONGODB_NOT_CONNECTED);
                            }
                            membersCollection = this.mongodbService.getCollection(room_schema_1.ROOM_MEMBERS_COLLECTION);
                            return [4 /*yield*/, membersCollection.findOne({
                                    roomId: roomId,
                                    userId: userId,
                                    leftAt: null,
                                })];
                        case 1:
                            membership = _a.sent();
                            if (!membership) {
                                throw new common_1.NotFoundException(chat_constants_1.CHAT_ERROR_MESSAGES.NOT_ROOM_MEMBER);
                            }
                            updateData = { updatedAt: new Date() };
                            if (dto.isMuted !== undefined)
                                updateData.isMuted = dto.isMuted;
                            if (dto.isArchived !== undefined)
                                updateData.isArchived = dto.isArchived;
                            return [4 /*yield*/, membersCollection.updateOne({ _id: membership._id }, { $set: updateData })];
                        case 2:
                            _a.sent();
                            return [2 /*return*/, __assign(__assign({}, membership), updateData)];
                    }
                });
            });
        };
        /**
         * Pin a message in a room
         */
        RoomService_1.prototype.pinMessage = function (roomId, messageId, userId) {
            return __awaiter(this, void 0, void 0, function () {
                var messagesCollection, pinnedCollection, message, existing, pinnedMessage;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!this.mongodbService.isReady()) {
                                throw new common_1.ForbiddenException(chat_constants_1.CHAT_ERROR_MESSAGES.MONGODB_NOT_CONNECTED);
                            }
                            messagesCollection = this.mongodbService.getCollection(message_schema_1.MESSAGES_COLLECTION);
                            pinnedCollection = this.mongodbService.getCollection(room_schema_1.PINNED_MESSAGES_COLLECTION);
                            return [4 /*yield*/, messagesCollection.findOne({
                                    _id: new mongodb_1.ObjectId(messageId),
                                    roomId: roomId,
                                    deletedForEveryone: false,
                                })];
                        case 1:
                            message = _a.sent();
                            if (!message) {
                                throw new common_1.NotFoundException(chat_constants_1.CHAT_ERROR_MESSAGES.MESSAGE_NOT_FOUND);
                            }
                            return [4 /*yield*/, pinnedCollection.findOne({ roomId: roomId, messageId: messageId })];
                        case 2:
                            existing = _a.sent();
                            if (existing) {
                                throw new common_1.ConflictException(chat_constants_1.CHAT_ERROR_MESSAGES.MESSAGE_ALREADY_PINNED);
                            }
                            pinnedMessage = {
                                roomId: roomId,
                                messageId: messageId,
                                pinnedById: userId,
                                pinnedAt: new Date(),
                            };
                            return [4 /*yield*/, pinnedCollection.insertOne(pinnedMessage)];
                        case 3:
                            _a.sent();
                            return [2 /*return*/, pinnedMessage];
                    }
                });
            });
        };
        /**
         * Unpin a message
         */
        RoomService_1.prototype.unpinMessage = function (roomId, messageId) {
            return __awaiter(this, void 0, void 0, function () {
                var pinnedCollection, result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!this.mongodbService.isReady()) {
                                throw new common_1.ForbiddenException(chat_constants_1.CHAT_ERROR_MESSAGES.MONGODB_NOT_CONNECTED);
                            }
                            pinnedCollection = this.mongodbService.getCollection(room_schema_1.PINNED_MESSAGES_COLLECTION);
                            return [4 /*yield*/, pinnedCollection.deleteOne({ roomId: roomId, messageId: messageId })];
                        case 1:
                            result = _a.sent();
                            if (result.deletedCount === 0) {
                                throw new common_1.NotFoundException(chat_constants_1.CHAT_ERROR_MESSAGES.MESSAGE_NOT_PINNED);
                            }
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Get pinned messages for a room
         */
        RoomService_1.prototype.getPinnedMessages = function (roomId) {
            return __awaiter(this, void 0, void 0, function () {
                var pinnedCollection;
                return __generator(this, function (_a) {
                    if (!this.mongodbService.isReady()) {
                        throw new common_1.ForbiddenException(chat_constants_1.CHAT_ERROR_MESSAGES.MONGODB_NOT_CONNECTED);
                    }
                    pinnedCollection = this.mongodbService.getCollection(room_schema_1.PINNED_MESSAGES_COLLECTION);
                    return [2 /*return*/, pinnedCollection.find({ roomId: roomId }).sort({ pinnedAt: -1 }).toArray()];
                });
            });
        };
        return RoomService_1;
    }());
    __setFunctionName(_classThis, "RoomService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        RoomService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return RoomService = _classThis;
}();
exports.RoomService = RoomService;
