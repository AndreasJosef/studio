import { type JobListItem } from '@jobchaser/domain';
import { Bookmark } from 'lucide-react';

interface JobListItemProbs {
  job: JobListItem;
  onClick: (id: string) => void;
  isSelected: boolean;
  isSaved: boolean;
}

export default function JobListItemUI({
  job,
  onClick,
  isSelected,
  isSaved,
}: JobListItemProbs) {
  const styleComputed = isSelected
    ? 'bg-indigo-500/10 border-indigo-500/60'
    : 'bg-zinc-800 border-zinc-800';

  return (
    <li
      key={job.externalId}
      className={`mb-4 p-4 rounded hover:cursor-pointer border-2 hover:border-indigo-500/60 transition-colors ${styleComputed}`}
      onClick={() => onClick(String(job.externalId))}
    >
      <article className="flex flex-col">
        <div className="flex justify-between gap-4">
          <h2 className="text-xl font-semibold truncate">{job.jobTitle}</h2>
          <div>
            <Bookmark
              fill={isSaved ? 'var(--color-indigo-700)' : 'none'}
              stroke={
                isSaved ? 'var(--color-indigo-700)' : 'var(--color-gray-500)'
              }
            />
          </div>
        </div>
        <h3 className="text-lg text-neutral-400 truncate">{job.employer}</h3>
      </article>
    </li>
  );
}
