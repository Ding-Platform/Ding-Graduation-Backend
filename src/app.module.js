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
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
var common_1 = require("@nestjs/common");
var config_1 = require("@nestjs/config");
var core_1 = require("@nestjs/core");
var bull_1 = require("@nestjs/bull");
var nestjs_pino_1 = require("nestjs-pino");
var app_controller_1 = require("./app.controller");
var app_service_1 = require("./app.service");
var database_module_1 = require("./configs/database/database.module");
var redis_module_1 = require("./configs/redis/redis.module");
var neo4j_module_1 = require("./configs/neo4j/neo4j.module");
var mongodb_module_1 = require("./configs/mongodb/mongodb.module");
var logger_module_1 = require("./common/application/logger/logger.module");
var response_interceptor_1 = require("./common/interceptors/response.interceptor");
var exception_filter_1 = require("./common/application/exceptions/exception-filter");
var validation_pipe_1 = require("./common/application/exceptions/validation.pipe");
var context_module_1 = require("./common/application/context/context.module");
var auth_module_1 = require("./modules/auth/auth.module");
var user_module_1 = require("./modules/user/user.module");
var session_module_1 = require("./modules/session/session.module");
var profile_module_1 = require("./modules/profile/profile.module");
var cloudinary_module_1 = require("./common/services/cloudinary/cloudinary.module");
var social_module_1 = require("./modules/social/social.module");
var post_module_1 = require("./modules/post/post.module");
var feed_module_1 = require("./modules/feed/feed.module");
var privacy_module_1 = require("./modules/privacy/privacy.module");
var health_controller_1 = require("./health.controller");
var like_module_1 = require("./modules/like/like.module");
var graph_sync_module_1 = require("./modules/graph/graph-sync.module");
var comment_module_1 = require("./modules/comment/comment.module");
var chat_module_1 = require("./modules/chat/chat.module");
var notification_module_1 = require("./modules/notification/notification.module");
var noro_module_1 = require("./modules/noro/noro.module");
var moderation_module_1 = require("./modules/moderation/moderation.module");
var helper_module_1 = require("./common/utils/helper/helper.module");
var call_module_1 = require("./modules/call/call.module");
var marketplace_module_1 = require("./modules/marketplace/marketplace.module");
var reels_module_1 = require("./modules/reels/reels.module");
var stories_module_1 = require("./modules/stories/stories.module");
var groups_module_1 = require("./modules/groups/groups.module");
var pages_module_1 = require("./modules/pages/pages.module");
var search_module_1 = require("./modules/search/search.module");
var streaming_module_1 = require("./modules/streaming/streaming.module");
var analytics_module_1 = require("./modules/analytics/analytics.module");
var events_module_1 = require("./modules/events/events.module");
var sentiment_module_1 = require("./modules/sentiment/sentiment.module");
var interest_module_1 = require("./modules/interest/interest.module");
var activity_module_1 = require("./modules/activity/activity.module");
var redisUrl = process.env.REDIS_URL || 'redis://localhost:6379';
var bullRedisOptions = {
    host: 'localhost',
    port: 6379,
};
try {
    var parsed = new URL(redisUrl);
    var host = parsed.hostname || 'localhost';
    var port = parsed.port ? parseInt(parsed.port, 10) : 6379;
    var password = parsed.password || undefined;
    var useTls = parsed.protocol === 'rediss:';
    bullRedisOptions = useTls
        ? __assign(__assign({ host: host, port: port }, (password ? { password: password } : {})), { tls: { rejectUnauthorized: false } }) : __assign({ host: host, port: port }, (password ? { password: password } : {}));
}
catch (_a) {
    // Keep default localhost:6379 if parsing fails
}
var AppModule = function () {
    var _classDecorators = [(0, common_1.Module)({
            imports: [
                config_1.ConfigModule.forRoot({
                    isGlobal: true,
                }),
                logger_module_1.LoggerModule,
                redis_module_1.RedisModule,
                bull_1.BullModule.forRoot({
                    redis: bullRedisOptions,
                }),
                database_module_1.DatabaseModule,
                neo4j_module_1.Neo4jModule,
                mongodb_module_1.MongodbModule,
                context_module_1.ContextModule,
                auth_module_1.AuthModule,
                user_module_1.UserModule,
                session_module_1.SessionModule,
                profile_module_1.ProfileModule,
                cloudinary_module_1.CloudinaryModule,
                social_module_1.SocialModule,
                post_module_1.PostModule,
                feed_module_1.FeedModule,
                privacy_module_1.PrivacyModule,
                like_module_1.LikeModule,
                graph_sync_module_1.GraphSyncModule,
                comment_module_1.CommentModule,
                chat_module_1.ChatModule,
                notification_module_1.NotificationModule,
                noro_module_1.NoroModule,
                moderation_module_1.ModerationModule,
                helper_module_1.HelperModule,
                call_module_1.CallModule,
                marketplace_module_1.MarketplaceModule,
                reels_module_1.ReelsModule,
                stories_module_1.StoriesModule,
                groups_module_1.GroupsModule,
                pages_module_1.PagesModule,
                search_module_1.SearchModule,
                streaming_module_1.StreamingModule,
                analytics_module_1.AnalyticsModule,
                events_module_1.EventsModule,
                sentiment_module_1.SentimentModule,
                interest_module_1.InterestModule,
                activity_module_1.ActivityModule,
            ],
            controllers: [app_controller_1.AppController, health_controller_1.HealthController],
            providers: [
                app_service_1.AppService,
                {
                    provide: core_1.APP_PIPE,
                    useValue: new validation_pipe_1.ValidationPipe({
                        whitelist: true,
                        forbidNonWhitelisted: true,
                    }),
                },
                {
                    provide: core_1.APP_FILTER,
                    useFactory: function (logger) {
                        return new exception_filter_1.HttpExceptionFilter(logger);
                    },
                    inject: [nestjs_pino_1.PinoLogger],
                },
                {
                    provide: core_1.APP_INTERCEPTOR,
                    useClass: response_interceptor_1.ResponseInterceptor,
                },
            ],
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var AppModule = _classThis = /** @class */ (function () {
        function AppModule_1() {
        }
        return AppModule_1;
    }());
    __setFunctionName(_classThis, "AppModule");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        AppModule = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return AppModule = _classThis;
}();
exports.AppModule = AppModule;
