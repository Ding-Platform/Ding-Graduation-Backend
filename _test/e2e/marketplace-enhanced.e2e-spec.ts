import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import * as jwt from 'jsonwebtoken';
import { AppModule } from '../../src/app.module';
import { DatabaseService } from '../../src/configs/database/database.service';
import { CloudinaryService } from '../../src/common/services/cloudinary/cloudinary.service';
import { encrypt } from '../../src/common/utils/encryption.util';

type Role = 'USER' | 'SELLER' | 'ADMIN';

describe('Marketplace Enhanced (e2e)', () => {
  let app: INestApplication;
  let prisma: DatabaseService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(CloudinaryService)
      .useValue({
        uploadSellerDocument: jest
          .fn()
          .mockImplementation(
            async (_file: Express.Multer.File, userId: string, docType: string) =>
              `https://mock-cloudinary.local/marketplace/seller-docs/${userId}/${docType}.jpg`,
          ),
        uploadOrderProof: jest
          .fn()
          .mockImplementation(
            async (
              _file: Express.Multer.File,
              orderId: string,
              userId: string,
              proofType: string,
            ) =>
              `https://mock-cloudinary.local/marketplace/orders/${orderId}/${proofType}-${userId}.jpg`,
          ),
      })
      .compile();

    app = moduleFixture.createNestApplication();
    app.setGlobalPrefix('api/v1');
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );

    await app.init();
    prisma = app.get<DatabaseService>(DatabaseService);
  });

  afterAll(async () => {
    await cleanupTestData();
    await app.close();
  });

  it('submits seller application and reads own status', async () => {
    const user = await createAuthedUser('USER');

    const applyRes = await request(app.getHttpServer())
      .post('/api/v1/marketplace/seller/apply')
      .set('Authorization', `Bearer ${user.token}`)
      .field('fullName', 'Marketplace Applicant')
      .field('phoneNumber', '+201001112233')
      .field('email', user.email)
      .field('address', '123 Nile Street')
      .field('city', 'Cairo')
      .field('country', 'Egypt')
      .field('idCardNumber', 'A12345678')
      .field('commercialRegNumber', '1234567')
      .field('bankAccountNumber', '123456789012')
      .field('bankCardNumber', '4242424242424242')
      .field('bankCardExpiry', '12/30')
      .field('bankCardHolderName', 'Marketplace Applicant')
      .attach('idCardFrontImage', Buffer.from('front'), 'id-front.jpg')
      .attach('idCardBackImage', Buffer.from('back'), 'id-back.jpg')
      .attach('sellerFaceImage', Buffer.from('face'), 'face.jpg')
      .expect(201);

    expect(applyRes.body.success).toBe(true);
    expect(applyRes.body.data.status).toBe('PENDING');

    const statusRes = await request(app.getHttpServer())
      .get('/api/v1/marketplace/seller/application/status')
      .set('Authorization', `Bearer ${user.token}`)
      .expect(200);

    expect(statusRes.body.data.status).toBe('PENDING');
    expect(statusRes.body.data.email).toBe(user.email);
  });

  it('blocks non-seller from creating a product', async () => {
    const user = await createAuthedUser('USER');

    await request(app.getHttpServer())
      .post('/api/v1/marketplace/products')
      .set('Authorization', `Bearer ${user.token}`)
      .send({
        title: 'Unauthorized Product',
        description: 'Should fail',
        price: 100,
        quantity: 1,
      })
      .expect(403);
  });

  it('allows seller product flow, purchase, and admin cancellation inventory restore', async () => {
    const seller = await createAuthedUser('SELLER', true);
    const buyer = await createAuthedUser('USER');
    const admin = await createAuthedUser('ADMIN');

    const createProductRes = await request(app.getHttpServer())
      .post('/api/v1/marketplace/products')
      .set('Authorization', `Bearer ${seller.token}`)
      .send({
        title: 'Seller Camera',
        description: 'Mirrorless camera',
        price: 550,
        quantity: 1,
        currency: 'USD',
        images: ['https://img.local/camera.jpg'],
      })
      .expect(201);

    const productId = createProductRes.body.data.id as string;

    const buyRes = await request(app.getHttpServer())
      .post(`/api/v1/marketplace/products/${productId}/buy`)
      .set('Authorization', `Bearer ${buyer.token}`)
      .expect(201);

    const orderId = buyRes.body.data.id as string;
    const transactionId = buyRes.body.data.transaction.id as string;
    expect(buyRes.body.data.status).toBe('PLACED');

    const soldProduct = await prisma.product.findUnique({ where: { id: productId } });
    expect(soldProduct?.quantity).toBe(0);
    expect(soldProduct?.status).toBe('SOLD');

    await request(app.getHttpServer())
      .post(`/api/v1/marketplace/admin/deals/${transactionId}/cancel`)
      .set('Authorization', `Bearer ${admin.token}`)
      .send({ cause: 'Fraud check failed' })
      .expect(200);

    const restoredProduct = await prisma.product.findUnique({ where: { id: productId } });
    const cancelledTx = await prisma.transaction.findUnique({ where: { id: transactionId } });
    const refundedOrder = await prisma.order.findUnique({ where: { id: orderId } });

    expect(restoredProduct?.quantity).toBe(1);
    expect(restoredProduct?.status).toBe('ACTIVE');
    expect(cancelledTx?.status).toBe('REFUNDED');
    expect(refundedOrder?.status).toBe('REFUNDED');
  });

  it('handles shipment, delivery, dispute, and admin dispute resolution', async () => {
    const seller = await createAuthedUser('SELLER', true);
    const buyer = await createAuthedUser('USER');
    const admin = await createAuthedUser('ADMIN');

    const createProductRes = await request(app.getHttpServer())
      .post('/api/v1/marketplace/products')
      .set('Authorization', `Bearer ${seller.token}`)
      .send({
        title: 'Escrow Headphones',
        description: 'Noise cancelling headphones',
        price: 399,
        quantity: 1,
        currency: 'USD',
        images: ['https://img.local/headphones.jpg'],
      })
      .expect(201);

    const productId = createProductRes.body.data.id as string;

    const buyRes = await request(app.getHttpServer())
      .post(`/api/v1/marketplace/products/${productId}/buy`)
      .set('Authorization', `Bearer ${buyer.token}`)
      .expect(201);

    const orderId = buyRes.body.data.id as string;
    const transactionId = buyRes.body.data.transaction.id as string;

    await request(app.getHttpServer())
      .post(`/api/v1/marketplace/seller/orders/${orderId}/confirm-shipment`)
      .set('Authorization', `Bearer ${seller.token}`)
      .field('shipmentTrackingNumber', 'TRACK-1234')
      .field('shipmentCarrier', 'DingExpress')
      .attach('shipmentProofImage', Buffer.from('shipment-proof'), 'shipment.jpg')
      .expect(200);

    await request(app.getHttpServer())
      .post(`/api/v1/marketplace/orders/${orderId}/confirm-delivery`)
      .set('Authorization', `Bearer ${buyer.token}`)
      .attach('deliveryProofImage', Buffer.from('delivery-proof'), 'delivery.jpg')
      .expect(200);

    const afterDelivery = await prisma.order.findUnique({ where: { id: orderId } });
    expect(afterDelivery?.status).toBe('RELEASE_PENDING');
    expect(afterDelivery?.releaseScheduledAt).toBeTruthy();
    expect(afterDelivery?.releaseScheduledAt!.getTime()).toBeGreaterThan(
      Date.now() + 2.5 * 24 * 60 * 60 * 1000,
    );

    await request(app.getHttpServer())
      .post(`/api/v1/marketplace/orders/${orderId}/dispute`)
      .set('Authorization', `Bearer ${buyer.token}`)
      .send({ disputeReason: 'Item condition does not match description' })
      .expect(200);

    const disputed = await prisma.order.findUnique({ where: { id: orderId } });
    expect(disputed?.status).toBe('DISPUTED');

    await request(app.getHttpServer())
      .post(`/api/v1/marketplace/admin/orders/${orderId}/resolve-dispute`)
      .set('Authorization', `Bearer ${admin.token}`)
      .send({ resolution: 'REFUND', adminNote: 'Verified buyer evidence' })
      .expect(200);

    const refundedOrder = await prisma.order.findUnique({ where: { id: orderId } });
    const refundedTx = await prisma.transaction.findUnique({
      where: { id: transactionId },
    });
    expect(refundedOrder?.status).toBe('REFUNDED');
    expect(refundedOrder?.escrowStatus).toBe('REFUNDED');
    expect(refundedTx?.status).toBe('REFUNDED');
  });

  it('allows admin to approve pending application and creates seller profile', async () => {
    const admin = await createAuthedUser('ADMIN');
    const applicant = await createAuthedUser('USER');

    const pendingApp = await prisma.sellerApplication.create({
      data: {
        userId: applicant.userId,
        fullName: 'Pending Applicant',
        phoneNumber: '+201000000000',
        email: applicant.email,
        address: 'Some Address',
        city: 'Cairo',
        country: 'Egypt',
        idCardNumber: encrypt('ID-987654'),
        idCardFrontImage: 'https://img.local/id-front.jpg',
        idCardBackImage: 'https://img.local/id-back.jpg',
        sellerFaceImage: 'https://img.local/face.jpg',
        commercialRegNumber: encrypt('1234567'),
        bankAccountNumber: encrypt('98765432100123'),
        bankCardNumber: encrypt('4242424242424242'),
        bankCardExpiry: '12/30',
        bankCardHolderName: 'Pending Applicant',
        addressTrustScore: 80,
        addressVerified: true,
      },
    });

    await request(app.getHttpServer())
      .post(`/api/v1/marketplace/admin/applications/${pendingApp.id}/approve`)
      .set('Authorization', `Bearer ${admin.token}`)
      .expect(200);

    const promoted = await prisma.user.findUnique({ where: { id: applicant.userId } });
    const sellerProfile = await prisma.sellerProfile.findUnique({
      where: { userId: applicant.userId },
    });

    expect(promoted?.role).toBe('SELLER');
    expect(sellerProfile).toBeTruthy();
    expect(sellerProfile?.isBanned).toBe(false);
  });

  it('allows admin to ban seller and seller gets blocked by SellerGuard', async () => {
    const admin = await createAuthedUser('ADMIN');
    const seller = await createAuthedUser('SELLER', true);

    await request(app.getHttpServer())
      .post(`/api/v1/marketplace/admin/sellers/${seller.userId}/ban`)
      .set('Authorization', `Bearer ${admin.token}`)
      .send({ cause: 'Policy violation' })
      .expect(200);

    await request(app.getHttpServer())
      .post('/api/v1/marketplace/products')
      .set('Authorization', `Bearer ${seller.token}`)
      .send({
        title: 'Blocked Seller Product',
        description: 'Should fail due to ban',
        price: 200,
        quantity: 1,
      })
      .expect(403);
  });

  async function createAuthedUser(role: Role, ensureSellerProfile = false) {
    const suffix = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    const email = `market-e2e-${suffix}@example.com`;

    const user = await prisma.user.create({
      data: {
        email,
        name: `Market E2E ${role}`,
        emailVerified: true,
        active: true,
        role,
      },
    });

    if (ensureSellerProfile) {
      await prisma.sellerProfile.upsert({
        where: { userId: user.id },
        create: {
          userId: user.id,
          businessName: 'E2E Seller Shop',
          phoneNumber: '+201111111111',
          address: 'Test Address',
          city: 'Cairo',
          country: 'Egypt',
          commercialRegNumber: encrypt('1234567'),
          bankAccountNumber: encrypt('1234567890123'),
          bankCardLast4: '4242',
        },
        update: {},
      });
    }

    const session = await prisma.session.create({
      data: {
        userId: user.id,
        status: 'ACTIVE',
        ipAddress: '127.0.0.1',
        userAgent: 'jest-e2e',
      },
    });

    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new Error('JWT_SECRET is required for marketplace e2e tests');
    }

    const token = jwt.sign(
      {
        userId: user.id,
        sessionId: session.id,
      },
      secret,
      { algorithm: 'HS256', expiresIn: '1h' },
    );

    return { userId: user.id, email, token, sessionId: session.id };
  }

  async function cleanupTestData() {
    const users = await prisma.user.findMany({
      where: {
        email: {
          startsWith: 'market-e2e-',
        },
      },
      select: { id: true },
    });

    if (users.length === 0) return;

    const userIds = users.map((u) => u.id);

    const txs = await prisma.transaction.findMany({
      where: {
        OR: [{ buyerId: { in: userIds } }, { sellerId: { in: userIds } }],
      },
      select: { id: true },
    });
    const txIds = txs.map((t) => t.id);
    const orders = await prisma.order.findMany({
      where: {
        OR: [{ buyerId: { in: userIds } }, { sellerId: { in: userIds } }],
      },
      select: { id: true },
    });
    const orderIds = orders.map((o) => o.id);

    await prisma.dealLog.deleteMany({
      where: {
        OR: [
          { adminId: { in: userIds } },
          { targetId: { in: userIds } },
          { targetId: { in: txIds } },
          { targetId: { in: orderIds } },
        ],
      },
    });

    await prisma.transaction.deleteMany({
      where: {
        OR: [{ buyerId: { in: userIds } }, { sellerId: { in: userIds } }],
      },
    });
    await prisma.order.deleteMany({
      where: {
        OR: [{ buyerId: { in: userIds } }, { sellerId: { in: userIds } }],
      },
    });

    await prisma.product.deleteMany({
      where: { sellerId: { in: userIds } },
    });

    await prisma.sellerProfile.deleteMany({ where: { userId: { in: userIds } } });
    await prisma.sellerApplication.deleteMany({ where: { userId: { in: userIds } } });
    await prisma.session.deleteMany({ where: { userId: { in: userIds } } });
    await prisma.otp.deleteMany({ where: { userId: { in: userIds } } });
    await prisma.user.deleteMany({ where: { id: { in: userIds } } });
  }
});
