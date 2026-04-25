import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import * as jwt from 'jsonwebtoken';
import { AppModule } from './../../src/app.module';
import { DatabaseService } from '../../src/configs/database/database.service';
import { EmailService } from '../../src/common/services/email.service';

describe('Profile (e2e)', () => {
  let app: INestApplication;
  let prisma: DatabaseService;
  let accessToken: string;
  let userId: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(EmailService)
      .useValue({
        sendOtpEmail: jest.fn().mockResolvedValue(undefined),
        sendEmailVerificationOtp: jest.fn().mockResolvedValue(undefined),
      })
      .compile();

    app = moduleFixture.createNestApplication();
    app.setGlobalPrefix('api/v1');
    app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }));
    await app.init();

    prisma = app.get<DatabaseService>(DatabaseService);

    const createdUser = await prisma.user.create({
      data: {
        email: `profiletest-${Date.now()}@example.com`,
        name: 'Profile Test',
        emailVerified: true,
        active: true,
      },
    });
    userId = createdUser.id;

    const session = await prisma.session.create({
      data: {
        userId,
        status: 'ACTIVE',
        ipAddress: '127.0.0.1',
        userAgent: 'jest-profile',
      },
    });

    const secret = process.env.JWT_SECRET;
    if (!secret) throw new Error('JWT_SECRET is required');

    accessToken = jwt.sign(
      { userId, sessionId: session.id },
      secret,
      { algorithm: 'HS256', expiresIn: '1h' },
    );
  });

  afterAll(async () => {
    await prisma.dealLog.deleteMany({ where: { OR: [{ adminId: userId }, { targetId: userId }] } });
    await prisma.otp.deleteMany({ where: { userId } });
    await prisma.session.deleteMany({ where: { userId } });
    await prisma.profile.deleteMany({ where: { userId } });
    await prisma.user.deleteMany({ where: { id: userId } });
    await app.close();
  });

  describe('/profile (PUT)', () => {
    it('should create/update profile', () => {
      return request(app.getHttpServer())
        .put('/api/v1/profile')
        .set('Authorization', `Bearer ${accessToken}`)
        .send({
          bio: 'Test bio for e2e testing',
          location: 'Cairo, Egypt',
          website: 'https://example.com',
        })
        .expect(200)
        .expect((res) => {
          expect(res.body.success).toBe(true);
          expect(res.body.data).toHaveProperty('bio', 'Test bio for e2e testing');
          expect(res.body.data).toHaveProperty('location', 'Cairo, Egypt');
        });
    });

    it('should fail with invalid data', () => {
      return request(app.getHttpServer())
        .put('/api/v1/profile')
        .set('Authorization', `Bearer ${accessToken}`)
        .send({ website: 'not-a-valid-url' })
        .expect(400);
    });

    it('should fail without authentication', () => {
      return request(app.getHttpServer())
        .put('/api/v1/profile')
        .send({ bio: 'Test bio' })
        .expect(401);
    });
  });

  describe('/profile/:userId (GET)', () => {
    it('should get own profile', () => {
      return request(app.getHttpServer())
        .get(`/api/v1/profile/${userId}`)
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(200)
        .expect((res) => {
          expect(res.body.success).toBe(true);
          expect(res.body.data).toHaveProperty('userId', userId);
        });
    });

    it('should get public profile without auth', async () => {
      await request(app.getHttpServer())
        .patch('/api/v1/profile/privacy')
        .set('Authorization', `Bearer ${accessToken}`)
        .send({ profileVisibility: 'PUBLIC' })
        .expect(200);

      return request(app.getHttpServer())
        .get(`/api/v1/profile/${userId}`)
        .expect(200);
    });
  });

  describe('/profile/privacy (PATCH)', () => {
    it('should update privacy settings', () => {
      return request(app.getHttpServer())
        .patch('/api/v1/profile/privacy')
        .set('Authorization', `Bearer ${accessToken}`)
        .send({
          profileVisibility: 'FRIENDS',
          postsVisibility: 'PUBLIC',
          emailVisibility: 'PRIVATE',
          allowCameraAccess: true,
        })
        .expect(200)
        .expect((res) => {
          expect(res.body.success).toBe(true);
          expect(res.body.data).toHaveProperty('id');
        });
    });

    it('should fail with invalid visibility type', () => {
      return request(app.getHttpServer())
        .patch('/api/v1/profile/privacy')
        .set('Authorization', `Bearer ${accessToken}`)
        .send({ profileVisibility: 'INVALID_TYPE' })
        .expect(400);
    });
  });

  describe('/profile/search (GET)', () => {
    it('should search profiles', () => {
      return request(app.getHttpServer())
        .get('/api/v1/profile/search')
        .query({ query: 'Profile Test', page: 1, limit: 10 })
        .expect(200)
        .expect((res) => {
          expect(res.body.success).toBe(true);
          expect(res.body.data).toHaveProperty('data');
          expect(res.body.data).toHaveProperty('meta');
          expect(Array.isArray(res.body.data.data)).toBe(true);
          expect(res.body.data.meta).toHaveProperty('page', 1);
        });
    });

    it('should filter by location', () => {
      return request(app.getHttpServer())
        .get('/api/v1/profile/search')
        .query({ location: 'Cairo', page: 1, limit: 10 })
        .expect(200);
    });
  });

  describe('/profile (DELETE)', () => {
    it('should delete profile', async () => {
      await request(app.getHttpServer())
        .put('/api/v1/profile')
        .set('Authorization', `Bearer ${accessToken}`)
        .send({ bio: 'will be deleted' })
        .expect(200);

      return request(app.getHttpServer())
        .delete('/api/v1/profile')
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(200)
        .expect((res) => {
          expect(res.body.success).toBe(true);
        });
    });
  });
});
