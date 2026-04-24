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
import { CallService } from './call.service';

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
  constructor(private readonly callService: CallService) {}

  handleConnection(client: Socket) {
    this.logger.log(`Call Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Call Client disconnected: ${client.id}`);
  }

  // ─────────────────────────────────────────────────────────────────────────
  // Group call / participant management
  // ─────────────────────────────────────────────────────────────────────────

  @SubscribeMessage('join_room')
  async handleJoinRoom(
    @MessageBody()
    data: {
      roomId: string;
      userId: string;
      peerId: string;
      displayName?: string;
      avatarUrl?: string;
    },
    @ConnectedSocket() client: Socket,
  ) {
    try {
      const result = await this.callService.joinRoomParticipant(data);

      if (result.roomFull) {
        client.emit('call_error', { code: 'ROOM_FULL' });
        return;
      }

      client.join(data.roomId);
      client.emit('participant_joined', {
        peerId: data.peerId,
        userId: data.userId,
        displayName: data.displayName,
        avatarUrl: data.avatarUrl,
        existingParticipants: result.participants,
      });

      client.to(data.roomId).emit('participant_joined', {
        peerId: data.peerId,
        userId: data.userId,
        displayName: data.displayName,
        avatarUrl: data.avatarUrl,
        existingParticipants: [],
      });
    } catch (err) {
      this.logger.error('join_room failed', err);
      client.emit('call_error', { code: 'INTERNAL_ERROR' });
    }
  }

  @SubscribeMessage('leave_room')
  async handleLeaveRoom(
    @MessageBody() data: { roomId: string; peerId: string },
    @ConnectedSocket() client: Socket,
  ) {
    try {
      await this.callService.leaveRoomParticipant(data.roomId, data.peerId);
      await this.callService.stopScreenShare(data.roomId, data.peerId);
      // Clean up active speaker tracking for this peer when they leave
      this.callService.clearActiveSpeaker(data.roomId);

      client.leave(data.roomId);
      client.to(data.roomId).emit('participant_left', { peerId: data.peerId });
      client.to(data.roomId).emit('peer_screen_share_stopped', { peerId: data.peerId });
    } catch (err) {
      this.logger.error('leave_room failed', err);
    }
  }

  @SubscribeMessage('media_state_changed')
  async handleMediaStateChanged(
    @MessageBody()
    data: {
      roomId: string;
      peerId: string;
      audio: boolean;
      video: boolean;
    },
    @ConnectedSocket() client: Socket,
  ) {
    try {
      await this.callService.setMediaState(data.roomId, data.peerId, data.audio, data.video);
      client.to(data.roomId).emit('peer_media_state', {
        peerId: data.peerId,
        audio: data.audio,
        video: data.video,
      });
    } catch (err) {
      this.logger.error('media_state_changed failed', err);
    }
  }

  // ─────────────────────────────────────────────────────────────────────────
  // Screen sharing
  // ─────────────────────────────────────────────────────────────────────────

  @SubscribeMessage('screen_share_start')
  async handleScreenShareStart(
    @MessageBody() data: { roomId: string; peerId: string; sdp: any },
    @ConnectedSocket() client: Socket,
  ) {
    try {
      const started = await this.callService.tryStartScreenShare(data.roomId, data.peerId);
      if (!started) {
        client.emit('call_error', { code: 'SCREEN_SHARE_IN_PROGRESS' });
        return;
      }

      client.to(data.roomId).emit('peer_screen_share_started', {
        peerId: data.peerId,
        sdp: data.sdp,
      });
    } catch (err) {
      this.logger.error('screen_share_start failed', err);
      client.emit('call_error', { code: 'INTERNAL_ERROR' });
    }
  }

  @SubscribeMessage('screen_share_stop')
  async handleScreenShareStop(
    @MessageBody() data: { roomId: string; peerId: string },
    @ConnectedSocket() client: Socket,
  ) {
    try {
      const stopped = await this.callService.stopScreenShare(data.roomId, data.peerId);
      if (!stopped) {
        return;
      }

      client.to(data.roomId).emit('peer_screen_share_stopped', {
        peerId: data.peerId,
      });
    } catch (err) {
      this.logger.error('screen_share_stop failed', err);
    }
  }

  // ─────────────────────────────────────────────────────────────────────────
  // Active speaker + bandwidth
  // ─────────────────────────────────────────────────────────────────────────

  @SubscribeMessage('audio_level_report')
  async handleAudioLevelReport(
    @MessageBody() data: { roomId: string; peerId: string; level: number },
  ) {
    try {
      const activeSpeaker = await this.callService.reportAudioLevel(
        data.roomId,
        data.peerId,
        data.level,
      );
      if (!activeSpeaker) {
        return;
      }

      this.server.to(data.roomId).emit('active_speaker', { peerId: activeSpeaker });
    } catch (err) {
      this.logger.error('audio_level_report failed', err);
    }
  }

  @SubscribeMessage('bandwidth_report')
  async handleBandwidthReport(
    @MessageBody()
    data: {
      roomId: string;
      peerId: string;
      stats: {
        bytesSent: number;
        bytesReceived: number;
        packetLoss: number;
        roundTripTime: number;
      };
    },
  ) {
    try {
      await this.callService.reportBandwidth(data.roomId, data.peerId, data.stats);
    } catch (err) {
      this.logger.error('bandwidth_report failed', err);
    }
  }

  // ─────────────────────────────────────────────────────────────────────────
  // Legacy 1:1 WebRTC signaling (SDP offer/answer/ICE)
  // ─────────────────────────────────────────────────────────────────────────

  @SubscribeMessage('join-call')
  handleJoinCall(
    @MessageBody() data: { roomId: string },
    @ConnectedSocket() client: Socket,
  ) {
    client.join(data.roomId);
    this.logger.log(`Client ${client.id} joined call room ${data.roomId}`);
    return { event: 'joined-call', data: data.roomId };
  }

  @SubscribeMessage('offer')
  handleOffer(
    @MessageBody() data: { roomId: string; offer: any; to?: string },
    @ConnectedSocket() client: Socket,
  ) {
    if (data.to) {
      this.server.to(data.to).emit('offer', {
        offer: data.offer,
        senderId: client.id,
      });
      return;
    }

    client.to(data.roomId).emit('offer', {
      offer: data.offer,
      senderId: client.id,
    });
  }

  @SubscribeMessage('answer')
  handleAnswer(
    @MessageBody() data: { roomId: string; answer: any; to?: string },
    @ConnectedSocket() client: Socket,
  ) {
    if (data.to) {
      this.server.to(data.to).emit('answer', {
        answer: data.answer,
        senderId: client.id,
      });
      return;
    }

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
    if (data.to) {
      this.server.to(data.to).emit('ice-candidate', {
        candidate: data.candidate,
        senderId: client.id,
      });
      return;
    }

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
