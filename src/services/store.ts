import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

import { apiMiddleware, apiReducer, apiReducerPath } from './api/api';
import { ordersHistoryAllMiddleware } from './middlewares/orders-history-all-middleware';
import { ordersHistoryUserMiddleware } from './middlewares/orders-history-user-middleware';
import { authReducer, authReducerPath } from './slices/auth-slice';
import {
  ingredientsConstructorReducer,
  ingredientsConstructorReducerPath,
} from './slices/ingredients-constructor-slice';
import {
  ordersHistoryAllReducer,
  ordersHistoryAllReducerPath,
} from './slices/orders-history-all-slice';
import {
  ordersHistoryUserReducer,
  ordersHistoryUserReducerPath,
} from './slices/orders-history-user-slice';

export const store = configureStore({
  reducer: {
    [ingredientsConstructorReducerPath]: ingredientsConstructorReducer,
    [authReducerPath]: authReducer,
    [apiReducerPath]: apiReducer,
    [ordersHistoryAllReducerPath]: ordersHistoryAllReducer,
    [ordersHistoryUserReducerPath]: ordersHistoryUserReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      apiMiddleware,
      ordersHistoryUserMiddleware,
      ordersHistoryAllMiddleware
    ),
  devTools: true,
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
