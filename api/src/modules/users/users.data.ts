import { pool } from '../../db/index.ts';

export const userData = {
  async createTestUser(name: string, email: string) {
    const query = `
      INSERT INTO users (email, password_hash, display_name)
      VALUES ($1, $2, $3)
      RETURNING id, email, display_name as "displayName";
    `;
    const value = [email, 'dummy_pw_hash', name];

    const { rows } = await pool.query(query, value);
    return rows[0];
  },
};
