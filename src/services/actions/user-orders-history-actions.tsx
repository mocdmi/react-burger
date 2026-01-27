import { createAction } from '@reduxjs/toolkit';

import type { TGetOrdersHistoryWsRequest, TGetOrdersHistoryWsResponse } from '../types';

export const userOrdersHistoryWsConnect = createAction<{
  url: string;
  withAuth?: boolean;
}>('userOrdersHistory/connect');
export const userOrdersHistoryWsDisconnect = createAction(
  'userOrdersHistory/disconnect'
);
export const userOrdersHistoryWsConnected = createAction('userOrdersHistory/connected');
export const userOrdersHistoryWsDisconnected = createAction(
  'userOrdersHistory/disconnected'
);
export const userOrdersHistoryWsSend = createAction<TGetOrdersHistoryWsRequest>(
  'userOrdersHistory/send'
);
export const userOrdersHistoryWsMessage = createAction<TGetOrdersHistoryWsResponse>(
  'userOrdersHistory/message'
);
export const userOrdersHistoryWsError = createAction<string>('userOrdersHistory/error');
