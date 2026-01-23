import { useMemo } from 'react';

import type { TIngredient } from '@/types';

export const useGetOrderSum = (
  ingredients: (TIngredient & { count: number })[]
): number => {
  return useMemo(
    () => ingredients.reduce((acc, { count, price }) => acc + count * price, 0),
    [ingredients]
  );
};
