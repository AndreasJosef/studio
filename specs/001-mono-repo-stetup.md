# 001-mono-repo-stetup

### 1. The Monorepo Logic (The "Why")

In your `~/studio`, the relationships are simple:

- **Packages** are your **Factory**: They produce tools (like `fetchSafe` or your `reactive-engine`). They don't run on their own.
- **Apps** are your **Showrooms**: They consume the tools. Your Personal Site, Weekly Drip, and School projects all "import" from the Factory.

**The Relationship:** If you improve the Factory (e.g., add error logging to `fetchSafe`), every Showroom gets the upgrade immediately. No copy-pasting.

---

### 2. The Bare-Metal Setup Checklist

This is your "Day 1" sequence. Do this in your Sway terminal.

#### Step A: Initialize the Studio

- [ ] `mkdir ~/studio && cd ~/studio`
- [ ] `pnpm init`
- [ ] Create `pnpm-workspace.yaml`:

```yaml
packages:
  - 'apps/*'
  - 'packages/*'
```

- [ ] Create `tsconfig.base.json` (as discussed) to anchor your types.

#### Step B: The Factory (`packages/shared-utils`)

- [ ] `mkdir -p packages/shared-utils/src`
- [ ] `cd packages/shared-utils && pnpm init`
- [ ] Name it `@studio/shared-utils` in its `package.json`.
- [ ] Create `src/index.ts` and paste your `fetchSafe` code.

#### Step C: The Showrooms (`apps/`)

- [ ] **Personal Site:** `mkdir -p apps/personal-site`. Create your `index.html` with the "Evolved from Scratch" copy.
- [ ] **Weekly Drip:** `mkdir -p apps/weekly-drip`.
- [ ] **School Project:** `cd apps && git submodule add [School-URL]`.

---

### 3. The "Studio Manual" (How to work)

#### Adding a Tool to an App

If `weekly-drip` needs `fetchSafe`:

1. Go to `apps/weekly-drip/package.json`.
2. Add: `"@studio/shared-utils": "workspace:*"` to dependencies.
3. Run `pnpm install` in the root.

#### The Coding Workflow (1-2 Hours)

1. **Launch:** Open Neovim in the root of `~/studio`.
2. **Code:** Work in `apps/` but if you write a utility that seems useful elsewhere, move it to `packages/`.
3. **Check:** Run `pnpm lint` or `pnpm format` from the root before you finish.

#### The Git Workflow (Conventional)

- [ ] Use `arch:` for these initial setup commits.
- [ ] Use `feat:` for your CSS and HTML work on the personal site.
- [ ] Use `docs:` for your first log entry.

---

### 4. Your "Friday Ship" Checklist

Before 17:00 this Friday, Feb 6:

1. **Status Check:** Is the Personal Site live on Hetzner?
2. **Log #01:** Is `apps/personal-site/posts/01-monorepo.html` written?
3. **Cleanliness:** Did you run `pnpm format` to make everything look intentional?
4. **The Push:** `git push origin main`.
5. **The Pull:** `ssh` to Hetzner and pull the latest changes.

---

### 5. Remembering the "Field Logic"

Because you are building this from "blank files," remember:

- **No classes** until you need to style two things the same way.
- **No frameworks** until the Vanilla TS version is too painful to manage.
- **No bloat.** Your Neovim is fast because your code is lean.

**Would you like me to generate the "First Principles" README for your `shared-utils` package so that even your internal tools look professional?**
