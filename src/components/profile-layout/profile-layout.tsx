import { useDirectNavigation } from '@/hooks/use-direct-navigation';
import { Outlet, useParams } from 'react-router-dom';

import { Sidebar } from './components/sidebar/sidebar';

import type { TDescription } from './components/sidebar/types';

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

export const ProfileLayout = (): React.JSX.Element => {
  const { id } = useParams();
  const { isDirectNavigation } = useDirectNavigation(!!id);

  // Если это прямой переход на детали заказа - не показываем sidebar
  if (isDirectNavigation) {
    return <Outlet />;
  }

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
      <Outlet />
    </div>
  );
};
