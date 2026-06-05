import { BookText, Calendar, Sun, Moon } from 'lucide-react';
import { useState, useEffect } from 'react';

const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

function App() {
  const now = new Date();
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof document !== 'undefined') {
      return (localStorage.getItem('theme') as 'light' | 'dark') || 'dark';
    }
    return 'dark';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <div className="grid grid-rows-[auto_1fr_auto] h-dvh">
      <header className="flex items-center justify-between px-4 pt-4 pb-2">
        <h1 className="text-xl font-semibold tracking-tight">
          {`${days[now.getDay()]}, ${now.toLocaleDateString()}`}
        </h1>
        <button
          type="button"
          onClick={() => setTheme(t => (t === 'light' ? 'dark' : 'light'))}
          className="text-ink-muted hover:text-ink-main transition-colors cursor-pointer"
        >
          {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
        </button>
      </header>

      <main className="px-4 pb-2 overflow-hidden">
        <div
          className="size-full p-4 text-ink-main outline-none whitespace-pre-wrap overflow-y-auto
                     empty:before:text-ink-muted empty:before:content-[attr(data-placeholder)] empty:before:pointer-events-none"
          contentEditable
          data-placeholder="What is on your mind?"
          role="textbox"
          aria-multiline="true"
        />
      </main>

      <nav className="flex items-center justify-around border-t border-border px-4 py-3">
        <button
          type="button"
          className="flex flex-col items-center gap-0.5 text-ink-main transition-colors hover:text-ink-main cursor-pointer"
        >
          <BookText size={22} />
          <span className="text-[11px] font-medium">Journal</span>
        </button>
        <button
          type="button"
          className="flex flex-col items-center gap-0.5 text-ink-main transition-colors hover:text-ink-main cursor-pointer"
        >
          <Calendar size={22} />
          <span className="text-[11px] font-medium">Agenda</span>
        </button>
      </nav>
    </div>
  );
}

export default App;