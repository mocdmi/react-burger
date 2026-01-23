import { OrdersHistoryDetails } from '@/components/orders-history-details/orders-history-details';
import { useAppSelector } from '@/services/hooks/use-app-selector';
import {
  isOrdersHistoryWsConnected,
  isOrdersHistoryWsMessageLoading,
} from '@/services/selectors/all-orders-history-selectors';
import { Preloader } from '@krgaa/react-developer-burger-ui-components';
import { useOutletContext } from 'react-router-dom';

import type { TOrdersHistory } from '@/types';

import styles from './feed-details.module.css';

export const FeedDetailsPage = (): React.JSX.Element => {
  const { order } = useOutletContext<{ order: TOrdersHistory }>();
  const isConnected = useAppSelector(isOrdersHistoryWsConnected);
  const isMessageLoading = useAppSelector(isOrdersHistoryWsMessageLoading);

  return (
    <section className={styles.feed_details}>
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
