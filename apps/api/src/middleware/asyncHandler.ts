import type { Request, Response, NextFunction } from 'express';

/**
 * This middleware wraps an async handler
 * to catch any unexptected errors and forward them to a global error handler
 **/
export const asyncHandler = <T = Request>(
  fn: (req: T, res: Response, next: NextFunction) => Promise<unknown>
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req as unknown as T, res, next)).catch(next);
  };
};
