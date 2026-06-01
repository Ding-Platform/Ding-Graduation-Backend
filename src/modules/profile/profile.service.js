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
exports.ProfileService = void 0;
// src/modules/profile/profile.service.ts
var common_1 = require("@nestjs/common");
var generic_http_exception_1 = require("../../common/application/exceptions/generic-http-exception");
var profile_error_messages_constant_1 = require("../../common/constants/profile-error-messages.constant");
var profile_constants_1 = require("../../common/constants/profile.constants");
var ProfileService = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var ProfileService = _classThis = /** @class */ (function () {
        function ProfileService_1(prisma, cloudinaryService, socialService) {
            this.prisma = prisma;
            this.cloudinaryService = cloudinaryService;
            this.socialService = socialService;
        }
        /**
         * Get user profile by userId
         * Applies privacy filtering if requester is not the owner
         */
        ProfileService_1.prototype.getProfile = function (userId, requesterId) {
            return __awaiter(this, void 0, void 0, function () {
                var profile;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.profile.findUnique({
                                where: { userId: userId },
                                include: {
                                    privacySettings: true,
                                    user: {
                                        select: {
                                            id: true,
                                            name: true,
                                            email: true,
                                            image: true,
                                        },
                                    },
                                },
                            })];
                        case 1:
                            profile = _a.sent();
                            if (!profile) {
                                throw new generic_http_exception_1.GenericHttpException(profile_error_messages_constant_1.PROFILE_ERROR_MESSAGES.PROFILE_NOT_FOUND, common_1.HttpStatus.NOT_FOUND);
                            }
                            if (!(requesterId && requesterId !== userId)) return [3 /*break*/, 3];
                            return [4 /*yield*/, this.checkProfileAccess(profile, requesterId)];
                        case 2:
                            _a.sent();
                            _a.label = 3;
                        case 3:
                            if (!(requesterId !== userId)) return [3 /*break*/, 5];
                            return [4 /*yield*/, this.filterProfileData(profile, requesterId)];
                        case 4: return [2 /*return*/, _a.sent()];
                        case 5: return [2 /*return*/, profile];
                    }
                });
            });
        };
        /**
         * Create or update user profile
         * Auto-creates privacy settings with defaults if new profile
         */
        ProfileService_1.prototype.createOrUpdateProfile = function (userId, data) {
            return __awaiter(this, void 0, void 0, function () {
                var existingProfile, profile, error_1, error_2;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            existingProfile = null;
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 10, , 11]);
                            return [4 /*yield*/, this.prisma.profile.findUnique({
                                    where: { userId: userId },
                                })];
                        case 2:
                            existingProfile = _a.sent();
                            if (!existingProfile) return [3 /*break*/, 4];
                            return [4 /*yield*/, this.prisma.profile.update({
                                    where: { userId: userId },
                                    data: {
                                        bio: data.bio,
                                        location: data.location,
                                        website: data.website,
                                        phoneNumber: data.phoneNumber,
                                        dateOfBirth: data.dateOfBirth,
                                    },
                                    include: {
                                        privacySettings: true,
                                        user: {
                                            select: {
                                                id: true,
                                                name: true,
                                                email: true,
                                                image: true,
                                            },
                                        },
                                    },
                                })];
                        case 3: 
                        // Update existing profile
                        return [2 /*return*/, _a.sent()];
                        case 4: return [4 /*yield*/, this.prisma.profile.create({
                                data: {
                                    userId: userId,
                                    bio: data.bio,
                                    location: data.location,
                                    website: data.website,
                                    phoneNumber: data.phoneNumber,
                                    dateOfBirth: data.dateOfBirth,
                                    privacySettings: {
                                        create: this.getDefaultPrivacySettings(),
                                    },
                                },
                                include: {
                                    privacySettings: true,
                                    user: {
                                        select: {
                                            id: true,
                                            name: true,
                                            email: true,
                                            image: true,
                                        },
                                    },
                                },
                            })];
                        case 5:
                            profile = _a.sent();
                            if (!this.socialService.isGraphConnected()) return [3 /*break*/, 9];
                            _a.label = 6;
                        case 6:
                            _a.trys.push([6, 8, , 9]);
                            return [4 /*yield*/, this.socialService.createUserNode(profile.user.id)];
                        case 7:
                            _a.sent();
                            return [3 /*break*/, 9];
                        case 8:
                            error_1 = _a.sent();
                            // Log error but don't fail profile creation if Neo4j fails
                            console.error('Failed to create Neo4j node for user:', error_1);
                            return [3 /*break*/, 9];
                        case 9: return [2 /*return*/, profile];
                        case 10:
                            error_2 = _a.sent();
                            console.error('Profile create/update error:', error_2);
                            throw new generic_http_exception_1.GenericHttpException(existingProfile
                                ? profile_error_messages_constant_1.PROFILE_ERROR_MESSAGES.PROFILE_UPDATE_FAILED
                                : profile_error_messages_constant_1.PROFILE_ERROR_MESSAGES.PROFILE_CREATE_FAILED, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
                        case 11: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Upload profile picture to Cloudinary
         * Updates user.image field and ensures profile exists
         */
        ProfileService_1.prototype.uploadProfilePicture = function (userId, file) {
            return __awaiter(this, void 0, void 0, function () {
                var imageUrl, error_3;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 4, , 5]);
                            return [4 /*yield*/, this.cloudinaryService.uploadProfilePicture(file, userId)];
                        case 1:
                            imageUrl = _a.sent();
                            // Update user's image field
                            return [4 /*yield*/, this.prisma.user.update({
                                    where: { id: userId },
                                    data: { image: imageUrl },
                                })];
                        case 2:
                            // Update user's image field
                            _a.sent();
                            // Ensure profile exists (create if needed)
                            return [4 /*yield*/, this.ensureProfileExists(userId)];
                        case 3:
                            // Ensure profile exists (create if needed)
                            _a.sent();
                            return [2 /*return*/, { imageUrl: imageUrl }];
                        case 4:
                            error_3 = _a.sent();
                            if (error_3 instanceof generic_http_exception_1.GenericHttpException ||
                                error_3 instanceof common_1.HttpException) {
                                throw error_3;
                            }
                            console.error('Profile picture upload error:', error_3);
                            throw new generic_http_exception_1.GenericHttpException(profile_error_messages_constant_1.PROFILE_ERROR_MESSAGES.UPLOAD_FAILED, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
                        case 5: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Upload cover photo to Cloudinary
         * Updates profile.coverPhoto field and ensures profile exists
         */
        ProfileService_1.prototype.uploadCoverPhoto = function (userId, file) {
            return __awaiter(this, void 0, void 0, function () {
                var coverPhotoUrl, profile, error_4;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 4, , 5]);
                            return [4 /*yield*/, this.cloudinaryService.uploadCoverPhoto(file, userId)];
                        case 1:
                            coverPhotoUrl = _a.sent();
                            return [4 /*yield*/, this.ensureProfileExists(userId)];
                        case 2:
                            profile = _a.sent();
                            // Update profile's coverPhoto field
                            return [4 /*yield*/, this.prisma.profile.update({
                                    where: { id: profile.id },
                                    data: { coverPhoto: coverPhotoUrl },
                                })];
                        case 3:
                            // Update profile's coverPhoto field
                            _a.sent();
                            return [2 /*return*/, { coverPhotoUrl: coverPhotoUrl }];
                        case 4:
                            error_4 = _a.sent();
                            if (error_4 instanceof generic_http_exception_1.GenericHttpException ||
                                error_4 instanceof common_1.HttpException) {
                                throw error_4;
                            }
                            console.error('Cover photo upload error:', error_4);
                            throw new generic_http_exception_1.GenericHttpException(profile_error_messages_constant_1.PROFILE_ERROR_MESSAGES.UPLOAD_FAILED, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
                        case 5: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Update profile privacy settings
         * Supports partial updates - only provided fields are updated
         */
        ProfileService_1.prototype.updatePrivacySettings = function (userId, data) {
            return __awaiter(this, void 0, void 0, function () {
                var profile, error_5;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 3, , 4]);
                            return [4 /*yield*/, this.prisma.profile.findUnique({
                                    where: { userId: userId },
                                })];
                        case 1:
                            profile = _a.sent();
                            if (!profile) {
                                throw new generic_http_exception_1.GenericHttpException(profile_error_messages_constant_1.PROFILE_ERROR_MESSAGES.PROFILE_NOT_FOUND, common_1.HttpStatus.NOT_FOUND);
                            }
                            return [4 /*yield*/, this.prisma.profilePrivacy.upsert({
                                    where: { profileId: profile.id },
                                    create: __assign({ profileId: profile.id }, data),
                                    update: data,
                                })];
                        case 2: 
                        // Upsert privacy settings (create if not exists, update if exists)
                        return [2 /*return*/, _a.sent()];
                        case 3:
                            error_5 = _a.sent();
                            if (error_5 instanceof generic_http_exception_1.GenericHttpException) {
                                throw error_5;
                            }
                            console.error('Privacy update error:', error_5);
                            throw new generic_http_exception_1.GenericHttpException(profile_error_messages_constant_1.PROFILE_ERROR_MESSAGES.PRIVACY_UPDATE_FAILED, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
                        case 4: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Search public profiles with filters and pagination
         * Only returns profiles with PUBLIC or EVERYONE visibility
         */
        ProfileService_1.prototype.searchProfiles = function (filters) {
            return __awaiter(this, void 0, void 0, function () {
                var query, location, _a, page, _b, limit, andConditions, where, skip, _c, profiles, total;
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0:
                            query = filters.query, location = filters.location, _a = filters.page, page = _a === void 0 ? 1 : _a, _b = filters.limit, limit = _b === void 0 ? 10 : _b;
                            andConditions = [
                                {
                                    privacySettings: {
                                        is: {
                                            profileVisibility: {
                                                in: ['PUBLIC', 'EVERYONE'],
                                            },
                                        },
                                    },
                                },
                            ];
                            // Add search query filter
                            if (query) {
                                andConditions.push({
                                    OR: [
                                        { bio: { contains: query, mode: 'insensitive' } },
                                        { location: { contains: query, mode: 'insensitive' } },
                                        {
                                            user: {
                                                name: { contains: query, mode: 'insensitive' },
                                            },
                                        },
                                    ],
                                });
                            }
                            // Add location filter
                            if (location) {
                                andConditions.push({
                                    location: { contains: location, mode: 'insensitive' },
                                });
                            }
                            where = { AND: andConditions };
                            skip = (page - 1) * limit;
                            return [4 /*yield*/, Promise.all([
                                    this.prisma.profile.findMany({
                                        where: where,
                                        include: {
                                            user: {
                                                select: {
                                                    id: true,
                                                    name: true,
                                                    email: true,
                                                    image: true,
                                                },
                                            },
                                            privacySettings: true,
                                        },
                                        skip: skip,
                                        take: limit,
                                        orderBy: { createdAt: 'desc' },
                                    }),
                                    this.prisma.profile.count({ where: where }),
                                ])];
                        case 1:
                            _c = _d.sent(), profiles = _c[0], total = _c[1];
                            return [2 /*return*/, {
                                    data: profiles,
                                    meta: {
                                        page: page,
                                        limit: limit,
                                        total: total,
                                        totalPages: Math.ceil(total / limit),
                                        hasNextPage: page * limit < total,
                                        hasPreviousPage: page > 1,
                                    },
                                }];
                    }
                });
            });
        };
        /**
         * Delete user profile
         * Cascades to privacy settings
         */
        ProfileService_1.prototype.deleteProfile = function (userId) {
            return __awaiter(this, void 0, void 0, function () {
                var profile, error_6;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 3, , 4]);
                            return [4 /*yield*/, this.prisma.profile.findUnique({
                                    where: { userId: userId },
                                })];
                        case 1:
                            profile = _a.sent();
                            if (!profile) {
                                throw new generic_http_exception_1.GenericHttpException(profile_error_messages_constant_1.PROFILE_ERROR_MESSAGES.PROFILE_NOT_FOUND, common_1.HttpStatus.NOT_FOUND);
                            }
                            // Delete profile (cascades to privacy settings via schema)
                            return [4 /*yield*/, this.prisma.profile.delete({
                                    where: { id: profile.id },
                                })];
                        case 2:
                            // Delete profile (cascades to privacy settings via schema)
                            _a.sent();
                            return [2 /*return*/, { success: true }];
                        case 3:
                            error_6 = _a.sent();
                            if (error_6 instanceof generic_http_exception_1.GenericHttpException) {
                                throw error_6;
                            }
                            console.error('Profile delete error:', error_6);
                            throw new generic_http_exception_1.GenericHttpException(profile_error_messages_constant_1.PROFILE_ERROR_MESSAGES.PROFILE_DELETE_FAILED, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
                        case 4: return [2 /*return*/];
                    }
                });
            });
        };
        // ============================================================================
        // PRIVATE HELPER METHODS
        // ============================================================================
        /**
         * Ensures profile exists for user, creates with defaults if not
         * Used when uploading images before profile is created
         */
        ProfileService_1.prototype.ensureProfileExists = function (userId) {
            return __awaiter(this, void 0, void 0, function () {
                var profile;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.profile.findUnique({
                                where: { userId: userId },
                            })];
                        case 1:
                            profile = _a.sent();
                            if (!!profile) return [3 /*break*/, 3];
                            return [4 /*yield*/, this.prisma.profile.create({
                                    data: {
                                        userId: userId,
                                        privacySettings: {
                                            create: this.getDefaultPrivacySettings(),
                                        },
                                    },
                                })];
                        case 2:
                            profile = _a.sent();
                            _a.label = 3;
                        case 3: return [2 /*return*/, profile];
                    }
                });
            });
        };
        /**
         * Check if requester has permission to view profile
         * Throws GenericHttpException if access denied
         */
        ProfileService_1.prototype.checkProfileAccess = function (profile, requesterId) {
            return __awaiter(this, void 0, void 0, function () {
                var visibility, areFriends;
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            visibility = (_a = profile.privacySettings) === null || _a === void 0 ? void 0 : _a.profileVisibility;
                            // Allow access for PUBLIC/EVERYONE profiles
                            if (visibility === 'PUBLIC' || visibility === 'EVERYONE') {
                                return [2 /*return*/];
                            }
                            // Deny access for PRIVATE/ONLY_ME profiles
                            if (visibility === 'PRIVATE' || visibility === 'ONLY_ME') {
                                throw new generic_http_exception_1.GenericHttpException(profile_error_messages_constant_1.PROFILE_ERROR_MESSAGES.UNAUTHORIZED_ACCESS, common_1.HttpStatus.FORBIDDEN);
                            }
                            if (!(visibility === 'FRIENDS')) return [3 /*break*/, 2];
                            return [4 /*yield*/, this.socialService.areFriends(profile.userId, requesterId)];
                        case 1:
                            areFriends = _b.sent();
                            if (!areFriends) {
                                throw new generic_http_exception_1.GenericHttpException(profile_error_messages_constant_1.PROFILE_ERROR_MESSAGES.UNAUTHORIZED_ACCESS, common_1.HttpStatus.FORBIDDEN);
                            }
                            _b.label = 2;
                        case 2: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Filter profile data based on privacy settings
         * Removes fields that requester doesn't have permission to view
         */
        ProfileService_1.prototype.filterProfileData = function (profile, requesterId) {
            return __awaiter(this, void 0, void 0, function () {
                var privacy, filtered;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            privacy = profile.privacySettings;
                            filtered = __assign(__assign({}, profile), { user: __assign(__assign({}, profile.user), { email: profile.user.email }) });
                            if (!privacy)
                                return [2 /*return*/, filtered];
                            return [4 /*yield*/, this.canViewField(privacy.bioVisibility, profile.userId, requesterId)];
                        case 1:
                            // Filter bio based on visibility
                            if (!(_a.sent())) {
                                filtered.bio = null;
                            }
                            return [4 /*yield*/, this.canViewField(privacy.emailVisibility, profile.userId, requesterId)];
                        case 2:
                            // Filter email based on visibility
                            if (!(_a.sent())) {
                                filtered.user = __assign(__assign({}, filtered.user), { email: null });
                            }
                            return [4 /*yield*/, this.canViewField(privacy.phoneVisibility, profile.userId, requesterId)];
                        case 3:
                            // Filter phone based on visibility
                            if (!(_a.sent())) {
                                filtered.phoneNumber = null;
                            }
                            return [4 /*yield*/, this.canViewField(privacy.locationVisibility, profile.userId, requesterId)];
                        case 4:
                            // Filter location based on visibility
                            if (!(_a.sent())) {
                                filtered.location = null;
                            }
                            return [4 /*yield*/, this.canViewField(privacy.dateOfBirthVisibility, profile.userId, requesterId)];
                        case 5:
                            // Filter date of birth based on visibility
                            if (!(_a.sent())) {
                                filtered.dateOfBirth = null;
                            }
                            return [2 /*return*/, filtered];
                    }
                });
            });
        };
        /**
         * Check if requester can view a specific field based on visibility setting
         */
        ProfileService_1.prototype.canViewField = function (visibility, ownerId, requesterId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            // Owner can always see their own fields
                            if (!requesterId || requesterId === ownerId)
                                return [2 /*return*/, true];
                            // PUBLIC/EVERYONE = visible to all
                            if (visibility === 'PUBLIC' || visibility === 'EVERYONE')
                                return [2 /*return*/, true];
                            // PRIVATE/ONLY_ME = only owner
                            if (visibility === 'PRIVATE' || visibility === 'ONLY_ME')
                                return [2 /*return*/, false];
                            if (!(visibility === 'FRIENDS')) return [3 /*break*/, 2];
                            return [4 /*yield*/, this.socialService.areFriends(ownerId, requesterId)];
                        case 1: return [2 /*return*/, _a.sent()];
                        case 2: 
                        // Default deny
                        return [2 /*return*/, false];
                    }
                });
            });
        };
        ProfileService_1.prototype.getDefaultPrivacySettings = function () {
            return {
                profileVisibility: profile_constants_1.PROFILE_CONSTANTS.PRIVACY
                    .DEFAULT_PROFILE_VISIBILITY,
                postsVisibility: profile_constants_1.PROFILE_CONSTANTS.PRIVACY
                    .DEFAULT_POSTS_VISIBILITY,
                friendsVisibility: profile_constants_1.PROFILE_CONSTANTS.PRIVACY
                    .DEFAULT_FRIENDS_VISIBILITY,
                bioVisibility: profile_constants_1.PROFILE_CONSTANTS.PRIVACY
                    .DEFAULT_BIO_VISIBILITY,
                emailVisibility: profile_constants_1.PROFILE_CONSTANTS.PRIVACY
                    .DEFAULT_EMAIL_VISIBILITY,
                phoneVisibility: profile_constants_1.PROFILE_CONSTANTS.PRIVACY
                    .DEFAULT_PHONE_VISIBILITY,
                locationVisibility: profile_constants_1.PROFILE_CONSTANTS.PRIVACY
                    .DEFAULT_LOCATION_VISIBILITY,
                dateOfBirthVisibility: profile_constants_1.PROFILE_CONSTANTS.PRIVACY
                    .DEFAULT_DOB_VISIBILITY,
                whoCanSendFriendRequests: profile_constants_1.PROFILE_CONSTANTS.PRIVACY
                    .DEFAULT_FRIEND_REQUEST_PERMISSION,
                whoCanMessageMe: profile_constants_1.PROFILE_CONSTANTS.PRIVACY
                    .DEFAULT_MESSAGE_PERMISSION,
            };
        };
        return ProfileService_1;
    }());
    __setFunctionName(_classThis, "ProfileService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ProfileService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ProfileService = _classThis;
}();
exports.ProfileService = ProfileService;
