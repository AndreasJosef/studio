import { SearchCompletion } from '@/shared/types';

import { useEffect, useState } from 'react';

import { fetchSafeList } from '../../../core/api-engine';
import { parseAFCompletions } from '../logic/parser';

const TYPEAHEAD_URL = 'https://jobsearch.api.jobtechdev.se/complete';
const DEBOUNCE_MS = 200;

export function useJobSuggestions(searchTerm: string) {
  const [suggestions, setSuggestions] = useState<SearchCompletion[]>([]);

  // Debounced query to typeahead endpoint for getting search suggestions
  useEffect(() => {
    if (!searchTerm.trim()) return;

    let isActive = true;

    const debounce = setTimeout(async () => {
      const results = await getSuggestions(searchTerm);

      if (isActive) {
        console.log(results);
        setSuggestions(results);
      }
    }, DEBOUNCE_MS);

    return () => {
      clearTimeout(debounce);
      isActive = false; // no more updates
    };
  }, [searchTerm]);

  // Reset the suggestions when searchTerm is empty
  if (!searchTerm.trim()) {
    return [];
  }

  return suggestions;
}

export async function getSuggestions(
  query: string
): Promise<SearchCompletion[]> {
  const url = `${TYPEAHEAD_URL}?q=${query}`;

  const result = await fetchSafeList(url, parseAFCompletions, {
    extractArray: (data) => data.typeahead,
  });

  if (result.ok) {
    return result.value;
  } else {
    console.warn('Could not get Suggestions');
    return [];
  }
}
