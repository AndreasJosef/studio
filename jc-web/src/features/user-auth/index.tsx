import { useAuth } from '@/core/auth/AuthContext';
import { useNavigate } from '@tanstack/react-router';

import { LoginSchema } from '@jobchaser/domain';
import { Link } from '@tanstack/react-router';
import z from 'zod';

interface AuthPageProps {
  mode: 'signin' | 'signup';
}

export default function AuthPage({ mode }: AuthPageProps) {
  const isSignup = mode === 'signup';
  const { loginAction } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (formData: FormData) => {
    const data = Object.fromEntries(formData.entries());

    if (!isSignup) {
      const validateInput = LoginSchema.safeParse(data);

      if (!validateInput.success) {
        console.error(z.treeifyError(validateInput.error));
        return;
      }

      const result = await loginAction(validateInput.data);

      if (result.ok) {
        navigate({ to: '/my-jobs' });
      }
    }
  };

  return (
    <div className="max-w-md mx-auto p-8 bg-zinc-900 border border-zinc-800 rounded-lg  mt-20">
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

      <form action={onSubmit} className="flex flex-col gap-4">
        {isSignup && (
          <input
            className="bg-zinc-800 border border-zinc-700 p-3 rounded text-white focus:ring-2 focus:ring-indigo-600 outline-none"
            type="text"
            placeholder="Display Name"
          />
        )}
        <input
          className="bg-zinc-800 border border-zinc-700 p-3 rounded text-white focus:ring-2 focus:ring-indigo-600 outline-none"
          type="email"
          name="email"
          placeholder="Email Address"
          required
        />
        <input
          className="bg-zinc-800 border border-zinc-700 p-3 rounded text-white focus:ring-2 focus:ring-indigo-600 outline-none"
          type="password"
          name="password"
          placeholder="Password"
          required
        />

        <button
          className="bg-indigo-700 hover:bg-indigo-600 text-white font-bold py-3 rounded transition-colors mt-2"
          type="submit"
        >
          {isSignup ? 'Sign Up' : 'Sign In'}
        </button>
      </form>

      <footer className="mt-6 text-center">
        <Link
          to={isSignup ? '/auth/signin' : '/auth/signup'}
          className="text-indigo-400 hover:text-indigo-300 text-sm font-medium"
        >
          {isSignup
            ? 'Already have an account? Sign In'
            : "Don't have an account? Sign Up"}
        </Link>
      </footer>
    </div>
  );
}
