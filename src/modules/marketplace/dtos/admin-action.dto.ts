import { IsString, IsNotEmpty, IsOptional, MaxLength } from 'class-validator';

export class AdminActionWithCauseDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(1000)
  cause: string;
}

export class AdminActionOptionalReasonDto {
  @IsOptional()
  @IsString()
  @MaxLength(1000)
  reason?: string;
}

export class AdminCancelDealDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(1000)
  cause: string;
}

export class AdminDeclineApplicationDto {
  @IsOptional()
  @IsString()
  @MaxLength(1000)
  reason?: string;
}
