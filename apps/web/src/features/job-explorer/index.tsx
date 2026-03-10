import { useMemo, useState } from 'react';

import { Route } from '@/routes/_app-root.explore';

import { JobResponseMeta } from '@/shared/types';
import { JobListItem } from '@jobchaser/domain';

import PaginationControls from '@/shared/components/Pagination';
import JobSearch from '@/features/job-search';
import JobList from '@/features/job-list';
import JobDetails from '@/features/job-detail';
import ExplorerLayout from './components/ExplorerLayout';

import useExplorerActions from './actions/useExplorerActions';

import { useJobsSearch } from '@/features/job-search/loaders/useJobSearch';
import { useSyncSavedStatus } from './loaders/useSyncSavedStatus';
import { jobSyncProjection } from './logic/jobSyncProjection';

/**
 * The JobExplorer features is the central hub composing search, list and details features.
 */
export default function JobExplorer() {
  const { q, p, id } = Route.useSearch(); // query, page, job id

  const [jobs, setJobs] = useState<JobListItem[]>([]);
  const [meta, setMeta] = useState<JobResponseMeta>({ total: 0, pages: 0 });
  const [savedIds, setSavedIds] = useState<number[]>([]);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useJobsSearch(q, p, { onJobs: setJobs, setIsLoading, setError, setMeta });
  useSyncSavedStatus(jobs, setSavedIds);

  const { updateUrl, handleResultsPageChange, handleSearch } =
    useExplorerActions();

  const enrichedJobs = useMemo(
    () => jobSyncProjection(jobs, savedIds),
    [jobs, savedIds]
  );

  console.log(savedIds);

  return (
    <ExplorerLayout isDetailActive={!!id}>
      <JobSearch onSearch={handleSearch} />
      <>
        <JobList
          query={q}
          jobs={enrichedJobs}
          saved={savedIds}
          error={error}
          isLoading={isLoading}
          jobsTotal={meta.total}
          selected={id}
          onSelected={(newId) => updateUrl({ id: newId })}
          onSave={setSavedIds}
        />
        <PaginationControls
          currentPage={p}
          totalPages={meta.pages}
          onPageChange={handleResultsPageChange}
        />
      </>
      <JobDetails
        id={id}
        isSaved={savedIds.includes(Number(id))}
        onSave={setSavedIds}
        onBack={() => updateUrl({ id: undefined })}
      />
    </ExplorerLayout>
  );
}
