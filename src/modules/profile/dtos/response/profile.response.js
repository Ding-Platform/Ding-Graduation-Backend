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
exports.ProfileResponse = exports.VisibilityType = void 0;
var class_transformer_1 = require("class-transformer");
// Use the enum from the request DTO
var VisibilityType;
(function (VisibilityType) {
    VisibilityType["PUBLIC"] = "PUBLIC";
    VisibilityType["FRIENDS"] = "FRIENDS";
    VisibilityType["FRIENDS_OF_FRIENDS"] = "FRIENDS_OF_FRIENDS";
    VisibilityType["ONLY_ME"] = "ONLY_ME";
    VisibilityType["PRIVATE"] = "PRIVATE";
    VisibilityType["EVERYONE"] = "EVERYONE";
    VisibilityType["CUSTOM"] = "CUSTOM";
})(VisibilityType || (exports.VisibilityType = VisibilityType = {}));
var UserBasicInfo = function () {
    var _a;
    var _id_decorators;
    var _id_initializers = [];
    var _id_extraInitializers = [];
    var _name_decorators;
    var _name_initializers = [];
    var _name_extraInitializers = [];
    var _email_decorators;
    var _email_initializers = [];
    var _email_extraInitializers = [];
    var _image_decorators;
    var _image_initializers = [];
    var _image_extraInitializers = [];
    return _a = /** @class */ (function () {
            function UserBasicInfo() {
                this.id = __runInitializers(this, _id_initializers, void 0);
                this.name = (__runInitializers(this, _id_extraInitializers), __runInitializers(this, _name_initializers, void 0));
                this.email = (__runInitializers(this, _name_extraInitializers), __runInitializers(this, _email_initializers, void 0));
                this.image = (__runInitializers(this, _email_extraInitializers), __runInitializers(this, _image_initializers, void 0));
                __runInitializers(this, _image_extraInitializers);
            }
            return UserBasicInfo;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _id_decorators = [(0, class_transformer_1.Expose)()];
            _name_decorators = [(0, class_transformer_1.Expose)()];
            _email_decorators = [(0, class_transformer_1.Expose)()];
            _image_decorators = [(0, class_transformer_1.Expose)()];
            __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: function (obj) { return "id" in obj; }, get: function (obj) { return obj.id; }, set: function (obj, value) { obj.id = value; } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
            __esDecorate(null, null, _name_decorators, { kind: "field", name: "name", static: false, private: false, access: { has: function (obj) { return "name" in obj; }, get: function (obj) { return obj.name; }, set: function (obj, value) { obj.name = value; } }, metadata: _metadata }, _name_initializers, _name_extraInitializers);
            __esDecorate(null, null, _email_decorators, { kind: "field", name: "email", static: false, private: false, access: { has: function (obj) { return "email" in obj; }, get: function (obj) { return obj.email; }, set: function (obj, value) { obj.email = value; } }, metadata: _metadata }, _email_initializers, _email_extraInitializers);
            __esDecorate(null, null, _image_decorators, { kind: "field", name: "image", static: false, private: false, access: { has: function (obj) { return "image" in obj; }, get: function (obj) { return obj.image; }, set: function (obj, value) { obj.image = value; } }, metadata: _metadata }, _image_initializers, _image_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
var ProfilePrivacyResponse = function () {
    var _a;
    var _id_decorators;
    var _id_initializers = [];
    var _id_extraInitializers = [];
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
    var _allowCameraAccess_decorators;
    var _allowCameraAccess_initializers = [];
    var _allowCameraAccess_extraInitializers = [];
    var _allowMicrophoneAccess_decorators;
    var _allowMicrophoneAccess_initializers = [];
    var _allowMicrophoneAccess_extraInitializers = [];
    var _createdAt_decorators;
    var _createdAt_initializers = [];
    var _createdAt_extraInitializers = [];
    var _updatedAt_decorators;
    var _updatedAt_initializers = [];
    var _updatedAt_extraInitializers = [];
    return _a = /** @class */ (function () {
            function ProfilePrivacyResponse() {
                this.id = __runInitializers(this, _id_initializers, void 0);
                this.profileVisibility = (__runInitializers(this, _id_extraInitializers), __runInitializers(this, _profileVisibility_initializers, void 0));
                this.postsVisibility = (__runInitializers(this, _profileVisibility_extraInitializers), __runInitializers(this, _postsVisibility_initializers, void 0));
                this.friendsVisibility = (__runInitializers(this, _postsVisibility_extraInitializers), __runInitializers(this, _friendsVisibility_initializers, void 0));
                this.bioVisibility = (__runInitializers(this, _friendsVisibility_extraInitializers), __runInitializers(this, _bioVisibility_initializers, void 0));
                this.emailVisibility = (__runInitializers(this, _bioVisibility_extraInitializers), __runInitializers(this, _emailVisibility_initializers, void 0));
                this.phoneVisibility = (__runInitializers(this, _emailVisibility_extraInitializers), __runInitializers(this, _phoneVisibility_initializers, void 0));
                this.locationVisibility = (__runInitializers(this, _phoneVisibility_extraInitializers), __runInitializers(this, _locationVisibility_initializers, void 0));
                this.dateOfBirthVisibility = (__runInitializers(this, _locationVisibility_extraInitializers), __runInitializers(this, _dateOfBirthVisibility_initializers, void 0));
                this.whoCanSendFriendRequests = (__runInitializers(this, _dateOfBirthVisibility_extraInitializers), __runInitializers(this, _whoCanSendFriendRequests_initializers, void 0));
                this.whoCanMessageMe = (__runInitializers(this, _whoCanSendFriendRequests_extraInitializers), __runInitializers(this, _whoCanMessageMe_initializers, void 0));
                this.allowCameraAccess = (__runInitializers(this, _whoCanMessageMe_extraInitializers), __runInitializers(this, _allowCameraAccess_initializers, void 0));
                this.allowMicrophoneAccess = (__runInitializers(this, _allowCameraAccess_extraInitializers), __runInitializers(this, _allowMicrophoneAccess_initializers, void 0));
                this.createdAt = (__runInitializers(this, _allowMicrophoneAccess_extraInitializers), __runInitializers(this, _createdAt_initializers, void 0));
                this.updatedAt = (__runInitializers(this, _createdAt_extraInitializers), __runInitializers(this, _updatedAt_initializers, void 0));
                __runInitializers(this, _updatedAt_extraInitializers);
            }
            return ProfilePrivacyResponse;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _id_decorators = [(0, class_transformer_1.Expose)()];
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
            _allowCameraAccess_decorators = [(0, class_transformer_1.Expose)()];
            _allowMicrophoneAccess_decorators = [(0, class_transformer_1.Expose)()];
            _createdAt_decorators = [(0, class_transformer_1.Expose)()];
            _updatedAt_decorators = [(0, class_transformer_1.Expose)()];
            __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: function (obj) { return "id" in obj; }, get: function (obj) { return obj.id; }, set: function (obj, value) { obj.id = value; } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
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
            __esDecorate(null, null, _allowCameraAccess_decorators, { kind: "field", name: "allowCameraAccess", static: false, private: false, access: { has: function (obj) { return "allowCameraAccess" in obj; }, get: function (obj) { return obj.allowCameraAccess; }, set: function (obj, value) { obj.allowCameraAccess = value; } }, metadata: _metadata }, _allowCameraAccess_initializers, _allowCameraAccess_extraInitializers);
            __esDecorate(null, null, _allowMicrophoneAccess_decorators, { kind: "field", name: "allowMicrophoneAccess", static: false, private: false, access: { has: function (obj) { return "allowMicrophoneAccess" in obj; }, get: function (obj) { return obj.allowMicrophoneAccess; }, set: function (obj, value) { obj.allowMicrophoneAccess = value; } }, metadata: _metadata }, _allowMicrophoneAccess_initializers, _allowMicrophoneAccess_extraInitializers);
            __esDecorate(null, null, _createdAt_decorators, { kind: "field", name: "createdAt", static: false, private: false, access: { has: function (obj) { return "createdAt" in obj; }, get: function (obj) { return obj.createdAt; }, set: function (obj, value) { obj.createdAt = value; } }, metadata: _metadata }, _createdAt_initializers, _createdAt_extraInitializers);
            __esDecorate(null, null, _updatedAt_decorators, { kind: "field", name: "updatedAt", static: false, private: false, access: { has: function (obj) { return "updatedAt" in obj; }, get: function (obj) { return obj.updatedAt; }, set: function (obj, value) { obj.updatedAt = value; } }, metadata: _metadata }, _updatedAt_initializers, _updatedAt_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
var ProfileResponse = function () {
    var _a;
    var _id_decorators;
    var _id_initializers = [];
    var _id_extraInitializers = [];
    var _userId_decorators;
    var _userId_initializers = [];
    var _userId_extraInitializers = [];
    var _bio_decorators;
    var _bio_initializers = [];
    var _bio_extraInitializers = [];
    var _coverPhoto_decorators;
    var _coverPhoto_initializers = [];
    var _coverPhoto_extraInitializers = [];
    var _dateOfBirth_decorators;
    var _dateOfBirth_initializers = [];
    var _dateOfBirth_extraInitializers = [];
    var _location_decorators;
    var _location_initializers = [];
    var _location_extraInitializers = [];
    var _website_decorators;
    var _website_initializers = [];
    var _website_extraInitializers = [];
    var _phoneNumber_decorators;
    var _phoneNumber_initializers = [];
    var _phoneNumber_extraInitializers = [];
    var _user_decorators;
    var _user_initializers = [];
    var _user_extraInitializers = [];
    var _privacySettings_decorators;
    var _privacySettings_initializers = [];
    var _privacySettings_extraInitializers = [];
    var _createdAt_decorators;
    var _createdAt_initializers = [];
    var _createdAt_extraInitializers = [];
    var _updatedAt_decorators;
    var _updatedAt_initializers = [];
    var _updatedAt_extraInitializers = [];
    return _a = /** @class */ (function () {
            function ProfileResponse() {
                this.id = __runInitializers(this, _id_initializers, void 0);
                this.userId = (__runInitializers(this, _id_extraInitializers), __runInitializers(this, _userId_initializers, void 0));
                this.bio = (__runInitializers(this, _userId_extraInitializers), __runInitializers(this, _bio_initializers, void 0));
                this.coverPhoto = (__runInitializers(this, _bio_extraInitializers), __runInitializers(this, _coverPhoto_initializers, void 0));
                this.dateOfBirth = (__runInitializers(this, _coverPhoto_extraInitializers), __runInitializers(this, _dateOfBirth_initializers, void 0));
                this.location = (__runInitializers(this, _dateOfBirth_extraInitializers), __runInitializers(this, _location_initializers, void 0));
                this.website = (__runInitializers(this, _location_extraInitializers), __runInitializers(this, _website_initializers, void 0));
                this.phoneNumber = (__runInitializers(this, _website_extraInitializers), __runInitializers(this, _phoneNumber_initializers, void 0));
                this.user = (__runInitializers(this, _phoneNumber_extraInitializers), __runInitializers(this, _user_initializers, void 0));
                this.privacySettings = (__runInitializers(this, _user_extraInitializers), __runInitializers(this, _privacySettings_initializers, void 0));
                this.createdAt = (__runInitializers(this, _privacySettings_extraInitializers), __runInitializers(this, _createdAt_initializers, void 0));
                this.updatedAt = (__runInitializers(this, _createdAt_extraInitializers), __runInitializers(this, _updatedAt_initializers, void 0));
                __runInitializers(this, _updatedAt_extraInitializers);
            }
            return ProfileResponse;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _id_decorators = [(0, class_transformer_1.Expose)()];
            _userId_decorators = [(0, class_transformer_1.Expose)()];
            _bio_decorators = [(0, class_transformer_1.Expose)()];
            _coverPhoto_decorators = [(0, class_transformer_1.Expose)()];
            _dateOfBirth_decorators = [(0, class_transformer_1.Expose)()];
            _location_decorators = [(0, class_transformer_1.Expose)()];
            _website_decorators = [(0, class_transformer_1.Expose)()];
            _phoneNumber_decorators = [(0, class_transformer_1.Expose)()];
            _user_decorators = [(0, class_transformer_1.Expose)(), (0, class_transformer_1.Type)(function () { return UserBasicInfo; })];
            _privacySettings_decorators = [(0, class_transformer_1.Expose)(), (0, class_transformer_1.Type)(function () { return ProfilePrivacyResponse; })];
            _createdAt_decorators = [(0, class_transformer_1.Expose)()];
            _updatedAt_decorators = [(0, class_transformer_1.Expose)()];
            __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: function (obj) { return "id" in obj; }, get: function (obj) { return obj.id; }, set: function (obj, value) { obj.id = value; } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
            __esDecorate(null, null, _userId_decorators, { kind: "field", name: "userId", static: false, private: false, access: { has: function (obj) { return "userId" in obj; }, get: function (obj) { return obj.userId; }, set: function (obj, value) { obj.userId = value; } }, metadata: _metadata }, _userId_initializers, _userId_extraInitializers);
            __esDecorate(null, null, _bio_decorators, { kind: "field", name: "bio", static: false, private: false, access: { has: function (obj) { return "bio" in obj; }, get: function (obj) { return obj.bio; }, set: function (obj, value) { obj.bio = value; } }, metadata: _metadata }, _bio_initializers, _bio_extraInitializers);
            __esDecorate(null, null, _coverPhoto_decorators, { kind: "field", name: "coverPhoto", static: false, private: false, access: { has: function (obj) { return "coverPhoto" in obj; }, get: function (obj) { return obj.coverPhoto; }, set: function (obj, value) { obj.coverPhoto = value; } }, metadata: _metadata }, _coverPhoto_initializers, _coverPhoto_extraInitializers);
            __esDecorate(null, null, _dateOfBirth_decorators, { kind: "field", name: "dateOfBirth", static: false, private: false, access: { has: function (obj) { return "dateOfBirth" in obj; }, get: function (obj) { return obj.dateOfBirth; }, set: function (obj, value) { obj.dateOfBirth = value; } }, metadata: _metadata }, _dateOfBirth_initializers, _dateOfBirth_extraInitializers);
            __esDecorate(null, null, _location_decorators, { kind: "field", name: "location", static: false, private: false, access: { has: function (obj) { return "location" in obj; }, get: function (obj) { return obj.location; }, set: function (obj, value) { obj.location = value; } }, metadata: _metadata }, _location_initializers, _location_extraInitializers);
            __esDecorate(null, null, _website_decorators, { kind: "field", name: "website", static: false, private: false, access: { has: function (obj) { return "website" in obj; }, get: function (obj) { return obj.website; }, set: function (obj, value) { obj.website = value; } }, metadata: _metadata }, _website_initializers, _website_extraInitializers);
            __esDecorate(null, null, _phoneNumber_decorators, { kind: "field", name: "phoneNumber", static: false, private: false, access: { has: function (obj) { return "phoneNumber" in obj; }, get: function (obj) { return obj.phoneNumber; }, set: function (obj, value) { obj.phoneNumber = value; } }, metadata: _metadata }, _phoneNumber_initializers, _phoneNumber_extraInitializers);
            __esDecorate(null, null, _user_decorators, { kind: "field", name: "user", static: false, private: false, access: { has: function (obj) { return "user" in obj; }, get: function (obj) { return obj.user; }, set: function (obj, value) { obj.user = value; } }, metadata: _metadata }, _user_initializers, _user_extraInitializers);
            __esDecorate(null, null, _privacySettings_decorators, { kind: "field", name: "privacySettings", static: false, private: false, access: { has: function (obj) { return "privacySettings" in obj; }, get: function (obj) { return obj.privacySettings; }, set: function (obj, value) { obj.privacySettings = value; } }, metadata: _metadata }, _privacySettings_initializers, _privacySettings_extraInitializers);
            __esDecorate(null, null, _createdAt_decorators, { kind: "field", name: "createdAt", static: false, private: false, access: { has: function (obj) { return "createdAt" in obj; }, get: function (obj) { return obj.createdAt; }, set: function (obj, value) { obj.createdAt = value; } }, metadata: _metadata }, _createdAt_initializers, _createdAt_extraInitializers);
            __esDecorate(null, null, _updatedAt_decorators, { kind: "field", name: "updatedAt", static: false, private: false, access: { has: function (obj) { return "updatedAt" in obj; }, get: function (obj) { return obj.updatedAt; }, set: function (obj, value) { obj.updatedAt = value; } }, metadata: _metadata }, _updatedAt_initializers, _updatedAt_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.ProfileResponse = ProfileResponse;
