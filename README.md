# Studio

My personal engineering ecosystem built from scratch.

This monorepo houses my transition from years of tinkering to professional Fullstack JS engineering. Every line of code, from the reactive engine to the security protocols, is evolved from a blank slate and documented weekly.

## The Stack
- **Manager:** pnpm workspaces
- **Tooling:** Turborepo / TypeScript
- **Infrastructure:** Hetzner VPS (Debian) / Nginx
- **Philosophy:** No templates. No bloat. Native APIs only.

## Ecosystem Map
### Apps
- `personal-site`: The Living Document / Homepage.
- `weekly-drip`: A budget tool built on a custom Vanilla TS reactive engine.
- `identity-signer`: A privacy-first tool using the Web Crypto API for digital attestations.
- `sl-optimizer`: A performance-focused Stockholm transit tool using `fetchSafe`.

### Packages (Internal)
- `@shared/utils`: Core utilities including `fetchSafe` (Type-safe API wrapper).
- `@shared/engine`: A custom-built Pub/Sub reactive store.

## The Rhythm
I ship every Friday. You can track the architectural evolution in the "Dev Logs" on the live site.
