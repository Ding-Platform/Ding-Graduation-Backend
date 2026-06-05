import {
  Injectable,
  BadRequestException,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { DatabaseService } from 'src/configs/database/database.service';
import { CloudinaryService } from 'src/common/services/cloudinary/cloudinary.service';
import { StorageService } from 'src/common/services/storage/storage.service';
import { SellerApplicationDto } from '../dtos/seller-application.dto';
import {
  encrypt,
  luhnCheck,
  validateCommercialReg,
  validateCardExpiry,
  maskCardNumber,
} from 'src/common/utils/encryption.util';

@Injectable()
export class SellerApplicationService {
  constructor(
    private readonly db: DatabaseService,
    private readonly cloudinary: CloudinaryService,
    private readonly storageService: StorageService,
  ) {}

  /**
   * Submit a new seller KYC application.
   * Validates: Luhn (card), commercial reg format, card expiry.
   * Computes: address trust score from session IP history.
   * Encrypts: idCardNumber, commercialRegNumber, bankAccountNumber, bankCardNumber.
   */
  async submitApplication(
    userId: string,
    dto: SellerApplicationDto,
    files: {
      idCardFrontImage?: Express.Multer.File[];
      idCardBackImage?: Express.Multer.File[];
      sellerFaceImage?: Express.Multer.File[];
    },
  ) {
    // Block if already applied or already a seller
    const existing = await this.db.sellerApplication.findUnique({
      where: { userId },
    });
    if (existing) {
      throw new ConflictException(
        `You already have a ${existing.status.toLowerCase()} application.`,
      );
    }

    const user = await this.db.user.findUnique({ where: { id: userId } });
    if (!user) throw new NotFoundException('User not found');
    if (user.role === 'SELLER') {
      throw new ConflictException('You are already a registered seller.');
    }

    // ── Validate sensitive fields ──────────────────────────────────
    if (!luhnCheck(dto.bankCardNumber)) {
      throw new BadRequestException(
        'Bank card number is invalid (Luhn check failed).',
      );
    }
    if (!validateCommercialReg(dto.commercialRegNumber)) {
      throw new BadRequestException(
        'Commercial registration number must be 7–10 digits (رقم السجل التجاري).',
      );
    }
    if (!validateCardExpiry(dto.bankCardExpiry)) {
      throw new BadRequestException(
        'Bank card is expired or expiry format is invalid (MM/YY).',
      );
    }

    // ── Required file validation ───────────────────────────────────
    if (!files.idCardFrontImage?.[0]) {
      throw new BadRequestException('ID card front image is required.');
    }
    if (!files.idCardBackImage?.[0]) {
      throw new BadRequestException('ID card back image is required.');
    }
    if (!files.sellerFaceImage?.[0]) {
      throw new BadRequestException('Seller face image is required.');
    }

    // ── Upload images to Cloudinary ────────────────────────────────
    const [frontUrl, backUrl, faceUrl] = await Promise.all([
      this.storageService.uploadSellerDocument(
        files.idCardFrontImage[0],
        userId,
        'id_front',
      ),
      this.storageService.uploadSellerDocument(
        files.idCardBackImage[0],
        userId,
        'id_back',
      ),
      this.storageService.uploadSellerDocument(
        files.sellerFaceImage[0],
        userId,
        'face',
      ),
    ]);

    // ── Address trust scoring from session history ─────────────────
    const sessions = await this.db.session.findMany({
      where: { userId, status: 'ACTIVE' },
      select: { ipAddress: true },
    });
    const allSessions = await this.db.session.findMany({
      where: { userId },
      select: { ipAddress: true },
    });
    const sessionCount = allSessions.length;
    const uniqueIps = new Set(
      allSessions.map((s) => s.ipAddress).filter(Boolean),
    ).size;

    // Simple heuristic: if user has sessions, give a base trust score.
    // Real geolocation would compare IPs to declared city/country.
    // Score = min(sessionCount / 10, 1.0) — more sessions = more trusted account.
    const addressTrustScore = Math.min((sessionCount / 10) * 100, 100);
    const addressVerified = addressTrustScore >= 60;

    // ── Encrypt sensitive fields ───────────────────────────────────
    const encryptedIdCard = encrypt(dto.idCardNumber);
    const encryptedCommercialReg = encrypt(dto.commercialRegNumber);
    const encryptedBankAccount = encrypt(dto.bankAccountNumber);
    const encryptedBankCard = encrypt(dto.bankCardNumber);

    // ── Create application record ──────────────────────────────────
    const application = await this.db.sellerApplication.create({
      data: {
        userId,
        fullName: dto.fullName,
        phoneNumber: dto.phoneNumber,
        email: dto.email,
        address: dto.address,
        city: dto.city,
        country: dto.country,
        idCardNumber: encryptedIdCard,
        idCardFrontImage: frontUrl,
        idCardBackImage: backUrl,
        sellerFaceImage: faceUrl,
        commercialRegNumber: encryptedCommercialReg,
        bankAccountNumber: encryptedBankAccount,
        bankCardNumber: encryptedBankCard,
        bankCardExpiry: dto.bankCardExpiry,
        bankCardHolderName: dto.bankCardHolderName,
        addressTrustScore,
        addressVerified,
        sessionCount,
        uniqueIpCount: uniqueIps,
      },
    });

    return {
      id: application.id,
      status: application.status,
      addressTrustScore: application.addressTrustScore,
      addressVerified: application.addressVerified,
      createdAt: application.createdAt,
      message:
        'Application submitted successfully. Our team will review it shortly.',
    };
  }

  /**
   * Get the current authenticated user's application status.
   */
  async getMyApplicationStatus(userId: string) {
    const application = await this.db.sellerApplication.findUnique({
      where: { userId },
      select: {
        id: true,
        status: true,
        fullName: true,
        email: true,
        phoneNumber: true,
        city: true,
        country: true,
        addressVerified: true,
        addressTrustScore: true,
        adminNote: true,
        reviewedAt: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!application) {
      throw new NotFoundException(
        'No seller application found. Use POST /marketplace/seller/apply to submit one.',
      );
    }

    return application;
  }
}
