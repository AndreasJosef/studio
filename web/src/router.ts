import { createRouter } from '@tanstack/react-router';
import { AuthStateValue } from './core/auth/AuthContext';

import { routeTree } from './routeTree.gen';

/**
 * Defines the router and its types for orchestration of navigation
 * */

export interface RouterContext {
  auth: AuthStateValue;
}

export const router = createRouter({
  routeTree,
  context: {
    auth: undefined!, // placeholder which we will hydrate the AuthRouter
  },
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}
