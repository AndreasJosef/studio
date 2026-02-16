import { Result, ok, fail } from '@/lib/result';
import { parseHTMLToTree } from '@/lib/html-parse';

import { type Job, JobDetail, SearchCompletion } from '@/shared/types';

/**
 * A function that safely parses the response from AF API as the Job type. Wraps the response into a Railway Result. Intended to be used with as the parser for the fetchSafe function
 *
 * @param input the raw input from the response
 * @returns Result<Job>
 */
export function parseAFJobs(input: unknown): Result<Job> {
  if (!input || typeof input !== 'object') {
    return fail('Invalid data: Not an object');
  }

  // Ignoring any here because here is where the raw data form the API enters the system
  // eslint-disable-next-line
  const data = input as Record<string, any>;

  if (!data.id || !data.headline) {
    return fail('Invalid data: No Valid AF API response');
  }

  // Map external keys to internal the internal Job Type
  // Making this valuable via searching the reponse for contact
  // information -> This can become an address book

  return ok({
    id: data.id || '',
    headline: data.headline || '',
    description: data.description.text_formatted || '',
    employer: data.employer.name || '',
    logoUrl: data.logo_url || 'No Logo',
    contactName:
      data.application_contacts[0]?.name ||
      data.employer.url ||
      data.employer.url ||
      'No Name',
    contactEmail:
      data.application_contacts[0]?.email ||
      data.application_details.email ||
      data.employer.email ||
      'No Email',
  });
}

/**
 * A function that safely parses the response from AF typeahed endpoint. Wraps the response into a Railway Result
 *
 * @param input the raw input from the response
 * @returns Result<SearchCompletion>
 */
export function parseAFCompletions(input: unknown): Result<SearchCompletion> {
  if (!input || typeof input !== 'object') {
    return fail('Invalid data: Not an object');
  }

  // Ignoring any here because here is where the raw data form the API enters the system
  // eslint-disable-next-line
  const data = input as Record<string, any>;

  if (!data.value) {
    return fail('Invalid data: No Valid AF API response');
  }

  // Map external keys to internal the internal Type
  return ok({
    value: data.value || '',
    occurrences: data.occurrences || 0,
  });
}

export function parseAFJobDetail(input: unknown): Result<JobDetail> {
  if (!input || typeof input !== 'object') {
    return fail('Invalid data: Not an object');
  }

  // Ignoring any here because here is where the raw data form the API enters the system
  // eslint-disable-next-line
  const data = input as Record<string, any>;

  if (!data.id || !data.headline) {
    return fail('Invalid data: No Valid AF API response');
  }

  // Map external keys to internal the internal Job Type
  // Making this valuable via searching the reponse for contact
  // information -> This can become an address book

  const sanitizedDescription = parseHTMLToTree(
    data.description.text_formatted || ''
  );

  console.log(sanitizedDescription);

  return ok({
    id: data.id || '',
    headline: data.headline || '',
    description: sanitizedDescription,
    employer: data.employer.name || '',
    logoUrl: data.logo_url || 'No Logo',
    contactName:
      data.application_contacts[0]?.name ||
      data.employer.url ||
      data.employer.url ||
      'No Name',
    contactEmail:
      data.application_contacts[0]?.email ||
      data.application_details.email ||
      data.employer.email ||
      'No Email',
  });
}
