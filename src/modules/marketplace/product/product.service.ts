import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';
import { DatabaseService } from 'src/configs/database/database.service';
import {
  CreateProductDto,
  UpdateProductDto,
  GetProductsQueryDto,
} from '../dtos/product.dto';

@Injectable()
export class ProductService {
  constructor(private readonly db: DatabaseService) {}

  /** CREATE — seller only (guard upstream) */
  async createProduct(sellerId: string, dto: CreateProductDto) {
    return this.db.product.create({
      data: {
        title: dto.title,
        description: dto.description,
        price: dto.price,
        currency: dto.currency ?? 'USD',
        quantity: dto.quantity,
        categoryId: dto.categoryId,
        images: dto.images ?? [],
        sellerId,
      },
    });
  }

  /** LIST public products with filters and pagination */
  async getProducts(query: GetProductsQueryDto) {
    const {
      categoryId,
      search,
      minPrice,
      maxPrice,
      page = 1,
      limit = 20,
    } = query;
    const skip = (page - 1) * limit;

    const where: any = {
      status: 'ACTIVE',
      quantity: { gt: 0 },
    };

    if (categoryId) where.categoryId = categoryId;
    if (minPrice !== undefined || maxPrice !== undefined) {
      where.price = {};
      if (minPrice !== undefined) where.price.gte = minPrice;
      if (maxPrice !== undefined) where.price.lte = maxPrice;
    }
    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ];
    }

    const [products, total] = await Promise.all([
      this.db.product.findMany({
        where,
        include: {
          seller: { select: { id: true, name: true, image: true } },
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      this.db.product.count({ where }),
    ]);

    return { data: products, total, page, limit };
  }

  /** SINGLE product */
  async getProduct(id: string) {
    const product = await this.db.product.findUnique({
      where: { id },
      include: {
        seller: { select: { id: true, name: true, image: true } },
      },
    });
    if (!product) throw new NotFoundException('Product not found');
    return product;
  }

  /** UPDATE — only the owner seller */
  async updateProduct(id: string, sellerId: string, dto: UpdateProductDto) {
    const product = await this.db.product.findUnique({ where: { id } });
    if (!product) throw new NotFoundException('Product not found');
    if (product.sellerId !== sellerId) {
      throw new ForbiddenException('You can only update your own products');
    }
    if (product.status === 'SOLD') {
      throw new BadRequestException(
        'Cannot update a product that has been sold',
      );
    }

    return this.db.product.update({
      where: { id },
      data: {
        ...(dto.title !== undefined && { title: dto.title }),
        ...(dto.description !== undefined && { description: dto.description }),
        ...(dto.price !== undefined && { price: dto.price }),
        ...(dto.quantity !== undefined && { quantity: dto.quantity }),
        ...(dto.categoryId !== undefined && { categoryId: dto.categoryId }),
        ...(dto.images !== undefined && { images: dto.images }),
        // Quantity-driven status behavior: 0 => SOLD, >0 => ACTIVE.
        ...(dto.quantity === 0 && { status: 'SOLD' }),
        ...(dto.quantity !== undefined &&
          dto.quantity > 0 &&
          product.status !== 'ACTIVE' && { status: 'ACTIVE' }),
      },
    });
  }

  /** DELETE — only the owner seller */
  async deleteProduct(id: string, sellerId: string) {
    const product = await this.db.product.findUnique({ where: { id } });
    if (!product) throw new NotFoundException('Product not found');
    if (product.sellerId !== sellerId) {
      throw new ForbiddenException('You can only delete your own products');
    }
    if (product.status === 'SOLD') {
      throw new BadRequestException(
        'Cannot delete a product that has an active sale — cancel the deal first',
      );
    }

    await this.db.product.delete({ where: { id } });
    return { message: 'Product deleted successfully' };
  }

  /** BUY — public buyers, seller guard NOT required */
  async buyProduct(buyerId: string, productId: string) {
    return this.db.$transaction(async (tx) => {
      const product = await tx.product.findUnique({ where: { id: productId } });
      if (!product) throw new NotFoundException('Product not found');
      if (product.status !== 'ACTIVE') {
        throw new BadRequestException('Product is not available for purchase');
      }
      if (product.quantity < 1) {
        throw new BadRequestException('Product is out of stock');
      }
      if (product.sellerId === buyerId) {
        throw new BadRequestException('You cannot buy your own product');
      }

      // Check seller is not banned/suspended
      const sellerProfile = await tx.sellerProfile.findUnique({
        where: { userId: product.sellerId },
        select: { isBanned: true, isSuspended: true },
      });
      if (sellerProfile?.isBanned || sellerProfile?.isSuspended) {
        throw new BadRequestException(
          'This product is temporarily unavailable',
        );
      }

      // Guarded stock decrement to prevent overselling under concurrent buys.
      const decremented = await tx.product.updateMany({
        where: {
          id: productId,
          status: 'ACTIVE',
          quantity: { gt: 0 },
        },
        data: {
          quantity: { decrement: 1 },
        },
      });
      if (decremented.count === 0) {
        throw new BadRequestException('Product is out of stock');
      }

      const transaction = await tx.transaction.create({
        data: {
          buyerId,
          sellerId: product.sellerId,
          productId: product.id,
          amount: product.price,
          currency: product.currency,
          status: 'PENDING',
        },
      });

      const updatedProduct = await tx.product.findUnique({
        where: { id: productId },
        select: { quantity: true, status: true },
      });
      if (!updatedProduct) {
        throw new NotFoundException('Product not found');
      }
      if (updatedProduct.quantity === 0 && updatedProduct.status !== 'SOLD') {
        await tx.product.update({
          where: { id: productId },
          data: { status: 'SOLD' },
        });
      }

      return transaction;
    });
  }
}
