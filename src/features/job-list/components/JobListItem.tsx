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
      <article className="mb-2 flex items-center flex-row-reverse gap-4">
        <div className="mr-auto">
          <h2 className="text-2xl font-semibold mb-2 ">
            {job.headline}
            <span className="text-neutral-400">
              {' | '}
              {job.employer}
            </span>{' '}
          </h2>
          {/*
          <div className="flex gap-2.5 text-neutral-400">
            {job.description.substring(0, 200)}...
          </div>
          <p>{job.contactName}</p>
          <p>{job.contactEmail}</p>
          */}
          <div className="flex"></div>
        </div>
        <div className="w-36">
          <img
            className="w-full rounded-full"
            src={job.logoUrl}
            alt={job.employer}
          />
        </div>
      </article>
    </li>
  );
}
