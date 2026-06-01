import {
  IsString,
  IsOptional,
  IsUUID,
  IsNotEmpty,
  IsNumber,
  Min,
  Max,
} from 'class-validator';
import { Type } from 'class-transformer';

export class RecordViewDto {
  @IsNotEmpty({ message: 'sessionId is required' })
  @IsString()
  sessionId: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  @Max(100)
  watchPct?: number;

  @IsOptional()
  @IsUUID('4', { message: 'viewerId must be a valid UUID' })
  viewerId?: string;
}
