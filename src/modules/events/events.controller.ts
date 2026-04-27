import {
  Controller,
  Get,
  Post,
  Delete,
  Put,
  Body,
  Param,
  Query,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventDto } from './dtos/create-event.dto';
import { RsvpEventDto } from './dtos/rsvp-event.dto';
import { JwtAuthenticationGuard } from '../../common/guards/strategy.guards/jwt.guard';
import { currentUser } from '../../common/decorators/currentUser.decorator';

@UseGuards(JwtAuthenticationGuard)
@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post('/')
  async createEvent(
    @currentUser('id') userId: string,
    @Body() dto: CreateEventDto,
  ) {
    return this.eventsService.createEvent(userId, dto);
  }

  @Get('/')
  async discoverEvents(
    @Query('page', ParseIntPipe) page = 1,
    @Query('limit', ParseIntPipe) limit = 20,
    @Query('type') type?: string,
  ) {
    return this.eventsService.discoverEvents(page, limit, type);
  }

  @Get('/:id')
  async getEventById(@Param('id') eventId: string) {
    return this.eventsService.getEventById(eventId);
  }

  @Put('/:id')
  async updateEvent(
    @Param('id') eventId: string,
    @currentUser('id') userId: string,
    @Body() dto: Partial<CreateEventDto>,
  ) {
    return this.eventsService.updateEvent(eventId, userId, dto);
  }

  @Delete('/:id')
  async deleteEvent(
    @Param('id') eventId: string,
    @currentUser('id') userId: string,
  ) {
    return this.eventsService.deleteEvent(eventId, userId);
  }

  @Post('/:id/rsvp')
  async rsvpEvent(
    @Param('id') eventId: string,
    @currentUser('id') userId: string,
    @Body() dto: RsvpEventDto,
  ) {
    return this.eventsService.rsvpEvent(eventId, userId, dto.status);
  }

  @Delete('/:id/rsvp')
  async cancelRsvp(
    @Param('id') eventId: string,
    @currentUser('id') userId: string,
  ) {
    return this.eventsService.cancelRsvp(eventId, userId);
  }

  @Get('/:id/attendees')
  async getAttendees(
    @Param('id') eventId: string,
    @Query('page', ParseIntPipe) page = 1,
    @Query('limit', ParseIntPipe) limit = 20,
  ) {
    return this.eventsService.getAttendees(eventId, page, limit);
  }

  @Get('/:id/ticket')
  async getTicket(
    @Param('id') eventId: string,
    @currentUser('id') userId: string,
  ) {
    return this.eventsService.getTicket(eventId, userId);
  }

  // --- Group Linking Endpoints (Can also live in GroupsController, placing here for Event context) ---

  @Post('/group/:groupId/link/:eventId')
  async linkEventToGroup(
    @Param('groupId') groupId: string,
    @Param('eventId') eventId: string,
    @currentUser('id') userId: string,
  ) {
    return this.eventsService.linkEventToGroup(groupId, eventId, userId);
  }

  @Get('/group/:groupId')
  async getGroupEvents(
    @Param('groupId') groupId: string,
    @Query('page', ParseIntPipe) page = 1,
    @Query('limit', ParseIntPipe) limit = 20,
  ) {
    return this.eventsService.getGroupEvents(groupId, page, limit);
  }
}
