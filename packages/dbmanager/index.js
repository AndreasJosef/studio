import pkg from 'pg';
const { Client } = pkg;

export async function ensureDatabaseExists() {
  const { PROJECT_NAME, DB_USER, DB_PASS, ROOT_DB_URL } = process.env;

  const client = new Client({ connectionString: ROOT_DB_URL });

  try {
    await client.connect();

    // Create User
    await client.query(`DO $$ BEGIN IF NOT EXISTS (SELECT FROM pg_catalog.pg_user WHERE usename = '${DB_USER}') 
                        THEN CREATE USER ${DB_USER} WITH PASSWORD '${DB_PASS}'; END IF; END $$;`);

    // Create Database
    const res = await client.query(
      `SELECT 1 FROM pg_database WHERE datname = '${PROJECT_NAME}'`
    );
    if (res.rowCount === 0) {
      await client.query(`CREATE DATABASE ${PROJECT_NAME} OWNER ${DB_USER}`);
      console.log(`✅ [DB-Manager] Created ${PROJECT_NAME}`);
    }
  } catch (err) {
    console.error('❌ [DB-Manager] Init failed:', err.message);
  } finally {
    await client.end();
  }
}
