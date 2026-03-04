import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';

import { usersTable } from './schema.ts';

export const UserSchema = createSelectSchema(usersTable);

export const UserSchemaFrontend = UserSchema.extend({
  createdAt: z.coerce.date(),
});

export const CreateUserSchema = createInsertSchema(usersTable, {
  email: z.email('Email not valid!'),
  displayName: z.string().min(3, 'Name must be at least 3 characters'),
})
  .omit({
    id: true,
    createdAt: true,
    passwordHash: true,
  })
  .extend({
    password: z.string().min(8, 'Password must be at least 8 characters'),
  });

export const SafeUserSchema = UserSchema.omit({ passwordHash: true });
export const SafeUserSchemaFrontend = UserSchemaFrontend.omit({
  passwordHash: true,
});

export const LoginSchema = z.object({
  email: z.email('Email not valid!'),
  password: z.string().min(1, 'Password is required'),
});

export const LoginResponseSchema = z.object({
  user: SafeUserSchema,
  token: z.string(),
});

export type User = typeof usersTable.$inferSelect;
export type CreateUserDB = typeof usersTable.$inferInsert;

export type CreateUserInput = z.infer<typeof CreateUserSchema>;

export type LoginInput = z.infer<typeof LoginSchema>;
export type LoginResponse = z.infer<typeof LoginResponseSchema>;

export type SafeUser = z.infer<typeof SafeUserSchema>;
