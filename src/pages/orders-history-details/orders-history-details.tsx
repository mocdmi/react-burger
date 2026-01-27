import { OrdersHistoryDetails } from '@/components/orders-history-details/orders-history-details';
import { Preloader } from '@krgaa/react-developer-burger-ui-components';
import { useOutletContext } from 'react-router-dom';

import type { TOrdersHistory } from '@/types';

import styles from './orders-history-details.module.css';

type TOutletContext = {
  order: TOrdersHistory;
  isConnected: boolean;
  isMessageLoading: boolean;
};

export const OrdersHistoryDetailsPage = (): React.JSX.Element => {
  const { order, isConnected, isMessageLoading } = useOutletContext<TOutletContext>();

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
