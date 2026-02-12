import { useState } from 'react';

import { Job, JobResponseMeta } from '../../shared/types';
import ExplorerLayout from './components/ExplorerLayout';
import JobSearch from '../job-search';
import JobList from '../job-list';
import JobDetails from '../job-detail';

/**
 * The JobExplorer features is the central hub composing search, list and details features.
 */
export default function JobExplorer() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [meta, setMeta] = useState<JobResponseMeta>({ total: 0 });

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedJob, setSelectedJob] = useState<string | undefined>();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  return (
    <ExplorerLayout>
      <JobSearch
        onJobs={setJobs}
        setError={setError}
        setIsLoading={setIsLoading}
        setSearchTerm={setSearchTerm}
        searchTerm={searchTerm}
        setMeta={setMeta}
        onNewSearch={() => setSelectedJob(undefined)}
      />
      <JobList
        query={searchTerm}
        jobs={jobs}
        error={error}
        isLoading={isLoading}
        jobsTotal={meta.total}
        selected={selectedJob}
        onSelected={setSelectedJob}
      />
      <JobDetails id={selectedJob} />
    </ExplorerLayout>
  );
}
