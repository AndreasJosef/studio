import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/_app-root/my-jobs')({
  beforeLoad: ({ context }) => {
    if (!context.auth.user) {
      console.log(context.auth.user);
      throw redirect({
        to: '/auth/signin',
      });
    }
  },
  component: () => <h1>Moin</h1>,
});
