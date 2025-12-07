import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon,
} from '@krgaa/react-developer-burger-ui-components';
import { useLocation } from 'react-router-dom';

import { CustomLink } from '../custom-link/custom-link';

import styles from './app-header.module.css';

export const AppHeader = (): React.JSX.Element => {
  const location = useLocation();

  const isConstructor = location.pathname === '/';
  const isFeed = location.pathname.startsWith('/profile/orders');
  const isProfile = location.pathname.startsWith('/profile');

  return (
    <header className={styles.header}>
      <nav className={`${styles.menu} p-4`}>
        <div className={styles.menu_part_left}>
          <CustomLink to="/" extraClass={styles.link}>
            <BurgerIcon type={isConstructor ? 'primary' : 'secondary'} />
            <p className="text text_type_main-default ml-2">Конструктор</p>
          </CustomLink>
          <CustomLink to="/profile/orders" extraClass={`${styles.link} ml-10`}>
            <ListIcon type={isFeed ? 'primary' : 'secondary'} />
            <p className="text text_type_main-default ml-2">Лента заказов</p>
          </CustomLink>
        </div>
        <div className={styles.logo}>
          <Logo />
        </div>
        <CustomLink
          to="/profile"
          extraClass={`${styles.link} ${styles.link_position_last}`}
        >
          <ProfileIcon type={isProfile ? 'primary' : 'secondary'} />
          <p className="text text_type_main-default ml-2">Личный кабинет</p>
        </CustomLink>
      </nav>
    </header>
  );
};
