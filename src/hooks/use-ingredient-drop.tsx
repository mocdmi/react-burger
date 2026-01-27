import { DRAG_ITEM_TYPES } from '@/const';
import { useAppDispatch } from '@/services/hooks/use-app-dispatch';
import { useAppSelector } from '@/services/hooks/use-app-selector';
import { getAllConstructorIngredients } from '@/services/selectors/ingredients-constructor-selectors';
import { ingredientsConstructorActions } from '@/services/slices/ingredients-constructor-slice';
import { useEffect, useRef } from 'react';
import { useDrop } from 'react-dnd';

import type { TIngredient, TConstructorIngredient } from '@/types';
import type { ConnectDropTarget } from 'react-dnd';

type TUseIngredientDropResult = {
  dropRef: ConnectDropTarget;
  isOver: boolean;
};

export const useIngredientDrop = (): TUseIngredientDropResult => {
  const ingredients = useAppSelector(getAllConstructorIngredients);
  const dispatch = useAppDispatch();
  const ingredientsRef = useRef<TConstructorIngredient[]>(ingredients);

  useEffect(() => {
    ingredientsRef.current = ingredients;
  }, [ingredients]);

  const [{ isOver }, dropRef] = useDrop<TIngredient, void, { isOver: boolean }>(() => ({
    accept: DRAG_ITEM_TYPES.INGREDIENT,
    drop: (ingredient: TIngredient): void => {
      const uuid = crypto.randomUUID();

      if (ingredient.type === 'bun') {
        const index = ingredientsRef.current.findIndex(
          (ingredient) => ingredient.type === 'bun'
        );

        if (index !== -1) {
          dispatch(
            ingredientsConstructorActions.replaceIngredient({
              index,
              ingredient: { uuid, ...ingredient },
            })
          );
        } else {
          dispatch(ingredientsConstructorActions.addIngredient({ uuid, ...ingredient }));
        }
      } else {
        dispatch(ingredientsConstructorActions.addIngredient({ uuid, ...ingredient }));
      }
    },
    collect: (monitor): { isOver: boolean } => ({
      isOver: monitor.isOver(),
    }),
  }));

  return { dropRef, isOver };
};
