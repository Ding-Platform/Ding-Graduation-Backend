import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { DatabaseModule } from 'src/configs/database/database.module';
import { CloudinaryModule } from 'src/common/services/cloudinary/cloudinary.module';

// Product
import { ProductController } from './product/product.controller';
import { ProductService } from './product/product.service';

// Seller Application
import { SellerApplicationController } from './seller/seller-application.controller';
import { SellerApplicationService } from './seller/seller-application.service';

// Seller Dashboard
import { SellerController } from './seller/seller.controller';
import { SellerService } from './seller/seller.service';

// Admin Dashboard
import { AdminMarketplaceController } from './admin/admin-marketplace.controller';
import { AdminMarketplaceService } from './admin/admin-marketplace.service';
import { OrderController } from './order/order.controller';
import { OrderService } from './order/order.service';
import { OrderReleaseProcessor } from './order/order-release.processor';

// Guards
import { SellerGuard } from './guards/seller.guard';
import { AdminMarketplaceGuard } from './guards/admin-marketplace.guard';

@Module({
  imports: [
    DatabaseModule,
    CloudinaryModule,
    BullModule.registerQueue({
      name: 'order-release',
    }),
  ],
  controllers: [
    ProductController,
    SellerApplicationController,
    SellerController,
    AdminMarketplaceController,
    OrderController,
  ],
  providers: [
    ProductService,
    SellerApplicationService,
    SellerService,
    AdminMarketplaceService,
    OrderService,
    OrderReleaseProcessor,
    SellerGuard,
    AdminMarketplaceGuard,
  ],
  exports: [SellerGuard, AdminMarketplaceGuard],
})
export class MarketplaceModule {}
