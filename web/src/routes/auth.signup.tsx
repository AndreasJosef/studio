import { createFileRoute } from '@tanstack/react-router';

import SignUp from '../features/auth-signup';

export const Route = createFileRoute('/auth/signup')({
  component: SignUp,
});
