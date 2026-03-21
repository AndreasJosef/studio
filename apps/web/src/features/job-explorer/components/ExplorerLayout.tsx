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
  const [Search, List, Detail] = React.Children.toArray(children);

  return (
    <div className="grid grid-cols-1 md:grid-cols-[2fr_3fr] h-full w-full overflow-hidden">
      <div
        className={`flex flex-col h-full overflow-hidden ${isDetailActive ? 'hidden md:flex' : 'flex'}`}
      >
        <div className="flex-1 overflow-y-auto p-4">
          {Search}
          {List}
        </div>
      </div>

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
