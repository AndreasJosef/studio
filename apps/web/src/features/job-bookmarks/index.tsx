import { useEffect, useState } from 'react';

import { ApplicationStatus, Job } from '@jobchaser/domain';

import { jobsService } from '@/services/jobchaser/jobs.service';

import { Search, Trash2 } from 'lucide-react';
import StatusSelect from './components/StatusSelect';

export default function JobBookmarks() {
  const [bookmarks, setBookmarks] = useState<Job[]>([]);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      setIsLoading(true);

      const result = await jobsService.loadJobs();

      if (!result.ok) {
        setError(result.error);
        setIsLoading(false);
        return;
      }

      setBookmarks(result.value);
      setIsLoading(false);
    };

    load();
  }, []);

  // TODO: Migrate to react query to get load and error states from there
  if (isLoading) return <p>Loading...</p>;

  const handleDelete = async (id: number) => {
    const result = await jobsService.deleteJob(id);

    if (!result.ok) {
      return setError(result.error);
    }

    const updatedJobslist = bookmarks.filter(
      (bookmark) => bookmark.externalId !== id
    );

    setBookmarks([...updatedJobslist]);
  };

  const handleStatusChange = async (
    id: number,
    newStatus: ApplicationStatus
  ) => {
    const result = await jobsService.updateStatus(id, newStatus);

    if (result.ok) {
      setBookmarks((prev) =>
        prev.map((b) =>
          b.externalId === id ? { ...b, applicationStatus: newStatus } : b
        )
      );
    } else {
      setError(result.error);
    }
  };

  return (
    <div className="overflow-y-scroll">
      {error && (
        <p className="my-2 bg-red-400 px-2 py-1 rounded font-semibold text-sm text-red-950">
          {error}
        </p>
      )}

      <header className="flex gap-2 items-center my-4">
        <ul className="flex gap-4 items-center">
          <li className="bg-indigo-800 rounded-full px-2 font-semibold cursor-pointer">
            All
          </li>
          <li className="bg-neutral-600 rounded-full px-2 font-semibold">
            Applied
          </li>
          <li className="bg-neutral-600 rounded-full px-2 font-semibold">
            Next
          </li>
        </ul>
        <div className="flex gap-2 items-center ml-4">
          <Search className="stroke-3" />
          <input
            className="bg-zinc-700 rounded w-48 px-2 py-0.5"
            type="text"
            placeholder="Filter"
          />
        </div>
      </header>
      <ul className="grid grid-cols-3 gap-4">
        {bookmarks.map((b) => (
          <li>
            <article className="bg-zinc-800 p-4 rounded h-full">
              <div className="flex justify-between gap-2">
                <h3 className="text-2xl truncate font-semibold">
                  {b.employer}
                </h3>
                <button
                  type="button"
                  onClick={() => handleDelete(b.externalId)}
                  className="cursor-pointer"
                >
                  <Trash2 className="stroke-zinc-700 hover:stroke-red-500 transition-colors duration-100" />
                </button>
              </div>
              <h4 className="truncate text-zinc-400">{b.jobTitle}</h4>
              <p className="text-zinc-400 mb-2">
                Apply By:{' '}
                <span className="font-bold text-zinc-200">{b.applyBy}</span>
              </p>
              <StatusSelect
                current={b.applicationStatus as ApplicationStatus}
                onUpdate={(nextStatus) =>
                  handleStatusChange(b.externalId, nextStatus)
                }
              />
            </article>
          </li>
        ))}
      </ul>
    </div>
  );
}
