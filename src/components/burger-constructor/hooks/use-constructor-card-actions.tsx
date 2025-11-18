import { useAppDispatch } from '@/services/hooks/use-app-dispatch';
import { useAppSelector } from '@/services/hooks/use-app-selector';
import { getAllConstructorIngredients } from '@/services/selectors/ingredients-constructor';
import { ingredientsConstructorActions } from '@/services/slices/ingredients-constructor-slice';
import { useCallback } from 'react';

import type { TConstructorIngredient } from '@/types';

export const useConstructorCardActions = (
  ingredient: TConstructorIngredient
): { handleDeleteClick: () => void } => {
  const ingredients = useAppSelector(getAllConstructorIngredients);
  const dispatch = useAppDispatch();

  const handleDeleteClick = useCallback((): void => {
    const index = ingredients.findIndex(
      (ingredientInList) => ingredientInList.uuid === ingredient.uuid
    );

    if (index !== -1) {
      dispatch(ingredientsConstructorActions.deleteIngredient({ index }));
    }
  }, [ingredients]);

  return {
    handleDeleteClick,
  };
};
