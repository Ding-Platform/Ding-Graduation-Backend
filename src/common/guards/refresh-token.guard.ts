import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ERROR_MESSAGES, TOKEN_CONSTANTS } from '../constants';
import { SessionService } from '../../modules/session/session.service';

@Injectable()
export class SessionIdGuard implements CanActivate {
  constructor(private readonly sessionService: SessionService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const response = context.switchToHttp().getResponse<Response>();
    const sessionId = this.extractSessionIdFromCookie(request);

    if (!sessionId) {
      throw new UnauthorizedException(ERROR_MESSAGES.SESSION_ID_REQUIRED);
    }

    try {
      const session = await this.sessionService.findById(sessionId);
      if (!session || session.status !== 'ACTIVE') {
        await this.handleExpiredSession(session, response);
        throw new UnauthorizedException(ERROR_MESSAGES.INVALID_SESSION);
      }

      request['sessionId'] = sessionId;
      return true;
    } catch (error) {
      // Any unexpected error: clear cookie defensively
      this.clearSessionIdCookie(response);
      throw error;
    }
  }

  private extractSessionIdFromCookie(request: Request): string | undefined {
    return request.cookies?.[TOKEN_CONSTANTS.COOKIE.SESSION_ID_NAME];
  }

  private async handleExpiredSession(
    session: Parameters<SessionService['remove']>[0] | null,
    response: Response,
  ): Promise<void> {
    try {
      if (session) {
        await this.sessionService.remove(session);
      }
      this.clearSessionIdCookie(response);
    } catch (error) {
      // Log the error but don't throw - this is a cleanup operation
      console.error('Error cleaning up expired session:', error);
    }
  }

  private clearSessionIdCookie(response: Response): void {
    response.clearCookie(TOKEN_CONSTANTS.COOKIE.SESSION_ID_NAME, {
      httpOnly: TOKEN_CONSTANTS.COOKIE.HTTP_ONLY,
      secure: TOKEN_CONSTANTS.COOKIE.SECURE,
      sameSite: TOKEN_CONSTANTS.COOKIE.SAME_SITE,
      path: TOKEN_CONSTANTS.COOKIE.PATH,
    });
  }
}
