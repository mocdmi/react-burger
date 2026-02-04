import { describe, expect, it } from 'vitest';

import {
  userOrdersHistoryWsConnected,
  userOrdersHistoryWsDisconnected,
  userOrdersHistoryWsError,
  userOrdersHistoryWsMessage,
} from '@services/actions/user-orders-history-actions.tsx';
import {
  ordersHistoryUserReducer,
  userOrdersHistorySlice,
} from '@services/slices/user-orders-history-slice.ts';

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

describe('userOrdersHistoryReducer', () => {
  const initialState = userOrdersHistorySlice.getInitialState();

  it('должен вернуть начальное состояние', () => {
    expect(ordersHistoryUserReducer(undefined, { type: '@@INIT' })).toEqual(
      initialState
    );
  });

  describe('userOrdersHistoryWsConnected', () => {
    it('должен установить connected в true', () => {
      const nextState = ordersHistoryUserReducer(
        initialState,
        userOrdersHistoryWsConnected()
      );
      expect(nextState.connected).toBe(true);
    });
  });

  describe('userOrdersHistoryWsMessage', () => {
    it('должен сохранить сообщение в state', () => {
      const message = createMockOrdersResponse({
        orders: [
          {
            _id: 'order-1',
            ingredients: ['ing-1'],
            status: 'done',
            number: '123',
            name: 'Order',
            createdAt: '2024-01-01',
            updatedAt: '2024-01-01',
          },
        ],
        total: 1,
        totalToday: 1,
      });
      const nextState = ordersHistoryUserReducer(
        initialState,
        userOrdersHistoryWsMessage(message)
      );
      expect(nextState.messages).toEqual(message);
    });
  });

  describe('userOrdersHistoryWsDisconnected', () => {
    it('должен установить connected в false и isLoading в false', () => {
      const connectedState = {
        ...initialState,
        connected: true,
        isLoading: true,
      };
      const nextState = ordersHistoryUserReducer(
        connectedState,
        userOrdersHistoryWsDisconnected()
      );
      expect(nextState.connected).toBe(false);
      expect(nextState.isLoading).toBe(false);
    });
  });

  describe('userOrdersHistoryWsError', () => {
    it('должен установить ошибку и isLoading в false', () => {
      const errorMessage = 'Connection failed';
      const nextState = ordersHistoryUserReducer(
        initialState,
        userOrdersHistoryWsError(errorMessage)
      );
      expect(nextState.error).toBe(errorMessage);
      expect(nextState.isLoading).toBe(false);
    });
  });
});
