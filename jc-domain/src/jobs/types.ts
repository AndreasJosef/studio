import { createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';

import { jobsTable } from './schema.ts';

export const StoredJobSchema = createSelectSchema(jobsTable);
export type StoredJob = z.infer<typeof StoredJobSchema>;

export const JobSchema = StoredJobSchema.omit({
  id: true,
  createdAt: true,
  userId: true,
});

export type Job = z.infer<typeof JobSchema>;

export const AFJobResponseSchema = z.object({
  id: z.coerce.number(),
  headline: z.string(),
  description: z.object({
    text_formatted: z.string().default(''),
  }),
  logo_url: z.string().default(''),
  application_deadline: z.string(),
  webpage_url: z.string().default(''),
  employer: z.object({
    name: z.string().default(''),
    phone_number: z.string().default(''),
    email: z.email(),
    url: z.string(),
  }),
  application_deadlines: z.object({
    email: z.email(),
    url: z.string(),
  }),
  workplace_address: z.object({
    municipaplity: z.string(),
  }),
  must_have: z.object({
    skills: z.array(
      z.object({
        label: z.string(),
      })
    ),
  }),
  nice_to_have: z.object({
    skills: z.array(
      z.object({
        label: z.string(),
      })
    ),
  }),
  publication_date: z.string(),
});

export type AFJobResponse = z.infer<typeof AFJobResponseSchema>;
