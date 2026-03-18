import Contacts from '@/features/user-contacts';

import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/_app-root/contacts')({
  beforeLoad: ({ context, location }) => {
    if (!context.auth.isAuthenticated) {
      throw redirect({
        to: '/auth/signin',
        search: {
          redirect: location.pathname,
        },
      });
    }
  },
  component: Contacts,
});
