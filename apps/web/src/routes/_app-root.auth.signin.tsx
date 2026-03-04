import { createFileRoute } from '@tanstack/react-router';
import { z } from 'zod';

import AuthPage from '@/features/user-auth';

const signInSearchSchema = z.object({
  redirect: z.string().optional().catch(''),
});

export type SiginSearch = z.infer<typeof signInSearchSchema>;

export const Route = createFileRoute('/_app-root/auth/signin')({
  validateSearch: (search) => signInSearchSchema.parse(search),
  component: () => <AuthPage mode="signin" />,
});
