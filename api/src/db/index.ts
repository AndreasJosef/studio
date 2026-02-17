import pg from 'pg';

export const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
});

// TODO: Figure out how to handle params typing for the query function
export const query = (text: string, params?: unknown[]) => {
  return pool.query(text, params);
};
