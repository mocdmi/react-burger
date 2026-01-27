import { useMemo } from 'react';

import type { TOrdersHistory, TOrdersHistoryStatus } from '@/types';

type TUseSplitOrdersNumbersResult = Record<TOrdersHistoryStatus, string[]>;

export const useSplitOrdersNumbers = (
  orders: TOrdersHistory[]
): TUseSplitOrdersNumbersResult => {
  return useMemo(
    () =>
      orders.reduce((acc, order) => {
        acc[order.status] ??= [];
        acc[order.status].push(order.number);
        return acc;
      }, {} as TUseSplitOrdersNumbersResult),
    [orders]
  );
};
