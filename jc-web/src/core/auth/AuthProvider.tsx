import React, { useEffect, useState } from 'react';

import { AuthContext, AuthContextValue } from './AuthContext';
import {
  CreateUserInput,
  LoginInput,
  SafeUser,
  SafeUserSchemaFrontend,
} from '@jobchaser/domain';

import { fetchSafeItem, zodParser } from '@/lib/api-engine';
import { authService } from '@/services/jobchaser/auth.service';

/**
 * Manages the lifecycle of the user session.
 */
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<SafeUser | null>(null);
  const [isInitializing, setIsInitializing] = useState(true);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const signupAction = async (data: CreateUserInput) => {
    const result = await authService.signup(data);

    if (result.ok) setUser(result.value);

    return result;
  };

  const loginAction = async (data: LoginInput) => {
    const result = await authService.login(data);

    if (result.ok) setUser(result.value);

    // whoever called it gets the result as well
    return result;
  };

  const logoutAction = async () => {
    const result = await authService.logout();

    setIsLoggingOut(true);

    if (result.ok) setUser(null);

    setIsLoggingOut(false);
    return result;
  };

  useEffect(() => {
    // TODO: This should possibly be moved to a service/auth or api or sth
    // created service/jobchaser/auth.service.ts this will go there as getMe
    const checkAuth = async () => {
      setIsInitializing(true);
      const result = await fetchSafeItem<SafeUser>(
        'http://localhost:3000/api/users/me',
        zodParser(SafeUserSchemaFrontend),
        { credentials: 'include' }
      );

      if (result.ok) {
        setUser(result.value);
      } else {
        setUser(null);
      }

      setIsInitializing(false);
    };

    checkAuth();
  }, []);

  const value: AuthContextValue = {
    user,
    isAuthenticated: !!user,
    isInitializing,
    isLoggingOut,
    loginAction,
    logoutAction,
    signupAction,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
