import { pgTable, uuid, varchar, text, timestamp } from 'drizzle-orm/pg-core';

export const contactsTable = pgTable('contacts', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).unique(),
  linkedinUrl: text('linkedin_url'),
  createdAt: timestamp('created_at').defaultNow(),
});
