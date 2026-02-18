import { pgTable, uuid, text, timestamp } from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';

/**
 * Define the schema and infer types for a user
 **/
export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: text('email').unique().notNull(),
  passwordHash: text('password_hash').notNull(),
  displayName: text('display_name'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const insertUserSchema = createInsertSchema(users, {
  email: z.email('Email not valid'),
  displayName: z.string().min(3, 'Name must be at least 3 characters'),
});

export const userSchema = createSelectSchema(users);
export type User = z.infer<typeof userSchema>;
export type newUser = z.infer<typeof insertUserSchema>;

export const jobs = pgTable('jobs', {
  id: uuid('id').primaryKey().defaultRandom(),
  headline: text('title').notNull(),
  description: text('description'),
});
