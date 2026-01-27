import { type LineType } from "./types";

// Regex for TS Error
const TS_ERROR_REGEX = /^(.+)\((\d+),(\d+)\):\s+(error\s+TS\d+[^:]*):\s+(.*)$/;

export function parseLine(line: string): LineType {
  // Check for Start Signal
  if (
    line.includes("File change detected") ||
    line.includes("Starting compilation")
  ) {
    return { type: "start" };
  }

  // Check for Success Signal
  if (line.includes("Found 0 errors")) {
    return { type: "success" };
  }

  // Check for Error Pattern
  const match = line.match(TS_ERROR_REGEX);
  if (match) {
    return {
      type: "error",
      payload: {
        file: match[1],
        line: match[2],
        col: match[3],
        code: match[4], // e.g. "error TS2307"
        message: match[5],
      },
    };
  }

  // Default to ignoring the line
  return { type: "ignore" };
}
