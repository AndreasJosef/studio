interface AuthPageProps {
  mode: 'signin' | 'signup';
}

export default function AuthPage({ mode }: AuthPageProps) {
  const isSignup = mode === 'signup';

  return (
    <>
      <h2 className="text-2xl">{isSignup ? 'Sign Up' : 'Sign In'}</h2>
    </>
  );
}
