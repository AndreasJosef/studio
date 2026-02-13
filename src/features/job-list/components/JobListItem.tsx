import { Job } from '@/shared/types';

interface JobListItemProbs {
  job: Job;
  onClick: (id: string) => void;
  isSelected: boolean;
}

export default function JobListItem({
  job,
  onClick,
  isSelected,
}: JobListItemProbs) {
  const styleComputed = isSelected
    ? 'bg-indigo-500/10 border-indigo-500/60'
    : 'bg-zinc-800 border-zinc-800';

  return (
    <li
      key={job.id}
      className={`mb-4 p-4 rounded hover:cursor-pointer border-2 hover:border-indigo-500/60 transition-colors ${styleComputed}`}
      onClick={() => onClick(String(job.id))}
    >
      <article className="flex flex-col">
        <h2 className="text-xl font-semibold truncate">{job.headline}</h2>
        <h3 className="text-lg text-neutral-400 truncate">{job.employer}</h3>
      </article>
    </li>
  );
}
