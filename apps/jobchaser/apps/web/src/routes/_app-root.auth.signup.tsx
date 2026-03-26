import z from 'zod';
import { createFileRoute } from '@tanstack/react-router';

import AuthPage from '@/features/user-auth';

const signUpSearchSchema = z.object({
  redirect: z.string().optional().catch(''),
});

export const Route = createFileRoute('/_app-root/auth/signup')({
  validateSearch: (search) => signUpSearchSchema.parse(search),
  component: () => <AuthPage mode="signup" />,
});
