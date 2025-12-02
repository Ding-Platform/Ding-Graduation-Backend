import { Socket } from 'socket.io';
import { Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TokenPayload } from '../types/auth-token-payload.type';
import { IContextAuthService } from '../application/context/context-auth.interface';

type SocketIOMiddleware = (
  client: Socket,
  next: (err?: Error) => void,
) => void | Promise<void>;

export const SocketAuthMiddleware = (
  logger: Logger,
  jwtService: JwtService,
  authService: IContextAuthService,
): SocketIOMiddleware => {
  return async (socket: Socket, next: (err?: Error) => void) => {
    try {
      const { authorization } = socket.handshake.headers;

      if (!authorization) {
        logger.warn('Connection blocked: No authorization header');
        return next(new Error('Unauthorized: No token provided'));
      }

      // Extract token from "Bearer <token>" format
      const token = authorization.startsWith('Bearer ')
        ? authorization.substring(7)
        : authorization;

      // Verify and decode the JWT token
      const payload = jwtService.verify<TokenPayload>(token);

      if (!payload?.userId) {
        logger.warn('Connection blocked: Invalid token payload');
        return next(new Error('Unauthorized: Invalid token'));
      }

      // Validate user and session
      const result = await authService.getUserAndSessionFromPayload(payload);

      if (!result) {
        logger.warn('Connection blocked: Invalid user or session');
        return next(new Error('Unauthorized: Invalid user or session'));
      }

      const { user, session } = result;

      // Attach user data to the socket
      socket.data.user = { ...user, session };

      logger.log(
        `Authentication successful for user ${user.id} (${user.email})`,
      );

      // Allow the connection
      next();
    } catch (error) {
      logger.error(`Connection blocked: ${error.message}`);
      next(new Error('Unauthorized: Invalid or expired token'));
    }
  };
};
