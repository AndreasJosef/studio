import { Job } from '@/shared/types';

import { useEffect } from 'react';

import { fetchSafeList } from '../../../core/api-engine';
import { parseAFJobs } from '../logic/parser';

const BASE_URL = 'https://jobsearch.api.jobtechdev.se/search';

interface JobSearchControls {
  setJobs: (jobs: Job[]) => void;
  setIsLoading: (loading: boolean) => void;
  setError: (error: string) => void;
}

export const useJobsData = (
  query: string,
  { setJobs, setIsLoading, setError }: JobSearchControls
) => {
  useEffect(() => {
    if (!query.trim()) return;

    // make sure no new query races this one
    let searchActive = true;

    const fetchJobData = async () => {
      const encodedQuery = encodeURIComponent(query);
      const url = `${BASE_URL}?q=${encodedQuery}&limit=100`;

      const result = await fetchSafeList(url, parseAFJobs, {
        extractArray: (data) => data.hits,
        parseMeta: (data) => {
          console.log('Exract Meta from his reponse: ', data);
        },
      });

      if (result.ok) {
        setJobs(result.value);
      } else {
        setError('Could not load jobs. Try again!');
        console.error('Error fetching Jobs: ', result.error);
      }

      setIsLoading(false);
    };

    fetchJobData();

    // Now we can accept new queries  -> finish the query
    return () => {
      searchActive = false;
    };
  }, [query, setJobs, setError, setIsLoading]);
};
