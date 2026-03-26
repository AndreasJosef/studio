import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { CreateUserSchema, LoginSchema } from '@jobchaser/domain';

import { AuthMode } from '..';

interface AuthFormProps {
  mode: AuthMode;
  onSubmit: (data: AuthFields) => Promise<void>;
  isLoading?: boolean;
}

interface AuthFields {
  email: string;
  password: string;
  displayName?: string; // Optional, so Login is happy
  [key: string]: unknown;
}

export default function AuthForm({ mode, onSubmit, isLoading }: AuthFormProps) {
  const isSignup = mode === 'signup';

  const currentSchema = isSignup ? CreateUserSchema : LoginSchema;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthFields>({
    resolver: zodResolver(currentSchema),
    defaultValues: {
      email: '',
      password: '',
      displayName: '',
    },
  });

  // const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   const formData = new FormData(e.currentTarget);
  //   const data = Object.fromEntries(formData.entries());
  //
  //   await onSubmit(data);
  // };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      {isSignup && (
        <div className="flex flex-col gap-1">
          <input
            {...register('displayName')}
            name="displayName"
            className={`bg-app-surface-raised border p-3 rounded text-content-main outline-none transition-all focus:ring-2 ${
              errors.displayName
                ? 'border-red-500 focus:ring-red-500/20'
                : 'border-app-border focus:ring-app-ring'
            }`}
            type="text"
            placeholder="Profile Name"
          />
          {errors.displayName && (
            <span className="text-xs text-red-500 font-medium px-1">
              {String(errors.displayName.message)}
            </span>
          )}
        </div>
      )}

      <div className="flex flex-col gap-1">
        <input
          {...register('email')}
          name="email"
          className={`bg-app-surface-raised border p-3 rounded text-content-main outline-none transition-all focus:ring-2 ${
            errors.email
              ? 'border-red-500 focus:ring-red-500/20'
              : 'border-app-border focus:ring-app-ring'
          }`}
          type="email"
          placeholder="Email Address"
        />
        {errors.email && (
          <span className="text-xs text-red-500 font-medium px-1">
            {String(errors.email.message)}
          </span>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <input
          {...register('password')}
          name="password"
          className={`bg-app-surface-raised border p-3 rounded text-content-main outline-none transition-all focus:ring-2 ${
            errors.password
              ? 'border-red-500 focus:ring-red-500/20'
              : 'border-app-border focus:ring-app-ring'
          }`}
          type="password"
          placeholder="Password"
        />
        {errors.password && (
          <span className="text-xs text-red-500 font-medium px-1">
            {String(errors.password.message)}
          </span>
        )}
      </div>

      <button
        disabled={isLoading}
        className="bg-brand-primary hover:bg-indigo-600 disabled:opacity-50 text-white font-bold py-3 rounded transition-colors mt-2 cursor-pointer"
        type="submit"
      >
        {isLoading ? 'Processing...' : isSignup ? 'Sign Up' : 'Sign In'}
      </button>
    </form>
  );
}
