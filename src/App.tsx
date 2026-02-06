import { type Job } from './shared/types';

import { useDeferredValue, useEffect, useState } from 'react';
import { searchJobs } from './features/jobs/actions';
import { jobSearchProjection } from './features/jobs/projection';

import SearchBar from './SearchBar';
import JobList from './JobList';

/**
 * The main component containing the JobChaser App
 */
export default function App() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Makes sure the list filters smoothly
  const deferredSearch = useDeferredValue(searchTerm);

  // Syncing the list view with AF API
  useEffect(() => {
    searchJobs('stockholm typescript', setJobs, setIsLoading, setError);
  }, []);

  const handleSearchSubmit = () => {
    setJobs([]);
    searchJobs(searchTerm, setJobs, setIsLoading, setError);
  };

  const visibleJobs = jobSearchProjection(jobs, deferredSearch);

  return (
    <main className="p-4 md:max-w-3xl md:mx-auto">
      <header className="my-6 grid gap-4">
        <h1 className="text-3xl font-bold text-neutral-300 mb-3">
          Job<span className="text-indigo-700">Chaser</span>
        </h1>
        <SearchBar
          onSearch={handleSearchSubmit}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
      </header>
      <section>
        {isLoading && <p>Finding work for you...</p>}
        {error && <p className="text-red-500 text-2xl">{error}</p>}
        <JobList jobs={visibleJobs} filter={searchTerm} />
      </section>
    </main>
  );
}
