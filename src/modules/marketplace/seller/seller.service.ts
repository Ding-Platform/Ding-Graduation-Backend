import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { DatabaseService } from 'src/configs/database/database.service';
import { UpdateSellerProfileDto } from '../dtos/seller-profile-update.dto';
import { GetOrdersQueryDto, ConfirmShipmentDto } from '../dtos/order.dto';
import { OrderService } from '../order/order.service';

@Injectable()
export class SellerService {
  constructor(
    private readonly db: DatabaseService,
    private readonly orderService: OrderService,
  ) {}

  /** GET /marketplace/seller/profile — seller's own profile */
  async getMyProfile(userId: string) {
    const profile = await this.db.sellerProfile.findUnique({
      where: { userId },
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
    if (!profile) throw new NotFoundException('Seller profile not found');

    // Never return encrypted numbers in plain
    const { commercialRegNumber, bankAccountNumber, ...safe } = profile;
    return {
      ...safe,
      commercialRegNumberMasked: '•••••••',
      bankAccountNumberMasked: '•••• ' + profile.bankCardLast4,
    };
  }

  /** PATCH /marketplace/seller/profile */
  async updateMyProfile(userId: string, dto: UpdateSellerProfileDto) {
    const profile = await this.db.sellerProfile.findUnique({
      where: { userId },
    });
    if (!profile) throw new NotFoundException('Seller profile not found');

    return this.db.sellerProfile.update({
      where: { userId },
      data: { ...dto, updatedAt: new Date() },
      select: {
        id: true,
        businessName: true,
        phoneNumber: true,
        address: true,
        city: true,
        country: true,
        bankCardLast4: true,
        isSuspended: true,
        isBanned: true,
        updatedAt: true,
      },
    });
  }

  /** GET /marketplace/seller/products — seller's own listings */
  async getMyProducts(userId: string, page = 1, limit = 20) {
    const skip = (page - 1) * limit;
    const [products, total] = await Promise.all([
      this.db.product.findMany({
        where: { sellerId: userId },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      this.db.product.count({ where: { sellerId: userId } }),
    ]);
    return { data: products, total, page, limit };
  }

  /** GET /marketplace/seller/deals — active/pending deals */
  async getMyActiveDeals(userId: string, page = 1, limit = 20) {
    const skip = (page - 1) * limit;
    const [transactions, txTotal, orders, orderTotal] = await Promise.all([
      this.db.transaction.findMany({
        where: {
          sellerId: userId,
          status: { in: ['PENDING'] },
        },
        include: {
          product: {
            select: { id: true, title: true, price: true, images: true },
          },
          buyer: { select: { id: true, name: true, email: true, image: true } },
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      this.db.transaction.count({
        where: { sellerId: userId, status: { in: ['PENDING'] } },
      }),
      this.db.order.findMany({
        where: {
          sellerId: userId,
          status: {
            in: ['PLACED', 'SELLER_CONFIRMED', 'SHIPPED', 'RELEASE_PENDING'],
          },
        },
        include: {
          product: {
            select: { id: true, title: true, price: true, images: true },
          },
          buyer: { select: { id: true, name: true, email: true, image: true } },
          transaction: true,
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      this.db.order.count({
        where: {
          sellerId: userId,
          status: {
            in: ['PLACED', 'SELLER_CONFIRMED', 'SHIPPED', 'RELEASE_PENDING'],
          },
        },
      }),
    ]);
    const data = [
      ...transactions.map((item) => ({
        ...item,
        flowType: 'TRANSACTION' as const,
      })),
      ...orders.map((item) => ({ ...item, flowType: 'ORDER' as const })),
    ].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    return { data, total: txTotal + orderTotal, page, limit };
  }

  /** GET /marketplace/seller/deals/history — old deals */
  async getMyDealHistory(userId: string, page = 1, limit = 20) {
    const skip = (page - 1) * limit;
    const [transactions, txTotal, orders, orderTotal] = await Promise.all([
      this.db.transaction.findMany({
        where: {
          sellerId: userId,
          status: { in: ['FAILED', 'REFUNDED', 'CANCELLED'] },
        },
        include: {
          product: { select: { id: true, title: true, price: true } },
          buyer: { select: { id: true, name: true, email: true } },
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      this.db.transaction.count({
        where: {
          sellerId: userId,
          status: { in: ['FAILED', 'REFUNDED', 'CANCELLED'] },
        },
      }),
      this.db.order.findMany({
        where: {
          sellerId: userId,
          status: { in: ['COMPLETED', 'CANCELLED', 'REFUNDED', 'DISPUTED'] },
        },
        include: {
          product: { select: { id: true, title: true, price: true } },
          buyer: { select: { id: true, name: true, email: true } },
          transaction: true,
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      this.db.order.count({
        where: {
          sellerId: userId,
          status: { in: ['COMPLETED', 'CANCELLED', 'REFUNDED', 'DISPUTED'] },
        },
      }),
    ]);
    const data = [
      ...transactions.map((item) => ({
        ...item,
        flowType: 'TRANSACTION' as const,
      })),
      ...orders.map((item) => ({ ...item, flowType: 'ORDER' as const })),
    ].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    return { data, total: txTotal + orderTotal, page, limit };
  }

  /** GET /marketplace/seller/orders */
  async getMyOrders(userId: string, query: GetOrdersQueryDto) {
    return this.orderService.listSellerOrders(userId, query);
  }

  /** GET /marketplace/seller/orders/:id */
  async getOrderDetail(userId: string, orderId: string) {
    return this.orderService.getSellerOrderDetail(userId, orderId);
  }

  /** POST /marketplace/seller/orders/:id/confirm-shipment */
  async confirmShipment(
    userId: string,
    orderId: string,
    dto: ConfirmShipmentDto,
    file: Express.Multer.File,
  ) {
    return this.orderService.confirmShipment(userId, orderId, dto, file);
  }
}
