/**
 * @description
 * The main root component of the Weekly Drip application.
 * Contains the global layout and theme providers.
 */
import AuditPage from "./audit/AuditPage";
import "./App.css";

/**
 * The primary application container.
 * @returns The rendered application
 *
 * In here the question becomes what is ultimately the most stable layout of the app.
 */
export default function App() {
  return (
    <>
      <h1>Weekly Drip</h1>
      <nav></nav>
      <AuditPage />
    </>
  );
}
