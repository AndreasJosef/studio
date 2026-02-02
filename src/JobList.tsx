import { type Job } from "./shared/types";

import JobListItem from "./JobListItem";

interface JobListProps {
  jobs: Job[];
}

export default function JobList({ jobs }: JobListProps) {
  return (
    <ul className="inline-block">
      {jobs.map((job) => (
        <JobListItem job={job} />
      ))}
    </ul>
  );
}
