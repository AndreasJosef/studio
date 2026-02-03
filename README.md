# JobChaser

This project is a component of my **Personal Engineering Studio**—a monorepo environment designed for architectural consistency and rapid prototyping.

## Architecture & DX
I manage this studio within a **pnpm workspace**. This allows me to:
* **Share Logic:** Utilize a centralized library (`@studio/shared-utils`) for common operations.
* **Unified Tooling:** Maintain consistent code quality via root-level ESLint and Prettier configurations.
* **Lean Dependencies:** Reduce bloat by hoisting dev-tools to the workspace root.

## Getting Started (Standalone)
If you are reviewing this project outside of the Studio context, it is configured to be self-healing.

1. **Install:** `npm install` (or `pnpm install`)
2. **Dev:** `npm run dev`
3. **Build:** `npm run build`

## Tech Stack
* **Vite:** Build tool and HMR.
* **React 19:** UI Logic.
* **Tailwind CSS 4:** Styling engine.
* **TypeScript:** Type safety and documentation.

---
*Developed as part of my 2026 LIA Campaign —
[https://andreasjosef.se](https://andreasjosef.se)*
