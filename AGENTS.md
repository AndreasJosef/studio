# AGENTS.md

## Workspace

- Use **pnpm** (`pnpm@11.5.0`). `npm` / `yarn` will not work.
- This is a nested monorepo:
  - **Root** (`studio`): holds shared studio tooling (`packages/`), `docs/`, `infra/`, and CI.
  - **`apps/jobchaser/`**: the main app — itself a monorepo with sub-packages.
- `apps/jobchaser/apps/api/` and `apps/jobchaser/apps/web/` are deployable apps.
- `apps/jobchaser/packages/domain/` is the single source of truth for DB schemas, Zod models, and CRUD actions.

## Dev commands

From the **jobchaser root** (`apps/jobchaser/`):

| Command        | What it does                                                |
| -------------- | ----------------------------------------------------------- |
| `pnpm dev`     | Start **both** API (port 4000) and web (port 5173) in parallel |
| `pnpm dev:web` | Start only the Vite dev server                              |
| `pnpm dev:api` | Start only the Express dev server                           |
| `pnpm build`   | Build all packages                                          |
| `pnpm cdd`     | Type-check all packages in watch mode                       |

From the **studio root**:

| Command       | What it does                              |
| ------------- | ----------------------------------------- |
| `pnpm dev`    | Run `dev` script in **every** workspace   |
| `pnpm build`  | Build every workspace                     |
| `pnpm check`  | Format → lint → typecheck (full CI gate)  |
| `pnpm format` | Prettier                                  |
| `pnpm lint`   | ESLint                                    |

## TypeScript quirks

- **Node 24 native TypeScript** for the API: `node --watch --env-file=../../.env src/index.ts` — no `ts-node`, no `tsx`, no build step.
- The `.env` file is at `apps/jobchaser/.env` (two levels up from the API entrypoint).
- All `tsconfig.json` files extend `tsconfig.base.json` from the root. `noUnusedLocals` and `noUnusedParameters` are enabled globally.
- `@tanstack/router-plugin/vite` **auto-generates** `apps/jobchaser/apps/web/src/routeTree.gen.ts`. Never edit it by hand.

## Database

- **PostgreSQL** via Podman. Start with `podman compose -f infra/db/compose.yaml up -d` from the repo root.
- Local connection: `postgresql://jc_admin:jc_pass@localhost:5432/jobchaser_db`
- **Drizzle ORM** with schemas in `apps/jobchaser/packages/domain/src/`. Migrations in `apps/jobchaser/packages/domain/drizzle/`.
- To push schema changes: `drizzle-kit push` (run from the domain package).
- Root db shortcuts: `pnpm db:shell`, `pnpm db:list`, `pnpm db:usage`, `pnpm db:root`.

## Zod

- This project uses **Zod v4**. v3 APIs are incompatible — do not use v3 docs as reference.
- Every external boundary (API responses, DB rows, form inputs) is validated with Zod schemas defined in the `domain` package.
- Public package exports from `@jobchaser/domain` are managed via `src/index.ts` barrel. New types/schemas must be added there.

## Error handling pattern

The codebase uses a **Result<T>** pattern from `packages/domain/src/shared/result.ts`:

```ts
{ ok: true; value: T } | { ok: false; error: string; code?: AppErrorCode }
```

All API endpoints, DB actions, and frontend fetch wrappers return this shape. Do not throw exceptions for expected failure cases.

## Styling & formatting

- **Tailwind CSS v4** via `@tailwindcss/vite` plugin (no `postcss.config`).
- **Prettier**: single quotes, semicolons, 80 char width, trailing commas (ES5).
- **ESLint**: uses the flat config (`eslint.config.js`), with TypeScript, React, and React Refresh plugins.

## CI / Deploy

- CI is **Woodpecker** (`.woodpecker.yml`), triggered on pushes to the `prod` branch only.
- Deploy flow: `rsync` source to Hetzner VPS → build Podman images → `drizzle-kit push` → restart containers.

## Testing

- **No test framework** is configured (no Jest, Vitest, or Playwright).
- The only tests are in `apps/jobchaser/apps/api/tests/`: a shell script (`test.api.sh`) using `xh` for HTTP smoke tests.

## Known issues

- `@jobchaser/api` declares a dependency on `@jobchaser/utils` (`workspace:../../utils`), but `packages/utils/` is empty.
- `packages/ts-fetch/` is a dead directory with only stale `node_modules` — no source.