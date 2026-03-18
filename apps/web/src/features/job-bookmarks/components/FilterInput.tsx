import { Search } from 'lucide-react';
import { useBookmarkStore } from '../store';

export function FilterInput() {
  const { setQuery, searchQuery } = useBookmarkStore();

  //px-3 py-0.5 font-semibold text-sm rounded-full cursor-pointer transition-all duration-150 border
  //bg-zinc-800 border-zinc-700 text-zinc-400 hover:bg-zinc-700 hover:text-zinc-200

  return (
    <div className="flex gap-2 items-center ml-4">
      <Search className="stroke-3" />
      <input
        value={searchQuery}
        onChange={(e) => setQuery(e.target.value)}
        className="bg-zinc-700 rounded w-48 px-2 py-0.5 outline-none"
        type="text"
        placeholder="Filter"
      />
      <button
        className="text-sm font-semibold cursor-pointer px-3 py-0.5 rounded transition-all duration-150 border-2 border-zinc-700 text-zinc-400 hover:bg-zinc-700 hover:text-zinc-200"
        type="button"
        onClick={() => setQuery('')}
      >
        Clear
      </button>
    </div>
  );
}
