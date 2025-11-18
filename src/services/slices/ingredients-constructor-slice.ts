import { createSlice } from '@reduxjs/toolkit';

import type { TConstructorIngredient } from '../../types';
import type { PayloadAction } from '@reduxjs/toolkit';

const initialState: TConstructorIngredient[] = [];

export const ingredientsConstructorSlice = createSlice({
  name: 'ingredientsConstructor',
  initialState,
  reducers: {
    addIngredient: (state, action: PayloadAction<TConstructorIngredient>) => {
      const ingredient = action.payload;
      state.push(ingredient);
    },
    replaceIngredient: (
      state,
      action: PayloadAction<{ index: number; ingredient: TConstructorIngredient }>
    ) => {
      const { index, ingredient } = action.payload;
      state.splice(index, 1, ingredient);
    },
    moveIngredient: (
      state,
      action: PayloadAction<{
        draggedIndex: number;
        hoveredIndex: number;
      }>
    ) => {
      const { draggedIndex, hoveredIndex } = action.payload;
      const [currentIngredient] = state.splice(draggedIndex, 1);
      state.splice(hoveredIndex, 0, currentIngredient);
    },
    deleteIngredient: (state, action: PayloadAction<{ index: number }>) => {
      const { index } = action.payload;
      state.splice(index, 1);
    },
    reset: () => [],
  },
});

export const {
  actions: ingredientsConstructorActions,
  reducer: ingredientsConstructorReducer,
  reducerPath: ingredientsConstructorReducerPath,
} = ingredientsConstructorSlice;
