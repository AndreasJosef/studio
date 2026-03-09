import { safePost, zodParser } from '@/lib/api-engine';
import {
  fail,
  ok,
  Job,
  Result,
  SyncConfirmation,
  SyncConfirmationSchema,
} from '@jobchaser/domain';
import z from 'zod';

const BASE_URL = 'http://localhost:3000/api';

export const jobsService = {
  async checkSaved(ids: number[]): Promise<Result<number[]>> {
    console.log('Checking saved status for: ', ids);
    const result = await safePost<number[], number[]>(
      `${BASE_URL}/jobs/sync`,
      ids,
      { credentials: 'include' },
      zodParser(z.array(z.number()))
    );

    if (!result.ok) return fail('Sync Saved Status failed');

    return ok(result.value);
  },

  async saveJob(item: Job): Promise<Result<SyncConfirmation>> {
    const result = await safePost<Job, SyncConfirmation>(
      `${BASE_URL}/jobs`,
      item,
      { credentials: 'include' },
      zodParser(SyncConfirmationSchema)
    );

    if (!result.ok) {
      return fail(result.error);
    }

    return ok(result.value);
  },
};
