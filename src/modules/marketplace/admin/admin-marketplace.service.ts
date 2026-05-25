import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ConflictException,
} from '@nestjs/common';
import { DatabaseService } from 'src/configs/database/database.service';
import { decrypt, maskCardNumber } from 'src/common/utils/encryption.util';
import {
  AdminDeclineApplicationDto,
  AdminActionWithCauseDto,
  AdminActionOptionalReasonDto,
  AdminCancelDealDto,
} from '../dtos/admin-action.dto';
import { ResolveDisputeDto, GetOrdersQueryDto } from '../dtos/order.dto';
import { OrderService } from '../order/order.service';

@Injectable()
export class AdminMarketplaceService {
  constructor(
    private readonly db: DatabaseService,
    private readonly orderService: OrderService,
  ) {}

  // ════════════════════════════════════════════
  //  SELLER APPLICATIONS
  // ════════════════════════════════════════════

  /** List all pending applications (or filter by status) */
  async listApplications(status?: string, page = 1, limit = 20) {
    const skip = (page - 1) * limit;
    const where = { status: (status as any) || 'PENDING' };
    const [applications, total] = await Promise.all([
      this.db.sellerApplication.findMany({
        where,
        include: {
          user: { select: { id: true, name: true, email: true, image: true } },
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      this.db.sellerApplication.count({ where }),
    ]);
    return { data: applications, total, page, limit };
  }

  /** Full application detail — decrypts sensitive fields for admin view */
  async getApplicationDetail(applicationId: string) {
    const app = await this.db.sellerApplication.findUnique({
      where: { id: applicationId },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
            createdAt: true,
            role: true,
          },
        },
      },
    });
    if (!app) throw new NotFoundException('Application not found');

    return {
      ...app,
      idCardNumber: decrypt(app.idCardNumber),
      commercialRegNumber: decrypt(app.commercialRegNumber),
      bankAccountNumber: decrypt(app.bankAccountNumber),
      bankCardNumber: '•••• ' + maskCardNumber(decrypt(app.bankCardNumber)),
    };
  }

  /** Approve application → promotes user to SELLER, creates SellerProfile */
  async approveApplication(applicationId: string, adminId: string) {
    const app = await this.db.sellerApplication.findUnique({
      where: { id: applicationId },
    });
    if (!app) throw new NotFoundException('Application not found');
    if (app.status !== 'PENDING') {
      throw new BadRequestException(
        `Application is already ${app.status.toLowerCase()}`,
      );
    }

    await this.db.$transaction(async (tx) => {
      // 1. Update application status
      await tx.sellerApplication.update({
        where: { id: applicationId },
        data: {
          status: 'APPROVED',
          reviewedById: adminId,
          reviewedAt: new Date(),
        },
      });

      // 2. Promote user role
      await tx.user.update({
        where: { id: app.userId },
        data: { role: 'SELLER' },
      });

      // 3. Create SellerProfile from application data
      await tx.sellerProfile.create({
        data: {
          userId: app.userId,
          phoneNumber: app.phoneNumber,
          address: app.address,
          city: app.city,
          country: app.country,
          commercialRegNumber: app.commercialRegNumber, // stays encrypted
          bankAccountNumber: app.bankAccountNumber, // stays encrypted
          bankCardLast4: maskCardNumber(decrypt(app.bankCardNumber)),
        },
      });

      // 4. Audit log
      await tx.dealLog.create({
        data: {
          adminId,
          targetType: 'SELLER',
          targetId: app.userId,
          action: 'APPROVE_APPLICATION',
          cause: `Application ${applicationId} approved`,
        },
      });
    });

    return { message: 'Application approved. User is now a seller.' };
  }

