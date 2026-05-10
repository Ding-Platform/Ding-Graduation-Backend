import {
  Injectable,
  HttpStatus,
  ForbiddenException,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { DatabaseService } from '../../configs/database/database.service';
import { GenericHttpException } from '../../common/application/exceptions/generic-http-exception';
import { ERROR_MESSAGES } from '../../common/constants/error-messages.constant';
import { NotificationService } from '../notification/notification.service';
import { CreateGroupDto } from './dtos/create-group.dto';
import { UpdateGroupDto } from './dtos/update-group.dto';
import { CreateGroupRuleDto } from './dtos/create-group-rule.dto';
import {
  GroupType,
  GroupMemberRole,
  JoinRequestStatus,
  NotificationType,
  Prisma,
} from '@prisma/client';

@Injectable()
export class GroupsService {
  constructor(
    private readonly prisma: DatabaseService,
    private readonly notificationService: NotificationService,
  ) {}

  async createGroup(userId: string, dto: CreateGroupDto) {
    try {
      const group = await this.prisma.group.create({
        data: {
          name: dto.name,
          description: dto.description,
          coverPhoto: dto.coverPhoto,
          type: dto.type ?? GroupType.PUBLIC,
          restrictPosting: dto.restrictPosting ?? false,
          createdById: userId,
          membersCount: 1,
          members: {
            create: {
              userId,
              role: GroupMemberRole.ADMIN,
              acceptedRulesAt: new Date(),
            },
          },
        },
      });
      return group;
    } catch {
      throw GenericHttpException.createLocalized(
        ERROR_MESSAGES.GROUP_CREATION_FAILED,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getGroupById(groupId: string, requesterId: string) {
    const group = await this.prisma.group.findFirst({
      where: { id: groupId, deletedAt: null },
      include: {
        createdBy: { select: { id: true, name: true, image: true } },
        rules: { orderBy: { order: 'asc' } },
      },
    });

    if (!group) {
      throw GenericHttpException.createLocalized(
        ERROR_MESSAGES.GROUP_NOT_FOUND,
        HttpStatus.NOT_FOUND,
      );
    }

    const membership = await this.prisma.groupMember.findUnique({
      where: { groupId_userId: { groupId, userId: requesterId } },
    });

    if (group.type === GroupType.SECRET && !membership) {
      throw GenericHttpException.createLocalized(
        ERROR_MESSAGES.GROUP_NOT_FOUND, // Mask as not found
        HttpStatus.NOT_FOUND,
      );
    }

    return { ...group, membership: membership || null };
  }

  async discoverGroups(userId: string, page = 1, limit = 20, search?: string) {
    const skip = (page - 1) * limit;

    const where: Prisma.GroupWhereInput = {
      deletedAt: null,
      type: { in: [GroupType.PUBLIC, GroupType.PRIVATE] },
      members: { none: { userId } }, // don't show groups I'm already in
    };

    if (search) {
      where.name = { contains: search, mode: 'insensitive' };
    }

    const [groups, total] = await Promise.all([
      this.prisma.group.findMany({
        where,
        orderBy: { membersCount: 'desc' },
        skip,
        take: limit,
      }),
      this.prisma.group.count({ where }),
    ]);

    return {
      data: groups,
      meta: { page, limit, total, totalPages: Math.ceil(total / limit) },
    };
  }

  async updateGroup(groupId: string, userId: string, dto: UpdateGroupDto) {
    await this.ensureAdminOrMod(groupId, userId, true);

    try {
      const group = await this.prisma.group.update({
        where: { id: groupId },
        data: dto,
      });
      return group;
    } catch {
      throw GenericHttpException.createLocalized(
        ERROR_MESSAGES.GROUP_UPDATE_FAILED,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async deleteGroup(groupId: string, userId: string) {
    const group = await this.ensureAdminOrMod(groupId, userId, true);

    if (group.createdById !== userId) {
      throw new ForbiddenException(ERROR_MESSAGES.GROUP_UNAUTHORIZED);
    }

    await this.prisma.group.update({
      where: { id: groupId },
      data: { deletedAt: new Date() },
    });

    return { deleted: true };
  }

  async joinGroup(groupId: string, userId: string) {
    const group = await this.prisma.group.findFirst({
      where: { id: groupId, deletedAt: null },
    });

    if (!group) throw new NotFoundException(ERROR_MESSAGES.GROUP_NOT_FOUND);

    const existingMembership = await this.prisma.groupMember.findUnique({
      where: { groupId_userId: { groupId, userId } },
    });

    if (existingMembership) {
      throw new BadRequestException(ERROR_MESSAGES.ALREADY_GROUP_MEMBER);
    }

    if (group.type === GroupType.PUBLIC) {
      await this.prisma.$transaction([
        this.prisma.groupMember.create({
          data: { groupId, userId, acceptedRulesAt: new Date() },
        }),
        this.prisma.group.update({
          where: { id: groupId },
          data: { membersCount: { increment: 1 } },
        }),
      ]);
      return { joined: true, status: 'MEMBER' };
    } else {
      const existingReq = await this.prisma.groupJoinRequest.findUnique({
        where: { groupId_userId: { groupId, userId } },
      });

      if (existingReq) {
        throw new BadRequestException(
          ERROR_MESSAGES.GROUP_JOIN_REQUEST_PENDING,
        );
      }

      const req = await this.prisma.groupJoinRequest.create({
        data: { groupId, userId, status: JoinRequestStatus.PENDING },
      });

      // Notify admins
      const admins = await this.prisma.groupMember.findMany({
        where: {
          groupId,
          role: { in: [GroupMemberRole.ADMIN, GroupMemberRole.MODERATOR] },
        },
        select: { userId: true },
      });
      admins.forEach((admin) => {
        void this.notificationService.createNotification(
          admin.userId,
          NotificationType.GROUP_JOIN_REQUEST,
          'New Join Request',
          'requested to join your group',
          userId,
          { referenceId: req.id, referenceType: 'GroupJoinRequest', groupId },
        );
      });

      return { joined: false, status: 'PENDING' };
    }
  }

  async leaveGroup(groupId: string, userId: string) {
    const membership = await this.prisma.groupMember.findUnique({
      where: { groupId_userId: { groupId, userId } },
      include: { group: true },
    });

    if (!membership || membership.group.deletedAt) {
      throw new NotFoundException(ERROR_MESSAGES.NOT_GROUP_MEMBER);
    }

    if (membership.group.createdById === userId) {
      throw new BadRequestException(ERROR_MESSAGES.GROUP_CANNOT_REMOVE_OWNER);
    }

    await this.prisma.$transaction([
      this.prisma.groupMember.delete({
        where: { id: membership.id },
      }),
      this.prisma.group.update({
        where: { id: groupId },
        data: { membersCount: { decrement: 1 } },
      }),
    ]);

    return { left: true };
  }

  async getMembers(groupId: string, userId: string, page = 1, limit = 20) {
    await this.ensureMember(groupId, userId);
    const skip = (page - 1) * limit;

    const [members, total] = await Promise.all([
      this.prisma.groupMember.findMany({
        where: { groupId },
        include: { user: { select: { id: true, name: true, image: true } } },
        orderBy: [{ role: 'asc' }, { joinedAt: 'asc' }],
        skip,
        take: limit,
      }),
      this.prisma.groupMember.count({ where: { groupId } }),
    ]);

    return {
      data: members,
      meta: { page, limit, total, totalPages: Math.ceil(total / limit) },
    };
  }

  async updateMemberRole(
    groupId: string,
    adminId: string,
    targetUserId: string,
    role: GroupMemberRole,
  ) {
    await this.ensureAdminOrMod(groupId, adminId, true);

    const group = await this.prisma.group.findUnique({
      where: { id: groupId },
    });
    if (group?.createdById === targetUserId) {
      throw new BadRequestException(ERROR_MESSAGES.GROUP_CANNOT_REMOVE_OWNER);
    }

    const membership = await this.prisma.groupMember.update({
      where: { groupId_userId: { groupId, userId: targetUserId } },
      data: { role },
    });
    return membership;
  }

  async removeMember(groupId: string, adminId: string, targetUserId: string) {
    await this.ensureAdminOrMod(groupId, adminId, false);

    const group = await this.prisma.group.findUnique({
      where: { id: groupId },
    });
    if (group?.createdById === targetUserId) {
      throw new BadRequestException(ERROR_MESSAGES.GROUP_CANNOT_REMOVE_OWNER);
    }

    await this.prisma.$transaction([
      this.prisma.groupMember.delete({
        where: { groupId_userId: { groupId, userId: targetUserId } },
      }),
      this.prisma.group.update({
        where: { id: groupId },
        data: { membersCount: { decrement: 1 } },
      }),
    ]);

    return { removed: true };
  }

  async getJoinRequests(
    groupId: string,
    adminId: string,
    page = 1,
    limit = 20,
  ) {
    await this.ensureAdminOrMod(groupId, adminId, false);
    const skip = (page - 1) * limit;

    const [requests, total] = await Promise.all([
      this.prisma.groupJoinRequest.findMany({
        where: { groupId, status: JoinRequestStatus.PENDING },
        include: { user: { select: { id: true, name: true, image: true } } },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      this.prisma.groupJoinRequest.count({
        where: { groupId, status: JoinRequestStatus.PENDING },
      }),
    ]);

    return {
      data: requests,
      meta: { page, limit, total, totalPages: Math.ceil(total / limit) },
    };
  }

  async processJoinRequest(
    groupId: string,
    adminId: string,
    targetUserId: string,
    approve: boolean,
  ) {
    await this.ensureAdminOrMod(groupId, adminId, false);

    const req = await this.prisma.groupJoinRequest.findUnique({
      where: { groupId_userId: { groupId, userId: targetUserId } },
    });

    if (!req || req.status !== JoinRequestStatus.PENDING) {
      throw new NotFoundException(ERROR_MESSAGES.GROUP_JOIN_REQUEST_NOT_FOUND);
    }

    if (approve) {
      await this.prisma.$transaction([
        this.prisma.groupJoinRequest.update({
          where: { id: req.id },
          data: { status: JoinRequestStatus.APPROVED },
        }),
        this.prisma.groupMember.create({
          data: { groupId, userId: targetUserId, acceptedRulesAt: new Date() },
        }),
        this.prisma.group.update({
          where: { id: groupId },
          data: { membersCount: { increment: 1 } },
        }),
      ]);

      void this.notificationService.createNotification(
        targetUserId,
        NotificationType.GROUP_JOIN_APPROVED,
        'Join Request Approved',
        'approved your request to join the group',
        adminId,
        { referenceId: groupId, referenceType: 'Group', groupId },
      );

      return { approved: true };
    } else {
      await this.prisma.groupJoinRequest.update({
        where: { id: req.id },
        data: { status: JoinRequestStatus.DECLINED },
      });
      return { approved: false };
    }
  }

  async createRule(groupId: string, adminId: string, dto: CreateGroupRuleDto) {
    await this.ensureAdminOrMod(groupId, adminId, true);
    return this.prisma.groupRule.create({
      data: { groupId, ...dto },
    });
  }

  async deleteRule(groupId: string, adminId: string, ruleId: string) {
    await this.ensureAdminOrMod(groupId, adminId, true);
    await this.prisma.groupRule.delete({ where: { id: ruleId } }).catch(() => {
      throw new NotFoundException(ERROR_MESSAGES.GROUP_RULE_NOT_FOUND);
    });
    return { deleted: true };
  }

  async addPostToGroup(groupId: string, userId: string, postId: string) {
    const { group, mem } = await this.ensureMember(groupId, userId);

    const post = await this.prisma.post.findFirst({
      where: { id: postId, isDeleted: false },
      select: { id: true, authorId: true },
    });
    if (!post) {
      throw new NotFoundException(ERROR_MESSAGES.POST_NOT_FOUND);
    }

    if (post.authorId !== userId) {
      throw new ForbiddenException(ERROR_MESSAGES.POST_UNAUTHORIZED);
    }

    const requiresApproval =
      group.restrictPosting && mem.role === GroupMemberRole.MEMBER;

    try {
      const groupPost = await this.prisma.groupPost.create({
        data: {
          groupId,
          postId,
          isApproved: !requiresApproval,
        },
        include: {
          post: {
            include: {
              author: { select: { id: true, name: true, image: true } },
            },
          },
        },
      });

      if (!requiresApproval) {
        await this.prisma.group.update({
          where: { id: groupId },
          data: { postsCount: { increment: 1 } },
        });
      }

      return {
        ...groupPost,
        status: requiresApproval ? 'PENDING_APPROVAL' : 'PUBLISHED',
      };
    } catch {
      throw new BadRequestException('Post already shared in this group');
    }
  }

  async getGroupPosts(groupId: string, userId: string, page = 1, limit = 20) {
    const group = await this.prisma.group.findFirst({
      where: { id: groupId, deletedAt: null },
      select: { id: true, type: true },
    });
    if (!group) {
      throw new NotFoundException(ERROR_MESSAGES.GROUP_NOT_FOUND);
    }

    if (group.type !== GroupType.PUBLIC) {
      await this.ensureMember(groupId, userId);
    }

    const skip = (page - 1) * limit;
    const [posts, total] = await Promise.all([
      this.prisma.groupPost.findMany({
        where: { groupId, isApproved: true },
        include: {
          post: {
            include: {
              author: { select: { id: true, name: true, image: true } },
              _count: { select: { Likes: true, Comments: true } },
            },
          },
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      this.prisma.groupPost.count({
        where: { groupId, isApproved: true },
      }),
    ]);

    return {
      data: posts,
      meta: { page, limit, total, totalPages: Math.ceil(total / limit) },
    };
  }

  async reviewGroupPost(
    groupId: string,
    groupPostId: string,
    adminId: string,
    approve: boolean,
  ) {
    if (typeof approve !== 'boolean') {
      throw new BadRequestException('Approve must be a boolean');
    }

    await this.ensureAdminOrMod(groupId, adminId, false);

    const existing = await this.prisma.groupPost.findUnique({
      where: { id: groupPostId },
      select: { id: true, groupId: true, isApproved: true },
    });
    if (!existing || existing.groupId !== groupId) {
      throw new NotFoundException(ERROR_MESSAGES.POST_NOT_FOUND);
    }

    if (approve) {
      if (existing.isApproved) {
        return { approved: true };
      }

      await this.prisma.$transaction([
        this.prisma.groupPost.update({
          where: { id: groupPostId },
          data: { isApproved: true },
        }),
        this.prisma.group.update({
          where: { id: groupId },
          data: { postsCount: { increment: 1 } },
        }),
      ]);
      return { approved: true };
    }

    await this.prisma.$transaction([
      this.prisma.groupPost.delete({
        where: { id: groupPostId },
      }),
      ...(existing.isApproved
        ? [
            this.prisma.group.update({
              where: { id: groupId },
              data: { postsCount: { decrement: 1 } },
            }),
          ]
        : []),
    ]);
    return { approved: false, deleted: true };
  }

  async getGroupInsights(groupId: string, userId: string) {
    await this.ensureAdminOrMod(groupId, userId, false);

    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const [
      totalMembers,
      newMembersLast7Days,
      totalPublishedPosts,
      publishedPostsLast7Days,
      pendingJoinRequests,
      pendingPosts,
      linkedEvents,
    ] = await Promise.all([
      this.prisma.groupMember.count({ where: { groupId } }),
      this.prisma.groupMember.count({
        where: {
          groupId,
          joinedAt: { gte: sevenDaysAgo },
        },
      }),
      this.prisma.groupPost.count({
        where: { groupId, isApproved: true },
      }),
      this.prisma.groupPost.count({
        where: { groupId, isApproved: true, createdAt: { gte: sevenDaysAgo } },
      }),
      this.prisma.groupJoinRequest.count({
        where: { groupId, status: JoinRequestStatus.PENDING },
      }),
      this.prisma.groupPost.count({
        where: { groupId, isApproved: false },
      }),
      this.prisma.groupEvent.count({
        where: { groupId },
      }),
    ]);

    return {
      totals: {
        members: totalMembers,
        posts: totalPublishedPosts,
        linkedEvents,
      },
      last7Days: {
        newMembers: newMembersLast7Days,
        newPosts: publishedPostsLast7Days,
      },
      pending: {
        joinRequests: pendingJoinRequests,
        posts: pendingPosts,
      },
    };
  }

  // --- Helpers ---

  private async ensureMember(groupId: string, userId: string) {
    const group = await this.prisma.group.findFirst({
      where: { id: groupId, deletedAt: null },
    });
    if (!group) throw new NotFoundException(ERROR_MESSAGES.GROUP_NOT_FOUND);

    const mem = await this.prisma.groupMember.findUnique({
      where: { groupId_userId: { groupId, userId } },
    });
    if (!mem) throw new ForbiddenException(ERROR_MESSAGES.NOT_GROUP_MEMBER);
    return { group, mem };
  }

  private async ensureAdminOrMod(
    groupId: string,
    userId: string,
    adminOnly: boolean = false,
  ) {
    const { group, mem } = await this.ensureMember(groupId, userId);
    if (adminOnly && mem.role !== GroupMemberRole.ADMIN) {
      throw new ForbiddenException(ERROR_MESSAGES.GROUP_UNAUTHORIZED);
    }
    if (!adminOnly && mem.role === GroupMemberRole.MEMBER) {
      throw new ForbiddenException(ERROR_MESSAGES.GROUP_UNAUTHORIZED);
    }
    return group;
  }
}
