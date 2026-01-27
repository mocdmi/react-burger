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

export type TSocketActions = {
  connect: ActionCreatorWithPayload<{ url: string; withAuth?: boolean }>;
  disconnect: ActionCreatorWithoutPayload;
  connected: ActionCreatorWithoutPayload;
  disconnected: ActionCreatorWithoutPayload;
  error: ActionCreatorWithPayload<string>;
  send: ActionCreatorWithPayload<unknown>;
  message: ActionCreatorWithPayload<unknown>;
};

export type TSocketMiddlewareConfig = {
  wsActions: TSocketActions;
  isValidMessage: (data: unknown) => boolean;
};

export const socketMiddleware = (configs: TSocketMiddlewareConfig[]): Middleware => {
  const sockets = new Map<
    string,
    {
      socket: WebSocket;
      url: string;
      withAuth: boolean;
      isReconnecting: boolean;
      config: TSocketMiddlewareConfig;
    }
  >();

  const getSocketKey = (config: TSocketMiddlewareConfig): string => {
    return config.wsActions.connect.type;
  };

  const setupSocketHandlers = (
    store: MiddlewareAPI,
    ws: WebSocket,
    config: TSocketMiddlewareConfig,
    socketKey: string
  ): void => {
    ws.onopen = (): void => {
      store.dispatch(config.wsActions.connected());
    };

    ws.onmessage = (event): void => {
      try {
        if (typeof event.data !== 'string') {
          throw new Error('Response error');
        }

        const data: unknown = JSON.parse(event.data);
        const socketData = sockets.get(socketKey);

        if (socketData?.withAuth && isInvalidTokenError(data)) {
          void reconnectWithNewToken(store, socketKey);
          return;
        }

        if (config.isValidMessage(data)) {
          store.dispatch(config.wsActions.message(data));
        }
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : 'WS data parse error';
        console.log(message);
      }
    };

    ws.onerror = (): void => {
      store.dispatch(config.wsActions.error('WS error'));
    };

    ws.onclose = (): void => {
      store.dispatch(config.wsActions.disconnected());
      sockets.delete(socketKey);
    };
  };

  const reconnectWithNewToken = async (
    store: MiddlewareAPI,
    socketKey: string
  ): Promise<void> => {
    const socketData = sockets.get(socketKey);

    if (!socketData || socketData.isReconnecting) {
      return;
    }

    socketData.isReconnecting = true;

    try {
      const result = await refreshToken();

      if (result.success && result.accessToken) {
        socketData.socket.close();

        const url = new URL(socketData.url);
        const token = result.accessToken.replace(/^Bearer\s+/i, '');
        url.searchParams.set('token', token);
        const newUrl = url.toString();

        const newSocket = new WebSocket(newUrl);

        sockets.set(socketKey, {
          ...socketData,
          socket: newSocket,
          url: newUrl,
          isReconnecting: false,
        });

        setupSocketHandlers(store, newSocket, socketData.config, socketKey);
      }
    } catch (error) {
      console.error('Failed to reconnect with new token:', error);
      socketData.isReconnecting = false;
    }
  };

  return (store) => (next) => (action) => {
    for (const config of configs) {
      const socketKey = getSocketKey(config);

      if (config.wsActions.connect.match(action)) {
        const existingSocket = sockets.get(socketKey);
        if (existingSocket) {
          existingSocket.socket.close();
          sockets.delete(socketKey);
        }

        const { url, withAuth = false } = action.payload;
        const socket = new WebSocket(url);

        sockets.set(socketKey, {
          socket,
          url,
          withAuth,
          isReconnecting: false,
          config,
        });

        setupSocketHandlers(store, socket, config, socketKey);
      }

      if (config.wsActions.disconnect.match(action)) {
        const socketData = sockets.get(socketKey);
        if (socketData) {
          socketData.socket.close();
          sockets.delete(socketKey);
        }
      }

      if (config.wsActions.send.match(action)) {
        const socketData = sockets.get(socketKey);
        if (socketData?.socket.readyState === WebSocket.OPEN) {
          socketData.socket.send(JSON.stringify(action.payload));
        } else {
          console.warn('WS not open, message not sent');
        }
      }
    }

    return next(action);
  };
};
