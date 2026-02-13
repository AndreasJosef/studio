import { useJobDetails } from './loaders/useJobDetails';
import { Detail } from '../../shared/components/Detail';

interface JobDetailProps {
  id: string | undefined;
  onBack: () => void;
}

export default function JobDetails({ id, onBack }: JobDetailProps) {
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
    <div className={`bg-indigo-500/10 p-4 ${isLoading ? 'animate-pulse' : ''}`}>
      <header className="gap-4 font-bold mb-4">
        <button
          className="md:hidden mb-4 text-indigo-500 cursor-pointer hover:underline"
          onClick={() => onBack()}
        >
          ← Back
        </button>
        <h2 className="text-3xl">{job.headline}</h2>
        <h3 className="text-xl text-neutral-400">{job.employer}</h3>
      </header>
      <div className="prose prose-indigo prose-invert prose-lg">
        <Detail nodes={job.description} />
      </div>
    </div>
  );
}
