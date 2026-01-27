# The Field Logic Engineering Standard

**Version:** 1.0
**Philosophy:** Radical Reductionism & Atomic Composition.

---

## I. The Universal Cycle of Software (The "What")

*Every file and feature must answer exactly one of these five questions. Do not mix them.*

| Layer | The Question | The Role | File Suffix | Responsibility |
| --- | --- | --- | --- | --- |
| **1. Foundation** | *"What exists?"* | **Philosopher** | `types.ts` | Define reality (Interfaces, Types, Schemas). No logic allowed. |
| **2. Communicate** | *"How do we touch the world?"* | **Security Guard** | `io.ts` / `api.ts` | I/O. Read disk, fetch network, parse args. Validate raw chaos into Foundation types. |
| **3. Transformation** | *"How does A become B?"* | **Mathematician** | `parser.ts` / `model.ts` | Pure Logic. Input → Algo → Output. Zero side effects. |
| **4. Remember** | *"What is true right now?"* | **Librarian** | `store.ts` / `state.ts` | Persistence. Databases, caches, variables, state management. |
| **5. Reflect** | *"What is seen?"* | **Artist** | `view.ts` / `ui.tsx` | Projection. Rendering state to the screen/console. |

---

## II. The Workflow: From Idea to Reality (The "How")

*Do not skip steps. Speed comes from precision, not rushing.*

### Phase 1: The Spec

**Location:** `specs/00X-feature-name.md` or Scratchpad.
Define the physics of the problem in English.

* **Goal:** What needs to happen?
* **Input:** What raw material do we have? (e.g., `Bun.argv`)
* **Output:** What is the specific artifact produced?

### Phase 2: The Blatant List

**Location:** Inside the source file (Code Comments).
Write the solution as a numbered list of physical, undeniable actions.

* *Rule:* No abstract nouns (e.g., "Handle Auth"). Use physical verbs (e.g., "Check Header String").
* *Test:* If you can't list the steps, you don't understand the problem. **Stop and go back to Phase 1.**

### Phase 3: The Draft ("Vibecoding")

**Location:** Underneath the comments.
Write the code that fulfills the comment immediately above it.

* Focus on the "Happy Path" first.
* Do not delete the comments.

### Phase 4: The Verification (Atomic Testing)

**Location:** `terminal` or `*.test.ts`.
Prove the atom works in isolation.

* *Rule:* Never trust code you haven't seen run.
* *Method:* Write a one-off test or run the script manually to verify the Output matches the Spec.

### Phase 5: The Harvest (Refactor)

**Location:** `packages/` or Cleanup.

* **Clean:** Rename variables to match the Domain.
* **Abstract:** Move "Level 2" logic (regex, math) into `utils/` or `atoms/`.
* **Standardize:** Ensure the code respects the *Universal Cycle* (e.g., move I/O out of the Transformation layer).

---

## III. The Patch Protocol

*How to modify existing complex files safely.*

1. **Locate:** Find the exact insertion point (e.g., the specific loop).
2. **Inject Comments:** Write the *Blatant List* for the new feature *only*.
3. **Isolate:** If the logic is complex (>5 lines), write it as a separate function (Atom) first, then call it.
4. **Verify:** Run the tool. Ensure the new feature works AND old features remain unbroken.

---

## IV. The Monorepo Architecture

*How we organize to maximize leverage.*

### 1. The Workspace (`apps/*`)

* **Purpose:** The End Product.
* **Nature:** High "Reflection" (UI), High "Communication" (API). Low "Transformation" (Logic should be imported).
* **Rule:** Apps are consumers. They glue Packages together.

### 2. The Asset Factory (`packages/*`)

* **Purpose:** Reusable Leverage.
* **Nature:** Pure "Transformation" (Logic), Pure "Foundation" (Types).
* **Rule:** Packages must be isolated. They should not know about Apps.

### 3. The Harvest Cycle

1. Build a feature inside an App (e.g., a "Search Bar").
2. Realize it is useful elsewhere.
3. Extract the Logic ("Search Algo") to `packages/search`.
4. Import `@field-logic/search` back into the App.

---

### Next Step

To seal this in blood (so to speak), I recommend you commit this file immediately.

```bash
git add STANDARD.md
git commit -m "docs: codify field logic engineering standard"

```

Then, whenever you feel lost or overwhelmed, open `STANDARD.md`. It will tell you exactly which step you missed.
