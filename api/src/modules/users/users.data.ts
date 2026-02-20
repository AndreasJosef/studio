import { eq } from 'drizzle-orm';
import { db, pool } from '../../db/index.ts';
import { type newUser, users } from '../../db/schema.ts';

export const userTable = {
  async createUser(data: newUser) {
    const result = await db.insert(users).values(data).returning();

    return result[0];
  },

  async findByEmail(email: string) {
    const result = await db.select().from(users).where(eq(users.email, email));

    return result[0];
  },

  /**
   * @note - not active anymore leaving it here for reference why to showcase how to use the pg driver directly without on ORM
   * **/
  async createTestUser(name: string, email: string) {
    const sqlString = `
      INSERT INTO users (email, password_hash, display_name)
      VALUES ($1, $2, $3)
      RETURNING id, email, display_name as "displayName";
    `;
    const value = [email, 'dummy_pw_hash', name];

    const { rows } = await pool.query(sqlString, value);
    return rows[0];
  },
};
