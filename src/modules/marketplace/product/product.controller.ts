import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { User } from '../../../common/decorators/user.decorator';

@Controller('marketplace/products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async createProduct(@User('id') userId: string, @Body() body: any) {
    return this.productService.createProduct(userId, body);
  }

  @Get()
  async getProducts(@Query() query: any) {
    return this.productService.getProducts(query);
  }

  @Get(':id')
  async getProduct(@Param('id') id: string) {
    return this.productService.getProduct(id);
  }

  @Post(':id/buy')
  @UseGuards(JwtAuthGuard)
  async buyProduct(@User('id') userId: string, @Param('id') id: string) {
    return this.productService.buyProduct(userId, id);
  }
}
