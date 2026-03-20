import { createFileRoute, Outlet, Link } from '@tanstack/react-router';

import { Search, Bookmark, Inbox, BookUser } from 'lucide-react';
import { UserHUD } from '@/shared/components/UserHUD';

const AppShell = () => {
  return (
    <>
      <div className="grid grid-rows-[auto_1fr] w-screen h-screen overflow-hidden">
        <header className="w-full px-4 h-18 flex items-center justify-between border-b-2 border-b-app-border">
          <h1 className="text-3xl font-bold text-neutral-300">
            Job<span className="text-indigo-700">Chaser</span>
          </h1>
          <UserHUD />
        </header>
        <main className="flex flex-col md:flex-row overflow-hidden">
          <aside className="w-full md:w-20 p-2 md:border-r-2 border-app-border flex flex-row md:flex-col md:items-center gap-2">
            <Link
              className="bg-zinc-800 rounded hover:bg-zinc-700 w-12 h-12 flex justify-center items-center"
              to="/explore"
              search={(prev) => ({
                q: prev.q || '',
                p: prev.p || 1,
                id: prev.id || undefined,
              })}
            >
              <Search size={24} strokeWidth={3} />
            </Link>
            <Link
              className="rounded hover:bg-zinc-700 p-2 w-12 flex justify-center"
              to="/my-jobs"
              search={(prev) => ({
                q: prev.q || '',
                p: prev.p || 1,
                id: prev.id || undefined,
              })}
            >
              <Bookmark size={24} strokeWidth={3} />
            </Link>
            <Link
              className="rounded hover:bg-zinc-700 p-2 w-12 flex justify-center"
              to="/my-jobs"
              search={(prev) => ({
                q: prev.q || '',
                p: prev.p || 1,
                id: prev.id || undefined,
              })}
            >
              <Inbox size={24} strokeWidth={3} />
            </Link>
            <Link
              className="rounded hover:bg-zinc-700 p-2 w-12 flex justify-center"
              to="/contacts"
              search={(prev) => ({
                q: prev.q || '',
                p: prev.p || 1,
                id: prev.id || undefined,
              })}
            >
              <BookUser
                className="hover:stroke-amber-500"
                size={24}
                strokeWidth={3}
              />
            </Link>
          </aside>
          <div className="w-full overflow-y-scroll px-4 pb-4">
            <Outlet />
          </div>
        </main>
      </div>
    </>
  );
};

export const Route = createFileRoute('/_app-root')({
  component: AppShell,
});
