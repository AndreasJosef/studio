import { type AppErrorCode } from './errors.ts';

/**
 * A standard container for an operation that might fail.
 * This is based on the Railway pattern.
 */
export type Success<T> = {
  ok: true;
  value: T;
};

export type Failure = {
  ok: false;
  error: string;
  code?: AppErrorCode;
};

export type Result<T> = Success<T> | Failure;

export const ok = <T>(value: T): Success<T> => ({
  ok: true,
  value,
});

export const fail = (error: string, code?: AppErrorCode): Failure => ({
  ok: false,
  error,
  code,
});
