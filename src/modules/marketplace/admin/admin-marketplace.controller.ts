import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Query,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { JwtAuthenticationGuard } from 'src/common/guards/strategy.guards/jwt.guard';
import { AdminMarketplaceGuard } from '../guards/admin-marketplace.guard';
import { currentUser } from 'src/common/decorators/currentUser.decorator';
import type { currentUserType } from 'src/common/types/current-user.type';
import { AdminMarketplaceService } from './admin-marketplace.service';
import {
  AdminDeclineApplicationDto,
  AdminActionWithCauseDto,
  AdminActionOptionalReasonDto,
  AdminCancelDealDto,
} from '../dtos/admin-action.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { GetOrdersQueryDto, ResolveDisputeDto } from '../dtos/order.dto';

@Controller('marketplace/admin')
@UseGuards(JwtAuthenticationGuard, AdminMarketplaceGuard)
export class AdminMarketplaceController {
  constructor(private readonly adminService: AdminMarketplaceService) {}

  // ── Applications ──────────────────────────────────────────────────

  /** GET /marketplace/admin/applications?status=PENDING&page=1&limit=20 */
  @Get('applications')
  @HttpCode(HttpStatus.OK)
  listApplications(
    @Query('status') status?: string,
    @Query() pagination?: PaginationDto,
  ) {
    return this.adminService.listApplications(
      status,
      pagination?.page,
      pagination?.limit,
    );
  }

  /** GET /marketplace/admin/applications/:id */
  @Get('applications/:id')
  @HttpCode(HttpStatus.OK)
  getApplication(@Param('id') id: string) {
    return this.adminService.getApplicationDetail(id);
  }

  /** POST /marketplace/admin/applications/:id/approve */
  @Post('applications/:id/approve')
  @HttpCode(HttpStatus.OK)
  approveApplication(
    @Param('id') id: string,
    @currentUser() admin: currentUserType,
  ) {
    return this.adminService.approveApplication(id, admin.id);
  }

  /** POST /marketplace/admin/applications/:id/decline */
  @Post('applications/:id/decline')
  @HttpCode(HttpStatus.OK)
  declineApplication(
    @Param('id') id: string,
    @currentUser() admin: currentUserType,
    @Body() dto: AdminDeclineApplicationDto,
  ) {
    return this.adminService.declineApplication(id, admin.id, dto);
  }

  // ── Sellers ───────────────────────────────────────────────────────

  /** GET /marketplace/admin/sellers?page=1&limit=20 */
  @Get('sellers')
  @HttpCode(HttpStatus.OK)
  listSellers(@Query() pagination?: PaginationDto) {
    return this.adminService.listSellers(pagination?.page, pagination?.limit);
  }

  /** GET /marketplace/admin/sellers/:userId */
  @Get('sellers/:userId')
  @HttpCode(HttpStatus.OK)
  getSellerDetail(@Param('userId') userId: string) {
    return this.adminService.getSellerDetail(userId);
  }

  /** POST /marketplace/admin/sellers/:userId/ban */
  @Post('sellers/:userId/ban')
  @HttpCode(HttpStatus.OK)
  banSeller(
    @Param('userId') userId: string,
    @currentUser() admin: currentUserType,
    @Body() dto: AdminActionWithCauseDto,
  ) {
    return this.adminService.banSeller(userId, admin.id, dto);
  }

  /** POST /marketplace/admin/sellers/:userId/unban */
  @Post('sellers/:userId/unban')
  @HttpCode(HttpStatus.OK)
  unbanSeller(
    @Param('userId') userId: string,
    @currentUser() admin: currentUserType,
  ) {
    return this.adminService.unbanSeller(userId, admin.id);
  }

  /** POST /marketplace/admin/sellers/:userId/suspend */
  @Post('sellers/:userId/suspend')
  @HttpCode(HttpStatus.OK)
  suspendSeller(
    @Param('userId') userId: string,
    @currentUser() admin: currentUserType,
    @Body() dto: AdminActionWithCauseDto,
  ) {
    return this.adminService.suspendSeller(userId, admin.id, dto);
  }

  /** POST /marketplace/admin/sellers/:userId/unsuspend */
  @Post('sellers/:userId/unsuspend')
  @HttpCode(HttpStatus.OK)
  unsuspendSeller(
    @Param('userId') userId: string,
    @currentUser() admin: currentUserType,
  ) {
    return this.adminService.unsuspendSeller(userId, admin.id);
  }

  // ── Deals ─────────────────────────────────────────────────────────

  /** POST /marketplace/admin/deals/:transactionId/cancel */
  @Post('deals/:transactionId/cancel')
  @HttpCode(HttpStatus.OK)
  cancelDeal(
    @Param('transactionId') transactionId: string,
    @currentUser() admin: currentUserType,
    @Body() dto: AdminCancelDealDto,
  ) {
    return this.adminService.cancelDeal(transactionId, admin.id, dto);
  }

  /** GET /marketplace/admin/orders */
  @Get('orders')
  @HttpCode(HttpStatus.OK)
  listOrders(@Query() query: GetOrdersQueryDto) {
    return this.adminService.listOrders(query);
  }

  /** GET /marketplace/admin/orders/:id */
  @Get('orders/:id')
  @HttpCode(HttpStatus.OK)
  getOrderDetail(@Param('id') id: string) {
    return this.adminService.getOrderDetail(id);
  }

  /** POST /marketplace/admin/orders/:id/resolve-dispute */
  @Post('orders/:id/resolve-dispute')
  @HttpCode(HttpStatus.OK)
  resolveDispute(
    @Param('id') id: string,
    @currentUser() admin: currentUserType,
    @Body() dto: ResolveDisputeDto,
  ) {
    return this.adminService.resolveDispute(admin.id, id, dto);
  }

  /** POST /marketplace/admin/orders/:id/force-release */
  @Post('orders/:id/force-release')
  @HttpCode(HttpStatus.OK)
  forceRelease(
    @Param('id') id: string,
    @currentUser() admin: currentUserType,
    @Body() dto: AdminActionOptionalReasonDto,
  ) {
    return this.adminService.forceRelease(admin.id, id, dto);
  }

  /** POST /marketplace/admin/orders/:id/force-refund */
  @Post('orders/:id/force-refund')
  @HttpCode(HttpStatus.OK)
  forceRefund(
    @Param('id') id: string,
    @currentUser() admin: currentUserType,
    @Body() dto: AdminActionOptionalReasonDto,
  ) {
    return this.adminService.forceRefund(admin.id, id, dto);
  }

  // ── Audit Logs ────────────────────────────────────────────────────

  /** GET /marketplace/admin/logs?page=1&limit=50 */
  @Get('logs')
  @HttpCode(HttpStatus.OK)
  getLogs(@Query() pagination?: PaginationDto) {
    return this.adminService.getAuditLogs(pagination?.page, pagination?.limit);
  }
}
