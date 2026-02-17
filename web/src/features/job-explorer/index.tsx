import { useState } from 'react';
import { Job, JobResponseMeta } from '@/shared/types';
import { Route } from '@/routes/_app-root.explore';

import ExplorerLayout from './components/ExplorerLayout';
import JobSearch from '@/features/job-search';
import JobList from '@/features/job-list';
import JobDetails from '@/features/job-detail';
import PaginationControls from '@/shared/components/Pagination';

import { useJobsSearch } from '@/features/job-search/loaders/useJobSearch';
import useExplorerActions from './actions/useExplorerActions';

/**
 * The JobExplorer features is the central hub composing search, list and details features.
 */
export default function JobExplorer() {
  const { q, p, id } = Route.useSearch(); // query, page, job id

  const [jobs, setJobs] = useState<Job[]>([]);
  const [meta, setMeta] = useState<JobResponseMeta>({ total: 0, pages: 0 });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useJobsSearch(q, p, { onJobs: setJobs, setIsLoading, setError, setMeta });

  const { updateUrl, handleResultsPageChange, handleSearch } =
    useExplorerActions();

  return (
    <ExplorerLayout isDetailActive={!!id}>
      <JobSearch onSearch={handleSearch} />
      <>
        <JobList
          query={q}
          jobs={jobs}
          error={error}
          isLoading={isLoading}
          jobsTotal={meta.total}
          selected={id}
          onSelected={(newId) => updateUrl({ id: newId })}
        />
        <PaginationControls
          currentPage={p}
          totalPages={meta.pages}
          onPageChange={handleResultsPageChange}
        />
      </>
      <JobDetails id={id} onBack={() => updateUrl({ id: undefined })} />
    </ExplorerLayout>
  );
}
