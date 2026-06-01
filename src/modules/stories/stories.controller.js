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
exports.StoriesController = void 0;
var common_1 = require("@nestjs/common");
var jwt_guard_1 = require("../../common/guards/strategy.guards/jwt.guard");
var StoriesController = function () {
    var _classDecorators = [(0, common_1.UseGuards)(jwt_guard_1.JwtAuthenticationGuard), (0, common_1.Controller)('stories')];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _instanceExtraInitializers = [];
    var _createStory_decorators;
    var _getStoriesFeed_decorators;
    var _getUserStories_decorators;
    var _getStory_decorators;
    var _deleteStory_decorators;
    var _recordView_decorators;
    var _getViewers_decorators;
    var _addToHighlights_decorators;
    var _removeFromHighlights_decorators;
    var StoriesController = _classThis = /** @class */ (function () {
        function StoriesController_1(storiesService) {
            this.storiesService = (__runInitializers(this, _instanceExtraInitializers), storiesService);
        }
        /** POST /stories — create a new story */
        StoriesController_1.prototype.createStory = function (userId, dto) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.storiesService.createStory(userId, dto)];
                });
            });
        };
        /** GET /stories/feed — active stories feed grouped by user */
        StoriesController_1.prototype.getStoriesFeed = function (userId_1) {
            return __awaiter(this, arguments, void 0, function (userId, page, limit) {
                if (page === void 0) { page = 1; }
                if (limit === void 0) { limit = 30; }
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.storiesService.getStoriesFeed(userId, page, limit)];
                });
            });
        };
        /** GET /stories/user/:userId — stories ring for a specific user's profile */
        StoriesController_1.prototype.getUserStories = function (targetUserId, requesterId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.storiesService.getUserStories(targetUserId, requesterId)];
                });
            });
        };
        /** GET /stories/:id — get single story */
        StoriesController_1.prototype.getStory = function (storyId, userId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.storiesService.getStoryById(storyId, userId)];
                });
            });
        };
        /** DELETE /stories/:id — soft delete own story */
        StoriesController_1.prototype.deleteStory = function (storyId, userId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.storiesService.deleteStory(storyId, userId)];
                });
            });
        };
        /** POST /stories/:id/view — record a view */
        StoriesController_1.prototype.recordView = function (storyId, userId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.storiesService.recordView(storyId, userId)];
                });
            });
        };
        /** GET /stories/:id/viewers — list viewers (owner only) */
        StoriesController_1.prototype.getViewers = function (storyId_1, userId_1) {
            return __awaiter(this, arguments, void 0, function (storyId, userId, page, limit) {
                if (page === void 0) { page = 1; }
                if (limit === void 0) { limit = 20; }
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.storiesService.getViewers(storyId, userId, page, limit)];
                });
            });
        };
        /** POST /stories/:id/highlight — add own story to highlights */
        StoriesController_1.prototype.addToHighlights = function (storyId, userId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.storiesService.addToHighlights(storyId, userId)];
                });
            });
        };
        /** DELETE /stories/:id/highlight — remove own story from highlights */
        StoriesController_1.prototype.removeFromHighlights = function (storyId, userId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.storiesService.removeFromHighlights(storyId, userId)];
                });
            });
        };
        return StoriesController_1;
    }());
    __setFunctionName(_classThis, "StoriesController");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _createStory_decorators = [(0, common_1.Post)('/')];
        _getStoriesFeed_decorators = [(0, common_1.Get)('/feed')];
        _getUserStories_decorators = [(0, common_1.Get)('/user/:userId')];
        _getStory_decorators = [(0, common_1.Get)('/:id')];
        _deleteStory_decorators = [(0, common_1.Delete)('/:id')];
        _recordView_decorators = [(0, common_1.Post)('/:id/view')];
        _getViewers_decorators = [(0, common_1.Get)('/:id/viewers')];
        _addToHighlights_decorators = [(0, common_1.Post)('/:id/highlight')];
        _removeFromHighlights_decorators = [(0, common_1.Delete)('/:id/highlight')];
        __esDecorate(_classThis, null, _createStory_decorators, { kind: "method", name: "createStory", static: false, private: false, access: { has: function (obj) { return "createStory" in obj; }, get: function (obj) { return obj.createStory; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getStoriesFeed_decorators, { kind: "method", name: "getStoriesFeed", static: false, private: false, access: { has: function (obj) { return "getStoriesFeed" in obj; }, get: function (obj) { return obj.getStoriesFeed; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getUserStories_decorators, { kind: "method", name: "getUserStories", static: false, private: false, access: { has: function (obj) { return "getUserStories" in obj; }, get: function (obj) { return obj.getUserStories; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getStory_decorators, { kind: "method", name: "getStory", static: false, private: false, access: { has: function (obj) { return "getStory" in obj; }, get: function (obj) { return obj.getStory; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _deleteStory_decorators, { kind: "method", name: "deleteStory", static: false, private: false, access: { has: function (obj) { return "deleteStory" in obj; }, get: function (obj) { return obj.deleteStory; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _recordView_decorators, { kind: "method", name: "recordView", static: false, private: false, access: { has: function (obj) { return "recordView" in obj; }, get: function (obj) { return obj.recordView; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getViewers_decorators, { kind: "method", name: "getViewers", static: false, private: false, access: { has: function (obj) { return "getViewers" in obj; }, get: function (obj) { return obj.getViewers; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _addToHighlights_decorators, { kind: "method", name: "addToHighlights", static: false, private: false, access: { has: function (obj) { return "addToHighlights" in obj; }, get: function (obj) { return obj.addToHighlights; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _removeFromHighlights_decorators, { kind: "method", name: "removeFromHighlights", static: false, private: false, access: { has: function (obj) { return "removeFromHighlights" in obj; }, get: function (obj) { return obj.removeFromHighlights; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        StoriesController = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return StoriesController = _classThis;
}();
exports.StoriesController = StoriesController;
