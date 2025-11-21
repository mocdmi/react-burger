import { API_URL } from '@/const';
import { fetchBaseQuery } from '@reduxjs/toolkit/query';
import { createApi } from '@reduxjs/toolkit/query/react';

import type { TCreateOrderRequest, TCreateOrderResponce } from '../types';

export const orderApi = createApi({
  reducerPath: 'orderApi',
  tagTypes: ['Order'],
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
  }),
  endpoints: (build) => ({
    createOrder: build.mutation<TCreateOrderResponce, TCreateOrderRequest>({
      query: ({ ingredients }) => ({
        url: '/orders',
        body: { ingredients },
        method: 'POST',
      }),
    }),
  }),
});

export const {
  reducer: orderApiReducer,
  reducerPath: orderApiReducerPath,
  middleware: orderApiMiddleware,
  useCreateOrderMutation,
} = orderApi;
