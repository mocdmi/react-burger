import type { SerializedError } from '@reduxjs/toolkit';
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';

export const getErrorMessage = (
  error: FetchBaseQueryError | SerializedError | undefined
): string => {
  if (!error) return '';
  if ('status' in error) return `Error code: ${error.status}`;
  return error.message ?? 'Unknown error';
};
