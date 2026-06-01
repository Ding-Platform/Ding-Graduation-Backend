"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
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
exports.SearchService = void 0;
var common_1 = require("@nestjs/common");
var error_messages_constant_1 = require("../../common/constants/error-messages.constant");
var client_1 = require("@prisma/client");
var SearchService = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var SearchService = _classThis = /** @class */ (function () {
        function SearchService_1(prisma, redisService, activityService) {
            this.prisma = prisma;
            this.redisService = redisService;
            this.activityService = activityService;
        }
        SearchService_1.prototype.globalSearch = function (query_1, type_1) {
            return __awaiter(this, arguments, void 0, function (query, type, page, limit, userId) {
                var normalizedQuery, skip, normalizedType, allowedTypes, isGlobal, effectiveLimit, effectiveSkip, tsConfig, results, users, posts, groups, pages, reels;
                var _a;
                if (page === void 0) { page = 1; }
                if (limit === void 0) { limit = 20; }
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            normalizedQuery = query === null || query === void 0 ? void 0 : query.trim();
                            if (!normalizedQuery) {
                                throw new common_1.BadRequestException(error_messages_constant_1.ERROR_MESSAGES.SEARCH_QUERY_REQUIRED);
                            }
                            if (normalizedQuery.length < 2) {
                                throw new common_1.BadRequestException(error_messages_constant_1.ERROR_MESSAGES.SEARCH_QUERY_TOO_SHORT);
                            }
                            if (userId) {
                                this.activityService.logActivity(userId, 'SEARCHED', undefined, 'SEARCH_QUERY', { query: normalizedQuery });
                            }
                            skip = (page - 1) * limit;
                            normalizedType = ((_a = type === null || type === void 0 ? void 0 : type.toUpperCase()) !== null && _a !== void 0 ? _a : 'ALL');
                            allowedTypes = [
                                'ALL',
                                'PEOPLE',
                                'POSTS',
                                'GROUPS',
                                'PAGES',
                                'REELS',
                            ];
                            if (!allowedTypes.includes(normalizedType)) {
                                throw new common_1.BadRequestException('Invalid search type');
                            }
                            isGlobal = normalizedType === 'ALL';
                            effectiveLimit = isGlobal ? 5 : limit;
                            effectiveSkip = isGlobal ? 0 : skip;
                            tsConfig = client_1.Prisma.sql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["simple"], ["simple"])));
                            results = {};
                            if (!(isGlobal || normalizedType === 'PEOPLE')) return [3 /*break*/, 2];
                            return [4 /*yield*/, this.prisma.$queryRaw(client_1.Prisma.sql(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n        SELECT\n          u.id,\n          u.name,\n          u.image\n        FROM \"User\" u\n        WHERE\n          u.active = true\n          AND to_tsvector(", ", COALESCE(u.name, '')) @@ plainto_tsquery(", ", ", ")\n        ORDER BY\n          ts_rank_cd(to_tsvector(", ", COALESCE(u.name, '')), plainto_tsquery(", ", ", ")) DESC,\n          u.\"createdAt\" DESC\n        LIMIT ", "\n        OFFSET ", "\n      "], ["\n        SELECT\n          u.id,\n          u.name,\n          u.image\n        FROM \"User\" u\n        WHERE\n          u.active = true\n          AND to_tsvector(", ", COALESCE(u.name, '')) @@ plainto_tsquery(", ", ", ")\n        ORDER BY\n          ts_rank_cd(to_tsvector(", ", COALESCE(u.name, '')), plainto_tsquery(", ", ", ")) DESC,\n          u.\"createdAt\" DESC\n        LIMIT ", "\n        OFFSET ", "\n      "])), tsConfig, tsConfig, normalizedQuery, tsConfig, tsConfig, normalizedQuery, effectiveLimit, effectiveSkip))];
                        case 1:
                            users = _b.sent();
                            results.people = users;
                            _b.label = 2;
                        case 2:
                            if (!(isGlobal || normalizedType === 'POSTS')) return [3 /*break*/, 4];
                            return [4 /*yield*/, this.prisma.$queryRaw(client_1.Prisma.sql(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n        SELECT\n          p.id,\n          p.content,\n          p.\"createdAt\",\n          json_build_object(\n            'id', a.id,\n            'name', a.name,\n            'image', a.image\n          ) AS author\n        FROM \"Post\" p\n        INNER JOIN \"User\" a ON a.id = p.\"authorId\"\n        WHERE\n          p.\"isDeleted\" = false\n          AND p.privacy = 'PUBLIC'\n          AND to_tsvector(", ", COALESCE(p.content, '') || ' ' || array_to_string(p.hashtags, ' ')) @@ plainto_tsquery(", ", ", ")\n        ORDER BY\n          ts_rank_cd(to_tsvector(", ", COALESCE(p.content, '') || ' ' || array_to_string(p.hashtags, ' ')), plainto_tsquery(", ", ", ")) DESC,\n          p.\"createdAt\" DESC\n        LIMIT ", "\n        OFFSET ", "\n      "], ["\n        SELECT\n          p.id,\n          p.content,\n          p.\"createdAt\",\n          json_build_object(\n            'id', a.id,\n            'name', a.name,\n            'image', a.image\n          ) AS author\n        FROM \"Post\" p\n        INNER JOIN \"User\" a ON a.id = p.\"authorId\"\n        WHERE\n          p.\"isDeleted\" = false\n          AND p.privacy = 'PUBLIC'\n          AND to_tsvector(", ", COALESCE(p.content, '') || ' ' || array_to_string(p.hashtags, ' ')) @@ plainto_tsquery(", ", ", ")\n        ORDER BY\n          ts_rank_cd(to_tsvector(", ", COALESCE(p.content, '') || ' ' || array_to_string(p.hashtags, ' ')), plainto_tsquery(", ", ", ")) DESC,\n          p.\"createdAt\" DESC\n        LIMIT ", "\n        OFFSET ", "\n      "])), tsConfig, tsConfig, normalizedQuery, tsConfig, tsConfig, normalizedQuery, effectiveLimit, effectiveSkip))];
                        case 3:
                            posts = _b.sent();
                            results.posts = posts;
                            _b.label = 4;
                        case 4:
                            if (!(isGlobal || normalizedType === 'GROUPS')) return [3 /*break*/, 6];
                            return [4 /*yield*/, this.prisma.$queryRaw(client_1.Prisma.sql(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n        SELECT\n          g.id,\n          g.name,\n          g.\"coverPhoto\",\n          g.\"membersCount\",\n          g.type::text AS type\n        FROM \"Group\" g\n        WHERE\n          g.\"deletedAt\" IS NULL\n          AND g.type IN ('PUBLIC', 'PRIVATE')\n          AND to_tsvector(", ", COALESCE(g.name, '') || ' ' || COALESCE(g.description, '')) @@ plainto_tsquery(", ", ", ")\n        ORDER BY\n          ts_rank_cd(\n            to_tsvector(", ", COALESCE(g.name, '') || ' ' || COALESCE(g.description, '')),\n            plainto_tsquery(", ", ", ")\n          ) DESC,\n          g.\"membersCount\" DESC\n        LIMIT ", "\n        OFFSET ", "\n      "], ["\n        SELECT\n          g.id,\n          g.name,\n          g.\"coverPhoto\",\n          g.\"membersCount\",\n          g.type::text AS type\n        FROM \"Group\" g\n        WHERE\n          g.\"deletedAt\" IS NULL\n          AND g.type IN ('PUBLIC', 'PRIVATE')\n          AND to_tsvector(", ", COALESCE(g.name, '') || ' ' || COALESCE(g.description, '')) @@ plainto_tsquery(", ", ", ")\n        ORDER BY\n          ts_rank_cd(\n            to_tsvector(", ", COALESCE(g.name, '') || ' ' || COALESCE(g.description, '')),\n            plainto_tsquery(", ", ", ")\n          ) DESC,\n          g.\"membersCount\" DESC\n        LIMIT ", "\n        OFFSET ", "\n      "])), tsConfig, tsConfig, normalizedQuery, tsConfig, tsConfig, normalizedQuery, effectiveLimit, effectiveSkip))];
                        case 5:
                            groups = _b.sent();
                            results.groups = groups;
                            _b.label = 6;
                        case 6:
                            if (!(isGlobal || normalizedType === 'PAGES')) return [3 /*break*/, 8];
                            return [4 /*yield*/, this.prisma.$queryRaw(client_1.Prisma.sql(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n        SELECT\n          p.id,\n          p.name,\n          p.\"coverPhoto\",\n          p.\"logoUrl\",\n          p.\"followersCount\",\n          p.\"isVerified\"\n        FROM \"Page\" p\n        WHERE\n          p.\"deletedAt\" IS NULL\n          AND to_tsvector(", ", COALESCE(p.name, '') || ' ' || COALESCE(p.description, '')) @@ plainto_tsquery(", ", ", ")\n        ORDER BY\n          ts_rank_cd(\n            to_tsvector(", ", COALESCE(p.name, '') || ' ' || COALESCE(p.description, '')),\n            plainto_tsquery(", ", ", ")\n          ) DESC,\n          p.\"followersCount\" DESC\n        LIMIT ", "\n        OFFSET ", "\n      "], ["\n        SELECT\n          p.id,\n          p.name,\n          p.\"coverPhoto\",\n          p.\"logoUrl\",\n          p.\"followersCount\",\n          p.\"isVerified\"\n        FROM \"Page\" p\n        WHERE\n          p.\"deletedAt\" IS NULL\n          AND to_tsvector(", ", COALESCE(p.name, '') || ' ' || COALESCE(p.description, '')) @@ plainto_tsquery(", ", ", ")\n        ORDER BY\n          ts_rank_cd(\n            to_tsvector(", ", COALESCE(p.name, '') || ' ' || COALESCE(p.description, '')),\n            plainto_tsquery(", ", ", ")\n          ) DESC,\n          p.\"followersCount\" DESC\n        LIMIT ", "\n        OFFSET ", "\n      "])), tsConfig, tsConfig, normalizedQuery, tsConfig, tsConfig, normalizedQuery, effectiveLimit, effectiveSkip))];
                        case 7:
                            pages = _b.sent();
                            results.pages = pages;
                            _b.label = 8;
                        case 8:
                            if (!(isGlobal || normalizedType === 'REELS')) return [3 /*break*/, 10];
                            return [4 /*yield*/, this.prisma.$queryRaw(client_1.Prisma.sql(templateObject_6 || (templateObject_6 = __makeTemplateObject(["\n        SELECT\n          r.id,\n          r.caption,\n          r.\"thumbnailUrl\",\n          r.\"viewsCount\"::int AS \"viewsCount\",\n          json_build_object(\n            'id', u.id,\n            'name', u.name,\n            'image', u.image\n          ) AS user\n        FROM \"Reel\" r\n        INNER JOIN \"User\" u ON u.id = r.\"userId\"\n        WHERE\n          r.\"deletedAt\" IS NULL\n          AND r.\"isPublic\" = true\n          AND r.status = 'READY'\n          AND to_tsvector(", ", COALESCE(r.caption, '') || ' ' || array_to_string(r.hashtags, ' '))\n              @@ plainto_tsquery(", ", ", ")\n        ORDER BY\n          ts_rank_cd(\n            to_tsvector(", ", COALESCE(r.caption, '') || ' ' || array_to_string(r.hashtags, ' ')),\n            plainto_tsquery(", ", ", ")\n          ) DESC,\n          r.\"viewsCount\" DESC\n        LIMIT ", "\n        OFFSET ", "\n      "], ["\n        SELECT\n          r.id,\n          r.caption,\n          r.\"thumbnailUrl\",\n          r.\"viewsCount\"::int AS \"viewsCount\",\n          json_build_object(\n            'id', u.id,\n            'name', u.name,\n            'image', u.image\n          ) AS user\n        FROM \"Reel\" r\n        INNER JOIN \"User\" u ON u.id = r.\"userId\"\n        WHERE\n          r.\"deletedAt\" IS NULL\n          AND r.\"isPublic\" = true\n          AND r.status = 'READY'\n          AND to_tsvector(", ", COALESCE(r.caption, '') || ' ' || array_to_string(r.hashtags, ' '))\n              @@ plainto_tsquery(", ", ", ")\n        ORDER BY\n          ts_rank_cd(\n            to_tsvector(", ", COALESCE(r.caption, '') || ' ' || array_to_string(r.hashtags, ' ')),\n            plainto_tsquery(", ", ", ")\n          ) DESC,\n          r.\"viewsCount\" DESC\n        LIMIT ", "\n        OFFSET ", "\n      "])), tsConfig, tsConfig, normalizedQuery, tsConfig, tsConfig, normalizedQuery, effectiveLimit, effectiveSkip))];
                        case 9:
                            reels = _b.sent();
                            results.reels = reels;
                            _b.label = 10;
                        case 10: return [2 /*return*/, {
                                query: normalizedQuery,
                                type: normalizedType,
                                data: results,
                                meta: { page: page, limit: limit },
                            }];
                    }
                });
            });
        };
        SearchService_1.prototype.trendingHashtags = function () {
            return __awaiter(this, void 0, void 0, function () {
                var rawData;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.redisService.zRangeWithScores('trending_hashtags', 0, 9, { REV: true })];
                        case 1:
                            rawData = _a.sent();
                            if (!rawData || rawData.length === 0) {
                                return [2 /*return*/, []];
                            }
                            return [2 /*return*/, rawData.map(function (item) { return ({
                                    tag: item.value,
                                    count: item.score,
                                }); })];
                    }
                });
            });
        };
        return SearchService_1;
    }());
    __setFunctionName(_classThis, "SearchService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        SearchService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return SearchService = _classThis;
}();
exports.SearchService = SearchService;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6;
