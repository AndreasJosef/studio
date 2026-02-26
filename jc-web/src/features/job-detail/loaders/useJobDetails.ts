import { JobDetail } from '@/shared/types';

import { useEffect, useState } from 'react';

import { fetchSafeItem } from '@/lib/api-engine';
import { parseAFJobDetail } from '@/features/job-search/logic/parser';

interface JobDetailsControls {
  id: string | undefined;
}

// TODO: this effect should be cleaned up and the whole api bit moved into the jobtech service -> set the fetchJobs version
const BASE_URL = 'https://jobsearch.api.jobtechdev.se/';

export function useJobDetails({ id }: JobDetailsControls) {
  const [job, setJob] = useState<JobDetail | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let searchActive = true;
    const getJobDetails = async () => {
      if (!id) {
        setJob(null);
        return;
      }
      setIsLoading(true);
      const url = `${BASE_URL}ad/${id}`;

      const result = await fetchSafeItem(url, parseAFJobDetail);

      if (!searchActive) return;

      if (result.ok) {
        setJob(result.value);
      } else {
        setError('Could not load Job Ad');
      }

      setIsLoading(false);
    };

    getJobDetails();

    return () => {
      searchActive = false;
    };
  }, [id]);

  return { job, isLoading, error };
}
