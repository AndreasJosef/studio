import { z } from 'zod';
import { createSelectSchema } from 'drizzle-zod';

import { type HTMLTreeNode } from '@jobchaser/shared/html-parse';

import { cleanString } from '../shared/utils.ts';
import { jobsTable } from './schema.ts';

import { APPLICATION_STATUS } from './constants.ts';

/**
 * Core Internal Job Types all based on the actual jobs table schema
 **/
export const JobRecordSchema = createSelectSchema(jobsTable);
export type JobRecord = z.infer<typeof JobRecordSchema>;

export const JobDraftSchema = JobRecordSchema.omit({
  id: true,
  createdAt: true,
}).extend({
  contact: z.uuid().nullable().default(null),
});
export type JobDraft = z.infer<typeof JobDraftSchema>;

export const JobSchema = JobRecordSchema.omit({
  id: true,
  createdAt: true,
  userId: true,
  contact: true,
}).extend({
  contactEmail: z.preprocess(
    (val) => (val === '' ? null : val),
    z.email().nullable()
  ),
  contactName: z.preprocess(
    (val) => (val === '' ? null : val),
    z.string().nullable()
  ),
});
export type Job = z.infer<typeof JobSchema>;

/**
 * Type and schema for arbetsförmedlingens job api reponse
 **/
export const AFJobResponseSchema = z.object({
  id: z.coerce.number(),
  headline: z.string(),
  description: z.object({
    text_formatted: cleanString,
  }),
  logo_url: cleanString,
  application_deadline: z.string(),
  webpage_url: cleanString,
  employer: z.object({
    name: cleanString,
    phone_number: cleanString,
    email: cleanString,
    url: cleanString,
  }),
  application_details: z.object({
    email: cleanString,
    url: cleanString,
  }),
  workplace_address: z.object({
    municipality: cleanString,
  }),
  must_have: z.object({
    skills: z
      .array(
        z.object({
          label: cleanString,
        })
      )
      .default([]),
  }),
  nice_to_have: z.object({
    skills: z
      .array(
        z.object({
          label: cleanString,
        })
      )
      .default([]),
  }),
  publication_date: z.string(),
});
export type AFJobResponse = z.infer<typeof AFJobResponseSchema>;

/**
 * Projection Types used by the UI
 **/
export const JobListItemSchema = JobSchema.pick({
  externalId: true,
  jobTitle: true,
  employer: true,
});
export type JobListItem = z.infer<typeof JobListItemSchema>;

export const JobDetailViewSchema = JobSchema.omit({
  description: true,
}).extend({
  description: z.custom<HTMLTreeNode[]>(),
});

export type JobDetailView = z.infer<typeof JobDetailViewSchema>;

export type ApplicationStatus =
  (typeof APPLICATION_STATUS)[keyof typeof APPLICATION_STATUS];

export const ApplicationStatusSchema = z.enum(APPLICATION_STATUS);

export const UpdateStatusRequestSchema = z.object({
  status: ApplicationStatusSchema,
});

export type UpdateStatusRequest = z.infer<typeof UpdateStatusRequestSchema>;

/**
 * SyncConfirmation: This is the response for any Toggle operation.
 */
export const SyncConfirmationSchema = z.object({
  externalId: z.number(),
  isSaved: z.boolean().optional(),
  applicationStatus: ApplicationStatusSchema.optional(),
});

export type SyncConfirmation = z.infer<typeof SyncConfirmationSchema>;
