import { useEffect } from 'react';
import { useSettingsStore } from '@/features/settings/store';

export function ThemeWatcher() {
  const theme = useSettingsStore((s) => s.theme);

  useEffect(() => {
    const root = window.document.documentElement;

    const applyTheme = (currentTheme: 'light' | 'dark') => {
      root.classList.remove('light', 'dark');
      root.classList.add(currentTheme);
      root.style.colorScheme = currentTheme;
    };

    if (theme === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      applyTheme(mediaQuery.matches ? 'dark' : 'light');

      const listener = (e: MediaQueryListEvent) =>
        applyTheme(e.matches ? 'dark' : 'light');
      mediaQuery.addEventListener('change', listener);
      return () => mediaQuery.removeEventListener('change', listener);
    } else {
      applyTheme(theme);
    }
  }, [theme]);

  return null;
}
