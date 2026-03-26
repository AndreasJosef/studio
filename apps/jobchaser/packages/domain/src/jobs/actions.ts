import { and, eq, inArray } from 'drizzle-orm';

import { type Result, ok, fail } from '../shared/result.ts';
import { DomainErrorCode } from '../shared/errors.ts';

import { db, getDbErrorCode, PG_CODES } from '../db/client.ts';
import { jobsTable } from './schema.ts';

import { contactsTable } from '../contacts/schema.ts';
import { contactActions } from '../contacts/actions.ts';

import { mapContactJoinToJob } from './mappers.ts';
import type {
  ApplicationStatus,
  Job,
  JobRecord,
  SyncConfirmation,
} from './types.ts';

/**
 * Job Actions Repository
 * These handle the actual persistence logic via the domain client. And always return an Result object
 */
export const jobActions = {
  async findAllFromUser(userid: string): Promise<Result<Job[]>> {
    try {
      const rows = await db
        .select()
        .from(jobsTable)
        .leftJoin(contactsTable, eq(jobsTable.contact, contactsTable.id))
        .where(eq(jobsTable.userId, userid));

      const jobs = rows.map(mapContactJoinToJob);

      return ok(jobs);
    } catch (e) {
      return fail('[DB ERROR] - Could not load jobs!');
    }
  },

  async storeJob(data: Job, userid: string): Promise<Result<JobRecord>> {
    try {
      let contactId: string | null = null;

      if (data.contactEmail) {
        contactId = await contactActions.ensureContact(
          data.contactEmail,
          data.contactName
        );
      }

      const [created] = await db
        .insert(jobsTable)
        .values({
          externalId: data.externalId,
          jobTitle: data.jobTitle,
          employer: data.employer,
          description: data.description,
          applyBy: data.applyBy,
          logoUrl: data.logoUrl,
          userId: userid,
          contact: contactId,
        })
        .returning();

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

  async checkSavedStatus(
    userId: string,
    externalIds: number[]
  ): Promise<Result<number[]>> {
    try {
      if (externalIds.length === 0) return ok([]);

      const existing = await db
        .select({ externalId: jobsTable.externalId })
        .from(jobsTable)
        .where(
          and(
            eq(jobsTable.userId, userId),
            inArray(jobsTable.externalId, externalIds)
          )
        );

      const savedIds = existing.map((row) => row.externalId);

      return ok(savedIds);
    } catch (e) {
      console.error(e);
      return fail('[DB ERROR] - Could not sync job status.');
    }
  },

  async deleteJob(id: number, userid: string): Promise<Result<JobRecord>> {
    try {
      const [deleted] = await db
        .delete(jobsTable)
        .where(and(eq(jobsTable.externalId, id), eq(jobsTable.userId, userid)))

        .returning();

      if (!deleted) {
        return fail('Job not found in DB');
      }

      /**
       * TODO: Implement Orphaned Contact Cleanup
       * In the future, might trigger a check here:
       * 1. Count remaining jobs for deleted.contactId
       * 2. If count === 0, emit a 'CONTACT_ORPHANED' signal to the UI
       * 3. Let the user decide to keep or purge the recruiter.
       */

      return ok(deleted);
    } catch (error) {
      return fail('Error when trying to delete job!');
    }
  },

  async updateStatus(
    id: number,
    userid: string,
    newStatus: ApplicationStatus
  ): Promise<Result<SyncConfirmation>> {
    const [updated] = await db
      .update(jobsTable)
      .set({ applicationStatus: newStatus })
      .where(and(eq(jobsTable.externalId, id), eq(jobsTable.userId, userid)))
      .returning();

    if (!updated) return fail('Not Authorized or Job does not exist');

    return ok({
      externalId: updated.externalId,
      applicationStatus: updated.applicationStatus,
    });
  },
};
