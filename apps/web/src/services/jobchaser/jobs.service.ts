import { safePost, zodParser } from '@/lib/api-engine';
import { fail, ok, Job, Result, JobSchema } from '@jobchaser/domain';

const BASE_URL = 'http://localhost:3000/api';

export const jobsService = {
  async checkSaved(ids: number[]): Promise<Result<string[]>> {
    console.log('Checking saved status for: ', ids);

    return fail('Not implemented yet!');
  },

  async saveJob(item: Job): Promise<Result<Job>> {
    const result = await safePost<Job, Job>(
      `${BASE_URL}/jobs`,
      item,
      { credentials: 'include' },
      zodParser(JobSchema)
    );

    if (!result.ok) {
      return fail(result.error);
    }

    return ok(result.value);
  },
};
