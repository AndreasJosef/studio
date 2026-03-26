import { z } from 'zod';

// A helper to make sure that a null for a z string defaults to null
export const cleanString = z.preprocess(
  (val) => (val === null ? '' : val),
  z.string().default('')
);
