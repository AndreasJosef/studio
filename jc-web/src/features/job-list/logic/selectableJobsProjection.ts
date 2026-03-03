import { Job } from '@jobchaser/domain';

// Refinery function that enriches a given jobs list with isSelcted property
export function selectableJobsProjection(jobs: Job[], selectedId?: string) {
  return jobs.map((job) => ({
    ...job,
    isSelected: String(job.externalId) === selectedId,
  }));
}
