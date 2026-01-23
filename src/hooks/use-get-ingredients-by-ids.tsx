import { useGetAllIngredientsQuery } from '@/services/api/endpoints/ingredients-endpoints';
import { useMemo } from 'react';

import type { TIngredient } from '@/types';
import type { SerializedError } from '@reduxjs/toolkit';
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';

type TUseGetIngredientsByIdsResult = {
  ingredients: (TIngredient & { count: number })[];
  isLoading: boolean;
  error: FetchBaseQueryError | SerializedError | undefined;
  isError: boolean;
};

export const useGetIngredientsByIds = (ids: string[]): TUseGetIngredientsByIdsResult => {
  const { data, isLoading, error, isError } = useGetAllIngredientsQuery();

  const ingredients = useMemo(() => {
    if (!data?.data?.length || !ids.length) {
      return [];
    }

    const countMap = ids.reduce<Record<string, number>>((acc, id) => {
      acc[id] = (acc[id] ?? 0) + 1;
      return acc;
    }, {});

    return data.data
      .filter((item) => countMap[item._id])
      .map((item) => ({
        ...item,
        count: countMap[item._id],
      }));
  }, [data, ids]);

  return { ingredients, isLoading, error, isError };
};
