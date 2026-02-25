import { createFileRoute } from '@tanstack/react-router';

import AuthPage from '@/features/user-auth';

export const Route = createFileRoute('/_app-root/auth/signin')({
  component: () => <AuthPage mode="signin" />,
});
