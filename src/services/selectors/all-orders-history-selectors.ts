import { createSelector } from '@reduxjs/toolkit';

import type { RootState } from '../store';
import type { TOrdersHistory } from '@/types';

export const allOrdersHistory = createSelector(
  (state: RootState) => state.allOrdersHistory.messages?.orders,
  (orders): TOrdersHistory[] => orders ?? []
);

export const isAllOrdersHistoryWsConnected = (state: RootState): boolean =>
  state.allOrdersHistory.connected;

export const isAllOrdersHistoryWsMessageLoading = (state: RootState): boolean =>
  state.allOrdersHistory.isLoading;

export const totalAllOrdersHistory = (state: RootState): number =>
  state.allOrdersHistory.messages?.total ?? 0;

export const totalTodayAllOrdersHistory = (state: RootState): number =>
  state.allOrdersHistory.messages?.totalToday ?? 0;
