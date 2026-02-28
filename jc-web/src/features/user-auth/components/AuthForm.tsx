import { AuthMode } from '..';

interface AuthFormProps {
  mode: AuthMode;
  onSubmit: (data: Record<string, unknown>) => Promise<void>;
  isLoading?: boolean;
}

export default function AuthForm({ mode, onSubmit, isLoading }: AuthFormProps) {
  const isSignup = mode === 'signup';

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    await onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {isSignup && (
        <input
          name="displayName"
          className="bg-zinc-800 border border-zinc-700 p-3 rounded text-white focus:ring-2 focus:ring-indigo-600 outline-none"
          type="text"
          placeholder="Profile Name"
          required
        />
      )}
      <input
        name="email"
        className="bg-zinc-800 border border-zinc-700 p-3 rounded text-white focus:ring-2 focus:ring-indigo-600 outline-none"
        type="email"
        placeholder="Email Address"
        required
      />
      <input
        name="password"
        className="bg-zinc-800 border border-zinc-700 p-3 rounded text-white focus:ring-2 focus:ring-indigo-600 outline-none"
        type="password"
        placeholder="Password"
        required
      />

      <button
        disabled={isLoading}
        className="bg-indigo-700 hover:bg-indigo-600 disabled:opacity-50 text-white font-bold py-3 rounded transition-colors mt-2 cursor-pointer"
        type="submit"
      >
        {isLoading ? 'Processing...' : isSignup ? 'Sign Up' : 'Sign In'}
      </button>
    </form>
  );
}
