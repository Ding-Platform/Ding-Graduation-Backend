import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { StreamingService } from './streaming.service';

@WebSocketGateway({
  cors: { origin: '*' },
  namespace: '/streaming',
})
export class StreamingGateway implements OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  // Track which socket is in which stream
  private socketStreamMap = new Map<string, string>();

  constructor(private readonly streamingService: StreamingService) {}

  async handleDisconnect(client: Socket) {
    const streamId = this.socketStreamMap.get(client.id);
    if (streamId) {
      await this.leaveStreamLogic(client, streamId);
    }
  }

  @SubscribeMessage('stream:join')
  async handleJoinStream(
    @ConnectedSocket() client: Socket,
    @MessageBody() payload: { streamId: string },
  ) {
    const { streamId } = payload;
    client.join(`stream_${streamId}`);
    this.socketStreamMap.set(client.id, streamId);

    const count = await this.streamingService.incrementViewer(streamId);
    this.server.to(`stream_${streamId}`).emit('stream:viewer-count', { count });

    return { status: 'joined', streamId };
  }

  @SubscribeMessage('stream:leave')
  async handleLeaveStream(
    @ConnectedSocket() client: Socket,
    @MessageBody() payload: { streamId: string },
  ) {
    await this.leaveStreamLogic(client, payload.streamId);
    return { status: 'left', streamId: payload.streamId };
  }

  @SubscribeMessage('stream:chat')
  async handleChat(
    @ConnectedSocket() client: Socket,
    @MessageBody() payload: { streamId: string; user: any; message: string },
  ) {
    // Broadcast chat message to everyone in the stream room
    this.server.to(`stream_${payload.streamId}`).emit('stream:chat', {
      user: payload.user,
      message: payload.message,
      timestamp: new Date(),
    });
  }

  @SubscribeMessage('stream:react')
  async handleReaction(
    @ConnectedSocket() client: Socket,
    @MessageBody() payload: { streamId: string; reaction: string },
  ) {
    // E.g., flying hearts over the video
    this.server.to(`stream_${payload.streamId}`).emit('stream:react', {
      reaction: payload.reaction,
    });
  }

  private async leaveStreamLogic(client: Socket, streamId: string) {
    client.leave(`stream_${streamId}`);
    this.socketStreamMap.delete(client.id);
    const count = await this.streamingService.decrementViewer(streamId);
    this.server.to(`stream_${streamId}`).emit('stream:viewer-count', { count });
  }
}
