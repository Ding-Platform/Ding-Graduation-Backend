import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { JwtAuthenticationGuard } from 'src/common/guards/strategy.guards/jwt.guard';
import { SellerGuard } from '../guards/seller.guard';
import { currentUser } from 'src/common/decorators/currentUser.decorator';
import type { currentUserType } from 'src/common/types/current-user.type';
import { CreateProductDto, UpdateProductDto, GetProductsQueryDto } from '../dtos/product.dto';

@Controller('marketplace/products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  /**
   * POST /marketplace/products
   * Create a product listing. Requires SELLER role.
   */
  @Post()
  @UseGuards(JwtAuthenticationGuard, SellerGuard)
  @HttpCode(HttpStatus.CREATED)
  createProduct(
    @currentUser() user: currentUserType,
    @Body() dto: CreateProductDto,
  ) {
    return this.productService.createProduct(user.id, dto);
  }

  /**
   * GET /marketplace/products
   * Public — browse all active products.
   */
  @Get()
  @HttpCode(HttpStatus.OK)
  getProducts(@Query() query: GetProductsQueryDto) {
    return this.productService.getProducts(query);
  }

  /**
   * GET /marketplace/products/:id
   * Public — single product detail.
   */
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  getProduct(@Param('id') id: string) {
    return this.productService.getProduct(id);
  }

  /**
   * PATCH /marketplace/products/:id
   * Update own product. Requires SELLER role.
   */
  @Patch(':id')
  @UseGuards(JwtAuthenticationGuard, SellerGuard)
  @HttpCode(HttpStatus.OK)
  updateProduct(
    @currentUser() user: currentUserType,
    @Param('id') id: string,
    @Body() dto: UpdateProductDto,
  ) {
    return this.productService.updateProduct(id, user.id, dto);
  }

  /**
   * DELETE /marketplace/products/:id
   * Delete own product. Requires SELLER role.
   */
  @Delete(':id')
  @UseGuards(JwtAuthenticationGuard, SellerGuard)
  @HttpCode(HttpStatus.OK)
  deleteProduct(
    @currentUser() user: currentUserType,
    @Param('id') id: string,
  ) {
    return this.productService.deleteProduct(id, user.id);
  }

  /**
   * POST /marketplace/products/:id/buy
   * Purchase a product. Any authenticated user can buy.
   */
  @Post(':id/buy')
  @UseGuards(JwtAuthenticationGuard)
  @HttpCode(HttpStatus.CREATED)
  buyProduct(
    @currentUser() user: currentUserType,
    @Param('id') id: string,
  ) {
    return this.productService.buyProduct(user.id, id);
  }
}
