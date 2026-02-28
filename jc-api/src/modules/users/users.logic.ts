import bcrypt from 'bcrypt';

import { ok, fail, type Result, AuthErrorCode } from '@jobchaser/domain';
import { userActions } from '@jobchaser/domain/actions';

import {
  type CreateUserDB,
  type CreateUserInput,
  type SafeUser,
  type LoginResponse,
  SafeUserSchema,
} from '@jobchaser/domain/types';

import { jwtService } from '../../services/jwt.service.ts';

// TODO: From here I should move the try/catch blocks even closer to
// the actual transactions ie into @jobchaser/domain db operations.
// Then just fail there and and return the result with an error.
export const authLogic = {
  async signup(input: CreateUserInput): Promise<Result<SafeUser>> {
    try {
      const isExisting = await userActions.findByEmail(input.email);
      if (isExisting)
        return fail(
          'Email already registered',
          AuthErrorCode.EMAIL_ALREADY_EXISTS
        );

      const hashedPassword = await bcrypt.hash(input.password, 10);

      const dbUser: CreateUserDB = {
        email: input.email,
        passwordHash: hashedPassword,
        displayName: input.displayName,
      };

      const user = await userActions.createUser(dbUser);

      // strip user of passwordHash to prevent leaks
      const safeUser = SafeUserSchema.parse(user);

      return ok(safeUser);
    } catch (e) {
      console.error('[Internal Error Log]: ', e);
      return fail('Unexpected Error during Sign Up');
    }
  },

  async login(
    email: string,
    passwordReceived: string
  ): Promise<Result<LoginResponse>> {
    try {
      const user = await userActions.findByEmail(email);
      if (!user)
        return fail('Invalid Credentials', AuthErrorCode.INVALID_CREDENTIALS);

      const isValidPassword = await bcrypt.compare(
        passwordReceived,
        user.passwordHash
      );

      if (!isValidPassword)
        return fail('Invalid Credentials', AuthErrorCode.INVALID_CREDENTIALS);

      const token = jwtService.generateToken(user.id);

      // strip user of passwordHash
      const safeUser = SafeUserSchema.parse(user);

      return ok({ user: safeUser, token });
    } catch (e) {
      console.error('[Internal Error Log]: ', e);
      return fail('Auth Service Offline');
    }
  },

  async getMe(id: string): Promise<Result<SafeUser>> {
    try {
      const user = await userActions.findById(id);
      if (!user) return fail('Could not find user');

      const safeUser = SafeUserSchema.parse(user);

      return ok(safeUser);
    } catch (e) {
      console.error('[Internal Error Log]: ', e);
      return fail('DB Offline');
    }
  },
};
