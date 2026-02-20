import { z } from 'zod';

export const signupSchema = z.object({
  email: z.email('email not valid!'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  displayName: z.string().min(3, 'Name must be at least 3 characters'),
});

export const loginSchema = z.object({
  email: z.email('email not valid!'),
  password: z.string(),
});

export type SignupInput = z.infer<typeof signupSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
