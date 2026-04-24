import {
  IsString,
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  MinLength,
  MaxLength,
  Matches,
} from 'class-validator';

export class SellerApplicationDto {
  // ── Personal Info ──────────────────────────────────────────────────
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  fullName: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^\+?[\d\s\-()]{7,20}$/, {
    message: 'phoneNumber must be a valid phone number',
  })
  phoneNumber: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(300)
  address: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  city: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  country: string;

  // ── Identity ────────────────────────────────────────────────────────
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(30)
  idCardNumber: string;

  // ── Business ────────────────────────────────────────────────────────
  @IsString()
  @IsNotEmpty()
  @Matches(/^\d{7,10}$/, {
    message: 'commercialRegNumber must be 7–10 digits (رقم السجل التجاري)',
  })
  commercialRegNumber: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^\d{10,34}$/, {
    message: 'bankAccountNumber must be 10–34 digits (IBAN or account number)',
  })
  bankAccountNumber: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^\d{13,19}$/, {
    message: 'bankCardNumber must be 13–19 digits',
  })
  bankCardNumber: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^(0[1-9]|1[0-2])\/\d{2}$/, {
    message: 'bankCardExpiry must be in MM/YY format',
  })
  bankCardExpiry: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  bankCardHolderName: string;
}
