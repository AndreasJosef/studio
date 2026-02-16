import { Result, ok, fail } from './result';
/**
 * Configuration options for `fetchSafeList`.
 * Extends standard `RequestInit` to allow passing custom headers, etc
 **/
interface FetchSafeListOptions extends RequestInit {
  /**
   * A strategy to extract the target array from a wrapped API response.
   * Useful when data is nested (e.g., `{ hits: [...] }` or `{ data: { items: [...] } }`).
   *
   * @param data The raw JSON response.
   * @returns The array to be processed by the parser.
   */
  // eslint-disable-next-line
  extractArray?: (data: any) => unknown[];
  /**
   * An inline parser to extract non-list metadata (e.g., total counts, etc...).
   * Runs before the main list is parsed. Use this for side-effects like updating refs.
   *
   * @param data The raw JSON response.
   */
  // eslint-disable-next-line
  parseMeta?: (data: any) => void;
}

/**
 * Fetches data from an endpoint, extracts an array, and maps each item through a validator.
 * @param url The API endpoint.
 * @param parser A function to validate and transform each item in the list.
 * @param options Custom fetch config, array extractors, and metadata hooks.
 * @returns A Result containing an array of successfully parsed items.
 */
export async function fetchSafeList<T>(
  url: string,
  parser: (input: unknown) => Result<T>,
  options: FetchSafeListOptions = {}
): Promise<Result<T[]>> {
  try {
    const { extractArray, parseMeta, ...fetchConfig } = options;

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

    if (parseMeta) {
      parseMeta(rawData);
    }

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
      // Empty lists are fine, but "not a list" is an error.
      console.warn(
        `safeFetchList expected an array at ${url} but got`,
        rawData
      );
      return ok([]);
    }

    // Try to parse each item, keep the good ones, log the failed ones
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
    // Log Network failures
    return fail(e instanceof Error ? e.message : 'Unknown Network Error');
  }
}

/**
 * A reusable fetcher for a SINGLE item.
 */

export async function fetchSafeItem<T>(
  url: string,
  parser: (input: unknown) => Result<T>,
  config: RequestInit = {}
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
