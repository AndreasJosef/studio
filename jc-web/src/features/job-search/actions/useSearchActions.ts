interface SearchActionControls {
  setDraft: (value: string) => void;
  setTrigger: (value: string) => void;
}

export const useSearchActions = ({
  setDraft,
  setTrigger,
}: SearchActionControls) => {
  const commit = (currentDraft: string) => {
    if (!currentDraft.trim()) return;

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
