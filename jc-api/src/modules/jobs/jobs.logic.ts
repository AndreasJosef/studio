import type { StoredJob, Result } from '@jobchaser/domain/types';

export const jobsLogic = {
  async getAll(user: string): Promise<Result<StoredJob>> {
    console.log('[JOBS API TODOj]: get all jobs for user ', user);

    return {
      ok: false,
      error: 'Not implemented yet',
    };
  },
};
