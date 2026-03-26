/**
 *  Maintains layout stability by mimicking a real JobListItem.
 */
export default function JobListItemSkeleton() {
  return (
    <li className="p-4 border-b border-slate-300 animate-pulse list-none">
      <div className="flex justify-between items-start">
        <div className="space-y-3 w-full">
          {/* Title Placeholder */}
          <div className="h-5 bg-slate-400 rounded w-3/4" />
          {/* Metadata Placeholder */}
          <div className="h-4 bg-slate-300 rounded w-1/2" />
        </div>
        {/* Date/Icon Placeholder */}
        <div className="h-4 bg-slate-300 rounded w-12" />
      </div>
    </li>
  );
}
