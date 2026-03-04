import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/_app-root/my-jobs')({
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
  component: () => <h1>Moin</h1>,
});
