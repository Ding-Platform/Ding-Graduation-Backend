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
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecommendationsListResponse = exports.RecommendedUserResponse = exports.FriendsListResponse = exports.FriendResponse = exports.MessageResponse = void 0;
var class_transformer_1 = require("class-transformer");
var MessageResponse = function () {
    var _a;
    var _message_decorators;
    var _message_initializers = [];
    var _message_extraInitializers = [];
    return _a = /** @class */ (function () {
            function MessageResponse() {
                this.message = __runInitializers(this, _message_initializers, void 0);
                __runInitializers(this, _message_extraInitializers);
            }
            return MessageResponse;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _message_decorators = [(0, class_transformer_1.Expose)()];
            __esDecorate(null, null, _message_decorators, { kind: "field", name: "message", static: false, private: false, access: { has: function (obj) { return "message" in obj; }, get: function (obj) { return obj.message; }, set: function (obj, value) { obj.message = value; } }, metadata: _metadata }, _message_initializers, _message_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.MessageResponse = MessageResponse;
var UserBasicInfo = function () {
    var _a;
    var _name_decorators;
    var _name_initializers = [];
    var _name_extraInitializers = [];
    var _image_decorators;
    var _image_initializers = [];
    var _image_extraInitializers = [];
    return _a = /** @class */ (function () {
            function UserBasicInfo() {
                this.name = __runInitializers(this, _name_initializers, void 0);
                this.image = (__runInitializers(this, _name_extraInitializers), __runInitializers(this, _image_initializers, void 0));
                __runInitializers(this, _image_extraInitializers);
            }
            return UserBasicInfo;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _name_decorators = [(0, class_transformer_1.Expose)()];
            _image_decorators = [(0, class_transformer_1.Expose)()];
            __esDecorate(null, null, _name_decorators, { kind: "field", name: "name", static: false, private: false, access: { has: function (obj) { return "name" in obj; }, get: function (obj) { return obj.name; }, set: function (obj, value) { obj.name = value; } }, metadata: _metadata }, _name_initializers, _name_extraInitializers);
            __esDecorate(null, null, _image_decorators, { kind: "field", name: "image", static: false, private: false, access: { has: function (obj) { return "image" in obj; }, get: function (obj) { return obj.image; }, set: function (obj, value) { obj.image = value; } }, metadata: _metadata }, _image_initializers, _image_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
var FriendResponse = function () {
    var _a;
    var _userId_decorators;
    var _userId_initializers = [];
    var _userId_extraInitializers = [];
    var _bio_decorators;
    var _bio_initializers = [];
    var _bio_extraInitializers = [];
    var _isFollowedBack_decorators;
    var _isFollowedBack_initializers = [];
    var _isFollowedBack_extraInitializers = [];
    var _user_decorators;
    var _user_initializers = [];
    var _user_extraInitializers = [];
    return _a = /** @class */ (function () {
            function FriendResponse() {
                this.userId = __runInitializers(this, _userId_initializers, void 0);
                this.bio = (__runInitializers(this, _userId_extraInitializers), __runInitializers(this, _bio_initializers, void 0));
                // Indicates if the current user follows this person back (followers list)
                this.isFollowedBack = (__runInitializers(this, _bio_extraInitializers), __runInitializers(this, _isFollowedBack_initializers, void 0));
                this.user = (__runInitializers(this, _isFollowedBack_extraInitializers), __runInitializers(this, _user_initializers, void 0));
                __runInitializers(this, _user_extraInitializers);
            }
            return FriendResponse;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _userId_decorators = [(0, class_transformer_1.Expose)()];
            _bio_decorators = [(0, class_transformer_1.Expose)()];
            _isFollowedBack_decorators = [(0, class_transformer_1.Expose)()];
            _user_decorators = [(0, class_transformer_1.Expose)(), (0, class_transformer_1.Type)(function () { return UserBasicInfo; })];
            __esDecorate(null, null, _userId_decorators, { kind: "field", name: "userId", static: false, private: false, access: { has: function (obj) { return "userId" in obj; }, get: function (obj) { return obj.userId; }, set: function (obj, value) { obj.userId = value; } }, metadata: _metadata }, _userId_initializers, _userId_extraInitializers);
            __esDecorate(null, null, _bio_decorators, { kind: "field", name: "bio", static: false, private: false, access: { has: function (obj) { return "bio" in obj; }, get: function (obj) { return obj.bio; }, set: function (obj, value) { obj.bio = value; } }, metadata: _metadata }, _bio_initializers, _bio_extraInitializers);
            __esDecorate(null, null, _isFollowedBack_decorators, { kind: "field", name: "isFollowedBack", static: false, private: false, access: { has: function (obj) { return "isFollowedBack" in obj; }, get: function (obj) { return obj.isFollowedBack; }, set: function (obj, value) { obj.isFollowedBack = value; } }, metadata: _metadata }, _isFollowedBack_initializers, _isFollowedBack_extraInitializers);
            __esDecorate(null, null, _user_decorators, { kind: "field", name: "user", static: false, private: false, access: { has: function (obj) { return "user" in obj; }, get: function (obj) { return obj.user; }, set: function (obj, value) { obj.user = value; } }, metadata: _metadata }, _user_initializers, _user_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.FriendResponse = FriendResponse;
var FriendsListMeta = function () {
    var _a;
    var _limit_decorators;
    var _limit_initializers = [];
    var _limit_extraInitializers = [];
    var _offset_decorators;
    var _offset_initializers = [];
    var _offset_extraInitializers = [];
    var _total_decorators;
    var _total_initializers = [];
    var _total_extraInitializers = [];
    var _hasMore_decorators;
    var _hasMore_initializers = [];
    var _hasMore_extraInitializers = [];
    var _nextOffset_decorators;
    var _nextOffset_initializers = [];
    var _nextOffset_extraInitializers = [];
    return _a = /** @class */ (function () {
            function FriendsListMeta() {
                this.limit = __runInitializers(this, _limit_initializers, void 0);
                this.offset = (__runInitializers(this, _limit_extraInitializers), __runInitializers(this, _offset_initializers, void 0));
                this.total = (__runInitializers(this, _offset_extraInitializers), __runInitializers(this, _total_initializers, void 0));
                this.hasMore = (__runInitializers(this, _total_extraInitializers), __runInitializers(this, _hasMore_initializers, void 0));
                this.nextOffset = (__runInitializers(this, _hasMore_extraInitializers), __runInitializers(this, _nextOffset_initializers, void 0));
                __runInitializers(this, _nextOffset_extraInitializers);
            }
            return FriendsListMeta;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _limit_decorators = [(0, class_transformer_1.Expose)()];
            _offset_decorators = [(0, class_transformer_1.Expose)()];
            _total_decorators = [(0, class_transformer_1.Expose)()];
            _hasMore_decorators = [(0, class_transformer_1.Expose)()];
            _nextOffset_decorators = [(0, class_transformer_1.Expose)()];
            __esDecorate(null, null, _limit_decorators, { kind: "field", name: "limit", static: false, private: false, access: { has: function (obj) { return "limit" in obj; }, get: function (obj) { return obj.limit; }, set: function (obj, value) { obj.limit = value; } }, metadata: _metadata }, _limit_initializers, _limit_extraInitializers);
            __esDecorate(null, null, _offset_decorators, { kind: "field", name: "offset", static: false, private: false, access: { has: function (obj) { return "offset" in obj; }, get: function (obj) { return obj.offset; }, set: function (obj, value) { obj.offset = value; } }, metadata: _metadata }, _offset_initializers, _offset_extraInitializers);
            __esDecorate(null, null, _total_decorators, { kind: "field", name: "total", static: false, private: false, access: { has: function (obj) { return "total" in obj; }, get: function (obj) { return obj.total; }, set: function (obj, value) { obj.total = value; } }, metadata: _metadata }, _total_initializers, _total_extraInitializers);
            __esDecorate(null, null, _hasMore_decorators, { kind: "field", name: "hasMore", static: false, private: false, access: { has: function (obj) { return "hasMore" in obj; }, get: function (obj) { return obj.hasMore; }, set: function (obj, value) { obj.hasMore = value; } }, metadata: _metadata }, _hasMore_initializers, _hasMore_extraInitializers);
            __esDecorate(null, null, _nextOffset_decorators, { kind: "field", name: "nextOffset", static: false, private: false, access: { has: function (obj) { return "nextOffset" in obj; }, get: function (obj) { return obj.nextOffset; }, set: function (obj, value) { obj.nextOffset = value; } }, metadata: _metadata }, _nextOffset_initializers, _nextOffset_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
var FriendsListResponse = function () {
    var _a;
    var _data_decorators;
    var _data_initializers = [];
    var _data_extraInitializers = [];
    var _meta_decorators;
    var _meta_initializers = [];
    var _meta_extraInitializers = [];
    return _a = /** @class */ (function () {
            function FriendsListResponse() {
                this.data = __runInitializers(this, _data_initializers, void 0);
                this.meta = (__runInitializers(this, _data_extraInitializers), __runInitializers(this, _meta_initializers, void 0));
                __runInitializers(this, _meta_extraInitializers);
            }
            return FriendsListResponse;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _data_decorators = [(0, class_transformer_1.Expose)(), (0, class_transformer_1.Type)(function () { return FriendResponse; })];
            _meta_decorators = [(0, class_transformer_1.Expose)(), (0, class_transformer_1.Type)(function () { return FriendsListMeta; })];
            __esDecorate(null, null, _data_decorators, { kind: "field", name: "data", static: false, private: false, access: { has: function (obj) { return "data" in obj; }, get: function (obj) { return obj.data; }, set: function (obj, value) { obj.data = value; } }, metadata: _metadata }, _data_initializers, _data_extraInitializers);
            __esDecorate(null, null, _meta_decorators, { kind: "field", name: "meta", static: false, private: false, access: { has: function (obj) { return "meta" in obj; }, get: function (obj) { return obj.meta; }, set: function (obj, value) { obj.meta = value; } }, metadata: _metadata }, _meta_initializers, _meta_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.FriendsListResponse = FriendsListResponse;
var RecommendedUserResponse = function () {
    var _a;
    var _userId_decorators;
    var _userId_initializers = [];
    var _userId_extraInitializers = [];
    var _bio_decorators;
    var _bio_initializers = [];
    var _bio_extraInitializers = [];
    var _user_decorators;
    var _user_initializers = [];
    var _user_extraInitializers = [];
    var _score_decorators;
    var _score_initializers = [];
    var _score_extraInitializers = [];
    var _mutualFriends_decorators;
    var _mutualFriends_initializers = [];
    var _mutualFriends_extraInitializers = [];
    var _reason_decorators;
    var _reason_initializers = [];
    var _reason_extraInitializers = [];
    return _a = /** @class */ (function () {
            function RecommendedUserResponse() {
                this.userId = __runInitializers(this, _userId_initializers, void 0);
                this.bio = (__runInitializers(this, _userId_extraInitializers), __runInitializers(this, _bio_initializers, void 0));
                this.user = (__runInitializers(this, _bio_extraInitializers), __runInitializers(this, _user_initializers, void 0));
                this.score = (__runInitializers(this, _user_extraInitializers), __runInitializers(this, _score_initializers, void 0));
                this.mutualFriends = (__runInitializers(this, _score_extraInitializers), __runInitializers(this, _mutualFriends_initializers, void 0));
                this.reason = (__runInitializers(this, _mutualFriends_extraInitializers), __runInitializers(this, _reason_initializers, void 0));
                __runInitializers(this, _reason_extraInitializers);
            }
            return RecommendedUserResponse;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _userId_decorators = [(0, class_transformer_1.Expose)()];
            _bio_decorators = [(0, class_transformer_1.Expose)()];
            _user_decorators = [(0, class_transformer_1.Expose)(), (0, class_transformer_1.Type)(function () { return UserBasicInfo; })];
            _score_decorators = [(0, class_transformer_1.Expose)()];
            _mutualFriends_decorators = [(0, class_transformer_1.Expose)()];
            _reason_decorators = [(0, class_transformer_1.Expose)()];
            __esDecorate(null, null, _userId_decorators, { kind: "field", name: "userId", static: false, private: false, access: { has: function (obj) { return "userId" in obj; }, get: function (obj) { return obj.userId; }, set: function (obj, value) { obj.userId = value; } }, metadata: _metadata }, _userId_initializers, _userId_extraInitializers);
            __esDecorate(null, null, _bio_decorators, { kind: "field", name: "bio", static: false, private: false, access: { has: function (obj) { return "bio" in obj; }, get: function (obj) { return obj.bio; }, set: function (obj, value) { obj.bio = value; } }, metadata: _metadata }, _bio_initializers, _bio_extraInitializers);
            __esDecorate(null, null, _user_decorators, { kind: "field", name: "user", static: false, private: false, access: { has: function (obj) { return "user" in obj; }, get: function (obj) { return obj.user; }, set: function (obj, value) { obj.user = value; } }, metadata: _metadata }, _user_initializers, _user_extraInitializers);
            __esDecorate(null, null, _score_decorators, { kind: "field", name: "score", static: false, private: false, access: { has: function (obj) { return "score" in obj; }, get: function (obj) { return obj.score; }, set: function (obj, value) { obj.score = value; } }, metadata: _metadata }, _score_initializers, _score_extraInitializers);
            __esDecorate(null, null, _mutualFriends_decorators, { kind: "field", name: "mutualFriends", static: false, private: false, access: { has: function (obj) { return "mutualFriends" in obj; }, get: function (obj) { return obj.mutualFriends; }, set: function (obj, value) { obj.mutualFriends = value; } }, metadata: _metadata }, _mutualFriends_initializers, _mutualFriends_extraInitializers);
            __esDecorate(null, null, _reason_decorators, { kind: "field", name: "reason", static: false, private: false, access: { has: function (obj) { return "reason" in obj; }, get: function (obj) { return obj.reason; }, set: function (obj, value) { obj.reason = value; } }, metadata: _metadata }, _reason_initializers, _reason_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.RecommendedUserResponse = RecommendedUserResponse;
var RecommendationsListMeta = function () {
    var _a;
    var _limit_decorators;
    var _limit_initializers = [];
    var _limit_extraInitializers = [];
    var _offset_decorators;
    var _offset_initializers = [];
    var _offset_extraInitializers = [];
    var _total_decorators;
    var _total_initializers = [];
    var _total_extraInitializers = [];
    var _hasMore_decorators;
    var _hasMore_initializers = [];
    var _hasMore_extraInitializers = [];
    var _nextOffset_decorators;
    var _nextOffset_initializers = [];
    var _nextOffset_extraInitializers = [];
    return _a = /** @class */ (function () {
            function RecommendationsListMeta() {
                this.limit = __runInitializers(this, _limit_initializers, void 0);
                this.offset = (__runInitializers(this, _limit_extraInitializers), __runInitializers(this, _offset_initializers, void 0));
                this.total = (__runInitializers(this, _offset_extraInitializers), __runInitializers(this, _total_initializers, void 0));
                this.hasMore = (__runInitializers(this, _total_extraInitializers), __runInitializers(this, _hasMore_initializers, void 0));
                this.nextOffset = (__runInitializers(this, _hasMore_extraInitializers), __runInitializers(this, _nextOffset_initializers, void 0));
                __runInitializers(this, _nextOffset_extraInitializers);
            }
            return RecommendationsListMeta;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _limit_decorators = [(0, class_transformer_1.Expose)()];
            _offset_decorators = [(0, class_transformer_1.Expose)()];
            _total_decorators = [(0, class_transformer_1.Expose)()];
            _hasMore_decorators = [(0, class_transformer_1.Expose)()];
            _nextOffset_decorators = [(0, class_transformer_1.Expose)()];
            __esDecorate(null, null, _limit_decorators, { kind: "field", name: "limit", static: false, private: false, access: { has: function (obj) { return "limit" in obj; }, get: function (obj) { return obj.limit; }, set: function (obj, value) { obj.limit = value; } }, metadata: _metadata }, _limit_initializers, _limit_extraInitializers);
            __esDecorate(null, null, _offset_decorators, { kind: "field", name: "offset", static: false, private: false, access: { has: function (obj) { return "offset" in obj; }, get: function (obj) { return obj.offset; }, set: function (obj, value) { obj.offset = value; } }, metadata: _metadata }, _offset_initializers, _offset_extraInitializers);
            __esDecorate(null, null, _total_decorators, { kind: "field", name: "total", static: false, private: false, access: { has: function (obj) { return "total" in obj; }, get: function (obj) { return obj.total; }, set: function (obj, value) { obj.total = value; } }, metadata: _metadata }, _total_initializers, _total_extraInitializers);
            __esDecorate(null, null, _hasMore_decorators, { kind: "field", name: "hasMore", static: false, private: false, access: { has: function (obj) { return "hasMore" in obj; }, get: function (obj) { return obj.hasMore; }, set: function (obj, value) { obj.hasMore = value; } }, metadata: _metadata }, _hasMore_initializers, _hasMore_extraInitializers);
            __esDecorate(null, null, _nextOffset_decorators, { kind: "field", name: "nextOffset", static: false, private: false, access: { has: function (obj) { return "nextOffset" in obj; }, get: function (obj) { return obj.nextOffset; }, set: function (obj, value) { obj.nextOffset = value; } }, metadata: _metadata }, _nextOffset_initializers, _nextOffset_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
var RecommendationsListResponse = function () {
    var _a;
    var _data_decorators;
    var _data_initializers = [];
    var _data_extraInitializers = [];
    var _meta_decorators;
    var _meta_initializers = [];
    var _meta_extraInitializers = [];
    return _a = /** @class */ (function () {
            function RecommendationsListResponse() {
                this.data = __runInitializers(this, _data_initializers, void 0);
                this.meta = (__runInitializers(this, _data_extraInitializers), __runInitializers(this, _meta_initializers, void 0));
                __runInitializers(this, _meta_extraInitializers);
            }
            return RecommendationsListResponse;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _data_decorators = [(0, class_transformer_1.Expose)(), (0, class_transformer_1.Type)(function () { return RecommendedUserResponse; })];
            _meta_decorators = [(0, class_transformer_1.Expose)(), (0, class_transformer_1.Type)(function () { return RecommendationsListMeta; })];
            __esDecorate(null, null, _data_decorators, { kind: "field", name: "data", static: false, private: false, access: { has: function (obj) { return "data" in obj; }, get: function (obj) { return obj.data; }, set: function (obj, value) { obj.data = value; } }, metadata: _metadata }, _data_initializers, _data_extraInitializers);
            __esDecorate(null, null, _meta_decorators, { kind: "field", name: "meta", static: false, private: false, access: { has: function (obj) { return "meta" in obj; }, get: function (obj) { return obj.meta; }, set: function (obj, value) { obj.meta = value; } }, metadata: _metadata }, _meta_initializers, _meta_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.RecommendationsListResponse = RecommendationsListResponse;
