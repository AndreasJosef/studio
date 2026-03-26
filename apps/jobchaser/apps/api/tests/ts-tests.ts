import { execSync } from 'child_process';
i;
/**
 * Executes an xh command using a TypeScript object as the payload.
 */
function xh(
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE',
  url: string,
  data?: object
) {
  let args = '';

  if (data) {
    args = Object.entries(data)
      .map(([key, value]) => {
        // Use := for numbers/booleans/objects, and = for strings
        const operator = typeof value === 'string' ? '=' : ':=';
        return `${key}${operator}${JSON.stringify(value)}`;
      })
      .join(' ');
  }

  const command = `xh ${method} ${url} ${args}`;
  console.log(`Executing: ${command}`);

  try {
    const output = execSync(command, { encoding: 'utf-8' });
    return JSON.parse(output);
  } catch (error: any) {
    console.error('Request failed:', error.stdout || error.message);
    return null;
  }
}

// Run the test
const healthTest = xh('GET', 'http://localhost:3000/health');
console.log('API Response:', healthTest);

import { CreateJob } from '@jobchaser/domain';

const CreatJobTest: CreateJob = {
  jobTitle: 'TS ENGINEER',
  description: 'A fun job',
  applyBy: null,
};
