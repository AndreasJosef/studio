import { type Result, ok, fail } from './result';

interface FetchSafeListOptions extends RequestInit {
  // eslint-disable-next-line
  extractArray?: (data: any) => unknown[];
}

/**
 * A reusable fetcher that handles the network, JSON parsing,
 * and data cleaning for a LIST of items.
 * * @param url - The endpoint to hit
 * @param parser - A function that converts 'unknown' input into 'Result<T>'
 */
export async function fetchSafeList<T>(
  url: string,
  parser: (input: unknown) => Result<T>,
  options: FetchSafeListOptions = {}
): Promise<Result<T[]>> {
  try {
    const { extractArray, ...fetchConfig } = options;

    // Prepare the headers
    const headers = new Headers({
      'Content-Type': 'application/json',
    });

    // Merge user option headers
    if (fetchConfig.headers) {
      new Headers(fetchConfig.headers).forEach((value, key) =>
        headers.set(key, value)
      );
    }

    // then spread the whole config and add the fixed headers
    const response = await fetch(url, {
      ...fetchConfig,
      headers,
    });

    if (!response.ok) {
      return fail(`HTTP Error: ${response.status} ${response.statusText}`);
    }

    // Unknown: We don't know what this is yet.
    const rawData: unknown = await response.json();

    // eslint-disable-next-line
    const resolveList = (data: any): unknown => {
      if (options.extractArray) return options.extractArray(data);

      if (Array.isArray(data)) return data;

      if (data?.results && Array.isArray(data.results)) return data.results;

      return undefined;
    };

    const list = resolveList(rawData);

    // If we still don't have an array, the API shape is wrong for a List fetch.
    if (!Array.isArray(list)) {
      // Note: Empty lists are fine, but "not a list" is an error.
      // if we couldn't get a list, we just return empty array
      // to prevent crashes, but logging the issue.
      console.warn(
        `safeFetchList expected an array at ${url} but got`,
        rawData
      );
      return ok([]);
    }

    // Keep the good ones
    // The is here is called Type Predicate
    const successes = list.reduce<T[]>((acc, item) => {
      const result = parser(item);
      if (result.ok) {
        acc.push(result.value);
      } else {
        console.warn('Item failed', result.error);
      }
      return acc;
    }, []);

    return ok(successes);
  } catch (e) {
    // Network failures
    return fail(e instanceof Error ? e.message : 'Unknown Network Error');
  }
}

/**
 * A reusable fetcher for a SINGLE item.
 */

export async function fetchSafeItem<T>(
  url: string,
  parser: (input: unknown) => Result<T>,
  config: RequestInit
): Promise<Result<T>> {
  try {
    const response = await fetch(url, config);
    if (!response.ok) return fail(`HTTP ${response.status}`);

    const rawData: unknown = await response.json();

    // Direct pipe to parser
    return parser(rawData);
  } catch (e) {
    return fail(e instanceof Error ? e.message : 'Network Error');
  }
}

/**
 * A reusable poster for sending data.
 */
export async function safePost<T>(
  url: string,
  payload: T,
  config: RequestInit = {},
  parser?: (input: unknown) => Result<T> // Optional: Parse the response
): Promise<Result<T | null>> {
  try {
    config.method = 'POST';

    // Prepare the headers
    const headers = new Headers({
      'Content-Type': 'application/json',
    });

    // merge user headers
    if (config.headers) {
      const userHeaders = new Headers(config.headers);
      userHeaders.forEach((value, key) => headers.set(key, value));
    }

    const response = await fetch(url, {
      ...config,
      headers,
      body: JSON.stringify(payload),
    });

    if (!response.ok) return fail(`HTTP ${response.status}`);

    // If we don't care about the response data (fire and forget)
    if (!parser) return ok(null);

    const rawData: unknown = await response.json();
    return parser(rawData);
  } catch (e) {
    return fail(e instanceof Error ? e.message : 'Network Error');
  }
}

// Safe Delete
export async function safeDelete<T>(
  url: string,
  config: RequestInit = {},
  parser?: (input: unknown) => Result<T> // Optional: Parse the response
): Promise<Result<T | null>> {
  try {
    config.method = 'DELETE';

    // Prepare the headers
    const headers = new Headers({
      'Content-Type': 'application/json',
    });

    // merge user headers
    if (config.headers) {
      const userHeaders = new Headers(config.headers);
      userHeaders.forEach((value, key) => headers.set(key, value));
    }

    const response = await fetch(url, {
      ...config,
      headers,
    });

    if (!response.ok) return fail(`HTTP ${response.status}`);

    // If we don't care about the response data (fire and forget)
    if (!parser) return ok(null);

    const rawData: unknown = await response.json();
    return parser(rawData);
  } catch (e) {
    return fail(e instanceof Error ? e.message : 'Network Error');
  }
}

export async function updateSafe<T>(
  url: string,
  payload: T,
  config: RequestInit = {},
  parser?: (input: unknown) => Result<T> // Optional: Parse the response
): Promise<Result<T | null>> {
  try {
    config.method = 'PUT';

    // Prepare the headers
    const headers = new Headers({
      'Content-Type': 'application/json',
    });

    // merge user headers
    if (config.headers) {
      const userHeaders = new Headers(config.headers);
      userHeaders.forEach((value, key) => headers.set(key, value));
    }

    const response = await fetch(url, {
      ...config,
      headers,
      body: JSON.stringify(payload),
    });

    if (!response.ok) return fail(`HTTP ${response.status}`);

    // If we don't care about the response data (fire and forget)
    if (!parser) return ok(null);

    const rawData: unknown = await response.json();
    return parser(rawData);
  } catch (e) {
    return fail(e instanceof Error ? e.message : 'Network Error');
  }
}
