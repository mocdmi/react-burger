import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon,
} from '@krgaa/react-developer-burger-ui-components';

import { CustomLink } from '../custom-link/custom-link';

import styles from './app-header.module.css';

export const AppHeader = (): React.JSX.Element => {
  return (
    <header className={styles.header}>
      <nav className={`${styles.menu} p-4`}>
        <div className={styles.menu_part_left}>
          <CustomLink to="/" extraClass={styles.link}>
            {({ isActive }) => (
              <>
                <BurgerIcon type={isActive ? 'primary' : 'secondary'} />
                <p className="text text_type_main-default ml-2">Конструктор</p>
              </>
            )}
          </CustomLink>
          <CustomLink to="/feed" extraClass={`${styles.link} ml-10`}>
            {({ isActive }) => (
              <>
                <ListIcon type={isActive ? 'primary' : 'secondary'} />
                <p className="text text_type_main-default ml-2">Лента заказов</p>
              </>
            )}
          </CustomLink>
        </div>
        <div className={styles.logo}>
          <CustomLink to="/">
            <Logo />
          </CustomLink>
        </div>
        <CustomLink
          to="/profile"
          extraClass={`${styles.link} ${styles.link_position_last}`}
        >
          {({ isActive }) => (
            <>
              <ProfileIcon type={isActive ? 'primary' : 'secondary'} />
              <p className="text text_type_main-default ml-2">Личный кабинет</p>
            </>
          )}
        </CustomLink>
      </nav>
    </header>
  );
};
