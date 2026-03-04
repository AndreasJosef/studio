import { useSearch } from '@tanstack/react-router';

import useAuthActions from './actions/useAuthActions';

import AuthHeader from './components/AuthHeader';
import AuthForm from './components/AuthForm';
import AuthFooter from './components/AuthFooter';

export type AuthMode = 'signin' | 'signup';

export default function AuthPage({ mode }: { mode: AuthMode }) {
  const { redirect } = useSearch({
    strict: false,
  });
  const { handleLogin, handleSignup } = useAuthActions({
    redirectTo: redirect || '/explore',
  });

  return (
    <div className="max-w-md mx-auto p-8 bg-zinc-900 border border-zinc-800 rounded-lg mt-20">
      <AuthHeader mode={mode} />

      <AuthForm
        mode={mode}
        onSubmit={mode === 'signup' ? handleSignup : handleLogin}
      />

      <AuthFooter mode={mode} redirect={redirect} />
    </div>
  );
}
