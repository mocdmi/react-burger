import {
  ordersHistoryAllWsConnect,
  ordersHistoryAllWsConnected,
  ordersHistoryAllWsDisconnect,
  ordersHistoryAllWsDisconnected,
  ordersHistoryAllWsError,
  ordersHistoryAllWsMessage,
  ordersHistoryAllWsSend,
} from '../actions/orders-history-all-actions';
import {
  isOrdersHistoryResponse,
  type TGetOrdersHistoryWsRequest,
  type TGetOrdersHistoryWsResponse,
} from '../types';
import { createWebsocketMiddleware } from './create-websocket-middleware';

import type { TWsActions } from './create-websocket-middleware';

const actions: TWsActions<TGetOrdersHistoryWsRequest, TGetOrdersHistoryWsResponse> = {
  connect: ordersHistoryAllWsConnect,
  disconnect: ordersHistoryAllWsDisconnect,
  connected: ordersHistoryAllWsConnected,
  disconnected: ordersHistoryAllWsDisconnected,
  error: ordersHistoryAllWsError,
  send: ordersHistoryAllWsSend,
  message: ordersHistoryAllWsMessage,
};

export const ordersHistoryAllMiddleware = createWebsocketMiddleware<
  TGetOrdersHistoryWsRequest,
  TGetOrdersHistoryWsResponse
>(actions, isOrdersHistoryResponse);
