import type { AFJobResponse, Job } from './types.ts';

export function mapAFToJob(rawJob: AFJobResponse): Job {
  return {
    externalId: rawJob.id,
    jobTitle: rawJob.headline,
    employer: rawJob.employer.name,
    description: rawJob.description.text_formatted,
    applyBy: rawJob.application_deadline,
    logoUrl: rawJob.logo_url,
    contact: rawJob.application_deadlines.email,
  };
}
