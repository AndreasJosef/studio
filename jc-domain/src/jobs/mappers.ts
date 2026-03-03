import type { AFJobResponse, Job } from './types.ts';

export function mapAFToJob(rawJob: AFJobResponse): Job {
  // here I can have more advanced logi to calculate those fields
  // for example try to fill the contact info from different fields of the AF response
  return {
    externalId: rawJob.id,
    jobTitle: rawJob.headline,
    employer: rawJob.employer.name,
    description: rawJob.description.text_formatted,
    applyBy: rawJob.application_deadline,
    logoUrl: rawJob.logo_url,
    contact: rawJob.application_details.email,
  };
}
