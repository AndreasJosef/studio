import { useJobDetails } from './providers/useJobData';

interface JobDetailProps {
  id: string | undefined;
}

export default function JobDetails({ id }: JobDetailProps) {
  const { job, isLoading, error } = useJobDetails({ id });

  if (isLoading)
    return (
      <h2 className="font-semibold italic text-neutral-400">
        Loading Job Detail...
      </h2>
    );

  if (error)
    return <h2 className="text-red-500 font-semibold">Error Loading Load</h2>;

  if (!job)
    return (
      <h2 className="text-neutral-500 text-center mt-10">
        Selected a job to view details
      </h2>
    );

  return (
    <div className="border-2 border-neutral-200 p-4 rounded">
      <header className="gap-4 font-bold mb-4">
        <h2 className="text-2xl">{job.headline}</h2>
        <h3 className="text-xl text-neutral-400">{job.employer}</h3>
      </header>
      <p>{job.description}</p>
    </div>
  );
}
