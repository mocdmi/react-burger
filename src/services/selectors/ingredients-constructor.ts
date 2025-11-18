import type { RootState } from '../store';
import type { TConstructorIngredient } from '@/types';

export const getAllConstructorIngredients = (
  state: RootState
): TConstructorIngredient[] => state.ingredientsConstructor;
