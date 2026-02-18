import bcrypt from 'bcrypt';
import { newUser } from '../../db/schema';
import { userData } from './users.data';

export const authLogic = {
  async signup(data: newUser) {
    const hashedPassword = await bcrypt.hash(data.passwordHash, 10);

    const user = await userData.createUser({
      ...data,
      passwordHash: hashedPassword,
    });

    const { passwordHash, ...safeUser } = user;

    return safeUser;
  },

  async login(email: string, passwordReceived: string) {
    const user = await userData.findByEmail(email);

    if (!user) {
      throw new Error('Invalid Credentials');
    }

    const isValid = await bcrypt.compare(passwordReceived, user.passwordHash);

    if (!isValid) {
      throw new Error('Invalid Credentials');
    }

    // strip user of passwordHash to prevent leaks
    const { passwordHash, ...safeUser } = user;

    return safeUser;
  },
};
