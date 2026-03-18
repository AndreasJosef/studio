import {
  fetchSafeItem,
  safeDelete,
  safePost,
  zodParser,
} from '@/lib/api-engine';
import {
  fail,
  ok,
  Job,
  Result,
  SyncConfirmation,
  SyncConfirmationSchema,
  JobListItem,
  JobDetailView,
  JobSchema,
  ApplicationStatus,
  UpdateStatusRequest,
} from '@jobchaser/domain';
import z from 'zod';
import { fetchAd } from '../jobtech/jobtech.api';
import { serializeTreeToHTML } from '@jobchaser/shared/html-parse';
import { safePutItem } from '@/lib/safe-fetch';

const BASE_URL = 'http://localhost:3000/api';

export const jobsService = {
  async loadJobs(): Promise<Result<Job[]>> {
    console.log('Loading jobs');
    const result = await fetchSafeItem<Job[]>(
      `${BASE_URL}/jobs`,
      zodParser(z.array(JobSchema)),
      { credentials: 'include' }
    );

    console.log('Got this from the API: ', result);
    if (!result.ok) {
      return fail(result.error);
    }

    return ok(result.value);
  },

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

  async updateStatus(
    id: number,
    newStatus: ApplicationStatus
  ): Promise<Result<SyncConfirmation>> {
    console.log('TODO: update status for: ', id, newStatus);

    const payload: UpdateStatusRequest = { status: newStatus };

    return await safePutItem<UpdateStatusRequest, SyncConfirmation>(
      `${BASE_URL}/jobs/${id}/status`,
      payload,
      zodParser(SyncConfirmationSchema),
      { credentials: 'include' }
    );
  },
};
