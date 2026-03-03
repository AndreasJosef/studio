import { createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';

import { jobsTable } from './schema.ts';
import { cleanString } from '../shared/utils.ts';

export const StoredJobSchema = createSelectSchema(jobsTable);

export const JobSchema = StoredJobSchema.omit({
  id: true,
  createdAt: true,
  userId: true,
});

export const CreateJobSchema = StoredJobSchema.omit({
  id: true,
  createdAt: true,
}).extend({
  contact: z.uuid().nullable().default(null),
});

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

export type Job = z.infer<typeof JobSchema>;
export type CreateJob = z.infer<typeof CreateJobSchema>;
export type StoredJob = z.infer<typeof StoredJobSchema>;
export type AFJobResponse = z.infer<typeof AFJobResponseSchema>;
