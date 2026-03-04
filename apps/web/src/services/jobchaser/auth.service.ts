import {
  Result,
  LoginInput,
  SafeUser,
  SafeUserSchemaFrontend,
  CreateUserInput,
} from '@jobchaser/domain';

import { safePost, zodParser, identityParser } from '@/lib/api-engine';

const BASE_URL = 'http://localhost:3000/api';

export const authService = {
  async signup(input: CreateUserInput): Promise<Result<SafeUser>> {
    return safePost<CreateUserInput, SafeUser>(
      `${BASE_URL}/users/signup`,
      input,
      { credentials: 'include' },
      zodParser(SafeUserSchemaFrontend)
    );
  },

  async login(input: LoginInput): Promise<Result<SafeUser>> {
    return safePost<LoginInput, SafeUser>(
      `${BASE_URL}/users/login`,
      input,
      {
        credentials: 'include',
        headers: {},
      },
      zodParser(SafeUserSchemaFrontend)
    );
  },
  async logout(): Promise<Result<string>> {
    return safePost<null, string>(
      `${BASE_URL}/users/logout`,
      null,
      { credentials: 'include' },
      identityParser
    );
  },
};
