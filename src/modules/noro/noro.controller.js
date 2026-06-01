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
exports.NoroController = void 0;
var common_1 = require("@nestjs/common");
var platform_express_1 = require("@nestjs/platform-express");
var jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
var NoroController = function () {
    var _classDecorators = [(0, common_1.Controller)('noro'), (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard)];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _instanceExtraInitializers = [];
    var _chat_decorators;
    var _getHistory_decorators;
    var _createConversation_decorators;
    var _listConversations_decorators;
    var _addMessage_decorators;
    var _getConversationMessages_decorators;
    var _deleteConversation_decorators;
    var _reportCrisis_decorators;
    var _getHotlines_decorators;
    var _logIntervention_decorators;
    var _transcribe_decorators;
    var _speak_decorators;
    var NoroController = _classThis = /** @class */ (function () {
        function NoroController_1(noroService) {
            this.noroService = (__runInitializers(this, _instanceExtraInitializers), noroService);
        }
        NoroController_1.prototype.chat = function (user, message) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.noroService.chat(user.id, message)];
                });
            });
        };
        NoroController_1.prototype.getHistory = function (user) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.noroService.getHistory(user.id)];
                });
            });
        };
        NoroController_1.prototype.createConversation = function (user, trigger) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.noroService.createConversation(user.id, trigger)];
                });
            });
        };
        NoroController_1.prototype.listConversations = function (user, pagination) {
            return __awaiter(this, void 0, void 0, function () {
                var _a;
                return __generator(this, function (_b) {
                    return [2 /*return*/, this.noroService.listConversations(user.id, pagination.cursor, (_a = pagination.limit) !== null && _a !== void 0 ? _a : 20)];
                });
            });
        };
        NoroController_1.prototype.addMessage = function (user, conversationId, role, content) {
            return __awaiter(this, void 0, void 0, function () {
                var normalizedRole;
                return __generator(this, function (_a) {
                    normalizedRole = role || 'USER';
                    return [2 /*return*/, this.noroService.addMessage({
                            conversationId: conversationId,
                            userId: user.id,
                            role: normalizedRole,
                            content: content,
                        })];
                });
            });
        };
        NoroController_1.prototype.getConversationMessages = function (user, conversationId, pagination) {
            return __awaiter(this, void 0, void 0, function () {
                var _a;
                return __generator(this, function (_b) {
                    return [2 /*return*/, this.noroService.getConversationMessages(user.id, conversationId, pagination.cursor, (_a = pagination.limit) !== null && _a !== void 0 ? _a : 20)];
                });
            });
        };
        NoroController_1.prototype.deleteConversation = function (user, conversationId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.noroService.softDeleteConversation(user.id, conversationId)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/, { deleted: true }];
                    }
                });
            });
        };
        NoroController_1.prototype.reportCrisis = function (body, user) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.noroService.reportCrisis({
                            userId: user.id,
                            messageId: body.messageId,
                            crisisScore: body.crisisScore,
                            keywords: body.keywords || [],
                        })];
                });
            });
        };
        NoroController_1.prototype.getHotlines = function (countryCode, language) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.noroService.getHotlines(countryCode, language || 'en')];
                });
            });
        };
        NoroController_1.prototype.logIntervention = function (user, crisisEventId, type) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.noroService.logIntervention(user.id, crisisEventId, type)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/, { logged: true }];
                    }
                });
            });
        };
        NoroController_1.prototype.transcribe = function (file) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.noroService.transcribe(file)];
                });
            });
        };
        NoroController_1.prototype.speak = function (text) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.noroService.speak(text)];
                });
            });
        };
        return NoroController_1;
    }());
    __setFunctionName(_classThis, "NoroController");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _chat_decorators = [(0, common_1.Post)('chat')];
        _getHistory_decorators = [(0, common_1.Get)('history')];
        _createConversation_decorators = [(0, common_1.Post)('conversations')];
        _listConversations_decorators = [(0, common_1.Get)('conversations')];
        _addMessage_decorators = [(0, common_1.Post)('conversations/:id/messages')];
        _getConversationMessages_decorators = [(0, common_1.Get)('conversations/:id/messages')];
        _deleteConversation_decorators = [(0, common_1.Delete)('conversations/:id')];
        _reportCrisis_decorators = [(0, common_1.Post)('crisis/report')];
        _getHotlines_decorators = [(0, common_1.Get)('crisis/hotlines')];
        _logIntervention_decorators = [(0, common_1.Post)('crisis/intervention')];
        _transcribe_decorators = [(0, common_1.Post)('transcribe'), (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('audio'))];
        _speak_decorators = [(0, common_1.Post)('speak')];
        __esDecorate(_classThis, null, _chat_decorators, { kind: "method", name: "chat", static: false, private: false, access: { has: function (obj) { return "chat" in obj; }, get: function (obj) { return obj.chat; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getHistory_decorators, { kind: "method", name: "getHistory", static: false, private: false, access: { has: function (obj) { return "getHistory" in obj; }, get: function (obj) { return obj.getHistory; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _createConversation_decorators, { kind: "method", name: "createConversation", static: false, private: false, access: { has: function (obj) { return "createConversation" in obj; }, get: function (obj) { return obj.createConversation; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _listConversations_decorators, { kind: "method", name: "listConversations", static: false, private: false, access: { has: function (obj) { return "listConversations" in obj; }, get: function (obj) { return obj.listConversations; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _addMessage_decorators, { kind: "method", name: "addMessage", static: false, private: false, access: { has: function (obj) { return "addMessage" in obj; }, get: function (obj) { return obj.addMessage; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getConversationMessages_decorators, { kind: "method", name: "getConversationMessages", static: false, private: false, access: { has: function (obj) { return "getConversationMessages" in obj; }, get: function (obj) { return obj.getConversationMessages; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _deleteConversation_decorators, { kind: "method", name: "deleteConversation", static: false, private: false, access: { has: function (obj) { return "deleteConversation" in obj; }, get: function (obj) { return obj.deleteConversation; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _reportCrisis_decorators, { kind: "method", name: "reportCrisis", static: false, private: false, access: { has: function (obj) { return "reportCrisis" in obj; }, get: function (obj) { return obj.reportCrisis; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getHotlines_decorators, { kind: "method", name: "getHotlines", static: false, private: false, access: { has: function (obj) { return "getHotlines" in obj; }, get: function (obj) { return obj.getHotlines; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _logIntervention_decorators, { kind: "method", name: "logIntervention", static: false, private: false, access: { has: function (obj) { return "logIntervention" in obj; }, get: function (obj) { return obj.logIntervention; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _transcribe_decorators, { kind: "method", name: "transcribe", static: false, private: false, access: { has: function (obj) { return "transcribe" in obj; }, get: function (obj) { return obj.transcribe; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _speak_decorators, { kind: "method", name: "speak", static: false, private: false, access: { has: function (obj) { return "speak" in obj; }, get: function (obj) { return obj.speak; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        NoroController = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return NoroController = _classThis;
}();
exports.NoroController = NoroController;
