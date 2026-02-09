import React from 'react';
import { SearchCompletion } from './shared/types';

/**
 * Configuration for the SeachrBar Component
 **/
export interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  onSearch: () => void;
  autocomplete: SearchCompletion[];
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
  // Handling User Intent
  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearch();
    setSearchTerm('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Tab') {
      setSearchTerm('To the value of suggestions[0].. I think');
    }
    if (e.key === 'Escape') {
      setSearchTerm('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full flex gap-2">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={handleKeyDown}
        className="grow bg-neutral-600 px-4 py-2 rounded"
        placeholder={placeholder || 'Search a Job!'}
      />
      <button type="submit" className="px-6 bg-indigo-800 rounded">
        Find Jobs!
      </button>
    </form>
  );
}
