import { Injectable, Logger, OnModuleDestroy } from '@nestjs/common';
import { DatabaseService } from '../../configs/database/database.service';
import { RedisService } from '../../configs/redis/redis.service';

type ParticipantState = {
  userId: string;
  peerId: string;
  displayName?: string;
  avatarUrl?: string;
  joinedAt: number;
  audio: boolean;
  video: boolean;
};

@Injectable()
export class CallService implements OnModuleDestroy {
  private logger = new Logger('CallService');
  private readonly ROOM_TTL_SECONDS = 3600;
  private readonly SILENCE_THRESHOLD = 10;
  private readonly activeSpeaker = new Map<string, string>();
  private readonly speakerTimers = new Map<string, NodeJS.Timeout>();

  constructor(
    private readonly prisma: DatabaseService,
    private readonly redisService: RedisService,
  ) {}

  /** Called by NestJS on shutdown — clears all pending debounce timers. */
  onModuleDestroy() {
    for (const timer of this.speakerTimers.values()) {
      clearTimeout(timer);
    }
    this.speakerTimers.clear();
    this.activeSpeaker.clear();
  }

  private participantsKey(roomId: string) {
    return `room:${roomId}:participants`;
  }

  private stateKey(roomId: string) {
    return `room:${roomId}:state`;
  }

  private bandwidthKey(roomId: string, peerId: string) {
    return `call:bw:${roomId}:${peerId}`;
  }

  async getOrCreateRoom(roomId: string, userId: string) {
    return this.prisma.callRoom.upsert({
      where: { id: roomId },
      update: {},
      create: {
        id: roomId,
        createdById: userId,
      },
    });
  }

  async joinRoomParticipant(payload: {
    roomId: string;
    userId: string;
    peerId: string;
    displayName?: string;
    avatarUrl?: string;
  }): Promise<{ participants: ParticipantState[]; roomFull: boolean }> {
    const room = await this.getOrCreateRoom(payload.roomId, payload.userId);
    const participantsHashKey = this.participantsKey(payload.roomId);
    const currentCount = await this.redisService.hLen(participantsHashKey);

    if (currentCount >= room.maxParticipants) {
      return { participants: [], roomFull: true };
    }

    const participantState: ParticipantState = {
      userId: payload.userId,
      peerId: payload.peerId,
      displayName: payload.displayName,
      avatarUrl: payload.avatarUrl,
      joinedAt: Date.now(),
      audio: true,
      video: true,
    };

    await this.redisService.hSet(
      participantsHashKey,
      payload.peerId,
      JSON.stringify(participantState),
    );
    await this.redisService.expire(participantsHashKey, this.ROOM_TTL_SECONDS);
    await this.redisService.expire(this.stateKey(payload.roomId), this.ROOM_TTL_SECONDS);

    this.prisma.callParticipant
      .create({
        data: {
          roomId: payload.roomId,
          userId: payload.userId,
          peerId: payload.peerId,
        },
      })
      .catch((error) => this.logger.error('Failed to record call participant join', error));

    const allParticipants = await this.redisService.hGetAll(participantsHashKey);
    return {
      participants: Object.values(allParticipants)
        .map((participant) => this.safeParseParticipant(participant))
        .filter((participant): participant is ParticipantState => Boolean(participant)),
      roomFull: false,
    };
  }

  async leaveRoomParticipant(roomId: string, peerId: string) {
    await this.redisService.hDel(this.participantsKey(roomId), peerId);
    await this.redisService.hDel(this.stateKey(roomId), `audio:${peerId}`);
    await this.redisService.hDel(this.stateKey(roomId), `video:${peerId}`);

    this.prisma.callParticipant
      .updateMany({
        where: {
          roomId,
          peerId,
          leftAt: null,
        },
        data: {
          leftAt: new Date(),
        },
      })
      .catch((error) => this.logger.error('Failed to record participant leave', error));
  }

