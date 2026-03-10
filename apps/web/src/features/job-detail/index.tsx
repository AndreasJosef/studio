import { useEffect, useRef } from 'react';

import { useJobDetails } from './loaders/useJobDetails';

import { ToggleJobButton } from '@/shared/components/ToggleJobButton';
import { Detail } from '@/shared/components/Detail';

interface JobDetailProps {
  id: string | undefined;
  isSaved: boolean;
  onBack: () => void;
  onSave: React.Dispatch<React.SetStateAction<number[]>>;
}

export default function JobDetails({
  id,
  isSaved,
  onBack,
  onSave,
}: JobDetailProps) {
  const { job, error } = useJobDetails({ id });
  const scrollResetRef = useRef<HTMLDivElement>(null);

  // Reset Scroll when new detail is loaded
  useEffect(() => {
    if (scrollResetRef.current) {
      scrollResetRef.current.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, [id]);

  if (error)
    return <h2 className="text-red-500 font-semibold">Error Loading Job</h2>;

  if (!job)
    return (
      <h2 className="text-lg text-neutral-500 text-center mt-10">
        Selected a job to view details
      </h2>
    );

  return (
    <div
      ref={scrollResetRef}
      className="h-full overflow-y-auto rounded-lg bg-indigo-500/10 p-4 scroll-smooth"
    >
      <header className="gap-4 font-bold mb-4 flex justify-between">
        <div>
          <button
            className="md:hidden mb-4 text-indigo-500 cursor-pointer hover:underline"
            onClick={() => onBack()}
          >
            ← Back
          </button>
          <h2 className="text-3xl text-balance">{job.jobTitle}</h2>
          <h3 className="text-xl text-neutral-400 text-balance">
            {job.employer}
          </h3>
          <p>email: {job.contactEmail}</p>
        </div>
        <ToggleJobButton job={job} isSaved={isSaved} setSavedIds={onSave} />
      </header>
      <div className="prose prose-indigo prose-invert prose-lg">
        <Detail nodes={job.description} />
      </div>
    </div>
  );
}
