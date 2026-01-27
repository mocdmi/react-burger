import { createAction } from '@reduxjs/toolkit';

import type { TGetOrdersHistoryWsRequest, TGetOrdersHistoryWsResponse } from '../types';

export const allOrdersHistoryWsConnect = createAction<{
  url: string;
  withAuth?: boolean;
}>('allOrdersHistory/connect');
export const allOrdersHistoryWsDisconnect = createAction('allOrdersHistory/disconnect');
export const allOrdersHistoryWsConnected = createAction('allOrdersHistory/connected');
export const allOrdersHistoryWsDisconnected = createAction(
  'allOrdersHistory/disconnected'
);
export const allOrdersHistoryWsSend = createAction<TGetOrdersHistoryWsRequest>(
  'allOrdersHistory/send'
);
export const allOrdersHistoryWsMessage = createAction<TGetOrdersHistoryWsResponse>(
  'allOrdersHistory/message'
);
export const allOrdersHistoryWsError = createAction<string>('allOrdersHistory/error');
