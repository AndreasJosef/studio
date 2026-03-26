interface SearchBarProps {
  value: string;
  completion: string;
  onChange: (value: string) => void;
  onTab: (e: React.KeyboardEvent) => void;
  onCommit: () => void;
}

export default function AutoCompleteSearchBar({
  value,
  completion,
  onChange,
  onTab,
  onCommit,
}: SearchBarProps) {
  return (
    <div className="w-full flex gap-2">
      <div className="relative w-full flex items-center">
        <input
          className="w-full text-lg font-semibold text-content-main bg-transparent px-4 py-2 rounded relative z-10 outline-none"
          type="text"
          placeholder="Search Job"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') onCommit();
            if (e.key === 'Tab') onTab(e);
            if (e.key === 'Escape') onChange('');
          }}
        />
        <div className="absolute text-lg font-semibold flex items-center inset-0 pointer-events-none px-4 py-2 rounded bg-app-surface">
          <span className="text-transparent whitespace-pre">{value}</span>
          <span className="text-content-subtle whitespace-pre">
            {completion}
          </span>
        </div>
      </div>
      <button
        type="button"
        onClick={onCommit}
        className="px-6 bg-brand-primary text-white rounded"
      >
        Search
      </button>
    </div>
  );
}
