import { Job } from '@/shared/types';

import { useEffect, useState } from 'react';

import { fetchSafeItem } from '../../../core/api-engine';
import { parseAFJobs } from '../../job-search/logic/parser';

interface JobDetailsControls {
  id: number;
}

const BASE_URL = 'https://jobsearch.api.jobtechdev.se/';

export function useJobDetails({ id }: JobDetailsControls) {
  const [job, setJob] = useState<Job | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let searchActive = true;

    const getJobDetails = async () => {
      setIsLoading(true);
      const url = `${BASE_URL}ad/${id}`;

      const result = await fetchSafeItem(url, parseAFJobs);

      if (!searchActive) return;

      if (result.ok) {
        setJob(result.value);
        console.log('Job Ad Detais: ', result.value);
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
