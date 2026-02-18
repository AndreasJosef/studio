import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  dialect: 'postgresql',
  out: './migrations',
  schema: './src/db/schema.ts',
  dbCredentials: {
    url:
      process.env.DATABASE_URL ||
      `postgres://jcadmin:${process.env.DATABASE_PASSWORD}@localhost:5432/job_chase_dev`,
  },
});
