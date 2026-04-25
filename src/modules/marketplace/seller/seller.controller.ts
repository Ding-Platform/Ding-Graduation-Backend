import {
  Controller,
  Get,
  Patch,
  Body,
  Query,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { JwtAuthenticationGuard } from 'src/common/guards/strategy.guards/jwt.guard';
import { SellerGuard } from '../guards/seller.guard';
import { currentUser } from 'src/common/decorators/currentUser.decorator';
import type { currentUserType } from 'src/common/types/current-user.type';
import { SellerService } from './seller.service';
import { UpdateSellerProfileDto } from '../dtos/seller-profile-update.dto';

@Controller('marketplace/seller')
@UseGuards(JwtAuthenticationGuard, SellerGuard)
export class SellerController {
  constructor(private readonly sellerService: SellerService) {}

  /** GET /marketplace/seller/profile */
  @Get('profile')
  @HttpCode(HttpStatus.OK)
  getProfile(@currentUser() user: currentUserType) {
    return this.sellerService.getMyProfile(user.id);
  }

  /** PATCH /marketplace/seller/profile */
  @Patch('profile')
  @HttpCode(HttpStatus.OK)
  updateProfile(
    @currentUser() user: currentUserType,
    @Body() dto: UpdateSellerProfileDto,
  ) {
    return this.sellerService.updateMyProfile(user.id, dto);
  }

  /** GET /marketplace/seller/products?page=1&limit=20 */
  @Get('products')
  @HttpCode(HttpStatus.OK)
  getMyProducts(
    @currentUser() user: currentUserType,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
  ) {
    return this.sellerService.getMyProducts(user.id, page, limit);
  }

  /** GET /marketplace/seller/deals?page=1&limit=20 */
  @Get('deals')
  @HttpCode(HttpStatus.OK)
  getMyDeals(
    @currentUser() user: currentUserType,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
  ) {
    return this.sellerService.getMyActiveDeals(user.id, page, limit);
  }

  /** GET /marketplace/seller/deals/history */
  @Get('deals/history')
  @HttpCode(HttpStatus.OK)
  getDealHistory(
    @currentUser() user: currentUserType,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
  ) {
    return this.sellerService.getMyDealHistory(user.id, page, limit);
  }
}
