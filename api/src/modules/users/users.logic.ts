import bcrypt from 'bcrypt';

import type { newUser, SafeUser } from '../../db/schema.ts';
import { userTable } from './users.data.ts';

import { ok, type SignupInput, type Result } from '@jobchaser/shared';
import { fail } from '@jobchaser/shared';
import { jwtService } from '../../services/jwt.service.ts';

interface LoginResponse {
  user: SafeUser;
  token: string;
}

export const authLogic = {
  async signup(input: SignupInput) {
    try {
      const isExisting = await userTable.findByEmail(input.email);
      if (isExisting) return fail('Email already registered');

      const hashedPassword = await bcrypt.hash(input.password, 10);

      const dbUser: newUser = {
        email: input.email,
        passwordHash: hashedPassword,
        displayName: input.displayName,
      };

      const user = await userTable.createUser(dbUser);

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
      const user = await userTable.findByEmail(email);
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
