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

export type TConstructorIngredient = TIngredient & { uuid: string };

export type TLocationState = {
  from?: Location;
};

export const ORDER_HISTORY_STATUS_MAP = {
  pending: 'В работе',
  done: 'Готов',
} as const;

export type TOrdersHistoryStatus = keyof typeof ORDER_HISTORY_STATUS_MAP;
export type TOrdersHistoryStatusLabel =
  (typeof ORDER_HISTORY_STATUS_MAP)[TOrdersHistoryStatus];

export type TOrdersHistory = {
  _id: string;
  ingredients: string[];
  status: TOrdersHistoryStatus;
  number: string;
  name: string;
  createdAt: string;
  updatedAt: string;
};
