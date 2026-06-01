import { AuditAction, Prisma } from '@prisma/client';

export interface AuditRecordContext {
  userId: string;
  action: AuditAction;
  sessionId?: string;
  targetType?: string;
  targetId?: string;
  textSnapshot?: string;
  metadata?: Prisma.InputJsonValue;
  ipAddress?: string;
  userAgent?: string;
}

export interface AuditPersistJobData {
  userId: string;
  action: AuditAction;
  sessionId?: string;
  targetType?: string;
  targetId?: string;
  textSnapshot?: string;
  metadata?: Prisma.InputJsonValue;
}
