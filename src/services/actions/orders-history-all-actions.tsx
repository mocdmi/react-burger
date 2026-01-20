import { createAction } from '@reduxjs/toolkit';

import type { TGetOrdersHistoryWsRequest, TGetOrdersHistoryWsResponse } from '../types';

export const ordersHistoryAllWsConnect = createAction<string>('orderHistoryAll/connect');
export const ordersHistoryAllWsDisconnect = createAction('order_history_all/disconnect');
export const ordersHistoryAllWsConnected = createAction('order_history_all/connected');
export const ordersHistoryAllWsDisconnected = createAction(
  'orderHistoryAll/disconnected'
);
export const ordersHistoryAllWsSend =
  createAction<TGetOrdersHistoryWsRequest>('orderHistoryAll/send');
export const ordersHistoryAllWsMessage = createAction<TGetOrdersHistoryWsResponse>(
  'orderHistoryAll/message'
);
export const ordersHistoryAllWsError = createAction<string>('order_history_all/error');
