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
exports.CreateEventDto = void 0;
var class_validator_1 = require("class-validator");
var client_1 = require("@prisma/client");
var CreateEventDto = function () {
    var _a;
    var _title_decorators;
    var _title_initializers = [];
    var _title_extraInitializers = [];
    var _description_decorators;
    var _description_initializers = [];
    var _description_extraInitializers = [];
    var _coverPhoto_decorators;
    var _coverPhoto_initializers = [];
    var _coverPhoto_extraInitializers = [];
    var _eventType_decorators;
    var _eventType_initializers = [];
    var _eventType_extraInitializers = [];
    var _startTime_decorators;
    var _startTime_initializers = [];
    var _startTime_extraInitializers = [];
    var _endTime_decorators;
    var _endTime_initializers = [];
    var _endTime_extraInitializers = [];
    var _location_decorators;
    var _location_initializers = [];
    var _location_extraInitializers = [];
    var _onlineMeetingUrl_decorators;
    var _onlineMeetingUrl_initializers = [];
    var _onlineMeetingUrl_extraInitializers = [];
    var _isPublic_decorators;
    var _isPublic_initializers = [];
    var _isPublic_extraInitializers = [];
    var _maxAttendees_decorators;
    var _maxAttendees_initializers = [];
    var _maxAttendees_extraInitializers = [];
    var _ticketPrice_decorators;
    var _ticketPrice_initializers = [];
    var _ticketPrice_extraInitializers = [];
    var _currency_decorators;
    var _currency_initializers = [];
    var _currency_extraInitializers = [];
    return _a = /** @class */ (function () {
            function CreateEventDto() {
                this.title = __runInitializers(this, _title_initializers, void 0);
                this.description = (__runInitializers(this, _title_extraInitializers), __runInitializers(this, _description_initializers, void 0));
                this.coverPhoto = (__runInitializers(this, _description_extraInitializers), __runInitializers(this, _coverPhoto_initializers, void 0));
                this.eventType = (__runInitializers(this, _coverPhoto_extraInitializers), __runInitializers(this, _eventType_initializers, client_1.EventType.OFFLINE));
                this.startTime = (__runInitializers(this, _eventType_extraInitializers), __runInitializers(this, _startTime_initializers, void 0));
                this.endTime = (__runInitializers(this, _startTime_extraInitializers), __runInitializers(this, _endTime_initializers, void 0));
                this.location = (__runInitializers(this, _endTime_extraInitializers), __runInitializers(this, _location_initializers, void 0));
                this.onlineMeetingUrl = (__runInitializers(this, _location_extraInitializers), __runInitializers(this, _onlineMeetingUrl_initializers, void 0));
                this.isPublic = (__runInitializers(this, _onlineMeetingUrl_extraInitializers), __runInitializers(this, _isPublic_initializers, true));
                this.maxAttendees = (__runInitializers(this, _isPublic_extraInitializers), __runInitializers(this, _maxAttendees_initializers, void 0));
                this.ticketPrice = (__runInitializers(this, _maxAttendees_extraInitializers), __runInitializers(this, _ticketPrice_initializers, void 0));
                this.currency = (__runInitializers(this, _ticketPrice_extraInitializers), __runInitializers(this, _currency_initializers, 'USD'));
                __runInitializers(this, _currency_extraInitializers);
            }
            return CreateEventDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _title_decorators = [(0, class_validator_1.IsNotEmpty)({ message: 'Title is required' }), (0, class_validator_1.IsString)(), (0, class_validator_1.MaxLength)(100, { message: 'Title must not exceed 100 characters' })];
            _description_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)(), (0, class_validator_1.MaxLength)(1000, { message: 'Description must not exceed 1000 characters' })];
            _coverPhoto_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)(), (0, class_validator_1.IsUrl)({}, { message: 'Cover photo must be a valid URL' })];
            _eventType_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsEnum)(client_1.EventType, { message: 'Invalid event type' })];
            _startTime_decorators = [(0, class_validator_1.IsNotEmpty)({ message: 'Start time is required' }), (0, class_validator_1.IsDateString)()];
            _endTime_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsDateString)()];
            _location_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            _onlineMeetingUrl_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)(), (0, class_validator_1.IsUrl)({}, { message: 'Online meeting URL must be a valid URL' })];
            _isPublic_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsBoolean)()];
            _maxAttendees_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsNumber)()];
            _ticketPrice_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsNumber)()];
            _currency_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            __esDecorate(null, null, _title_decorators, { kind: "field", name: "title", static: false, private: false, access: { has: function (obj) { return "title" in obj; }, get: function (obj) { return obj.title; }, set: function (obj, value) { obj.title = value; } }, metadata: _metadata }, _title_initializers, _title_extraInitializers);
            __esDecorate(null, null, _description_decorators, { kind: "field", name: "description", static: false, private: false, access: { has: function (obj) { return "description" in obj; }, get: function (obj) { return obj.description; }, set: function (obj, value) { obj.description = value; } }, metadata: _metadata }, _description_initializers, _description_extraInitializers);
            __esDecorate(null, null, _coverPhoto_decorators, { kind: "field", name: "coverPhoto", static: false, private: false, access: { has: function (obj) { return "coverPhoto" in obj; }, get: function (obj) { return obj.coverPhoto; }, set: function (obj, value) { obj.coverPhoto = value; } }, metadata: _metadata }, _coverPhoto_initializers, _coverPhoto_extraInitializers);
            __esDecorate(null, null, _eventType_decorators, { kind: "field", name: "eventType", static: false, private: false, access: { has: function (obj) { return "eventType" in obj; }, get: function (obj) { return obj.eventType; }, set: function (obj, value) { obj.eventType = value; } }, metadata: _metadata }, _eventType_initializers, _eventType_extraInitializers);
            __esDecorate(null, null, _startTime_decorators, { kind: "field", name: "startTime", static: false, private: false, access: { has: function (obj) { return "startTime" in obj; }, get: function (obj) { return obj.startTime; }, set: function (obj, value) { obj.startTime = value; } }, metadata: _metadata }, _startTime_initializers, _startTime_extraInitializers);
            __esDecorate(null, null, _endTime_decorators, { kind: "field", name: "endTime", static: false, private: false, access: { has: function (obj) { return "endTime" in obj; }, get: function (obj) { return obj.endTime; }, set: function (obj, value) { obj.endTime = value; } }, metadata: _metadata }, _endTime_initializers, _endTime_extraInitializers);
            __esDecorate(null, null, _location_decorators, { kind: "field", name: "location", static: false, private: false, access: { has: function (obj) { return "location" in obj; }, get: function (obj) { return obj.location; }, set: function (obj, value) { obj.location = value; } }, metadata: _metadata }, _location_initializers, _location_extraInitializers);
            __esDecorate(null, null, _onlineMeetingUrl_decorators, { kind: "field", name: "onlineMeetingUrl", static: false, private: false, access: { has: function (obj) { return "onlineMeetingUrl" in obj; }, get: function (obj) { return obj.onlineMeetingUrl; }, set: function (obj, value) { obj.onlineMeetingUrl = value; } }, metadata: _metadata }, _onlineMeetingUrl_initializers, _onlineMeetingUrl_extraInitializers);
            __esDecorate(null, null, _isPublic_decorators, { kind: "field", name: "isPublic", static: false, private: false, access: { has: function (obj) { return "isPublic" in obj; }, get: function (obj) { return obj.isPublic; }, set: function (obj, value) { obj.isPublic = value; } }, metadata: _metadata }, _isPublic_initializers, _isPublic_extraInitializers);
            __esDecorate(null, null, _maxAttendees_decorators, { kind: "field", name: "maxAttendees", static: false, private: false, access: { has: function (obj) { return "maxAttendees" in obj; }, get: function (obj) { return obj.maxAttendees; }, set: function (obj, value) { obj.maxAttendees = value; } }, metadata: _metadata }, _maxAttendees_initializers, _maxAttendees_extraInitializers);
            __esDecorate(null, null, _ticketPrice_decorators, { kind: "field", name: "ticketPrice", static: false, private: false, access: { has: function (obj) { return "ticketPrice" in obj; }, get: function (obj) { return obj.ticketPrice; }, set: function (obj, value) { obj.ticketPrice = value; } }, metadata: _metadata }, _ticketPrice_initializers, _ticketPrice_extraInitializers);
            __esDecorate(null, null, _currency_decorators, { kind: "field", name: "currency", static: false, private: false, access: { has: function (obj) { return "currency" in obj; }, get: function (obj) { return obj.currency; }, set: function (obj, value) { obj.currency = value; } }, metadata: _metadata }, _currency_initializers, _currency_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.CreateEventDto = CreateEventDto;
