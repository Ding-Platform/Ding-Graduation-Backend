import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { type Request } from 'express';
import { type Prisma, type VisibilityType } from '@prisma/client';
import {
  PROFILE_PERMISSION_KEY,
  ProfilePermission,
} from '../decorators/profile-permissions.decorator';
import { DatabaseService } from '../../configs/database/database.service';
import { SocialService } from '../../modules/social/social.service';
import { type currentUserType } from '../types/current-user.type';

type ProfilePermissionRequest = Request<
  Record<string, string>,
  unknown,
  { userId?: string }
> & {
  user?: currentUserType;
};

type ProfileWithPrivacy = Prisma.ProfileGetPayload<{
  include: { privacySettings: true };
}>;

@Injectable()
export class ProfilePermissionGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private prisma: DatabaseService,
    private socialService: SocialService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredPermissions = this.reflector.getAllAndOverride<
      ProfilePermission[]
    >(PROFILE_PERMISSION_KEY, [context.getHandler(), context.getClass()]);

    if (!requiredPermissions) {
      return true;
    }

    const request = context
      .switchToHttp()
      .getRequest<ProfilePermissionRequest>();
    const user = request.user;
    const targetUserId = request.params.userId ?? request.body?.userId;

    if (!user?.id) {
      throw new ForbiddenException('User not authenticated');
    }

    if (!targetUserId) {
      throw new ForbiddenException('Target user is required');
    }

    // Owner always has full permissions
    if (user.id === targetUserId) {
      return true;
    }

    // Check profile privacy settings
    const profile = await this.prisma.profile.findUnique({
      where: { userId: targetUserId },
      include: { privacySettings: true },
    });

    if (!profile) {
      return false;
    }

    // Check permissions based on privacy settings
    for (const permission of requiredPermissions) {
      if (!(await this.hasPermission(permission, user.id, profile))) {
        throw new ForbiddenException(
          'Insufficient permissions to access this profile',
        );
      }
    }

    return true;
  }

  private async hasPermission(
    permission: ProfilePermission,
    userId: string,
    profile: ProfileWithPrivacy,
  ): Promise<boolean> {
    const privacy = profile.privacySettings;
    if (!privacy) {
      return false;
    }

    switch (permission) {
      case ProfilePermission.VIEW_PROFILE:
        return await this.canViewProfile(
          privacy.profileVisibility,
          userId,
          profile.userId,
        );
      case ProfilePermission.EDIT_PROFILE:
        return userId === profile.userId;
      case ProfilePermission.DELETE_PROFILE:
        return userId === profile.userId;
      case ProfilePermission.VIEW_PRIVATE_INFO:
        return userId === profile.userId;
      default:
        return false;
    }
  }

  private async canViewProfile(
    visibility: VisibilityType,
    requesterId: string,
    ownerId: string,
  ): Promise<boolean> {
    switch (visibility) {
      case 'PUBLIC':
      case 'EVERYONE':
        return true;
      case 'FRIENDS':
        return await this.socialService.areFriends(ownerId, requesterId);
      case 'PRIVATE':
      case 'ONLY_ME':
        return false;
      default:
        return false;
    }
  }
}
