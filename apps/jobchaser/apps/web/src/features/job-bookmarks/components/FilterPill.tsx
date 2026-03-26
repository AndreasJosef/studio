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
          ? 'bg-brand-primary border-brand-primary/80 text-neutral-300'
          : 'bg-app-surface border-app-border text-content-muted hover:bg-app-surface-hover'
      }`}
    >
      {label}
    </li>
  );
}
