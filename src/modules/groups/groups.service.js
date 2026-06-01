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
exports.GroupsService = void 0;
var common_1 = require("@nestjs/common");
var generic_http_exception_1 = require("../../common/application/exceptions/generic-http-exception");
var error_messages_constant_1 = require("../../common/constants/error-messages.constant");
var client_1 = require("@prisma/client");
var GroupsService = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var GroupsService = _classThis = /** @class */ (function () {
        function GroupsService_1(prisma, notificationService) {
            this.prisma = prisma;
            this.notificationService = notificationService;
        }
        GroupsService_1.prototype.createGroup = function (userId, dto) {
            return __awaiter(this, void 0, void 0, function () {
                var group, _a;
                var _b, _c;
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0:
                            _d.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, this.prisma.group.create({
                                    data: {
                                        name: dto.name,
                                        description: dto.description,
                                        coverPhoto: dto.coverPhoto,
                                        type: (_b = dto.type) !== null && _b !== void 0 ? _b : client_1.GroupType.PUBLIC,
                                        restrictPosting: (_c = dto.restrictPosting) !== null && _c !== void 0 ? _c : false,
                                        createdById: userId,
                                        membersCount: 1,
                                        members: {
                                            create: {
                                                userId: userId,
                                                role: client_1.GroupMemberRole.ADMIN,
                                                acceptedRulesAt: new Date(),
                                            },
                                        },
                                    },
                                })];
                        case 1:
                            group = _d.sent();
                            return [2 /*return*/, group];
                        case 2:
                            _a = _d.sent();
                            throw generic_http_exception_1.GenericHttpException.createLocalized(error_messages_constant_1.ERROR_MESSAGES.GROUP_CREATION_FAILED, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        GroupsService_1.prototype.getGroupById = function (groupId, requesterId) {
            return __awaiter(this, void 0, void 0, function () {
                var group, membership;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.group.findFirst({
                                where: { id: groupId, deletedAt: null },
                                include: {
                                    createdBy: { select: { id: true, name: true, image: true } },
                                    rules: { orderBy: { order: 'asc' } },
                                },
                            })];
                        case 1:
                            group = _a.sent();
                            if (!group) {
                                throw generic_http_exception_1.GenericHttpException.createLocalized(error_messages_constant_1.ERROR_MESSAGES.GROUP_NOT_FOUND, common_1.HttpStatus.NOT_FOUND);
                            }
                            return [4 /*yield*/, this.prisma.groupMember.findUnique({
                                    where: { groupId_userId: { groupId: groupId, userId: requesterId } },
                                })];
                        case 2:
                            membership = _a.sent();
                            if (group.type === client_1.GroupType.SECRET && !membership) {
                                throw generic_http_exception_1.GenericHttpException.createLocalized(error_messages_constant_1.ERROR_MESSAGES.GROUP_NOT_FOUND, // Mask as not found
                                common_1.HttpStatus.NOT_FOUND);
                            }
                            return [2 /*return*/, __assign(__assign({}, group), { membership: membership || null })];
                    }
                });
            });
        };
        GroupsService_1.prototype.discoverGroups = function (userId_1) {
            return __awaiter(this, arguments, void 0, function (userId, page, limit, search) {
                var skip, where, _a, groups, total;
                if (page === void 0) { page = 1; }
                if (limit === void 0) { limit = 20; }
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            skip = (page - 1) * limit;
                            where = {
                                deletedAt: null,
                                type: { in: [client_1.GroupType.PUBLIC, client_1.GroupType.PRIVATE] },
                                members: { none: { userId: userId } }, // don't show groups I'm already in
                            };
                            if (search) {
                                where.name = { contains: search, mode: 'insensitive' };
                            }
                            return [4 /*yield*/, Promise.all([
                                    this.prisma.group.findMany({
                                        where: where,
                                        orderBy: { membersCount: 'desc' },
                                        skip: skip,
                                        take: limit,
                                    }),
                                    this.prisma.group.count({ where: where }),
                                ])];
                        case 1:
                            _a = _b.sent(), groups = _a[0], total = _a[1];
                            return [2 /*return*/, {
                                    data: groups,
                                    meta: { page: page, limit: limit, total: total, totalPages: Math.ceil(total / limit) },
                                }];
                    }
                });
            });
        };
        GroupsService_1.prototype.updateGroup = function (groupId, userId, dto) {
            return __awaiter(this, void 0, void 0, function () {
                var group, _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, this.ensureAdminOrMod(groupId, userId, true)];
                        case 1:
                            _b.sent();
                            _b.label = 2;
                        case 2:
                            _b.trys.push([2, 4, , 5]);
                            return [4 /*yield*/, this.prisma.group.update({
                                    where: { id: groupId },
                                    data: dto,
                                })];
                        case 3:
                            group = _b.sent();
                            return [2 /*return*/, group];
                        case 4:
                            _a = _b.sent();
                            throw generic_http_exception_1.GenericHttpException.createLocalized(error_messages_constant_1.ERROR_MESSAGES.GROUP_UPDATE_FAILED, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
                        case 5: return [2 /*return*/];
                    }
                });
            });
        };
        GroupsService_1.prototype.deleteGroup = function (groupId, userId) {
            return __awaiter(this, void 0, void 0, function () {
                var group;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.ensureAdminOrMod(groupId, userId, true)];
                        case 1:
                            group = _a.sent();
                            if (group.createdById !== userId) {
                                throw new common_1.ForbiddenException(error_messages_constant_1.ERROR_MESSAGES.GROUP_UNAUTHORIZED);
                            }
                            return [4 /*yield*/, this.prisma.group.update({
                                    where: { id: groupId },
                                    data: { deletedAt: new Date() },
                                })];
                        case 2:
                            _a.sent();
                            return [2 /*return*/, { deleted: true }];
                    }
                });
            });
        };
        GroupsService_1.prototype.joinGroup = function (groupId, userId) {
            return __awaiter(this, void 0, void 0, function () {
                var group, existingMembership, existingReq, req_1, admins;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.group.findFirst({
                                where: { id: groupId, deletedAt: null },
                            })];
                        case 1:
                            group = _a.sent();
                            if (!group)
                                throw new common_1.NotFoundException(error_messages_constant_1.ERROR_MESSAGES.GROUP_NOT_FOUND);
                            return [4 /*yield*/, this.prisma.groupMember.findUnique({
                                    where: { groupId_userId: { groupId: groupId, userId: userId } },
                                })];
                        case 2:
                            existingMembership = _a.sent();
                            if (existingMembership) {
                                throw new common_1.BadRequestException(error_messages_constant_1.ERROR_MESSAGES.ALREADY_GROUP_MEMBER);
                            }
                            if (!(group.type === client_1.GroupType.PUBLIC)) return [3 /*break*/, 4];
                            return [4 /*yield*/, this.prisma.$transaction([
                                    this.prisma.groupMember.create({
                                        data: { groupId: groupId, userId: userId, acceptedRulesAt: new Date() },
                                    }),
                                    this.prisma.group.update({
                                        where: { id: groupId },
                                        data: { membersCount: { increment: 1 } },
                                    }),
                                ])];
                        case 3:
                            _a.sent();
                            return [2 /*return*/, { joined: true, status: 'MEMBER' }];
                        case 4: return [4 /*yield*/, this.prisma.groupJoinRequest.findUnique({
                                where: { groupId_userId: { groupId: groupId, userId: userId } },
                            })];
                        case 5:
                            existingReq = _a.sent();
                            if (existingReq) {
                                throw new common_1.BadRequestException(error_messages_constant_1.ERROR_MESSAGES.GROUP_JOIN_REQUEST_PENDING);
                            }
                            return [4 /*yield*/, this.prisma.groupJoinRequest.create({
                                    data: { groupId: groupId, userId: userId, status: client_1.JoinRequestStatus.PENDING },
                                })];
                        case 6:
                            req_1 = _a.sent();
                            return [4 /*yield*/, this.prisma.groupMember.findMany({
                                    where: {
                                        groupId: groupId,
                                        role: { in: [client_1.GroupMemberRole.ADMIN, client_1.GroupMemberRole.MODERATOR] },
                                    },
                                    select: { userId: true },
                                })];
                        case 7:
                            admins = _a.sent();
                            admins.forEach(function (admin) {
                                void _this.notificationService.createNotification(admin.userId, client_1.NotificationType.GROUP_JOIN_REQUEST, 'New Join Request', 'requested to join your group', userId, { referenceId: req_1.id, referenceType: 'GroupJoinRequest', groupId: groupId });
                            });
                            return [2 /*return*/, { joined: false, status: 'PENDING' }];
                    }
                });
            });
        };
        GroupsService_1.prototype.leaveGroup = function (groupId, userId) {
            return __awaiter(this, void 0, void 0, function () {
                var membership;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.groupMember.findUnique({
                                where: { groupId_userId: { groupId: groupId, userId: userId } },
                                include: { group: true },
                            })];
                        case 1:
                            membership = _a.sent();
                            if (!membership || membership.group.deletedAt) {
                                throw new common_1.NotFoundException(error_messages_constant_1.ERROR_MESSAGES.NOT_GROUP_MEMBER);
                            }
                            if (membership.group.createdById === userId) {
                                throw new common_1.BadRequestException(error_messages_constant_1.ERROR_MESSAGES.GROUP_CANNOT_REMOVE_OWNER);
                            }
                            return [4 /*yield*/, this.prisma.$transaction([
                                    this.prisma.groupMember.delete({
                                        where: { id: membership.id },
                                    }),
                                    this.prisma.group.update({
                                        where: { id: groupId },
                                        data: { membersCount: { decrement: 1 } },
                                    }),
                                ])];
                        case 2:
                            _a.sent();
                            return [2 /*return*/, { left: true }];
                    }
                });
            });
        };
        GroupsService_1.prototype.getMembers = function (groupId_1, userId_1) {
            return __awaiter(this, arguments, void 0, function (groupId, userId, page, limit) {
                var skip, _a, members, total;
                if (page === void 0) { page = 1; }
                if (limit === void 0) { limit = 20; }
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, this.ensureMember(groupId, userId)];
                        case 1:
                            _b.sent();
                            skip = (page - 1) * limit;
                            return [4 /*yield*/, Promise.all([
                                    this.prisma.groupMember.findMany({
                                        where: { groupId: groupId },
                                        include: { user: { select: { id: true, name: true, image: true } } },
                                        orderBy: [{ role: 'asc' }, { joinedAt: 'asc' }],
                                        skip: skip,
                                        take: limit,
                                    }),
                                    this.prisma.groupMember.count({ where: { groupId: groupId } }),
                                ])];
                        case 2:
                            _a = _b.sent(), members = _a[0], total = _a[1];
                            return [2 /*return*/, {
                                    data: members,
                                    meta: { page: page, limit: limit, total: total, totalPages: Math.ceil(total / limit) },
                                }];
                    }
                });
            });
        };
        GroupsService_1.prototype.updateMemberRole = function (groupId, adminId, targetUserId, role) {
            return __awaiter(this, void 0, void 0, function () {
                var group, membership;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.ensureAdminOrMod(groupId, adminId, true)];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, this.prisma.group.findUnique({
                                    where: { id: groupId },
                                })];
                        case 2:
                            group = _a.sent();
                            if ((group === null || group === void 0 ? void 0 : group.createdById) === targetUserId) {
                                throw new common_1.BadRequestException(error_messages_constant_1.ERROR_MESSAGES.GROUP_CANNOT_REMOVE_OWNER);
                            }
                            return [4 /*yield*/, this.prisma.groupMember.update({
                                    where: { groupId_userId: { groupId: groupId, userId: targetUserId } },
                                    data: { role: role },
                                })];
                        case 3:
                            membership = _a.sent();
                            return [2 /*return*/, membership];
                    }
                });
            });
        };
        GroupsService_1.prototype.removeMember = function (groupId, adminId, targetUserId) {
            return __awaiter(this, void 0, void 0, function () {
                var group;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.ensureAdminOrMod(groupId, adminId, false)];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, this.prisma.group.findUnique({
                                    where: { id: groupId },
                                })];
                        case 2:
                            group = _a.sent();
                            if ((group === null || group === void 0 ? void 0 : group.createdById) === targetUserId) {
                                throw new common_1.BadRequestException(error_messages_constant_1.ERROR_MESSAGES.GROUP_CANNOT_REMOVE_OWNER);
                            }
                            return [4 /*yield*/, this.prisma.$transaction([
                                    this.prisma.groupMember.delete({
                                        where: { groupId_userId: { groupId: groupId, userId: targetUserId } },
                                    }),
                                    this.prisma.group.update({
                                        where: { id: groupId },
                                        data: { membersCount: { decrement: 1 } },
                                    }),
                                ])];
                        case 3:
                            _a.sent();
                            return [2 /*return*/, { removed: true }];
                    }
                });
            });
        };
        GroupsService_1.prototype.getJoinRequests = function (groupId_1, adminId_1) {
            return __awaiter(this, arguments, void 0, function (groupId, adminId, page, limit) {
                var skip, _a, requests, total;
                if (page === void 0) { page = 1; }
                if (limit === void 0) { limit = 20; }
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, this.ensureAdminOrMod(groupId, adminId, false)];
                        case 1:
                            _b.sent();
                            skip = (page - 1) * limit;
                            return [4 /*yield*/, Promise.all([
                                    this.prisma.groupJoinRequest.findMany({
                                        where: { groupId: groupId, status: client_1.JoinRequestStatus.PENDING },
                                        include: { user: { select: { id: true, name: true, image: true } } },
                                        orderBy: { createdAt: 'desc' },
                                        skip: skip,
                                        take: limit,
                                    }),
                                    this.prisma.groupJoinRequest.count({
                                        where: { groupId: groupId, status: client_1.JoinRequestStatus.PENDING },
                                    }),
                                ])];
                        case 2:
                            _a = _b.sent(), requests = _a[0], total = _a[1];
                            return [2 /*return*/, {
                                    data: requests,
                                    meta: { page: page, limit: limit, total: total, totalPages: Math.ceil(total / limit) },
                                }];
                    }
                });
            });
        };
        GroupsService_1.prototype.processJoinRequest = function (groupId, adminId, targetUserId, approve) {
            return __awaiter(this, void 0, void 0, function () {
                var req;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.ensureAdminOrMod(groupId, adminId, false)];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, this.prisma.groupJoinRequest.findUnique({
                                    where: { groupId_userId: { groupId: groupId, userId: targetUserId } },
                                })];
                        case 2:
                            req = _a.sent();
                            if (!req || req.status !== client_1.JoinRequestStatus.PENDING) {
                                throw new common_1.NotFoundException(error_messages_constant_1.ERROR_MESSAGES.GROUP_JOIN_REQUEST_NOT_FOUND);
                            }
                            if (!approve) return [3 /*break*/, 4];
                            return [4 /*yield*/, this.prisma.$transaction([
                                    this.prisma.groupJoinRequest.update({
                                        where: { id: req.id },
                                        data: { status: client_1.JoinRequestStatus.APPROVED },
                                    }),
                                    this.prisma.groupMember.create({
                                        data: { groupId: groupId, userId: targetUserId, acceptedRulesAt: new Date() },
                                    }),
                                    this.prisma.group.update({
                                        where: { id: groupId },
                                        data: { membersCount: { increment: 1 } },
                                    }),
                                ])];
                        case 3:
                            _a.sent();
                            void this.notificationService.createNotification(targetUserId, client_1.NotificationType.GROUP_JOIN_APPROVED, 'Join Request Approved', 'approved your request to join the group', adminId, { referenceId: groupId, referenceType: 'Group', groupId: groupId });
                            return [2 /*return*/, { approved: true }];
                        case 4: return [4 /*yield*/, this.prisma.groupJoinRequest.update({
                                where: { id: req.id },
                                data: { status: client_1.JoinRequestStatus.DECLINED },
                            })];
                        case 5:
                            _a.sent();
                            return [2 /*return*/, { approved: false }];
                    }
                });
            });
        };
        GroupsService_1.prototype.createRule = function (groupId, adminId, dto) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.ensureAdminOrMod(groupId, adminId, true)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/, this.prisma.groupRule.create({
                                    data: __assign({ groupId: groupId }, dto),
                                })];
                    }
                });
            });
        };
        GroupsService_1.prototype.deleteRule = function (groupId, adminId, ruleId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.ensureAdminOrMod(groupId, adminId, true)];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, this.prisma.groupRule.delete({ where: { id: ruleId } }).catch(function () {
                                    throw new common_1.NotFoundException(error_messages_constant_1.ERROR_MESSAGES.GROUP_RULE_NOT_FOUND);
                                })];
                        case 2:
                            _a.sent();
                            return [2 /*return*/, { deleted: true }];
                    }
                });
            });
        };
        GroupsService_1.prototype.addPostToGroup = function (groupId, userId, postId) {
            return __awaiter(this, void 0, void 0, function () {
                var _a, group, mem, post, requiresApproval, groupPost, _b;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0: return [4 /*yield*/, this.ensureMember(groupId, userId)];
                        case 1:
                            _a = _c.sent(), group = _a.group, mem = _a.mem;
                            return [4 /*yield*/, this.prisma.post.findFirst({
                                    where: { id: postId, isDeleted: false },
                                    select: { id: true, authorId: true },
                                })];
                        case 2:
                            post = _c.sent();
                            if (!post) {
                                throw new common_1.NotFoundException(error_messages_constant_1.ERROR_MESSAGES.POST_NOT_FOUND);
                            }
                            if (post.authorId !== userId) {
                                throw new common_1.ForbiddenException(error_messages_constant_1.ERROR_MESSAGES.POST_UNAUTHORIZED);
                            }
                            requiresApproval = group.restrictPosting && mem.role === client_1.GroupMemberRole.MEMBER;
                            _c.label = 3;
                        case 3:
                            _c.trys.push([3, 7, , 8]);
                            return [4 /*yield*/, this.prisma.groupPost.create({
                                    data: {
                                        groupId: groupId,
                                        postId: postId,
                                        isApproved: !requiresApproval,
                                    },
                                    include: {
                                        post: {
                                            include: {
                                                author: { select: { id: true, name: true, image: true } },
                                            },
                                        },
                                    },
                                })];
                        case 4:
                            groupPost = _c.sent();
                            if (!!requiresApproval) return [3 /*break*/, 6];
                            return [4 /*yield*/, this.prisma.group.update({
                                    where: { id: groupId },
                                    data: { postsCount: { increment: 1 } },
                                })];
                        case 5:
                            _c.sent();
                            _c.label = 6;
                        case 6: return [2 /*return*/, __assign(__assign({}, groupPost), { status: requiresApproval ? 'PENDING_APPROVAL' : 'PUBLISHED' })];
                        case 7:
                            _b = _c.sent();
                            throw new common_1.BadRequestException('Post already shared in this group');
                        case 8: return [2 /*return*/];
                    }
                });
            });
        };
        GroupsService_1.prototype.getGroupPosts = function (groupId_1, userId_1) {
            return __awaiter(this, arguments, void 0, function (groupId, userId, page, limit) {
                var group, skip, _a, posts, total;
                if (page === void 0) { page = 1; }
                if (limit === void 0) { limit = 20; }
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, this.prisma.group.findFirst({
                                where: { id: groupId, deletedAt: null },
                                select: { id: true, type: true },
                            })];
                        case 1:
                            group = _b.sent();
                            if (!group) {
                                throw new common_1.NotFoundException(error_messages_constant_1.ERROR_MESSAGES.GROUP_NOT_FOUND);
                            }
                            if (!(group.type !== client_1.GroupType.PUBLIC)) return [3 /*break*/, 3];
                            return [4 /*yield*/, this.ensureMember(groupId, userId)];
                        case 2:
                            _b.sent();
                            _b.label = 3;
                        case 3:
                            skip = (page - 1) * limit;
                            return [4 /*yield*/, Promise.all([
                                    this.prisma.groupPost.findMany({
                                        where: { groupId: groupId, isApproved: true },
                                        include: {
                                            post: {
                                                include: {
                                                    author: { select: { id: true, name: true, image: true } },
                                                    _count: { select: { Likes: true, Comments: true } },
                                                },
                                            },
                                        },
                                        orderBy: { createdAt: 'desc' },
                                        skip: skip,
                                        take: limit,
                                    }),
                                    this.prisma.groupPost.count({
                                        where: { groupId: groupId, isApproved: true },
                                    }),
                                ])];
                        case 4:
                            _a = _b.sent(), posts = _a[0], total = _a[1];
                            return [2 /*return*/, {
                                    data: posts,
                                    meta: { page: page, limit: limit, total: total, totalPages: Math.ceil(total / limit) },
                                }];
                    }
                });
            });
        };
        GroupsService_1.prototype.reviewGroupPost = function (groupId, groupPostId, adminId, approve) {
            return __awaiter(this, void 0, void 0, function () {
                var existing;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (typeof approve !== 'boolean') {
                                throw new common_1.BadRequestException('Approve must be a boolean');
                            }
                            return [4 /*yield*/, this.ensureAdminOrMod(groupId, adminId, false)];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, this.prisma.groupPost.findUnique({
                                    where: { id: groupPostId },
                                    select: { id: true, groupId: true, isApproved: true },
                                })];
                        case 2:
                            existing = _a.sent();
                            if (!existing || existing.groupId !== groupId) {
                                throw new common_1.NotFoundException(error_messages_constant_1.ERROR_MESSAGES.POST_NOT_FOUND);
                            }
                            if (!approve) return [3 /*break*/, 4];
                            if (existing.isApproved) {
                                return [2 /*return*/, { approved: true }];
                            }
                            return [4 /*yield*/, this.prisma.$transaction([
                                    this.prisma.groupPost.update({
                                        where: { id: groupPostId },
                                        data: { isApproved: true },
                                    }),
                                    this.prisma.group.update({
                                        where: { id: groupId },
                                        data: { postsCount: { increment: 1 } },
                                    }),
                                ])];
                        case 3:
                            _a.sent();
                            return [2 /*return*/, { approved: true }];
                        case 4: return [4 /*yield*/, this.prisma.$transaction(__spreadArray([
                                this.prisma.groupPost.delete({
                                    where: { id: groupPostId },
                                })
                            ], (existing.isApproved
                                ? [
                                    this.prisma.group.update({
                                        where: { id: groupId },
                                        data: { postsCount: { decrement: 1 } },
                                    }),
                                ]
                                : []), true))];
                        case 5:
                            _a.sent();
                            return [2 /*return*/, { approved: false, deleted: true }];
                    }
                });
            });
        };
        GroupsService_1.prototype.getGroupInsights = function (groupId, userId) {
            return __awaiter(this, void 0, void 0, function () {
                var sevenDaysAgo, _a, totalMembers, newMembersLast7Days, totalPublishedPosts, publishedPostsLast7Days, pendingJoinRequests, pendingPosts, linkedEvents;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, this.ensureAdminOrMod(groupId, userId, false)];
                        case 1:
                            _b.sent();
                            sevenDaysAgo = new Date();
                            sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
                            return [4 /*yield*/, Promise.all([
                                    this.prisma.groupMember.count({ where: { groupId: groupId } }),
                                    this.prisma.groupMember.count({
                                        where: {
                                            groupId: groupId,
                                            joinedAt: { gte: sevenDaysAgo },
                                        },
                                    }),
                                    this.prisma.groupPost.count({
                                        where: { groupId: groupId, isApproved: true },
                                    }),
                                    this.prisma.groupPost.count({
                                        where: { groupId: groupId, isApproved: true, createdAt: { gte: sevenDaysAgo } },
                                    }),
                                    this.prisma.groupJoinRequest.count({
                                        where: { groupId: groupId, status: client_1.JoinRequestStatus.PENDING },
                                    }),
                                    this.prisma.groupPost.count({
                                        where: { groupId: groupId, isApproved: false },
                                    }),
                                    this.prisma.groupEvent.count({
                                        where: { groupId: groupId },
                                    }),
                                ])];
                        case 2:
                            _a = _b.sent(), totalMembers = _a[0], newMembersLast7Days = _a[1], totalPublishedPosts = _a[2], publishedPostsLast7Days = _a[3], pendingJoinRequests = _a[4], pendingPosts = _a[5], linkedEvents = _a[6];
                            return [2 /*return*/, {
                                    totals: {
                                        members: totalMembers,
                                        posts: totalPublishedPosts,
                                        linkedEvents: linkedEvents,
                                    },
                                    last7Days: {
                                        newMembers: newMembersLast7Days,
                                        newPosts: publishedPostsLast7Days,
                                    },
                                    pending: {
                                        joinRequests: pendingJoinRequests,
                                        posts: pendingPosts,
                                    },
                                }];
                    }
                });
            });
        };
        // --- Helpers ---
        GroupsService_1.prototype.ensureMember = function (groupId, userId) {
            return __awaiter(this, void 0, void 0, function () {
                var group, mem;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.group.findFirst({
                                where: { id: groupId, deletedAt: null },
                            })];
                        case 1:
                            group = _a.sent();
                            if (!group)
                                throw new common_1.NotFoundException(error_messages_constant_1.ERROR_MESSAGES.GROUP_NOT_FOUND);
                            return [4 /*yield*/, this.prisma.groupMember.findUnique({
                                    where: { groupId_userId: { groupId: groupId, userId: userId } },
                                })];
                        case 2:
                            mem = _a.sent();
                            if (!mem)
                                throw new common_1.ForbiddenException(error_messages_constant_1.ERROR_MESSAGES.NOT_GROUP_MEMBER);
                            return [2 /*return*/, { group: group, mem: mem }];
                    }
                });
            });
        };
        GroupsService_1.prototype.ensureAdminOrMod = function (groupId_1, userId_1) {
            return __awaiter(this, arguments, void 0, function (groupId, userId, adminOnly) {
                var _a, group, mem;
                if (adminOnly === void 0) { adminOnly = false; }
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, this.ensureMember(groupId, userId)];
                        case 1:
                            _a = _b.sent(), group = _a.group, mem = _a.mem;
                            if (adminOnly && mem.role !== client_1.GroupMemberRole.ADMIN) {
                                throw new common_1.ForbiddenException(error_messages_constant_1.ERROR_MESSAGES.GROUP_UNAUTHORIZED);
                            }
                            if (!adminOnly && mem.role === client_1.GroupMemberRole.MEMBER) {
                                throw new common_1.ForbiddenException(error_messages_constant_1.ERROR_MESSAGES.GROUP_UNAUTHORIZED);
                            }
                            return [2 /*return*/, group];
                    }
                });
            });
        };
        return GroupsService_1;
    }());
    __setFunctionName(_classThis, "GroupsService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        GroupsService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return GroupsService = _classThis;
}();
exports.GroupsService = GroupsService;
