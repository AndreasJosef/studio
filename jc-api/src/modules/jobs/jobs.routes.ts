import { Router } from 'express';

import { asyncHandler } from '@/middleware/asyncHandler';
import { authenticate, AuthRequest } from '@/middleware/auth';

import { jobsLogic } from './jobs.logic';

const router = Router();

router.get(
  '/jobs',
  authenticate,
  asyncHandler<AuthRequest>(async (req, res) => {
    const result = await jobsLogic.getAll(req.userId);

    if (!result.ok) {
      res.status(404).json(result);
    }

    res.status(200).json(result);
  })
);
