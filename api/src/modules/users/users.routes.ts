import { Router } from 'express';

import { userTable } from './users.data.ts';
import { authLogic } from './users.logic.ts';
import { validateReq } from '../../middleware/validate.ts';

import { loginSchema, signupSchema } from '@jobchaser/shared';

const router = Router();

router.post('/signup', validateReq(signupSchema), async (req, res) => {
  const result = await authLogic.signup(req.body);

  if (!result.ok) {
    return res.status(400).json(result);
  }

  res.status(201).json(result);
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = loginSchema.parse(req.body);
    const user = await authLogic.login(email, password);
    res.status(200).json(user);
  } catch (e) {
    console.log(e);
  }
});

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
