import type { Job } from "./shared/types";

interface JobListItemProbs {
  job: Job;
}

export default function JobListItem({ job }: JobListItemProbs) {
  console.log(job);
  return (
    <li className="mb-4 p-4 bg-zinc-800 rounded">
      <header className="flex items-center flex-row-reverse gap-4">
        <h2 className="text-2xl font-semibold mb-2 mr-auto">{job.position}</h2>
        <img src={job.logo} alt={job.company} />
      </header>
    </li>
  );
}
