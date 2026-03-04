import { createSelectSchema } from 'drizzle-zod';
import { contactsTable } from './schema.ts';
import z from 'zod';

export const ContactRecordSchema = createSelectSchema(contactsTable);
export type ContactRecord = z.infer<typeof ContactRecordSchema>;
