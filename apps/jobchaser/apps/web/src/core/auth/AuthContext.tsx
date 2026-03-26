import { CreateUserInput, Result } from '@jobchaser/domain';
import { LoginInput, SafeUser } from '@jobchaser/domain';
import { createContext, useContext } from 'react';

/**
 * Manages the global authenticated signal for the JobChaser domain.
 **/

// This lets me use an AuthState interface in the app without exposing setUser on it
export interface AuthState {
  user: SafeUser | null;
  isAuthenticated: boolean;
  isInitializing: boolean;
  isLoggingOut: boolean;
}

// Whereas this is the whole auth context interface
export type AuthContextValue = AuthState & {
  loginAction: (input: LoginInput) => Promise<Result<SafeUser>>;
  logoutAction: () => Promise<Result<string>>;
  signupAction: (input: CreateUserInput) => Promise<Result<SafeUser>>;
};

export const AuthContext = createContext<AuthContextValue | undefined>(
  undefined
);

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }

  return context;
};
