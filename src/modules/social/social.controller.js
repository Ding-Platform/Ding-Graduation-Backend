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
exports.SocialController = void 0;
var common_1 = require("@nestjs/common");
var jwt_guard_1 = require("src/common/guards/strategy.guards/jwt.guard");
var serialize_interceptor_1 = require("src/common/interceptors/serialize.interceptor");
var social_response_1 = require("./dtos/response/social.response");
var SocialController = function () {
    var _classDecorators = [(0, common_1.Controller)('social'), (0, common_1.UseGuards)(jwt_guard_1.JwtAuthenticationGuard)];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _instanceExtraInitializers = [];
    var _getFriendRequests_decorators;
    var _getFriends_decorators;
    var _toggleSendFriendRequest_decorators;
    var _acceptFriendRequest_decorators;
    var _rejectFriendRequest_decorators;
    var _removeFriend_decorators;
    var _followUser_decorators;
    var _unfollowUser_decorators;
    var _getFollowers_decorators;
    var _getFollowing_decorators;
    var _getFriendRecommendations_decorators;
    var _getFollowerRecommendations_decorators;
    var _getNetworkStats_decorators;
    var _getMutualFriends_decorators;
    var _blockUser_decorators;
    var _unblockUser_decorators;
    var _getBlockedUsers_decorators;
    var _muteUser_decorators;
    var _unmuteUser_decorators;
    var _getMutedUsers_decorators;
    var SocialController = _classThis = /** @class */ (function () {
        function SocialController_1(socialservice) {
            this.socialservice = (__runInitializers(this, _instanceExtraInitializers), socialservice);
        }
        // GET routes - static routes before parameterized
        SocialController_1.prototype.getFriendRequests = function (user, pagination) {
            return __awaiter(this, void 0, void 0, function () {
                var offsetNum, limitNum;
                var _a, _b;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            offsetNum = (_a = pagination.offset) !== null && _a !== void 0 ? _a : 0;
                            limitNum = (_b = pagination.limit) !== null && _b !== void 0 ? _b : 10;
                            return [4 /*yield*/, this.socialservice.getFriendRequests(user.id, offsetNum, limitNum)];
                        case 1: return [2 /*return*/, _c.sent()];
                    }
                });
            });
        };
        SocialController_1.prototype.getFriends = function (user, pagination) {
            return __awaiter(this, void 0, void 0, function () {
                var offsetNum, limitNum;
                var _a, _b;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            offsetNum = (_a = pagination.offset) !== null && _a !== void 0 ? _a : 0;
                            limitNum = (_b = pagination.limit) !== null && _b !== void 0 ? _b : 10;
                            return [4 /*yield*/, this.socialservice.getFriends(user.id, offsetNum, limitNum)];
                        case 1: return [2 /*return*/, _c.sent()];
                    }
                });
            });
        };
        // POST routes - parameterized routes
        SocialController_1.prototype.toggleSendFriendRequest = function (toUserId, user) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.socialservice.toggleSendFriendRequest(user.id, toUserId)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/, { message: 'Friend request toggled' }];
                    }
                });
            });
        };
        SocialController_1.prototype.acceptFriendRequest = function (fromUserId, user) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.socialservice.acceptFriendRequest(fromUserId, user.id)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/, { message: 'Friend request accepted' }];
                    }
                });
            });
        };
        SocialController_1.prototype.rejectFriendRequest = function (fromUserId, user) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.socialservice.rejectFriendRequest(fromUserId, user.id)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/, { message: 'Friend request rejected' }];
                    }
                });
            });
        };
        // DELETE routes - parameterized routes
        SocialController_1.prototype.removeFriend = function (userId, user) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.socialservice.removeFriend(user.id, userId)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/, { message: 'Friend removed' }];
                    }
                });
            });
        };
        // Followers endpoints
        SocialController_1.prototype.followUser = function (userId, user) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.socialservice.followUser(user.id, userId)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/, { message: 'User followed' }];
                    }
                });
            });
        };
        SocialController_1.prototype.unfollowUser = function (userId, user) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.socialservice.unfollowUser(user.id, userId)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/, { message: 'User unfollowed' }];
                    }
                });
            });
        };
        SocialController_1.prototype.getFollowers = function (user, pagination) {
            return __awaiter(this, void 0, void 0, function () {
                var offsetNum, limitNum;
                var _a, _b;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            offsetNum = (_a = pagination.offset) !== null && _a !== void 0 ? _a : 0;
                            limitNum = (_b = pagination.limit) !== null && _b !== void 0 ? _b : 10;
                            return [4 /*yield*/, this.socialservice.getFollowers(user.id, offsetNum, limitNum)];
                        case 1: return [2 /*return*/, _c.sent()];
                    }
                });
            });
        };
        SocialController_1.prototype.getFollowing = function (user, pagination) {
            return __awaiter(this, void 0, void 0, function () {
                var offsetNum, limitNum;
                var _a, _b;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            offsetNum = (_a = pagination.offset) !== null && _a !== void 0 ? _a : 0;
                            limitNum = (_b = pagination.limit) !== null && _b !== void 0 ? _b : 10;
                            return [4 /*yield*/, this.socialservice.getFollowing(user.id, offsetNum, limitNum)];
                        case 1: return [2 /*return*/, _c.sent()];
                    }
                });
            });
        };
        // Recommendations
        SocialController_1.prototype.getFriendRecommendations = function (user, pagination) {
            return __awaiter(this, void 0, void 0, function () {
                var offsetNum, limitNum;
                var _a, _b;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            offsetNum = (_a = pagination.offset) !== null && _a !== void 0 ? _a : 0;
                            limitNum = (_b = pagination.limit) !== null && _b !== void 0 ? _b : 10;
                            return [4 /*yield*/, this.socialservice.getFriendRecommendations(user.id, offsetNum, limitNum)];
                        case 1: return [2 /*return*/, _c.sent()];
                    }
                });
            });
        };
        SocialController_1.prototype.getFollowerRecommendations = function (user, pagination) {
            return __awaiter(this, void 0, void 0, function () {
                var offsetNum, limitNum;
                var _a, _b;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            offsetNum = (_a = pagination.offset) !== null && _a !== void 0 ? _a : 0;
                            limitNum = (_b = pagination.limit) !== null && _b !== void 0 ? _b : 10;
                            return [4 /*yield*/, this.socialservice.getFollowerRecommendations(user.id, offsetNum, limitNum)];
                        case 1: return [2 /*return*/, _c.sent()];
                    }
                });
            });
        };
        // Stats
        SocialController_1.prototype.getNetworkStats = function (user) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.socialservice.getUserNetworkStats(user.id)];
                });
            });
        };
        SocialController_1.prototype.getMutualFriends = function (userId, user, pagination) {
            return __awaiter(this, void 0, void 0, function () {
                var offsetNum, limitNum;
                var _a, _b;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            offsetNum = (_a = pagination.offset) !== null && _a !== void 0 ? _a : 0;
                            limitNum = (_b = pagination.limit) !== null && _b !== void 0 ? _b : 10;
                            return [4 /*yield*/, this.socialservice.getMutualFriends(user.id, userId, offsetNum, limitNum)];
                        case 1: return [2 /*return*/, _c.sent()];
                    }
                });
            });
        };
        // Blocking endpoints
        SocialController_1.prototype.blockUser = function (userId, user) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.socialservice.blockUser(user.id, userId)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/, { message: 'User blocked successfully' }];
                    }
                });
            });
        };
        SocialController_1.prototype.unblockUser = function (userId, user) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.socialservice.unblockUser(user.id, userId)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/, { message: 'User unblocked successfully' }];
                    }
                });
            });
        };
        SocialController_1.prototype.getBlockedUsers = function (user, pagination) {
            return __awaiter(this, void 0, void 0, function () {
                var limitNum, blocked;
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            limitNum = (_a = pagination.limit) !== null && _a !== void 0 ? _a : undefined;
                            return [4 /*yield*/, this.socialservice.getBlockedUsers(user.id, limitNum)];
                        case 1:
                            blocked = _b.sent();
                            return [2 /*return*/, {
                                    data: blocked,
                                    count: blocked.length,
                                }];
                    }
                });
            });
        };
        // Muting endpoints
        SocialController_1.prototype.muteUser = function (userId, user) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.socialservice.muteUser(user.id, userId)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/, { message: 'User muted successfully' }];
                    }
                });
            });
        };
        SocialController_1.prototype.unmuteUser = function (userId, user) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.socialservice.unmuteUser(user.id, userId)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/, { message: 'User unmuted successfully' }];
                    }
                });
            });
        };
        SocialController_1.prototype.getMutedUsers = function (user, pagination) {
            return __awaiter(this, void 0, void 0, function () {
                var limitNum, muted;
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            limitNum = (_a = pagination.limit) !== null && _a !== void 0 ? _a : undefined;
                            return [4 /*yield*/, this.socialservice.getMutedUsers(user.id, limitNum)];
                        case 1:
                            muted = _b.sent();
                            return [2 /*return*/, {
                                    data: muted,
                                    count: muted.length,
                                }];
                    }
                });
            });
        };
        return SocialController_1;
    }());
    __setFunctionName(_classThis, "SocialController");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _getFriendRequests_decorators = [(0, common_1.Get)('friends/requests'), (0, common_1.HttpCode)(common_1.HttpStatus.OK), (0, serialize_interceptor_1.Serialize)(social_response_1.FriendsListResponse, social_response_1.FriendResponse)];
        _getFriends_decorators = [(0, common_1.Get)('friends'), (0, common_1.HttpCode)(common_1.HttpStatus.OK), (0, serialize_interceptor_1.Serialize)(social_response_1.FriendsListResponse, social_response_1.FriendResponse)];
        _toggleSendFriendRequest_decorators = [(0, common_1.Post)('friends/request/:toUserId'), (0, common_1.HttpCode)(common_1.HttpStatus.OK), (0, serialize_interceptor_1.Serialize)(social_response_1.MessageResponse)];
        _acceptFriendRequest_decorators = [(0, common_1.Post)('friends/accept/:fromUserId'), (0, common_1.HttpCode)(common_1.HttpStatus.OK), (0, serialize_interceptor_1.Serialize)(social_response_1.MessageResponse)];
        _rejectFriendRequest_decorators = [(0, common_1.Post)('friends/reject/:fromUserId'), (0, common_1.HttpCode)(common_1.HttpStatus.OK), (0, serialize_interceptor_1.Serialize)(social_response_1.MessageResponse)];
        _removeFriend_decorators = [(0, common_1.Delete)('friends/:userId'), (0, common_1.HttpCode)(common_1.HttpStatus.OK), (0, serialize_interceptor_1.Serialize)(social_response_1.MessageResponse)];
        _followUser_decorators = [(0, common_1.Post)('follow/:userId'), (0, common_1.HttpCode)(common_1.HttpStatus.OK), (0, serialize_interceptor_1.Serialize)(social_response_1.MessageResponse)];
        _unfollowUser_decorators = [(0, common_1.Delete)('follow/:userId'), (0, common_1.HttpCode)(common_1.HttpStatus.OK), (0, serialize_interceptor_1.Serialize)(social_response_1.MessageResponse)];
        _getFollowers_decorators = [(0, common_1.Get)('followers'), (0, common_1.HttpCode)(common_1.HttpStatus.OK), (0, serialize_interceptor_1.Serialize)(social_response_1.FriendsListResponse, social_response_1.FriendResponse)];
        _getFollowing_decorators = [(0, common_1.Get)('following'), (0, common_1.HttpCode)(common_1.HttpStatus.OK), (0, serialize_interceptor_1.Serialize)(social_response_1.FriendsListResponse, social_response_1.FriendResponse)];
        _getFriendRecommendations_decorators = [(0, common_1.Get)('recommendations/friends'), (0, common_1.HttpCode)(common_1.HttpStatus.OK), (0, serialize_interceptor_1.Serialize)(social_response_1.RecommendationsListResponse, social_response_1.RecommendedUserResponse)];
        _getFollowerRecommendations_decorators = [(0, common_1.Get)('recommendations/follow'), (0, common_1.HttpCode)(common_1.HttpStatus.OK), (0, serialize_interceptor_1.Serialize)(social_response_1.RecommendationsListResponse, social_response_1.RecommendedUserResponse)];
        _getNetworkStats_decorators = [(0, common_1.Get)('stats'), (0, common_1.HttpCode)(common_1.HttpStatus.OK)];
        _getMutualFriends_decorators = [(0, common_1.Get)('mutual-friends/:userId'), (0, common_1.HttpCode)(common_1.HttpStatus.OK), (0, serialize_interceptor_1.Serialize)(social_response_1.FriendsListResponse, social_response_1.FriendResponse)];
        _blockUser_decorators = [(0, common_1.Post)('block/:userId'), (0, common_1.HttpCode)(common_1.HttpStatus.OK), (0, serialize_interceptor_1.Serialize)(social_response_1.MessageResponse)];
        _unblockUser_decorators = [(0, common_1.Delete)('block/:userId'), (0, common_1.HttpCode)(common_1.HttpStatus.OK), (0, serialize_interceptor_1.Serialize)(social_response_1.MessageResponse)];
        _getBlockedUsers_decorators = [(0, common_1.Get)('blocked'), (0, common_1.HttpCode)(common_1.HttpStatus.OK), (0, serialize_interceptor_1.Serialize)(social_response_1.FriendsListResponse, social_response_1.FriendResponse)];
        _muteUser_decorators = [(0, common_1.Post)('mute/:userId'), (0, common_1.HttpCode)(common_1.HttpStatus.OK), (0, serialize_interceptor_1.Serialize)(social_response_1.MessageResponse)];
        _unmuteUser_decorators = [(0, common_1.Delete)('mute/:userId'), (0, common_1.HttpCode)(common_1.HttpStatus.OK), (0, serialize_interceptor_1.Serialize)(social_response_1.MessageResponse)];
        _getMutedUsers_decorators = [(0, common_1.Get)('muted'), (0, common_1.HttpCode)(common_1.HttpStatus.OK), (0, serialize_interceptor_1.Serialize)(social_response_1.FriendsListResponse, social_response_1.FriendResponse)];
        __esDecorate(_classThis, null, _getFriendRequests_decorators, { kind: "method", name: "getFriendRequests", static: false, private: false, access: { has: function (obj) { return "getFriendRequests" in obj; }, get: function (obj) { return obj.getFriendRequests; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getFriends_decorators, { kind: "method", name: "getFriends", static: false, private: false, access: { has: function (obj) { return "getFriends" in obj; }, get: function (obj) { return obj.getFriends; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _toggleSendFriendRequest_decorators, { kind: "method", name: "toggleSendFriendRequest", static: false, private: false, access: { has: function (obj) { return "toggleSendFriendRequest" in obj; }, get: function (obj) { return obj.toggleSendFriendRequest; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _acceptFriendRequest_decorators, { kind: "method", name: "acceptFriendRequest", static: false, private: false, access: { has: function (obj) { return "acceptFriendRequest" in obj; }, get: function (obj) { return obj.acceptFriendRequest; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _rejectFriendRequest_decorators, { kind: "method", name: "rejectFriendRequest", static: false, private: false, access: { has: function (obj) { return "rejectFriendRequest" in obj; }, get: function (obj) { return obj.rejectFriendRequest; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _removeFriend_decorators, { kind: "method", name: "removeFriend", static: false, private: false, access: { has: function (obj) { return "removeFriend" in obj; }, get: function (obj) { return obj.removeFriend; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _followUser_decorators, { kind: "method", name: "followUser", static: false, private: false, access: { has: function (obj) { return "followUser" in obj; }, get: function (obj) { return obj.followUser; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _unfollowUser_decorators, { kind: "method", name: "unfollowUser", static: false, private: false, access: { has: function (obj) { return "unfollowUser" in obj; }, get: function (obj) { return obj.unfollowUser; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getFollowers_decorators, { kind: "method", name: "getFollowers", static: false, private: false, access: { has: function (obj) { return "getFollowers" in obj; }, get: function (obj) { return obj.getFollowers; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getFollowing_decorators, { kind: "method", name: "getFollowing", static: false, private: false, access: { has: function (obj) { return "getFollowing" in obj; }, get: function (obj) { return obj.getFollowing; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getFriendRecommendations_decorators, { kind: "method", name: "getFriendRecommendations", static: false, private: false, access: { has: function (obj) { return "getFriendRecommendations" in obj; }, get: function (obj) { return obj.getFriendRecommendations; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getFollowerRecommendations_decorators, { kind: "method", name: "getFollowerRecommendations", static: false, private: false, access: { has: function (obj) { return "getFollowerRecommendations" in obj; }, get: function (obj) { return obj.getFollowerRecommendations; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getNetworkStats_decorators, { kind: "method", name: "getNetworkStats", static: false, private: false, access: { has: function (obj) { return "getNetworkStats" in obj; }, get: function (obj) { return obj.getNetworkStats; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getMutualFriends_decorators, { kind: "method", name: "getMutualFriends", static: false, private: false, access: { has: function (obj) { return "getMutualFriends" in obj; }, get: function (obj) { return obj.getMutualFriends; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _blockUser_decorators, { kind: "method", name: "blockUser", static: false, private: false, access: { has: function (obj) { return "blockUser" in obj; }, get: function (obj) { return obj.blockUser; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _unblockUser_decorators, { kind: "method", name: "unblockUser", static: false, private: false, access: { has: function (obj) { return "unblockUser" in obj; }, get: function (obj) { return obj.unblockUser; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getBlockedUsers_decorators, { kind: "method", name: "getBlockedUsers", static: false, private: false, access: { has: function (obj) { return "getBlockedUsers" in obj; }, get: function (obj) { return obj.getBlockedUsers; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _muteUser_decorators, { kind: "method", name: "muteUser", static: false, private: false, access: { has: function (obj) { return "muteUser" in obj; }, get: function (obj) { return obj.muteUser; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _unmuteUser_decorators, { kind: "method", name: "unmuteUser", static: false, private: false, access: { has: function (obj) { return "unmuteUser" in obj; }, get: function (obj) { return obj.unmuteUser; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getMutedUsers_decorators, { kind: "method", name: "getMutedUsers", static: false, private: false, access: { has: function (obj) { return "getMutedUsers" in obj; }, get: function (obj) { return obj.getMutedUsers; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        SocialController = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return SocialController = _classThis;
}();
exports.SocialController = SocialController;
