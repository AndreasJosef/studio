import { safeDelete, safePost, zodParser } from '@/lib/api-engine';
import {
  fail,
  ok,
  Job,
  Result,
  SyncConfirmation,
  SyncConfirmationSchema,
  JobListItem,
  JobDetailView,
} from '@jobchaser/domain';
import z from 'zod';
import { fetchAd } from '../jobtech/jobtech.api';
import { serializeTreeToHTML } from '@jobchaser/shared/html-parse';

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

  async saveJob(
    item: JobDetailView | JobListItem
  ): Promise<Result<SyncConfirmation>> {
    let fullJob: Job;

    if (!('description' in item)) {
      const adResult = await fetchAd(String(item.externalId));

      if (!adResult.ok) return fail('Could not load Job for saving!');

      fullJob = {
        ...adResult.value,
        description: serializeTreeToHTML(adResult.value.description),
      };
    } else {
      fullJob = {
        ...item,
        description: serializeTreeToHTML(item.description),
      };
    }

    const result = await safePost<Job, SyncConfirmation>(
      `${BASE_URL}/jobs`,
      fullJob,
      { credentials: 'include' },
      zodParser(SyncConfirmationSchema)
    );

    if (!result.ok) {
      return fail(result.error);
    }

    return ok(result.value);
  },

  async deleteJob(id: number): Promise<Result<SyncConfirmation>> {
    const result = await safeDelete<SyncConfirmation>(
      `${BASE_URL}/jobs/${id}`,
      { credentials: 'include' },
      zodParser(SyncConfirmationSchema)
    );

    if (!result.ok) {
      return fail(result.error);
    }

    return ok(result.value);
  },
};
