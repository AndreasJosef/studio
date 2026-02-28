import z from 'zod';

import { useRouter, useNavigate } from '@tanstack/react-router';
import { useAuth } from '@/core/auth/AuthContext';

import { CreateUserSchema, LoginSchema } from '@jobchaser/domain';

export interface AuthActionControls {
  redirectTo: string;
}

export interface AuthActions {
  handleLogin: (data: Record<string, unknown>) => Promise<void>;
  handleSignup: (data: Record<string, unknown>) => Promise<void>;
}

export default function useAuthActions({
  redirectTo,
}: AuthActionControls): AuthActions {
  const router = useRouter();
  const navigate = useNavigate();

  // TODO: Create Signup Action
  const { loginAction, signupAction } = useAuth();

  // Login
  const handleLogin = async (data: Record<string, unknown>) => {
    const validate = LoginSchema.safeParse(data);

    if (!validate.success) {
      // TODO: Should probably trigger a form error message handler here
      console.error(z.treeifyError(validate.error));
      return;
    }

    const result = await loginAction(validate.data);

    if (result.ok) {
      await router.invalidate();
      navigate({ to: redirectTo, replace: true });
    }
  };

  const handleSignup = async (data: Record<string, unknown>) => {
    const validate = CreateUserSchema.safeParse(data);

    if (!validate.success) {
      console.error(z.prettifyError(validate.error));
      return;
    }

    const result = await signupAction(validate.data);

    if (result.ok) {
      await router.invalidate();
      navigate({ to: redirectTo, replace: true });
    }
  };

  return {
    handleLogin,
    handleSignup,
  };
}
