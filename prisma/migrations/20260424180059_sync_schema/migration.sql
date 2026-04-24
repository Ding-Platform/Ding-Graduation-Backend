-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('USER', 'SELLER', 'ADMIN');

-- CreateEnum
CREATE TYPE "ApplicationStatus" AS ENUM ('PENDING', 'APPROVED', 'DECLINED');

-- CreateEnum
CREATE TYPE "DealLogTargetType" AS ENUM ('SELLER', 'TRANSACTION');

-- CreateEnum
CREATE TYPE "DealLogAction" AS ENUM ('BAN_SELLER', 'UNBAN_SELLER', 'SUSPEND_SELLER', 'UNSUSPEND_SELLER', 'CANCEL_DEAL', 'APPROVE_APPLICATION', 'DECLINE_APPLICATION');

-- AlterEnum
ALTER TYPE "TransactionStatus" ADD VALUE 'CANCELLED';

-- DropIndex
DROP INDEX "Transaction_productId_key";

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "quantity" INTEGER NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" "UserRole" NOT NULL DEFAULT 'USER';

-- CreateTable
CREATE TABLE "SellerApplication" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "idCardNumber" TEXT NOT NULL,
    "idCardFrontImage" TEXT NOT NULL,
    "idCardBackImage" TEXT NOT NULL,
    "sellerFaceImage" TEXT NOT NULL,
    "commercialRegNumber" TEXT NOT NULL,
    "bankAccountNumber" TEXT NOT NULL,
    "bankCardNumber" TEXT NOT NULL,
    "bankCardExpiry" TEXT NOT NULL,
    "bankCardHolderName" TEXT NOT NULL,
    "addressTrustScore" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "addressVerified" BOOLEAN NOT NULL DEFAULT false,
    "sessionCount" INTEGER NOT NULL DEFAULT 0,
    "uniqueIpCount" INTEGER NOT NULL DEFAULT 0,
    "status" "ApplicationStatus" NOT NULL DEFAULT 'PENDING',
    "adminNote" TEXT,
    "reviewedById" TEXT,
    "reviewedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SellerApplication_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SellerProfile" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "businessName" TEXT,
    "phoneNumber" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "commercialRegNumber" TEXT NOT NULL,
    "bankAccountNumber" TEXT NOT NULL,
    "bankCardLast4" TEXT NOT NULL,
    "isSuspended" BOOLEAN NOT NULL DEFAULT false,
    "isBanned" BOOLEAN NOT NULL DEFAULT false,
    "suspendReason" TEXT,
    "banReason" TEXT,
    "suspendedAt" TIMESTAMP(3),
    "bannedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SellerProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DealLog" (
    "id" TEXT NOT NULL,
    "adminId" TEXT NOT NULL,
    "targetType" "DealLogTargetType" NOT NULL,
    "targetId" TEXT NOT NULL,
    "action" "DealLogAction" NOT NULL,
    "cause" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DealLog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SellerApplication_userId_key" ON "SellerApplication"("userId");

-- CreateIndex
CREATE INDEX "SellerApplication_userId_idx" ON "SellerApplication"("userId");

-- CreateIndex
CREATE INDEX "SellerApplication_status_idx" ON "SellerApplication"("status");

-- CreateIndex
CREATE UNIQUE INDEX "SellerProfile_userId_key" ON "SellerProfile"("userId");

-- CreateIndex
CREATE INDEX "SellerProfile_userId_idx" ON "SellerProfile"("userId");

-- CreateIndex
CREATE INDEX "SellerProfile_isBanned_idx" ON "SellerProfile"("isBanned");

-- CreateIndex
CREATE INDEX "SellerProfile_isSuspended_idx" ON "SellerProfile"("isSuspended");

-- CreateIndex
CREATE INDEX "DealLog_adminId_idx" ON "DealLog"("adminId");

-- CreateIndex
CREATE INDEX "DealLog_targetId_idx" ON "DealLog"("targetId");

-- CreateIndex
CREATE INDEX "DealLog_targetType_createdAt_idx" ON "DealLog"("targetType", "createdAt");

-- CreateIndex
CREATE INDEX "Transaction_productId_idx" ON "Transaction"("productId");

-- AddForeignKey
ALTER TABLE "SellerApplication" ADD CONSTRAINT "SellerApplication_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SellerProfile" ADD CONSTRAINT "SellerProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DealLog" ADD CONSTRAINT "DealLog_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
