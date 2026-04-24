import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  UnauthorizedException,
} from '@nestjs/common';

/**
 * Checks that the authenticated user has role === ADMIN.
 * Must be used AFTER JwtAuthenticationGuard.
 */
@Injectable()
export class AdminMarketplaceGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user) throw new UnauthorizedException('Authentication required');

    if (user.role !== 'ADMIN') {
      throw new ForbiddenException('Admin access required');
    }

    return true;
  }
}
