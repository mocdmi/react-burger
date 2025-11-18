import { useMemo } from 'react';

import type { TIngredient, TIngredientsGroupType } from '@/types';

type TUseIngredientsGroupsResult = {
  groupedIngredients?: Record<TIngredientsGroupType, TIngredient[]>;
};

export const useIngredientsGroups = (
  ingredients?: TIngredient[]
): TUseIngredientsGroupsResult => {
  return useMemo(() => {
    const groupedIngredients = ingredients?.reduce<
      Record<TIngredientsGroupType, TIngredient[]>
    >(
      (acc, ingredient) => {
        acc[ingredient.type] ??= [];
        acc[ingredient.type].push(ingredient);
        return acc;
      },
      {} as Record<TIngredientsGroupType, TIngredient[]>
    );

    return {
      groupedIngredients,
    };
  }, [ingredients]);
};
