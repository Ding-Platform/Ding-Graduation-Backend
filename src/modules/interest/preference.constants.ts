import { AuditAction } from '@prisma/client';

export const AUDIT_ACTION_WEIGHTS: Partial<Record<AuditAction, number>> = {
  POST_VIEW: 1,
  REEL_VIEW: 1,
  POST_LIKE: 3,
  REEL_LIKE: 3,
  COMMENT_CREATE: 5,
  POST_CREATE: 4,
  SEARCH_QUERY: 2,
  POST_SAVE: 4,
  POST_UNLIKE: -2,
  REEL_UNLIKE: -2,
};

export const PREFERENCE_DECAY_LAMBDA = 0.05;
export const PREFERENCE_CACHE_TTL_SEC = 86400;
export const PREFERENCE_CACHE_KEY_PREFIX = 'user:prefs:';
