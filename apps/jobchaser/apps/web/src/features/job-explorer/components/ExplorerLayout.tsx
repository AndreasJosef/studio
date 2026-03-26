import React from 'react';

/**
 * A 12-column grid with a scrollable list and pinned detail.
 */

interface LayoutProps {
  children: React.ReactNode;
  isDetailActive: boolean;
}

export default function ExplorerLayout({
  children,
  isDetailActive,
}: LayoutProps) {
  const [Search, List, Pagination, Detail] = React.Children.toArray(children);

  return (
    <div className="grid grid-cols-1 md:grid-cols-[2fr_3fr] h-full w-full overflow-hidden">
      {/* Left column */}
      <div
        className={`flex flex-col h-full overflow-hidden ${isDetailActive ? 'hidden md:flex' : 'flex'}`}
      >
        <div className="border-b-2 border-app-border bg-app-bg/50 backdrop-blur-sm z-10">
          {Search}
        </div>

        <div className="flex-1 overflow-y-auto scroll-smooth">{List}</div>

        <div className="border-t-2 border-app-border bg-app-bg/50 backdrop-blur-sm">
          {Pagination}
        </div>
      </div>

      {/* Right Column*/}
      <div
        className={`h-full overflow-hidden md:border-l-2 border-app-border ${isDetailActive ? 'flex' : 'hidden md:flex'}`}
      >
        <div className="flex-1 h-full scroll-smooth [scrollbar-width:none]">
          {Detail}
        </div>
      </div>
    </div>
  );
}
