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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoroService = void 0;
var common_1 = require("@nestjs/common");
var NoroService = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var NoroService = _classThis = /** @class */ (function () {
        function NoroService_1(prisma) {
            this.prisma = prisma;
            this.logger = new common_1.Logger(NoroService.name);
            this.OLLAMA_URL = 'http://localhost:11434/api/chat';
            this.MODEL = 'llama3'; // or 'noro' custom model
        }
        NoroService_1.prototype.chat = function (userId, content) {
            return __awaiter(this, void 0, void 0, function () {
                var history, contextMessages, responseText, messages, body, response, data, error_1, chat;
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, this.prisma.noroChat.findMany({
                                where: { userId: userId },
                                take: 10,
                                orderBy: { createdAt: 'desc' },
                            })];
                        case 1:
                            history = _b.sent();
                            contextMessages = history.reverse().flatMap(function (chat) { return [
                                { role: 'user', content: chat.message },
                                { role: 'assistant', content: chat.response },
                            ]; });
                            responseText = "I'm having trouble connecting to my brain right now.";
                            _b.label = 2;
                        case 2:
                            _b.trys.push([2, 7, , 8]);
                            messages = __spreadArray(__spreadArray([
                                {
                                    role: 'system',
                                    content: 'You are Noro, a friendly and helpful AI assistant for the Ding platform.',
                                }
                            ], contextMessages, true), [
                                { role: 'user', content: content },
                            ], false);
                            body = {
                                model: this.MODEL,
                                messages: messages,
                                stream: false,
                            };
                            return [4 /*yield*/, fetch(this.OLLAMA_URL, {
                                    method: 'POST',
                                    headers: { 'Content-Type': 'application/json' },
                                    body: JSON.stringify(body),
                                })];
                        case 3:
                            response = _b.sent();
                            if (!response.ok) return [3 /*break*/, 5];
                            return [4 /*yield*/, response.json()];
                        case 4:
                            data = _b.sent();
                            responseText = ((_a = data.message) === null || _a === void 0 ? void 0 : _a.content) || responseText;
                            return [3 /*break*/, 6];
                        case 5:
                            this.logger.warn("Ollama responded with ".concat(response.status));
                            if (process.env.NODE_ENV !== 'production') {
                                responseText = "[Mock Noro] You said: \"".concat(content, "\". (Ollama not running)");
                            }
                            _b.label = 6;
                        case 6: return [3 /*break*/, 8];
                        case 7:
                            error_1 = _b.sent();
                            this.logger.error('Failed to call Ollama', error_1);
                            responseText = "[Mock Noro] You said: \"".concat(content, "\". (Ollama unreachable)");
                            return [3 /*break*/, 8];
                        case 8: return [4 /*yield*/, this.prisma.noroChat.create({
                                data: {
                                    userId: userId,
                                    message: content,
                                    response: responseText,
                                },
                            })];
                        case 9:
                            chat = _b.sent();
                            return [2 /*return*/, chat];
                    }
                });
            });
        };
        NoroService_1.prototype.getHistory = function (userId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.prisma.noroChat.findMany({
                            where: { userId: userId },
                            orderBy: { createdAt: 'desc' },
                            take: 50,
                        })];
                });
            });
        };
        NoroService_1.prototype.createConversation = function (userId_1) {
            return __awaiter(this, arguments, void 0, function (userId, trigger) {
                if (trigger === void 0) { trigger = 'USER_INITIATED'; }
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.prisma.noroConversation.create({
                            data: {
                                userId: userId,
                                trigger: trigger,
                            },
                        })];
                });
            });
        };
        NoroService_1.prototype.addMessage = function (payload) {
            return __awaiter(this, void 0, void 0, function () {
                var message, sentiment;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.noroMessage.create({
                                data: {
                                    conversationId: payload.conversationId,
                                    userId: payload.userId,
                                    role: payload.role,
                                    content: payload.content,
                                },
                            })];
                        case 1:
                            message = _a.sent();
                            if (!(payload.role === 'USER')) return [3 /*break*/, 5];
                            sentiment = this.estimateSentiment(payload.content);
                            return [4 /*yield*/, this.prisma.noroMessage.update({
                                    where: { id: message.id },
                                    data: {
                                        sentiment: sentiment,
                                        keywords: sentiment.keywords,
                                    },
                                })];
                        case 2:
                            _a.sent();
                            return [4 /*yield*/, this.updateMoodProfile(payload.userId, sentiment.score, payload.conversationId)];
                        case 3:
                            _a.sent();
                            return [4 /*yield*/, this.maybeCreateCrisisEvent(payload.userId, message.id, payload.content)];
                        case 4:
                            _a.sent();
                            _a.label = 5;
                        case 5: return [2 /*return*/, this.prisma.noroMessage.findUnique({
                                where: { id: message.id },
                            })];
                    }
                });
            });
        };
        NoroService_1.prototype.listConversations = function (userId_1, cursor_1) {
            return __awaiter(this, arguments, void 0, function (userId, cursor, limit) {
                var cursorDate, safeLimit, rows, hasMore, data, nextCursor;
                if (limit === void 0) { limit = 20; }
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            cursorDate = this.decodeCursor(cursor);
                            safeLimit = Math.min(Math.max(limit, 1), 50);
                            return [4 /*yield*/, this.prisma.noroConversation.findMany({
                                    where: __assign({ userId: userId, deletedAt: null }, (cursorDate ? { startedAt: { lt: cursorDate } } : {})),
                                    orderBy: { startedAt: 'desc' },
                                    take: safeLimit + 1,
                                })];
                        case 1:
                            rows = _a.sent();
                            hasMore = rows.length > safeLimit;
                            data = hasMore ? rows.slice(0, safeLimit) : rows;
                            nextCursor = hasMore
                                ? this.encodeCursor(data[data.length - 1].startedAt)
                                : null;
                            return [2 /*return*/, {
                                    data: data,
                                    nextCursor: nextCursor,
                                    hasMore: hasMore,
                                }];
                    }
                });
            });
        };
        NoroService_1.prototype.getConversationMessages = function (userId_1, conversationId_1, cursor_1) {
            return __awaiter(this, arguments, void 0, function (userId, conversationId, cursor, limit) {
                var conversation, cursorDate, safeLimit, rows, hasMore, data, nextCursor;
                if (limit === void 0) { limit = 20; }
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.noroConversation.findFirst({
                                where: {
                                    id: conversationId,
                                    userId: userId,
                                    deletedAt: null,
                                },
                            })];
                        case 1:
                            conversation = _a.sent();
                            if (!conversation) {
                                return [2 /*return*/, { data: [], nextCursor: null, hasMore: false }];
                            }
                            cursorDate = this.decodeCursor(cursor);
                            safeLimit = Math.min(Math.max(limit, 1), 100);
                            return [4 /*yield*/, this.prisma.noroMessage.findMany({
                                    where: __assign({ conversationId: conversationId, deletedAt: null }, (cursorDate ? { createdAt: { lt: cursorDate } } : {})),
                                    orderBy: { createdAt: 'desc' },
                                    take: safeLimit + 1,
                                })];
                        case 2:
                            rows = _a.sent();
                            hasMore = rows.length > safeLimit;
                            data = hasMore ? rows.slice(0, safeLimit) : rows;
                            nextCursor = hasMore
                                ? this.encodeCursor(data[data.length - 1].createdAt)
                                : null;
                            return [2 /*return*/, {
                                    data: data,
                                    nextCursor: nextCursor,
                                    hasMore: hasMore,
                                }];
                    }
                });
            });
        };
        NoroService_1.prototype.softDeleteConversation = function (userId, conversationId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.noroConversation.updateMany({
                                where: {
                                    id: conversationId,
                                    userId: userId,
                                    deletedAt: null,
                                },
                                data: {
                                    deletedAt: new Date(),
                                },
                            })];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        NoroService_1.prototype.reportCrisis = function (payload) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.prisma.crisisEvent.create({
                            data: {
                                userId: payload.userId,
                                messageId: payload.messageId,
                                crisisScore: payload.crisisScore,
                                keywordsHit: payload.keywords,
                                severity: this.mapSeverity(payload.crisisScore),
                                intervention: this.mapIntervention(payload.crisisScore),
                            },
                        })];
                });
            });
        };
        NoroService_1.prototype.getHotlines = function (countryCode_1) {
            return __awaiter(this, arguments, void 0, function (countryCode, language) {
                var normalizedCountry;
                if (language === void 0) { language = 'en'; }
                return __generator(this, function (_a) {
                    normalizedCountry = (countryCode || '').trim().toUpperCase();
                    if (!normalizedCountry || normalizedCountry.length !== 2) {
                        return [2 /*return*/, []];
                    }
                    return [2 /*return*/, this.prisma.crisisHotline.findMany({
                            where: {
                                isActive: true,
                                countryCode: normalizedCountry,
                                OR: [{ language: language }, { language: 'en' }],
                            },
                            orderBy: [{ language: 'desc' }, { name: 'asc' }],
                        })];
                });
            });
        };
        NoroService_1.prototype.logIntervention = function (userId, crisisEventId, type) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.crisisEvent.updateMany({
                                where: {
                                    id: crisisEventId,
                                    userId: userId,
                                },
                                data: {
                                    intervention: type === 'hotline_response' ? 'HOTLINE' : 'SOFT',
                                },
                            })];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        NoroService_1.prototype.transcribe = function (file) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    // Mock STT
                    return [2 /*return*/, { text: 'This is a simulated transcription of the uploaded audio.' }];
                });
            });
        };
        NoroService_1.prototype.speak = function (text) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    // Mock TTS
                    return [2 /*return*/, { audioUrl: 'https://example.com/noro-speech.mp3' }];
                });
            });
        };
        NoroService_1.prototype.handleSentimentIntervention = function (userId, negativePoints) {
            return __awaiter(this, void 0, void 0, function () {
                var method, conversation, friends, suggestedFriendIds;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (negativePoints >= 85) {
                                method = 'CONVERSATION';
                            }
                            else if (negativePoints >= 78) {
                                method = 'FRIEND_SUGGESTION';
                            }
                            else {
                                method = 'FEED_BOOST';
                            }
                            if (!(method === 'CONVERSATION')) return [3 /*break*/, 3];
                            return [4 /*yield*/, this.createConversation(userId, 'PERIODIC_CHECKIN')];
                        case 1:
                            conversation = _a.sent();
                            return [4 /*yield*/, this.addMessage({
                                    conversationId: conversation.id,
                                    userId: userId,
                                    role: 'ASSISTANT',
                                    content: "Hey, I noticed you might be going through a tough time. I'm here if you want to talk. How are you feeling?",
                                })];
                        case 2:
                            _a.sent();
                            return [2 /*return*/, {
                                    method: method,
                                    conversationId: conversation.id,
                                    suggestedFriendIds: [],
                                }];
                        case 3:
                            if (!(method === 'FRIEND_SUGGESTION')) return [3 /*break*/, 5];
                            return [4 /*yield*/, this.prisma.friendship.findMany({
                                    where: {
                                        status: 'ACCEPTED',
                                        OR: [{ requesterId: userId }, { recipientId: userId }],
                                    },
                                    take: 3,
                                    orderBy: { updatedAt: 'desc' },
                                })];
                        case 4:
                            friends = _a.sent();
                            suggestedFriendIds = friends.map(function (f) {
                                return f.requesterId === userId ? f.recipientId : f.requesterId;
                            });
                            return [2 /*return*/, {
                                    method: method,
                                    suggestedFriendIds: suggestedFriendIds,
                                }];
                        case 5: return [2 /*return*/, {
                                method: method,
                                suggestedFriendIds: [],
                            }];
                    }
                });
            });
        };
        NoroService_1.prototype.encodeCursor = function (date) {
            return Buffer.from(date.toISOString()).toString('base64');
        };
        NoroService_1.prototype.decodeCursor = function (cursor) {
            if (!cursor) {
                return null;
            }
            try {
                var raw = Buffer.from(cursor, 'base64').toString('utf8');
                var parsed = new Date(raw);
                if (Number.isNaN(parsed.getTime())) {
                    return null;
                }
                return parsed;
            }
            catch (_a) {
                return null;
            }
        };
        NoroService_1.prototype.estimateSentiment = function (content) {
            var lower = content.toLowerCase();
            var positiveWords = [
                'good',
                'great',
                'happy',
                'better',
                'love',
                'thanks',
            ];
            var negativeWords = [
                'sad',
                'depressed',
                'anxious',
                'hurt',
                'alone',
                'bad',
            ];
            var crisisWords = [
                'suicide',
                'kill myself',
                'end my life',
                'self harm',
                'hopeless',
            ];
            var words = lower.split(/\s+/).filter(Boolean);
            var positiveHits = positiveWords.filter(function (word) {
                return lower.includes(word);
            }).length;
            var negativeHits = negativeWords.filter(function (word) {
                return lower.includes(word);
            }).length;
            var crisisHits = crisisWords.filter(function (word) {
                return lower.includes(word);
            }).length;
            var rawScore = positiveHits - negativeHits - crisisHits * 2;
            var normalized = Math.max(-1, Math.min(1, rawScore / 4));
            var label = normalized > 0.2
                ? 'positive'
                : normalized < -0.2
                    ? 'negative'
                    : 'neutral';
            return {
                score: normalized,
                label: label,
                keywords: words.filter(function (word) { return word.length > 3; }).slice(0, 10),
            };
        };
        NoroService_1.prototype.updateMoodProfile = function (userId, sentimentScore, conversationId) {
            return __awaiter(this, void 0, void 0, function () {
                var existing, latestMoodScore, moodScore, energyLevel, dominantMood;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.userMoodProfile.findUnique({
                                where: { userId: userId },
                            })];
                        case 1:
                            existing = _a.sent();
                            latestMoodScore = this.normalizeMoodScore(sentimentScore);
                            moodScore = (existing === null || existing === void 0 ? void 0 : existing.moodScore)
                                ? Number((0.3 * latestMoodScore + 0.7 * Number(existing.moodScore)).toFixed(2))
                                : latestMoodScore;
                            energyLevel = Number(Math.max(1, Math.min(10, moodScore + 0.5)).toFixed(2));
                            dominantMood = moodScore >= 6.8
                                ? 'happy'
                                : moodScore <= 4
                                    ? 'sad'
                                    : moodScore <= 5.5
                                        ? 'anxious'
                                        : 'neutral';
                            return [4 /*yield*/, this.prisma.userMoodProfile.upsert({
                                    where: { userId: userId },
                                    update: {
                                        moodScore: moodScore,
                                        energyLevel: energyLevel,
                                        dominantMood: dominantMood,
                                        sourceConvId: conversationId,
                                        lastUpdated: new Date(),
                                    },
                                    create: {
                                        userId: userId,
                                        moodScore: moodScore,
                                        energyLevel: energyLevel,
                                        dominantMood: dominantMood,
                                        sourceConvId: conversationId,
                                    },
                                })];
                        case 2:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        NoroService_1.prototype.normalizeMoodScore = function (sentimentScore) {
            return Number((5.5 + sentimentScore * 3.5).toFixed(2));
        };
        NoroService_1.prototype.maybeCreateCrisisEvent = function (userId, messageId, content) {
            return __awaiter(this, void 0, void 0, function () {
                var lower, keywords, hits, crisisScore;
                return __generator(this, function (_a) {
                    lower = content.toLowerCase();
                    keywords = [
                        'suicide',
                        'kill myself',
                        'end my life',
                        'self harm',
                        'i want to die',
                    ];
                    hits = keywords.filter(function (keyword) { return lower.includes(keyword); });
                    if (!hits.length) {
                        return [2 /*return*/, null];
                    }
                    crisisScore = Number(Math.min(0.95, 0.45 + hits.length * 0.18).toFixed(4));
                    return [2 /*return*/, this.prisma.crisisEvent.create({
                            data: {
                                userId: userId,
                                messageId: messageId,
                                crisisScore: crisisScore,
                                severity: this.mapSeverity(crisisScore),
                                intervention: this.mapIntervention(crisisScore),
                                keywordsHit: hits,
                            },
                        })];
                });
            });
        };
        NoroService_1.prototype.mapSeverity = function (score) {
            if (score > 0.7)
                return 'HIGH';
            if (score >= 0.4)
                return 'MEDIUM';
            return 'LOW';
        };
        NoroService_1.prototype.mapIntervention = function (score) {
            if (score > 0.7)
                return 'HOTLINE';
            if (score >= 0.4)
                return 'SOFT';
            return 'NONE';
        };
        return NoroService_1;
    }());
    __setFunctionName(_classThis, "NoroService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        NoroService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return NoroService = _classThis;
}();
exports.NoroService = NoroService;
