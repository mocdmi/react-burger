import { useGetUser } from '@/hooks/use-get-user';
import { Outlet } from 'react-router-dom';

import { AppHeader } from '../app-header/app-header';

import styles from './layout.module.css';

export const Layout = (): React.JSX.Element => {
  useGetUser();

  return (
    <div className={styles.app}>
      <AppHeader />
      <main className={`${styles.main} pl-5 pr-5`}>
        <Outlet />
      </main>
    </div>
  );
};
