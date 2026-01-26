import { createSlice } from '@reduxjs/toolkit';

import {
  allOrdersHistoryWsConnected,
  allOrdersHistoryWsDisconnected,
  allOrdersHistoryWsError,
  allOrdersHistoryWsMessage,
} from '../actions/all-orders-history-actions';

import type { TGetOrdersHistoryWsResponse } from '../types';

type TAllOrdersHistorySliceState = {
  connected: boolean;
  error: string | null;
  isLoading: boolean;
  messages: TGetOrdersHistoryWsResponse | null;
};

const initialState: TAllOrdersHistorySliceState = {
  connected: false,
  error: null,
  isLoading: true,
  messages: null,
};

export const allOrdersHistorySlice = createSlice({
  name: 'allOrdersHistory',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(allOrdersHistoryWsConnected, (state) => {
        state.connected = true;
        state.error = null;
        state.isLoading = true;
      })
      .addCase(allOrdersHistoryWsDisconnected, (state) => {
        state.connected = false;
        state.isLoading = false;
      })
      .addCase(allOrdersHistoryWsError, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      })
      .addCase(allOrdersHistoryWsMessage, (state, action) => {
        state.messages = action.payload;
        state.isLoading = false;
      });
  },
});

export const {
  reducer: ordersHistoryAllReducer,
  reducerPath: ordersHistoryAllReducerPath,
} = allOrdersHistorySlice;
