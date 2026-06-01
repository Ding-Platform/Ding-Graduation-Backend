import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { BullModule } from '@nestjs/bull';
import { PinoLogger } from 'nestjs-pino';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './configs/database/database.module';
import { RedisModule } from './configs/redis/redis.module';
import { Neo4jModule } from './configs/neo4j/neo4j.module';
import { MongodbModule } from './configs/mongodb/mongodb.module';
import { LoggerModule } from './common/application/logger/logger.module';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';
import { HttpExceptionFilter } from './common/application/exceptions/exception-filter';
import { ValidationPipe } from './common/application/exceptions/validation.pipe';
import { ContextModule } from './common/application/context/context.module';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { SessionModule } from './modules/session/session.module';
import { ProfileModule } from './modules/profile/profile.module';
import { CloudinaryModule } from './common/services/cloudinary/cloudinary.module';
import { SocialModule } from './modules/social/social.module';
import { PostModule } from './modules/post/post.module';
import { FeedModule } from './modules/feed/feed.module';
import { PrivacyModule } from './modules/privacy/privacy.module';
import { HealthController } from './health.controller';
import { LikeModule } from './modules/like/like.module';
import { GraphSyncModule } from './modules/graph/graph-sync.module';
import { CommentModule } from './modules/comment/comment.module';
import { ChatModule } from './modules/chat/chat.module';
import { NotificationModule } from './modules/notification/notification.module';
import { NoroModule } from './modules/noro/noro.module';
import { ModerationModule } from './modules/moderation/moderation.module';
import { HelperModule } from './common/utils/helper/helper.module';
import { CallModule } from './modules/call/call.module';
import { MarketplaceModule } from './modules/marketplace/marketplace.module';
import { ReelsModule } from './modules/reels/reels.module';
import { SearchModule } from './modules/search/search.module';
import { StoriesModule } from './modules/stories/stories.module';
import { GroupsModule } from './modules/groups/groups.module';
import { PagesModule } from './modules/pages/pages.module';
import { StreamingModule } from './modules/streaming/streaming.module';
import { AnalyticsModule } from './modules/analytics/analytics.module';
import { EventsModule } from './modules/events/events.module';
import { AuditModule } from './modules/audit/audit.module';

const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379';

let bullRedisOptions: {
  host: string;
  port: number;
  password?: string;
  tls?: { rejectUnauthorized: boolean };
} = {
  host: 'localhost',
  port: 6379,
};

try {
  const parsed = new URL(redisUrl);
  const host = parsed.hostname || 'localhost';
  const port = parsed.port ? parseInt(parsed.port, 10) : 6379;
  const password = parsed.password || undefined;

  const useTls = parsed.protocol === 'rediss:';
  bullRedisOptions = useTls
    ? {
        host,
        port,
        ...(password ? { password } : {}),
        tls: { rejectUnauthorized: false },
      }
    : {
        host,
        port,
        ...(password ? { password } : {}),
      };
} catch {
  // Keep default localhost:6379 if parsing fails
}

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    LoggerModule,
    RedisModule,
    BullModule.forRoot({
      redis: bullRedisOptions,
    }),
    DatabaseModule,
    Neo4jModule,
    MongodbModule,
    ContextModule,
    AuthModule,
    UserModule,
    SessionModule,
    ProfileModule,
    CloudinaryModule,
    SocialModule,
    PostModule,
    FeedModule,
    PrivacyModule,
    LikeModule,
    GraphSyncModule,
    CommentModule,
    ChatModule,
    NotificationModule,
    NoroModule,
    ModerationModule,
    HelperModule,
    CallModule,
    MarketplaceModule,
    ReelsModule,
    SearchModule,
    StoriesModule,
    GroupsModule,
    PagesModule,
    StreamingModule,
    AnalyticsModule,
    EventsModule,
    AuditModule,
  ],
  controllers: [AppController, HealthController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
      }),
    },
    {
      provide: APP_FILTER,
      useFactory: (logger: PinoLogger) => {
        return new HttpExceptionFilter(logger);
      },
      inject: [PinoLogger],
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
  ],
})
export class AppModule {}
