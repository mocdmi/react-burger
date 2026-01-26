import { useGetIngredientsByIds } from '@/hooks/use-get-ingredients-by-ids';
import { useGetOrderTotal } from '@/hooks/use-get-order-total';
import { useMemo } from 'react';

import type { TIngredient, TOrdersHistory } from '@/types';

type TUserOrderHistoryCardResult = Pick<
  TOrdersHistory,
  'number' | 'name' | 'status' | 'createdAt'
> & {
  isLoading: boolean;
  ingredients: TIngredient[];
  moreCount: number;
  total: number;
};

export const useOrderHistoryCard = (
  order: TOrdersHistory
): TUserOrderHistoryCardResult => {
  const { name, number, status, createdAt, ingredients: ingredientsIds } = order;
  const { ingredients, isLoading } = useGetIngredientsByIds(ingredientsIds);
  const total = useGetOrderTotal(ingredients);

  const ingredientsSlice = useMemo(() => ingredients.slice(0, 6), [ingredients]);

  const moreCount = useMemo(
    () => (ingredients ? Math.max(ingredients.length - ingredientsSlice.length, 0) : 0),
    [ingredients, ingredientsSlice.length]
  );

  return {
    isLoading,
    number,
    name,
    status,
    createdAt,
    ingredients: ingredientsSlice,
    moreCount,
    total,
  };
};
