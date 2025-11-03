import { useMemo } from 'react';

import type { TConstructorIngredient } from '@/types';

type TOrderState = {
  total: number;
};

export const useOrder = (ingredients: TConstructorIngredient[]): TOrderState => {
  const total = useMemo(
    () =>
      ingredients.reduce((acc, ingredient) => {
        if (ingredient.type === 'bun') {
          return acc + ingredient.price * 2;
        }

        return acc + ingredient.price;
      }, 0),
    [ingredients]
  );

  return {
    total,
  };
};
