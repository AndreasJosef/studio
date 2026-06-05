# Liquidaze: Project Blueprint & Domain Definition

**Date:** May 31, 2026
**Status:** Core Architecture Specification (V1.0)

---

## 1. Executive Summary & Core Mission

**Liquidaze** is, privacy-shielded daily companion built to solve a fundamental human friction: **calendars are built for viewing plans, not for creating them; journals excel at creation, but lack real-world temporal awareness.**

Liquidaze bridges this divide by functioning as an **Intent-to-State Compiler**. It consumes a single free-form narrative journal entry alongside external calendar constraints, handles the heavy cognitive logistics in the background, and outputs a living, ephemeral, time-based rendering of "the now." It is built explicitly for professionals who require deep focus, minimizing administrative friction to protect executive function and preserve personal sovereignty.

---

## 2. Core Vocabulary & World Model

To keep the codebase and the language unified, the system relies on an explicit taxonomy mapped from the underlying philosophy:

* **Aligned Engagement:** The target state of being fundamentally at ease with reality exactly as it is, while consciously directing finite energy into purposeful, intentional movement.
* **The 4 Rooms:** The distinct, isolated domains of engagement used to eliminate cognitive cross-contamination:
* **🪠 Plumbing:** Foundational baseline infrastructure (e.g., finances, runway, bills, physical chores, basic survival order). Stripped of all existential or creative pressure.
* **🏗️ Impact:** The domain of creation, code, deep work, and structural progress.
* **🤝 Connection:** The domain of relationships, family, depth, and mutual resonance. Treated as a low-pressure presence layer.
* **🌱 Renewal:** The domain of vitality, inhalation, rest, learning, and physical recovery.


* **Primary Anchor:** The single dominant mental posture assigned to a day (**PLUMBING**, **IMPACT**, or **RENEWAL**). It defines the baseline system constraint and serves as the internal semantic metric for a successful day.
* **Passengers:** Secondary domains present in a day. They are treated with zero pressure for perfection; they are carried along gently without demanding peak cognitive energy.
* **Solids:** Immovable external temporal realities (e.g., calendar meetings, appointments) parsed from external feeds. Water cannot pass through them; it must flow around them.
* **Liquids:** Fluid human intents parsed from the narrative journal. They have flexible spatial boundaries and adaptively fill the gaps between the Solids.
* **Gravity:** The behavioral patterns, transition frictions, and cognitive thresholds stored within the local profile that dictate *how* liquids naturally settle and pool around solids.

---

## 3. Core Domain Definition & Data Architecture

The system operates as a strict, unidirectional state pipeline running an **Input ➔ Process ➔ Output (IPO)** pattern. It intentionally rejects a static schedule database, opting instead for a **Live Projection Engine** calculated on the fly.

```
  ┌───────────────────────┐
  │  1. Liquid Input      │ ──┐
  │  (Messy Brain Dump)   │   │
  └───────────────────────┘   │
  ┌───────────────────────┐   │     ┌──────────────────┐     ┌─────────────────────┐
  │  2. Gravity (Memory)  │ ──┼────►│  4. LLM Router   │ ───►│ 5. Rendered Agenda  │
  │  (User Patterns DB)   │   │     │ (Zod Validation) │     │   (Zoomable UI)     │
  └───────────────────────┘   │     └──────────────────┘     └─────────────────────┘
  ┌───────────────────────┐   │
  │  3. Solids (Calendar) │ ──┘
  │  (Google/CalDAV API)  │
  └───────────────────────┘

```

### The System Pipeline Steps:

1. **The Journaling Pass (Input):** The user unloads unstructured thoughts into a minimalist typing canvas styled in warm ink-black (`#131311`) with an asymmetrical left margin gutter.
2. **The Constraint Scan:** The system executes a local background check, fetching fixed constraints (Solids) via a read-only iCal connection (`node-ical`), alongside behavioral tendencies (Gravity) from the local database.
3. **The Compilation Pass (Process):** The narrative text, solids, and active system constraint variables are passed through a secure local privacy-scrubbing engine (replacing PII with transient tokens like `Designer_A`) before being sent to an LLM. The LLM acts as a compiler, organizing the text into a time-informed sequence.
4. **The Runtime Validation:** The compiler output is strictly run through a `Zod` type-check schema. If it fails or is physically impossible, it runs a self-correcting patch pass before sending state to the frontend.
5. **The Live Projection (Output):** The verified JSON schema outputs an ephemeral, fluid vertical timeline. Selecting an active block triggers a "Zoom" action, rendering *only* the specific text block written for that hour, completely isolating the user from future task anxiety.

