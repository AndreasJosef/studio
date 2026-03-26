export const APPLICATION_STATUS = {
  BOOKMARKED: 'bookmarked',
  APPLIED: 'applied',
  NEXT: 'next',
  ARCHIVED: 'archived',
} as const;

export const APPLICATION_STATUS_VALUES = Object.values(APPLICATION_STATUS) as [
  string,
  ...string[],
];
