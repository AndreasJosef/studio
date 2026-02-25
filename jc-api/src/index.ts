import express from 'express';
import type { Request, Response, NextFunction } from 'express';

import cookieParser from 'cookie-parser';
import cors from 'cors';

import userRoutes from './modules/users/users.routes.ts';

const PORT = process.env.PORT || 3000;
const app = express();

app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
);
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
 * Final safety net. If something lands here it is a critical system error. Everything else I handled with domain error codes and railway repsonses innan
 **/
app.use((err: unknown, req: Request, res: Response, next: NextFunction) => {
  const isError = err instanceof Error;
  const message = isError ? err.message : 'Unknown Error';

  console.error(`[JOBCHASER SYSTEM ERROR ]: ${message}`);

  res.status(500).json({
    ok: false,
    error: 'Unexpected error. We are on it!',
    code: 'INTERNAL_SERVER_ERROR',
  });
});

app.listen(PORT, () => {
  console.log('[ JobChaser API Status ] Online at port: ', PORT);
});
