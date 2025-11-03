import { useMemo } from 'react';

import type { TConstructorIngredient } from '@/types';

type TConstructorIngredientsState = {
  bun: TConstructorIngredient | null;
  filling: TConstructorIngredient[];
};

export const useConstructorIngredients = (
  ingredients: TConstructorIngredient[]
): TConstructorIngredientsState => {
  return useMemo(() => {
    return ingredients.reduce<TConstructorIngredientsState>(
      (acc, ingredient) => {
        if (ingredient.type === 'bun') {
          acc.bun = ingredient;
        } else {
          acc.filling.push(ingredient);
        }

        return acc;
      },
      { bun: null, filling: [] }
    );
  }, [ingredients]);
};
