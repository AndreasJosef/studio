import { RouterProvider } from '@tanstack/react-router';
import { router } from '@/router';
import { useAuth } from './AuthContext';

/**
 * The AuthRouter Injects the Auth signal into the Router's context.
 */
export function AuthRouter() {
  const auth = useAuth();

  if (auth.isInitializing) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-pulse text-slate-400">Signing In...</div>
      </div>
    );
  }

  return <RouterProvider router={router} context={{ auth }} />;
}
