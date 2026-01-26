import { OrdersHistoryDetails } from '@/components/orders-history-details/orders-history-details';
import { useAppSelector } from '@/services/hooks/use-app-selector';
import {
  isAllOrdersHistoryWsConnected,
  isAllOrdersHistoryWsMessageLoading,
} from '@/services/selectors/all-orders-history-selectors';
import { Preloader } from '@krgaa/react-developer-burger-ui-components';
import { useOutletContext } from 'react-router-dom';

import type { TOrdersHistory } from '@/types';

import styles from './orders-history-details.module.css';

export const OrdersHistoryDetailsPage = (): React.JSX.Element => {
  const { order } = useOutletContext<{ order: TOrdersHistory }>();
  const isConnected = useAppSelector(isAllOrdersHistoryWsConnected);
  const isMessageLoading = useAppSelector(isAllOrdersHistoryWsMessageLoading);

  return (
    <section className={styles.orders_history_details}>
      {!isConnected || isMessageLoading ? (
        <div className={styles.preloader}>
          <Preloader />
        </div>
      ) : (
        <OrdersHistoryDetails payload={order} numberCenter />
      )}
    </section>
  );
};
