import { API_URL } from '@/const';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import type { TGetAllIngredientsResponce } from '../types';

export const ingredientsApi = createApi({
  reducerPath: 'ingredientsApi',
  tagTypes: ['Ingredients'],
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
  }),
  endpoints: (build) => ({
    getAllIngredients: build.query<TGetAllIngredientsResponce, void>({
      query: () => '/ingredients',
    }),
  }),
});

export const {
  reducer: ingredientsApiReducer,
  reducerPath: ingredientsApiReducerPath,
  middleware: ingredientsApiMiddleware,
  useGetAllIngredientsQuery,
} = ingredientsApi;
