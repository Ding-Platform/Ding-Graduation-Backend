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
import { NotificationService } from '../notification/notification.service';
import { CreateEventDto } from './dtos/create-event.dto';
import {
  RSVPStatus,
  EventTicketStatus,
  NotificationType,
} from '@prisma/client';

@Injectable()
export class EventsService {
  constructor(
    private readonly prisma: DatabaseService,
    private readonly notificationService: NotificationService,
  ) {}

  async createEvent(userId: string, dto: CreateEventDto) {
    if (dto.endTime && new Date(dto.endTime) <= new Date(dto.startTime)) {
      throw new BadRequestException(ERROR_MESSAGES.EVENT_INVALID_DATES);
    }

    try {
      const event = await this.prisma.event.create({
        data: {
          ...dto,
          hostId: userId,
        },
      });

      // Automatically set host as GOING
      await this.prisma.eventAttendee.create({
        data: {
          eventId: event.id,
          userId,
          rsvpStatus: RSVPStatus.GOING,
        },
      });

      return event;
    } catch {
      throw GenericHttpException.createLocalized(
        ERROR_MESSAGES.EVENT_CREATION_FAILED,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async discoverEvents(page = 1, limit = 20, type?: string) {
    const skip = (page - 1) * limit;

    const where: any = {
      isPublic: true,
      deletedAt: null,
      startTime: { gt: new Date() }, // Only upcoming events
    };

    if (type) {
      where.eventType = type;
    }

    const [events, total] = await Promise.all([
      this.prisma.event.findMany({
        where,
        include: { host: { select: { id: true, name: true, image: true } } },
        orderBy: { startTime: 'asc' },
        skip,
        take: limit,
      }),
      this.prisma.event.count({ where }),
    ]);

    return {
      data: events,
      meta: { page, limit, total, totalPages: Math.ceil(total / limit) },
    };
  }

  async getEventById(eventId: string) {
    const event = await this.prisma.event.findFirst({
      where: { id: eventId, deletedAt: null },
      include: {
        host: { select: { id: true, name: true, image: true } },
      },
    });

    if (!event) {
      throw GenericHttpException.createLocalized(
        ERROR_MESSAGES.EVENT_NOT_FOUND,
        HttpStatus.NOT_FOUND,
      );
    }

    return event;
  }

  async updateEvent(
    eventId: string,
    userId: string,
    dto: Partial<CreateEventDto>,
  ) {
    const event = await this.prisma.event.findFirst({
      where: { id: eventId, deletedAt: null },
    });
    if (!event) throw new NotFoundException(ERROR_MESSAGES.EVENT_NOT_FOUND);

    if (event.hostId !== userId) {
      throw new ForbiddenException(ERROR_MESSAGES.EVENT_UNAUTHORIZED);
    }

    if (dto.endTime || dto.startTime) {
      const start = new Date(dto.startTime || event.startTime);
      const end = dto.endTime ? new Date(dto.endTime) : event.endTime;
      if (end && end <= start) {
        throw new BadRequestException(ERROR_MESSAGES.EVENT_INVALID_DATES);
      }
    }

    try {
      return await this.prisma.event.update({
        where: { id: eventId },
        data: dto,
      });
    } catch {
      throw GenericHttpException.createLocalized(
        ERROR_MESSAGES.EVENT_UPDATE_FAILED,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async deleteEvent(eventId: string, userId: string) {
    const event = await this.prisma.event.findFirst({
      where: { id: eventId, deletedAt: null },
    });
    if (!event) throw new NotFoundException(ERROR_MESSAGES.EVENT_NOT_FOUND);

    if (event.hostId !== userId) {
      throw new ForbiddenException(ERROR_MESSAGES.EVENT_UNAUTHORIZED);
    }

    await this.prisma.event.update({
      where: { id: eventId },
      data: { deletedAt: new Date() },
    });

    return { deleted: true };
  }

  async rsvpEvent(eventId: string, userId: string, status: RSVPStatus) {
    const event = await this.prisma.event.findFirst({
      where: { id: eventId, deletedAt: null },
    });
    if (!event) throw new NotFoundException(ERROR_MESSAGES.EVENT_NOT_FOUND);

    if (new Date() >= event.startTime) {
      throw new BadRequestException(ERROR_MESSAGES.EVENT_STARTED);
    }

    if (status === RSVPStatus.GOING && event.maxAttendees) {
      const goingCount = await this.prisma.eventAttendee.count({
        where: { eventId, rsvpStatus: RSVPStatus.GOING },
      });
      if (goingCount >= event.maxAttendees) {
        throw new BadRequestException(ERROR_MESSAGES.EVENT_FULL);
      }
    }

    // Upsert attendee
    const attendee = await this.prisma.eventAttendee.upsert({
      where: { eventId_userId: { eventId, userId } },
      update: { rsvpStatus: status, rsvpAt: new Date() },
      create: { eventId, userId, rsvpStatus: status },
    });

    // Update attendee count (only counting GOING)
    const newGoingCount = await this.prisma.eventAttendee.count({
      where: { eventId, rsvpStatus: RSVPStatus.GOING },
    });
    await this.prisma.event.update({
      where: { id: eventId },
      data: { attendeeCount: newGoingCount },
    });

    // If paid event and RSVP is GOING, generate ticket pending payment
    if (
      status === RSVPStatus.GOING &&
      event.ticketPrice &&
      event.ticketPrice > 0
    ) {
      const existingTicket = await this.prisma.eventTicket.findUnique({
        where: { eventId_userId: { eventId, userId } },
      });

      if (!existingTicket) {
        await this.prisma.eventTicket.create({
          data: {
            eventId,
            userId,
            status: EventTicketStatus.PENDING_PAYMENT,
            paidAmount: 0,
          },
        });
      }
    }

    // Notify host
    if (event.hostId !== userId) {
      this.notificationService.createNotification(
        event.hostId,
        NotificationType.EVENT_RSVP,
        'New RSVP',
        'RSVPed to your event',
        userId,
        { referenceId: eventId, referenceType: 'Event' },
      );
    }

    return attendee;
  }

  async cancelRsvp(eventId: string, userId: string) {
    const attendee = await this.prisma.eventAttendee.findUnique({
      where: { eventId_userId: { eventId, userId } },
      include: { event: true },
    });

    if (!attendee || attendee.event.deletedAt) {
      throw new NotFoundException(ERROR_MESSAGES.EVENT_NOT_RSVPED);
    }

    if (new Date() >= attendee.event.startTime) {
      throw new BadRequestException(ERROR_MESSAGES.EVENT_STARTED);
    }

    await this.prisma.$transaction([
      this.prisma.eventAttendee.delete({
        where: { id: attendee.id },
      }),
      this.prisma.eventTicket.deleteMany({
        where: { eventId, userId, status: EventTicketStatus.PENDING_PAYMENT },
      }),
    ]);

    // Recalculate attendee count
    const newGoingCount = await this.prisma.eventAttendee.count({
      where: { eventId, rsvpStatus: RSVPStatus.GOING },
    });
    await this.prisma.event.update({
      where: { id: eventId },
      data: { attendeeCount: newGoingCount },
    });

    return { cancelled: true };
  }

  async getAttendees(eventId: string, page = 1, limit = 20) {
    const skip = (page - 1) * limit;

    const [attendees, total] = await Promise.all([
      this.prisma.eventAttendee.findMany({
        where: { eventId, rsvpStatus: RSVPStatus.GOING },
        include: { user: { select: { id: true, name: true, image: true } } },
        orderBy: { rsvpAt: 'asc' },
        skip,
        take: limit,
      }),
      this.prisma.eventAttendee.count({
        where: { eventId, rsvpStatus: RSVPStatus.GOING },
      }),
    ]);

    return {
      data: attendees,
      meta: { page, limit, total, totalPages: Math.ceil(total / limit) },
    };
  }

  async getTicket(eventId: string, userId: string) {
    const ticket = await this.prisma.eventTicket.findUnique({
      where: { eventId_userId: { eventId, userId } },
      include: {
        event: { select: { title: true, startTime: true, ticketPrice: true } },
      },
    });

    if (!ticket) {
      throw new NotFoundException(ERROR_MESSAGES.EVENT_TICKET_NOT_FOUND);
    }

    return ticket;
  }

  async linkEventToGroup(groupId: string, eventId: string, userId: string) {
    // Validate event exists and user is host
    const event = await this.prisma.event.findUnique({
      where: { id: eventId },
    });
    if (!event || event.hostId !== userId) {
      throw new ForbiddenException(ERROR_MESSAGES.EVENT_UNAUTHORIZED);
    }

    // Validate group exists and user is admin
    const groupMember = await this.prisma.groupMember.findUnique({
      where: { groupId_userId: { groupId, userId } },
    });
    if (!groupMember || groupMember.role !== 'ADMIN') {
      throw new ForbiddenException(ERROR_MESSAGES.GROUP_UNAUTHORIZED);
    }

    const existingLink = await this.prisma.groupEvent.findUnique({
      where: { groupId_eventId: { groupId, eventId } },
    });

    if (existingLink) {
      throw new BadRequestException(ERROR_MESSAGES.GROUP_EVENT_ALREADY_LINKED);
    }

    return this.prisma.groupEvent.create({
      data: { groupId, eventId, linkedById: userId },
    });
  }

  async getGroupEvents(groupId: string, page = 1, limit = 20) {
    const skip = (page - 1) * limit;

    const [links, total] = await Promise.all([
      this.prisma.groupEvent.findMany({
        where: { groupId },
        include: { event: true },
        orderBy: { linkedAt: 'desc' },
        skip,
        take: limit,
      }),
      this.prisma.groupEvent.count({ where: { groupId } }),
    ]);

    return {
      data: links.map((l) => l.event),
      meta: { page, limit, total, totalPages: Math.ceil(total / limit) },
    };
  }
}
