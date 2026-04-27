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
import { CreatePageDto } from './dtos/create-page.dto';
import { PageRole } from '@prisma/client';

@Injectable()
export class PagesService {
  constructor(private readonly prisma: DatabaseService) {}

  async createPage(userId: string, dto: CreatePageDto) {
    try {
      const page = await this.prisma.page.create({
        data: {
          ...dto,
          createdById: userId,
          members: {
            create: {
              userId,
              role: PageRole.ADMIN,
            },
          },
        },
      });
      return page;
    } catch {
      throw GenericHttpException.createLocalized(
        ERROR_MESSAGES.PAGE_CREATION_FAILED,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getPageById(pageId: string) {
    const page = await this.prisma.page.findFirst({
      where: { id: pageId, deletedAt: null },
      include: {
        createdBy: { select: { id: true, name: true, image: true } },
      },
    });

    if (!page) {
      throw GenericHttpException.createLocalized(
        ERROR_MESSAGES.PAGE_NOT_FOUND,
        HttpStatus.NOT_FOUND,
      );
    }

    return page;
  }

  async updatePage(
    pageId: string,
    userId: string,
    dto: Partial<CreatePageDto>,
  ) {
    await this.ensureAdminOrEditor(pageId, userId, true); // Admin only to update details
    try {
      return await this.prisma.page.update({
        where: { id: pageId },
        data: dto,
      });
    } catch {
      throw GenericHttpException.createLocalized(
        ERROR_MESSAGES.PAGE_UPDATE_FAILED,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async toggleFollow(pageId: string, userId: string) {
    const page = await this.prisma.page.findFirst({
      where: { id: pageId, deletedAt: null },
    });

    if (!page) throw new NotFoundException(ERROR_MESSAGES.PAGE_NOT_FOUND);

    const existing = await this.prisma.pageFollow.findUnique({
      where: { pageId_userId: { pageId, userId } },
    });

    if (existing) {
      await this.prisma.$transaction([
        this.prisma.pageFollow.delete({
          where: { pageId_userId: { pageId, userId } },
        }),
        this.prisma.page.update({
          where: { id: pageId },
          data: { followersCount: { decrement: 1 } },
        }),
      ]);
      return { following: false };
    }

    await this.prisma.$transaction([
      this.prisma.pageFollow.create({
        data: { pageId, userId },
      }),
      this.prisma.page.update({
        where: { id: pageId },
        data: { followersCount: { increment: 1 } },
      }),
    ]);
    return { following: true };
  }

  // Helper
  private async ensureAdminOrEditor(
    pageId: string,
    userId: string,
    adminOnly = false,
  ) {
    const page = await this.prisma.page.findFirst({
      where: { id: pageId, deletedAt: null },
    });
    if (!page) throw new NotFoundException(ERROR_MESSAGES.PAGE_NOT_FOUND);

    const member = await this.prisma.pageMember.findUnique({
      where: { pageId_userId: { pageId, userId } },
    });

    if (!member) throw new ForbiddenException(ERROR_MESSAGES.PAGE_UNAUTHORIZED);

    if (adminOnly && member.role !== PageRole.ADMIN) {
      throw new ForbiddenException(ERROR_MESSAGES.PAGE_UNAUTHORIZED);
    }

    return { page, member };
  }
}
