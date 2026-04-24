import { IsString, IsOptional, MaxLength, Matches } from 'class-validator';

export class UpdateSellerProfileDto {
  @IsOptional()
  @IsString()
  @MaxLength(150)
  businessName?: string;

  @IsOptional()
  @IsString()
  @Matches(/^\+?[\d\s\-()]{7,20}$/, {
    message: 'phoneNumber must be a valid phone number',
  })
  phoneNumber?: string;

  @IsOptional()
  @IsString()
  @MaxLength(300)
  address?: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  city?: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  country?: string;
}
