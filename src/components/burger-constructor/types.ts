import type { TConstructorIngredient } from '@/types';

export type TConstructorCardProps =
  | {
      ingredient: TConstructorIngredient;
      position: 'top' | 'bottom';
    }
  | {
      ingredient: TConstructorIngredient;
      position?: never;
    };
