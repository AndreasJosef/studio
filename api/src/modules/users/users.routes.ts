import { Router } from 'express';
import { ok } from '@jobchaser/shared';
import { loginSchema, signupSchema } from '@jobchaser/shared';

import { userTable } from './users.data.ts';
import { authLogic } from './users.logic.ts';
import { authenticate } from '../../middleware/auth.ts';
import { validateReq } from '../../middleware/validate.ts';
import { asyncHandler } from '../../middleware/asyncHandler.ts';
import { jwtService } from '../../services/jwt.service.ts';

const router: Router = Router();

// Signup
router.post(
  '/signup',
  validateReq(signupSchema),
  asyncHandler(async (req, res) => {
    const result = await authLogic.signup(req.body);

    if (!result.ok) {
      return res.status(400).json(result);
    }

    const token = jwtService.generateToken(result.value.id);

    res.cookie('auth_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // if in production only https
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(201).json(result);
  })
);

// Login
router.post(
  '/login',
  validateReq(loginSchema),
  asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const result = await authLogic.login(email, password);

    if (!result.ok) return res.status(401).json(result);

    res.cookie('auth_token', result.value.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // if in production only https
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(200).json(ok(result.value.user));
  })
);

// Logout
router.post(
  '/logout',
  asyncHandler(async (req, res) => {
    res.clearCookie('auth_tooken', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    });

    res.status(200).json(ok('Token revoked and logged out!'));
  })
);

// Me
router.get(
  '/me',
  authenticate,
  asyncHandler(async (req, res) => {
    res.status(200).json(ok({ userId: req.userId }));
  })
);

// TEST AREA
// Simulating an unhandled error to test global error handler middleware
router.get(
  '/detonate',
  asyncHandler(async (req, res) => {
    throw new Error('KABOOM!');
  })
);

router.post('/test', async (req, res) => {
  try {
    const { name, email } = req.body;
    const user = await userTable.createTestUser(name, email);
    res.status(201).json({
      message: 'DB working',
      user,
    });
  } catch (e) {
    console.error('DB failed: ', e);
    res.status(500).json({ error: 'Failed to create users' });
  }
});

export default router;
