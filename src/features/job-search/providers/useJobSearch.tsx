import { Job } from '@/shared/types';

import { useEffect } from 'react';

import { fetchSafeList } from '../../../core/api-engine';
import { parseAFJobs } from '../logic/parser';

const BASE_URL = 'https://jobsearch.api.jobtechdev.se/search';

export interface JobResponseMeta {
  total: number;
}

interface JobSearchControls {
  onJobs: (jobs: Job[]) => void;
  setIsLoading: (loading: boolean) => void;
  setError: (error: string) => void;
  setMeta: (data: JobResponseMeta) => void;
}

export const useJobsData = (
  query: string,
  { onJobs, setIsLoading, setError, setMeta }: JobSearchControls
) => {
  useEffect(() => {
    if (!query.trim()) return;

    // make sure no new query races this one
    let searchActive = true;

    const fetchJobData = async () => {
      const encodedQuery = encodeURIComponent(query);
      const url = `${BASE_URL}?q=${encodedQuery}&limit=100`;

      const responseMeta: JobResponseMeta = { total: 0 };

      const result = await fetchSafeList(url, parseAFJobs, {
        extractArray: (data) => data.hits,
        parseMeta: (data) => {
          responseMeta.total = data.total?.value || 0;
        },
      });

      if (result.ok) {
        onJobs(result.value);
        setMeta(responseMeta);
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
  }, [query, onJobs, setError, setIsLoading, setMeta]);
};
