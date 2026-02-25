import type { Request, Response, NextFunction } from 'express';

/**
 * This middleware wraps an async handler
 * to catch any unexptected errors and forward them to a global error handler
 **/
export const asyncHandler = (
  fn: (req: Request, res: Response, next: NextFunction) => Promise<unknown>
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};
