import { Job } from '@/shared/types';

import { useState } from 'react';
import { useJobsData } from './providers/useJobSearch';
import { useSearchActions } from './actions/useSearchActions';

import { projectCompletionSuffix } from './logic/projectCompletionSuffix';
import { useJobSuggestions } from './providers/useSearchSuggestins';

import AutoCompleteSearchBar from './components/AutoCompleteSearch';

interface JobSearchProps {
  setJobs: (jobs: Job[]) => void;
  setIsLoading: (state: boolean) => void;
  setError: (message: string) => void;
}

export default function JobSearch({
  setJobs,
  setIsLoading,
  setError,
}: JobSearchProps) {
  const [queryDraft, setQueryDraft] = useState('');
  const [searchTerm, setSearchTerm] = useState(queryDraft);

  // Data Providers
  useJobsData(searchTerm, { setJobs, setIsLoading, setError });
  const suggestions = useJobSuggestions(queryDraft);

  // Projections
  const completionSuffix = projectCompletionSuffix(queryDraft, suggestions);

  // Actions
  const { onCommit, onTab } = useSearchActions({
    setTrigger: setSearchTerm,
    setDraft: setQueryDraft,
    setJobs,
    setIsLoading,
  });

  // UI
  return (
    <div className="relative">
      <AutoCompleteSearchBar
        value={queryDraft}
        completion={completionSuffix}
        onChange={setQueryDraft}
        onCommit={() => onCommit(queryDraft)}
        onTab={(e) => onTab(e, completionSuffix, queryDraft)}
      />
      <ul className="bg-neutral-600 absolute z-20 rounded mt-2">
        {suggestions.map((suggestion) => (
          <li
            key={crypto.randomUUID()}
            className="py-1 px-2 border-b-neutral-700 border-b"
          >
            {suggestion.value} <span>({suggestion.occurrences})</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
