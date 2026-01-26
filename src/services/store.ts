import { configureStore, type ActionCreatorWithPayload } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

import {
  allOrdersHistoryWsConnect,
  allOrdersHistoryWsConnected,
  allOrdersHistoryWsDisconnect,
  allOrdersHistoryWsDisconnected,
  allOrdersHistoryWsError,
  allOrdersHistoryWsMessage,
  allOrdersHistoryWsSend,
} from './actions/all-orders-history-actions';
import {
  userOrdersHistoryWsConnect,
  userOrdersHistoryWsConnected,
  userOrdersHistoryWsDisconnect,
  userOrdersHistoryWsDisconnected,
  userOrdersHistoryWsError,
  userOrdersHistoryWsMessage,
  userOrdersHistoryWsSend,
} from './actions/user-orders-history-actions';
import { apiMiddleware, apiReducer, apiReducerPath } from './api/api';
import { socketMiddleware } from './middlewares/socket-middleware';
import {
  ordersHistoryAllReducer,
  ordersHistoryAllReducerPath,
} from './slices/all-orders-history-slice';
import { authReducer, authReducerPath } from './slices/auth-slice';
import {
  ingredientsConstructorReducer,
  ingredientsConstructorReducerPath,
} from './slices/ingredients-constructor-slice';
import {
  ordersHistoryUserReducer,
  ordersHistoryUserReducerPath,
} from './slices/user-orders-history-slice';
import { isOrdersHistoryResponse } from './types';

const wsMiddleware = socketMiddleware([
  {
    wsActions: {
      connect: allOrdersHistoryWsConnect,
      disconnect: allOrdersHistoryWsDisconnect,
      connected: allOrdersHistoryWsConnected,
      disconnected: allOrdersHistoryWsDisconnected,
      error: allOrdersHistoryWsError,
      send: allOrdersHistoryWsSend as ActionCreatorWithPayload<unknown>,
      message: allOrdersHistoryWsMessage as ActionCreatorWithPayload<unknown>,
    },
    isValidMessage: isOrdersHistoryResponse,
  },
  {
    wsActions: {
      connect: userOrdersHistoryWsConnect,
      disconnect: userOrdersHistoryWsDisconnect,
      connected: userOrdersHistoryWsConnected,
      disconnected: userOrdersHistoryWsDisconnected,
      error: userOrdersHistoryWsError,
      send: userOrdersHistoryWsSend as ActionCreatorWithPayload<unknown>,
      message: userOrdersHistoryWsMessage as ActionCreatorWithPayload<unknown>,
    },
    isValidMessage: isOrdersHistoryResponse,
  },
]);

export const store = configureStore({
  reducer: {
    [ingredientsConstructorReducerPath]: ingredientsConstructorReducer,
    [authReducerPath]: authReducer,
    [apiReducerPath]: apiReducer,
    [ordersHistoryAllReducerPath]: ordersHistoryAllReducer,
    [ordersHistoryUserReducerPath]: ordersHistoryUserReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiMiddleware, wsMiddleware),
  devTools: true,
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
