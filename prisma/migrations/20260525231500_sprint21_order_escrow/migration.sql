-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM (
  'PLACED',
  'SELLER_CONFIRMED',
  'SHIPPED',
  'DELIVERED',
  'RELEASE_PENDING',
  'COMPLETED',
  'CANCELLED',
  'DISPUTED',
  'REFUNDED'
);

-- CreateEnum
CREATE TYPE "EscrowStatus" AS ENUM ('HELD', 'RELEASED', 'REFUNDED');

-- Extend existing enums (safe if rerun in non-empty environments)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_enum
    WHERE enumlabel = 'ORDER' AND enumtypid = '"DealLogTargetType"'::regtype
  ) THEN
    ALTER TYPE "DealLogTargetType" ADD VALUE 'ORDER';
  END IF;
END
$$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_enum
    WHERE enumlabel = 'CONFIRM_SHIPMENT' AND enumtypid = '"DealLogAction"'::regtype
  ) THEN
    ALTER TYPE "DealLogAction" ADD VALUE 'CONFIRM_SHIPMENT';
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_enum
    WHERE enumlabel = 'CONFIRM_DELIVERY' AND enumtypid = '"DealLogAction"'::regtype
  ) THEN
    ALTER TYPE "DealLogAction" ADD VALUE 'CONFIRM_DELIVERY';
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_enum
    WHERE enumlabel = 'RELEASE_FUNDS' AND enumtypid = '"DealLogAction"'::regtype
  ) THEN
    ALTER TYPE "DealLogAction" ADD VALUE 'RELEASE_FUNDS';
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_enum
    WHERE enumlabel = 'AUTO_RELEASE_FUNDS' AND enumtypid = '"DealLogAction"'::regtype
  ) THEN
    ALTER TYPE "DealLogAction" ADD VALUE 'AUTO_RELEASE_FUNDS';
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_enum
    WHERE enumlabel = 'OPEN_DISPUTE' AND enumtypid = '"DealLogAction"'::regtype
  ) THEN
    ALTER TYPE "DealLogAction" ADD VALUE 'OPEN_DISPUTE';
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_enum
    WHERE enumlabel = 'RESOLVE_DISPUTE' AND enumtypid = '"DealLogAction"'::regtype
  ) THEN
    ALTER TYPE "DealLogAction" ADD VALUE 'RESOLVE_DISPUTE';
  END IF;
END
$$;

-- AlterTable
ALTER TABLE "Transaction" ADD COLUMN "orderId" TEXT;

-- CreateTable
CREATE TABLE "Order" (
  "id" TEXT NOT NULL,
  "orderNumber" TEXT NOT NULL,
  "status" "OrderStatus" NOT NULL DEFAULT 'PLACED',
  "buyerId" TEXT NOT NULL,
  "sellerId" TEXT NOT NULL,
  "productId" TEXT NOT NULL,
  "quantity" INTEGER NOT NULL DEFAULT 1,
  "unitPrice" DOUBLE PRECISION NOT NULL,
  "currency" TEXT NOT NULL DEFAULT 'USD',
  "totalAmount" DOUBLE PRECISION NOT NULL,
  "escrowAmount" DOUBLE PRECISION NOT NULL,
  "escrowStatus" "EscrowStatus" NOT NULL DEFAULT 'HELD',
  "shipmentTrackingNumber" TEXT,
  "shipmentCarrier" TEXT,
  "shipmentProofImageUrl" TEXT,
  "shippedAt" TIMESTAMP(3),
  "deliveryProofImageUrl" TEXT,
  "deliveredAt" TIMESTAMP(3),
  "buyerConfirmedAt" TIMESTAMP(3),
  "releaseScheduledAt" TIMESTAMP(3),
  "releasedAt" TIMESTAMP(3),
  "disputeReason" TEXT,
  "disputeOpenedAt" TIMESTAMP(3),
  "disputeResolvedAt" TIMESTAMP(3),
  "disputeResolution" TEXT,
  "disputeResolvedById" TEXT,
  "cancelledAt" TIMESTAMP(3),
  "cancelReason" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,

  CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- Backfill legacy pending transactions into orders (deterministic IDs/order numbers)
INSERT INTO "Order" (
  "id",
  "orderNumber",
  "status",
  "buyerId",
  "sellerId",
  "productId",
  "quantity",
  "unitPrice",
  "currency",
  "totalAmount",
  "escrowAmount",
  "escrowStatus",
  "createdAt",
  "updatedAt"
)
SELECT
  'ord-legacy-' || replace(t."id", '-', ''),
  'ORD-LEGACY-' || upper(replace(t."id", '-', '')),
  'PLACED'::"OrderStatus",
  t."buyerId",
  t."sellerId",
  t."productId",
  1,
  t."amount",
  t."currency",
  t."amount",
  t."amount",
  'HELD'::"EscrowStatus",
  t."createdAt",
  t."updatedAt"
FROM "Transaction" t
WHERE t."status" = 'PENDING'
  AND t."orderId" IS NULL;

UPDATE "Transaction" t
SET "orderId" = 'ord-legacy-' || replace(t."id", '-', '')
WHERE t."status" = 'PENDING'
  AND t."orderId" IS NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Order_orderNumber_key" ON "Order"("orderNumber");
CREATE UNIQUE INDEX "Transaction_orderId_key" ON "Transaction"("orderId");

CREATE INDEX "Order_buyerId_status_idx" ON "Order"("buyerId", "status");
CREATE INDEX "Order_sellerId_status_idx" ON "Order"("sellerId", "status");
CREATE INDEX "Order_status_releaseScheduledAt_idx" ON "Order"("status", "releaseScheduledAt");
CREATE INDEX "Order_productId_idx" ON "Order"("productId");
CREATE INDEX "Transaction_orderId_idx" ON "Transaction"("orderId");

-- AddForeignKey
ALTER TABLE "Order"
  ADD CONSTRAINT "Order_buyerId_fkey"
  FOREIGN KEY ("buyerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE "Order"
  ADD CONSTRAINT "Order_sellerId_fkey"
  FOREIGN KEY ("sellerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE "Order"
  ADD CONSTRAINT "Order_productId_fkey"
  FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE "Transaction"
  ADD CONSTRAINT "Transaction_orderId_fkey"
  FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE SET NULL ON UPDATE CASCADE;
