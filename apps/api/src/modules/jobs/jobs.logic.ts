import { jobActions } from '@jobchaser/domain/actions';

import type { JobRecord, Job, Result } from '@jobchaser/domain/types';

export const jobsLogic = {
  async getAll(userid: string): Promise<Result<Job[]>> {
    const result = await jobActions.findAllFromUser(userid);

    return result;
  },

  async addJob(job: Job, userid: string): Promise<Result<JobRecord>> {
    const result = await jobActions.storeJob(job, userid);

    return result;
  },
};
