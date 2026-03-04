import { AuthMode } from '..';

interface AuthHeaderProps {
  mode: AuthMode;
}
export default function AuthHeader({ mode }: AuthHeaderProps) {
  const isSignup = mode === 'signup';

  return (
    <header className="mb-8 text-center">
      <h2 className="text-3xl font-bold text-white">
        {isSignup ? 'Create Account' : 'Welcome Back'}
      </h2>
      <p className="text-zinc-400 mt-2">
        {isSignup
          ? 'Start your job chase today.'
          : 'Sign to bookmark interesting Jobs.'}
      </p>
    </header>
  );
}
