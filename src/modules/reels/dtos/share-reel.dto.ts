import { IsEnum, IsOptional, IsUUID } from 'class-validator';
import { ShareType } from '@prisma/client';

export class ShareReelDto {
  @IsEnum(ShareType, { message: 'shareType must be STORY, FEED, EXTERNAL, or DM' })
  shareType: ShareType;

  @IsOptional()
  @IsUUID('4', { message: 'targetUserId must be a valid UUID' })
  targetUserId?: string;
}
