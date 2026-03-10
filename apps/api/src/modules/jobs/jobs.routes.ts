import { Router } from 'express';

import { ok, type SyncConfirmation } from '@jobchaser/domain';

import { asyncHandler } from '../../middleware/asyncHandler.ts';
import { authenticate, type AuthRequest } from '../../middleware/auth.ts';
import { validateReq } from '../../middleware/validate.ts';

import { jobsLogic } from './jobs.logic.ts';

import { JobSchema, fail } from '@jobchaser/domain';
import { jobActions } from '@jobchaser/domain/actions';

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
  validateReq(JobSchema),
  asyncHandler<AuthRequest>(async (req, res) => {
    const result = await jobsLogic.addJob(req.body, req.userId);

    if (!result.ok) {
      switch (result.code) {
        case 'DOMAIN_CONSTRAINT_VIOLATION':
          return res.status(409).json(result);
        default:
          return res.status(400).json(result);
      }
    }

    const confirmation: SyncConfirmation = {
      externalId: result.value.externalId,
      isSaved: true,
    };

    res.status(201).json(ok(confirmation));
  })
);

router.post(
  '/sync',
  authenticate,
  asyncHandler<AuthRequest>(async (req, res) => {
    const externalIds = req.body;

    if (!Array.isArray(externalIds)) {
      return res.status(400).json(fail('Invalid ID manifest.'));
    }

    const result = await jobActions.checkSavedStatus(req.userId, externalIds);

    if (!result.ok) {
      return res.status(500).json(result);
    }

    console.log(result);

    res.status(200).json(result);
  })
);

router.delete(
  '/:id',
  authenticate,
  asyncHandler<AuthRequest>(async (req, res) => {
    const result = await jobActions.deleteJob(
      Number(req.params.id),
      req.userId
    );

    if (!result.ok) {
      return res.status(500).json(result);
    }

    const confirmation: SyncConfirmation = {
      externalId: result.value.externalId,
      isSaved: false,
    };

    res.status(200).json(ok(confirmation));
  })
);

export default router;
