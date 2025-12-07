import { api } from '../api';

import type { TCreateOrderRequest, TCreateOrderResponse } from '../../types';

export const orderApi = api.injectEndpoints({
  endpoints: (build) => ({
    createOrder: build.mutation<TCreateOrderResponse, TCreateOrderRequest>({
      query: ({ ingredients }) => ({
        url: '/orders',
        body: { ingredients },
        method: 'POST',
      }),
      invalidatesTags: ['Order'],
    }),
  }),
  overrideExisting: false,
});

export const { useCreateOrderMutation } = orderApi;
