import { createFileRoute, Outlet, Link } from '@tanstack/react-router';

import { Search, Bookmark, Inbox, BookUser } from 'lucide-react';
import { UserHUD } from '@/shared/components/UserHUD';

const AppShell = () => {
  return (
    <>
      <div className="grid grid-rows-[auto_1fr] w-screen h-screen overflow-hidden">
        <header className="w-full px-4 h-18 flex items-center justify-between border-b-2 border-b-app-border">
          <h1 className="text-3xl font-bold text-subtle">
            Job<span className="text-brand-primary">Chaser</span>
          </h1>
          <UserHUD />
        </header>
        <main className="flex flex-col md:flex-row overflow-hidden h-full">
          <aside className="text-content-muted w-full md:w-20 p-2 md:border-r-2 border-app-border flex flex-row md:flex-col md:items-center gap-2">
            <Link
              className="rounded hover:bg-app-surface-hover w-12 h-12 flex justify-center items-center"
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
              className="rounded hover:bg-app-surface-hover w-12 h-12 flex justify-center items-center"
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
              className="rounded hover:bg-app-surface-hover w-12 h-12 flex justify-center items-center"
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
              className="rounded hover:bg-app-surface-hover w-12 h-12 flex justify-center items-center"
              to="/contacts"
              search={(prev) => ({
                q: prev.q || '',
                p: prev.p || 1,
                id: prev.id || undefined,
              })}
            >
              <BookUser size={24} strokeWidth={3} />
            </Link>
          </aside>
          <div className="flex-1 overflow-hidden w-full">
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
