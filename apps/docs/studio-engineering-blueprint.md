# THE FIELD LOGIC BLUEPRINT

## I. The Philosophical Loop: "Wish to Primitive"

The goal of architecture is to turn human **Intent** into a predictable system of **Primitives**.

1. **The Wish:** Start with: *"It would be nice if..."* (The User Intent).
2. **The Soul:** Identify the core logical transformation (The Primitive).
3. **The Fractal:** If any part of the solution feels complex, treat it as a new "Wish" and repeat.

---

## II. The Spec Template (The Thinking Tool)

*File: `src/specs/[feature-name].md*`

### 1. Intent

Describe the user goal in plain language.

### 2. Core Primitive

Classify the transformation:

* **Integrity:** Does it validate or ensure correctness? (e.g., Parsers).
* **Pipe:** Does it move data from A to B? (e.g., API utilities).
* **Projection:** Does it derive a new view from existing data? (e.g., Filters).
* **Gate:** Does it allow/deny access? (e.g., Permissions).

### 3. Architecture

Decompose into the four standard stations:

* **Data Provider:** The source of truth (Oracle).
* **Domain Logic:** The pure, testable refinery (Math/Logic).
* **UI Layer:** The stateless visual projection (Phantom).
* **Actions:** The intent-to-state transition (Handover).

---

## III. The File Structure (The Physical Map)

This map ensures that the implementation of a spec never requires guessing.

```text
src/
├── core/                # Global Infrastructure (Integrity/Pipe Primitives)
├── components/          # Global UI Atoms (UI Layer Primitives)
├── features/            # Feature Assemblies (The Intent)
│   └── [feature-name]/
│       ├── providers/   # Data Provider (API Hooks)
│       ├── logic/       # Domain Logic (Pure Functions / Projections)
│       ├── actions/     # Actions (Event Handlers)
│       ├── components/  # Local UI Layer (Feature-specific visuals)
│       └── index.tsx    # COMPOSITION ROOT (The Assembly)

```

---

## IV. The Station Definitions (The Content)

### 1. Data Provider (`providers/`)

* **Role:** Manage data lifecycle (Fetch, Cache, Sync).
* **Constraint:** Returns raw data. Does not know about UI formatting.

### 2. Domain Logic (`logic/`)

* **Role:** The "Brain." It calculates ViewModels and Projections.
* **Constraint:** **Pure Functions only.** No React imports. No Side-effects. Highly testable.

### 3. UI Layer (`components/`)

* **Role:** The "Body." It handles layout, layering, and styling.
* **Constraint:** **Stateless.** Receives everything via props. Uses Tailwind for orchestration.

### 4. Actions (`actions/`)

* **Role:** The "Nervous System." It translates events into state changes.
* **Constraint:** Encapsulates the logic of the transition (e.g., what happens on a Tab key).

---

## V. The Composition Root (`index.tsx`)

The `index.tsx` is the **Orchestrator**. It follows a standard assembly line pattern:

1. **Ingest:** Receive state (Local `useState`, Props, or URL Hooks).
2. **Fetch:** Call the **Data Provider** to get raw data.
3. **Refine:** Pass raw data + state into **Domain Logic** to get a **Projection**.
4. **Connect:** Wire **Actions** to the projection and state-setters.
5. **Project:** Pass everything into the **UI Layer**.

---

## VI. The Fractal UI Trick: Layering

For features like Ghost-Text, we use the **Phantom Layering** primitive:

* **Relative Container:** Establishes the coordinate system.
* **Absolute Bottom Layer:** The decorative ghost (Pointer-events: none).
* **Transparent Top Layer:** The interactive input (The Reality).
* **Invisible Spacer:** Uses a `text-transparent` version of the user's input to align the ghost text perfectly.

---

## The Final Intuition

When you open your monorepo, you are no longer looking at code. You are looking at a **Data Refinery**.

* **Raw Ore** comes in through the **Data Provider**.
* It is **Processed** by the **Domain Logic**.
* It is **Packaged** by the **UI Layer**.
* The **Customer (User)** interacts via **Actions**.
