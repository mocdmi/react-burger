import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

import { apiMiddleware, apiReducer, apiReducerPath } from './api/api';
import { authReducer, authReducerPath } from './slices/auth-slice';
import {
  ingredientsConstructorReducer,
  ingredientsConstructorReducerPath,
} from './slices/ingredients-constructor-slice';

export const store = configureStore({
  reducer: {
    [ingredientsConstructorReducerPath]: ingredientsConstructorReducer,
    [authReducerPath]: authReducer,
    [apiReducerPath]: apiReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiMiddleware),
  devTools: true,
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
