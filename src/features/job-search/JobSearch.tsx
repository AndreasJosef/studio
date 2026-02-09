import { Job } from '@/shared/types';
import { useState } from 'react';
import { useJobsData } from './providers/useJobSearch';
import { useSearchActions } from './actions/useSearchActions';

import AutoCompleteSearchBar from './components/AutoCompleteSearch';
import { projectCompletionSuffix } from './logic/projectCompletionSuffix';
import { useJobSuggestions } from './providers/useSearchSuggestins';

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

  // Providers
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
    <>
      <AutoCompleteSearchBar
        value={queryDraft}
        completion={completionSuffix}
        onChange={setQueryDraft}
        onCommit={() => onCommit(queryDraft)}
        onTab={(e) => onTab(e, completionSuffix, queryDraft)}
      />
      <ul>
        {suggestions.map((suggestion) => (
          <li>
            {suggestion.value} <span>({suggestion.occurrences})</span>
          </li>
        ))}
      </ul>
    </>
  );
}
