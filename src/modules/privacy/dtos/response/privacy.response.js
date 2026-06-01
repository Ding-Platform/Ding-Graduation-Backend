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
exports.PrivacyResponseDto = void 0;
var class_transformer_1 = require("class-transformer");
var PrivacyResponseDto = function () {
    var _a;
    var _id_decorators;
    var _id_initializers = [];
    var _id_extraInitializers = [];
    var _profileId_decorators;
    var _profileId_initializers = [];
    var _profileId_extraInitializers = [];
    var _profileVisibility_decorators;
    var _profileVisibility_initializers = [];
    var _profileVisibility_extraInitializers = [];
    var _postsVisibility_decorators;
    var _postsVisibility_initializers = [];
    var _postsVisibility_extraInitializers = [];
    var _friendsVisibility_decorators;
    var _friendsVisibility_initializers = [];
    var _friendsVisibility_extraInitializers = [];
    var _bioVisibility_decorators;
    var _bioVisibility_initializers = [];
    var _bioVisibility_extraInitializers = [];
    var _emailVisibility_decorators;
    var _emailVisibility_initializers = [];
    var _emailVisibility_extraInitializers = [];
    var _phoneVisibility_decorators;
    var _phoneVisibility_initializers = [];
    var _phoneVisibility_extraInitializers = [];
    var _locationVisibility_decorators;
    var _locationVisibility_initializers = [];
    var _locationVisibility_extraInitializers = [];
    var _dateOfBirthVisibility_decorators;
    var _dateOfBirthVisibility_initializers = [];
    var _dateOfBirthVisibility_extraInitializers = [];
    var _whoCanSendFriendRequests_decorators;
    var _whoCanSendFriendRequests_initializers = [];
    var _whoCanSendFriendRequests_extraInitializers = [];
    var _whoCanMessageMe_decorators;
    var _whoCanMessageMe_initializers = [];
    var _whoCanMessageMe_extraInitializers = [];
    var _createdAt_decorators;
    var _createdAt_initializers = [];
    var _createdAt_extraInitializers = [];
    var _updatedAt_decorators;
    var _updatedAt_initializers = [];
    var _updatedAt_extraInitializers = [];
    return _a = /** @class */ (function () {
            function PrivacyResponseDto() {
                this.id = __runInitializers(this, _id_initializers, void 0);
                this.profileId = (__runInitializers(this, _id_extraInitializers), __runInitializers(this, _profileId_initializers, void 0));
                this.profileVisibility = (__runInitializers(this, _profileId_extraInitializers), __runInitializers(this, _profileVisibility_initializers, void 0));
                this.postsVisibility = (__runInitializers(this, _profileVisibility_extraInitializers), __runInitializers(this, _postsVisibility_initializers, void 0));
                this.friendsVisibility = (__runInitializers(this, _postsVisibility_extraInitializers), __runInitializers(this, _friendsVisibility_initializers, void 0));
                this.bioVisibility = (__runInitializers(this, _friendsVisibility_extraInitializers), __runInitializers(this, _bioVisibility_initializers, void 0));
                this.emailVisibility = (__runInitializers(this, _bioVisibility_extraInitializers), __runInitializers(this, _emailVisibility_initializers, void 0));
                this.phoneVisibility = (__runInitializers(this, _emailVisibility_extraInitializers), __runInitializers(this, _phoneVisibility_initializers, void 0));
                this.locationVisibility = (__runInitializers(this, _phoneVisibility_extraInitializers), __runInitializers(this, _locationVisibility_initializers, void 0));
                this.dateOfBirthVisibility = (__runInitializers(this, _locationVisibility_extraInitializers), __runInitializers(this, _dateOfBirthVisibility_initializers, void 0));
                this.whoCanSendFriendRequests = (__runInitializers(this, _dateOfBirthVisibility_extraInitializers), __runInitializers(this, _whoCanSendFriendRequests_initializers, void 0));
                this.whoCanMessageMe = (__runInitializers(this, _whoCanSendFriendRequests_extraInitializers), __runInitializers(this, _whoCanMessageMe_initializers, void 0));
                this.createdAt = (__runInitializers(this, _whoCanMessageMe_extraInitializers), __runInitializers(this, _createdAt_initializers, void 0));
                this.updatedAt = (__runInitializers(this, _createdAt_extraInitializers), __runInitializers(this, _updatedAt_initializers, void 0));
                __runInitializers(this, _updatedAt_extraInitializers);
            }
            return PrivacyResponseDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _id_decorators = [(0, class_transformer_1.Expose)()];
            _profileId_decorators = [(0, class_transformer_1.Expose)()];
            _profileVisibility_decorators = [(0, class_transformer_1.Expose)()];
            _postsVisibility_decorators = [(0, class_transformer_1.Expose)()];
            _friendsVisibility_decorators = [(0, class_transformer_1.Expose)()];
            _bioVisibility_decorators = [(0, class_transformer_1.Expose)()];
            _emailVisibility_decorators = [(0, class_transformer_1.Expose)()];
            _phoneVisibility_decorators = [(0, class_transformer_1.Expose)()];
            _locationVisibility_decorators = [(0, class_transformer_1.Expose)()];
            _dateOfBirthVisibility_decorators = [(0, class_transformer_1.Expose)()];
            _whoCanSendFriendRequests_decorators = [(0, class_transformer_1.Expose)()];
            _whoCanMessageMe_decorators = [(0, class_transformer_1.Expose)()];
            _createdAt_decorators = [(0, class_transformer_1.Expose)()];
            _updatedAt_decorators = [(0, class_transformer_1.Expose)()];
            __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: function (obj) { return "id" in obj; }, get: function (obj) { return obj.id; }, set: function (obj, value) { obj.id = value; } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
            __esDecorate(null, null, _profileId_decorators, { kind: "field", name: "profileId", static: false, private: false, access: { has: function (obj) { return "profileId" in obj; }, get: function (obj) { return obj.profileId; }, set: function (obj, value) { obj.profileId = value; } }, metadata: _metadata }, _profileId_initializers, _profileId_extraInitializers);
            __esDecorate(null, null, _profileVisibility_decorators, { kind: "field", name: "profileVisibility", static: false, private: false, access: { has: function (obj) { return "profileVisibility" in obj; }, get: function (obj) { return obj.profileVisibility; }, set: function (obj, value) { obj.profileVisibility = value; } }, metadata: _metadata }, _profileVisibility_initializers, _profileVisibility_extraInitializers);
            __esDecorate(null, null, _postsVisibility_decorators, { kind: "field", name: "postsVisibility", static: false, private: false, access: { has: function (obj) { return "postsVisibility" in obj; }, get: function (obj) { return obj.postsVisibility; }, set: function (obj, value) { obj.postsVisibility = value; } }, metadata: _metadata }, _postsVisibility_initializers, _postsVisibility_extraInitializers);
            __esDecorate(null, null, _friendsVisibility_decorators, { kind: "field", name: "friendsVisibility", static: false, private: false, access: { has: function (obj) { return "friendsVisibility" in obj; }, get: function (obj) { return obj.friendsVisibility; }, set: function (obj, value) { obj.friendsVisibility = value; } }, metadata: _metadata }, _friendsVisibility_initializers, _friendsVisibility_extraInitializers);
            __esDecorate(null, null, _bioVisibility_decorators, { kind: "field", name: "bioVisibility", static: false, private: false, access: { has: function (obj) { return "bioVisibility" in obj; }, get: function (obj) { return obj.bioVisibility; }, set: function (obj, value) { obj.bioVisibility = value; } }, metadata: _metadata }, _bioVisibility_initializers, _bioVisibility_extraInitializers);
            __esDecorate(null, null, _emailVisibility_decorators, { kind: "field", name: "emailVisibility", static: false, private: false, access: { has: function (obj) { return "emailVisibility" in obj; }, get: function (obj) { return obj.emailVisibility; }, set: function (obj, value) { obj.emailVisibility = value; } }, metadata: _metadata }, _emailVisibility_initializers, _emailVisibility_extraInitializers);
            __esDecorate(null, null, _phoneVisibility_decorators, { kind: "field", name: "phoneVisibility", static: false, private: false, access: { has: function (obj) { return "phoneVisibility" in obj; }, get: function (obj) { return obj.phoneVisibility; }, set: function (obj, value) { obj.phoneVisibility = value; } }, metadata: _metadata }, _phoneVisibility_initializers, _phoneVisibility_extraInitializers);
            __esDecorate(null, null, _locationVisibility_decorators, { kind: "field", name: "locationVisibility", static: false, private: false, access: { has: function (obj) { return "locationVisibility" in obj; }, get: function (obj) { return obj.locationVisibility; }, set: function (obj, value) { obj.locationVisibility = value; } }, metadata: _metadata }, _locationVisibility_initializers, _locationVisibility_extraInitializers);
            __esDecorate(null, null, _dateOfBirthVisibility_decorators, { kind: "field", name: "dateOfBirthVisibility", static: false, private: false, access: { has: function (obj) { return "dateOfBirthVisibility" in obj; }, get: function (obj) { return obj.dateOfBirthVisibility; }, set: function (obj, value) { obj.dateOfBirthVisibility = value; } }, metadata: _metadata }, _dateOfBirthVisibility_initializers, _dateOfBirthVisibility_extraInitializers);
            __esDecorate(null, null, _whoCanSendFriendRequests_decorators, { kind: "field", name: "whoCanSendFriendRequests", static: false, private: false, access: { has: function (obj) { return "whoCanSendFriendRequests" in obj; }, get: function (obj) { return obj.whoCanSendFriendRequests; }, set: function (obj, value) { obj.whoCanSendFriendRequests = value; } }, metadata: _metadata }, _whoCanSendFriendRequests_initializers, _whoCanSendFriendRequests_extraInitializers);
            __esDecorate(null, null, _whoCanMessageMe_decorators, { kind: "field", name: "whoCanMessageMe", static: false, private: false, access: { has: function (obj) { return "whoCanMessageMe" in obj; }, get: function (obj) { return obj.whoCanMessageMe; }, set: function (obj, value) { obj.whoCanMessageMe = value; } }, metadata: _metadata }, _whoCanMessageMe_initializers, _whoCanMessageMe_extraInitializers);
            __esDecorate(null, null, _createdAt_decorators, { kind: "field", name: "createdAt", static: false, private: false, access: { has: function (obj) { return "createdAt" in obj; }, get: function (obj) { return obj.createdAt; }, set: function (obj, value) { obj.createdAt = value; } }, metadata: _metadata }, _createdAt_initializers, _createdAt_extraInitializers);
            __esDecorate(null, null, _updatedAt_decorators, { kind: "field", name: "updatedAt", static: false, private: false, access: { has: function (obj) { return "updatedAt" in obj; }, get: function (obj) { return obj.updatedAt; }, set: function (obj, value) { obj.updatedAt = value; } }, metadata: _metadata }, _updatedAt_initializers, _updatedAt_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.PrivacyResponseDto = PrivacyResponseDto;
