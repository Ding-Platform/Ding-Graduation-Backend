import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../../configs/database/database.service';
import { Prisma, ProfilePrivacy } from '@prisma/client';
import { UpdatePrivacyDto } from './dtos/update-privacy.dto';
import { PrivacyResponseDto } from './dtos/response/privacy.response';

@Injectable()
export class PrivacyService {
  constructor(private readonly prisma: DatabaseService) {}

  async getPrivacySettings(userId: string): Promise<PrivacyResponseDto> {
    const privacy = await this.ensurePrivacySettings(userId);
    return privacy as PrivacyResponseDto;
  }

  async updatePrivacySettings(
    userId: string,
    dto: UpdatePrivacyDto,
  ): Promise<PrivacyResponseDto> {
    const profile = await this.ensureProfile(userId);
    const data: Prisma.ProfilePrivacyUpdateInput = {};
    Object.entries(dto).forEach(([key, value]) => {
      if (value !== undefined) {
        (data as Record<string, unknown>)[key] = value;
      }
    });
    const updated = await this.prisma.profilePrivacy.upsert({
      where: { profileId: profile.id },
      create: {
        profileId: profile.id,
        ...Object.fromEntries(
          Object.entries(dto).filter(([_, v]) => v !== undefined),
        ),
      } as Prisma.ProfilePrivacyUncheckedCreateInput,
      update: data,
    });
    return updated as PrivacyResponseDto;
  }

  private async ensureProfile(userId: string) {
    const existing = await this.prisma.profile.findUnique({
      where: { userId },
    });
    if (existing) return existing;

    return this.prisma.profile.create({
      data: {
        userId,
        privacySettings: { create: {} },
      },
    });
  }

  private async ensurePrivacySettings(userId: string): Promise<ProfilePrivacy> {
    const profile = await this.prisma.profile.findUnique({
      where: { userId },
      include: { privacySettings: true },
    });

    if (!profile) {
      const created = await this.prisma.profile.create({
        data: {
          userId,
          privacySettings: { create: {} },
        },
        include: { privacySettings: true },
      });
      return created.privacySettings!;
    }

    if (profile.privacySettings) {
      return profile.privacySettings;
    }

    return this.prisma.profilePrivacy.create({
      data: { profileId: profile.id },
    });
  }
}
