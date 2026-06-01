import {
  Controller,
  Get,
  Post,
  Patch,
  Body,
  Param,
  Query,
  UseInterceptors,
  UploadedFile,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { JwtAuthenticationGuard } from 'src/common/guards/strategy.guards/jwt.guard';
import { SellerGuard } from '../guards/seller.guard';
import { currentUser } from 'src/common/decorators/currentUser.decorator';
import type { currentUserType } from 'src/common/types/current-user.type';
import { SellerService } from './seller.service';
import { UpdateSellerProfileDto } from '../dtos/seller-profile-update.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { ConfirmShipmentDto, GetOrdersQueryDto } from '../dtos/order.dto';

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
    @Query() pagination: PaginationDto,
  ) {
    return this.sellerService.getMyProducts(
      user.id,
      pagination.page,
      pagination.limit,
    );
  }

  /** GET /marketplace/seller/deals?page=1&limit=20 */
  @Get('deals')
  @HttpCode(HttpStatus.OK)
  getMyDeals(
    @currentUser() user: currentUserType,
    @Query() pagination: PaginationDto,
  ) {
    return this.sellerService.getMyActiveDeals(
      user.id,
      pagination.page,
      pagination.limit,
    );
  }

  /** GET /marketplace/seller/deals/history */
  @Get('deals/history')
  @HttpCode(HttpStatus.OK)
  getDealHistory(
    @currentUser() user: currentUserType,
    @Query() pagination: PaginationDto,
  ) {
    return this.sellerService.getMyDealHistory(
      user.id,
      pagination.page,
      pagination.limit,
    );
  }

  /** GET /marketplace/seller/orders */
  @Get('orders')
  @HttpCode(HttpStatus.OK)
  getMyOrders(
    @currentUser() user: currentUserType,
    @Query() query: GetOrdersQueryDto,
  ) {
    return this.sellerService.getMyOrders(user.id, query);
  }

  /** GET /marketplace/seller/orders/:id */
  @Get('orders/:id')
  @HttpCode(HttpStatus.OK)
  getOrderDetail(
    @currentUser() user: currentUserType,
    @Param('id') id: string,
  ) {
    return this.sellerService.getOrderDetail(user.id, id);
  }

  /** POST /marketplace/seller/orders/:id/confirm-shipment */
  @Post('orders/:id/confirm-shipment')
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(
    FileInterceptor('shipmentProofImage', { storage: memoryStorage() }),
  )
  confirmShipment(
    @currentUser() user: currentUserType,
    @Param('id') id: string,
    @Body() dto: ConfirmShipmentDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.sellerService.confirmShipment(user.id, id, dto, file);
  }
}
