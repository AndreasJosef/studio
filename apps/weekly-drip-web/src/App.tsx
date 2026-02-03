/**
 * @description
 * The main root component of the Weekly Drip application.
 * Contains the global layout and theme providers.
 */
import "./App.css";
import { setState, useStore } from "./store";

/**
 * The primary application container.
 * @returns The rendered application
 *
 * In here the question becomes what is ultimately the most stable layout of the app.
 */
export default function App() {
  const title = useStore((s) => s.test);

  return (
    <main>
      <h1>Weekly Drip Calculator</h1>
      <h2>{title}</h2>
      <nav>
        <button onClick={() => setState({ test: "hallo" })}>Add Item</button>
        <button>List/Groups</button>
      </nav>
      <section className="results">
        <li>Cost or Salary Item</li>
        <li>Cost or Salary Item</li>
        <li>Cost or Salary Item</li>
        <li>Cost or Salary Item</li>
        <li>Cost or Salary Item</li>
      </section>
    </main>
  );
}
