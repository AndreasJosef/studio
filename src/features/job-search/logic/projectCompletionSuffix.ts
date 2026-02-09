import { SearchCompletion } from '@/shared/types';

export const projectCompletionSuffix = (
  input: string,
  suggestions: SearchCompletion[]
) => {
  if (!input || suggestions.length === 0) return '';

  return suggestions[0].value.slice(input.length);
};
