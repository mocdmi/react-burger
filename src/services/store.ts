import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

import {
  ingredientsApiMiddleware,
  ingredientsApiReducer,
  ingredientsApiReducerPath,
} from './api/ingredients-api';
import {
  orderApiMiddleware,
  orderApiReducer,
  orderApiReducerPath,
} from './api/order-api';
import {
  ingredientsConstructorReducer,
  ingredientsConstructorReducerPath,
} from './slices/ingredients-constructor-slice';

export const store = configureStore({
  reducer: {
    [ingredientsConstructorReducerPath]: ingredientsConstructorReducer,
    [ingredientsApiReducerPath]: ingredientsApiReducer,
    [orderApiReducerPath]: orderApiReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(ingredientsApiMiddleware, orderApiMiddleware),
  devTools: true,
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
