import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { Job, JobResponseMeta } from '@/shared/types';
import { Route } from '@/routes/explore';

import JobSearch from '@/features/job-search';
import JobList from '@/features/job-list';
import JobDetails from '@/features/job-detail';

import { useJobsSearch } from '@/features/job-search/providers/useJobSearch';

import ExplorerLayout from './components/ExplorerLayout';

/**
 * The JobExplorer features is the central hub composing search, list and details features.
 */
export default function JobExplorer() {
  const { q, p, id } = Route.useSearch(); // query, page, job id
  const navigate = useNavigate({ from: Route.fullPath });

  const [jobs, setJobs] = useState<Job[]>([]);
  const [meta, setMeta] = useState<JobResponseMeta>({ total: 0, pages: 0 });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useJobsSearch(q, p, { onJobs: setJobs, setIsLoading, setError, setMeta });

  const updateUrl = (params: {
    q?: string;
    id?: string | undefined;
    p?: number;
  }) => {
    navigate({
      search: (prev) => ({
        ...prev,
        ...params,
        id: params.id === undefined ? undefined : params.id, // Make sure id really is undefinded so it dissapears form url
      }),
    });
  };

  return (
    <ExplorerLayout isDetailActive={!!id}>
      <JobSearch
        onSearch={(newQuery) => updateUrl({ q: newQuery, id: undefined, p: 1 })}
      />
      <JobList
        query={q}
        jobs={jobs}
        pages={meta.pages}
        error={error}
        isLoading={isLoading}
        jobsTotal={meta.total}
        selected={id}
        onSelected={(newId) => updateUrl({ id: newId })}
      />
      <JobDetails id={id} onBack={() => updateUrl({ id: undefined })} />
    </ExplorerLayout>
  );
}
