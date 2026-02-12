import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';

@WebSocketGateway({
  namespace: 'call',
  cors: {
    origin: '*',
  },
})
export class CallGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private logger = new Logger('CallGateway');

  handleConnection(client: Socket) {
    this.logger.log(`Call Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Call Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('join-call')
  handleJoinCall(
    @MessageBody() data: { roomId: string },
    @ConnectedSocket() client: Socket,
  ) {
    client.join(data.roomId);
    this.logger.log(`Client ${client.id} joined call room ${data.roomId}`);
    // Notify others? Or just let them offer?
    // client.to(data.roomId).emit('user-joined', { userId: client.id });
    return { event: 'joined-call', data: data.roomId };
  }

  @SubscribeMessage('offer')
  handleOffer(
    @MessageBody() data: { roomId: string; offer: any; to?: string },
    @ConnectedSocket() client: Socket,
  ) {
    // Broadcast to room (excluding sender)
    client.to(data.roomId).emit('offer', {
      offer: data.offer,
      senderId: client.id, // Or user ID if authenticated
    });
  }

  @SubscribeMessage('answer')
  handleAnswer(
    @MessageBody() data: { roomId: string; answer: any; to?: string },
    @ConnectedSocket() client: Socket,
  ) {
    client.to(data.roomId).emit('answer', {
      answer: data.answer,
      senderId: client.id,
    });
  }

  @SubscribeMessage('ice-candidate')
  handleIceCandidate(
    @MessageBody() data: { roomId: string; candidate: any; to?: string },
    @ConnectedSocket() client: Socket,
  ) {
    client.to(data.roomId).emit('ice-candidate', {
      candidate: data.candidate,
      senderId: client.id,
    });
  }

  @SubscribeMessage('leave-call')
  handleLeaveCall(
    @MessageBody() data: { roomId: string },
    @ConnectedSocket() client: Socket,
  ) {
    client.leave(data.roomId);
    client.to(data.roomId).emit('user-left', { senderId: client.id });
  }
}
