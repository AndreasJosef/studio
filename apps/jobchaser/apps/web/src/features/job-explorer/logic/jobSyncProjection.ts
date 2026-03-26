import { JobListItem } from '@jobchaser/domain';

/**
 *
 * Projects a "Saved Status" onto a list of raw Jobs.
 *
 * @param jobs - The array of jobs from the external API
 * @param savedIds - The array of externalIds currently in the user's vault
 * @returns An array of JobDetailView (or a specialized ListItem type)
 *
 */
export const jobSyncProjection = (
  jobs: JobListItem[],
  savedIds: number[]
): (JobListItem & { isSaved: boolean })[] => {
  const savedSet = new Set(savedIds);

  return jobs.map((job) => ({
    ...job,
    isSaved: savedSet.has(job.externalId),
  }));
};
