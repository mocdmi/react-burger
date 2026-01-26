import { refreshToken } from '@/utils/refresh-token';

import type {
  ActionCreatorWithoutPayload,
  ActionCreatorWithPayload,
  Middleware,
  MiddlewareAPI,
} from '@reduxjs/toolkit';

const isInvalidTokenError = (data: unknown): boolean => {
  return (
    typeof data === 'object' &&
    data !== null &&
    'success' in data &&
    data.success === false &&
    'message' in data &&
    data.message === 'Invalid or missing token'
  );
};

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
  isValidMessage: (data: unknown) => data is M,
  shouldRefreshToken = false
): Middleware => {
  let socket: WebSocket | null = null;
  let wsUrl: string | null = null;
  let isReconnecting = false;

  const reconnectWithNewToken = async (store: MiddlewareAPI): Promise<void> => {
    if (isReconnecting || !wsUrl) {
      return;
    }

    isReconnecting = true;

    try {
      const result = await refreshToken();

      if (result.success && result.accessToken) {
        if (socket) {
          socket.close();
          socket = null;
        }

        const url = new URL(wsUrl);
        const token = result.accessToken.replace(/^Bearer\s+/i, '');
        url.searchParams.set('token', token);
        wsUrl = url.toString();

        socket = new WebSocket(wsUrl);

        socket.onopen = (): void => {
          store.dispatch(wsActions.connected());
        };

        socket.onmessage = (event): void => {
          try {
            if (typeof event.data !== 'string') {
              throw new Error('Response error');
            }

            const data: unknown = JSON.parse(event.data);

            if (shouldRefreshToken && isInvalidTokenError(data)) {
              void reconnectWithNewToken(store);
              return;
            }

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
    } catch (error) {
      console.error('Failed to reconnect with new token:', error);
    } finally {
      isReconnecting = false;
    }
  };

  return (store) => (next) => (action) => {
    if (wsActions.connect.match(action)) {
      if (socket) {
        socket.close();
        socket = null;
      }

      wsUrl = action.payload;
      socket = new WebSocket(wsUrl);

      socket.onopen = (): void => {
        store.dispatch(wsActions.connected());
      };

      socket.onmessage = (event): void => {
        try {
          if (typeof event.data !== 'string') {
            throw new Error('Response error');
          }

          const data: unknown = JSON.parse(event.data);

          if (shouldRefreshToken && isInvalidTokenError(data)) {
            void reconnectWithNewToken(store);
            return;
          }

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

      wsUrl = null;
      isReconnecting = false;
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
