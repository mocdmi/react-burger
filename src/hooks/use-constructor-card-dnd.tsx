import { DRAG_ITEM_TYPES } from '@/const';
import { useAppDispatch } from '@/services/hooks/use-app-dispatch';
import { useAppSelector } from '@/services/hooks/use-app-selector';
import { getAllConstructorIngredients } from '@/services/selectors/ingredients-constructor';
import { ingredientsConstructorActions } from '@/services/slices/ingredients-constructor-slice';
import { useDrag, useDrop } from 'react-dnd';

import type { TConstructorIngredient } from '@/types';

type TUseConstructorCardDndReturn<T extends HTMLElement = HTMLDivElement> = {
  connectRef: (node: T | null) => void;
  isDragging: boolean;
  isOver: boolean;
};

export function useConstructorCardDnd<T extends HTMLElement = HTMLDivElement>(
  hoverIngredient: TConstructorIngredient
): TUseConstructorCardDndReturn<T> {
  const ingredients = useAppSelector(getAllConstructorIngredients);
  const dispatch = useAppDispatch();

  const [{ isDragging }, dragRef] = useDrag<
    TConstructorIngredient,
    void,
    { isDragging: boolean }
  >({
    type: DRAG_ITEM_TYPES.CONSTRUCTOR_INGREDIENT,
    item: hoverIngredient,
    collect: (monitor): { isDragging: boolean } => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [{ isOver }, dropRef] = useDrop<
    TConstructorIngredient,
    void,
    { isOver: boolean }
  >({
    accept: DRAG_ITEM_TYPES.CONSTRUCTOR_INGREDIENT,
    hover(draggedIngredient: TConstructorIngredient) {
      const hoveredIndex = ingredients.findIndex(
        (ingredient) => ingredient.uuid === hoverIngredient.uuid
      );

      const draggedIndex = ingredients.findIndex(
        (ingredient) => ingredient.uuid === draggedIngredient.uuid
      );

      if (draggedIndex === hoveredIndex) return;

      dispatch(
        ingredientsConstructorActions.moveIngredient({ draggedIndex, hoveredIndex })
      );
    },
    collect: (monitor): { isOver: boolean } => ({
      isOver: monitor.isOver(),
    }),
  });

  const connectRef = (node: T | null): void => {
    dragRef(node);
    dropRef(node);
  };

  return {
    connectRef,
    isDragging,
    isOver,
  };
}
