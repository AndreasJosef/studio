# JobChaser – Fullstack Project

JobChaser is a modern, high-performance web application designed to scout, track, and manage job applications. This project was developed as a capstone assignment for the Fullstack JavaScript program at **Chas Academy**.

The core philosophy of the project is the "Refinery" architecture: transforming raw data from external sources through strict domain-driven validation, ensuring data integrity from the database all the way to the reactive UI.

## 🏗 Technical Architecture & Type Safety

The backbone of this project is **End-to-End Type Safety**, preventing corrupt data from entering the system's core.

### Domain-Driven Validation (Zod + Drizzle)
* **API Refinery:** To handle external data (e.g., from the Swedish Public Employment Service), **Zod** is used to transform and validate external payloads into internal domain types before they are consumed.
* **Persistence Layer:** Using **Drizzle ORM**, our domain schemas are mirrored directly in PostgreSQL, eliminating the "type drift" often found between database schemas and application code.
* **Middleware Logic:** The backend utilizes custom Express middlewares that validate incoming requests against Zod schemas, rendering our controllers 100% type-safe.

### Advanced Data Fetching
I have developed a custom **Type-Safe Fetch Wrapper**. This allows us to inject Zod schemas into every fetch call, providing automatic type inference and validation in a single step. This layer is architected for a seamless migration to **TanStack Query**.

## 📁 Project Structure (Monorepo)

The project is organized as a **pnpm monorepo** to enforce separation of concerns and enable shared code between the frontend and backend.

```text
.
├── apps
│   ├── api          # Express Server (Backend Refinery)
│   └── web          # React Application (Vite + Tailwind 4)
├── packages
│   ├── domain       # Core: Schema, DB Client, Types & Validation
│   └── shared       # Shared utilities, helpers, and constants
├── BACKLOG.md       
├── NEXT.md          
└── README.md
```

### 🧠 The `@jobchaser/domain` Package
This is the "heart" of the system, serving as the **Single Source of Truth**:
* **Database Client:** Configuration and connection handling for PostgreSQL.
* **Schemas & Actions:** Table definitions and all CRUD operations encapsulated as type-safe functions.
* **Transformations:** Zod schemas describing domain objects and the allowed data transformations within the system.

## 🌐 Distribution & Deployment

The project is deployed on a dedicated Linux server (**Hetzner**) using a modern container-based architecture.

### Infrastructure Overview
* **Reverse Proxy (Caddy):** Automatically handles HTTPS (SSL) and directs traffic (`/api/*` to backend, all other traffic to frontend).
* **Application Layer (Podman):** Both frontend and backend run as isolated OCI containers (`node:24-slim`) for maximum security and minimal image size.
* **Monorepo Build:** Containers are built from the root directory to give the Docker build context access to all local dependencies in `/packages`.
* **Deployment Pipeline:** A manual pipeline using `rsync` for synchronization and `drizzle-kit push` to ensure the database schema always matches the production code.

## 🛠 Future Enhancements & Next Steps

* **State & Caching:** Complete the integration of **TanStack Query** to optimize network requests and user experience.
* **UI Stability:** Implement a global error and success component (Error Boundaries/Toasts) for clearer user feedback.
* **Responsiveness:** Further refine the layout for 100% optimization across all screen sizes (Mobile-First approach).
* **Feature Completion:** Enable backend logic in the UI for the automatic extraction of contacts and email addresses from job descriptions.
* **Fluid Architecture:** Migrate remaining frontend components to a fully "slice-based" functional development model.

---

## 🛠 Tech Stack
* **Frontend:** React (Vite), Tailwind 4, TanStack Router, Zustand.
* **Backend:** Node.js (Express), Zod, Drizzle ORM.
* **Infrastructure:** PostgreSQL, Caddy, Podman, Hetzner Cloud.


