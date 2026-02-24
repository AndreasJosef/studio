import { createContext, useContext } from 'react';

/**
 * Manages the global authenticated signal for the JobChaser domain.
 **/

// TODO: Move this into a shared type, this should be the safe User from my domain
export interface User {
  name: string;
}

// This lets me use an AuthState interface in the app without exposing setUser on it
export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isInitializing: boolean;
}

// Whereas this is the whole auth context interface
export type AuthContextValue = AuthState & {
  setUser: (user: User | null) => void;
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
