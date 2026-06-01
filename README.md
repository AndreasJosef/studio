# Studio Monorepo

My personal engineering ecosystem. 

This monorepo enforces modular execution across fullstack applications, infrastructure tooling, and shared packages, all orchestrated through pnpm workspaces.

## Philosophy

Instead of monolithic blobs, this monorepo follows strict boundaries:

- **Domain-First Design:** Core business rules live within the application's domain packages, decoupled from transport layers, databases, or runtime engines.
- **Adapter-Driven Architecture:** Storage systems, third-party APIs, and external gateways are treated as pluggable adapters adhering to explicit interfaces.
- **Strict Type-Safety:** Zod schemas are the single source of truth for runtime validation — from database layers, through API endpoints, to the reactive UI.
- **Infrastructure-Agnostic:** No vendor lock-in. Infrastructure runs on Hetzner VPS with Podman containers orchestrated through Woodpecker CI.

## Directory Map

### Apps (`/apps`)

- **jobchaser** — Fullstack job tracking and management application. Built with React (Vite + Tailwind 4), Express, TanStack Router, and TanStack Query. Domain-driven validation through Zod and Drizzle ORM connects the API refinery, PostgreSQL persistence, and reactive frontend in a single type-safe pipeline.

  ```
  apps/jobchaser/
  ├── apps/
  │   ├── api/           # Express server — Zod-validated routes, middleware, and refinery logic
  │   └── web/           # React SPA — Vite, Tailwind 4, TanStack Router, Zustand
  └── packages/
      ├── domain/        # Core types, Zod schemas, Drizzle ORM definitions, CRUD actions
      └── shared/        # Cross-cutting utilities, HTML parsing helpers
  ```

### Packages (`/packages`)

- **`@studio/cdd-monitor`** — Custom TypeScript compiler lifecycle monitor. Tracks incremental `tsc --watch` output for fast feedback during development.
- **`@studio/create-backend`** — Scaffolding generator for new backend services. Bootstraps project structure with consistent conventions.
- **`@studio/db-manager`** — PostgreSQL management utilities with native `pg` client bindings.
- **`@field-logic/doc-gen`** — Documentation generator for the Field Logic specification system.

### Infrastructure (`/infra`)

- **`db/`** — Podman Compose definitions for the central PostgreSQL instance (`studio_db_central`), plus initialization scripts and seed data.

### Documentation (`/docs`)

- Architecture blueprints and the Field Logic specification system governing how intent is transformed into code primitives.

## Getting Started

### Prerequisites

- **Node.js** v24+
- **pnpm** (v10.30+)
- **Podman** or **Docker** (for the persistence layer)

### Installation

Install workspace dependencies from the monorepo root:

```bash
pnpm install
```

### Development

Boot the entire development infrastructure — applications, database, and package watchers:

```bash
pnpm dev
```

This triggers `pnpm -r --parallel dev`, running all workspace scripts concurrently.

### Useful Shortcuts

```bash
pnpm check          # Format + Lint + Type-check across all workspaces
pnpm create:backend # Scaffold a new backend service
pnpm db:shell       # Open a psql shell to the JobChaser database
pnpm db:root        # SSH into the central Postgres container
pnpm db:usage       # Show database disk usage for all databases
```

## Common Pitfalls

- **Container runtime not running:** The persistence layer requires Podman or Docker. Ensure the daemon is active before running `pnpm dev`.
- **Port 5432 conflict:** If a native PostgreSQL instance is running locally, it will hijack port 5432 and block the containerized database. Stop the local service before starting development.

## CI/CD

Deployment is handled by a Woodpecker CI pipeline (`.woodpecker.yml`) triggered on pushes to the `prod` branch:

1. Source is synced to the Hetzner VPS via `scp`
2. **JobChaser API:** Container built from `apps/jobchaser/apps/api/Dockerfile`, Drizzle migrations pushed via `drizzle-kit push`, deployed with Podman
3. **JobChaser Web:** Container built from `apps/jobchaser/apps/web/Dockerfile`, deployed with Podman

Both services run on the host network behind a Caddy reverse proxy handling automatic HTTPS.

## Monorepo Standards

- **Package Autonomy:** Each package manages its own dependencies, scripts, and build pipeline. Shared configurations live at the root (`tsconfig.base.json`, `eslint.config.js`).
- **pnpm Workspaces:** The root `pnpm-workspace.yaml` governs the `apps/` and `packages/` directories. Filtering (`pnpm --filter`) enables targeted script execution across the dependency graph.
