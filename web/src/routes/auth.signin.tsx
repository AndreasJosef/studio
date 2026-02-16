import { createFileRoute } from '@tanstack/react-router';

import AuthPage from '@/features/user-auth';

export const Route = createFileRoute('/auth/signin')({
  component: () => <AuthPage mode="signin" />,
});
