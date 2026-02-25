import z from 'zod';
import { createFileRoute } from '@tanstack/react-router';

import JobExplorer from '../features/job-explorer/index';

const exploreSearchSchema = z.object({
  q: z.string().default(''),
  p: z.number().default(1),
  id: z.string().optional(),
});

export const Route = createFileRoute('/_app-root/explore')({
  component: JobExplorer,
  validateSearch: (search) => exploreSearchSchema.parse(search),

  // validateSearch: (search: Record<string, unknown>) => {
  //   return {
  //     q: (search.q as string) || '',
  //     id: (search.id as string) || undefined,
  //     p: Number(search.p) || 1,
  //   };
  // },
});
