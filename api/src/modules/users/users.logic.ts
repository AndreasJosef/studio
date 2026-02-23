import bcrypt from 'bcrypt';

import {
  type CreateUserDB,
  type CreateUserInput,
  type SafeUser,
  userActions,
} from '@jobchaser/domain/types';

import { ok, fail, type Result } from '@jobchaser/utils';

import { jwtService } from '../../services/jwt.service.ts';

interface LoginResponse {
  user: SafeUser;
  token: string;
}

export const authLogic = {
  async signup(input: CreateUserInput) {
    try {
      const isExisting = await userActions.findByEmail(input.email);
      if (isExisting) return fail('Email already registered');

      const hashedPassword = await bcrypt.hash(input.password, 10);

      const dbUser: CreateUserDB = {
        email: input.email,
        passwordHash: hashedPassword,
        displayName: input.displayName,
      };

      const user = await userActions.createUser(dbUser);

      // strip user of passwordHash to prevent leaks
      const { passwordHash, ...safeUser } = user;
      // TODO: Make safeUser an actual type
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
      if (!user) return fail('Invalid Credentials');

      const isValid = await bcrypt.compare(passwordReceived, user.passwordHash);
      if (!isValid) return fail('Invalid Credentials');

      const token = jwtService.generateToken(user.id);

      // strip user of passwordHash to prevent leaks
      const { passwordHash, ...safeUser } = user;

      return ok({ user: safeUser as SafeUser, token });
    } catch (e) {
      console.error('[Internal Error Log]: ', e);
      return fail('Auth Service Offline');
    }
  },
};
