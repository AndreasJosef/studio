import { type LineType } from './types';

const ANSI_REGEX = /\x1b\[[0-9;]*m/g;
// Matches "error TSxxxx" anywhere in the line
const ERROR_CODE_REGEX = /error\s+(TS\d+)/;
// Matches file paths like "src/App.tsx(10,5)" or "src/App.tsx:10:5"
const FILE_LOC_REGEX = /([a-zA-Z0-9_\-./\\]+)[(:](\d+)[,:](\d+)[):]?/;

export function parseLine(line: string): LineType {
  const clean = line.replace(ANSI_REGEX, '').trim();

  // 1. START
  if (
    clean.includes('File change detected') ||
    clean.includes('Starting compilation') ||
    clean.includes('Starting incremental')
  ) {
    return { type: 'start' };
  }

  // 2. COMPLETE (Found 0 errors OR Watching...)
  if (clean.includes('Watching for file changes')) {
    return { type: 'complete' };
  }

  // 3. ERROR
  const errorMatch = clean.match(ERROR_CODE_REGEX);
  if (errorMatch) {
    const fileMatch = clean.match(FILE_LOC_REGEX);

    if (fileMatch) {
      // Extract the message (everything after the error code)
      const messagePart = clean.split(errorMatch[0])[1] || '';

      return {
        type: 'error',
        payload: {
          file: fileMatch[1],
          line: fileMatch[2],
          col: fileMatch[3],
          code: errorMatch[1],
          message: messagePart.replace(/^:\s*/, '').trim(),
        },
      };
    }
  }

  return { type: 'ignore' };
}
