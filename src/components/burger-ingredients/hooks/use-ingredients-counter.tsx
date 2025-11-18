import { useAppSelector } from '@/services/hooks/use-app-selector';
import { getAllConstructorIngredients } from '@/services/selectors/ingredients-constructor';
import { useMemo } from 'react';

export const useIngredientsCounter = (): {
  ingredientCounts: Record<string, number>;
} => {
  const ingredients = useAppSelector(getAllConstructorIngredients);

  const ingredientCounts = useMemo(() => {
    return ingredients.reduce<Record<string, number>>((acc, ingredient) => {
      acc[ingredient._id] = (acc[ingredient._id] || 0) + 1;
      return acc;
    }, {});
  }, [ingredients]);

  return {
    ingredientCounts,
  };
};
