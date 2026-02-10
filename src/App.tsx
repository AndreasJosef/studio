import { Job } from './shared/types';
import { useState } from 'react';

import JobSearch from './features/job-search/index';

/**
 * The main component containing the JobChaser App
 */
export default function App() {
  const [jobs, setJobs] = useState<Job[]>([]);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  //const visibleJobs = jobSearchProjection(jobs, deferFilter);

  return (
    <div className="p-4 md:max-w-3xl md:mx-auto">
      <header className="my-6 grid gap-4">
        <h1 className="text-3xl font-bold text-neutral-300 mb-3">
          Job<span className="text-indigo-700">Chaser</span>
        </h1>
      </header>
      <main>
        <JobSearch
          setJobs={setJobs}
          setError={setError}
          setIsLoading={setIsLoading}
        />
        {isLoading && <p>Finding work for you...</p>}
        {error && <p className="text-red-500 text-2xl">{error}</p>}
        {/*<JobList jobs={jobs} filter={queryDraft} /> */}
        {jobs.map((job) => (
          <li key={job.id}>{job.headline}</li>
        ))}
      </main>
    </div>
  );
}
