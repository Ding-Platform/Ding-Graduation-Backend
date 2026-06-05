import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { Prisma, OrderStatus } from '@prisma/client';
import { DatabaseService } from 'src/configs/database/database.service';
import { CloudinaryService } from 'src/common/services/cloudinary/cloudinary.service';
import { StorageService } from 'src/common/services/storage/storage.service';
import { NotificationService } from 'src/modules/notification/notification.service';
import {
  CancelOrderDto,
  ConfirmShipmentDto,
  GetOrdersQueryDto,
  OpenDisputeDto,
  ResolveDisputeDto,
} from '../dtos/order.dto';

const RELEASE_HOLD_MS = 3 * 24 * 60 * 60 * 1000;

@Injectable()
export class OrderService {
  constructor(
    private readonly db: DatabaseService,
    private readonly cloudinary: CloudinaryService,
    private readonly storageService: StorageService,
    @InjectQueue('order-release') private readonly orderReleaseQueue: Queue,
    private readonly notificationService: NotificationService,
  ) {}

  private buildOrderNumber(): string {
    const rand = Math.random().toString(36).slice(2, 8).toUpperCase();
    return `ORD-${Date.now()}-${rand}`;
  }

  private buildReleaseJobId(orderId: string): string {
    return `order-release:${orderId}`;
  }

  private async removeReleaseJob(orderId: string) {
    const job = await this.orderReleaseQueue.getJob(
      this.buildReleaseJobId(orderId),
    );
    if (job) {
      await job.remove();
    }
  }

  private async scheduleReleaseJob(orderId: string, releaseAt: Date) {
    const delay = Math.max(0, releaseAt.getTime() - Date.now());

    await this.orderReleaseQueue.add(
      'release-funds',
      { orderId },
      {
        delay,
        jobId: this.buildReleaseJobId(orderId),
        removeOnComplete: true,
        removeOnFail: true,
      },
    );
  }

  async createOrderFromPurchase(
    tx: Prisma.TransactionClient,
    buyerId: string,
    product: {
      id: string;
      sellerId: string;
      price: number;
      currency: string;
    },
  ) {
    const order = await tx.order.create({
      data: {
        orderNumber: this.buildOrderNumber(),
        buyerId,
        sellerId: product.sellerId,
        productId: product.id,
        quantity: 1,
        unitPrice: product.price,
        currency: product.currency,
        totalAmount: product.price,
        escrowAmount: product.price,
        escrowStatus: 'HELD',
        status: 'PLACED',
      },
    });

    // Trigger marketplace order notification
    // Note: because this runs inside a tx, we should ideally trigger it after tx commits
    // but Prisma doesn't have an afterCommit hook easily, so we trigger it here asynchronously.
    this.notificationService
      .notifyMarketplaceOrder(buyerId, product.sellerId, order.id, product.id)
      .catch((err) => console.error(err));

    return order;
  }

