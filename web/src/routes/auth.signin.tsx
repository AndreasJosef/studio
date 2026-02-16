import { createFileRoute } from '@tanstack/react-router';

import SignIn from '../features/auth-signin';

export const Route = createFileRoute('/auth/signin')({
  component: SignIn,
});
