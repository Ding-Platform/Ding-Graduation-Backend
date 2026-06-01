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
exports.EventsController = void 0;
var common_1 = require("@nestjs/common");
var jwt_guard_1 = require("../../common/guards/strategy.guards/jwt.guard");
var EventsController = function () {
    var _classDecorators = [(0, common_1.UseGuards)(jwt_guard_1.JwtAuthenticationGuard), (0, common_1.Controller)('events')];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _instanceExtraInitializers = [];
    var _createEvent_decorators;
    var _discoverEvents_decorators;
    var _getEventById_decorators;
    var _updateEvent_decorators;
    var _deleteEvent_decorators;
    var _rsvpEvent_decorators;
    var _cancelRsvp_decorators;
    var _getAttendees_decorators;
    var _getTicket_decorators;
    var _linkEventToGroup_decorators;
    var _getGroupEvents_decorators;
    var EventsController = _classThis = /** @class */ (function () {
        function EventsController_1(eventsService) {
            this.eventsService = (__runInitializers(this, _instanceExtraInitializers), eventsService);
        }
        EventsController_1.prototype.createEvent = function (userId, dto) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.eventsService.createEvent(userId, dto)];
                });
            });
        };
        EventsController_1.prototype.discoverEvents = function () {
            return __awaiter(this, arguments, void 0, function (page, limit, type) {
                if (page === void 0) { page = 1; }
                if (limit === void 0) { limit = 20; }
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.eventsService.discoverEvents(page, limit, type)];
                });
            });
        };
        EventsController_1.prototype.getEventById = function (eventId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.eventsService.getEventById(eventId)];
                });
            });
        };
        EventsController_1.prototype.updateEvent = function (eventId, userId, dto) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.eventsService.updateEvent(eventId, userId, dto)];
                });
            });
        };
        EventsController_1.prototype.deleteEvent = function (eventId, userId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.eventsService.deleteEvent(eventId, userId)];
                });
            });
        };
        EventsController_1.prototype.rsvpEvent = function (eventId, userId, dto) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.eventsService.rsvpEvent(eventId, userId, dto.status)];
                });
            });
        };
        EventsController_1.prototype.cancelRsvp = function (eventId, userId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.eventsService.cancelRsvp(eventId, userId)];
                });
            });
        };
        EventsController_1.prototype.getAttendees = function (eventId_1) {
            return __awaiter(this, arguments, void 0, function (eventId, page, limit) {
                if (page === void 0) { page = 1; }
                if (limit === void 0) { limit = 20; }
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.eventsService.getAttendees(eventId, page, limit)];
                });
            });
        };
        EventsController_1.prototype.getTicket = function (eventId, userId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.eventsService.getTicket(eventId, userId)];
                });
            });
        };
        // --- Group Linking Endpoints (Can also live in GroupsController, placing here for Event context) ---
        EventsController_1.prototype.linkEventToGroup = function (groupId, eventId, userId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.eventsService.linkEventToGroup(groupId, eventId, userId)];
                });
            });
        };
        EventsController_1.prototype.getGroupEvents = function (groupId_1) {
            return __awaiter(this, arguments, void 0, function (groupId, page, limit) {
                if (page === void 0) { page = 1; }
                if (limit === void 0) { limit = 20; }
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.eventsService.getGroupEvents(groupId, page, limit)];
                });
            });
        };
        return EventsController_1;
    }());
    __setFunctionName(_classThis, "EventsController");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _createEvent_decorators = [(0, common_1.Post)('/')];
        _discoverEvents_decorators = [(0, common_1.Get)('/')];
        _getEventById_decorators = [(0, common_1.Get)('/:id')];
        _updateEvent_decorators = [(0, common_1.Put)('/:id')];
        _deleteEvent_decorators = [(0, common_1.Delete)('/:id')];
        _rsvpEvent_decorators = [(0, common_1.Post)('/:id/rsvp')];
        _cancelRsvp_decorators = [(0, common_1.Delete)('/:id/rsvp')];
        _getAttendees_decorators = [(0, common_1.Get)('/:id/attendees')];
        _getTicket_decorators = [(0, common_1.Get)('/:id/ticket')];
        _linkEventToGroup_decorators = [(0, common_1.Post)('/group/:groupId/link/:eventId')];
        _getGroupEvents_decorators = [(0, common_1.Get)('/group/:groupId')];
        __esDecorate(_classThis, null, _createEvent_decorators, { kind: "method", name: "createEvent", static: false, private: false, access: { has: function (obj) { return "createEvent" in obj; }, get: function (obj) { return obj.createEvent; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _discoverEvents_decorators, { kind: "method", name: "discoverEvents", static: false, private: false, access: { has: function (obj) { return "discoverEvents" in obj; }, get: function (obj) { return obj.discoverEvents; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getEventById_decorators, { kind: "method", name: "getEventById", static: false, private: false, access: { has: function (obj) { return "getEventById" in obj; }, get: function (obj) { return obj.getEventById; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _updateEvent_decorators, { kind: "method", name: "updateEvent", static: false, private: false, access: { has: function (obj) { return "updateEvent" in obj; }, get: function (obj) { return obj.updateEvent; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _deleteEvent_decorators, { kind: "method", name: "deleteEvent", static: false, private: false, access: { has: function (obj) { return "deleteEvent" in obj; }, get: function (obj) { return obj.deleteEvent; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _rsvpEvent_decorators, { kind: "method", name: "rsvpEvent", static: false, private: false, access: { has: function (obj) { return "rsvpEvent" in obj; }, get: function (obj) { return obj.rsvpEvent; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _cancelRsvp_decorators, { kind: "method", name: "cancelRsvp", static: false, private: false, access: { has: function (obj) { return "cancelRsvp" in obj; }, get: function (obj) { return obj.cancelRsvp; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getAttendees_decorators, { kind: "method", name: "getAttendees", static: false, private: false, access: { has: function (obj) { return "getAttendees" in obj; }, get: function (obj) { return obj.getAttendees; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getTicket_decorators, { kind: "method", name: "getTicket", static: false, private: false, access: { has: function (obj) { return "getTicket" in obj; }, get: function (obj) { return obj.getTicket; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _linkEventToGroup_decorators, { kind: "method", name: "linkEventToGroup", static: false, private: false, access: { has: function (obj) { return "linkEventToGroup" in obj; }, get: function (obj) { return obj.linkEventToGroup; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getGroupEvents_decorators, { kind: "method", name: "getGroupEvents", static: false, private: false, access: { has: function (obj) { return "getGroupEvents" in obj; }, get: function (obj) { return obj.getGroupEvents; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        EventsController = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return EventsController = _classThis;
}();
exports.EventsController = EventsController;
