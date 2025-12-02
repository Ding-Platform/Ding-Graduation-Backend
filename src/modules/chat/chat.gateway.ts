import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
} from '@nestjs/websockets';
import { Logger, UseGuards, Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Socket, Server } from 'socket.io';
import { WsJwtGuard } from 'src/common/guards/ws-jwt.guard';
import {
  IContextAuthService,
  IContextAuthServiceToken,
} from 'src/common/application/context/context-auth.interface';
import { SocketAuthMiddleware } from 'src/common/middlewares/chat.middleware';

@WebSocketGateway({
  namespace: '/chat',
  cors: {
    origin: '*',
    credentials: true,
  },
})
@UseGuards(WsJwtGuard)
export class ChatGateway
  implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit
{
  private readonly logger: Logger = new Logger('ChatGateway');

  @WebSocketServer() server: Server;

  constructor(
    private readonly jwtService: JwtService,
    @Inject(IContextAuthServiceToken)
    private readonly authService: IContextAuthService,
  ) {}

  @SubscribeMessage('message')
  handleMessage(client: Socket, payload: any): void {
    // Get authenticated user from socket data (set by middleware)
    const user = client.data.user;

    if (!user) {
      this.logger.warn('Unauthenticated message attempt');
      client.emit('error', { message: 'Unauthorized' });
      return;
    }

    const { message, room, media } = payload;

    // Emit message with authenticated user info
    this.server.to(room).emit('message', {
      userId: user.id,
      username: user.name || user.email,
      message,
      media,
      timestamp: new Date().toISOString(),
    });

    this.logger.log(`Message from user ${user.id} in room ${room}`);
  }

  afterInit(server: Server) {
    this.logger.log('ChatGateway Initialized');

    // Register Socket.IO middleware for JWT authentication
    // This runs BEFORE the connection is established (more efficient)
    server.use(
      SocketAuthMiddleware(this.logger, this.jwtService, this.authService),
    );
  }

  async handleConnection(client: Socket) {
    // User is already authenticated by middleware
    const user = client.data.user;

    this.logger.log(
      `User ${user.id} (${user.email}) connected with socket ${client.id}`,
    );
    client.emit('connected', {
      message: 'Successfully authenticated',
      userId: user.id,
      username: user.name || user.email,
    });
  }

  handleDisconnect(client: Socket) {
    const user = client.data.user;
    if (user) {
      this.logger.log(`User ${user.id} disconnected`);
    } else {
      this.logger.log(`Client ${client.id} disconnected`);
    }
  }
}
