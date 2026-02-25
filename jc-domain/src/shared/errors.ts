export const AuthErrorCode = {
  USER_NOT_FOUND: 'AUTH_USER_NOT_FOUND',
  INVALID_CREDENTIALS: 'AUTH_INVALID_CREDENTIALS',
  EMAIL_ALREADY_EXISTS: 'AUTH_EMAIL_ALREADY_EXISTS',
  SESSION_EXPIRED: 'AUTH_SESSION_EXPIRED',
} as const;

export const DomainErrorCode = {
  DATABASE_OFFLINE: 'DOMAIN_DB_OFFLINE',
  RECORD_NOT_FOUND: 'DOMAIN_RECORD_NOT_FOUND',
  CONSTRAINT_VIOLATION: 'DOMAIN_CONSTRAINT_VIOLATION',
} as const;

export type AppErrorCode =
  | (typeof AuthErrorCode)[keyof typeof AuthErrorCode]
  | (typeof DomainErrorCode)[keyof typeof DomainErrorCode];
