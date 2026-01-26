import type {
  ActionCreatorWithoutPayload,
  ActionCreatorWithPayload,
  Middleware,
} from '@reduxjs/toolkit';

export type TWsActions<S = unknown, M = unknown> = {
  connect: ActionCreatorWithPayload<string>;
  disconnect: ActionCreatorWithoutPayload;
  connected: ActionCreatorWithoutPayload;
  disconnected: ActionCreatorWithoutPayload;
  error: ActionCreatorWithPayload<string>;
  send: ActionCreatorWithPayload<S>;
  message: ActionCreatorWithPayload<M>;
};

export const createWebsocketMiddleware = <S = unknown, M = unknown>(
  wsActions: TWsActions<S, M>,
  isValidMessage: (data: unknown) => data is M
): Middleware => {
  let socket: WebSocket | null = null;

  return (store) => (next) => (action) => {
    if (wsActions.connect.match(action)) {
      if (socket) {
        socket.close();
        socket = null;
      }

      socket = new WebSocket(action.payload);

      socket.onopen = (): void => {
        store.dispatch(wsActions.connected());
      };

      socket.onmessage = (event): void => {
        try {
          if (typeof event.data !== 'string') {
            throw new Error('Response error');
          }

          const data: unknown = JSON.parse(event.data);

          if (isValidMessage(data)) {
            store.dispatch(wsActions.message(data));
          }
        } catch (err: unknown) {
          const message = err instanceof Error ? err.message : 'WS data parse error';
          console.log(message);
        }
      };

      socket.onerror = (): void => {
        store.dispatch(wsActions.error('WS error'));
      };

      socket.onclose = (): void => {
        store.dispatch(wsActions.disconnected());
      };
    }

    if (wsActions.disconnect.match(action)) {
      if (socket) {
        socket.close();
        socket = null;
      }
    }

    if (wsActions.send.match(action)) {
      if (socket?.readyState === WebSocket.OPEN) {
        socket.send(JSON.stringify(action.payload));
      } else {
        console.warn('WS not open, message not sent');
      }
    }

    return next(action);
  };
};
