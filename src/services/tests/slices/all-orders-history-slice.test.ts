import { describe, expect, it } from 'vitest';

import {
  allOrdersHistoryWsConnected,
  allOrdersHistoryWsDisconnected,
  allOrdersHistoryWsError,
  allOrdersHistoryWsMessage,
} from '@services/actions/all-orders-history-actions.tsx';
import {
  ordersHistoryAllReducer,
  allOrdersHistorySlice,
} from '@services/slices/all-orders-history-slice.ts';

import type { TGetOrdersHistoryWsResponse } from '@services/types.ts';

const createMockOrdersResponse = (
  overrides: Partial<TGetOrdersHistoryWsResponse> = {}
): TGetOrdersHistoryWsResponse => ({
  success: true,
  orders: [],
  total: 0,
  totalToday: 0,
  ...overrides,
});

describe('allOrdersHistoryReducer', () => {
  const initialState = allOrdersHistorySlice.getInitialState();

  it('должен вернуть начальное состояние', () => {
    expect(ordersHistoryAllReducer(undefined, { type: '@@INIT' })).toEqual(initialState);
  });

  describe('allOrdersHistoryWsConnected', () => {
    it('должен установить connected в true', () => {
      const nextState = ordersHistoryAllReducer(
        initialState,
        allOrdersHistoryWsConnected()
      );
      expect(nextState.connected).toBe(true);
    });
  });

  describe('allOrdersHistoryWsMessage', () => {
    it('должен сохранить сообщение в state', () => {
      const message = createMockOrdersResponse();
      const nextState = ordersHistoryAllReducer(
        initialState,
        allOrdersHistoryWsMessage(message)
      );
      expect(nextState.messages).toEqual(message);
    });
  });

  describe('allOrdersHistoryWsDisconnected', () => {
    it('должен установить connected в false и isLoading в false', () => {
      const connectedState = {
        ...initialState,
        connected: true,
        isLoading: true,
      };
      const nextState = ordersHistoryAllReducer(
        connectedState,
        allOrdersHistoryWsDisconnected()
      );
      expect(nextState.connected).toBe(false);
      expect(nextState.isLoading).toBe(false);
    });
  });

  describe('allOrdersHistoryWsError', () => {
    it('должен установить ошибку и isLoading в false', () => {
      const errorMessage = 'Connection failed';
      const nextState = ordersHistoryAllReducer(
        initialState,
        allOrdersHistoryWsError(errorMessage)
      );
      expect(nextState.error).toBe(errorMessage);
      expect(nextState.isLoading).toBe(false);
    });
  });
});
