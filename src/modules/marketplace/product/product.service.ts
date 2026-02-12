import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { DatabaseService } from '../../../configs/database/database.service';

@Injectable()
export class ProductService {
  constructor(private readonly prisma: DatabaseService) {}

  async createProduct(userId: string, data: any) {
    return this.prisma.product.create({
      data: {
        ...data,
        sellerId: userId,
      },
    });
  }

  async getProducts(query: any) {
    const { categoryId, search, minPrice, maxPrice } = query;
    const where: any = { status: 'ACTIVE' };

    if (categoryId) where.categoryId = categoryId;
    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ];
    }

    return this.prisma.product.findMany({
      where,
      include: { seller: { select: { id: true, name: true, image: true } } },
      orderBy: { createdAt: 'desc' },
      take: 50,
    });
  }

  async getProduct(id: string) {
    const product = await this.prisma.product.findUnique({
      where: { id },
      include: { seller: { select: { id: true, name: true, image: true } } },
    });
    if (!product) throw new NotFoundException('Product not found');
    return product;
  }

  async buyProduct(userId: string, productId: string) {
    const product = await this.prisma.product.findUnique({
      where: { id: productId },
    });
    if (!product) throw new NotFoundException('Product not found');
    if (product.status !== 'ACTIVE')
      throw new BadRequestException('Product not available');
    if (product.sellerId === userId)
      throw new BadRequestException('Cannot buy your own product');

    // Transaction
    return this.prisma.$transaction(async (tx) => {
      // 1. Create TransactionRecord
      const transaction = await tx.transaction.create({
        data: {
          buyerId: userId,
          sellerId: product.sellerId,
          productId: product.id,
          amount: product.price,
          currency: product.currency,
          status: 'COMPLETED', // Mock instant completion
        },
      });

      // 2. Mark Product as SOLD
      await tx.product.update({
        where: { id: productId },
        data: { status: 'SOLD' },
      });

      return transaction;
    });
  }
}
