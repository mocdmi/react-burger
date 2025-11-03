import type { INGREDIENTS_GROUP_TYPE } from '@/components/burger-ingredients/const';

export type TIngredientsGroupType = keyof typeof INGREDIENTS_GROUP_TYPE;

export type TIngredient = {
  _id: string;
  name: string;
  type: TIngredientsGroupType;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_large: string;
  image_mobile: string;
  __v: number;
};

export type TConstructorIngredient = {
  _id: string;
  instanceId: string;
  name: string;
  type: TIngredientsGroupType;
  price: number;
  image: string;
};
