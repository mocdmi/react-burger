import { api } from '../api';

import type { TGetAllIngredientsResponse } from '../../types';

export const ingredientsApi = api.injectEndpoints({
  endpoints: (build) => ({
    getAllIngredients: build.query<TGetAllIngredientsResponse, void>({
      query: () => '/ingredients',
      providesTags: ['Ingredients'],
    }),
  }),
  overrideExisting: false,
});

export const { useGetAllIngredientsQuery } = ingredientsApi;
