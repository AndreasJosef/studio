import { APPLICATION_STATUS } from '@jobchaser/domain';
import FilterPill from './FilterPill';

export default function StatusFilters() {
  return (
    <ul className="flex gap-4 items-center">
      <FilterPill label="All" value="all" />
      <FilterPill label="Applied" value={APPLICATION_STATUS.APPLIED} />
      <FilterPill label="Up Next" value={APPLICATION_STATUS.NEXT} />
      <FilterPill label="Archived" value={APPLICATION_STATUS.ARCHIVED} />
    </ul>
  );
}
