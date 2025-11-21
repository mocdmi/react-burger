import { useMemo } from 'react';

import type { TConstructorIngredient } from '@/types';

type TUseConstructorIngredientsResult = {
  bun: TConstructorIngredient | null;
  filling: TConstructorIngredient[];
};

export const useConstructorIngredients = (
  ingredients: TConstructorIngredient[]
): TUseConstructorIngredientsResult => {
  return useMemo(() => {
    return ingredients.reduce<TUseConstructorIngredientsResult>(
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
