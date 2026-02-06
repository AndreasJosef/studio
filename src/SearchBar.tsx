import React from 'react';

/**
 * Configuration for the SeachrBar Component
 **/
export interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  onSearch: () => void;
  placeholder?: string;
}

/**
 * Captures and executes the users search/filter query
 */
export default function SearchBar({
  searchTerm,
  setSearchTerm,
  onSearch,
  placeholder,
}: SearchBarProps) {
  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearch();
    setSearchTerm('');
  };

  return (
    <form onSubmit={handleSubmit} className="w-full flex gap-2">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)} // TODO: debounce this update
        className="grow bg-neutral-600 px-4 py-2 rounded"
        placeholder={placeholder || 'Search a Job!'}
      />
      <button type="submit" className="px-6 bg-indigo-800 rounded">
        Find Job
      </button>
    </form>
  );
}
