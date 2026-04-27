import { IsEnum, IsNotEmpty } from 'class-validator';
import { RSVPStatus } from '@prisma/client';

export class RsvpEventDto {
  @IsNotEmpty({ message: 'RSVP status is required' })
  @IsEnum(RSVPStatus, { message: 'Invalid RSVP status' })
  status: RSVPStatus;
}
