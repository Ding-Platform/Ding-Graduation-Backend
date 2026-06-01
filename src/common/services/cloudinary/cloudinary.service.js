"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
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
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
exports.CloudinaryService = void 0;
var common_1 = require("@nestjs/common");
var cloudinary_1 = require("cloudinary");
var streamifier = __importStar(require("streamifier"));
var profile_constants_1 = require("../../constants/profile.constants");
var profile_error_messages_constant_1 = require("../../constants/profile-error-messages.constant");
var CloudinaryService = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var CloudinaryService = _classThis = /** @class */ (function () {
        function CloudinaryService_1(configService) {
            this.configService = configService;
            cloudinary_1.v2.config({
                cloud_name: this.configService.get('CLOUDINARY_CLOUD_NAME'),
                api_key: this.configService.get('CLOUDINARY_API_KEY'),
                api_secret: this.configService.get('CLOUDINARY_API_SECRET'),
            });
        }
        CloudinaryService_1.prototype.uploadProfilePicture = function (file, userId) {
            return __awaiter(this, void 0, void 0, function () {
                var result, error_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            // Validate file type
                            if (!profile_constants_1.PROFILE_CONSTANTS.UPLOAD.ALLOWED_IMAGE_TYPES.includes(file.mimetype)) {
                                throw new common_1.BadRequestException(profile_error_messages_constant_1.PROFILE_ERROR_MESSAGES.INVALID_FILE_TYPE);
                            }
                            // Validate file size
                            if (file.size > profile_constants_1.PROFILE_CONSTANTS.UPLOAD.MAX_PROFILE_PICTURE_SIZE) {
                                throw new common_1.BadRequestException(profile_error_messages_constant_1.PROFILE_ERROR_MESSAGES.FILE_TOO_LARGE);
                            }
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, this.uploadStream(file, {
                                    folder: 'profiles/pictures',
                                    public_id: "profile_".concat(userId, "_").concat(Date.now()),
                                    transformation: [
                                        {
                                            width: profile_constants_1.PROFILE_CONSTANTS.UPLOAD.PROFILE_PICTURE_DIMENSIONS.WIDTH,
                                            height: profile_constants_1.PROFILE_CONSTANTS.UPLOAD.PROFILE_PICTURE_DIMENSIONS.HEIGHT,
                                            crop: 'fill',
                                            gravity: 'face',
                                        },
                                        { quality: 'auto', fetch_format: 'auto' },
                                    ],
                                })];
                        case 2:
                            result = _a.sent();
                            return [2 /*return*/, result.secure_url];
                        case 3:
                            error_1 = _a.sent();
                            console.error('Cloudinary upload error:', error_1);
                            throw new common_1.BadRequestException(profile_error_messages_constant_1.PROFILE_ERROR_MESSAGES.UPLOAD_FAILED);
                        case 4: return [2 /*return*/];
                    }
                });
            });
        };
        CloudinaryService_1.prototype.uploadCoverPhoto = function (file, userId) {
            return __awaiter(this, void 0, void 0, function () {
                var result, error_2;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            // Validate file type
                            if (!profile_constants_1.PROFILE_CONSTANTS.UPLOAD.ALLOWED_IMAGE_TYPES.includes(file.mimetype)) {
                                throw new common_1.BadRequestException(profile_error_messages_constant_1.PROFILE_ERROR_MESSAGES.INVALID_FILE_TYPE);
                            }
                            // Validate file size
                            if (file.size > profile_constants_1.PROFILE_CONSTANTS.UPLOAD.MAX_COVER_PHOTO_SIZE) {
                                throw new common_1.BadRequestException(profile_error_messages_constant_1.PROFILE_ERROR_MESSAGES.FILE_TOO_LARGE);
                            }
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, this.uploadStream(file, {
                                    folder: 'profiles/covers',
                                    public_id: "cover_".concat(userId, "_").concat(Date.now()),
                                    transformation: [
                                        {
                                            width: profile_constants_1.PROFILE_CONSTANTS.UPLOAD.COVER_PHOTO_DIMENSIONS.WIDTH,
                                            height: profile_constants_1.PROFILE_CONSTANTS.UPLOAD.COVER_PHOTO_DIMENSIONS.HEIGHT,
                                            crop: 'fill',
                                            gravity: 'center',
                                        },
                                        { quality: 'auto', fetch_format: 'auto' },
                                    ],
                                })];
                        case 2:
                            result = _a.sent();
                            return [2 /*return*/, result.secure_url];
                        case 3:
                            error_2 = _a.sent();
                            console.error('Cloudinary upload error:', error_2);
                            throw new common_1.BadRequestException(profile_error_messages_constant_1.PROFILE_ERROR_MESSAGES.UPLOAD_FAILED);
                        case 4: return [2 /*return*/];
                    }
                });
            });
        };
        CloudinaryService_1.prototype.deleteFile = function (publicId) {
            return __awaiter(this, void 0, void 0, function () {
                var error_3;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, cloudinary_1.v2.uploader.destroy(publicId)];
                        case 1:
                            _a.sent();
                            return [3 /*break*/, 3];
                        case 2:
                            error_3 = _a.sent();
                            console.error('Cloudinary delete error:', error_3);
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Upload a seller KYC document image (ID card front/back, face photo).
         * Stored under marketplace/seller-docs/{userId}/{docType}
         */
        CloudinaryService_1.prototype.uploadSellerDocument = function (file, userId, docType) {
            return __awaiter(this, void 0, void 0, function () {
                var allowedMimes, maxSize, result, error_4;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            allowedMimes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
                            if (!allowedMimes.includes(file.mimetype)) {
                                throw new common_1.BadRequestException("Invalid file type for ".concat(docType, ". Only JPEG, PNG, and WebP are allowed."));
                            }
                            maxSize = 10 * 1024 * 1024;
                            if (file.size > maxSize) {
                                throw new common_1.BadRequestException("".concat(docType, " image must be under 10MB."));
                            }
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, this.uploadStream(file, {
                                    folder: "marketplace/seller-docs/".concat(userId),
                                    public_id: "".concat(docType, "_").concat(userId, "_").concat(Date.now()),
                                    transformation: [
                                        { width: 1200, height: 1200, crop: 'limit' },
                                        { quality: 'auto', fetch_format: 'auto' },
                                    ],
                                })];
                        case 2:
                            result = _a.sent();
                            return [2 /*return*/, result.secure_url];
                        case 3:
                            error_4 = _a.sent();
                            console.error("Cloudinary seller document upload error (".concat(docType, "):"), error_4);
                            throw new common_1.BadRequestException("Failed to upload ".concat(docType, " image."));
                        case 4: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Upload marketplace order proof images (shipment or delivery receipt).
         */
        CloudinaryService_1.prototype.uploadOrderProof = function (file, orderId, userId, proofType) {
            return __awaiter(this, void 0, void 0, function () {
                var allowedMimes, maxSize, result, error_5;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            allowedMimes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
                            if (!allowedMimes.includes(file.mimetype)) {
                                throw new common_1.BadRequestException("Invalid ".concat(proofType, " proof type. Only JPEG, PNG, and WebP are allowed."));
                            }
                            maxSize = 10 * 1024 * 1024;
                            if (file.size > maxSize) {
                                throw new common_1.BadRequestException("".concat(proofType, " proof image must be under 10MB."));
                            }
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, this.uploadStream(file, {
                                    folder: "marketplace/orders/".concat(orderId),
                                    public_id: "".concat(proofType, "_").concat(userId, "_").concat(Date.now()),
                                    transformation: [
                                        { width: 1600, height: 1600, crop: 'limit' },
                                        { quality: 'auto', fetch_format: 'auto' },
                                    ],
                                })];
                        case 2:
                            result = _a.sent();
                            return [2 /*return*/, result.secure_url];
                        case 3:
                            error_5 = _a.sent();
                            console.error("Cloudinary order proof upload error (".concat(proofType, "):"), error_5);
                            throw new common_1.BadRequestException("Failed to upload ".concat(proofType, " proof image."));
                        case 4: return [2 /*return*/];
                    }
                });
            });
        };
        CloudinaryService_1.prototype.uploadStream = function (file, options) {
            var cloudName = this.configService.get('CLOUDINARY_CLOUD_NAME');
            if (!cloudName || cloudName === 'your-cloud-name') {
                var mockUrl = "http://mock-cloudinary.com/".concat(options.folder, "/").concat(options.public_id, ".").concat(options.resource_type === 'video' ? 'mp4' : 'jpg');
                // Mock response
                return Promise.resolve({
                    public_id: options.public_id || 'mock_public_id',
                    version: 1,
                    signature: 'mock_signature',
                    width: 800,
                    height: 600,
                    format: options.resource_type === 'video' ? 'mp4' : 'jpg',
                    resource_type: options.resource_type || 'image',
                    created_at: new Date().toISOString(),
                    tags: [],
                    pages: 1,
                    bytes: file.size,
                    type: 'upload',
                    etag: 'mock_etag',
                    placeholder: false,
                    url: mockUrl,
                    secure_url: mockUrl,
                    access_mode: 'public',
                    original_filename: 'mock_filename',
                    moderation: [],
                    access_control: [],
                    context: {},
                    metadata: {},
                });
            }
            return new Promise(function (resolve, reject) {
                var upload = cloudinary_1.v2.uploader.upload_stream(options, function (error, result) {
                    if (error) {
                        var normalizedError = error instanceof Error
                            ? error
                            : new Error('Cloudinary upload failed');
                        return reject(normalizedError);
                    }
                    resolve(result);
                });
                streamifier.createReadStream(file.buffer).pipe(upload);
            });
        };
        CloudinaryService_1.prototype.extractPublicId = function (url) {
            var parts = url.split('/');
            var filename = parts[parts.length - 1];
            return filename.split('.')[0];
        };
        CloudinaryService_1.prototype.uploadPostImage = function (file, postId) {
            return __awaiter(this, void 0, void 0, function () {
                var POST_CONSTANTS, ERROR_MESSAGES, result, error_6;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, Promise.resolve().then(function () { return __importStar(require('../../constants/post.constants')); }).then(function (m) { return m.POST_CONSTANTS; })];
                        case 1:
                            POST_CONSTANTS = _a.sent();
                            return [4 /*yield*/, Promise.resolve().then(function () { return __importStar(require('../../constants/error-messages.constant')); }).then(function (m) { return m.ERROR_MESSAGES; })];
                        case 2:
                            ERROR_MESSAGES = _a.sent();
                            // Validate file type
                            if (!POST_CONSTANTS.UPLOAD.ALLOWED_IMAGE_TYPES.includes(file.mimetype)) {
                                throw new common_1.BadRequestException(ERROR_MESSAGES.POST_INVALID_IMAGE_TYPE);
                            }
                            // Validate file size
                            if (file.size > POST_CONSTANTS.VALIDATION.MAX_IMAGE_SIZE) {
                                throw new common_1.BadRequestException(ERROR_MESSAGES.POST_IMAGE_TOO_LARGE);
                            }
                            _a.label = 3;
                        case 3:
                            _a.trys.push([3, 5, , 6]);
                            return [4 /*yield*/, this.uploadStream(file, {
                                    folder: "".concat(POST_CONSTANTS.CLOUDINARY.FOLDER, "/images"),
                                    public_id: "post_".concat(postId, "_").concat(Date.now()),
                                    transformation: [
                                        {
                                            width: POST_CONSTANTS.CLOUDINARY.IMAGE_TRANSFORMATION.MAX_WIDTH,
                                            height: POST_CONSTANTS.CLOUDINARY.IMAGE_TRANSFORMATION.MAX_HEIGHT,
                                            crop: 'limit',
                                        },
                                        {
                                            quality: POST_CONSTANTS.CLOUDINARY.IMAGE_TRANSFORMATION.QUALITY,
                                            fetch_format: POST_CONSTANTS.CLOUDINARY.IMAGE_TRANSFORMATION.FORMAT,
                                        },
                                    ],
                                })];
                        case 4:
                            result = _a.sent();
                            return [2 /*return*/, {
                                    url: result.secure_url,
                                    publicId: result.public_id,
                                    width: result.width,
                                    height: result.height,
                                }];
                        case 5:
                            error_6 = _a.sent();
                            console.error('Cloudinary post image upload error:', error_6);
                            throw new common_1.BadRequestException(ERROR_MESSAGES.POST_MEDIA_UPLOAD_FAILED);
                        case 6: return [2 /*return*/];
                    }
                });
            });
        };
        CloudinaryService_1.prototype.uploadPostVideo = function (file, postId) {
            return __awaiter(this, void 0, void 0, function () {
                var POST_CONSTANTS, ERROR_MESSAGES, result, error_7;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, Promise.resolve().then(function () { return __importStar(require('../../constants/post.constants')); }).then(function (m) { return m.POST_CONSTANTS; })];
                        case 1:
                            POST_CONSTANTS = _a.sent();
                            return [4 /*yield*/, Promise.resolve().then(function () { return __importStar(require('../../constants/error-messages.constant')); }).then(function (m) { return m.ERROR_MESSAGES; })];
                        case 2:
                            ERROR_MESSAGES = _a.sent();
                            // Validate file type
                            if (!POST_CONSTANTS.UPLOAD.ALLOWED_VIDEO_TYPES.includes(file.mimetype)) {
                                throw new common_1.BadRequestException(ERROR_MESSAGES.POST_INVALID_VIDEO_TYPE);
                            }
                            // Validate file size
                            if (file.size > POST_CONSTANTS.VALIDATION.MAX_VIDEO_SIZE) {
                                throw new common_1.BadRequestException(ERROR_MESSAGES.POST_VIDEO_TOO_LARGE);
                            }
                            _a.label = 3;
                        case 3:
                            _a.trys.push([3, 5, , 6]);
                            return [4 /*yield*/, this.uploadStream(file, {
                                    folder: "".concat(POST_CONSTANTS.CLOUDINARY.FOLDER, "/videos"),
                                    public_id: "post_video_".concat(postId, "_").concat(Date.now()),
                                    resource_type: 'video',
                                    transformation: [
                                        {
                                            width: POST_CONSTANTS.CLOUDINARY.VIDEO_TRANSFORMATION.MAX_WIDTH,
                                            height: POST_CONSTANTS.CLOUDINARY.VIDEO_TRANSFORMATION.MAX_HEIGHT,
                                            crop: 'limit',
                                        },
                                        {
                                            quality: POST_CONSTANTS.CLOUDINARY.VIDEO_TRANSFORMATION.QUALITY,
                                        },
                                    ],
                                })];
                        case 4:
                            result = _a.sent();
                            return [2 /*return*/, {
                                    url: result.secure_url,
                                    publicId: result.public_id,
                                    width: result.width || 0,
                                    height: result.height || 0,
                                }];
                        case 5:
                            error_7 = _a.sent();
                            console.error('Cloudinary post video upload error:', error_7);
                            throw new common_1.BadRequestException(ERROR_MESSAGES.POST_MEDIA_UPLOAD_FAILED);
                        case 6: return [2 /*return*/];
                    }
                });
            });
        };
        CloudinaryService_1.prototype.uploadMultiplePostMedia = function (files, postId) {
            return __awaiter(this, void 0, void 0, function () {
                var imageUrls, videoUrls, _i, _a, image, result, _b, _c, video, result;
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0:
                            imageUrls = [];
                            videoUrls = [];
                            if (!(files.images && files.images.length > 0)) return [3 /*break*/, 4];
                            _i = 0, _a = files.images;
                            _d.label = 1;
                        case 1:
                            if (!(_i < _a.length)) return [3 /*break*/, 4];
                            image = _a[_i];
                            return [4 /*yield*/, this.uploadPostImage(image, postId)];
                        case 2:
                            result = _d.sent();
                            imageUrls.push(result);
                            _d.label = 3;
                        case 3:
                            _i++;
                            return [3 /*break*/, 1];
                        case 4:
                            if (!(files.videos && files.videos.length > 0)) return [3 /*break*/, 8];
                            _b = 0, _c = files.videos;
                            _d.label = 5;
                        case 5:
                            if (!(_b < _c.length)) return [3 /*break*/, 8];
                            video = _c[_b];
                            return [4 /*yield*/, this.uploadPostVideo(video, postId)];
                        case 6:
                            result = _d.sent();
                            videoUrls.push(result);
                            _d.label = 7;
                        case 7:
                            _b++;
                            return [3 /*break*/, 5];
                        case 8: return [2 /*return*/, { imageUrls: imageUrls, videoUrls: videoUrls }];
                    }
                });
            });
        };
        CloudinaryService_1.prototype.uploadMessageMedia = function (file, messageId, type) {
            return __awaiter(this, void 0, void 0, function () {
                var CHAT_CONSTANTS, folder, resourceType, options, result, response, thumbUrl, error_8;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            CHAT_CONSTANTS = {
                                CLOUDINARY: {
                                    FOLDER: 'chat/media',
                                },
                            };
                            folder = "".concat(CHAT_CONSTANTS.CLOUDINARY.FOLDER, "/others");
                            resourceType = 'auto';
                            switch (type) {
                                case 'IMAGE':
                                    folder = "".concat(CHAT_CONSTANTS.CLOUDINARY.FOLDER, "/images");
                                    resourceType = 'image';
                                    break;
                                case 'VIDEO':
                                    folder = "".concat(CHAT_CONSTANTS.CLOUDINARY.FOLDER, "/videos");
                                    resourceType = 'video';
                                    break;
                                case 'AUDIO':
                                case 'VOICE_NOTE':
                                    folder = "".concat(CHAT_CONSTANTS.CLOUDINARY.FOLDER, "/audio");
                                    resourceType = 'video'; // Cloudinary treats audio as video
                                    break;
                                case 'DOCUMENT':
                                case 'FILE':
                                    folder = "".concat(CHAT_CONSTANTS.CLOUDINARY.FOLDER, "/files");
                                    resourceType = 'raw';
                                    break;
                            }
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            options = {
                                folder: folder,
                                public_id: "msg_".concat(type.toLowerCase(), "_").concat(messageId, "_").concat(Date.now()),
                                resource_type: resourceType,
                            };
                            // Specific transformations
                            if (type === 'IMAGE') {
                                options.transformation = [
                                    { quality: 'auto', fetch_format: 'auto' },
                                    { width: 1920, height: 1920, crop: 'limit' }, // Limit max resolution
                                ];
                            }
                            return [4 /*yield*/, this.uploadStream(file, options)];
                        case 2:
                            result = _a.sent();
                            response = {
                                url: result.secure_url,
                                publicId: result.public_id,
                                bytes: result.bytes,
                                format: result.format,
                            };
                            if (result.width)
                                response.width = result.width;
                            if (result.height)
                                response.height = result.height;
                            if (result.duration)
                                response.duration = result.duration;
                            // Generate thumbnail for videos
                            if (type === 'VIDEO') {
                                thumbUrl = cloudinary_1.v2.url(result.public_id, {
                                    resource_type: 'video',
                                    format: 'jpg',
                                    start_offset: '0',
                                    transformation: [{ width: 300, crop: 'scale' }],
                                });
                                response.thumbnailUrl = thumbUrl;
                            }
                            return [2 /*return*/, response];
                        case 3:
                            error_8 = _a.sent();
                            console.error('Cloudinary message media upload error:', error_8);
                            throw new common_1.BadRequestException('Failed to upload message media');
                        case 4: return [2 /*return*/];
                    }
                });
            });
        };
        return CloudinaryService_1;
    }());
    __setFunctionName(_classThis, "CloudinaryService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        CloudinaryService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return CloudinaryService = _classThis;
}();
exports.CloudinaryService = CloudinaryService;
