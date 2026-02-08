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

export interface SearchCompletion {
  value: string;
  occurrences: number;
}

export interface JobOld {
  id: number;
  company: string;
  logo: string;
  position: string;
  role: string;
  level: string;
  postedAt: string;
  contract: string;
  location: string;
  languages: string[];
  tools: string[];
}
