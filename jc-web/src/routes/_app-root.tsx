import { createFileRoute, Outlet, Link } from '@tanstack/react-router';

import { Search, Bookmark, Inbox, BookUser, User } from 'lucide-react';

const AppShell = () => (
  <>
    <div className="fixed w-screen h-screen">
      <header className="w-full p-4 flex items-center justify-between border-b-2 border-b-zinc-800">
        <h1 className="text-3xl font-bold text-neutral-300">
          Job<span className="text-indigo-700">Chaser</span>
        </h1>
        <Link
          to="/auth/signin"
          className="text-lg bg-indigo-900 rounded font-semibold px-3 py-1 hover:underline transition-all"
        >
          <div className="flex">
            <User />
            <p className="ml-2">Login</p>
          </div>
        </Link>
      </header>
      <main className="flex flex-col md:flex-row gap-4 h-full">
        <aside className="w-full min-h-full md:w-20 p-2 border-b-2 md:border-r-2 border-zinc-800 flex flex-row md:flex-col md:items-center gap-2">
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
            to="/my-jobs"
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
        <div className="p-4 w-full">
          <Outlet />
        </div>
      </main>
    </div>
  </>
);

export const Route = createFileRoute('/_app-root')({
  component: AppShell,
});
