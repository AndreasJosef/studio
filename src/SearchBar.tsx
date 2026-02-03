import type { JSX } from "react";

/**
 * Configuration for the SeachrBar Component
 **/
export interface SearchBarProps {
  /** Optional string setting placeholder attribute **/
  placeholder?: string;
}

/**
 * Captures and executes the users job search query
 */
export default function SearchBar(props: SearchBarProps): JSX.Element {
  return (
    <form action="" className="w-full flex gap-2">
      <input
        type="text"
        className="grow bg-neutral-600 px-4 py-2 rounded"
        placeholder={props.placeholder || "Search a Job!"}
      />
      <button className="px-6 bg-indigo-800 rounded">Find Job</button>
    </form>
  );
}
