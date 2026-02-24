import jwt from 'jsonwebtoken';
import { ok, fail, type Result } from '@jobchaser/utils';

/**
 * Helper function to make sure that the environment indeed provides a valid secret.
 *
 * @returns The actual secret and throws otherwise
 **/
const getSecret = (): string => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error('JWT secret is not configured!');
  }
  return secret;
};

const JWT_SECRET = getSecret();

export const jwtService = {
  generateToken(userId: string): string {
    return jwt.sign({ sub: userId }, JWT_SECRET, { expiresIn: '7d' });
  },
  validateToken(token: string): Result<{ sub: string }> {
    try {
      const verified = jwt.verify(token, JWT_SECRET) as { sub: string };
      return ok(verified);
    } catch (e) {
      return fail('Invalid or expired token');
    }
  },
};
