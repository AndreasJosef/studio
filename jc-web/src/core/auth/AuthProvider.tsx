import React, { useEffect, useState } from 'react';
import { AuthContext, AuthContextValue } from './AuthContext';
import { User } from './AuthContext';

/**
 * Manages the lifecycle of the user session.
 */
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isInitializing, setIsInitializing] = useState(true);

  // TODO: Creating the effect to handle sync the auth context with the user service
  useEffect(() => {
    setTimeout(() => {
      setIsInitializing(false);
    }, 2000);
  }, []);

  const value: AuthContextValue = {
    user,
    isAuthenticated: !!user,
    isInitializing,
    setUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
