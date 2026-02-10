import { Job } from '@/shared/types';
import { useState } from 'react';
import { useJobDetails } from './providers/useJobData';

interface JobDetailProps {
  id: number;
}

export function JobDetails({ id }: JobDetailProps) {
  const { job, isLoading, error } = useJobDetails({ id });

  return (
    <>
      <h2>Details of job-id: {id}</h2>
      <p>{job?.headline}</p>
    </>
  );
}
