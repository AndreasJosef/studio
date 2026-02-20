import { pgTable, uuid, text, timestamp } from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';

import { signupSchema } from '@jobchaser/shared';

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
  email: signupSchema.shape.email,
  displayName: signupSchema.shape.displayName,
  passwordHash: z.string().min(60), // default length of bcrypt hash
});

export const userSchema = createSelectSchema(users);

export type User = z.infer<typeof userSchema>;
export type newUser = z.infer<typeof insertUserSchema>;

export type SafeUser = Omit<User, 'passwordHash'>;

/**
 * Define Schema and types of jobs in the database
 **/
export const jobs = pgTable('jobs', {
  id: uuid('id').primaryKey().defaultRandom(),
  headline: text('title').notNull(),
  description: text('description'),
});
