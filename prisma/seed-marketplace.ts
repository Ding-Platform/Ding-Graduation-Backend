import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';
import { encrypt } from '../src/common/utils/encryption.util';

const prisma = new PrismaClient();

const PASSWORD = 'Password#123';

const USERS = {
  admin: 'market.admin.seed@example.com',
  seller1: 'market.seller1.seed@example.com',
  seller2: 'market.seller2.seed@example.com',
  buyer: 'market.buyer.seed@example.com',
  applicantPending: 'market.app.pending.seed@example.com',
  applicantDeclined: 'market.app.declined.seed@example.com',
};

async function cleanupExistingSeedData() {
  const users = await prisma.user.findMany({
    where: { email: { in: Object.values(USERS) } },
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

  await prisma.dealLog.deleteMany({
    where: {
      OR: [
        { adminId: { in: userIds } },
        { targetId: { in: userIds } },
        { targetId: { in: txIds } },
      ],
    },
  });

  await prisma.transaction.deleteMany({
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

async function createUsers() {
  const hashedPassword = await bcrypt.hash(PASSWORD, 10);

  const admin = await prisma.user.create({
    data: {
      email: USERS.admin,
      name: 'Marketplace Admin Seed',
      password: hashedPassword,
      emailVerified: true,
      active: true,
      role: 'ADMIN',
    },
  });

  const seller1 = await prisma.user.create({
    data: {
      email: USERS.seller1,
      name: 'Seller One Seed',
      password: hashedPassword,
      emailVerified: true,
      active: true,
      role: 'SELLER',
    },
  });

  const seller2 = await prisma.user.create({
    data: {
      email: USERS.seller2,
      name: 'Seller Two Seed',
      password: hashedPassword,
      emailVerified: true,
      active: true,
      role: 'SELLER',
    },
  });

  const buyer = await prisma.user.create({
    data: {
      email: USERS.buyer,
      name: 'Buyer Seed',
      password: hashedPassword,
      emailVerified: true,
      active: true,
      role: 'USER',
    },
  });

  const applicantPending = await prisma.user.create({
    data: {
      email: USERS.applicantPending,
      name: 'Pending Applicant Seed',
      password: hashedPassword,
      emailVerified: true,
      active: true,
      role: 'USER',
    },
  });

  const applicantDeclined = await prisma.user.create({
    data: {
      email: USERS.applicantDeclined,
      name: 'Declined Applicant Seed',
      password: hashedPassword,
      emailVerified: true,
      active: true,
      role: 'USER',
    },
  });

  return { admin, seller1, seller2, buyer, applicantPending, applicantDeclined };
}

async function seedMarketplaceData() {
  await cleanupExistingSeedData();

  const { admin, seller1, seller2, buyer, applicantPending, applicantDeclined } =
    await createUsers();

  await prisma.sellerProfile.createMany({
    data: [
      {
        userId: seller1.id,
        businessName: 'Seed Tech Store',
        phoneNumber: '+201000000001',
        address: 'Nasr City',
        city: 'Cairo',
        country: 'Egypt',
        commercialRegNumber: encrypt('1234567'),
        bankAccountNumber: encrypt('1111222233334444'),
        bankCardLast4: '4242',
      },
      {
        userId: seller2.id,
        businessName: 'Seed Fashion Store',
        phoneNumber: '+201000000002',
        address: 'Smouha',
        city: 'Alexandria',
        country: 'Egypt',
        commercialRegNumber: encrypt('7654321'),
        bankAccountNumber: encrypt('4444333322221111'),
        bankCardLast4: '5555',
      },
    ],
  });

  await prisma.sellerApplication.createMany({
    data: [
      {
        userId: seller1.id,
        fullName: 'Seller One Seed',
        phoneNumber: '+201000000001',
        email: USERS.seller1,
        address: 'Nasr City',
        city: 'Cairo',
        country: 'Egypt',
        idCardNumber: encrypt('ID-S1-123456'),
        idCardFrontImage: 'https://seed.local/id-front-s1.jpg',
        idCardBackImage: 'https://seed.local/id-back-s1.jpg',
        sellerFaceImage: 'https://seed.local/face-s1.jpg',
        commercialRegNumber: encrypt('1234567'),
        bankAccountNumber: encrypt('1111222233334444'),
        bankCardNumber: encrypt('4242424242424242'),
        bankCardExpiry: '12/30',
        bankCardHolderName: 'Seller One Seed',
        addressTrustScore: 85,
        addressVerified: true,
        status: 'APPROVED',
        reviewedById: admin.id,
        reviewedAt: new Date(),
      },
      {
        userId: seller2.id,
        fullName: 'Seller Two Seed',
        phoneNumber: '+201000000002',
        email: USERS.seller2,
        address: 'Smouha',
        city: 'Alexandria',
        country: 'Egypt',
        idCardNumber: encrypt('ID-S2-654321'),
        idCardFrontImage: 'https://seed.local/id-front-s2.jpg',
        idCardBackImage: 'https://seed.local/id-back-s2.jpg',
        sellerFaceImage: 'https://seed.local/face-s2.jpg',
        commercialRegNumber: encrypt('7654321'),
        bankAccountNumber: encrypt('4444333322221111'),
        bankCardNumber: encrypt('5555555555554444'),
        bankCardExpiry: '11/31',
        bankCardHolderName: 'Seller Two Seed',
        addressTrustScore: 72,
        addressVerified: true,
        status: 'APPROVED',
        reviewedById: admin.id,
        reviewedAt: new Date(),
      },
      {
        userId: applicantPending.id,
        fullName: 'Pending Applicant Seed',
        phoneNumber: '+201000000003',
        email: USERS.applicantPending,
        address: 'Dokki',
        city: 'Giza',
        country: 'Egypt',
        idCardNumber: encrypt('ID-PENDING-0001'),
        idCardFrontImage: 'https://seed.local/id-front-pending.jpg',
        idCardBackImage: 'https://seed.local/id-back-pending.jpg',
        sellerFaceImage: 'https://seed.local/face-pending.jpg',
        commercialRegNumber: encrypt('1234568'),
        bankAccountNumber: encrypt('1212121212121212'),
        bankCardNumber: encrypt('4000000000000002'),
        bankCardExpiry: '10/30',
        bankCardHolderName: 'Pending Applicant Seed',
        addressTrustScore: 54,
        addressVerified: false,
        status: 'PENDING',
      },
      {
        userId: applicantDeclined.id,
        fullName: 'Declined Applicant Seed',
        phoneNumber: '+201000000004',
        email: USERS.applicantDeclined,
        address: 'Heliopolis',
        city: 'Cairo',
        country: 'Egypt',
        idCardNumber: encrypt('ID-DECLINED-0001'),
        idCardFrontImage: 'https://seed.local/id-front-declined.jpg',
        idCardBackImage: 'https://seed.local/id-back-declined.jpg',
        sellerFaceImage: 'https://seed.local/face-declined.jpg',
        commercialRegNumber: encrypt('1234569'),
        bankAccountNumber: encrypt('3434343434343434'),
        bankCardNumber: encrypt('4000000000009995'),
        bankCardExpiry: '09/30',
        bankCardHolderName: 'Declined Applicant Seed',
        addressTrustScore: 20,
        addressVerified: false,
        status: 'DECLINED',
        reviewedById: admin.id,
        reviewedAt: new Date(),
        adminNote: 'Commercial registration mismatch',
      },
    ],
  });

  const productA = await prisma.product.create({
    data: {
      title: 'Seed Gaming Laptop',
      description: 'RTX laptop from seed data',
      price: 1500,
      currency: 'USD',
      quantity: 4,
      status: 'ACTIVE',
      images: ['https://seed.local/laptop.jpg'],
      sellerId: seller1.id,
    },
  });

  const productB = await prisma.product.create({
    data: {
      title: 'Seed Headphones',
      description: 'Noise-cancelling',
      price: 199,
      currency: 'USD',
      quantity: 0,
      status: 'SOLD',
      images: ['https://seed.local/headphones.jpg'],
      sellerId: seller1.id,
    },
  });

  const productC = await prisma.product.create({
    data: {
      title: 'Seed Jacket',
      description: 'Winter jacket',
      price: 120,
      currency: 'USD',
      quantity: 0,
      status: 'ACTIVE',
      images: ['https://seed.local/jacket.jpg'],
      sellerId: seller2.id,
    },
  });

  const txPending = await prisma.transaction.create({
    data: {
      buyerId: buyer.id,
      sellerId: seller1.id,
      productId: productA.id,
      amount: productA.price,
      currency: productA.currency,
      status: 'PENDING',
    },
  });

  const txCompleted = await prisma.transaction.create({
    data: {
      buyerId: buyer.id,
      sellerId: seller1.id,
      productId: productB.id,
      amount: productB.price,
      currency: productB.currency,
      status: 'COMPLETED',
    },
  });

  const txCancelled = await prisma.transaction.create({
    data: {
      buyerId: buyer.id,
      sellerId: seller2.id,
      productId: productC.id,
      amount: productC.price,
      currency: productC.currency,
      status: 'CANCELLED',
    },
  });

  await prisma.dealLog.createMany({
    data: [
      {
        adminId: admin.id,
        targetType: 'SELLER',
        targetId: seller1.id,
        action: 'APPROVE_APPLICATION',
        cause: 'Seller one approved during seed',
      },
      {
        adminId: admin.id,
        targetType: 'SELLER',
        targetId: seller2.id,
        action: 'APPROVE_APPLICATION',
        cause: 'Seller two approved during seed',
      },
      {
        adminId: admin.id,
        targetType: 'SELLER',
        targetId: applicantDeclined.id,
        action: 'DECLINE_APPLICATION',
        cause: 'Documents mismatch',
      },
      {
        adminId: admin.id,
        targetType: 'TRANSACTION',
        targetId: txCancelled.id,
        action: 'CANCEL_DEAL',
        cause: 'Chargeback dispute',
      },
      {
        adminId: admin.id,
        targetType: 'TRANSACTION',
        targetId: txPending.id,
        action: 'CANCEL_DEAL',
        cause: 'Example pending deal action log',
      },
    ],
  });

  return {
    users: { admin, seller1, seller2, buyer, applicantPending, applicantDeclined },
    products: { productA, productB, productC },
    transactions: { txPending, txCompleted, txCancelled },
  };
}

async function main() {
  const result = await seedMarketplaceData();

  console.log('Marketplace seed completed successfully.');
  console.log('Credentials password for all seeded users:', PASSWORD);
  console.log('Admin:', result.users.admin.email);
  console.log('Seller1:', result.users.seller1.email);
  console.log('Seller2:', result.users.seller2.email);
  console.log('Buyer:', result.users.buyer.email);
  console.log('Pending application user:', result.users.applicantPending.email);
  console.log('Declined application user:', result.users.applicantDeclined.email);
}

main()
  .catch((error) => {
    console.error('Marketplace seed failed:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
