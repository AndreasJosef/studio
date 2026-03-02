export const PG_CODES = {
  UNIQUE_VIOLATION: '23505',
} as const;

export function getDbErrorCode(e: unknown): string | undefined {
  if (e instanceof Error && e.cause && typeof e.cause === 'object') {
    return (e.cause as any).code;
  }

  if (typeof e === 'object' && e !== null && 'code' in e) {
    return (e as any).code;
  }

  return undefined;
}
