import { useEffect, useMemo, useState } from 'react';

import { APPLICATION_STATUS, ApplicationStatus, Job } from '@jobchaser/domain';

import { jobsService } from '@/services/jobchaser/jobs.service';
import { useBookmarkStore } from './store';

import { Trash2 } from 'lucide-react';
import StatusSelect from './components/StatusSelect';
import StatusFilters from './components/StatusFilters';
import { FilterInput } from './components/FilterInput';

export default function JobBookmarks() {
  const [bookmarks, setBookmarks] = useState<Job[]>([]);
  const { activeFilter, searchQuery } = useBookmarkStore();

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

  const filteredBookmarks = useMemo(() => {
    if (!bookmarks) return [];

    return bookmarks.filter((job) => {
      const matchesStatus =
        activeFilter === 'all' || job.applicationStatus === activeFilter;

      const matchesSearch =
        job.employer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.jobTitle.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesStatus && matchesSearch;
    });
  }, [bookmarks, activeFilter, searchQuery]);

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
    <div className="overflow-y-scroll p-4 h-full">
      {error && (
        <p className="my-2 bg-red-400 px-2 py-1 rounded font-semibold text-sm text-red-950">
          {error}
        </p>
      )}

      <header className="flex gap-2 items-center mb-4">
        <StatusFilters />
        <FilterInput />
      </header>
      <ul className="grid grid-cols-3 gap-4">
        {filteredBookmarks.map((b) => (
          <li>
            <article className="bg-app-surface p-4 rounded h-full">
              <div className="flex justify-between gap-2">
                <h3 className="text-2xl text-content-main truncate font-semibold">
                  {b.employer}
                </h3>

                {activeFilter === 'archived' && (
                  <button
                    type="button"
                    onClick={() => handleDelete(b.externalId)}
                    className="cursor-pointer"
                  >
                    <Trash2 className="stroke-zinc-700 hover:stroke-red-500 transition-colors duration-100" />
                  </button>
                )}
              </div>
              <h4 className="truncate text-content-muted">{b.jobTitle}</h4>
              <p className="text-content-subtle mb-2">
                Apply By:{' '}
                <span className="font-bold text-content-muted/80">
                  {b.applyBy}
                </span>
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
