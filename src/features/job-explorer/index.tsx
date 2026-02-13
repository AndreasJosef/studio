import { useState } from 'react';

import { Job, JobResponseMeta } from '../../shared/types';
import ExplorerLayout from './components/ExplorerLayout';
import JobSearch from '../job-search';
import JobList from '../job-list';
import JobDetails from '../job-detail';
import { Route } from '../../routes/explore';
import { useNavigate } from '@tanstack/react-router';

/**
 * The JobExplorer features is the central hub composing search, list and details features.
 */
export default function JobExplorer() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [meta, setMeta] = useState<JobResponseMeta>({ total: 0 });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { q, id } = Route.useSearch();

  const navigate = useNavigate({ from: Route.fullPath });

  const updateUrl = (params: { q?: string; id?: string | undefined }) => {
    navigate({
      search: (prev) => ({
        ...prev,
        ...params,
        id: params.id === undefined ? undefined : params.id,
      }),
    });
  };

  return (
    <ExplorerLayout>
      <JobSearch
        onJobs={setJobs}
        setError={setError}
        setIsLoading={setIsLoading}
        setMeta={setMeta}
        searchTerm={q}
        onSearch={(newQuery) => updateUrl({ q: newQuery, id: undefined })}
      />
      <JobList
        query={q}
        jobs={jobs}
        error={error}
        isLoading={isLoading}
        jobsTotal={meta.total}
        selected={id}
        onSelected={(newId) => updateUrl({ id: newId })}
      />
      <JobDetails id={id} />
    </ExplorerLayout>
  );
}
