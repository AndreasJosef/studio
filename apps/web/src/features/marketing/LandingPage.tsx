// src/features/marketing/LandingPage.tsx
import { useNavigate } from '@tanstack/react-router';
import { useSettingsStore } from '@/features/settings/store';

import { CheckCircle2 } from 'lucide-react';

export default function LandingPage() {
  const navigate = useNavigate();
  const { hideLanding, setHideLanding } = useSettingsStore();

  return (
    <div className="mt-12 md:mt-36 w-full flex flex-col items-center justify-center p-6 bg-app-bg text-center">
      <div className="max-w-4xl w-full space-y-12 animate-in fade-in zoom-in duration-700">
        <h1 className="text-6xl md:text-8xl font-black text-content-main tracking-tighter">
          Welcome to <span className="text-brand-primary">JobChaser</span>
        </h1>

        <div className="space-y-8 max-w-2xl mx-auto">
          <p className="text-2xl font-medium text-content-main leading-snug">
            This application was developed as a project during the Fullstack
            JavaScript program at Chas Academy.
          </p>

          <p className="text-lg text-content-muted leading-relaxed">
            Built as a performance-oriented React application utilizing a
            Express / Node.js and PostgreSQL backend. The system is deployed as
            a monorepo on a Hetzner VPS, focusing on real-time data
            synchronization and a strictly typed domain layer.
          </p>

          <p className="text-lg text-content-subtle">
            Scout, track, and manage your career with a minimal an functional
            interface.
          </p>
        </div>

        <div className="flex flex-col items-center gap-8">
          <button
            onClick={() => navigate({ to: '/explore' })}
            className="bg-brand-primary hover:bg-brand-hover text-white px-12 py-5 rounded-xl text-2xl font-black transition-all active:scale-95 "
          >
            Find your next job
          </button>

          <label className="flex items-center gap-3 cursor-pointer group select-none">
            <div className="relative flex items-center justify-center">
              <input
                type="checkbox"
                checked={hideLanding}
                onChange={(e) => setHideLanding(e.target.checked)}
                className="peer appearance-none w-5 h-5 rounded border-2 border-app-border checked:bg-brand-primary checked:border-brand-primary transition-all"
              />
              <CheckCircle2
                size={14}
                className="absolute text-white opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none"
              />
            </div>
            <span className="text-sm text-content-subtle font-bold tracking-wide uppercase">
              Don't show this screen again
            </span>
          </label>
        </div>

        <div className="pt-16 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto border-t border-app-border/30">
          <div className="flex flex-col gap-1">
            <span className="text-[10px] text-brand-primary font-black uppercase tracking-widest">
              Frontend
            </span>
            <span className="text-lg font-bold text-content-main">
              React & Vite
            </span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-[10px] text-brand-primary font-black uppercase tracking-widest">
              Persistence
            </span>
            <span className="text-lg font-bold text-content-main">
              Postgres & Drizzle
            </span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-[10px] text-brand-primary font-black uppercase tracking-widest">
              Styling
            </span>
            <span className="text-lg font-bold text-content-main">
              Tailwind 4
            </span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-[10px] text-brand-primary font-black uppercase tracking-widest">
              DevOps
            </span>
            <span className="text-lg font-bold text-content-main">
              Hetzner Cloud
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
