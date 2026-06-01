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
exports.CallService = void 0;
var common_1 = require("@nestjs/common");
var CallService = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var CallService = _classThis = /** @class */ (function () {
        function CallService_1(prisma, redisService) {
            this.prisma = prisma;
            this.redisService = redisService;
            this.logger = new common_1.Logger('CallService');
            this.ROOM_TTL_SECONDS = 3600;
            this.SILENCE_THRESHOLD = 10;
            this.activeSpeaker = new Map();
            this.speakerTimers = new Map();
        }
        /** Called by NestJS on shutdown — clears all pending debounce timers. */
        CallService_1.prototype.onModuleDestroy = function () {
            for (var _i = 0, _a = this.speakerTimers.values(); _i < _a.length; _i++) {
                var timer = _a[_i];
                clearTimeout(timer);
            }
            this.speakerTimers.clear();
            this.activeSpeaker.clear();
        };
        CallService_1.prototype.participantsKey = function (roomId) {
            return "room:".concat(roomId, ":participants");
        };
        CallService_1.prototype.stateKey = function (roomId) {
            return "room:".concat(roomId, ":state");
        };
        CallService_1.prototype.bandwidthKey = function (roomId, peerId) {
            return "call:bw:".concat(roomId, ":").concat(peerId);
        };
        CallService_1.prototype.getOrCreateRoom = function (roomId, userId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.prisma.callRoom.upsert({
                            where: { id: roomId },
                            update: {},
                            create: {
                                id: roomId,
                                createdById: userId,
                            },
                        })];
                });
            });
        };
        CallService_1.prototype.joinRoomParticipant = function (payload) {
            return __awaiter(this, void 0, void 0, function () {
                var room, participantsHashKey, currentCount, participantState, allParticipants;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.getOrCreateRoom(payload.roomId, payload.userId)];
                        case 1:
                            room = _a.sent();
                            participantsHashKey = this.participantsKey(payload.roomId);
                            return [4 /*yield*/, this.redisService.hLen(participantsHashKey)];
                        case 2:
                            currentCount = _a.sent();
                            if (currentCount >= room.maxParticipants) {
                                return [2 /*return*/, { participants: [], roomFull: true }];
                            }
                            participantState = {
                                userId: payload.userId,
                                peerId: payload.peerId,
                                displayName: payload.displayName,
                                avatarUrl: payload.avatarUrl,
                                joinedAt: Date.now(),
                                audio: true,
                                video: true,
                            };
                            return [4 /*yield*/, this.redisService.hSet(participantsHashKey, payload.peerId, JSON.stringify(participantState))];
                        case 3:
                            _a.sent();
                            return [4 /*yield*/, this.redisService.expire(participantsHashKey, this.ROOM_TTL_SECONDS)];
                        case 4:
                            _a.sent();
                            return [4 /*yield*/, this.redisService.expire(this.stateKey(payload.roomId), this.ROOM_TTL_SECONDS)];
                        case 5:
                            _a.sent();
                            this.prisma.callParticipant
                                .create({
                                data: {
                                    roomId: payload.roomId,
                                    userId: payload.userId,
                                    peerId: payload.peerId,
                                },
                            })
                                .catch(function (error) {
                                return _this.logger.error('Failed to record call participant join', error);
                            });
                            return [4 /*yield*/, this.redisService.hGetAll(participantsHashKey)];
                        case 6:
                            allParticipants = _a.sent();
                            return [2 /*return*/, {
                                    participants: Object.values(allParticipants)
                                        .map(function (participant) { return _this.safeParseParticipant(participant); })
                                        .filter(function (participant) {
                                        return Boolean(participant);
                                    }),
                                    roomFull: false,
                                }];
                    }
                });
            });
        };
        CallService_1.prototype.leaveRoomParticipant = function (roomId, peerId) {
            return __awaiter(this, void 0, void 0, function () {
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.redisService.hDel(this.participantsKey(roomId), peerId)];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, this.redisService.hDel(this.stateKey(roomId), "audio:".concat(peerId))];
                        case 2:
                            _a.sent();
                            return [4 /*yield*/, this.redisService.hDel(this.stateKey(roomId), "video:".concat(peerId))];
                        case 3:
                            _a.sent();
                            this.prisma.callParticipant
                                .updateMany({
                                where: {
                                    roomId: roomId,
                                    peerId: peerId,
                                    leftAt: null,
                                },
                                data: {
                                    leftAt: new Date(),
                                },
                            })
                                .catch(function (error) {
                                return _this.logger.error('Failed to record participant leave', error);
                            });
                            return [2 /*return*/];
                    }
                });
            });
        };
        CallService_1.prototype.setMediaState = function (roomId, peerId, audio, video) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.redisService.hSet(this.stateKey(roomId), "audio:".concat(peerId), String(audio))];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, this.redisService.hSet(this.stateKey(roomId), "video:".concat(peerId), String(video))];
                        case 2:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        CallService_1.prototype.tryStartScreenShare = function (roomId, peerId) {
            return __awaiter(this, void 0, void 0, function () {
                var roomStateKey, active;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            roomStateKey = this.stateKey(roomId);
                            return [4 /*yield*/, this.redisService.hGet(roomStateKey, 'screenShareActive')];
                        case 1:
                            active = _a.sent();
                            if (active === '1') {
                                return [2 /*return*/, false];
                            }
                            return [4 /*yield*/, this.redisService.hSet(roomStateKey, 'screenShareActive', '1')];
                        case 2:
                            _a.sent();
                            return [4 /*yield*/, this.redisService.hSet(roomStateKey, 'screenSharerId', peerId)];
                        case 3:
                            _a.sent();
                            return [4 /*yield*/, this.redisService.expire(roomStateKey, this.ROOM_TTL_SECONDS)];
                        case 4:
                            _a.sent();
                            return [2 /*return*/, true];
                    }
                });
            });
        };
        CallService_1.prototype.stopScreenShare = function (roomId, peerId) {
            return __awaiter(this, void 0, void 0, function () {
                var roomStateKey, currentSharer;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            roomStateKey = this.stateKey(roomId);
                            return [4 /*yield*/, this.redisService.hGet(roomStateKey, 'screenSharerId')];
                        case 1:
                            currentSharer = _a.sent();
                            if (peerId && currentSharer && currentSharer !== peerId) {
                                return [2 /*return*/, false];
                            }
                            return [4 /*yield*/, this.redisService.hDel(roomStateKey, 'screenShareActive')];
                        case 2:
                            _a.sent();
                            return [4 /*yield*/, this.redisService.hDel(roomStateKey, 'screenSharerId')];
                        case 3:
                            _a.sent();
                            return [2 /*return*/, true];
                    }
                });
            });
        };
        CallService_1.prototype.getScreenShareState = function (roomId) {
            return __awaiter(this, void 0, void 0, function () {
                var roomStateKey, active, sharerId;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            roomStateKey = this.stateKey(roomId);
                            return [4 /*yield*/, this.redisService.hGet(roomStateKey, 'screenShareActive')];
                        case 1:
                            active = _a.sent();
                            return [4 /*yield*/, this.redisService.hGet(roomStateKey, 'screenSharerId')];
                        case 2:
                            sharerId = _a.sent();
                            return [2 /*return*/, {
                                    active: active === '1',
                                    sharerId: sharerId !== null && sharerId !== void 0 ? sharerId : null,
                                }];
                    }
                });
            });
        };
        CallService_1.prototype.reportAudioLevel = function (roomId, peerId, level) {
            return __awaiter(this, void 0, void 0, function () {
                var previousTimer;
                var _this = this;
                return __generator(this, function (_a) {
                    if (level < this.SILENCE_THRESHOLD) {
                        return [2 /*return*/, null];
                    }
                    previousTimer = this.speakerTimers.get(roomId);
                    if (previousTimer) {
                        clearTimeout(previousTimer);
                    }
                    return [2 /*return*/, new Promise(function (resolve) {
                            var timer = setTimeout(function () {
                                _this.speakerTimers.delete(roomId);
                                var currentSpeaker = _this.activeSpeaker.get(roomId);
                                if (currentSpeaker === peerId) {
                                    // Already the active speaker — no change to broadcast
                                    resolve(null);
                                    return;
                                }
                                _this.activeSpeaker.set(roomId, peerId);
                                resolve(peerId);
                            }, 500);
                            _this.speakerTimers.set(roomId, timer);
                        })];
                });
            });
        };
        /** Called by the gateway when a peer leaves so stale entries are pruned. */
        CallService_1.prototype.clearActiveSpeaker = function (roomId) {
            this.activeSpeaker.delete(roomId);
            var timer = this.speakerTimers.get(roomId);
            if (timer) {
                clearTimeout(timer);
                this.speakerTimers.delete(roomId);
            }
        };
        CallService_1.prototype.reportBandwidth = function (roomId, peerId, stats) {
            return __awaiter(this, void 0, void 0, function () {
                var key, payload;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            key = this.bandwidthKey(roomId, peerId);
                            payload = JSON.stringify(__assign({ timestamp: Date.now() }, stats));
                            return [4 /*yield*/, this.redisService.zAdd(key, Date.now(), payload)];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, this.redisService.expire(key, this.ROOM_TTL_SECONDS)];
                        case 2:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        CallService_1.prototype.getQualityHints = function (roomId) {
            return __awaiter(this, void 0, void 0, function () {
                var participantCount, recommendedVideoLayers;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.redisService.hLen(this.participantsKey(roomId))];
                        case 1:
                            participantCount = _a.sent();
                            recommendedVideoLayers = 'high';
                            if (participantCount > 8) {
                                recommendedVideoLayers = 'low';
                            }
                            else if (participantCount > 4) {
                                recommendedVideoLayers = 'medium';
                            }
                            return [2 /*return*/, {
                                    participantCount: participantCount,
                                    recommendedVideoLayers: recommendedVideoLayers,
                                    networkCondition: participantCount > 8 ? 'degraded' : 'good',
                                }];
                    }
                });
            });
        };
        CallService_1.prototype.safeParseParticipant = function (payload) {
            try {
                return JSON.parse(payload);
            }
            catch (_a) {
                return null;
            }
        };
        return CallService_1;
    }());
    __setFunctionName(_classThis, "CallService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        CallService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return CallService = _classThis;
}();
exports.CallService = CallService;
