import { useState } from 'react';

import { JobDetailView, JobListItem } from '@jobchaser/domain';
import { Bookmark, BookmarkCheck, Loader2 } from 'lucide-react';

import { jobsService } from '@/services/jobchaser/jobs.service';

interface ToggleProps {
  job: JobDetailView | JobListItem;
  isSaved: boolean;
  setSavedIds: React.Dispatch<React.SetStateAction<number[]>>;
}

export function ToggleJobButton({ job, isSaved, setSavedIds }: ToggleProps) {
  const [isPending, setIsPending] = useState(false);

  const handleToggle = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsPending(true);

    const serviceOperation = isSaved
      ? () => jobsService.deleteJob(job.externalId)
      : () => jobsService.saveJob(job);

    const result = await serviceOperation();

    if (result.ok) {
      const { externalId, isSaved: newStatus } = result.value;

      setSavedIds((prev) => {
        if (newStatus) return [...prev, externalId];
        return prev.filter((id) => id !== externalId);
      });
    }

    setIsPending(false);
  };

  return (
    <button onClick={handleToggle} disabled={isPending}>
      {isPending ? (
        <Loader2 className="animate-spin" />
      ) : isSaved ? (
        <BookmarkCheck className="w-8 h-8 fill-indigo-500 stroke-indigo-500" />
      ) : (
        <Bookmark className="w-8 h-8 " />
      )}
    </button>
  );
}
