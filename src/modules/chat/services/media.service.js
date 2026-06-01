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
exports.ChatMediaService = void 0;
var common_1 = require("@nestjs/common");
var message_schema_1 = require("../schemas/message.schema");
var chat_constants_1 = require("src/common/constants/chat.constants");
var ChatMediaService = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var ChatMediaService = _classThis = /** @class */ (function () {
        function ChatMediaService_1(cloudinaryService, mongodbService) {
            this.cloudinaryService = cloudinaryService;
            this.mongodbService = mongodbService;
        }
        /**
         * Upload a chat image
         */
        ChatMediaService_1.prototype.uploadImage = function (file, messageId) {
            return __awaiter(this, void 0, void 0, function () {
                var result, mediaDoc, error_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            // Validate file type
                            if (!chat_constants_1.CHAT_CONSTANTS.UPLOAD.ALLOWED_IMAGE_TYPES.includes(file.mimetype)) {
                                throw new common_1.BadRequestException(chat_constants_1.CHAT_ERROR_MESSAGES.MEDIA_TYPE_NOT_ALLOWED);
                            }
                            // Validate file size
                            if (file.size > chat_constants_1.CHAT_CONSTANTS.UPLOAD.MAX_IMAGE_SIZE) {
                                throw new common_1.BadRequestException(chat_constants_1.CHAT_ERROR_MESSAGES.MEDIA_SIZE_TOO_LARGE);
                            }
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, this.uploadToCloudinary(file, 'images', messageId)];
                        case 2:
                            result = _a.sent();
                            mediaDoc = {
                                messageId: messageId,
                                url: result.url,
                                type: 'IMAGE',
                                fileName: file.originalname,
                                fileSize: file.size,
                                mimeType: file.mimetype,
                                width: result.width,
                                height: result.height,
                                publicId: result.publicId,
                                createdAt: new Date(),
                            };
                            return [2 /*return*/, mediaDoc];
                        case 3:
                            error_1 = _a.sent();
                            console.error('Chat image upload error:', error_1);
                            throw new common_1.BadRequestException(chat_constants_1.CHAT_ERROR_MESSAGES.MEDIA_UPLOAD_FAILED);
                        case 4: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Upload a chat video
         */
        ChatMediaService_1.prototype.uploadVideo = function (file, messageId) {
            return __awaiter(this, void 0, void 0, function () {
                var result, mediaDoc, error_2;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            // Validate file type
                            if (!chat_constants_1.CHAT_CONSTANTS.UPLOAD.ALLOWED_VIDEO_TYPES.includes(file.mimetype)) {
                                throw new common_1.BadRequestException(chat_constants_1.CHAT_ERROR_MESSAGES.MEDIA_TYPE_NOT_ALLOWED);
                            }
                            // Validate file size
                            if (file.size > chat_constants_1.CHAT_CONSTANTS.UPLOAD.MAX_VIDEO_SIZE) {
                                throw new common_1.BadRequestException(chat_constants_1.CHAT_ERROR_MESSAGES.MEDIA_SIZE_TOO_LARGE);
                            }
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, this.uploadToCloudinary(file, 'videos', messageId, 'video')];
                        case 2:
                            result = _a.sent();
                            mediaDoc = {
                                messageId: messageId,
                                url: result.url,
                                type: 'VIDEO',
                                fileName: file.originalname,
                                fileSize: file.size,
                                mimeType: file.mimetype,
                                width: result.width,
                                height: result.height,
                                duration: result.duration,
                                thumbnail: result.thumbnail,
                                publicId: result.publicId,
                                createdAt: new Date(),
                            };
                            return [2 /*return*/, mediaDoc];
                        case 3:
                            error_2 = _a.sent();
                            console.error('Chat video upload error:', error_2);
                            throw new common_1.BadRequestException(chat_constants_1.CHAT_ERROR_MESSAGES.MEDIA_UPLOAD_FAILED);
                        case 4: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Upload an audio file
         */
        ChatMediaService_1.prototype.uploadAudio = function (file, messageId) {
            return __awaiter(this, void 0, void 0, function () {
                var result, mediaDoc, error_3;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            // Validate file type
                            if (!chat_constants_1.CHAT_CONSTANTS.UPLOAD.ALLOWED_AUDIO_TYPES.includes(file.mimetype)) {
                                throw new common_1.BadRequestException(chat_constants_1.CHAT_ERROR_MESSAGES.MEDIA_TYPE_NOT_ALLOWED);
                            }
                            // Validate file size
                            if (file.size > chat_constants_1.CHAT_CONSTANTS.UPLOAD.MAX_AUDIO_SIZE) {
                                throw new common_1.BadRequestException(chat_constants_1.CHAT_ERROR_MESSAGES.MEDIA_SIZE_TOO_LARGE);
                            }
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, this.uploadToCloudinary(file, 'audio', messageId, 'video')];
                        case 2:
                            result = _a.sent();
                            mediaDoc = {
                                messageId: messageId,
                                url: result.url,
                                type: 'AUDIO',
                                fileName: file.originalname,
                                fileSize: file.size,
                                mimeType: file.mimetype,
                                duration: result.duration,
                                publicId: result.publicId,
                                createdAt: new Date(),
                            };
                            return [2 /*return*/, mediaDoc];
                        case 3:
                            error_3 = _a.sent();
                            console.error('Chat audio upload error:', error_3);
                            throw new common_1.BadRequestException(chat_constants_1.CHAT_ERROR_MESSAGES.MEDIA_UPLOAD_FAILED);
                        case 4: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Upload a voice note
         */
        ChatMediaService_1.prototype.uploadVoiceNote = function (file, messageId) {
            return __awaiter(this, void 0, void 0, function () {
                var result, mediaDoc, error_4;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            // Voice notes typically come as audio/webm or audio/ogg
                            if (file.size > chat_constants_1.CHAT_CONSTANTS.UPLOAD.MAX_VOICE_NOTE_SIZE) {
                                throw new common_1.BadRequestException(chat_constants_1.CHAT_ERROR_MESSAGES.MEDIA_SIZE_TOO_LARGE);
                            }
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, this.uploadToCloudinary(file, 'voice-notes', messageId, 'video')];
                        case 2:
                            result = _a.sent();
                            mediaDoc = {
                                messageId: messageId,
                                url: result.url,
                                type: 'VOICE_NOTE',
                                fileName: file.originalname || 'voice_note',
                                fileSize: file.size,
                                mimeType: file.mimetype,
                                duration: result.duration,
                                publicId: result.publicId,
                                createdAt: new Date(),
                            };
                            return [2 /*return*/, mediaDoc];
                        case 3:
                            error_4 = _a.sent();
                            console.error('Chat voice note upload error:', error_4);
                            throw new common_1.BadRequestException(chat_constants_1.CHAT_ERROR_MESSAGES.MEDIA_UPLOAD_FAILED);
                        case 4: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Upload a document
         */
        ChatMediaService_1.prototype.uploadDocument = function (file, messageId) {
            return __awaiter(this, void 0, void 0, function () {
                var result, mediaDoc, error_5;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            // Validate file size
                            if (file.size > chat_constants_1.CHAT_CONSTANTS.UPLOAD.MAX_DOCUMENT_SIZE) {
                                throw new common_1.BadRequestException(chat_constants_1.CHAT_ERROR_MESSAGES.MEDIA_SIZE_TOO_LARGE);
                            }
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, this.uploadToCloudinary(file, 'documents', messageId, 'raw')];
                        case 2:
                            result = _a.sent();
                            mediaDoc = {
                                messageId: messageId,
                                url: result.url,
                                type: 'DOCUMENT',
                                fileName: file.originalname,
                                fileSize: file.size,
                                mimeType: file.mimetype,
                                publicId: result.publicId,
                                createdAt: new Date(),
                            };
                            return [2 /*return*/, mediaDoc];
                        case 3:
                            error_5 = _a.sent();
                            console.error('Chat document upload error:', error_5);
                            throw new common_1.BadRequestException(chat_constants_1.CHAT_ERROR_MESSAGES.MEDIA_UPLOAD_FAILED);
                        case 4: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Upload multiple media files
         */
        ChatMediaService_1.prototype.uploadMultiple = function (files, messageId) {
            return __awaiter(this, void 0, void 0, function () {
                var uploadPromises;
                var _this = this;
                return __generator(this, function (_a) {
                    if (files.length > chat_constants_1.CHAT_CONSTANTS.MESSAGE.MAX_MEDIA_PER_MESSAGE) {
                        throw new common_1.BadRequestException(chat_constants_1.CHAT_ERROR_MESSAGES.TOO_MANY_MEDIA_FILES);
                    }
                    uploadPromises = files.map(function (file) {
                        return _this.uploadFile(file, messageId);
                    });
                    return [2 /*return*/, Promise.all(uploadPromises)];
                });
            });
        };
        /**
         * Upload a file and determine its type
         */
        ChatMediaService_1.prototype.uploadFile = function (file, messageId) {
            return __awaiter(this, void 0, void 0, function () {
                var mimeType;
                return __generator(this, function (_a) {
                    mimeType = file.mimetype;
                    if (chat_constants_1.CHAT_CONSTANTS.UPLOAD.ALLOWED_IMAGE_TYPES.includes(mimeType)) {
                        return [2 /*return*/, this.uploadImage(file, messageId)];
                    }
                    if (chat_constants_1.CHAT_CONSTANTS.UPLOAD.ALLOWED_VIDEO_TYPES.includes(mimeType)) {
                        return [2 /*return*/, this.uploadVideo(file, messageId)];
                    }
                    if (chat_constants_1.CHAT_CONSTANTS.UPLOAD.ALLOWED_AUDIO_TYPES.includes(mimeType)) {
                        return [2 /*return*/, this.uploadAudio(file, messageId)];
                    }
                    // Default to document upload
                    return [2 /*return*/, this.uploadDocument(file, messageId)];
                });
            });
        };
        /**
         * Save media to database
         */
        ChatMediaService_1.prototype.saveMedia = function (media) {
            return __awaiter(this, void 0, void 0, function () {
                var mediaCollection, result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!this.mongodbService.isReady()) {
                                throw new common_1.ForbiddenException(chat_constants_1.CHAT_ERROR_MESSAGES.MONGODB_NOT_CONNECTED);
                            }
                            mediaCollection = this.mongodbService.getCollection(message_schema_1.MESSAGE_MEDIA_COLLECTION);
                            return [4 /*yield*/, mediaCollection.insertOne(media)];
                        case 1:
                            result = _a.sent();
                            media._id = result.insertedId;
                            return [2 /*return*/, media];
                    }
                });
            });
        };
        /**
         * Save multiple media to database
         */
        ChatMediaService_1.prototype.saveMultipleMedia = function (media) {
            return __awaiter(this, void 0, void 0, function () {
                var mediaCollection, result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!this.mongodbService.isReady()) {
                                throw new common_1.ForbiddenException(chat_constants_1.CHAT_ERROR_MESSAGES.MONGODB_NOT_CONNECTED);
                            }
                            if (media.length === 0) {
                                return [2 /*return*/, []];
                            }
                            mediaCollection = this.mongodbService.getCollection(message_schema_1.MESSAGE_MEDIA_COLLECTION);
                            return [4 /*yield*/, mediaCollection.insertMany(media)];
                        case 1:
                            result = _a.sent();
                            return [2 /*return*/, media.map(function (m, index) { return (__assign(__assign({}, m), { _id: result.insertedIds[index] })); })];
                    }
                });
            });
        };
        /**
         * Delete media from Cloudinary
         */
        ChatMediaService_1.prototype.deleteMedia = function (publicId) {
            return __awaiter(this, void 0, void 0, function () {
                var error_6;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, this.cloudinaryService.deleteFile(publicId)];
                        case 1:
                            _a.sent();
                            return [3 /*break*/, 3];
                        case 2:
                            error_6 = _a.sent();
                            console.error('Failed to delete media:', error_6);
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Get media for a message
         */
        ChatMediaService_1.prototype.getMessageMedia = function (messageId) {
            return __awaiter(this, void 0, void 0, function () {
                var mediaCollection;
                return __generator(this, function (_a) {
                    if (!this.mongodbService.isReady()) {
                        throw new common_1.ForbiddenException(chat_constants_1.CHAT_ERROR_MESSAGES.MONGODB_NOT_CONNECTED);
                    }
                    mediaCollection = this.mongodbService.getCollection(message_schema_1.MESSAGE_MEDIA_COLLECTION);
                    return [2 /*return*/, mediaCollection.find({ messageId: messageId }).toArray()];
                });
            });
        };
        /**
         * Helper method to upload to Cloudinary
         */
        ChatMediaService_1.prototype.uploadToCloudinary = function (file_1, subfolder_1, messageId_1) {
            return __awaiter(this, arguments, void 0, function (file, subfolder, messageId, resourceType) {
                var cloudinary, streamifier;
                if (resourceType === void 0) { resourceType = 'image'; }
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, Promise.resolve().then(function () { return __importStar(require('cloudinary')); })];
                        case 1:
                            cloudinary = (_a.sent()).v2;
                            return [4 /*yield*/, Promise.resolve().then(function () { return __importStar(require('streamifier')); })];
                        case 2:
                            streamifier = _a.sent();
                            return [2 /*return*/, new Promise(function (resolve, reject) {
                                    var uploadOptions = {
                                        folder: "".concat(chat_constants_1.CHAT_CONSTANTS.CLOUDINARY.FOLDER, "/").concat(subfolder),
                                        public_id: "chat_".concat(messageId, "_").concat(Date.now()),
                                        resource_type: resourceType,
                                    };
                                    if (resourceType === 'image') {
                                        uploadOptions.transformation = [
                                            {
                                                width: chat_constants_1.CHAT_CONSTANTS.CLOUDINARY.IMAGE_TRANSFORMATION.MAX_WIDTH,
                                                height: chat_constants_1.CHAT_CONSTANTS.CLOUDINARY.IMAGE_TRANSFORMATION.MAX_HEIGHT,
                                                crop: 'limit',
                                            },
                                            {
                                                quality: chat_constants_1.CHAT_CONSTANTS.CLOUDINARY.IMAGE_TRANSFORMATION.QUALITY,
                                                fetch_format: chat_constants_1.CHAT_CONSTANTS.CLOUDINARY.IMAGE_TRANSFORMATION.FORMAT,
                                            },
                                        ];
                                    }
                                    var upload = cloudinary.uploader.upload_stream(uploadOptions, function (error, result) {
                                        if (error) {
                                            var normalizedError = error instanceof Error
                                                ? error
                                                : new Error('Cloudinary upload failed');
                                            return reject(normalizedError);
                                        }
                                        resolve({
                                            url: result.secure_url,
                                            publicId: result.public_id,
                                            width: result === null || result === void 0 ? void 0 : result.width,
                                            height: result === null || result === void 0 ? void 0 : result.height,
                                            duration: result === null || result === void 0 ? void 0 : result.duration,
                                            thumbnail: resourceType === 'video'
                                                ? result === null || result === void 0 ? void 0 : result.secure_url.replace(/\.[^.]+$/, '.jpg')
                                                : undefined,
                                        });
                                    });
                                    streamifier.createReadStream(file.buffer).pipe(upload);
                                })];
                    }
                });
            });
        };
        return ChatMediaService_1;
    }());
    __setFunctionName(_classThis, "ChatMediaService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ChatMediaService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ChatMediaService = _classThis;
}();
exports.ChatMediaService = ChatMediaService;
