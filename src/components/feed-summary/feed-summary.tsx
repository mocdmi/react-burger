import { NumbersList } from './components/numbers-list/numbers-list';
import { Summary } from './components/summary/summary';
import { useSplitOrdersNumbers } from './hooks/useSplitOrdersNumbers';

import type { TOrdersHistory } from '@/types';

import styles from './feed-summary.module.css';

type TFeedSummaryProps = {
  orders: TOrdersHistory[];
  totalOrders: number;
  totalTodayOrders: number;
};

export const FeedSummary = ({
  orders,
  totalOrders,
  totalTodayOrders,
}: TFeedSummaryProps): React.JSX.Element => {
  const splitNumbers = useSplitOrdersNumbers(orders);

  return (
    <div className={styles.feed_summary}>
      <div className={styles.content}>
        <NumbersList
          className={styles.done_numbers}
          title="Готовы:"
          numbers={(splitNumbers.done ?? []).slice(0, 20)}
          type="done"
        />
        <NumbersList
          className={styles.pending_numbers}
          title="В работе:"
          numbers={(splitNumbers.pending ?? []).slice(0, 20)}
          type="pending"
        />
        <Summary
          className={styles.done_total}
          title="Выполнено за все время:"
          total={totalOrders}
        />
        <Summary
          className={styles.done_today}
          title="Выполнено за сегодня:"
          total={totalTodayOrders}
        />
      </div>
    </div>
  );
};
