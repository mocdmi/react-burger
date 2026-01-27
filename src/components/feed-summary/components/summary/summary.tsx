import styles from './summary.module.css';

type TSummaryProps = {
  title: string;
  total: number;
  className?: string;
};

export const Summary = ({
  title,
  total,
  className,
}: TSummaryProps): React.JSX.Element => {
  return (
    <section className={className}>
      <h2 className="text text_type_main-medium">{title}</h2>
      <div className={`${styles.sum} text text_type_digits-large`}>{total}</div>
    </section>
  );
};
