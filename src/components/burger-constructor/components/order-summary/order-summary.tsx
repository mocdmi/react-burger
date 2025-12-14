import { CurrencyIcon } from '@krgaa/react-developer-burger-ui-components';

import type { ReactNode } from 'react';

import styles from './order-summary.module.css';

type OrderSummaryProps = {
  total: number;
  actions: ReactNode;
  isError?: boolean;
  errorMessage?: string;
};

export const OrderSummary = ({
  total,
  actions,
  isError = false,
  errorMessage,
}: OrderSummaryProps): React.JSX.Element => {
  return (
    <div className={`${styles.order_summary} pl-8`}>
      <div className={styles.total}>
        <span className="text text_type_digits-medium">{total}</span>
        <CurrencyIcon type="primary" className={styles.icon} />
      </div>
      <div>
        {actions}
        {isError && (
          <div className={`text text_type_main-default ${styles.error}`}>
            {errorMessage}
          </div>
        )}
      </div>
    </div>
  );
};
