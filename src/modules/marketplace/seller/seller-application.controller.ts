import {
  Controller,
  Post,
  Get,
  Body,
  UseGuards,
  UseInterceptors,
  UploadedFiles,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { JwtAuthenticationGuard } from 'src/common/guards/strategy.guards/jwt.guard';
import { currentUser } from 'src/common/decorators/currentUser.decorator';
import type { currentUserType } from 'src/common/types/current-user.type';
import { SellerApplicationService } from './seller-application.service';
import { SellerApplicationDto } from '../dtos/seller-application.dto';

@Controller('marketplace/seller')
export class SellerApplicationController {
  constructor(private readonly service: SellerApplicationService) {}

  /**
   * POST /marketplace/seller/apply
   * Submit KYC application to become a seller.
   * multipart/form-data:
   *   - fields: all SellerApplicationDto fields
   *   - files: idCardFrontImage, idCardBackImage, sellerFaceImage
   */
  @Post('apply')
  @UseGuards(JwtAuthenticationGuard)
  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'idCardFrontImage', maxCount: 1 },
        { name: 'idCardBackImage', maxCount: 1 },
        { name: 'sellerFaceImage', maxCount: 1 },
      ],
      { storage: memoryStorage() },
    ),
  )
  async apply(
    @currentUser() user: currentUserType,
    @Body() dto: SellerApplicationDto,
    @UploadedFiles()
    files: {
      idCardFrontImage?: Express.Multer.File[];
      idCardBackImage?: Express.Multer.File[];
      sellerFaceImage?: Express.Multer.File[];
    },
  ) {
    return this.service.submitApplication(user.id, dto, files ?? {});
  }

  /**
   * GET /marketplace/seller/application/status
   * Check the current user's application status.
   */
  @Get('application/status')
  @UseGuards(JwtAuthenticationGuard)
  @HttpCode(HttpStatus.OK)
  async getStatus(@currentUser() user: currentUserType) {
    return this.service.getMyApplicationStatus(user.id);
  }
}
