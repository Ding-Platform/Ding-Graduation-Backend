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
exports.UpdateProfileRequest = void 0;
var class_validator_1 = require("class-validator");
var class_transformer_1 = require("class-transformer");
var custom_validators_1 = require("../../../../common/validators/custom-validators");
var profile_constants_1 = require("../../../../common/constants/profile.constants");
var profile_error_messages_constant_1 = require("../../../../common/constants/profile-error-messages.constant");
var UpdateProfileRequest = function () {
    var _a;
    var _bio_decorators;
    var _bio_initializers = [];
    var _bio_extraInitializers = [];
    var _location_decorators;
    var _location_initializers = [];
    var _location_extraInitializers = [];
    var _website_decorators;
    var _website_initializers = [];
    var _website_extraInitializers = [];
    var _phoneNumber_decorators;
    var _phoneNumber_initializers = [];
    var _phoneNumber_extraInitializers = [];
    var _dateOfBirth_decorators;
    var _dateOfBirth_initializers = [];
    var _dateOfBirth_extraInitializers = [];
    return _a = /** @class */ (function () {
            function UpdateProfileRequest() {
                this.bio = __runInitializers(this, _bio_initializers, void 0);
                this.location = (__runInitializers(this, _bio_extraInitializers), __runInitializers(this, _location_initializers, void 0));
                this.website = (__runInitializers(this, _location_extraInitializers), __runInitializers(this, _website_initializers, void 0));
                this.phoneNumber = (__runInitializers(this, _website_extraInitializers), __runInitializers(this, _phoneNumber_initializers, void 0));
                this.dateOfBirth = (__runInitializers(this, _phoneNumber_extraInitializers), __runInitializers(this, _dateOfBirth_initializers, void 0));
                __runInitializers(this, _dateOfBirth_extraInitializers);
            }
            return UpdateProfileRequest;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _bio_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)(), (0, class_validator_1.MaxLength)(profile_constants_1.PROFILE_CONSTANTS.FIELDS.BIO_MAX_LENGTH, {
                    message: profile_error_messages_constant_1.PROFILE_ERROR_MESSAGES.BIO_TOO_LONG,
                }), (0, class_transformer_1.Transform)(function (_b) {
                    var value = _b.value;
                    return typeof value === 'string' ? value.trim() : value;
                })];
            _location_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)(), (0, class_validator_1.MaxLength)(profile_constants_1.PROFILE_CONSTANTS.FIELDS.LOCATION_MAX_LENGTH, {
                    message: profile_error_messages_constant_1.PROFILE_ERROR_MESSAGES.LOCATION_TOO_LONG,
                }), (0, class_transformer_1.Transform)(function (_b) {
                    var value = _b.value;
                    return typeof value === 'string' ? value.trim() : value;
                })];
            _website_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsUrl)({}, { message: profile_error_messages_constant_1.PROFILE_ERROR_MESSAGES.INVALID_WEBSITE_URL }), (0, class_validator_1.MaxLength)(profile_constants_1.PROFILE_CONSTANTS.FIELDS.WEBSITE_MAX_LENGTH)];
            _phoneNumber_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)(), (0, class_validator_1.MaxLength)(profile_constants_1.PROFILE_CONSTANTS.FIELDS.PHONE_MAX_LENGTH), (0, class_transformer_1.Transform)(function (_b) {
                    var value = _b.value;
                    return typeof value === 'string' ? value.trim() : value;
                })];
            _dateOfBirth_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsDateString)({}, { message: profile_error_messages_constant_1.PROFILE_ERROR_MESSAGES.INVALID_DATE_OF_BIRTH }), (0, custom_validators_1.IsValidDateOfBirth)(), (0, custom_validators_1.IsAdult)()];
            __esDecorate(null, null, _bio_decorators, { kind: "field", name: "bio", static: false, private: false, access: { has: function (obj) { return "bio" in obj; }, get: function (obj) { return obj.bio; }, set: function (obj, value) { obj.bio = value; } }, metadata: _metadata }, _bio_initializers, _bio_extraInitializers);
            __esDecorate(null, null, _location_decorators, { kind: "field", name: "location", static: false, private: false, access: { has: function (obj) { return "location" in obj; }, get: function (obj) { return obj.location; }, set: function (obj, value) { obj.location = value; } }, metadata: _metadata }, _location_initializers, _location_extraInitializers);
            __esDecorate(null, null, _website_decorators, { kind: "field", name: "website", static: false, private: false, access: { has: function (obj) { return "website" in obj; }, get: function (obj) { return obj.website; }, set: function (obj, value) { obj.website = value; } }, metadata: _metadata }, _website_initializers, _website_extraInitializers);
            __esDecorate(null, null, _phoneNumber_decorators, { kind: "field", name: "phoneNumber", static: false, private: false, access: { has: function (obj) { return "phoneNumber" in obj; }, get: function (obj) { return obj.phoneNumber; }, set: function (obj, value) { obj.phoneNumber = value; } }, metadata: _metadata }, _phoneNumber_initializers, _phoneNumber_extraInitializers);
            __esDecorate(null, null, _dateOfBirth_decorators, { kind: "field", name: "dateOfBirth", static: false, private: false, access: { has: function (obj) { return "dateOfBirth" in obj; }, get: function (obj) { return obj.dateOfBirth; }, set: function (obj, value) { obj.dateOfBirth = value; } }, metadata: _metadata }, _dateOfBirth_initializers, _dateOfBirth_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.UpdateProfileRequest = UpdateProfileRequest;
