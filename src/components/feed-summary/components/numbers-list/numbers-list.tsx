import type { TOrdersHistoryStatus } from '@/types';

// eslint-disable-next-line css-modules/no-unused-class
import styles from './numbers-list.module.css';

type TNumbersListProps = {
  title: string;
  numbers: string[];
  type?: TOrdersHistoryStatus;
  className?: string;
};

export const NumbersList = ({
  title,
  numbers,
  type = 'done',
  className,
}: TNumbersListProps): React.JSX.Element => {
  return (
    <section className={className}>
      <h2 className="text text_type_main-medium mb-6">{title}</h2>
      {numbers.length === 0 ? (
        <span className="text text_type_main-small">Заказов нет</span>
      ) : (
        <ul className={styles.numbers_list}>
          {numbers.map((number) => (
            <li key={number} className={`${styles[type]} text text_type_digits-default`}>
              {number}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};
