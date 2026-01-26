import { Outlet } from 'react-router-dom';

import { Sidebar } from './components/sidebar/sidebar';

import type { TDescription } from './components/sidebar/types';
import type { ReactNode } from 'react';

import styles from './profile-layout.module.css';

const descriptionMap: TDescription[] = [
  {
    path: '/profile',
    description: 'В этом разделе вы можете изменить свои персональные данные',
  },
  {
    path: '/profile/orders',
    description: 'В этом разделе вы можете просмотреть свою историю заказов',
  },
];

export const ProfileLayout = ({
  children,
}: {
  children?: ReactNode;
}): React.JSX.Element => {
  return (
    <div className={styles.profile_layout}>
      <Sidebar
        pages={[
          {
            to: '/profile',
            name: 'Профиль',
          },
          {
            to: '/profile/orders',
            name: 'История заказов',
          },
        ]}
        descriptions={descriptionMap}
      />
      {children ?? <Outlet />}
    </div>
  );
};
