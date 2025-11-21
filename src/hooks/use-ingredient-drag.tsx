import { DRAG_ITEM_TYPES } from '@/const';
import { useDrag } from 'react-dnd';

import type { TIngredient } from '@/types';
import type { ConnectDragSource } from 'react-dnd';

type TUseIngredientDragResult = {
  dragRef: ConnectDragSource;
  isDragging: boolean;
};

export const useIngredientDrag = (ingredient: TIngredient): TUseIngredientDragResult => {
  const [{ isDragging }, dragRef] = useDrag<TIngredient, void, { isDragging: boolean }>(
    () => ({
      type: DRAG_ITEM_TYPES.INGREDIENT,
      item: ingredient,
      collect: (monitor): { isDragging: boolean } => ({
        isDragging: monitor.isDragging(),
      }),
    })
  );

  return { dragRef, isDragging };
};
