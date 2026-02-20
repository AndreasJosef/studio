# THE Studio MANUAL (Upated)

## I. The Philosophical Loop: "Wish to Signal"

The goal of architecture is to turn human **Intent** into a predictable system of **Signals** and **Projections**.

1. **The Wish:** *"It would be nice if [Intent]..."*
2. **The Signal:** Identify the Source of Truth. (Is it a URL Param? A Core Identity? A temporary Draft?)
3. **The Valve:** Create the transition mechanism that moves the signal.
4. **The Fractal:** If a Station becomes heavy, it is no longer a Station; it is a Hub. Sub-divide.

---

## II. The Classification of Primitives

When building a **Spec**, every logical unit must be classified to determine its home:

* **MECHANISM (lib/):** Generic physics. It doesn't know who we are. (e.g., `safeFetch`, `htmlParser`).
* **SIGNAL (core/):** The app's heartbeat. Foundations that define "State." (e.g., `AuthContext`, `ThemeOracle`).
* **PIPE (infra/):** External reality. Translates foreign API dialects into our domain. (e.g., `fetchJobsPipe`).
* **REFINER (logic/):** Pure projection. Turns "Ore" into "Steel." (e.g., `projectPaginationRange`).
* **VALVE (actions/):** Intent-to-state transition. (e.g., `onSearchCommit`).
* **PHANTOM (components/):** Stateless visual projections. (e.g., `JobListItemUI`).

---

## III. The Revised Physical Map

The map has evolved to separate **Agnostic Mechanism (`lib`)** from **Domain Foundations (`core`)**.

```text
src/
├── lib/                # MECHANISMS (Portable Utilities / External Engines)
├── core/               # SIGNALS (App-Specific Foundations: Auth, Identity)
├── shared/             # CONTRACTS (Domain Types / Interfaces)
├── infrastructure/     # PIPES (API Adapters / Refiners for external data)
├── features/           # STATIONS (The Intent Assemblies)
│   └── [feature-name]/
│       ├── loaders/    # ORACLES (Infrastructure Sync Hooks)
│       ├── logic/      # REFINERS (Pure Projections)
│       ├── actions/    # VALVES (Event-to-Signal Handlers)
│       ├── components/ # PHANTOMS (Local UI Projections)
│       └── index.tsx   # COMPOSITION ROOT (The Assembly)
└── routes/             # HUBS (The URL Orchestrators)

```

---

## IV. The Station Handshake (The Blueprint)

Every **Composition Root (`index.tsx`)** follows a 5-step assembly line:

1. **Ingest (Signals):** Collect signals from the **Hub** (URL) or **Core** (Auth).
2. **Extract (Loaders):** Request "Raw Ore" from the **Infrastructure Pipes**.
3. **Refine (Logic):** Process ore through **Refiners** to derive the view state.
4. **Wire (Actions):** Attach **Valves** to user triggers.
5. **Project (Phantoms):** Map refined data to the **Stateless UI Layer**.

---

## V. The Three Golden Constraints

### 1. The Purity of Logic

The `logic/` folder must remain **React-Agnostic**. No `useState`, no `useEffect`, no JSX. It is a math lab where we test the "Brain" without the "Body."

### 2. The Static UI

Phantoms in `components/` should be purely functional. If a component is "doing things" (fetching, calculating), it is not a Phantom—it is a Feature. Move the "doing" to the **Composition Root**.

### 3. The Signal Source

Data should always flow from the **highest relevant Signal**. If three features need the same data, the **Hub (Route)** owns the Loader and passes the data down.

---

## VI. The Fractal UI Trick: Ghost Layering (Refined)

For high-end **Grafisk Formgivning** (like the Auto-complete or Job Skeletons):

* **Back-Layer (The Ghost):** A decorative, non-interactive visual (`pointer-events-none`).
* **Front-Layer (The Reality):** The functional input or interactive surface.
* **Sync Logic:** A **Refiner** ensures the Ghost and Reality are perfectly aligned via CSS Layout math.

---

### THE FINAL INTUITION

When you open this repository, you aren't looking at "Screens." You are looking at a **Data Refinery**.

* **Ore** (Raw Data) enters via **Infrastructure**.
* **Power** (Identity) is supplied by **Core**.
* **Processing** (Logic) happens in the **Stations**.
* **Consumption** (The User) happens at the **Valves**.

---

**Would you like me to create the first Spec file for our Auth feature following this updated blueprint?** We can define the **Intent**, the **Signals** it requires from `@core`, and the **Pipes** it needs from `@infra`. Shall we?
