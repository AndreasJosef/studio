import { Router } from 'express';
import { userData } from './users.data.ts';

const router = Router();

router.post('/test', async (req, res) => {
  try {
    const { name, email } = req.body;

    const user = await userData.createTestUser(name, email);

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
