import { Router } from 'express';

import {
  fail,
  ok,
  CreateUserSchema,
  LoginSchema,
  AuthErrorCode,
} from '@jobchaser/domain';

import { authLogic } from './users.logic.ts';
import { authenticate } from '../../middleware/auth.ts';
import { validateReq } from '../../middleware/validate.ts';
import { asyncHandler } from '../../middleware/asyncHandler.ts';

import { jwtService } from '../../services/jwt.service.ts';

const router: Router = Router();

// Signup
router.post(
  '/signup',
  validateReq(CreateUserSchema),
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
  validateReq(LoginSchema),
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
    res.clearCookie('auth_token', {
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
    // get the actual user from the db
    if (!req.userId)
      return res
        .status(401)
        .json(fail('Invalid credentials', AuthErrorCode.INVALID_CREDENTIALS));

    const result = await authLogic.getMe(req.userId);

    if (!result.ok) {
      res.clearCookie('auth_token');
      res.status(404).json(result);
    }

    res.status(200).json(result);
  })
);

export default router;
