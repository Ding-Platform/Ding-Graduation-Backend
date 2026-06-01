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
exports.CallGateway = void 0;
var websockets_1 = require("@nestjs/websockets");
var common_1 = require("@nestjs/common");
var CallGateway = function () {
    var _classDecorators = [(0, websockets_1.WebSocketGateway)({
            namespace: 'call',
            cors: {
                origin: '*',
            },
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _instanceExtraInitializers = [];
    var _server_decorators;
    var _server_initializers = [];
    var _server_extraInitializers = [];
    var _handleJoinRoom_decorators;
    var _handleLeaveRoom_decorators;
    var _handleMediaStateChanged_decorators;
    var _handleScreenShareStart_decorators;
    var _handleScreenShareStop_decorators;
    var _handleAudioLevelReport_decorators;
    var _handleBandwidthReport_decorators;
    var _handleJoinCall_decorators;
    var _handleOffer_decorators;
    var _handleAnswer_decorators;
    var _handleIceCandidate_decorators;
    var _handleLeaveCall_decorators;
    var CallGateway = _classThis = /** @class */ (function () {
        function CallGateway_1(callService) {
            this.callService = (__runInitializers(this, _instanceExtraInitializers), callService);
            this.server = __runInitializers(this, _server_initializers, void 0);
            this.logger = (__runInitializers(this, _server_extraInitializers), new common_1.Logger('CallGateway'));
        }
        CallGateway_1.prototype.handleConnection = function (client) {
            this.logger.log("Call Client connected: ".concat(client.id));
        };
        CallGateway_1.prototype.handleDisconnect = function (client) {
            this.logger.log("Call Client disconnected: ".concat(client.id));
        };
        // ─────────────────────────────────────────────────────────────────────────
        // Group call / participant management
        // ─────────────────────────────────────────────────────────────────────────
        CallGateway_1.prototype.handleJoinRoom = function (data, client) {
            return __awaiter(this, void 0, void 0, function () {
                var result, err_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, this.callService.joinRoomParticipant(data)];
                        case 1:
                            result = _a.sent();
                            if (result.roomFull) {
                                client.emit('call_error', { code: 'ROOM_FULL' });
                                return [2 /*return*/];
                            }
                            client.join(data.roomId);
                            client.emit('participant_joined', {
                                peerId: data.peerId,
                                userId: data.userId,
                                displayName: data.displayName,
                                avatarUrl: data.avatarUrl,
                                existingParticipants: result.participants,
                            });
                            client.to(data.roomId).emit('participant_joined', {
                                peerId: data.peerId,
                                userId: data.userId,
                                displayName: data.displayName,
                                avatarUrl: data.avatarUrl,
                                existingParticipants: [],
                            });
                            return [3 /*break*/, 3];
                        case 2:
                            err_1 = _a.sent();
                            this.logger.error('join_room failed', err_1);
                            client.emit('call_error', { code: 'INTERNAL_ERROR' });
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        CallGateway_1.prototype.handleLeaveRoom = function (data, client) {
            return __awaiter(this, void 0, void 0, function () {
                var err_2;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 3, , 4]);
                            return [4 /*yield*/, this.callService.leaveRoomParticipant(data.roomId, data.peerId)];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, this.callService.stopScreenShare(data.roomId, data.peerId)];
                        case 2:
                            _a.sent();
                            // Clean up active speaker tracking for this peer when they leave
                            this.callService.clearActiveSpeaker(data.roomId);
                            client.leave(data.roomId);
                            client.to(data.roomId).emit('participant_left', { peerId: data.peerId });
                            client
                                .to(data.roomId)
                                .emit('peer_screen_share_stopped', { peerId: data.peerId });
                            return [3 /*break*/, 4];
                        case 3:
                            err_2 = _a.sent();
                            this.logger.error('leave_room failed', err_2);
                            return [3 /*break*/, 4];
                        case 4: return [2 /*return*/];
                    }
                });
            });
        };
        CallGateway_1.prototype.handleMediaStateChanged = function (data, client) {
            return __awaiter(this, void 0, void 0, function () {
                var err_3;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, this.callService.setMediaState(data.roomId, data.peerId, data.audio, data.video)];
                        case 1:
                            _a.sent();
                            client.to(data.roomId).emit('peer_media_state', {
                                peerId: data.peerId,
                                audio: data.audio,
                                video: data.video,
                            });
                            return [3 /*break*/, 3];
                        case 2:
                            err_3 = _a.sent();
                            this.logger.error('media_state_changed failed', err_3);
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        // ─────────────────────────────────────────────────────────────────────────
        // Screen sharing
        // ─────────────────────────────────────────────────────────────────────────
        CallGateway_1.prototype.handleScreenShareStart = function (data, client) {
            return __awaiter(this, void 0, void 0, function () {
                var started, err_4;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, this.callService.tryStartScreenShare(data.roomId, data.peerId)];
                        case 1:
                            started = _a.sent();
                            if (!started) {
                                client.emit('call_error', { code: 'SCREEN_SHARE_IN_PROGRESS' });
                                return [2 /*return*/];
                            }
                            client.to(data.roomId).emit('peer_screen_share_started', {
                                peerId: data.peerId,
                                sdp: data.sdp,
                            });
                            return [3 /*break*/, 3];
                        case 2:
                            err_4 = _a.sent();
                            this.logger.error('screen_share_start failed', err_4);
                            client.emit('call_error', { code: 'INTERNAL_ERROR' });
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        CallGateway_1.prototype.handleScreenShareStop = function (data, client) {
            return __awaiter(this, void 0, void 0, function () {
                var stopped, err_5;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, this.callService.stopScreenShare(data.roomId, data.peerId)];
                        case 1:
                            stopped = _a.sent();
                            if (!stopped) {
                                return [2 /*return*/];
                            }
                            client.to(data.roomId).emit('peer_screen_share_stopped', {
                                peerId: data.peerId,
                            });
                            return [3 /*break*/, 3];
                        case 2:
                            err_5 = _a.sent();
                            this.logger.error('screen_share_stop failed', err_5);
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        // ─────────────────────────────────────────────────────────────────────────
        // Active speaker + bandwidth
        // ─────────────────────────────────────────────────────────────────────────
        CallGateway_1.prototype.handleAudioLevelReport = function (data) {
            return __awaiter(this, void 0, void 0, function () {
                var activeSpeaker, err_6;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, this.callService.reportAudioLevel(data.roomId, data.peerId, data.level)];
                        case 1:
                            activeSpeaker = _a.sent();
                            if (!activeSpeaker) {
                                return [2 /*return*/];
                            }
                            this.server
                                .to(data.roomId)
                                .emit('active_speaker', { peerId: activeSpeaker });
                            return [3 /*break*/, 3];
                        case 2:
                            err_6 = _a.sent();
                            this.logger.error('audio_level_report failed', err_6);
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        CallGateway_1.prototype.handleBandwidthReport = function (data) {
            return __awaiter(this, void 0, void 0, function () {
                var err_7;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, this.callService.reportBandwidth(data.roomId, data.peerId, data.stats)];
                        case 1:
                            _a.sent();
                            return [3 /*break*/, 3];
                        case 2:
                            err_7 = _a.sent();
                            this.logger.error('bandwidth_report failed', err_7);
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        // ─────────────────────────────────────────────────────────────────────────
        // Legacy 1:1 WebRTC signaling (SDP offer/answer/ICE)
        // ─────────────────────────────────────────────────────────────────────────
        CallGateway_1.prototype.handleJoinCall = function (data, client) {
            client.join(data.roomId);
            this.logger.log("Client ".concat(client.id, " joined call room ").concat(data.roomId));
            return { event: 'joined-call', data: data.roomId };
        };
        CallGateway_1.prototype.handleOffer = function (data, client) {
            if (data.to) {
                this.server.to(data.to).emit('offer', {
                    offer: data.offer,
                    senderId: client.id,
                });
                return;
            }
            client.to(data.roomId).emit('offer', {
                offer: data.offer,
                senderId: client.id,
            });
        };
        CallGateway_1.prototype.handleAnswer = function (data, client) {
            if (data.to) {
                this.server.to(data.to).emit('answer', {
                    answer: data.answer,
                    senderId: client.id,
                });
                return;
            }
            client.to(data.roomId).emit('answer', {
                answer: data.answer,
                senderId: client.id,
            });
        };
        CallGateway_1.prototype.handleIceCandidate = function (data, client) {
            if (data.to) {
                this.server.to(data.to).emit('ice-candidate', {
                    candidate: data.candidate,
                    senderId: client.id,
                });
                return;
            }
            client.to(data.roomId).emit('ice-candidate', {
                candidate: data.candidate,
                senderId: client.id,
            });
        };
        CallGateway_1.prototype.handleLeaveCall = function (data, client) {
            client.leave(data.roomId);
            client.to(data.roomId).emit('user-left', { senderId: client.id });
        };
        return CallGateway_1;
    }());
    __setFunctionName(_classThis, "CallGateway");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _server_decorators = [(0, websockets_1.WebSocketServer)()];
        _handleJoinRoom_decorators = [(0, websockets_1.SubscribeMessage)('join_room')];
        _handleLeaveRoom_decorators = [(0, websockets_1.SubscribeMessage)('leave_room')];
        _handleMediaStateChanged_decorators = [(0, websockets_1.SubscribeMessage)('media_state_changed')];
        _handleScreenShareStart_decorators = [(0, websockets_1.SubscribeMessage)('screen_share_start')];
        _handleScreenShareStop_decorators = [(0, websockets_1.SubscribeMessage)('screen_share_stop')];
        _handleAudioLevelReport_decorators = [(0, websockets_1.SubscribeMessage)('audio_level_report')];
        _handleBandwidthReport_decorators = [(0, websockets_1.SubscribeMessage)('bandwidth_report')];
        _handleJoinCall_decorators = [(0, websockets_1.SubscribeMessage)('join-call')];
        _handleOffer_decorators = [(0, websockets_1.SubscribeMessage)('offer')];
        _handleAnswer_decorators = [(0, websockets_1.SubscribeMessage)('answer')];
        _handleIceCandidate_decorators = [(0, websockets_1.SubscribeMessage)('ice-candidate')];
        _handleLeaveCall_decorators = [(0, websockets_1.SubscribeMessage)('leave-call')];
        __esDecorate(_classThis, null, _handleJoinRoom_decorators, { kind: "method", name: "handleJoinRoom", static: false, private: false, access: { has: function (obj) { return "handleJoinRoom" in obj; }, get: function (obj) { return obj.handleJoinRoom; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _handleLeaveRoom_decorators, { kind: "method", name: "handleLeaveRoom", static: false, private: false, access: { has: function (obj) { return "handleLeaveRoom" in obj; }, get: function (obj) { return obj.handleLeaveRoom; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _handleMediaStateChanged_decorators, { kind: "method", name: "handleMediaStateChanged", static: false, private: false, access: { has: function (obj) { return "handleMediaStateChanged" in obj; }, get: function (obj) { return obj.handleMediaStateChanged; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _handleScreenShareStart_decorators, { kind: "method", name: "handleScreenShareStart", static: false, private: false, access: { has: function (obj) { return "handleScreenShareStart" in obj; }, get: function (obj) { return obj.handleScreenShareStart; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _handleScreenShareStop_decorators, { kind: "method", name: "handleScreenShareStop", static: false, private: false, access: { has: function (obj) { return "handleScreenShareStop" in obj; }, get: function (obj) { return obj.handleScreenShareStop; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _handleAudioLevelReport_decorators, { kind: "method", name: "handleAudioLevelReport", static: false, private: false, access: { has: function (obj) { return "handleAudioLevelReport" in obj; }, get: function (obj) { return obj.handleAudioLevelReport; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _handleBandwidthReport_decorators, { kind: "method", name: "handleBandwidthReport", static: false, private: false, access: { has: function (obj) { return "handleBandwidthReport" in obj; }, get: function (obj) { return obj.handleBandwidthReport; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _handleJoinCall_decorators, { kind: "method", name: "handleJoinCall", static: false, private: false, access: { has: function (obj) { return "handleJoinCall" in obj; }, get: function (obj) { return obj.handleJoinCall; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _handleOffer_decorators, { kind: "method", name: "handleOffer", static: false, private: false, access: { has: function (obj) { return "handleOffer" in obj; }, get: function (obj) { return obj.handleOffer; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _handleAnswer_decorators, { kind: "method", name: "handleAnswer", static: false, private: false, access: { has: function (obj) { return "handleAnswer" in obj; }, get: function (obj) { return obj.handleAnswer; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _handleIceCandidate_decorators, { kind: "method", name: "handleIceCandidate", static: false, private: false, access: { has: function (obj) { return "handleIceCandidate" in obj; }, get: function (obj) { return obj.handleIceCandidate; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _handleLeaveCall_decorators, { kind: "method", name: "handleLeaveCall", static: false, private: false, access: { has: function (obj) { return "handleLeaveCall" in obj; }, get: function (obj) { return obj.handleLeaveCall; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, null, _server_decorators, { kind: "field", name: "server", static: false, private: false, access: { has: function (obj) { return "server" in obj; }, get: function (obj) { return obj.server; }, set: function (obj, value) { obj.server = value; } }, metadata: _metadata }, _server_initializers, _server_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        CallGateway = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return CallGateway = _classThis;
}();
exports.CallGateway = CallGateway;
