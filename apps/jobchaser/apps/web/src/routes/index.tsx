import { createFileRoute, redirect } from '@tanstack/react-router';
import { useSettingsStore } from '@/features/settings/store';
import LandingPage from '@/features/marketing/LandingPage';

export const Route = createFileRoute('/')({
  beforeLoad: () => {
    const { hideLanding } = useSettingsStore.getState();

    if (hideLanding) {
      throw redirect({ to: '/explore' });
    }
  },
  component: LandingPage,
});
