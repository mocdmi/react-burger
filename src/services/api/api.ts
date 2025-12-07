import { createApi } from '@reduxjs/toolkit/query/react';

import { baseQueryWithReAuth } from './utils/base-query-reauth';

export const api = createApi({
  reducerPath: 'api',
  tagTypes: ['Auth', 'Ingredients', 'Ingredient', 'Order', 'User'],
  baseQuery: baseQueryWithReAuth,
  endpoints: () => ({}),
});

export const {
  reducer: apiReducer,
  reducerPath: apiReducerPath,
  middleware: apiMiddleware,
} = api;
