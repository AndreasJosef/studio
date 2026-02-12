/**
 * The main type in JobChasers domain representing
 * a single Job as it exist in the App
 **/
export interface Job {
  id: number;
  headline: string;
  employer: string;
  description: string;
  logoUrl: string;
  contactName: string;
  contactEmail: string;
}

export interface JobResponseMeta {
  total: number;
}

export interface SearchCompletion {
  value: string;
  occurrences: number;
}
