import { createSelector } from '@reduxjs/toolkit';

import type { RootState } from '../store';
import type { TOrdersHistory } from '@/types';

export const userOrdersHistory = createSelector(
  (state: RootState) => state.userOrdersHistory.messages?.orders,
  (orders): TOrdersHistory[] => orders ?? []
);

export const isUserOrdersHistoryWsConnected = (state: RootState): boolean =>
  state.userOrdersHistory.connected;

export const isUserOrdersHistoryWsMessageLoading = (state: RootState): boolean =>
  state.userOrdersHistory.isLoading;

export const totalUserOrdersHistory = (state: RootState): number =>
  state.userOrdersHistory.messages?.total ?? 0;

export const totalTodayUserOrdersHistory = (state: RootState): number =>
  state.userOrdersHistory.messages?.totalToday ?? 0;
