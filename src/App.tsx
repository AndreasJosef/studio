import { type JSX } from 'react';
import { jobs } from '../data';

import SearchBar from './SearchBar';
import JobList from './JobList';

/**
 * The main component containing the JobChaser App
 * @returns {JSX.Element}
 */
export default function App(): JSX.Element {
  return (
    <main className="p-4 md:max-w-5xl md:mx-auto">
      <header className="my-6 grid gap-4">
        <h1 className="text-3xl font-bold text-neutral-300 mb-3">
          Job<span className="text-indigo-700">Chaser.</span>
        </h1>
        <SearchBar />
      </header>
      <section>
        <JobList jobs={jobs} />
      </section>
    </main>
  );
}
