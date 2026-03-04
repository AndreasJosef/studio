import { BookmarkCheckIcon, BookmarkIcon } from 'lucide-react';

interface ToggleSaveJobButtonProps {
  jobId: string;
  isSaved: boolean;
  isLoading: boolean;
  onToggle: (id: string, currentlySaved: boolean) => Promise<void>;
}

export default function ToggleSaveJobButton({
  jobId,
  isSaved,
  onToggle,
  isLoading = false,
}: ToggleSaveJobButtonProps) {
  const handleClick = async () => {
    if (isLoading) return;
    await onToggle(jobId, isSaved);
  };

  return (
    <button
      onClick={handleClick}
      disabled={isLoading}
      className={`
        flex items-center gap-2 px-4 py-2 rounded-md font-medium transition-all
        ${
          isSaved
            ? 'bg-zinc-800 text-indigo-400 border border-indigo-900/50'
            : 'bg-indigo-700 text-white hover:bg-indigo-600'
        }
        ${isLoading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
      `}
    >
      {isLoading ? (
        <span className="animate-pulse">Loading...</span>
      ) : isSaved ? (
        <>
          <BookmarkCheckIcon size={18} />
          <span>Saved</span>
        </>
      ) : (
        <>
          <BookmarkIcon size={18} />
          <span>Save Job</span>
        </>
      )}
    </button>
  );
}
