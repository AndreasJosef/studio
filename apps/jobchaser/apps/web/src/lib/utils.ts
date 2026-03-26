/**
 * A simple function pause execution for example to mock slow network request
 *
 * @param ms the time in ms the pause should last
 * @example await delay(500);
 * **/
export const delay = async (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));
