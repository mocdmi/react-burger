import { CustomLink } from '@/components/custom-link/custom-link';

import { useSidebar } from './hooks/use-sidebar';

import type { TSidebarProps } from './types';

import styles from './sidebar.module.css';

export const Sidebar = ({ pages, descriptions }: TSidebarProps): React.JSX.Element => {
  const { isLoading, currentDescription, handleLogout } = useSidebar(descriptions);

  return (
    <div className={styles.sidebar}>
      {pages.map(({ to, name }, key) => (
        <CustomLink key={key} to={to} variant="secondary" end>
          {name}
        </CustomLink>
      ))}
      <button
        className={`${styles.logout_button} text text_type_main-medium`}
        onClick={handleLogout}
        type="button"
        disabled={isLoading}
      >
        Выход
      </button>
      {currentDescription && (
        <div className="text text_type_main-default text_color_inactive mt-20">
          {currentDescription}
        </div>
      )}
    </div>
  );
};
