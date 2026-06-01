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
exports.StreamingService = void 0;
var common_1 = require("@nestjs/common");
var generic_http_exception_1 = require("../../common/application/exceptions/generic-http-exception");
var error_messages_constant_1 = require("../../common/constants/error-messages.constant");
var client_1 = require("@prisma/client");
var StreamingService = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var StreamingService = _classThis = /** @class */ (function () {
        function StreamingService_1(prisma) {
            this.prisma = prisma;
        }
        StreamingService_1.prototype.createStream = function (userId, dto) {
            return __awaiter(this, void 0, void 0, function () {
                var existingActive, stream, rtmpBase, _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, this.prisma.liveStream.findFirst({
                                where: {
                                    hostId: userId,
                                    status: { in: [client_1.StreamStatus.IDLE, client_1.StreamStatus.LIVE] },
                                },
                            })];
                        case 1:
                            existingActive = _b.sent();
                            if (existingActive) {
                                throw new common_1.BadRequestException(error_messages_constant_1.ERROR_MESSAGES.STREAM_ALREADY_LIVE);
                            }
                            _b.label = 2;
                        case 2:
                            _b.trys.push([2, 4, , 5]);
                            return [4 /*yield*/, this.prisma.liveStream.create({
                                    data: __assign(__assign({}, dto), { hostId: userId, status: client_1.StreamStatus.IDLE }),
                                })];
                        case 3:
                            stream = _b.sent();
                            rtmpBase = process.env.RTMP_INGEST_URL || 'rtmp://localhost:1935/live';
                            return [2 /*return*/, __assign(__assign({}, stream), { ingestUrl: "".concat(rtmpBase, "/").concat(stream.streamKey) })];
                        case 4:
                            _a = _b.sent();
                            throw generic_http_exception_1.GenericHttpException.createLocalized(error_messages_constant_1.ERROR_MESSAGES.STREAM_CREATION_FAILED, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
                        case 5: return [2 /*return*/];
                    }
                });
            });
        };
        StreamingService_1.prototype.getActiveStreams = function () {
            return __awaiter(this, arguments, void 0, function (page, limit) {
                var skip, _a, streams, total;
                if (page === void 0) { page = 1; }
                if (limit === void 0) { limit = 20; }
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            skip = (page - 1) * limit;
                            return [4 /*yield*/, Promise.all([
                                    this.prisma.liveStream.findMany({
                                        where: { status: client_1.StreamStatus.LIVE },
                                        include: { host: { select: { id: true, name: true, image: true } } },
                                        orderBy: { viewerCount: 'desc' },
                                        skip: skip,
                                        take: limit,
                                    }),
                                    this.prisma.liveStream.count({ where: { status: client_1.StreamStatus.LIVE } }),
                                ])];
                        case 1:
                            _a = _b.sent(), streams = _a[0], total = _a[1];
                            return [2 /*return*/, {
                                    data: streams,
                                    meta: { page: page, limit: limit, total: total, totalPages: Math.ceil(total / limit) },
                                }];
                    }
                });
            });
        };
        StreamingService_1.prototype.getStreamById = function (streamId) {
            return __awaiter(this, void 0, void 0, function () {
                var stream;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.liveStream.findUnique({
                                where: { id: streamId },
                                include: { host: { select: { id: true, name: true, image: true } } },
                            })];
                        case 1:
                            stream = _a.sent();
                            if (!stream) {
                                throw generic_http_exception_1.GenericHttpException.createLocalized(error_messages_constant_1.ERROR_MESSAGES.STREAM_NOT_FOUND, common_1.HttpStatus.NOT_FOUND);
                            }
                            return [2 /*return*/, stream];
                    }
                });
            });
        };
        StreamingService_1.prototype.endStream = function (streamId, userId) {
            return __awaiter(this, void 0, void 0, function () {
                var stream, _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, this.prisma.liveStream.findUnique({
                                where: { id: streamId },
                            })];
                        case 1:
                            stream = _b.sent();
                            if (!stream)
                                throw new common_1.NotFoundException(error_messages_constant_1.ERROR_MESSAGES.STREAM_NOT_FOUND);
                            if (stream.hostId !== userId) {
                                throw new common_1.ForbiddenException(error_messages_constant_1.ERROR_MESSAGES.STREAM_UNAUTHORIZED);
                            }
                            if (stream.status === client_1.StreamStatus.ENDED)
                                return [2 /*return*/, { ended: true }];
                            _b.label = 2;
                        case 2:
                            _b.trys.push([2, 4, , 5]);
                            return [4 /*yield*/, this.prisma.liveStream.update({
                                    where: { id: streamId },
                                    data: {
                                        status: client_1.StreamStatus.ENDED,
                                        endedAt: new Date(),
                                        recordingUrl: stream.isRecorded
                                            ? "https://cdn.ding.local/vod/".concat(streamId, ".mp4")
                                            : null, // Mocked
                                    },
                                })];
                        case 3:
                            _b.sent();
                            return [2 /*return*/, { ended: true }];
                        case 4:
                            _a = _b.sent();
                            throw generic_http_exception_1.GenericHttpException.createLocalized(error_messages_constant_1.ERROR_MESSAGES.STREAM_END_FAILED, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
                        case 5: return [2 /*return*/];
                    }
                });
            });
        };
        StreamingService_1.prototype.deleteStream = function (streamId, userId) {
            return __awaiter(this, void 0, void 0, function () {
                var stream;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.liveStream.findUnique({
                                where: { id: streamId },
                            })];
                        case 1:
                            stream = _a.sent();
                            if (!stream)
                                throw new common_1.NotFoundException(error_messages_constant_1.ERROR_MESSAGES.STREAM_NOT_FOUND);
                            if (stream.hostId !== userId) {
                                throw new common_1.ForbiddenException(error_messages_constant_1.ERROR_MESSAGES.STREAM_UNAUTHORIZED);
                            }
                            return [4 /*yield*/, this.prisma.liveStream.delete({ where: { id: streamId } })];
                        case 2:
                            _a.sent();
                            return [2 /*return*/, { deleted: true }];
                    }
                });
            });
        };
        StreamingService_1.prototype.getArchivedStreams = function (userId_1) {
            return __awaiter(this, arguments, void 0, function (userId, page, limit) {
                var skip, _a, streams, total;
                if (page === void 0) { page = 1; }
                if (limit === void 0) { limit = 20; }
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            skip = (page - 1) * limit;
                            return [4 /*yield*/, Promise.all([
                                    this.prisma.liveStream.findMany({
                                        where: { hostId: userId, status: client_1.StreamStatus.ENDED, isRecorded: true },
                                        orderBy: { endedAt: 'desc' },
                                        skip: skip,
                                        take: limit,
                                    }),
                                    this.prisma.liveStream.count({
                                        where: { hostId: userId, status: client_1.StreamStatus.ENDED, isRecorded: true },
                                    }),
                                ])];
                        case 1:
                            _a = _b.sent(), streams = _a[0], total = _a[1];
                            return [2 /*return*/, {
                                    data: streams,
                                    meta: { page: page, limit: limit, total: total, totalPages: Math.ceil(total / limit) },
                                }];
                    }
                });
            });
        };
        // --- Methods used by the Gateway (WebSockets) ---
        StreamingService_1.prototype.incrementViewer = function (streamId) {
            return __awaiter(this, void 0, void 0, function () {
                var stream, _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _b.trys.push([0, 4, , 5]);
                            return [4 /*yield*/, this.prisma.liveStream.update({
                                    where: { id: streamId },
                                    data: { viewerCount: { increment: 1 } },
                                    select: { viewerCount: true, peakViewers: true },
                                })];
                        case 1:
                            stream = _b.sent();
                            if (!(stream.viewerCount > stream.peakViewers)) return [3 /*break*/, 3];
                            return [4 /*yield*/, this.prisma.liveStream.update({
                                    where: { id: streamId },
                                    data: { peakViewers: stream.viewerCount },
                                })];
                        case 2:
                            _b.sent();
                            _b.label = 3;
                        case 3: return [2 /*return*/, stream.viewerCount];
                        case 4:
                            _a = _b.sent();
                            return [2 /*return*/, 0];
                        case 5: return [2 /*return*/];
                    }
                });
            });
        };
        StreamingService_1.prototype.decrementViewer = function (streamId) {
            return __awaiter(this, void 0, void 0, function () {
                var stream, _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _b.trys.push([0, 4, , 5]);
                            return [4 /*yield*/, this.prisma.liveStream.update({
                                    where: { id: streamId },
                                    data: { viewerCount: { decrement: 1 } },
                                    select: { viewerCount: true },
                                })];
                        case 1:
                            stream = _b.sent();
                            if (!(stream.viewerCount < 0)) return [3 /*break*/, 3];
                            return [4 /*yield*/, this.prisma.liveStream.update({
                                    where: { id: streamId },
                                    data: { viewerCount: 0 },
                                })];
                        case 2:
                            _b.sent();
                            return [2 /*return*/, 0];
                        case 3: return [2 /*return*/, stream.viewerCount];
                        case 4:
                            _a = _b.sent();
                            return [2 /*return*/, 0];
                        case 5: return [2 /*return*/];
                    }
                });
            });
        };
        return StreamingService_1;
    }());
    __setFunctionName(_classThis, "StreamingService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        StreamingService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return StreamingService = _classThis;
}();
exports.StreamingService = StreamingService;
