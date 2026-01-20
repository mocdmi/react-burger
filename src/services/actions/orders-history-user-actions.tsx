import { createAction } from '@reduxjs/toolkit';

import type { TGetOrdersHistoryWsRequest, TGetOrdersHistoryWsResponse } from '../types';

export const ordersHistoryUserWsConnect = createAction<string>(
  'ordersHistoryUser/connect'
);
export const ordersHistoryUserWsDisconnect = createAction(
  'ordersHistoryUser/disconnect'
);
export const ordersHistoryUserWsConnected = createAction('order_history_user/connected');
export const ordersHistoryUserWsDisconnected = createAction(
  'ordersHistoryUser/disconnected'
);
export const ordersHistoryUserWsSend = createAction<TGetOrdersHistoryWsRequest>(
  'ordersHistoryUser/send'
);
export const ordersHistoryUserWsMessage = createAction<TGetOrdersHistoryWsResponse>(
  'ordersHistoryUser/message'
);
export const ordersHistoryUserWsError = createAction<string>('ordersHistoryUser/error');
