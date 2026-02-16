import { useState } from 'react';

import { useJobSuggestions } from './loaders/useSearchSuggestins';
import { useSearchActions } from './actions/useSearchActions';
import { projectCompletionSuffix } from './logic/projectCompletionSuffix';

import AutoCompleteSearchBar from './components/AutoCompleteSearch';

interface JobSearchProps {
  onSearch: (query: string) => void;
}

export default function JobSearch({ onSearch }: JobSearchProps) {
  const [queryDraft, setQueryDraft] = useState('');

  const suggestions = useJobSuggestions(queryDraft);
  const completionSuffix = projectCompletionSuffix(queryDraft, suggestions);

  const { onCommit, onTab } = useSearchActions({
    setTrigger: onSearch,
    setDraft: setQueryDraft,
  });

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
