import { type Job } from './shared/types';
import { type Result, ok, fail } from './core/result';

import { useEffect, useState } from 'react';
import { fetchSafeList } from './core/api-engine';

import SearchBar from './SearchBar';
import JobList from './JobList';

/**
 * A function that safely parses the response from AF API as the Job type. Wraps the response into a Railway Result
 */
function parseAFJobs(input: unknown): Result<Job> {
  if (!input || typeof input !== 'object') {
    return fail('Invalid data: Not an object');
  }

  // Ignoring any here because here is where the raw data form the API enters the system
  // eslint-disable-next-line
  const data = input as Record<string, any>;

  if (!data.id || !data.headline) {
    return fail('Invalid data: No Valid AF API response');
  }

  // Map external keys to internal the internal Job Type
  // Making this valuable via searching the reponse for contact information -> This can become an address book
  return ok({
    id: data.id || '',
    headline: data.headline || '',
    description: data.description.text || '',
    employer: data.employer.name || '',
    logoUrl: data.logo_url || 'No Logo',
    contactName:
      data.application_contacts[0]?.name ||
      data.employer.url ||
      data.employer.url ||
      'No Name',
    contactEmail:
      data.application_contacts[0]?.email ||
      data.application_details.email ||
      data.employer.email ||
      'No Email',
  });
}

/**
 * The main component containing the JobChaser App
 */
export default function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [jobs, setJobs] = useState<Job[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // TDOD: refactor the whoel searchJobs into an action
    const searchJobs = async () => {
      setIsLoading(true);
      setError(null);

      const result = await fetchSafeList(
        'https://jobsearch.api.jobtechdev.se/search?q=react%20stockholm&limit=100',
        parseAFJobs
      );

      // Hnadling the railway result tracks
      if (result.ok) {
        setJobs(result.value);
      } else {
        setError(result.error);
      }
      setIsLoading(false);
    };

    searchJobs();
  }, []); // empty deps array means this runs once on mount

  return (
    <main className="p-4 md:max-w-3xl md:mx-auto">
      <header className="my-6 grid gap-4">
        <h1 className="text-3xl font-bold text-neutral-300 mb-3">
          Job<span className="text-indigo-700">Chaser.</span>
        </h1>
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </header>
      <section>
        {isLoading && <p>Finding work for you...</p>}
        {error && <p className="text-red-500 text-2xl">{error}</p>}
        <JobList jobs={jobs} filter={searchTerm} />
      </section>
    </main>
  );
}
