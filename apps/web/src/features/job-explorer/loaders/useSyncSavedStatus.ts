import { useEffect } from 'react';

import { jobsService } from '@/services/jobchaser/jobs.service';
import { Job } from '@jobchaser/domain';

export function useSyncSavedStatus(
  jobs: Job[],
  { onSync }: { onSync: (ids: string[]) => void }
) {
  useEffect(() => {
    if (jobs.length === 0) return;

    const fetchSavedStatus = async () => {
      const externalIds = jobs.map((j) => j.externalId);
      const result = await jobsService.checkSaved(externalIds);

      if (result.ok) {
        onSync(result.value); // Set the savedIds state
      }
    };

    fetchSavedStatus();
  }, [jobs, onSync]);
}
