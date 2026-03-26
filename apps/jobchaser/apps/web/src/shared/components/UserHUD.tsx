import { useState } from 'react';

import { useAuth } from '@/core/auth/AuthContext';
import { useSettingsStore } from '@/features/settings/store';
import { useNavigate, useRouter } from '@tanstack/react-router';

import { Link } from '@tanstack/react-router';
import { Sun, Moon, LogOut, ChevronDown, Settings, LogIn } from 'lucide-react';

export function UserHUD() {
  const [isOpen, setIsOpen] = useState(false);

  const { user, logoutAction } = useAuth();
  const { theme, setTheme } = useSettingsStore();

  const navigate = useNavigate();
  const router = useRouter();

  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');

  const onLogout = async () => {
    const result = await logoutAction();

    if (result.ok) {
      await router.invalidate();

      navigate({ to: '/explore', search: () => ({ q: '', p: 1 }) });
    }
  };

  if (!user) {
    return (
      <Link
        to="/auth/signin"
        className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg font-bold transition-colors text-sm"
      >
        <LogIn size={18} />
        <span>Sign In</span>
      </Link>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 bg-app-bg border border-app-border p-1.5 pr-3 rounded-lg hover:bg-app-surface-hover transition-all cursor-pointer"
      >
        <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold">
          {user.displayName
            ? user.displayName[0].toUpperCase()
            : user.email[0].toUpperCase()}
        </div>
        <div className="hidden md:block text-left">
          <p className="text-xs font-bold text-content-muted leading-none">
            {user.displayName}
          </p>
        </div>
        <ChevronDown
          size={14}
          className={`text-zinc-500 transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40 cursor-pointer"
            onClick={() => setIsOpen(false)}
          />

          <div className="absolute right-0 mt-2 w-56 bg-app-bg border border-app-border rounded-xl shadow-2xl z-50 py-2 overflow-hidden animate-in fade-in zoom-in duration-100">
            <div className="px-4 py-3 border-b border-app-border/50 mb-1">
              <p className="text-xs text-content-muted font-bold uppercase tracking-widest">
                Account
              </p>
              <p className="text-sm text-content-subtle truncate font-medium">
                {user.email}
              </p>
            </div>

            <button
              onClick={toggleTheme}
              className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-zinc-400 hover:bg-indigo-600/10 hover:text-indigo-400 transition-colors"
            >
              {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
              <span>
                {theme === 'dark' ? 'Switch to Light' : 'Switch to Dark'}
              </span>
            </button>

            <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-zinc-400 hover:bg-app-surface-hover transition-colors">
              <Settings size={16} />
              <span>Settings</span>
            </button>

            <div className="border-t border-zinc-800/50 mt-1 pt-1">
              <button
                onClick={onLogout}
                className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-400 hover:bg-red-500/10 transition-colors font-semibold"
              >
                <LogOut size={16} />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
