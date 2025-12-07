import { Outlet } from 'react-router-dom';

import styles from './auth-layout.module.css';

export const AuthLayout = (): React.JSX.Element => {
  return (
    <section className={styles.container}>
      <Outlet />
    </section>
  );
};
