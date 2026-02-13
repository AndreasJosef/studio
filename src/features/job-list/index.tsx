import { Job } from '@/shared/types';

import JobListItem from './components/JobListItem';
import ListControls from './components/ListControls';
import { useState } from 'react';
import { selectableJobsProjection } from './logic/selectableJobsProjection';
import { useListActions } from './actions/useListActions';

interface JobListProps {
  jobs: Job[];
  query: string;
  error: string | null;
  isLoading: boolean;
  jobsTotal: number;
  selected: string | undefined;
  onSelected: (id: string) => void;
}

export default function JobList({
  jobs,
  error,
  isLoading,
  query,
  jobsTotal,
  onSelected,
  selected,
}: JobListProps) {
  // TODO: use a projected List based on filters
  const [filter, setFilter] = useState('');

  const { handleItemClick } = useListActions({ onSelect: onSelected });

  const displayJobs = selectableJobsProjection(jobs, selected);

  return (
    <div>
      {/* TODO: Better solution for messagin of loading states and error messages */}
      {isLoading && <p>Finding work for you...</p>}
      {error && <p className="text-red-500 text-2xl">{error}</p>}

      {jobs.length > 0 && (
        <h2>
          {jobsTotal} Results for: <span>{query}</span>
        </h2>
      )}

      {/*
      {displayJobs.length > 0 && (
        <ListControls currentFilter={filter} setFilter={setFilter} />
      )}
      */}

      <ul>
        {displayJobs.map((job) => (
          <JobListItem
            job={job}
            onClick={handleItemClick}
            isSelected={job.isSelected}
          />
        ))}
      </ul>
    </div>
  );
}
