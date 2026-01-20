import {
  ordersHistoryUserWsConnect,
  ordersHistoryUserWsConnected,
  ordersHistoryUserWsDisconnect,
  ordersHistoryUserWsDisconnected,
  ordersHistoryUserWsError,
  ordersHistoryUserWsMessage,
  ordersHistoryUserWsSend,
} from '../actions/orders-history-user-actions';
import {
  isOrdersHistoryResponse,
  type TGetOrdersHistoryWsRequest,
  type TGetOrdersHistoryWsResponse,
} from '../types';
import { createWebsocketMiddleware } from './create-websocket-middleware';

import type { TWsActions } from './create-websocket-middleware';

const actions: TWsActions<TGetOrdersHistoryWsRequest, TGetOrdersHistoryWsResponse> = {
  connect: ordersHistoryUserWsConnect,
  disconnect: ordersHistoryUserWsDisconnect,
  connected: ordersHistoryUserWsConnected,
  disconnected: ordersHistoryUserWsDisconnected,
  error: ordersHistoryUserWsError,
  send: ordersHistoryUserWsSend,
  message: ordersHistoryUserWsMessage,
};

export const ordersHistoryUserMiddleware = createWebsocketMiddleware<
  TGetOrdersHistoryWsRequest,
  TGetOrdersHistoryWsResponse
>(actions, isOrdersHistoryResponse);
