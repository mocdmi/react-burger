import { NumbersList } from './components/numbers-list/numbers-list';
import { Summary } from './components/summary/summary';

import styles from './feed-summary.module.css';

type TFeedSummaryProps = {
  finishedNumbers: string[];
  inProgressNumbers: string[];
  finishedTotal: string;
  finishedToday: string;
};

export const FeedSummary = ({
  finishedNumbers,
  inProgressNumbers,
  finishedTotal,
  finishedToday,
}: TFeedSummaryProps): React.JSX.Element => {
  return (
    <div className={styles.feed_summary}>
      <div className={styles.content}>
        <NumbersList
          className={styles.finished_numbers}
          title="Готовы:"
          numbers={finishedNumbers}
          type="finished"
        />
        <NumbersList
          className={styles.in_progress_numbers}
          title="В работе:"
          numbers={inProgressNumbers}
          type="in_progress"
        />
        <Summary
          className={styles.finished_total}
          title="Выполнено за все время:"
          sum={finishedTotal}
        />
        <Summary
          className={styles.finished_today}
          title="Выполнено за все сегодня:"
          sum={finishedToday}
        />
      </div>
    </div>
  );
};
