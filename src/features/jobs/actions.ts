import { fetchSafeList } from '../../core/api-engine';
import { Job } from '@/shared/types';
import { parseAFJobs } from './parser';

const BASE_URL = 'https://jobsearch.api.jobtechdev.se/search';

/**
 * Constructs URL for AF API and updates state with
 * result of the query
 **/
export async function searchJobs(
  query: string,
  setJobs: (jobs: Job[]) => void,
  setIsLoading: (isLoading: boolean) => void,
  setError: (err: string) => void
) {
  if (!query.trim()) return;

  setIsLoading(true);
  const encodedQuery = encodeURIComponent(query);
  const url = `${BASE_URL}?q=${encodedQuery}&limit=100`;

  const result = await fetchSafeList(url, parseAFJobs);

  if (result.ok) {
    setJobs(result.value);
  } else {
    setError('Could not load jobs. Try again!');
    console.error('Error fetching Jobs: ', result.error);
  }

  setIsLoading(false);
}
