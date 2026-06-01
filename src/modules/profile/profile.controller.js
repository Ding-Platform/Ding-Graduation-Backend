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
exports.ProfileController = void 0;
var common_1 = require("@nestjs/common");
var platform_express_1 = require("@nestjs/platform-express");
var jwt_guard_1 = require("../../common/guards/strategy.guards/jwt.guard");
var serialize_interceptor_1 = require("../../common/interceptors/serialize.interceptor");
var file_cleanup_interceptor_1 = require("../../common/interceptors/file-cleanup.interceptor");
var profile_response_1 = require("./dtos/response/profile.response");
var upload_response_1 = require("./dtos/response/upload.response");
var search_profile_response_1 = require("./dtos/response/search-profile.response");
var swagger_1 = require("@nestjs/swagger");
var ProfileController = function () {
    var _classDecorators = [(0, swagger_1.ApiTags)('Profile'), (0, common_1.Controller)('profile')];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _instanceExtraInitializers = [];
    var _searchProfiles_decorators;
    var _getCurrentProfile_decorators;
    var _getProfile_decorators;
    var _updateProfile_decorators;
    var _uploadProfilePicture_decorators;
    var _uploadCoverPhoto_decorators;
    var _updatePrivacySettings_decorators;
    var _deleteProfile_decorators;
    var ProfileController = _classThis = /** @class */ (function () {
        function ProfileController_1(profileService) {
            this.profileService = (__runInitializers(this, _instanceExtraInitializers), profileService);
        }
        ProfileController_1.prototype.searchProfiles = function (filters) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.profileService.searchProfiles(filters)];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        ProfileController_1.prototype.getCurrentProfile = function (user) {
            return __awaiter(this, void 0, void 0, function () {
                var userId;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            userId = user.id;
                            return [4 /*yield*/, this.profileService.getProfile(userId, userId)];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        ProfileController_1.prototype.getProfile = function (userId, request) {
            return __awaiter(this, void 0, void 0, function () {
                var requesterId;
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            requesterId = (_a = request.user) === null || _a === void 0 ? void 0 : _a.id;
                            return [4 /*yield*/, this.profileService.getProfile(userId, requesterId)];
                        case 1: return [2 /*return*/, _b.sent()];
                    }
                });
            });
        };
        ProfileController_1.prototype.updateProfile = function (user, data) {
            return __awaiter(this, void 0, void 0, function () {
                var userId;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            userId = user.id;
                            return [4 /*yield*/, this.profileService.createOrUpdateProfile(userId, data)];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        ProfileController_1.prototype.uploadProfilePicture = function (user, file) {
            return __awaiter(this, void 0, void 0, function () {
                var userId;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            userId = user.id;
                            return [4 /*yield*/, this.profileService.uploadProfilePicture(userId, file)];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        ProfileController_1.prototype.uploadCoverPhoto = function (user, file) {
            return __awaiter(this, void 0, void 0, function () {
                var userId;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            userId = user.id;
                            return [4 /*yield*/, this.profileService.uploadCoverPhoto(userId, file)];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        ProfileController_1.prototype.updatePrivacySettings = function (user, data) {
            return __awaiter(this, void 0, void 0, function () {
                var userId;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            userId = user.id;
                            return [4 /*yield*/, this.profileService.updatePrivacySettings(userId, data)];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        ProfileController_1.prototype.deleteProfile = function (user) {
            return __awaiter(this, void 0, void 0, function () {
                var userId;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            userId = user.id;
                            return [4 /*yield*/, this.profileService.deleteProfile(userId)];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        return ProfileController_1;
    }());
    __setFunctionName(_classThis, "ProfileController");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _searchProfiles_decorators = [(0, common_1.Get)('search'), (0, common_1.HttpCode)(common_1.HttpStatus.OK), (0, serialize_interceptor_1.Serialize)(search_profile_response_1.SearchProfileResponse, profile_response_1.ProfileResponse), (0, swagger_1.ApiOperation)({ summary: 'Search public profiles (no auth required)' })];
        _getCurrentProfile_decorators = [(0, common_1.Get)('me'), (0, common_1.UseGuards)(jwt_guard_1.JwtAuthenticationGuard), (0, common_1.HttpCode)(common_1.HttpStatus.OK), (0, serialize_interceptor_1.Serialize)(profile_response_1.ProfileResponse), (0, swagger_1.ApiBearerAuth)('JWT-auth'), (0, swagger_1.ApiOperation)({
                summary: 'Get current user profile (requires authentication)',
            })];
        _getProfile_decorators = [(0, common_1.Get)(':userId'), (0, common_1.HttpCode)(common_1.HttpStatus.OK), (0, serialize_interceptor_1.Serialize)(profile_response_1.ProfileResponse), (0, swagger_1.ApiOperation)({
                summary: 'Get user profile by ID (public profiles accessible without auth)',
            })];
        _updateProfile_decorators = [(0, common_1.Put)(), (0, common_1.UseGuards)(jwt_guard_1.JwtAuthenticationGuard), (0, common_1.HttpCode)(common_1.HttpStatus.OK), (0, serialize_interceptor_1.Serialize)(profile_response_1.ProfileResponse), (0, swagger_1.ApiBearerAuth)('JWT-auth'), (0, swagger_1.ApiOperation)({
                summary: 'Create or update own profile (requires authentication)',
            })];
        _uploadProfilePicture_decorators = [(0, common_1.Patch)('picture'), (0, common_1.UseGuards)(jwt_guard_1.JwtAuthenticationGuard), (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file'), file_cleanup_interceptor_1.FileCleanupInterceptor), (0, common_1.HttpCode)(common_1.HttpStatus.OK), (0, serialize_interceptor_1.Serialize)(upload_response_1.UploadResponse), (0, swagger_1.ApiBearerAuth)('JWT-auth'), (0, swagger_1.ApiOperation)({ summary: 'Upload profile picture (requires authentication)' }), (0, swagger_1.ApiConsumes)('multipart/form-data'), (0, swagger_1.ApiBody)({
                schema: {
                    type: 'object',
                    properties: {
                        file: {
                            type: 'string',
                            format: 'binary',
                        },
                    },
                },
            })];
        _uploadCoverPhoto_decorators = [(0, common_1.Patch)('cover'), (0, common_1.UseGuards)(jwt_guard_1.JwtAuthenticationGuard), (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file'), file_cleanup_interceptor_1.FileCleanupInterceptor), (0, common_1.HttpCode)(common_1.HttpStatus.OK), (0, serialize_interceptor_1.Serialize)(upload_response_1.UploadResponse), (0, swagger_1.ApiBearerAuth)('JWT-auth'), (0, swagger_1.ApiOperation)({ summary: 'Upload cover photo (requires authentication)' }), (0, swagger_1.ApiConsumes)('multipart/form-data'), (0, swagger_1.ApiBody)({
                schema: {
                    type: 'object',
                    properties: {
                        file: {
                            type: 'string',
                            format: 'binary',
                        },
                    },
                },
            })];
        _updatePrivacySettings_decorators = [(0, common_1.Patch)('privacy'), (0, common_1.UseGuards)(jwt_guard_1.JwtAuthenticationGuard), (0, common_1.HttpCode)(common_1.HttpStatus.OK), (0, serialize_interceptor_1.Serialize)(profile_response_1.ProfileResponse), (0, swagger_1.ApiBearerAuth)('JWT-auth'), (0, swagger_1.ApiOperation)({
                summary: 'Update privacy settings (requires authentication)',
            })];
        _deleteProfile_decorators = [(0, common_1.Delete)(), (0, common_1.UseGuards)(jwt_guard_1.JwtAuthenticationGuard), (0, common_1.HttpCode)(common_1.HttpStatus.OK), (0, swagger_1.ApiBearerAuth)('JWT-auth'), (0, swagger_1.ApiOperation)({ summary: 'Delete own profile (requires authentication)' })];
        __esDecorate(_classThis, null, _searchProfiles_decorators, { kind: "method", name: "searchProfiles", static: false, private: false, access: { has: function (obj) { return "searchProfiles" in obj; }, get: function (obj) { return obj.searchProfiles; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getCurrentProfile_decorators, { kind: "method", name: "getCurrentProfile", static: false, private: false, access: { has: function (obj) { return "getCurrentProfile" in obj; }, get: function (obj) { return obj.getCurrentProfile; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getProfile_decorators, { kind: "method", name: "getProfile", static: false, private: false, access: { has: function (obj) { return "getProfile" in obj; }, get: function (obj) { return obj.getProfile; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _updateProfile_decorators, { kind: "method", name: "updateProfile", static: false, private: false, access: { has: function (obj) { return "updateProfile" in obj; }, get: function (obj) { return obj.updateProfile; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _uploadProfilePicture_decorators, { kind: "method", name: "uploadProfilePicture", static: false, private: false, access: { has: function (obj) { return "uploadProfilePicture" in obj; }, get: function (obj) { return obj.uploadProfilePicture; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _uploadCoverPhoto_decorators, { kind: "method", name: "uploadCoverPhoto", static: false, private: false, access: { has: function (obj) { return "uploadCoverPhoto" in obj; }, get: function (obj) { return obj.uploadCoverPhoto; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _updatePrivacySettings_decorators, { kind: "method", name: "updatePrivacySettings", static: false, private: false, access: { has: function (obj) { return "updatePrivacySettings" in obj; }, get: function (obj) { return obj.updatePrivacySettings; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _deleteProfile_decorators, { kind: "method", name: "deleteProfile", static: false, private: false, access: { has: function (obj) { return "deleteProfile" in obj; }, get: function (obj) { return obj.deleteProfile; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ProfileController = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ProfileController = _classThis;
}();
exports.ProfileController = ProfileController;
