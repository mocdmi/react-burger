import { useGetAllIngredientsQuery } from '@/services/api/endpoints/ingredients-endpoints';
import { useMemo } from 'react';

import type { TIngredient } from '@/types';
import type { SerializedError } from '@reduxjs/toolkit';
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';

type TUseGetIngredientsByIdsResult = {
  ingredients: TIngredient[];
  ingredientsCountMap: Record<string, number>;
  isLoading: boolean;
  error: FetchBaseQueryError | SerializedError | undefined;
  isError: boolean;
};

export const useGetIngredientsByIds = (ids: string[]): TUseGetIngredientsByIdsResult => {
  const { data, isLoading, error, isError } = useGetAllIngredientsQuery();

  const ingredientsCountMap = useMemo<Record<string, number>>(() => {
    return ids.reduce<Record<string, number>>((acc, id) => {
      acc[id] = (acc[id] ?? 0) + 1;
      return acc;
    }, {});
  }, [ids]);

  const ingredients = useMemo<TIngredient[]>(() => {
    if (!data?.data || !ids.length) return [];

    return ids
      .map((id) => data.data.find((ingredient) => ingredient._id === id))
      .filter((ingredient): ingredient is TIngredient => Boolean(ingredient));
  }, [data, ids]);

  return { ingredients, ingredientsCountMap, isLoading, error, isError };
};