---

## 4. The Interactive Engine Loops

To protect the organic simplicity of the user interface while maintaining rigorous structural discipline underneath, the runtime implements two core structural interactions:

### Interaction A: The Validation Pass (Dry-Run & Patch)

Before a compiled agenda goes live, it is treated as an active draft.

* **The Adjust Mechanic:** The user can click an "Adjust" trigger on any generated block, opening a single-line text patch input.
* **The Execution:** The system runs a low-latency patch pass to mutate only that specific block, automatically rippling the time adjustments down through the remaining floating liquid blocks.

### Interaction B: The Garbage Collection Pass (Reflective Reset)

To eliminate backlog clutter and historical guilt, the schedule state evaporates at midnight. When initiating the next day's cycle, any uncompleted blocks enter a mandatory categorization pass:

* **Carry to Tomorrow:** The incomplete items are automatically appended directly into the next day's raw text area before writing begins.
* **Float to Memos:** The items move to a hidden right-hand side-drawer container as draggable raw text notes.
* **Archive to DB:** The semantic footprint is logged into the long-term pattern database as a deprioritized state, freeing active cognitive RAM.

---

## 5. Architectural Blueprints (Zod TypeScript Definition)

```typescript
import { z } from 'zod';

export const RoomTypeSchema = z.enum(['PLUMBING', 'IMPACT', 'CONNECTION', 'RENEWAL']);
export const TimeFlexibilitySchema = z.enum(['RIGID_SOLID', 'FLUID_LIQUID', 'OPEN_GAS']);

export const TimeBlockSchema = z.object({
  id: z.string(),
  room: RoomTypeSchema,
  title: z.string(),
  startTime: z.string(), // "HH:MM"
  endTime: z.string(),   // "HH:MM"
  isPassenger: z.boolean().default(false),
  
  // Sovereignty Enforcements
  sovereignty: z.object({
    rawNarrativeSegment: z.string(), // The exact raw paragraph user typed for this block
    flexibility: TimeFlexibilitySchema
  }),
  
  agendaItems: z.array(z.string()).optional()
});

export const LiquidazeDaySchema = z.object({
  date: z.string(), // "YYYY-MM-DD"
  primaryAnchor: RoomTypeSchema,
  systemConstraintFocus: z.string(),
  isAbsoluteWin: z.boolean().default(false),
  timeline: z.array(TimeBlockSchema)
});

export type LiquidazeDay = z.infer<typeof LiquidazeDaySchema>;
export type TimeBlock = z.infer<typeof TimeBlockSchema>;

```

---

## 6. Phase 1 Implementation Roadmap: The Walking Skeleton

To avoid feature creep and establish an immediate, working daily dogfooding cycle, the construction of the system is isolated to a minimalist surface area:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                       WALKING SKELETON TECH STACK                           │
├───────────────────┬─────────────────────────────────────────────────────────┤
│ Storage Layer     │ Flat Markdown files (`.md`) named by ISO Date stamp.    │
├───────────────────┼─────────────────────────────────────────────────────────┤
│ External Sync     │ Read-only private Google Calendar `.ics` URL fetch.      │
├───────────────────┼─────────────────────────────────────────────────────────┤
│ Compilation API   │ Edge route processing unstructured text into JSON arrays│
├───────────────────┼─────────────────────────────────────────────────────────┤
│ Client Interface  │ Single-page web canvas rendering the zoomable timeline.  │
└───────────────────┴─────────────────────────────────────────────────────────┘

```

### Future Evolution Note:

Once this core loop runs reliably for a sample size of one, the data architecture scales naturally into an intelligent **Cognitive Router**. The capture layer will leverage semantic vector embeddings to automatically intercept raw daily voice or text memos, routing actions back to Liquidaze while streaming architectural and long-term research notes straight to your secondary reference notes server.
