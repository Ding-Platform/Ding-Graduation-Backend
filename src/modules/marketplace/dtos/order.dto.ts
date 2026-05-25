import { Type } from 'class-transformer';
import {
  IsIn,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
  MaxLength,
  Min,
} from 'class-validator';

export class ConfirmShipmentDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(120)
  shipmentTrackingNumber: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(120)
  shipmentCarrier: string;
}

export class CancelOrderDto {
  @IsOptional()
  @IsString()
  @MaxLength(1000)
  cancelReason?: string;
}

export class OpenDisputeDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  @MaxLength(1000)
  disputeReason: string;
}

export class ResolveDisputeDto {
  @IsString()
  @IsIn(['REFUND', 'RELEASE'])
  resolution: 'REFUND' | 'RELEASE';

  @IsOptional()
  @IsString()
  @MaxLength(1000)
  adminNote?: string;
}

export class GetOrdersQueryDto {
  @IsOptional()
  @IsString()
  status?: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit?: number = 20;
}
