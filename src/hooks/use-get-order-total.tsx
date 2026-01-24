import { useMemo } from 'react';

import type { TIngredient } from '@/types';

export const useGetOrderTotal = (ingredients: TIngredient[]): number => {
  return useMemo(
    () =>
      ingredients.reduce((acc, ingredient) => {
        if (ingredient.type === 'bun') {
          return acc + ingredient.price * 2;
        }

        return acc + ingredient.price;
      }, 0),
    [ingredients]
  );
};
