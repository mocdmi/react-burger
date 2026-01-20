import { createSlice } from '@reduxjs/toolkit';

import {
  ordersHistoryUserWsConnected,
  ordersHistoryUserWsDisconnected,
  ordersHistoryUserWsError,
  ordersHistoryUserWsMessage,
} from '../actions/orders-history-user-actions';

import type { TGetOrdersHistoryWsResponse } from '../types';

type TOrderHistoryAllSliceState = {
  connected: boolean;
  error: string | null;
  messages: TGetOrdersHistoryWsResponse | null;
};

const initialState: TOrderHistoryAllSliceState = {
  connected: false,
  error: null,
  messages: null,
};

const ordersHistoryUserSlice = createSlice({
  name: 'ordersHistoryUser',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(ordersHistoryUserWsConnected, (state) => {
        state.connected = true;
        state.error = null;
      })
      .addCase(ordersHistoryUserWsDisconnected, (state) => {
        state.connected = false;
      })
      .addCase(ordersHistoryUserWsError, (state, action) => {
        state.error = action.payload;
      })
      .addCase(ordersHistoryUserWsMessage, (state, action) => {
        state.messages = action.payload;
      });
  },
});

export const {
  reducer: ordersHistoryUserReducer,
  reducerPath: ordersHistoryUserReducerPath,
} = ordersHistoryUserSlice;
