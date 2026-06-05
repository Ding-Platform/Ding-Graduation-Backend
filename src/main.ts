import helmet from 'helmet';

// Global polyfill for BigInt JSON serialization
(BigInt.prototype as any).toJSON = function () {
  return Number(this);
};

import { get } from 'env-var';
import { json, static as staticMiddleware } from 'express';
import { AppModule } from './app.module';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import { NestFactory } from '@nestjs/core';
import rateLimit from 'express-rate-limit';
import { existsSync, mkdirSync, writeFile } from 'fs';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { APP_CONSTANTS } from './common/constants';
// Global filters and pipes are set up in AppModule
import * as path from 'path';
import type { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

function initializeLogging() {
  const logDir = 'logs';
  try {
    if (!existsSync(logDir)) {
      mkdirSync(logDir, { recursive: true });
      writeFile(`${logDir}/logs.out`, '', (err) => {
        if (err) console.log(err);
      });
    }
  } catch (error) {
    console.warn(
      'Could not initialize file logging:',
      (error as Error).message,
    );
  }
}

/**
 * CORS origins from CORS_ORIGINS or FRONTEND_URLS (comma-separated).
 * Use "*" to allow any origin (reflect request origin), same as cors `origin: true`.
 */
function getCorsOrigin(): CorsOptions['origin'] {
  const raw = process.env.CORS_ORIGINS ?? process.env.FRONTEND_URLS;
  if (!raw || raw.trim() === '*') {
    return true;
  }
  const list = raw
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
  if (list.length === 0) {
    return true;
  }
  return list.length === 1 ? list[0] : list;
}

function setupMiddlewares(app: NestExpressApplication) {
  // Trust the Nginx reverse proxy to securely parse X-Forwarded-For
  app.set('trust proxy', 1);

  app.use(json());
  app.use(compression());
  app.use(cookieParser());
  app.use(
    helmet({
      contentSecurityPolicy: false,
      crossOriginEmbedderPolicy: false,
      crossOriginResourcePolicy: false,
    }),
  );
}

function setupRateLimiter(app: NestExpressApplication) {
  const windowMs = get('RATE_LIMIT_WINDOW_MS').default(60000).asIntPositive();
  const max = get('RATE_LIMIT_MAX_REQUESTS').default(100).asIntPositive();
  app.use(rateLimit({ windowMs, max }));
}

function setupStaticFileServing(app: NestExpressApplication) {
  const uploadDir = get('UPLOAD_DIR').default('./uploads').asString();
  const uploadPath = path.resolve(uploadDir);

  try {
    if (!existsSync(uploadPath)) {
      mkdirSync(uploadPath, { recursive: true });
    }

    app.use('/uploads', staticMiddleware(uploadPath));
    console.log(`Static file serving enabled for: ${uploadPath}`);
  } catch (error) {
    console.warn(
      'Could not setup static file serving:',
      (error as Error).message,
    );
  }
}

function setupGlobalFilters() {
  // Global filters are set up in AppModule with proper dependency injection
}

function setupSwagger(app: NestExpressApplication) {
  const config = new DocumentBuilder()
    .setTitle(APP_CONSTANTS.APP.NAME)
    .setDescription(APP_CONSTANTS.APP.DESCRIPTION)
    .setVersion(APP_CONSTANTS.APP.VERSION)
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
      },
      'JWT-auth',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(APP_CONSTANTS.API.DOCS_PATH, app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });
}

async function bootstrap(): Promise<void> {
  if (get('NODE_ENV').asString() === 'production') initializeLogging();

  const corsOrigin = getCorsOrigin();
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: {
      origin: corsOrigin,
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization', 'Cookie'],
      exposedHeaders: ['Set-Cookie'],
    },
  });

  app.setGlobalPrefix(APP_CONSTANTS.API.PREFIX);
  setupMiddlewares(app);
  setupGlobalFilters();
  setupStaticFileServing(app);
  setupSwagger(app);

  setupRateLimiter(app);

  await app.init();

  const port = get('PORT').default('3000').asString();
  const host = get('HOST').default('0.0.0.0').asString();
  await app.listen(port, host);
  console.log(`Application is running on: http://localhost:${port}`);
  console.log(`Network access enabled on host: ${host}`);
  const corsLabel =
    corsOrigin === true
      ? 'all origins (reflect)'
      : Array.isArray(corsOrigin)
        ? corsOrigin.join(', ')
        : String(corsOrigin);
  console.log(`CORS allowed origins: ${corsLabel}`);
  console.log(
    `Swagger documentation available at: http://localhost:${port}/${APP_CONSTANTS.API.DOCS_PATH}`,
  );
}

void bootstrap();
