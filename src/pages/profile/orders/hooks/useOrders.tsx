import { API_WS_ORDER_HISTORY_USER } from '@/const';
import {
  userOrdersHistoryWsConnect,
  userOrdersHistoryWsDisconnect,
} from '@/services/actions/user-orders-history-actions';
import { useAppDispatch } from '@/services/hooks/use-app-dispatch';
import { useAppSelector } from '@/services/hooks/use-app-selector';
import {
  userOrdersHistory,
  isUserOrdersHistoryWsConnected,
  isUserOrdersHistoryWsMessageLoading,
} from '@/services/selectors/user-orders-history-selectors';
import { getCookie } from '@/utils/cookie';
import { useEffect, useMemo } from 'react';

import type { TOrdersHistory } from '@/types';

type TUseOrdersResult = {
  orders: TOrdersHistory[];
  isConnected: boolean;
  isMessageLoading: boolean;
};

export const useOrders = (): TUseOrdersResult => {
  const orders = useAppSelector(userOrdersHistory);
  const isConnected = useAppSelector(isUserOrdersHistoryWsConnected);
  const isMessageLoading = useAppSelector(isUserOrdersHistoryWsMessageLoading);
  const dispatch = useAppDispatch();

  const token = useMemo(() => {
    const tokenWithBearer = getCookie('accessToken');
    return tokenWithBearer?.replace(/^Bearer\s+/i, '');
  }, []);

  useEffect(() => {
    if (token) {
      dispatch(
        userOrdersHistoryWsConnect(`${API_WS_ORDER_HISTORY_USER}?token=${token}`)
      );
    }
    return (): void => {
      dispatch(userOrdersHistoryWsDisconnect());
    };
  }, [dispatch, token]);

  return { orders, isConnected, isMessageLoading };
};
