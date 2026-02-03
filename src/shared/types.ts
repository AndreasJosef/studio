/**
 * The main type in JobChasers domain representing
 * a single Job as it exist in the App
 **/
export interface Job {
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
