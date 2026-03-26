import {
  pgTable,
  text,
  serial,
  timestamp,
  integer,
  varchar,
  uuid,
  date,
} from 'drizzle-orm/pg-core';

import { usersTable } from '../user/schema.ts';
import { contactsTable } from '../contacts/schema.ts';

import { APPLICATION_STATUS, APPLICATION_STATUS_VALUES } from './constants.ts';
import { type ApplicationStatus } from './types.ts';

export const jobsTable = pgTable('jobs', {
  id: serial('job_id').primaryKey(),
  externalId: integer('external_id').notNull().unique(),
  userId: uuid('user_id')
    .references(() => usersTable.id)
    .notNull(),
  jobTitle: varchar('job_title', { length: 255 }).notNull(),
  employer: varchar('employer', { length: 100 }).notNull(),
  description: text('description'),
  contact: uuid('contact_id').references(() => contactsTable.id),
  applyBy: date({ mode: 'string' }),
  logoUrl: varchar('logo_url'),
  applicationStatus: varchar('application_status', {
    length: 20,
    enum: APPLICATION_STATUS_VALUES,
  })
    .$type<ApplicationStatus>()
    .default(APPLICATION_STATUS.BOOKMARKED)
    .notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});
