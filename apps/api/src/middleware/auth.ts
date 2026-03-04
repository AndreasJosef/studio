import type { Request, Response, NextFunction } from 'express';

import { AuthErrorCode, fail } from '@jobchaser/domain';

import { jwtService } from '../services/jwt.service.ts';

export interface AuthRequest extends Request {
  userId: string;
}

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.auth_token;
  if (!token)
    return res
      .status(401)
      .json(
        fail('No access token provided!', AuthErrorCode.INVALID_CREDENTIALS)
      );

  const result = jwtService.validateToken(token);
  if (!result.ok) return res.status(401).json(result);

  (req as AuthRequest).userId = result.value.sub;

  next();
};
