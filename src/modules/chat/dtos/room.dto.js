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
exports.UpdateRoomMemberSettingsDto = exports.UpdateMemberRoleDto = exports.AddRoomMembersDto = exports.UpdateRoomDto = exports.CreateRoomDto = exports.CreateGroupRoomDto = exports.CreateDirectRoomDto = void 0;
var class_validator_1 = require("class-validator");
var swagger_1 = require("@nestjs/swagger");
/**
 * DTO for creating a direct (1:1) room
 */
var CreateDirectRoomDto = function () {
    var _a;
    var _userId_decorators;
    var _userId_initializers = [];
    var _userId_extraInitializers = [];
    return _a = /** @class */ (function () {
            function CreateDirectRoomDto() {
                this.userId = __runInitializers(this, _userId_initializers, void 0);
                __runInitializers(this, _userId_extraInitializers);
            }
            return CreateDirectRoomDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _userId_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'User ID to create a direct room with',
                    example: 'user-uuid-123',
                }), (0, class_validator_1.IsString)(), (0, class_validator_1.IsNotEmpty)()];
            __esDecorate(null, null, _userId_decorators, { kind: "field", name: "userId", static: false, private: false, access: { has: function (obj) { return "userId" in obj; }, get: function (obj) { return obj.userId; }, set: function (obj, value) { obj.userId = value; } }, metadata: _metadata }, _userId_initializers, _userId_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.CreateDirectRoomDto = CreateDirectRoomDto;
/**
 * DTO for creating a group room
 */
var CreateGroupRoomDto = function () {
    var _a;
    var _name_decorators;
    var _name_initializers = [];
    var _name_extraInitializers = [];
    var _description_decorators;
    var _description_initializers = [];
    var _description_extraInitializers = [];
    var _imageUrl_decorators;
    var _imageUrl_initializers = [];
    var _imageUrl_extraInitializers = [];
    var _memberIds_decorators;
    var _memberIds_initializers = [];
    var _memberIds_extraInitializers = [];
    return _a = /** @class */ (function () {
            function CreateGroupRoomDto() {
                this.name = __runInitializers(this, _name_initializers, void 0);
                this.description = (__runInitializers(this, _name_extraInitializers), __runInitializers(this, _description_initializers, void 0));
                this.imageUrl = (__runInitializers(this, _description_extraInitializers), __runInitializers(this, _imageUrl_initializers, void 0));
                this.memberIds = (__runInitializers(this, _imageUrl_extraInitializers), __runInitializers(this, _memberIds_initializers, void 0));
                __runInitializers(this, _memberIds_extraInitializers);
            }
            return CreateGroupRoomDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _name_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Group name',
                    example: 'Project Team',
                    maxLength: 100,
                }), (0, class_validator_1.IsString)(), (0, class_validator_1.IsNotEmpty)(), (0, class_validator_1.MaxLength)(100)];
            _description_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Group description',
                    example: 'Discussion group for the project team',
                    maxLength: 500,
                }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)(), (0, class_validator_1.MaxLength)(500)];
            _imageUrl_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Group image URL',
                    example: 'https://cloudinary.com/group-image.jpg',
                }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            _memberIds_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Initial member user IDs (creator is added automatically as admin)',
                    example: ['user-uuid-1', 'user-uuid-2'],
                    type: [String],
                }), (0, class_validator_1.IsArray)(), (0, class_validator_1.IsString)({ each: true }), (0, class_validator_1.ArrayMinSize)(1), (0, class_validator_1.ArrayMaxSize)(255)];
            __esDecorate(null, null, _name_decorators, { kind: "field", name: "name", static: false, private: false, access: { has: function (obj) { return "name" in obj; }, get: function (obj) { return obj.name; }, set: function (obj, value) { obj.name = value; } }, metadata: _metadata }, _name_initializers, _name_extraInitializers);
            __esDecorate(null, null, _description_decorators, { kind: "field", name: "description", static: false, private: false, access: { has: function (obj) { return "description" in obj; }, get: function (obj) { return obj.description; }, set: function (obj, value) { obj.description = value; } }, metadata: _metadata }, _description_initializers, _description_extraInitializers);
            __esDecorate(null, null, _imageUrl_decorators, { kind: "field", name: "imageUrl", static: false, private: false, access: { has: function (obj) { return "imageUrl" in obj; }, get: function (obj) { return obj.imageUrl; }, set: function (obj, value) { obj.imageUrl = value; } }, metadata: _metadata }, _imageUrl_initializers, _imageUrl_extraInitializers);
            __esDecorate(null, null, _memberIds_decorators, { kind: "field", name: "memberIds", static: false, private: false, access: { has: function (obj) { return "memberIds" in obj; }, get: function (obj) { return obj.memberIds; }, set: function (obj, value) { obj.memberIds = value; } }, metadata: _metadata }, _memberIds_initializers, _memberIds_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.CreateGroupRoomDto = CreateGroupRoomDto;
/**
 * DTO for creating a room (generic)
 */
var CreateRoomDto = function () {
    var _a;
    var _type_decorators;
    var _type_initializers = [];
    var _type_extraInitializers = [];
    var _name_decorators;
    var _name_initializers = [];
    var _name_extraInitializers = [];
    var _description_decorators;
    var _description_initializers = [];
    var _description_extraInitializers = [];
    var _imageUrl_decorators;
    var _imageUrl_initializers = [];
    var _imageUrl_extraInitializers = [];
    var _memberIds_decorators;
    var _memberIds_initializers = [];
    var _memberIds_extraInitializers = [];
    return _a = /** @class */ (function () {
            function CreateRoomDto() {
                this.type = __runInitializers(this, _type_initializers, void 0);
                this.name = (__runInitializers(this, _type_extraInitializers), __runInitializers(this, _name_initializers, void 0));
                this.description = (__runInitializers(this, _name_extraInitializers), __runInitializers(this, _description_initializers, void 0));
                this.imageUrl = (__runInitializers(this, _description_extraInitializers), __runInitializers(this, _imageUrl_initializers, void 0));
                this.memberIds = (__runInitializers(this, _imageUrl_extraInitializers), __runInitializers(this, _memberIds_initializers, void 0));
                __runInitializers(this, _memberIds_extraInitializers);
            }
            return CreateRoomDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _type_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Room type',
                    enum: ['DIRECT', 'GROUP'],
                    example: 'GROUP',
                }), (0, class_validator_1.IsEnum)(['DIRECT', 'GROUP'])];
            _name_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Group name (required for GROUP type)',
                    example: 'Project Team',
                }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)(), (0, class_validator_1.MaxLength)(100)];
            _description_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Group description',
                    example: 'Discussion group for the project team',
                }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)(), (0, class_validator_1.MaxLength)(500)];
            _imageUrl_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Group image URL',
                }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            _memberIds_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Member user IDs',
                    type: [String],
                }), (0, class_validator_1.IsArray)(), (0, class_validator_1.IsString)({ each: true })];
            __esDecorate(null, null, _type_decorators, { kind: "field", name: "type", static: false, private: false, access: { has: function (obj) { return "type" in obj; }, get: function (obj) { return obj.type; }, set: function (obj, value) { obj.type = value; } }, metadata: _metadata }, _type_initializers, _type_extraInitializers);
            __esDecorate(null, null, _name_decorators, { kind: "field", name: "name", static: false, private: false, access: { has: function (obj) { return "name" in obj; }, get: function (obj) { return obj.name; }, set: function (obj, value) { obj.name = value; } }, metadata: _metadata }, _name_initializers, _name_extraInitializers);
            __esDecorate(null, null, _description_decorators, { kind: "field", name: "description", static: false, private: false, access: { has: function (obj) { return "description" in obj; }, get: function (obj) { return obj.description; }, set: function (obj, value) { obj.description = value; } }, metadata: _metadata }, _description_initializers, _description_extraInitializers);
            __esDecorate(null, null, _imageUrl_decorators, { kind: "field", name: "imageUrl", static: false, private: false, access: { has: function (obj) { return "imageUrl" in obj; }, get: function (obj) { return obj.imageUrl; }, set: function (obj, value) { obj.imageUrl = value; } }, metadata: _metadata }, _imageUrl_initializers, _imageUrl_extraInitializers);
            __esDecorate(null, null, _memberIds_decorators, { kind: "field", name: "memberIds", static: false, private: false, access: { has: function (obj) { return "memberIds" in obj; }, get: function (obj) { return obj.memberIds; }, set: function (obj, value) { obj.memberIds = value; } }, metadata: _metadata }, _memberIds_initializers, _memberIds_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.CreateRoomDto = CreateRoomDto;
/**
 * DTO for updating a room
 */
var UpdateRoomDto = function () {
    var _a;
    var _name_decorators;
    var _name_initializers = [];
    var _name_extraInitializers = [];
    var _description_decorators;
    var _description_initializers = [];
    var _description_extraInitializers = [];
    var _imageUrl_decorators;
    var _imageUrl_initializers = [];
    var _imageUrl_extraInitializers = [];
    return _a = /** @class */ (function () {
            function UpdateRoomDto() {
                this.name = __runInitializers(this, _name_initializers, void 0);
                this.description = (__runInitializers(this, _name_extraInitializers), __runInitializers(this, _description_initializers, void 0));
                this.imageUrl = (__runInitializers(this, _description_extraInitializers), __runInitializers(this, _imageUrl_initializers, void 0));
                __runInitializers(this, _imageUrl_extraInitializers);
            }
            return UpdateRoomDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _name_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Updated group name',
                    example: 'New Project Team Name',
                    maxLength: 100,
                }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)(), (0, class_validator_1.MaxLength)(100)];
            _description_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Updated group description',
                    example: 'Updated description for the project team',
                    maxLength: 500,
                }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)(), (0, class_validator_1.MaxLength)(500)];
            _imageUrl_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Updated group image URL',
                }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            __esDecorate(null, null, _name_decorators, { kind: "field", name: "name", static: false, private: false, access: { has: function (obj) { return "name" in obj; }, get: function (obj) { return obj.name; }, set: function (obj, value) { obj.name = value; } }, metadata: _metadata }, _name_initializers, _name_extraInitializers);
            __esDecorate(null, null, _description_decorators, { kind: "field", name: "description", static: false, private: false, access: { has: function (obj) { return "description" in obj; }, get: function (obj) { return obj.description; }, set: function (obj, value) { obj.description = value; } }, metadata: _metadata }, _description_initializers, _description_extraInitializers);
            __esDecorate(null, null, _imageUrl_decorators, { kind: "field", name: "imageUrl", static: false, private: false, access: { has: function (obj) { return "imageUrl" in obj; }, get: function (obj) { return obj.imageUrl; }, set: function (obj, value) { obj.imageUrl = value; } }, metadata: _metadata }, _imageUrl_initializers, _imageUrl_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.UpdateRoomDto = UpdateRoomDto;
/**
 * DTO for adding members to a room
 */
var AddRoomMembersDto = function () {
    var _a;
    var _userIds_decorators;
    var _userIds_initializers = [];
    var _userIds_extraInitializers = [];
    return _a = /** @class */ (function () {
            function AddRoomMembersDto() {
                this.userIds = __runInitializers(this, _userIds_initializers, void 0);
                __runInitializers(this, _userIds_extraInitializers);
            }
            return AddRoomMembersDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _userIds_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'User IDs to add to the room',
                    example: ['user-uuid-1', 'user-uuid-2'],
                    type: [String],
                }), (0, class_validator_1.IsArray)(), (0, class_validator_1.IsString)({ each: true }), (0, class_validator_1.ArrayMinSize)(1), (0, class_validator_1.ArrayMaxSize)(50)];
            __esDecorate(null, null, _userIds_decorators, { kind: "field", name: "userIds", static: false, private: false, access: { has: function (obj) { return "userIds" in obj; }, get: function (obj) { return obj.userIds; }, set: function (obj, value) { obj.userIds = value; } }, metadata: _metadata }, _userIds_initializers, _userIds_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.AddRoomMembersDto = AddRoomMembersDto;
/**
 * DTO for updating a member's role
 */
var UpdateMemberRoleDto = function () {
    var _a;
    var _role_decorators;
    var _role_initializers = [];
    var _role_extraInitializers = [];
    return _a = /** @class */ (function () {
            function UpdateMemberRoleDto() {
                this.role = __runInitializers(this, _role_initializers, void 0);
                __runInitializers(this, _role_extraInitializers);
            }
            return UpdateMemberRoleDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _role_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'New role for the member',
                    enum: ['ADMIN', 'MODERATOR', 'MEMBER'],
                    example: 'MODERATOR',
                }), (0, class_validator_1.IsEnum)(['ADMIN', 'MODERATOR', 'MEMBER'])];
            __esDecorate(null, null, _role_decorators, { kind: "field", name: "role", static: false, private: false, access: { has: function (obj) { return "role" in obj; }, get: function (obj) { return obj.role; }, set: function (obj, value) { obj.role = value; } }, metadata: _metadata }, _role_initializers, _role_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.UpdateMemberRoleDto = UpdateMemberRoleDto;
/**
 * DTO for updating room member settings
 */
var UpdateRoomMemberSettingsDto = function () {
    var _a;
    var _isMuted_decorators;
    var _isMuted_initializers = [];
    var _isMuted_extraInitializers = [];
    var _isArchived_decorators;
    var _isArchived_initializers = [];
    var _isArchived_extraInitializers = [];
    return _a = /** @class */ (function () {
            function UpdateRoomMemberSettingsDto() {
                this.isMuted = __runInitializers(this, _isMuted_initializers, void 0);
                this.isArchived = (__runInitializers(this, _isMuted_extraInitializers), __runInitializers(this, _isArchived_initializers, void 0));
                __runInitializers(this, _isArchived_extraInitializers);
            }
            return UpdateRoomMemberSettingsDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _isMuted_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Mute room notifications',
                    example: true,
                }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsBoolean)()];
            _isArchived_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Archive the room',
                    example: false,
                }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsBoolean)()];
            __esDecorate(null, null, _isMuted_decorators, { kind: "field", name: "isMuted", static: false, private: false, access: { has: function (obj) { return "isMuted" in obj; }, get: function (obj) { return obj.isMuted; }, set: function (obj, value) { obj.isMuted = value; } }, metadata: _metadata }, _isMuted_initializers, _isMuted_extraInitializers);
            __esDecorate(null, null, _isArchived_decorators, { kind: "field", name: "isArchived", static: false, private: false, access: { has: function (obj) { return "isArchived" in obj; }, get: function (obj) { return obj.isArchived; }, set: function (obj, value) { obj.isArchived = value; } }, metadata: _metadata }, _isArchived_initializers, _isArchived_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.UpdateRoomMemberSettingsDto = UpdateRoomMemberSettingsDto;
