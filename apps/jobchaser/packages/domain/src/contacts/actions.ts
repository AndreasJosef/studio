import { eq } from 'drizzle-orm';

import { db } from '../db/client.ts';
import { contactsTable } from './schema.ts';

export const contactActions = {
  async ensureContact(email: string, name: string | null) {
    const [existing] = await db
      .select()
      .from(contactsTable)
      .where(eq(contactsTable.email, email));

    if (existing) return existing.id;

    const [created] = await db
      .insert(contactsTable)
      .values({ email, name })
      .returning();

    return created.id;
  },
};
