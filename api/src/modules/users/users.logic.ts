import bcrypt from 'bcrypt';

import { type newUser } from '../../db/schema.ts';
import { userTable } from './users.data.ts';

import { ok, type SignupInput } from '@jobchaser/shared';
import { fail } from '@jobchaser/shared';

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

  async login(email: string, passwordReceived: string) {
    try {
      const user = await userTable.findByEmail(email);
      if (!user) {
        return fail('Invalid Credentials');
      }

      const isValid = await bcrypt.compare(passwordReceived, user.passwordHash);
      if (!isValid) {
        return fail('Invalid Credentials');
      }

      // strip user of passwordHash to prevent leaks
      const { passwordHash, ...safeUser } = user;
      return ok(safeUser);
    } catch (e) {
      console.error('[Internal Error Log]: ', e);
      return fail('Auth Service Offline');
    }
  },
};
