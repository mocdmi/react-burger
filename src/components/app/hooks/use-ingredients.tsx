import { ingredientApi } from '@/services/ingredients-api';
import { useEffect, useState, useTransition } from 'react';

import type { TIngredient } from '@/types';

type TIngredientsState = {
  isPending: boolean;
  ingredients: TIngredient[];
  error: string | null;
};

export const useIngredients = (): TIngredientsState => {
  const [ingredients, setIngredients] = useState<TIngredient[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    const fetchIngredients = async (): Promise<void> => {
      try {
        const ingredients = await ingredientApi.getAll();

        startTransition(() => {
          setIngredients(ingredients);
        });
      } catch (_) {
        setError('Failed to fetch ingredients');
      }
    };

    void fetchIngredients();
  }, []);

  return {
    isPending,
    ingredients,
    error,
  };
};
