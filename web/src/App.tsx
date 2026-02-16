import { Job, JobResponseMeta } from './shared/types';

import { useState } from 'react';

import JobSearch from './features/job-search';
import JobList from './features/job-list';
import JobDetails from './features/job-detail';

/**
 * The main component containing the JobChaser App
 */
export default function App() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [meta, setMeta] = useState<JobResponseMeta>({ total: 0 });

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedJob, setSelectedJob] = useState<string | undefined>();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  return (
    <div className="p-4 md:max-w-5xl md:mx-auto">
      <header className="my-6 grid gap-4">
        <h1 className="text-3xl font-bold text-neutral-300 mb-3">
          Job<span className="text-indigo-700">Chaser</span>
        </h1>
      </header>
      <main>
        <JobSearch
          onJobs={setJobs}
          setError={setError}
          setIsLoading={setIsLoading}
          setSearchTerm={setSearchTerm}
          searchTerm={searchTerm}
          setMeta={setMeta}
          onNewSearch={() => setSelectedJob(undefined)}
        />
        <section className="flex gap-4">
          <div className="w-1/2">
            <JobList
              query={searchTerm}
              jobs={jobs}
              error={error}
              isLoading={isLoading}
              jobsTotal={meta.total}
              selected={selectedJob}
              onSelected={setSelectedJob}
            />
          </div>

          <div className="w-1/2">
            <JobDetails id={selectedJob} />
          </div>
        </section>
      </main>
    </div>
  );
}
