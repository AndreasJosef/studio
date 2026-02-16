/**
 *  Maintains layout stability by mimicking a real JobListItem.
 */
export function JobListItemSkeleton() {
  return (
    <li className="p-4 border-b border-slate-100 animate-pulse">
      <div className="flex justify-between items-start">
        <div className="space-y-3 w-full">
          {/* Title Placeholder */}
          <div className="h-5 bg-slate-200 rounded w-3/4" />
          {/* Metadata Placeholder */}
          <div className="h-4 bg-slate-100 rounded w-1/2" />
        </div>
        {/* Date/Icon Placeholder */}
        <div className="h-4 bg-slate-100 rounded w-12" />
      </div>
    </li>
  );
}
