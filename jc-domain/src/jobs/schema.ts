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
  createdAt: timestamp('created_at').defaultNow().notNull(),
});
