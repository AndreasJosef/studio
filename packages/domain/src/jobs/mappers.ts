import { type ContactRecord } from '../contacts/types.ts';
import { APPLICATION_STATUS } from './constants.ts';
import type { AFJobResponse, Job, JobListItem, JobRecord } from './types.ts';

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
    contactEmail: rawJob.application_details.email,
    applicationStatus: APPLICATION_STATUS.BOOKMARKED,
    contactName: rawJob.employer.name,
  };
}

export function mapAFToListItem(rawJob: AFJobResponse): JobListItem {
  return {
    externalId: rawJob.id,
    employer: rawJob.employer.name,
    jobTitle: rawJob.headline,
  };
}

export function mapContactJoinToJob(row: {
  jobs: JobRecord;
  contacts: ContactRecord | null;
}): Job {
  return {
    externalId: row.jobs.externalId,
    jobTitle: row.jobs.jobTitle,
    employer: row.jobs.employer,
    description: row.jobs.description ?? '',
    applyBy: row.jobs.applyBy,
    logoUrl: row.jobs.logoUrl,
    applicationStatus: row.jobs.applicationStatus,
    contactEmail: row.contacts?.email ?? null,
    contactName: row.contacts?.name ?? null,
  };
}
