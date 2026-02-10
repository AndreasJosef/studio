import { Job } from './shared/types';
import { useState } from 'react';

import JobSearch from './features/job-search/index';
import JobList from './features/job-list';
import { JobResponseMeta } from './features/job-search/providers/useJobSearch';
import { JobDetails } from './features/job-detail';

/**
 * The main component containing the JobChaser App
 */
export default function App() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [meta, setMeta] = useState<JobResponseMeta>({ total: 0 });
  const [searchTerm, setSearchTerm] = useState('');
  //const [selectedJob, setSelectedJob] = useState<Job>();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  return (
    <div className="p-4 md:max-w-3xl md:mx-auto">
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
        />
        <JobList
          query={searchTerm}
          jobs={jobs}
          error={error}
          isLoading={isLoading}
          jobsTotal={meta.total}
        />
        <JobDetails id={30551680} />
      </main>
    </div>
  );
}
