import { type SearchCompletion } from '@/shared/types';
import { useEffect, useState } from 'react';
import { getSuggestions } from './actions';

export function useJobSuggestions(searchTerm: string) {
  const [suggestions, setSuggestions] = useState<SearchCompletion[]>([]);

  // Debounced query to typeahead endpoint for getting search suggestions
  useEffect(() => {
    if (!searchTerm.trim()) return;

    let isActive = true;

    const debounce = setTimeout(async () => {
      const results = await getSuggestions(searchTerm);

      if (isActive) {
        setSuggestions(results);
      }
    }, 100);

    return () => {
      clearTimeout(debounce);
      isActive = false; // no more updates
    };
  }, [searchTerm]);

  // Rest the suggestions when searchTerm is empty
  if (!searchTerm.trim()) {
    return [];
  }

  return suggestions;
}
