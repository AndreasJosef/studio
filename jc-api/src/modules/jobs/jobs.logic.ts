import { jobActions } from '@jobchaser/domain/actions';

import type { StoredJob, Result, CreateJob } from '@jobchaser/domain/types';

export const jobsLogic = {
  async getAll(userid: string): Promise<Result<StoredJob[]>> {
    const result = await jobActions.findAllFromUser(userid);

    return result;
  },

  async addJob(input: CreateJob): Promise<Result<StoredJob>> {
    const result = await jobActions.storeJob(input);

    return result;
  },
};
