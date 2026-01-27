# Field Logic Engineering Standard

**Philosophy:** Solve it bluntly, then refine it. Abstraction is a reward for working code, not a prerequisite.

## The Core Process (The 5 Steps)

### 1. The Spec (The "What")

*Before opening a code file.*
Define the problem in plain English.

* **Goal:** What acts of physics must happen? (e.g., "Read file," "Print text").
* **Input:** What data do we have? (e.g., `Bun.argv`).
* **Output:** What result do we want? (e.g., `console.log` output).

### 2. The Blatant List (The "How")

*Inside the code file (or scratchpad).*
Write the solution as a numbered list of **physical actions** using code comments.

* *Rule:* No abstract terms (e.g., "Initialize Factory"). Use literal terms (e.g., "Create empty array").
* *Rule:* If you can't list the steps, you don't understand the problem yet.

### 3. The Draft (The "Vibecode")

*Underneath the comments.*
Write the code that fulfills the comment immediately above it.

* Do not delete the comments yet.
* Do not worry about variable names or "clean code." Just make it run.

### 4. The Verification (The "Proof")

*In the terminal.*
Prove the code works with a **One-Step Test**.

* Run the script.
* Check the output.
* *Rule:* Never trust code you haven't seen run.

### 5. The Harvest (The "Cleanup")

*Refactoring.*

* Rename variables to be descriptive.
* Extract complex logic into functions.
* **Harvesting:** If this logic is useful elsewhere, move it to a `packages/` library.
* Delete the "Blatant List" comments (or keep them as documentation).

---

## The "Patch Protocol" (Modifying Existing Files)

When adding a feature to an existing file (like `doc-gen`), do not rewrite the whole file.

1. **Locate:** Find the exact insertion point (e.g., inside the `for` loop).
2. **Inject Comments:** Write the Blatant List for the *new feature only* directly into the code.
3. **Implement:** Write the patch.
4. **Verify:** Run the tool to ensure the new feature works AND the old features didn't break.

---

### Step 2: Apply "The Patch Protocol" (Live Exercise)

Let's use your new standard to implement that `--verbose` flag in `doc-gen`.

**1. The Spec**

* **Goal:** User wants to see which files are being scanned.
* **Input:** CLI Flag `--verbose`.
* **Output:** Print `[DEBUG] Scanning: <filename>` to console.

**2. The Blatant List & 3. The Draft**
Open `packages/doc-gen/src/index.ts`. Here is how you apply the Standard to *patch* the `getFiles` function.

```typescript
// ... imports

// [PATCH START]
// 1. Check if arguments include the verbose flag
const isVerbose = args.includes("--verbose");
// [PATCH END]

// ... existing code ...

async function getFiles() {
  const glob = new Glob("**/*.{ts,tsx}");
  const files = [];
  
  for await (const file of glob.scan(SOURCE_DIR)) {
    // [PATCH START]
    // 2. IF verbose mode is on, print the filename
    if (isVerbose) {
      console.log(`[DEBUG] Found: ${file}`);
    }
    // [PATCH END]

    files.push(path.join(SOURCE_DIR, file));
  }
  return files;
}

```

**4. The Verification**
Run it without the flag (Old behavior):

```bash
bun run doc-gen ./src

```

*Result: Silent success.*

Run it *with* the flag (New behavior):

```bash
bun run doc-gen ./src --verbose

```

*Result: Lots of `[DEBUG] Found: ...` lines.*

### Why this is a "Standard"

You didn't just "hack it in." You followed a repeatable process.

1. You defined the input (`args`).
2. You listed the step (`if verbose -> print`).
3. You patched it in.

**Next Step:**
Commit your `PROCESS.md` file to the root of your repo.

```bash
git add PROCESS.md
git commit -m "docs: establish field logic engineering standard"

```

Do you feel the difference? You are no longer "guessing" how to code; you are executing a standard operating procedure.