  async listBuyerOrders(buyerId: string, query: GetOrdersQueryDto) {
    const { status, page = 1, limit = 20 } = query;
    const skip = (page - 1) * limit;

    const where: Prisma.OrderWhereInput = { buyerId };
    if (status) {
      where.status = status as OrderStatus;
    }

    const [data, total] = await Promise.all([
      this.db.order.findMany({
        where,
        include: {
          product: { select: { id: true, title: true, images: true } },
          seller: { select: { id: true, name: true, image: true } },
          transaction: true,
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      this.db.order.count({ where }),
    ]);

    return { data, total, page, limit };
  }

  async getBuyerOrderDetail(buyerId: string, orderId: string) {
    const order = await this.db.order.findUnique({
      where: { id: orderId },
      include: {
        product: true,
        seller: { select: { id: true, name: true, image: true } },
        buyer: { select: { id: true, name: true, email: true, image: true } },
        transaction: true,
      },
    });

    if (!order) throw new NotFoundException('Order not found');
    if (order.buyerId !== buyerId) {
      throw new ForbiddenException('You can only view your own orders');
    }

    return order;
  }

  async listSellerOrders(sellerId: string, query: GetOrdersQueryDto) {
    const { status, page = 1, limit = 20 } = query;
    const skip = (page - 1) * limit;

    const where: Prisma.OrderWhereInput = { sellerId };
    if (status) {
      where.status = status as OrderStatus;
    }

    const [data, total] = await Promise.all([
      this.db.order.findMany({
        where,
        include: {
          product: { select: { id: true, title: true, images: true } },
          buyer: { select: { id: true, name: true, email: true, image: true } },
          transaction: true,
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      this.db.order.count({ where }),
    ]);

    return { data, total, page, limit };
  }

  async getSellerOrderDetail(sellerId: string, orderId: string) {
    const order = await this.db.order.findUnique({
      where: { id: orderId },
      include: {
        product: true,
        seller: { select: { id: true, name: true, image: true } },
        buyer: { select: { id: true, name: true, email: true, image: true } },
        transaction: true,
      },
    });

    if (!order) throw new NotFoundException('Order not found');
    if (order.sellerId !== sellerId) {
      throw new ForbiddenException('You can only view your own orders');
    }

    return order;
  }

  async listAdminOrders(query: GetOrdersQueryDto) {
    const { status, page = 1, limit = 20 } = query;
    const skip = (page - 1) * limit;

    const where: Prisma.OrderWhereInput = {};
    if (status) {
      where.status = status as OrderStatus;
    }

    const [data, total] = await Promise.all([
      this.db.order.findMany({
        where,
        include: {
          product: true,
          seller: {
            select: { id: true, name: true, email: true, image: true },
          },
          buyer: { select: { id: true, name: true, email: true, image: true } },
          transaction: true,
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      this.db.order.count({ where }),
    ]);

    return { data, total, page, limit };
  }

  async getAdminOrderDetail(orderId: string) {
    const order = await this.db.order.findUnique({
      where: { id: orderId },
      include: {
        product: true,
        seller: { select: { id: true, name: true, email: true, image: true } },
        buyer: { select: { id: true, name: true, email: true, image: true } },
        transaction: true,
      },
    });

    if (!order) throw new NotFoundException('Order not found');
    return order;
  }

  async confirmShipment(
    sellerId: string,
    orderId: string,
    dto: ConfirmShipmentDto,
    proofFile: Express.Multer.File,
  ) {
    if (!proofFile) {
      throw new BadRequestException('Shipment proof image is required');
    }

    const order = await this.db.order.findUnique({ where: { id: orderId } });
    if (!order) throw new NotFoundException('Order not found');
    if (order.sellerId !== sellerId) {
      throw new ForbiddenException('You can only update your own orders');
    }
    if (order.status !== 'PLACED') {
      throw new BadRequestException('Only placed orders can be shipped');
    }

    const proofUrl = await this.storageService.uploadOrderProof(
      proofFile,
      orderId,
      sellerId,
      'shipment',
    );

    const updated = await this.db.$transaction(async (tx) => {
      const saved = await tx.order.update({
        where: { id: orderId },
        data: {
          status: 'SHIPPED',
          shipmentTrackingNumber: dto.shipmentTrackingNumber,
          shipmentCarrier: dto.shipmentCarrier,
          shipmentProofImageUrl: proofUrl,
          shippedAt: new Date(),
        },
      });

      await tx.dealLog.create({
        data: {
          adminId: sellerId,
          targetType: 'ORDER',
          targetId: orderId,
          action: 'CONFIRM_SHIPMENT',
          cause: `Shipment confirmed by seller with tracking ${dto.shipmentTrackingNumber}`,
        },
      });

      return saved;
    });

    return updated;
  }

  async confirmDelivery(
    buyerId: string,
    orderId: string,
    proofFile: Express.Multer.File,
  ) {
    if (!proofFile) {
      throw new BadRequestException('Delivery proof image is required');
    }

    const order = await this.db.order.findUnique({ where: { id: orderId } });
    if (!order) throw new NotFoundException('Order not found');
    if (order.buyerId !== buyerId) {
      throw new ForbiddenException('You can only confirm your own orders');
    }
    if (order.status !== 'SHIPPED') {
      throw new BadRequestException(
        'Only shipped orders can be confirmed as delivered',
      );
    }

    const proofUrl = await this.storageService.uploadOrderProof(
      proofFile,
      orderId,
      buyerId,
      'delivery',
    );

    const now = new Date();
    const releaseAt = new Date(now.getTime() + RELEASE_HOLD_MS);

    const updated = await this.db.$transaction(async (tx) => {
      const saved = await tx.order.update({
        where: { id: orderId },
        data: {
          status: 'RELEASE_PENDING',
          deliveryProofImageUrl: proofUrl,
          deliveredAt: now,
          buyerConfirmedAt: now,
          releaseScheduledAt: releaseAt,
        },
      });

      await tx.dealLog.create({
        data: {
          adminId: buyerId,
          targetType: 'ORDER',
          targetId: orderId,
          action: 'CONFIRM_DELIVERY',
          cause: 'Buyer confirmed delivery and release hold started',
        },
      });

      return saved;
    });

    await this.scheduleReleaseJob(orderId, releaseAt);
    return updated;
  }

  async cancelOrder(buyerId: string, orderId: string, dto: CancelOrderDto) {
    const order = await this.db.order.findUnique({
      where: { id: orderId },
      include: { product: true, transaction: true },
    });
    if (!order) throw new NotFoundException('Order not found');
    if (order.buyerId !== buyerId) {
      throw new ForbiddenException('You can only cancel your own orders');
    }
    if (order.status !== 'PLACED') {
      throw new BadRequestException('Only placed orders can be cancelled');
    }

    await this.removeReleaseJob(orderId);

    const updated = await this.db.$transaction(async (tx) => {
      const saved = await tx.order.update({
        where: { id: orderId },
        data: {
          status: 'CANCELLED',
          escrowStatus: 'REFUNDED',
          cancelledAt: new Date(),
          cancelReason: dto.cancelReason ?? 'Cancelled by buyer',
        },
      });

      await tx.product.update({
        where: { id: order.productId },
        data: {
          quantity: { increment: order.quantity },
          status: 'ACTIVE',
        },
      });

      if (order.transaction) {
        await tx.transaction.update({
          where: { id: order.transaction.id },
          data: { status: 'CANCELLED' },
        });
      }

      return saved;
    });

    return updated;
  }

  async openDispute(buyerId: string, orderId: string, dto: OpenDisputeDto) {
    const order = await this.db.order.findUnique({ where: { id: orderId } });
    if (!order) throw new NotFoundException('Order not found');
    if (order.buyerId !== buyerId) {
      throw new ForbiddenException('You can only dispute your own orders');
    }

    const allowed: OrderStatus[] = [
      'SELLER_CONFIRMED',
      'SHIPPED',
      'DELIVERED',
      'RELEASE_PENDING',
    ];
    if (!allowed.includes(order.status)) {
      throw new BadRequestException(
        'This order cannot be disputed in its current state',
      );
    }

    await this.removeReleaseJob(orderId);

    const updated = await this.db.$transaction(async (tx) => {
      const saved = await tx.order.update({
        where: { id: orderId },
        data: {
          status: 'DISPUTED',
          disputeReason: dto.disputeReason,
          disputeOpenedAt: new Date(),
        },
      });

      await tx.dealLog.create({
        data: {
          adminId: buyerId,
          targetType: 'ORDER',
          targetId: orderId,
          action: 'OPEN_DISPUTE',
          cause: dto.disputeReason,
        },
      });

      return saved;
    });

    return updated;
  }

  async resolveDispute(
    adminId: string,
    orderId: string,
    dto: ResolveDisputeDto,
  ) {
    const order = await this.db.order.findUnique({
      where: { id: orderId },
      include: { transaction: true },
    });
    if (!order) throw new NotFoundException('Order not found');
    if (order.status !== 'DISPUTED') {
      throw new BadRequestException('Only disputed orders can be resolved');
    }

    await this.removeReleaseJob(orderId);

    const now = new Date();

    if (dto.resolution === 'REFUND') {
      return this.db.$transaction(async (tx) => {
        const saved = await tx.order.update({
          where: { id: orderId },
          data: {
            status: 'REFUNDED',
            escrowStatus: 'REFUNDED',
            disputeResolvedAt: now,
            disputeResolution: dto.adminNote ?? 'Refund approved by admin',
            disputeResolvedById: adminId,
          },
        });

        if (order.transaction) {
          await tx.transaction.update({
            where: { id: order.transaction.id },
            data: { status: 'REFUNDED' },
          });
        }

        await tx.dealLog.create({
          data: {
            adminId,
            targetType: 'ORDER',
            targetId: orderId,
            action: 'RESOLVE_DISPUTE',
            cause: dto.adminNote ?? 'Resolved as REFUND',
          },
        });

        return saved;
      });
    }

    return this.db.$transaction(async (tx) => {
      const saved = await tx.order.update({
        where: { id: orderId },
        data: {
          status: 'COMPLETED',
          escrowStatus: 'RELEASED',
          releasedAt: now,
          disputeResolvedAt: now,
          disputeResolution: dto.adminNote ?? 'Release approved by admin',
          disputeResolvedById: adminId,
        },
      });

      if (order.transaction) {
        await tx.transaction.update({
          where: { id: order.transaction.id },
          data: { status: 'COMPLETED' },
        });
      }

      await tx.dealLog.create({
        data: {
          adminId,
          targetType: 'ORDER',
          targetId: orderId,
          action: 'RESOLVE_DISPUTE',
          cause: dto.adminNote ?? 'Resolved as RELEASE',
        },
      });

      return saved;
    });
  }

  async forceRelease(adminId: string, orderId: string, note?: string) {
    const order = await this.db.order.findUnique({
      where: { id: orderId },
      include: { transaction: true },
    });
    if (!order) throw new NotFoundException('Order not found');
    if (['COMPLETED', 'CANCELLED', 'REFUNDED'].includes(order.status)) {
      throw new BadRequestException(
        'Order is already final and cannot be force released',
      );
    }

    await this.removeReleaseJob(orderId);

    const now = new Date();
    return this.db.$transaction(async (tx) => {
      const saved = await tx.order.update({
        where: { id: orderId },
        data: {
          status: 'COMPLETED',
          escrowStatus: 'RELEASED',
          releasedAt: now,
          disputeResolvedAt:
            order.status === 'DISPUTED' ? now : order.disputeResolvedAt,
          disputeResolution:
            order.status === 'DISPUTED'
              ? (note ?? 'Force release by admin')
              : order.disputeResolution,
          disputeResolvedById:
            order.status === 'DISPUTED' ? adminId : order.disputeResolvedById,
        },
      });

      if (order.transaction) {
        await tx.transaction.update({
          where: { id: order.transaction.id },
          data: { status: 'COMPLETED' },
        });
      }

      await tx.dealLog.create({
        data: {
          adminId,
          targetType: 'ORDER',
          targetId: orderId,
          action: 'RELEASE_FUNDS',
          cause: note ?? 'Force release by admin',
        },
      });

      return saved;
    });
  }

  async forceRefund(adminId: string, orderId: string, note?: string) {
    const order = await this.db.order.findUnique({
      where: { id: orderId },
      include: { transaction: true, product: true },
    });
    if (!order) throw new NotFoundException('Order not found');
    if (['COMPLETED', 'CANCELLED', 'REFUNDED'].includes(order.status)) {
      throw new BadRequestException(
        'Order is already final and cannot be force refunded',
      );
    }

    await this.removeReleaseJob(orderId);

    const now = new Date();
    return this.db.$transaction(async (tx) => {
      const saved = await tx.order.update({
        where: { id: orderId },
        data: {
          status: 'REFUNDED',
          escrowStatus: 'REFUNDED',
          disputeResolvedAt:
            order.status === 'DISPUTED' ? now : order.disputeResolvedAt,
          disputeResolution:
            order.status === 'DISPUTED'
              ? (note ?? 'Force refund by admin')
              : order.disputeResolution,
          disputeResolvedById:
            order.status === 'DISPUTED' ? adminId : order.disputeResolvedById,
        },
      });

      if (order.status === 'PLACED') {
        await tx.product.update({
          where: { id: order.productId },
          data: {
            quantity: { increment: order.quantity },
            status: 'ACTIVE',
          },
        });
      }

      if (order.transaction) {
        await tx.transaction.update({
          where: { id: order.transaction.id },
          data: { status: 'REFUNDED' },
        });
      }

      await tx.dealLog.create({
        data: {
          adminId,
          targetType: 'ORDER',
          targetId: orderId,
          action: 'RESOLVE_DISPUTE',
          cause: note ?? 'Force refund by admin',
        },
      });

      return saved;
    });
  }

  async releaseFundsFromJob(orderId: string) {
    const order = await this.db.order.findUnique({
      where: { id: orderId },
      include: { transaction: true },
    });

    if (!order) {
      return { skipped: true, reason: 'Order not found' };
    }

    if (order.status !== 'RELEASE_PENDING') {
      return { skipped: true, reason: `Order status is ${order.status}` };
    }

    const now = new Date();

    await this.db.$transaction(async (tx) => {
      await tx.order.update({
        where: { id: orderId },
        data: {
          status: 'COMPLETED',
          escrowStatus: 'RELEASED',
          releasedAt: now,
        },
      });

      if (order.transaction) {
        await tx.transaction.update({
          where: { id: order.transaction.id },
          data: { status: 'COMPLETED' },
        });
      }

      await tx.dealLog.create({
        data: {
          adminId: order.sellerId,
          targetType: 'ORDER',
          targetId: orderId,
          action: 'AUTO_RELEASE_FUNDS',
          cause: 'Escrow auto-release executed after 3-day hold',
        },
      });
    });

    return { skipped: false, released: true };
  }
}