  /** Decline application with optional reason */
  async declineApplication(
    applicationId: string,
    adminId: string,
    dto: AdminDeclineApplicationDto,
  ) {
    const app = await this.db.sellerApplication.findUnique({
      where: { id: applicationId },
    });
    if (!app) throw new NotFoundException('Application not found');
    if (app.status !== 'PENDING') {
      throw new BadRequestException(
        `Application is already ${app.status.toLowerCase()}`,
      );
    }

    await this.db.$transaction(async (tx) => {
      await tx.sellerApplication.update({
        where: { id: applicationId },
        data: {
          status: 'DECLINED',
          adminNote: dto.reason,
          reviewedById: adminId,
          reviewedAt: new Date(),
        },
      });

      await tx.dealLog.create({
        data: {
          adminId,
          targetType: 'SELLER',
          targetId: app.userId,
          action: 'DECLINE_APPLICATION',
          cause: dto.reason ?? 'No reason provided',
        },
      });
    });

    return { message: 'Application declined.' };
  }

  // ════════════════════════════════════════════
  //  SELLER MANAGEMENT
  // ════════════════════════════════════════════

  /** List all sellers with their profiles */
  async listSellers(page = 1, limit = 20) {
    const skip = (page - 1) * limit;
    const [sellers, total] = await Promise.all([
      this.db.sellerProfile.findMany({
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              image: true,
              createdAt: true,
            },
          },
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      this.db.sellerProfile.count(),
    ]);

    return {
      data: sellers.map((s) => ({
        ...s,
        commercialRegNumber: '•••••••',
        bankAccountNumber: '•••• ' + s.bankCardLast4,
      })),
      total,
      page,
      limit,
    };
  }

