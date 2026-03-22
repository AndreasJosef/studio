import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Theme = 'dark' | 'light' | 'system';

interface SetttingsState {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  hideLanding: boolean;
  setHideLanding: (hide: boolean) => void;
}

export const useSettingsStore = create<SetttingsState>()(
  persist(
    (set) => ({
      theme: 'system',
      hideLanding: false,
      setTheme: (theme) => {
        set({ theme });
      },
      setHideLanding: (hideLanding) => set({ hideLanding }),
    }),
    {
      name: 'jc-user-settings',
    }
  )
);
