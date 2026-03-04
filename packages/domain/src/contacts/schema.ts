import { pgTable, uuid, varchar, timestamp } from 'drizzle-orm/pg-core';

export const contactsTable = pgTable('contacts', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 255 }),
  email: varchar('email', { length: 255 }).unique().notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});
