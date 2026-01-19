// eslint-disable-next-line css-modules/no-unused-class
import styles from './numbers-list.module.css';

type TNumbersListProps = {
  title: string;
  numbers: string[];
  type?: 'finished' | 'in_progress';
  className?: string;
};

export const NumbersList = ({
  title,
  numbers,
  type = 'in_progress',
  className,
}: TNumbersListProps): React.JSX.Element => {
  return (
    <section className={className}>
      <h2 className="text text_type_main-medium mb-6">{title}</h2>
      <ul className={styles.numbers_list}>
        {numbers.map((number) => (
          <li key={number} className={`${styles[type]} text text_type_digits-default`}>
            {number}
          </li>
        ))}
      </ul>
    </section>
  );
};
