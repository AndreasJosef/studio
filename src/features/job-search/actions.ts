import { type Job, SearchCompletion } from '@/shared/types';

import { fetchSafeList } from '../../core/api-engine';
import { parseAFJobs, parseAFCompletions } from './parser';

const BASE_URL = 'https://jobsearch.api.jobtechdev.se/search';
const COMPLETE_URL = 'https://jobsearch.api.jobtechdev.se/complete';

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

  const result = await fetchSafeList(url, parseAFJobs, {
    extractArray: (data) => data.hits,
    parseMeta: (data) => {
      console.log(data);
    },
  });

  if (result.ok) {
    setJobs(result.value);
  } else {
    setError('Could not load jobs. Try again!');
    console.error('Error fetching Jobs: ', result.error);
  }

  setIsLoading(false);
}

export async function getSuggestions(
  query: string
): Promise<SearchCompletion[]> {
  const url = `${COMPLETE_URL}?q=${query}`;

  const result = await fetchSafeList(url, parseAFCompletions, {
    extractArray: (data) => data.typeahead,
  });

  if (result.ok) {
    return result.value;
  } else {
    console.warn('Could not get Suggestions');
    return [];
  }
}
