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
exports.EventsService = void 0;
var common_1 = require("@nestjs/common");
var generic_http_exception_1 = require("../../common/application/exceptions/generic-http-exception");
var error_messages_constant_1 = require("../../common/constants/error-messages.constant");
var client_1 = require("@prisma/client");
var EventsService = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var EventsService = _classThis = /** @class */ (function () {
        function EventsService_1(prisma, notificationService) {
            this.prisma = prisma;
            this.notificationService = notificationService;
        }
        EventsService_1.prototype.createEvent = function (userId, dto) {
            return __awaiter(this, void 0, void 0, function () {
                var event_1, _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            if (dto.endTime && new Date(dto.endTime) <= new Date(dto.startTime)) {
                                throw new common_1.BadRequestException(error_messages_constant_1.ERROR_MESSAGES.EVENT_INVALID_DATES);
                            }
                            _b.label = 1;
                        case 1:
                            _b.trys.push([1, 4, , 5]);
                            return [4 /*yield*/, this.prisma.event.create({
                                    data: __assign(__assign({}, dto), { hostId: userId }),
                                })];
                        case 2:
                            event_1 = _b.sent();
                            // Automatically set host as GOING
                            return [4 /*yield*/, this.prisma.eventAttendee.create({
                                    data: {
                                        eventId: event_1.id,
                                        userId: userId,
                                        rsvpStatus: client_1.RSVPStatus.GOING,
                                    },
                                })];
                        case 3:
                            // Automatically set host as GOING
                            _b.sent();
                            return [2 /*return*/, event_1];
                        case 4:
                            _a = _b.sent();
                            throw generic_http_exception_1.GenericHttpException.createLocalized(error_messages_constant_1.ERROR_MESSAGES.EVENT_CREATION_FAILED, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
                        case 5: return [2 /*return*/];
                    }
                });
            });
        };
        EventsService_1.prototype.discoverEvents = function () {
            return __awaiter(this, arguments, void 0, function (page, limit, type) {
                var skip, where, _a, events, total;
                if (page === void 0) { page = 1; }
                if (limit === void 0) { limit = 20; }
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            skip = (page - 1) * limit;
                            where = {
                                isPublic: true,
                                deletedAt: null,
                                startTime: { gt: new Date() }, // Only upcoming events
                            };
                            if (type) {
                                where.eventType = type;
                            }
                            return [4 /*yield*/, Promise.all([
                                    this.prisma.event.findMany({
                                        where: where,
                                        include: { host: { select: { id: true, name: true, image: true } } },
                                        orderBy: { startTime: 'asc' },
                                        skip: skip,
                                        take: limit,
                                    }),
                                    this.prisma.event.count({ where: where }),
                                ])];
                        case 1:
                            _a = _b.sent(), events = _a[0], total = _a[1];
                            return [2 /*return*/, {
                                    data: events,
                                    meta: { page: page, limit: limit, total: total, totalPages: Math.ceil(total / limit) },
                                }];
                    }
                });
            });
        };
        EventsService_1.prototype.getEventById = function (eventId) {
            return __awaiter(this, void 0, void 0, function () {
                var event;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.event.findFirst({
                                where: { id: eventId, deletedAt: null },
                                include: {
                                    host: { select: { id: true, name: true, image: true } },
                                },
                            })];
                        case 1:
                            event = _a.sent();
                            if (!event) {
                                throw generic_http_exception_1.GenericHttpException.createLocalized(error_messages_constant_1.ERROR_MESSAGES.EVENT_NOT_FOUND, common_1.HttpStatus.NOT_FOUND);
                            }
                            return [2 /*return*/, event];
                    }
                });
            });
        };
        EventsService_1.prototype.updateEvent = function (eventId, userId, dto) {
            return __awaiter(this, void 0, void 0, function () {
                var event, start, end, _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, this.prisma.event.findFirst({
                                where: { id: eventId, deletedAt: null },
                            })];
                        case 1:
                            event = _b.sent();
                            if (!event)
                                throw new common_1.NotFoundException(error_messages_constant_1.ERROR_MESSAGES.EVENT_NOT_FOUND);
                            if (event.hostId !== userId) {
                                throw new common_1.ForbiddenException(error_messages_constant_1.ERROR_MESSAGES.EVENT_UNAUTHORIZED);
                            }
                            if (dto.endTime || dto.startTime) {
                                start = new Date(dto.startTime || event.startTime);
                                end = dto.endTime ? new Date(dto.endTime) : event.endTime;
                                if (end && end <= start) {
                                    throw new common_1.BadRequestException(error_messages_constant_1.ERROR_MESSAGES.EVENT_INVALID_DATES);
                                }
                            }
                            _b.label = 2;
                        case 2:
                            _b.trys.push([2, 4, , 5]);
                            return [4 /*yield*/, this.prisma.event.update({
                                    where: { id: eventId },
                                    data: dto,
                                })];
                        case 3: return [2 /*return*/, _b.sent()];
                        case 4:
                            _a = _b.sent();
                            throw generic_http_exception_1.GenericHttpException.createLocalized(error_messages_constant_1.ERROR_MESSAGES.EVENT_UPDATE_FAILED, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
                        case 5: return [2 /*return*/];
                    }
                });
            });
        };
        EventsService_1.prototype.deleteEvent = function (eventId, userId) {
            return __awaiter(this, void 0, void 0, function () {
                var event;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.event.findFirst({
                                where: { id: eventId, deletedAt: null },
                            })];
                        case 1:
                            event = _a.sent();
                            if (!event)
                                throw new common_1.NotFoundException(error_messages_constant_1.ERROR_MESSAGES.EVENT_NOT_FOUND);
                            if (event.hostId !== userId) {
                                throw new common_1.ForbiddenException(error_messages_constant_1.ERROR_MESSAGES.EVENT_UNAUTHORIZED);
                            }
                            return [4 /*yield*/, this.prisma.event.update({
                                    where: { id: eventId },
                                    data: { deletedAt: new Date() },
                                })];
                        case 2:
                            _a.sent();
                            return [2 /*return*/, { deleted: true }];
                    }
                });
            });
        };
        EventsService_1.prototype.rsvpEvent = function (eventId, userId, status) {
            return __awaiter(this, void 0, void 0, function () {
                var event, goingCount, attendee, newGoingCount, existingTicket;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.event.findFirst({
                                where: { id: eventId, deletedAt: null },
                            })];
                        case 1:
                            event = _a.sent();
                            if (!event)
                                throw new common_1.NotFoundException(error_messages_constant_1.ERROR_MESSAGES.EVENT_NOT_FOUND);
                            if (new Date() >= event.startTime) {
                                throw new common_1.BadRequestException(error_messages_constant_1.ERROR_MESSAGES.EVENT_STARTED);
                            }
                            if (!(status === client_1.RSVPStatus.GOING && event.maxAttendees)) return [3 /*break*/, 3];
                            return [4 /*yield*/, this.prisma.eventAttendee.count({
                                    where: { eventId: eventId, rsvpStatus: client_1.RSVPStatus.GOING },
                                })];
                        case 2:
                            goingCount = _a.sent();
                            if (goingCount >= event.maxAttendees) {
                                throw new common_1.BadRequestException(error_messages_constant_1.ERROR_MESSAGES.EVENT_FULL);
                            }
                            _a.label = 3;
                        case 3: return [4 /*yield*/, this.prisma.eventAttendee.upsert({
                                where: { eventId_userId: { eventId: eventId, userId: userId } },
                                update: { rsvpStatus: status, rsvpAt: new Date() },
                                create: { eventId: eventId, userId: userId, rsvpStatus: status },
                            })];
                        case 4:
                            attendee = _a.sent();
                            return [4 /*yield*/, this.prisma.eventAttendee.count({
                                    where: { eventId: eventId, rsvpStatus: client_1.RSVPStatus.GOING },
                                })];
                        case 5:
                            newGoingCount = _a.sent();
                            return [4 /*yield*/, this.prisma.event.update({
                                    where: { id: eventId },
                                    data: { attendeeCount: newGoingCount },
                                })];
                        case 6:
                            _a.sent();
                            if (!(status === client_1.RSVPStatus.GOING &&
                                event.ticketPrice &&
                                event.ticketPrice > 0)) return [3 /*break*/, 9];
                            return [4 /*yield*/, this.prisma.eventTicket.findUnique({
                                    where: { eventId_userId: { eventId: eventId, userId: userId } },
                                })];
                        case 7:
                            existingTicket = _a.sent();
                            if (!!existingTicket) return [3 /*break*/, 9];
                            return [4 /*yield*/, this.prisma.eventTicket.create({
                                    data: {
                                        eventId: eventId,
                                        userId: userId,
                                        status: client_1.EventTicketStatus.PENDING_PAYMENT,
                                        paidAmount: 0,
                                    },
                                })];
                        case 8:
                            _a.sent();
                            _a.label = 9;
                        case 9:
                            // Notify host
                            if (event.hostId !== userId) {
                                this.notificationService.createNotification(event.hostId, client_1.NotificationType.EVENT_RSVP, 'New RSVP', 'RSVPed to your event', userId, { referenceId: eventId, referenceType: 'Event' });
                            }
                            return [2 /*return*/, attendee];
                    }
                });
            });
        };
        EventsService_1.prototype.cancelRsvp = function (eventId, userId) {
            return __awaiter(this, void 0, void 0, function () {
                var attendee, newGoingCount;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.eventAttendee.findUnique({
                                where: { eventId_userId: { eventId: eventId, userId: userId } },
                                include: { event: true },
                            })];
                        case 1:
                            attendee = _a.sent();
                            if (!attendee || attendee.event.deletedAt) {
                                throw new common_1.NotFoundException(error_messages_constant_1.ERROR_MESSAGES.EVENT_NOT_RSVPED);
                            }
                            if (new Date() >= attendee.event.startTime) {
                                throw new common_1.BadRequestException(error_messages_constant_1.ERROR_MESSAGES.EVENT_STARTED);
                            }
                            return [4 /*yield*/, this.prisma.$transaction([
                                    this.prisma.eventAttendee.delete({
                                        where: { id: attendee.id },
                                    }),
                                    this.prisma.eventTicket.deleteMany({
                                        where: { eventId: eventId, userId: userId, status: client_1.EventTicketStatus.PENDING_PAYMENT },
                                    }),
                                ])];
                        case 2:
                            _a.sent();
                            return [4 /*yield*/, this.prisma.eventAttendee.count({
                                    where: { eventId: eventId, rsvpStatus: client_1.RSVPStatus.GOING },
                                })];
                        case 3:
                            newGoingCount = _a.sent();
                            return [4 /*yield*/, this.prisma.event.update({
                                    where: { id: eventId },
                                    data: { attendeeCount: newGoingCount },
                                })];
                        case 4:
                            _a.sent();
                            return [2 /*return*/, { cancelled: true }];
                    }
                });
            });
        };
        EventsService_1.prototype.getAttendees = function (eventId_1) {
            return __awaiter(this, arguments, void 0, function (eventId, page, limit) {
                var skip, _a, attendees, total;
                if (page === void 0) { page = 1; }
                if (limit === void 0) { limit = 20; }
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            skip = (page - 1) * limit;
                            return [4 /*yield*/, Promise.all([
                                    this.prisma.eventAttendee.findMany({
                                        where: { eventId: eventId, rsvpStatus: client_1.RSVPStatus.GOING },
                                        include: { user: { select: { id: true, name: true, image: true } } },
                                        orderBy: { rsvpAt: 'asc' },
                                        skip: skip,
                                        take: limit,
                                    }),
                                    this.prisma.eventAttendee.count({
                                        where: { eventId: eventId, rsvpStatus: client_1.RSVPStatus.GOING },
                                    }),
                                ])];
                        case 1:
                            _a = _b.sent(), attendees = _a[0], total = _a[1];
                            return [2 /*return*/, {
                                    data: attendees,
                                    meta: { page: page, limit: limit, total: total, totalPages: Math.ceil(total / limit) },
                                }];
                    }
                });
            });
        };
        EventsService_1.prototype.getTicket = function (eventId, userId) {
            return __awaiter(this, void 0, void 0, function () {
                var ticket;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.eventTicket.findUnique({
                                where: { eventId_userId: { eventId: eventId, userId: userId } },
                                include: {
                                    event: { select: { title: true, startTime: true, ticketPrice: true } },
                                },
                            })];
                        case 1:
                            ticket = _a.sent();
                            if (!ticket) {
                                throw new common_1.NotFoundException(error_messages_constant_1.ERROR_MESSAGES.EVENT_TICKET_NOT_FOUND);
                            }
                            return [2 /*return*/, ticket];
                    }
                });
            });
        };
        EventsService_1.prototype.linkEventToGroup = function (groupId, eventId, userId) {
            return __awaiter(this, void 0, void 0, function () {
                var event, groupMember, existingLink;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.event.findUnique({
                                where: { id: eventId },
                            })];
                        case 1:
                            event = _a.sent();
                            if (!event || event.hostId !== userId) {
                                throw new common_1.ForbiddenException(error_messages_constant_1.ERROR_MESSAGES.EVENT_UNAUTHORIZED);
                            }
                            return [4 /*yield*/, this.prisma.groupMember.findUnique({
                                    where: { groupId_userId: { groupId: groupId, userId: userId } },
                                })];
                        case 2:
                            groupMember = _a.sent();
                            if (!groupMember || groupMember.role !== 'ADMIN') {
                                throw new common_1.ForbiddenException(error_messages_constant_1.ERROR_MESSAGES.GROUP_UNAUTHORIZED);
                            }
                            return [4 /*yield*/, this.prisma.groupEvent.findUnique({
                                    where: { groupId_eventId: { groupId: groupId, eventId: eventId } },
                                })];
                        case 3:
                            existingLink = _a.sent();
                            if (existingLink) {
                                throw new common_1.BadRequestException(error_messages_constant_1.ERROR_MESSAGES.GROUP_EVENT_ALREADY_LINKED);
                            }
                            return [2 /*return*/, this.prisma.groupEvent.create({
                                    data: { groupId: groupId, eventId: eventId, linkedById: userId },
                                })];
                    }
                });
            });
        };
        EventsService_1.prototype.getGroupEvents = function (groupId_1) {
            return __awaiter(this, arguments, void 0, function (groupId, page, limit) {
                var skip, _a, links, total;
                if (page === void 0) { page = 1; }
                if (limit === void 0) { limit = 20; }
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            skip = (page - 1) * limit;
                            return [4 /*yield*/, Promise.all([
                                    this.prisma.groupEvent.findMany({
                                        where: { groupId: groupId },
                                        include: { event: true },
                                        orderBy: { linkedAt: 'desc' },
                                        skip: skip,
                                        take: limit,
                                    }),
                                    this.prisma.groupEvent.count({ where: { groupId: groupId } }),
                                ])];
                        case 1:
                            _a = _b.sent(), links = _a[0], total = _a[1];
                            return [2 /*return*/, {
                                    data: links.map(function (l) { return l.event; }),
                                    meta: { page: page, limit: limit, total: total, totalPages: Math.ceil(total / limit) },
                                }];
                    }
                });
            });
        };
        return EventsService_1;
    }());
    __setFunctionName(_classThis, "EventsService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        EventsService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return EventsService = _classThis;
}();
exports.EventsService = EventsService;
