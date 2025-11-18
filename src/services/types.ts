import type { TIngredient } from '@/types';

export type TGetAllIngredientsResponce = {
  success: boolean;
  data: TIngredient[];
};

export type TCreateOrderRequest = {
  ingredients: string[];
};

type TCreateOrderOkResponce = {
  name: string;
  order: {
    number: number;
  };
  success: true;
};

type TCreateOrderErrorResponce = {
  message: string;
  success: false;
};

export type TCreateOrderResponce = TCreateOrderOkResponce | TCreateOrderErrorResponce;
