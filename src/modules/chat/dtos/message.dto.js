"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
exports.DeleteMessageDto = exports.ForwardMessageDto = exports.UpdateMessageDto = exports.CreateMessageWithMediaDto = exports.MessageMediaDto = exports.CreateMessageDto = void 0;
var class_validator_1 = require("class-validator");
var class_transformer_1 = require("class-transformer");
var swagger_1 = require("@nestjs/swagger");
/**
 * DTO for creating a new message
 */
var CreateMessageDto = function () {
    var _a;
    var _content_decorators;
    var _content_initializers = [];
    var _content_extraInitializers = [];
    var _roomId_decorators;
    var _roomId_initializers = [];
    var _roomId_extraInitializers = [];
    var _replyToId_decorators;
    var _replyToId_initializers = [];
    var _replyToId_extraInitializers = [];
    return _a = /** @class */ (function () {
            function CreateMessageDto() {
                this.content = __runInitializers(this, _content_initializers, void 0);
                this.roomId = (__runInitializers(this, _content_extraInitializers), __runInitializers(this, _roomId_initializers, void 0));
                this.replyToId = (__runInitializers(this, _roomId_extraInitializers), __runInitializers(this, _replyToId_initializers, void 0));
                __runInitializers(this, _replyToId_extraInitializers);
            }
            return CreateMessageDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _content_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Message content text',
                    example: 'Hello, how are you?',
                    maxLength: 4096,
                }), (0, class_validator_1.IsString)(), (0, class_validator_1.IsNotEmpty)(), (0, class_validator_1.MaxLength)(4096)];
            _roomId_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Room ID to send the message to',
                    example: '507f1f77bcf86cd799439011',
                }), (0, class_validator_1.IsString)(), (0, class_validator_1.IsNotEmpty)()];
            _replyToId_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Message ID to reply to',
                    example: '507f1f77bcf86cd799439012',
                }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            __esDecorate(null, null, _content_decorators, { kind: "field", name: "content", static: false, private: false, access: { has: function (obj) { return "content" in obj; }, get: function (obj) { return obj.content; }, set: function (obj, value) { obj.content = value; } }, metadata: _metadata }, _content_initializers, _content_extraInitializers);
            __esDecorate(null, null, _roomId_decorators, { kind: "field", name: "roomId", static: false, private: false, access: { has: function (obj) { return "roomId" in obj; }, get: function (obj) { return obj.roomId; }, set: function (obj, value) { obj.roomId = value; } }, metadata: _metadata }, _roomId_initializers, _roomId_extraInitializers);
            __esDecorate(null, null, _replyToId_decorators, { kind: "field", name: "replyToId", static: false, private: false, access: { has: function (obj) { return "replyToId" in obj; }, get: function (obj) { return obj.replyToId; }, set: function (obj, value) { obj.replyToId = value; } }, metadata: _metadata }, _replyToId_initializers, _replyToId_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.CreateMessageDto = CreateMessageDto;
/**
 * DTO for message media attachment
 */
var MessageMediaDto = function () {
    var _a;
    var _url_decorators;
    var _url_initializers = [];
    var _url_extraInitializers = [];
    var _type_decorators;
    var _type_initializers = [];
    var _type_extraInitializers = [];
    var _fileName_decorators;
    var _fileName_initializers = [];
    var _fileName_extraInitializers = [];
    var _fileSize_decorators;
    var _fileSize_initializers = [];
    var _fileSize_extraInitializers = [];
    var _mimeType_decorators;
    var _mimeType_initializers = [];
    var _mimeType_extraInitializers = [];
    return _a = /** @class */ (function () {
            function MessageMediaDto() {
                this.url = __runInitializers(this, _url_initializers, void 0);
                this.type = (__runInitializers(this, _url_extraInitializers), __runInitializers(this, _type_initializers, void 0));
                this.fileName = (__runInitializers(this, _type_extraInitializers), __runInitializers(this, _fileName_initializers, void 0));
                this.fileSize = (__runInitializers(this, _fileName_extraInitializers), __runInitializers(this, _fileSize_initializers, void 0));
                this.mimeType = (__runInitializers(this, _fileSize_extraInitializers), __runInitializers(this, _mimeType_initializers, void 0));
                __runInitializers(this, _mimeType_extraInitializers);
            }
            return MessageMediaDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _url_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Media URL',
                    example: 'https://cloudinary.com/image.jpg',
                }), (0, class_validator_1.IsString)(), (0, class_validator_1.IsNotEmpty)()];
            _type_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Media type',
                    enum: ['IMAGE', 'VIDEO', 'AUDIO', 'VOICE_NOTE', 'DOCUMENT', 'FILE'],
                }), (0, class_validator_1.IsEnum)(['IMAGE', 'VIDEO', 'AUDIO', 'VOICE_NOTE', 'DOCUMENT', 'FILE'])];
            _fileName_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'File name' }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            _fileSize_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'File size in bytes' }), (0, class_validator_1.IsOptional)()];
            _mimeType_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'MIME type' }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            __esDecorate(null, null, _url_decorators, { kind: "field", name: "url", static: false, private: false, access: { has: function (obj) { return "url" in obj; }, get: function (obj) { return obj.url; }, set: function (obj, value) { obj.url = value; } }, metadata: _metadata }, _url_initializers, _url_extraInitializers);
            __esDecorate(null, null, _type_decorators, { kind: "field", name: "type", static: false, private: false, access: { has: function (obj) { return "type" in obj; }, get: function (obj) { return obj.type; }, set: function (obj, value) { obj.type = value; } }, metadata: _metadata }, _type_initializers, _type_extraInitializers);
            __esDecorate(null, null, _fileName_decorators, { kind: "field", name: "fileName", static: false, private: false, access: { has: function (obj) { return "fileName" in obj; }, get: function (obj) { return obj.fileName; }, set: function (obj, value) { obj.fileName = value; } }, metadata: _metadata }, _fileName_initializers, _fileName_extraInitializers);
            __esDecorate(null, null, _fileSize_decorators, { kind: "field", name: "fileSize", static: false, private: false, access: { has: function (obj) { return "fileSize" in obj; }, get: function (obj) { return obj.fileSize; }, set: function (obj, value) { obj.fileSize = value; } }, metadata: _metadata }, _fileSize_initializers, _fileSize_extraInitializers);
            __esDecorate(null, null, _mimeType_decorators, { kind: "field", name: "mimeType", static: false, private: false, access: { has: function (obj) { return "mimeType" in obj; }, get: function (obj) { return obj.mimeType; }, set: function (obj, value) { obj.mimeType = value; } }, metadata: _metadata }, _mimeType_initializers, _mimeType_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.MessageMediaDto = MessageMediaDto;
/**
 * DTO for creating a message with media
 */
var CreateMessageWithMediaDto = function () {
    var _a;
    var _classSuper = CreateMessageDto;
    var _media_decorators;
    var _media_initializers = [];
    var _media_extraInitializers = [];
    return _a = /** @class */ (function (_super) {
            __extends(CreateMessageWithMediaDto, _super);
            function CreateMessageWithMediaDto() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.media = __runInitializers(_this, _media_initializers, void 0);
                __runInitializers(_this, _media_extraInitializers);
                return _this;
            }
            return CreateMessageWithMediaDto;
        }(_classSuper)),
        (function () {
            var _b;
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_b = _classSuper[Symbol.metadata]) !== null && _b !== void 0 ? _b : null) : void 0;
            _media_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Media attachments',
                    type: [MessageMediaDto],
                }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsArray)(), (0, class_validator_1.ValidateNested)({ each: true }), (0, class_transformer_1.Type)(function () { return MessageMediaDto; })];
            __esDecorate(null, null, _media_decorators, { kind: "field", name: "media", static: false, private: false, access: { has: function (obj) { return "media" in obj; }, get: function (obj) { return obj.media; }, set: function (obj, value) { obj.media = value; } }, metadata: _metadata }, _media_initializers, _media_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.CreateMessageWithMediaDto = CreateMessageWithMediaDto;
/**
 * DTO for updating a message
 */
var UpdateMessageDto = function () {
    var _a;
    var _content_decorators;
    var _content_initializers = [];
    var _content_extraInitializers = [];
    return _a = /** @class */ (function () {
            function UpdateMessageDto() {
                this.content = __runInitializers(this, _content_initializers, void 0);
                __runInitializers(this, _content_extraInitializers);
            }
            return UpdateMessageDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _content_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Updated message content',
                    example: 'Updated message text',
                    maxLength: 4096,
                }), (0, class_validator_1.IsString)(), (0, class_validator_1.IsNotEmpty)(), (0, class_validator_1.MaxLength)(4096)];
            __esDecorate(null, null, _content_decorators, { kind: "field", name: "content", static: false, private: false, access: { has: function (obj) { return "content" in obj; }, get: function (obj) { return obj.content; }, set: function (obj, value) { obj.content = value; } }, metadata: _metadata }, _content_initializers, _content_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.UpdateMessageDto = UpdateMessageDto;
/**
 * DTO for forwarding a message
 */
var ForwardMessageDto = function () {
    var _a;
    var _messageId_decorators;
    var _messageId_initializers = [];
    var _messageId_extraInitializers = [];
    var _toRoomIds_decorators;
    var _toRoomIds_initializers = [];
    var _toRoomIds_extraInitializers = [];
    return _a = /** @class */ (function () {
            function ForwardMessageDto() {
                this.messageId = __runInitializers(this, _messageId_initializers, void 0);
                this.toRoomIds = (__runInitializers(this, _messageId_extraInitializers), __runInitializers(this, _toRoomIds_initializers, void 0));
                __runInitializers(this, _toRoomIds_extraInitializers);
            }
            return ForwardMessageDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _messageId_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Original message ID to forward',
                    example: '507f1f77bcf86cd799439011',
                }), (0, class_validator_1.IsString)(), (0, class_validator_1.IsNotEmpty)()];
            _toRoomIds_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Room IDs to forward the message to',
                    example: ['507f1f77bcf86cd799439012', '507f1f77bcf86cd799439013'],
                    type: [String],
                }), (0, class_validator_1.IsArray)(), (0, class_validator_1.IsString)({ each: true }), (0, class_validator_1.IsNotEmpty)({ each: true })];
            __esDecorate(null, null, _messageId_decorators, { kind: "field", name: "messageId", static: false, private: false, access: { has: function (obj) { return "messageId" in obj; }, get: function (obj) { return obj.messageId; }, set: function (obj, value) { obj.messageId = value; } }, metadata: _metadata }, _messageId_initializers, _messageId_extraInitializers);
            __esDecorate(null, null, _toRoomIds_decorators, { kind: "field", name: "toRoomIds", static: false, private: false, access: { has: function (obj) { return "toRoomIds" in obj; }, get: function (obj) { return obj.toRoomIds; }, set: function (obj, value) { obj.toRoomIds = value; } }, metadata: _metadata }, _toRoomIds_initializers, _toRoomIds_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.ForwardMessageDto = ForwardMessageDto;
/**
 * DTO for deleting a message
 */
var DeleteMessageDto = function () {
    var _a;
    var _deleteForEveryone_decorators;
    var _deleteForEveryone_initializers = [];
    var _deleteForEveryone_extraInitializers = [];
    return _a = /** @class */ (function () {
            function DeleteMessageDto() {
                this.deleteForEveryone = __runInitializers(this, _deleteForEveryone_initializers, void 0);
                __runInitializers(this, _deleteForEveryone_extraInitializers);
            }
            return DeleteMessageDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _deleteForEveryone_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Delete for everyone in the room',
                    example: false,
                    default: false,
                }), (0, class_validator_1.IsOptional)()];
            __esDecorate(null, null, _deleteForEveryone_decorators, { kind: "field", name: "deleteForEveryone", static: false, private: false, access: { has: function (obj) { return "deleteForEveryone" in obj; }, get: function (obj) { return obj.deleteForEveryone; }, set: function (obj, value) { obj.deleteForEveryone = value; } }, metadata: _metadata }, _deleteForEveryone_initializers, _deleteForEveryone_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.DeleteMessageDto = DeleteMessageDto;
