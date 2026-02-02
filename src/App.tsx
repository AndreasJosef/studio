import { jobs } from "../data";
import JobList from "./JobList";

function App() {
  return (
    <main className="p-4 md:max-w-5xl md:mx-auto">
      <header className="mb-6">
        <h1 className="text-3xl">JobChaser</h1>
      </header>
      <section>
        <JobList jobs={jobs} />
      </section>
    </main>
  );
}

export default App;
