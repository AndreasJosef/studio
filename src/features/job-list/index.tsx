import { Job } from '@/shared/types';

import JobListItem from './components/JobListItem';
import ListControls from './components/ListControls';
import { useState } from 'react';

interface JobListProps {
  jobs: Job[];
  query: string;
  error: string | null;
  isLoading: boolean;
  jobsTotal: number;
}

export default function JobList({
  jobs,
  error,
  isLoading,
  query,
  jobsTotal,
}: JobListProps) {
  // TODO: use a projected List based on filters
  const [filter, setFilter] = useState('');
  const filteredJobs = jobs;

  const showHeading = jobs.length > 0;

  return (
    <>
      {/* TODO: Better solution for messagin of loading states and error messages */}
      {isLoading && <p>Finding work for you...</p>}
      {error && <p className="text-red-500 text-2xl">{error}</p>}

      {showHeading && (
        <h2>
          {jobsTotal} Results for: <span>{query}</span>
        </h2>
      )}

      {filteredJobs.length > 0 && (
        <ListControls currentFilter={filter} setFilter={setFilter} />
      )}
      <ul>
        {filteredJobs.map((job) => (
          <JobListItem job={job} />
        ))}
      </ul>
    </>
  );
}
