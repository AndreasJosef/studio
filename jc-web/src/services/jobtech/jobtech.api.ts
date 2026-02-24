import { Job, JobResponseMeta } from '@/shared/types';
import { Result } from '@/lib/result';

interface JobApiResult {
  jobs: Job[];
  meta: JobResponseMeta;
}

import { parseAFJobs } from '@/features/job-search/logic/parser';
import { fetchSafeList } from '@/lib/api-engine';
import { delay } from '@/lib/utils';

const BASE_URL = 'https://jobsearch.api.jobtechdev.se/';
const LIMIT = 5;

/**
 * Fetches and refines job data from the JobTech API based on a search signal.
 *
 *  1. Calculates the API 'offset' based on a fixed LIMIT items per page.
 *  2. Executes a type-safe fetch using the core 'api-engine'.
 *  3. Extracts and projects both the raw Job array and the Response Metadata (Total/Pages).
 *
 * @param {string} query - The search term signal (e.g., from the URL 'q' param).
 * @param {number} [page=1] - The current page signal (e.g., from the URL 'p' param).
 * @returns {Promise<Result<JobApiResult>>} A Result object containing:
 *  - ok: boolean (Success/Failure status)
 *  - value.jobs: Job[] (Clean domain-ready job objects)
 *  - value.meta: JobResponseMeta (Calculated pagination data)
 *  - error?: string (Human-readable error message on failure)
 *
 * @example
 * const result = await fetchJobs('Frontend Developer', 2);
 * if (result.ok) console.log(result.value.meta.pages); // Total pages calculated
 */
export const fetchJobs = async (
  query: string,
  page: number = 1
): Promise<Result<JobApiResult>> => {
  const offset = (page - 1) * LIMIT;
  const url = `${BASE_URL}/search?q=${encodeURIComponent(query)}&limit=${LIMIT}&offset=${offset}`;

  const parsedMeta: JobResponseMeta = { total: 0, pages: 0 };

  // DEV: DELAY
  await delay(500);

  const result = await fetchSafeList(url, parseAFJobs, {
    extractArray: (data) => data.hits,
    parseMeta: (data) => {
      const totalResults = data.total?.value ?? 0;
      parsedMeta.total = totalResults;
      parsedMeta.pages = Math.ceil(totalResults / LIMIT);
    },
  });

  if (!result.ok) return result;

  return {
    ok: true,
    value: {
      jobs: result.value,
      meta: parsedMeta,
    },
  };
};
