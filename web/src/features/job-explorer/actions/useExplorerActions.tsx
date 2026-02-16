import { Route } from '@/routes/explore';
import { useNavigate } from '@tanstack/react-router';

/**
 * Translates user Explorer UI intents into URL Signal changes.
 **/
export default function useExplorerActions() {
  const { fullPath } = Route;
  const navigate = useNavigate({ from: fullPath });

  /**
   * Updates a specific part of the URL (like the Job ID)
   * without affecting other signals (like the Search Query or Page).
   *
   * @param params - An object containing only the url parameters you wish to change.
   * @note Passing `id: undefined` explicitly removes the ID from the URL closing the detail view
   */
  const updateUrl = (searchParams: {
    q?: string;
    id?: string | undefined;
    p?: number;
  }) => {
    navigate({
      search: (prev) => ({
        ...prev,
        ...searchParams,
        id: searchParams.id === undefined ? undefined : searchParams.id, // make sure empty id is removed from URL
      }),
    });
  };

  /**
   * Handles movement through the api results.
   *
   * @param nextPage - The page index.
   * @note Includes a side-effect: scrolls the user back to the of the page
   */
  const handleResultsPageChange = (nextPage: number) => {
    updateUrl({ p: nextPage });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  /**
   * Executes a newQuery and resets the explorer UI
   *
   * @param newQuery - The string to search for.
   * @note A new search resets  the Page to 1 and the Selected Job to undefined
   */
  const handleSearch = (newQuery: string) => {
    updateUrl({ q: newQuery, id: undefined, p: 1 });
  };

  return {
    updateUrl,
    handleResultsPageChange,
    handleSearch,
  };
}
