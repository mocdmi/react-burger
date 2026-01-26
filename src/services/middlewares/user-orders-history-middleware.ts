import {
  userOrdersHistoryWsConnect,
  userOrdersHistoryWsConnected,
  userOrdersHistoryWsDisconnect,
  userOrdersHistoryWsDisconnected,
  userOrdersHistoryWsError,
  userOrdersHistoryWsMessage,
  userOrdersHistoryWsSend,
} from '../actions/user-orders-history-actions';
import {
  isOrdersHistoryResponse,
  type TGetOrdersHistoryWsRequest,
  type TGetOrdersHistoryWsResponse,
} from '../types';
import { createWebsocketMiddleware } from './create-websocket-middleware';

import type { TWsActions } from './create-websocket-middleware';

const actions: TWsActions<TGetOrdersHistoryWsRequest, TGetOrdersHistoryWsResponse> = {
  connect: userOrdersHistoryWsConnect,
  disconnect: userOrdersHistoryWsDisconnect,
  connected: userOrdersHistoryWsConnected,
  disconnected: userOrdersHistoryWsDisconnected,
  error: userOrdersHistoryWsError,
  send: userOrdersHistoryWsSend,
  message: userOrdersHistoryWsMessage,
};

export const userOrdersHistoryMiddleware = createWebsocketMiddleware<
  TGetOrdersHistoryWsRequest,
  TGetOrdersHistoryWsResponse
>(actions, isOrdersHistoryResponse, true);
