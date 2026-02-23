import type { Request, Response, NextFunction } from 'express';

import { ZodObject, ZodError } from 'zod';
import { fail } from '@jobchaser/utils';

export const validateReq =
  (schema: ZodObject) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      req.body = await schema.parseAsync(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json(fail(error.message) || 'Invalid Input');
      }

      return res.status(400).json(fail('Invalid request'));
    }
  };
