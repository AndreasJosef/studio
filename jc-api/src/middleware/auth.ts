import type { Request, Response, NextFunction } from 'express';
import { jwtService } from '../services/jwt.service.ts';

import { fail } from '@jobchaser/utils';

/* eslint-disable @typescript-eslint/no-namespace */
declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}
/* eslint-enable @typescript-eslint/no-namespace */

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.auth_token;
  if (!token) return res.status(401).json(fail('No access token provided!'));

  const result = jwtService.validateToken(token);
  if (!result.ok) return res.status(401).json(result);

  req.userId = result.value.sub;

  next();
};
