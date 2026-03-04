import { fetchJobs } from '@/services/jobtech/jobtech.api';
import { JobResponseMeta } from '@/shared/types';
import { JobListItem } from '@jobchaser/domain';

import { useEffect } from 'react';

interface JobSearchControls {
  onJobs: (jobs: JobListItem[]) => void;
  setIsLoading: (loading: boolean) => void;
  setError: (error: string) => void;
  setMeta: (data: JobResponseMeta) => void;
}

export const useJobsSearch = (
  query: string,
  page: number,
  { onJobs, setIsLoading, setError, setMeta }: JobSearchControls
) => {
  useEffect(() => {
    if (!query.trim()) return;

    // prevents this query to be raced
    let active = true;

    setIsLoading(true);

    const pull = async () => {
      const result = await fetchJobs(query, page);

      if (!active) return;

      if (result.ok) {
        onJobs(result.value.jobs);
        setMeta(result.value.meta);
      } else {
        setError('Could not load jobs!');
      }
      setIsLoading(false);
    };

    pull();

    return () => {
      active = false;
    };
  }, [query, page, onJobs, setMeta, setIsLoading, setError]);
};
