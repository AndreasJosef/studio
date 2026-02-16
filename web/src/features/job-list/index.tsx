import { Job } from '@/shared/types';

import JobListItem from './components/JobListItem';
//import ListControls from './components/ListControls';
//import { useState } from 'react';
import { selectableJobsProjection } from './logic/selectableJobsProjection';
import { useListActions } from './actions/useListActions';
import { JobListItemSkeleton } from './components/JobListItemSkeleton';

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
  onSelected,
  selected,
}: JobListProps) {
  // TODO: use a projected List based on filters
  //const [filter, setFilter] = useState('');

  const { handleItemClick } = useListActions({ onSelect: onSelected });

  const displayJobs = selectableJobsProjection(jobs, selected);

  return (
    <div>
      {/* TODO: Better solution for messagin of loading states and error messages */}
      {error && <p className="text-red-500 text-2xl">{error}</p>}

      {isLoading &&
        Array.from({ length: 5 }).map((_, i) => (
          <JobListItemSkeleton key={`skeleton-${i}`} />
        ))}

      {/*
      {displayJobs.length > 0 && (
        <ListControls currentFilter={filter} setFilter={setFilter} />
      )}
      */}

      <ul>
        {displayJobs.map((job) => (
          <JobListItem
            key={job.id}
            job={job}
            onClick={handleItemClick}
            isSelected={job.isSelected}
          />
        ))}
      </ul>
    </div>
  );
}
