import JobExplorer from '../features/job-explorer/index';

import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/explore')({
  component: JobExplorer,
});