  async setMediaState(
    roomId: string,
    peerId: string,
    audio: boolean,
    video: boolean,
  ) {
    await this.redisService.hSet(this.stateKey(roomId), `audio:${peerId}`, String(audio));
    await this.redisService.hSet(this.stateKey(roomId), `video:${peerId}`, String(video));
  }

  async tryStartScreenShare(roomId: string, peerId: string) {
    const roomStateKey = this.stateKey(roomId);
    const active = await this.redisService.hGet(roomStateKey, 'screenShareActive');
    if (active === '1') {
      return false;
    }

    await this.redisService.hSet(roomStateKey, 'screenShareActive', '1');
    await this.redisService.hSet(roomStateKey, 'screenSharerId', peerId);
    await this.redisService.expire(roomStateKey, this.ROOM_TTL_SECONDS);
    return true;
  }

  async stopScreenShare(roomId: string, peerId?: string) {
    const roomStateKey = this.stateKey(roomId);
    const currentSharer = await this.redisService.hGet(roomStateKey, 'screenSharerId');
    if (peerId && currentSharer && currentSharer !== peerId) {
      return false;
    }

    await this.redisService.hDel(roomStateKey, 'screenShareActive');
    await this.redisService.hDel(roomStateKey, 'screenSharerId');
    return true;
  }

  async getScreenShareState(roomId: string) {
    const roomStateKey = this.stateKey(roomId);
    const active = await this.redisService.hGet(roomStateKey, 'screenShareActive');
    const sharerId = await this.redisService.hGet(roomStateKey, 'screenSharerId');
    return {
      active: active === '1',
      sharerId: sharerId ?? null,
    };
  }

  async reportAudioLevel(roomId: string, peerId: string, level: number) {
    if (level < this.SILENCE_THRESHOLD) {
      return null;
    }

    // Track the latest candidate per room; the timer resolves only if
    // no louder peer superseded this one within the debounce window.
    const previousTimer = this.speakerTimers.get(roomId);
    if (previousTimer) {
      clearTimeout(previousTimer);
    }

    return new Promise<string | null>((resolve) => {
      const timer = setTimeout(() => {
        this.speakerTimers.delete(roomId);
        const currentSpeaker = this.activeSpeaker.get(roomId);
        if (currentSpeaker === peerId) {
          // Already the active speaker — no change to broadcast
          resolve(null);
          return;
        }
        this.activeSpeaker.set(roomId, peerId);
        resolve(peerId);
      }, 500);
      this.speakerTimers.set(roomId, timer);
    });
  }

  /** Called by the gateway when a peer leaves so stale entries are pruned. */
  clearActiveSpeaker(roomId: string) {
    this.activeSpeaker.delete(roomId);
    const timer = this.speakerTimers.get(roomId);
    if (timer) {
      clearTimeout(timer);
      this.speakerTimers.delete(roomId);
    }
  }

  async reportBandwidth(
    roomId: string,
    peerId: string,
    stats: {
      bytesSent: number;
      bytesReceived: number;
      packetLoss: number;
      roundTripTime: number;
    },
  ) {
    const key = this.bandwidthKey(roomId, peerId);
    const payload = JSON.stringify({
      timestamp: Date.now(),
      ...stats,
    });
    await this.redisService.zAdd(key, Date.now(), payload);
    await this.redisService.expire(key, this.ROOM_TTL_SECONDS);
  }

  async getQualityHints(roomId: string) {
    const participantCount = await this.redisService.hLen(this.participantsKey(roomId));

    let recommendedVideoLayers: 'low' | 'medium' | 'high' = 'high';
    if (participantCount > 8) {
      recommendedVideoLayers = 'low';
    } else if (participantCount > 4) {
      recommendedVideoLayers = 'medium';
    }

    return {
      participantCount,
      recommendedVideoLayers,
      networkCondition: participantCount > 8 ? ('degraded' as const) : ('good' as const),
    };
  }

  private safeParseParticipant(payload: string): ParticipantState | null {
    try {
      return JSON.parse(payload) as ParticipantState;
    } catch {
      return null;
    }
  }
}
