import { Job, JobResponseMeta } from '@/shared/types';

import { useState } from 'react';
import { useJobsData } from './providers/useJobSearch';
import { useSearchActions } from './actions/useSearchActions';

import { projectCompletionSuffix } from './logic/projectCompletionSuffix';
import { useJobSuggestions } from './providers/useSearchSuggestins';

import AutoCompleteSearchBar from './components/AutoCompleteSearch';

interface JobSearchProps {
  searchTerm: string;
  onSearch: (query: string) => void;
  onJobs: (jobs: Job[]) => void;
  setIsLoading: (state: boolean) => void;
  setError: (message: string) => void;
  setMeta: (data: JobResponseMeta) => void;
}

export default function JobSearch({
  searchTerm,
  onSearch,
  onJobs,
  setIsLoading,
  setError,
  setMeta,
}: JobSearchProps) {
  const [queryDraft, setQueryDraft] = useState('');

  // Loaders
  useJobsData(searchTerm, { onJobs, setIsLoading, setError, setMeta });

  // Projections
  const suggestions = useJobSuggestions(queryDraft);
  const completionSuffix = projectCompletionSuffix(queryDraft, suggestions);

  // Actions
  const { onCommit, onTab } = useSearchActions({
    setTrigger: onSearch,
    setDraft: setQueryDraft,
  });

  // UI
  return (
    <div className="relative mb-4">
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
