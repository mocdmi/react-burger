import { API_WS_ORDER_HISTORY_ALL } from '@/const';
import {
  allOrdersHistoryWsConnect,
  allOrdersHistoryWsDisconnect,
} from '@/services/actions/all-orders-history-actions';
import { useAppDispatch } from '@/services/hooks/use-app-dispatch';
import { useAppSelector } from '@/services/hooks/use-app-selector';
import {
  allOrdersHistory,
  totalTodayAllOrdersHistory,
  totalAllOrdersHistory,
  isAllOrdersHistoryWsConnected,
  isAllOrdersHistoryWsMessageLoading,
} from '@/services/selectors/all-orders-history-selectors';
import { useEffect } from 'react';

import type { TOrdersHistory } from '@/types';

type TFeedProps = {
  orders: TOrdersHistory[];
  totalTodayOrders: number;
  totalOrders: number;
  isConnected: boolean;
  isMessageLoading: boolean;
};

export const useFeed = (): TFeedProps => {
  const orders = useAppSelector(allOrdersHistory);
  const totalTodayOrders = useAppSelector(totalTodayAllOrdersHistory);
  const totalOrders = useAppSelector(totalAllOrdersHistory);
  const isConnected = useAppSelector(isAllOrdersHistoryWsConnected);
  const isMessageLoading = useAppSelector(isAllOrdersHistoryWsMessageLoading);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(allOrdersHistoryWsConnect({ url: API_WS_ORDER_HISTORY_ALL }));
    return (): void => {
      dispatch(allOrdersHistoryWsDisconnect());
    };
  }, [dispatch]);

  return {
    orders,
    totalTodayOrders,
    totalOrders,
    isConnected,
    isMessageLoading,
  };
};
