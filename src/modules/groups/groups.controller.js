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
exports.GroupsController = void 0;
var common_1 = require("@nestjs/common");
var jwt_guard_1 = require("../../common/guards/strategy.guards/jwt.guard");
var GroupsController = function () {
    var _classDecorators = [(0, common_1.UseGuards)(jwt_guard_1.JwtAuthenticationGuard), (0, common_1.Controller)('groups')];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _instanceExtraInitializers = [];
    var _createGroup_decorators;
    var _discoverGroups_decorators;
    var _getGroupById_decorators;
    var _updateGroup_decorators;
    var _deleteGroup_decorators;
    var _joinGroup_decorators;
    var _leaveGroup_decorators;
    var _getMembers_decorators;
    var _updateMemberRole_decorators;
    var _removeMember_decorators;
    var _getJoinRequests_decorators;
    var _processJoinRequest_decorators;
    var _createRule_decorators;
    var _deleteRule_decorators;
    var _addPostToGroup_decorators;
    var _getGroupPosts_decorators;
    var _reviewGroupPost_decorators;
    var _getGroupInsights_decorators;
    var GroupsController = _classThis = /** @class */ (function () {
        function GroupsController_1(groupsService) {
            this.groupsService = (__runInitializers(this, _instanceExtraInitializers), groupsService);
        }
        GroupsController_1.prototype.createGroup = function (userId, dto) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.groupsService.createGroup(userId, dto)];
                });
            });
        };
        GroupsController_1.prototype.discoverGroups = function (userId_1) {
            return __awaiter(this, arguments, void 0, function (userId, page, limit, search) {
                if (page === void 0) { page = 1; }
                if (limit === void 0) { limit = 20; }
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.groupsService.discoverGroups(userId, page, limit, search)];
                });
            });
        };
        GroupsController_1.prototype.getGroupById = function (groupId, userId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.groupsService.getGroupById(groupId, userId)];
                });
            });
        };
        GroupsController_1.prototype.updateGroup = function (groupId, userId, dto) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.groupsService.updateGroup(groupId, userId, dto)];
                });
            });
        };
        GroupsController_1.prototype.deleteGroup = function (groupId, userId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.groupsService.deleteGroup(groupId, userId)];
                });
            });
        };
        GroupsController_1.prototype.joinGroup = function (groupId, userId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.groupsService.joinGroup(groupId, userId)];
                });
            });
        };
        GroupsController_1.prototype.leaveGroup = function (groupId, userId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.groupsService.leaveGroup(groupId, userId)];
                });
            });
        };
        GroupsController_1.prototype.getMembers = function (groupId_1, userId_1) {
            return __awaiter(this, arguments, void 0, function (groupId, userId, page, limit) {
                if (page === void 0) { page = 1; }
                if (limit === void 0) { limit = 20; }
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.groupsService.getMembers(groupId, userId, page, limit)];
                });
            });
        };
        GroupsController_1.prototype.updateMemberRole = function (groupId, adminId, targetUserId, role) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.groupsService.updateMemberRole(groupId, adminId, targetUserId, role)];
                });
            });
        };
        GroupsController_1.prototype.removeMember = function (groupId, adminId, targetUserId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.groupsService.removeMember(groupId, adminId, targetUserId)];
                });
            });
        };
        GroupsController_1.prototype.getJoinRequests = function (groupId_1, adminId_1) {
            return __awaiter(this, arguments, void 0, function (groupId, adminId, page, limit) {
                if (page === void 0) { page = 1; }
                if (limit === void 0) { limit = 20; }
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.groupsService.getJoinRequests(groupId, adminId, page, limit)];
                });
            });
        };
        GroupsController_1.prototype.processJoinRequest = function (groupId, adminId, targetUserId, approve) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.groupsService.processJoinRequest(groupId, adminId, targetUserId, approve)];
                });
            });
        };
        GroupsController_1.prototype.createRule = function (groupId, adminId, dto) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.groupsService.createRule(groupId, adminId, dto)];
                });
            });
        };
        GroupsController_1.prototype.deleteRule = function (groupId, adminId, ruleId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.groupsService.deleteRule(groupId, adminId, ruleId)];
                });
            });
        };
        GroupsController_1.prototype.addPostToGroup = function (groupId, userId, dto) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.groupsService.addPostToGroup(groupId, userId, dto.postId)];
                });
            });
        };
        GroupsController_1.prototype.getGroupPosts = function (groupId_1, userId_1) {
            return __awaiter(this, arguments, void 0, function (groupId, userId, page, limit) {
                if (page === void 0) { page = 1; }
                if (limit === void 0) { limit = 20; }
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.groupsService.getGroupPosts(groupId, userId, page, limit)];
                });
            });
        };
        GroupsController_1.prototype.reviewGroupPost = function (groupId, groupPostId, adminId, approve) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.groupsService.reviewGroupPost(groupId, groupPostId, adminId, approve)];
                });
            });
        };
        GroupsController_1.prototype.getGroupInsights = function (groupId, userId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.groupsService.getGroupInsights(groupId, userId)];
                });
            });
        };
        return GroupsController_1;
    }());
    __setFunctionName(_classThis, "GroupsController");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _createGroup_decorators = [(0, common_1.Post)('/')];
        _discoverGroups_decorators = [(0, common_1.Get)('/')];
        _getGroupById_decorators = [(0, common_1.Get)('/:id')];
        _updateGroup_decorators = [(0, common_1.Put)('/:id')];
        _deleteGroup_decorators = [(0, common_1.Delete)('/:id')];
        _joinGroup_decorators = [(0, common_1.Post)('/:id/join')];
        _leaveGroup_decorators = [(0, common_1.Delete)('/:id/leave')];
        _getMembers_decorators = [(0, common_1.Get)('/:id/members')];
        _updateMemberRole_decorators = [(0, common_1.Put)('/:id/members/:userId/role')];
        _removeMember_decorators = [(0, common_1.Delete)('/:id/members/:userId')];
        _getJoinRequests_decorators = [(0, common_1.Get)('/:id/requests')];
        _processJoinRequest_decorators = [(0, common_1.Put)('/:id/requests/:userId')];
        _createRule_decorators = [(0, common_1.Post)('/:id/rules')];
        _deleteRule_decorators = [(0, common_1.Delete)('/:id/rules/:ruleId')];
        _addPostToGroup_decorators = [(0, common_1.Post)('/:id/posts')];
        _getGroupPosts_decorators = [(0, common_1.Get)('/:id/posts')];
        _reviewGroupPost_decorators = [(0, common_1.Put)('/:id/posts/:groupPostId/approval')];
        _getGroupInsights_decorators = [(0, common_1.Get)('/:id/insights')];
        __esDecorate(_classThis, null, _createGroup_decorators, { kind: "method", name: "createGroup", static: false, private: false, access: { has: function (obj) { return "createGroup" in obj; }, get: function (obj) { return obj.createGroup; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _discoverGroups_decorators, { kind: "method", name: "discoverGroups", static: false, private: false, access: { has: function (obj) { return "discoverGroups" in obj; }, get: function (obj) { return obj.discoverGroups; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getGroupById_decorators, { kind: "method", name: "getGroupById", static: false, private: false, access: { has: function (obj) { return "getGroupById" in obj; }, get: function (obj) { return obj.getGroupById; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _updateGroup_decorators, { kind: "method", name: "updateGroup", static: false, private: false, access: { has: function (obj) { return "updateGroup" in obj; }, get: function (obj) { return obj.updateGroup; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _deleteGroup_decorators, { kind: "method", name: "deleteGroup", static: false, private: false, access: { has: function (obj) { return "deleteGroup" in obj; }, get: function (obj) { return obj.deleteGroup; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _joinGroup_decorators, { kind: "method", name: "joinGroup", static: false, private: false, access: { has: function (obj) { return "joinGroup" in obj; }, get: function (obj) { return obj.joinGroup; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _leaveGroup_decorators, { kind: "method", name: "leaveGroup", static: false, private: false, access: { has: function (obj) { return "leaveGroup" in obj; }, get: function (obj) { return obj.leaveGroup; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getMembers_decorators, { kind: "method", name: "getMembers", static: false, private: false, access: { has: function (obj) { return "getMembers" in obj; }, get: function (obj) { return obj.getMembers; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _updateMemberRole_decorators, { kind: "method", name: "updateMemberRole", static: false, private: false, access: { has: function (obj) { return "updateMemberRole" in obj; }, get: function (obj) { return obj.updateMemberRole; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _removeMember_decorators, { kind: "method", name: "removeMember", static: false, private: false, access: { has: function (obj) { return "removeMember" in obj; }, get: function (obj) { return obj.removeMember; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getJoinRequests_decorators, { kind: "method", name: "getJoinRequests", static: false, private: false, access: { has: function (obj) { return "getJoinRequests" in obj; }, get: function (obj) { return obj.getJoinRequests; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _processJoinRequest_decorators, { kind: "method", name: "processJoinRequest", static: false, private: false, access: { has: function (obj) { return "processJoinRequest" in obj; }, get: function (obj) { return obj.processJoinRequest; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _createRule_decorators, { kind: "method", name: "createRule", static: false, private: false, access: { has: function (obj) { return "createRule" in obj; }, get: function (obj) { return obj.createRule; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _deleteRule_decorators, { kind: "method", name: "deleteRule", static: false, private: false, access: { has: function (obj) { return "deleteRule" in obj; }, get: function (obj) { return obj.deleteRule; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _addPostToGroup_decorators, { kind: "method", name: "addPostToGroup", static: false, private: false, access: { has: function (obj) { return "addPostToGroup" in obj; }, get: function (obj) { return obj.addPostToGroup; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getGroupPosts_decorators, { kind: "method", name: "getGroupPosts", static: false, private: false, access: { has: function (obj) { return "getGroupPosts" in obj; }, get: function (obj) { return obj.getGroupPosts; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _reviewGroupPost_decorators, { kind: "method", name: "reviewGroupPost", static: false, private: false, access: { has: function (obj) { return "reviewGroupPost" in obj; }, get: function (obj) { return obj.reviewGroupPost; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getGroupInsights_decorators, { kind: "method", name: "getGroupInsights", static: false, private: false, access: { has: function (obj) { return "getGroupInsights" in obj; }, get: function (obj) { return obj.getGroupInsights; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        GroupsController = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return GroupsController = _classThis;
}();
exports.GroupsController = GroupsController;
