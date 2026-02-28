import { Link } from '@tanstack/react-router';
import { AuthMode } from '..';

interface AuthFooterProps {
  mode: AuthMode;
}

export default function AuthFooter({ mode }: AuthFooterProps) {
  return (
    <footer className="mt-6 text-center">
      <Link
        to={mode === 'signup' ? '/auth/signin' : '/auth/signup'}
        className="text-indigo-400 hover:text-indigo-300 text-sm font-medium"
      >
        {mode === 'signup'
          ? 'Already have an account? Sign In'
          : "Don't have an account? Sign Up"}
      </Link>
    </footer>
  );
}
