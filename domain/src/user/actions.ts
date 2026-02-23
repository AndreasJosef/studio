import { eq } from 'drizzle-orm';

import { db } from '../db/client.ts';
import { usersTable } from './schema.ts';

import type { User, CreateUserDB } from './types.ts';

/**
 * User Actions Repository
 * These handle the actual persistence logic via the domain client.
 */
export const userActions = {
  async createUser(data: CreateUserDB): Promise<User> {
    const [result] = await db.insert(usersTable).values(data).returning();

    return result;
  },

  async findByEmail(email: string): Promise<User | undefined> {
    const [result] = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, email));

    return result;
  },
};
