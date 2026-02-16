import { createFileRoute } from '@tanstack/react-router';

import AuthPage from '@/features/user-auth';

export const Route = createFileRoute('/auth/signup')({
  component: () => <AuthPage mode="signup" />,
});
