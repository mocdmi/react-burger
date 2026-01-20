import { createSlice } from '@reduxjs/toolkit';

import {
  ordersHistoryAllWsConnected,
  ordersHistoryAllWsDisconnected,
  ordersHistoryAllWsError,
  ordersHistoryAllWsMessage,
} from '../actions/orders-history-all-actions';

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

const ordersHistoryAllSlice = createSlice({
  name: 'ordersHistoryAll',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(ordersHistoryAllWsConnected, (state) => {
        state.connected = true;
        state.error = null;
      })
      .addCase(ordersHistoryAllWsDisconnected, (state) => {
        state.connected = false;
      })
      .addCase(ordersHistoryAllWsError, (state, action) => {
        state.error = action.payload;
      })
      .addCase(ordersHistoryAllWsMessage, (state, action) => {
        state.messages = action.payload;
      });
  },
});

export const {
  reducer: ordersHistoryAllReducer,
  reducerPath: ordersHistoryAllReducerPath,
} = ordersHistoryAllSlice;
