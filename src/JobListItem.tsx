import type { Job } from './shared/types';

interface JobListItemProbs {
  job: Job;
}

export default function JobListItem({ job }: JobListItemProbs) {
  return (
    <li className="mb-4 p-4 bg-zinc-800 rounded hover:cursor-pointer">
      <article className="mb-2 flex items-center flex-row-reverse gap-4">
        <div className="mr-auto">
          <h2 className="text-2xl font-semibold mb-2 ">{job.position}</h2>
          <ul className="flex gap-2.5">
            <li className="bg-neutral-700 text-indigo-400 px-2 py-1 rounded-xs">
              {job.location}
            </li>
            <li className="bg-neutral-700 text-neutral-500 px-2 py-1 rounded-xs">
              <ul>
                {job.tools.map((tool) => (
                  <li>{tool}</li>
                ))}
              </ul>
            </li>
            <li className="bg-neutral-700 text-neutral-500 px-2 py-1 rounded-xs">
              {job.contract}
            </li>
          </ul>
        </div>
        <img src={job.logo} alt={job.company} />
      </article>
    </li>
  );
}
