import { Router } from 'express';

import { asyncHandler } from '../../middleware/asyncHandler.ts';
import { authenticate, type AuthRequest } from '../../middleware/auth.ts';
import { validateReq } from '../../middleware/validate.ts';

import { jobsLogic } from './jobs.logic.ts';
import { CreateJobSchema } from '@jobchaser/domain';

const router: Router = Router();

// Get All jobs for user
router.get(
  '/',
  authenticate,
  asyncHandler<AuthRequest>(async (req, res) => {
    const result = await jobsLogic.getAll(req.userId);

    if (!result.ok) {
      res.status(404).json(result);
      return;
    }

    res.status(200).json(result);
  })
);

// Add Job
router.post(
  '/',
  authenticate,
  validateReq(CreateJobSchema),
  asyncHandler<AuthRequest>(async (req, res) => {
    const result = await jobsLogic.addJob(req.body);

    if (!result.ok) {
      switch (result.code) {
        case 'DOMAIN_CONSTRAINT_VIOLATION':
          return res.status(409).json(result);
        default:
          return res.status(400).json(result);
      }
    }

    res.status(201).json(result);
  })
);

export default router;
