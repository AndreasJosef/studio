import { useJobDetails } from './loaders/useJobDetails';

interface JobDetailProps {
  id: string | undefined;
}

export default function JobDetails({ id }: JobDetailProps) {
  const { job, isLoading, error } = useJobDetails({ id });

  if (error)
    return <h2 className="text-red-500 font-semibold">Error Loading Load</h2>;

  if (!job)
    return (
      <h2 className="text-neutral-500 text-center mt-10">
        Selected a job to view details
      </h2>
    );

  return (
    <div className={`p-4 ${isLoading ? 'animate-pulse' : ''}`}>
      <header className="gap-4 font-bold mb-4">
        <h2 className="text-3xl">{job.headline}</h2>
        <h3 className="text-xl text-neutral-400">{job.employer}</h3>
      </header>
      <div
        className="text-lg flex flex-col gap-4"
        // Not ideal but trusting it since it comes from AF. Ideally should sanitize the
        // formatted response text into a json object tree and create the html my self form that
        dangerouslySetInnerHTML={{ __html: job.description }}
      ></div>
    </div>
  );
}
