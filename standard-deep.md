# The Field Logic Engineering Standard

This is the operating manual for your studio. It is a living document, a consolidation of the insights you have gathered about the nature of software. It does not exist to constrain you, but to free you from the fatigue of decision-making. By following these principles, you trade the chaos of "guessing" for the certainty of "building."

### The Core Philosophy

We believe that complexity is an illusion caused by the entanglement of simple things. Therefore, the primary duty of the engineer is **Radical Reductionism**. We do not build complex systems; we build simple atoms and arrange them in meaningful patterns.

Every piece of software, from a single function to a compiled application, follows the same fractal pattern: it takes an input, processes it through a specific worldview, and produces a value. If you cannot describe your system in this way, you do not yet understand it.

---

### Phase I: Genesis

**The Discovery of the Program**

Before writing a single line of code, you must determine if a program deserves to exist. You do not start with a list of features. You start by locating **Tension**. Look for the friction in your current reality—the lie that your tools are telling you.

Once the tension is identified, you must form a **Radical Opinion**. This is the gravity well of your application. It is a declarative statement about how the world *should* work to resolve that tension. For example, "Movies are not content to be consumed; they are a collection to be curated."

This Opinion creates the **Macro-Atom**. Your program is not a loose collection of scripts; it is a single unit that transforms the user’s anxiety into relief. Any feature that does not directly serve this transformation is bloat and must be discarded.

The planning process is an act of creation, not form-filling. You begin with a **Braindump**, capturing the raw stream of consciousness, doubts, and requirements in a text file. You then **Refactor** this text as rigorously as you would refactor code, distilling it until only three truths remain: the **Goal** (the destination), the **Core** (the non-negotiable mechanics), and the **Boundary** (what you will ignore).

---

### Phase II: The Universal Physics

**The Five Questions of Existence**

When you move to architecture, you must recognize that every file in your system answers exactly one of five universal questions. Mixing these questions is the root of all technical debt. You must act as five distinct professionals, one at a time.

First, you act as the **Philosopher** to answer "What exists?" This is your **Foundation** layer (typically `types.ts`). Here, you define the nouns of your reality—interfaces, schemas, and types—without writing any logic. If you cannot name it, you cannot build it.

Second, you act as the **Security Guard** to answer "How does the world touch us?" This is your **Communication** layer (`io.ts`). The outside world is chaotic; your job is to read user input, disk files, or network requests and sanitize them into your clean Foundation types.

Third, you act as the **Mathematician** to answer "How does A become B?" This is your **Transformation** layer (`model.ts` or `parser.ts`). This is the realm of pure logic. It takes clean data, applies algorithms, and returns a result. It never touches the disk or the screen. It is pure, testable reasoning.

Fourth, you act as the **Librarian** to answer "What is true right now?" This is your **Memory** layer (`store.ts`). Without memory, there is no continuity, only unrelated instants. You must decide where the state lives—in a database, a variable, or a file.

Finally, you act as the **Artist** to answer "What is seen?" This is your **Reflection** layer (`view.ts`). You project the internal state onto a screen or console. Remember that the screen is not the reality; it is merely a shadow of the Memory.

---

### Phase III: The Workflow

**The Act of Creation**

When you sit down to code, you must resist the urge to immediately write syntax. Instead, follow the path of **The Blatant List**.

Open your source file and write the solution in plain English comments first. Create a numbered list of the physical, undeniable actions the computer must take. Avoid abstract terms like "Handle Authentication" and use literal terms like "Check the Authorization header string." If you cannot list the steps, you do not understand the problem, and you must return to the specification phase.

Once the steps are clear, you engage in **Drafting**. Write the code that fulfills each comment immediately below it. Do not worry about elegance yet; simply make the red lines disappear and the logic flow.

Verification follows immediately. You never trust code you have not seen run. Create a **One-Step Test**—a simple script or command—that proves your new atom works in isolation. Only after it is proven do you refine it.

Finally, you **Harvest**. You look at the code you have written and rename variables to match the domain language. You extract complex logic into helper functions. If you find a generic utility, you move it out of the application and into your shared packages, increasing the leverage of your entire studio.

---

### Phase IV: The System

**The Monorepo Architecture**

Your code lives in a unified ecosystem designed for leverage.

Your **Workspaces** (`apps/`) are the consumers. They are high in Reflection (UI) and Communication (I/O) but low in original Transformation. Their job is to glue things together to solve a specific user problem.

Your **Asset Factory** (`packages/`) is the producer. This is where your leverage lives. These packages contain pure Transformation logic and Foundation types. They are isolated, robust, and unaware of the specific apps that use them.

The ultimate cycle of your studio is the **Harvest Cycle**. You build a feature inside an app to solve an immediate need. When you realize that the logic is universal, you extract it into a package. In doing so, you solve the problem once and benefit from it forever. This is how you deepen your mastery: not by building more things, but by building a stronger foundation that makes future things effortless.
