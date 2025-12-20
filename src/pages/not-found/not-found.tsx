import styles from './not-found.module.css';

export const NotFound = (): React.JSX.Element => {
  return (
    <div className={styles.not_found}>
      <h1 className="text text_type_digits-large">404</h1>
      <h2 className="text text_type_main-medium">Page Not Found</h2>
      <p className="text text_type_main-default mt-10">
        The page you are looking for does not exist.
      </p>
    </div>
  );
};
