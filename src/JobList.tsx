import { type Job } from './shared/types';

import JobListItem from './JobListItem';

interface JobListProps {
  jobs: Job[];
  filter: string;
  mode: 'search' | 'filter';
}

export default function JobList({ jobs, filter }: JobListProps) {
  // calculating the list list to show this should happen in a projection
  const filteredList = jobs.filter((job) => {
    const searchTerm = filter.toLowerCase();
    return (
      job.headline.toLowerCase().includes(searchTerm) ||
      job.employer.toLowerCase().includes(searchTerm)
    );
  });

  return (
    <ul className="">
      <h3 className="text-orange-200">{filter}</h3>
      {filteredList.map((job) => (
        <JobListItem job={job} />
      ))}
    </ul>
  );
}
