import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../../configs/database/database.service';
import { ReportReason, ReportStatus } from '@prisma/client';

@Injectable()
export class ModerationService {
  constructor(private readonly prisma: DatabaseService) {}

  async createReport(
    reporterId: string,
    targetId: string,
    targetType: 'USER' | 'POST' | 'COMMENT',
    reason: ReportReason,
    description?: string,
  ) {
    return this.prisma.report.create({
      data: {
        reporterId,
        targetId,
        targetType,
        reason,
        description,
      },
    });
  }

  async getReports(status?: ReportStatus) {
    return this.prisma.report.findMany({
      where: status ? { status } : undefined,
      orderBy: { createdAt: 'desc' },
      include: {
        reporter: {
          select: { id: true, name: true, email: true },
        },
      },
    });
  }

  async dismissReport(reportId: string, actionTaken?: string) {
    return this.prisma.report.update({
      where: { id: reportId },
      data: {
        status: ReportStatus.DISMISSED,
        actionTaken: actionTaken || 'Dismissed by admin',
      },
    });
  }

  async banUser(adminId: string, userId: string, reason: string) {
    // 1. Mark user as banned
    const user = await this.prisma.user.update({
      where: { id: userId },
      data: {
        isBanned: true,
        banReason: reason,
        active: false, // Also deactivate
      },
    });

    // 2. Resolve related reports?
    // Optional: Find pending reports against this user and mark resolved.

    return user;
  }

  async unbanUser(userId: string) {
    return this.prisma.user.update({
      where: { id: userId },
      data: {
        isBanned: false,
        banReason: null,
        active: true,
      },
    });
  }
}
