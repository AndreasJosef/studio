import express from 'express';
import type { Request, Response, NextFunction } from 'express';
import cookieParser from 'cookie-parser';

import { fail } from '@jobchaser/shared';

import userRoutes from './modules/users/users.routes.ts';

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());

app.use('/api/users', userRoutes);

app.get('/health', (req, res) => {
  res.json({
    status: 'online',
    timestamp: new Date().toISOString(),
  });
});

/**
 * Global Error Handler
 *  */
app.use((err: unknown, req: Request, res: Response, next: NextFunction) => {
  const isError = err instanceof Error;
  const message = isError ? err.message : 'Unknown Error';
  const stack = isError ? err.stack : 'No stack trace available';

  console.error(`[JOBCHASER SERVER ERROR ]: ${message}`);
  if (process.env.NODE_ENV !== 'production') {
    console.error(stack);
  }

  res.status(500).json(fail('Internal Server Error. Devs have been notified!'));
});

app.listen(PORT, () => {
  console.log('[ JobChaser API ] ONLINE at port: ', PORT);
});