  /** Full seller detail: profile + application + current & historical deals */
  async getSellerDetail(sellerUserId: string) {
    const profile = await this.db.sellerProfile.findUnique({
      where: { userId: sellerUserId },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
            createdAt: true,
          },
        },
      },
    });
    if (!profile) throw new NotFoundException('Seller not found');

    const application = await this.db.sellerApplication.findUnique({
      where: { userId: sellerUserId },
    });

    const [currentTxDeals, historyTxDeals, currentOrders, historyOrders, productCount] =
      await Promise.all([
      this.db.transaction.findMany({
        where: {
          sellerId: sellerUserId,
          status: { in: ['PENDING', 'COMPLETED'] },
        },
        include: {
          product: {
            select: { id: true, title: true, price: true, images: true },
          },
          buyer: { select: { id: true, name: true, email: true } },
        },
        orderBy: { createdAt: 'desc' },
        take: 50,
      }),
      this.db.transaction.findMany({
        where: {
          sellerId: sellerUserId,
          status: { in: ['FAILED', 'REFUNDED', 'CANCELLED'] },
        },
        include: {
          product: { select: { id: true, title: true, price: true } },
          buyer: { select: { id: true, name: true, email: true } },
        },
        orderBy: { createdAt: 'desc' },
        take: 50,
      }),
      this.db.order.findMany({
        where: {
          sellerId: sellerUserId,
          status: { in: ['PLACED', 'SELLER_CONFIRMED', 'SHIPPED', 'RELEASE_PENDING'] },
        },
        include: {
          product: {
            select: { id: true, title: true, price: true, images: true },
          },
          buyer: { select: { id: true, name: true, email: true } },
          transaction: true,
        },
        orderBy: { createdAt: 'desc' },
        take: 50,
      }),
      this.db.order.findMany({
        where: {
          sellerId: sellerUserId,
          status: { in: ['COMPLETED', 'CANCELLED', 'REFUNDED', 'DISPUTED'] },
        },
        include: {
          product: { select: { id: true, title: true, price: true } },
          buyer: { select: { id: true, name: true, email: true } },
          transaction: true,
        },
        orderBy: { createdAt: 'desc' },
        take: 50,
      }),
      this.db.product.count({ where: { sellerId: sellerUserId } }),
    ]);

    // Decrypt for admin view
    const sensitiveProfile = {
      commercialRegNumber: application
        ? decrypt(application.commercialRegNumber)
        : null,
      bankAccountNumber: application
        ? decrypt(application.bankAccountNumber)
        : null,
      idCardNumber: application ? decrypt(application.idCardNumber) : null,
      bankCardNumberMasked: '•••• •••• •••• ' + profile.bankCardLast4,
    };

    return {
      profile: {
        ...profile,
        commercialRegNumber: sensitiveProfile.commercialRegNumber ?? '••••••',
        bankAccountNumber: sensitiveProfile.bankAccountNumber ?? '••••',
      },
      application: application
        ? {
            ...application,
            idCardNumber: sensitiveProfile.idCardNumber,
            commercialRegNumber: sensitiveProfile.commercialRegNumber,
            bankAccountNumber: sensitiveProfile.bankAccountNumber,
            bankCardNumber: sensitiveProfile.bankCardNumberMasked,
          }
        : null,
      stats: {
        productCount,
        totalDeals:
          currentTxDeals.length +
          historyTxDeals.length +
          currentOrders.length +
          historyOrders.length,
      },
      currentDeals: [
        ...currentTxDeals.map((item) => ({ ...item, flowType: 'TRANSACTION' as const })),
        ...currentOrders.map((item) => ({ ...item, flowType: 'ORDER' as const })),
      ].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()),
      dealHistory: [
        ...historyTxDeals.map((item) => ({ ...item, flowType: 'TRANSACTION' as const })),
        ...historyOrders.map((item) => ({ ...item, flowType: 'ORDER' as const })),
      ].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()),
    };
  }

  // ════════════════════════════════════════════
  //  SELLER STATUS ACTIONS
  // ════════════════════════════════════════════

  private async findSellerProfile(userId: string) {
    const profile = await this.db.sellerProfile.findUnique({
      where: { userId },
    });
    if (!profile) throw new NotFoundException('Seller profile not found');
    return profile;
  }

  async banSeller(
    sellerUserId: string,
    adminId: string,
    dto: AdminActionWithCauseDto,
  ) {
    const profile = await this.findSellerProfile(sellerUserId);
    if (profile.isBanned)
      throw new ConflictException('Seller is already banned');

    await this.db.$transaction(async (tx) => {
      await tx.sellerProfile.update({
        where: { userId: sellerUserId },
        data: { isBanned: true, banReason: dto.cause, bannedAt: new Date() },
      });
      await tx.user.update({
        where: { id: sellerUserId },
        data: { isBanned: true, banReason: dto.cause },
      });
      await tx.dealLog.create({
        data: {
          adminId,
          targetType: 'SELLER',
          targetId: sellerUserId,
          action: 'BAN_SELLER',
          cause: dto.cause,
        },
      });
    });

    return { message: 'Seller banned successfully.' };
  }

  async unbanSeller(sellerUserId: string, adminId: string) {
    const profile = await this.findSellerProfile(sellerUserId);
    if (!profile.isBanned) throw new ConflictException('Seller is not banned');

    await this.db.$transaction(async (tx) => {
      await tx.sellerProfile.update({
        where: { userId: sellerUserId },
        data: { isBanned: false, banReason: null, bannedAt: null },
      });
      await tx.user.update({
        where: { id: sellerUserId },
        data: { isBanned: false, banReason: null },
      });
      await tx.dealLog.create({
        data: {
          adminId,
          targetType: 'SELLER',
          targetId: sellerUserId,
          action: 'UNBAN_SELLER',
          cause: 'Ban lifted by admin',
        },
      });
    });

    return { message: 'Seller unbanned successfully.' };
  }

  async suspendSeller(
    sellerUserId: string,
    adminId: string,
    dto: AdminActionWithCauseDto,
  ) {
    const profile = await this.findSellerProfile(sellerUserId);
    if (profile.isSuspended)
      throw new ConflictException('Seller is already suspended');

    await this.db.$transaction(async (tx) => {
      await tx.sellerProfile.update({
        where: { userId: sellerUserId },
        data: {
          isSuspended: true,
          suspendReason: dto.cause,
          suspendedAt: new Date(),
        },
      });
      await tx.dealLog.create({
        data: {
          adminId,
          targetType: 'SELLER',
          targetId: sellerUserId,
          action: 'SUSPEND_SELLER',
          cause: dto.cause,
        },
      });
    });

    return { message: 'Seller suspended.' };
  }

  async unsuspendSeller(sellerUserId: string, adminId: string) {
    const profile = await this.findSellerProfile(sellerUserId);
    if (!profile.isSuspended)
      throw new ConflictException('Seller is not suspended');

    await this.db.$transaction(async (tx) => {
      await tx.sellerProfile.update({
        where: { userId: sellerUserId },
        data: { isSuspended: false, suspendReason: null, suspendedAt: null },
      });
      await tx.dealLog.create({
        data: {
          adminId,
          targetType: 'SELLER',
          targetId: sellerUserId,
          action: 'UNSUSPEND_SELLER',
          cause: 'Suspension lifted by admin',
        },
      });
    });

    return { message: 'Seller suspension lifted.' };
  }

  // ════════════════════════════════════════════
  //  DEAL MANAGEMENT
  // ════════════════════════════════════════════

  async listOrders(query: GetOrdersQueryDto) {
    return this.orderService.listAdminOrders(query);
  }

  async getOrderDetail(orderId: string) {
    return this.orderService.getAdminOrderDetail(orderId);
  }

  async resolveDispute(
    adminId: string,
    orderId: string,
    dto: ResolveDisputeDto,
  ) {
    return this.orderService.resolveDispute(adminId, orderId, dto);
  }

  async forceRelease(
    adminId: string,
    orderId: string,
    dto: AdminActionOptionalReasonDto,
  ) {
    return this.orderService.forceRelease(adminId, orderId, dto.reason);
  }

  async forceRefund(
    adminId: string,
    orderId: string,
    dto: AdminActionOptionalReasonDto,
  ) {
    return this.orderService.forceRefund(adminId, orderId, dto.reason);
  }

  async cancelDeal(
    transactionId: string,
    adminId: string,
    dto: AdminCancelDealDto,
  ) {
    const tx = await this.db.transaction.findUnique({
      where: { id: transactionId },
      include: { product: true, order: true },
    });
    if (!tx) throw new NotFoundException('Transaction not found');

    // Compatibility alias in Sprint 21:
    // if the transaction is linked to the new Order flow, cancel via escrow refund.
    if (tx.orderId && tx.order) {
      const updatedOrder = await this.orderService.forceRefund(
        adminId,
        tx.orderId,
        dto.cause,
      );
      return {
        message: 'Deal cancelled via order escrow flow.',
        order: updatedOrder,
      };
    }

    if (tx.status === 'CANCELLED')
      throw new ConflictException('Deal is already cancelled');
    if (tx.status !== 'PENDING' && tx.status !== 'COMPLETED') {
      throw new BadRequestException(
        'Only PENDING or COMPLETED deals can be cancelled',
      );
    }

    await this.db.$transaction(async (prisma) => {
      // Mark transaction cancelled
      await prisma.transaction.update({
        where: { id: transactionId },
        data: { status: 'CANCELLED' },
      });

      // If product was marked SOLD, restore it to ACTIVE
      if (tx.product) {
        const restoredQuantity = tx.product.quantity + 1;
        await prisma.product.update({
          where: { id: tx.productId },
          data: {
            quantity: restoredQuantity,
            status: tx.product.status === 'SOLD' ? 'ACTIVE' : tx.product.status,
          },
        });
      }

      // Audit log
      await prisma.dealLog.create({
        data: {
          adminId,
          targetType: 'TRANSACTION',
          targetId: transactionId,
          action: 'CANCEL_DEAL',
          cause: dto.cause,
        },
      });
    });

    return { message: 'Deal cancelled and inventory restored.' };
  }

  // ════════════════════════════════════════════
  //  AUDIT LOGS
  // ════════════════════════════════════════════

  async getAuditLogs(page = 1, limit = 50) {
    const skip = (page - 1) * limit;
    const [logs, total] = await Promise.all([
      this.db.dealLog.findMany({
        include: {
          admin: { select: { id: true, name: true, email: true } },
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      this.db.dealLog.count(),
    ]);
    return { data: logs, total, page, limit };
  }
}
