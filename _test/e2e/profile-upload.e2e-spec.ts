import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, BadRequestException } from '@nestjs/common';
import request from 'supertest';
import * as jwt from 'jsonwebtoken';
import { AppModule } from '../../src/app.module';
import { DatabaseService } from '../../src/configs/database/database.service';
import { CloudinaryService } from '../../src/common/services/cloudinary/cloudinary.service';
import { EmailService } from '../../src/common/services/email.service';

describe('Profile Upload (e2e)', () => {
  const tinyPngBuffer = Buffer.from(
    'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO8B2v8AAAAASUVORK5CYII=',
    'base64',
  );

  let app: INestApplication;
  let prisma: DatabaseService;
  let accessToken: string;
  let userId: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(CloudinaryService)
      .useValue({
        uploadProfilePicture: jest
          .fn()
          .mockImplementation(async (file: Express.Multer.File, uid: string) => {
            if (!file.mimetype.startsWith('image/')) {
              throw new BadRequestException('Invalid file type');
            }
            return `https://mock-cloudinary.local/profiles/pictures/${uid}.jpg`;
          }),
        uploadCoverPhoto: jest
          .fn()
          .mockImplementation(async (file: Express.Multer.File, uid: string) => {
            if (!file.mimetype.startsWith('image/')) {
              throw new BadRequestException('Invalid file type');
            }
            return `https://mock-cloudinary.local/profiles/covers/${uid}.jpg`;
          }),
      })
      .overrideProvider(EmailService)
      .useValue({
        sendOtpEmail: jest.fn().mockResolvedValue(undefined),
        sendEmailVerificationOtp: jest.fn().mockResolvedValue(undefined),
      })
      .compile();

    app = moduleFixture.createNestApplication();
    app.setGlobalPrefix('api/v1');
    await app.init();

    prisma = app.get<DatabaseService>(DatabaseService);

    const createdUser = await prisma.user.create({
      data: {
        email: `profile-upload-${Date.now()}@example.com`,
        name: 'Profile Upload Test',
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
        userAgent: 'jest-profile-upload',
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
    await prisma.profile.deleteMany({ where: { userId } });
    await prisma.session.deleteMany({ where: { userId } });
    await prisma.user.deleteMany({ where: { id: userId } });
    await app.close();
  });

  describe('/profile/picture (PATCH)', () => {
    it('should upload profile picture', async () => {
      const res = await request(app.getHttpServer())
        .patch('/api/v1/profile/picture')
        .set('Authorization', `Bearer ${accessToken}`)
        .attach('file', tinyPngBuffer, {
          filename: 'test-image.png',
          contentType: 'image/png',
        });

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data).toHaveProperty('imageUrl');
      expect(res.body.data.imageUrl).toContain('mock-cloudinary.local');
    });

    it('should reject file that is too large', () => {
      const largeBuffer = Buffer.alloc(6 * 1024 * 1024); // 6MB

      return request(app.getHttpServer())
        .patch('/api/v1/profile/picture')
        .set('Authorization', `Bearer ${accessToken}`)
        .attach('file', largeBuffer, 'large-image.jpg')
        .expect(400);
    });

    it('should reject invalid file type', () => {
      return request(app.getHttpServer())
        .patch('/api/v1/profile/picture')
        .set('Authorization', `Bearer ${accessToken}`)
        .attach('file', Buffer.from('not-image'), {
          filename: 'test-document.pdf',
          contentType: 'application/pdf',
        })
        .expect(400);
    });
  });

  describe('/profile/cover (PATCH)', () => {
    it('should upload cover photo', async () => {
      const res = await request(app.getHttpServer())
        .patch('/api/v1/profile/cover')
        .set('Authorization', `Bearer ${accessToken}`)
        .attach('file', tinyPngBuffer, {
          filename: 'test-cover.png',
          contentType: 'image/png',
        });

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data).toHaveProperty('coverPhotoUrl');
      expect(res.body.data.coverPhotoUrl).toContain('mock-cloudinary.local');
    });
  });
});
