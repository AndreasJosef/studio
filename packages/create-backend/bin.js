#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Locate the Monorepo Root
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const monorepoRoot = path.resolve(__dirname, '../../');
const appsDir = path.join(monorepoRoot, 'apps');

const projectName = process.argv[2];
if (!projectName) {
  console.error('❌ Usage: pnpm studio-gen <project-name>');
  process.exit(1);
}

const targetDir = path.join(appsDir, projectName);

if (fs.existsSync(targetDir)) {
  console.error(`❌ Project "${projectName}" already exists in apps/`);
  process.exit(1);
}

// 2. Setup Logic & Credentials
fs.mkdirSync(targetDir, { recursive: true });

// Assign a port based on existing apps (starts at 3000)
const existingApps = fs.readdirSync(appsDir).length;
const appPort = 3000 + existingApps;

// Generate unique credentials for this project
const dbUser = `${projectName.replace(/-/g, '_')}_admin`;
const dbPass = Math.random().toString(36).slice(-10);
const dbName = projectName.replace(/-/g, '_');

// 3. Create the .env File
const envContent = `# Project Identity
PROJECT_NAME=${dbName}
PORT=${appPort}

# Master credentials for the Smart-Init package
ROOT_DB_URL=postgresql://studio_root:master_pass@localhost:5432/postgres

# Private Project Credentials
DB_USER=${dbUser}
DB_PASS=${dbPass}
DATABASE_URL=postgresql://${dbUser}:${dbPass}@localhost:5432/${dbName}
`;

fs.writeFileSync(path.join(targetDir, '.env'), envContent);

// 4. Create the project files
const pkgJson = {
  name: `@studio/${projectName}`,
  version: '1.0.0',
  type: 'module',
  scripts: {
    'db:init': 'node --env-file=.env init-db.js',
    predev: 'pnpm db:init',
    dev: 'node --watch --env-file=.env index.js',
    'db:shell': `PGPASSFILE=.pgpass psql -h localhost -p 5432 -U ${dbUser} ${dbName}`,
  },
  dependencies: {
    '@studio/db-manager': 'workspace:*',
    pg: '^8.11.0',
  },
};

// Create the .pgpass file
// Format: hostname:port:database:username:password
const pgPassContent = `localhost:5432:${dbName}:${dbUser}:${dbPass}`;
const pgPassPath = path.join(targetDir, '.pgpass');

fs.writeFileSync(pgPassPath, pgPassContent);

// Postgres requires 0600 permissions
fs.chmodSync(pgPassPath, 0o600);

// 6. Add to .gitignore automatically
fs.appendFileSync(path.join(targetDir, '.gitignore'), '\n.env\n.pgpass\n');

const initJs = `import { ensureDatabaseExists } from '@studio/db-manager';\nawait ensureDatabaseExists();`;
const indexJs = `console.log("🚀 ${projectName} live on port " + process.env.PORT);\nconsole.log("🔗 Connecting to: " + process.env.DATABASE_URL);`;

fs.writeFileSync(
  path.join(targetDir, 'package.json'),
  JSON.stringify(pkgJson, null, 2)
);
fs.writeFileSync(path.join(targetDir, 'init-db.js'), initJs);
fs.writeFileSync(path.join(targetDir, 'index.js'), indexJs);

console.log(`\n✨ Successfully created @studio/${projectName} in studio/apps/`);
console.log(`👉 To start: cd apps/${projectName} && pnpm dev`);
