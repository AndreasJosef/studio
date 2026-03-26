import { create } from 'zustand';
import { type ApplicationStatus } from '@jobchaser/domain';

export type FilterStatus = ApplicationStatus | 'all';

interface BookmarkFilterState {
  activeFilter: FilterStatus;
  searchQuery: string;
  setFilter: (filter: FilterStatus) => void;
  setQuery: (query: string) => void;
}

export const useBookmarkStore = create<BookmarkFilterState>((set) => ({
  activeFilter: 'all',
  searchQuery: '',
  setFilter: (activeFilter) => set({ activeFilter }),
  setQuery: (searchQuery) => set({ searchQuery }),
}));
