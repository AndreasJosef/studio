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
  const style = isSelected
    ? 'mb-4 p-4 bg-zinc-800 rounded hover:cursor-pointer border-2 border-neutral-200'
    : 'mb-4 p-4 bg-zinc-800 rounded hover:cursor-pointer border-2 border-zinc-800';

  return (
    <li key={job.id} className={style} onClick={() => onClick(String(job.id))}>
      <article className="flex flex-col">
        <h2 className="text-xl font-semibold">{job.headline}</h2>
        <h3 className="text-lg text-neutral-400">{job.employer}</h3>
      </article>
    </li>
  );
}
