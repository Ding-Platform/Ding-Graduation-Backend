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
exports.UpdatePrivacyRequest = exports.VisibilityType = void 0;
var class_validator_1 = require("class-validator");
// Define the enum locally since Prisma doesn't export it
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
var UpdatePrivacyRequest = function () {
    var _a;
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
    return _a = /** @class */ (function () {
            function UpdatePrivacyRequest() {
                this.profileVisibility = __runInitializers(this, _profileVisibility_initializers, void 0);
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
                __runInitializers(this, _allowMicrophoneAccess_extraInitializers);
            }
            return UpdatePrivacyRequest;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _profileVisibility_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsEnum)(VisibilityType, {
                    message: 'Profile visibility must be a valid visibility type',
                })];
            _postsVisibility_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsEnum)(VisibilityType, {
                    message: 'Posts visibility must be a valid visibility type',
                })];
            _friendsVisibility_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsEnum)(VisibilityType, {
                    message: 'Friends visibility must be a valid visibility type',
                })];
            _bioVisibility_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsEnum)(VisibilityType, {
                    message: 'Bio visibility must be a valid visibility type',
                })];
            _emailVisibility_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsEnum)(VisibilityType, {
                    message: 'Email visibility must be a valid visibility type',
                })];
            _phoneVisibility_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsEnum)(VisibilityType, {
                    message: 'Phone visibility must be a valid visibility type',
                })];
            _locationVisibility_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsEnum)(VisibilityType, {
                    message: 'Location visibility must be a valid visibility type',
                })];
            _dateOfBirthVisibility_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsEnum)(VisibilityType, {
                    message: 'Date of birth visibility must be a valid visibility type',
                })];
            _whoCanSendFriendRequests_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsEnum)(VisibilityType, {
                    message: 'Friend request permission must be a valid visibility type',
                })];
            _whoCanMessageMe_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsEnum)(VisibilityType, {
                    message: 'Message permission must be a valid visibility type',
                })];
            _allowCameraAccess_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsBoolean)()];
            _allowMicrophoneAccess_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsBoolean)()];
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
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.UpdatePrivacyRequest = UpdatePrivacyRequest;
