import JobExplorer from '../features/job-explorer/index';

import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_app-root/explore')({
  component: JobExplorer,
  validateSearch: (search: Record<string, unknown>) => {
    return {
      q: (search.q as string) || '',
      id: (search.id as string) || undefined,
      p: Number(search.p) || 1,
    };
  },
});
