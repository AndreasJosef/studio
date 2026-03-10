import { JobListItem } from '@jobchaser/domain';

import { selectableJobsProjection } from './logic/selectableJobsProjection';
import { useListActions } from './actions/useListActions';

import { useDelayedLoading } from '@/shared/hooks/useDelayedLoading';

import JobListItemUI from './components/JobListItem';
import JobListItemSkeleton from './components/JobListItemSkeleton';

interface JobListProps {
  jobs: JobListItem[];
  saved: number[];
  query: string;
  error: string | null;
  isLoading: boolean;
  jobsTotal: number;
  selected: string | undefined;
  onSelected: (id: string) => void;
  onSave: React.Dispatch<React.SetStateAction<number[]>>;
}

export default function JobList({
  saved,
  jobs,
  error,
  isLoading: rawLoading,
  onSelected,
  onSave,
  selected,
}: JobListProps) {
  // TODO: use a projected List based on filters
  const { handleItemClick } = useListActions({ onSelect: onSelected });

  const isLoading = useDelayedLoading(rawLoading);
  const displayJobs = selectableJobsProjection(jobs, selected);

  return (
    <div>
      {/* TODO: Better solution for messagin of loading states and error messages */}
      {error && <p className="text-red-500 text-2xl">{error}</p>}

      {isLoading &&
        Array.from({ length: 5 }).map((_, i) => (
          <JobListItemSkeleton key={`skeleton-${i}`} />
        ))}

      {!isLoading && (
        <ul>
          {displayJobs.map((job) => (
            <JobListItemUI
              key={job.externalId}
              job={job}
              onClick={handleItemClick}
              onSave={onSave}
              isSelected={job.isSelected}
              isSaved={saved.includes(job.externalId)}
            />
          ))}
        </ul>
      )}
    </div>
  );
}
