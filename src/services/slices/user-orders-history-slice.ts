import { createSlice } from '@reduxjs/toolkit';

import {
  userOrdersHistoryWsConnected,
  userOrdersHistoryWsDisconnected,
  userOrdersHistoryWsError,
  userOrdersHistoryWsMessage,
} from '../actions/user-orders-history-actions';

import type { TGetOrdersHistoryWsResponse } from '../types';

type TUserOrderHistorySliceState = {
  connected: boolean;
  error: string | null;
  isLoading: boolean;
  messages: TGetOrdersHistoryWsResponse | null;
};

const initialState: TUserOrderHistorySliceState = {
  connected: false,
  error: null,
  messages: null,
  isLoading: true,
};

export const userOrdersHistorySlice = createSlice({
  name: 'userOrdersHistory',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(userOrdersHistoryWsConnected, (state) => {
        state.connected = true;
        state.error = null;
        state.isLoading = true;
      })
      .addCase(userOrdersHistoryWsDisconnected, (state) => {
        state.connected = false;
        state.isLoading = false;
      })
      .addCase(userOrdersHistoryWsError, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      })
      .addCase(userOrdersHistoryWsMessage, (state, action) => {
        state.messages = action.payload;
        state.isLoading = false;
      });
  },
});

export const {
  actions,
  reducer: ordersHistoryUserReducer,
  reducerPath: ordersHistoryUserReducerPath,
} = userOrdersHistorySlice;
