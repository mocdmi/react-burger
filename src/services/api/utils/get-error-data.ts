import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';

export const getErrorData = <T>(error: unknown): T | null => {
  if (!error) return null;

  if (typeof error === 'object' && 'status' in error) {
    const data = (error as FetchBaseQueryError).data;
    return data as T;
  }

  return null;
};
