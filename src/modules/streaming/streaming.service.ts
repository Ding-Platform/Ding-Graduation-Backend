import {
  Injectable,
  HttpStatus,
  ForbiddenException,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { DatabaseService } from '../../configs/database/database.service';
import { GenericHttpException } from '../../common/application/exceptions/generic-http-exception';
import { ERROR_MESSAGES } from '../../common/constants/error-messages.constant';
import { CreateStreamDto } from './dtos/create-stream.dto';
import { StreamStatus } from '@prisma/client';

@Injectable()
export class StreamingService {
  constructor(private readonly prisma: DatabaseService) {}

  async createStream(userId: string, dto: CreateStreamDto) {
    const existingActive = await this.prisma.liveStream.findFirst({
      where: {
        hostId: userId,
        status: { in: [StreamStatus.IDLE, StreamStatus.LIVE] },
      },
    });

    if (existingActive) {
      throw new BadRequestException(ERROR_MESSAGES.STREAM_ALREADY_LIVE);
    }

    try {
      const stream = await this.prisma.liveStream.create({
        data: {
          ...dto,
          hostId: userId,
          status: StreamStatus.IDLE, // Will turn LIVE when RTMP pushes (simulated)
        },
      });

      // Provide the ingest URL + stream key
      const rtmpBase =
        process.env.RTMP_INGEST_URL || 'rtmp://localhost:1935/live';
      return {
        ...stream,
        ingestUrl: `${rtmpBase}/${stream.streamKey}`,
      };
    } catch {
      throw GenericHttpException.createLocalized(
        ERROR_MESSAGES.STREAM_CREATION_FAILED,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getActiveStreams(page = 1, limit = 20) {
    const skip = (page - 1) * limit;

    const [streams, total] = await Promise.all([
      this.prisma.liveStream.findMany({
        where: { status: StreamStatus.LIVE },
        include: { host: { select: { id: true, name: true, image: true } } },
        orderBy: { viewerCount: 'desc' },
        skip,
        take: limit,
      }),
      this.prisma.liveStream.count({ where: { status: StreamStatus.LIVE } }),
    ]);

    return {
      data: streams,
      meta: { page, limit, total, totalPages: Math.ceil(total / limit) },
    };
  }

  async getStreamById(streamId: string) {
    const stream = await this.prisma.liveStream.findUnique({
      where: { id: streamId },
      include: { host: { select: { id: true, name: true, image: true } } },
    });

    if (!stream) {
      throw GenericHttpException.createLocalized(
        ERROR_MESSAGES.STREAM_NOT_FOUND,
        HttpStatus.NOT_FOUND,
      );
    }

    return stream;
  }

  async endStream(streamId: string, userId: string) {
    const stream = await this.prisma.liveStream.findUnique({
      where: { id: streamId },
    });
    if (!stream) throw new NotFoundException(ERROR_MESSAGES.STREAM_NOT_FOUND);

    if (stream.hostId !== userId) {
      throw new ForbiddenException(ERROR_MESSAGES.STREAM_UNAUTHORIZED);
    }

    if (stream.status === StreamStatus.ENDED) return { ended: true };

    try {
      await this.prisma.liveStream.update({
        where: { id: streamId },
        data: {
          status: StreamStatus.ENDED,
          endedAt: new Date(),
          recordingUrl: stream.isRecorded
            ? `https://cdn.ding.local/vod/${streamId}.mp4`
            : null, // Mocked
        },
      });
      return { ended: true };
    } catch {
      throw GenericHttpException.createLocalized(
        ERROR_MESSAGES.STREAM_END_FAILED,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async deleteStream(streamId: string, userId: string) {
    const stream = await this.prisma.liveStream.findUnique({
      where: { id: streamId },
    });
    if (!stream) throw new NotFoundException(ERROR_MESSAGES.STREAM_NOT_FOUND);

    if (stream.hostId !== userId) {
      throw new ForbiddenException(ERROR_MESSAGES.STREAM_UNAUTHORIZED);
    }

    await this.prisma.liveStream.delete({ where: { id: streamId } });
    return { deleted: true };
  }

  async getArchivedStreams(userId: string, page = 1, limit = 20) {
    const skip = (page - 1) * limit;

    const [streams, total] = await Promise.all([
      this.prisma.liveStream.findMany({
        where: { hostId: userId, status: StreamStatus.ENDED, isRecorded: true },
        orderBy: { endedAt: 'desc' },
        skip,
        take: limit,
      }),
      this.prisma.liveStream.count({
        where: { hostId: userId, status: StreamStatus.ENDED, isRecorded: true },
      }),
    ]);

    return {
      data: streams,
      meta: { page, limit, total, totalPages: Math.ceil(total / limit) },
    };
  }

  // --- Methods used by the Gateway (WebSockets) ---

  async incrementViewer(streamId: string) {
    try {
      const stream = await this.prisma.liveStream.update({
        where: { id: streamId },
        data: { viewerCount: { increment: 1 } },
        select: { viewerCount: true, peakViewers: true },
      });
      if (stream.viewerCount > stream.peakViewers) {
        await this.prisma.liveStream.update({
          where: { id: streamId },
          data: { peakViewers: stream.viewerCount },
        });
      }
      return stream.viewerCount;
    } catch {
      return 0;
    }
  }

  async decrementViewer(streamId: string) {
    try {
      const stream = await this.prisma.liveStream.update({
        where: { id: streamId },
        data: { viewerCount: { decrement: 1 } },
        select: { viewerCount: true },
      });
      // Ensure it doesn't go below 0
      if (stream.viewerCount < 0) {
        await this.prisma.liveStream.update({
          where: { id: streamId },
          data: { viewerCount: 0 },
        });
        return 0;
      }
      return stream.viewerCount;
    } catch {
      return 0;
    }
  }
}
