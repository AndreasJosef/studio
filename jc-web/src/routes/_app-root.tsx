import { createFileRoute, Outlet } from '@tanstack/react-router';

const AppShell = () => (
  <>
    <div className="p-4 md:max-w-5xl md:mx-auto">
      <header className="my-6 grid gap-4">
        <h1 className="text-3xl font-bold text-neutral-300 mb-3">
          Job<span className="text-indigo-700">Chaser</span>
        </h1>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  </>
);

export const Route = createFileRoute('/_app-root')({
  component: AppShell,
});
