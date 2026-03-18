import { type FilterStatus, useBookmarkStore } from '../store';

interface FilterPillProps {
  label: string;
  value: FilterStatus;
}

export default function FilterPill({ label, value }: FilterPillProps) {
  const { activeFilter, setFilter } = useBookmarkStore();

  const isActive = value === activeFilter;

  return (
    <li
      onClick={() => setFilter(value)}
      className={`px-3 py-0.5 font-semibold text-sm rounded-full cursor-pointer transition-all duration-150 border ${
        isActive
          ? 'bg-indigo-800 border-indigo-700 text-neutral-300'
          : 'bg-zinc-800 border-zinc-700 text-zinc-400 hover:bg-zinc-700 hover:text-zinc-200'
      }`}
    >
      {label}
    </li>
  );
}
