import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { JwtAuthenticationGuard } from 'src/common/guards/strategy.guards/jwt.guard';
import { currentUser } from 'src/common/decorators/currentUser.decorator';
import type { currentUserType } from 'src/common/types/current-user.type';
import { OrderService } from './order.service';
import {
  CancelOrderDto,
  GetOrdersQueryDto,
  OpenDisputeDto,
} from '../dtos/order.dto';

@Controller('marketplace/orders')
@UseGuards(JwtAuthenticationGuard)
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  listMyOrders(
    @currentUser() user: currentUserType,
    @Query() query: GetOrdersQueryDto,
  ) {
    return this.orderService.listBuyerOrders(user.id, query);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  getOrder(@currentUser() user: currentUserType, @Param('id') id: string) {
    return this.orderService.getBuyerOrderDetail(user.id, id);
  }

  @Post(':id/cancel')
  @HttpCode(HttpStatus.OK)
  cancelOrder(
    @currentUser() user: currentUserType,
    @Param('id') id: string,
    @Body() dto: CancelOrderDto,
  ) {
    return this.orderService.cancelOrder(user.id, id, dto);
  }

  @Post(':id/dispute')
  @HttpCode(HttpStatus.OK)
  openDispute(
    @currentUser() user: currentUserType,
    @Param('id') id: string,
    @Body() dto: OpenDisputeDto,
  ) {
    return this.orderService.openDispute(user.id, id, dto);
  }

  @Post(':id/confirm-delivery')
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(FileInterceptor('deliveryProofImage', { storage: memoryStorage() }))
  confirmDelivery(
    @currentUser() user: currentUserType,
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.orderService.confirmDelivery(user.id, id, file);
  }
}
