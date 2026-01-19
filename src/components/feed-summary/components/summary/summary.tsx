import styles from './summary.module.css';

type TSummaryProps = {
  title: string;
  sum: string;
  className?: string;
};

export const Summary = ({ title, sum, className }: TSummaryProps): React.JSX.Element => {
  return (
    <section className={className}>
      <h2 className="text text_type_main-medium">{title}</h2>
      <div className={`${styles.sum} text text_type_digits-large`}>{sum}</div>
    </section>
  );
};
