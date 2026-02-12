import React from 'react';

/**
 * A 12-column grid with a scrollable list and pinned detail.
 */

interface LayoutProps {
  children: React.ReactNode;
}

export default function ExplorerLayout({ children }: LayoutProps) {
  const [Search, List, Detail] = React.Children.toArray(children);

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto">
      <header className="w-full">{Search}</header>

      <div className="grid grid-cols-12 gap-8 items-start">
        <aside className="col-span-12 md:col-span-5 pb-20">{List}</aside>
        <main className="hidden md:block md:col-span-7 sticky top-6 h-[calc(100vh-3rem)]">
          <div className="h-full overflow-y-auto rounded-lg bg-neutral-900/50 border border-neutral-800 shadow-xl">
            {Detail}
          </div>
        </main>
      </div>
    </div>
  );
}
