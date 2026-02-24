import { useState, useEffect } from 'react';

/**
 * Prevents the flashing of loading UI for fast responses
 */
export function useDelayedLoading(isLoading: boolean, delay = 200) {
  const [shouldShow, setShouldShow] = useState(false);

  useEffect(() => {
    if (!isLoading) return;

    const timer = setTimeout(() => {
      setShouldShow(true);
    }, delay);

    return () => {
      clearTimeout(timer);
      setShouldShow(false);
    };
  }, [isLoading, delay]);

  return shouldShow;
}
