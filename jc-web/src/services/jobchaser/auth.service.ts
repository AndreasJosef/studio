import {
  LoginInput,
  SafeUser,
  SafeUserSchemaFrontend,
} from '@jobchaser/domain';
import { Result } from '@/lib/result';

import { safePost, zodParser } from '@/lib/api-engine';

const BASE_URL = 'http://localhost:3000/api';

export const authService = {
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
};
