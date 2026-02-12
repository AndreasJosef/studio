import { Job } from '@/shared/types';

interface SearchActionControls {
  setDraft: (value: string) => void;
  setTrigger: (value: string) => void;
  setJobs: (jobs: Job[]) => void;
  setIsLoading: (state: boolean) => void;
  onNewSearch: () => void;
}

export const useSearchActions = ({
  setDraft,
  setTrigger,
  setJobs,
  setIsLoading,
  onNewSearch,
}: SearchActionControls) => {
  const commit = (currentDraft: string) => {
    if (!currentDraft.trim()) return;

    onNewSearch();
    setJobs([]);
    setIsLoading(true);
    setTrigger(currentDraft);
    setDraft('');
  };

  return {
    onTab: (
      e: React.KeyboardEvent,
      completion: string,
      currentValue: string
    ) => {
      if (completion) {
        e.preventDefault();
        setDraft(currentValue + completion);
      }
    },
    onCommit: commit,
  };
};
