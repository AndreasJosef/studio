import { eq } from 'drizzle-orm';

import { type Result, ok, fail } from '../shared/result.ts';
import { DomainErrorCode } from '../shared/errors.ts';

import { db, getDbErrorCode, PG_CODES } from '../db/client.ts';
import { jobsTable } from './schema.ts';

import type { CreateJob, StoredJob } from './types.ts';

/**
 * Job Actions Repository
 * These handle the actual persistence logic via the domain client. And always return an Result object
 */
export const jobActions = {
  async findAllFromUser(userid: string): Promise<Result<StoredJob[]>> {
    try {
      const jobs = await db
        .select()
        .from(jobsTable)
        .where(eq(jobsTable.userId, userid));

      return ok(jobs);
    } catch (e) {
      return fail('[DB ERROR] - Could not load jobs!');
    }
  },

  async storeJob(data: CreateJob): Promise<Result<StoredJob>> {
    try {
      const [created] = await db.insert(jobsTable).values(data).returning();

      return ok(created);
    } catch (e: unknown) {
      const code = getDbErrorCode(e);

      switch (code) {
        case PG_CODES.UNIQUE_VIOLATION:
          return fail(
            'This job already exists.',
            DomainErrorCode.CONSTRAINT_VIOLATION
          );
      }

      return fail('Could not save job!');
    }
  },
};
