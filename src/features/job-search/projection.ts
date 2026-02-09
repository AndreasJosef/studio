import type { Job } from '@/shared/types';

/**
 * Filters the Joblist based on user input
 *
 * @param jobs an array of Jobs
 * @param searchTerm the string to filter list (searches job.employer and job.headline)
 * @returns The filterd list if a searchTerm is given otherwise the whole list
 */
export const jobSearchProjection = (jobs: Job[], searchTerm: string) => {
  const query = searchTerm.trim().toLowerCase();

  if (!query) return jobs;

  return jobs.filter(
    (job) =>
      job.headline.toLowerCase().includes(query) ||
      job.employer.toLowerCase().includes(query)
  );
};
