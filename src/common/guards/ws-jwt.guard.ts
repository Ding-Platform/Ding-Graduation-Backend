import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
  Inject,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { WsException } from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { TokenPayload } from '../types/auth-token-payload.type';
import {
  IContextAuthService,
  IContextAuthServiceToken,
} from '../application/context/context-auth.interface';

@Injectable()
export class WsJwtGuard implements CanActivate {
  private readonly logger = new Logger(WsJwtGuard.name);

  constructor(
    private readonly jwtService: JwtService,
    @Inject(IContextAuthServiceToken)
    private readonly authService: IContextAuthService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // Only apply to WebSocket connections
    if (context.getType() !== 'ws') {
      return true;
    }

    const client: Socket = context.switchToWs().getClient();
    const { authorization } = client.handshake.headers;
    const { token: authToken } = client.handshake.auth;

    const tokenString = authorization || authToken;

    if (!tokenString) {
      this.logger.warn(
        'WebSocket connection rejected: No authorization header or auth token',
      );
      throw new WsException('Unauthorized: No token provided');
    }

    try {
      // Extract token from "Bearer <token>" format
      const token = tokenString.startsWith('Bearer ')
        ? tokenString.substring(7)
        : tokenString;

      // Verify and decode the JWT token
      const payload = this.jwtService.verify<TokenPayload>(token);

      if (!payload?.userId) {
        throw new WsException('Unauthorized: Invalid token payload');
      }

      // Validate user and session using the same logic as HTTP requests
      const result =
        await this.authService.getUserAndSessionFromPayload(payload);

      if (!result) {
        throw new WsException('Unauthorized: Invalid user or session');
      }

      const { user, session } = result;

      // Attach user data to the socket for use in handlers
      client.data.user = { ...user, session };

      this.logger.log(
        `WebSocket authenticated: User ${user.id} (${user.email})`,
      );
      return true;
    } catch (error) {
      this.logger.error(`WebSocket authentication failed: ${error.message}`);

      if (error instanceof WsException) {
        throw error;
      }

      throw new WsException('Unauthorized: Invalid or expired token');
    }
  }
}
