import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  UnauthorizedException,
} from '@nestjs/common';
import { DatabaseService } from 'src/configs/database/database.service';

/**
 * Checks that the authenticated user:
 * 1. Has role === SELLER
 * 2. Is not banned or suspended
 *
 * Must be used AFTER JwtAuthenticationGuard.
 */
@Injectable()
export class SellerGuard implements CanActivate {
  constructor(private readonly db: DatabaseService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user) throw new UnauthorizedException('Authentication required');

    if (user.role !== 'SELLER') {
      throw new ForbiddenException(
        'Seller account required. Please apply to become a seller.',
      );
    }

    // Check seller profile for ban/suspension
    const profile = await this.db.sellerProfile.findUnique({
      where: { userId: user.id },
      select: { isBanned: true, isSuspended: true, banReason: true, suspendReason: true },
    });

    if (!profile) {
      throw new ForbiddenException('Seller profile not found.');
    }

    if (profile.isBanned) {
      throw new ForbiddenException(
        `Your seller account has been banned. Reason: ${profile.banReason || 'Violation of platform policies.'}`,
      );
    }

    if (profile.isSuspended) {
      throw new ForbiddenException(
        `Your seller account is suspended. Reason: ${profile.suspendReason || 'Under review.'}`,
      );
    }

    return true;
  }
}
