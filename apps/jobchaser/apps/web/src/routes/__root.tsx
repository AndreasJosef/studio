import { createRootRouteWithContext, Outlet } from '@tanstack/react-router';

import { RouterContext } from '@/router';
import { ThemeWatcher } from '@/shared/components/ThemeWatcher';

export const Route = createRootRouteWithContext<RouterContext>()({
  component: () => (
    <>
      <ThemeWatcher />
      <Outlet />
    </>
  ),
});
